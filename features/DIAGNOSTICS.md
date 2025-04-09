# DIAGNOSTICS: Aggregated Telemetry, Log Management & CLI Telemetry Viewer

## Overview
This feature consolidates all diagnostic logging and telemetry related to environment variable parsing, live data anomaly detection, and operational events into a single, unified module. It aggregates logs from various parts of the system, includes advanced export options, and now introduces an interactive CLI telemetry viewer to aid operators and developers in real-time diagnosis.

## Unified Logging and Telemetry
- **Centralized Logging:** Replaces legacy inline logging and ensures that all telemetry (e.g., NaN fallback warnings, diagnostic events) are captured in an in-memory store with timestamps.
- **Telemetry Aggregation:** Normalizes, validates, and aggregates environment variable warnings (including explicit and implicit NaN inputs) along with detailed diagnostic logs from live data integrations and CLI operations.
- **Export Functionality:** Offers CLI options (`--export-telemetry`) to output aggregated logs in JSON or CSV formats. Existing commands for exporting remain unchanged.

## Interactive CLI Telemetry Viewer
- **New CLI Command:** Introduces a new CLI flag `--show-telemetry` which displays the aggregated telemetry data in a user-friendly, interactive table format directly in the terminal.
- **Detailed Summary:** Provides a real-time summary of all non-numeric environment variable inputs, explicit "NaN" events, and other diagnostic logs. An optional `--json` flag can output the summary in JSON format for further automated processing.
- **Usage:** Enhances troubleshooting by allowing developers to quickly inspect system health and configuration issues without having to search through log files.

## Integration and Backwards Compatibility
- **Seamless Merging:** Consolidates legacy ENV_TELEMETRY functionality into the enhanced DIAGNOSTICS module.
- **CLI Updates:** All existing CLI flags (such as `--diagnostic-summary-naN` and telemetry export commands) remain active while the new `--show-telemetry` command provides additional interactive insights.
- **Documentation:** Update CONTRIBUTING.md and README with details about the new telemetry viewer, demonstrating examples of interactive usage.

## Benefits
- **Centralized Diagnostics:** A single point of access for all telemetry and log data, reducing complexity and simplifying troubleshooting.
- **Enhanced Visibility:** Real-time, interactive telemetry display improves developer productivity by offering immediate insight into diagnostic data.
- **Export and Analysis:** Continues to support detailed exporting of telemetry for external analysis, maintaining backwards compatibility with legacy commands.

## Migration Notes
- Developers should update their CLI usage to include the new `--show-telemetry` flag for real-time monitoring.
- Legacy references to ENV_TELEMETRY should now point to this enhanced DIAGNOSTICS module.
- No breaking changes are introduced; existing functionalities and configurations remain fully supported.