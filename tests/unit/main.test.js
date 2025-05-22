import { describe, test, expect, afterAll } from "vitest";
import { execSync } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";

import { computePiSpigot, computePiChudnovsky } from "@src/lib/main.js";

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
    if (fs.existsSync(pngFile)) {
      fs.unlinkSync(pngFile);
    }
  });

  test("png output creates file", () => {
    execSync(`node ${mainPath} --algorithm spigot --digits 20 --output png --file ${pngFile}`);
    expect(fs.existsSync(pngFile)).toBe(true);
  });
});