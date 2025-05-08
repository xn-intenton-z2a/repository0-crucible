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

describe("--trace-seeds flag", () => {
  test("should print seed files traceability report", () => {
    // Spy on console.log
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Invoke main with trace-seeds flag
    main(["--trace-seeds"]);
    // Ensure console.log called at least once
    expect(spy).toHaveBeenCalled();
    const calls = spy.mock.calls.map((call) => call[0]);
    // Check header printed
    expect(calls.some((line) => line === "Seed files traceability report:")).toBe(true);
    // Check at least one .js filename was logged
    expect(calls.some((line) => /.js$/.test(line))).toBe(true);
    spy.mockRestore();
  });
});
