import { describe, test, expect, vi, beforeEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, registerPlugin, getPlugins, executePlugins, registerNaNHandler } from "@src/lib/main.js";
import fs from "fs";

// Helper function to parse the logged JSON output
function getLoggedOutput(logSpy) {
  return JSON.parse(logSpy.mock.calls[0][0]);
}

// NOTE: This test file is part of the automated testing suite that verifies the core CLI functionalities of repository0-crucible

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error for empty args passed explicitly", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [] });
    logSpy.mockRestore();
  });

  test("should terminate without error when called without arguments", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main();
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [] });
    logSpy.mockRestore();
  });
});

describe("CLI Argument Conversion", () => {
  test("should convert numeric strings to numbers", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["42", "3.14"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [42, 3.14] });
    logSpy.mockRestore();
  });

  test("should convert boolean strings to booleans", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["true", "false"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [true, false] });
    logSpy.mockRestore();
  });

  test("should leave non-numeric strings unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["hello", "world"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["hello", "world"] });
    logSpy.mockRestore();
  });

  test("should handle special case 'NaN' as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN", 100] });
    logSpy.mockRestore();
  });

  test("should convert valid ISO 8601 date strings to Date objects", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const validISO = "2023-10-10T12:30:00Z";
    main([validISO]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(new Date(loggedOutput.data[0]).toISOString()).toEqual(new Date(validISO).toISOString());
    logSpy.mockRestore();
  });

  test("should not convert invalid ISO 8601 date strings and leave them unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const invalidISO = "2023-13-01T00:00:00Z"; // Invalid month
    main([invalidISO]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [invalidISO.trim()] });
    logSpy.mockRestore();
  });

  test("should convert 'NaN' to numeric NaN when --native-nan flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--native-nan", "NaN", "100"]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(isNaN(loggedOutput.data[0])).toBe(true);
    expect(loggedOutput.data[1]).toBe(100);
    logSpy.mockRestore();
  });

  test("should trim arguments and convert strings correctly", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["   42   ", "  true ", "   hello   "]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [42, true, "hello"] });
    logSpy.mockRestore();
  });

  test("should trim whitespace around 'NaN' and handle it as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["   NaN   "]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN"] });
    logSpy.mockRestore();
  });

  test("should handle lowercase 'nan' as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["nan", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["nan", 100] });
    logSpy.mockRestore();
  });

  test("should handle uppercase 'NAN' as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NAN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NAN", 100] });
    logSpy.mockRestore();
  });

  test("should convert lowercase 'nan' to numeric NaN when --native-nan flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--native-nan", "nan", "100"]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(isNaN(loggedOutput.data[0])).toBe(true);
    expect(loggedOutput.data[1]).toBe(100);
    logSpy.mockRestore();
  });

  test("should convert 'NaN' to numeric NaN when configuration file sets nativeNan to true", () => {
    // Mock fs methods to simulate configuration file
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"nativeNan": true}');
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(isNaN(loggedOutput.data[0])).toBe(true);
    expect(loggedOutput.data[1]).toBe(100);
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});

describe("JSON Conversion in CLI Arguments", () => {
  test("should convert valid JSON object strings to objects", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const jsonObject = '{"key": "value", "num": 123}';
    main([jsonObject]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(loggedOutput.data[0]).toEqual({ key: "value", num: 123 });
    logSpy.mockRestore();
  });

  test("should convert valid JSON array strings to arrays", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const jsonArray = '[1, 2, 3, "four"]';
    main([jsonArray]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(loggedOutput.data[0]).toEqual([1, 2, 3, "four"]);
    logSpy.mockRestore();
  });

  test("should fallback to string conversion for invalid JSON inputs", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const invalidJson = '{invalid: json';
    main([invalidJson]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [invalidJson.trim()] });
    logSpy.mockRestore();
  });
});

describe("Plugin Integration in CLI", () => {
  test("should pass arguments unchanged when --use-plugins flag is provided but no plugins are registered", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Ensure no plugins are registered
    const plugins = getPlugins();
    plugins.length = 0;
    main(["--use-plugins", "50", "hello"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [50, "hello"] });
    logSpy.mockRestore();
  });

  test("should process arguments through plugins when a custom plugin is registered", () => {
    // Reset plugins before registering
    const plugins = getPlugins();
    plugins.length = 0;
    // Register a plugin that doubles numeric values
    registerPlugin(data => data.map(item => typeof item === 'number' ? item * 2 : item));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--use-plugins", "50", "hello"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [100, "hello"] });
    logSpy.mockRestore();
  });
});

describe("Custom NaN Handler Plugin", () => {
  beforeEach(() => {
    // Reset plugins and custom NaN handler
    getPlugins().length = 0;
    registerNaNHandler(null);
  });

  test("should use custom NaN handler when registered", () => {
    // Register a custom NaN handler that returns a string 'customNaN'
    registerNaNHandler(() => 'customNaN');
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ['customNaN', 100] });
    logSpy.mockRestore();
  });

  test("should fall back to default conversion when custom handler is not registered", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN", 100] });
    logSpy.mockRestore();
  });
});
