# Extended ENV_MONITOR with Telemetry Dashboard

This update refines the existing ENV_MONITOR feature by enhancing its diagnostic and runtime monitoring capabilities. In addition to validating environment variables, aggregating diagnostic logs, and supporting interactive CLI configuration, this update adds a lightweight web dashboard endpoint for displaying the aggregated telemetry data in a user-friendly format.

## Overview

- **Enhanced Environment Validation:** Retains processing of environment variables with improved normalization and aggregation of warnings for non-numeric inputs. Detailed telemetry is logged asynchronously to reduce overhead during high concurrency.
- **Interactive CLI Wizard:** Continues to provide guided configuration through CLI flags such as `--diagnostic-summary-naN` for immediate feedback on problematic environment variables.
- **Telemtry Aggregation:** Aggregates repeated NaN fallback events and consolidates environmental misconfiguration warnings into summarized reports.
- **New Telemetry Dashboard Endpoint:** Introduces a new HTTP endpoint (e.g., `/diag/summary`) that serves an HTML dashboard displaying aggregated telemetry data. This dashboard offers maintainers a real-time view of issues such as invalid environment inputs, frequency counts, and associated telemetry details.

## Implementation Details

- **Unified Single-Source Integration:** All functionalities remain in the single source file, ensuring high cohesion while extending capabilities.
- **Diagnostic Log Analyzer:** The existing log parser continues to gather and de-duplicate warnings. The enhanced version now feeds data into the new dashboard endpoint.
- **New HTTP Endpoint:** A new route (e.g., `/diag/summary`) is implemented on the built-in web server. When accessed, this endpoint renders an HTML page summarizing aggregated telemetry events, including key details like the environment variable name, raw input, occurrence count, and timestamp of the first event.
- **Documentation & Testing:** README and CONTRIBUTING documents are updated to include usage examples for the new dashboard endpoint. Additional unit and integration tests (using vitest) verify that the `/diag/summary` endpoint returns the correct HTML content with aggregated data, while ensuring backward compatibility with CLI diagnostics.

## Benefits

- **Centralized Monitoring:** Provides maintainers a single, consolidated view of environment configuration issues and aggregated telemetry data in real time.
- **Improved Diagnostics:** The new web dashboard makes it easier to track recurring misconfigurations and provides actionable insights through a visual interface.
- **Seamless Integration:** Builds upon the existing ENV_MONITOR functionalities without disrupting current CLI interactions, ensuring a smooth upgrade path for users.
