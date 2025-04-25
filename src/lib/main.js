#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

// Supported flags
const supportedFlags = ["--help", "--version", "--agentic", "--dry-run", "--diagnostics", "--capital-cities"];

// Initialize global counter for agentic calls
globalThis.callCount = globalThis.callCount || 0;

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
    console.log("Version: 1.2.0-0");
    return;
  }

  // Validate each argument
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    // Only check for flags that start with '--'
    if (arg.startsWith("--")) {
      // If the flag is not recognized and is not a value for a flag, throw error
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

  // Process the --agentic flag if present
  if (args.includes("--agentic")) {
    const index = args.indexOf("--agentic");
    const payloadStr = args[index + 1];
    try {
      const payload = JSON.parse(payloadStr);
      // Validate payload structure: should have either a 'command' (string) or 'commands' (array of strings)
      const validCommand = payload.hasOwnProperty('command') && typeof payload.command === 'string';
      const validCommands = payload.hasOwnProperty('commands') && Array.isArray(payload.commands) && payload.commands.every(cmd => typeof cmd === 'string');
      if (!(validCommand || validCommands)) {
        console.error("Error: Invalid JSON structure for --agentic flag. Must contain a 'command' string or 'commands' array.\n");
        console.log(helpMessage());
        return;
      }
      const isDryRun = args.includes("--dry-run");
      agenticHandler(payload, isDryRun);
      return;
    } catch (e) {
      console.error("Error: Invalid JSON provided for --agentic flag.\n");
      console.log(helpMessage());
      return;
    }
  }

  // Process other valid flags (e.g., --dry-run, --diagnostics, --capital-cities)
  const activeFlags = args.filter((arg) => supportedFlags.includes(arg));
  if (activeFlags.length > 0) {
    console.log(`Processing flags: ${JSON.stringify(activeFlags)}`);
    return;
  }

  // If no known flag triggers special behavior, output the default message
  console.log(`Run with: ${JSON.stringify(args)}`);
}

function helpMessage() {
  return `Usage: node src/lib/main.js [options]\n\nOptions:\n  --help             Show this help message and exit.\n  --version          Show version information.\n  --agentic <data>   Execute agentic commands with provided JSON data.\n                     The JSON must contain either a 'command' (string) or 'commands' (array of strings).\n  --dry-run          Simulate command execution without making changes.\n  --diagnostics      Display diagnostic information.\n  --capital-cities   Display a list of capital cities from the ontology.\n\nExamples:\n  node src/lib/main.js --help\n  node src/lib/main.js --version\n  node src/lib/main.js --agentic '{"command": "doSomething"}'\n  node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'\n  node src/lib/main.js --agentic '{"command": "doSomething"}' --dry-run\n  node src/lib/main.js --dry-run\n`;
}

function agenticHandler(payload, isDryRun) {
  // Increment global counter
  globalThis.callCount++;
  if (payload.command) {
    let message = `Agentic command executed: ${payload.command}`;
    if (isDryRun) {
      message = `Dry run: ${message}`;
    }
    console.log(message);
  } else if (payload.commands) {
    payload.commands.forEach(command => {
      let message = `Agentic command executed: ${command}`;
      if (isDryRun) {
        message = `Dry run: ${message}`;
      }
      console.log(message);
    });
  }
}

// If the script is run directly, pass command line arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
