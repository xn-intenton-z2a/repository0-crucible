# PI_COMPUTATION

## Crawl Summary
Chudnovsky (Level 1): s1A(k)=binomial(2k,k)·binomial(3k,k)·binomial(6k,3k); 1/pi=12i Σ s1A(k)(163·3344418k+13591409)/(-640320^3)^{k+1/2}. Level 2: s2A(k)=binomial(2k,k)^2·binomial(4k,2k); 1/pi=32√2 Σ s2A(k)(58·455k+1103)/(396^4)^{k+1/2}. Level 3: s3A(k)=binomial(2k,k)^2·binomial(3k,k); 1/pi=2i Σ s3A(k)(267·53k+827)/(-300^3)^{k+1/2}.

## Normalised Extract
Table of Contents:
1. Chudnovsky Series (Level 1)
2. Level 2 Series
3. Level 3 Series
4. Implementation Notes

1. Chudnovsky Series (Level 1)
Definition: s1A(k)=C(2k,k)*C(3k,k)*C(6k,3k)
Constant: C = -640320^3 = -262537412640768000
Numerator term: A*k + B with A=163*3344418=546640, B=13591409
Series: 1/pi=12*i*Σ_{k=0..∞} s1A(k)*(A*k+B)/C^{k+1/2}

2. Level 2 Series
Definition: s2A(k)=C(2k,k)^2*C(4k,2k)
Constant: C=396^4=24591257856
Numerator term: A*k+B with A=58*455=26390, B=1103
Series: 1/pi=32*√2*Σ s2A(k)*(A*k+B)/C^{k+1/2}

3. Level 3 Series
Definition: s3A(k)=C(2k,k)^2*C(3k,k)
Constant: C=-300^3=-27000000
Numerator term: A*k+B with A=267*53=14151, B=827
Series: 1/pi=2*i*Σ s3A(k)*(A*k+B)/C^{k+1/2}

4. Implementation Notes
Use factorial recurrence: fact(0)=1, fact(n)=n*fact(n-1)
Compute binomials via BigInt: C(n,k)=fact(n)/(fact(k)*fact(n-k))
Set arbitrary-precision library.precision >= desired digits+10
Compute sqrt(C) via library.sqrt
Sum real and imaginary parts separately; eliminate i by using absolute values
Stop when incremental term < 10^{-precision}  

## Supplementary Details
Precision and Terms:
- To compute D digits, set precision = D+20
- Required terms N ~ D/14 for Chudnovsky

Arbitrary-Precision Setup:
- Use decimal.js: Decimal.precision = P
- Import: import Decimal from 'decimal.js'

Factorial Implementation:
function factorial(n: number): BigInt {
  let r = 1n;
  for(let i=2n; i<=BigInt(n); i++) r *= i;
  return r;
}

Binomial(n,k):
function binomial(n:number,k:number): BigInt {
  return factorial(n) / (factorial(k) * factorial(n-k));
}

Computing Term:
function chudnovskyTerm(k:number): Decimal {
  const kBig=BigInt(k);
  const s1 = Decimal(factorial(2*k) ).dividedBy(Decimal(factorial(k))**2)
      .times( Decimal(factorial(3*k)).dividedBy(Decimal(factorial(k))*Decimal(factorial(2*k))))
      .times( Decimal(factorial(6*k)).dividedBy(Decimal(factorial(3*k))*Decimal(factorial(3*k))));
  const numerator = Decimal(546640).times(k).plus(13591409);
  const denominator = Decimal(-262537412640768000).pow(k+0.5);
  return s1.times(numerator).dividedBy(denominator);
}

Implementation Steps:
1. Set Decimal.precision
2. Compute sum = Σ_{k=0..N-1} chudnovskyTerm(k)
3. Compute pi = Decimal(1).dividedBy(sum)


## Reference Details
API:
computePiChudnovsky(terms: number, precision: number): Decimal
- terms: integer >0, number of series terms
- precision: integer >= desired digits+10
- returns: Decimal approximation of pi with 'precision' digits
- throws: RangeError if terms<1 or precision<1
Signature:
import { Decimal } from 'decimal.js';
export function computePiChudnovsky(terms: number, precision: number): Decimal;

Examples:
import {computePiChudnovsky} from './pi';
const pi50 = computePiChudnovsky(4, 60);
console.log(pi50.toString());
// Expected: 3.1415926535... up to 50 digits

