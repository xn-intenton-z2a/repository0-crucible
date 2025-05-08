# Overview

Implement a core calculatePi function and add CLI support for the --digits option to allow users to request a specified number of decimal places for π.

# API

Export a function calculatePi(digits: number): string
 that computes π to the requested number of digits (minimum 1, maximum 1000) and returns it as a string beginning with "3.".

# CLI Usage

- Accept a --digits <n> flag (integer between 1 and 1000). Default to 100 if not provided.
- When run with --digits, parse the flag from process.argv, invoke calculatePi, and print the resulting string to stdout.

# Implementation Details

- Use the Machin formula for π with BigInt-based arithmetic for arbitrary precision.
- Parse CLI arguments manually from process.argv without introducing new dependencies.
- Place calculatePi implementation in src/lib/main.js, export it alongside main.

# Testing

- Unit tests for calculatePi covering known outputs (e.g., first 10 digits).
- CLI integration tests by mocking process.argv and capturing stdout to verify output and error handling when --digits is out of range.