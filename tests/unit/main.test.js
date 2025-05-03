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
