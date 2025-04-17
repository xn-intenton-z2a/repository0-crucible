import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
const { main, getMemory, resetMemory } = mainModule;

const MEMORY_LOG_FILE = "memory.log";
const EXPORT_FILE = "memory_export.json";

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
  });

  afterEach(() => {
    // Remove memory files after each test to avoid side effects
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    if (existsSync(EXPORT_FILE)) {
      unlinkSync(EXPORT_FILE);
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

  test("should export memory log to a file when --export-memory flag is provided", () => {
    main(["exportTest1", "exportTest2"]);
    main(["--export-memory"]);
    expect(existsSync(EXPORT_FILE)).toBe(true);
    const exportedContent = readFileSync(EXPORT_FILE, { encoding: "utf-8" });
    const exportedLog = JSON.parse(exportedContent);
    // Should include the previous log plus the export command entry
    expect(exportedLog.length).toBe(2);
    expect(exportedLog[0].args).toEqual(["exportTest1", "exportTest2"]);
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

  // New test for non-numeric value for --memory-limit
  test("should error when non-numeric memory limit is provided", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const initialLength = getMemory().length;
    main(["--memory-limit", "NaN"]);
    expect(spy).toHaveBeenCalledWith("Invalid memory limit provided. It must be a positive integer.");
    spy.mockRestore();
    const mem = getMemory();
    expect(mem.length).toBe(initialLength);
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
