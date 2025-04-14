# CLI_TOOL Feature Enhancement

## Overview
This feature updates the existing CLI tool to fully align with the mission of owl-builder by incorporating new simulation capabilities. The tool will now support three distinct command line flags for ontology transformation, repository example outputs, and data crawling simulation. These enhancements are intended to demonstrate dynamic OWL ontology processing from public data sources while maintaining the simplicity and reusability of the repository.

## Functionalities
### Ontology Transformation
- Introduce a new flag `--ontology-transform` that takes raw JSON input (if provided) and simulates its transformation into an OWL ontology. The output will be a JSON object with an `ontology` key containing the conversion result.

### OWL Examples
- Merge previous OWL demonstration functionalities (e.g., CAPITAL_CITIES) into a unified flag `--owl-examples`. With this flag, the CLI will output a JSON object combining example data fields such as `capitalCities` and additional example keys like `results`.

### Data Crawl Simulation
- Add a flag `--data-crawl` to simulate crawling free open public data sources. The command should return a JSON object with a `crawledData` key containing dummy public records to illustrate the capability.

## Implementation Details
### Source File (`src/lib/main.js`)
- Modify the argument parser to detect the new flags: `--ontology-transform`, `--owl-examples`, and `--data-crawl`.
- Implement conditional branches that handle these flags, ensuring that if multiple flags are supplied, they are processed appropriately (either sequentially or based on a defined order).
- Maintain backwards compatibility with the existing `--capital-cities` functionality.

### Testing (`tests/unit/main.test.js`)
- Update tests to include new cases verifying that:
  - Running with `--ontology-transform` produces JSON with an `ontology` key.
  - Running with `--owl-examples` returns JSON containing keys like `capitalCities` and `results`.
  - Running with `--data-crawl` outputs JSON with a `crawledData` key and dummy record data.

### Documentation (`README.md`)
- Update the usage examples to list the new flags and describe the expected outputs for each.
- Ensure that the examples are clear how each flag contributes to demonstrating owl-builder's mission.

## Testing & Compliance
- Run `npm test` to execute the unit tests ensuring all new flags return the correct JSON structure.
- Verify that inline code changes, test modifications and readme updates follow the coding style guidelines outlined in CONTRIBUTING.md.
- Confirm that the feature contributes to simulating dynamic OWL ontology transformations and public data crawling as part of the mission.
