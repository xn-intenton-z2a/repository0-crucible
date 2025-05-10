# HIGH_PRECISION_PI

## Crawl Summary
Chudnovsky high-precision π: 1/π = 12 Σ (-1)^k (6k)! (545140134k+13591409)/( (3k)! (k!)^3 640320^(3k+3/2) ), with s1A(k)=C(2k,k)C(3k,k)C(6k,3k). Convergence adds ~14 digits per term. Key constants: A=545140134, B=13591409, C=262537412640768000.

## Normalised Extract
Table of Contents:
1. Sequence Definition
2. Chudnovsky Series Formula
3. Numeric Constants
4. Convergence Rate

1. Sequence Definition
s1A(k) = C(2k,k) · C(3k,k) · C(6k,3k)
where C(n,k) = n!/(k!·(n-k)!)

2. Chudnovsky Series Formula
1/π = 12 · Σ_{k=0..∞} (-1)^k · s1A(k) · (A·k + B) / (C^(k+1/2))

3. Numeric Constants
A = 545140134
B = 13591409
C = 640320^3 = 262537412640768000

4. Convergence Rate
Each term adds ~14 decimal digits; use N terms for ~14N digits of π.

## Supplementary Details
Required precision: set arbitrary-precision library precision >= desired_digits + 10 guard digits.
Cache factorials: factorials[0]=1; factorials[n]=n·factorials[n-1]
Use binary splitting:
binarySplit(a,b): if b-a==1 return P=(6a-5)(2a-1)(6a-1), Q=a^3·C, T=P·(A·a+B); else split mid=(a+b)//2; left=binarySplit(a,mid); right=binarySplit(mid,b); return P=left.P·right.P; Q=left.Q·right.Q; T=right.Q·left.T + left.P·right.T
Compute sumTerm = T/Q; π = 1/(12·sumTerm)


## Reference Details
// Full implementation in JS with Decimal.js

// Configure precision and rounding
Decimal.set({ precision: desiredDigits + 10, rounding: Decimal.ROUND_FLOOR });

// Compute π using Chudnovsky algorithm
function computePi(desiredDigits) {
  const D = new Decimal(desiredDigits + 10);
  const A = new Decimal(545140134);
  const B = new Decimal(13591409);
  const C = new Decimal(262537412640768000);

  function binarySplit(a, b) {
    if (b.minus(a).equals(1)) {
      const k = a;
      const P = new Decimal(6).mul(k).minus(5).mul(new Decimal(2).mul(k).minus(1)).mul(new Decimal(6).mul(k).minus(1));
      const Q = k.pow(3).mul(C);
      const T = P.mul(A.mul(k).plus(B));
      return { P, Q, T };
    }
    const m = a.plus(b).div(2).floor();
    const L = binarySplit(a, m);
    const R = binarySplit(m, b);
    return {
      P: L.P.mul(R.P),
      Q: L.Q.mul(R.Q),
      T: R.Q.mul(L.T).plus(L.P.mul(R.T))
    };
  }

  const terms = Math.ceil(desiredDigits / 14) + 1;
  const { T, Q } = binarySplit(new Decimal(0), new Decimal(terms));
  const sum = T.div(Q);
  const oneOverPi = sum.mul(12);
  return oneOverPi.pow(-1);
}

// Usage example
const pi = computePi(1000);
console.log(pi.toString());

// Troubleshooting:
// Error: Precision too low (last digits incorrect) => increase precision guard digits.
// Unexpected NaN => check factorial overflow, ensure Decimal.set precision is high enough.


## Information Dense Extract
s1A(k)=C(2k,k)C(3k,k)C(6k,3k); 1/π=12Σ_{k=0..∞}(-1)^k s1A(k)(545140134k+13591409)/(640320^(3k+3/2)); precision guard=+10; terms≈digits/14+1; use binary splitting: P,Q,T recurrence; π=1/(12·T/Q).

## Sanitised Extract
Table of Contents:
1. Sequence Definition
2. Chudnovsky Series Formula
3. Numeric Constants
4. Convergence Rate

1. Sequence Definition
s1A(k) = C(2k,k)  C(3k,k)  C(6k,3k)
where C(n,k) = n!/(k!(n-k)!)

2. Chudnovsky Series Formula
1/ = 12  _{k=0..} (-1)^k  s1A(k)  (Ak + B) / (C^(k+1/2))

3. Numeric Constants
A = 545140134
B = 13591409
C = 640320^3 = 262537412640768000

4. Convergence Rate
Each term adds ~14 decimal digits; use N terms for ~14N digits of .

## Original Source
High-Precision π Calculation Algorithms
https://en.wikipedia.org/wiki/Ramanujan–Sato_series

## Digest of HIGH_PRECISION_PI

# High-Precision π Calculation Algorithms
Date Retrieved: 2024-06-15
Source: Wikipedia Ramanujan–Sato series
Data Size: 22288164 bytes

## 1. Chudnovsky Formula (Level 1A)
**Series Definition**
1/π = 12 ∑_{k=0..∞} (-1)^k (6k)!·(545140134·k + 13591409) / ((3k)!·(k!)^3 · 640320^(3k+3/2))

**Sequence s1A(k)**
s1A(k) = C(2k,k)·C(3k,k)·C(6k,3k)

**Numeric Parameters**
A = 545140134
B = 13591409
C = 640320^3 = 262537412640768000

## 2. Auxiliary Sequences
**Binomial Definitions**
C(n,k) = n!/(k!·(n−k)!)

## 3. Convergence and Precision
Converges quadratically: each additional term adds ~14 digits.

## 4. Fundamental Unit Calculations
U_n definitions for higher-level formulas (not required for Chudnovsky).


## Attribution
- Source: High-Precision π Calculation Algorithms
- URL: https://en.wikipedia.org/wiki/Ramanujan–Sato_series
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-10T09:33:06.483Z
- Data Size: 22288164 bytes
- Links Found: 22533

## Retrieved
2025-05-10
