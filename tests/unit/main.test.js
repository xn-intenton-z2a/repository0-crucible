import { describe, test, expect, vi } from "vitest";
import { calculatePi, main } from "@src/lib/main.js";

// Existing import test
describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(calculatePi).not.toBeNull();
    expect(main).not.toBeNull();
  });
});

// Tests for calculatePi function
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

// Tests for CLI main function
describe("Main Output", () => {
  test("should print π to console for given digits", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "3"]);
    expect(logSpy).toHaveBeenCalledWith("3.14");
    logSpy.mockRestore();
  });

  test("should show help and return without error", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(() => main(["--help"];)).not.toThrow();
    expect(logSpy).toHaveBeenCalledWith(
      "Usage: node src/lib/main.js --digits <number> --algorithm <string> --format <text|png>"
    );
    logSpy.mockRestore();
  });

  test("throws error for unsupported format", () => {
    expect(() => main(["--format", "png"])).toThrow(/Unsupported format/);
  });
});
