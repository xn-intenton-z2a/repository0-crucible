#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

// Use a mutable variable for maximum memory entries so it can be updated via CLI flag
let maxMemoryEntries = 100;

// In-memory log to store the command arguments across invocations
let memoryLog = [];

/**
 * Main function that processes command line arguments.
 * @param {string[]} args - The command line arguments.
 */
export function main(args = []) {
  // Parse --memory-limit flag if provided
  if (args.includes("--memory-limit")) {
    const idx = args.indexOf("--memory-limit");
    const limitStr = args[idx + 1];
    if (!limitStr || limitStr.startsWith("--")) {
      console.error("No memory limit value provided for --memory-limit flag");
      return;
    }
    const limit = parseInt(limitStr, 10);
    if (isNaN(limit) || limit <= 0) {
      console.error("Invalid memory limit provided. It must be a positive integer.");
      return;
    }
    maxMemoryEntries = limit;
  }

  // On startup, auto-load persisted memory if memory.log exists
  if (fs.existsSync("memory.log")) {
    try {
      const data = fs.readFileSync("memory.log", { encoding: "utf-8" });
      memoryLog = JSON.parse(data);
    } catch (error) {
      console.error("Error loading persisted memory:", error);
    }
  }

  // If --diagnostics flag is provided, output diagnostic information and return early
  if (args.includes("--diagnostics")) {
    const diagnostics = {
      memoryLimit: maxMemoryEntries,
      memoryLogCount: memoryLog.length,
      memoryFilePersisted: fs.existsSync("memory.log")
    };
    console.log(JSON.stringify(diagnostics));
    return;
  }

  // If --memory-stats flag is provided, output memory log statistics and return early
  if (args.includes("--memory-stats")) {
    const stats = {
      count: memoryLog.length,
      oldest: memoryLog.length > 0 ? memoryLog[0].sessionId : null,
      newest: memoryLog.length > 0 ? memoryLog[memoryLog.length - 1].sessionId : null
    };
    console.log(JSON.stringify(stats));
    return;
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
    const filtered = memoryLog.filter((entry) => entry.args.some((arg) => arg.toLowerCase().includes(lowerQuery)));
    console.log(JSON.stringify(filtered));
    return;
  }

  // Handle --query-tag functionality for filtering by tag
  if (args.includes("--query-tag")) {
    const index = args.indexOf("--query-tag");
    if (args.length <= index + 1 || args[index + 1].startsWith("--")) {
      console.error("No tag specified for --query-tag flag");
      return;
    }
    const tagQuery = args[index + 1].toLowerCase();
    const filtered = memoryLog.filter(entry => entry.tag && entry.tag.toLowerCase() === tagQuery);
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
        console.error("Error deleting memory.log:", error);
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
          while (memoryLog.length > maxMemoryEntries) {
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

  // Process --tag-memory flag if provided
  let tagValue = null;
  if (args.includes("--tag-memory")) {
    const idx = args.indexOf("--tag-memory");
    const tagStr = args[idx + 1];
    if (!tagStr || tagStr.startsWith("--")) {
      console.error("No tag value provided for --tag-memory flag");
      return;
    }
    tagValue = tagStr;
  }

  // Record the arguments in memory along with the session identifier
  const sessionId = new Date().toISOString() + "-" + Math.random().toString(36).slice(2);
  const logEntry = { sessionId, args };
  if (tagValue !== null) {
    logEntry.tag = tagValue;
  }
  memoryLog.push(logEntry);
  // Enforce memory log size limit
  while (memoryLog.length > maxMemoryEntries) {
    memoryLog.shift();
  }

  // If '--persist-memory' flag is provided, write the memory log to disk
  if (args.includes("--persist-memory")) {
    try {
      fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
    } catch (error) {
      console.error("Error writing memory.log:", error);
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
