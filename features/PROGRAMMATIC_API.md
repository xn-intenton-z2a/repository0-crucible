# Purpose
Provide a programmatic JavaScript API function to generate ASCII faces and integrate with other Node.js applications without invoking the CLI.

# Implementation Details
1. Export generateFaces function
   • Accept an options object with properties count (number, default 1), theme (string, optional), config (string, optional file path), seed (number, optional), and json (boolean, optional).
   • Validate each option: count must be a positive integer, theme must exist in faceThemes, config path must be readable and parseable via loadFaces, and seed must be a non-negative integer.
2. Internal workflow
   • Initialize the faces array by applying theme override or asciiFaces and config override similar to main.
   • If seed is provided, create a seeded random generator LCG and pass rand function to getRandomFace; otherwise use Math.random.
   • Loop count times, collect results of getRandomFace into an array.
   • If options.json is true and count is 1, return a JSON string of the single face; if count greater than 1 return JSON string of the array; otherwise return the raw string or array.
3. Side-effect free
   • Do not call console.log or process.exit. Return values only and throw errors on invalid options.
4. Module exports
   • Add generateFaces to exports in src/lib/main.js alongside existing functions.

# API Interface Examples
import { generateFaces } from "@xn-intenton-z2a/repository0-crucible";

// Generate one default face
const face = generateFaces();

// Generate two sad theme faces
const faces = generateFaces({ count: 2, theme: "sad" });

// Get JSON string array with seeding
const jsonArray = generateFaces({ count: 3, seed: 42, json: true });

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Import generateFaces and call with default options; assert return type is string and value in asciiFaces.
   • Call with count and custom theme; assert returned array length and values in respective faceThemes.
   • Provide invalid options (negative count, unknown theme, bad config path, invalid seed); expect generateFaces to throw meaningful Error.

# Documentation
- Update README.md under Features to include Programmatic API section with usage and examples.
- Extend docs/USAGE.md with a Programmatic API section demonstrating import, function signature, options, and expected return values.