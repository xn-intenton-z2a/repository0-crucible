# Overview

Enhance π calculation methods by implementing true high-precision algorithms using decimal.js. Replace existing fallback implementations with Chudnovsky, Gauss-Legendre, and Ramanujan–Sato methods to deliver accurate π approximations at arbitrary digit lengths and improve convergence performance.

# Dependencies

- Add decimal.js@^10.4.3 to package.json dependencies.

# Implementation

1. Precision Configuration
   - Import { Decimal } from 'decimal.js' in src/lib/main.js.
   - Compute precision bits as Math.ceil(digits * 3.32) + 10 and call Decimal.set({ precision: bits }).

2. Algorithm Functions
   - calculatePiChudnovsky(digits): Implement the Chudnovsky series using Decimal arithmetic until the term magnitude drops below 10^(-digits). Use Decimal methods for factorial, power, and arithmetic to accumulate the series efficiently.
   - calculatePiGaussLegendre(digits): Implement the Gauss-Legendre iteration using Decimal. Initialize a0=1, b0=1/sqrt(2), t0=1/4, p0=1 and iterate until |a−b|<10^(-digits), then compute π=(a+b)²/(4t).
   - calculatePiRamanujanSato(digits, options): Implement Ramanujan–Sato series using BigInt for binomial coefficients and Decimal for fractional operations. Support options: level (series variant), maxIterations, and errorTolerance to stop when term magnitude < errorTolerance.
   - Refactor the algorithm dispatcher in both CLI main() and createApp() to select and invoke the correct function based on algorithm name and parameters.

3. CLI Integration
   - Extend CLIOptionsSchema in src/lib/main.js to accept algorithm values "gauss-legendre" and "ramanujan-sato".
   - Add minimist flags --level <number>, --max-iterations <number>, and --error-tolerance <number> and validate them in Zod schema.

4. HTTP API Integration
   - Update ApiParamsSchema in createApp() to parse and validate level, maxIterations, and errorTolerance parameters when algorithm is gauss-legendre or ramanujan-sato.
   - Adjust GET /pi, /pi/data, and /pi/chart handlers to branch on the new algorithms and pass parsed options to their respective functions.

# Testing

- Unit tests in tests/unit/main.test.js:
  • Test calculatePiChudnovsky for small digit values, asserting accuracy within 10^(-digits).
  • Test calculatePiGaussLegendre convergence for known digits under maxIterations.
  • Test calculatePiRamanujanSato for level 1 and 2 configurations, verifying iterations do not exceed maxIterations and result meets errorTolerance.

- HTTP tests in tests/unit/server.test.js:
  • GET /pi?algorithm=gauss-legendre&digits=5 returns JSON with correct result and diagnostics when requested.
  • GET /pi?algorithm=ramanujan-sato&digits=3&level=1&error-tolerance=1e-8 returns valid response.
  • Ensure /pi/data and /pi/chart endpoints produce appropriate data points or chart images for new algorithms.

# Documentation

- Update docs/USAGE.md:
  • Document new --algorithm values gauss-legendre and ramanujan-sato.
  • Add flags --level, --max-iterations, and --error-tolerance with descriptions and examples.

- Update README.md under Features:
  • List all supported π calculation methods: Leibniz, Monte Carlo, Chudnovsky, Gauss-Legendre, Ramanujan–Sato.
  • Provide sample CLI and HTTP usage for the new algorithms.