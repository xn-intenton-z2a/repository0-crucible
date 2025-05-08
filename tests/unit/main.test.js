import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { main, faces } from "@src/lib/main.js";

describe("ASCII Face CLI", () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("default behavior prints one face and exits with code 0", () => {
    const code = main([]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(faces).toContain(output);
  });

  test("count option prints specified number of faces", () => {
    const code = main(["--count", "3"]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(3);
  });

  test("list option prints all faces", () => {
    const code = main(["--list"]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalledTimes(faces.length);
    faces.forEach((face, idx) => {
      expect(logSpy).toHaveBeenNthCalledWith(idx + 1, face);
    });
  });

  test("seed option produces consistent output", () => {
    const args = ["--seed", "42", "--count", "3"];
    const code1 = main(args);
    expect(code1).toBe(0);
    const firstRun = logSpy.mock.calls.map((call) => call[0]);
    logSpy.mockClear();
    const code2 = main(args);
    expect(code2).toBe(0);
    const secondRun = logSpy.mock.calls.map((call) => call[0]);
    expect(firstRun).toEqual(secondRun);
  });

  test("invalid option prints usage and exits with non-zero code", () => {
    const code = main(["--foo"]);
    expect(code).not.toBe(0);
    expect(errorSpy).toHaveBeenCalled();
  });
});
