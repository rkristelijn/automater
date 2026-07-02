#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createProject } from './commands/create.js';
import { addFeature } from './commands/add.js';

const program = new Command();

program
  .name('automater')
  .description('Scaffold modern web apps with best practices in seconds')
  .version('2.0.0');

program
  .command('create')
  .description('Create a new project (Next.js + Cloudflare Workers + MUI v9)')
  .argument('<project-name>', 'Name of the project to create')
  .option('--template <template>', 'Project template', 'nextjs')
  .option('--features <features>', 'Comma-separated list of features to add (e.g. mui)')
  .option('--framework <framework>', 'Framework to use', 'next')
  .option('--platform <platform>', 'Deployment platform', 'workers')
  .option('--no-typescript', 'Disable TypeScript')
  .option('--start', 'Start development server after creation')
  .option('--open', 'Open browser after starting (requires --start)')
  .option('--deploy', 'Deploy immediately after creation')
  .option('--git', 'Initialize git repository (disabled by default)')
  .action(async (projectName: string, options: any) => {
    try {
      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program
  .command('add')
  .description('Add features to existing project')
  .argument('<feature>', 'Feature to add (biome, mui)')
  .action(async (feature: string) => {
    try {
      await addFeature(feature);
    } catch (error) {
      console.error(chalk.red('Error adding feature:'), error);
      process.exit(1);
    }
  });

program.parse();
