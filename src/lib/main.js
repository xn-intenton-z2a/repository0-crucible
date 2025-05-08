#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import { calculatePi } from './pi.js';
import PImage from 'pureimage';

/**
 * Main entrypoint for CLI.
 * @param {string[]} argv - command line arguments
 */
export async function main(argv = process.argv.slice(2)) {
  let digits = 100;
  let method = 'chudnovsky';
  let format = 'text';
  let output;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--digits') {
      digits = parseInt(argv[++i], 10);
    } else if (arg === '--method') {
      method = argv[++i];
    } else if (arg === '--format') {
      format = argv[++i];
    } else if (arg === '--output') {
      output = argv[++i];
    } else if (arg === '--help') {
      console.log(
        'Usage: node src/lib/main.js [--digits <n>] [--method <chudnovsky|gauss-legendre|machin|nilakantha>] [--format <text|png>] [--output <path>]'
      );
      return;
    } else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }

  if (!Number.isInteger(digits) || digits < 1 || digits > 10000) {
    throw new Error('Invalid --digits. Must be integer between 1 and 10000');
  }
  if (!['chudnovsky', 'gauss-legendre', 'machin', 'nilakantha'].includes(method)) {
    throw new Error('Invalid --method. Must be "chudnovsky", "gauss-legendre", "machin" or "nilakantha"');
  }
  if (!['text', 'png'].includes(format)) {
    throw new Error('Invalid --format. Must be "text" or "png"');
  }
  if (format === 'png' && !output) {
    throw new Error('--output is required when --format=png');
  }

  const piStr = calculatePi(digits, method);
  if (format === 'text') {
    console.log(piStr);
  } else {
    const width = piStr.replace('.', '').length;
    const height = 1;
    const img = PImage.make(width, height);
    await PImage.encodePNGToStream(img, fs.createWriteStream(output));
    console.log(`PNG written to ${output}`);
  }
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
}
