import { spawn } from 'child_process';
import chalk from 'chalk';

interface CreateOptions {
  template?: string;
  features?: string;
}

export async function createProject(projectName: string, options: CreateOptions): Promise<void> {
  const { template = 'nextjs', features } = options;

  console.log(chalk.blue(`🚀 Creating ${projectName} with ${template} template...`));

  if (template === 'nextjs') {
    await createNextJsProject(projectName, features);
  } else {
    throw new Error(`Template "${template}" is not supported yet`);
  }

  console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
  
  if (features) {
    console.log(chalk.yellow(`📦 Adding features: ${features}`));
    // TODO: Implement feature addition
  }
}

async function createNextJsProject(projectName: string, features?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray('Running: npx -y create-cloudflare@latest with Next.js defaults'));
    
    const args = [
      '-y',
      'create-cloudflare@latest',
      projectName,
      '--framework=next',
      '--accept-defaults',
      '--',
      '--typescript',
      '--eslint',
      '--tailwind',
      '--app',
      '--import-alias=@/*'
    ];

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
