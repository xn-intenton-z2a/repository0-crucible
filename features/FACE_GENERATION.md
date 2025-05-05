# Overview

Replace the stub implementation of generateFacesCore in src/lib/main.js with a full ASCII face generation engine. Support seeded pseudo random output, filtering by category, and optional uniqueness without replacement. Validate inputs and provide clear errors.

# Seeded Pseudo Random Generator

Define a function seededRandom that takes an integer seed and returns a function producing uniform random values in [0,1). Use a linear congruential generator or similar deterministic algorithm. Ensure the same seed yields identical sequences.

# Category Pools and Validation

Maintain face pools for categories happy sad angry surprised and a combined pool for all. In generateFacesCore options, validate that count is a positive integer, seed is an integer, category is one of the allowed values, and unique is boolean if provided. Throw descriptive errors for invalid inputs.

# Face Generation Logic

In generateFacesCore:
  • Initialize the random generator with the given seed.
  • Select the pool matching the category.
  • If unique is true ensure count does not exceed the pool size or throw an error.
  • Loop count times: draw a random index to pick a face string, track used indices when unique is true, and record id starting at 1.
  • Return an array of objects with id and face fields.

# Tests

In tests/unit/main.test.js add tests for generateFacesCore:
  • Valid count seed category unique options return correct array length and shape.
  • Repeated calls with same seed and options produce identical outputs.
  • Category filtering only yields faces from the selected category pool.
  • Unique true ensures no duplicate face values and throws when count exceeds pool size.
  • Invalid count seed category or unique parameters throw errors with clear messages.

# Documentation

Update docs/USAGE.md and README.md to document generateFacesCore API parameters count seed category unique and return format. Provide inline code and CLI or HTTP examples showing sample responses.