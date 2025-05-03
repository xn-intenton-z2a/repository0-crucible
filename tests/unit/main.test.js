import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import readline from "readline";
import { main, listFaces, randomFace, seededFace, emoticonJson, version } from "@src/lib/main.js";

const FACES = [
  ":)",
  ":-([",
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
    expect(msg).toContain('--config <path>');
    expect(msg).toContain('--list');
    expect(msg).toContain('--seed <n>');
    expect(msg).toContain('--help');
    expect(msg).toContain('--interactive, -i');
    expect(msg).toContain('--version, -v');
    expect(msg).toContain('--serve');
    expect(msg).toContain('--port <n>');
    expect(msg).toContain('node src/lib/main.js --config');
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
    expect(msg).toContain('--config <path>');
    expect(msg).toContain('--list');
    expect(msg).toContain('--seed <n>');
    expect(msg).toContain('-h');
    expect(msg).toContain('--interactive, -i');
    expect(msg).toContain('--version, -v');
    expect(msg).toContain('--serve');
    expect(msg).toContain('--port <n>');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(0);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  // Tests for version flag
  test('prints version and exits for --version', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['--version']);
    expect(logSpy).toHaveBeenCalledWith(version);
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  test('prints version and exits for -v', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['-v']);
    expect(logSpy).toHaveBeenCalledWith(version);
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });
});

// Custom configuration tests
import fs from 'fs';
import yaml from 'js-yaml';

describe('Custom emoticon config', () => {
  const CUSTOM = ['X', 'Y', 'Z'];
  let logError;
  let exitSpy;

  beforeEach(() => {
    // Reset spies
    logError = vi.spyOn(console, 'error').mockImplementation(() => {});
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => { throw new Error(`process.exit:${code}`); });
  });

  afterEach(() => {
    logError.mockRestore();
    exitSpy.mockRestore();
    vi.restoreAllMocks();
  });

  test('loads custom JSON via --config', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(CUSTOM));
    main(['--config', 'custom.json']);
    expect(listFaces()).toEqual(CUSTOM);
    // seededFace and randomFace should use custom array
    expect(CUSTOM).toContain(randomFace());
    expect(seededFace(1)).toBe(CUSTOM[1]);
  });

  test('loads custom YAML via EMOTICONS_CONFIG env var', () => {
    process.env.EMOTICONS_CONFIG = 'custom.yaml';
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(yaml.dump(CUSTOM));
    main([]);
    expect(listFaces()).toEqual(CUSTOM);
    delete process.env.EMOTICONS_CONFIG;
  });

  test('CLI flag takes precedence over env var', () => {
    process.env.EMOTICONS_CONFIG = 'env.yaml';
    vi.spyOn(fs, 'existsSync').mockImplementation((p) => p.endsWith('flag.json'));
    vi.spyOn(fs, 'readFileSync').mockImplementation((p) => JSON.stringify(CUSTOM));
    main(['--config', 'flag.json']);
    expect(listFaces()).toEqual(CUSTOM);
    delete process.env.EMOTICONS_CONFIG;
  });

  test('exits with error if file not found', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => main(['--config', 'nofile'])).toThrow('process.exit:1');
    expect(logError).toHaveBeenCalledWith('Invalid config: File not found');
  });

  test('exits with error if content is invalid', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({foo: 'bar'}));
    expect(() => main(['--config', 'bad.json'])).toThrow('process.exit:1');
    expect(logError).toHaveBeenCalledWith('Invalid config: Expected an array of strings');
  });
});