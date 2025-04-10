import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import { registerPlugin, getPlugins, executePlugins } from "@src/lib/pluginManager.js";


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
    // Reset plugins array by accessing the module's internal plugins array
    // Since plugins variable is not directly exposed, we simulate a reset by reassigning the module
    // Note: In a real-world scenario, we might expose a reset function for testing purposes
    // For this test we register a new plugin and check functionality without relying on previous state
  });

  test("should register and retrieve plugins", () => {
    // Clear any previously registered plugins by using a new plugin manager instance if possible
    // Here we register a dummy plugin and then check that it appears in the getPlugins list
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
    // Note: the default dummy plugin from main might also be registered if tests are run in sequence.
    // To ensure isolation, we test the effect of appendPlugin by itself.
    // So we expect the string to be appended with "-plugin" if it wasn't transformed by any other plugin.
    expect(output).toContain("test-plugin");
    expect(output).toContain(123);
  });
});
