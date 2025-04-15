# CAPITAL_CITIES Feature Specification

## Overview
This feature introduces a new CLI command `--capital-cities` that, when invoked, outputs a JSON file showcasing a sample OWL ontology containing capital cities. This aligns with the mission of owl-builder by providing a concrete example of transforming public data into an OWL ontology.

## Implementation Details
- Update the main source file (src/lib/main.js) to check for the argument `--capital-cities`.
- When the command is detected, output a formatted JSON representation of an OWL ontology capturing essential details for capital cities (e.g., city names, countries, etc.).
- Utilize existing library functions if available or inline JSON data to simulate the output.

## Testing
- Extend the test file (tests/unit/main.test.js) to include a test that simulates passing the `--capital-cities` argument and verifies that the output contains the  expected OWL JSON structure.

## Documentation
- Update the README.md file to include a section on usage of the `--capital-cities` command. Provide code examples and expected output to clearly demonstrate how the feature works and its purpose in the context of the repository.
- Ensure the documentation reflects the updated CLI behavior and overall mission alignment.

## Dependencies
No additional external dependencies are needed for this feature. It uses vanilla JavaScript to append the new behavior.
