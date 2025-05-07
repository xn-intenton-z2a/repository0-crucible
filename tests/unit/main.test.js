import { describe, test, expect, vi, afterEach } from "vitest";
import { main, asciiFaces, getRandomFace } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Random Face Generator", () => {
  test("getRandomFace returns one of the known faces", () => {
    const face = getRandomFace();
    expect(asciiFaces).toContain(face);
  });
});

describe("Main Output", () => {
  let logSpy;
  afterEach(() => {
    logSpy.mockRestore();
  });

  test("default invocation prints a random ASCII face", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(asciiFaces).toContain(output);
  });

  test("explicit --ascii-face flag prints a random ASCII face", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--ascii-face"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(asciiFaces).toContain(output);
  });

  test("invalid flag prints help message", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--unknown"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });

  test("--help flag prints help message", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });
});
