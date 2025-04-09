# DIAGNOSTICS

This feature unifies and enhances all logging, telemetry, and diagnostic operations across the tool. It consolidates legacy diagnostic logging, HTTP and CLI diagnostic filtering, and introduces robust, persistent and aggregated telemetry—including advanced handling of environment variable configurations—for live data and fallback events.

## Overview

- **Unified Logging System:** Centralizes diagnostic messages from live data integration, ontology management, CLI command operations, and environment configuration errors. All logs are timestamped and can be output to the console, a persistent file, or aggregated for on-demand reporting.

- **Aggregated Telemetry:** Implements promise-based batching to collect and report aggregated telemetry for invalid environment variable inputs (e.g. non-numeric values) and other warnings. Users can retrieve this summary using the CLI flag `--diagnostic-summary-naN`.

- **Flexible Output Options:** Provides configurable logging levels and supports dual output (console and file) via CLI flags (e.g. `--log-to-file`) and environment variable controls.

- **Extended Diagnostics for CLI, HTTP, and Environment Configuration:** Enhances diagnostic logging for both runtime operations and configuration management. This includes detailed tracking of environment variable normalization errors, CLI override precedence, and robust error logging with contextual telemetry (raw input, timestamp, and override flag).

## Environment Variable Configuration

- **Normalization and Parsing:** Environment variable values are trimmed, whitespace-collapsed (including non-breaking spaces), and converted to lower case to ensure consistency. Invalid (non-numeric) inputs trigger one-time diagnostic warnings and fallback to default or configurable values.

- **CLI Overrides and Strict Mode:** CLI provided override values take precedence over environment configurations. In strict mode (enabled via `--strict-env` or `STRICT_ENV=true`), non-numeric inputs raise errors immediately, ensuring robust configuration validation.

- **Promise-Based Batching for Telemetry:** To handle high concurrency scenarios, telemetry events for configuration issues are batched asynchronously. Each unique invalid input is logged exactly once per normalized value, with detailed telemetry including the raw input, whether a CLI override was used, and the timestamp.

## Implementation Details

- **Multi-Channel Logging:** Implements logging to both the console and a persistent log file (e.g. `logs/diagnostic.log`) based on user configuration.

- **Aggregated Telemetry Summary:** Maintains an in-memory summary of diagnostic events that can be queried on demand.

- **Integration with CLI and HTTP Endpoints:** Diagnostic events are integrated into CLI command responses and HTTP monitoring endpoints, ensuring real-time visibility into both operational and configuration issues.

- **Robust Error Handling:** Uses promise-based batching to ensure that warnings for invalid environment variable values (such as variations of "NaN") are aggregated and logged consistently under high load conditions.

## Benefits

- **Improved Observability:** Developers and users gain a unified and detailed view of system events, errors, and configuration issues through comprehensive diagnostic logging.

- **Persistent Troubleshooting Data:** Aggregated reports and persistent logs provide a robust audit trail for both live system monitoring and offline analysis.

- **Enhanced Configuration Robustness:** Advanced environment variable management ensures that non-standard inputs are handled gracefully, with detailed telemetry available for troubleshooting.
