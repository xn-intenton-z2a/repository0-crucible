# CORE_ENGINE: Unified Live Data and Scheduling Engine

## Overview
This feature consolidates critical functionalities for live data integration, anomaly detection, automated rollback, detailed telemetry logging, and scheduled ontology maintenance into one unified core engine. It merges aspects of the deprecated TELEMETRY_MANAGER and ONTOLOGY_ENGINE as well as the SCHEDULED_TASKS feature. The core engine underpins owl-builder’s mission by ensuring that ontologies are built from live public data sources with robust error handling, proactive anomaly detection, and automated recovery mechanisms.

## Implementation Details
1. **Live Data Integration and Anomaly Detection:**
   - Use the `buildOntologyFromLiveData` function to construct ontologies directly from live, verified data endpoints.
   - Validate incoming data using `detectLiveDataAnomaly`. If a data anomaly is detected (e.g., missing or empty `entries`), trigger diagnostic logging.
   - In the event of a detected anomaly, automatically attempt a rollback by invoking `restoreLastBackup` and broadcast an appropriate WebSocket notification.

2. **Telemetry and Environment Variable Management:**
   - Integrate the enhanced environment variable parsing (with normalization and fallback logic) alongside aggregated telemetry for non-numeric inputs.
   - Utilize functions like `parseEnvNumber` and `getAggregatedNaNSummary` to gather and export telemetry data via CLI commands.
   - Provide CLI export functionality (`--export-telemetry`) for detailed diagnostics in JSON and CSV formats.

3. **Scheduled Maintenance Tasks:**
   - Merge the periodic refresh and backup operations previously handled by SCHEDULED_TASKS into the core engine.
   - Schedule ontology refresh and backup using configurable intervals (e.g., `AUTO_REFRESH_INTERVAL` and `AUTO_BACKUP_INTERVAL`) and ensure graceful shutdown of intervals.

4. **CLI Integration:**
   - Offer commands such as `--refresh` and `--merge-persist` that leverage the unified core engine’s functionalities.
   - Ensure that both automated and on-demand operations are seamlessly integrated, providing real-time diagnostic feedback via logging and WebSocket notifications.

## Benefits
- **Improved Reliability:** Consolidates multiple asynchronous processes into a single reliable engine, ensuring timely detection of data anomalies and automated recovery through rollback.
- **Streamlined Maintenance:** Simplifies environment configurations and scheduled operations into one module, reducing complexity in deployment and ongoing maintenance.
- **Enhanced Diagnostic Capabilities:** Provides a unified approach to telemetry logging, error detection, and reporting, thereby facilitating better monitoring and troubleshooting.
- **Scalable Architecture:** Lays a strong foundation for future enhancements, such as additional custom merging strategies and more granular telemetry exports.
