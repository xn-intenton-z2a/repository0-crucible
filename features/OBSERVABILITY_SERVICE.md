# OBSERVABILITY SERVICE

The Observability Service consolidates all diagnostic telemetry, environment variable warning aggregation, and anomaly detection functionalities into one coherent module. It merges the functions from the separate telemetry feature with overlapping diagnostic and monitoring aspects found in the Ontology Service, providing a single source of truth for system health and debug data.

## Overview

- **Aggregated Diagnostics:** Collects, batches, and normalizes diagnostic warnings—especially for non-numeric or malformed environment variable inputs—and aggregates detailed telemetry for later analysis.
- **Anomaly Detection Integration:** Monitors live data for schema inconsistencies (e.g., missing or empty `entries`) and logs anomaly details. This integration supports automated decision-making in case of failures, including triggering rollback procedures.
- **Flexible Export Options:** Supports exporting aggregated telemetry and diagnostic summaries in both JSON and CSV formats via dedicated CLI commands (e.g. `--export-telemetry` and `--diagnostic-summary-naN`).
- **Debounced Batching:** Employs a debounced batching mechanism for telemetry events to reduce log flooding, ensuring performance under high-concurrency scenarios.
- **CLI Integration:** Provides intuitive CLI flags for real-time inspection of diagnostics and anomaly status, making it easier for operators to understand system state during live operations.

## Implementation Details

- **Data Aggregation & Normalization:**
  - Consolidates warnings and telemetry data originating from environment variable parsing. 
  - Aggregates repeated non-numeric inputs by using a configurable threshold (`NANFALLBACK_WARNING_THRESHOLD`).
  - Utilizes inline normalization to ensure consistent and traceable logging of invalid inputs.

- **Anomaly Detection:**
  - Validates live data against schema expectations, specifically checking for the presence and non-emptiness of critical fields such as the `entries` array.
  - Logs detailed diagnostic messages and prepares a telemetry payload that can trigger automated rollback if necessary.

- **Export and Reporting:**
  - Offers CLI commands to export telemetry in multiple formats, facilitating integration with external monitoring tools.
  - Implements debounced flushing of telemetry events to aggregate data within a short time frame before output.

## Usage & Benefits

- **Enhanced Debugging:** Operators receive a consolidated view of system anomalies and diagnostic logs, simplifying troubleshooting and proactive maintenance.
- **Operational Transparency:** Real-time telemetry reports and aggregated diagnostic summaries help ensure that system health is continuously monitored.
- **Streamlined Maintenance:** By merging overlapping telemetry and diagnostic functionalities into one service, the codebase is simplified and easier to maintain.
- **CLI Empowerment:** Direct CLI commands enable quick access to diagnostic data, anomaly detection reports, and telemetry exports, supporting both manual and automated workflows.
