# Overview

This feature enables users to load default command options from a project-level configuration file in YAML or JSON format. It simplifies repeated invocations by allowing users to specify common flags and settings in a single file, reducing CLI verbosity and improving workflow efficiency.

# CLI Interface

--config <path>
    Specify a custom path to a configuration file (YAML or JSON).

Configuration file search order (if --config is not provided):
  • ./pi-config.yaml
  • ./pi-config.yml
  • ./pi-config.json

Settings supported in the config file mirror all global CLI flags and command-specific options (e.g., calculate-pi, extract-digit, serve, threads, cache-dir). Any flags provided on the command line override settings from the file.

# Implementation

- Add a dependency on js-yaml (already present) and import fs and path in src/lib/main.js.
- At the start of the main(args) function:
  • Determine config file path from --config or by scanning the project root in the search order.
  • If a file is found, read its contents and parse using js-yaml if extension is .yaml/.yml or JSON otherwise.
  • Validate the parsed object against a Zod schema that mirrors supported CLI options and commands, providing clear errors on invalid types or values.
  • Merge the validated config object into the arguments list, ensuring that any flags explicitly passed in args take precedence.
- Proceed with existing CLI parsing and command dispatch logic, now seeded with defaults from the config file.
- Ensure no changes to existing commands or flags are omitted; this feature augments argument sourcing only.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Create a temporary YAML config file specifying a default calculate-pi setting and verify main(args) uses it when --calculate-pi is not on the CLI.
  • Verify that passing --calculate-pi on the command line overrides the same setting in the config file.
  • Test invalid config formats or types produce a descriptive error and nonzero exit code.
  • Test --config <path> loading of a JSON config file with mixed settings.

# Documentation

- Update README.md under Features:
  • Describe the --config flag and the default search order.
  • Show example config file contents alongside the equivalent CLI invocation.
  • Explain override behavior when both config and flags are used.