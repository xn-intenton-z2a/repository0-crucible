import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "@src/lib/main.js";

const FACES = [
  ":)",
  ":-(",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^",
  "(ꈍᴗꈍ)"
];

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Emoticon Output", () => {
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("default behavior prints one emoticon based on Math.random", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    main([]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith("(ʘ‿ʘ)");
  });

  test("--list prints all emoticons in order", () => {
    main(["--list"]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(FACES.length);
    FACES.forEach((face, index) => {
      expect(consoleLogSpy.mock.calls[index][0]).toBe(face);
    });
  });

  test("--seed prints same emoticon for same seed", () => {
    main(["--seed", "7"]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith("ಠ_ಠ");
    consoleLogSpy.mockClear();
    main(["--seed", "7"]);
    expect(consoleLogSpy).toHaveBeenCalledWith("ಠ_ಠ");
  });
});
