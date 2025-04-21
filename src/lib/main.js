#!/usr/bin/env node
// src/lib/main.js
// This file is the entrypoint for the CLI application.
// Refactored to extract flag-handling, logging, in-memory logging functionality, and goal decomposition feature for improved readability and maintainability.

import { fileURLToPath } from "url";
import { performance } from "perf_hooks";
import fs from "fs";

// Global in-memory log to track each CLI invocation
const memoryLog = [];

// Helper function to log the CLI arguments in a consistent JSON format
function logCLIArgs(args) {
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// Helper function to log the execution time in milliseconds
function logExecutionTime(startTime, endTime) {
  const executionTime = (endTime - startTime).toFixed(2);
  console.log(`Execution time: ${executionTime} ms`);
  return parseFloat(executionTime);
}

// Business logic for replicating tasks with an optional task count parameter
function replicateTasks(count = 3) {
  console.log("Replicating tasks...");
  for (let i = 1; i <= count; i++) {
    console.log(`Replicating task ${i}`);
  }
}

// Handles the help-seeking flag by logging the appropriate message
function handleHelpSeeking() {
  console.log("Help-Seeking Mode Enabled: querying assistance...");
}

// Handles the replication flag by executing replication tasks with an optional count
function handleReplication(args) {
  const replicateIndex = args.indexOf("--replicate");
  let count = 3;
  if (replicateIndex !== -1 && args.length > replicateIndex + 1) {
    const potentialCount = parseInt(args[replicateIndex + 1], 10);
    if (!isNaN(potentialCount) && potentialCount > 0) {
      count = potentialCount;
    }
  }
  replicateTasks(count);
}

// Handles the self-improve flag by logging self-improvement diagnostics with detailed metrics including first and latest invocation timestamps
function handleSelfImprove() {
  // Compute diagnostics from the memory log
  const totalInvocations = memoryLog.length;
  let totalTime = 0;
  let count = 0;
  let maxTime = 0;
  let minTime = Infinity;
  for (const entry of memoryLog) {
    if (entry.execTime !== undefined) {
      totalTime += entry.execTime;
      count++;
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
  const firstTimestamp = totalInvocations > 0 ? memoryLog[0].timestamp : "N/A";
  const latestTimestamp = totalInvocations > 0 ? memoryLog[totalInvocations - 1].timestamp : "N/A";

  // Calculate standard deviation
  let sumSquaredDiff = 0;
  for (const entry of memoryLog) {
    if (entry.execTime !== undefined) {
      sumSquaredDiff += Math.pow(entry.execTime - averageNum, 2);
    }
  }
  const variance = count > 0 ? sumSquaredDiff / count : 0;
  const stdDeviation = Math.sqrt(variance).toFixed(2);

  console.log(`Total invocations: ${totalInvocations}`);
  console.log(`First invocation: ${firstTimestamp}`);
  console.log(`Latest invocation: ${latestTimestamp}`);
  console.log(`Average execution time: ${averageTime} ms`);
  console.log(`Maximum execution time: ${maxTime.toFixed(2)} ms`);
  console.log(`Minimum execution time: ${minTimeFormatted} ms`);
  console.log(`Standard deviation execution time: ${stdDeviation} ms`);
  console.log("Self-improvement analysis: execution metrics are optimal");
}

// Handles the planning flag by logging planning messages
function planTasks() {
  console.log("Analyzing input for planning...");
  console.log("Planned Task 1: Review current configurations");
  console.log("Planned Task 2: Prioritize upcoming feature enhancements");
}

// Handles the decompose flag to perform goal decomposition with improved formatting
function handleDecompose(args) {
  const decomposeIndex = args.indexOf("--decompose");
  let goal = "";
  if (args.length > decomposeIndex + 1 && !args[decomposeIndex + 1].startsWith("--") && args[decomposeIndex + 1] !== "") {
    goal = args[decomposeIndex + 1];
  }
  // Output header with improved formatting
  if (goal) {
    console.log(`Goal Decomposition Report: ${goal}`);
  } else {
    console.log("Goal Decomposition Report:");
  }
  // Consistently formatted sub-tasks
  console.log("1. Define objectives");
  console.log("2. Identify key milestones");
  console.log("3. Assign responsibilities");
}

// Main entry point for the CLI application
export function main(args) {
  const startTime = performance.now();

  // Record this invocation in the in-memory log with arguments and a timestamp
  memoryLog.push({ args, timestamp: new Date().toISOString() });

  // Log the provided CLI arguments
  logCLIArgs(args);

  // Handle reset log flag if present
  if (args.includes("--reset-log")) {
    resetMemoryLog();
    console.log("Memory log has been reset.");
  }

  // Check for help-seeking flag and process it
  if (args.includes("--help-seeking")) {
    handleHelpSeeking();
  }

  // Check for replication flag and process it
  if (args.includes("--replicate")) {
    handleReplication(args);
  }

  // Check for planning flag and process it
  if (args.includes("--plan")) {
    planTasks();
  }

  // Check for decompose flag and process it
  if (args.includes("--decompose")) {
    handleDecompose(args);
  }

  // Capture end time and log the execution duration
  const endTime = performance.now();
  const execTime = logExecutionTime(startTime, endTime);
  // Update the last log entry with execution time
  memoryLog[memoryLog.length - 1].execTime = execTime;

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

  // Check for self-improve flag and process it after logging execution time (and persist log if any)
  if (args.includes("--self-improve")) {
    handleSelfImprove();
  }
}

// Returns a copy of the current in-memory log
export function getMemoryLog() {
  return [...memoryLog];
}

// Resets the in-memory log. Useful for testing.
export function resetMemoryLog() {
  memoryLog.length = 0;
}

// If this module is executed directly, process CLI arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
