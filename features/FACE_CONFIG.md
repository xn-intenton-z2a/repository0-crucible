# Feature: Custom Face Configuration

Enable users to extend or override the built-in face categories and expressions by supplying a configuration file in YAML or JSON format.

# CLI Behavior

- Add a new flag `--config` (alias `-f`) accepting a file path to a YAML or JSON config file.
- When `--config` is provided:
  - Load and parse the file using js-yaml for YAML or native JSON parsing depending on extension.
  - Validate that the top-level value is an object mapping category names (strings) to arrays of face strings.
  - Merge the custom definitions into the default `faces` object, overriding existing categories or adding new ones.
  - All other flags (`--count`, `--category`, `--seed`, `--json`, `--serve`, `--port`) behave against the merged set.

# Implementation

1. Extend `OptionsSchema` in `src/lib/main.js` to include an optional `config` property of type `string`.
2. Update `parseOptions` to capture `--config`/`-f` and pass it through `OptionsSchema`.
3. In both `main` and `createApp`, before selecting from the `faces` pool:
   - If `config` is provided, read the file synchronously (e.g., `fs.readFileSync`) and parse it:
     - If path ends with `.yaml` or `.yml`, parse via `js-yaml`.
     - Otherwise, parse as JSON.
   - Validate that the parsed object maps string keys to arrays of strings.
   - Merge into the existing `faces` constant, overwriting or adding categories.
4. Ensure category defaults and validation use the updated keys list.

# Testing

- Add unit tests for `parseOptions` to confirm `--config` and `-f` flags populate the `config` option.
- Create mock YAML and JSON config fixtures in tests to:
  - Add a new category (`custom`) and verify CLI and HTTP endpoints serve faces from it.
  - Override an existing category (e.g., replace `happy`) and confirm results reflect the override.
- In HTTP tests, start the server with a temporary config file via `createApp`, then query `/faces?category=custom` to confirm behavior.

# Documentation

- Update `README.md` Features section to describe custom face configuration and example usage with `--config`.
- Update `docs/USAGE.md` to include examples for loading a config file, showing both YAML and JSON formats.
