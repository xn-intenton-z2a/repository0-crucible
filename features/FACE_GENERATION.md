# Summary
Implement core functionality to output random ASCII faces on demand via the CLI.

# Specification
The CLI accepts a --face flag with an optional numeric count argument (default is 1) and an optional --seed argument for reproducible sequences. The tool maintains an internal library of ASCII faces. When invoked:
- If --face is present, sample the requested number of faces from the library.
- If a valid nonnegative integer seed is provided, use a seeded pseudorandom generator to produce repeatable results.
- If count is less than 1 or not a number, or seed is invalid, print a descriptive error message and exit with a nonzero status.
- Print each face on its own line when count is greater than 1.

# CLI Usage
node src/lib/main.js --face
node src/lib/main.js --face 3 --seed 42

# Testing
Update tests in tests/unit/main.test.js to cover:
- Single face output when invoked with ["--face"].
- Multiple faces when invoked with ["--face", "5"].
- Reproducible sequences for the same seed and count across invocations.
- Error conditions for invalid count (zero or negative) and invalid seed values.

# Documentation
Update README.md under Features to describe the face output mode, count parameter, and seed flag. Provide example commands and expected behavior.

# Implementation Details
In src/lib/main.js:
- Extend argument parsing to detect --face, numeric count, and --seed.
- Include an array of ASCII face strings in the source.
- Implement or import a simple seeded random generator for reproducibility.
- Handle validation of count and seed with descriptive errors and proper exit codes.