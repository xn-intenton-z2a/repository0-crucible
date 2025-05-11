import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import os from "os";
import { main } from "@src/lib/main.js";

describe("Algorithm Selection CLI", () => {
  let origArgv;
  let origExit;
  let origLog;
  let origErr;
  const cpuCount = os.cpus().length;

  beforeEach(() => {
    origArgv = process.argv;
    origExit = process.exit;
    origLog = console.log;
    origErr = console.error;
    process.exit = vi.fn();
    console.log = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    process.argv = origArgv;
    process.exit = origExit;
    console.log = origLog;
    console.error = origErr;
  });

  test("Ramanujan algorithm for 5 digits", () => {
    process.argv = ["node", "src/lib/main.js", "--digits", "5", "--algorithm", "ramanujan"];
    main();
    expect(console.log).toHaveBeenCalledWith("3.14159");
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  test("Chudnovsky algorithm with 2 workers for 5 digits", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--digits",
      "5",
      "--algorithm",
      "chudnovsky",
      "--workers",
      "2",
    ];
    main();
    expect(console.log).toHaveBeenCalledWith("3.14159");
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  test("Invalid algorithm", () => {
    process.argv = ["node", "src/lib/main.js", "--algorithm", "foo"];
    main();
    expect(console.error).toHaveBeenCalledWith("Error: Invalid algorithm 'foo'");
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("Invalid workers (zero)", () => {
    process.argv = ["node", "src/lib/main.js", "--workers", "0"];
    main();
    expect(console.error).toHaveBeenCalledWith(
      `Error: --workers requires a positive integer ≤ ${cpuCount}`
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("Invalid workers (> cpuCount)", () => {
    process.argv = ["node", "src/lib/main.js", "--workers", `${cpuCount + 1}`];
    main();
    expect(console.error).toHaveBeenCalledWith(
      `Error: --workers requires a positive integer ≤ ${cpuCount}`
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("Invalid workers (non-integer)", () => {
    process.argv = ["node", "src/lib/main.js", "--workers", "foo"];
    main();
    expect(console.error).toHaveBeenCalledWith(
      `Error: --workers requires a positive integer ≤ ${cpuCount}`
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
