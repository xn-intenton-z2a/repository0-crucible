import { describe, test, expect, vi, beforeEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, registerPlugin, getPlugins, executePlugins, registerNaNHandler } from "@src/lib/main.js";
import fs from "fs";

// Helper function to parse the logged JSON output and revive special numeric values
function getLoggedOutput(logSpy) {
  const parsed = JSON.parse(logSpy.mock.calls[0][0]);
  function revive(value) {
    if (value === "___native_NaN___") return NaN;
    if (value === "___Infinity___") return Infinity;
    if (value === "___-Infinity___") return -Infinity;
    if (Array.isArray(value)) return value.map(revive);
    if (value !== null && typeof value === "object") {
      for (const key in value) {
        value[key] = revive(value[key]);
      }
    }
    return value;
  }
  return revive(parsed);
}

// Automated test suite for CLI argument conversion and plugin integration

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
    const invalidISO = "2023-13-01T00:00:00Z";
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

describe("Plugin Integration in CLI", () => {
  test("should pass arguments unchanged when --use-plugins flag is provided but no plugins are registered", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const plugins = getPlugins();
    plugins.length = 0;
    main(["--use-plugins", "50", "hello"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [50, "hello"] });
    logSpy.mockRestore();
  });

  test("should process arguments through plugins when a custom plugin is registered", () => {
    const plugins = getPlugins();
    plugins.length = 0;
    registerPlugin(data => data.map(item => typeof item === 'number' ? item * 2 : item));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--use-plugins", "50", "hello"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [100, "hello"] });
    logSpy.mockRestore();
  });
});

describe("Custom NaN Handler Plugin", () => {
  beforeEach(() => {
    getPlugins().length = 0;
    registerNaNHandler(null);
  });

  test("should use custom NaN handler when registered", () => {
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

describe("Strict NaN Mode", () => {
  beforeEach(() => {
    getPlugins().length = 0;
    registerNaNHandler(null);
  });

  test("should throw an error in strict mode when no custom handler is registered (using CLI flag)", () => {
    expect(() => {
      main(["--strict-nan", "NaN", "100"]);
    }).toThrow(/Strict NaN mode error/);
  });

  test("should use custom handler in strict mode and log an info message (using CLI flag)", () => {
    registerNaNHandler(() => 'customStrictNaN');
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--strict-nan", "NaN", "100"]);
    expect(infoSpy).toHaveBeenCalledWith("Strict NaN mode active: using custom NaN handler.");
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ['customStrictNaN', 100] });
    infoSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should throw an error in strict mode when enabled via configuration file without custom handler", () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"strictNan": true}');
    expect(() => {
      main(["NaN", "100"]);
    }).toThrow(/Strict NaN mode error/);
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });

  test("should use custom handler in strict mode when enabled via configuration file and log an info message", () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"strictNan": true, "customNan": "customConfigStrictNaN"}');
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(infoSpy).toHaveBeenCalledWith("Strict NaN mode active: using custom NaN handler.");
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ['customConfigStrictNaN', 100] });
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
    infoSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Debug NaN Mode", () => {
  beforeEach(() => {
    getPlugins().length = 0;
    registerNaNHandler(null);
  });

  test("should include debug info for NaN conversion when --debug-nan flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--debug-nan", "NaN", "100"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toHaveProperty('debugNan');
    expect(output.debugNan).toEqual([
      { raw: "NaN", normalized: "NaN", converted: "NaN", conversionMethod: "default" }
    ]);
    logSpy.mockRestore();
  });

  test("should include debug info with native NaN conversion when both --native-nan and --debug-nan flags are provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--debug-nan", "--native-nan", "NaN", "100"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toHaveProperty('debugNan');
    expect(Number.isNaN(output.debugNan[0].converted)).toBe(true);
    expect(output.debugNan[0].conversionMethod).toBe("native");
    expect(output.debugNan[0].normalized).toBe("NaN");
    logSpy.mockRestore();
  });
});

