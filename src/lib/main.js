#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

// Supported flags
const supportedFlags = [
  "--help",
  "--version",
  "--agentic",
  "--dry-run",
  "--diagnostics",
  "--capital-cities"
];

export function main(args) {
  // If args not provided, default to process.argv.slice(2)
  if (!args) {
    args = process.argv.slice(2);
  }

  // If no arguments, just log the args (default behavior)
  if (args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  // If --help is provided, show help message and exit
  if (args.includes("--help")) {
    console.log(helpMessage());
    return;
  }

  // If --version is provided, show version and exit
  if (args.includes("--version")) {
    // Version can be dynamically imported if needed, here hardcoded from package.json version
    console.log("Version: 1.2.0-0");
    return;
  }

  // Validate each argument
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    // Only check for flags that start with '--'
    if (arg.startsWith("--")) {
      // If the flag is not recognized and is not a value for a flag (like the value after --agentic), throw error
      if (!supportedFlags.includes(arg)) {
        console.error(`Error: Unknown flag '${arg}'.\n`);
        console.log(helpMessage());
        return;
      }
      // For flags that require a value, check existence
      if (arg === "--agentic") {
        // Check if next argument exists and is not a flag
        if (i + 1 >= args.length || args[i + 1].startsWith("--")) {
          console.error("Error: Missing value for flag '--agentic'.\n");
          console.log(helpMessage());
          return;
        }
      }
    }
  }

  // Process valid flags (this is a placeholder for actual functionality)
  // For demonstration, if --dry-run or --diagnostics or --capital-cities is provided, just log the recognized flags
  const activeFlags = args.filter(arg => supportedFlags.includes(arg));
  if (activeFlags.length > 0) {
    console.log(`Processing flags: ${JSON.stringify(activeFlags)}`);
    return;
  }

  // If no known flag triggers special behavior, output the default message
  console.log(`Run with: ${JSON.stringify(args)}`);
}

function helpMessage() {
  return `Usage: node src/lib/main.js [options]\n\nOptions:\n  --help             Show this help message and exit.\n  --version          Show version information.\n  --agentic <data>   Execute agentic commands with provided JSON data.\n  --dry-run          Simulate command execution without making changes.\n  --diagnostics      Display diagnostic information.\n  --capital-cities   Display a list of capital cities from the ontology.\n\nExamples:\n  node src/lib/main.js --help\n  node src/lib/main.js --version\n  node src/lib/main.js --agentic '{"command": "doSomething"}'\n  node src/lib/main.js --dry-run\n`;
}

// If the script is run directly, pass command line arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
