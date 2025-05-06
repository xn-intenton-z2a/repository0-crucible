# Summary

Allow users to supply external JSON or YAML files defining custom ASCII faces with optional categories and choose to merge or replace built-in faces.

# Specification

- Introduce a --faces-file <path> flag to load custom face definitions from a JSON or YAML file.
- Introduce a --merge-faces flag that when present appends custom faces to the built-in set instead of replacing them.
- Custom file format must be an object with a top-level faces array. Each entry requires a non empty face string and may include a categories array of strings.
- When loading, read file with fs readFileSync, parse as JSON or YAML based on extension, and validate structure. On missing file path or parse error print descriptive error and exit nonzero.
- If merge flag is absent replace the built-in face list with custom faces. If merge flag is present append custom entries to the built-in faces in their original order.
- Recognise categories from custom faces in list categories and face filtering. If a category filter is applied and not found in the merged set produce an error listing valid categories.

# CLI Usage

node src/lib/main.js --face --faces-file path/to/custom.json
node src/lib/main.js --list-faces --faces-file path/to/file.yaml --merge-faces
node src/lib/main.js --face 5 --category excited --faces-file custom.json

# Testing

- Add unit tests to cover custom file loading replacing built in faces and merging behavior.
- Test that list categories includes categories from custom definitions.
- Test filtering by custom category yields expected faces or errors when invalid.
- Test error handling on unreadable file path, invalid JSON or YAML syntax, or malformed face entries.

# Documentation

Update README features section to describe use of --faces-file and --merge-faces flags with examples. Add or update docs/CUSTOM_FACES.md explaining file format, loading order, merge semantics, and error cases.

# Implementation Details

In src/lib/main.js extend or use the existing loadFaceSet function to handle custom files. Use readFileSync and js yaml or JSON parse to load content. Validate entries and construct uniform face objects. Merge or replace based on merge flag. Throw errors with descriptive messages via errorExit for any invalid conditions.