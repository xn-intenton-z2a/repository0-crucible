import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, memoryLog } from "@src/lib/main.js";

// Utility function to run main with given arguments and capture error output
async function runMainWithArgs(args) {
  const originalError = console.error;
  let errorMsg = "";
  console.error = (msg) => {
    errorMsg = msg;
  };
  await main(args);
  console.error = originalError;
  return errorMsg;
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    await main();
  });
});

describe("Main Help", () => {
  test("should display help message when '--help' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--help"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Usage: node src/lib/main.js [options]");
    expect(output).toContain("--help                Display help information about the CLI tool.");
    spy.mockRestore();
  });
});

describe("Main Version", () => {
  test("should display version number from package.json when '--version' flag is provided", async () => {
    const pkg = await import("../../package.json", { assert: { type: "json" } });
    const version = pkg.default && pkg.default.version ? pkg.default.version : pkg.version;
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--version"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain(version);
    spy.mockRestore();
  });
});

describe("Main Diagnostics", () => {
  test("should display diagnostics information when '--diagnostics' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--diagnostics"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Diagnostics:"));
    const calls = spy.mock.calls.map((call) => call[0]);
    const hasNodeVersion = calls.some((text) => String(text).includes("Node Version:"));
    expect(hasNodeVersion).toBe(true);
    spy.mockRestore();
  });
});

describe("Main Extended Diagnostics", () => {
  test("should display extended diagnostics information when '--extended-diagnostics' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--extended-diagnostics"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Extended Diagnostics:"));
    const calls = spy.mock.calls.map((call) => call[0]);
    const hasMemoryUsage = calls.some((text) => String(text).includes("Memory Usage:"));
    const hasProcessUptime = calls.some((text) => String(text).includes("Process Uptime:"));
    const hasProcessPlatform = calls.some((text) => String(text).includes("Process Platform:"));
    expect(hasMemoryUsage).toBe(true);
    expect(hasProcessUptime).toBe(true);
    expect(hasProcessPlatform).toBe(true);
    spy.mockRestore();
  });
});

describe("Main Self-Refine", () => {
  test("should display self-refinement message when '--self-refine' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--self-refine"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Performing self-refinement analysis...");
    spy.mockRestore();
  });
});

describe("Main Plan", () => {
  test("should display planning message when '--plan' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--plan"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Planning: generating execution plan based on current state...");
    spy.mockRestore();
  });
});

describe("Main Refresh", () => {
  test("should display refresh message when '--refresh' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--refresh"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Refreshing application state...");
    spy.mockRestore();
  });
});

describe("Main Merge Persist", () => {
  test("should display merge persist message when '--merge-persist' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--merge-persist"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Merging and persisting changes...");
    spy.mockRestore();
  });
});

describe("Main Serve", () => {
  test("should display serve message when '--serve' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--serve"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Starting server...");
    spy.mockRestore();
  });
});

describe("Main Build Intermediate", () => {
  test("should display intermediate build message when '--build-intermediate' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--build-intermediate"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Building with intermediate options...");
    spy.mockRestore();
  });
});

describe("Main Build Enhanced", () => {
  test("should display enhanced build message when '--build-enhanced' flag is provided", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--build-enhanced"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("Building with enhanced options...");
    spy.mockRestore();
  });
});

describe("Main Echo", () => {
  test("should output structured JSON with echo property excluding '--echo'", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--echo", "arg1", "arg2"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("echo");
    expect(parsed.echo).toEqual(["arg1", "arg2"]);
    spy.mockRestore();
  });
});

describe("Main Unrecognized Input", () => {
  test("should display standardized error message for a single unrecognized input", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["invalid-flag"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    const expected = "Error: 'invalid-flag' is not a recognized command. Use '--help' for available options.";
    expect(output).toEqual(expected);
    spy.mockRestore();
  });

  test("should display standardized error message for multiple unrecognized inputs", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["foo", "bar"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    const expected = "Error: 'foo bar' is not a recognized command. Use '--help' for available options.";
    expect(output).toEqual(expected);
    spy.mockRestore();
  });

  test("should handle unusual input patterns gracefully", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["???"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    const expected = "Error: '???' is not a recognized command. Use '--help' for available options.";
    expect(output).toEqual(expected);
    spy.mockRestore();
  });

  test("should display standardized error message for 'NaN' input", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["NaN"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    const expected = "Error: 'NaN' is not a recognized command. Use '--help' for available options.";
    expect(output).toEqual(expected);
    spy.mockRestore();
  });
});
