import { describe, test, expect, vi, afterEach } from "vitest";
import fs from "fs";
import { addSource, removeSource, listSources, PUBLIC_DATA_SOURCES } from "../../src/lib/main.js";

describe("addSource function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("adds new source when config file does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const newSource = { name: "Custom API", url: "https://example.com/api" };
    const result = addSource(newSource, "data-sources.json");
    expect(writeSpy).toHaveBeenCalledWith("data-sources.json", JSON.stringify([newSource], null, 2), "utf8");
    expect(result).toEqual([...PUBLIC_DATA_SOURCES, newSource]);
  });

  test("does not add duplicate source", () => {
    const existing = { name: "Custom API", url: "https://example.com/api" };
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify([existing]));
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const result = addSource(existing, "data-sources.json");
    expect(writeSpy).not.toHaveBeenCalled();
    expect(result).toEqual([...PUBLIC_DATA_SOURCES, existing]);
  });

  test("throws error for invalid name", () => {
    expect(() => addSource({ name: "", url: "https://example.com" })).toThrow("Invalid source name");
  });

  test("throws error for invalid URL", () => {
    expect(() => addSource({ name: "name", url: "not a url" })).toThrow("Invalid source URL");
  });
});

describe("removeSource function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns defaults when config file does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const result = removeSource("identifier", "data-sources.json");
    expect(writeSpy).not.toHaveBeenCalled();
    expect(result).toEqual(PUBLIC_DATA_SOURCES);
  });

  test("removes existing source by name", () => {
    const custom = [
      { name: "A", url: "u1" },
      { name: "B", url: "u2" },
    ];
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(custom));
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const result = removeSource("A", "data-sources.json");
    expect(writeSpy).toHaveBeenCalledWith(
      "data-sources.json",
      JSON.stringify([{ name: "B", url: "u2" }], null, 2),
      "utf8",
    );
    expect(result).toEqual([...PUBLIC_DATA_SOURCES, { name: "B", url: "u2" }]);
  });

  test("removes existing source by url", () => {
    const custom = [
      { name: "A", url: "u1" },
      { name: "B", url: "u2" },
    ];
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(custom));
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const result = removeSource("u2", "data-sources.json");
    expect(writeSpy).toHaveBeenCalledWith(
      "data-sources.json",
      JSON.stringify([{ name: "A", url: "u1" }], null, 2),
      "utf8",
    );
    expect(result).toEqual([...PUBLIC_DATA_SOURCES, { name: "A", url: "u1" }]);
  });

  test("does not remove when identifier not found", () => {
    const custom = [{ name: "A", url: "u1" }];
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(custom));
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const result = removeSource("X", "data-sources.json");
    expect(writeSpy).not.toHaveBeenCalled();
    expect(result).toEqual([...PUBLIC_DATA_SOURCES, ...custom]);
  });
});
