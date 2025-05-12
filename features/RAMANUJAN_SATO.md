# Ramanujan-Sato Series Algorithm

Provide a high precision π calculation using the Ramanujan-Sato series, which converges rapidly and supports arbitrary precision arithmetic.

# CLI Options

--algorithm ramanujan-sato    Use the Ramanujan-Sato series for π calculation
--level <number>             Series level or depth for convergence (default: 1)
--digits <number>            Number of decimal places to compute

# Implementation

1. Add dependency:
   • decimal.js: npm install decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal from decimal.js
   b. Implement function calculatePiRamanujanSato(level, digits):
      • Configure Decimal precision to digits plus guard digits
      • Initialize termSum = Decimal(0)
      • For k from 0 to level or until term magnitude is below 10^-(digits+1):
         – Compute term using BigInt binomial coefficients and Decimal per Ramanujan-Sato formula
         – Accumulate termSum = termSum.plus(term)
      • Compute π estimate from reciprocal of termSum and round to specified digits
      • Return π as string or number
   c. Extend main(): when opts.algorithm equals ramanujan-sato call calculatePiRamanujanSato(opts.level, opts.digits)
   d. In convergence-data and chart modes record intermediate approximations and errors using the same series iterations
   e. In createApp() API handlers support algorithm=ramanujan-sato and level query parameter

# Testing

1. In tests/unit/main.test.js:
   • Add unit tests for calculatePiRamanujanSato with small level and digit values, comparing to known constants at 2 or 3 decimals
   • Mock Decimal precision and BigInt operations for predictable behavior
2. CLI tests:
   • main(['--algorithm','ramanujan-sato','--level','1','--digits','3']) should log 3.142
   • main with --diagnostics should return object containing algorithm, level, digits, result, durationMs
3. API tests in tests/unit/server.test.js:
   • GET /pi?algorithm=ramanujan-sato&level=1&digits=2 returns JSON { result: 3.14 }
   • GET /pi/data and /pi/chart with ramanujan-sato record correct data points and PNG output

# Documentation

1. Update docs/USAGE.md:
   • Document --algorithm ramanujan-sato, --level and --digits options with examples
   • Show sample output for both CLI and HTTP modes
2. Update README.md under Features:
   • Describe Ramanujan-Sato series method, its convergence properties, and usage examples