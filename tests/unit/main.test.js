import { describe, test, expect, vi, beforeEach } from "vitest";
import { main, getMemoryLog, resetMemoryLog } from "@src/lib/main.js";
import fs from "fs";

// Helper function to validate execution time log
function expectExecutionTimeLog(log) {
  expect(log).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
}

// Helper function to validate maximum execution time log
function expectMaximumExecutionTimeLog(log) {
  expect(log).toMatch(/^\[Self-Improve\] Maximum execution time: \d+(\.\d+)? ms$/);
}

// Helper function to validate minimum execution time log
function expectMinimumExecutionTimeLog(log) {
  expect(log).toMatch(/^\[Self-Improve\] Minimum execution time: \d+(\.\d+)? ms$/);
}

// Helper function to validate first invocation timestamp log
function expectFirstInvocationLog(log) {
  expect(log).toMatch(/^\[Self-Improve\] First invocation: .+/);
}

// Helper function to validate latest invocation timestamp log
function expectLatestInvocationLog(log) {
  expect(log).toMatch(/^\[Self-Improve\] Latest invocation: .+/);
}

// Helper function to validate standard deviation log
function expectStandardDeviationLog(log) {
  expect(log).toMatch(/^\[Self-Improve\] Standard deviation execution time: \d+(\.\d+)? ms$/);
}

// Helper function to validate median execution time log
function expectMedianExecutionTimeLog(log) {
  expect(log).toMatch(/^\[Self-Improve\] Median execution time: \d+(\.\d+)? ms$/);
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

  test("should log expected output for '--help' argument", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--help"]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--help"]');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
  });

  test("should log expected output for multiple arguments", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["param1", "param2"]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["param1","param2"]');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
  });

  test("should log expected output for an empty string argument", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main([""]);
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

  test("should log expected output when no additional CLI args are provided", async () => {
    const originalArgv = process.argv;
    process.argv = ["node", "src/lib/main.js"]; 
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(process.argv.slice(2));
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe('Run with: []');
    expectExecutionTimeLog(spy.mock.calls[1][0]);
    spy.mockRestore();
    process.argv = originalArgv;
  });

  test("should log expected output for multiple diverse CLI args", async () => {
    const originalArgv = process.argv;
    process.argv = ["node", "src/lib/main.js", "--flag", "", "unexpected"];
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(process.argv.slice(2));
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

  test("should log replication messages when '--replicate' flag is present without a valid count parameter", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--replicate", "param1"]);
    // Expected logs for default replication (3 tasks)
    expect(spy).toHaveBeenCalledTimes(6);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--replicate","param1"]');
    expect(spy.mock.calls[1][0]).toBe('Replicating tasks (count: 3)...');
    expect(spy.mock.calls[2][0]).toBe('Replicating task 1');
    expect(spy.mock.calls[3][0]).toBe('Replicating task 2');
    expect(spy.mock.calls[4][0]).toBe('Replicating task 3');
    expectExecutionTimeLog(spy.mock.calls[5][0]);
    spy.mockRestore();
  });

  test("should log replication messages with provided task count when valid number is given", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--replicate", "5"]);
    // Expected logs for replication with 5 tasks
    expect(spy).toHaveBeenCalledTimes(8);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--replicate","5"]');
    expect(spy.mock.calls[1][0]).toBe('Replicating tasks (count: 5)...');
    expect(spy.mock.calls[2][0]).toBe('Replicating task 1');
    expect(spy.mock.calls[3][0]).toBe('Replicating task 2');
    expect(spy.mock.calls[4][0]).toBe('Replicating task 3');
    expect(spy.mock.calls[5][0]).toBe('Replicating task 4');
    expect(spy.mock.calls[6][0]).toBe('Replicating task 5');
    expectExecutionTimeLog(spy.mock.calls[7][0]);
    spy.mockRestore();
  });

  test("should log replication messages concurrently when '--replicate' and '--replicate-async' flags are provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--replicate", "5", "--replicate-async"]);
    // Filter out the logs for replication tasks using a regex to avoid including the header
    const taskLogs = spy.mock.calls.filter(call => typeof call[0] === 'string' && /^Replicating task \d+$/.test(call[0]));
    expect(taskLogs.length).toBe(5);
    const tasks = new Set(taskLogs.map(call => call[0]));
    for (let i = 1; i <= 5; i++) {
      expect(tasks.has(`Replicating task ${i}`)).toBe(true);
    }
    spy.mockRestore();
  });
});

