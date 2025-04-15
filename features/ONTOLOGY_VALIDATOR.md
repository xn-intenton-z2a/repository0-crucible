# ONTOLOGY_VALIDATOR

## Overview

This feature introduces a new CLI flag, `--ontology-validate`, to validate input JSON against the expected OWL ontology schema. It leverages the existing `zod` dependency to ensure that the ontology JSON includes the required fields (`owl`, `data`, and `generatedAt`). This enhancement aligns with the mission of ensuring dynamic and accurate ontology management via the CLI tool.

## Implementation Details

- **Source File Updates (`src/lib/main.js`):**
  - Add a new flag check for `--ontology-validate`.
  - When the flag is present:
    - Look for the next argument as the input JSON.
    - Use `JSON.parse` to convert the string to an object. If parsing fails, output an error message indicating invalid JSON input.
    - Utilize the `zod` library to define a schema for the ontology object:
      - `owl`: a string
      - `data`: an array (expected to contain objects representing ontology data)
      - `generatedAt`: a string that is a valid ISO timestamp
    - If the object complies with the schema, log a confirmation message such as "Valid Ontology" along with the validated content.
    - If validation fails, output the validation errors.

## Testing

- **Test File Updates (`tests/unit/main.test.js`):**
  - Add new tests for the `--ontology-validate` flag:
    - Test with correct JSON input to check that validation passes and the success message is printed.
    - Test with malformed JSON input to ensure a proper error is returned.
    - Test with JSON missing required fields to ensure that validation errors are correctly output.

## Documentation

- **README File Updates (`README.md`):**
  - Update the CLI usage section to describe the new `--ontology-validate` flag and provide clear examples:
    - Example command using valid JSON:
      ```bash
      node src/lib/main.js --ontology-validate '{"owl": "capitalCities", "data": [{"country": "France", "capital": "Paris"}], "generatedAt": "2023-10-05T12:00:00.000Z"}'
      ```
    - Example command using invalid JSON to demonstrate error output.

## Roll-out Strategy

- Commit changes to the source code, test cases, and README file.
- Run `npm test` to ensure that all tests pass and that the new functionality works as expected.
- Perform manual testing by invoking the new flag with both valid and invalid inputs.
