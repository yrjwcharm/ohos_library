#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const pkg = require('./package.json');

const program = new Command();

program
  .name('ascf-cli')
  .description('ASCF development toolkit CLI')
  .version(pkg.version);

// generate-as-icon command
program
  .command('generate-as-icon')
  .description(
    'Generate atomic service icons (512x512 app icon and 216x216 AGC icon) from a source image',
  )
  .requiredOption('-i, --input <path>', 'Input image path (1024x1024 recommended)')
  .requiredOption('-o, --output <path>', 'Output 512x512 app icon path')
  .option('--agc <path>', 'Output 216x216 AGC icon path')
  .option('--force', 'Overwrite existing output files', false)
  .action(async (options) => {
    try {
      const { generateAsIcon } = require('./asicon-node');
      const result = await generateAsIcon({
        input: options.input,
        output: options.output,
        agc: options.agc,
        force: options.force,
      });

      console.log(`App icon (512x512) saved to: ${result.outputImage}`);
      if (result.agcImage) {
        console.log(`AGC icon (216x216) saved to: ${result.agcImage}`);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

program.parse();
