import { describe, test, expect, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { main, builtInFaces } from "@src/lib/main.js";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempPath = path.join(__dirname, "temp_faces.json");

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Main Output", () => {
  let logs = [];
  const originalLog = console.log;

  beforeEach(() => {
    logs = [];
    console.log = (...args) => {
      logs.push(args.join(" "));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  test("should terminate without error without --face", () => {
    expect(() => main([])).not.toThrow();
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBe("Run with: []");
  });

  test("should log one random face with --face", () => {
    main(["--face"]);
    expect(logs).toHaveLength(1);
    const allFaces = builtInFaces.map((item) => item.face);
    expect(allFaces).toContain(logs[0]);
  });

  test("should log three distinct faces with --face 3", () => {
    main(["--face", "3"]);
    expect(logs).toHaveLength(3);
    const unique = new Set(logs);
    expect(unique.size).toBe(3);
    const allFaces = builtInFaces.map((item) => item.face);
    logs.forEach((face) => {
      expect(allFaces).toContain(face);
    });
  });

  test("should log reproducible sequence with --face --seed 42", () => {
    main(["--face", "--seed", "42"]);
    const firstRun = [...logs];
    logs = [];
    console.log = (...args) => {
      logs.push(args.join(" "));
    };
    main(["--face", "--seed", "42"]);
    expect(logs).toEqual(firstRun);
  });
});

describe("Category Filtering", () => {
  let logs = [];
  const originalLog = console.log;

  beforeEach(() => {
    logs = [];
    console.log = (...args) => {
      logs.push(args.join(" "));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  test("should log one face from happy category", () => {
    main(["--face", "--category", "happy"]);
    expect(logs).toHaveLength(1);
    const happyFaces = builtInFaces
      .filter((item) => item.categories.includes("happy"))
      .map((item) => item.face);
    expect(happyFaces).toContain(logs[0]);
  });

  test("invalid category should throw error", () => {
    expect(() =>
      main(["--face", "--category", "unknown"])
    ).toThrow(/Invalid category/);
  });

  test("count exceeds category available should throw error", () => {
    // 'sad' category has only one face
    expect(() =>
      main(["--face", "2", "--category", "sad"])
    ).toThrow(/only \d+ available/);
  });
});

// Tests for custom faces and dynamic category recognition
beforeAll(() => {
  const custom = {
    faces: [
      { face: "(^_^)", categories: ["excited"] },
      { face: "(>_<)", categories: ["excited", "angry"] }
    ]
  };
  writeFileSync(tempPath, JSON.stringify(custom));
});

afterAll(() => {
  try { unlinkSync(tempPath); } catch {}
});

describe("Custom Faces Integration", () => {
  let logs = [];
  const originalLog = console.log;

  beforeEach(() => {
    logs = [];
    console.log = (...args) => { logs.push(args.join(" ")); };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  test("should recognize custom category 'excited' after loading custom file", () => {
    main(["--face", "--faces-file", tempPath, "--category", "excited"]);
    expect(logs).toHaveLength(1);
    const possible = ["(^_^)", "(>_<)"];
    expect(possible).toContain(logs[0]);
  });

  test("invalid custom category should report custom categories in error", () => {
    expect(() =>
      main(["--face", "--faces-file", tempPath, "--category", "foo"])
    ).toThrow(/Valid categories:.*excited/);
  });
});
