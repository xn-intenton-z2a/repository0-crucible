#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import PImage from 'pureimage';
import { calculatePi, benchmarkPi } from './pi.js';

/**
 * Main entrypoint for CLI.
 * @param {string[]} argv - command line arguments
 */
export async function main(argv = process.argv.slice(2)) {
  let digits = 100;
  let method = 'chudnovsky';
  let format = 'text';
  let output;
  let benchmark = false;
  let benchmarkRuns = 3;
  let benchmarkJson = false;
  let methodSpecified = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--digits') {
      digits = parseInt(argv[++i], 10);
    } else if (arg === '--method') {
      method = argv[++i];
      methodSpecified = true;
    } else if (arg === '--format') {
      format = argv[++i];
    } else if (arg === '--output') {
      output = argv[++i];
    } else if (arg === '--benchmark') {
      benchmark = true;
    } else if (arg === '--benchmark-runs') {
      benchmark = true;
      benchmarkRuns = parseInt(argv[++i], 10);
    } else if (arg === '--benchmark-json') {
      benchmark = true;
      benchmarkJson = true;
    } else if (arg === '--help') {
      console.log(
        'Usage: node src/lib/main.js [--digits <n>] [--method <chudnovsky|gauss-legendre|machin|nilakantha>] [--format <text|png>] [--output <path>] [--benchmark] [--benchmark-runs <n>] [--benchmark-json]'
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

  if (!benchmark) {
    if (!['text', 'png'].includes(format)) {
      throw new Error('Invalid --format. Must be "text" or "png"');
    }
    if (format === 'png' && !output) {
      throw new Error('--output is required when --format=png');
    }
  }

  if (benchmark) {
    if (!Number.isInteger(benchmarkRuns) || benchmarkRuns < 1) {
      throw new Error('Invalid --benchmark-runs. Must be integer >=1');
    }
    const allowedMethods = ['chudnovsky', 'gauss-legendre', 'machin', 'nilakantha'];
    const methodsArr = methodSpecified ? [method] : allowedMethods;
    const results = await benchmarkPi(digits, benchmarkRuns, methodsArr);
    if (benchmarkJson) {
      console.log(JSON.stringify(results));
    } else {
      const header = 'Method | Runs | Avg ms | Min ms | Max ms';
      console.log(header);
      for (const r of results) {
        console.log(
          `${r.method} | ${r.runs} | ${r.averageTimeMs.toFixed(3)} | ${r.minTimeMs.toFixed(3)} | ${r.maxTimeMs.toFixed(3)}`
        );
      }
    }
    return;
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
