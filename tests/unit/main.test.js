import { describe, test, expect, vi, beforeEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, registerPlugin, getPlugins, executePlugins } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});


describe("Default Demo Output", () => {
  test("should terminate without error for empty args", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([])}`);
    logSpy.mockRestore();
  });
});

describe("CLI Argument Conversion", () => {
  test("should convert numeric strings to numbers", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["42", "3.14"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([42, 3.14])}`);
    logSpy.mockRestore();
  });

  test("should convert boolean strings to booleans", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["true", "false"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([true, false])}`);
    logSpy.mockRestore();
  });

  test("should leave non-numeric strings unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["hello", "world"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify(["hello", "world"])}`);
    logSpy.mockRestore();
  });

  test("should handle special case 'NaN' as a string", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify(["NaN", 100])}`);
    logSpy.mockRestore();
  });

  test("should convert valid ISO 8601 date strings to Date objects", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const validISO = "2023-10-10T12:30:00Z";
    main([validISO]);
    // Retrieve the logged output and parse it
    const loggedArg = JSON.parse(logSpy.mock.calls[0][0].replace('Run with: ', ''));
    expect(new Date(loggedArg[0]).toISOString()).toEqual(new Date(validISO).toISOString());
    logSpy.mockRestore();
  });

  test("should not convert invalid ISO 8601 date strings and leave them unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const invalidISO = "2023-13-01T00:00:00Z"; // Invalid month
    main([invalidISO]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([invalidISO])}`);
    logSpy.mockRestore();
  });
});

describe("Plugin Integration in CLI", () => {
  test("should process arguments through plugins when --use-plugins flag is provided", () => {
    // Using the default dummy plugin registered in main (doubles numbers)
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--use-plugins", "50", "hello"]);
    // 50 is a number and should be doubled to 100, "hello" remains unchanged
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([100, "hello"])}`);
    logSpy.mockRestore();
  });
});

describe("Plugin Manager Functionality", () => {
  beforeEach(() => {
    // Since plugins array is internal, we simulate a reset by clearing all plugins
    // WARNING: This is a hack and in production a reset function might be preferred
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
    // Verify that the string is appended with "-plugin" and number remains unchanged
    expect(output).toContain("test-plugin");
    expect(output).toContain(123);
  });
});
