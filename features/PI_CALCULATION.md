# Overview
Extend the CLI tool to calculate π to a specified number of digits using configurable algorithms and report basic performance metrics.

# CLI Usage
Add a new calculate command or integrate into existing CLI entrypoint with two required flags:

--digits: positive integer specifying how many digits after the decimal point to compute
--algorithm: one of chudnovsky, bbp, gauss-legendre, leibniz specifying which algorithm to use

Provide clear help text and validation errors for missing or invalid values.

# Algorithms
- chudnovsky: optimized series for rapid high-precision results
- bbp: binary digit extraction for arbitrary starting positions
- gauss-legendre: iterative algorithm to demonstrate convergence
- leibniz: simple alternating series for educational purposes

# Output
- Default mode: print computed π digits to standard output
- Append execution time and peak memory usage summary to stdout for quick insight

# Implementation Details
- Update src/lib/main.js to parse the new flags using a CLI parser (e.g., yargs or commander)
- Create or refactor modules for each algorithm under src/lib/algorithms
- Instrument execution with high-resolution timers and memory usage calls
- Write unit tests in tests/unit/main.test.js to verify correct output for small digit counts and validate flag parsing and error handling
- Update README.md with usage examples illustrating both default and error cases
- Add any required CLI parser dependency to package.json under dependencies