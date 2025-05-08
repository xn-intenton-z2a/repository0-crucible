# Overview

Enhance the core calculatePi function to use the Chudnovsky algorithm for high-precision computation of π. Maintain backward compatibility with the Machin formula for small digit counts and expose an option to choose the algorithm via CLI.

# API

Export a function calculatePi(digits: number, algorithm?: string): string

- digits: integer between 1 and 5000 (inclusive)
- algorithm: optional string, one of "chudnovsky" (default) or "machin"
- returns: π to the requested number of decimal places as a string beginning with "3."

# CLI Usage

- Accept a --digits <n> flag (integer between 1 and 5000). Default to 100 if not provided.
- Accept an --algorithm <name> flag with values "chudnovsky" or "machin". Default to "chudnovsky".
- Validate inputs: error when digits out of range or algorithm unrecognized, and display a helpful message.
- When invoked, parse flags from process.argv, invoke calculatePi, and print the result to stdout.

# Implementation Details

- Implement the Chudnovsky series using BigInt for numerator and denominator arithmetic to achieve arbitrary precision.
- Use binary splitting to optimize series term computation for performance when digits > 1000.
- Retain the existing Machin formula implementation as a fallback for digits ≤ 50 to minimize overhead.
- Place calculatePi and related helpers in src/lib/main.js, exporting calculatePi alongside main.
- Ensure no new dependencies are introduced; rely on built-in BigInt and minimal helper functions.

# Performance

- Aim for sub-second computation of π to 1,000 digits on modern hardware.
- Document empirical benchmarks in the README after implementation.

# Testing

- Unit tests covering calculatePi for known digit outputs (e.g., 10, 100, 1000) using both algorithms.
- Verify error handling for invalid digits and unsupported algorithm values.
- CLI integration tests by mocking process.argv and capturing stdout, ensuring correct selection of algorithm and formatted output.
