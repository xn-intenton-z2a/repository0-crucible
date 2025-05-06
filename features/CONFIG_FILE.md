# Summary

This feature enables loading default CLI options from a configuration file in JSON or YAML format. The CLI will search for a config file in the current directory or the user's home directory and apply settings as defaults to avoid repetitive flag usage.

# Specification

- Configuration file names: .cruciblerc, cruconfig.json, or cruconfig.yaml
- Supported format: JSON or YAML representing an object with keys matching existing CLI options: count (number), seed (number), category (string), facesFile (string), mergeFaces (boolean), theme (string), mergeTheme (boolean), template (string), output (string), serve (boolean), port (number), diagnostics (boolean), interactive (boolean).
- Loading order: search in the current working directory, then fall back to the user home directory.
- Load config before parsing CLI args and merge settings, with CLI flags taking precedence.
- On parse errors, invalid file paths, or type mismatches in config fields, print a descriptive error via errorExit and exit with nonzero status.

# Testing

- Write unit tests that create a temporary config file in the working directory and verify that main loads default values when CLI flags are omitted.
- Test that CLI flags override config file values.
- Test invalid config syntax or unsupported field types causes descriptive errors and nonzero exit.

# Documentation

- Update README.md under Features to describe configuration file support with usage examples.
- Add docs/CONFIG_FILE.md explaining file naming, example formats, precedence rules, and error handling.

# Implementation Details

- In src/lib/main.js before processing args, search for supported config file names in cwd and HOME.
- Use fs.readFileSync and js-yaml or JSON.parse to load file content.
- Validate each config field’s type and value; use errorExit for any violations.
- Merge config values into the argument-parsing logic, applying defaults from config and overriding with explicit CLI flags.