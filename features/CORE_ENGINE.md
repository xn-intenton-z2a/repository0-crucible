# CORE_ENGINE: Unified Live Data, Scheduling, and Diagnostics Engine

## Overview
This feature consolidates multiple critical functionalities into a single unified engine. It manages live data integration, anomaly detection with automated rollback, detailed telemetry logging, scheduled maintenance, and enhanced CLI diagnostic and telemetry export. It merges the legacy TELEMETRY_MANAGER and ONTOLOGY_ENGINE features (and SCHEDULED_TASKS) into one robust module that not only builds and maintains ontologies but also provides enriched insights and diagnostics as per the mission statement.

## Implementation Details
### 1. Live Data Integration and Anomaly Detection
- **Data Ingestion:** Use verified public endpoints to build ontologies directly from live data.
- **Anomaly Handling:** Validate the data against schema expectations (e.g., non-empty `entries`). On detecting anomalies, log detailed diagnostics and automatically trigger a rollback using the last known backup from `ontology-backup.json`.
- **Rollback Mechanism:** If a rollback is successful, broadcast a WebSocket alert with the message "Ontology rollback executed due to live data anomaly"; if it fails, fall back to the static build.

### 2. Telemetry and Environment Variable Management
- **Enhanced Logging:** Integrate detailed telemetry for both successful operations and error cases, with warnings for non-numeric environment variable inputs (including explicit "NaN" values).
- **Batching and Aggregation:** Aggregate diagnostic messages using a debounced flush mechanism to prevent log flooding. Export diagnostic summaries and aggregated telemetry (in JSON or CSV format) via dedicated CLI commands.

### 3. Scheduled Maintenance and CLI Integration
- **Maintenance Tasks:** Incorporate scheduled refresh and backup operations. Configure intervals using environment variables and ensure graceful shutdown.
- **CLI Commands:** Provide options such as `--refresh`, `--merge-persist`, and `--export-telemetry` to invoke operations on the core engine. These commands deliver real-time feedback via terminal output and WebSocket notifications.

### 4. Telemetry Export and Diagnostics Enhancement
- **Export Options:** Allow users to export telemetry data (including aggregated NaN fallback telemetry and diagnostic summaries) either in JSON or CSV formats.
- **Diagnostic Summaries:** Provide a CLI flag (`--diagnostic-summary-naN`) that collates detailed telemetry information including timestamps, raw inputs, normalized values, and occurrence counts.
- **Integration:** Seamlessly integrate these telemetry export capabilities with the core engine so that all operations are monitored and reported consistently.

## Benefits
- **Robust Data Handling:** Consolidates live data integration with immediate anomaly detection and automated recovery, ensuring high reliability.
- **Comprehensive Diagnostics:** Enhances real-time monitoring with detailed telemetry export and diagnostic summaries, aiding troubleshooting and system transparency.
- **Streamlined Maintenance:** Combines scheduled tasks with manual CLI operations, reducing complexity and improving maintainability.
- **Scalable and Extensible:** Provides a scalable architecture that supports future enhancements in data merging strategies and diagnostic capabilities.

## Migration and Integration Notes
- The functionalities of the legacy TELEMETRY_MANAGER and ONTOLOGY_ENGINE are now fully integrated into CORE_ENGINE.
- This update consolidates those features; therefore, **TELEMETRY_MANAGER** and **ONTOLOGY_ENGINE** will be deleted from the repository.
- Update documentation in the README and CONTRIBUTING files to reflect the enhanced diagnostics and telemetry export options integrated into CORE_ENGINE.
