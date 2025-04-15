features/ONTOLOGY_TRANSFORM.md
# features/ONTOLOGY_TRANSFORM.md
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

This enhancement aligns with the mission of providing dynamic and accurate OWL ontology management while keeping the feature set lean and focused.features/rejects/ISSUE_GENERATOR.md
# features/rejects/ISSUE_GENERATOR.md
# Issue Generator

This feature introduces an automated mechanism to generate detailed GitHub issues by leveraging the Chat Completions API. It enables maintainers to quickly obtain a series of well-structured issue descriptions for implementing new functionality or updating existing features. This aligns with the mission of rapidly building and iterating upon live, verified public data integration tools.

## Overview

- **Automated Issue Generation:** Submit descriptive prompts to the Chat Completions API to generate a series of actionable GitHub issues.
- **Template Customization:** Allow users to define custom prompt templates and parameters to influence the issue generation style and content.
- **CLI Integration:** Expose a new CLI command (e.g., `--gen-issues`) to trigger the issue generation process, with options for specifying prompt details or template names.
- **Traceability:** Include diagnostic logging to capture the details of API interactions and the resulting generated issues.
- **Configuration:** Support environment variable overrides and CLI flags to control aspects such as API key, prompt template selection, and output formatting.

## Implementation Details

- **API Integration Module:** Create a new module (e.g., `src/lib/issueGenerator.js`) that encapsulates the logic for calling the Chat Completions API (using the OpenAI dependency) with a provided prompt.
- **CLI Command:** Add a new CLI flag (e.g., `--gen-issues`) within the main CLI dispatcher to allow users to trigger the issue generation process. The command will accept parameters for custom prompt or template names.
- **Prompt Template Management:** Provide a default prompt template that describes the repository context, current feature set, and implementation guidelines. Allow users to override this template via environment variable (e.g., `ISSUE_TEMPLATE`) or CLI options.
- **Logging and Diagnostics:** Integrate with the existing diagnostic logging mechanism to report API call status, any errors returned from the Chat Completions API, and a summary of the generated issues.
- **Output Format:** Return the generated issues in a structured JSON format that can either be directly submitted to GitHub or further processed to create issues via the GitHub API.

## Testing

- **Unit Tests:** Create tests to simulate various responses from the Chat Completions API, verifying that the module returns correctly structured issue objects given a descriptive prompt.
- **Integration Tests:** Ensure that when the `--gen-issues` CLI command is invoked, the output is a list of issue descriptions that match repository style guidelines, and that the diagnostic logs contain appropriate details.
- **Edge Cases:** Test behavior when the API returns errors, when invalid prompt parameters are supplied, and when custom templates are used.

This feature extends the automation capabilities of the repository, enabling efficient issue creation for iterative development while ensuring adherence to the repository guidelines and mission objectives.features/rejects/CLI_DIAGNOSTICS.md
# features/rejects/CLI_DIAGNOSTICS.md
# CLI_DIAGNOSTICS Feature Specification

## Overview
This feature introduces a diagnostics functionality to the CLI tool. When the `--diagnostics` flag is provided, the application will output relevant system and environment information, including Node.js version, environment variables, and other configuration details that aid in troubleshooting.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Extend the argument parser to detect the `--diagnostics` flag.
  - When the flag is present, execute a diagnostics routine that collects system information such as the Node.js version, current environment variables, and other runtime details.
  - Ensure that if other recognized flags (like `--help`) are present, the corresponding actions are executed without conflicts.

- **Test File Update (tests/unit/main.test.js):**
  - Add test cases to verify that running the CLI with the `--diagnostics` flag produces the expected diagnostic output.
  - Ensure that the new functionality does not interfere with the existing help functionality.

- **README File Update (README.md):**
  - Add a new section under "Usage" documenting the `--diagnostics` command with usage examples and expected output.

- **Dependencies File Update (package.json):**
  - No new dependencies are required. The implementation will rely on standard Node.js APIs to retrieve diagnostics information.

## Goals
- Enhance the user experience by providing a built-in mechanism to inspect the tool's operating environment.
- Support troubleshooting and debugging efforts without external tooling.
- Stay consistent with the mission of creating a robust CLI tool for managing OWL ontologies.
features/rejects/ENDPOINT_HEALTH.md
# features/rejects/ENDPOINT_HEALTH.md
# Endpoint Health

This feature provides real-time monitoring of all configured API endpoints used by the ontology builder. By periodically checking the health of endpoints, it ensures that any connectivity issues or failures are detected early and reported through both diagnostic logs and CLI outputs.

## Overview

The Endpoint Health feature will:

- Continuously ping both default and custom endpoints (as configured via the `CUSTOM_API_ENDPOINTS` environment variable).
- Log the status of each endpoint with detailed error messages when an endpoint is unresponsive or returns an error.
- Expose a new CLI command (`--health`) that displays a summary of the health status of each endpoint. This summary will include metrics such as response time, status code, and error details if applicable.
- Integrate with the existing diagnostic logging system to ensure consistency with log levels (configured via `DIAGNOSTIC_LOG_LEVEL`).

## Implementation Details

