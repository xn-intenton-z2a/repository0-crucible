# Description
Implement a unified ASCII face CLI that outputs one or more random ascii faces grouped by emotion categories, supports reproducible scripted usage via an optional seed flag, and provides a help message listing available options.

# Usage
Run the CLI tool with no options to display a single random face
    node src/lib/main.js

Display three happy faces
    node src/lib/main.js --count 3 --category happy

Display two faces from any category with a specific seed for reproducibility
    node src/lib/main.js --count 2 --category all --seed 42

Get a help message listing usage, available flags, and categories
    node src/lib/main.js --help

# Implementation
1. Update src/lib/main.js
   - Define an object mapping emotion categories (happy, sad, angry, surprised) to arrays of ascii face strings.
   - Use zod to validate options: count (integer >=1 default 1), category (enum of allowed categories plus all default all), seed (optional nonnegative integer).
   - Parse arguments for --count/-c, --category/-C, --seed/-s, and --help/-h.
   - If help flag is present, output usage lines and available categories, then exit.
   - Initialize rng: if seed is provided, call seedrandom(String(seed)); otherwise use Math.random.
   - Build face pool: flatten all categories for "all" or select specific category list.
   - Loop count times, select a random face via getRandomFaceFromList(list, rng), and console.log each face.

# Testing
- In tests/unit/main.test.js
  - Stub console.log and verify that default invocation logs exactly one face.
  - Test count and category combinations to ensure correct number and filtering of faces.
  - Test seed reproducibility by running main twice with the same seed and comparing logged sequences.
  - Test parseOptions rejects invalid count, category, or seed values with zod parsing errors.

# Documentation
- Update README.md under Features:
  - Describe --count/-c, --category/-C, and --seed/-s flags and default behaviors.
  - List available categories and note the reproducible output when using --seed.
  - Provide usage examples for default, flagged, and seeded invocations.