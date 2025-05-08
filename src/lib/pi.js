import Decimal from 'decimal.js';

/**
 * Calculate pi using the Machin formula: pi = 16*arctan(1/5) - 4*arctan(1/239)
 * @param {number} digits - number of decimal places
 * @returns {string} pi to specified decimals
 */
export function calculatePiMachin(digits) {
  const extra = 5;
  Decimal.set({ precision: digits + extra, rounding: Decimal.ROUND_DOWN });
  const one = new Decimal(1);
  function arctan(x) {
    let sum = new Decimal(0);
    let term = new Decimal(x);
    let k = 0;
    const x2 = new Decimal(x).times(x);
    const tolerance = new Decimal(10).pow(-digits - 2);
    while (term.abs().greaterThan(tolerance)) {
      const denom = new Decimal(2 * k + 1);
      sum = k % 2 === 0 ? sum.plus(term.div(denom)) : sum.minus(term.div(denom));
      term = term.times(x2);
      k++;
    }
    return sum;
  }
  const arctan1_5 = arctan(one.div(5));
  const arctan1_239 = arctan(one.div(239));
  const pi = arctan1_5.times(16).minus(arctan1_239.times(4));
  // Truncate rather than round to match expected output
  return pi.toFixed(digits, Decimal.ROUND_DOWN);
}

/**
 * Calculate pi using the Nilakantha series: 3 + 4/(2*3*4) - 4/(4*5*6) + ...
 * @param {number} digits - number of decimal places
 * @returns {string} pi to specified decimals
 */
export function calculatePiNilakantha(digits) {
  const extra = 5;
  Decimal.set({ precision: digits + extra, rounding: Decimal.ROUND_DOWN });
  let pi = new Decimal(3);
  let k = 1;
  const tolerance = new Decimal(10).pow(-digits - 2);
  let term;
  do {
    const denom = new Decimal(2 * k).times(2 * k + 1).times(2 * k + 2);
    term = new Decimal(4).div(denom);
    pi = k % 2 === 1 ? pi.plus(term) : pi.minus(term);
    k++;
  } while (term.greaterThan(tolerance));
  // Truncate rather than round to match Machin behavior
  return pi.toFixed(digits, Decimal.ROUND_DOWN);
}

/**
 * Dispatch to the selected pi calculation method.
 * @param {number} digits - number of decimal places (1 to 10000)
 * @param {string} method - 'machin' or 'nilakantha'
 * @returns {string} pi to specified decimals
 */
export function calculatePi(digits = 100, method = 'machin') {
  if (!Number.isInteger(digits) || digits < 1 || digits > 10000) {
    throw new Error('digits must be an integer between 1 and 10000');
  }
  if (method === 'machin') {
    return calculatePiMachin(digits);
  } else if (method === 'nilakantha') {
    return calculatePiNilakantha(digits);
  } else {
    throw new Error('method must be "machin" or "nilakantha"');
  }
}
