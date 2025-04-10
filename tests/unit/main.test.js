import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error for empty args", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([])}`);
    logSpy.mockRestore();
  });
});

describe("CLI Argument Conversion", () => {
  test("should convert numeric strings to numbers", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["42", "3.14"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([42, 3.14])}`);
    logSpy.mockRestore();
  });

  test("should convert boolean strings to booleans", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["true", "false"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify([true, false])}`);
    logSpy.mockRestore();
  });

  test("should leave non-numeric strings unchanged", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["hello", "world"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify(["hello", "world"])}`);
    logSpy.mockRestore();
  });

  test("should handle special case 'NaN' as a string", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["NaN", "100"]);
    expect(logSpy).toHaveBeenCalledWith(`Run with: ${JSON.stringify(["NaN", 100])}`);
    logSpy.mockRestore();
  });
});
