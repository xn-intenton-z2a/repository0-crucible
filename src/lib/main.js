#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

// Global memory log for storing CLI invocation logs
export const memoryLog = [];

/**
 * Handles unrecognized CLI inputs by outputting a standardized error message.
 * This function ensures that any input not matching recognized commands is reported
 * in a consistent manner to aid in debugging and user guidance.
 * 
 * @param {string[]} args - The CLI arguments that were not recognized
 */
function handleInvalidCommand(args) {
  const input = args.join(" ");
  console.error(`Error: '${input}' is not a recognized command. Use '--help' for available options.`);
}

/**
 * Displays the help information for the CLI tool.
 */
function displayHelp() {
  console.log(
    `Usage: node src/lib/main.js [options]\n\nOptions:\n  --help                Display help information about the CLI tool.\n  --version             Display the current application version from package.json.\n  --diagnostics         Show Node and environment diagnostic information.\n  --extended-diagnostics Display detailed diagnostics including memory usage, uptime, and platform info.\n  --self-refine         Perform self-refinement analysis.\n  --serve               Start the server.\n  --build-intermediate  Build with intermediate options.\n  --build-enhanced      Build with enhanced options.\n  --refresh             Refresh the application state.\n  --merge-persist       Merge and persist changes.\n  --echo                Output the remaining arguments in JSON format.\n  --memory              Display the in-memory log of CLI invocations.\n  --help-seeking        Activate help-seeking mode to consult external assistance.\n`
  );
}

/**
 * Displays the version from package.json.
 */
async function displayVersion() {
  try {
    const pkg = await import("../../package.json", { assert: { type: "json" } });
    const version = (pkg.default && pkg.default.version) ? pkg.default.version : pkg.version;
    console.log(version);
  } catch (err) {
    console.error("Error loading version:", err);
  }
}

/**
 * Displays diagnostics information.
 */
function displayDiagnostics() {
  console.log("Diagnostics:");
  console.log("Node Version:", process.version);
  console.log("Executable Path:", process.execPath);
  console.log("Current Working Directory:", process.cwd());
  console.log("Environment Variables:", process.env);
}

/**
 * Displays extended diagnostics information.
 */
function displayExtendedDiagnostics() {
  console.log("Extended Diagnostics:");
  console.log("Memory Usage:", process.memoryUsage());
  console.log("Process Uptime:", process.uptime());
  console.log("Process Platform:", process.platform);
}

/**
 * Performs self-refinement analysis.
 */
function selfRefine() {
  console.log("Performing self-refinement analysis...");
}

/**
 * Refreshes the application state.
 */
function refreshState() {
  console.log("Refreshing application state...");
}

/**
 * Merges and persists changes.
 */
function mergePersist() {
  console.log("Merging and persisting changes...");
}

/**
 * Starts the server.
 */
function serve() {
  console.log("Starting server...");
}

/**
 * Builds with intermediate options.
 */
function buildIntermediate() {
  console.log("Building with intermediate options...");
}

/**
 * Builds with enhanced options.
 */
function buildEnhanced() {
  console.log("Building with enhanced options...");
}

/**
 * Echoes the provided arguments in JSON format, excluding the '--echo' flag.
 * 
 * @param {string[]} args 
 */
function echoArgs(args) {
  const filtered = args.filter(arg => arg !== "--echo");
  console.log(JSON.stringify({ echo: filtered }));
}

/**
 * Displays the in-memory log of CLI invocations.
 */
function displayMemory() {
  console.log("Memory Log:" + JSON.stringify(memoryLog, null, 2));
}

/**
 * Activates help-seeking mode.
 */
function helpSeeking() {
  console.log("Help-Seeking activated: consulting external assistance...");
}

/**
 * Main entry point for the CLI tool.
 * Logs each CLI invocation with a timestamp and processes various flags.
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

  // Dispatch table mapping CLI flags to their handler functions
  const commandHandlers = [
    { flag: "--help", handler: () => { displayHelp(); } },
    { flag: "--version", handler: () => displayVersion() },
    { flag: "--diagnostics", handler: () => { displayDiagnostics(); } },
    { flag: "--extended-diagnostics", handler: () => { displayExtendedDiagnostics(); } },
    { flag: "--self-refine", handler: () => { selfRefine(); } },
    { flag: "--refresh", handler: () => { refreshState(); } },
    { flag: "--merge-persist", handler: () => { mergePersist(); } },
    { flag: "--serve", handler: () => { serve(); } },
    { flag: "--build-intermediate", handler: () => { buildIntermediate(); } },
    { flag: "--build-enhanced", handler: () => { buildEnhanced(); } },
    { flag: "--echo", handler: () => { echoArgs(args); } },
    { flag: "--memory", handler: () => { displayMemory(); } },
    { flag: "--help-seeking", handler: () => { helpSeeking(); } }
  ];

  // Process commands based on the first matching flag (priority order)
  for (const { flag, handler } of commandHandlers) {
    if (args.includes(flag)) {
      await handler();
      return;
    }
  }

  // If none of the recognized commands are found, handle as unrecognized command
  handleInvalidCommand(args);
}

// If the file is executed directly, run the main function with CLI arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
