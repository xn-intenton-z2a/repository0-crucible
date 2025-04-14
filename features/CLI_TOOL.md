# CLI_TOOL Feature Enhancement

## Overview
This enhancement updates the existing CLI tool to implement missing functionality as described in the project guidelines. In addition to the pre-existing `--capital-cities` flag, the tool will now support three new flags:

- `--ontology-transform`: Simulates the transformation of raw JSON input into an OWL ontology and returns a JSON object with an `ontology` key.
- `--owl-examples`: Consolidates legacy OWL examples (e.g., CAPITAL_CITIES) into a unified command that outputs a JSON object containing keys such as `capitalCities` and additional example results.
- `--data-crawl`: Simulates the crawling of public data sources, returning dummy public records in a JSON structure with a `crawledData` key.

The implementation will be done within a single source file (`src/lib/main.js`), with corresponding updates to tests (`tests/unit/main.test.js`), documentation (`README.md`) and dependency verification if needed.

## Functionalities
### Ontology Transformation
- Detect the `--ontology-transform` flag in command line arguments.
- If present, check for optional raw JSON input and simulate transforming it into an OWL ontology output.
- Output a JSON object with an `ontology` key containing the transformation result, along with appropriate messaging if input is absent.

### OWL Examples
- Consolidate and extend the original CAPITAL_CITIES command into a unified flag `--owl-examples` that provides a broader set of demonstration data.
- Output a JSON object containing keys like `capitalCities` and additional results such as `results` to illustrate extended examples.

### Data Crawl Simulation
- Introduce the `--data-crawl` flag to simulate a web crawl on free open public data sources with dummy record data.
- Return a JSON response containing a `crawledData` key, filled with simulated public records.

## Implementation Details
### Source Code Updates (`src/lib/main.js`)
- Extend the argument parser to detect `--ontology-transform`, `--owl-examples`, and `--data-crawl` along with preserving backward compatibility for `--capital-cities`.
- Implement separate conditional branches for each flag. If multiple flags are provided, process them in a defined order (e.g., sequentially).
- Ensure that for the `--ontology-transform` flag, the program accepts raw JSON if provided; otherwise, simulate a default transformation.

### Testing Enhancements (`tests/unit/main.test.js`)
- Add new test cases in addition to the existing `--capital-cities` tests:
  - Verify that running with `--ontology-transform` produces a JSON output containing the `ontology` key.
  - Confirm that using the `--owl-examples` flag returns JSON with keys `capitalCities` and `results`.
  - Validate that invoking `--data-crawl` outputs a JSON object with the `crawledData` key containing dummy public records.

### Documentation Updates (`README.md`)
- Update CLI usage examples to include the new flags and provide clear instructions on how each flag functions.
- Detail in the documentation how these commands serve the mission of owl-builder by simulating dynamic OWL ontology processing and public data crawling.

## Compliance & Testing
- Ensure that all changes adhere to coding styles and guidelines provided in CONTRIBUTING.md.
- Run tests using `npm test` ensuring all new functionality returns the correct JSON structure and that existing functionalities remain intact.
- Maintain the self-contained nature of the feature within the current repository structure (only updates to source, test, readme and dependency files are permitted).
