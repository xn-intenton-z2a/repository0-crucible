import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import { main } from '@src/lib/main.js';

describe('CLI Input Validation', () => {
  test('invalid digits throws error', async () => {
    await expect(main(['--digits', '0'])).rejects.toThrow('Invalid --digits');
  });

  test('invalid method throws error', async () => {
    await expect(main(['--method', 'invalid'])).rejects.toThrow('Invalid --method');
  });

  test('invalid format throws error', async () => {
    await expect(main(['--format', 'bmp'])).rejects.toThrow('Invalid --format');
  });

  test('png format without output throws error', async () => {
    await expect(main(['--format', 'png'])).rejects.toThrow('--output is required');
  });
});

describe('CLI Text Output', () => {
  let log;
  beforeEach(() => {
    log = vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    log.mockRestore();
  });

  test('defaults to 100 digits', async () => {
    await main([]);
    expect(log).toHaveBeenCalled();
  });

  test('chudnovsky method outputs correct pi', async () => {
    log.mockClear();
    await main(['--digits', '5', '--method', 'chudnovsky']);
    expect(log).toHaveBeenCalledWith('3.14159');
  });

  test('gauss-legendre method outputs correct pi', async () => {
    log.mockClear();
    await main(['--digits', '5', '--method', 'gauss-legendre']);
    expect(log).toHaveBeenCalledWith('3.14159');
  });
});

describe('CLI PNG Output', () => {
  const outPath = 'test_output.png';

  afterEach(() => {
    if (fs.existsSync(outPath)) {
      fs.unlinkSync(outPath);
    }
  });

  test('creates a png file', async () => {
    await main(['--digits', '5', '--format', 'png', '--output', outPath]);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
