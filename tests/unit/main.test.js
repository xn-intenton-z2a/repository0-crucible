import { describe, test, expect, beforeEach, afterEach } from "vitest";
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

describe("ASCII_FACES Feature", () => {
  let logs = [];
  const originalLog = console.log;

  beforeEach(() => {
    logs = [];
    console.log = (...args) => {
      logs.push(args.join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  test("should log one random face with --face", () => {
    main(["--face"]);
    expect(logs).toHaveLength(1);
    expect(mainModule.asciiFaces).toContain(logs[0]);
  });

  test("should log three distinct faces with --face 3", () => {
    main(["--face", "3"]);
    expect(logs).toHaveLength(3);
    const unique = new Set(logs);
    expect(unique.size).toBe(3);
    logs.forEach(face => {
      expect(mainModule.asciiFaces).toContain(face);
    });
  });

  test("should log reproducible sequence with --face --seed 42", () => {
    main(["--face", "--seed", "42"]);
    const firstRun = [...logs];
    logs = [];
    main(["--face", "--seed", "42"]);
    expect(logs).toEqual(firstRun);
  });

  test("should preserve default behavior without --face", () => {
    main([]);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBe("Run with: []");
  });
});
