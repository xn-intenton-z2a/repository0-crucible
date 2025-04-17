import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import zlib from "zlib";
const { main, getMemory, resetMemory } = mainModule;

const MEMORY_LOG_FILE = "memory.log";
const COMPRESSED_LOG_FILE = "memory.log.gz";
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
    if (existsSync("custom_export.json")) {
      unlinkSync("custom_export.json");
    }
    if (existsSync("compressed_export.json")) {
      unlinkSync("compressed_export.json");
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
    if (existsSync("custom_export.json")) {
      unlinkSync("custom_export.json");
    }
    if (existsSync("compressed_export.json")) {
      unlinkSync("compressed_export.json");
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
    const compressedData = readFileSync(COMPRESSED_LOG_FILE);
    const decompressed = zlib.gunzipSync(compressedData).toString("utf-8");
    const parsed = JSON.parse(decompressed);
    expect(parsed[parsed.length - 1].args).toEqual(["compressTest", "--persist-memory", "--compress-memory"]);
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
    // Check gzip magic numbers: 0x1f8b
    expect(exportedData[0]).toBe(0x1f);
    expect(exportedData[1]).toBe(0x8b);
    const decompressed = zlib.gunzipSync(exportedData).toString("utf-8");
    const parsedData = JSON.parse(decompressed);
    expect(Array.isArray(parsedData)).toBe(true);
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

  test("should output filtered memory log when --query-memory flag is provided", () => {
    main(["alphaCommand"]);
    main(["betaCommand"]);
    main(["anotherAlpha"]);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--query-memory", "alpha"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[0][0];
    const filtered = JSON.parse(loggedOutput);
    expect(filtered.length).toBe(2);
    spy.mockRestore();
  });

  test("should output filtered memory log when --query-tag flag is provided", () => {
    main(["alphaCommand", "--tag-memory", "myTag"]);
    main(["betaCommand"]);
    main(["gammaCommand", "--tag-memory", "MYTAG"]);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--query-tag", "mytag"]);
    expect(spy).toHaveBeenCalled();
    const loggedOutput = spy.mock.calls[spy.mock.calls.length - 1][0];
    const filtered = JSON.parse(loggedOutput);
    expect(filtered.length).toBe(2);
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

  describe("Update Memory Tag Feature", () => {
    test("should update memory log tag when valid sessionId and new tag provided", () => {
      main(["testCommand", "--tag-memory", "oldTag"]);
      const memBefore = getMemory();
      const sessionId = memBefore[0].sessionId;
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--update-memory-tag", sessionId, "newTestTag", "--compress-memory"]);
      const memAfter = getMemory();
      const updatedEntry = memAfter.find(e => e.sessionId === sessionId);
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.tag).toBe("newTestTag");
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

    test("should error when provided sessionId does not exist for tag update", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      main(["--update-memory-tag", "nonexistentSession", "newTag"]);
      expect(spy).toHaveBeenCalledWith("No memory log entry found with sessionId:", "nonexistentSession");
      spy.mockRestore();
    });
  });

  describe("Update Memory Annotation Feature", () => {
    test("should update memory log annotation when valid sessionId and new annotation provided", () => {
      main(["annotateCommand", "--annotate-memory", "initialNote"]);
      const memBefore = getMemory();
      const sessionId = memBefore[0].sessionId;
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--update-memory-annotation", sessionId, "updatedNote", "--compress-memory"]);
      const memAfter = getMemory();
      const updatedEntry = memAfter.find(e => e.sessionId === sessionId);
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.annotation).toBe("updatedNote");
      spy.mockRestore();
    });

    test("should error when --update-memory-annotation flag is provided without sufficient arguments", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialLength = getMemory().length;
      main(["--update-memory-annotation", "onlyOneArg"]);
      expect(spy).toHaveBeenCalledWith("Invalid usage: --update-memory-annotation requires a sessionId and a new annotation value");
      spy.mockRestore();
      const mem = getMemory();
      expect(mem.length).toBe(initialLength);
    });

    test("should error when provided sessionId does not exist for annotation update", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      main(["--update-memory-annotation", "nonexistentSession", "newAnnotation"]);
      expect(spy).toHaveBeenCalledWith("No memory log entry found with sessionId:", "nonexistentSession");
      spy.mockRestore();
    });
  });

  describe("Query Annotation Flag", () => {
    test("should output filtered memory log when --query-annotation flag is provided", () => {
      resetMemory();
      main(["commandWithAnnotation", "--annotate-memory", "Review this ASAP"]);
      main(["anotherCommand", "--annotate-memory", "No review needed"]);
      main(["commandWithoutAnnotation"]);
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--query-annotation", "review"]);
      const output = spy.mock.calls[spy.mock.calls.length - 1][0];
      const filtered = JSON.parse(output);
      expect(filtered.length).toBe(2);
      spy.mockRestore();
    });

    test("should error when --query-annotation flag is provided without a query string", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialLength = getMemory().length;
      main(["--query-annotation"]);
      expect(spy).toHaveBeenCalledWith("No annotation specified for --query-annotation flag");
      spy.mockRestore();
      const mem = getMemory();
      expect(mem.length).toBe(initialLength);
    });
  });

  describe("Delete Memory by Annotation Feature", () => {
    beforeEach(() => {
      resetMemory();
    });

    test("should delete entries that match the given annotation (case-insensitive)", () => {
      main(["cmd1", "--annotate-memory", "review"]);
      main(["cmd2", "--annotate-memory", "other"]);
      main(["cmd3", "--annotate-memory", "review"]);
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--delete-memory-by-annotation", "review"]);
      const output = spy.mock.calls[spy.mock.calls.length - 1][0];
      expect(output).toBe("Deleted 2 entries with annotation: review");
      const mem = getMemory();
      expect(mem.some(e => e.annotation && e.annotation.toLowerCase() === "review")).toBe(false);
      spy.mockRestore();
    });

    test("should not delete entries if none match the given annotation", () => {
      main(["cmd1", "--annotate-memory", "note1"]);
      main(["cmd2"]);
      const initialCount = getMemory().length;
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--delete-memory-by-annotation", "nonexistent"]);
      const output = spy.mock.calls[spy.mock.calls.length - 1][0];
      expect(output).toBe("Deleted 0 entries with annotation: nonexistent");
      const mem = getMemory();
      expect(mem.length).toBe(initialCount);
      spy.mockRestore();
    });

    test("should output error when the flag is provided without a valid annotation argument", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialCount = getMemory().length;
      main(["--delete-memory-by-annotation"]);
      expect(spy).toHaveBeenCalledWith("Invalid usage: --delete-memory-by-annotation requires a valid annotation value");
      const mem = getMemory();
      expect(mem.length).toBe(initialCount);
      spy.mockRestore();
    });
  });

  describe("Delete Memory by Date Range Feature", () => {
    test("should delete entries with timestamps within the specified date range", () => {
      resetMemory();
      const entries = [
        { sessionId: "s1", args: ["cmd1"], timestamp: "2025-04-17T10:00:00.000Z" },
        { sessionId: "s2", args: ["cmd2"], timestamp: "2025-04-17T12:00:00.000Z" },
        { sessionId: "s3", args: ["cmd3"], timestamp: "2025-04-17T15:00:00.000Z" }
      ];
      const mem = getMemory();
      entries.forEach(e => mem.push(e));
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify(getMemory()));
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--delete-memory-range", "2025-04-17T10:00:00.000Z", "2025-04-17T13:00:00.000Z"]);
      expect(spy).toHaveBeenCalledWith("Deleted 2 entries from memory log between 2025-04-17T10:00:00.000Z and 2025-04-17T13:00:00.000Z.");
      const updatedMem = getMemory();
      expect(updatedMem).toHaveLength(1);
      expect(updatedMem[0].sessionId).toBe("s3");
      spy.mockRestore();
    });
  });

  describe("Memory Expiration Feature", () => {
    beforeEach(() => {
      resetMemory();
      if (existsSync(MEMORY_LOG_FILE)) {
        unlinkSync(MEMORY_LOG_FILE);
      }
    });

    test("should expire entries older than specified minutes", () => {
      const oldTimestamp = new Date(Date.now() - 70 * 60 * 1000).toISOString();
      const newTimestamp = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      const oldEntry = { sessionId: "oldEntry", args: ["old"], timestamp: oldTimestamp };
      const newEntry = { sessionId: "newEntry", args: ["new"], timestamp: newTimestamp };
      getMemory().push(oldEntry, newEntry);
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify(getMemory()));
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--expire-memory", "60"]);
      const memAfter = getMemory();
      expect(memAfter).toHaveLength(1);
      expect(memAfter[0].sessionId).toBe("newEntry");
      const output = spy.mock.calls[0][0];
      expect(output).toBe("Expired 1 entries older than 60 minutes.");
      spy.mockRestore();
    });

    test("should not expire any entries if all are within cutoff", () => {
      resetMemory();
      const newTimestamp1 = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const newTimestamp2 = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const entry1 = { sessionId: "entry1", args: ["test"], timestamp: newTimestamp1 };
      const entry2 = { sessionId: "entry2", args: ["test"], timestamp: newTimestamp2 };
      getMemory().push(entry1, entry2);
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify(getMemory()));
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--expire-memory", "60"]);
      const memAfter = getMemory();
      expect(memAfter).toHaveLength(2);
      const output = spy.mock.calls[0][0];
      expect(output).toBe("Expired 0 entries older than 60 minutes.");
      spy.mockRestore();
    });

    test("should handle invalid usage when no minutes provided", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialLength = getMemory().length;
      main(["--expire-memory"]);
      expect(spy).toHaveBeenCalledWith("Invalid usage: --expire-memory requires a number of minutes");
      expect(getMemory().length).toBe(initialLength);
      spy.mockRestore();
    });

    test("should handle invalid minutes value", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const initialLength = getMemory().length;
      main(["--expire-memory", "-5"]);
      expect(spy).toHaveBeenCalledWith("Invalid minutes value provided. It must be a positive integer.");
      expect(getMemory().length).toBe(initialLength);
      spy.mockRestore();
    });
  });
});
