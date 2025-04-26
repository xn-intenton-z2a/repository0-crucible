# DIAGNOSTICS

## Overview
Add a CLI option to display diagnostic information about the environment and configuration. This helps users debug issues and verify the tool setup.

## Functionality

- Introduce a --diagnostics flag in src/lib/main.js.
- When invoked, gather from the running environment
  - Node runtime version from process.versions.node
  - Library version from package.json
  - List of available data sources from the SOURCES constant
  - List of supported CLI flags
  - Key environment variables such as NODE_ENV
- Output the information as a formatted JSON object to stdout
- Exit with status code zero on success

## Testing

- Add unit tests in tests/unit/main.test.js to simulate invoking main with the --diagnostics flag
- Mock process.versions.node and package.json import to control version fields
- Verify output JSON contains the expected keys and values
- Confirm the CLI exits with code zero

## Documentation

- Update README.md under Features and Usage to document the new --diagnostics flag, include example commands and sample output