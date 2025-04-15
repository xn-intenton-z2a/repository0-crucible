features/rejects/ISSUE_GENERATOR.md
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
features/CAPITAL_CITIES.md
# features/CAPITAL_CITIES.md
# CAPITAL_CITIES Feature Enhancement

## Overview
This update refines the CAPITAL_CITIES feature to fully implement advanced options as described in the guidelines. Users can now filter the list of capital cities by country, choose the desired output format (JSON or JSON-LD), and sort the capitals in ascending or descending order. This enhancement aligns with the mission of owl-builder by providing a more flexible and user-friendly tool for generating OWL ontologies from public data sources.

## Implementation Details
- **CLI Updates:**
  - Modify the `--capital-cities` option in `src/lib/main.js` to parse additional flags:
    - `--country=<COUNTRY_NAME>`: Filter the list to include only the capital cities from the specified country.
    - `--format=<FORMAT>`: Accept `json` (default) or `jsonld` to specify the output format.
    - `--sort=<ORDER>`: Sort the list in either `asc` or `desc` order. If an invalid order is provided, return an informative error message and exit gracefully.
  - Integrate new logic to filter and sort the static list of capitals accordingly.

- **Error Handling:**
  - For invalid values on the `--sort` or `--format` flags, display clear error messages.

- **Testing:**
  - Update `tests/unit/main.test.js` with unit tests to cover:
    - Default output when no extra parameter is provided.
    - Filtering by country using the `--country` flag.
    - Output format verification by using the `--format` flag in both `json` and `jsonld` modes.
    - Sorting functionality with valid (`asc`, `desc`) and invalid sort orders.

- **Documentation:**
  - Revise the `README.md` to include updated usage examples for the `--capital-cities` command, demonstrating the new flags:
    ```bash
    node src/lib/main.js --capital-cities --country=France
    node src/lib/main.js --capital-cities --format=jsonld --sort=asc
    ```

## Alignment with Mission
This enhancement deepens the tool's capability to transform public data sources into structured OWL ontologies by allowing users to tailor the output to their specific needs. The increased flexibility and robust error handling contribute directly to the mission of making owl-builder a user-centric, dependable CLI tool for managing ontology data.