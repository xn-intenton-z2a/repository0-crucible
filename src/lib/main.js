#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export const supportedDataSources = [
  "https://api.worldbank.org/v2/country",
  "https://restcountries.com/v3.1/all",
];

/**
 * Returns the list of supported public data source URLs.
 * @returns {string[]}
 */
export function getSupportedDataSources() {
  return supportedDataSources;
}

/**
 * Entry point for the CLI and API.
 * @param {string[]} args
 */
export function main(args = []) {
  if (args.includes("--list-sources")) {
    console.log(JSON.stringify(supportedDataSources, null, 2));
    process.exit(0);
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
