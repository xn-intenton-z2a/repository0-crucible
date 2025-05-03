import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import readline from "readline";
import fs from 'fs';
import yaml from 'js-yaml';
import {
  main,
  listFaces,
  randomFace,
  seededFace,
  emoticonJson,
  version,
  configureEmoticons,
  getEmoticonDiagnostics
} from '@src/lib/main.js';

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

  // Diagnostics tests
  test('prints diagnostics JSON and exits for --diagnostics', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['--diagnostics']);
    const output = logSpy.mock.calls[0][0];
    const obj = JSON.parse(output);
    expect(obj).toHaveProperty('version', version);
    expect(obj).toHaveProperty('configSource', 'builtin');
    expect(obj).toHaveProperty('emoticonCount', FACES.length);
    expect(obj).toHaveProperty('isCustomConfig', false);
    expect(obj).toHaveProperty('colorStyle', null);
    expect(typeof obj.supportsColorLevel).toBe('number');
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  test('EMOTICONS_DIAGNOSTICS env var triggers diagnostics', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    process.env.EMOTICONS_DIAGNOSTICS = '1';
    logSpy.mockClear();
    main([]);
    const output = logSpy.mock.calls[0][0];
    const obj = JSON.parse(output);
    expect(obj).toHaveProperty('version', version);
    expect(obj).toHaveProperty('configSource', 'builtin');
    expect(obj.emoticonCount).toBe(FACES.length);
    expect(obj.isCustomConfig).toBe(false);
    expect(obj.colorStyle).toBe(null);
    expect(typeof obj.supportsColorLevel).toBe('number');
    expect(exitSpy).toHaveBeenCalledWith(0);
    delete process.env.EMOTICONS_DIAGNOSTICS;
    exitSpy.mockRestore();
  });

  // Count option tests
  test('prints multiple random emoticons and exits with code 0 for --count', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['--count', '3']);
    expect(logSpy).toHaveBeenCalledTimes(3);
    logSpy.mock.calls.forEach(call => {
      expect(FACES).toContain(call[0]);
    });
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  test('prints JSON array when --json and --count are used and exits 0', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['--json', '--count', '2']);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const arr = JSON.parse(output);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toHaveLength(2);
    arr.forEach(item => expect(FACES).toContain(item));
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  test('prints seeded multi-output in plain mode and exits 0', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['--seed', '5', '--count', '4']);
    const expected = [
      seededFace(5),
      seededFace(6),
      seededFace(7),
      seededFace(8)
    ];
    expect(logSpy).toHaveBeenCalledTimes(4);
    logSpy.mock.calls.forEach((call, idx) => {
      expect(call[0]).toBe(expected[idx]);
    });
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  test('prints seeded JSON multi-output and exits 0', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    logSpy.mockClear();
    main(['--json', '--seed', '5', '--count', '4']);
    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    const arr = JSON.parse(output);
    const expected = [
      seededFace(5),
      seededFace(6),
      seededFace(7),
      seededFace(8)
    ];
    expect(arr).toEqual(expected);
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  test('exits with error for invalid count value', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    main(['--count', 'abc']);
    expect(errorSpy).toHaveBeenCalledWith('Invalid count: abc');
    expect(exitSpy).toHaveBeenCalledWith(1);
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test('exits with error for negative count', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    main(['--count', '-1']);
    expect(errorSpy).toHaveBeenCalledWith('Invalid count: -1');
    expect(exitSpy).toHaveBeenCalledWith(1);
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test('exits with error when count value is missing', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    main(['--count']);
    expect(errorSpy).toHaveBeenCalledWith('Invalid count: undefined');
    expect(exitSpy).toHaveBeenCalledWith(1);
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

// Tests for invalid port handling
import { vi as vitestVi } from "vitest";
describe('Invalid --port handling in HTTP server mode', () => {
  let errorSpy;
  let exitSpy;
  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => { throw new Error(`process.exit:${code}`); });
  });
  afterEach(() => {
    errorSpy.mockRestore();
    exitSpy.mockRestore();
    vi.restoreAllMocks();
  });

  test('exits with error for non-numeric port', () => {
    expect(() => main(['--serve', '--port', 'abc'])).toThrow('process.exit:1');
    expect(errorSpy).toHaveBeenCalledWith('Invalid port: abc');
  });

  test('exits with error for negative port', () => {
    expect(() => main(['--serve', '--port', '-1'])).toThrow('process.exit:1');
    expect(errorSpy).toHaveBeenCalledWith('Invalid port: -1');
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

// New tests for programmatic API
describe('Programmatic API Extensions', () => {
  const CUSTOM = ['A', 'B', 'C'];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('getEmoticonDiagnostics returns default diagnostics', () => {
    const diag = getEmoticonDiagnostics();
    expect(diag).toHaveProperty('version', version);
    expect(diag).toHaveProperty('configSource', 'builtin');
    expect(diag).toHaveProperty('emoticonCount', FACES.length);
    expect(diag).toHaveProperty('isCustomConfig', false);
    expect(diag).toHaveProperty('colorStyle', null);
    expect(typeof diag.supportsColorLevel).toBe('number');
  });

  test('configureEmoticons loads valid JSON and returns diagnostics', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(CUSTOM));
    const diag = configureEmoticons({ configPath: 'custom.json' });
    expect(diag).toEqual({
      version,
      configSource: 'custom.json',
      emoticonCount: CUSTOM.length,
      isCustomConfig: true,
      colorStyle: null,
      supportsColorLevel: expect.any(Number),
    });
    expect(listFaces()).toEqual(CUSTOM);
  });

  test('configureEmoticons loads valid YAML and returns diagnostics', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(yaml.dump(CUSTOM));
    const diag = configureEmoticons({ configPath: 'custom.yaml' });
    expect(diag.configSource).toBe('custom.yaml');
    expect(diag.emoticonCount).toBe(CUSTOM.length);
    expect(listFaces()).toEqual(CUSTOM);
  });

  test('configureEmoticons throws on missing file', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => configureEmoticons({ configPath: 'nofile' })).toThrow('Invalid config: File not found');
  });

  test('configureEmoticons throws on invalid content', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({ foo: 'bar' }));
    expect(() => configureEmoticons({ configPath: 'bad.json' })).toThrow('Invalid config: Expected an array of strings');
  });

  test('getEmoticonDiagnostics after configureEmoticons returns updated diagnostics', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(CUSTOM));
    const firstDiag = configureEmoticons({ configPath: 'custom.json' });
    const secondDiag = getEmoticonDiagnostics();
    expect(secondDiag).toEqual(firstDiag);
  });
});
