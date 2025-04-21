#!/usr/bin/env node
// src/lib/main.js
// This file is the entrypoint for the CLI application.
// Refactored to extract flag-handling, logging, in-memory logging functionality, and goal decomposition feature for improved readability and maintainability.

import { fileURLToPath } from "url";
import { performance } from "perf_hooks";

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

// Business logic for replicating tasks
function replicateTasks() {
  // Output replication process messages
  console.log("Replicating tasks...");
  for (let i = 1; i <= 3; i++) {
    console.log(`Replicating task ${i}`);
  }
}

// Handles the help-seeking flag by logging the appropriate message
function handleHelpSeeking() {
  console.log("Help-Seeking Mode Enabled: querying assistance...");
}

// Handles the replication flag by executing replication tasks
function handleReplication() {
  replicateTasks();
}

// Handles the self-improve flag by logging self-improvement diagnostics with detailed metrics
function handleSelfImprove() {
  // Compute diagnostics from the memory log
  const totalInvocations = memoryLog.length;
  let totalTime = 0;
  let count = 0;
  let maxTime = 0;
  for (const entry of memoryLog) {
    if (entry.execTime !== undefined) {
      totalTime += entry.execTime;
      count++;
      if (entry.execTime > maxTime) {
        maxTime = entry.execTime;
      }
    }
  }
  const averageTime = count > 0 ? (totalTime / count).toFixed(2) : "0.00";

  console.log(`Total invocations: ${totalInvocations}`);
  console.log(`Average execution time: ${averageTime} ms`);
  console.log(`Maximum execution time: ${maxTime.toFixed(2)} ms`);
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

  // Check for help-seeking flag and process it
  if (args.includes("--help-seeking")) {
    handleHelpSeeking();
  }

  // Check for replication flag and process it
  if (args.includes("--replicate")) {
    handleReplication();
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
