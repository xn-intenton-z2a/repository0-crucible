#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

/**
 * Calculate π using the Leibniz series approximation.
 * @param {number} digits - Total significant digits to return (integer ≥ 1).
 * @param {string} algorithm - Algorithm name (only 'leibniz' supported).
 * @returns {string} π approximation as a string truncated to the requested digits.
 */
export function calculatePi(digits, algorithm = "leibniz") {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new Error("Digits must be a positive integer");
  }
  if (algorithm !== "leibniz") {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
  const decimalPlaces = digits - 1;
  // Number of terms to approximate; gentle heuristic for small digit counts
  const terms = digits * 10000;
  let sum = 0;
  for (let k = 0; k < terms; k++) {
    sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
  }
  const piApprox = 4 * sum;
  return piApprox.toFixed(decimalPlaces);
}

/**
 * CLI entrypoint: parse flags and output π.
 * Supported flags:
 *   --digits <number>   total significant digits (default: 10)
 *   --algorithm <name>  'leibniz' only (default: 'leibniz')
 *   --format <text|png> output format (default: 'text')
 *   --help              display usage
 */
export function main(cliArgs) {
  const args = Array.isArray(cliArgs) ? cliArgs : process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help") {
      console.log(
        "Usage: node src/lib/main.js --digits <number> --algorithm <string> --format <text|png>"
      );
      return;
    }
    if (arg === "--digits" && args[i + 1]) {
      parsed.digits = parseInt(args[++i], 10);
    } else if (arg === "--algorithm" && args[i + 1]) {
      parsed.algorithm = args[++i];
    } else if (arg === "--format" && args[i + 1]) {
      parsed.format = args[++i];
    }
  }

  const digits = parsed.digits !== undefined ? parsed.digits : 10;
  const algorithm = parsed.algorithm || "leibniz";
  const format = parsed.format || "text";

  if (format !== "text") {
    throw new Error(`Unsupported format: ${format}`);
  }

  const piString = calculatePi(digits, algorithm);
  console.log(piString);
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
