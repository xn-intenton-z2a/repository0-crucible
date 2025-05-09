import { describe, test, expect } from 'vitest';
import {
  calculatePiMachin,
  calculatePiNilakantha,
  calculatePiChudnovsky,
  calculatePiGaussLegendre,
  calculatePi,
  benchmarkPi
} from '@src/lib/pi.js';

describe('calculatePiMachin', () => {
  test('calculates pi to 5 digits', () => {
    expect(calculatePiMachin(5)).toBe('3.14159');
  });

  test('calculates pi to 10 digits', () => {
    expect(calculatePiMachin(10)).toBe('3.1415926535');
  });
});

describe('calculatePiNilakantha', () => {
  test('calculates pi to 5 digits', () => {
    expect(calculatePiNilakantha(5)).toBe('3.14159');
  });

  test('calculates pi to 10 digits matching Machin', () => {
    const piMach = calculatePiMachin(10);
    const piNila = calculatePiNilakantha(10);
    expect(piNila).toBe(piMach);
  });
});

describe('calculatePiChudnovsky', () => {
  test('calculates pi to 5 digits', () => {
    expect(calculatePiChudnovsky(5)).toBe('3.14159');
  });

  test('calculates pi to 10 digits matching Machin', () => {
    const piMach = calculatePiMachin(10);
    const piChud = calculatePiChudnovsky(10);
    expect(piChud).toBe(piMach);
  });
});

describe('calculatePiGaussLegendre', () => {
  test('calculates pi to 5 digits', () => {
    expect(calculatePiGaussLegendre(5)).toBe('3.14159');
  });

  test('calculates pi to 10 digits matching Machin', () => {
    const piMach = calculatePiMachin(10);
    const piGL = calculatePiGaussLegendre(10);
    expect(piGL).toBe(piMach);
  });
});

describe('calculatePi dispatcher', () => {
  test('dispatches to machin', () => {
    expect(calculatePi(5, 'machin')).toBe(calculatePiMachin(5));
  });

  test('dispatches to nilakantha', () => {
    expect(calculatePi(5, 'nilakantha')).toBe(calculatePiNilakantha(5));
  });

  test('dispatches to chudnovsky', () => {
    expect(calculatePi(5, 'chudnovsky')).toBe(calculatePiChudnovsky(5));
  });

  test('dispatches to gauss-legendre', () => {
    expect(calculatePi(5, 'gauss-legendre')).toBe(calculatePiGaussLegendre(5));
  });

  test('throws on invalid digits', () => {
    expect(() => calculatePi(0, 'machin')).toThrow();
    expect(() => calculatePi(10001, 'machin')).toThrow();
  });

  test('throws on invalid method', () => {
    expect(() => calculatePi(5, 'wrong')).toThrow();
  });
});

describe('benchmarkPi', () => {
  test('invalid digits throws error', async () => {
    await expect(benchmarkPi(0)).rejects.toThrow('digits must be an integer');
  });

  test('invalid runs throws error', async () => {
    await expect(benchmarkPi(5, 0)).rejects.toThrow('runs must be an integer >= 1');
  });

  test('returns result structure for single method', async () => {
    const results = await benchmarkPi(1, 1, ['machin']);
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);
    const res = results[0];
    expect(res).toHaveProperty('method', 'machin');
    expect(res).toHaveProperty('runs', 1);
    expect(typeof res.averageTimeMs).toBe('number');
    expect(typeof res.minTimeMs).toBe('number');
    expect(typeof res.maxTimeMs).toBe('number');
  });

  test('returns default methods when methods not provided', async () => {
    const results = await benchmarkPi(1, 1);
    expect(results).toHaveLength(4);
    const methods = results.map((r) => r.method).sort();
    expect(methods).toEqual(['chudnovsky', 'gauss-legendre', 'machin', 'nilakantha'].sort());
  });
});
