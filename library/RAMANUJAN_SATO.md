# RAMANUJAN_SATO

## Crawl Summary
Defines two integer sequences for Level 1 Ramanujan–Sato: s1A(k)=C(2k,k)·C(3k,k)·C(6k,3k), s1B(k)=Σ_{j=0..k} C(2j,j)·C(3j,j)·C(6j,3j)·C(k+j,k−j)·(−432)^{k−j}. Provides formulas for 1/π: 12i Σ s1A(k)·(163·3344418k+13591409)/(−640320³)^{k+1/2}, and 24i Σ s1B(k)·(−3669+320√645 (k+1/2))/(−432 U645³)^{k+1/2}, with constants C and fundamental unit U645=(127+5√645)/2. Implementation requires high-precision arithmetic, terminate when term < tolerance. 

## Normalised Extract
Table of Contents:
1 Sequence Definitions
2 π Series Formulas
3 Constants
4 Implementation Details

1 Sequence Definitions
  s1A(k) = binomial(2k,k) · binomial(3k,k) · binomial(6k,3k)
  s1B(k) = Σ_{j=0..k} binomial(2j,j)·binomial(3j,j)·binomial(6j,3j)·binomial(k+j,k−j)·(−432)^{k−j}

2 π Series Formulas
  Level 1A: 1/π = 12i Σ_{k=0..∞} s1A(k) (163·3344418·k + 13591409)/(−640320³)^{k+1/2}
  Level 1B: 1/π = 24i Σ_{k=0..∞} s1B(k) (−3669+320√645 (k+1/2))/(C1B)^{k+1/2}

3 Constants
  C1A = −640320³ = −262537412640768000
  U645 = (127+5√645)/2 ; C1B = −432·U645³

4 Implementation Details
  - Use BigInt for binomial exactness on k≤10
  - Use Decimal.js with precision ≥200 for series
  - Termination when |term| < errorTolerance or k≥maxIterations
  - Manage complex factor i separately or convert to real arithmetic by squaring


## Supplementary Details
Parameter Values:
  precision: default 200 digits
  maxIterations: default 20
  errorTolerance: default 1e-100
Implementation Steps:
  1 Initialize Decimal.set({ precision })
  2 Loop k from 0 to maxIterations
  3 Compute binomial via multiplicative BigInt formula
  4 Compute s sequence per level
  5 Compute numerator and denominator with Decimal
  6 Accumulate sum, break when term < errorTolerance
  7 Multiply by constant factor (12i or 24i)
Configuration Options:
  - level: "1A" or "1B"
  - precision: integer
  - maxIterations: integer
  - errorTolerance: small Decimal string


## Reference Details
API: computePi(options) -> Promise<{ piEstimate: Decimal, iterations: number }>
Parameters:
  options.level: string ("1A"|"1B")
  options.precision: number
  options.maxIterations: number
  options.errorTolerance: string
Return:
  piEstimate: Decimal
  iterations: number
Examples:
// Level 1A
import { computePi } from './ramanujanSato';
const { piEstimate, iterations } = await computePi({ level: '1A', precision: 300, maxIterations: 15, errorTolerance: '1e-140' });
console.log(piEstimate.toString(), iterations);
Implementation Pattern:
export async function computePi({ level, precision, maxIterations, errorTolerance }) {
  import Decimal from 'decimal.js';
  Decimal.set({ precision });
  const { sFunc, Acoef, Bcoef, Cbase } = level === '1A'
    ? { sFunc: s1A, Acoef: 163*3344418, Bcoef: 13591409, Cbase: Decimal(-640320).pow(3) }
    : { sFunc: s1B, Acoef: -3669, Bcoef: 320, Cbase: Decimal(-432).mul(U645.pow(3)) };
  let sum = new Decimal(0);
  let k = 0;
  for (; k < maxIterations; k++) {
    const sVal = new Decimal(sFunc(BigInt(k)).toString());
    const numerator = level==='1A'
      ? new Decimal(Acoef).mul(k).plus(Bcoef)
      : new Decimal(Acoef).plus(new Decimal(Bcoef).mul(U645).mul(k + 0.5));
    const denom = Cbase.pow(k + 0.5);
    const term = sVal.mul(numerator).div(denom);
    sum = sum.plus(term);
    if (term.abs().lt(errorTolerance)) break;
  }
  const factor = level==='1A' ? new Decimal(12).mul(new Decimal(0).plus('i')) : new Decimal(24).mul(new Decimal(0).plus('i'));
  return { piEstimate: factor.mul(sum), iterations: k+1 };
}
Configuration Effects:
  Increasing precision reduces round-off error
  Larger maxIterations improves convergence
  Smaller errorTolerance yields more accurate pi
Best Practices:
  Pre-compute binomial table for k≤20 to speed sFunc
  Use real arithmetic by squaring series to avoid complex i handling
Troubleshooting:
  Error: term is NaN -> increase precision
  Convergence slow -> increase maxIterations or adjust Cbase calculation
  Overflow in binomial -> use BigInt or split into factors
