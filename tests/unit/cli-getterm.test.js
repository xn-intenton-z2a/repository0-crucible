import { describe, test, expect, vi, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import { main } from "@src/lib/main.js";

describe("Get-Term Subcommand", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("successful retrieval to stdout", async () => {
    const mockDoc = { "@graph": [
      { "@id": "http://example.org/onto#Term1", foo: "bar" },
      { "@id": "http://example.org/onto#Term2" }
    ] };
    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockDoc));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["get-term", "--input", "dummy.json", "--term", "Term1"]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalled();
    const out = logSpy.mock.calls[0][0];
    const obj = JSON.parse(out);
    expect(obj.foo).toBe("bar");
  });

  test("successful retrieval to file", async () => {
    const tmpDir = os.tmpdir();
    const input = path.join(tmpDir, `in-${Date.now()}.json`);
    const output = path.join(tmpDir, `out-${Date.now()}.json`);
    const doc = { "@graph": [
      { "@id": "http://example.org/onto#T1", val: 123 }
    ] };
    await fs.writeFile(input, JSON.stringify(doc), "utf-8");
    const code = await main([
      "get-term",
      "--input",
      input,
      "--term",
      "T1",
      "--output",
      output
    ]);
    expect(code).toBe(0);
    const content = await fs.readFile(output, "utf-8");
    const obj = JSON.parse(content);
    expect(obj.val).toBe(123);
    await fs.rm(input);
    await fs.rm(output);
  });

  test("missing required flags exits with error", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["get-term", "--input", "f.json"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });

  test("term not found exits with error", async () => {
    const mockDoc = { "@graph": [ { "@id": "http://example.org/onto#A" } ] };
    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockDoc));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["get-term", "--input", "dummy.json", "--term", "X"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Term not found: X");
  });
});
