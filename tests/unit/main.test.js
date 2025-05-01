import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    await main();
  });

  test("prints help with --help flag", async () => {
    const logs = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => logs.push(args.join(' ')));
    await main(["--help"]);
    expect(logs.some(l => l.includes('--to-owl'))).toBe(true);
    spy.mockRestore();
  });
});
