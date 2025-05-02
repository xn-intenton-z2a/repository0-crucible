import { describe, test, expect, vi } from "vitest";
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