Implementation Pattern:
1. Set Decimal.precision = precision
2. Precompute factorials in BigInt array of length 6*terms
3. Loop k=0..terms-1:
   a. Compute s1A(k) via binomial coefficients
   b. Compute term = s1A(k)*(A*k+B)/C^{k+1/2}
   c. Accumulate sum
4. Return Decimal(1).dividedBy(sum)

Configuration Options:
{ precision: number, terms: number }
- precision default: 200
- terms default: Math.ceil(precision/14)

Best Practices:
- Use BigInt for factorials to avoid overflow
- Precompute factorials once
- Use library.sqrt for half-integer powers
- Increase precision before computing power or division

Troubleshooting:
Issue: incorrect last digits
Command: console.log(term.toString())
Expected: decreasing magnitude <10^{-(precision)}
Fix: increase Decimal.precision or terms

Issue: factorial overflow
Symptom: RangeError or Infinity
Fix: use BigInt factorial implementation

Issue: slow performance
Advice: memoize factorials, use iterative loops, avoid recomputing powers


## Information Dense Extract
Chudnovsky: 1/pi=12iΣ_{k=0..N-1}C(2k,k)C(3k,k)C(6k,3k)(546640k+13591409)/(-640320^3)^{k+1/2}. N≈digits/14. decimal.js: set precision, use BigInt factorial, binomial. compute sum, pi=1/sum. API: computePiChudnovsky(terms,precision):Decimal. Default terms=ceil(precision/14), precision=digits+10. factorial: iterative BigInt. binomial=fact(n)/(fact(k)fact(n-k)). Best practices: precompute factorials, memoize, set precision high, check term magnitude <10^{-precision}. Troubleshooting: increase terms or precision if error exceeds threshold.

## Sanitised Extract
Table of Contents:
1. Chudnovsky Series (Level 1)
2. Level 2 Series
3. Level 3 Series
4. Implementation Notes

1. Chudnovsky Series (Level 1)
Definition: s1A(k)=C(2k,k)*C(3k,k)*C(6k,3k)
Constant: C = -640320^3 = -262537412640768000
Numerator term: A*k + B with A=163*3344418=546640, B=13591409
Series: 1/pi=12*i*_{k=0..} s1A(k)*(A*k+B)/C^{k+1/2}

2. Level 2 Series
Definition: s2A(k)=C(2k,k)^2*C(4k,2k)
Constant: C=396^4=24591257856
Numerator term: A*k+B with A=58*455=26390, B=1103
Series: 1/pi=32*2* s2A(k)*(A*k+B)/C^{k+1/2}

3. Level 3 Series
Definition: s3A(k)=C(2k,k)^2*C(3k,k)
Constant: C=-300^3=-27000000
Numerator term: A*k+B with A=267*53=14151, B=827
Series: 1/pi=2*i* s3A(k)*(A*k+B)/C^{k+1/2}

4. Implementation Notes
Use factorial recurrence: fact(0)=1, fact(n)=n*fact(n-1)
Compute binomials via BigInt: C(n,k)=fact(n)/(fact(k)*fact(n-k))
Set arbitrary-precision library.precision >= desired digits+10
Compute sqrt(C) via library.sqrt
Sum real and imaginary parts separately; eliminate i by using absolute values
Stop when incremental term < 10^{-precision}

## Original Source
π Computation Algorithms
https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series

## Digest of PI_COMPUTATION

# Chudnovsky Series (Level 1)

1/pi = 12i ∑_{k=0..∞} s1A(k)·(163·3344418k+13591409)/(-640320^3)^{k+1/2}

where

s1A(k) = C(2k,k)·C(3k,k)·C(6k,3k)

# Level 2 Series

1/pi = 32√2 ∑_{k=0..∞} s2A(k)·(58·455k+1103)/(396^4)^{k+1/2}

where

s2A(k) = C(2k,k)^2·C(4k,2k)

# Level 3 Series

1/pi = 2i ∑_{k=0..∞} s3A(k)·(267·53k+827)/(-300^3)^{k+1/2}

where

s3A(k) = C(2k,k)^2·C(3k,k)

# Arbitrary-Precision Implementation (decimal.js)

Method computePiChudnovsky(terms:number, precision:number): Decimal
– sets Decimal.precision = precision
– uses BigInt for factorials
– sums N terms of the series
– returns 1/sum


## Attribution
- Source: π Computation Algorithms
- URL: https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-10T09:26:31.462Z
- Data Size: 21084192 bytes
- Links Found: 21511

## Retrieved
2025-05-10
