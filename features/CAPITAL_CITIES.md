# CAPITAL_CITIES Feature Specification

## Overview
This feature introduces a CLI command `--capital-cities` that outputs a JSON file containing a sample OWL ontology of capital cities. In this enhanced version, users can optionally filter the output by country using a `--country=NAME` flag. This aligns with the mission of owl-builder by demonstrating a dynamic transformation of public data into an OWL ontology and providing filtering capability to target specific datasets.

## Implementation Details
- Update the main source file (src/lib/main.js) to check for the `--capital-cities` command.
- Detect an optional parameter `--country=<COUNTRY_NAME>`. If provided, filter the inlined (or generated) JSON data to include only the capital cities in the specified country.
- If the filter is not provided, output the full OWL ontology example for capital cities.
- The JSON output should maintain a clear hierarchical structure: include city names, country names, and other metadata necessary for an OWL ontology.
- Use existing inline JSON data or library functions to simulate the data output.

## Testing
- Modify the test file (tests/unit/main.test.js) to simulate running the CLI with `--capital-cities` and, when relevant, the `--country` flag.
- Add tests that verify:
  - The basic command outputs the expected JSON structure containing capital cities.
  - The `--capital-cities` command with the `--country` option filters the output correctly to include only capitals for the specified country.

## Documentation
- Update the README.md file to document the enhanced `--capital-cities` command, detailing its usage with examples:
  - Without filtering: `node src/lib/main.js --capital-cities`
  - With filtering: `node src/lib/main.js --capital-cities --country=France`
- Include sample output and describe how the filtering improves data relevance and user experience.

## Dependencies
- No new external dependencies are required. This feature continues to use vanilla JavaScript for CLI argument parsing and JSON manipulation.
