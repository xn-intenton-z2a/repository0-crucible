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
    // Check seeded output is array of length 3
    const seededArray = JSON.parse(logs[1]);
    expect(Array.isArray(seededArray)).toBe(true);
    expect(seededArray).toHaveLength(3);
    // Check unique output is array of length 3
    const uniqueArray = JSON.parse(logs[2]);
    expect(Array.isArray(uniqueArray)).toBe(true);
    expect(uniqueArray).toHaveLength(3);
    // Check subsequent lines
    expect(logs[3]).toBe('To launch HTTP server: node src/lib/main.js --serve');
    expect(logs[4]).toBe('curl "http://localhost:3000/faces?count=2&seed=7"');
  });
});

describe("--help flag", () => {
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

  test("should print usage summary and exit 0", () => {
    expect(() => main(["--help"])) .toThrow();
    // Check usage header
    expect(logs[0]).toMatch(/Usage:.*main\.js.*\[options\]/);
    // Check each flag present
    const expectedFlags = [
      "--help",
      "--demo",
      "--serve",
      "--port",
      "--diagnostics",
      "--build-intermediate",
      "--build-enhanced",
      "--refresh",
      "--merge-persist"
    ];
    expectedFlags.forEach((flag) => {
      expect(logs.some((l) => l.includes(flag))).toBe(true);
    });
  });
});

describe("--diagnostics flag", () => {
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

  test("should print diagnostics and exit 0", () => {
    expect(() => main(["--diagnostics"])) .toThrow();
    expect(logs[0]).toMatch(/^Node Version:/);
    expect(logs[1]).toMatch(/^Platform:/);
    expect(logs[2]).toBe('Args: ["--diagnostics"]');
  });
});

describe("--build-intermediate flag", () => {
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

  test("should print building intermediate and exit 0", () => {
    expect(() => main(["--build-intermediate"])) .toThrow();
    expect(logs[0]).toBe("Building intermediate stage");
  });
});

describe("--build-enhanced flag", () => {
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

  test("should print building enhanced and exit 0", () => {
    expect(() => main(["--build-enhanced"])) .toThrow();
    expect(logs[0]).toBe("Building enhanced stage");
  });
});

describe("--refresh flag", () => {
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

  test("should print refreshing data and exit 0", () => {
    expect(() => main(["--refresh"])) .toThrow();
    expect(logs[0]).toBe("Refreshing data");
  });
});

describe("--merge-persist flag", () => {
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

  test("should print merging and persisting and exit 0", () => {
    expect(() => main(["--merge-persist"])) .toThrow();
    expect(logs[0]).toBe("Merging and persisting changes");
  });
});
