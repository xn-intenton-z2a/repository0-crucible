# Summary
Introduce predefined themed ASCII face collections that can be selected at runtime via a --theme flag. Users can choose from built-in theme files to quickly switch between curated face sets without custom definitions.

# Specification
- Provide a --theme <name> flag to select a packaged theme file located in src/lib/themes. Each theme file must be named <name>.json and export an object with a faces array of face definitions with optional categories.
- Provide a --merge-theme flag that, when used with --theme, appends the theme faces to the current face library instead of replacing it. This flag can be combined with --faces-file and --merge-faces.
- When --theme is specified, load the theme file before any custom or built-in face selection. If the theme file is missing or malformed, print an error listing available themes and exit with a nonzero status.
- After successful theme loading, apply other flags in order: custom file loading, merging custom faces, category filtering, count validation, seed handling, and random sampling.

# CLI Usage
node src/lib/main.js --face --theme classic
node src/lib/main.js --face 3 --theme retro --seed 123
node src/lib/main.js --face --theme playful --merge-theme --faces-file ./myfaces.json

# Testing
- Add unit tests to verify that selecting a known theme prints only faces defined in that theme.
- Test that invalid theme names produce a descriptive error with a list of valid themes and exit with nonzero status.
- Test that --merge-theme correctly appends theme faces alongside built-in or custom libraries.
- Test combinations of theme, count, seed, and category flags for deterministic and filtered output.

# Documentation
- Update README.md under Features to document --theme and --merge-theme flags, list bundled themes, and provide examples.
- Create docs/THEMED_FACES.md explaining the theme file format, placement in src/lib/themes, and usage scenarios.

# Implementation Details
- Create a src/lib/themes directory containing JSON files for each theme. Each file exports a top-level faces array where each entry has face and optional categories.
- In src/lib/main.js, extend argument parsing to detect --theme and --merge-theme prior to loading custom files or built-in set.
- Resolve the theme JSON file path relative to the module using fileURLToPath, load with readFileSync, and parse as JSON.
- Validate the theme file matches the custom faces schema: object with faces array of valid entries. On error, invoke errorExit with clear message.
- Replace or merge the faceSet with theme faces before proceeding to category filtering and random selection. Maintain consistent error handling and exit codes.