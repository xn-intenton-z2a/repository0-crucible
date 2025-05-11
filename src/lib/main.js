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
 * Calculate π using Monte Carlo sampling.
 * @param {number} samples - Number of random samples.
 * @returns {number} π approximated using sampling.
 */
export function calculatePiMonteCarlo(samples) {
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return (inside / samples) * 4;
}

/**
 * Main CLI entrypoint.
 * @param {string[]} args - Command-line arguments.
 */
export function main(args = process.argv.slice(2)) {
  const options = minimist(args, {
    boolean: ["diagnostics"],
    string: ["algorithm"],
    default: { digits: 5, algorithm: "leibniz", samples: 100000, diagnostics: false },
  });
  const digits = Number(options.digits);
  const algorithm = options.algorithm.toLowerCase();
  const diagnostics = options.diagnostics === true;

  const startTime = Date.now();
  let piValue;
  let iterations;
  let samplesUsed;

  if (algorithm === "leibniz") {
    iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
    piValue = calculatePiLeibniz(digits);
  } else if (algorithm === "montecarlo") {
    samplesUsed = Number(options.samples);
    piValue = calculatePiMonteCarlo(samplesUsed);
  } else {
    console.error(`Unsupported algorithm: ${options.algorithm}`);
    process.exit(1);
  }
  const endTime = Date.now();
  const durationMs = endTime - startTime;

  if (diagnostics) {
    const diagnosticsOutput = {
      algorithm,
      ...(algorithm === "leibniz" ? { digits } : { samples: samplesUsed }),
      result: piValue,
      durationMs,
      ...(algorithm === "leibniz" ? { iterations } : { samplesUsed }),
    };
    console.log(diagnosticsOutput);
  } else {
    console.log(piValue);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
