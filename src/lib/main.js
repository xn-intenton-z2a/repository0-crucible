#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import minimist from "minimist";

/**
 * Calculate π using the Leibniz series to the specified number of decimal places.
 * @param {number} digits - Number of decimal places.
 * @returns {number} π approximated to the given precision.
 */
export function calculatePiLeibniz(digits) {
  const maxIters = Math.min(Math.pow(10, digits) * 20, 1e7);
  let sum = 0;
  for (let k = 0; k < maxIters; k++) {
    sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
  }
  return Number((4 * sum).toFixed(digits));
}

/**
 * Main CLI entrypoint.
 * @param {string[]} args - Command-line arguments.
 */
export function main(args = process.argv.slice(2)) {
  const options = minimist(args, {
    string: ["algorithm"],
    default: { digits: 5, algorithm: "leibniz" },
  });
  const digits = Number(options.digits);
  const algorithm = options.algorithm.toLowerCase();

  let piValue;
  if (algorithm === "leibniz") {
    piValue = calculatePiLeibniz(digits);
  } else {
    console.error(`Unsupported algorithm: ${options.algorithm}`);
    process.exit(1);
  }
  console.log(piValue);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
