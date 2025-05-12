# High Precision π Algorithms

Provide true arbitrary precision π computation using the Chudnovsky and Ramanujan-Sato series with robust decimal arithmetic and BigInt support.

# Implementation

1. Add dependency:
   • decimal.js: npm install decimal.js@^10.4.3
2. In src/lib/main.js import Decimal from 'decimal.js' and ensure high precision context:
   • Configure Decimal precision to digits plus guard digits.
3. Implement calculatePiChudnovsky(digits):
   • Use the standard Chudnovsky series summation with Decimal and BigInt factorials until term magnitude falls below 10^(−(digits+1)).
   • Accumulate series and compute π = C(426880√10005) / seriesSum, rounding to specified digits.
4. Implement calculatePiRamanujan({ level, digits }):
   • Use Ramanujan-Sato series from library document: compute terms up to specified level.
   • Employ BigInt for binomial coefficients and Decimal for summation.
   • Terminate when reaching level or error tolerance; compute π estimate as reciprocal of series sum.
5. Extend main():
   • Recognize algorithm names "chudnovsky" and "ramanujan-sato".
   • Parse new option --level (integer) for ramanujan-sato, default level 1.
   • Invoke appropriate calculatePiChudnovsky or calculatePiRamanujan and measure durationMs and, if diagnostics, include level.
6. Extend createApp() HTTP handlers to support ramanujan-sato in /pi, /pi/data, /pi/chart, accepting query parameter level.

# Testing

1. In tests/unit/main.test.js add unit tests:
   • calculatePiChudnovsky with small digits (2, 3) yields known approximations (3.14, 3.142).
   • calculatePiRamanujan level 1, digits 3 yields expected result (3.142).
   • Mock Decimal and BigInt factorials for edge cases and performance.
2. CLI tests:
   • main(["--algorithm","chudnovsky","--digits","3"]) logs 3.142.
   • main(["--algorithm","ramanujan-sato","--level","1","--digits","3"]) logs correct output or diagnostics JSON when --diagnostics.
3. HTTP API tests in tests/unit/server.test.js:
   • GET /pi?algorithm=ramanujan-sato&digits=2&level=1 returns { result: 3.14 }.
   • GET /pi/data and /pi/chart support level parameter and yield proper JSON array or PNG.

# Documentation

1. Update docs/USAGE.md:
   • Document --algorithm chudnovsky and --algorithm ramanujan-sato with --digits and --level options.
   • Show CLI examples and expected outputs.
2. Update README.md under Features:
   • Describe high-precision algorithms and usage (Chudnovsky and Ramanujan-Sato).