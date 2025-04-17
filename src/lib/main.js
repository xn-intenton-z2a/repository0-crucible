#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

const MAX_MEMORY_ENTRIES = 100;

// In-memory log to store the command arguments across invocations
let memoryLog = [];

/**
 * Main function that processes command line arguments.
 * @param {string[]} args - The command line arguments.
 */
export function main(args = []) {
  // Generate a unique session identifier for this runtime instance.
  const sessionId = new Date().toISOString() + '-' + Math.random().toString(36).slice(2);

  // On startup, auto-load persisted memory if memory.log exists
  if (fs.existsSync("memory.log")) {
    try {
      const data = fs.readFileSync("memory.log", { encoding: "utf-8" });
      memoryLog = JSON.parse(data);
    } catch (error) {
      console.error("Error loading persisted memory:", error);
    }
  }

  // If '--clear-memory' flag is provided, clear the in-memory and persisted memory log
  if (args.includes("--clear-memory")) {
    resetMemory();
    if (fs.existsSync("memory.log")) {
      try {
        fs.unlinkSync("memory.log");
      } catch (error) {
        console.error('Error deleting memory.log:', error);
      }
    }
    console.log("Memory log cleared");
    return;
  }

  // Record the arguments in memory along with the session identifier
  memoryLog.push({ sessionId, args });
  // Enforce memory log size limit
  while (memoryLog.length > MAX_MEMORY_ENTRIES) {
    memoryLog.shift();
  }

  // If '--persist-memory' flag is provided, write the memory log to disk
  if (args.includes("--persist-memory")) {
    try {
      fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
    } catch (error) {
      console.error('Error writing memory.log:', error);
    }
  }

  // If '--show-memory' flag is provided, output the memory log
  if (args.includes("--show-memory")) {
    console.log(JSON.stringify(memoryLog));
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

/**
 * Returns the current memory log of command arguments.
 * @returns {Array} The memory log array.
 */
export function getMemory() {
  return memoryLog;
}

/**
 * Resets the in-memory log. Useful for testing purposes.
 */
export function resetMemory() {
  memoryLog = [];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
