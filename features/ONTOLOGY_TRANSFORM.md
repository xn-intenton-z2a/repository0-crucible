# Ontology Transform Update

## Overview
This update refines the existing ontology transform functionality by introducing support for two new CLI flags: `--ontology-transform` and `--owl-examples`. The `--ontology-transform` flag accepts a JSON string as its argument, wraps the parsed JSON inside an `ontology` key, and appends a `generatedAt` timestamp. If the JSON is invalid or missing, a default error object is returned. Optionally, when the `--owl-examples` flag is provided alongside the transform flag, the output is augmented with a `results` key containing demonstration sample data. This update aims to enhance custom ontology transformations without altering other core CLI functionalities.

## Implementation Details
### Source File (`src/lib/main.js`)
- **Flag Addition**:
  - Update the valid options set to include `--ontology-transform` and `--owl-examples`.
- **`--ontology-transform` Flag Handling**:
  - Detect the flag and retrieve the next argument as the JSON input.
  - Attempt to parse the JSON; if valid, wrap it in an object of the form:
    ```json
    {
      "ontology": <parsed_JSON>,
      "generatedAt": "<current ISO timestamp>"
    }
    ```
  - If the JSON is invalid or missing, output:
    ```json
    {
      "ontology": {"error": "Invalid or missing input"},
      "generatedAt": "<current ISO timestamp>"
    }
    ```
- **`--owl-examples` Flag Handling**:
  - When this flag is provided in combination with a transform command, append a `results` key to the output. For example:
    ```json
    "results": [{"sample": "example data"}]
    ```
- **Placement**:
  - The new flags are checked before other command branches so that they override and provide dedicated transformation behavior.

### Test File Updates (`tests/unit/main.test.js`)
- **New Test Cases**:
  - Verify that a valid JSON input with `--ontology-transform` returns an output containing the parsed JSON under the `ontology` key and a valid `generatedAt` timestamp.
  - Verify that invalid or missing JSON input yields the default error object.
  - Check that when both `--ontology-transform` and `--owl-examples` are supplied, the final output includes a `results` key with demonstration data.

### Documentation Updates (`README.md`)
- **CLI Usage Section**:
  - Add a description for the `--ontology-transform` flag with examples showing how to pass valid and invalid JSON inputs.
  - Document the optional `--owl-examples` flag and how it augments the CLI output with additional sample data.

### Dependencies File Updates (`package.json`)
- No additional dependencies are required. The current dependencies (including `zod` for JSON schema validation) suffice.

## Roll-out Strategy
- **Backward Compatibility**:
  - The new code path is isolated to the transformation command; if neither flag is provided, existing CLI behavior remains unchanged.
- **Testing**:
  - Run the entire test suite (`npm test`) to ensure all cases pass, including the new transformation and augmentation behaviors.
- **Manual Testing**:
  - Test via the command line:
    ```bash
    node src/lib/main.js --ontology-transform '{"sample": "data"}'
    node src/lib/main.js --ontology-transform '{"sample": "data"}' --owl-examples
    ```

This enhancement aligns with the mission of providing dynamic and accurate OWL ontology management while keeping the feature set lean and focused.