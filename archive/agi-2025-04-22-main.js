#!/usr/bin/env node
// src/lib/main.js
// This file is the entrypoint for the CLI application.
// It handles various CLI flags and logs execution details to aid debugging and usage transparency.
//
// Features include:
//  - Help-Seeking Mode: Activates a mode for querying assistance.
//  - Replication Mode: Executes task replication either with default count or a provided count.
//  - Asynchronous Replication Mode: When used with the --replicate-async flag, replication tasks are executed concurrently.
//  - Self-Improvement Mode: Outputs diagnostic metrics computed from the in-memory log, including average, max, min, standard deviation, median execution times and, when verbose, detailed per-invocation metrics. All self-improvement diagnostics are prefixed for consistent formatting.
//  - Planning Mode: Analyzes input for planning tasks.
//  - Goal Decomposition: Provides a breakdown of a goal into numbered sub-tasks.
//  - Reset Log: Clears the in-memory log and the persisted log file for a fresh state.
//  - Persist Log & Persist File: Exports the log in JSON format or writes it to a file respectively.
//  - Version Details: When the --version-details flag is provided, outputs a JSON formatted object containing Node.js version, process.versions object, and appVersion from package.json, then exits immediately.
//  - Filter Log: When the --filter-log flag is provided with a query, filters the memory log entries whose args contain the query (case-insensitive) and outputs the result as JSON, then exits immediately.

import { fileURLToPath } from "url";
import { performance } from "perf_hooks";
import fs from "fs";

// Global in-memory log to track each CLI invocation
const memoryLog = [];

// Flag to ensure persistent log is loaded only once per session
let persistentLogLoaded = false;

// Load persisted memory log from 'memory_log.json' at startup if it exists
function loadPersistentLog() {
  if (!persistentLogLoaded && fs.existsSync("memory_log.json")) {
    try {
      const data = fs.readFileSync("memory_log.json", { encoding: "utf8" });
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Merge persisted entries into the in-memory log
        memoryLog.push(...parsed);
      }
    } catch (err) {
      console.error("Failed to load persistent memory log:", err);
    }
    persistentLogLoaded = true;
  }
}

// Helper function to log the CLI arguments in a consistent JSON format
function logCLIArgs(args) {
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// Helper function to log the execution time in milliseconds with fixed format
function logExecutionTime(startTime, endTime) {
  const executionTime = (endTime - startTime).toFixed(2);
  console.log(`Execution time: ${executionTime} ms`);
  return parseFloat(executionTime);
}

// Business logic for replicating tasks with an optional task count parameter
// Purpose: Execute a series of replication tasks using a provided count or default to 3 if none valid is provided.
// Enhanced: When the --replicate-async flag is provided, the replication tasks are executed concurrently.
async function handleReplication(args) {
  const replicateIndex = args.indexOf("--replicate");
  let count = 3;
  if (replicateIndex !== -1 && args.length > replicateIndex + 1) {
    const potentialCount = parseInt(args[replicateIndex + 1], 10);
    if (!isNaN(potentialCount) && potentialCount > 0) {
      count = potentialCount;
    }
  }
  const isAsync = args.includes("--replicate-async");
  console.log(`Replicating tasks (count: ${count})...`);
  if (isAsync) {
    const tasks = [];
    for (let i = 1; i <= count; i++) {
      tasks.push(
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(`Replicating task ${i}`);
            resolve();
          }, 0);
        }),
      );
    }
    await Promise.all(tasks);
  } else {
    for (let i = 1; i <= count; i++) {
      console.log(`Replicating task ${i}`);
    }
  }
}

// Handles the help-seeking flag by logging the appropriate message
// Purpose: Activate help-seeking mode which signals the tool is ready to query assistance.
function handleHelpSeeking() {
  // Detailed log to indicate help-seeking mode; clarifies user intent.
  console.log("Help-Seeking Mode Enabled: querying assistance...");
}

