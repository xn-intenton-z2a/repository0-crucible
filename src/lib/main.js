#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

/**
 * Stub core generation function for demo purposes.
 */
export function generateFacesCore(options) {
  // Return options as dummy payload for demo
  return options;
}

/**
 * Run the interactive demo showcasing core features.
 */
export function runDemo() {
  console.log("=== Interactive Demo ===");
  const seeded = generateFacesCore({ count: 3, category: "all", seed: 42 });
  console.log(JSON.stringify(seeded));
  const unique = generateFacesCore({ count: 3, category: "happy", seed: 7, unique: true });
  console.log(JSON.stringify(unique));
  console.log('To launch HTTP server: node src/lib/main.js --serve');
  console.log('curl "http://localhost:3000/faces?count=2&seed=7"');
  console.log('Response: {"faces":[{"id":1,"face":":)"}]}');
  process.exit(0);
}

/**
 * Main entry point.
 * @param {string[]} args CLI arguments
 */
export function main(args) {
  args = args || [];
  if (args.includes("--demo")) {
    runDemo();
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
