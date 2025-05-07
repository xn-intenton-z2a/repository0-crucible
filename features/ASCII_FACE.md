# Purpose
Extend the existing CLI tool to allow users to output multiple random ASCII facial expressions in a single invocation using a new --count flag. This enhances emotional feedback by letting scripts or users request batches of faces for richer interactions.

# Implementation Details
1. Parse Count Flag
   - Extend minimist configuration in main to include a numeric option count (alias c) with default value 1.
   - Validate that count is a positive integer; if invalid (zero, negative, or non-integer), print help message and exit without error code change.

2. Generate Multiple Faces
   - In main, after determining ascii-face mode, loop from 1 to count:
     • Call getRandomFace() each iteration.
     • Print each face on its own console line.
   - Preserve existing behavior when count is 1 (single face output).

3. Help Message Update
   - Update helpMessage to document --count (or -c) and its default.
   - Show usage examples for multiple faces.

# CLI Interface
- node src/lib/main.js --ascii-face --count 3
  Outputs three random ASCII faces, one per line.
- node src/lib/main.js --ascii-face -c 5
  Outputs five random ASCII faces.
- node src/lib/main.js --help
  Displays updated usage including count flag.

# Testing
1. Unit Tests in tests/unit/main.test.js:
   - Test that default invocation (no flags) prints exactly one face.
   - Test that --ascii-face --count N prints N faces and console.log called N times.
   - Test alias -c with valid and invalid values (zero, negative, non-integer) leading to help output.

2. CLI Integration in tests/e2e/cli.test.js:
   - Simulate node CLI with --ascii-face --count 4 and assert four lines of output belonging to asciiFaces.

# Documentation
- Update README.md and docs/USAGE.md to describe --count and provide examples with both long and short flags.
- Include API note on count parameter for future programmatic calls to main(args).