import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { parseOptions, getRandomFaceFromList, main, generateFaces } from "@src/lib/main.js";
import seedrandom from "seedrandom";

describe("parseOptions", () => {
  test("default options", () => {
    expect(parseOptions([])).toEqual({
      count: 1,
      category: "all",
      seed: undefined,
      json: false,
      serve: false,
      port: 3000,
      config: undefined,
      listCategories: false,
    });
  });

  test("serve flag default off", () => {
    expect(parseOptions([]).serve).toBe(false);
  });

  test("long serve flag", () => {
    expect(parseOptions(["--serve"]).serve).toBe(true);
  });

  test("short serve flag", () => {
    expect(parseOptions(["-S"]).serve).toBe(true);
  });

  test("port flag", () => {
    expect(parseOptions(["--port", "8080"]).port).toBe(8080);
  });

  test("short port flag", () => {
    expect(parseOptions(["-p", "9090"]).port).toBe(9090);
  });

  test("json flag default off", () => {
    const opts = parseOptions([]);
    expect(opts.json).toBe(false);
  });

  test("long json flag", () => {
    expect(parseOptions(["--json"]))
      .toEqual({
        count: 1,
        category: "all",
        seed: undefined,
        json: true,
        serve: false,
        port: 3000,
        config: undefined,
        listCategories: false,
      });
  });

  test("short json flag", () => {
    expect(parseOptions(["-j"]))
      .toEqual({
        count: 1,
        category: "all",
        seed: undefined,
        json: true,
        serve: false,
        port: 3000,
        config: undefined,
        listCategories: false,
      });
  });

  test("custom count and category", () => {
    expect(
      parseOptions(["--count", "3", "--category", "happy"]),
    ).toEqual({
      count: 3,
      category: "happy",
      seed: undefined,
      json: false,
      serve: false,
      port: 3000,
      config: undefined,
      listCategories: false,
    });
  });

  test("short flags", () => {
    expect(
      parseOptions(["-c", "2", "-C", "sad", "-s", "42"]),
    ).toEqual({
      count: 2,
      category: "sad",
      seed: 42,
      json: false,
      serve: false,
      port: 3000,
      config: undefined,
      listCategories: false,
    });
  });

  test("invalid count throws", () => {
    expect(() => parseOptions(["--count", "0"])) .toThrow();
    expect(() => parseOptions(["--count", "-1"])) .toThrow();
    expect(() => parseOptions(["--count", "a"])) .toThrow();
  });

  test("invalid category throws", () => {
    expect(() => parseOptions(["--category", "unknown"])) .toThrow();
  });

  test("invalid seed throws", () => {
    expect(() => parseOptions(["--seed", "-5"])) .toThrow();
    expect(() => parseOptions(["--seed", "1.5"])) .toThrow();
  });

  // New tests for listCategories flag
  test("listCategories flag default off", () => {
    expect(parseOptions([]).listCategories).toBe(false);
  });

  test("long listCategories flag sets true", () => {
    expect(parseOptions(["--list-categories"]).listCategories).toBe(true);
  });

  test("short listCategories flag sets true", () => {
    expect(parseOptions(["-L"]).listCategories).toBe(true);
  });
});

describe("getRandomFaceFromList", () => {
  const list = ["a", "b", "c"];
  test("returns element from list", () => {
    const face = getRandomFaceFromList(list, () => 0.5);
    expect(list).toContain(face);
  });
});

describe("main CLI", () => {
  let logs = [];
  beforeEach(() => {
    logs = [];
    vi.spyOn(console, "log").mockImplementation((...args) => logs.push(args.join(" ")));
    vi.spyOn(console, "error").mockImplementation((...args) => logs.push(args.join(" ")));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("help message", () => {
    main(["--help"]);
    expect(logs[0]).toContain("Usage:");
  });

  test("default outputs one face", () => {
    main([]);
    expect(logs.length).toBe(1);
  });

  test("respects count and category", () => {
    main(["--count", "3", "--category", "happy"]);
    expect(logs.length).toBe(3);
  });

  test("seed reproducibility", () => {
    main(["--count", "2", "--seed", "123"]);
    const firstRun = [...logs];
    logs = [];
    main(["--count", "2", "--seed", "123"]);
    expect(logs).toEqual(firstRun);
  });

  test("json output", () => {
    main(["--json"]);
    expect(logs.length).toBe(1);
    const obj = JSON.parse(logs[0]);
    expect(obj).toHaveProperty("faces");
    expect(Array.isArray(obj.faces)).toBe(true);
    expect(obj.faces.length).toBe(1);
    expect(obj.category).toBe("all");
    expect(obj.count).toBe(1);
    expect(obj.seed).toBe(null);
  });

  test("combined flags with json", () => {
    main(["-c", "3", "-C", "sad", "-s", "99", "-j"]);
    expect(logs.length).toBe(1);
    const obj = JSON.parse(logs[0]);
    expect(obj.faces.length).toBe(3);
    expect(obj.category).toBe("sad");
    expect(obj.count).toBe(3);
    expect(obj.seed).toBe(99);
    const firstFaces = obj.faces;
    logs = [];
    main(["-c", "3", "-C", "sad", "-s", "99", "-j"]);
    const obj2 = JSON.parse(logs[0]);
    expect(obj2.faces).toEqual(firstFaces);
  });

  // New CLI tests for listCategories
  test("list categories in text mode", () => {
    main(["--list-categories"]);
    expect(logs).toEqual(["happy","sad","angry","surprised","all"]);
  });

  test("short list categories flag", () => {
    main(["-L"]);
    expect(logs).toEqual(["happy","sad","angry","surprised","all"]);
  });

  test("list categories with custom config includes custom category", () => {
    main(["-L","--config","tests/unit/fixtures/custom.json"]);
    expect(logs).toEqual(["happy","sad","angry","surprised","custom","all"]);
  });

  test("list categories with json outputs JSON array", () => {
    main(["-L","--json"]);
    expect(logs.length).toBe(1);
    const arr = JSON.parse(logs[0]);
    expect(arr).toEqual(["happy","sad","angry","surprised","all"]);
  });
});

// New tests for generateFaces

describe("generateFaces", () => {
  test("default invocation returns one face from all category with null seed", () => {
    const result = generateFaces();
    expect(result).toHaveProperty("faces");
    expect(Array.isArray(result.faces)).toBe(true);
    expect(result.faces.length).toBe(1);
    expect(result.category).toBe("all");
    expect(result.count).toBe(1);
    expect(result.seed).toBe(null);
  });

  test("custom invocation with count, category, and seed is reproducible", () => {
    const opts = { count: 3, category: "happy", seed: 42 };
    const first = generateFaces(opts);
    const second = generateFaces(opts);
    expect(first.count).toBe(3);
    expect(first.category).toBe("happy");
    expect(first.seed).toBe(42);
    expect(first.faces.length).toBe(3);
    expect(second.faces).toEqual(first.faces);
  });

  test("invalid inputs throw errors", () => {
    expect(() => generateFaces({ count: 0 })).toThrow();
    expect(() => generateFaces({ category: "unknown" })).toThrow();
    expect(() => generateFaces({ seed: -1 })).toThrow();
    expect(() => generateFaces({ seed: 1.5 })).toThrow();
  });
});
