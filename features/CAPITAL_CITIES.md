# CAPITAL_CITIES Feature Specification

## Overview
This feature provides a CLI command `--capital-cities` that outputs a JSON file containing a sample OWL ontology of world capital cities. In this updated version, users have two optional enhancements:

- A `--country=NAME` flag to filter the output to a specific country.
- A new `--format=FORMAT` flag to choose the output format. By default, the output is in standard OWL JSON format, but users can set `--format=JSONLD` to receive the output as JSON-LD, adhering to linked data standards.

These enhancements reflect the mission of owl-builder by offering dynamic data transformation and flexible output formats to enhance usability.

## Implementation Details
- Update the main source file (src/lib/main.js) to:
  - Recognize the `--capital-cities` command.
  - Detect the optional `--country=<COUNTRY_NAME>` flag and filter the JSON output to include only capital cities of the specified country.
  - Detect the new optional `--format=<FORMAT>` flag. If the flag is set to `JSONLD`, transform the standard OWL JSON output into a JSON-LD format. If not specified or set to any other value, default to the standard OWL JSON format.
- Use inlined JSON data or available library functions to simulate data output.
- Ensure proper error handling in case an unsupported format is provided.

## Testing
- Modify the test file (tests/unit/main.test.js) to simulate the CLI invocation for:
  - Running the command without any optional flags and verifying that the full OWL ontology is produced.
  - Running the command with `--capital-cities --country=France` to ensure filtering works correctly.
  - Running the command with `--capital-cities --format=JSONLD` to validate that the output is in the correct JSON-LD format.
  - Running the command with a combination of `--capital-cities --country=France --format=JSONLD` for combined behavior.
- Add tests to verify that unsupported formats result in a clear error message or default to standard behavior.

## Documentation
- Update the README.md file to document the enhanced behavior of the `--capital-cities` command with new usage examples:
  - Without filtering and with default format: `node src/lib/main.js --capital-cities`
  - With filtering: `node src/lib/main.js --capital-cities --country=France`
  - With output format change: `node src/lib/main.js --capital-cities --format=JSONLD`
  - Combined usage: `node src/lib/main.js --capital-cities --country=France --format=JSONLD`
- Include example outputs and guidance on how each flag affects the JSON structure.

## Dependencies
- No additional external dependencies are required as the feature will utilize vanilla JavaScript for CLI argument parsing and JSON transformation.
