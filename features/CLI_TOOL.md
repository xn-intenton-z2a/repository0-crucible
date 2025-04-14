# CLI_TOOL Feature Enhancement Update

## Overview
This update refines the existing CLI tool to incorporate additional data transformation and simulation capabilities. In addition to the current `--capital-cities` functionality, the tool will now support:

- **--ontology-transform**: Processes raw JSON input to simulate a transformation into an OWL ontology. If no input is provided, a default transformation simulation is applied.
- **--owl-examples**: Enhances the legacy capital cities functionality by combining the original data with new demonstration outputs under a `results` key.
- **--data-crawl**: Simulates crawling open public data sources and returns a JSON object containing a `crawledData` key with dummy public records.

This update keeps backward compatibility and allows sequential processing of multiple flags provided in a single command invocation.

## Implementation Details

### Source Code Updates (`src/lib/main.js`)
- Extend the argument parser to detect new flags (`--ontology-transform`, `--owl-examples`, `--data-crawl`) alongside `--capital-cities`.
- For `--ontology-transform`, check if raw JSON input is supplied. If so, simulate an OWL transformation; else, apply a default transformation.
- For `--owl-examples`, merge the output from `capitalCities` with additional dummy data under a `results` key and output a consolidated JSON object.
- For `--data-crawl`, simulate crawling public data and output a JSON object with a `crawledData` key.
- Ensure the flags are processed in a defined sequential order to maintain consistency in output.

### Testing Enhancements (`tests/unit/main.test.js`)
- Add test cases to verify that using `--ontology-transform` returns an object containing an `ontology` key with expected transformation results.
- Ensure that `--owl-examples` outputs a JSON object containing both `capitalCities` and `results` keys.
- Validate that the `--data-crawl` flag returns a JSON object containing the `crawledData` key populated with simulated data.

### Documentation Updates (`README.md`)
- Update the CLI usage section to document the new flags, including examples and expected outputs.
- Provide updated command line examples to illustrate how to invoke each new flag individually and in combination.

## Compliance & Testing
- Follow the coding and documentation guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md).
- Run all tests using `npm test` to ensure that the new functionality integrates seamlessly with the existing CLI features.
- Maintain consistency in code style and structure throughout the implementation.
