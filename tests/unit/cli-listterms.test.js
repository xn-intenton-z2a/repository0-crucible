import { describe, test, expect, vi, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import { main } from "@src/lib/main.js";

describe("List-Terms Subcommand", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("successful listing to stdout", async () => {
    const tmpDir = os.tmpdir();
    const inputFile = path.join(tmpDir, `list-${Date.now()}.json`);
    const mockDoc = { "@graph": [
      { "@id": "http://example.org/onto#A" },
      { "@id": "http://example.org/onto#B" }
    ] };
    await fs.writeFile(inputFile, JSON.stringify(mockDoc), "utf-8");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["list-terms", "--input", inputFile]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("http://example.org/onto#A");
    expect(logSpy).toHaveBeenCalledWith("http://example.org/onto#B");
    await fs.rm(inputFile);
  });

  test("missing required flag exits with error", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["list-terms"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });

  test("invalid JSON exits with error", async () => {
    const tmpDir = os.tmpdir();
    const inputFile = path.join(tmpDir, `list-${Date.now()}.json`);
    await fs.writeFile(inputFile, "not-json", "utf-8");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["list-terms", "--input", inputFile]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
    await fs.rm(inputFile);
  });

  test("missing @graph exits with error", async () => {
    const tmpDir = os.tmpdir();
    const inputFile = path.join(tmpDir, `list-${Date.now()}.json`);
    await fs.writeFile(inputFile, JSON.stringify({ notGraph: [] }), "utf-8");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["list-terms", "--input", inputFile]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Invalid ontology: missing @graph array");
    await fs.rm(inputFile);
  });
});
