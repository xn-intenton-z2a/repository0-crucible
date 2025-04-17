import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
const { main, getMemory, resetMemory } = mainModule;

const MEMORY_LOG_FILE = "memory.log";
const EXPORT_FILE = "memory_export.json";

// Helper function to capture console output
function captureConsole(callback) {
  const originalLog = console.log;
  let output = "";
  console.log = (msg) => { output += msg; };
  callback();
  console.log = originalLog;
  return output;
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    // Override process.argv for testing
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Memory Logging Feature", () => {
  beforeEach(() => {
    resetMemory();
    // Clean up memory files if they exist
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    if (existsSync(EXPORT_FILE)) {
      unlinkSync(EXPORT_FILE);
    }
    if (existsSync("custom_export.json")) {
      unlinkSync("custom_export.json");
    }
  });

  afterEach(() => {
    // Remove memory files after each test to avoid side effects
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    if (existsSync(EXPORT_FILE)) {
      unlinkSync(EXPORT_FILE);
    }
    if (existsSync("custom_export.json")) {
      unlinkSync("custom_export.json");
    }
  });

  test("should log command arguments", () => {
    main(["first", "second"]);
    const mem = getMemory();
    expect(mem).toHaveLength(1);
    expect(mem[0]).toHaveProperty("sessionId");
    expect(typeof mem[0].sessionId).toBe("string");
    expect(mem[0].sessionId).not.toEqual("");
    expect(mem[0].args).toEqual(["first", "second"]);
  });

  test("should output memory log in reverse order when --show-memory flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    // First command
    main(["a", "b"]);
    // Second command
    main(["c", "d"]);
    // Now invoke --show-memory
    main(["--show-memory"]);
    expect(spy).toHaveBeenCalled();
    // Get the output from the --show-memory call
    const loggedOutput = spy.mock.calls[spy.mock.calls.length - 1][0];
    const parsedOutput = JSON.parse(loggedOutput);
    // Expect three entries in reverse order: most recent first
    expect(parsedOutput).toHaveLength(3); // because the --show-memory invocation itself is logged as well
    expect(parsedOutput[0].args).toEqual(["--show-memory"]);
    expect(parsedOutput[1].args).toEqual(["c", "d"]);
    expect(parsedOutput[2].args).toEqual(["a", "b"]);
    spy.mockRestore();
  });

  test("should persist memory log to disk when --persist-memory flag is provided", () => {
    // Initially, the file should not exist
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);

    main(["test1", "--persist-memory"]);

    // Now, the file should exist
    expect(existsSync(MEMORY_LOG_FILE)).toBe(true);
    const fileContent = readFileSync(MEMORY_LOG_FILE, { encoding: "utf-8" });
    const parsed = JSON.parse(fileContent);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toHaveProperty("sessionId");
    expect(parsed[0].args).toEqual(["test1", "--persist-memory"]);
  });

  test("should clear memory log and delete persisted file when --clear-memory flag is provided", () => {
    // First, simulate some memory logging and persist to disk
    main(["sample", "--persist-memory"]);
    expect(getMemory().length).toBe(1);
    expect(existsSync(MEMORY_LOG_FILE)).toBe(true);

    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    // Now, clear the memory
    main(["--clear-memory"]);
    // In-memory log should be empty
    expect(getMemory().length).toBe(0);
    // The memory file should be deleted
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);
    // Confirmation message should be output
    expect(spy).toHaveBeenCalledWith("Memory log cleared");
    spy.mockRestore();
  });

  test("should auto-load persisted memory log on startup", () => {
    // Write a temporary memory.log with known content
    const persisted = JSON.stringify([{ sessionId: "oldSession", args: ["old", "command"] }]);
    writeFileSync(MEMORY_LOG_FILE, persisted, { encoding: "utf-8" });

    // Call main with a new command, which should auto-load and then push the new args
    main(["new"]);
    const mem = getMemory();
    expect(mem.length).toBe(2);
    expect(mem[0]).toHaveProperty("sessionId");
    expect(mem[0].args).toEqual(["old", "command"]);
    expect(mem[1]).toHaveProperty("sessionId");
    expect(mem[1].args).toEqual(["new"]);
  });

  test("should limit memory log to 100 entries when more than 100 entries are added", () => {
    resetMemory();
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    const totalEntries = 105;
    for (let i = 0; i < totalEntries; i++) {
      main([`command${i}`]);
    }
    const mem = getMemory();
    expect(mem).toHaveLength(100);
    // The first entry should be command5 since the first 5 entries are removed
    expect(mem[0].args).toEqual(["command5"]);
    expect(mem[99].args).toEqual(["command104"]);
  });

  test("should export memory log to a file when --export-memory flag is provided with default filename", () => {
    main(["exportTest1", "exportTest2"]);
    main(["--export-memory"]);
    expect(existsSync(EXPORT_FILE)).toBe(true);
    const exportedContent = readFileSync(EXPORT_FILE, { encoding: "utf-8" });
    const exportedLog = JSON.parse(exportedContent);
    // Should include the previous log plus the export command entry
    expect(exportedLog.length).toBe(2);
    expect(exportedLog[0].args).toEqual(["exportTest1", "exportTest2"]);
  });

  test("should export memory log to a custom file when custom filename is provided with --export-memory", () => {
    main(["customExportTest"]);
    main(["--export-memory", "custom_export.json"]);
    expect(existsSync("custom_export.json")).toBe(true);
    const exportedContent = readFileSync("custom_export.json", { encoding: "utf-8" });
    const exportedLog = JSON.parse(exportedContent);
    // Should include the previous log plus the export command entry
    expect(exportedLog.length).toBe(2);
    expect(exportedLog[0].args).toEqual(["customExportTest"]);
  });

  test("should import memory log from a file when --import-memory flag is provided", () => {
    // Create a temporary import file with a predefined memory log
    const tempLog = [{ sessionId: "importSession", args: ["imported", "command"] }];
    const tempFilename = "temp_import.json";
    writeFileSync(tempFilename, JSON.stringify(tempLog), { encoding: "utf-8" });

    // Preload the in-memory log with an entry
    main(["existing"]);
    const initialLength = getMemory().length;

    // Import the temporary file
    main(["--import-memory", tempFilename]);

    // After import, the memory log should be replaced by the imported log and then appended with the current call
    const mergedMemory = getMemory();
    expect(mergedMemory.length).toBe(tempLog.length + 1);
    expect(mergedMemory[mergedMemory.length - 1].args).toEqual(["--import-memory", tempFilename]);
    
    // Clean up temporary file
    if (existsSync(tempFilename)) {
      unlinkSync(tempFilename);
    }
  });

  test("should handle import error when file does not exist", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    main(["--import-memory", "nonexistent.json"]);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("should handle import error when file has invalid JSON", () => {
    const tempFilename = "temp_invalid.json";
    writeFileSync(tempFilename, "invalid json", { encoding: "utf-8" });
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    main(["--import-memory", tempFilename]);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    if (existsSync(tempFilename)) {
      unlinkSync(tempFilename);
    }
  });

  // New tests for --query-memory feature
  test("should output filtered memory log when --query-memory flag is provided", () => {
    // Populate memory
    main(["alphaCommand"]);
    main(["betaCommand"]);
    main(["anotherAlpha"]);
    // Spy on console.log
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--query-memory", "alpha"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[0][0];
    const filtered = JSON.parse(loggedOutput);
    // Should contain entries with 'alpha' in the args (search is case-insensitive)
    expect(filtered.length).toBe(2);
    expect(filtered[0].args).toEqual(["alphaCommand"]);
    expect(filtered[1].args).toEqual(["anotherAlpha"]);
    spy.mockRestore();
  });

  // New tests for --query-tag feature
  test("should output filtered memory log when --query-tag flag is provided", () => {
    // Populate memory with tagged commands
    main(["alphaCommand", "--tag-memory", "myTag"]);
    main(["betaCommand"]);
    main(["gammaCommand", "--tag-memory", "MYTAG"]); // same tag different case
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--query-tag", "mytag"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[spy.mock.calls.length - 1][0];
    const filtered = JSON.parse(loggedOutput);
    expect(filtered.length).toBe(2);
    expect(filtered[0].tag.toLowerCase()).toBe("mytag");
    expect(filtered[1].tag.toLowerCase()).toBe("mytag");
    spy.mockRestore();
  });

  test("should error when --query-tag flag is provided without a tag value", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const initialLength = getMemory().length;
    main(["sampleCommand", "--query-tag"]);
    expect(spy).toHaveBeenCalledWith("No tag specified for --query-tag flag");
    spy.mockRestore();
    const mem = getMemory();
    expect(mem.length).toBe(initialLength);
  });

  test("should obey custom memory limit when --memory-limit flag is provided", () => {
    resetMemory();
    const customLimit = 10;
    // Add more than customLimit entries with the flag each time
    for (let i = 0; i < 15; i++) {
      main([`command${i}`, "--memory-limit", customLimit.toString()]);
    }
    const mem = getMemory();
    expect(mem.length).toBeLessThanOrEqual(customLimit);
  });

  test("should log command arguments with tag when --tag-memory flag is provided", () => {
    resetMemory();
    main(["sampleCommand", "--tag-memory", "testTag"]);
    const mem = getMemory();
    expect(mem).toHaveLength(1);
    expect(mem[0]).toHaveProperty("tag", "testTag");
    expect(mem[0].args).toEqual(["sampleCommand", "--tag-memory", "testTag"]);
  });

  test("should error when --tag-memory flag is provided without a tag value", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const initialLength = getMemory().length;
    main(["sampleCommand", "--tag-memory"]);
    expect(spy).toHaveBeenCalledWith("No tag value provided for --tag-memory flag");
    spy.mockRestore();
    const mem = getMemory();
    expect(mem.length).toBe(initialLength);
  });

  // New tests for --update-memory-tag feature
  describe("Update Memory Tag Feature", () => {
    test("should update memory log tag when valid sessionId and new tag provided", () => {
      // Log an entry with a tag
      main(["testCommand", "--tag-memory", "oldTag"]);
      const memBefore = getMemory();
      expect(memBefore.length).toBeGreaterThan(0);
      const sessionId = memBefore[0].sessionId;
      // Update the tag
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--update-memory-tag", sessionId, "newTestTag"]);
      // Check that the memory log entry has its tag updated
      const memAfter = getMemory();
      const updatedEntry = memAfter.find(e => e.sessionId === sessionId);
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.tag).toBe("newTestTag");
      // Check output
      expect(spy).toHaveBeenCalledWith("Memory log entry updated:", JSON.stringify(updatedEntry));
      spy.mockRestore();
    });

    test("should error when --update-memory-tag flag is provided without sufficient arguments", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialLength = getMemory().length;
      main(["--update-memory-tag", "onlyOneArg"]);
      expect(spy).toHaveBeenCalledWith("Invalid usage: --update-memory-tag requires a sessionId and a new tag value");
      spy.mockRestore();
      const mem = getMemory();
      expect(mem.length).toBe(initialLength);
    });

    test("should error when provided sessionId does not exist", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      main(["--update-memory-tag", "nonexistentSession", "newTag"]);
      expect(spy).toHaveBeenCalledWith("No memory log entry found with sessionId:", "nonexistentSession");
      spy.mockRestore();
    });

    test("should persist memory tag update to disk when --update-memory-tag flag is provided", () => {
      // Pre-populate memory.log with a known entry
      const initialEntry = { sessionId: "persistTestSession", args: ["persistTest"], tag: "oldPersistTag" };
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify([initialEntry]));

      // Call main with a dummy argument to load persisted memory
      main(["dummy"]);
      // Now update the tag of the pre-existing entry
      main(["--update-memory-tag", "persistTestSession", "newPersistTag"]);
      // Read the updated file
      const updatedData = JSON.parse(readFileSync(MEMORY_LOG_FILE, { encoding: "utf-8" }));
      const updatedEntry = updatedData.find(e => e.sessionId === "persistTestSession");
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.tag).toBe("newPersistTag");
    });
  });

  // New tests for --delete-memory-by-tag feature
  describe("Delete Memory by Tag Feature", () => {
    test("should delete memory log entries with a specific tag and output correct count", () => {
      // Add entries with different tags
      main(["cmd1", "--tag-memory", "Alpha"]);
      main(["cmd2", "--tag-memory", "beta"]);
      main(["cmd3", "--tag-memory", "ALPHA"]);
      main(["cmd4"]); // no tag
      const initialLength = getMemory().length;
      // Capture output
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      // Delete entries with tag 'alpha' (case-insensitive)
      main(["--delete-memory-by-tag", "alpha"]);
      expect(spy).toHaveBeenCalledWith("Deleted 2 entries with tag: alpha");
      spy.mockRestore();
      const mem = getMemory();
      // Ensure that the two entries with tag alpha are removed
      expect(mem.find(e => e.tag && e.tag.toLowerCase() === "alpha" )).toBeUndefined();
      // In-memory log length should be initialLength - 2
      expect(mem.length).toBe(initialLength - 2);
    });

    test("should persist deletion to disk when memory.log exists", () => {
      // Pre-populate memory.log with entries
      const entries = [
        { sessionId: "1", args: ["cmd1"], tag: "deleteMe" },
        { sessionId: "2", args: ["cmd2"], tag: "keepMe" },
        { sessionId: "3", args: ["cmd3"], tag: "deleteMe" }
      ];
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify(entries));
      // Load persisted memory
      main(["dummy"]);
      // Delete entries with tag 'deleteMe'
      main(["--delete-memory-by-tag", "deleteMe"]);
      const updatedData = JSON.parse(readFileSync(MEMORY_LOG_FILE, { encoding: "utf-8" }));
      // Only one entry should remain
      expect(updatedData.length).toBe(1);
      expect(updatedData[0].tag).toBe("keepMe");
    });

    test("should error when --delete-memory-by-tag flag is provided without a valid tag", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialLength = getMemory().length;
      main(["--delete-memory-by-tag"]);
      expect(spy).toHaveBeenCalledWith("Invalid usage: --delete-memory-by-tag requires a valid tag value");
      spy.mockRestore();
      expect(getMemory().length).toBe(initialLength);
    });
  });
});

