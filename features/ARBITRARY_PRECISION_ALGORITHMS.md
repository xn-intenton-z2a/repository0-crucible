# Overview

Enable true arbitrary-precision π calculation using Decimal.js by fully implementing three high-precision algorithms: Chudnovsky, Gauss-Legendre, and Ramanujan–Sato under a unified interface.

# Implementation

1. Ensure dependency:
   • decimal.js@^10.4.3

2. In src/lib/main.js before existing algorithm functions:
   a. Import Decimal:
      import Decimal from 'decimal.js';
   b. Create a precision helper:
      function withPrecision(digits, fn) {
        const precision = digits * 3.32 + 10;
        const DecimalClone = Decimal.clone({ precision: Math.ceil(precision) });
        return fn(DecimalClone);
      }

3. Implement algorithm functions:
   a. calculateChudnovsky(digits):
      • Use withPrecision to set Decimal precision.
      • Compute π via the Chudnovsky series with iterative term accumulation until term < 10^(−digits).
      • Use factorial caching via Decimal for performance.

   b. calculateGaussLegendre(digits):
      • Use withPrecision to set Decimal precision.
      • Initialize a=1, b=1/√2, t=1/4, p=1.
      • Iterate a=(a+b)/2, b=√(a·b), t=t−p·(a_new−a)^2, p=2p until |a−b| < 10^(−digits).
      • Return π=(a+b)^2/(4t).

   c. calculateRamanujanSato(digits, options):
      • Use withPrecision to set Decimal precision.
      • Default options: { level: 1, maxIterations: 10, errorTolerance: 10^(−digits) }.
      • Implement series per library docs, accumulate terms until |term| < errorTolerance or iterations reach maxIterations.
      • Return the last π estimate.

4. Dispatcher and export:
   • Define calculatePiHighPrecision(digits, method, options) that selects one of the three methods based on method enum.
   • Extend existing CLIOptionsSchema and ApiParamsSchema to include algorithm enum values: chudnovsky, gauss-legendre, ramanujan-sato.
   • In CLI main() and createApp() handlers for /pi, /pi/data, /pi/chart, detect these algorithm strings and call calculatePiHighPrecision accordingly.

# Testing

1. Unit tests in tests/unit/main.test.js:
   • verify calculateChudnovsky(10).toFixed(10) matches a known reference.
   • verify calculateGaussLegendre(8).toFixed(8) matches expected.
   • verify calculateRamanujanSato(5, { level: 1 }).toFixed(5) matches expected within tolerance.

2. CLI tests:
   • main(["--algorithm","chudnovsky","--digits","5"]) logs correct string.
   • main(["--algorithm","gauss-legendre","--digits","6"]) works properly.
   • main(["--algorithm","ramanujan-sato","--digits","4","--level","2"]) finishes within maxIterations.

3. HTTP tests in tests/unit/server.test.js:
   • GET /pi?algorithm=chudnovsky&digits=4 returns JSON { result: string }.
   • GET /pi/data?algorithm=ramanujan-sato&digits=3 returns array of data points.
   • GET /pi/chart?algorithm=gauss-legendre&digits=3 returns valid PNG with correct header.

# Documentation

1. Update docs/USAGE.md under **Algorithms**:
   • Document parameters for high-precision: methods, level, maxIterations, errorTolerance.
   • Provide example usage for each method in CLI and HTTP.

2. Update README.md Features list:
   • Replace existing entry with **Arbitrary-Precision Algorithms** summary.
   • Show example CLI calls and HTTP endpoints for new algorithm options.