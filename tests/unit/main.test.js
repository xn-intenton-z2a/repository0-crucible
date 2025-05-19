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
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("CLI Distribution", () => {
  test("should output valid distribution JSON", () => {
    process.argv = ["node", "src/lib/main.js", "--digits", "5", "--distribution"];
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main();
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    const dist = JSON.parse(output);
    expect(Object.keys(dist).length).toBe(10);
    const sum = Object.values(dist).reduce((a, b) => a + b, 0);
    expect(sum).toBe(5);
    for (const key of Object.keys(dist)) {
      expect(Number.isInteger(dist[key])).toBe(true);
      expect(dist[key]).toBeGreaterThanOrEqual(0);
    }
    logSpy.mockRestore();
  });
});
