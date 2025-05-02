import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from "fs";
import path from "path";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    const code = await main();
    expect(code).toBe(0);
  });
});

describe("Diagnostics Mode", () => {
  test("prints diagnostic JSON", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js", "--diagnostics"];
    const code = await main();
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalled();
    const logArg = logSpy.mock.calls[0][0];
    const obj = JSON.parse(logArg);
    const pkg = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../package.json"), "utf-8")
    );
    expect(obj.packageVersion).toBe(pkg.version);
    expect(obj.nodeVersion).toBe(process.version);
    expect(obj.platform).toBe(process.platform);
    expect(obj.dependencies).toEqual(pkg.dependencies);
    logSpy.mockRestore();
  });
});
