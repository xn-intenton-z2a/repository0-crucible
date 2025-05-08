# ASCII_FACE_CLI

## Overview

Extend the CLI tool to output random ASCII art facial expressions. This feature adds a built-in library of faces, command-line options to control output, and updates tests and documentation accordingly.

## Implementation

1. In `src/lib/main.js`, define an array of ASCII faces.  
2. Parse command-line arguments:
   - No options: print one random face.
   - `--count <n>`: print <n> random faces, one per line.
   - `--list`: print all available faces, one per line.
   - `--help`: show usage instructions.
3. Ensure exit code 0 on success.

## Tests

1. In `tests/unit/main.test.js`, add tests that:
   - Verify the faces array is non-empty and contains known entries.
   - Confirm `main(["--count", "3"])` outputs exactly 3 lines.
   - Confirm `main(["--list"])` outputs one line per face in the array.
   - Confirm unknown option returns help text or error exit code.

## Documentation

1. Update `README.md` under Features and Usage:
   - Document the new commands and options with examples.
   - Show sample output of random faces and listing all faces.

## Dependencies

No new external dependencies required. Use built-in ESM modules and existing CLI infrastructure.
