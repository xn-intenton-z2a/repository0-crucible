# GAUSS_LEGENDRE

## Crawl Summary
Initial values a0=1, b0=1/√2, t0=1/4, p0=1. Iterate: a=(a+b)/2, b=√(a·b), t=t−p·(a_new−a)², p=2p. Stop when |a−b|<tol. Compute π ≈(a+b)²/(4t). Quadratic convergence doubles correct digits each iteration.

## Normalised Extract
Table of Contents:
 1. Initial Setup
 2. Iteration Loop
 3. Convergence Criterion
 4. π Approximation
 5. Precision Management

1. Initial Setup
  a0 = 1
  b0 = 1/√2
  t0 = 1/4
  p0 = 1

2. Iteration Loop
  For n from 0 to maxIterations:
    a_next = (a + b) / 2
    b_next = sqrt(a * b)
    delta = a_next − a
    t = t − p * delta * delta
    p = 2 * p
    a = a_next
    b = b_next
    If abs(a − b) < tolerance, break.

3. Convergence Criterion
  tolerance = 10^(−digits) or user-specified; iteration count ≤ 25 for ~45M digits.

4. π Approximation
  π = (a + b)² / (4 * t)

5. Precision Management
  Use arbitrary-precision library; set precisionBits ≥ targetDigits × 3.32; round after each operation.


## Supplementary Details
Parameter values:
  tolerance: default = 1e-20
  maxIterations: default = 50
  precisionBits: default = digits*3.5

Implementation steps:
  1. Initialize precision in Decimal or BigDecimal.
  2. Set a,b,p,t in high precision.
  3. Loop applying iteration formulas.
  4. After break, compute pi.

Data types:
  a,b,t,p: Decimal or BigFloat
  sqrt: library-provided high-precision method

Performance tips:
  Cache sqrt(a*b) calls.
  Preallocate objects to avoid GC.
  Increase working precision by +10 bits during iterations.


## Reference Details
JavaScript implementation using decimal.js:

Function signature:
  /**
   * computePiGaussLegendre
   * @param {Object} options
   * @param {number} options.digits target decimal digits
   * @param {number} [options.maxIterations=50]
   * @param {number} [options.tolerance=1e-20]
   * @returns {Decimal} π approximation
   */
  function computePiGaussLegendre({ digits, maxIterations = 50, tolerance = 1e-20 })

Code example:
  import Decimal from 'decimal.js'
  Decimal.set({ precision: digits * 3.5, rounding: Decimal.ROUND_HALF_UP })

  let a = new Decimal(1)
  let b = Decimal.sqrt(new Decimal(0.5))
  let t = new Decimal(0.25)
  let p = new Decimal(1)

  for (let i = 0; i < maxIterations; i++) {
    const a_next = a.plus(b).dividedBy(2)
    const b_next = Decimal.sqrt(a.times(b))
    const delta = a_next.minus(a)
    t = t.minus(p.times(delta.times(delta)))
    p = p.times(2)
    a = a_next
    b = b_next
    if (a.minus(b).abs().lt(tolerance)) break
  }

  return a.plus(b).pow(2).dividedBy(t.times(4))

Configuration options:
  digits: number of decimal places
  maxIterations: upper bound iterations
  tolerance: stopping threshold

Best practices:
  - Use library with configurable precision
  - Increase precision before loop start
  - Reuse Decimal instances via variables
  - Validate inputs: digits > 0, tolerance > 0

Troubleshooting:
  Issue: result stagnates or yields NaN
    Command: console.log(a, b, t, p)
    Expected: a≈b after final iteration, t>0
    Fix: Increase precisionBits via Decimal.set
  Issue: performance slow
    Command: measure loop time with console.time
    Fix: lower maxIterations, preallocate variables, use faster sqrt


## Information Dense Extract
a0=1; b0=1/√2; t0=1/4; p0=1; iterate: a=(a+b)/2; b=√(a·b); t=t−p·(a_new−a)^2; p=2p; stop when |a−b|<tol; π=(a+b)^2/(4t); quadratic convergence doubles digits; precisionBits≥digits×3.32; default maxIterations=50; tolerance=1e-20; implement in decimal.js with Decimal.set({precision,digits}); reuse variables; troubleshoot by inspecting intermediate a,b,t,p; adjust precision on NaN or slow convergence.

## Sanitised Extract
Table of Contents:
 1. Initial Setup
 2. Iteration Loop
 3. Convergence Criterion
 4.  Approximation
 5. Precision Management

1. Initial Setup
  a0 = 1
  b0 = 1/2
  t0 = 1/4
  p0 = 1

2. Iteration Loop
  For n from 0 to maxIterations:
    a_next = (a + b) / 2
    b_next = sqrt(a * b)
    delta = a_next  a
    t = t  p * delta * delta
    p = 2 * p
    a = a_next
    b = b_next
    If abs(a  b) < tolerance, break.

3. Convergence Criterion
  tolerance = 10^(digits) or user-specified; iteration count  25 for ~45M digits.

4.  Approximation
   = (a + b) / (4 * t)

5. Precision Management
  Use arbitrary-precision library; set precisionBits  targetDigits  3.32; round after each operation.

## Original Source
BigInt & π Algorithms Reference
https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm

## Digest of GAUSS_LEGENDRE

# Gauss–Legendre Algorithm

Date retrieved: 2024-06-25

## Initial Values

  a₀ = 1
  b₀ = 1/√2
  t₀ = 1/4
  p₀ = 1

## Iteration Formulas

  aₙ₊₁ = (aₙ + bₙ) / 2
  bₙ₊₁ = √(aₙ · bₙ)
  tₙ₊₁ = tₙ − pₙ · (aₙ₊₁ − aₙ)²
  pₙ₊₁ = 2 · pₙ

Repeat until |aₙ₊₁ − bₙ₊₁| < tolerance or maxIterations reached.

## π Approximation

  π ≈ (aₙ₊₁ + bₙ₊₁)² / (4 · tₙ₊₁)

## Convergence

  Quadratic: correct digits double each iteration.

## Memory & Precision

  Requires arbitrary-precision arithmetic; intermediate √ and multiplications at precisionBits+10 bits.


## Attribution
- Source: BigInt & π Algorithms Reference
- URL: https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
- License: CC BY-SA 4.0
- Crawl Date: 2025-05-12T15:28:29.542Z
- Data Size: 4978184 bytes
- Links Found: 25981

## Retrieved
2025-05-12
