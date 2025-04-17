import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
const { main, getMemory, resetMemory } = mainModule;

const MEMORY_LOG_FILE = "memory.log";

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
    // Clean up memory.log if exists
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
  });

  afterEach(() => {
    // Remove memory.log after each test to avoid side effects
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
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

  test("should output memory log when --show-memory flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["a", "b"]);
    main(["--show-memory"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[0][0];
    const parsedOutput = JSON.parse(loggedOutput);
    expect(parsedOutput).toHaveLength(2);
    expect(parsedOutput[0]).toHaveProperty("sessionId");
    expect(typeof parsedOutput[0].sessionId).toBe("string");
    expect(parsedOutput[0].args).toEqual(["a", "b"]);
    expect(parsedOutput[1]).toHaveProperty("sessionId");
    expect(typeof parsedOutput[1].sessionId).toBe("string");
    expect(parsedOutput[1].args).toEqual(["--show-memory"]);
    spy.mockRestore();
  });

  test("should persist memory log to disk when --persist-memory flag is provided", () => {
    // Initially, the file should not exist
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);

    main(["test1", "--persist-memory"]);

    // Now, the file should exist
    expect(existsSync(MEMORY_LOG_FILE)).toBe(true);
    const fileContent = readFileSync(MEMORY_LOG_FILE, { encoding: 'utf-8' });
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
    writeFileSync(MEMORY_LOG_FILE, persisted, { encoding: 'utf-8' });

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
});
