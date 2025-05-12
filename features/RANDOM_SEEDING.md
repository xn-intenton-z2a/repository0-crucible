# Seedable Randomness

Provide reproducible Monte Carlo sampling by allowing users to specify a seed for the random number generator.

# CLI Options

--seed <value>    Initialize the random number generator with the given seed value so that Monte Carlo results can be reproduced exactly. When omitted, Math.random is used as before.

# Implementation

1. Add a new dependency:
   • seedrandom: npm install seedrandom@^3.0.0
2. In src/lib/main.js:
   a. Import the library: import seedrandom from 'seedrandom';
   b. Extend minimist configuration to recognize seed as a string option.
   c. After parsing options, choose the RNG function:
      const rng = options.seed ? seedrandom(options.seed) : Math.random;
   d. Refactor calculatePiMonteCarlo and all Monte Carlo loops in main() and Express handlers to invoke rng() instead of Math.random().
3. In createApp parseParams add support for a seed query parameter and pass it through to calculation logic.
4. Ensure default behavior is preserved when --seed is not provided.

# Testing

1. In tests/unit/main.test.js mock seedrandom to return a fixed sequence and verify calculatePiMonteCarlo with the same seed yields identical results on repeated calls.
2. Add CLI tests:
   • main(["--algorithm", "montecarlo", "--samples", "1000", "--seed", "12345"])
     expect console.log to be called with the same numeric result on two independent invocations.
3. In tests/unit/server.test.js send two requests to /pi?algorithm=montecarlo&samples=1000&seed=12345 and assert both responses contain the same result field.

# Documentation

1. Update docs/USAGE.md to document the --seed option with a CLI example:
   node src/lib/main.js --algorithm montecarlo --samples 50000 --seed 2023
2. Update README.md under Features to describe seedable Monte Carlo sampling and provide sample commands and API curl examples.