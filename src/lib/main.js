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

  // Handle --merge-persist flag for merging in-memory log with persisted log
  if (args.includes("--merge-persist")) {
    let persistedEntries = [];
    if (fs.existsSync("memory.log")) {
      try {
        const fileData = fs.readFileSync("memory.log", { encoding: "utf-8" });
        persistedEntries = JSON.parse(fileData);
      } catch (error) {
        console.error("Error reading persisted memory for merge:", error);
      }
    }
    const initialCount = persistedEntries.length + memoryLog.length;
    const mergedMap = new Map();
    // Add persisted entries first
    for (const entry of persistedEntries) {
      mergedMap.set(entry.sessionId, entry);
    }
    // Add in-memory entries if not duplicate
    for (const entry of memoryLog) {
      if (!mergedMap.has(entry.sessionId)) {
        mergedMap.set(entry.sessionId, entry);
      }
    }
    // Convert map back to array preserving insertion order
    let merged = Array.from(mergedMap.values());
    // Trim the merged log if it exceeds maxMemoryEntries (remove oldest entries first)
    while (merged.length > maxMemoryEntries) {
      merged.shift();
    }
    memoryLog = merged;
    try {
      fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
    } catch (error) {
      console.error("Error writing merged memory.log:", error);
    }
    console.log(`Merged memory log: ${initialCount} entries before merge, ${memoryLog.length} entries after merge.`);
    return;
  }

  // Handle --update-memory-tag flag for updating a memory log entry's tag
  if (args.includes("--update-memory-tag")) {
    const idx = args.indexOf("--update-memory-tag");
    const sessionId = args[idx + 1];
    const newTag = args[idx + 2];
    if (!sessionId || !newTag || sessionId.startsWith("--") || newTag.startsWith("--")) {
      console.error("Invalid usage: --update-memory-tag requires a sessionId and a new tag value");
      return;
    }
    const entry = memoryLog.find(e => e.sessionId === sessionId);
    if (entry) {
      entry.tag = newTag;
      console.log("Memory log entry updated:", JSON.stringify(entry));
      // If memory.log exists, auto-persist the updated memoryLog
      if (fs.existsSync("memory.log")) {
        try {
          fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
        } catch (error) {
          console.error("Error persisting memory.log:", error);
        }
      }
    } else {
      console.error("No memory log entry found with sessionId:", sessionId);
    }
    return;
  }

  // Handle --update-memory-annotation flag for updating a memory log entry's annotation
  if (args.includes("--update-memory-annotation")) {
    const idx = args.indexOf("--update-memory-annotation");
    const sessionId = args[idx + 1];
    const newAnnotation = args[idx + 2];
    if (!sessionId || !newAnnotation || sessionId.startsWith("--") || newAnnotation.startsWith("--")) {
      console.error("Invalid usage: --update-memory-annotation requires a sessionId and a new annotation value");
      return;
    }
    const entry = memoryLog.find(e => e.sessionId === sessionId);
    if (entry) {
      entry.annotation = newAnnotation;
      console.log("Memory log entry annotation updated:", JSON.stringify(entry));
      if (fs.existsSync("memory.log")) {
        try {
          fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
        } catch (error) {
          console.error("Error persisting memory.log:", error);
        }
      }
    } else {
      console.error("No memory log entry found with sessionId:", sessionId);
    }
    return;
  }

  // Handle --delete-memory-by-tag flag for removing entries by tag (case-insensitive)
  if (args.includes("--delete-memory-by-tag")) {
    const idx = args.indexOf("--delete-memory-by-tag");
    const tagValue = args[idx + 1];
    if (!tagValue || tagValue.startsWith("--")) {
      console.error("Invalid usage: --delete-memory-by-tag requires a valid tag value");
      return;
    }
    const originalLength = memoryLog.length;
    memoryLog = memoryLog.filter(entry => !(entry.tag && entry.tag.toLowerCase() === tagValue.toLowerCase()));
    const removedCount = originalLength - memoryLog.length;
    if (fs.existsSync("memory.log")) {
      try {
        fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
      } catch (error) {
        console.error("Error writing memory.log after deletion:", error);
      }
    }
    console.log(`Deleted ${removedCount} entries with tag: ${tagValue}`);
    return;
  }

  // Handle --delete-memory-by-annotation flag for removing entries by annotation (case-insensitive)
  if (args.includes("--delete-memory-by-annotation")) {
    const idx = args.indexOf("--delete-memory-by-annotation");
    const annotationValueToDelete = args[idx + 1];
    if (!annotationValueToDelete || annotationValueToDelete.startsWith("--")) {
      console.error("Invalid usage: --delete-memory-by-annotation requires a valid annotation value");
      return;
    }
    const originalLength = memoryLog.length;
    memoryLog = memoryLog.filter(entry => !(entry.annotation && entry.annotation.toLowerCase() === annotationValueToDelete.toLowerCase()));
    const removedCount = originalLength - memoryLog.length;
    if (fs.existsSync("memory.log")) {
      try {
        fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
      } catch (error) {
        console.error("Error writing memory.log after deletion:", error);
      }
    }
    console.log(`Deleted ${removedCount} entries with annotation: ${annotationValueToDelete}`);
    return;
  }

  // Handle --delete-memory-range flag for removing entries by date range
  if (args.includes("--delete-memory-range")) {
    const index = args.indexOf("--delete-memory-range");
    if (args.length <= index + 2 || args[index + 1].startsWith("--") || args[index + 2].startsWith("--")) {
      console.error("Invalid usage: --delete-memory-range requires two ISO date arguments: startDate and endDate");
      return;
    }
    const startDateStr = args[index + 1];
    const endDateStr = args[index + 2];
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Invalid date format provided to --delete-memory-range flag. Dates must be valid ISO strings.");
      return;
    }
    const originalLength = memoryLog.length;
    // Remove entries whose timestamp falls between startDate and endDate (inclusive)
    memoryLog = memoryLog.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate < startDate || entryDate > endDate;
    });
    const deletedCount = originalLength - memoryLog.length;
    if (fs.existsSync("memory.log")) {
      try {
        fs.writeFileSync("memory.log", JSON.stringify(memoryLog));
      } catch (error) {
        console.error("Error writing memory.log after delete:", error);
      }
    }
    console.log(`Deleted ${deletedCount} entries from memory log between ${startDateStr} and ${endDateStr}.`);
    return;
  }

  // Handle --detailed-diagnostics flag for enhanced diagnostics
  if (args.includes("--detailed-diagnostics")) {
    const detailedDiag = {
      memoryLimit: maxMemoryEntries,
      memoryLogCount: memoryLog.length,
      memoryFilePersisted: fs.existsSync("memory.log"),
      memorySessionIds: memoryLog.map(entry => entry.sessionId)
    };
    console.log(JSON.stringify(detailedDiag));
    return;
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

  // Handle --frequency-stats flag for computing frequency of command arguments
  if (args.includes("--frequency-stats")) {
    const frequency = {};
    for (const entry of memoryLog) {
      for (const token of entry.args) {
        frequency[token] = (frequency[token] || 0) + 1;
      }
    }
    console.log(JSON.stringify(frequency));
    return;
  }

  // Handle --query-memory functionality
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

  // Handle --query-annotation functionality for filtering by annotation (case-insensitive)
  if (args.includes("--query-annotation")) {
    const index = args.indexOf("--query-annotation");
    if (args.length <= index + 1 || args[index + 1].startsWith("--")) {
      console.error("No annotation specified for --query-annotation flag");
      return;
    }
    const annotationQuery = args[index + 1].toLowerCase();
    const filtered = memoryLog.filter(entry => entry.annotation && entry.annotation.toLowerCase().includes(annotationQuery));
    console.log(JSON.stringify(filtered));
    return;
  }

  // Handle --query-memory-range flag for filtering memory log entries by a date range
  if (args.includes("--query-memory-range")) {
    const index = args.indexOf("--query-memory-range");
    if (args.length <= index + 2 || args[index + 1].startsWith("--") || args[index + 2].startsWith("--")) {
      console.error("Invalid usage: --query-memory-range requires two arguments: start date and end date in ISO format");
      return;
    }
    const startDateStr = args[index + 1];
    const endDateStr = args[index + 2];
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Invalid date format: Start and end dates must be valid ISO date strings");
      return;
    }
    const filtered = memoryLog.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= startDate && entryDate <= endDate;
    });
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

  // Process --annotate-memory flag if provided
  let annotationValue = null;
  if (args.includes("--annotate-memory")) {
    const idx = args.indexOf("--annotate-memory");
    const annotationStr = args[idx + 1];
    if (!annotationStr || annotationStr.startsWith("--")) {
      console.error("No annotation value provided for --annotate-memory flag");
      return;
    }
    annotationValue = annotationStr;
  }

  // Handle export-memory flag with optional custom filename
  if (args.includes("--export-memory")) {
    // Record this command invocation
    const nowForExport = new Date().toISOString();
    const sessionIdForExport = nowForExport + "-" + Math.random().toString(36).slice(2);
    const logEntryForExport = { sessionId: sessionIdForExport, args, timestamp: nowForExport };
    if (tagValue !== null) {
      logEntryForExport.tag = tagValue;
    }
    if (annotationValue !== null) {
      logEntryForExport.annotation = annotationValue;
    }
    memoryLog.push(logEntryForExport);
    while (memoryLog.length > maxMemoryEntries) {
      memoryLog.shift();
    }

    const idx = args.indexOf("--export-memory");
    let exportFilename = "memory_export.json";
    if (args.length > idx + 1 && !args[idx + 1].startsWith("--")) {
      exportFilename = args[idx + 1];
    }
    try {
      fs.writeFileSync(exportFilename, JSON.stringify(memoryLog));
      console.log(`Memory log exported to ${exportFilename}`);
    } catch (error) {
      console.error("Error exporting memory log:", error);
    }
    return;
  }

  // New flag: If '--show-memory-chronological' flag is provided, output the memory log in chronological order (oldest first) BEFORE recording this invocation
  if (args.includes("--show-memory-chronological")) {
    console.log(JSON.stringify(memoryLog));
    return;
  }

  // Record the arguments in memory along with the session identifier
  const now = new Date().toISOString();
  const sessionId = now + "-" + Math.random().toString(36).slice(2);
  const logEntry = { sessionId, args, timestamp: now };
  if (tagValue !== null) {
    logEntry.tag = tagValue;
  }
  if (annotationValue !== null) {
    logEntry.annotation = annotationValue;
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
