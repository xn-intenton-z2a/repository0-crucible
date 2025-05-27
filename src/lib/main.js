#!/usr/bin/env node
import { fileURLToPath } from "url";

/**
 * List of supported public data source URLs.
 * @type {string[]}
 */
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
 * Fetches JSON data from a supported public data source URL.
 * @param {string} url
 * @returns {Promise<any>}
 * @throws {Error} if the URL is not supported
 */
export async function fetchSource(url) {
  if (!supportedDataSources.includes(url)) {
    throw new Error(`Unsupported data source: ${url}`);
  }
  const response = await fetch(url);
  return response.json();
}

/**
 * Entry point for the CLI and API.
 * @param {string[]} args
 */
export async function main(args = []) {
  // Handle --list-sources flag
  if (args.includes("--list-sources")) {
    console.log(JSON.stringify(supportedDataSources, null, 2));
    process.exit(0);
  }

  // Handle --fetch-source flag
  const idx = args.indexOf("--fetch-source");
  if (idx !== -1) {
    const url = args[idx + 1];
    if (!url) {
      console.error("Error: URL is required for --fetch-source");
      process.exit(1);
    }
    if (!supportedDataSources.includes(url)) {
      console.error(`Error: Unsupported data source: ${url}`);
      process.exit(1);
    }
    try {
      const data = await fetchSource(url);
      console.log(JSON.stringify(data, null, 2));
      process.exit(0);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }

  // Default behavior
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}