features/ONTOLOGY.md
# features/ONTOLOGY.md
# Ontology Feature Enhancement with MERGE_PERSIST

## Overview
This update refines and extends the existing ontology management functionality by fully integrating a new `--merge-persist` flag. In addition to the current `--refresh` command, the CLI will now support merging freshly crawled ontology data with stored (persisted) ontology data. This update is in line with our mission of dynamically managing OWL ontologies and providing reliable data merging with schema validation.

## Implementation Details
- **CLI Argument Parsing:**
  - Update `src/lib/main.js` to detect the `--merge-persist` flag.
  - When `--merge-persist` is provided, bypass the default `--refresh` behavior and invoke a new branch that calls the `mergePersistOntology(args)` function.

- **MergePersist Function:**
  - Implement a new function `mergePersistOntology(args)` in `src/lib/main.js`.
  - Retrieve a dummy in-memory persisted ontology that simulates previously stored ontology data. For example, using hard-coded JSON reflective of past data (e.g., previous capital cities).
  - Simulate merging this persisted ontology with freshly crawled data (e.g., update with new or modified capital cities data) using lodash's merge function.
  - Validate the merged ontology against the existing Zod `ontologySchema` to ensure consistency and integrity.
  - Output the merged ontology as structured JSON and optionally allow further extension (e.g., persisting to a file if a `--persist` flag is provided alongside a filepath).

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include unit tests for the `--merge-persist` flag.
  - Verify that when `--merge-persist` is provided, the CLI calls `mergePersistOntology(args)` and outputs a JSON object that adheres to the ontology schema, including verifying properties like `type` and `capitals`.

- **Documentation Updates:**
  - Revise `README.md` to document the new `--merge-persist` command, including example CLI usage:
    ```bash
    node src/lib/main.js --merge-persist
    ```
    which should output the merged ontology.
  - Update `CONTRIBUTING.md` with testing guidelines and instructions for extending the merge persist functionality.

## Future Considerations
- Improve the merging strategy to handle conflicts between old and new data more gracefully.
- Transition from dummy in-memory storage to persistent file operations if needed.
- Enhance error handling and logging during the merge process, particularly when schema validation fails.

This enhancement consolidates our ontology management functions under a unified feature while ensuring backward compatibility with existing commands.features/rejects/ISSUE_GENERATOR.md
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

This feature extends the automation capabilities of the repository, enabling efficient issue creation for iterative development while ensuring adherence to the repository guidelines and mission objectives.features/rejects/ENDPOINT_HEALTH.md
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
features/JSON_OUTPUT.md
# features/JSON_OUTPUT.md
# JSON_OUTPUT Enhancement Update

## Overview
This update refines the JSON output capabilities for the diagnostics command. While the query command already supports the `--json` flag, the diagnostics command will now exclusively support a new `--diagnostics-json` flag for structured JSON output. This change improves consistency and clear separation between query and diagnostics JSON outputs.

## Implementation Details
- **Source Code Updates:**
  - In `src/lib/main.js`, modify the `diagnostics` function to check for the presence of the `--diagnostics-json` flag instead of `--json`. When `--diagnostics-json` is provided, output a JSON object including keys:
    - `nodeVersion`: value from `process.version`
    - `platform`: value from `process.platform`
    - `memoryUsage`: value from `process.memoryUsage()`
  - Maintain the plain-text output when the flag is not provided.

- **Testing Enhancements:**
  - In `tests/unit/main.test.js`, update the diagnostics tests to use the new flag `--diagnostics-json` when expecting JSON output. For example, change calls from `diagnostics(["--diagnostics", "--json"])` to `diagnostics(["--diagnostics", "--diagnostics-json"])` and update expected outputs accordingly.

- **Documentation Updates:**
  - In `README.md`, update the usage examples in the Diagnostics section to reflect the new flag:
    ```bash
    node src/lib/main.js --diagnostics --diagnostics-json
    ```
  - Update explanatory text in both the README and `CONTRIBUTING.md` to note that the diagnostics JSON output is now triggered exclusively by `--diagnostics-json`.

