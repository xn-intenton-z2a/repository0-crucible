# Overview

Enhance the unified π Algorithms feature by implementing full high-precision methods using decimal.js and exposing new algorithm options for both CLI and HTTP API. Users gain access to Chudnovsky, Gauss-Legendre, and Ramanujan–Sato algorithms for accurate and efficient π calculations.

# Implementation

1. Dependencies
   • Add decimal.js@^10.4.3 to package.json dependencies.

2. Precision Helper
   • Import Decimal from 'decimal.js'
   • Configure precision: compute bits = Math.ceil(digits * 3.32) + 10 and call Decimal.set({ precision: bits })

3. Algorithm Functions
   • calculatePiChudnovsky(digits): implement full Chudnovsky series using Decimal until term < 10^(-digits).
   • calculatePiGaussLegendre(digits): implement the Gauss-Legendre iterative algorithm, stopping when |a − b| < 10^(−digits).
   • calculatePiRamanujanSato(digits, options): implement Ramanujan–Sato series using BigInt and Decimal, supporting level, maxIterations, and errorTolerance parameters.
   • Refactor calculatePi(digits, samples, algorithm, options) to dispatch to all supported methods by name.

4. CLI Integration
   • Extend algorithm enum in CLIOptionsSchema to include chudnovsky, gauss-legendre, ramanujan-sato.
   • In main(), parse additional flags: --level, --max-iterations, --error-tolerance.
   • Dispatch to new functions and preserve diagnostics, benchmark, convergence-data, and chart outputs.

5. HTTP API Integration
   • Update ApiParamsSchema to accept new algorithm values and corresponding parameters.
   • In /pi, /pi/data, /pi/chart handlers, branch on gauss-legendre and ramanujan-sato, parsing query params for level, maxIterations, and errorTolerance.

# Testing

1. Unit Tests
   • Add tests in tests/unit/main.test.js for each new function, verifying accuracy against Math.PI to within tolerance for small digits.
   • Test calculatePi dispatcher selects the correct algorithm and applies options.

2. CLI and HTTP Tests
   • Extend CLI diagnostics and benchmark tests to include the new algorithm names and options.
   • Add server tests in tests/unit/server.test.js for GET /pi?algorithm=gauss-legendre and /pi?algorithm=ramanujan-sato and verify JSON response structure and values.

# Documentation

1. docs/USAGE.md
   • Document new algorithm options (--algorithm gauss-legendre, ramanujan-sato and flags --level, --max-iterations, --error-tolerance) with CLI and HTTP examples.

2. README.md
   • Under Features, update π Calculation section to list all supported methods including Chudnovsky, Gauss-Legendre, and Ramanujan–Sato with sample invocations.
