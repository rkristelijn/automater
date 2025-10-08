#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createProject } from './commands/create.js';

const program = new Command();

program
  .name('automater')
  .description('Scaffold modern web apps with best practices in seconds')
  .version('0.1.0');

program
  .command('create')
  .description('Create a new project')
  .argument('<project-name>', 'Name of the project to create')
  .option('--template <template>', 'Project template', 'nextjs')
  .option('--features <features>', 'Comma-separated list of features to add')
  .action(async (projectName: string, options: { template?: string; features?: string }) => {
    try {
      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse();
