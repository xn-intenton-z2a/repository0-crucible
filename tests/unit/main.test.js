import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";

// Helper function to capture console output
function captureOutput(fn) {
  const logs = [];
  const errors = [];
  const originalLog = console.log;
  const originalError = console.error;
  console.log = (...args) => logs.push(args.join(" "));
  console.error = (...args) => errors.push(args.join(" "));
  try {
    fn();
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
  return { logs, errors };
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error when no arguments", () => {
    const { logs } = captureOutput(() => main([]));
    expect(logs[0]).toBe("Run with: []");
  });

  test("should display help message when --help is used", () => {
    const { logs } = captureOutput(() => main(["--help"]));
    expect(logs[0]).toMatch(/Usage: node src\/lib\/main.js \[options\]/);
  });

  test("should display version info when --version is used", () => {
    const { logs } = captureOutput(() => main(["--version"]));
    expect(logs[0]).toBe("Version: 1.2.0-0");
  });

  test("should error on unknown flag", () => {
    const { logs, errors } = captureOutput(() => main(["--invalid"]));
    expect(errors[0]).toMatch(/Error: Unknown flag '--invalid'/);
    expect(logs[0]).toMatch(/Usage: node src\/lib\/main.js \[options\]/);
  });

  test("should error when --agentic is provided without a value", () => {
    const { logs, errors } = captureOutput(() => main(["--agentic"]));
    expect(errors[0]).toMatch(/Error: Missing value for flag '--agentic'/);
    expect(logs[0]).toMatch(/Usage: node src\/lib\/main.js \[options\]/);
  });

  test("should process valid flags (e.g., --dry-run)", () => {
    const { logs } = captureOutput(() => main(["--dry-run"]));
    expect(logs[0]).toMatch(/Processing flags: \["--dry-run"\]/);
  });
});
