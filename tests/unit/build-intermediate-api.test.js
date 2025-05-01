import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { buildIntermediate } from "../../src/lib/main.js";

describe("buildIntermediate programmatic API", () => {
  let tmpDir;
  let originalCwd;
  let rmSpy;

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bi-api-"));
    process.chdir(tmpDir);
    fs.mkdirSync(path.join(tmpDir, "data"));
    // sample JSON array input
    fs.writeFileSync(path.join(tmpDir, "data", "sample.json"), JSON.stringify([{ foo: "bar" }]), "utf8");
    rmSpy = vi.spyOn(fs, "rmSync").mockImplementation(() => {});
  });

  afterEach(() => {
    process.chdir(originalCwd);
    vi.restoreAllMocks();
  });

  test("returns summary object with count and files", () => {
    const summary = buildIntermediate();
    expect(rmSpy).toHaveBeenCalledWith(path.join(tmpDir, "intermediate"), { recursive: true, force: true });
    expect(summary).toEqual({ count: 1, files: ["sample-intermediate.json"] });
    const intermediatePath = path.join(tmpDir, "intermediate", "sample-intermediate.json");
    expect(fs.existsSync(intermediatePath)).toBe(true);
  });
});
