import { describe, test, expect, vi } from "vitest";
import {
  supportedDataSources,
  getSupportedDataSources,
  main,
} from "@src/lib/main.js";

describe("Main Module API", () => {
  test("supportedDataSources should be a non-empty array", () => {
    expect(Array.isArray(supportedDataSources)).toBe(true);
    expect(supportedDataSources.length).toBeGreaterThan(0);
  });

  test("getSupportedDataSources returns the supportedDataSources array", () => {
    expect(getSupportedDataSources()).toEqual(supportedDataSources);
  });
});

describe("CLI --list-sources flag", () => {
  test("prints JSON of supportedDataSources and exits with code 0", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(code => {
      throw new Error(`process.exit:${code}`);
    });
    try {
      main(["--list-sources"]);
    } catch (err) {
      expect(err.message).toBe("process.exit:0");
    }
    expect(logSpy).toHaveBeenCalledWith(
      JSON.stringify(supportedDataSources, null, 2)
    );
    expect(exitSpy).toHaveBeenCalledWith(0);
    logSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

describe("CLI default behavior", () => {
  test("prints default Run with message for provided args", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["foo", "bar"]);
    expect(logSpy).toHaveBeenCalledWith("Run with: [\"foo\",\"bar\"]");
    logSpy.mockRestore();
  });

  test("prints default Run with message for no args", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main();
    expect(logSpy).toHaveBeenCalledWith("Run with: []");
    logSpy.mockRestore();
  });
});
