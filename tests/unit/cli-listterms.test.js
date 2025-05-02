import { describe, test, expect, vi, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import { main } from "@src/lib/main.js";

describe("List-Terms Subcommand", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("successful listing to stdout", async () => {
    const mockDoc = { "@graph": [
      { "@id": "http://example.org/onto#A" },
      { "@id": "http://example.org/onto#B" }
    ] };
    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockDoc));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["list-terms", "--input", "dummy.json"]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("http://example.org/onto#A");
    expect(logSpy).toHaveBeenCalledWith("http://example.org/onto#B");
  });

  test("missing required flag exits with error", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["list-terms"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });

  test("invalid JSON exits with error", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue("not-json");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["list-terms", "--input", "dummy.json"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });

  test("missing @graph exits with error", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify({ notGraph: [] }));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["list-terms", "--input", "dummy.json"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Invalid ontology: missing @graph array");
  });
});
