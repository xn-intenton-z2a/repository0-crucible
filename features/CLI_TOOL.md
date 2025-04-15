# CLI_TOOL Feature Enhancement Update

## Overview
This feature update extends the CLI tool functionality by adding support for the new flags:

- **--ontology-transform**: Accepts an optional JSON string argument. If a valid JSON is provided, the CLI transforms it into an OWL ontology format by wrapping the object in an `ontology` key along with a timestamp. If the JSON input is invalid or missing, it returns a default transformed ontology.

- **--owl-examples**: Augments the existing capital cities output by adding a static `results` key containing demonstration data. This flag allows users to see combined output that includes both the standard `capitalCities` data and sample examples.

The new flags will be processed sequentially, ensuring that when multiple flags are provided, each one is handled in a clear and non-conflicting sequence with consistent output.

## Source File Updates (`src/lib/main.js`)
- Extend the argument parser to detect the **--ontology-transform** and **--owl-examples** flags.
- For **--ontology-transform**:
  - Check for the flag in the arguments. If a subsequent argument exists and can be parsed as valid JSON, wrap it in an object with an `ontology` key and include a timestamp.
  - If no valid JSON is provided, output a default transformed object with pre-determined content and a timestamp.
- For **--owl-examples**:
  - Generate the standard capital cities ontology (as with the **--capital-cities** flag).
  - Augment the output by adding a `results` key with sample demonstration data.
- Ensure any combination of existing and new flags triggers full processing without conflict.

## Testing Enhancements (`tests/unit/main.test.js`)
- Add unit tests for **--ontology-transform** to confirm:
  - Valid JSON input yields an output object containing an `ontology` property with a proper timestamp.
  - Missing or invalid JSON input results in the default transformation behavior.
- Add unit tests for **--owl-examples** to ensure that:
  - The output comprises both the standard `capitalCities` data and an additional `results` key housing sample example data.

## Documentation Updates (`README.md`)
- Update the CLI usage documentation to include the new **--ontology-transform** and **--owl-examples** flags.
- Provide clear usage examples in the README to demonstrate how the new flags interact with existing options.

## Compliance and Integration
- Ensure that the code modifications adhere to the coding guidelines stipulated in [CONTRIBUTING.md](./CONTRIBUTING.md).
- Verify consistency with the mission outlined in [MISSION.md](./MISSION.md) by demonstrating enhanced data transformation and output clarity.
- Confirm all changes through existing test suites by running `npm test`, ensuring backward compatibility with current functionalities.
