# CAPITAL_CITIES Feature Enhancement

## Overview
This update extends the existing CAPITAL_CITIES feature to support advanced options for generating an OWL ontology of capital cities. In addition to the basic output, the feature now supports optional parameters to filter by country, select the output format (JSON or JSON-LD), and sort the results in ascending or descending order. The feature also includes robust error handling for invalid sort parameters.

## Implementation Details
- Modify the CLI branch for `--capital-cities` in `src/lib/main.js` to parse additional flags:
  - `--country=<COUNTRY_NAME>`: Filter the list to include only capital cities from the specified country.
  - `--format=<FORMAT>`: Allow output in two formats: `json` (default OWL JSON) or `jsonld` for JSON-LD representation.
  - `--sort=<ORDER>`: Sort the list of capital cities in either `asc` or `desc` order. If an invalid order is provided, display an informative error message and exit gracefully.
- Update the internal simulation of the data to support these operations: filtering and ordering of the array elements.
- Ensure that the new implementation remains backward compatible when no additional option is provided.

## Testing
- Update the unit tests in `tests/unit/main.test.js` to cover:
  - Expected output when no additional parameter is provided.
  - Handling of the `--country` flag to correctly filter results.
  - Behavior of the `--format` flag by comparing output structure in both `json` and `jsonld` modes.
  - Sorting functionality by providing valid (`asc`, `desc`) and invalid sort orders and verifying error messages.

## Documentation
- Revise the README in `README.md` to include updated usage examples for the `--capital-cities` command. For instance:
  ```bash
  node src/lib/main.js --capital-cities --country=France
  node src/lib/main.js --capital-cities --format=jsonld --sort=asc
  ```

## Alignment with Mission
This enhancement solidifies the mission of owl-builder by providing additional flexibility in generating tailored OWL ontologies from public data sources. The refinement makes the tool more robust and user-friendly, aligning with the core objective of transforming live data into structured and queryable OWL representations.
