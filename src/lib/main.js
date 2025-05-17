#!/usr/bin/env node
// src/lib/main.js

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Entry point for the CLI tool.
 * @param {string[]} args - Command-line arguments.
 */
export async function main(args = []) {
  // Handle --mission or shorthand -m to display repository mission
  if (args.includes('--mission') || args.includes('-m')) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Mission file is located at project root
    const missionPath = path.resolve(__dirname, '../../MISSION.md');
    try {
      const content = await readFile(missionPath, 'utf-8');
      console.log(content);
    } catch (err) {
      console.error(`Error reading mission: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  // Default behavior: echo provided arguments
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// If invoked directly, parse CLI arguments and run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  // Don't await here to allow top-level invocation flexibility
  main(args);
}
