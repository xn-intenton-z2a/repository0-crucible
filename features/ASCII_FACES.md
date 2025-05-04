# Description
Implement a unified ASCII face CLI that outputs one or more random ascii faces grouped by emotion categories and supports reproducible scripted usage.

# Usage
Run the CLI tool with no options to display a single random face
    node src/lib/main.js

Display three happy faces
    node src/lib/main.js --count 3 --category happy

Display two faces from any category
    node src/lib/main.js --count 2 --category all

Get a help message listing available flags and categories
    node src/lib/main.js --help

# Implementation
1. Update src/lib/main.js
   - Define an object mapping emotion categories (happy, sad, angry, surprised) to arrays of ascii face strings.
   - Create helper function getRandomFaceFromList(list) that returns a random element from the list.
   - Use yargs or a minimal parser to extract flags: --count (integer >=1) and --category (string in allowed set plus all).
   - Use zod to validate count and category values.
   - Compute the pool of faces based on category, defaulting to the combined list for all.
   - Loop count times, call getRandomFaceFromList, and console.log each face.
   - Preserve backward compatibility: main(args) where args is an array, map raw argv into an options object.

# Testing
- In tests/unit/main.test.js
  - Stub console.log and verify main logs exactly count faces for various count values.
  - Test category filtering: ensure only faces from the requested category appear.
  - Validate parseOptions rejects invalid count or unknown category inputs.
  - Test getRandomFaceFromList returns an element from the provided list.

# Documentation
- Update README.md
  - Add Features section describing --count and --category flags.
  - List available categories and default behaviors.
  - Provide usage examples for default and flagged invocations.
