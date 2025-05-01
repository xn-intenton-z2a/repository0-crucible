import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";

describe("--build-enhanced CLI flag", () => {
  let spyBE;

  beforeEach(() => {
    spyBE = vi.spyOn(mainModule, "buildEnhanced").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("default invocation with no paths (--build-enhanced)", async () => {
    await main(["--build-enhanced"]);
    expect(spyBE).toHaveBeenCalledWith();
  });

  test("default invocation with no paths (-be)", async () => {
    await main(["-be"]);
    expect(spyBE).toHaveBeenCalledWith();
  });

  test("custom dataDir only", async () => {
    await main(["--build-enhanced", "d"]);
    expect(spyBE).toHaveBeenCalledWith({ dataDir: "d" });
  });

  test("custom dataDir and intermediateDir", async () => {
    await main(["--build-enhanced", "d", "i"]);
    expect(spyBE).toHaveBeenCalledWith({ dataDir: "d", intermediateDir: "i" });
  });

  test("custom dataDir, intermediateDir, and outDir", async () => {
    await main(["--build-enhanced", "d", "i", "o"]);
    expect(spyBE).toHaveBeenCalledWith({ dataDir: "d", intermediateDir: "i", outDir: "o" });
  });
});
