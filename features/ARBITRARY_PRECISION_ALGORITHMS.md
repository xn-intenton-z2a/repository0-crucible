# Overview

Replace the placeholder fallback Chudnovsky implementation with full high-precision algorithms powered by decimal.js. Users gain access to three true arbitrary-precision methods—Chudnovsky, Gauss-Legendre, and Ramanujan–Sato—via unified CLI and HTTP interfaces.

# Implementation

1. Dependency
   • Add decimal.js@^10.4.3 to package.json dependencies.

2. Precision Helper
   • In src/lib/main.js, import Decimal and create withPrecision(digits, fn) that clones Decimal with precision ≈ digits × 3.32 + 10.

3. Algorithm Functions
   • calculatePiChudnovsky(digits): implement series until term < 10^(−digits).
   • calculatePiGaussLegendre(digits): use iterative a,b,t,p loop until |a−b| < 10^(−digits).
   • calculatePiRamanujanSato(digits, options): support level, maxIterations, errorTolerance, accumulate series until |term| < errorTolerance or maxIterations.
   • Export calculatePiHighPrecision(digits, method, options) dispatching to the above.

4. Integrate into CLI and HTTP
   • Extend CLIOptionsSchema and ApiParamsSchema to accept method enum { chudnovsky, gauss-legendre, ramanujan-sato } plus level, maxIterations, errorTolerance flags.
   • In main(), invoke calculatePiHighPrecision when algorithm matches high-precision methods; print diagnostics or raw result.
   • In createApp handlers (/pi, /pi/data, /pi/chart), branch on high-precision algorithms: call calculatePiHighPrecision for /pi and generate empty dataPoints or disable chart for these methods (or optionally sample intermediate sums).

# Testing

1. Unit Tests (tests/unit/main.test.js)
   • Verify calculatePiChudnovsky(10).toFixed(10) matches known reference.
   • Verify calculatePiGaussLegendre(8) and calculatePiRamanujanSato(5) meet tolerance.
   • Mock and spy on Decimal.clone to ensure precision is set correctly.

2. CLI Tests
   • main(["--algorithm","chudnovsky","--digits","6"]); expect console.log output matches high-precision string.
   • Test level, maxIterations, errorTolerance flags produce consistent behavior.

3. HTTP Tests (tests/unit/server.test.js)
   • GET /pi?algorithm=gauss-legendre&digits=4 returns JSON { result: string } with correct precision.
   • GET /pi/data for chudnovsky and ramanujan endpoints returns empty or minimal structure without errors.

# Documentation

1. docs/USAGE.md
   • Under **Algorithms**, document new methods: chudnovsky, gauss-legendre, ramanujan-sato and their options.
   • Provide CLI and HTTP examples for each.

2. README.md
   • Update **Features** list: describe **Arbitrary-Precision Algorithms** with three methods and example commands.

3. package.json
   • Add decimal.js dependency.