describe("Diagnostics Flag", () => {
  beforeEach(() => {
    resetMemory();
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
  });

  test("should output diagnostics information when --diagnostics flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--diagnostics"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    const diag = JSON.parse(output);
    expect(diag).toHaveProperty("memoryLimit");
    expect(diag).toHaveProperty("memoryLogCount");
    expect(diag).toHaveProperty("memoryFilePersisted");
    spy.mockRestore();
  });
});

// New test suite for --memory-stats flag

describe("Memory Stats Flag", () => {
  test("should output memory stats with correct count, oldest and newest session IDs when --memory-stats flag is provided", () => {
    resetMemory();
    main(["first"]);
    main(["second"]);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--memory-stats"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[spy.mock.calls.length - 1][0];
    const stats = JSON.parse(loggedOutput);
    expect(stats.count).toBe(2);
    const mem = getMemory();
    expect(stats.oldest).toEqual(mem[0].sessionId);
    expect(stats.newest).toEqual(mem[mem.length - 1].sessionId);
    spy.mockRestore();
  });
});

// New test suite for --merge-persist flag

describe("Merge Persist Flag", () => {
  beforeEach(() => {
    resetMemory();
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
  });

  test("should merge persisted memory log with in-memory log when memory.log exists", () => {
    // Prepopulate persisted log with one entry
    const persisted = [{ sessionId: "session1", args: ["oldCommand"] }];
    writeFileSync(MEMORY_LOG_FILE, JSON.stringify(persisted), { encoding: "utf-8" });

    // In-memory log contains a new unique entry and a duplicate
    main(["newCommand"]);
    // Duplicate entry (simulate same session as in persisted)
    const duplicateEntry = { sessionId: "session1", args: ["duplicateCommand"] };
    const currentLog = getMemory();
    currentLog.push(duplicateEntry);
    
    // Call merge persist
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--merge-persist"]);

    // After merge, the merged log should have unique entries only
    const mergedLog = getMemory();
    // Expected: persisted entry and the newCommand entry (duplicate not added)
    expect(mergedLog.length).toBeLessThanOrEqual(100);
    // Check that session1 entry is present and is from persisted (or first seen)
    const session1Entries = mergedLog.filter(e => e.sessionId === "session1");
    expect(session1Entries).toHaveLength(1);

    // Check merge message output
    const mergeMessage = spy.mock.calls[0][0];
    expect(mergeMessage).toMatch(/Merged memory log:/);
    spy.mockRestore();
  });

  test("should handle --merge-persist gracefully when memory.log does not exist", () => {
    // Ensure no persisted file
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    main(["uniqueCommand"]);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--merge-persist"]);
    // Should simply merge in-memory with empty persisted log
    const mergedLog = getMemory();
    expect(mergedLog.length).toBe(1);
    const mergeMessage = spy.mock.calls[0][0];
    expect(mergeMessage).toMatch(/Merged memory log:/);
    spy.mockRestore();
  });
});
