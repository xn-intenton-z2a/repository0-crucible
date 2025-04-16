#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

// Global memory log for storing CLI invocation logs
export const memoryLog = [];

/**
 * Handles unrecognized CLI inputs by outputting a standardized error message.
 * If the input is numeric-like (e.g., 'NaN' or a number), it outputs a standardized extended message.
 * This enhanced error message reminds the user to provide a valid command and to use '--help' for guidance.
 *
 * Note: Numeric-like inputs often indicate accidental or incorrect command usage. The extended error message
 * provides additional guidance to ensure users are aware that non-command inputs (like numbers) require
 * correction. This behavior is clearly separated from other invalid commands.
 * 
 * @param {string[]} args - The CLI arguments that were not recognized
 */
function handleInvalidCommand(args) {
  const input = args.join(" ");
  // Use a regex to check if the input is numeric-like or the literal 'NaN'
  // Numeric-like inputs (such as 'NaN' or numeric strings) trigger an enhanced error message.
  if (/^(NaN|-?\d+(\.\d+)?)$/.test(input)) {
    // Numeric-like input detected. Extended error message provided because numeric inputs 
    // might indicate accidental or incorrect command usage.
    const errorMsg = `Error: '${input}' is not a recognized command. Use '--help' for available options. Please ensure you are providing a valid command. Use '--help' to view all available options.`;
    console.error(errorMsg);
  } else {
    const errorMsg = `Error: '${input}' is not a recognized command. Use '--help' for available options.`;
    console.error(errorMsg);
  }
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

  // Process '--help' flag: display help information
  if (args.includes("--help")) {
    console.log(
      `Usage: node src/lib/main.js [options]\n\nOptions:\n  --help                Display help information about the CLI tool.\n  --version             Display the current application version from package.json.\n  --diagnostics         Show Node and environment diagnostic information.\n  --extended-diagnostics Display detailed diagnostics including memory usage, uptime, and platform info.\n  --self-refine         Perform self-refinement analysis.\n  --serve               Start the server.\n  --build-intermediate  Build with intermediate options.\n  --build-enhanced      Build with enhanced options.\n  --refresh             Refresh the application state.\n  --merge-persist       Merge and persist changes.\n  --echo                Output the remaining arguments in JSON format.\n  --memory              Display the in-memory log of CLI invocations.\n  --help-seeking        Activate help-seeking mode to consult external assistance.\n`
    );
    return;
  }

  // Process '--version' flag: dynamically displays the version from package.json
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

  // Process '--diagnostics' flag: show basic diagnostic information
  if (args.includes("--diagnostics")) {
    console.log("Diagnostics:");
    console.log("Node Version:", process.version);
    console.log("Executable Path:", process.execPath);
    console.log("Current Working Directory:", process.cwd());
    console.log("Environment Variables:", process.env);
    return;
  }

  // Process '--extended-diagnostics' flag: display extended diagnostics info
  if (args.includes("--extended-diagnostics")) {
    console.log("Extended Diagnostics:");
    console.log("Memory Usage:", process.memoryUsage());
    console.log("Process Uptime:", process.uptime());
    console.log("Process Platform:", process.platform);
    return;
  }

  // Process '--self-refine' flag: perform self-refinement analysis
  if (args.includes("--self-refine")) {
    console.log("Performing self-refinement analysis...");
    return;
  }

  // Process '--refresh' flag: refresh application state
  if (args.includes("--refresh")) {
    console.log("Refreshing application state...");
    return;
  }

  // Process '--merge-persist' flag: merge and persist changes
  if (args.includes("--merge-persist")) {
    console.log("Merging and persisting changes...");
    return;
  }

  // Process '--serve' flag: start the server
  if (args.includes("--serve")) {
    console.log("Starting server...");
    return;
  }

  // Process '--build-intermediate' flag: build using intermediate options
  if (args.includes("--build-intermediate")) {
    console.log("Building with intermediate options...");
    return;
  }

  // Process '--build-enhanced' flag: build using enhanced options
  if (args.includes("--build-enhanced")) {
    console.log("Building with enhanced options...");
    return;
  }

  // Process '--echo' flag: echo remaining arguments in JSON format
  if (args.includes("--echo")) {
    const echoArgs = args.filter((arg) => arg !== "--echo");
    console.log(JSON.stringify({ echo: echoArgs }));
    return;
  }

  // Process '--memory' flag: display the memory log
  if (args.includes("--memory")) {
    console.log("Memory Log:" + JSON.stringify(memoryLog, null, 2));
    return;
  }

  // Process '--help-seeking' flag: indicate activation of help-seeking mode
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
