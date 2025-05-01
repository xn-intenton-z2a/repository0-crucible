import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";

describe("CLI buildIntermediate with positional args", () => {
  let spyBI;
  beforeEach(() => {
    spyBI = vi.spyOn(mainModule, "buildIntermediate").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("default invocation with no paths", () => {
    main(["--build-intermediate"]);
    expect(spyBI).toHaveBeenCalledWith();
  });

  test("custom input directory", () => {
    main(["--build-intermediate", "custom-data"]);
    expect(spyBI).toHaveBeenCalledWith({ dataDir: "custom-data", outDir: undefined });
  });

  test("custom input and output directories", () => {
    main(["--build-intermediate", "custom-data", "custom-out"]);
    expect(spyBI).toHaveBeenCalledWith({ dataDir: "custom-data", outDir: "custom-out" });
  });
});
