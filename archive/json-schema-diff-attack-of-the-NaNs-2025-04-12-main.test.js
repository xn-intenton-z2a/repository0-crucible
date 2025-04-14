import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
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
  test("should terminate without error for empty args passed explicitly", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main([]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [] });
    logSpy.mockRestore();
  });

  test("should terminate without error when called without arguments", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main();
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [] });
    logSpy.mockRestore();
  });
});

describe("CLI Argument Conversion", () => {
  test("should convert numeric strings to numbers", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["42", "3.14"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [42, 3.14] });
    logSpy.mockRestore();
  });

  test("should convert boolean strings to booleans", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["true", "false"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [true, false] });
    logSpy.mockRestore();
  });

  test("should leave non-numeric strings unchanged", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["hello", "world"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["hello", "world"] });
    logSpy.mockRestore();
  });

  test("should handle special case 'NaN' as a string by default", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN", 100] });
    logSpy.mockRestore();
  });

  test("should convert valid ISO 8601 date strings to Date objects", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const validISO = "2023-10-10T12:30:00Z";
    await main([validISO]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(new Date(loggedOutput.data[0]).toISOString()).toEqual(new Date(validISO).toISOString());
    logSpy.mockRestore();
  });

  test("should not convert invalid ISO 8601 date strings and leave them unchanged", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const invalidISO = "2023-13-01T00:00:00Z";
    await main([invalidISO]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [invalidISO.trim()] });
    logSpy.mockRestore();
  });

  test("should convert 'NaN' to numeric NaN when --native-nan flag is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--native-nan", "NaN", "100"]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(Number.isNaN(loggedOutput.data[0])).toBe(true);
    expect(loggedOutput.data[1]).toBe(100);
    logSpy.mockRestore();
  });

  test("should trim arguments and convert strings correctly", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["   42   ", "  true ", "   hello   "]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [42, true, "hello"] });
    logSpy.mockRestore();
  });

  test("should trim whitespace around 'NaN' and handle it as a string by default", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["   NaN   "]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN"] });
    logSpy.mockRestore();
  });

  test("should handle lowercase 'nan' as a string by default", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["nan", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["nan", 100] });
    logSpy.mockRestore();
  });

  test("should handle uppercase 'NAN' as a string by default", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NAN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NAN", 100] });
    logSpy.mockRestore();
  });

  test("should convert lowercase 'nan' to numeric NaN when --native-nan flag is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--native-nan", "nan", "100"]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(Number.isNaN(loggedOutput.data[0])).toBe(true);
    expect(loggedOutput.data[1]).toBe(100);
    logSpy.mockRestore();
  });

  test("should convert 'NaN' to numeric NaN when configuration file sets nativeNan to true", async () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"nativeNan": true}');
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    const loggedOutput = getLoggedOutput(logSpy);
    expect(Number.isNaN(loggedOutput.data[0])).toBe(true);
    expect(loggedOutput.data[1]).toBe(100);
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});

describe("Plugin Integration in CLI", () => {
  test("should pass arguments unchanged when --use-plugins flag is provided but no plugins are registered", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const plugins = getPlugins();
    plugins.length = 0;
    await main(["--use-plugins", "50", "hello"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [50, "hello"] });
    logSpy.mockRestore();
  });

  test("should process arguments through plugins when a custom plugin is registered", async () => {
    const plugins = getPlugins();
    plugins.length = 0;
    registerPlugin((data) => data.map((item) => (typeof item === "number" ? item * 2 : item)));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--use-plugins", "50", "hello"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [100, "hello"] });
    logSpy.mockRestore();
  });
});

describe("Custom NaN Handler Plugin", () => {
  beforeEach(() => {
    getPlugins().length = 0;
    registerNaNHandler(null);
  });

  test("should use custom NaN handler when registered (synchronous)", async () => {
    registerNaNHandler(() => "customNaN");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["customNaN", 100] });
    logSpy.mockRestore();
  });

  test("should use async custom NaN handler when registered", async () => {
    registerNaNHandler(async () => {
      return new Promise((resolve) => setTimeout(() => resolve("asyncCustomNaN"), 10));
    });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["asyncCustomNaN", 100] });
    logSpy.mockRestore();
  });

  test("should fall back to default conversion when custom handler is not registered", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN", 100] });
    logSpy.mockRestore();
  });
});

