import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js"];
    main([]);
    consoleSpy.mockRestore();
  });

  test("should output feature flag enabled message when flag '--demo' is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--demo"]);
    expect(consoleSpy).toHaveBeenCalledWith("Feature demo enabled");
    consoleSpy.mockRestore();
  });

  test("should output feature flag enabled message when flag '--enable-demo' is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--enable-demo"]);
    expect(consoleSpy).toHaveBeenCalledWith("Feature demo enabled");
    consoleSpy.mockRestore();
  });

  test("should output both messages when flag '--demo-verbose' is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--demo-verbose"]);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "Feature demo enabled");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "Verbose mode is active");
    consoleSpy.mockRestore();
  });
});
