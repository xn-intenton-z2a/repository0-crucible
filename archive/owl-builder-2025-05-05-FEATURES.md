features/HTTP_SERVER.md
# features/HTTP_SERVER.md
# Overview

Unify and extend the command-line interface to support all declared flags with clear usage and consistent behavior across modes.

# CLI Flag Handling

Implement support for the following flags:

- --help                 Show usage summary and exit
- --demo                 Run the interactive demo and exit
- --serve                Launch the HTTP server on specified port or default to 3000
- --diagnostics          Display diagnostic information (Node version, platform, parsed args) and exit
- --build-intermediate   Perform intermediate build stage stub and exit
- --build-enhanced       Perform enhanced build stage stub and exit
- --refresh              Reload or refresh internal data and exit
- --merge-persist        Merge changes into persistent store stub and exit

Parsing should be extracted into a helper using a clear if/else ladder or switch to ensure maintainability and prioritization (help first, then demo, serve, diagnostics, build modes, refresh, merge-persist).

# HTTP Server Mode

Retain existing behavior for GET /faces, including parameter validation and response format. Ensure new flag handling does not interfere with server startup or request handling and that help text is not logged when serving.

# Implementation

In src/lib/main.js:

- Add helper functions:
  • printDiagnostics: log Node version, platform, and provided args
  • buildIntermediate: log building intermediate stage
  • buildEnhanced: log building enhanced stage
  • refreshData: log data refresh action
  • mergePersist: log merging and persisting changes

- In main, before other checks, sequentially detect and handle each flag in priority order:
  1. --help calls printUsage and process.exit(0)
  2. --demo calls runDemo and process.exit(0)
  3. --serve launches HTTP server
  4. --diagnostics calls printDiagnostics and process.exit(0)
  5. --build-intermediate calls buildIntermediate and process.exit(0)
  6. --build-enhanced calls buildEnhanced and process.exit(0)
  7. --refresh calls refreshData and process.exit(0)
  8. --merge-persist calls mergePersist and process.exit(0)

- Refactor flag parsing into a helper function to minimize duplication.

# Tests

In tests/unit/main.test.js:

- Add tests for each new flag scenario:
  • main(["--diagnostics"]): mock console.log and process.exit, assert log includes Diagnostics and exit code 0
  • main(["--build-intermediate"]): assert log includes Building intermediate stage and exit code 0
  • main(["--build-enhanced"]): assert log includes Building enhanced stage and exit code 0
  • main(["--refresh"]): assert log includes Refreshing data and exit code 0
  • main(["--merge-persist"]): assert log includes Merging and persisting changes and exit code 0

- Ensure existing tests for --help, --demo, and --serve continue to pass without modification.

# Documentation

In docs/USAGE.md and README.md:

- Document the new flags under the Options section with descriptions
- Provide example invocations for each new flag and sample output

# Dependencies

No new dependencies required; use built-in console and process modules.
features/FACE_GENERATION.md
# features/FACE_GENERATION.md
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