describe("Strict NaN Mode", () => {
  beforeEach(() => {
    getPlugins().length = 0;
    registerNaNHandler(null);
  });

  test("should throw an error in strict mode when no custom handler is registered (using CLI flag)", async () => {
    await expect(
      main(["--strict-nan", "NaN", "100"]).catch((e) => {
        throw e;
      }),
    ).rejects.toThrow(
      /Strict NaN mode error: encountered 'NaN' input without a registered custom handler.*(--custom-nan|\.repositoryConfig\.json|CUSTOM_NAN)/,
    );
  });

  test("should use custom handler in strict mode and log an info message (using CLI flag)", async () => {
    registerNaNHandler(() => "customStrictNaN");
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--strict-nan", "NaN", "100"]);
    expect(infoSpy).toHaveBeenCalledWith("Strict NaN mode active: using custom NaN handler.");
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["customStrictNaN", 100] });
    infoSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should throw an error in strict mode when enabled via configuration file without custom handler", async () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"strictNan": true}');
    await expect(
      main(["NaN", "100"]).catch((e) => {
        throw e;
      }),
    ).rejects.toThrow(
      /Strict NaN mode error: encountered 'NaN' input without a registered custom handler.*(--custom-nan|\.repositoryConfig\.json|CUSTOM_NAN)/,
    );
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });

  test("should use custom handler in strict mode when enabled via configuration file and log an info message", async () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi
      .spyOn(fs, "readFileSync")
      .mockReturnValue('{"strictNan": true, "customNan": "customConfigStrictNaN"}');
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(infoSpy).toHaveBeenCalledWith("Strict NaN mode active: using custom NaN handler.");
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["customConfigStrictNaN", 100] });
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
    infoSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Debug NaN Mode", () => {
  let existsSyncSpy;
  beforeEach(() => {
    getPlugins().length = 0;
    registerNaNHandler(null);
    existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
  });
  afterEach(() => {
    existsSyncSpy.mockRestore();
  });

  test("should include debug info for NaN conversion when --debug-nan flag is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--debug-nan", "NaN", "100"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toHaveProperty("debugNan");
    expect(output.debugNan).toEqual([{ raw: "NaN", normalized: "NaN", converted: "NaN", conversionMethod: "default" }]);
    logSpy.mockRestore();
  });

  test("should include debug info with native NaN conversion when both --native-nan and --debug-nan flags are provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--debug-nan", "--native-nan", "NaN", "100"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toHaveProperty("debugNan");
    expect(Number.isNaN(output.debugNan[0].converted)).toBe(true);
    expect(output.debugNan[0].conversionMethod).toBe("native");
    expect(output.debugNan[0].normalized).toBe("NaN");
    logSpy.mockRestore();
  });
});

describe("Special Numeric Values Serialization", () => {
  test("should serialize Infinity and -Infinity to special strings", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["Infinity", "-Infinity", "100"]);
    const output = getLoggedOutput(logSpy);
    expect(output).toEqual({ message: "Run with", data: [Infinity, -Infinity, 100] });
    logSpy.mockRestore();
  });
});

describe("CLI NaN Handling", () => {
  beforeEach(() => {
    registerNaNHandler(null);
  });
  test("should process 'NaN' argument correctly when passed as a single parameter", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["NaN"] });
    logSpy.mockRestore();
  });

  test("should process Unicode variant 'ＮａＮ' as a string by default", async () => {
    const unicodeNan = "ＮａＮ";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main([unicodeNan]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: [unicodeNan.trim()] });
    logSpy.mockRestore();
  });

  test("should convert Unicode variant 'ＮａＮ' to numeric NaN when --native-nan flag is provided", async () => {
    const unicodeNan = "ＮａＮ";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--native-nan", unicodeNan, "200"]);
    const output = getLoggedOutput(logSpy);
    expect(Number.isNaN(output.data[0])).toBe(true);
    expect(output.data[1]).toBe(200);
    logSpy.mockRestore();
  });
});

describe("CLI Custom --custom-nan Flag", () => {
  test("should convert 'NaN' using custom replacement provided with --custom-nan flag (sync)", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--custom-nan", "customReplacement", "NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["customReplacement", 100] });
    logSpy.mockRestore();
  });

  test("should throw error if --custom-nan is provided without a replacement", async () => {
    await expect(
      main(["--custom-nan", "NaN"]).catch((e) => {
        throw e;
      }),
    ).rejects.toThrow("The --custom-nan flag requires a non-'NaN' replacement value immediately following the flag.");
  });
});

