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
  // On startup, auto-load persisted memory if memory.log exists
  if (fs.existsSync("memory.log")) {
    try {
      const data = fs.readFileSync("memory.log", { encoding: "utf-8" });
      memoryLog = JSON.parse(data);
    } catch (error) {
      console.error("Error loading persisted memory:", error);
    }
  }

  // Handle query-memory functionality
  if (args.includes("--query-memory")) {
    const index = args.indexOf("--query-memory");
    if (args.length <= index + 1 || args[index + 1].startsWith("--")) {
      console.error("No query string specified for --query-memory flag");
      return;
    }
    const query = args[index + 1];
    const lowerQuery = query.toLowerCase();
    const filtered = memoryLog.filter(entry => entry.args.some(arg => arg.toLowerCase().includes(lowerQuery)));
    console.log(JSON.stringify(filtered));
    return;
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

  // If '--import-memory' flag is provided, read the specified file and replace current contents with its contents
  if (args.includes("--import-memory")) {
    const index = args.indexOf("--import-memory");
    const filename = args[index + 1];
    if (!filename) {
      console.error("No filename specified for --import-memory flag");
    } else {
      try {
        const fileContent = fs.readFileSync(filename, { encoding: "utf-8" });
        const importedLog = JSON.parse(fileContent);
        if (Array.isArray(importedLog)) {
          memoryLog = importedLog;
          // Enforce memory log size limit after import
          while (memoryLog.length > MAX_MEMORY_ENTRIES) {
            memoryLog.shift();
          }
        } else {
          console.error("Imported file does not contain an array of log entries");
        }
      } catch (error) {
        console.error("Error importing memory from file:", error);
      }
    }
  }

  // Record the arguments in memory along with the session identifier
  const sessionId = new Date().toISOString() + '-' + Math.random().toString(36).slice(2);
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

  // If '--export-memory' flag is provided, export the memory log to memory_export.json
  if (args.includes("--export-memory")) {
    try {
      fs.writeFileSync("memory_export.json", JSON.stringify(memoryLog));
      console.log("Memory log exported to memory_export.json");
    } catch (error) {
      console.error("Error exporting memory log:", error);
    }
  }

  // If '--show-memory' flag is provided, output the memory log in reverse chronological order
  if (args.includes("--show-memory")) {
    console.log(JSON.stringify([...memoryLog].reverse()));
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
