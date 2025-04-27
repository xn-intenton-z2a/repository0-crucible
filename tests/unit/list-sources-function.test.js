import { describe, test, expect, vi, afterEach } from "vitest";
import fs from "fs";
import { listSources, PUBLIC_DATA_SOURCES } from "../../src/lib/main.js";

describe("listSources function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns default sources when no config file", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const result = await listSources("some/path.json");
    expect(result).toEqual(PUBLIC_DATA_SOURCES);
  });

  test("merges valid custom config", async () => {
    const config = [{ name: "Custom API", url: "https://example.com/api" }];
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(config));
    const result = await listSources("some/path.json");
    expect(result).toEqual([...PUBLIC_DATA_SOURCES, ...config]);
  });

  test("falls back on invalid JSON", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("not json");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await listSources("some/path.json");
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid data-sources.json"));
    expect(result).toEqual(PUBLIC_DATA_SOURCES);
  });

  test("falls back on invalid structure", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({ foo: "bar" }));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await listSources("some/path.json");
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid data-sources.json"));
    expect(result).toEqual(PUBLIC_DATA_SOURCES);
  });
});
