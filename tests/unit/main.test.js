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

describe("Main Help", () => {
  test("should display help message when '--help' flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Usage:");
    expect(output).toContain("--help");
    spy.mockRestore();
  });
});

describe("Main Version", () => {
  test("should display version number from package.json when '--version' flag is provided", async () => {
    const pkg = await import("../../package.json", { assert: { type: "json" } });
    const version = pkg.default?.version || pkg.version;
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--version"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain(version);
    spy.mockRestore();
  });
});
