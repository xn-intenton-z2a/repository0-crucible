# Description
Add support for an optional seed flag to enable reproducible random selection of ASCII faces. When users specify a numeric seed, the CLI will generate the same sequence of faces for the same seed value, facilitating consistent scripted usage and testing.

# Usage
Examples of invoking the seeded randomness feature:
    node src/lib/main.js --count 5 --category sad --seed 42
    node src/lib/main.js --seed 100
    node src/lib/main.js --category all --count 1 --seed 0

# Implementation
1. Update dependencies in package.json to include seedrandom.
2. In src/lib/main.js
   - Import seedrandom.
   - Extend the argument parser to accept an optional --seed flag of type integer.
   - After parsing, if seed is provided, initialize a seeded RNG function via seedrandom(seed).
   - Refactor getRandomFaceFromList to accept an RNG function and use rng() in place of Math.random.
   - Default to using Math.random when no seed flag is present.
   - Validate that seed is a nonnegative integer using zod.

# Testing
1. In tests/unit/main.test.js
   - Write tests that stub console.log and call main with a fixed seed, count, and category, then assert the exact sequence of faces logged matches the expected array for that seed.
   - Verify that providing a noninteger or negative seed triggers a validation error.

# Documentation
Update README.md:
- In the Features section, describe the new --seed flag and its effect on reproducibility.
- Provide usage examples showing how to combine --seed with --count and --category.