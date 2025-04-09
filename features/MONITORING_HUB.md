# Monitoring Hub Enhanced

This update to the Monitoring Hub feature integrates advanced diagnostic telemetry filtering over HTTP while retaining the consolidated status display and interactive CLI dashboard. This enhancement enables users and developers to query and filter aggregated telemetry events (such as NaN fallback warnings and other diagnostic logs) directly through RESTful endpoints. By providing flexible filtering options, the system improves real-time troubleshooting and observability of environment variable inconsistencies and other runtime issues.

## Overview

- **Expanded Diagnostics API:** In addition to the existing HTTP status endpoint and CLI dashboard, a new REST endpoint (e.g., `/diag/telemetry`) will be added. This endpoint supports query parameters to filter telemetry by environment variable names, occurrence counts, timestamps, and CLI override flags.
- **Interactive CLI Enhancement:** The CLI dashboard now supports an additional flag (e.g., `--diagnostic-filter`) to invoke filtering options directly from the terminal, enabling quick access to targeted diagnostic information.
- **Maintained Core Functionality:** All existing features including aggregated telemetry for NaN fallback events, promise-based batching under high concurrency, and legacy CLI flags (like `--diagnostic-summary-naN`) are preserved as part of this unified monitoring solution.

## Implementation Details

- **HTTP Endpoint Extension:** Update the current web server integration to include the `/diag/telemetry` endpoint. This endpoint will accept query parameters (for example, `?env=TEST_SUMMARY&minCount=2`) to filter the telemetry cache and return a JSON-formatted summary of matched diagnostic events.
- **CLI Integration:** Enhance the interactive CLI dashboard by adding a new flag (`--diagnostic-filter`) that takes optional filter parameters, invokes the same filtering logic as the HTTP endpoint, and displays the results in a readable format.
- **Telemetry Filtering Logic:** Leverage the existing promise-based batching mechanism and the aggregated telemetry data structure. Implement filtering functions to process query parameters and return subsets of the telemetry events based on criteria such as environment variable names, raw input values, count thresholds, and timestamp ranges.
- **Documentation and Testing:** Update the README and CONTRIBUTING documentation to reflect the new endpoints and CLI flag. Add unit and integration tests to simulate various filtering scenarios (e.g., filtering by environment variable, count, and date ranges) ensuring robust functionality.

## Benefits

- **Enhanced Troubleshooting:** Developers and users can quickly pinpoint problematic environment variable configurations by filtering diagnostic logs, reducing noise from non-relevant entries.
- **Improved Observability:** The new RESTful interface provides a richer, flexible view into real-time telemetry data, complementing the existing CLI dashboard.
- **Seamless Integration:** Built as an extension of the current Monitoring Hub in a single-source file, the enhancement maintains high cohesion and leverages existing logging and telemetry aggregation mechanics.
