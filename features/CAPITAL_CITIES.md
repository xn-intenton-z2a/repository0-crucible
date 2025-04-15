# CAPITAL_CITIES Feature Specification

## Overview
This feature implements and enhances the CLI command `--capital-cities`, which outputs an OWL ontology of world capital cities filtered and formatted as JSON. In addition to the existing optional flags, it adds a new flag `--sort` to allow sorting of the output list alphabetically. The user can control the sort order by specifying `asc` or `desc`. 

## Implementation
- **Source File Updates (src/lib/main.js):**
  - Add a new branch that listens for the `--capital-cities` flag.
  - Parse additional CLI arguments: 
    - `--country=<COUNTRY_NAME>` to filter by country.
    - `--format=<FORMAT>` to output in standard OWL JSON or JSON-LD format (transformation logic already in place).
    - `--sort=<ORDER>` where `<ORDER>` can be either `asc` for ascending or `desc` for descending, to sort the list of capital cities alphabetically.
  - Integrate sorting logic into the workflow: after filtering, if the sort flag is provided, sort the resulting list of capital cities accordingly.

## Testing
- **Test File Updates (tests/unit/main.test.js):**
  - Add test cases to simulate the CLI invocation with the `--capital-cities` option combined with the new `--sort` flag:
    - Verify that providing `--sort=asc` returns the capital cities in ascending order.
    - Verify that providing `--sort=desc` returns the capital cities in descending order.
  - Ensure existing tests for the `--capital-cities` feature (including usage of `--country` and `--format`) remain valid.

## Documentation
- **README.md Updates:**
  - Add usage examples for the enhanced command:
    - Basic usage: `node src/lib/main.js --capital-cities`
    - Filtering by country: `node src/lib/main.js --capital-cities --country=France`
    - Changing format: `node src/lib/main.js --capital-cities --format=JSONLD`
    - Sorting output: 
      - Ascending: `node src/lib/main.js --capital-cities --sort=asc`
      - Descending: `node src/lib/main.js --capital-cities --sort=desc`
  - Describe the expected JSON output structure, error messages, and behavior when using unexpected sort values.

## Dependencies
- No additional dependencies are required. The implementation uses existing JavaScript libraries for CLI argument parsing and built-in array sorting mechanisms.

This update builds on the existing CAPITAL_CITIES functionality and enhances it with a useful and achievable value-add: enabling users to receive a sorted list of capital cities directly from the CLI, aligning with the mission of creating user-friendly tools for OWL ontology management.