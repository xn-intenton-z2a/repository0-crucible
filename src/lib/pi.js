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
  return pi.toFixed(digits, Decimal.ROUND_DOWN);
}

/**
 * Calculate pi using the Chudnovsky algorithm.
 * @param {number} digits - number of decimal places
 * @returns {string} pi to specified decimals
 */
export function calculatePiChudnovsky(digits) {
  const extra = 5;
  Decimal.set({ precision: digits + extra, rounding: Decimal.ROUND_DOWN });
  const tolerance = new Decimal(10).pow(-digits - 2);
  // Constant C = 426880 * sqrt(10005)
  const C = new Decimal(426880).times(new Decimal(10005).sqrt());
  let sum = new Decimal(0);
  let A = new Decimal(1);
  let k = 0;
  const negConst = new Decimal(-262537412640768000);
  while (true) {
    const numerator = A.times(new Decimal(13591409).plus(new Decimal(545140134).times(k)));
    const denominator = negConst.pow(k);
    const term = numerator.div(denominator);
    sum = sum.plus(term);
    if (term.abs().lessThan(tolerance)) {
      break;
    }
    // Update A for next k: A_{k+1} = A_k * ((6k+1)*(2k+1)*(6k+5)) / (k+1)^3
    const k1 = new Decimal(k);
    const factor = new Decimal(6).times(k1).plus(1)
      .times(new Decimal(2).times(k1).plus(1))
      .times(new Decimal(6).times(k1).plus(5));
    const denomA = new Decimal(k + 1).pow(3);
    A = A.times(factor).div(denomA);
    k++;
  }
  const pi = C.div(sum);
  return pi.toFixed(digits, Decimal.ROUND_DOWN);
}

/**
 * Calculate pi using the Gauss-Legendre algorithm.
 * @param {number} digits - number of decimal places
 * @returns {string} pi to specified decimals
 */
export function calculatePiGaussLegendre(digits) {
  const extra = 5;
  Decimal.set({ precision: digits + extra, rounding: Decimal.ROUND_DOWN });
  const tolerance = new Decimal(10).pow(-digits - 2);
  let a = new Decimal(1);
  let b = new Decimal(1).div(new Decimal(2).sqrt());
  let t = new Decimal(1).div(4);
  let p = new Decimal(1);
  let pi;
  let prevPi = new Decimal(0);
  while (true) {
    const an = a.plus(b).div(2);
    const bn = a.times(b).sqrt();
    const diff = a.minus(an);
    const tn = t.minus(p.times(diff.pow(2)));
    const pn = p.times(2);
    a = an;
    b = bn;
    t = tn;
    p = pn;
    pi = a.plus(b).pow(2).div(t.times(4));
    if (pi.minus(prevPi).abs().lessThan(tolerance)) {
      break;
    }
    prevPi = pi;
  }
  return pi.toFixed(digits, Decimal.ROUND_DOWN);
}

/**
 * Dispatch to the selected pi calculation method.
 * @param {number} digits - number of decimal places (1 to 10000)
 * @param {string} method - 'chudnovsky', 'gauss-legendre', 'machin' or 'nilakantha'
 * @returns {string} pi to specified decimals
 */
export function calculatePi(digits = 100, method = 'chudnovsky') {
  if (!Number.isInteger(digits) || digits < 1 || digits > 10000) {
    throw new Error('digits must be an integer between 1 and 10000');
  }
  switch (method) {
    case 'chudnovsky':
      return calculatePiChudnovsky(digits);
    case 'gauss-legendre':
      return calculatePiGaussLegendre(digits);
    case 'machin':
      return calculatePiMachin(digits);
    case 'nilakantha':
      return calculatePiNilakantha(digits);
    default:
      throw new Error('method must be "chudnovsky", "gauss-legendre", "machin" or "nilakantha"');
  }
}
