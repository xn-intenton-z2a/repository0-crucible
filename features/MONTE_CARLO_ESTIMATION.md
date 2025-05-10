# Overview

Provide a statistical approximation of π using the Monte Carlo method by sampling random points inside the unit square and estimating the ratio that falls within the unit circle.

# Functional Requirements

- Implement function estimatePiMonteCarlo(options) in src/lib/main.js
  - options.samples: positive integer number of random points to sample (minimum 1, default 1000000)
- For each sample generate random x and y between 0 and 1 using Math.random
- Count how many points satisfy x² + y² ≤ 1
- Compute estimate = 4 × (count inside circle) / samples
- Return the estimate as a number

# CLI Interface

- Add flag --monte-carlo-samples <n> to src/lib/main.js
- When --monte-carlo-samples is provided:
  - Parse samples, validate integer ≥ 1
  - Invoke estimatePiMonteCarlo and print the estimate to stdout with default number formatting
  - Exit after printing the estimate

# Dependencies

- No new external dependencies required; use built-in Math.random

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Stub Math.random to produce a known sequence and verify estimate for small sample counts
  - Test default sample count behavior and validation of invalid sample values
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --monte-carlo-samples 100 and stub random to check printed estimate
  - Test invalid sample flag exits with descriptive error