describe("Special Numeric Values Serialization", () => {
  test("should serialize Infinity and -Infinity to special strings", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["Infinity", "-Infinity", "100"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toEqual({ message: "Run with", data: [Infinity, -Infinity, 100] });
    logSpy.mockRestore();
  });
});

describe("CLI NaN Handling", () => {
  test("should process 'NaN' argument correctly when passed as a single parameter", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN"] });
    logSpy.mockRestore();
  });

  test("should process Unicode variant 'ＮａＮ' as a string by default", () => {
    const unicodeNan = "ＮａＮ";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([unicodeNan]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [unicodeNan] });
    logSpy.mockRestore();
  });

  test("should convert Unicode variant 'ＮａＮ' to numeric NaN when --native-nan flag is provided", () => {
    const unicodeNan = "ＮａＮ";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--native-nan", unicodeNan, "200"]);
    const output = getLoggedOutput(logSpy);
    expect(Number.isNaN(output.data[0])).toBe(true);
    expect(output.data[1]).toBe(200);
    logSpy.mockRestore();
  });
});

describe("CLI Custom --custom-nan Flag", () => {
  test("should convert 'NaN' using custom replacement provided with --custom-nan flag", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--custom-nan", "customReplacement", "NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["customReplacement", 100] });
    logSpy.mockRestore();
  });

  test("should throw error if --custom-nan is provided without a replacement", () => {
    expect(() => {
      main(["--custom-nan", "NaN"]);
    }).toThrow("--custom-nan flag provided without a replacement value.");
  });
});

describe("Configuration CustomNaN via repositoryConfig.json", () => {
  test("should convert 'NaN' using custom replacement from configuration file", () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"customNan": "configCustomReplacement"}');
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["configCustomReplacement", 100] });
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});

describe("Environment Custom NaN Handler", () => {
  test("should convert 'NaN' using CUSTOM_NAN environment variable when no CLI flag or repository config is set", () => {
    process.env.CUSTOM_NAN = "envCustomReplacement";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["envCustomReplacement", 100] });
    logSpy.mockRestore();
    delete process.env.CUSTOM_NAN;
  });
});

describe("Plugin Transformation Trace Logging", () => {
  test("should not include pluginTrace when no plugins are registered", () => {
    const plugins = getPlugins();
    plugins.length = 0;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--trace-plugins", "--use-plugins", "50", "hello"]);
    const output = getLoggedOutput(logSpy);
    expect(output).not.toHaveProperty("pluginTrace");
    logSpy.mockRestore();
  });

  test("should include pluginTrace with intermediate results when plugins are registered", () => {
    const plugins = getPlugins();
    plugins.length = 0;
    const plugin1 = (data) => data.map(item => typeof item === 'number' ? item + 10 : item);
    const plugin2 = (data) => data.map(item => typeof item === 'number' ? item * 2 : item);
    registerPlugin(plugin1);
    registerPlugin(plugin2);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--trace-plugins", "--use-plugins", "5", "foo"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toHaveProperty("pluginTrace");
    expect(output.pluginTrace.length).toBe(2);
    expect(output.pluginTrace[0]).toEqual({ pluginIndex: 0, result: [15, "foo"] });
    expect(output.pluginTrace[1]).toEqual({ pluginIndex: 1, result: [30, "foo"] });
    expect(output.data).toEqual([30, "foo"]);
    logSpy.mockRestore();
  });
});

describe("Dump Config Flag", () => {
  test("should output effective config with default values", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    main(["--dump-config"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output).toHaveProperty("nativeNan", false);
    expect(output).toHaveProperty("strictNan", false);
    expect(output).toHaveProperty("customNan", null);
    expect(Array.isArray(output.plugins)).toBe(true);
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
  });

  test("should output effective config with flags and config file values", () => {
    const repoConfig = { nativeNan: true, strictNan: true, customNan: "configCustom" };
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(repoConfig));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--dump-config", "--custom-nan", "cliCustom", "--native-nan"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output).toHaveProperty("nativeNan", true);
    expect(output).toHaveProperty("strictNan", true);
    expect(output).toHaveProperty("customNan", "cliCustom");
    expect(Array.isArray(output.plugins)).toBe(true);
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});
