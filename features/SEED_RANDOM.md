# Purpose

Enable deterministic ASCII face generation by seeding the random number generator, allowing reproducible sequences in both CLI and HTTP modes.

# Implementation Details

1. Parse seed flag
   • Add numeric option seed (alias S) to the minimist configuration alongside existing flags. No default value (undefined if absent).
   • Validate seed as a non-negative integer. On invalid input, print help or return HTTP 400 with error message.

2. Seeded random generator
   • Implement a simple linear congruential generator (LCG) accepting the seed value.
   • Expose a rand() function that returns a pseudo-random float in [0,1).

3. Integrate with getRandomFace
   • Update getRandomFace signature to accept an optional rand function; default to Math.random.
   • In CLI and HTTP modes, pass the seeded rand if seed is provided, otherwise use default.

4. CLI behavior
   • When --seed or -S is provided with --face, --ascii-face, or --serve, the output (single or batch) is reproducible for the given seed.
   • On invalid seed value, CLI should print a JSON error or help and exit with code 1.

5. HTTP API behavior
   • Extend /face endpoint to accept seed query parameter alongside count.
   • When seed is specified, use the seeded rand so that repeated requests with the same seed and count produce the same sequence of faces.
   • On invalid seed query, respond with status 400 and JSON { error: "Invalid seed" }.

# CLI Interface Examples

- Reproducible single face:
  node src/lib/main.js --face --seed 42

- Reproducible batch of faces:
  node src/lib/main.js --ascii-face --count 3 -S 123

# Testing

1. Unit Tests
   • Mock or call main with --seed and fixed random function to verify deterministic output matches expected sequence.
   • Test getRandomFace with custom rand to ensure correct mapping.
   • Validate invalid seed values trigger help or error.

2. Integration Tests
   • Simulate CLI runs with the same seed and count flags; assert identical output across runs.
   • In HTTP mode, send GET /face?seed=10&count=2 and verify two faces are the same when repeated.

# Documentation

- Update README.md under Features to describe --seed (-S) flag, its purpose, and CLI examples.
- Extend docs/USAGE.md with a Seeded Generation section showing reproducible CLI and HTTP API usage.
