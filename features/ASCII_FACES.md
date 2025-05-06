# Summary

This feature enables the CLI application to output random ASCII facial expressions as emotional feedback for an AI. It introduces a built-in library of ASCII faces and a new flag to display them on demand.

# Specification

The CLI will support a new flag `--face` that when provided prints one or more random ASCII faces to the console. An optional numeric argument after the flag defines how many unique faces to output in sequence. A `--seed` option allows callers to provide a numeric seed for the random generator so the output sequence can be repeatable.

An internal array of at least ten distinct ASCII art facial expressions will be defined in src/lib/main.js. When `--face` is invoked without arguments, one random face is printed. When given a count, that many unique faces are printed in separate lines. When a `--seed` flag is provided, the generation uses a simple pseudo random algorithm seeded by the given value.

# CLI Usage

node src/lib/main.js --face
node src/lib/main.js --face 3
node src/lib/main.js --face --seed 12345

# Testing

Update tests in tests/unit/main.test.js to:
- Verify that calling main with `["--face"]` logs a string matching one of the predefined faces.
- Verify that a request for multiple faces logs the correct number of distinct lines, each a valid face.
- Verify that using the same seed produces the same sequence of faces across calls.

# Documentation

Update README.md to:
- Add a bullet under Features describing the new ASCII face output capability.
- Provide example invocations for `--face`, count and `--seed` without code fences.

# Implementation Details

Modify src/lib/main.js to:
- Define the array of ASCII faces.
- Parse arguments for `--face`, optional count, and `--seed`.
- Implement or import a minimal seeded random generator for reproducible output.
- Loop to select and print faces according to count and seed.

No external dependencies beyond existing runtime libraries are required for this feature.