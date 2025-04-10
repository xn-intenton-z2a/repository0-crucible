import { describe, test, expect, vi, beforeEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, registerPlugin, getPlugins, executePlugins } from "@src/lib/main.js";

// NOTE: This test file is part of the automated testing suite that verifies the core CLI functionalities of repository0-crucible

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error for empty args", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", []);
    logSpy.mockRestore();
  });
});

describe("CLI Argument Conversion", () => {
  test("should convert numeric strings to numbers", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["42", "3.14"]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", [42, 3.14]);
    logSpy.mockRestore();
  });

  test("should convert boolean strings to booleans", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["true", "false"]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", [true, false]);
    logSpy.mockRestore();
  });

  test("should leave non-numeric strings unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["hello", "world"]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", ["hello", "world"]);
    logSpy.mockRestore();
  });

  test("should handle special case 'NaN' as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", ["NaN", 100]);
    logSpy.mockRestore();
  });

  test("should convert valid ISO 8601 date strings to Date objects", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const validISO = "2023-10-10T12:30:00Z";
    main([validISO]);
    const loggedArg = logSpy.mock.calls[0][1];
    expect(new Date(loggedArg[0]).toISOString()).toEqual(new Date(validISO).toISOString());
    logSpy.mockRestore();
  });

  test("should not convert invalid ISO 8601 date strings and leave them unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const invalidISO = "2023-13-01T00:00:00Z"; // Invalid month
    main([invalidISO]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", [invalidISO.trim()]);
    logSpy.mockRestore();
  });

  test("should convert 'NaN' to numeric NaN when --native-nan flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--native-nan", "NaN", "100"]);
    const loggedArg = logSpy.mock.calls[0][1];
    expect(isNaN(loggedArg[0])).toBe(true);
    expect(loggedArg[1]).toBe(100);
    logSpy.mockRestore();
  });

  test("should trim arguments and convert strings correctly", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["   42   ", "  true ", "   hello   "]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", [42, true, "hello"]);
    logSpy.mockRestore();
  });

  test("should trim whitespace around 'NaN' and handle it as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["   NaN   "]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", ["NaN"]);
    logSpy.mockRestore();
  });

  test("should handle lowercase 'nan' as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["nan", "100"]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", ["nan", 100]);
    logSpy.mockRestore();
  });

  test("should handle uppercase 'NAN' as a string by default", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NAN", "100"]);
    expect(logSpy).toHaveBeenCalledWith("Run with:", ["NAN", 100]);
    logSpy.mockRestore();
  });

  test("should convert lowercase 'nan' to numeric NaN when --native-nan flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--native-nan", "nan", "100"]);
    const loggedArg = logSpy.mock.calls[0][1];
    expect(isNaN(loggedArg[0])).toBe(true);
    expect(loggedArg[1]).toBe(100);
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
    expect(logSpy).toHaveBeenCalledWith("Run with:", [50, "hello"]);
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
    expect(logSpy).toHaveBeenCalledWith("Run with:", [100, "hello"]);
    logSpy.mockRestore();
  });
});

describe("Plugin Manager Functionality", () => {
  beforeEach(() => {
    // Reset plugins by clearing the internal array
    const plugins = getPlugins();
    plugins.length = 0;
  });

  test("should register and retrieve plugins", () => {
    const initialCount = getPlugins().length;
    const dummyPlugin = data => data;
    registerPlugin(dummyPlugin);
    expect(getPlugins().length).toBe(initialCount + 1);
  });

  test("should execute plugins and transform data", () => {
    // Register a plugin that appends "-plugin" to each string item
    const appendPlugin = data => data.map(item => typeof item === 'string' ? item + "-plugin" : item);
    registerPlugin(appendPlugin);
    const input = ["test", 123];
    const output = executePlugins(input);
    expect(output).toContain("test-plugin");
    expect(output).toContain(123);
  });
});
