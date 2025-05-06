# Summary
Allow users to supply an external file containing custom ASCII faces and optional category tags, enabling extension or replacement of the built-in face library.

# Specification
1. CLI Flag
   - Add a new flag --faces-file <path> that accepts a filesystem path to a JSON or YAML file defining faces.
   - Support file extensions .json, .yaml, and .yml.
2. File Format
   - The file must define a top-level object with a key faces whose value is an array of face definitions.
   - Each face definition is an object with:
     • face: a string containing the ASCII art
     • categories: optional array of strings tagging emotions or contexts
3. Behavior
   - If --faces-file is provided without --merge-faces, the CLI uses the custom file as the sole source of faces.
   - If the flag --merge-faces is also present, the custom faces are appended to the built-in library.
   - Existing flags (--face, count, --seed, --category) apply to the resulting face set.
   - On missing or unreadable file, invalid JSON/YAML, or malformed structure, print a descriptive error and exit with nonzero status.
4. Validation
   - Verify the file exists and is readable.
   - Parse JSON or YAML using js-yaml for .yaml/.yml and JSON.parse for .json.
   - Validate the presence of the faces array and that each entry has a non-empty face string.
5. Integration
   - In src/lib/main.js, import js-yaml, read and parse the file before selecting faces.
   - Merge or override the default library based on flags.

# CLI Usage
node src/lib/main.js --face --faces-file ./myfaces.yaml
node src/lib/main.js --face 5 --seed 123 --faces-file ./custom.json --merge-faces

# Testing
- Add tests in tests/unit/main.test.js to verify:
  • Loading a valid JSON file replaces the default set.
  • Loading a valid YAML file merges when --merge-faces is passed.
  • Invalid file path or parse errors produce an error exit.
  • Category filtering works on custom sets.

# Documentation
- Update README.md under Features to describe --faces-file and --merge-faces flags.
- Provide example JSON/YAML file structures and inline usage examples.