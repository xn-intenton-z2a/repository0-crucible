# High Precision π Algorithms

Enable arbitrary-precision computation of π using Decimal.js for fast-converging series methods, including Chudnovsky, Gauss-Legendre, and Ramanujan-Sato.

# CLI Integration

• Extend --algorithm to accept gauss-legendre, chudnovsky, and ramanujan-sato
• Add --level <number> for ramanujan-sato depth
• Preserve --digits flag as target precision for all methods

# Implementation

1. Add dependency decimal.js@^10.4.3 in package.json
2. In src/lib/main.js import Decimal from decimal.js
3. Implement calculatePiChudnovsky(digits) using the Chudnovsky series with guard digits and convergence threshold
4. Implement calculatePiGaussLegendre(digits) following the Gauss-Legendre iterative method with precision and epsilon based on digits
5. Implement calculatePiRamanujanSato(level, digits) computing terms up to level or until term magnitude < 10^(-digits-1)
6. In main(), when opts.algorithm is one of these methods, invoke the corresponding function and format output as before
7. In createApp(), extend ApiParamsSchema and CLIOptionsSchema to include new algorithms and level parameter

# Testing

• Add unit tests in tests/unit/main.test.js for each algorithm with small digits to compare against known constants at 2 and 3 decimals
• Mock Decimal precision and round intermediate steps for deterministic results
• CLI tests: invoke main with --algorithm chudnovsky --digits 3; expect console.log of 3.142
• CLI tests: invoke main with --algorithm ramanujan-sato --level 1 --digits 3; expect 3.142
• HTTP API tests: GET /pi?algorithm=gauss-legendre&digits=2 returns JSON { result: 3.14 }

# Documentation

• Update docs/USAGE.md under Algorithms to describe new methods with examples
• Update README.md under Features to list Gauss-Legendre, Chudnovsky, and Ramanujan-Sato with sample invocation