#!/usr/bin/env node
// src/lib/main.js

import Decimal from 'decimal.js';
import process from 'process';
import { fileURLToPath } from 'url';

/**
 * Calculate π to the given number of decimal places using a specified algorithm.
 * @param {number} digits - Number of decimal places (1 to 1e6).
 * @param {string} algorithm - "machin" or "gauss-legendre".
 * @returns {Decimal} Decimal instance representing π.
 */
export function calculatePi(digits = 100, algorithm = 'machin') {
  if (!Number.isInteger(digits) || digits < 1 || digits > 1e6) {
    throw new Error(`Invalid digits '${digits}'. Must be integer between 1 and 1000000.`);
  }
  if (!['machin', 'gauss-legendre'].includes(algorithm)) {
    throw new Error(`Invalid algorithm '${algorithm}'. Must be 'machin' or 'gauss-legendre'.`);
  }
  // Set precision with a small safety margin and truncate (round down) results
  Decimal.set({ precision: digits + 5, rounding: Decimal.ROUND_DOWN });

  if (algorithm === 'machin') {
    const arctan = (x) => {
      let sum = new Decimal(0);
      let term = new Decimal(x);
      let k = 0;
      const xDec = new Decimal(x);
      const tol = new Decimal(`1e-${digits + 2}`);
      while (term.abs().gt(tol)) {
        const denom = new Decimal(2 * k + 1);
        const current = term.dividedBy(denom);
        sum = k % 2 === 0 ? sum.plus(current) : sum.minus(current);
        k += 1;
        term = term.times(xDec).times(xDec);
      }
      return sum;
    };
    const a1 = arctan(new Decimal(1).dividedBy(5));
    const a2 = arctan(new Decimal(1).dividedBy(239));
    // π = 4 * (4*arctan(1/5) - arctan(1/239))
    return a1.times(4).minus(a2).times(4);
  }

  // Gauss-Legendre algorithm
  let a = new Decimal(1);
  let b = new Decimal(1).dividedBy(Decimal.sqrt(new Decimal(2)));
  let t = new Decimal(1).dividedBy(4);
  let p = new Decimal(1);
  const tol = new Decimal(`1e-${digits + 2}`);
  while (a.minus(b).abs().gt(tol)) {
    const aNext = a.plus(b).dividedBy(2);
    const bNext = Decimal.sqrt(a.times(b));
    const diff = a.minus(aNext);
    const tNext = t.minus(p.times(diff.times(diff)));
    const pNext = p.times(2);
    a = aNext;
    b = bNext;
    t = tNext;
    p = pNext;
  }
  return a.plus(b).times(a.plus(b)).dividedBy(t.times(4));
}

/**
 * Command-line interface entry point.
 * @param {string[]} [inputArgs] - Arguments (defaults to process.argv.slice(2)).
 */
export async function main(inputArgs = process.argv.slice(2)) {
  let digits = 100;
  let algorithm = 'machin';
  const usage = [
    'Usage: node src/lib/main.js [--digits <n>] [--algorithm <machin|gauss-legendre>]',
    '',
    'Options:',
    '  --digits <n>        Number of decimal places (1 to 1000000). Default: 100',
    "  --algorithm <a>    'machin' or 'gauss-legendre'. Default: machin",
    '  --help              Show this help message',
  ].join('\n');

  for (let i = 0; i < inputArgs.length; i++) {
    const arg = inputArgs[i];
    if (arg === '--help') {
      console.log(usage);
      process.exit(0);
    }
    if (arg === '--digits') {
      i += 1;
      digits = Number(inputArgs[i]);
      continue;
    }
    if (arg === '--algorithm') {
      i += 1;
      algorithm = inputArgs[i];
      continue;
    }
    console.error(`Unknown option '${arg}'`);
    console.error(usage);
    process.exit(1);
  }

  try {
    const pi = calculatePi(digits, algorithm);
    // Truncate when printing
    console.log(pi.toFixed(digits, Decimal.ROUND_DOWN));
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