- **Endpoint Checker Module:** A new module will be created (e.g., `src/lib/endpointHealth.js`) that handles the periodic checking of endpoints using the existing HTTP/HTTPS request methods. It will support configuration of check intervals via an environment variable (e.g., `HEALTH_CHECK_INTERVAL`).
- **CLI Integration:** Add a new CLI command `--health` that will trigger the endpoint health check and print a well-formatted status summary.
- **Logging and Alerts:** Utilize the `logDiagnostic` function to log warnings/errors for endpoints that fail health checks. Optionally, integrate an alert mechanism (e.g., a simple console alert or file-based alert) for critical issues.
- **Configuration Options:** Allow configuration of health check interval and timeout via environment variables. Also, the feature should gracefully disable itself if a certain environment variable (e.g., `DISABLE_HEALTH_CHECK`) is set.

## Testing

- **Unit Tests:** Create tests to simulate various endpoint responses (successful, timeout, error) and ensure that the health checker logs appropriate messages and returns correct status summaries.
- **Integration Tests:** Ensure that the new CLI command `--health` outputs valid JSON or formatted text summarizing the endpoint statuses. Use mock endpoints to simulate live conditions.
- **Edge Cases:** Verify behavior when no custom endpoints are provided and when endpoints are temporarily down.

This feature aligns with the mission of providing live, verified data sources by ensuring proactive monitoring and reliability of endpoint connections.
features/rejects/CLI_HELP.md
# features/rejects/CLI_HELP.md
# CLI_HELP Feature Specification

## Overview
This feature enhances the CLI tool by adding a comprehensive help command. When the '--help' flag is present in the command line arguments, the tool will output a detailed usage guide that includes available commands and usage examples. This guide will be dynamically maintained and documented in the README file.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Parse the command-line arguments (process.argv).
  - Check for the '--help' flag. If present, display a help message with usage instructions and available commands.
  - Ensure that the default behavior for other commands remains unchanged.

- **Test File Update (tests/unit/main.test.js):**
  - Add test cases to verify that when the '--help' flag is provided, the output contains the expected help information.
  - Confirm that running the tool with other arguments still executes correctly.

- **README Update (README.md):**
  - Include a new section under "Usage" that documents the '--help' command.
  - Provide examples in markdown to illustrate how to call the CLI with the help flag and what output to expect.

- **Dependencies Update (package.json):**
  - No additional dependencies are needed for this feature. The focus remains on utilising existing libraries and ensuring compatibility with the mission and guidelines.

## Goals
- Improve user experience by providing clear, inline help through the CLI.
- Maintain consistency with the mission of making owl-builder a robust CLI tool for managing OWL ontologies.
- Ensure comprehensive documentation and testing for the new help functionality.
features/ONTOLOGY_VALIDATOR.md
# features/ONTOLOGY_VALIDATOR.md
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
features/CLI_TOOL.md
# features/CLI_TOOL.md
# CLI_TOOL Update: Ontology Transform

## Overview
This update enhances the existing CLI tool by implementing two new flags: `--ontology-transform` and `--owl-examples`. These additions enable dynamic transformation of input JSON into an OWL ontology format and the augmentation of output data with an additional demonstration section. The updates adhere to the guidelines in the CONTRIBUTING.md and align with the mission stated in the MISSION.md.

## Implementation Details
### Source File (`src/lib/main.js`)
- **--ontology-transform Flag**:
  - Check if the flag is present.
  - Inspect the argument immediately following the flag.
  - If the argument is valid JSON, transform it into an object with an `ontology` key wrapping the parsed JSON and add a `generatedAt` timestamp.
  - If the JSON is invalid or missing, output a default ontology transformation object with preset content and a timestamp.

- **--owl-examples Flag**:
  - When present, modify the standard output (such as under the `--capital-cities` flag) by appending an additional `results` key containing sample demonstration data.

### Testing Enhancements (`tests/unit/main.test.js`)
- Add new tests to validate the behavior of the `--ontology-transform` flag:
  - Test passing valid JSON input results in an output object with an `ontology` property and proper timestamp.
  - Test that missing or invalid JSON input results in the default transformation object.
- Add new tests to ensure that the `--owl-examples` flag produces an output that includes both the original OWL content and an extra `results` key with demonstration data.

### Documentation Updates (`README.md`)
- Update the CLI usage section to describe the new flags with usage examples:
  - Explain how to use the `--ontology-transform` flag with both valid and invalid JSON inputs.
  - Show the output differences when the `--owl-examples` flag is applied, highlighting the addition of sample data in the result.

### Dependencies Update (`package.json`)
- No additional dependencies are required for these changes. The existing dependencies remain sufficient to support the new functionality.

## Compliance and Impact
- **Backward Compatibility**: The new flag implementations maintain compatibility with existing features and do not interfere with current commands.
- **Testing Coverage**: Enhanced tests ensure that both valid and fallback behaviors are covered; regression tests validate that existing functionality remains unaffected.
- **Mission Alignment**: This update improves the capability of `owl-builder` to transform and augment OWL ontologies from public data sources, fulfilling the mission of providing dynamic ontology management via a CLI tool.

## Roll-out Strategy
- Implement the changes in the source file, update the corresponding tests, and revise the README to capture the new usage details.
- Verify all tests pass using the command `npm test` and confirm functionality via manual testing.
