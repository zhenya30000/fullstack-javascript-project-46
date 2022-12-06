#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import gendiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(
      gendiff(
        fs.readFileSync(filepath1, 'utf-8'),
        fs.readFileSync(filepath2, 'utf-8'),
      ),
    );
  });

program.parse();
