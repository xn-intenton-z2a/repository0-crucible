# Description

Provide a programmatic interface that allows other modules to generate random face expressions without invoking the CLI or HTTP server. This enables seamless integration into downstream code as a simple library function.

# API Usage

Export a new function generateFaces that accepts an options object with properties count, category, and seed, and returns an object containing an array of faces, the selected category, the count, and the seed used. Example usage:

import { generateFaces } from "@xn-intenton-z2a/repository0-crucible";
const result = generateFaces({ count: 3, category: "happy", seed: 42 });
console.log(result.faces, result.category, result.count, result.seed);

# Implementation

1. In src/lib/main.js, add and export a function generateFaces(options) that:
   - Validates count, category, and seed against the existing zod OptionsSchema
   - Uses seedrandom when seed is provided or Math.random otherwise
   - Builds the face pool based on category (all or specific)
   - Selects the requested number of faces using getRandomFaceFromList
   - Returns an object with fields faces (array of strings), category (string), count (number), seed (number or null)

2. Ensure OptionsSchema.parse is reused to validate and coerce options.

# Testing

- Add unit tests in tests/unit/main.test.js for generateFaces:
  - Default call with no arguments returns one face in the all category with seed null
  - Call with custom count, category, and seed returns correct length, category, and reproducible faces array
  - Invalid options throw schema validation errors

# Documentation

- Update README.md to document the generateFaces export under a new Library API section with usage examples
- Update docs/USAGE.md only if necessary to reference programmatic usage in code contexts
