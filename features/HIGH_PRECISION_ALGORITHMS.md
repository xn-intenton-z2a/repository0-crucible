# High Precision π Algorithms

Implement true arbitrary-precision π computation using the Chudnovsky series and Ramanujan-Sato series with robust decimal arithmetic support.

# Implementation

1. Add a new dependency:
   • decimal.js: npm install decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal:
      import Decimal from 'decimal.js';
   b. Implement calculatePiChudnovsky(digits):
      - Set Decimal precision to digits + 10 guard digits
      - Use the Chudnovsky formula:
        • Compute each term k from 0 until term magnitude < 10^-(digits+1)
        • Sum terms with BigInt binomial coefficients via Decimal
        • Multiply by constant C = 426880 * √10005
        • Divide by series sum and round to specified digits
      - Return π as string or number
   c. Implement calculatePiRamanujanSato(level, digits):
      - Set Decimal precision to digits + 10
      - For k from 0 to level or until term magnitude < 10^-(digits+1):
        • Compute Ramanujan-Sato term using BigInt binomial coefficients and Decimal per library formula
        • Accumulate reciprocal series sum
      - Compute π from reciprocal of term sum and round to specified digits
      - Return π as string or number
   d. In main():
      - When opts.algorithm is 'chudnovsky', call calculatePiChudnovsky(opts.digits)
      - When opts.algorithm is 'ramanujan-sato', call calculatePiRamanujanSato(opts.level || 1, opts.digits)
   e. In createApp():
      - Extend ApiParamsSchema and CLIOptionsSchema to accept algorithm 'ramanujan-sato' and integer --level
      - Support the new algorithms in /pi, /pi/data, and /pi/chart endpoints, recording convergence points analogous to existing methods

# Testing

1. In tests/unit/main.test.js:
   • Add unit tests for calculatePiChudnovsky with small digits (2, 3) comparing to known constants
   • Add unit tests for calculatePiRamanujanSato(level=1, digits=3) asserting result ~= 3.142
   • Mock Decimal precision and term computations for predictable edge cases
2. CLI tests:
   • main(["--algorithm","chudnovsky","--digits","3"])
     - spy on console.log; expect output "3.142"
   • main(["--algorithm","ramanujan-sato","--level","1","--digits","3"])
     - spy on console.log; expect output "3.142"
3. HTTP API tests in tests/unit/server.test.js:
   • GET /pi?algorithm=chudnovsky&digits=2 → { result: 3.14 }
   • GET /pi?algorithm=ramanujan-sato&level=1&digits=2 → { result: 3.14 }
   • GET /pi/data and /pi/chart for both algorithms produce valid JSON arrays and PNG buffers

# Documentation

1. Update docs/USAGE.md:
   • Document --algorithm chudnovsky and --algorithm ramanujan-sato with --digits and --level
   • Show CLI examples for both high-precision methods
2. Update README.md under Features:
   • Describe High Precision π Algorithms, including usage, dependency, and performance notes
   • Provide sample commands and expected output

Ensure the existing fallback in calculatePiChudnovsky is replaced and tests are updated accordingly.