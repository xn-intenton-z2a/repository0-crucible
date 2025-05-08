# Overview

Extend the calculatePi library function and CLI entrypoint to support two additional high-precision methods: the Chudnovsky algorithm and the Gauss-Legendre algorithm. Maintain backward compatibility with the existing Machin formula and Nilakantha series, and offer a consistent API surface for all four calculation methods.

# API

Export a function calculatePi(digits: number, method?: string): string

- digits: integer between 1 and 10000 inclusive
- method: optional string one of chudnovsky (default), gauss-legendre, machin, nilakantha
- returns: π to the requested number of decimal places as a string starting with "3."

# CLI Usage

Accept the following flags in the main CLI:

- --digits <n>       number of decimal places (1 to 10000), default 100
- --method <name>    calculation method: chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky
- --format <type>    output format: text or png; default text
- --output <path>    required when format is png

Validate all inputs and emit clear error messages for out-of-range digits, unknown methods, invalid formats, or missing output path.

# Implementation Details

Chudnovsky algorithm
- implement the series using decimal.js for arbitrary precision
- apply binary splitting to accelerate numerator and denominator computation for high digit counts

Gauss-Legendre algorithm
- implement iterative procedure with initial values a0 = 1, b0 = 1/√2, t0 = 1/4, p0 = 1
- loop until the change in π estimate exceeds the precision threshold for the requested digits
- compute π ≈ (a_n + b_n)^2 / (4 t_n), then truncate to the target decimals

Dispatcher
- add calculatePiChudnovsky and calculatePiGaussLegendre in src/lib/pi.js
- update calculatePi to dispatch based on method parameter

# Testing

- write unit tests for calculatePiChudnovsky and calculatePiGaussLegendre with known results for small digit counts
- verify that outputs of new methods match Machin formula for low digit values
- extend CLI integration tests to cover method flag selection and new error conditions

# Documentation

- update README.md and docs/USAGE.md to list all four methods and show usage examples for chudnovsky and gauss-legendre
- include a short performance benchmark table comparing runtime for 100, 1000, and 5000 digits across all methods

# Performance

- target sub-second execution for 1000 digits on contemporary hardware using Chudnovsky and Gauss-Legendre implementations

# Dependencies

- leverage existing decimal.js dependency; no new packages required