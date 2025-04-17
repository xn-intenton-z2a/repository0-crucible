import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "../../src/lib/main.js";
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
    if (existsSync(EXPORT_FILE)) {
      unlinkSync(EXPORT_FILE);
    }
    if (existsSync("custom_export.json")) {
      unlinkSync("custom_export.json");
    }
  });

  afterEach(() => {
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

  test("should persist memory log to disk when --persist-memory flag is provided", () => {
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

  test("should clear memory log and delete persisted file when --clear-memory flag is provided", () => {
    main(["sample", "--persist-memory"]);
    expect(getMemory().length).toBe(1);
    expect(existsSync(MEMORY_LOG_FILE)).toBe(true);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--clear-memory"]);
    expect(getMemory().length).toBe(0);
    expect(existsSync(MEMORY_LOG_FILE)).toBe(false);
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
    expect(mem[0]).toHaveProperty("timestamp");
    expect(mem[1]).toHaveProperty("timestamp");
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
    expect(exportedLog[0]).toHaveProperty("timestamp");
  });

  test("should export memory log to a custom file when custom filename is provided with --export-memory", () => {
    main(["customExportTest"]);
    main(["--export-memory", "custom_export.json"]);
    expect(existsSync("custom_export.json")).toBe(true);
    const exportedContent = readFileSync("custom_export.json", { encoding: "utf-8" });
    const exportedLog = JSON.parse(exportedContent);
    expect(exportedLog.length).toBe(2);
    expect(exportedLog[0].args).toEqual(["customExportTest"]);
    expect(exportedLog[0]).toHaveProperty("timestamp");
  });

  test("should import memory log from a file when --import-memory flag is provided", () => {
    const tempLog = [{ sessionId: "importSession", args: ["imported", "command"], timestamp: "2025-04-17T10:05:00.000Z" }];
    const tempFilename = "temp_import.json";
    writeFileSync(tempFilename, JSON.stringify(tempLog), { encoding: "utf-8" });
    main(["existing"]);
    const initialLength = getMemory().length;
    main(["--import-memory", tempFilename]);
    const mergedMemory = getMemory();
    expect(mergedMemory.length).toBe(tempLog.length + 1);
    expect(mergedMemory[mergedMemory.length - 1].args).toEqual(["--import-memory", tempFilename]);
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
    expect(filtered[0].args).toEqual(["alphaCommand"]);
    expect(filtered[1].args).toEqual(["anotherAlpha"]);
    filtered.forEach(entry => {
      expect(entry).toHaveProperty("timestamp");
    });
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
    expect(filtered[0].tag.toLowerCase()).toBe("mytag");
    expect(filtered[1].tag.toLowerCase()).toBe("mytag");
    filtered.forEach(entry => {
      expect(entry).toHaveProperty("timestamp");
    });
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
    mem.forEach(entry => {
      expect(entry).toHaveProperty("timestamp");
    });
  });

  test("should log command arguments with tag when --tag-memory flag is provided", () => {
    resetMemory();
    main(["sampleCommand", "--tag-memory", "testTag"]);
    const mem = getMemory();
    expect(mem).toHaveLength(1);
    expect(mem[0]).toHaveProperty("tag", "testTag");
    expect(mem[0].args).toEqual(["sampleCommand", "--tag-memory", "testTag"]);
    expect(mem[0]).toHaveProperty("timestamp");
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
      expect(memBefore.length).toBeGreaterThan(0);
      const sessionId = memBefore[0].sessionId;
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--update-memory-tag", sessionId, "newTestTag"]);
      const memAfter = getMemory();
      const updatedEntry = memAfter.find(e => e.sessionId === sessionId);
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.tag).toBe("newTestTag");
      expect(updatedEntry).toHaveProperty("timestamp");
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

    test("should error when provided sessionId does not exist for tag update", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      main(["--update-memory-tag", "nonexistentSession", "newTag"]);
      expect(spy).toHaveBeenCalledWith("No memory log entry found with sessionId:", "nonexistentSession");
      spy.mockRestore();
    });

    test("should persist memory tag update to disk when --update-memory-tag flag is provided", () => {
      const initialEntry = { sessionId: "persistTestSession", args: ["persistTest"], tag: "oldPersistTag", timestamp: "2025-04-17T10:10:00.000Z" };
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify([initialEntry]));
      main(["dummy"]);
      main(["--update-memory-tag", "persistTestSession", "newPersistTag"]);
      const updatedData = JSON.parse(readFileSync(MEMORY_LOG_FILE, { encoding: "utf-8" }));
      const updatedEntry = updatedData.find(e => e.sessionId === "persistTestSession");
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.tag).toBe("newPersistTag");
      expect(updatedEntry).toHaveProperty("timestamp");
    });
  });

  describe("Update Memory Annotation Feature", () => {
    test("should update memory log annotation when valid sessionId and new annotation provided", () => {
      main(["annotateCommand", "--annotate-memory", "initialNote"]);
      const memBefore = getMemory();
      expect(memBefore.length).toBeGreaterThan(0);
      const sessionId = memBefore[0].sessionId;
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--update-memory-annotation", sessionId, "updatedNote"]);
      const memAfter = getMemory();
      const updatedEntry = memAfter.find(e => e.sessionId === sessionId);
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.annotation).toBe("updatedNote");
      expect(updatedEntry).toHaveProperty("timestamp");
      expect(spy).toHaveBeenCalledWith("Memory log entry annotation updated:", JSON.stringify(updatedEntry));
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

    test("should persist memory annotation update to disk when --update-memory-annotation flag is provided", () => {
      const initialEntry = { sessionId: "persistAnnotSession", args: ["persistAnnot"], annotation: "oldNote", timestamp: "2025-04-17T10:10:00.000Z" };
      writeFileSync(MEMORY_LOG_FILE, JSON.stringify([initialEntry]));
      main(["dummy"]);
      main(["--update-memory-annotation", "persistAnnotSession", "newNote"]);
      const updatedData = JSON.parse(readFileSync(MEMORY_LOG_FILE, { encoding: "utf-8" }));
      const updatedEntry = updatedData.find(e => e.sessionId === "persistAnnotSession");
      expect(updatedEntry).toBeDefined();
      expect(updatedEntry.annotation).toBe("newNote");
      expect(updatedEntry).toHaveProperty("timestamp");
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
      expect(spy).toHaveBeenCalled();
      const output = spy.mock.calls[spy.mock.calls.length - 1][0];
      const filtered = JSON.parse(output);
      // Both annotations contain 'review' (case-insensitive)
      expect(filtered.length).toBe(2);
      filtered.forEach(entry => {
        expect(entry.annotation.toLowerCase()).toMatch(/review/);
      });
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

  describe("Detailed Diagnostics Flag", () => {
    test("should output detailed diagnostics including memorySessionIds", () => {
      resetMemory();
      main(["entry1"]);
      main(["entry2", "--tag-memory", "tagA"]);
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--detailed-diagnostics"]);
      expect(spy).toHaveBeenCalled();
      const output = spy.mock.calls[0][0];
      const detailedDiag = JSON.parse(output);
      expect(detailedDiag).toHaveProperty("memoryLimit");
      expect(detailedDiag).toHaveProperty("memoryLogCount");
      expect(detailedDiag).toHaveProperty("memoryFilePersisted");
      expect(detailedDiag).toHaveProperty("memorySessionIds");
      expect(Array.isArray(detailedDiag.memorySessionIds)).toBe(true);
      const mem = getMemory();
      const expectedIds = mem.map(e => e.sessionId);
      expect(detailedDiag.memorySessionIds).toEqual(expectedIds);
      spy.mockRestore();
    });
  });

  describe("Frequency Stats Flag", () => {
    test("should output frequency stats with correct counts", () => {
      resetMemory();
      // Create several log entries
      main(["alpha", "beta"]);
      main(["beta", "gamma"]);
      main(["alpha"]);
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--frequency-stats"]);
      expect(spy).toHaveBeenCalled();
      const output = spy.mock.calls[spy.mock.calls.length - 1][0];
      const freq = JSON.parse(output);
      expect(freq).toMatchObject({
        "alpha": 2,
        "beta": 2,
        "gamma": 1
      });
      spy.mockRestore();
    });
  });

  describe("Annotate Memory Feature", () => {
    test("should log command arguments with annotation when --annotate-memory flag is provided", () => {
      resetMemory();
      main(["sampleCommand", "--annotate-memory", "note1"]);
      const mem = getMemory();
      expect(mem).toHaveLength(1);
      expect(mem[0]).toHaveProperty("annotation", "note1");
      expect(mem[0].args).toEqual(["sampleCommand", "--annotate-memory", "note1"]);
      expect(mem[0]).toHaveProperty("timestamp");
    });

    test("should error when --annotate-memory flag is provided without a valid annotation", () => {
      const initialLength = getMemory().length;
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      main(["sampleCommand", "--annotate-memory"]);
      expect(spy).toHaveBeenCalledWith("No annotation value provided for --annotate-memory flag");
      spy.mockRestore();
      const mem = getMemory();
      expect(mem.length).toBe(initialLength);
    });
  });
});
