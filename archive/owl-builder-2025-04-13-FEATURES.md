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
