import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import readline from "readline";
import { main, listFaces, randomFace, seededFace, emoticonJson } from "@src/lib/main.js";

const FACES = [
  ":)",
  ":-(",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"];

describe('main()', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test('prints a random emoticon when no args are provided', () => {
    main([]);
    const output = logSpy.mock.calls[0][0];
    expect(FACES).toContain(output);
  });

  test('prints the full list with indices when --list is used', () => {
    const calls = [];
    logSpy.mockImplementation(msg => calls.push(msg));
    main(['--list']);
    expect(calls).toEqual(
      FACES.map((face, idx) => `${idx}: ${face}`)
    );
  });

  test('deterministic output with same seed', () => {
    logSpy.mockClear();
    main(['--seed', '42']);
    const first = logSpy.mock.calls[0][0];
    logSpy.mockClear();
    main(['--seed', '42']);
    const second = logSpy.mock.calls[0][0];
    expect(first).toBe(second);
    expect(FACES).toContain(first);
  });

  test('throws error on invalid seed', () => {
    expect(() => main(['--seed', 'abc'])).toThrow('Invalid seed: abc');
  });

  test('prints help message and exits with code 0 for --help', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    errorSpy.mockClear();
    exitSpy.mockClear();

    main(['--help']);

    expect(logSpy).toHaveBeenCalledTimes(1);
    const msg = logSpy.mock.calls[0][0];
    expect(msg).toContain('Usage:');
    expect(msg).toContain('--list');
    expect(msg).toContain('--seed <n>');
    expect(msg).toContain('--help');
    expect(msg).toContain('--interactive, -i');
    expect(msg).toContain('node src/lib/main.js --interactive');
    expect(msg).toContain('node src/lib/main.js -i');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(0);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test('prints help message and exits with code 0 for -h', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    errorSpy.mockClear();
    exitSpy.mockClear();

    main(['-h']);

    expect(logSpy).toHaveBeenCalledTimes(1);
    const msg = logSpy.mock.calls[0][0];
    expect(msg).toContain('Usage:');
    expect(msg).toContain('--list');
    expect(msg).toContain('--seed <n>');
    expect(msg).toContain('-h');
    expect(msg).toContain('--interactive, -i');
    expect(msg).toContain('node src/lib/main.js --interactive');
    expect(msg).toContain('node src/lib/main.js -i');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(0);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

describe('JSON mode', () => {
  let logSpy, errorSpy, exitSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test('random JSON mode outputs valid JSON object', () => {
    main(['--json']);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const obj = JSON.parse(output);
    expect(FACES).toContain(obj.face);
    expect(obj.mode).toBe('random');
    expect(obj.seed).toBeNull();
  });

  test('seeded JSON mode outputs correct JSON object', () => {
    logSpy.mockClear();
    main(['--json', '--seed', '5']);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const obj = JSON.parse(output);
    expect(obj.face).toBe(FACES[5 % FACES.length]);
    expect(obj.mode).toBe('seeded');
    expect(obj.seed).toBe(5);
  });

  test('list JSON mode outputs JSON array of all emoticons', () => {
    main(['--json', '--list']);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const arr = JSON.parse(output);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toEqual(FACES);
  });

  test('invalid seed in JSON mode outputs error JSON and exits with code 1', () => {
    main(['--json', '--seed', 'abc']);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    const errorOutput = errorSpy.mock.calls[0][0];
    const errObj = JSON.parse(errorOutput);
    expect(errObj.error).toBe("Invalid seed. Seed must be a non-negative integer.");
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(logSpy).not.toHaveBeenCalled();
  });
});

describe('Interactive Mode', () => {
  let createInterfaceSpy;
  let rl;
  let callbacks;
  let logSpy;
  let exitSpy;

  beforeEach(() => {
    callbacks = {};
    rl = {
      on: (event, cb) => { callbacks[event] = cb; return rl; },
      prompt: vi.fn(),
      close: vi.fn().mockImplementation(() => { if (callbacks.close) callbacks.close(); }),
    };
    createInterfaceSpy = vi.spyOn(readline, 'createInterface').mockReturnValue(rl);
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    main(['--interactive']);
  });

  afterEach(() => {
    createInterfaceSpy.mockRestore();
    logSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test('should initialize readline with prompt and history options', () => {
    expect(createInterfaceSpy).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
      historySize: 100,
      removeHistoryDuplicates: true
    });
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('random command prints random emoticon', () => {
    callbacks.line("");
    expect(FACES).toContain(logSpy.mock.calls[0][0]);
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('seed command with valid seed prints correct emoticon', () => {
    callbacks.line("seed 5");
    expect(logSpy.mock.calls[0][0]).toBe(FACES[5 % FACES.length]);
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('seed command with invalid seed prints error and continues', () => {
    callbacks.line("seed abc");
    expect(logSpy.mock.calls[0][0]).toBe("Invalid seed: abc");
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('list command prints all emoticons with indices', () => {
    callbacks.line("list");
    const calls = logSpy.mock.calls.map(call => call[0]);
    expect(calls).toEqual(FACES.map((face, idx) => `${idx}: ${face}`));
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('json command outputs last result as JSON', () => {
    callbacks.line("seed 3");
    logSpy.mockClear();
    callbacks.line("json");
    const output = logSpy.mock.calls[0][0];
    const obj = JSON.parse(output);
    expect(obj).toEqual({ face: FACES[3 % FACES.length], mode: "seeded", seed: 3 });
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('help command prints available commands', () => {
    callbacks.line("help");
    const helpMsg = logSpy.mock.calls[0][0];
    expect(helpMsg).toMatch(/Available commands:/);
    expect(helpMsg).toMatch(/random/);
    expect(helpMsg).toMatch(/seed <n>/);
    expect(helpMsg).toMatch(/exit/);
    expect(rl.prompt).toHaveBeenCalled();
  });

  test('exit command closes interface and exits', () => {
    callbacks.line("exit");
    expect(rl.close).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  test('SIGINT triggers exit', () => {
    callbacks.SIGINT();
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});

// Programmatic API tests

describe('Programmatic API', () => {
  test('listFaces is a function that returns correct list', () => {
    expect(typeof listFaces).toBe('function');
    expect(listFaces()).toEqual(FACES);
  });

  test('randomFace is a function that returns a known emoticon', () => {
    expect(typeof randomFace).toBe('function');
    const face = randomFace();
    expect(FACES).toContain(face);
  });

  test('seededFace is a function that returns deterministic emoticon', () => {
    expect(typeof seededFace).toBe('function');
    expect(seededFace(5)).toBe(FACES[5 % FACES.length]);
  });

  test('emoticonJson is a function that returns proper JSON object for random mode', () => {
    expect(typeof emoticonJson).toBe('function');
    const obj = emoticonJson({ mode: 'random', seed: null });
    expect(FACES).toContain(obj.face);
    expect(obj.mode).toBe('random');
    expect(obj.seed).toBeNull();
  });

  test('emoticonJson returns proper JSON object for seeded mode', () => {
    const obj = emoticonJson({ mode: 'seeded', seed: 4 });
    expect(obj.face).toBe(FACES[4 % FACES.length]);
    expect(obj.mode).toBe('seeded');
    expect(obj.seed).toBe(4);
  });
});
