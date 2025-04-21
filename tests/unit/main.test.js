import { describe, test, expect, vi, beforeEach } from "vitest";
import { main, getMemoryLog, resetMemoryLog } from "@src/lib/main.js";
import fs from "fs";

// Helper function to validate execution time log
function expectExecutionTimeLog(log) {
  expect(log).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
}

// Helper function to validate maximum execution time log
function expectMaximumExecutionTimeLog(log) {
  expect(log).toMatch(/^Maximum execution time: \d+(\.\d+)? ms$/);
}

describe("Main Module Import", () => {
  test("should be defined", () => {
    expect(main).toBeDefined();
  });
});

describe("CLI Functionality", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

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
  beforeEach(() => {
    resetMemoryLog();
  });

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
  beforeEach(() => {
    resetMemoryLog();
  });

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
  beforeEach(() => {
    resetMemoryLog();
  });

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
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should log self-improvement diagnostics when '--self-improve' flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--self-improve"]);
    // Expected logs:
    // 1: Run with: ["--self-improve"]
    // 2: Execution time: ... ms
    // 3: Total invocations: 1
    // 4: Average execution time: <some value> ms
    // 5: Maximum execution time: <some value> ms
    // 6: Self-improvement analysis: execution metrics are optimal
    expect(spy).toHaveBeenCalledTimes(6);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--self-improve"]');
    expect(spy.mock.calls[1][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    expect(spy.mock.calls[2][0]).toBe('Total invocations: 1');
    expect(spy.mock.calls[3][0]).toMatch(/^Average execution time: \d+(\.\d+)? ms$/);
    expectMaximumExecutionTimeLog(spy.mock.calls[4][0]);
    expect(spy.mock.calls[5][0]).toBe('Self-improvement analysis: execution metrics are optimal');
    spy.mockRestore();
  });

  test("should compute correct diagnostics with accumulated invocations", () => {
    // First, invoke CLI with a dummy flag to accumulate an entry
    main(["--dummy"]);
    // Now, invoke with self-improve
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--self-improve"]);
    // Now memoryLog should have 2 entries
    const log = getMemoryLog();
    expect(log.length).toBe(2);
    // The diagnostics should reflect 2 invocations
    expect(spy.mock.calls[2][0]).toBe('Total invocations: 2');
    const avgMessage = spy.mock.calls[3][0];
    expect(avgMessage).toMatch(/^Average execution time: \d+(\.\d+)? ms$/);
    // Also check for maximum execution time log
    expectMaximumExecutionTimeLog(spy.mock.calls[4][0]);
    spy.mockRestore();
  });
});

describe("Planning Mode", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

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

describe("Goal Decomposition Feature", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should log default goal and sub-tasks when no goal provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--decompose"]);
    // Expected logs:
    // 1: Run with: ["--decompose"]
    // 2: Goal Decomposition Report:
    // 3: 1. Define objectives
    // 4: 2. Identify key milestones
    // 5: 3. Assign responsibilities
    // 6: Execution time: ... ms
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--decompose"]');
    expect(spy.mock.calls[1][0]).toBe('Goal Decomposition Report:');
    expect(spy.mock.calls[2][0]).toBe('1. Define objectives');
    expect(spy.mock.calls[3][0]).toBe('2. Identify key milestones');
    expect(spy.mock.calls[4][0]).toBe('3. Assign responsibilities');
    expect(spy.mock.calls[5][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    spy.mockRestore();
  });

  test("should log provided goal and sub-tasks when goal provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--decompose", "Plan new product launch"]);
    // Expected logs:
    // 1: Run with: ["--decompose", "Plan new product launch"]
    // 2: Goal Decomposition Report: Plan new product launch
    // 3: 1. Define objectives
    // 4: 2. Identify key milestones
    // 5: 3. Assign responsibilities
    // 6: Execution time: ... ms
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--decompose","Plan new product launch"]');
    expect(spy.mock.calls[1][0]).toBe('Goal Decomposition Report: Plan new product launch');
    expect(spy.mock.calls[2][0]).toBe('1. Define objectives');
    expect(spy.mock.calls[3][0]).toBe('2. Identify key milestones');
    expect(spy.mock.calls[4][0]).toBe('3. Assign responsibilities');
    expect(spy.mock.calls[5][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    spy.mockRestore();
  });
});

describe("Memory Log Feature", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should have an initially empty memory log", () => {
    const log = getMemoryLog();
    expect(log).toEqual([]);
  });

  test("should append an entry to the memory log after CLI invocation", () => {
    const args = ["--test-memory"];
    main(args);
    const log = getMemoryLog();
    expect(log.length).toBe(1);
    expect(log[0]).toHaveProperty('args', args);
    // Check that timestamp is a valid ISO string
    expect(new Date(log[0].timestamp).toISOString()).toBe(log[0].timestamp);
  });

  test("should accumulate entries on subsequent invocations", () => {
    main(["first"]);
    main(["second"]);
    const log = getMemoryLog();
    expect(log.length).toBe(2);
    expect(log[0]).toHaveProperty('args', ["first"]);
    expect(log[1]).toHaveProperty('args', ["second"]);
  });
});

describe("Persistent Log Feature", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should output a valid JSON memory log when '--persist-log' flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--persist-log"]);
    // Expected logs:
    // 1: Run with: ["--persist-log"]
    // 2: Execution time: ... ms
    // 3: JSON string of the memory log
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--persist-log"]');
    expect(spy.mock.calls[1][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    const jsonOutput = spy.mock.calls[2][0];
    let parsed;
    expect(() => { parsed = JSON.parse(jsonOutput); }).not.toThrow();
    expect(Array.isArray(parsed)).toBe(true);
    if (parsed.length > 0) {
      expect(parsed[0]).toHaveProperty('args');
      expect(parsed[0]).toHaveProperty('timestamp');
    }
    spy.mockRestore();
  });
});

describe("Persistent File Flag", () => {
  beforeEach(() => {
    resetMemoryLog();
    // Cleanup before test
    if (fs.existsSync("memory_log.json")) {
      fs.unlinkSync("memory_log.json");
    }
  });

  test("should create and persist memory log to 'memory_log.json' when '--persist-file' flag is provided", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--persist-file"]);
    // Check that the file exists
    expect(fs.existsSync("memory_log.json")).toBe(true);
    // Read and parse the file
    const fileContent = fs.readFileSync("memory_log.json", { encoding: 'utf8' });
    let parsed;
    expect(() => { parsed = JSON.parse(fileContent); }).not.toThrow();
    expect(Array.isArray(parsed)).toBe(true);
    if (parsed.length > 0) {
      expect(parsed[0]).toHaveProperty('args');
      expect(parsed[0]).toHaveProperty('timestamp');
    }
    // Check that log also includes a confirmation message
    expect(spy).toHaveBeenCalledWith("Memory log persisted to memory_log.json");
    spy.mockRestore();
    // Cleanup
    fs.unlinkSync("memory_log.json");
  });
});
