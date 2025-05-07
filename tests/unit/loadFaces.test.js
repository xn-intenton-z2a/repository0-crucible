import { describe, test, expect } from "vitest";
import path from "path";
import { loadFaces, getRandomFace } from "@src/lib/main.js";

describe("loadFaces", () => {
  const fixturesDir = path.resolve(__dirname, "fixtures");

  test("loads valid JSON file", () => {
    const filePath = path.resolve(fixturesDir, "custom-faces.json");
    const faces = loadFaces(filePath);
    expect(faces).toEqual(["(>_>)", "(<_<)"]);
  });

  test("loads valid YAML file", () => {
    const filePath = path.resolve(fixturesDir, "custom-faces.yaml");
    const faces = loadFaces(filePath);
    expect(faces).toEqual(["(^_^)", "(T_T)"]);
  });

  test("throws on missing file", () => {
    const filePath = path.resolve(fixturesDir, "nonexistent.json");
    expect(() => loadFaces(filePath)).toThrow(/Failed to read config file/);
  });

  test("throws on invalid JSON", () => {
    const filePath = path.resolve(fixturesDir, "invalid.json");
    expect(() => loadFaces(filePath)).toThrow(/Failed to parse config file/);
  });

  test("throws on invalid type in YAML", () => {
    const filePath = path.resolve(fixturesDir, "invalid-type.yaml");
    expect(() => loadFaces(filePath)).toThrow(/Invalid config format/);
  });
});
