import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { buildIntermediate } from "../../src/lib/main.js";

describe("buildIntermediate function", () => {
  let existsSpy, mkdirSpy, readdirSpy, readFileSpy, writeFileSpy, logSpy, errorSpy;
  const dataDir = path.join(process.cwd(), "data");
  const intermediateDir = path.join(process.cwd(), "intermediate");

  beforeEach(() => {
    existsSpy = vi.spyOn(fs, "existsSync");
    mkdirSpy = vi.spyOn(fs, "mkdirSync").mockImplementation(() => {});
    readdirSpy = vi.spyOn(fs, "readdirSync");
    readFileSpy = vi.spyOn(fs, "readFileSync");
    writeFileSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("logs error when data dir missing and does not throw", () => {
    existsSpy.mockReturnValue(false);
    expect(() => buildIntermediate()).not.toThrow();
    expect(errorSpy).toHaveBeenCalledWith("Error: data/ directory not found");
    expect(logSpy).not.toHaveBeenCalled();
  });

  test("handles empty data dir with summary only", () => {
    existsSpy.mockImplementation((p) => p === dataDir);
    readdirSpy.mockReturnValue([]);
    buildIntermediate();
    expect(mkdirSpy).toHaveBeenCalledWith(intermediateDir, { recursive: true });
    expect(logSpy).toHaveBeenCalledWith("Generated 0 intermediate artifacts into intermediate/");
  });

  test("processes one valid JSON file with results.bindings", () => {
    const fileName = "sample.json";
    const binding = { a: { value: "id1" }, b: { value: "val2" } };
    existsSpy.mockImplementation((p) => true);
    readdirSpy.mockReturnValue([fileName]);
    readFileSpy.mockReturnValue(JSON.stringify({ results: { bindings: [binding] } }));

    buildIntermediate();
    expect(writeFileSpy).toHaveBeenCalledWith(
      path.join(intermediateDir, "sample-intermediate.json"),
      JSON.stringify({
        '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' },
        '@graph': [{ '@id': 'id1', b: 'val2' }]
      }, null, 2),
      'utf8'
    );
    expect(logSpy).toHaveBeenCalledWith("written sample-intermediate.json");
    expect(logSpy).toHaveBeenCalledWith("Generated 1 intermediate artifacts into intermediate/");
  });
});