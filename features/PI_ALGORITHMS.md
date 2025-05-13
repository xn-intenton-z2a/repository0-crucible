# Overview

Implement full high-precision π calculation methods using decimal.js, replacing fallback implementations and exposing Chudnovsky, Gauss-Legendre, and Ramanujan–Sato algorithms for CLI and HTTP API. Users gain accurate and efficient π approximations at arbitrary digit lengths beyond simple series.

# Dependencies

• Add decimal.js@^10.4.3 to package.json dependencies.

# Implementation

1. Precision Setup
   • Import { Decimal } from 'decimal.js'.
   • Compute bits = Math.ceil(digits * 3.32) + 10 and call Decimal.set({ precision: bits }).

2. Algorithm Functions in src/lib/main.js
   • calculatePiChudnovsky(digits): implement Chudnovsky series using Decimal until term < 10^(-digits). Use factorial and power via Decimal methods.
   • calculatePiGaussLegendre(digits): implement Gauss-Legendre iteration with a₀=1, b₀=1/√2, t₀=1/4, p₀=1. Iterate until |a−b| < 10^(-digits), then π = (a+b)²/(4t).
   • calculatePiRamanujanSato(digits, options): implement Sato series using BigInt and Decimal, support level, maxIterations, and errorTolerance from options. Terminate when |term| < errorTolerance.
   • Refactor calculatePi dispatcher to call these functions based on algorithm name.

3. CLI Integration
   • Extend CLIOptionsSchema enum to include "gauss-legendre" and "ramanujan-sato".
   • Add flags --level <number>, --max-iterations <number>, --error-tolerance <number>.
   • In main(), parse new flags and dispatch to respective functions, preserving diagnostics and benchmark modes.

4. HTTP API Integration
   • Extend ApiParamsSchema enum and preprocessors to accept new algorithm names and parameters level, maxIterations, and errorTolerance.
   • In /pi, /pi/data, /pi/chart handlers, branch on new algorithms and pass parsed options to the algorithm functions.

# Testing

1. Unit Tests in tests/unit/main.test.js
   • Add tests for calculatePiChudnovsky to verify accuracy against Math.PI to within 10^(-digits) for small digit values.
   • Test calculatePiGaussLegendre convergence for known digits with error threshold.
   • Test calculatePiRamanujanSato at level 1 and 2 for small digits and verify iterations do not exceed maxIterations.
   • Verify calculatePi dispatcher selects correct function and applies options.

2. HTTP Tests in tests/unit/server.test.js
   • Send GET /pi?algorithm=gauss-legendre&digits=5 and assert JSON result and diagnostics if requested.
   • Test GET /pi?algorithm=ramanujan-sato&digits=3&level=1 and verify response structure.
   • Ensure /pi/data and /pi/chart produce correct data points and chart image.

# Documentation

1. docs/USAGE.md
   • Document new algorithms in **Algorithms** section with flags --algorithm, --level, --max-iterations, --error-tolerance.
   • Provide CLI examples and HTTP query examples for each algorithm.

2. README.md
   • Under **Features**, update π Calculation entry to list all supported methods: Leibniz, Monte Carlo, Chudnovsky, Gauss-Legendre, Ramanujan–Sato, including sample commands.