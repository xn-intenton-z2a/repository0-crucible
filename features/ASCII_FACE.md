# Purpose
Extend the existing CLI tool to output random ASCII art facial expressions with support for both built-in and user-defined faces via a configuration file. This provides flexible emotional feedback for the AI.

# Implementation Details
1. Load Faces from Configuration
   - Add a function `loadFaces(configPath)` in `src/lib/main.js`.
   - Use `fs` to read the file at `configPath` and `js-yaml` to parse YAML or JSON.
   - Validate that the parsed content is an array of non-empty strings.
   - Throw an error for missing file, parse errors, or invalid formats.

2. Random Face Selection
   - Implement `getRandomFace(faces)` that returns one element randomly from the provided array.
   - Ensure uniform distribution over the array.

3. Main Function Enhancements
   - Update `main(args)` to parse CLI options:
     • `--face` to invoke face output mode.
     • `--config <filepath>` to load additional faces.
     • `--help` to show usage instructions for these flags.
   - If `--face` is present:
     • Load built-in face list from a constant.
     • If `--config` is provided, merge built-in faces with `loadFaces` output.
     • Call `getRandomFace` on the merged list and print the result.
   - Preserve existing behavior for other flags and default argument logging.

# CLI Interface
- `node src/lib/main.js --face`
  Outputs a random built-in ASCII face.
- `node src/lib/main.js --face --config path/to/faces.yaml`
  Outputs a random face selected from built-in and user-defined faces in the YAML or JSON file.
- `node src/lib/main.js --help`
  Displays usage for `--face`, `--config`, and other existing options.

# Testing
1. Unit Tests in `tests/unit/main.test.js`:
   - Test `loadFaces` with a valid YAML and JSON fixture returning correct arrays.
   - Test `loadFaces` error cases: missing file, invalid YAML, non-array content.
   - Test `getRandomFace` picks an element from a known array stochastically.
2. CLI Integration Test in `tests/e2e/cli.test.js`:
   - Simulate process argv for `--face`, capture stdout, assert output is one of the built-in faces.
   - Simulate `--face --config tests/fixtures/custom-faces.yaml` and assert output is from merged list.

# Documentation
- Update `README.md` under Features to describe custom face support.
- Provide example YAML format and sample invocation with `--config`.
- Document the API of `loadFaces` and `getRandomFace` under a Usage section.