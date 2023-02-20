#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'Output format', 'stylish')
  .action((firstPath, secondPath, formatName) => {
    console.log(gendiff(firstPath, secondPath, formatName.format));
  });

program.parse();
