# ONTOLOGY ENGINE

The Ontology Engine consolidates the core functionalities of live data integration, diagnostic telemetry, anomaly detection, and automated rollback into a single unified module. This feature merges the previously separate Observability Service and Ontology Service, streamlining communication channels (CLI and WebSocket), diagnostic logging, and recovery workflows.

## Overview

- **Unified Live Data Integration:** Leverages verified public endpoints to build and update OWL ontologies with real-time data. Integrates live anomaly detection to ensure data quality.
- **Aggregated Diagnostics & Telemetry:** Collects, normalizes, and aggregates diagnostic telemetry including environment variable fallback warnings and non-numeric input detections. Supports export of telemetry data in both JSON and CSV formats via CLI commands.
- **Automated Anomaly Detection & Rollback:** Continuously validates incoming live data against schema expectations. On detecting anomalies (e.g. missing or empty `entries`), the system logs detailed messages, broadcasts WebSocket notifications, and automatically triggers an emergency rollback to the last known good backup.
- **CLI and WebSocket Integration:** Provides intuitive CLI commands for real-time inspection (e.g. `--build-live`, `--detect-anomaly`, `--diagnostic-summary-naN`) and a WebSocket server that broadcasts updates, ensuring operational transparency.

## Implementation Details

- **Live Data Processing and Validation:**
  - Fetches live data from endpoints such as `https://api.publicapis.org/entries` with retry logic using exponential backoff.
  - Validates schema (e.g. ensures the `entries` array exists and is non-empty) and logs anomalies with aggregated diagnostics.

- **Diagnostic Telemetry & Environment Variable Handling:**
  - Aggregates warnings for non-numeric environment variable inputs using a debounced batching mechanism.
  - Supports configurable thresholds (via `NANFALLBACK_WARNING_THRESHOLD`) and provides CLI overrides for live data retry options.

- **Automated Rollback Mechanism:**
  - On anomaly detection, attempts to restore the last known good ontology from a backup file (`ontology-backup.json`).
  - Broadcasts the rollback status via WebSocket notifications and logs detailed diagnostic telemetry.

- **Output and Export:**
  - Enables exporting the aggregated telemetry in JSON or CSV format using CLI flags (`--export-telemetry` with optional `--format csv`).
  - Centralizes CLI commands for building, updating, merging, and refreshing ontologies.

## Usage & Benefits

- **Streamlined Functionality:** Consolidates disparate diagnostic and live data functionalities into a single, maintainable module.
- **Enhanced Reliability:** Rapid anomaly detection with automated rollback minimizes downtime and ensures data integrity.
- **Operational Transparency:** Real-time telemetry and WebSocket notifications empower users to monitor and manage ontology updates efficiently.
- **Simplified Maintenance:** Merging overlapping services reduces code complexity and aligns with the mission of live, verified data integration.
