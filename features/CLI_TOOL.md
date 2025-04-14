# CLI_TOOL Feature Specification

## Overview
This feature consolidates and enhances the repository's CLI functionalities into a single unified interface. The new CLI tool will support multiple operations:

- **Ontology Transform:** Simulates the transformation of raw JSON input into an OWL ontology structure.
- **OWL Examples:** Merges the previous CAPITAL_CITIES and OWL_QUERY functionalities into one flag that outputs a combined example of OWL ontologies (e.g., capital cities and query result examples).
- **Data Crawl:** Introduces a new CLI flag (`--data-crawl`) to simulate crawling free, open public data sources and returning dummy JSON data, fulfilling the mission requirement to showcase crawling capabilities.

This consolidation improves maintainability and user experience by centralizing all CLI options into a single, coherent tool.

## Changes

### Source Code (`src/lib/main.js`)
- Update the CLI argument parser to detect the following flags:
  - `--ontology-transform`: When provided, simulate a transformation of a sample JSON input to an ontology JSON structure.
  - `--owl-examples`: When provided, output a JSON containing combined examples (capital cities and query results) representing OWL ontology examples.
  - `--data-crawl`: When provided, simulate crawling open public data sources, returning dummy data (e.g., an array of records with sample values).
- Ensure that if multiple flags are provided, each is handled properly or the tool prioritizes one based on command order.

### Test Suite (`tests/unit/main.test.js`)
- Add or update unit tests to:
  - Verify that running the CLI with `--ontology-transform` outputs a JSON containing an `ontology` key with the simulated transformation result.
  - Verify that running the CLI with `--owl-examples` produces a JSON with keys such as `capitalCities` and `results` (merging former CAPITAL_CITIES and OWL_QUERY functionalities).
  - Verify that running the CLI with `--data-crawl` outputs a JSON with a key like `crawledData` containing dummy records.

### Documentation (`README.md`)
- Update the Usage section to include examples on how to use the new unified CLI tool:
  - Example commands for each flag:
    - `node src/lib/main.js --ontology-transform`
    - `node src/lib/main.js --owl-examples`
    - `node src/lib/main.js --data-crawl`
- Document the expected output for each command and how they align with the mission of transforming and retrieving open public data.

### Dependencies (`package.json`)
- No additional dependencies are introduced. The enhancements build upon existing modules and libraries.

## Testing
- **Unit Testing:** Run `npm test` to verify that each CLI flag correctly outputs the expected JSON structures.
- **Manual Testing:** Invoke the CLI manually with the new flags to observe the dummy data outputs and ensure proper integration.

## Documentation
- Update all related documentation and inline comments to reflect the consolidated CLI functionalities.
- Ensure the CONTRIBUTING.md guidelines are followed when adding new tests or modifying the CLI behavior.

This consolidated feature supports the mission of owl-builder by streamlining data transformations, query examples, and data retrieval simulations in a single CLI tool.
