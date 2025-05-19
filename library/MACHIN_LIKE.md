# MACHIN_LIKE

## Crawl Summary
General form: c₀·π/4 = ∑ cₙ arctan(aₙ/bₙ) with c₀∈ℤ⁺, cₙ∈ℤ∖{0}, 0<aₙ<bₙ∈ℤ. arctan series: arctan(x)=∑(-1)ᵏx^(2k+1)/(2k+1). Angle addition: arctan(a₁/b₁)+arctan(a₂/b₂)=arctan((a₁b₂+a₂b₁)/(b₁b₂−a₁a₂)), valid if sum in (−π/2,π/2). Complex mapping: multiplication of b+ai adds arctan(a/b) angles. Lehmer measure λ=∑1/log₁₀(bₙ/aₙ); lower λ yields faster convergence. Known formulas: Euler, Hermann, Hutton, Machin. Construction: factor bₙ²+1, apply LLL to derive cₙ. Used in high-precision π computations.

## Normalised Extract
Table of Contents:
1  Formula Definition
2  Arctan Series Expansion
3  Angle Addition Identity
4  Complex Number Mapping
5  Lehmer Measure Calculation
6  Known Two-Term Formulas
7  Multi-Term Record Formulas
8  Construction via LLL
9  Implementation Pattern

1  Formula Definition
 c₀·π/4 = ∑ₙ₌₁ᴺ cₙ·arctan(aₙ/bₙ)
 c₀ ∈ ℤ⁺; cₙ ∈ ℤ∖{0}; aₙ,bₙ ∈ ℤ⁺; aₙ < bₙ

2  Arctan Series Expansion
 arctan(x) = ∑ₖ₌₀ᵀ (-1)ᵏ·x^(2k+1)/(2k+1)
 Terms needed Tₙ = ceil((precision·log(10))/log(bₙ/aₙ))

3  Angle Addition Identity
 arctan(a₁/b₁)+arctan(a₂/b₂)
 = arctan((a₁b₂+a₂b₁)/(b₁b₂−a₁a₂))
 Domain: result ∈ (−π/2,π/2)

4  Complex Number Mapping
 For each term (bₙ + aₙ·i)^{cₙ}, argument = cₙ·arctan(aₙ/bₙ)
 Multiply complex factors to sum angles

5  Lehmer Measure Calculation
 λ = ∑ₙ₌₁ᴺ 1/log₁₀(bₙ/aₙ)
 Optimize: minimize N and maximize bₙ/aₙ

6  Known Two-Term Formulas
 Euler: {c₀=1,N=2; c={1,1}; a={1,1}; b={2,3}}
 Hermann: {c₀=1,N=2; c={2,−1}; a={1,1}; b={2,7}}
 Hutton: {c₀=1,N=2; c={2,1}; a={1,1}; b={3,7}}
 Machin: {c₀=1,N=2; c={4,−1}; a={1,1}; b={5,239}}

7  Multi-Term Record Formulas
 Kanada 2002: N=4; c={12,32,−5,12}; a={1,1,1,1}; b={49,57,239,110443}
 Størmer 1896: N=4; c={44,7,−12,24}; a={1,1,1,1}; b={57,239,682,12943}

8  Construction via LLL
 Input: vector of exponent vectors of primes dividing bₙ²+1
 Solve for integer combination cₙ s.t. ∑ cₙ·(ln(bₙ + i)/i) = constant·π/4

9  Implementation Pattern
 Steps:
 1  Select formula coefficients {cₙ,aₙ,bₙ,c₀}
 2  Determine Tₙ per term
 3  Compute each arctan(aₙ/bₙ) via series to Tₙ
 4  Multiply each by cₙ and sum
 5  Multiply result by 4/c₀ and output π


## Supplementary Details
Parameter Selection:
 aₙ = 1 common; choose bₙ such that bₙ/aₙ large to lower λ
 Tₙ = ceil((digits·log(10))/log(bₙ/aₙ)) terms
 Use high-precision library (Decimal.js, Python decimal) set precision = digits + guard digits

