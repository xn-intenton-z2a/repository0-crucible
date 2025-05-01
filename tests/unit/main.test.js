import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main, PUBLIC_DATA_SOURCES, refreshSources, listSources } from "../../src/lib/main.js";
import pkg from "../../package.json" assert { type: "json" };
import fs from "fs";
import path from "path";
import os from "os";
import http from "http";
import { once } from "events";

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
    expect(output).toContain("owl-builder: create and manage OWL ontologies from public data sources");
    expect(output).toContain("Usage: node src/lib/main.js [options]");
    expect(output).toContain("--help                Display this help message");
    logSpy.mockRestore();
  });

  test("should display help message with -h", () => {
    process.argv = ["node", "src/lib/main.js", "-h"];
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(() => main()).not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain("owl-builder: create and manage OWL ontologies from public data sources");
    expect(output).toContain("Usage: node src/lib/main.js [options]");
    expect(output).toContain("--help                Display this help message");
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

// Diagnostics Flag
// Extended to include data and intermediate file metrics
import globalFetch from "node-fetch"; // ensure fetch structure

describe("Diagnostics Flag", () => {
  let tmpDir;
  let originalCwd;

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "diag-"));
    process.chdir(tmpDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
  });

  test("should output diagnostics JSON with file metrics", async () => {
    // setup sample data and intermediate directories
    fs.mkdirSync(path.join(tmpDir, "data"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "data", "a.json"), JSON.stringify({}), "utf8");
    fs.writeFileSync(path.join(tmpDir, "data", "b.json"), JSON.stringify({}), "utf8");
    fs.mkdirSync(path.join(tmpDir, "intermediate"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "intermediate", "x.json"), JSON.stringify({}), "utf8");

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({ status: 200 });

    await main(["--diagnostics"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);

    // existing assertions
    expect(parsed).toHaveProperty("version", pkg.version);
    expect(parsed).toHaveProperty("nodeVersion", process.version);
    expect(parsed).toHaveProperty("platform", process.platform);
    expect(parsed).toHaveProperty("arch", process.arch);
    expect(parsed).toHaveProperty("cwd", process.cwd());
    expect(parsed).toHaveProperty("publicDataSources");
    expect(parsed.publicDataSources).toEqual(PUBLIC_DATA_SOURCES);
    expect(parsed).toHaveProperty("commands");
    expect(Array.isArray(parsed.commands)).toBe(true);
    expect(parsed.commands).toContain("--help");
    expect(parsed.commands).toContain("--diagnostics");
    expect(parsed).toHaveProperty("healthChecks");
    expect(Array.isArray(parsed.healthChecks)).toBe(true);
    expect(parsed.healthChecks[0]).toMatchObject({
      name: PUBLIC_DATA_SOURCES[0].name,
      url: PUBLIC_DATA_SOURCES[0].url,
      statusCode: 200,
      reachable: true,
    });
    expect(typeof parsed.healthChecks[0].latencyMs).toBe("number");
    expect(parsed).toHaveProperty("uptimeSeconds");
    expect(typeof parsed.uptimeSeconds).toBe("number");
    expect(parsed).toHaveProperty("memoryUsage");
    expect(parsed.memoryUsage).toMatchObject({
      rss: expect.any(Number),
      heapTotal: expect.any(Number),
      heapUsed: expect.any(Number),
      external: expect.any(Number),
      arrayBuffers: expect.any(Number),
    });

    // new assertions for file metrics
    expect(parsed).toHaveProperty("dataFilesCount", 2);
    expect(parsed).toHaveProperty("dataFiles");
    expect(parsed.dataFiles).toEqual(["a.json", "b.json"]);
    expect(parsed).toHaveProperty("intermediateFilesCount", 1);
    expect(parsed.intermediateFiles).toEqual(["x.json"]);

    // new assertions for dependencies
    expect(parsed).toHaveProperty("dependencies");
    expect(parsed.dependencies).toEqual(pkg.dependencies);
    expect(parsed).toHaveProperty("devDependencies");
    expect(parsed.devDependencies).toEqual(pkg.devDependencies);

    fetchSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should handle failed health check gracefully with empty file metrics", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(new Error("fail"));

    await main(["--diagnostics"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);

    expect(parsed.healthChecks[0]).toEqual({
      name: PUBLIC_DATA_SOURCES[0].name,
      url: PUBLIC_DATA_SOURCES[0].url,
      statusCode: null,
      latencyMs: null,
      reachable: false,
    });
    // new assertions: no directories => empty metrics
    expect(parsed).toHaveProperty("dataFilesCount", 0);
    expect(parsed.dataFiles).toEqual([]);
    expect(parsed).toHaveProperty("intermediateFilesCount", 0);
    expect(parsed.intermediateFiles).toEqual([]);

    fetchSpy.mockRestore();
    logSpy.mockRestore();
  });
});
