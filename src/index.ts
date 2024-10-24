#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { processFile } from './core/processor';
import { setupLogger } from './utils/logger';
import { version } from '../package.json';
import { OutputFormat, parseOutputFormat } from './types/output';
import { CodeParserError } from './errors/CodeParserErrors';

const program = new Command();

setupLogger();

program
  .version(version)
  .description('A powerful code parser that converts source code to structured JSON')
  .argument('[file]', 'File to parse')
  .option('-f, --format <format>', 'Output format (json, ast, tokens)', 'json')
  .option('-o, --output <file>', 'Output file')
  .option('-p, --pretty', 'Pretty print output', false)
  .option('-v, --verbose', 'Enable verbose logging', false)
  .action(async (file: string | undefined, options: any) => {
    try {
      if (!file) {
        console.error(chalk.red('Error: Please provide a file to parse'));
        process.exit(1);
      }

      const format = parseOutputFormat(options.format);
      const result = await processFile(file, {
        format,
        pretty: options.pretty,
        verbose: options.verbose,
        outputFile: options.output
      });

      if (!options.output) {
        console.log(options.pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result));
      }
    } catch (error) {
      if (error instanceof CodeParserError) {
        console.error(chalk.red(`Error: ${error.message}`));
        if (options.verbose) {
          console.error(chalk.gray(error.stack));
        }
      } else {
        console.error(chalk.red('An unexpected error occurred'));
        console.error(error);
      }
      process.exit(1);
    }
  });

program.parse();