# CHUDNOVSKY_ALGORITHM

Support precise and efficient calculation of π using the Chudnovsky algorithm implemented with Decimal.js, enabling rapid convergence and arbitrary precision output beyond the limitations of native JavaScript numbers.

# Implementation

1. Add a new dependency:
   • decimal.js: npm install decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal: import Decimal from 'decimal.js';
   b. In calculatePiChudnovsky(digits):
      • Configure Decimal precision to digits + 10 guard digits.
      • Define constants A = 13591409, B = 545140134, C = 640320, C3_OVER_24 = C ** 3 / 24.
      • Initialize sum = new Decimal(0), factor = new Decimal(1), k = 0.
      • Loop while k < maxIterations and term.abs() > 10^(-digits):
         - Compute numerator = factorial(6k) * (A + B * k)
         - Compute denominator = factorial(3k) * (factorial(k) ** 3) * C3_OVER_24.pow(k + 0.5)
         - term = new Decimal(numerator).dividedBy(denominator)
         - sum = sum.plus(term)
         - Increment k and update any running factorial or factorial caching.
      • Compute piEstimate = new Decimal(1).dividedBy(sum.times(12))
      • Return piEstimate.toFixed(digits)
   c. Replace fallback call in main() and API handlers to use updated calculatePiChudnovsky.

# Testing

1. In tests/unit/main.test.js:
   • Add tests for calculatePiChudnovsky with digits=5 and digits=10 comparing against Math.PI.toFixed or known string values.
   • Test that high digit requests (e.g., digits=15) return a string of length digits + 2 ("3.").
   • Verify algorithm stops when error term below threshold.
2. Mock Decimal internals to simulate early termination.

# Documentation

1. Update docs/USAGE.md under **Algorithms**:
   • Describe Chudnovsky algorithm, its performance benefits, and precision guarantees.
2. Update README.md under **Features**:
   • Clarify that `--algorithm chudnovsky` now uses a true high-precision implementation via Decimal.js.
   • Provide example CLI command requesting 12 decimal places: node src/lib/main.js --algorithm chudnovsky --digits 12
