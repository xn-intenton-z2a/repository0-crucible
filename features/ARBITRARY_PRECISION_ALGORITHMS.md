# Overview
Enable a unified arbitrary-precision algorithms feature leveraging Decimal.js to calculate π using the Chudnovsky, Gauss-Legendre, or Ramanujan–Sato methods under one cohesive interface for high-precision needs.

# Implementation

1. Add/ensure dependency:
   • decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal and set global precision guard:
      import Decimal from 'decimal.js';
      Decimal.set({ precision: digits * 3 + 10 });  
   b. Implement a dispatcher calculatePiHighPrecision(digits, method, options):
      - method: enum("chudnovsky", "gauss-legendre", "ramanujan-sato").
      - options: { level?, maxIterations?, errorTolerance? } for ramanujan-sato.
   c. Internally invoke one of three helper functions:
      i. calculateChudnovsky(digits): standard series with guard digits and caching factorial computations.
      ii. calculateGaussLegendre(digits): iterative a,b,t,p sequence until |a−b|<10^(−digits).
      iii. calculateRamanujanSato(digits, level, maxIterations, errorTolerance): series accumulation until term < tolerance.
   d. Expose calculatePiHighPrecision in exports and extend CLIOptionsSchema and ApiParamsSchema enums to include the three method names.
   e. In CLI main() and createApp() HTTP handlers, detect any of the three methods via algorithm parameter and call calculatePiHighPrecision accordingly for /pi, /pi/data, /pi/chart, and streaming modes.

# Testing

1. Unit tests for each algorithm path:
   • validate calculatePiHighPrecision(10, "chudnovsky").toFixed(10) matches known reference.
   • validate calculatePiHighPrecision(8, "gauss-legendre").length is digits+2.
   • validate calculatePiHighPrecision(5, "ramanujan-sato", { level:1 }).length is 7 and terminates within default iterations.
2. CLI tests:
   • main(["--algorithm","chudnovsky","--digits","5"]) logs correct string.
   • main(["--algorithm","gauss-legendre","--digits","6"]) and set level for ramanujan-sato.
3. HTTP tests:
   • GET /pi?algorithm=ramanujan-sato&digits=4 returns JSON { result: string }.
   • GET /pi/data?algorithm=gauss-legendre returns array of data points.
   • GET /pi/chart?algorithm=chudnovsky returns valid PNG.

# Documentation

1. Update docs/USAGE.md under **Algorithms**:
   - Describe unified high-precision feature and list supported methods.
   - Show example usage for each method.
2. Update README.md Features list:
   - Replace separate entries with **Arbitrary-Precision Algorithms** feature summary and example CLI/HTTP calls.
