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
    // TODO: Implement feature addition
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
