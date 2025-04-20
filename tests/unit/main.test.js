import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";

// Helper function to validate execution time log
function expectExecutionTimeLog(log) {
  expect(log).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
}

describe("Main Module Import", () => {
  test("should be defined", () => {
    expect(main).toBeDefined();
  });
});

describe("CLI Functionality", () => {
  test("should log expected output for '--help' argument", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help"]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--help"]');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
  });

  test("should log expected output for multiple arguments", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["param1", "param2"]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["param1","param2"]');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
  });

  test("should log expected output for an empty string argument", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([""]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: [""]');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
  });
});

describe("Simulated CLI Execution via process.argv", () => {
  test("should log expected output when no additional CLI args are provided", () => {
    const originalArgv = process.argv;
    process.argv = ["node", "src/lib/main.js"];
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(process.argv.slice(2));
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: []');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
    process.argv = originalArgv;
  });

  test("should log expected output for multiple diverse CLI args", () => {
    const originalArgv = process.argv;
    process.argv = ["node", "src/lib/main.js", "--flag", "", "unexpected"];
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(process.argv.slice(2));
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--flag","","unexpected"]');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
    process.argv = originalArgv;
  });
});

describe("Replication Mode", () => {
  test("should log replication messages when '--replicate' flag is present", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--replicate", "param1"]);
    // Expected logs:
    // 1: Run with: ["--replicate","param1"]
    // 2: Replicating tasks...
    // 3: Replicating task 1
    // 4: Replicating task 2
    // 5: Replicating task 3
    // 6: Execution time: ... ms
    expect(spy).toHaveBeenCalledTimes(6);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--replicate","param1"]');
    expect(spy.mock.calls[1][0]).toBe('Replicating tasks...');
    expect(spy.mock.calls[2][0]).toBe('Replicating task 1');
    expect(spy.mock.calls[3][0]).toBe('Replicating task 2');
    expect(spy.mock.calls[4][0]).toBe('Replicating task 3');
    expect(spy.mock.calls[5][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    spy.mockRestore();
  });
});

describe("Help-Seeking Mode", () => {
  test("should log help-seeking message when '--help-seeking' flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help-seeking"]);
    // Expected logs:
    // 1: Run with: ["--help-seeking"]
    // 2: Help-Seeking Mode Enabled: querying assistance...
    // 3: Execution time: ... ms
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--help-seeking"]');
    expect(spy.mock.calls[1][0]).toBe('Help-Seeking Mode Enabled: querying assistance...');
    expectExecutionTimeLog(spy.mock.calls[2][0]);
    spy.mockRestore();
  });
});

describe("Self-Improvement Mode", () => {
  test("should log self-improvement message when '--self-improve' flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--self-improve"]);
    // Expected logs:
    // 1: Run with: ["--self-improve"]
    // 2: Execution time: ... ms
    // 3: Self-improvement analysis: execution metrics are optimal
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--self-improve"]');
    expect(spy.mock.calls[1][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    expect(spy.mock.calls[2][0]).toBe('Self-improvement analysis: execution metrics are optimal');
    spy.mockRestore();
  });
});

describe("Planning Mode", () => {
  test("should log planning messages when '--plan' flag is present", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--plan"]);
    // Expected logs:
    // 1: Run with: ["--plan"]
    // 2: Analyzing input for planning...
    // 3: Planned Task 1: Review current configurations
    // 4: Planned Task 2: Prioritize upcoming feature enhancements
    // 5: Execution time: ... ms

    expect(spy).toHaveBeenCalledTimes(5);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--plan"]');
    expect(spy.mock.calls[1][0]).toBe('Analyzing input for planning...');
    expect(spy.mock.calls[2][0]).toBe('Planned Task 1: Review current configurations');
    expect(spy.mock.calls[3][0]).toBe('Planned Task 2: Prioritize upcoming feature enhancements');
    expectExecutionTimeLog(spy.mock.calls[4][0]);
    spy.mockRestore();
  });
});