Construction Steps:
 1  Pre-factor bₙ²+1; ensure prime factors ≤ m for set size m
 2  Build integer matrix of exponents for each bₙ
 3  Apply LLL to find minimal cₙ coefficients
 4  Verify ∑ cₙ·arctan(aₙ/bₙ) = c₀·π/4

Precision Handling:
 Use binary splitting to evaluate series faster: group k to k+M blocks, apply recurrence

Performance:
 Terms count ~ O(digits / log(bₙ)) per term, overall O(N·digits)
 Memory: O(digits)

Library Configuration:
 Node.js: install decimal.js; set Decimal.set({ precision: digits+10, rounding: 4 });
 Python: from decimal import Decimal, getcontext; getcontext().prec = digits+10


## Reference Details
JavaScript Reference Implementation:

// Signature
// computePiMachin(formula: {c0:number, c:number[], a:number[], b:number[]}, digits:number): string

const Decimal = require('decimal.js');
function arctan(x, terms) {
  let sum = new Decimal(0);
  let xpow = new Decimal(x);
  for (let k = 0; k < terms; k++) {
    const term = xpow.dividedBy(2*k+1).times(k % 2 === 0 ? 1 : -1);
    sum = sum.plus(term);
    xpow = xpow.times(x).times(x);
  }
  return sum;
}

function computePiMachin(formula, digits) {
  Decimal.set({ precision: digits + 10, rounding: Decimal.ROUND_FLOOR });
  const { c0, c, a, b } = formula;
  let total = new Decimal(0);
  for (let i = 0; i < c.length; i++) {
    const terms = Math.ceil(digits * Math.LOG10E / Math.log10(b[i]/a[i]));
    const x = new Decimal(a[i]).dividedBy(b[i]);
    const ar = arctan(x, terms);
    total = total.plus(ar.times(c[i]));
  }
  return total.times(4).dividedBy(c0).toString();
}

// Usage Example
const machinFormula = { c0:1, c:[4,-1], a:[1,1], b:[5,239] };
console.log(computePiMachin(machinFormula, 1000));

// Configuration Options:
// precision: number of decimal digits (default: 1000)
// formula: predefined formula object or custom
// rounding: Decimal.js rounding mode

Best Practices:
• Use binary splitting for arctan series when digits > 10000
• Add guard digits = 10% of requested digits to avoid rounding errors
• Cross-check with two independent formulas sharing some b values

Troubleshooting:
$ node compute_pi.js --precision 5000
Expected output length: ≥5001 characters (including "3.")
If output shorter, increase guard digits or terms formula
Error: DivisionByZero: check b[i] ≠ 0
Error: InvalidPrecision: set Decimal.prec correctly


## Information Dense Extract
c₀·π/4=∑cₙ·arctan(aₙ/bₙ); arctan(x)=∑(-1)ᵏ x^(2k+1)/(2k+1); addition: arctan(a₁/b₁)+arctan(a₂/b₂)=arctan((a₁b₂+a₂b₁)/(b₁b₂−a₁a₂)); λ=∑1/log₁₀(bₙ/aₙ); two-term: {1,1,2,3},{2,−1,2,7},{2,1,3,7},{4,−1,5,239}; multi-term records: Kanada N=4 {12,32,−5,12}/{49,57,239,110443}; Størmer N=4 {44,7,−12,24}/{57,239,682,12943}; Tₙ=ceil(d·log(10)/log(bₙ/aₙ)); implement arctan via binary splitting; computePiMachin(formula,digits) uses Decimal.set precision, computes per-term arctan, sums cₙ·arctan, multiplies 4/c₀; config: precision, rounding, formula; troubleshoot by verifying length, guard digits, independent formula check.

## Sanitised Extract
Table of Contents:
1  Formula Definition
2  Arctan Series Expansion
3  Angle Addition Identity
4  Complex Number Mapping
5  Lehmer Measure Calculation
6  Known Two-Term Formulas
7  Multi-Term Record Formulas
8  Construction via LLL
9  Implementation Pattern

