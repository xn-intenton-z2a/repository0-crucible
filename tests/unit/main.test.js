import { describe, test, expect, afterAll } from "vitest";
import { execSync } from "child_process";
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

  test("spigot 10 digits to stdout", () => {
    const output = execSync(`node ${mainPath} --algorithm spigot --digits 10`).toString().trim();
    expect(output).toBe("3.141592653");
  });

  test("chudnovsky 15 digits to stdout", () => {
    const output = execSync(`node ${mainPath} --algorithm chudnovsky --digits 15`).toString().trim();
    expect(output).toBe("3.14159265358979");
  });

  test("diagnostics flag outputs timings", () => {
    const output = execSync(`node ${mainPath} --algorithm spigot --digits 5 --diagnostics`).toString();
    expect(output).toMatch(/^Compute time:/m);
  });

  const pngFile = "test_pi.png";
  afterAll(() => {
    if (fs.existsSync(pngFile)) fs.unlinkSync(pngFile);
  });

  test("png output creates file", () => {
    execSync(`node ${mainPath} --algorithm spigot --digits 20 --output png --file ${pngFile}`);
    expect(fs.existsSync(pngFile)).toBe(true);
  });

  test("bbp index to stdout", () => {
    const output = execSync(`node ${mainPath} --algorithm bbp --hex-index 1`).toString().trim();
    expect(output).toBe("2");
  });

  const hexFile = "test_hex.txt";
  test("bbp index to file", () => {
    execSync(`node ${mainPath} --algorithm bbp --hex-index 3 --file ${hexFile}`);
    const content = fs.readFileSync(hexFile, "utf8").trim();
    expect(content).toBe("3");
  });
  afterAll(() => {
    if (fs.existsSync(hexFile)) fs.unlinkSync(hexFile);
  });
});

// Benchmarking mode tests

describe("Benchmarking Mode", () => {
  const mainPath = fileURLToPath(new URL("../../src/lib/main.js", import.meta.url));
  const csvFile = "test_report.csv";
  const pngBench = "test_perf.png";

  afterAll(() => {
    [csvFile, pngBench].forEach((f) => {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
      }
    });
  });

  test("default text output table", () => {
    const output = execSync(`node ${mainPath} --benchmark-sizes 5,10`).toString();
    const lines = output.trim().split(/\r?\n/);
    expect(lines[0]).toBe("size | spigotTimeMs | chudnovskyTimeMs | bbpTimeMs");
    expect(lines.length).toBe(3);
  });

  test("csv output to file", () => {
    execSync(
      `node ${mainPath} --benchmark-sizes 5,10 --benchmark-output csv --benchmark-file ${csvFile}`
    );
    const content = fs.readFileSync(csvFile, "utf8").trim().split(/\r?\n/);
    expect(content[0]).toBe("size,spigotTimeMs,chudnovskyTimeMs,bbpTimeMs");
    expect(content.length).toBe(3);
  });

  test("png chart output creates file", () => {
    execSync(
      `node ${mainPath} --benchmark-sizes 5,10 --benchmark-output png --benchmark-file ${pngBench}`
    );
    expect(fs.existsSync(pngBench)).toBe(true);
    const stats = fs.statSync(pngBench);
    expect(stats.size).toBeGreaterThan(0);
  });
});