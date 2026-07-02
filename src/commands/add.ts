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
  } else {
    throw new Error(`Unknown feature: ${feature}. Available: biome, mui`);
  }
  
  console.log(chalk.green(`✅ Feature ${feature} added successfully!`));
}

async function applyBiome(projectDir: string): Promise<void> {
  console.log(chalk.blue('🔧 Setting up Biome...'));
  
  return new Promise((resolve) => {
    const installProcess = spawn('pnpm', ['add', '--save-dev', '@biomejs/biome'], {
      cwd: projectDir,
      stdio: 'inherit'
    });

    installProcess.on('close', async (code) => {
      if (code === 0) {
        try {
          const biomeConfig = {
            "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
            "files": {
              "ignore": [".next/**", "node_modules/**", "dist/**", "build/**", ".open-next/**"]
            },
            "formatter": { "enabled": true, "indentStyle": "space" },
            "linter": { "enabled": true, "rules": { "recommended": true } },
            "javascript": { "formatter": { "quoteStyle": "single" } }
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

/**
 * Install MUI v9 packages into an existing project.
 * Reference: https://mui.com/material-ui/getting-started/installation/
 */
async function installMUI(projectDir: string): Promise<void> {
  console.log(chalk.blue('📦 Installing MUI v9...'));
  
  const packages = [
    '@mui/material@^9',
    '@mui/icons-material@^9',
    '@mui/material-nextjs@^9',
    '@emotion/cache',
    '@emotion/react',
    '@emotion/styled',
  ];

  return new Promise((resolve) => {
    const installProcess = spawn('pnpm', ['add', ...packages], {
      cwd: projectDir,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ MUI v9 installed successfully!'));
      } else {
        console.log(chalk.yellow('⚠️  MUI installation failed.'));
      }
      resolve();
    });
  });
}