1  Formula Definition
 c/4 =  carctan(a/b)
 c  ; c  {0}; a,b  ; a < b

2  Arctan Series Expansion
 arctan(x) =  (-1)x^(2k+1)/(2k+1)
 Terms needed T = ceil((precisionlog(10))/log(b/a))

3  Angle Addition Identity
 arctan(a/b)+arctan(a/b)
 = arctan((ab+ab)/(bbaa))
 Domain: result  (/2,/2)

4  Complex Number Mapping
 For each term (b + ai)^{c}, argument = carctan(a/b)
 Multiply complex factors to sum angles

5  Lehmer Measure Calculation
  =  1/log(b/a)
 Optimize: minimize N and maximize b/a

6  Known Two-Term Formulas
 Euler: {c=1,N=2; c={1,1}; a={1,1}; b={2,3}}
 Hermann: {c=1,N=2; c={2,1}; a={1,1}; b={2,7}}
 Hutton: {c=1,N=2; c={2,1}; a={1,1}; b={3,7}}
 Machin: {c=1,N=2; c={4,1}; a={1,1}; b={5,239}}

7  Multi-Term Record Formulas
 Kanada 2002: N=4; c={12,32,5,12}; a={1,1,1,1}; b={49,57,239,110443}
 Strmer 1896: N=4; c={44,7,12,24}; a={1,1,1,1}; b={57,239,682,12943}

8  Construction via LLL
 Input: vector of exponent vectors of primes dividing b+1
 Solve for integer combination c s.t.  c(ln(b + i)/i) = constant/4

9  Implementation Pattern
 Steps:
 1  Select formula coefficients {c,a,b,c}
 2  Determine T per term
 3  Compute each arctan(a/b) via series to T
 4  Multiply each by c and sum
 5  Multiply result by 4/c and output

## Original Source
Machin-like Formulas – Wikipedia
https://en.wikipedia.org/wiki/Machin-like_formula

## Digest of MACHIN_LIKE

# Machin-like Formulas

## General Form
c₀ · π/4 = ∑ₙ₌₁ᴺ cₙ · arctan(aₙ/bₙ)

• c₀: positive integer
• cₙ: nonzero signed integer
• aₙ, bₙ: positive integers, aₙ < bₙ

## Arctan Taylor Series
arctan(x) = ∑ₖ₌₀^∞ (-1)ᵏ x^(2k+1)/(2k+1)

Convergence error after T terms: ≤ x^(2T+3)/(2T+3)

## Angle Addition Identity
arctan(a₁/b₁) + arctan(a₂/b₂) = arctan((a₁b₂ + a₂b₁)/(b₁b₂ – a₁a₂))
Valid if sum ∈ (–π/2, +π/2)

## Complex Number Interpretation
Angle of (b + a·i) = arctan(a/b)
Multiplying (b₁ + a₁·i)(b₂ + a₂·i) adds angles

## Lehmer Measure
λ = ∑ₙ₌₁ᴺ 1/log₁₀(bₙ/aₙ)
Minimize λ by maximizing bₙ/aₙ and minimizing N

## Known Two-Term Formulas
Euler (1737): π/4 = arctan(1/2) + arctan(1/3)
Hermann (1706): π/4 = 2·arctan(1/2) – arctan(1/7)
Hutton  (1706): π/4 = 2·arctan(1/3) + arctan(1/7)
Machin  (1706): π/4 = 4·arctan(1/5) – arctan(1/239)

## General Construction
Choose bₙ such that all prime factors of bₙ²+1 come from a small set ≤ m; use LLL or linear algebra to find integer cₙ

## Retrieval & Attribution
Source: Machin-like formula – Wikipedia (CC BY-SA 3.0)
Retrieved: 2024-07-01
Data Size: 9857772 bytes


## Attribution
- Source: Machin-like Formulas – Wikipedia
- URL: https://en.wikipedia.org/wiki/Machin-like_formula
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-19T06:29:24.312Z
- Data Size: 9857772 bytes
- Links Found: 23732

## Retrieved
2025-05-19
