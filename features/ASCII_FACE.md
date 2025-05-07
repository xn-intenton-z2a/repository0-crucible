# Purpose
Extend the existing ASCII art face output feature to allow users to supply custom face definitions via a configuration file. Default faces are preserved, but users can merge or override them using YAML or JSON files.

# Source Changes
1. In `src/lib/main.js`, implement `loadFaces(configPath)` that:
   - Reads a YAML or JSON file at `configPath` using `fs` and `js-yaml`.
   - Validates that the file exports an array of non-empty strings.
   - Returns the array of custom faces.
2. Update `getRandomFace(customFaces)` to accept an optional array of faces and choose from the merged list of default and custom faces.
3. Modify `main(args)` to:
   - Detect the `--face` flag.
   - Optionally detect `--config <filepath>` and call `loadFaces`.
   - Merge default faces with loaded custom faces, then call `getRandomFace(mergedFaces)`.
   - Print the selected face.
4. Preserve existing behavior: when invoked with `--help`, display usage for `--face` and `--config` options.

# CLI Interface
- `node src/lib/main.js --face` outputs a random default ASCII face.
- `node src/lib/main.js --face --config path/to/faces.yaml` outputs a random face from defaults plus faces in the YAML/JSON file.
- `node src/lib/main.js --help` shows descriptions for both `--face` and `--config` options.

# Testing
1. In `tests/unit/main.test.js`, add tests for `loadFaces`:
   - When given a valid YAML file with an array of strings, it returns that array.
   - When given an invalid path or malformed file, it throws an error.
2. Add tests for `getRandomFace` when passed a custom array to ensure the output is one of the provided faces.
3. Add a CLI integration test setting `process.argv` to simulate:
   - `--face --config tests/fixtures/custom-faces.yaml` and assert that printed output matches one of default or custom faces.

# Documentation
- Update `README.md`:
  - Under Features, describe custom face configuration.
  - Provide example YAML format and usage examples for the `--config` flag.

