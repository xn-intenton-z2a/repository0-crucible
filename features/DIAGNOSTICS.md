# DIAGNOSTICS

This feature unifies logging, telemetry, and diagnostic operations across the tool while now incorporating an additional configuration audit capability. In addition to tracking real-time errors, warning, and telemetry data from live data integration and environment issues, it will now also capture the effective configuration state after normalization and CLI override resolution.

# Overview

- **Unified Logging and Telemetry:** Maintains the existing multi-channel logging for CLI, HTTP, and WebSocket operations. All diagnostic messages are timestamped and available via both console and persistent file logs.

- **Aggregated Telemetry:** Continues to batch and aggregate events such as invalid environment variable inputs (e.g. non-numeric values), logging each unique normalized invalid input exactly once with detailed telemetry data.

- **Configuration Audit Logging:** Newly added functionality. The tool will capture and log the effective configuration state as determined by environment variables and CLI overrides. This includes values for critical parameters (e.g., LIVEDATA_RETRY_COUNT, LIVEDATA_INITIAL_DELAY) after applying normalization and fallback logic. The audited configuration can be written to a persistent file (e.g. `config_audit.json`) and is accessible on-demand via a CLI flag (`--config-audit`).

# Implementation Details

- **Extended Environment Variable Handling:** The inline environment utility functions (e.g. `normalizeEnvValue` and `parseEnvNumber`) now feed into a configuration audit module that gathers effective configuration values across the tool.

- **Aggressive Audit Trigger:** Upon tool startup or when the CLI flag `--config-audit` is used, the system will collate normalized configuration values (including those coming from CLI overrides) and output them as both part of the standard diagnostic log and into a dedicated audit file.

- **Asynchronous and Batched Logging:** The batching architecture used for NaN fallback telemetry is extended for configuration audit events, ensuring that logging remains atomic even under high concurrency.

- **CLI Integration:** A new CLI flag (`--config-audit`) enables users to print (or persist) the current effective configuration settings to help diagnose misconfigurations and verify that environment variables and CLI overrides are processed as intended.

# Benefits

- **Enhanced Observability:** By auditing the effective configuration state, developers and operators can quickly verify that environment variables and CLI overrides are applied correctly.

- **Improved Troubleshooting:** Persistent configuration audit logs facilitate post-mortem analysis by providing a clear snapshot of the runtime configuration, especially in cases where misconfigurations cause unexpected behaviors.

- **Consistent Diagnostics:** Integration of configuration audit within the existing diagnostics framework allows all telemetry data to be viewed centrally, enhancing overall observability.
