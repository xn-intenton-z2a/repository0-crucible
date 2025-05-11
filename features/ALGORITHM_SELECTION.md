# Overview

Add support for selecting between multiple π calculation algorithms at runtime. Users can choose a Machin-like formula (default) or a Chudnovsky-series implementation to compute π to a specified number of digits. This allows comparison of accuracy and performance between approaches.

# CLI Interface

Extend main(args) to accept a new flag:

--algorithm <machin|chudnovsky>    Choose the π computation algorithm (default: machin)

Behavior:
  • If --digits and --algorithm are provided together, calculate π to the given digits using the selected algorithm.
  • When --serve or --benchmark modes are active, propagate the algorithm choice to HTTP endpoints or benchmarks.

# Implementation Details

In src/lib/main.js:
  • Define an enum or mapping for supported algorithms: machin, chudnovsky.
  • Refactor calculatePi(digits) to accept an optional algorithm parameter. Internally dispatch to calculatePiMachin(digits) or calculatePiChudnovsky(digits).
  • Implement calculatePiChudnovsky(digits) using integer arithmetic and the Chudnovsky series for improved convergence. Ensure it handles at least up to 1000 digits and errors beyond the limit.
  • Update benchmarkPi to accept algorithm choice and include algorithm in result objects.
  • Propagate algorithm flag to HTTP API handlers for /pi and /benchmark routes.
  • Add zod schema or custom validation for algorithm values.

Update dependencies if needed (no external math library required; implement series manually).

# Testing

In tests/unit/main.test.js:
  • Add unit tests for calculatePiChudnovsky: verify first 5 decimal places against known values.
  • Test calculatePi with algorithm option: default machin and explicit chudnovsky produce expected prefixes.
  • Validate error handling for unsupported algorithm values.

In tests/e2e/cli.test.js:
  • Invoke CLI: node src/lib/main.js --digits 5 --algorithm chudnovsky and assert output matches π to 5 digits.
  • Invoke benchmark CLI: --benchmark --digits 10 --algorithm chudnovsky and verify JSON contains algorithm field.

# Documentation

Update README.md:
  • Document the new --algorithm flag and supported values.
  • Provide examples:
      node src/lib/main.js --digits 50 --algorithm chudnovsky
      curl "http://localhost:3000/pi?digits=100&algorithm=chudnovsky"
  • Note performance tradeoffs between algorithms and recommended use cases.