// Handles the self-improve flag by logging self-improvement diagnostics with detailed metrics
// Purpose: Compute and display diagnostic metrics such as total invocations, average, max, min, standard deviation, and median execution times.
// Preconditions: Requires entries in the in-memory log with execution time metrics.
function handleSelfImprove(args) {
  let totalTime = 0;
  let count = 0;
  let maxTime = 0;
  let minTime = Infinity;
  const times = [];
  // Iterate through the memory log to compute timing metrics
  for (const entry of memoryLog) {
    if (entry.execTime !== undefined) {
      totalTime += entry.execTime;
      count++;
      times.push(entry.execTime);
      if (entry.execTime > maxTime) {
        maxTime = entry.execTime;
      }
      if (entry.execTime < minTime) {
        minTime = entry.execTime;
      }
    }
  }
  const averageNum = count > 0 ? totalTime / count : 0;
  const averageTime = count > 0 ? averageNum.toFixed(2) : "0.00";
  const minTimeFormatted = count > 0 ? minTime.toFixed(2) : "N/A";

  // Calculate standard deviation of execution times
  let sumSquaredDiff = 0;
  for (const entry of memoryLog) {
    if (entry.execTime !== undefined) {
      sumSquaredDiff += Math.pow(entry.execTime - averageNum, 2);
    }
  }
  const variance = count > 0 ? sumSquaredDiff / count : 0;
  const stdDeviation = Math.sqrt(variance).toFixed(2);

  // Calculate median execution time
  let median = 0;
  if (times.length > 0) {
    times.sort((a, b) => a - b);
    if (times.length % 2 === 1) {
      median = times[Math.floor(times.length / 2)];
    } else {
      median = (times[times.length / 2 - 1] + times[times.length / 2]) / 2;
    }
  }
  const medianFormatted = count > 0 ? median.toFixed(2) : "0.00";

  // If --diag-json flag is present, output diagnostics as a single JSON object
  if (args.includes("--diag-json")) {
    const diagnostics = {
      totalInvocations: memoryLog.length,
      firstInvocation: memoryLog.length > 0 ? memoryLog[0].timestamp : "N/A",
      latestInvocation: memoryLog.length > 0 ? memoryLog[memoryLog.length - 1].timestamp : "N/A",
      averageExecutionTime: parseFloat(averageTime),
      maximumExecutionTime: parseFloat(maxTime.toFixed(2)),
      minimumExecutionTime: minTime === Infinity ? "N/A" : parseFloat(minTimeFormatted),
      standardDeviation: parseFloat(stdDeviation),
      medianExecutionTime: parseFloat(medianFormatted),
    };
    console.log(JSON.stringify(diagnostics));
  } else {
    // Log detailed diagnostic metrics for self-improvement with uniform prefix
    console.log("[Self-Improve] Self-Improvement Diagnostics:");
    console.log(`[Self-Improve] Total invocations: ${memoryLog.length}`);
    console.log(`[Self-Improve] First invocation: ${memoryLog.length > 0 ? memoryLog[0].timestamp : "N/A"}`);
    console.log(
      `[Self-Improve] Latest invocation: ${memoryLog.length > 0 ? memoryLog[memoryLog.length - 1].timestamp : "N/A"}`,
    );
    console.log(`[Self-Improve] Average execution time: ${averageTime} ms`);
    console.log(`[Self-Improve] Maximum execution time: ${parseFloat(maxTime.toFixed(2))} ms`);
    console.log(`[Self-Improve] Minimum execution time: ${minTimeFormatted} ms`);
    console.log(`[Self-Improve] Standard deviation execution time: ${stdDeviation} ms`);
    console.log(`[Self-Improve] Median execution time: ${medianFormatted} ms`);
  }
}

// Handles verbose output for self-improvement diagnostics
// Purpose: When --verbose flag is provided, output extended details per memory log entry.
function handleSelfImproveVerbose() {
  console.log("[Self-Improve] Detailed: Detailed Memory Log:");
  memoryLog.forEach((entry, index) => {
    const execTimeStr = entry.execTime !== undefined ? entry.execTime.toFixed(2) + " ms" : "N/A";
    console.log(
      `[Self-Improve] Detailed: Invocation ${index + 1}: args: ${JSON.stringify(entry.args)}, timestamp: ${entry.timestamp}, execution time: ${execTimeStr}`,
    );
  });
}

// Handles the planning flag by logging planning messages
// Purpose: Analyze the provided input and offer a structured plan for upcoming tasks.
function planTasks() {
  console.log("Planning Mode Engaged: Analyzing input for planning...");
  console.log("Planned Task 1: Review current configurations");
  console.log("Planned Task 2: Prioritize upcoming feature enhancements");
}

