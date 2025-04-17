import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync } from "fs";
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
    expect(mem[0]).toEqual(["first", "second"]);
  });

  test("should output memory log when --show-memory flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["a", "b"]);
    main(["--show-memory"]);
    // The memory should show both calls
    expect(spy).toHaveBeenCalledWith(JSON.stringify([ ["a", "b"], ["--show-memory"] ]));
    spy.mockRestore();
  });

  test("should persist memory log to disk when --persist-memory flag is provided", () => {
    // Initially, the file should not exist
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);

    main(["test1", "--persist-memory"]);

    // Now, the file should exist
    expect(existsSync(MEMORY_LOG_FILE)).toBe(true);
    const fileContent = readFileSync(MEMORY_LOG_FILE, { encoding: 'utf-8' });
    // Since resetMemory was called before, memoryLog should have one entry
    expect(fileContent).toBe(JSON.stringify([ ["test1", "--persist-memory"] ]));
  });
});
