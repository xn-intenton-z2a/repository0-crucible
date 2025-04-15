# CAPITAL_CITIES Feature Enhancement

## Overview
This update refines the CAPITAL_CITIES feature to fully implement advanced options as described in the guidelines. Users can now filter the list of capital cities by country, choose the desired output format (JSON or JSON-LD), and sort the capitals in ascending or descending order. This enhancement aligns with the mission of owl-builder by providing a more flexible and user-friendly tool for generating OWL ontologies from public data sources.

## Implementation Details
- **CLI Updates:**
  - Modify the `--capital-cities` option in `src/lib/main.js` to parse additional flags:
    - `--country=<COUNTRY_NAME>`: Filter the list to include only the capital cities from the specified country.
    - `--format=<FORMAT>`: Accept `json` (default) or `jsonld` to specify the output format.
    - `--sort=<ORDER>`: Sort the list in either `asc` or `desc` order. If an invalid order is provided, return an informative error message and exit gracefully.
  - Integrate new logic to filter and sort the static list of capitals accordingly.

- **Error Handling:**
  - For invalid values on the `--sort` or `--format` flags, display clear error messages.

- **Testing:**
  - Update `tests/unit/main.test.js` with unit tests to cover:
    - Default output when no extra parameter is provided.
    - Filtering by country using the `--country` flag.
    - Output format verification by using the `--format` flag in both `json` and `jsonld` modes.
    - Sorting functionality with valid (`asc`, `desc`) and invalid sort orders.

- **Documentation:**
  - Revise the `README.md` to include updated usage examples for the `--capital-cities` command, demonstrating the new flags:
    ```bash
    node src/lib/main.js --capital-cities --country=France
    node src/lib/main.js --capital-cities --format=jsonld --sort=asc
    ```

## Alignment with Mission
This enhancement deepens the tool's capability to transform public data sources into structured OWL ontologies by allowing users to tailor the output to their specific needs. The increased flexibility and robust error handling contribute directly to the mission of making owl-builder a user-centric, dependable CLI tool for managing ontology data.