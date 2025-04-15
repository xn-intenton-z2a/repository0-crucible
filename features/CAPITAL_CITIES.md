# Overview

This update refines the CAPITAL_CITIES feature to fully support additional CLI flags for improved output customization. The feature will parse extra arguments to filter the list of capital cities by country, sort the output in ascending or descending order, and provide different output formats (JSON and JSON-LD). This enhancement offers a more dynamic and user-directed experience, aligning with the mission of owl-builder to deliver versatile tools for generating OWL ontologies.

# Implementation Details

- **CLI Parsing:**
  - Update the `--capital-cities` option in the source file (`src/lib/main.js`).
  - Extend the parser to recognize the following flags:
    - `--country=<COUNTRY_NAME>`: Filters the capital cities to those matching the specified country.
    - `--sort=<ORDER>`: Accepts values `asc` or `desc` to order the list accordingly. If an invalid order is provided, an error message should be shown.
    - `--format=<FORMAT>`: Accepts `json` (default) or `jsonld` to dictate the output format.

- **Output Generation:**
  - Enhance the response so that when any of the new flags are provided, the static list of capital cities is processed accordingly before output.
  - When filtering by country, only capitals matching the provided country should be displayed.
  - When sorting is applied, the capitals list should be sorted as specified.
  - The format flag should affect the structure of the output (plain JSON or JSON-LD structure with context metadata).

# Testing

- **Unit Tests:**
  - Update the test cases in `tests/unit/main.test.js` to include scenarios where:
    - A country filter is applied (e.g., `--capital-cities --country=USA`).
    - Sorting is applied with valid orders (both `asc` and `desc`).
    - The output format is toggled between `json` and `jsonld`.
    - Invalid parameter values for `--sort` or `--format` trigger clear error messages.

# Documentation

- **README Update:**
  - Revise the `README.md` to document new usage examples for the `--capital-cities` command. Include sample commands such as:
    ```bash
    node src/lib/main.js --capital-cities --country=France
    node src/lib/main.js --capital-cities --format=jsonld --sort=asc
    ```
  - Explain the purpose and usage of each additional flag.

# Alignment with Mission

This update enhances the owl-builder CLI tool by providing users with greater control over the output of the capital cities ontology. The improvements emphasize flexibility, precise data retrieval, and format versatility, all of which resonate with owl-builder's mission to deliver a dependable and user-centric tool for managing OWL ontologies.