# CAPITAL_CITIES Feature Specification

## Overview
This feature implements a new CLI option (`--capital-cities`) that outputs a JSON representation of a collection of capital cities as an example OWL ontology. This enhancement aligns with the mission of owl-builder by providing a tangible example of how open public data can be transformed and represented using the library.

## Changes
- Update the source file (`src/lib/main.js`) to detect the `--capital-cities` argument and output a JSON formatted list of capital cities.
- Modify the test suite (`tests/unit/main.test.js`) to include a new test case that ensures the CLI returns the expected JSON output when the `--capital-cities` flag is provided.
- Update the `README.md` to include usage instructions and examples for the new `--capital-cities` CLI option.
- No additional dependencies or files are introduced; only existing files are updated.

## Testing
- **Unit Testing:** A new test will invoke the CLI with `--capital-cities` and assert that the output JSON contains a key such as `capitalCities` with an expected list of cities.
- **CLI Testing:** Manually running the command `node src/lib/main.js --capital-cities` should display the correct JSON output.

## Documentation
- Update the `README.md` Usage section to include instructions on how to use the new flag.
- Clearly document the expected JSON structure to guide future enhancements and integrations.

This feature maintains consistency with the guidelines in CONTRIBUTING.md and contributes to the mission as described in MISSION.md.