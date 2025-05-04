# Description

Enhance the CLI tool to accept command-line options for selecting how many ascii faces to display and filtering by emotion category. Users can specify a count of faces to output in sequence and optionally choose a category (happy, sad, angry, surprised, or random). This addresses diverse user needs and enables reproducible behavior in scripts.

# Usage

- Display three happy faces:
  node src/lib/main.js --count 3 --category happy

- Display a single random face (default behavior):
  node src/lib/main.js

- Display two faces from any category:
  node src/lib/main.js --count 2 --category all

# Implementation

1. Update src/lib/main.js:
   - Define a map of face arrays grouped by category: happy, sad, angry, surprised.
   - Parse process.argv to extract --count (number) and --category (string) flags.
   - Use zod to validate that count is an integer >= 1 and category is one of the allowed values.
   - Compute the flattened array when category is all, otherwise select the specific category array.
   - Loop count times calling getRandomFaceFromList(array) to select and log a face each iteration.
   - Ensure main(args) accepts an options object instead of raw argv, preserving backward compatibility.

2. Add helper functions:
   - getRandomFaceFromList(list): returns a random element from the list.
   - parseOptions(argv): returns a validated object { count, category }.

# Testing

- In tests/unit/main.test.js:
  - Stub console.log and validate that running main with count N produces exactly N calls.
  - Test parseOptions with valid and invalid inputs (e.g., non-integer count, unknown category).
  - Verify getRandomFaceFromList returns one of the provided faces.

# Documentation

- Update README.md:
  - Add a Features section describing --count and --category options.
  - Include usage examples showing each flag and combinations.
