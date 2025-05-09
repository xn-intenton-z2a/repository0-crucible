# PI CALCULATION

# Overview
Add support for computing the mathematical constant pi to a user specified number of decimal digits. This feature extends both the CLI entry point and the library API to allow precision control for scientific and benchmarking use cases.

# Behavior
- The CLI tool accepts a new flag digits followed by an integer value representing the number of decimal places to calculate. Without this flag the tool retains its existing behavior of echoing arguments.
- When the digits flag is provided the tool calculates pi to the requested precision and prints the result to standard output.
- The library exports a new function calculatePi that takes an integer precision parameter and returns a string of pi to that many decimal digits.

# Implementation Details
1. Add a dependency on decimal js to support arbitrary precision arithmetic.
2. In src/lib/main js update argument parsing to detect the digits flag and call calculatePi when present.
3. Implement calculatePi in src/lib/main js using the Chudnovsky algorithm with decimal js rounding settings matched to the requested precision.
4. Update package json to include decimal js in dependencies.

# Testing
- Add unit tests in tests/unit/main test js to call calculatePi for small precision values and assert output matches known pi values.
- Test that the CLI with digits flag produces the correct string on stdout and exits successfully.

# Documentation
- Update README md to document the new digits flag and usage examples for both CLI invocation and library API calls.