# DIAGNOSTICS_MANAGER

## Overview

This feature consolidates diagnostic logging, telemetry aggregation, and issue generation into a single diagnostics manager. In addition to its current responsibilities (centralized diagnostics, enriched issue context, and a lightweight HTTP telemetry dashboard), this update introduces an interactive CLI dashboard that allows users to view and filter aggregated telemetry data including NaN fallback warnings, error counts, and diagnostic messages. This CLI dashboard is accessible via a dedicated flag (e.g. `--diagnostic-dashboard`) and presents real-time insights directly in the terminal.

## Implementation Details

- **Centralized Logging and Telemetry Aggregation:** Continue merging diagnostic logs from environment variable parsing, HTTP retries, and live data integration in a unified diagnostics module. Maintain the promise-based batching of telemetry events to ensure atomic logging under high concurrency.

- **HTTP Diagnostics Dashboard:** Retain the HTTP endpoint (e.g. `/diag/summary`) to display real-time diagnostic metrics in a simple web interface.

- **CLI Dashboard Integration:**
  - Introduce a new CLI flag (`--diagnostic-dashboard`) that, when invoked, presents users with a terminal-based dashboard.
  - The dashboard will display aggregated telemetry data including unique invalid environment variable inputs, counts of NaN fallback events, and recent diagnostic log entries.
  - Provide filtering options (e.g., by log level or specific environment variable identifiers) to help users quickly identify issues.
  - Ensure that this CLI dashboard leverages the existing aggregated telemetry data available via the diagnostics module (i.e. the data accessible with `getAggregatedNaNSummary` and other logging functions).

- **Issue Generation and Enrichment:** Continue to automatically enrich generated GitHub issues with contextual diagnostic information including timestamps, error descriptions, and the relevant telemetry payloads.

- **Documentation and Testing:**
  - Update the README and CONTRIBUTING documents to include examples of using the CLI dashboard as well as the HTTP diagnostics endpoint.
  - Enhance unit and integration tests to cover the new CLI dashboard functionality, ensuring that aggregated telemetry is correctly displayed and filtered.

## Benefits

- **Unified Diagnostics and Monitoring:** Provides a single source of truth for all diagnostic data, reducing code duplication and simplifying maintenance.

- **Interactive User Experience:** The new CLI dashboard offers an easy-to-use, real-time interface for monitoring system health and telemetry data directly from the terminal, complementing the HTTP-based dashboard.

- **Enhanced Issue Context:** Automatically enriched diagnostic data aids faster troubleshooting and more precise issue resolution.

- **Consistent Integration:** Maintains compatibility with the repository’s live data integration and overall mission of building dynamic OWL ontologies while improving user transparency and control over diagnostics.
