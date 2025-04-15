# CLI_TOOL Feature Enhancement Update

## Overview
This update expands the CLI tool’s capabilities by adding two new flags: **--ontology-transform** and **--owl-examples**. 

- **--ontology-transform**: When provided, the CLI checks if a raw JSON input is available following the flag. If valid JSON is supplied, the tool simulates transforming it into an OWL ontology by outputting a JSON object with an `ontology` key containing the transformed content. If no valid JSON is detected, a default transformation is applied.

- **--owl-examples**: This flag instructs the CLI to combine the existing capital cities output (generated with the `--capital-cities` flag) with additional demonstration data. The resulting JSON includes both the original capital cities data and an extra `results` key containing sample examples.

The update preserves backward compatibility with existing flags such as **--help**, **--diagnostics**, **--capital-cities**, **--crawl-data** and **--serve**.

## Implementation Details

### Source File Updates (`src/lib/main.js`):
- Extend the argument parser to detect **--ontology-transform** and **--owl-examples** flags.
- For **--ontology-transform**:
  - Check if the argument list includes this flag. 
  - Determine if a subsequent argument exists and if it can be parsed as JSON. If yes, simulate a transformation by wrapping the parsed JSON inside an object with the key `ontology` along with a timestamp. Otherwise, return a default transformed object.

- For **--owl-examples**:
  - First generate the standard capital cities OWL ontology (as done for `--capital-cities`). 
  - Augment this output by adding a `results` key containing sample demonstration data (e.g., a static array of example objects).

- Ensure that if multiple flags are provided, each is processed sequentially with clear, non-conflicting output.

### Testing Enhancements (`tests/unit/main.test.js`):
- Add a test case for **--ontology-transform**:
  - Verify that when provided with a valid JSON string, the CLI outputs an object containing an `ontology` key and a correct timestamp.
  - Also test the default transformation scenario when no JSON input is provided.

- Add a test case for **--owl-examples**:
  - Confirm that the output includes both the standard `capitalCities` data and an additional `results` key with demonstration data.

### Documentation Updates (`README.md`):
- Update the CLI usage section to document the newly added **--ontology-transform** and **--owl-examples** flags. 
- Provide clear examples on how to use these flags individually and in combination with existing options.

## Compliance and Code Style

- All new code will adhere to the existing coding standards as outlined in [CONTRIBUTING.md](./CONTRIBUTING.md).
- Functionality will be verified using `npm test` ensuring integration with existing features without regression.
- Documentation and testing updates will be applied consistently across the repository to maintain clarity and ease of maintenance.
