# Summary

Unify external and built-in theme face loading under a single extensible face management feature. Users can supply JSON or YAML files or select bundled themes to define the face library, with options to merge or replace the built-in faces.

# Specification

- Support --faces-file <path> to load a JSON or YAML file with a top-level faces array of objects, each requiring a non-empty face string and optional categories array.
- Support --merge-faces to append custom faces to the current set instead of replacing it.
- Support --theme <name> to load a predefined theme from src/lib/themes/<name>.json. Theme files export an object with a faces array of valid entries.
- Support --merge-theme to combine theme faces with the existing face library under the same merge semantics as custom files.
- Loading order: apply theme loading first, then custom file loading, then fallback to built-in faces if no replacements are specified.
- Validate file paths, parse JSON or YAML, and ensure each entry has a valid face string and categories array. On errors invoke errorExit with descriptive messages and exit with nonzero status.
- When an invalid theme name is provided, list available themes and exit with nonzero status.

# Testing

- Write unit tests to mock loading of valid and invalid custom files and themes, verifying replacement and merge behaviors.
- Verify that categories from custom and theme definitions are dynamically recognized and usable with the --category flag.
- Test error conditions such as missing files, parse errors, invalid schema, and invalid theme names for appropriate error reporting.

# Documentation

- Update README.md under Features to describe --faces-file, --merge-faces, --theme, and --merge-theme flags with clear examples.
- Add docs/EXTENSIBLE_FACES.md to explain the unified loading mechanism, format requirements, directory structure for themes, loading precedence, and error handling.

# Implementation Details

- In src/lib/main.js extend argument parsing to detect --theme and --merge-theme alongside --faces-file and --merge-faces before face selection logic.
- Load theme JSON from src/lib/themes based on the provided name and validate its structure.
- Parse custom files using readFileSync and js-yaml for .yaml or .yml extensions, or JSON.parse for .json.
- Merge or replace face sets according to flags and maintain consistent errorExit behavior for all failure modes.