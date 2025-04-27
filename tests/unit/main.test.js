import { describe, test, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main, PUBLIC_DATA_SOURCES, refreshSources, listSources } from "../../src/lib/main.js";
import pkg from "../../package.json" assert { type: "json" };
import fs from "fs";
import path from "path";
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
  test("should output diagnostics JSON", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Mock HEAD fetch for healthChecks
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({ status: 200 });
    await main(["--diagnostics"]);
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
    // Check healthChecks
    expect(parsed).toHaveProperty("healthChecks");
    expect(Array.isArray(parsed.healthChecks)).toBe(true);
    expect(parsed.healthChecks).toHaveLength(PUBLIC_DATA_SOURCES.length);
    const hc = parsed.healthChecks[0];
    expect(hc).toMatchObject({
      name: PUBLIC_DATA_SOURCES[0].name,
      url: PUBLIC_DATA_SOURCES[0].url,
      statusCode: 200,
      reachable: true
    });
    expect(typeof hc.latencyMs).toBe("number");
    // Check system metrics
    expect(parsed).toHaveProperty("uptimeSeconds");
    expect(typeof parsed.uptimeSeconds).toBe("number");
    expect(parsed).toHaveProperty("memoryUsage");
    expect(parsed.memoryUsage).toMatchObject({
      rss: expect.any(Number),
      heapTotal: expect.any(Number),
      heapUsed: expect.any(Number),
      external: expect.any(Number),
      arrayBuffers: expect.any(Number)
    });
    fetchSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should handle failed health check gracefully", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Mock failed fetch
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(new Error("fail"));
    await main(["--diagnostics"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    const hc = parsed.healthChecks[0];
    expect(hc).toEqual({
      name: PUBLIC_DATA_SOURCES[0].name,
      url: PUBLIC_DATA_SOURCES[0].url,
      statusCode: null,
      latencyMs: null,
      reachable: false
    });
    // Check system metrics present
    expect(parsed).toHaveProperty("uptimeSeconds");
    expect(typeof parsed.uptimeSeconds).toBe("number");
    expect(parsed).toHaveProperty("memoryUsage");
    expect(parsed.memoryUsage).toMatchObject({
      rss: expect.any(Number),
      heapTotal: expect.any(Number),
      heapUsed: expect.any(Number),
      external: expect.any(Number),
      arrayBuffers: expect.any(Number)
    });
    fetchSpy.mockRestore();
    logSpy.mockRestore();
  });
});

// New tests for capital-cities CLI flag
describe('--capital-cities CLI flag', () => {
  test('outputs correct JSON-LD document', async () => {
    const mockBinding = { country: { value: 'http://example.org/C' }, capital: { value: 'http://example.org/K' } };
    const mockResponse = { results: { bindings: [mockBinding] } };
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({ status: 200, json: () => Promise.resolve(mockResponse) });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--capital-cities']);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toEqual({
      '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' },
      '@graph': [{ '@id': 'http://example.org/C', capital: 'http://example.org/K' }]
    });
    fetchSpy.mockRestore();
    logSpy.mockRestore();
  });
});
