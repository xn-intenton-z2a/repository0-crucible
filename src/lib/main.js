#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

/**
 * Calculate PI to a specified number of decimal places using a Machin-like formula.
 * @param {number} digits - Number of decimal places (1 to 1000)
 * @returns {string} PI as a string with the specified decimal places
 */
export function calculatePi(digits) {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new Error("Digits must be an integer >= 1");
  }
  const MAX_DIGITS = 1000;
  if (digits > MAX_DIGITS) {
    throw new Error(`Maximum digits is ${MAX_DIGITS}`);
  }

  const extra = 10; // extra digits for rounding
  const bigTen = BigInt(10);
  const scale = bigTen ** BigInt(digits + extra);

  function arctan(invX) {
    const inv = BigInt(invX);
    const invSq = inv * inv;
    let term = scale / inv;
    let sum = term;
    let k = 1n;
    while (term !== 0n) {
      term = term / invSq;
      const denom = 2n * k + 1n;
      const delta = term / denom;
      sum = k % 2n === 1n ? sum - delta : sum + delta;
      k++;
    }
    return sum;
  }

  // Machin-like formula: PI = 4*(4*arctan(1/5) - arctan(1/239))
  const piExtra = (arctan(5) * 4n - arctan(239)) * 4n;
  // Round: add half of the extra scale
  const roundTerm = bigTen ** BigInt(extra - 1);
  const piRoundedExtra = piExtra + roundTerm;
  // Scale down to desired digits
  const piScaled = piRoundedExtra / (bigTen ** BigInt(extra));

  const scaleDigits = bigTen ** BigInt(digits);
  const intPart = piScaled / scaleDigits;
  const decPart = piScaled % scaleDigits;
  const decStr = decPart.toString().padStart(digits, "0");
  return `${intPart.toString()}.${decStr}`;
}

/**
 * CLI entry point for computing PI
 * @param {string[]} [args] - Command line arguments (optional)
 */
export function main(args) {
  const argv = args || process.argv.slice(2);
  const showHelp = () => {
    console.log("Usage: node src/lib/main.js [--digits <n>] [--help]");
    console.log("Compute PI to <n> decimal places (default 10, max 1000)");
  };

  let digits = 10;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--digits") {
      const val = argv[i + 1];
      if (!val || isNaN(Number(val))) {
        console.error("Error: --digits requires a number");
        process.exit(1);
      }
      digits = Number(val);
      i++;
    } else if (arg === "--help" || arg === "-h") {
      showHelp();
      process.exit(0);
    }
  }

  try {
    const piValue = calculatePi(digits);
    console.log(piValue);
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
