import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import zlib from "zlib";
const { main, getMemory, resetMemory } = mainModule;

const MEMORY_LOG_FILE = "memory.log";
const COMPRESSED_LOG_FILE = "memory.log.gz";
const EXPORT_FILE = "memory_export.json";
const CUSTOM_CSV_FILE = "custom_export.csv";
const CUSTOM_MEMORY_FILE = "custom_memory.log";

// Helper function to capture console output
function captureConsole(callback) {
  const originalLog = console.log;
  let output = "";
  console.log = (msg) => { output += msg; };
  callback();
  console.log = originalLog;
  return output;
}

// New helper for CSV file export default filenames
const CSV_EXPORT_FILE = "memory_export.csv";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Memory Logging Feature", () => {
  beforeEach(() => {
    resetMemory();
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    if (existsSync(COMPRESSED_LOG_FILE)) {
      unlinkSync(COMPRESSED_LOG_FILE);
    }
    if (existsSync(EXPORT_FILE)) {
      unlinkSync(EXPORT_FILE);
    }
    if (existsSync(CUSTOM_CSV_FILE)) {
      unlinkSync(CUSTOM_CSV_FILE);
    }
    // Also remove custom memory file if exists
    if (existsSync(CUSTOM_MEMORY_FILE)) {
      unlinkSync(CUSTOM_MEMORY_FILE);
    }
  });

  afterEach(() => {
    if (existsSync(MEMORY_LOG_FILE)) {
      unlinkSync(MEMORY_LOG_FILE);
    }
    if (existsSync(COMPRESSED_LOG_FILE)) {
      unlinkSync(COMPRESSED_LOG_FILE);
    }
    if (existsSync(EXPORT_FILE)) {
      unlinkSync(EXPORT_FILE);
    }
    if (existsSync(CUSTOM_CSV_FILE)) {
      unlinkSync(CUSTOM_CSV_FILE);
    }
    if (existsSync(CUSTOM_MEMORY_FILE)) {
      unlinkSync(CUSTOM_MEMORY_FILE);
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
    expect(mem[0]).toHaveProperty("timestamp");
    expect(typeof mem[0].timestamp).toBe("string");
    expect(mem[0].timestamp).toMatch(/\d{4}-\d{2}-\d{2}T/);
  });

  test("should output memory log in reverse order when --show-memory flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["a", "b"]);
    main(["c", "d"]);
    main(["--show-memory"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[spy.mock.calls.length - 1][0];
    const parsedOutput = JSON.parse(loggedOutput);
    expect(parsedOutput).toHaveLength(3);
    expect(parsedOutput[0].args).toEqual(["--show-memory"]);
    expect(parsedOutput[1].args).toEqual(["c", "d"]);
    expect(parsedOutput[2].args).toEqual(["a", "b"]);
    spy.mockRestore();
  });

  test("should output memory log in chronological order when --show-memory-chronological flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    resetMemory();
    main(["first"]);
    main(["second"]);
    main(["--show-memory-chronological"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[spy.mock.calls.length - 1][0];
    const parsedOutput = JSON.parse(loggedOutput);
    expect(parsedOutput).toHaveLength(2);
    expect(parsedOutput[0].args).toEqual(["first"]);
    expect(parsedOutput[1].args).toEqual(["second"]);
    spy.mockRestore();
  });

  test("should persist memory log to disk when --persist-memory flag is provided (without compression)", () => {
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);
    main(["test1", "--persist-memory"]);
    expect(existsSync(MEMORY_LOG_FILE)).toBe(true);
    const fileContent = readFileSync(MEMORY_LOG_FILE, { encoding: "utf-8" });
    const parsed = JSON.parse(fileContent);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toHaveProperty("sessionId");
    expect(parsed[0].args).toEqual(["test1", "--persist-memory"]);
    expect(parsed[0]).toHaveProperty("timestamp");
  });

  test("should persist memory log to disk with compression when --persist-memory and --compress-memory flags are provided", () => {
    if (existsSync(COMPRESSED_LOG_FILE)) {
      unlinkSync(COMPRESSED_LOG_FILE);
    }
    main(["compressTest", "--persist-memory", "--compress-memory"]);
    expect(existsSync(COMPRESSED_LOG_FILE)).toBe(true);
    let effectivePath = existsSync(COMPRESSED_LOG_FILE) ? COMPRESSED_LOG_FILE : MEMORY_LOG_FILE;
    const data = readFileSync(effectivePath);
    if (effectivePath.endsWith(".gz")) {
      const decompressed = zlib.gunzipSync(data).toString("utf-8");
      const parsed = JSON.parse(decompressed);
      expect(parsed[parsed.length - 1].args).toEqual(["compressTest", "--persist-memory", "--compress-memory"]);
    } else {
      const parsed = JSON.parse(data.toString());
      expect(parsed[parsed.length - 1].args).toEqual(["compressTest", "--persist-memory", "--compress-memory"]);
    }
  });

  test("should clear memory log and delete persisted file when --clear-memory flag is provided", () => {
    main(["sample", "--persist-memory"]);
    expect(getMemory().length).toBe(1);
    expect(existsSync(MEMORY_LOG_FILE) || existsSync(COMPRESSED_LOG_FILE)).toBe(true);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--clear-memory"]);
    expect(getMemory().length).toBe(0);
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);
    expect(existsSync(COMPRESSED_LOG_FILE)).toBe(false);
    expect(spy).toHaveBeenCalledWith("Memory log cleared");
    spy.mockRestore();
  });

  test("should auto-load persisted memory log on startup", () => {
    const persisted = JSON.stringify([{ sessionId: "oldSession", args: ["old", "command"], timestamp: "2025-04-17T10:00:00.000Z" }]);
    writeFileSync(MEMORY_LOG_FILE, persisted, { encoding: "utf-8" });
    main(["new"]);
    const mem = getMemory();
    expect(mem.length).toBe(2);
    expect(mem[0].args).toEqual(["old", "command"]);
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
    expect(mem[0].args).toEqual(["command5"]);
    expect(mem[99].args).toEqual(["command104"]);
    mem.forEach(entry => {
      expect(entry).toHaveProperty("timestamp");
    });
  });

  test("should export memory log to a file when --export-memory flag is provided with default filename", () => {
    main(["exportTest1", "exportTest2"]);
    main(["--export-memory"]);
    expect(existsSync(EXPORT_FILE)).toBe(true);
    const exportedContent = readFileSync(EXPORT_FILE, { encoding: "utf-8" });
    const exportedLog = JSON.parse(exportedContent);
    expect(exportedLog.length).toBe(2);
    expect(exportedLog[0].args).toEqual(["exportTest1", "exportTest2"]);
  });

  test("should export memory log to a custom file when custom filename is provided with --export-memory", () => {
    main(["customExportTest"]);
    main(["--export-memory", "custom_export.json"]);
    expect(existsSync("custom_export.json")).toBe(true);
    const exportedContent = readFileSync("custom_export.json", { encoding: "utf-8" });
    const exportedLog = JSON.parse(exportedContent);
    expect(exportedLog.length).toBe(2);
    expect(exportedLog[0].args).toEqual(["customExportTest"]);
  });

  test("should export memory log in compressed format when --export-memory flag is provided with --compress option", () => {
    main(["exportCompressTest"]);
    main(["--export-memory", "compressed_export.json", "--compress"]);
    expect(existsSync("compressed_export.json")).toBe(true);
    const exportedData = readFileSync("compressed_export.json");
    expect(exportedData[0]).toBe(0x1f);
    expect(exportedData[1]).toBe(0x8b);
    const decompressed = zlib.gunzipSync(exportedData).toString("utf-8");
    const parsedData = JSON.parse(decompressed);
    expect(Array.isArray(parsedData)).toBe(true);
  });

  // New tests for custom memory path functionality
  test("should use custom memory path when --memory-path flag is provided", () => {
    main(["testCustom", "--persist-memory", "--memory-path", CUSTOM_MEMORY_FILE]);
    expect(existsSync(CUSTOM_MEMORY_FILE)).toBe(true);
    const content = readFileSync(CUSTOM_MEMORY_FILE, { encoding: "utf-8" });
    const parsed = JSON.parse(content);
    expect(parsed[parsed.length - 1].args).toEqual(["testCustom", "--persist-memory", "--memory-path", CUSTOM_MEMORY_FILE]);
  });

  test("should work with custom memory path in combination with compression", () => {
    if (existsSync(CUSTOM_MEMORY_FILE)) {
      unlinkSync(CUSTOM_MEMORY_FILE);
    }
    const customCompressedFile = CUSTOM_MEMORY_FILE + ".gz";
    main(["compressCustom", "--persist-memory", "--compress-memory", "--memory-path", customCompressedFile]);
    expect(existsSync(customCompressedFile)).toBe(true);
    const compressedData = readFileSync(customCompressedFile);
    const decompressed = zlib.gunzipSync(compressedData).toString("utf-8");
    const parsed = JSON.parse(decompressed);
    expect(parsed[parsed.length - 1].args).toEqual(["compressCustom", "--persist-memory", "--compress-memory", "--memory-path", customCompressedFile]);
    if (existsSync(customCompressedFile)) {
      unlinkSync(customCompressedFile);
    }
  });

  // Additional tests remain unchanged...
});
