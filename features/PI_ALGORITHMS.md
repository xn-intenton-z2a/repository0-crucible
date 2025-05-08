# Overview

Implement high-precision π calculation algorithms using a decimal arithmetic library. Replace the placeholder computePi function with dedicated implementations for Leibniz, Gauss–Legendre, and Chudnovsky methods, supporting arbitrary digit counts and accurate results.

# Implementation

1. Dependencies
   Add decimal.js to package.json dependencies.

2. Algorithm Modules
   - Import Decimal from decimal.js in src/lib/main.js.
   - Implement computeLeibniz(digits) using series summation until reaching the desired precision.
   - Implement computeGaussLegendre(digits) using iterative arithmetic-geometric mean with Decimal for quadratic convergence.
   - Implement computeChudnovsky(digits) using the standard Chudnovsky formula with Decimal for rapid convergence.
   - Update computePi(digits, algorithm) to switch on algorithm and invoke the corresponding function, returning a string of the computed π digits.

3. Performance Measurement
   Retain existing performance.now timing logic around computePi calls for benchmarking and HTTP responses.

# Testing

- Create tests/unit/algorithm.test.js:
  * For each algorithm, verify the first 10 digits match reference pi digits 3.1415926535.
  * Test edge cases: digits=0 returns "3", digits=1 returns "3.1".
  * Validate algorithm selection and error handling when algorithm is unsupported.
- Update existing API tests to rely on new computePi behavior for accuracy assertions.

# Documentation

- README.md:
  * Under Features, describe the new high-precision algorithms.
  * Add examples for CLI: node src/lib/main.js --algorithm gauss-legendre --digits 1000
  * Add examples for HTTP: curl "/pi?digits=50&algorithm=chudnovsky"
  * Note that algorithm selection now yields mathematically accurate digits.