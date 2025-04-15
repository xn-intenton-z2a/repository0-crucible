# CLI_TOOL Feature Enhancement Update

## Overview
This update enhances the CLI tool by expanding its data processing capabilities with three new flags. In addition to the existing `--capital-cities`, users can now use:

- **--ontology-transform**: Processes raw JSON input if provided to simulate transforming the data into an OWL ontology; otherwise applies a default transformation.
- **--owl-examples**: Combines the original capital cities output with additional demonstration data under a `results` key.
- **--data-crawl**: Simulates crawling open public data sources and returns JSON with a `crawledData` key.

All flags will be processed sequentially if multiple options are provided in a single command invocation. This update maintains backward compatibility and adheres to the mission of providing dynamic OWL ontology capabilities from public data.

## Implementation Details
- **Source File Updates (`src/lib/main.js`):**
  - Extend the argument parser to detect three new flags: `--ontology-transform`, `--owl-examples`, and `--data-crawl`.
  - For `--ontology-transform`, check if raw JSON input is provided via command-line argument; if yes, simulate transforming the JSON into an OWL ontology, else apply a default transformation.
  - For `--owl-examples`, merge the output from the `--capital-cities` flag with additional dummy data placed under a new key `results`.
  - For `--data-crawl`, simulate fetching public data by generating a JSON object with a `crawledData` key and dummy content.
  - Ensure the sequential processing of flags with clear and consistent output formatting.

- **Testing Enhancements (`tests/unit/main.test.js`):**
  - Add test cases to verify that `--ontology-transform` returns a JSON object containing an `ontology` key with expected data.
  - Add tests ensuring that `--owl-examples` outputs a JSON object with both `capitalCities` and `results` keys correctly populated.
  - Validate that using `--data-crawl` yields a JSON object containing the `crawledData` key with simulated crawl data.

## Documentation Updates
- **README.md:**
  - Update the CLI usage section to document the new flags, including clear examples of how to invoke them individually or in combination.
  - Include example command lines illustrating the new functionality, and update expected outputs.

## Compliance, Testing and Code Style
- Ensure all new code follows the coding standards described in [CONTRIBUTING.md](./CONTRIBUTING.md).
- Verify functionality using `npm test` to ensure integration with the existing CLI features without breaking backward compatibility.
- Maintain consistency in code style, documentation, and testing coverage as per the repository guidelines.
