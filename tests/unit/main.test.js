import { describe, test, expect, vi } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("List Sources CLI", () => {
  test("should list built-in data sources", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js", "--list-sources"];
    expect(() => main()).not.toThrow();
    const dataSources = {
      wikipedia: "https://en.wikipedia.org/",
      geonames: "http://api.geonames.org/",
      dbpedia: "https://dbpedia.org/",
    };
    expect(consoleSpy).toHaveBeenCalledTimes(Object.keys(dataSources).length);
    Object.entries(dataSources).forEach(([name, url], idx) => {
      expect(consoleSpy).toHaveBeenNthCalledWith(idx + 1, `${name} ${url}`);
    });
    consoleSpy.mockRestore();
  });
});

describe("Capital Cities CLI", () => {
  test("should output JSON when --capital-cities is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js", "--capital-cities"];
    expect(() => main()).not.toThrow();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const outputArg = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(outputArg);
    expect(parsed).toHaveProperty("ontologyVersion");
    expect(typeof parsed.ontologyVersion).toBe("string");
    expect(parsed).toHaveProperty("individuals");
    expect(Array.isArray(parsed.individuals)).toBe(true);
    parsed.individuals.forEach((ind) => {
      expect(ind).toHaveProperty("type", "CapitalCity");
      expect(typeof ind.name).toBe("string");
      expect(typeof ind.country).toBe("string");
      expect(Object.keys(ind).sort()).toEqual(["country", "name", "type"]);
    });
    expect(parsed.individuals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "CapitalCity", name: "Paris", country: "France" }),
        expect.objectContaining({ type: "CapitalCity", name: "Tokyo", country: "Japan" }),
      ])
    );
    consoleSpy.mockRestore();
  });

  test("should write JSON to file when --output is provided", () => {
    const tmpDir = os.tmpdir();
    const tempFile = path.join(tmpDir, "capitals_test.json");
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    process.argv = ["node", "src/lib/main.js", "--capital-cities", "--output", tempFile];
    expect(() => main()).not.toThrow();
    expect(fs.existsSync(tempFile)).toBe(true);
    const content = fs.readFileSync(tempFile, "utf-8");
    const parsed = JSON.parse(content);
    expect(parsed).toHaveProperty("ontologyVersion");
    expect(Array.isArray(parsed.individuals)).toBe(true);
    expect(parsed.individuals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "CapitalCity", name: "Paris", country: "France" }),
        expect.objectContaining({ type: "CapitalCity", name: "Tokyo", country: "Japan" }),
      ])
    );
    fs.unlinkSync(tempFile);
  });
});
