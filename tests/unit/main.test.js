import { describe, test, expect, vi } from "vitest";
import fs from "fs";
import { calculatePi, main } from "../../src/lib/main.js";

// Existing import and calculatePi tests
describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(calculatePi).not.toBeNull();
    expect(main).not.toBeNull();
  });
});

describe("calculatePi", () => {
  test("digits=1 yields '3'", () => {
    expect(calculatePi(1)).toBe("3");
  });
  test("digits=2 yields '3.1'", () => {
    expect(calculatePi(2)).toBe("3.1");
  });
  test("digits=3 yields '3.14'", () => {
    expect(calculatePi(3)).toBe("3.14");
  });
  test("throws on non-integer or <1 digits", () => {
    expect(() => calculatePi(0)).toThrow();
    expect(() => calculatePi(-2)).toThrow();
    expect(() => calculatePi(2.5)).toThrow();
  });
  test("throws on unsupported algorithm", () => {
    expect(() => calculatePi(3, "unknown")).toThrow(/Unsupported algorithm/);
  });
});

describe("Main Output", () => {
  test("should print π to console for given digits", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "3"]);
    expect(logSpy).toHaveBeenCalledWith("3.14");
    logSpy.mockRestore();
  });

  test("should show help and return without error", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(() => main(["--help"])) .not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });

  test("throws error for unsupported format", () => {
    expect(() => main(["--output-format", "xml"]))
      .toThrow(/Unsupported format/);
  });
});

// New CLI options and behaviors
describe("CLI Options", () => {
  test("default digits prints 100 significant digits", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^\d\.\d{99}$/)
    );
    logSpy.mockRestore();
  });

  test("digits=50 prints 50 significant digits", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "50"]);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^\d\.\d{49}$/)
    );
    logSpy.mockRestore();
  });

  test("algorithm spigot produces same output as leibniz", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "3", "--algorithm", "spigot"]);
    expect(logSpy).toHaveBeenCalledWith("3.14");
    logSpy.mockRestore();
  });

  test("algorithm montecarlo produces same output as leibniz", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "3", "--algorithm", "montecarlo"]);
    expect(logSpy).toHaveBeenCalledWith("3.14");
    logSpy.mockRestore();
  });

  test("unsupported algorithm throws error", () => {
    expect(() => main(["--algorithm", "unknown"]))
      .toThrow(/Unsupported algorithm/);
  });

  test("benchmark prefixes output with timing", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "3", "--benchmark"]);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^\[Benchmark\] Execution time: \d+ms 3\.14$/)
    );
    logSpy.mockRestore();
  });

  test("png output writes valid PNG file", () => {
    const file = "test.png";
    if (fs.existsSync(file)) fs.unlinkSync(file);
    main(["--digits", "2", "--output-format", "png", "--output", file]);
    const buf = fs.readFileSync(file);
    expect(buf.slice(0, 4)).toEqual(Buffer.from([0x89, 0x50, 0x4E, 0x47]));
    fs.unlinkSync(file);
  });
});
