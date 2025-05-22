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