# Overview

Implement full ASCII face generation functionality in generateFacesCore to replace stub behavior. Provide reproducible outputs via a seeded pseudo random generator, allow filtering by category, and support optional uniqueness without replacement.

# Implementation

In src/lib/main.js
- Define face pools for categories happy, sad, angry, surprised and combine all for category all
- Implement a seeded pseudo random generator function that accepts an integer seed and returns a function returning uniform random values in range [0,1)
- In generateFacesCore
  - Validate that count is a positive integer and seed is an integer
  - Validate category is one of allowed values happy sad angry surprised all
  - If unique is true ensure count does not exceed the pool size for selected category or throw an error
  - Generate faces by drawing random values to select elements from the pool and track drawn indices when unique is true
  - Assign sequential id starting at 1 for each face and return an array of objects with id and face fields

# Tests

In tests/unit/main.test.js
- Add tests for generateFacesCore with valid options verifying array length and correct shape
- Test reproducibility by calling generateFacesCore twice with same seed and options and comparing outputs
- Test category filtering yields only faces from selected pool
- Test unique true yields no duplicate face values and error thrown when count exceeds pool size
- Test invalid count seed or category parameters throw descriptive errors

# Documentation

Update docs/USAGE.md and README.md
- Document generateFacesCore api parameters count seed category unique and return value format
- Provide examples of calling generateFacesCore in code and via CLI or HTTP server
- Show sample response payload with ids and faces