describe("Help-Seeking Mode", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should log help-seeking message when '--help-seeking' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--help-seeking"]);
    // Expected logs:
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

  test("should log self-improvement diagnostics when '--self-improve' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--self-improve"]);
    // Expected logs:
    // 0: Run with
    // 1: Execution time
    // 2: [Self-Improve] Self-Improvement Diagnostics:
    // 3: [Self-Improve] Total invocations
    // 4: [Self-Improve] First invocation
    // 5: [Self-Improve] Latest invocation
    // 6: [Self-Improve] Average execution time
    // 7: [Self-Improve] Maximum execution time
    // 8: [Self-Improve] Minimum execution time
    // 9: [Self-Improve] Standard deviation execution time
    // 10: [Self-Improve] Median execution time
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--self-improve"]');
    expect(spy.mock.calls[1][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    expect(spy.mock.calls[2][0]).toBe('[Self-Improve] Self-Improvement Diagnostics:');
    expect(spy.mock.calls[3][0]).toMatch(/^\[Self-Improve\] Total invocations: \d+$/);
    expectFirstInvocationLog(spy.mock.calls[4][0]);
    expectLatestInvocationLog(spy.mock.calls[5][0]);
    expect(spy.mock.calls[6][0]).toMatch(/^\[Self-Improve\] Average execution time: \d+(\.\d+)? ms$/);
    expectMaximumExecutionTimeLog(spy.mock.calls[7][0]);
    expectMinimumExecutionTimeLog(spy.mock.calls[8][0]);
    expectStandardDeviationLog(spy.mock.calls[9][0]);
    expectMedianExecutionTimeLog(spy.mock.calls[10][0]);
    spy.mockRestore();
  });

  test("should compute correct diagnostics with accumulated invocations", async () => {
    await main(["--dummy"]);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--self-improve"]);
    const log = getMemoryLog();
    expect(log.length).toBe(2);
    expect(spy.mock.calls[2][0]).toBe('[Self-Improve] Self-Improvement Diagnostics:');
    expect(spy.mock.calls[3][0]).toBe(`[Self-Improve] Total invocations: ${log.length}`);
    expect(spy.mock.calls[4][0]).toBe(`[Self-Improve] First invocation: ${log[0].timestamp}`);
    expect(spy.mock.calls[5][0]).toBe(`[Self-Improve] Latest invocation: ${log[1].timestamp}`);
    const avgMessage = spy.mock.calls[6][0];
    expect(avgMessage).toMatch(/^\[Self-Improve\] Average execution time: \d+(\.\d+)? ms$/);
    expectMaximumExecutionTimeLog(spy.mock.calls[7][0]);
    expectMinimumExecutionTimeLog(spy.mock.calls[8][0]);
    expectStandardDeviationLog(spy.mock.calls[9][0]);
    expectMedianExecutionTimeLog(spy.mock.calls[10][0]);
    spy.mockRestore();
  });

  test("should log extended diagnostics when '--self-improve --verbose' flags are provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--self-improve", "--verbose"]);
    const logs = spy.mock.calls.map(call => call[0]);
    const hasDetailedHeader = logs.some(log => log === "[Self-Improve] Detailed: Detailed Memory Log:");
    expect(hasDetailedHeader).toBe(true);
    const invocationLogs = logs.filter(log => log.startsWith("[Self-Improve] Detailed: Invocation"));
    expect(invocationLogs.length).toBeGreaterThan(0);
    spy.mockRestore();
  });

  test("should output JSON diagnostics when '--self-improve' and '--diag-json' flags are provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--self-improve", "--diag-json"]);
    // Find the JSON output among the logs
    const jsonLogCall = spy.mock.calls.find(call => {
      try {
        JSON.parse(call[0]);
        return true;
      } catch (err) {
        return false;
      }
    });
    expect(jsonLogCall).toBeDefined();
    const diagnostics = JSON.parse(jsonLogCall[0]);
    expect(diagnostics).toHaveProperty("totalInvocations");
    expect(diagnostics).toHaveProperty("firstInvocation");
    expect(diagnostics).toHaveProperty("latestInvocation");
    expect(diagnostics).toHaveProperty("averageExecutionTime");
    expect(diagnostics).toHaveProperty("maximumExecutionTime");
    expect(diagnostics).toHaveProperty("minimumExecutionTime");
    expect(diagnostics).toHaveProperty("standardDeviation");
    expect(diagnostics).toHaveProperty("medianExecutionTime");
    spy.mockRestore();
  });
});

describe("Planning Mode", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should log planning messages when '--plan' flag is present", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--plan"]);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--plan"]');
    expect(spy.mock.calls[1][0]).toBe('Planning Mode Engaged: Analyzing input for planning...');
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

  test("should log default goal and sub-tasks when no goal provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--decompose"]);
    expect(spy.mock.calls[0][0]).toBe('Run with: ["--decompose"]');
    expect(spy.mock.calls[1][0]).toBe('Goal Decomposition Report:');
    expect(spy.mock.calls[2][0]).toBe('1. Define objectives');
    expect(spy.mock.calls[3][0]).toBe('2. Identify key milestones');
    expect(spy.mock.calls[4][0]).toBe('3. Assign responsibilities');
    expect(spy.mock.calls[5][0]).toMatch(/^Execution time: \d+(\.\d+)? ms$/);
    spy.mockRestore();
  });

  test("should log provided goal and sub-tasks when goal provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--decompose", "Plan new product launch"]);
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

  test("should append an entry to the memory log after CLI invocation", async () => {
    const args = ["--test-memory"];
    await main(args);
    const log = getMemoryLog();
    expect(log.length).toBe(1);
    expect(log[0]).toHaveProperty('args', args);
    expect(new Date(log[0].timestamp).toISOString()).toBe(log[0].timestamp);
  });

  test("should accumulate entries on subsequent invocations", async () => {
    await main(["first"]);
    await main(["second"]);
    const log = getMemoryLog();
    expect(log.length).toBe(2);
    expect(log[0]).toHaveProperty('args', ["first"]);
    expect(log[1]).toHaveProperty('args', ["second"]);
  });
});

