#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import yargs from "yargs";
import { createCanvas } from "canvas";

/**
 * Calculate π using the Leibniz series approximation.
 * @param {number} digits - Total significant digits (integer ≥ 1).
 * @returns {string} π approximation as a string truncated to the requested digits.
 */
function calculatePiLeibniz(digits) {
  const decimalPlaces = digits - 1;
  const terms = digits * 10000;
  let sum = 0;
  for (let k = 0; k < terms; k++) {
    sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
  }
  const piApprox = 4 * sum;
  return piApprox.toFixed(decimalPlaces);
}

/**
 * Spigot algorithm placeholder (alias to Leibniz).
 * @param {number} digits - Total significant digits.
 * @returns {string} π approximation.
 */
function calculatePiSpigot(digits) {
  // Placeholder: alias to Leibniz implementation
  return calculatePiLeibniz(digits);
}

/**
 * Monte Carlo approximation placeholder (alias to Leibniz).
 * @param {number} digits - Total significant digits.
 * @returns {string} π approximation.
 */
function calculatePiMontecarlo(digits) {
  // Placeholder: alias to Leibniz implementation
  return calculatePiLeibniz(digits);
}

/**
 * Dispatch π calculation based on algorithm.
 * @param {number} digits - Total significant digits.
 * @param {string} algorithm - 'leibniz', 'spigot', or 'montecarlo'.
 * @returns {string} π approximation.
 */
export function calculatePi(digits, algorithm = "leibniz") {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new Error("Digits must be a positive integer");
  }
  switch (algorithm) {
    case "leibniz":
      return calculatePiLeibniz(digits);
    case "spigot":
      return calculatePiSpigot(digits);
    case "montecarlo":
      return calculatePiMontecarlo(digits);
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Render π digits as PNG image and write to file.
 * @param {string} piString - π digits string.
 * @param {string} outputPath - Output file path.
 */
function outputPng(piString, outputPath) {
  const fontSize = 20;
  const margin = 10;
  const width = Math.ceil(piString.length * (fontSize * 0.6) + margin * 2);
  const height = Math.ceil(fontSize * 1.5 + margin * 2);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.font = `${fontSize}px Courier`;
  ctx.textBaseline = "top";
  ctx.fillText(piString, margin, margin);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
}

/**
 * CLI entrypoint: parse flags and output π.
 */
export function main(cliArgs) {
  const parser = yargs(cliArgs)
    .exitProcess(false)
    .scriptName("pi")
    .usage("Usage: $0 [options]")
    .option("digits", {
      alias: "d",
      type: "number",
      describe: "Total significant digits to display (integer ≥ 1)",
      default: 100,
    })
    .option("algorithm", {
      alias: "a",
      type: "string",
      describe: "Algorithm to use for π approximation",
      default: "leibniz",
    })
    .option("benchmark", {
      alias: "b",
      type: "boolean",
      describe: "Enable performance benchmarking",
      default: false,
    })
    .option("output-format", {
      alias: "f",
      type: "string",
      describe: "Output format",
      default: "text",
    })
    .option("output", {
      alias: "o",
      type: "string",
      describe: "Output file for PNG format",
      default: "pi.png",
    })
    .help("help")
    .alias("help", "h");

  const argv = parser.argv;

  const digits = argv.digits;
  const algorithm = argv.algorithm;
  const benchmark = argv.benchmark;
  const outputFormat = argv["output-format"];
  const output = argv.output;

  const startTime = benchmark ? Date.now() : null;
  const piString = calculatePi(digits, algorithm);

  if (benchmark) {
    const duration = Date.now() - startTime;
    console.log(`[Benchmark] Execution time: ${duration}ms ${piString}`);
    return;
  }

  if (outputFormat === "text") {
    console.log(piString);
  } else if (outputFormat === "png") {
    outputPng(piString, output);
  } else {
    throw new Error(`Unsupported format: ${outputFormat}`);
  }
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
