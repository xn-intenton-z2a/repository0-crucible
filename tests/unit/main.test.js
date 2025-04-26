import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, PUBLIC_DATA_SOURCES } from "@src/lib/main.js";
import pkg from "../../package.json" assert { type: "json" };
import fs from "fs";

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

  test("should display help message with --help", () => {
    process.argv = ["node", "src/lib/main.js", "--help"];
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(() => main()).not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain(
      "owl-builder: create and manage OWL ontologies from public data sources"
    );
    expect(output).toContain("Usage: node src/lib/main.js [options]");
    expect(output).toContain(
      "--help                Display this help message"
    );
    logSpy.mockRestore();
  });

  test("should display help message with -h", () => {
    process.argv = ["node", "src/lib/main.js", "-h"];
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(() => main()).not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain(
      "owl-builder: create and manage OWL ontologies from public data sources"
    );
    expect(output).toContain("Usage: node src/lib/main.js [options]");
    expect(output).toContain(
      "--help                Display this help message"
    );
    logSpy.mockRestore();
  });
});

describe("List Sources", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test("should list public data sources in JSON", () => {
    main(["--list-sources"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const expected = JSON.stringify(PUBLIC_DATA_SOURCES, null, 2);
    expect(logSpy).toHaveBeenCalledWith(expected);
  });
});

describe("Diagnostics Flag", () => {
  test("should output diagnostics JSON", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--diagnostics"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("version", pkg.version);
    expect(parsed).toHaveProperty("nodeVersion", process.version);
    expect(parsed).toHaveProperty("platform", process.platform);
    expect(parsed).toHaveProperty("arch", process.arch);
    expect(parsed).toHaveProperty("cwd", process.cwd());
    expect(parsed).toHaveProperty("publicDataSources", PUBLIC_DATA_SOURCES);
    expect(parsed).toHaveProperty("commands");
    expect(Array.isArray(parsed.commands)).toBe(true);
    expect(parsed.commands).toContain("--help");
    expect(parsed.commands).toContain("--diagnostics");
    logSpy.mockRestore();
  });
});

// New tests for custom data-sources.json support
describe("Custom Data Sources Config", () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    vi.restoreAllMocks();
  });

  test("should merge default with valid custom config", () => {
    const config = [{ name: "Custom API", url: "https://example.com/api" }];
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(config));
    main(["--list-sources"]);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toEqual([...PUBLIC_DATA_SOURCES, ...config]);
  });

  test("should fallback on invalid JSON config", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("not json");
    main(["--list-sources"]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("data-sources.json")
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
    const parsed = JSON.parse(logSpy.mock.calls[0][0]);
    expect(parsed).toEqual(PUBLIC_DATA_SOURCES);
  });

  test("should fallback on invalid structure", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({ foo: "bar" }));
    main(["--list-sources"]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("data-sources.json")
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
    const parsed = JSON.parse(logSpy.mock.calls[0][0]);
    expect(parsed).toEqual(PUBLIC_DATA_SOURCES);
  });

  test("default behavior remains when no config file", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    main(["--list-sources"]);
    expect(logSpy).toHaveBeenCalledWith(
      JSON.stringify(PUBLIC_DATA_SOURCES, null, 2)
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
