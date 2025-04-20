import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be defined", () => {
    expect(main).toBeDefined();
  });
});

describe("CLI Functionality", () => {
  test("should log expected output for '--help' argument", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help"]);
    expect(spy).toHaveBeenCalledWith('Run with: ["--help"]');
    spy.mockRestore();
  });

  test("should log expected output for multiple arguments", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["param1", "param2"]);
    expect(spy).toHaveBeenCalledWith('Run with: ["param1","param2"]');
    spy.mockRestore();
  });

  test("should log expected output for an empty string argument", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([""]);
    expect(spy).toHaveBeenCalledWith('Run with: [""]');
    spy.mockRestore();
  });
});

describe("Simulated CLI Execution via process.argv", () => {
  test("should log expected output when no additional CLI args are provided", () => {
    const originalArgv = process.argv;
    process.argv = ["node", "src/lib/main.js"];
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(process.argv.slice(2));
    expect(spy).toHaveBeenCalledWith('Run with: []');
    spy.mockRestore();
    process.argv = originalArgv;
  });

  test("should log expected output for multiple diverse CLI args", () => {
    const originalArgv = process.argv;
    process.argv = ["node", "src/lib/main.js", "--flag", "", "unexpected"];
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(process.argv.slice(2));
    expect(spy).toHaveBeenCalledWith('Run with: ["--flag","","unexpected"]');
    spy.mockRestore();
    process.argv = originalArgv;
  });
});
