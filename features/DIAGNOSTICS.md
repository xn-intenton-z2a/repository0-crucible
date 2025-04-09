# DIAGNOSTICS: Aggregated Telemetry and Log Management

## Overview
This feature consolidates environment variable telemetry and diagnostic logging into a single, unified module. It enhances the current telemetry functionality by aggregating logs from various parts of the system (including live data ingestion, anomaly detection, and CLI interactions) and provides advanced log management capabilities. It also enables operators to query, export, and analyze diagnostic events through additional CLI commands.

## Implementation Details
1. **Unified Logging Pipeline:**
   - Replace inline logging calls and separate telemetry handling found in the legacy ENV_TELEMETRY module with a unified logging API.
   - Collect diagnostic messages (at levels such as debug, info, warn, error) along with environment variable warnings into an in-memory store with timestamps.

2. **Telemetry Aggregation & Export:**
   - Continue to normalize and validate environment variables, aggregating warnings (e.g., non-numeric inputs and explicit 'NaN' values) with detailed telemetry data.
   - Add new endpoints via CLI (e.g. `--show-logs`, `--export-logs`) to display or export the aggregated log and telemetry data in JSON and CSV formats for further analysis.

3. **Persistent Log Storage Option:**
   - Optionally, provide a mechanism to persist logs to a file (with configurable retention), making it easier to trace historical diagnostic events and troubleshoot issues.
   - Include filtering capabilities such as log level and time range for targeted diagnostics.

4. **Integration and Backwards Compatibility:**
   - Merge the core aspects of the previous ENV_TELEMETRY functionality into this new DIAGNOSTICS module.
   - Ensure that existing CLI flags (such as `--diagnostic-summary-naN` and telemetry export commands) continue to work, while introducing additional log management commands.
   - Update the CONTRIBUTING documentation and README file to reflect the new unified diagnostics approach.

## Benefits
- **Centralized Diagnostics:** Offers a single point of access to all telemetry and log data across the application, reducing complexity for developers and operators.
- **Enhanced Troubleshooting:** Provides detailed diagnostic information that is easily exportable and filterable, improving troubleshooting and operational monitoring.
- **Seamless Integration:** Maintains backwards compatibility with existing telemetry features while adding enhanced logging capabilities in one consolidated module.

## Migration Notes
- The legacy ENV_TELEMETRY feature will be deprecated and merged into the new DIAGNOSTICS module. All configuration and CLI command references should be updated accordingly.
- Developers should update their imports from ENV_TELEMETRY to DIAGNOSTICS and refer to the updated documentation for new log management CLI commands.
- Extensive testing and documentation updates are required to ensure a smooth transition for users and contributors.
