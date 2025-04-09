# DIAGNOSTICS

This feature consolidates and enhances all diagnostic and telemetry functions into one unified system. It merges the previously separate TELEMETRY_SUMMARY and MONITORING_HUB features while introducing persistent logging capabilities. In addition to aggregating environment variable parsing issues, filtering diagnostic events via HTTP and CLI, and batching high-concurrency logs, this feature adds support for logging diagnostic messages to a file when enabled.

## Overview

- **Unified Diagnostics:** Combine the functions of aggregated telemetry (for invalid environment variable inputs) and advanced diagnostic filtering (via REST endpoints and CLI dashboard) into one cohesive feature.
- **Persistent Log Files:** Introduce a new CLI flag (`--log-to-file`) and configuration option to write all diagnostic logs (including those for backoff retries, telemetry aggregation, and CLI/HTTP dashboard events) to a designated log file (e.g. `logs/diagnostic.log`).
- **Configurable Logging Levels:** Maintain existing DIAGNOSTIC_LOG_LEVEL configuration while extending logging to support both console and file output.

## Implementation Details

- **Aggregation & Batching:** Retain the promise-based batching mechanism for aggregating telemetry events (including NaN fallback warnings), ensuring each unique invalid input is logged only once per normalization cycle.
- **HTTP Endpoint & CLI Dashboard:** Merge the existing HTTP endpoint (`/diag/telemetry`) and CLI flag (`--diagnostic-filter`) functionality with telemetry summary commands. This unified diagnostics dashboard will allow users to filter and review events in real time.
- **Log File Integration:** Enhance the `logDiagnostic()` function to check for a new flag (e.g. `--log-to-file` or an environment variable like `LOG_TO_FILE=true`) and, if enabled, append all diagnostic messages along with their ISO timestamps to a log file.
- **Configuration & Documentation:** Update README and CONTRIBUTING documentation to describe the new diagnostics system, including examples of CLI usage (e.g. using `--diagnostic-summary-naN` and `--log-to-file`) and instructions for accessing the HTTP endpoint.

## Benefits

- **Improved Observability:** By consolidating diagnostic logging into a single feature, developers and users gain a clear and unified view of system events, errors, and telemetry.
- **Persistent Troubleshooting Data:** Log file support allows retention of diagnostic data beyond the runtime session, facilitating offline analysis and long-term monitoring.
- **Enhanced Flexibility:** Users can now choose between real-time console output and persistent logging, and filter telemetry data during both interactive CLI sessions and via RESTful endpoints.
