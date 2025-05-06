# Summary

Allow users to enumerate the available ASCII faces and emotion categories directly from the CLI to aid discovery and scripted workflows.

# Specification

- Introduce a --list-faces flag that prints each face string in the current face library on its own line
- When --list-faces is combined with --category, filter the output to faces matching the specified category
- Introduce a --list-categories flag that prints each valid category name on its own line
- Both flags apply to the merged face set when using --custom and --merge-custom
- If an unrecognized category is provided, print an error listing valid categories and exit with a nonzero status

# CLI Usage

node src/lib/main.js --list-categories
node src/lib/main.js --list-faces
node src/lib/main.js --list-faces --category happy
node src/lib/main.js --list-faces --custom ./customFaces.json --merge-custom

# Testing

- Add tests in tests/unit/main.test.js to verify listing all faces prints every built-in face exactly once
- Add tests to verify listing with --category prints only faces tagged in that category
- Add tests to verify --list-categories prints the complete category list
- Add tests to assert that an invalid category provided to --list-faces returns an error and exits nonzero

# Documentation

- Update README.md under Features to include descriptions and examples for --list-faces and --list-categories flags
- Show how listing interacts with --category, --custom, and --merge-custom

# Implementation Details

In src/lib/main.js extend argument parsing to detect --list-faces and --list-categories before standard face generation. Use the existing category to faces mapping and asciiFaces array. For listing with custom inputs, apply file loading and merging logic then output lists. Maintain consistent error handling and exit codes.