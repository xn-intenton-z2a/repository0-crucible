import { describe, test, expect, afterAll } from "vitest";
import { execSync, spawnSync } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";

import { computePiSpigot, computePiChudnovsky, computePiBBP } from "@src/lib/main.js";

describe("computePiSpigot", () => {
  test("first 10 digits", () => {
    expect(computePiSpigot(10)).toBe("3.141592653");
  });
});

describe("computePiChudnovsky", () => {
  test("first 10 digits", () => {
    expect(computePiChudnovsky(10)).toBe("3.141592653");
  });
});

describe("computePiBBP", () => {
  test("index 0 returns integer part", () => {
    expect(computePiBBP(0)).toBe("3");
  });
  test("index 1 returns first hex fraction digit", () => {
    expect(computePiBBP(1)).toBe("2");
  });
  test("index 4 returns fourth hex fraction digit (F)", () => {
    expect(computePiBBP(4)).toBe("F");
  });
});

describe("CLI", () => {
  const mainPath = fileURLToPath(new URL("../../src/lib/main.js", import.meta.url));
  const cleanupFiles = [];
  afterAll(() => {
    cleanupFiles.forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });
  });

  test("--help shows usage and sections", () => {
    const out = execSync(`node ${mainPath} --help`).toString();
    expect(out).toMatch(/^Usage: node src\/lib\/main\.js \[options\]$/m);
    expect(out).toMatch(/General Options:/);
    expect(out).toMatch(/Algorithm Modes:/);
    expect(out).toMatch(/Output Modes:/);
    expect(out).toMatch(/Diagnostics Options:/);
    expect(out).toMatch(/Benchmarking Options:/);
    expect(out).toMatch(/Examples:/);
  });

  test("BBP mode missing hex-index errors", () => {
    const result = spawnSync("node", [mainPath, "--algorithm", "bbp"]);
    expect(result.status).toBe(1);
    expect(result.stderr.toString()).toMatch(/Invalid or missing hex-index for BBP algorithm/);
  });

  test("unknown algorithm errors", () => {
    const result = spawnSync("node", [mainPath, "--algorithm", "foobar"]);
    expect(result.status).toBe(1);
    expect(result.stderr.toString()).toMatch(/Unknown algorithm: foobar/);
  });

  test("unknown output type errors", () => {
    const result = spawnSync("node", [
      mainPath,
      "--algorithm",
      "spigot",
      "--output",
      "xml",
      "--digits",
      "10"
    ]);
    expect(result.status).toBe(1);
    expect(result.stderr.toString()).toMatch(/Unknown output type: xml/);
  });

  test("default PNG output filename for decimal mode", () => {
    const result = spawnSync("node", [
      mainPath,
      "--algorithm",
      "spigot",
      "--digits",
      "10",
      "--output",
      "png"
    ]);
    expect(result.status).toBe(0);
    expect(fs.existsSync("pi.png")).toBe(true);
    cleanupFiles.push("pi.png");
  });

  test("default benchmark PNG filename", () => {
    const result = spawnSync("node", [
      mainPath,
      "--benchmark-sizes",
      "5,10",
      "--benchmark-output",
      "png"
    ]);
    expect(result.status).toBe(0);
    expect(fs.existsSync("benchmark.png")).toBe(true);
    cleanupFiles.push("benchmark.png");
  });
});