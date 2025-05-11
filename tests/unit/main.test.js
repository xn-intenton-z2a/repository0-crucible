import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { calculatePi, main } from "@src/lib/main.js";

describe("calculatePi", () => {
  test("1 digit", () => {
    expect(calculatePi(1)).toBe("3.1");
  });

  test("2 digits", () => {
    expect(calculatePi(2)).toBe("3.14");
  });

  test("5 digits", () => {
    expect(calculatePi(5)).toBe("3.14159");
  });

  test("throws on non-integer or <1", () => {
    expect(() => calculatePi(0)).toThrow("Digits must be an integer >= 1");
    expect(() => calculatePi(2.5)).toThrow("Digits must be an integer >= 1");
  });

  test("throws on exceeding max limit", () => {
    expect(() => calculatePi(1001)).toThrow("Maximum digits is 1000");
  });
});

describe("CLI Integration", () => {
  let origArgv;
  let origExit;
  let origLog;
  let origErr;

  beforeEach(() => {
    origArgv = process.argv;
    origExit = process.exit;
    origLog = console.log;
    origErr = console.error;
    process.exit = vi.fn();
    console.log = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    process.argv = origArgv;
    process.exit = origExit;
    console.log = origLog;
    console.error = origErr;
  });

  test("default digits outputs ~3.1415926535 and exits 0", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/^3\.1415926535/));
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  test("--digits 3 outputs rounded 3.142 and exits 0", () => {
    process.argv = ["node", "src/lib/main.js", "--digits", "3"];
    main();
    expect(console.log).toHaveBeenCalledWith("3.142");
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  test("--digits 1001 errors and exits 1", () => {
    process.argv = ["node", "src/lib/main.js", "--digits", "1001"];
    main();
    expect(console.error).toHaveBeenCalledWith("Error: Maximum digits is 1000");
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("invalid --digits argument errors and exits 1", () => {
    process.argv = ["node", "src/lib/main.js", "--digits"];
    main();
    expect(console.error).toHaveBeenCalledWith("Error: --digits requires a number");
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("--help prints help and exits 0", () => {
    process.argv = ["node", "src/lib/main.js", "--help"];
    main();
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Usage:"));
    expect(process.exit).toHaveBeenCalledWith(0);
  });
});
