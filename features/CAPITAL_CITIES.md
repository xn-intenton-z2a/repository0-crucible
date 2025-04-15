# CAPITAL_CITIES Feature Update

## Overview
This update refines the existing CAPITAL_CITIES feature to fully implement the CLI command `--capital-cities`. This command will generate an OWL ontology JSON object representing world capital cities. The updated feature offers enhanced options including filtering by country, selecting output format (OWL JSON or JSON-LD), and sorting the results in ascending or descending order. It also provides robust error handling for invalid sort values.

## Implementation Details
- **Source Code (src/lib/main.js):**
  - Add a new branch to detect the `--capital-cities` flag after processing all other primary commands.
  - When `--capital-cities` is detected, parse additional CLI arguments:
    - `--country=<COUNTRY_NAME>`: Filter the dataset to include only capital cities from the specified country.
    - `--format=<FORMAT>`: Support output in `json` (standard OWL JSON) or `jsonld` (JSON-LD) formats.
    - `--sort=<ORDER>`: Sort the list of capital cities in either `asc` or `desc` order. If an invalid order is provided, output an informative error message.
  - The command will simulate a data source containing capital cities, constructing an OWL ontology with properties such as `source`, `description`, and a `data` array containing the capital cities entries.

## Testing
- **Unit Tests (tests/unit/main.test.js):**
  - Add tests to ensure that calling `--capital-cities` produces a valid OWL ontology JSON structure for capital cities.
  - Test that filtering by country accurately restricts the results.
  - Verify that the output format changes when the `--format` flag is used, including testing both accepted formats (json and jsonld).
  - Confirm that sorting works correctly for both ascending and descending orders, and that an invalid sort parameter triggers the correct error message.

## Documentation
- **README.md:**
  - Update the usage section with examples for the `--capital-cities` command:
    - Example usage with filtering:
      ```bash
      node src/lib/main.js --capital-cities --country=France
      ```
    - Example usage with format and sort options:
      ```bash
      node src/lib/main.js --capital-cities --format=jsonld --sort=asc
      ```
  - Clearly document the behavior and available parameters, as well as error messages for invalid inputs.

## Alignment with Mission
This refinement directly supports the mission of `owl-builder` by providing users an effective tool to generate and manage OWL ontologies derived from public data sources. It offers a targeted and valuable functionality that exemplifies the core capability of transforming live data into structured OWL representations.