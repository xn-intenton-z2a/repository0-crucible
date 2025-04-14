# CLI_TOOL Feature Enhancement

## Overview
This feature refines and updates the existing CLI tool to enhance the simulation of OWL ontology transformations and public data source crawling. It consolidates the previous functionalities into a unified interface that aligns with the mission of owl-builder. The updates will be achieved by modifying the source file, updating the test suite, and refining documentation.

## Functionalities
### Ontology Transform
- Implement a flag `--ontology-transform` that simulates the conversion of a raw JSON input into an OWL ontology format.
- Output should be a JSON object with an `ontology` key, which contains the simulated transformation result.

### OWL Examples
- Merge the previous CAPITAL_CITIES and OWL_QUERY functionalities into a single flag `--owl-examples`.
- The CLI output should be a JSON combining example data fields like `capitalCities` and `results`, serving as a demonstration of the ontology examples.

### Data Crawl Simulation
- Introduce a new flag `--data-crawl` that simulates crawling free open public data sources.
- The command should return a JSON object with a `crawledData` key containing dummy record data.

## Implementation Details
### Source Code Changes (`src/lib/main.js`)
- Update the CLI argument parser to detect and correctly process the three flags: `--ontology-transform`, `--owl-examples`, and `--data-crawl`.
- Ensure proper handling when multiple flags are provided, either processing sequentially or prioritizing based on command order.
- Maintain existing CLI structure and improve inline documentation.

### Testing (`tests/unit/main.test.js`)
- Add unit tests to validate that:
  - Running with `--ontology-transform` produces a JSON with an `ontology` key.
  - Running with `--owl-examples` returns a JSON with keys `capitalCities` and `results`.
  - Running with `--data-crawl` outputs a JSON with a `crawledData` key containing simulated records.

### Documentation (`README.md`)
- Update the usage section with examples of the new flags:
  - `node src/lib/main.js --ontology-transform`
  - `node src/lib/main.js --owl-examples`
  - `node src/lib/main.js --data-crawl`
- Explain the expected outputs and how they contribute to the mission of providing dynamic OWL ontology simulations.

## Testing & Compliance
- Use `npm test` to ensure all functionality passes the updated tests.
- Confirm that changes adhere to the guidelines in CONTRIBUTING.md and align with the mission stated in MISSION.md.
