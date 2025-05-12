# GAUSS_LEGENDRE_ALGORITHM

# Overview
Enable calculation of π using the Gauss-Legendre algorithm with quadratic convergence, implemented via Decimal.js for arbitrary precision beyond native number limits.

# Implementation

1. Add dependency: decimal.js version ^10.4.3 in package.json.
2. In src/lib/main.js:
   a. Import Decimal: import Decimal from 'decimal.js';
   b. Implement calculatePiGaussLegendre(digits):
      - Configure Decimal precision to digits × 3.5 plus guard digits.
      - Initialize a = new Decimal(1), b = Decimal(1).dividedBy(new Decimal(2).sqrt()), t = new Decimal(1).dividedBy(4), p = new Decimal(1).
      - Loop until iteration limit or |a - b| < Decimal(10).pow(-digits):
         i. aNext = a.plus(b).dividedBy(2)
         ii. b = a.times(b).sqrt()
         iii. t = t.minus(p.times(a.minus(aNext).pow(2)))
         iv. p = p.times(2)
         v. a = aNext
      - Compute pi = a.plus(b).pow(2).dividedBy(t.times(4)).toFixed(digits).
   c. Extend CLIOptionsSchema and ApiParamsSchema enum values to include "gauss-legendre" alongside existing algorithms.
   d. In CLI main() and createApp() handlers for /pi, /pi/data, /pi/chart, and convergence-data and chart branches, detect algorithm === "gauss-legendre" and invoke calculatePiGaussLegendre for both single-run, streaming data, and chart export modes.

# Testing

1. In tests/unit/main.test.js add unit tests:
   - Test calculatePiGaussLegendre with digits 5 and 10 against Math.PI.toFixed or known string values within acceptable tolerance.
   - CLI test: main(["--algorithm","gauss-legendre","--digits","4"]) spy on console.log to verify output matches expected precision.
2. In tests/unit/server.test.js add HTTP tests:
   - GET /pi?algorithm=gauss-legendre&digits=3 returns JSON with result and default parameters.
   - GET /pi/data?algorithm=gauss-legendre&digits=2 returns array of data points with index, approximation, and error.
   - GET /pi/chart?algorithm=gauss-legendre&digits=2 returns PNG image starting with PNG header.

# Documentation

1. Update docs/USAGE.md under Algorithms to describe gauss-legendre method, performance benefits, precision guarantees, and example commands.
2. Update README.md Features list to include gauss-legendre algorithm with example: node src/lib/main.js --algorithm gauss-legendre --digits 12.