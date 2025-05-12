# RAMANUJAN_SATO_ALGORITHM

Support π calculation using a Ramanujan–Sato series for exceptionally rapid convergence and high precision beyond native limits.

# Implementation

1. Add a new dependency:
   • decimal.js@^10.4.3 via npm install decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal:
      import Decimal from 'decimal.js';
   b. Implement calculatePiRamanujanSato(digits, level = 1, maxIterations = 50, errorTolerance = 1e- (digits)):
      • Configure Decimal precision to digits plus guard digits (e.g., digits + 10).
      • Define a factorial and binomial helper using BigInt and Decimal.
      • For each k from 0 to maxIterations:
        – Compute term using the Ramanujan–Sato formula for the given level.
        – Break loop when term.abs() < Decimal(errorTolerance).
        – Accumulate sum of terms.
      • Compute piEstimate = Decimal(1).dividedBy(sum).toFixed(digits).
      • Export calculatePiRamanujanSato for CLI and HTTP handlers.
3. Extend schemas:
   • CLIOptionsSchema and ApiParamsSchema enum to include algorithm = "ramanujan-sato".
   • Add parameters:
     – level: integer, default 1
     – maxIterations: integer, default 50
     – errorTolerance: number, default computed as 1e- digits
4. In main() and createApp():
   • Detect algorithm "ramanujan-sato" and invoke calculatePiRamanujanSato with parsed parameters.
   • Support convergence-data and chart modes similar to other algorithms.

# Testing

1. Unit Tests (tests/unit/main.test.js):
   • Test calculatePiRamanujanSato with digits=5, level=1 against known reference string "3.14159".
   • Verify termination within maxIterations and correct string length.
   • CLI test: main(["--algorithm","ramanujan-sato","--digits","5","--level","1"]) spy console.log for expected result type and precision.
2. Server Tests (tests/unit/server.test.js):
   • GET /pi?algorithm=ramanujan-sato&digits=4&level=1 returns JSON with result matching toFixed 4.
   • GET /pi/data and /pi/chart support streaming and chart export for ramanujan-sato.

# Documentation

1. Update docs/USAGE.md under Algorithms:
   • Describe ramanujan-sato method, its level parameter, iteration and error tolerance options, and usage examples.
2. Update README.md Features list:
   • Add Ramanujan–Sato algorithm entry with example CLI command: node src/lib/main.js --algorithm ramanujan-sato --digits 8 --level 1