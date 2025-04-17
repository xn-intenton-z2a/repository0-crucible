import { describe, test, expect, vi, beforeEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
const { main, getMemory, resetMemory } = mainModule;

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    // Override process.argv for testing
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Memory Logging Feature", () => {
  beforeEach(() => {
    resetMemory();
  });

  test("should log command arguments", () => {
    main(["first", "second"]);
    const mem = getMemory();
    expect(mem).toHaveLength(1);
    expect(mem[0]).toEqual(["first", "second"]);
  });

  test("should output memory log when --show-memory flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["a", "b"]);
    main(["--show-memory"]);
    // The memory should show both calls
    expect(spy).toHaveBeenCalledWith(JSON.stringify([ ["a", "b"], ["--show-memory"] ]));
    spy.mockRestore();
  });
});
