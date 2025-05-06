# Summary

Allow users to supply external custom ASCII face lists via a unified --custom flag and optionally merge them with the built-in library.

# Specification

1. CLI Flags
   - Introduce --custom <path> to specify a JSON or YAML file containing face definitions.
   - Introduce --merge-custom as an optional flag to append custom faces instead of replacing the default set.

2. Supported File Formats and Structure
   - Accept files with extensions .json, .yaml, or .yml.
   - File must contain a top-level object with key faces whose value is an array of definitions.
   - Each definition is an object with:
     • face: non-empty string of ASCII art
     • categories: optional array of strings for emotion or context tags

3. Behavior
   - Without --merge-custom, the CLI uses only the custom file as the face library.
   - With --merge-custom, the CLI appends custom faces to the built-in asciiFaces array.
   - Existing flags --face, numeric count, --seed, and --category apply to the resulting face set.

4. Validation and Error Handling
   - Verify the file exists, is readable, and matches the required format.
   - On missing file, unreadable path, parse errors, or missing faces array, log a descriptive error and exit with nonzero status.
   - Validate each face entry has a non-empty face string; invalid entries produce an error listing offending indexes.

# CLI Usage

node src/lib/main.js --face --custom ./myfaces.json
node src/lib/main.js --face 5 --seed 123 --custom ./myfaces.yaml --merge-custom
node src/lib/main.js --face --category happy --custom ./customFaces.yml

# Testing

- Add tests in tests/unit/main.test.js to verify:
  • Providing --custom <valid JSON> replaces the default library.
  • Providing --custom <valid YAML> and --merge-custom appends to built-in asciiFaces.
  • Invalid file path or parsing errors produce descriptive errors with nonzero exit.
  • Category filtering, count, and seed options operate on the custom or merged set.

# Documentation

- Update README.md under Features to describe --custom and --merge-custom flags.
- Provide example JSON and YAML file formats and usage scenarios.

# Implementation Details

In src/lib/main.js:
- Import js-yaml for YAML parsing and use JSON.parse for JSON.
- Parse and validate the custom file before face selection.
- Alias --custom to the existing file-reading logic and replace or merge with asciiFaces.
- Maintain error handling consistency with other CLI flags.