import { describe, test, expect, beforeEach, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  let logSpy;
  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  test("default behavior prints one face", () => {
    main([]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(typeof output).toBe("string");
    expect(output.length).toBeGreaterThan(0);
  });
});

describe("Custom Faces", () => {
  let logSpy, errorSpy;
  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  test("loads valid custom faces deterministically", () => {
    const yamlFile = path.join(__dirname, "fixtures", "custom_faces.yaml");
    main(["--faces", yamlFile, "--seed", "0", "--count", "3"]);
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy.mock.calls[0][0]).toBe(':)');
    expect(logSpy.mock.calls[1][0]).toBe(':D');
    expect(logSpy.mock.calls[2][0]).toBe('<3');
  });

  test("errors on nonexistent file path", () => {
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => { throw new Error("exit"); });
    expect(() => {
      main(["--faces", "nonexistent.yaml"]);
    }).toThrow("exit");
    expect(errorSpy).toHaveBeenCalled();
    exitSpy.mockRestore();
  });

  test("errors on invalid YAML content", () => {
    const yamlFile = path.join(__dirname, "fixtures", "invalid_array.yaml");
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => { throw new Error("exit"); });
    expect(() => {
      main(["--faces", yamlFile]);
    }).toThrow("exit");
    expect(errorSpy).toHaveBeenCalled();
    exitSpy.mockRestore();
  });
});

describe("Fallback behavior", () => {
  let warnSpy, logSpy;
  beforeEach(() => {
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  test("warns and falls back on invalid entries", () => {
    const yamlFile = path.join(__dirname, "fixtures", "invalid_entries.yaml");
    main(["--faces", yamlFile, "--seed", "1", "--count", "2"]);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});

// New tests for help, seed determinism, and count

describe("Help Flag", () => {
  let logSpy;
  let exitSpy;
  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => { throw new Error(`exit:${code}`); });
  });
  afterEach(() => {
    exitSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("prints usage and exits on --help", () => {
    expect(() => main(["--help"])).toThrow("exit:0");
    expect(logSpy).toHaveBeenCalledTimes(1);
    const usage = logSpy.mock.calls[0][0];
    expect(usage).toContain("Usage");
    expect(usage).toContain("--help");
    expect(usage).toContain("Examples:");
  });

  test("prints usage and exits on -h", () => {
    expect(() => main(["-h"])).toThrow("exit:0");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});

describe("Seed Determinism", () => {
  test("same seed produces same output", () => {
    let output1;
    let output2;
    const spy1 = vi.spyOn(console, "log").mockImplementation((msg) => { output1 = msg; });
    main(["--seed", "42"]);
    spy1.mockRestore();
    const spy2 = vi.spyOn(console, "log").mockImplementation((msg) => { output2 = msg; });
    main(["--seed", "42"]);
    spy2.mockRestore();
    expect(output1).toBe(output2);
  });
});

describe("Count Option", () => {
  test("prints multiple faces based on count", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--count", "3"]);
    expect(logSpy).toHaveBeenCalledTimes(3);
    logSpy.mockRestore();
  });
});
