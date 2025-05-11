# Overview

Provide a new command‒line option to calculate π to a specified number of decimal places using a performant algorithm. This feature enables users to request an arbitrary precision π value directly from the CLI, printed as text output.

# CLI Interface

- Add a new flag `--digits` or `-d` followed by a positive integer to configure how many decimal places of π to calculate.  
- If no `--digits` flag is provided, the CLI prints π to a default precision of 10 decimal places.
- Validate that the digits argument is a non‒negative integer less than or equal to 1000.

# Implementation Details

- Implement a function `calculatePi(digits)` in `src/lib/main.js` that returns a string representation of π to the requested precision.  
- Use a Machin-like formula or arctangent series for convergence efficiency.  
- Update `main(args)` to parse the new flags, call `calculatePi`, and output the result.
- Include error handling for invalid or out‒of‒range values.

# Testing

- Add unit tests in `tests/unit/main.test.js` to verify correct π output for small digit values (e.g., 0, 1, 5, 10).  
- Test that invalid inputs throw a descriptive error.  
- Ensure the default precision path produces the expected 10 decimal places.