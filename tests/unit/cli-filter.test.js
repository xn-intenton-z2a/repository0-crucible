import { describe, test, expect, vi, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import { main } from "@src/lib/main.js";

describe("Filter Subcommand", () => {
  const tmpDir = os.tmpdir();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("successful filtering to stdout", async () => {
    const data = { "@graph": [
      { "@id": "1", type: "Person", name: "Alice" },
      { "@id": "2", type: "Animal", name: "Bob" },
      { "@id": "3", type: "Person", name: "Charlie" }
    ]};
    const input = path.join(tmpDir, `filt-${Date.now()}.json`);
    await fs.writeFile(input, JSON.stringify(data), "utf-8");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["filter", "--input", input, "--property", "type", "--value", "Person"]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const out = logSpy.mock.calls[0][0];
    const arr = JSON.parse(out);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(2);
    expect(arr[0].type).toBe("Person");
    await fs.rm(input);
  });

  test("writes filtered results to file when output provided", async () => {
    const data = { "@graph": [
      { "@id": "A", prop: "X" },
      { "@id": "B", prop: "Y" }
    ]};
    const input = path.join(tmpDir, `fil2-${Date.now()}.json`);
    const output = path.join(tmpDir, `fil2-${Date.now()}-out.json`);
    await fs.writeFile(input, JSON.stringify(data), "utf-8");
    const code = await main(["filter", "--input", input, "--property", "prop", "--value", "Y", "--output", output]);
    expect(code).toBe(0);
    const content = await fs.readFile(output, "utf-8");
    const arr = JSON.parse(content);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(1);
    expect(arr[0]["@id"]).toBe("B");
    await fs.rm(input);
    await fs.rm(output);
  });

  test("missing required flags exits with error", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["filter"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });

  test("invalid JSON exits with error", async () => {
    const input = path.join(tmpDir, `fil3-${Date.now()}.json`);
    await fs.writeFile(input, "not-json", "utf-8");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["filter", "--input", input, "--property", "p", "--value", "v"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
    await fs.rm(input);
  });

  test("missing @graph exits with error", async () => {
    const input = path.join(tmpDir, `fil4-${Date.now()}.json`);
    await fs.writeFile(input, JSON.stringify({ foo: [] }), "utf-8");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["filter", "--input", input, "--property", "p", "--value", "v"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Error during filter: missing @graph array");
    await fs.rm(input);
  });

  test("no nodes match returns empty array", async () => {
    const data = { "@graph": [
      { "@id": "1", k: "a" }
    ]};
    const input = path.join(tmpDir, `fil5-${Date.now()}.json`);
    await fs.writeFile(input, JSON.stringify(data), "utf-8");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["filter", "--input", input, "--property", "k", "--value", "b"]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const out = logSpy.mock.calls[0][0];
    const arr = JSON.parse(out);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(0);
    await fs.rm(input);
  });
});
