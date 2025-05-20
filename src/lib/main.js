#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import Decimal from "decimal.js";

/**
 * Compute π to the specified number of decimal places using a Machin-like formula.
 * @param {number} digits - Positive integer number of decimal places.
 * @returns {string} π to the given precision.
 */
export function computePi(digits) {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new Error("Digits must be a positive integer");
  }
  // extra precision to reduce rounding errors
  const extra = 5;
  Decimal.set({ precision: digits + extra, rounding: Decimal.ROUND_HALF_UP });
  const one = new Decimal(1);
  const x2Cache = {};

  function arctanInverse(n) {
    const x = one.dividedBy(n);
    const x2 = x.times(x);
    let term = x;
    let sum = term;
    const cutoff = new Decimal(10).pow(-digits - extra);
    let k = 0;
    while (true) {
      k += 1;
      // term_{k} = -term_{k-1} * x^2 * (2k-1)/(2k+1)
      term = term.times(x2.negated()).times((2 * k - 1) / (2 * k + 1));
      if (term.abs().lt(cutoff)) {
        break;
      }
      sum = sum.plus(term);
    }
    return sum;
  }
  // Machin-like formula: π = 4 * (4*arctan(1/5) - arctan(1/239))
  const ar5 = arctanInverse(5);
  const ar239 = arctanInverse(239);
  const pi = new Decimal(4)
    .times(ar5.times(4).minus(ar239))
    .times(4);
  return pi.toFixed(digits);
}

/**
 * Main CLI entry point.
 * @param {string[]} args - CLI arguments (optional).
 */
export function main(args = process.argv.slice(2)) {
  const idx = args.indexOf("--compute-pi");
  if (idx !== -1) {
    const digitsStr = args[idx + 1];
    const digits = parseInt(digitsStr, 10);
    if (isNaN(digits) || digits < 1) {
      console.error("Invalid digits for compute-pi. Provide a positive integer.");
      process.exit(1);
    }
    try {
      const result = computePi(digits);
      console.log(result);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    return;
  }
  // default behavior: echo received arguments
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
