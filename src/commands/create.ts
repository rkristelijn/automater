import { spawn } from 'child_process';
import { exec } from 'child_process';
import * as fs from 'fs';
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
  toolpad?: boolean;
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
    turbopack = true
  } = options;

  console.log(chalk.blue(`🚀 Creating ${projectName} with ${template} template...`));

  if (template === 'nextjs') {
    await createCloudflareNextJs(projectName, { framework, platform, typescript, deploy, git, start, open, eslint, tailwind, app, srcDir, importAlias, turbopack });
  } else {
    throw new Error(`Template "${template}" is not supported yet`);
  }

  console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
  
  // Apply default features (serverHardening, biome)
  const defaultFeatures = ['serverHardening', 'biome'];
  const customFeatures = features ? features.split(',').map(f => f.trim()) : [];
  const allFeatures = [...defaultFeatures, ...customFeatures];
  
  console.log(chalk.yellow(`📦 Adding features: ${allFeatures.join(', ')}`));
  
  for (const feature of allFeatures) {
    if (feature === 'serverHardening') {
      await applyServerHardening(projectName);
    } else if (feature === 'biome') {
      await applyBiome(projectName);
    } else if (feature === 'mui') {
      await installMUI(projectName);
    } else if (feature === 'mui-toolpad') {
      await installToolpad(projectName);
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

    const child = spawn('npx', ['--yes', ...args], {
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
- **Package Manager**: pnpm

## Getting Started

### Development
\`\`\`bash
pnpm dev
\`\`\`

### Build
\`\`\`bash
pnpm build
\`\`\`

### Deploy
\`\`\`bash
pnpm deploy
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

async function installToolpad(projectName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue('📦 Installing MUI Toolpad packages...'));
    
    const installProcess = spawn('pnpm', ['add', '@toolpad/core', '@mui/material', '@mui/icons-material', '@mui/x-data-grid', '@emotion/react', '@emotion/styled'], {
      cwd: projectName,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ MUI Toolpad packages installed successfully!'));
        configureToolpad(projectName).then(resolve).catch(reject);
      } else {
        reject(new Error(`Toolpad installation failed with code ${code}`));
      }
    });

    installProcess.on('error', (error) => {
      reject(error);
    });
  });
}

async function configureToolpad(projectName: string): Promise<void> {
  console.log(chalk.blue('⚙️  Configuring MUI Toolpad...'));
  
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    // Copy templates from templates/features/mui-toolpad
    const templatePath = path.join(process.cwd(), 'templates/features/mui-toolpad');
    const targetPath = path.join(projectName, 'src');
    
    await copyDirectory(templatePath, targetPath);
    
    // Remove unnecessary CSS files
    await removeCSSFiles(projectName);
    
    console.log(chalk.green('✅ MUI Toolpad configured successfully!'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not automatically configure Toolpad.'));
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

async function applyServerHardening(projectName: string): Promise<void> {
  console.log(chalk.blue('🔒 Applying server hardening...'));
  
  try {
    const fs = await import('fs');
    
    // Update next.config.ts to include security headers directly
    const nextConfigPath = `${projectName}/next.config.ts`;
    const nextConfigContent = await fs.promises.readFile(nextConfigPath, 'utf8');
    
    const updatedNextConfig = nextConfigContent.replace(
      /const nextConfig: NextConfig = \{/,
      `const nextConfig: NextConfig = {
  // Security hardening - Best practice: Disable powered-by header to prevent information disclosure
  // Reference: https://nextjs.org/blog/security-nextjs-server-components-actions
  poweredByHeader: false,
  
  // Security hardening - Best practice: OWASP recommended security headers
  // Reference: https://owasp.org/www-project-secure-headers/
  // More info: https://github.com/rkristelijn/automater/blob/main/docs/security-best-practices.md
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking attacks
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Enable XSS protection
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Control referrer information
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restrict dangerous browser features
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Prevent resource sharing attacks
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // Comprehensive Content Security Policy
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" }
        ]
      }
    ];
  },`
    );
    
    await fs.promises.writeFile(nextConfigPath, updatedNextConfig);
    console.log(chalk.green('✅ Security headers configured in next.config.ts'));
    console.log(chalk.green('✅ Server hardening applied successfully!'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not apply server hardening automatically.'));
    console.log(error);
  }
}

async function applyBiome(projectName: string): Promise<void> {
  console.log(chalk.blue('🔧 Setting up Biome...'));
  
  return new Promise((resolve) => {
    const installProcess = spawn('npm', ['install', '--save-dev', '@biomejs/biome'], {
      cwd: projectName,
      stdio: 'inherit'
    });

    installProcess.on('close', async (code) => {
      if (code === 0) {
        try {
          const fs = await import('fs');
          
          const biomeConfig = {
            "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
            "organizeImports": { "enabled": true },
            "linter": { "enabled": true },
            "formatter": { "enabled": true }
          };
          
          await fs.promises.writeFile(`${projectName}/biome.json`, JSON.stringify(biomeConfig, null, 2));
          console.log(chalk.green('✅ Biome configured successfully!'));
        } catch (error) {
          console.log(chalk.yellow('⚠️  Could not configure Biome automatically.'));
        }
      } else {
        console.log(chalk.yellow('⚠️  Biome installation failed, continuing...'));
      }
      resolve();
    });

    installProcess.on('error', () => {
      console.log(chalk.yellow('⚠️  Biome installation failed, continuing...'));
      resolve();
    });
  });
}

async function removeCSSFiles(projectName: string): Promise<void> {
  console.log(chalk.blue('🧹 Removing unnecessary CSS files...'));
  
  try {
    // Remove CSS files - Best practice: Use MUI's CssBaseline instead of global CSS
    const cssFiles = [
      `${projectName}/src/app/globals.css`,
      `${projectName}/src/app/page.module.css`
    ];
    
    for (const file of cssFiles) {
      try {
        await fs.promises.unlink(file);
        console.log(chalk.gray(`   Removed: ${file}`));
      } catch (error) {
        // File might not exist, continue
      }
    }
    
    // Remove CSS import from layout.tsx
    const layoutPath = `${projectName}/src/app/layout.tsx`;
    try {
      const layoutContent = await fs.promises.readFile(layoutPath, 'utf8');
      const updatedLayout = layoutContent.replace(/import ["']\.\/globals\.css["'];?\n?/g, '');
      await fs.promises.writeFile(layoutPath, updatedLayout);
      console.log(chalk.gray('   Removed CSS import from layout.tsx'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not remove CSS import from layout.tsx'));
    }
    
    console.log(chalk.green('✅ CSS files removed - using MUI styling system'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not remove all CSS files'));
  }
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  const fs = await import('fs');
  const path = await import('path');
  
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  
  await fs.promises.mkdir(dest, { recursive: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function convertToPnpm(projectName: string): Promise<void> {
  console.log(chalk.blue('📦 Converting to pnpm...'));
  
  try {
    // Remove package-lock.json
    const lockfilePath = `${projectName}/package-lock.json`;
    try {
      await fs.promises.unlink(lockfilePath);
      console.log(chalk.gray('   Removed package-lock.json'));
    } catch (error) {
      // File might not exist
    }
    
    // Install dependencies with pnpm
    await new Promise<void>((resolve, reject) => {
      const installProcess = spawn('pnpm', ['install'], {
        cwd: projectName,
        stdio: 'inherit'
      });

      installProcess.on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green('✅ Dependencies installed with pnpm'));
          resolve();
        } else {
          console.log(chalk.yellow('⚠️  pnpm install failed, keeping npm setup'));
          resolve(); // Don't fail the whole process
        }
      });

      installProcess.on('error', (error) => {
        console.log(chalk.yellow('⚠️  pnpm not available, keeping npm setup'));
        resolve(); // Don't fail the whole process
      });
    });
    
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not convert to pnpm'));
  }
}
