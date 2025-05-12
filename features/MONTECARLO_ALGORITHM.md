# MONTECARLO_ALGORITHM

# Overview
The Monte Carlo algorithm estimates π by randomly sampling points in the unit square and computing the ratio that falls within the unit circle. This probabilistic method allows users to trade off sample count for precision.

# Implementation
1. Dependencies
   • No new dependencies are required; Math.random provides sampling.
2. Source Code (`src/lib/main.js`)
   a. Ensure calculatePiMonteCarlo(samples) returns a numeric result and is exported.
   b. Verify CLIOptionsSchema and ApiParamsSchema include algorithm = "montecarlo" and samples as a positive integer.
   c. In CLI main() and HTTP handlers for /pi, /pi/data, and /pi/chart, route to calculatePiMonteCarlo when algorithm is montecarlo:
      - For /pi: invoke calculatePiMonteCarlo with opts.samples.
      - For /pi/data and --convergence-data: divide total samples into batches (e.g., 1000), for each batch update inside/count, compute approximation and error, and emit or write the point.
      - For /pi/chart and --chart: aggregate error points into dataPoints and render a PNG chart using existing Chart.js and canvas logic.

# Testing
1. Unit Tests (`tests/unit/main.test.js`)
   • Add tests for calculatePiMonteCarlo with sample counts like 1000 and 10000, asserting the result is a number between 3.0 and 3.5.
   • Add CLI tests: main(["--algorithm","montecarlo","--samples","5000"]) and spy on console.log to verify output type and plausible range.
2. Server Tests (`tests/unit/server.test.js`)
   • Test GET /pi?algorithm=montecarlo&samples=1000 returns JSON with result property.
   • Test GET /pi/data?algorithm=montecarlo&samples=2000 returns an array of { index, approximation, error }.
   • Test GET /pi/chart?algorithm=montecarlo&samples=500 returns a PNG buffer beginning with PNG header.

# Documentation
1. Update `docs/USAGE.md` under **Algorithms** to include montecarlo:
   - Describe probabilistic nature, default samples, and example usage.
2. Update `README.md` Features list:
   - Add Monte Carlo algorithm entry and example: node src/lib/main.js --algorithm montecarlo --samples 100000