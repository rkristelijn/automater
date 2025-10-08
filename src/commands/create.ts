import { spawn } from 'child_process';
import { exec } from 'child_process';
import chalk from 'chalk';

interface CreateOptions {
  template?: string;
  features?: string;
  framework?: string;
  platform?: 'workers' | 'pages';
  typescript?: boolean;
  deploy?: boolean;
  git?: boolean;
  start?: boolean;
  open?: boolean;
  eslint?: boolean;
  tailwind?: boolean;
  app?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  turbopack?: boolean;
  mui?: boolean;
}

export async function createProject(projectName: string, options: CreateOptions): Promise<void> {
  const { 
    template = 'nextjs', 
    features,
    framework = 'next',
    platform = 'workers',
    typescript = true,
    deploy = false,
    git = false,
    start = true,
    open = true,
    eslint = true,
    tailwind = false,
    app = true,
    srcDir = true,
    importAlias = '@/*',
    turbopack = true,
    mui = true
  } = options;

  console.log(chalk.blue(`🚀 Creating ${projectName} with ${template} template...`));

  if (template === 'nextjs') {
    await createCloudflareNextJs(projectName, { framework, platform, typescript, deploy, git, start, open, eslint, tailwind, app, srcDir, importAlias, turbopack });
  } else {
    throw new Error(`Template "${template}" is not supported yet`);
  }

  console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
  
  if (features) {
    console.log(chalk.yellow(`📦 Adding features: ${features}`));
    const featureList = features.split(',').map(f => f.trim());
    
    if (featureList.includes('mui')) {
      await installMUI(projectName);
    }
  }

  if (start) {
    console.log(chalk.blue(`🚀 Starting development server...`));
    await startDevServer(projectName, open);
  }
}

async function createCloudflareNextJs(
  projectName: string, 
  options: { framework: string; platform: string; typescript: boolean; deploy: boolean; git: boolean; start: boolean; open: boolean; eslint: boolean; tailwind: boolean; app: boolean; srcDir: boolean; importAlias: string; turbopack: boolean }
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray('Running: npx create-cloudflare@latest with configurable options'));
    
    // see https://nextjs.org/docs/app/api-reference/cli/create-next-app for all arguments
    const args = [
      'create-cloudflare@latest',
      projectName,
      `--framework=${options.framework}`,
      options.deploy ? '--deploy' : '--no-deploy',
      options.git ? '--git' : '--no-git',
      '--',
      options.typescript ? '--typescript' : '--javascript',
      options.eslint ? '--eslint' : '--no-eslint',
      options.tailwind ? '--tailwind' : '--no-tailwind',
      options.app ? '--app' : '--no-app',
      options.srcDir ? '--src-dir' : '--no-src-dir',
      `--import-alias="${options.importAlias}"`,
      options.turbopack ? '--turbopack' : '',
      '-y'
    ].filter(arg => arg !== '');

    const child = spawn('npx', args, {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Cloudflare create process exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function installMUI(projectName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue('📦 Installing MUI packages...'));
    
    const installProcess = spawn('npm', ['install', '@mui/material', '@mui/material-nextjs', '@emotion/cache', '@emotion/styled'], {
      cwd: projectName,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ MUI packages installed successfully!'));
        configureMUI(projectName).then(resolve).catch(reject);
      } else {
        reject(new Error(`MUI installation failed with code ${code}`));
      }
    });

    installProcess.on('error', (error) => {
      reject(error);
    });
  });
}

async function configureMUI(projectName: string): Promise<void> {
  console.log(chalk.blue('⚙️  Configuring MUI...'));
  
  // Update app/layout.tsx to include AppRouterCacheProvider
  const layoutPath = `${projectName}/src/app/layout.tsx`;
  
  try {
    const fs = await import('fs');
    const layoutContent = await fs.promises.readFile(layoutPath, 'utf8');
    
    const updatedLayout = layoutContent
      .replace(
        /import.*from ['"]next\/font\/google['"];?\n/,
        `$&import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';\n`
      )
      .replace(
        /<body[^>]*>/,
        `$&\n        <AppRouterCacheProvider>`
      )
      .replace(
        /{children}/,
        `{children}\n        </AppRouterCacheProvider>`
      );
    
    await fs.promises.writeFile(layoutPath, updatedLayout);
    
    // Create a simple MUI demo page
    const demoPageContent = `'use client';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to MUI + Next.js!
      </Typography>
      
      <Card sx={{ maxWidth: 400, margin: '20px 0' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            MUI Demo Card
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            This is a simple Material-UI card component
          </Typography>
          <Button variant="contained" color="primary">
            Click me!
          </Button>
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Outlined Button
        </Button>
        <Button variant="text">
          Text Button
        </Button>
      </Box>
    </Box>
  );
}`;
    
    await fs.promises.writeFile(`${projectName}/src/app/page.tsx`, demoPageContent);
    
    // Create custom README
    const readmeContent = `# ${projectName}

> Generated with [Automater](https://github.com/rkristelijn/automater)

This project was scaffolded using Automater, following official documentation and best practices.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Platform**: Cloudflare Workers/Pages
- **UI Library**: Material-UI (MUI) v6
- **Styling**: Emotion (CSS-in-JS)
- **Language**: TypeScript
- **Package Manager**: npm

## Getting Started

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

### Deploy
\`\`\`bash
npm run deploy
\`\`\`

## Standards & Best Practices

This project follows official standards from:

- [Next.js App Router](https://nextjs.org/docs/app) - Modern React framework
- [MUI Integration Guide](https://mui.com/material-ui/integrations/nextjs/) - Material-UI with Next.js
- [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/) - Deployment platform
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

\`\`\`
${projectName}/
├── src/
│   └── app/
│       ├── layout.tsx    # Root layout with MUI provider
│       └── page.tsx      # Homepage with MUI demo
├── public/               # Static assets
└── package.json         # Dependencies and scripts
\`\`\`

## MUI Configuration

- AppRouterCacheProvider configured for SSR
- Emotion styling engine
- Material-UI components ready to use

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MUI Documentation](https://mui.com/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Automater GitHub](https://github.com/rkristelijn/automater)
`;
    
    await fs.promises.writeFile(`${projectName}/README.md`, readmeContent);
    
    console.log(chalk.green('✅ MUI configured successfully with demo page and README!'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not automatically configure MUI. Please follow manual setup.'));
    console.log(error);
  }
}

async function startDevServer(projectName: string, openBrowser: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray(`Running: pnpm dev in ${projectName}`));
    
    const args = ['dev'];

    const child = spawn('pnpm', args, {
      cwd: projectName,
      stdio: 'inherit',
      shell: true
    });

    // Don't wait for dev server to finish (it runs indefinitely)
    setTimeout(() => {
      if (openBrowser) {
        console.log(chalk.green('🌐 Opening browser...'));
        exec('open http://localhost:3000', (error) => {
          if (error) {
            console.log(chalk.yellow('Could not open browser automatically. Visit http://localhost:3000'));
          }
        });
      }
      console.log(chalk.green('✅ Development server started! Press Ctrl+C to stop.'));
      resolve();
    }, 3000); // Give it more time to start

    child.on('error', (error) => {
      reject(error);
    });
  });
}
