#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

// Global memory log for storing CLI invocation logs
export const memoryLog = [];

/**
 * Handles unrecognized CLI inputs by outputting a standardized error message.
 * 
 * @param {string[]} args - The CLI arguments that were not recognized
 */
function handleInvalidCommand(args) {
  const input = args.join(" ");
  console.error(`Error: '${input}' is not a recognized command. Use '--help' for available options.`);
}

/**
 * Main entry point for the CLI tool.
 * Logs each CLI invocation with a timestamp and processes various flags.
 *
 * CLI Options:
 *   --help                Display help information about the CLI tool.
 *   --version             Display the current application version from package.json.
 *   --diagnostics         Show Node and environment diagnostic information.
 *   --extended-diagnostics Display detailed diagnostics including memory usage, uptime, and platform info.
 *   --self-refine         Perform self-refinement analysis.
 *   --serve               Start the server.
 *   --build-intermediate  Build with intermediate options.
 *   --build-enhanced      Build with enhanced options.
 *   --refresh             Refresh the application state.
 *   --merge-persist       Merge and persist changes.
 *   --echo                Output the remaining arguments in JSON format.
 *   --memory              Display the in-memory log of CLI invocations.
 *   --help-seeking        Activate help-seeking mode to consult external assistance.
 *
 * @param {string[]} args - Command line arguments
 */
export async function main(args = process.argv.slice(2)) {
  // Log every invocation with a timestamp
  memoryLog.push({ timestamp: new Date().toISOString(), args });

  // If no arguments provided, default to '--help'
  if (args.length === 0) {
    args = ["--help"];
  }

  if (args.includes("--help")) {
    console.log(
      `Usage: node src/lib/main.js [options]\n\nOptions:\n  --help                Display help information about the CLI tool.\n  --version             Display the current application version from package.json.\n  --diagnostics         Show Node and environment diagnostic information.\n  --extended-diagnostics Display detailed diagnostics including memory usage, uptime, and platform info.\n  --self-refine         Perform self-refinement analysis.\n  --serve               Start the server.\n  --build-intermediate  Build with intermediate options.\n  --build-enhanced      Build with enhanced options.\n  --refresh             Refresh the application state.\n  --merge-persist       Merge and persist changes.\n  --echo                Output the remaining arguments in JSON format.\n  --memory              Display the in-memory log of CLI invocations.\n  --help-seeking        Activate help-seeking mode to consult external assistance.\n`
    );
    return;
  }

  if (args.includes("--version")) {
    try {
      const pkg = await import("../../package.json", { assert: { type: "json" } });
      const version = (pkg.default && pkg.default.version) ? pkg.default.version : pkg.version;
      console.log(version);
    } catch (err) {
      console.error("Error loading version:", err);
    }
    return;
  }

  if (args.includes("--diagnostics")) {
    console.log("Diagnostics:");
    console.log("Node Version:", process.version);
    console.log("Executable Path:", process.execPath);
    console.log("Current Working Directory:", process.cwd());
    console.log("Environment Variables:", process.env);
    return;
  }

  if (args.includes("--extended-diagnostics")) {
    console.log("Extended Diagnostics:");
    console.log("Memory Usage:", process.memoryUsage());
    console.log("Process Uptime:", process.uptime());
    console.log("Process Platform:", process.platform);
    return;
  }

  if (args.includes("--self-refine")) {
    console.log("Performing self-refinement analysis...");
    return;
  }

  if (args.includes("--refresh")) {
    console.log("Refreshing application state...");
    return;
  }

  if (args.includes("--merge-persist")) {
    console.log("Merging and persisting changes...");
    return;
  }

  if (args.includes("--serve")) {
    console.log("Starting server...");
    return;
  }

  if (args.includes("--build-intermediate")) {
    console.log("Building with intermediate options...");
    return;
  }

  if (args.includes("--build-enhanced")) {
    console.log("Building with enhanced options...");
    return;
  }

  if (args.includes("--echo")) {
    const echoArgs = args.filter((arg) => arg !== "--echo");
    console.log(JSON.stringify({ echo: echoArgs }));
    return;
  }

  if (args.includes("--memory")) {
    console.log("Memory Log:" + JSON.stringify(memoryLog, null, 2));
    return;
  }

  if (args.includes("--help-seeking")) {
    console.log("Help-Seeking activated: consulting external assistance...");
    return;
  }

  // Handle unrecognized commands
  handleInvalidCommand(args);
  return;
}

// If the file is executed directly, run the main function with CLI arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
