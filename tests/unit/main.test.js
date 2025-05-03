import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "@src/lib/main.js";

const FACES = [
  ":)",
  ":-(",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"
];

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
