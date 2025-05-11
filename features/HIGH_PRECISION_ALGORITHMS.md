# High Precision π Algorithms

_See the project mission in [MISSION.md](../MISSION.md) to understand the scope and context of this feature._

Provide true arbitrary precision π computation using the Chudnovsky and Ramanujan-Sato series with decimal.js and BigInt support.

# Dependencies

Add the following dependency to package.json:
- decimal.js: arbitrary-precision decimal arithmetic

# Implementation

1. In src/lib/main.js import Decimal from decimal.js.
2. Implement calculatePiChudnovsky(digits):
   - Configure Decimal precision to digits plus guard digits.
   - Compute series terms using BigInt factorial and Decimal arithmetic until term magnitude falls below threshold for target digits.
   - Accumulate sum and compute π = constant over sum, rounded to specified digits.
3. Implement calculatePiRamanujan(level, digits):
   - Configure Decimal precision to digits plus guard digits.
   - Compute Ramanujan-Sato series terms using BigInt binomial coefficients C(n,k) and Decimal for summation up to given level.
   - Compute π estimate from series sum and round to specified digits.
4. In main():
   - Recognize algorithm names "chudnovsky" and "ramanujan-sato".
   - Parse options.digits and options.level for ramanujan-sato.
   - Invoke appropriate high-precision function, measure durationMs, and handle diagnostics flag.
   - Print numeric result or diagnostics JSON.

# Testing

1. In tests/unit/main.test.js add unit tests for calculatePiChudnovsky and calculatePiRamanujan:
   - For small digits and levels, verify output matches known approximations (e.g., digits 3 or 5).
   - Mock Decimal and BigInt factorial functions to force predictable outputs and error paths.
2. Add CLI tests:
   - Invoke main(["--algorithm","chudnovsky","--digits","3"]) and verify console.log outputs correct string.
   - Invoke main(["--algorithm","ramanujan-sato","--level","1","--digits","3"]) and verify correct output or diagnostics JSON.

# Documentation

1. Update docs/USAGE.md to document new algorithm options:
   - --algorithm chudnovsky with --digits
   - --algorithm ramanujan-sato with --level and --digits
   - Provide example commands and sample outputs.
2. Update README.md under Features to describe high-precision algorithms and usage examples.
