# Overview
Improve the stubbed generateFacesCore implementation in src/lib/main.js into a full ASCII face generation engine with deterministic seeding, category filtering, and optional uniqueness.

# Input Validation
Use zod to define a schema for options:
- count: positive integer
- seed: integer
- category: literal union of happy, sad, angry, surprised, all
- unique: optional boolean (default false)
Validate inputs at the start of generateFacesCore and throw descriptive errors on failure.

# Seeded Random Generator
Implement a linear congruential generator:
- Function seededRandom(seed) returns a function that yields a uniform number in [0,1)
- Use constants for multiplier, increment, and modulus to ensure reproducible sequences.

# Category Pools
Define pools of ASCII faces in src/lib/main.js:
- happy, sad, angry, surprised
- all combines all categories
Ensure each pool is a constant array of strings.

# Face Generation Logic
In generateFacesCore:
1. Validate options against the zod schema.
2. Initialize rng = seededRandom(seed).
3. Select pool for category.
4. If unique true, ensure count does not exceed pool length or throw an error.
5. Generate faces:
   - Loop count times
   - Use rng to pick an index
   - Track used indices if unique
   - Build objects with id (1-based) and face string
6. Return array of { id, face }.

# Tests
In tests/unit/main.test.js add:
- Valid inputs produce correct array length and shape
- Same seed and options yield identical arrays on multiple calls
- Filtering by category only returns faces from that pool
- unique true yields no duplicates and errors when count too high
- Invalid inputs (non-integer count, invalid category, non-boolean unique) throw clear errors
Use vitest and zod for assertion.

# Documentation
Update docs/USAGE.md and README.md:
- Document generateFacesCore API parameters and return format
- Provide CLI examples using --demo and HTTP requests showing sample ASCII faces
- Include error examples for invalid inputs