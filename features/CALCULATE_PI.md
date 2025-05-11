# Overview
This feature adds the ability to calculate the value of π to a user-specified number of digits via the existing CLI tool in src/lib/main.js.

# CLI Interface
Extend the main(args) function to accept a --digits <n> flag. When provided, the tool computes π to n decimal places and outputs the result to stdout. If no --digits flag is supplied, the default is 10 decimal places.

# Implementation Details
Implement a calculatePi(digits) function using a Machin-like formula with BigInt integer arithmetic for improved convergence. Integrate this function into main.js alongside a simple argument parser. Ensure the computation is efficient for up to 1000 digits and gracefully fails beyond that limit.

# Testing
Add unit tests in tests/unit/main.test.js to verify that calculatePi returns correct outputs for small digit counts (e.g., 1, 2, 5 digits) and that invoking the CLI with --digits produces the expected printed value without errors.

# Documentation
Update README.md to describe the new --digits flag, include usage examples, describe default behavior, and note performance considerations and digit limitations.