describe("Persistent Log Feature", () => {
  beforeEach(() => {
    resetMemoryLog();
    if (fs.existsSync("memory_log.json")) {
      fs.unlinkSync("memory_log.json");
    }
  });

  test("should output a valid JSON memory log when '--persist-log' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--persist-log"]);
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

  test("should create and persist memory log to 'memory_log.json' when '--persist-file' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--persist-file"]);
    expect(fs.existsSync("memory_log.json")).toBe(true);
    const fileContent = fs.readFileSync("memory_log.json", { encoding: 'utf8' });
    let parsed;
    expect(() => { parsed = JSON.parse(fileContent); }).not.toThrow();
    expect(Array.isArray(parsed)).toBe(true);
    if (parsed.length > 0) {
      expect(parsed[0]).toHaveProperty('args');
      expect(parsed[0]).toHaveProperty('timestamp');
    }
    expect(spy).toHaveBeenCalledWith("Memory log persisted to memory_log.json");
    spy.mockRestore();
    fs.unlinkSync("memory_log.json");
  });

  test("should load persisted memory log from file on startup", async () => {
    // Prepare a temporary memory_log.json with known entries
    const persistedLog = [
      { args: ["--persisted"], timestamp: new Date().toISOString(), execTime: 1.23 }
    ];
    fs.writeFileSync("memory_log.json", JSON.stringify(persistedLog, null, 2));
    // Reset persistent flag to force reload
    await main(["--dummy"]);
    const log = getMemoryLog();
    expect(log.length).toBeGreaterThan(1);
    // The first entry should be the persisted one
    expect(log[0]).toEqual(persistedLog[0]);
    if (fs.existsSync("memory_log.json")) {
      fs.unlinkSync("memory_log.json");
    }
  });

  test("should clear persisted memory log when '--reset-log' flag is provided", async () => {
    // Prepare a temporary memory_log.json with known entries
    const persistedLog = [
      { args: ["--to-be-reset"], timestamp: new Date().toISOString(), execTime: 2.34 }
    ];
    fs.writeFileSync("memory_log.json", JSON.stringify(persistedLog, null, 2));
    await main(["--reset-log"]);
    const log = getMemoryLog();
    expect(log).toEqual([]);
    expect(fs.existsSync("memory_log.json")).toBe(false);
  });
});

describe("Reset Log Feature", () => {
  beforeEach(() => {
    resetMemoryLog();
  });

  test("should clear the memory log and output reset message when '--reset-log' flag is provided", async () => {
    await main(["--test-memory"]);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--reset-log"]);
    const log = getMemoryLog();
    expect(log).toEqual([]);
    const resetMessageFound = spy.mock.calls.some(call => call[0] === "Memory log has been reset.");
    expect(resetMessageFound).toBe(true);
    spy.mockRestore();
  });
});

describe("Version Details Flag", () => {
  test("should output version details and exit immediately when '--version-details' flag is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    await main(["--version-details"]);
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    let details;
    expect(() => { details = JSON.parse(output); }).not.toThrow();
    expect(details).toHaveProperty("nodeVersion", process.version);
    expect(details).toHaveProperty("versions");
    expect(details).toHaveProperty("appVersion");
    expect(typeof details.appVersion).toBe("string");
    expect(exitSpy).toHaveBeenCalledWith(0);
    logSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

describe("Filter Log Feature", () => {
  beforeEach(() => {
    resetMemoryLog();
    if (fs.existsSync("memory_log.json")) {
      fs.unlinkSync("memory_log.json");
    }
  });

  test("should output filtered log entries when matching query is provided with space-separated argument", async () => {
    // Populate memory log with known entries
    await main(["--test-memory"]); // this entry will include '--test-memory'
    await main(["sampleEntry"]); // entry not matching

    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    await main(["--filter-log", "test"]);
    // Parse output from console.log
    const output = spy.mock.calls[0][0];
    const filtered = JSON.parse(output);
    // Should include the entry with '--test-memory'
    expect(filtered.some(entry => entry.args.includes("--test-memory"))).toBe(true);
    // Should not include 'sampleEntry'
    expect(filtered.some(entry => entry.args.includes("sampleEntry"))).toBe(false);
    spy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should output empty array when no log entries match the query", async () => {
    await main(["--test-memory"]);
    await main(["anotherEntry"]);

    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    await main(["--filter-log", "nomatch"]);
    const output = spy.mock.calls[0][0];
    const filtered = JSON.parse(output);
    expect(filtered).toEqual([]);
    spy.mockRestore();
    exitSpy.mockRestore();
  });
});