describe("Configuration CustomNaN via repositoryConfig.json", () => {
  beforeEach(() => {
    registerNaNHandler(null);
  });
  test("should convert 'NaN' using custom replacement from configuration file", async () => {
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue('{"customNan": "configCustomReplacement"}');
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["configCustomReplacement", 100] });
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });
});

describe("Environment Custom NaN Handler", () => {
  beforeEach(() => {
    registerNaNHandler(null);
  });
  test("should convert 'NaN' using CUSTOM_NAN environment variable when no CLI flag or repository config is set", async () => {
    process.env.CUSTOM_NAN = "envCustomReplacement";
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["NaN", "100"]);
    expect(getLoggedOutput(logSpy)).toEqual({ message: "Run with", data: ["envCustomReplacement", 100] });
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    delete process.env.CUSTOM_NAN;
  });
});

describe("Plugin Transformation Trace Logging", () => {
  test("should not include pluginTrace when no plugins are registered", async () => {
    const plugins = getPlugins();
    plugins.length = 0;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--trace-plugins", "--use-plugins", "50", "hello"]);
    const output = getLoggedOutput(logSpy);
    expect(output).not.toHaveProperty("pluginTrace");
    logSpy.mockRestore();
  });

  test("should include pluginTrace with intermediate results when plugins are registered", async () => {
    const plugins = getPlugins();
    plugins.length = 0;
    const plugin1 = (data) => data.map((item) => (typeof item === "number" ? item + 10 : item));
    const plugin2 = (data) => data.map((item) => (typeof item === "number" ? item * 2 : item));
    registerPlugin(plugin1);
    registerPlugin(plugin2);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--trace-plugins", "--use-plugins", "5", "foo"]);
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
  beforeEach(() => {
    // Reset any previously registered customNaN handler
    registerNaNHandler(null);
  });
  test("should output effective config with default values", async () => {
    delete process.env.CUSTOM_NAN;
    delete process.env.NATIVE_NAN;
    delete process.env.STRICT_NAN;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    await main(["--dump-config"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output).toHaveProperty("nativeNan", false);
    expect(output).toHaveProperty("strictNan", false);
    expect(output).toHaveProperty("customNan", null);
    expect(Array.isArray(output.plugins)).toBe(true);
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
  });

  test("should output effective config with flags and config file values", async () => {
    const repoConfig = { nativeNan: true, strictNan: true, customNan: "cliCustom" };
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(repoConfig));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--dump-config", "--custom-nan", "cliCustom", "--native-nan", "--strict-nan"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output.nativeNan).toBe(true);
    expect(output.strictNan).toBe(true);
    expect(output.customNan).toBe("cliCustom");
    expect(Array.isArray(output.plugins)).toBe(true);
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
    delete process.env.NATIVE_NAN;
    delete process.env.STRICT_NAN;
    delete process.env.CUSTOM_NAN;
  });
});

describe("Dynamic Configuration Refresh", () => {
  test("should update configuration dynamically when --refresh-config flag is provided", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const readFileSyncSpy = vi
      .spyOn(fs, "readFileSync")
      .mockReturnValue('{"nativeNan": true, "customNan": "dynamicCustom", "strictNan": false}');
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--refresh-config", "--dump-config"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output.nativeNan).toBe(true);
    expect(output.strictNan).toBe(false);
    expect(output.customNan).toBe("dynamicCustom");
    expect(infoSpy).toHaveBeenCalledWith("Dynamic configuration refresh applied", {
      effectiveNativeNan: true,
      effectiveStrictNan: false,
      effectiveCustomNan: "dynamicCustom",
    });
    infoSpy.mockRestore();
    logSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSyncSpy.mockRestore();
  });

  test("should start config watcher when --serve flag is provided", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const existsSyncSpy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    await main(["--serve", "NaN", "100"]);
    expect(infoSpy).toHaveBeenCalledWith("Started configuration file watcher for dynamic configuration refresh.");
    infoSpy.mockRestore();
    existsSyncSpy.mockRestore();
  });
});

describe("Benchmark Performance Tests", () => {
  test("should log benchmark results when --benchmark flag is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--benchmark"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output).toHaveProperty("benchmark");
    expect(typeof output.benchmark.count).toBe("number");
    expect(typeof output.benchmark.cachingEnabled).toBe("number");
    expect(typeof output.benchmark.cachingDisabled).toBe("number");
    logSpy.mockRestore();
  });
});
