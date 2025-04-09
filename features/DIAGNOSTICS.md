# DIAGNOSTICS

This feature unifies and enhances all logging, telemetry, and diagnostic operations across the tool. It consolidates legacy diagnostic logging, HTTP and CLI diagnostic filtering, and introduces robust, persistent and aggregated telemetry for environment variable issues and network backoff events.

## Overview

- **Unified Logging System:** Centralizes diagnostic messages from live data integration, ontology management, and CLI command operations. All logs are timestamped and can be output to the console, a persistent file, or aggregated for on-demand reporting.
- **Aggregated Telemetry:** Implements promise-based batching to collect and report aggregated telemetry for non-numeric environment variable inputs (NaN) and other warnings, accessible via the CLI flag `--diagnostic-summary-naN`.
- **Flexible Output Options:** Provides configurable logging levels and supports dual output (console and file) via CLI flags (e.g. `--log-to-file`) and environment variable controls.
- **Extended Diagnostics for CLI and HTTP:** Enhances both the CLI dashboard and the HTTP endpoint (`/diag/telemetry`) for real-time filtering, audit trailing, and troubleshooting of ontology build operations.

## Implementation Details

- **Promise-Based Batching:** Diagnostic warnings, especially those triggered by invalid environment variable inputs, are batched asynchronously. This ensures that each unique issue is logged once even under high concurrency conditions.
- **Multi-Channel Logging:** The system supports logging to console and a designated log file (e.g. `logs/diagnostic.log`) when enabled. The logging behavior is governed by the `DIAGNOSTIC_LOG_LEVEL` setting and additional flags.
- **Aggregated Telemetry Summary:** An aggregated report is maintained in memory that counts occurrences of each unique invalid input. Users can retrieve this summary using the CLI flag `--diagnostic-summary-naN`.
- **Integration with CLI and Web Server:** Diagnostic messages are integrated into both the CLI command responses and the HTTP dashboard for real-time visibility across all operations including live data fetching, network retries with jitter, environment variable parsing, and ontology merging.

## Benefits

- **Improved Observability:** Developers and users gain a unified and detailed view of system events, errors, and telemetry data through a consolidated diagnostics system.
- **Persistent Troubleshooting Data:** Logging to file and aggregated telemetry provide a robust audit trail for both live and fallback scenarios, facilitating offline analysis and long-term monitoring.
- **Enhanced Flexibility and Configurability:** Users can customize the diagnostic output level, control persistence options, and retrieve detailed aggregated reports to quickly pinpoint configuration or network issues.
