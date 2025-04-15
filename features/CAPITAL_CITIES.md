# CAPITAL_CITIES Feature Specification

## Overview
This feature provides an enhanced CLI command `--capital-cities` that outputs an OWL ontology of world capital cities as a JSON file. The functionality includes optional flags:

- `--country=<COUNTRY_NAME>`: Filters the ontology to include only the capital cities of the specified country.
- `--format=<FORMAT>`: Changes the output format. The default is standard OWL JSON format, but if set to `JSONLD`, the output will be transformed into JSON-LD format compliant with linked data standards.

An additional error handling mechanism is included to manage unsupported format values, ensuring users receive a clear error message or fallback to standard behavior.

## Implementation
- **Source File Updates (src/lib/main.js):**
  - Parse CLI arguments to detect `--capital-cities` along with optional `--country` and `--format` flags.
  - Implement filtering logic for the `--country` flag using inlined JSON or library functions.
  - Add transformation logic to convert OWL JSON output into JSON-LD when `--format=JSONLD` is specified.
  - Validate the format flag’s value and handle unsupported formats by providing an error message or defaulting to standard output.

## Testing
- **Test File Updates (tests/unit/main.test.js):**
  - Create tests simulating different CLI invocations:
    - Default behavior: `node src/lib/main.js --capital-cities`
    - Filter by country: `node src/lib/main.js --capital-cities --country=France`
    - Format change: `node src/lib/main.js --capital-cities --format=JSONLD`
    - Combined usage: `node src/lib/main.js --capital-cities --country=France --format=JSONLD`
  - Include tests to verify error handling for unsupported format values.

## Documentation
- **README.md Updates:**
  - Provide usage examples for the enhanced command:
    - Without filtering: `node src/lib/main.js --capital-cities`
    - With filtering: `node src/lib/main.js --capital-cities --country=France`
    - With format change: `node src/lib/main.js --capital-cities --format=JSONLD`
    - Combined usage: `node src/lib/main.js --capital-cities --country=France --format=JSONLD`
  - Document the expected JSON output structure and the error messages when using unsupported formats.

## Dependencies
- No additional external dependencies required. The implementation uses vanilla JavaScript for argument parsing and JSON transformation, keeping the repository lightweight and in line with the project mission.