## Future Considerations
- Consider maintaining backward compatibility by optionally supporting both flags for a transitional period, if necessary.
- Monitor user feedback and adjust the output format or additional diagnostic metrics as requested.
features/REST_API.md
# features/REST_API.md
# REST_API Enhancement

## Overview
This feature upgrades the existing REST API functionality by adding additional endpoints as outlined in our documentation. In addition to the basic root endpoint, the updated REST API will now support:

- A GET endpoint at `/ontologies` to return a list of available OWL ontologies.
- A GET endpoint at `/ontologies/:id` to return the details of a specific ontology.
- A POST endpoint at `/ontologies/refresh` to trigger a refresh and regeneration of ontology data.
- A new GET endpoint at `/health` to serve as a quick health check for the service.

This update aligns with our mission to expose programmatic access to OWL ontologies and improve developer and integration experiences.

## Implementation Details
- **HTTP Server:**
  - Update the `serve` function in `src/lib/main.js` to establish additional routes.
  - Implement the `/ontologies` route to simulate a list of ontology IDs (or dummy ontology objects).
  - Implement the `/ontologies/:id` route to return details for a specific ontology (using dummy data for now).
  - Implement the `/ontologies/refresh` route that triggers a simulated refresh of ontology data and returns the updated data in JSON format.
  - Implement a new `/health` endpoint that returns a JSON object (e.g., `{ status: "ok" }`) to indicate that the service is running.

- **CLI Integration:**
  - Ensure that when the `--serve` flag is provided, the server starts with the enhanced routes.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to add new test cases for the added endpoints, including verifying the response structure and status codes.
  - Ensure integration tests check that the `/health` endpoint returns the expected JSON output.

- **Documentation Updates:**
  - Revise `README.md` to document the new API endpoints and provide usage examples for them.
  - Update `CONTRIBUTING.md` with guidelines on testing and extending REST API endpoints.

## Future Considerations
- Enhance the routing logic to fetch and manage real ontology data.
- Add security measures (e.g., API key authentication) for sensitive endpoints.
- Monitor performance and add logging/metrics where applicable.
features/DIAGNOSTICS_JSON.md
# features/DIAGNOSTICS_JSON.md
# DIAGNOSTICS_JSON Feature Update

## Overview
This update refines the diagnostics command by replacing the generic `--json` flag with a more precise `--diagnostics-json` flag. This change enhances clarity and consistency with other JSON output command flags, ensuring that diagnostic information is output in a dedicated and unambiguous manner.

## Implementation Details
- **Source Code Updates:**
  - In `src/lib/main.js`, modify the `diagnostics` function to check for the presence of the `--diagnostics-json` flag instead of `--json`.
  - When the `--diagnostics-json` flag is detected, output the diagnostics as a structured JSON object containing keys: `nodeVersion`, `platform`, and `memoryUsage`.
  - Maintain the plain-text output when the flag is not provided.

- **Testing Enhancements:**
  - In `tests/unit/main.test.js`, update the diagnostics tests so that they call the diagnostics command using `--diagnostics-json` instead of `--json` when expecting JSON output.
  - Ensure that both the legacy (plain-text) and new JSON output behaviors are covered.

- **Documentation Updates:**
  - In `README.md`, update usage examples in the Diagnostics section to reflect the new flag:
    ```bash
    node src/lib/main.js --diagnostics --diagnostics-json
    ```
  - Update `CONTRIBUTING.md` where relevant to inform contributors of the updated diagnostics flag behavior.

## Future Considerations
- Optionally, consider a transitional period that supports both `--json` and `--diagnostics-json` flags with appropriate warning messages if needed.
- Monitor user feedback and further refine the diagnostics output format as additional diagnostic metrics may be included in the future.
