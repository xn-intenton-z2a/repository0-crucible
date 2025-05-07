import { describe, test, expect, vi, afterEach } from "vitest";
import { main, asciiFaces, faceThemes } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Random Face Generator", () => {
  test("getRandomFace returns one of the known faces", () => {
    const face = asciiFaces[Math.floor(Math.random() * asciiFaces.length)];
    expect(asciiFaces).toContain(face);
  });
});

describe("Theme Selection", () => {
  let logSpy;
  afterEach(() => {
    if (logSpy) logSpy.mockRestore();
  });

  test("valid theme prints a face from theme", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--theme", "happy"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(faceThemes.happy).toContain(output);
  });

  test("alias -t works and count 2 prints two faces", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "-t", "surprised", "-c", "2"]);
    expect(logSpy).toHaveBeenCalledTimes(2);
    for (let i = 0; i < 2; i++) {
      expect(faceThemes.surprised).toContain(logSpy.mock.calls[i][0]);
    }
  });

  test("invalid theme prints help once", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--theme", "unknown"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });
});

// Existing count tests

describe("Main Output", () => {
  let logSpy;
  afterEach(() => {
    if (logSpy) logSpy.mockRestore();
  });

  test("default invocation prints help message", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });

  test("explicit --face flag prints a random ASCII face", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(asciiFaces.concat(...Object.values(faceThemes))).toContain(logSpy.mock.calls[0][0]);
  });

  test("--face --count 3 prints three faces", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--count", "3"]);
    expect(logSpy).toHaveBeenCalledTimes(3);
    for (let i = 0; i < 3; i++) {
      expect(asciiFaces).toContain(logSpy.mock.calls[i][0]);
    }
  });

  test("invalid count zero prints help", () => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--face", "--count", "0"]);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/^Usage:/);
  });
});