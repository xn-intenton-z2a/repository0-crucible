import { describe, test, expect } from 'vitest';
import { calculatePi, calculatePiParallel, main } from '@src/lib/main.js';
import { spawnSync } from 'child_process';
import path from 'path';

// Unit tests for calculatePi function
describe('calculatePi', () => {
  test('machin algorithm 5 digits', () => {
    const pi5 = calculatePi(5, 'machin').toFixed(5);
    expect(pi5).toBe('3.14159');
  });

  test('both algorithms 10 digits match', () => {
    const m = calculatePi(10, 'machin').toFixed(10);
    const g = calculatePi(10, 'gauss-legendre').toFixed(10);
    expect(m).toBe('3.1415926535');
    expect(g).toBe('3.1415926535');
  });

  test('chudnovsky algorithm 5 digits', () => {
    const pi5 = calculatePi(5, 'chudnovsky').toFixed(5);
    expect(pi5).toBe('3.14159');
  });

  test('chudnovsky algorithm 10 digits', () => {
    const pi10 = calculatePi(10, 'chudnovsky').toFixed(10);
    expect(pi10).toBe('3.1415926535');
  });

  test('invalid digits throws', () => {
    expect(() => calculatePi(0, 'machin')).toThrow(/Invalid digits/);
  });

  test('invalid algorithm throws', () => {
    expect(() => calculatePi(10, 'unknown')).toThrow(/Invalid algorithm/);
  });
});

// Unit tests for calculatePiParallel function
describe('calculatePiParallel', () => {
  test('threads=1 matches single-threaded', async () => {
    const single = calculatePi(10, 'machin').toFixed(10);
    const parallel = (await calculatePiParallel(10, 'machin', 1)).toFixed(10);
    expect(parallel).toBe(single);
  });

  test('threads=2 returns correct pi', async () => {
    const single = calculatePi(10, 'gauss-legendre').toFixed(10);
    const parallel = (await calculatePiParallel(10, 'gauss-legendre', 2)).toFixed(10);
    expect(parallel).toBe(single);
  });

  test('invalid threads throws', async () => {
    await expect(calculatePiParallel(10, 'machin', 0)).rejects.toThrow(/Invalid threads/);
  });
});

// CLI integration tests
describe('CLI', () => {
  const cliPath = path.resolve(__dirname, '../../src/lib/main.js');

  test('CLI machin 10 digits', () => {
    const result = spawnSync('node', [cliPath, '--digits', '10', '--algorithm', 'machin']);
    expect(result.status).toBe(0);
    expect(result.stdout.toString().trim()).toBe('3.1415926535');
  });

  test('CLI default prints 100-digit pi', () => {
    const result = spawnSync('node', [cliPath]);
    expect(result.status).toBe(0);
    const out = result.stdout.toString().trim();
    // Expect 100 decimal places plus the leading '3.' => length 102 including '3.'
    expect(out.startsWith('3.')).toBe(true);
    expect(out.replace('.', '').length).toBe(101);
  });

  test('CLI invalid digits exits with error', () => {
    const result = spawnSync('node', [cliPath, '--digits', '0']);
    expect(result.status).not.toBe(0);
    expect(result.stderr.toString()).toMatch(/Invalid digits/);
  });

  test('CLI threads=2 uses parallel and prints pi', () => {
    const result = spawnSync('node', [cliPath, '--digits', '10', '--algorithm', 'machin', '--threads', '2']);
    expect(result.status).toBe(0);
    expect(result.stdout.toString().trim()).toBe('3.1415926535');
  });

  test('CLI chudnovsky 10 digits', () => {
    const result = spawnSync('node', [cliPath, '--digits', '10', '--algorithm', 'chudnovsky']);
    expect(result.status).toBe(0);
    expect(result.stdout.toString().trim()).toBe('3.1415926535');
  });
});
