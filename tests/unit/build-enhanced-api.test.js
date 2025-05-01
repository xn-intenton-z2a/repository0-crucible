import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import * as mainModule from "../../src/lib/main.js";
import { buildEnhanced } from "../../src/lib/main.js";

describe("buildEnhanced programmatic API", () => {
  let tmpDir;
  let originalCwd;
  const mockedRefresh = { count: 1, files: ["ds.json"] };
  const mockedIntermediate = { count: 2, files: ["i1.json", "i2.json"] };

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = fs.mkdtempSync(path.join(require("os").tmpdir(), "be-api-"));
    process.chdir(tmpDir);
    // create intermediate directory and files
    fs.mkdirSync(path.join(tmpDir, "intermediate"));
    fs.writeFileSync(path.join(tmpDir, "intermediate", "i1.json"), JSON.stringify({ "@graph": [{ a: 1 }] }), "utf8");
    fs.writeFileSync(path.join(tmpDir, "intermediate", "i2.json"), JSON.stringify({ "@graph": [{ b: 2 }] }), "utf8");
    // mock calls
    vi.spyOn(mainModule, "refreshSources").mockResolvedValue(mockedRefresh);
    vi.spyOn(mainModule, "buildIntermediate").mockReturnValue(mockedIntermediate);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    vi.restoreAllMocks();
  });

  test("returns correct summary and writes enhanced.json", async () => {
    const result = await buildEnhanced({
      dataDir: path.join(tmpDir, "data"),
      intermediateDir: path.join(tmpDir, "intermediate"),
      outDir: path.join(tmpDir, "enhanced"),
    });
    expect(result.refreshed).toEqual(mockedRefresh);
    expect(result.intermediate).toEqual(mockedIntermediate);
    expect(result.enhanced).toEqual({ file: "enhanced.json", count: 2 });
    const writtenPath = path.join(tmpDir, "enhanced", "enhanced.json");
    expect(fs.existsSync(writtenPath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(writtenPath, "utf8"));
    expect(content).toEqual({
      "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
      "@graph": [{ a: 1 }, { b: 2 }],
    });
  });
});
