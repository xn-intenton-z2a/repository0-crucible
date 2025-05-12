# GAUSS_LEGENDRE

## Crawl Summary
Initialise a=1, b=1/√2, t=1/4, p=1. Iterate: a→(a+b)/2, b→√(a·b), t→t−p·(a−new_a)^2, p→2·p. Repeat until |a−b|<ε or N iterations. Compute π≈(a+b)^2/(4t). Quadratic convergence, digits double per iteration.

## Normalised Extract
Table of Contents

1. Initialisation Values
2. Iteration Formulas
3. Convergence Criterion
4. Pi Approximation

1. Initialisation Values
   a0 = 1
   b0 = 1/√2
   t0 = 1/4
   p0 = 1

2. Iteration Formulas
   a_{n+1} = (a_n + b_n) / 2
   b_{n+1} = √(a_n * b_n)
   t_{n+1} = t_n − p_n * (a_n − a_{n+1})^2
   p_{n+1} = 2 * p_n

3. Convergence Criterion
   Evaluate |a_{n+1} − b_{n+1}| < ε
   ε default = 10^(−precision)
   Fallback: n ≥ maxIterations

4. Pi Approximation
   π ≈ (a_{n+1} + b_{n+1})^2 / (4 * t_{n+1})

## Supplementary Details
Parameter Defaults
- precision: number of decimal places, default 1000
- maxIterations: default 10
- epsilon: 1e−precision

Implementation Steps
1. Set library precision to config.precision
2. Initialise a, b, t, p
3. Loop i in [0, maxIterations):
   a. nextA = (a + b) / 2
   b. nextB = sqrt(a * b)
   c. t = t − p * (a − nextA)^2
   d. p = 2 * p
   e. a = nextA, b = nextB
   f. Break if |a − b| < ε
4. Compute pi = (a + b)^2 / (4 * t)
5. Return pi

Precision Management
- Use arbitrary-precision library (Decimal.js or BigInt rational arithmetic)
- Set rounding mode to ROUND_HALF_EVEN

Memory Considerations
- Store only four variables per iteration
- Release previous iteration values by reassigning

Error Bounds
- After n iterations, correct digits ≈ 2^n
- Choose n ≈ log2(desired digits)


## Reference Details
Full API Signature

type GLConfig = {
  precision: number;    // target decimal places
  maxIterations: number;// maximum iteration count
  epsilon: Decimal;     // convergence threshold
};

function computePi(config: GLConfig): Decimal

Parameters:
- config.precision: integer > 0, sets Decimal precision, default=1000
- config.maxIterations: integer ≥1, default=log2(desiredDigits)
- config.epsilon: Decimal, default=Decimal('1e-'+precision)

Return Type:
- Decimal: approximation of π to config.precision digits

Throws:
- Error if precision not integer or maxIterations <1

Usage Example
```ts
import Decimal from 'decimal.js';

const config: GLConfig = {
  precision: 2000,
  maxIterations: 12,
  epsilon: new Decimal('1e-2000')
};
const piApprox = computePi(config);
console.log(piApprox.toString());
```

Configuration Options
- precision: controls Decimal.js precision
- maxIterations: safety cap to avoid infinite loop
- epsilon: convergence threshold for |a−b|

Implementation Pattern
1. Set Decimal.set({ precision, rounding: Decimal.ROUND_HALF_EVEN })
2. Initialise a, b, t, p
3. Perform iterative update
4. On convergence or maxIterations, compute π

Best Practices
- Pre-calculate maxIterations = ceil(log2(targetDigits))
- Use memory pooling for Decimal objects to reduce GC pressure
- Validate inputs: ensure epsilon < 1

Troubleshooting
Command:
  node computePi.js --precision=10000 --maxIterations=14
Expected Output Start:
  3.1415926535...
Common Issues:
- "Decimal Error: Too few precision" → increase precision before math operations
- Slow execution → lower precision or reduce iterations
- High memory usage → switch to streaming big-int arithmetic

## Information Dense Extract
a0=1,b0=1/√2,t0=1/4,p0=1; iterate a=(a+b)/2,b=√(a·b),t=t−p·(a−a_next)^2,p=2p; stop when |a−b|<ε or n=maxIterations; π=(a+b)^2/(4t); digits double per iteration; choose n≈log2(digits); use Decimal.js set precision and rounding; GLConfig{precision,maxIterations,epsilon}; computePi returns Decimal π; validate inputs; set ε=10^(−precision); best practice: memory reuse; troubleshoot: increase precision on error, adjust iterations.

## Sanitised Extract
Table of Contents

1. Initialisation Values
2. Iteration Formulas
3. Convergence Criterion
4. Pi Approximation

1. Initialisation Values
   a0 = 1
   b0 = 1/2
   t0 = 1/4
   p0 = 1

2. Iteration Formulas
   a_{n+1} = (a_n + b_n) / 2
   b_{n+1} = (a_n * b_n)
   t_{n+1} = t_n  p_n * (a_n  a_{n+1})^2
   p_{n+1} = 2 * p_n

3. Convergence Criterion
   Evaluate |a_{n+1}  b_{n+1}| < 
    default = 10^(precision)
   Fallback: n  maxIterations

4. Pi Approximation
     (a_{n+1} + b_{n+1})^2 / (4 * t_{n+1})

## Original Source
BigInt & π Algorithms Reference
https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm

## Digest of GAUSS_LEGENDRE

# Gauss–Legendre Algorithm Details

## Initial Values
- a0 = 1
- b0 = 1/√2
- t0 = 1/4
- p0 = 1

## Iteration Formulas
- a_{n+1} = (a_n + b_n) / 2
- b_{n+1} = √(a_n * b_n)
- t_{n+1} = t_n − p_n * (a_n − a_{n+1})^2
- p_{n+1} = 2 * p_n

## Convergence Criterion
- Stop when |a_{n+1} − b_{n+1}| < ε or after N iterations

## Pi Approximation
π ≈ (a_{n+1} + b_{n+1})^2 / (4 * t_{n+1})

## Complexity
- Quadratic convergence: digits double each iteration.
- Memory intensive: intermediate precision storage.

# Reference Implementation (TypeScript)
```ts
import Decimal from 'decimal.js';

interface GLConfig {
  precision: number;        // decimal places
  maxIterations: number;    // fallback limit
  epsilon: Decimal;         // convergence threshold
}

function computePi(config: GLConfig): Decimal {
  Decimal.set({ precision: config.precision });

  let a = new Decimal(1);
  let b = Decimal.sqrt(new Decimal(1).dividedBy(2));
  let t = new Decimal(0.25);
  let p = new Decimal(1);

  for (let i = 0; i < config.maxIterations; i++) {
    const nextA = a.plus(b).dividedBy(2);
    const nextB = Decimal.sqrt(a.times(b));
    const diff = a.minus(nextA).pow(2).times(p);
    const nextT = t.minus(diff);
    const nextP = p.times(2);

    a = nextA;
    b = nextB;
    t = nextT;
    p = nextP;

    if (a.minus(b).abs().lessThan(config.epsilon)) break;
  }

  return a.plus(b).pow(2).dividedBy(t.times(4));
}

// Usage example
const pi = computePi({ precision: 1000, maxIterations: 10, epsilon: new Decimal('1e-1000') });
console.log(pi.toString());
```

## Attribution
- Source: BigInt & π Algorithms Reference
- URL: https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
- License: CC BY-SA 4.0
- Crawl Date: 2025-05-12T09:28:15.829Z
- Data Size: 4197174 bytes
- Links Found: 20455

## Retrieved
2025-05-12
