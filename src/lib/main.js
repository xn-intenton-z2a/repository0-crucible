#!/usr/bin/env node
import process from "process";

// Supported data source URLs
const supportedDataSources = [
  // Add supported URLs here
  "https://restcountries.com/v3.1/all"
];

/**
 * Get the list of supported data source URLs.
 * @returns {string[]}
 */
export function getSupportedDataSources() {
  return supportedDataSources;
}

/**
 * Fetch JSON data from a supported data source URL.
 * @param {string} url
 * @returns {Promise<any>}
 * @throws {Error} If the URL is not supported or fetch fails
 */
export async function fetchSource(url) {
  if (!supportedDataSources.includes(url)) {
    throw new Error(`Unsupported data source: ${url}`);
  }
  const response = await fetch(url);
  return await response.json();
}

/**
 * Main entry point for the CLI.
 * @param {string[]} args
 */
export async function main(args) {
  const fetchIndex = args.indexOf("--fetch-source");
  if (fetchIndex !== -1) {
    const url = args[fetchIndex + 1];
    if (!url) {
      console.error("Error: URL is required for --fetch-source");
      process.exit(1);
      return;
    }
    if (!supportedDataSources.includes(url)) {
      console.error(`Error: Unsupported data source: ${url}`);
      process.exit(1);
      return;
    }
    try {
      const data = await fetchSource(url);
      console.log(JSON.stringify(data, null, 2));
      process.exit(0);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }
  // Default behavior
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (import.meta.main) {
  main(process.argv.slice(2));
}
