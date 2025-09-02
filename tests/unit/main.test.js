import { describe, it, expect, afterEach, vi } from "vitest";
import { fetchSource, main, getSupportedDataSources } from "../../src/lib/main.js";

describe("fetchSource API", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("resolves to parsed JSON for valid URL", async () => {
    const data = { foo: "bar" };
    const mockJson = vi.fn().mockResolvedValue(data);
    global.fetch = vi.fn().mockResolvedValue({ json: mockJson });
    const validUrl = getSupportedDataSources()[0];
    const result = await fetchSource(validUrl);
    expect(global.fetch).toHaveBeenCalledWith(validUrl);
    expect(result).toEqual(data);
  });

  it("rejects with error for invalid URL", async () => {
    const invalidUrl = "invalid/url";
    await expect(fetchSource(invalidUrl)).rejects.toThrow(
      `Unsupported data source: ${invalidUrl}`
    );
  });
});

describe("CLI --fetch-source", () => {
  const originalFetch = global.fetch;
  const originalExit = process.exit;
  const originalLog = console.log;
  const originalError = console.error;

  afterEach(() => {
    global.fetch = originalFetch;
    process.exit = originalExit;
    console.log = originalLog;
    console.error = originalError;
    vi.restoreAllMocks();
  });

  it("logs JSON and exits 0 for valid URL", async () => {
    const data = { foo: "bar" };
    global.fetch = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(data) });
    const validUrl = getSupportedDataSources()[0];
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    await main(["--fetch-source", validUrl]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it("errors and exits 1 when URL missing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    await main(["--fetch-source"]);
    expect(errorSpy).toHaveBeenCalledWith(
      "Error: URL is required for --fetch-source"
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("errors and exits 1 when URL unsupported", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    await main(["--fetch-source", "invalid/url"]);
    expect(errorSpy).toHaveBeenCalledWith(
      "Error: Unsupported data source: invalid/url"
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
