import { describe, test, expect, vi } from "vitest";
import {
  supportedDataSources,
  getSupportedDataSources,
  fetchSource,
  main,
} from "@src/lib/main.js";

const validUrl = supportedDataSources[0];
const invalidUrl = "https://invalid.example.com";
const sampleData = [{ foo: "bar" }];

// Preserve global fetch for restoration
const originalFetch = global.fetch;

describe("Main Module API", () => {
  test("supportedDataSources should be a non-empty array", () => {
    expect(Array.isArray(supportedDataSources)).toBe(true);
    expect(supportedDataSources.length).toBeGreaterThan(0);
  });

  test("getSupportedDataSources returns the supportedDataSources array", () => {
    expect(getSupportedDataSources()).toEqual(supportedDataSources);
  });
});

describe("fetchSource API", () => {
  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  test("fetchSource resolves data for valid URL", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(sampleData),
    });
    await expect(fetchSource(validUrl)).resolves.toEqual(sampleData);
    expect(global.fetch).toHaveBeenCalledWith(validUrl);
  });

  test("fetchSource rejects for unsupported URL", async () => {
    await expect(fetchSource(invalidUrl)).rejects.toThrow(
      `Unsupported data source: ${invalidUrl}`
    );
  });
});

describe("CLI --fetch-source flag", () => {
  let logSpy;
  let errorSpy;
  let exitSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`process.exit:${code}`);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  test("valid URL: prints JSON of fetched data and exits with code 0", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(sampleData),
    });
    try {
      await main(["--fetch-source", validUrl]);
    } catch (err) {
      expect(err.message).toBe("process.exit:0");
    }
    expect(global.fetch).toHaveBeenCalledWith(validUrl);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(sampleData, null, 2));
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  test("missing URL: prints error and exits with code 1", () => {
    try {
      main(["--fetch-source"]);
    } catch (err) {
      expect(err.message).toBe("process.exit:1");
    }
    expect(errorSpy).toHaveBeenCalledWith("Error: URL is required for --fetch-source");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  test("unsupported URL: prints error and exits with code 1", () => {
    try {
      main(["--fetch-source", invalidUrl]);
    } catch (err) {
      expect(err.message).toBe("process.exit:1");
    }
    expect(errorSpy).toHaveBeenCalledWith(
      `Error: Unsupported data source: ${invalidUrl}`
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});