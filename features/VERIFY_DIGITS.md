# Overview

This feature adds a verification step after computing pi digits to ensure accuracy by spot checking randomly selected positions using the BBP extraction formula. It helps detect any discrepancies in the computed result and increases user confidence in the correctness of large digit calculations.

# CLI Interface

--verify-digits <count>   Specify number of random digit positions to verify (default 10)
--no-verify               Disable verification step after pi calculation

# Implementation

- Extend src/lib/main.js to detect the --verify-digits and --no-verify flags during --calculate-pi handling
- After computing full pi digits:
  • If verification is enabled, generate <count> random zero-based positions in the range of computed digits
  • For each position, invoke the bbpDigit function to extract the digit independently
  • Compare the extracted digit to the corresponding character in the computed pi string
  • Collect any mismatches and report them
- If any mismatch is detected, print an error summary and exit with nonzero status; otherwise print a verification success message
- Ensure that error handling for invalid verify count (nonpositive integers) is performed before computation begins

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock pi calculation function to produce a known digit sequence and stub bbpDigit to return matching digits; verify that passing --verify-digits produces a success message
  • Simulate a mismatch by mocking bbpDigit to return an incorrect digit; verify that the process exits with error and reports the mismatch position
  • Test --no-verify suppresses any verification logic and still returns correct output for pi calculation

# Documentation

- Update README.md under Features to document:
  • New flags --verify-digits and --no-verify with example usage
  • Explanation of how spot checking works and why it is useful
  • Example command:
    node src/lib/main.js --calculate-pi 1000 --verify-digits 5