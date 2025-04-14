# CLI_TOOL Feature Enhancement

## Overview
This feature extends the existing CLI tool to include additional functionality for dynamic OWL ontology processing and data simulation. In addition to the pre-existing `--capital-cities` option, the following new flags will be implemented:

- `--ontology-transform`: Accepts raw JSON input and simulates transforming it into an OWL ontology. The output will be a JSON object with an `ontology` key including the simulated transformation result. If no input is provided, a default transformation will be applied.

- `--owl-examples`: Consolidates and extends the legacy capital cities example. This flag will output a JSON object combining the original `capitalCities` data with additional demonstration results under keys like `results`.

- `--data-crawl`: Simulates crawling free open public data sources and returns dummy public records. The output will be a JSON object with a `crawledData` key.

The tool will process multiple flags sequentially if provided, ensuring backward compatibility for the `--capital-cities` functionality.

## Implementation Details

### Source Code Updates (`src/lib/main.js`)
- Extend the argument parser to detect `--ontology-transform`, `--owl-examples`, and `--data-crawl` alongside the original `--capital-cities` flag.
- For `--ontology-transform`, check if the CLI receives raw JSON input; otherwise, apply a default transformation simulation.
- For `--owl-examples`, combine and enhance output with both `capitalCities` and additional `results` data.
- For `--data-crawl`, simulate the process of retrieving dummy public records and output a JSON structure containing `crawledData`.
- Ensure the CLI processes multiple flags in a defined sequential order.

### Testing Enhancements (`tests/unit/main.test.js`)
- Add test cases to verify that invoking `--ontology-transform` returns a JSON object with an `ontology` key. 
- Ensure that using `--owl-examples` produces JSON output containing both `capitalCities` and `results` keys.
- Validate that the `--data-crawl` flag returns a JSON object with a correctly populated `crawledData` key.

### Documentation Updates (`README.md`)
- Update the CLI usage section to describe the new flags, their expected inputs, and outputs.
- Provide examples of command line invocations for each new flag, demonstrating their intended behavior.

## Compliance & Testing
- Follow the coding style and guidelines as outlined in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.
- Run all tests with `npm test` to ensure all functionalities produce the correct output without interfering with existing features.
- Ensure all changes remain self-contained within the existing repository files (source, test, README, and dependencies).
