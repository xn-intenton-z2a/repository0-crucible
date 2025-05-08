# Overview

Extend the core calculatePi function and CLI to support two additional high-precision methods: the Chudnovsky algorithm and the Gauss-Legendre algorithm. Maintain backward compatibility with the existing Machin formula and Nilakantha series, and allow users to select any of the four methods.

# API

Export a function calculatePi(digits: number, method?: string): string

- digits: integer between 1 and 10000 (inclusive)
- method: optional string, one of "chudnovsky" (default), "gauss-legendre", "machin", or "nilakantha"
- returns: π to the requested number of decimal places as a string beginning with "3."

# CLI Usage

- Accept a --digits <n> flag (integer between 1 and 10000). Default: 100
- Accept a --method <name> flag with values "chudnovsky", "gauss-legendre", "machin", or "nilakantha". Default: "chudnovsky"
- Accept a --format <type> flag: "text" or "png". Default: "text"
- Accept a --output <path> flag when --format=png
- Validate inputs: error when digits out of range or method unrecognized, display helpful message
- When invoked, parse flags from process.argv, invoke calculatePi, and print or encode output

# Implementation Details

- Chudnovsky Algorithm
  - Implement the Chudnovsky series using BigInt or Decimal for arbitrary precision
  - Use binary splitting for numerator and denominator to optimize term computation, especially for digits > 1000

- Gauss-Legendre Algorithm
  - Implement the iterative Gauss-Legendre procedure
  - Initialize a0=1, b0=1/√2, t0=1/4, p0=1, iterate until convergence threshold based on digits
  - Compute π ≈ (a_n + b_n)^2 / (4 t_n), then truncate to requested decimals

- Machin Formula and Nilakantha Series
  - Retain existing implementations in pi.js for compatibility and use as alternatives

- Dispatcher
  - Update calculatePi to accept and dispatch based on the new methods
  - Default to Chudnovsky for general use

# Performance

- Aim for sub-second computation of π to 1,000 digits on modern hardware using Chudnovsky or Gauss-Legendre
- Document empirical benchmarks in README

# Testing

- Unit tests covering calculatePi for known digit outputs (e.g., 5, 10, 50) for all four methods
- Validate that Chudnovsky and Gauss-Legendre results match Machin outputs for small digit counts
- CLI integration tests mocking process.argv and capturing stdout or file outputs
- Verify error handling for invalid digits and unsupported methods