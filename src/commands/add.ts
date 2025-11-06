import { spawn } from 'child_process';
import * as fs from 'fs';
import chalk from 'chalk';

export async function addFeature(feature: string): Promise<void> {
  console.log(chalk.blue(`📦 Adding feature: ${feature}`));
  
  // Check if we're in a project directory
  if (!fs.existsSync('package.json')) {
    throw new Error('No package.json found. Run this command in a project directory.');
  }

  const currentDir = '.';
  
  if (feature === 'biome') {
    await applyBiome(currentDir);
  } else if (feature === 'mui') {
    await installMUI(currentDir);
  } else if (feature === 'mui-toolpad') {
    await installToolpad(currentDir);
  } else {
    throw new Error(`Unknown feature: ${feature}`);
  }
  
  console.log(chalk.green(`✅ Feature ${feature} added successfully!`));
}

async function applyBiome(projectDir: string): Promise<void> {
  console.log(chalk.blue('🔧 Setting up Biome...'));
  
  return new Promise((resolve) => {
    const installProcess = spawn('npm', ['install', '--save-dev', '@biomejs/biome'], {
      cwd: projectDir,
      stdio: 'inherit'
    });

    installProcess.on('close', async (code) => {
      if (code === 0) {
        try {
          const biomeConfig = {
            "$schema": "https://biomejs.dev/schemas/2.2.5/schema.json",
            "assist": { "actions": { "source": { "organizeImports": "on" } } },
            "linter": { "enabled": true },
            "formatter": { "enabled": true }
          };
          
          await fs.promises.writeFile(`${projectDir}/biome.json`, JSON.stringify(biomeConfig, null, 2));
          console.log(chalk.green('✅ Biome configured successfully!'));
        } catch (error) {
          console.log(chalk.yellow('⚠️  Could not configure Biome automatically.'));
        }
      } else {
        console.log(chalk.yellow('⚠️  Biome installation failed, continuing...'));
      }
      resolve();
    });
  });
}

async function installMUI(projectDir: string): Promise<void> {
  console.log(chalk.blue('📦 Installing MUI...'));
  
  return new Promise((resolve) => {
    const installProcess = spawn('npm', ['install', '@mui/material', '@emotion/styled', '@emotion/cache'], {
      cwd: projectDir,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ MUI installed successfully!'));
      } else {
        console.log(chalk.yellow('⚠️  MUI installation failed.'));
      }
      resolve();
    });
  });
}

async function installToolpad(projectDir: string): Promise<void> {
  console.log(chalk.blue('📦 Installing MUI Toolpad...'));
  
  return new Promise((resolve) => {
    const installProcess = spawn('npm', ['install', '@toolpad/core', '@mui/material', '@mui/icons-material', '@mui/x-data-grid'], {
      cwd: projectDir,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ MUI Toolpad installed successfully!'));
      } else {
        console.log(chalk.yellow('⚠️  MUI Toolpad installation failed.'));
      }
      resolve();
    });
  });
}
