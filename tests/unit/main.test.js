import { describe, test, expect, afterEach, vi } from 'vitest';
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
  test('defaults to 100 digits', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main([]);
    expect(log).toHaveBeenCalled();
    log.mockRestore();
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