Exact commands:
npx babel-node scripts/computePi.js --level=1A --precision=250 --maxIterations=12
Expected output: pi digits starting 3.14159265358979…, iterations: 9

## Information Dense Extract
s1A(k)=C(2k,k)C(3k,k)C(6k,3k); s1B(k)=Σ_{j=0..k}C(2j,j)C(3j,j)C(6j,3j)C(k+j,k−j)(−432)^{k−j}; 1/π(1A)=12iΣ s1A(k)(163·3344418k+13591409)/(−640320³)^{k+1/2}; 1/π(1B)=24iΣ s1B(k)(−3669+320√645(k+1/2))/(−432U645³)^{k+1/2}; binomial via BigInt multiplicative; Decimal.js precision≥200; terminate when |term|<1e-100; computePi({level,precision,maxIterations,errorTolerance})→{piEstimate,iterations}. U645=(127+5√645)/2.

## Sanitised Extract
Table of Contents:
1 Sequence Definitions
2  Series Formulas
3 Constants
4 Implementation Details

1 Sequence Definitions
  s1A(k) = binomial(2k,k)  binomial(3k,k)  binomial(6k,3k)
  s1B(k) = _{j=0..k} binomial(2j,j)binomial(3j,j)binomial(6j,3j)binomial(k+j,kj)(432)^{kj}

2  Series Formulas
  Level 1A: 1/ = 12i _{k=0..} s1A(k) (1633344418k + 13591409)/(640320)^{k+1/2}
  Level 1B: 1/ = 24i _{k=0..} s1B(k) (3669+320645 (k+1/2))/(C1B)^{k+1/2}

3 Constants
  C1A = 640320 = 262537412640768000
  U645 = (127+5645)/2 ; C1B = 432U645

4 Implementation Details
  - Use BigInt for binomial exactness on k10
  - Use Decimal.js with precision 200 for series
  - Termination when |term| < errorTolerance or kmaxIterations
  - Manage complex factor i separately or convert to real arithmetic by squaring

## Original Source
BigInt and Pi Algorithms Reference
https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series

## Digest of RAMANUJAN_SATO

# Ramanujan–Sato Series for 1/π (Retrieved 2024-06-xx)

## Level 1A Sequence Definition
s1A(k) = binomial(2k,k) · binomial(3k,k) · binomial(6k,3k)
Values:  s1A(0)=1, s1A(1)=120, s1A(2)=83160, s1A(3)=81681600

## Level 1A π Formula
1/π = 12·i · Σ_{k=0..∞} s1A(k) · (163·3344418·k + 13591409) / (−640320^3)^{k+1/2}
Constant:  C = −640320³ = −262537412640768000

## Level 1B Sequence Definition
s1B(k) = Σ_{j=0..k} binomial(2j,j)·binomial(3j,j)·binomial(6j,3j)·binomial(k+j,k−j)·(−432)^{k−j}
Values: s1B(0)=1, s1B(1)=−312, s1B(2)=114264, s1B(3)=−44196288

## Level 1B π Formula
1/π = 24·i · Σ_{k=0..∞} s1B(k) · (−3669 + 320·√645 ·(k+1/2)) / (−432·U645³)^{k+1/2}
Constants: U645 = (127+5√645)/2 ;  C = −432·U645³

## JavaScript Implementation Patterns
- computeBinomial(n,k) using multiplicative formula with BigInt
- computeSequence1A(k) and computeSequence1B(k)
- computePiSeries(level, options) with Decimal.js or native BigInt+Number for moderate k

## Configuration
precision: 100 decimal places
maxIterations: 10
errorTolerance: 1e-80

## Troubleshooting
- Increase precision if final error > tolerance
- Ensure k loop terminates when term < tolerance or k >= maxIterations
- Watch for overflow in intermediate factorials; use BigInt or arbitrary precision

## Example Code Snippet (Level 1A)
```javascript
import Decimal from 'decimal.js';
Decimal.set({ precision: 200 });

function binomial(n,k) {
  let res = 1n;
  for (let i=1n; i<=k; i++) {
    res = res * (n - k + i) / i;
  }
  return res;
}

function s1A(k) {
  return binomial(2n*k, k) * binomial(3n*k, k) * binomial(6n*k, 3n*k);
}

function computePiLevel1A(maxIter) {
  const C = Decimal(-640320).pow(3);
  let sum = new Decimal(0);
  for (let k=0; k<maxIter; k++) {
    const term = new Decimal(s1A(BigInt(k))).mul(
      new Decimal(163).mul(3344418).mul(k).plus(13591409)
    ).div(C.pow(k + 0.5));
    sum = sum.plus(term);
    if (term.abs().lt('1e-100')) break;
  }
  return Decimal(12).mul(Decimal.i || new Decimal(0)); // handle i separately
}
```

## Attribution
- Source: BigInt and Pi Algorithms Reference
- URL: https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
- License: CC BY-SA 4.0
- Crawl Date: 2025-05-11T21:25:22.913Z
- Data Size: 20311032 bytes
- Links Found: 20256

## Retrieved
2025-05-11
