# Overview

Unify all π calculation algorithms under a single feature. Provide users with iterative methods (Leibniz series, Monte Carlo sampling) and high-precision methods (Chudnovsky, Gauss-Legendre, Ramanujan–Sato) through a consistent CLI and HTTP API interface.

# Implementation

1. Dependencies
   • Add decimal.js@^10.4.3 for high-precision algorithms.
   • No new dependencies for iterative methods beyond existing imports.

2. Precision Helper
   • In src/lib/main.js import Decimal and create withPrecision(digits, fn) to set precision ≈ digits×3.32+10.

3. Algorithm Functions
   • calculatePiLeibniz(digits): existing iterative series implementation.  
   • calculatePiMonteCarlo(samples): existing sampling implementation.  
   • calculatePiChudnovsky(digits): implement full Chudnovsky series until term < 10^(−digits).  
   • calculatePiGaussLegendre(digits): implement Gauss-Legendre loop until |a−b|<10^(−digits).  
   • calculatePiRamanujanSato(digits, options): implement Ramanujan–Sato series with level, maxIterations, errorTolerance.  
   • Expose calculatePi(digits, samples, algorithm, options) that dispatches to the appropriate function.

4. CLI Integration
   • Extend CLIOptionsSchema to accept method enum { leibniz, montecarlo, chudnovsky, gauss-legendre, ramanujan-sato } and options for high-precision flags.  
   • In main(), call calculatePi based on selected algorithm and parameters.  
   • Preserve diagnostics, benchmark, convergence-data, chart, and serve options.

5. HTTP API Integration
   • Extend ApiParamsSchema to accept new algorithm names and options.  
   • In /pi, /pi/data, /pi/chart handlers, branch on all supported algorithms and return JSON or PNG output.  

# Testing

• Unit tests for each calculatePiX function in tests/unit/main.test.js, verifying accuracy against known references.  
• CLI tests for invoking each algorithm via main() with and without diagnostics.  
• HTTP tests in tests/unit/server.test.js for GET /pi, /pi/data, /pi/chart with all algorithm values.

# Documentation

• Update docs/USAGE.md under Algorithms to list all five methods with their options and examples.  
• Update README.md under Features to describe unified π Algorithms feature and sample invocations for CLI and HTTP.