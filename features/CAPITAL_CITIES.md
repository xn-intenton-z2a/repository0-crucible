# CAPITAL_CITIES Feature Specification

## Overview

This feature adds a new CLI command `--capital-cities` to the repository. It enables users to generate an OWL ontology that specifically represents world capital cities. The command supports several options:

- **Filtering:** `--country=<COUNTRY_NAME>` to limit results to a given country.
- **Formatting:** `--format=<FORMAT>` to output the results in either standard OWL JSON or JSON-LD format.
- **Sorting:** `--sort=<ORDER>` to sort the list in ascending (`asc`) or descending (`desc`) order. In addition, the feature validates the sort parameter and provides an informative error if an invalid value is provided.

This feature aligns with the mission of providing simple yet robust tools for managing OWL ontologies derived from public data sources.

## Implementation Details

### Source Code Modifications (src/lib/main.js)

- Add a new branch in the CLI command parser that checks for the `--capital-cities` flag.
- Parse additional CLI arguments for filtering (--country), formatting (--format), and sorting (--sort) options.
- Implement functionality to construct an OWL ontology JSON object dedicated to capital cities. This may involve a simulated data source or a subset of the existing data.
- Validate the sort order parameter; if an invalid sort order is provided, output a clear error message.

### Testing (tests/unit/main.test.js)

- Create and/or update unit tests to ensure:
  - The `--capital-cities` command produces a valid OWL ontology JSON containing capital cities.
  - Filtering by country works as expected.
  - Proper output formatting is applied when the `--format` option is used.
  - Sorting behavior is correctly implemented, including error handling for invalid sort parameters.

### Documentation (README.md)

- Update the README file with usage examples for the new `--capital-cities` command. Include sample commands and expected JSON output.
- Provide detailed instructions on the available parameters and error messages.

## Future Considerations

- Expand filtering options (e.g., by continent) if additional data becomes available.
- Allow integration with external APIs to fetch real-time capital cities data.

## Value and Alignment with Mission

This feature enhances the CLI tool by expanding its capabilities in generating specialized OWL ontologies. It improves user experience with added flexibility and robust error handling, in line with the mission of providing resilient tools for managing OWL ontologies.