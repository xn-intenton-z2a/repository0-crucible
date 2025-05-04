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

describe("--demo flag", () => {
  let logs = [];
  let originalLog;
  let originalExit;

  beforeEach(() => {
    logs = [];
    originalLog = console.log;
    console.log = (msg) => logs.push(msg);
    originalExit = process.exit;
    process.exit = (code) => { throw { code }; };
  });

  afterEach(() => {
    console.log = originalLog;
    process.exit = originalExit;
  });

  test("should print demo sections and exit 0", () => {
    expect(() => main(["--demo"])) .toThrow();
    expect(logs[0]).toBe("=== Interactive Demo ===");
    const seededLine = logs.find((l) => l.includes('"seed":42') && l.includes('"count":3'));    
    expect(seededLine).toBeDefined();
    const uniqueLine = logs.find((l) => l.includes('"unique":true') && l.includes('"category":"happy"') && l.includes('"seed":7'));
    expect(uniqueLine).toBeDefined();
    expect(logs.some((l) => l.includes('curl "http://localhost:3000/faces?count=2&seed=7"'))).toBe(true);
    expect(logs.some((l) => l.startsWith("Response:"))).toBe(true);
  });
});
