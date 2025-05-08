import { describe, test, expect } from 'vitest';
import { calculatePiMachin, calculatePiNilakantha, calculatePi } from '@src/lib/pi.js';

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

describe('calculatePi', () => {
  test('dispatches to machin', () => {
    expect(calculatePi(5, 'machin')).toBe(calculatePiMachin(5));
  });

  test('dispatches to nilakantha', () => {
    expect(calculatePi(5, 'nilakantha')).toBe(calculatePiNilakantha(5));
  });

  test('throws on invalid digits', () => {
    expect(() => calculatePi(0, 'machin')).toThrow();
    expect(() => calculatePi(10001, 'machin')).toThrow();
  });

  test('throws on invalid method', () => {
    expect(() => calculatePi(5, 'wrong')).toThrow();
  });
});
