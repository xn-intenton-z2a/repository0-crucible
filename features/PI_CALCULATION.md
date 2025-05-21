# Overview

The CLI tool supports computing π to a specified number of decimal digits using the Leibniz series algorithm. Users specify precision via CLI flags and receive the result as a decimal string.

# CLI Interface

Accepts --digits or -d followed by a positive integer (default 10) to determine output precision. Validates input and reports errors for invalid or out-of-range values.

# Implementation

Add a function calculatePiLeibniz(digits) in src/lib/main.js that iteratively computes π to the given precision. Update main to parse CLI arguments, invoke calculatePiLeibniz, and output the result. Ensure compatibility with Node.js 20 and ESM.

# Testing

Write unit tests in tests/unit/main.test.js to verify calculatePiLeibniz produces correct values for digits=0, 1, and 5, and handles invalid inputs. Ensure tests pass with vitest.

# Documentation

Update README.md to document usage examples, API reference for calculatePiLeibniz, and instructions for running the feature via CLI flags.
