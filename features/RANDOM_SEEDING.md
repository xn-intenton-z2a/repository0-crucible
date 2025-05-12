# Seedable Randomness

Allow reproducible Monte Carlo sampling by specifying a seed value for the random number generator in both CLI and HTTP API modes. This enhances testability and ensures consistent results across runs.

# CLI Options

--seed <string>    Initialize the Monte Carlo RNG with the given seed. When omitted, fallback to Math.random as before.

# HTTP API

Accept a seed query parameter on GET /pi and GET /pi/data endpoints. When seed is provided, the server uses the seeded RNG for sampling.

# Implementation

1. Add seedrandom to dependencies: npm install seedrandom@^3.0.0
2. In src/lib/main.js import seedrandom from 'seedrandom'
3. Extend CLIOptionsSchema and ApiParamsSchema to recognize a string option or query parameter named seed
4. After parsing options or request parameters, derive an RNG function:
   • const rng = opts.seed ? seedrandom(opts.seed) : Math.random
5. Refactor calculatePiMonteCarlo and all Monte Carlo loops in main() and createApp() handlers to invoke rng() instead of Math.random()
6. Preserve default behavior when seed is not provided

# Testing

1. In tests/unit/main.test.js mock seedrandom to return a predictable sequence and verify repeated calls with the same seed produce identical π approximations for the same sample count
2. Add CLI tests:
   • main(["--algorithm","montecarlo","--samples","1000","--seed","12345"]) twice and assert console.log outputs are identical
3. Add server tests in tests/unit/server.test.js:
   • request GET /pi?algorithm=montecarlo&samples=1000&seed=abc twice and assert both responses contain the same result field

# Documentation

1. Update docs/USAGE.md under Options to document --seed and seed query parameter with examples
2. Update README.md under Features to describe seedable Monte Carlo sampling and provide sample CLI and HTTP API usage