// Handles the decompose flag to perform goal decomposition with improved formatting
// Purpose: Display a goal decomposition report. If a goal is provided, include it in the header along with a numbered list of sub-tasks.
// Preconditions: The flag may be followed by a goal string; if absent, a default report is displayed.
function handleDecompose(args) {
  const decomposeIndex = args.indexOf("--decompose");
  let goal = "";
  if (
    args.length > decomposeIndex + 1 &&
    !args[decomposeIndex + 1].startsWith("--") &&
    args[decomposeIndex + 1] !== ""
  ) {
    goal = args[decomposeIndex + 1];
  }
  // Log header for goal decomposition with provided goal if available
  if (goal) {
    console.log(`Goal Decomposition Report: ${goal}`);
  } else {
    console.log("Goal Decomposition Report:");
  }
  // Clearly numbered sub-tasks for goal breakdown
  console.log("1. Define objectives");
  console.log("2. Identify key milestones");
  console.log("3. Assign responsibilities");
}

// Resets the in-memory log and clears persisted log file if it exists.
export function resetMemoryLog() {
  memoryLog.length = 0;
  if (fs.existsSync("memory_log.json")) {
    try {
      fs.unlinkSync("memory_log.json");
    } catch (err) {
      console.error("Failed to delete persistent memory log file:", err);
    }
  }
}

// Returns a copy of the current in-memory log
export function getMemoryLog() {
  return [...memoryLog];
}

// Main entry point for the CLI application
export async function main(args) {
  // Check if --version-details flag is present and handle it immediately
  if (args.includes("--version-details")) {
    let pkgVersion = "unknown";
    try {
      const packageData = fs.readFileSync("package.json", { encoding: "utf8" });
      const pkg = JSON.parse(packageData);
      pkgVersion = pkg.version || "unknown";
    } catch (err) {
      // Error reading package.json, default to unknown
    }
    const details = {
      nodeVersion: process.version,
      versions: process.versions,
      appVersion: pkgVersion,
    };
    console.log(JSON.stringify(details));
    process.exit(0);
  }

  // Check if --filter-log flag is provided to filter the memory log and exit immediately
  let filterQuery = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--filter-log")) {
      if (args[i].includes("=")) {
        filterQuery = args[i].split("=")[1] || "";
      } else if (i + 1 < args.length) {
        filterQuery = args[i + 1];
        i++;
      }
      break;
    }
  }
  if (filterQuery !== null) {
    loadPersistentLog();
    const filtered = memoryLog.filter((entry) => {
      return entry.args && entry.args.some((arg) => arg.toLowerCase().includes(filterQuery.toLowerCase()));
    });
    console.log(JSON.stringify(filtered));
    process.exit(0);
  }

  // Load persisted memory log once per session if available
  loadPersistentLog();

  const startTime = performance.now();

  // Record this invocation in the in-memory log with provided arguments and the current timestamp
  memoryLog.push({ args, timestamp: new Date().toISOString() });

  // Log the provided CLI arguments
  logCLIArgs(args);

  // Handle the reset log flag: clears the in-memory log and persistent file, then confirms reset.
  if (args.includes("--reset-log")) {
    resetMemoryLog();
    console.log("Memory log has been reset.");
  }

  // Process flags in order of precedence
  if (args.includes("--help-seeking")) {
    handleHelpSeeking();
  }

  if (args.includes("--replicate")) {
    await handleReplication(args);
  }

  if (args.includes("--plan")) {
    planTasks();
  }

  if (args.includes("--decompose")) {
    handleDecompose(args);
  }

  // Capture end time and log execution duration
  const endTime = performance.now();
  const execTime = logExecutionTime(startTime, endTime);
  if (memoryLog.length > 0) {
    memoryLog[memoryLog.length - 1].execTime = execTime;
  }

  // If '--persist-log' flag is provided, output the complete in-memory log as a JSON string
  if (args.includes("--persist-log")) {
    console.log(JSON.stringify(memoryLog));
  }

  // If '--persist-file' flag is provided, write the memory log to 'memory_log.json'
  if (args.includes("--persist-file")) {
    try {
      fs.writeFileSync("memory_log.json", JSON.stringify(memoryLog, null, 2));
      console.log("Memory log persisted to memory_log.json");
    } catch (err) {
      console.error("Failed to persist memory log:", err);
    }
  }

  // Process self-improvement mode after other operations
  if (args.includes("--self-improve")) {
    handleSelfImprove(args);
    if (!args.includes("--diag-json") && args.includes("--verbose")) {
      handleSelfImproveVerbose();
    }
  }
}

// If this module is executed directly, process CLI arguments from process.argv
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((err) => console.error(err));
}
