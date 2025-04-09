# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature provides a robust framework for integrating live public data sources into dynamic OWL ontologies. This service orchestrates data retrieval, anomaly detection, diagnostics, persistence, and real-time notifications, all in a single repository compliant with the project mission.

# Live Data Integration

- **Dynamic Data Retrieval:** Periodically fetches live ontology data from verified public endpoints such as `https://api.publicapis.org/entries` and others.
- **Manual & Scheduled Refresh:** Supports CLI and HTTP endpoints for on-demand refreshes and manual triggering. 
- **Static Fallback:** When live data cannot be obtained, the service gracefully falls back to a legacy static mode, ensuring continuity.

# Diagnostics and Telemetry

- **Enhanced Logging:** Implements detailed diagnostic logging with exponential backoff and jitter for retries. Logs include timestamped messages and aggregated telemetry for issues such as malformed environment variables.
- **Environment Variable Parsing:** Integrates normalization and robust fallback mechanisms. Aggregates warnings for non-numeric inputs and provides a CLI summary via the `--diagnostic-summary-naN` flag.
- **Strict Mode Option:** In strict mode, non-numeric inputs issued via command line or environment variables result in immediate errors to enforce data integrity.

# Real-Time Anomaly Detection

- **Schema Validation:** Validates live data by ensuring required fields (e.g., non-empty `entries` array) are present. Returns detailed error objects if anomalies are detected.
- **CLI Testing:** Includes a CLI flag (`--detect-anomaly`) to simulate anomaly scenarios with provided JSON data, ensuring that any abnormalities are promptly reported and diagnostic logs are updated.

# HTTP API & CLI Endpoints

- **Comprehensive Commands:** Supports a variety of operations such as building, updating, querying, exporting (to OWL XML), and merging ontologies.
- **WebSocket Notifications:** Leverages a built-in WebSocket server to broadcast JSON notifications detailing operations (e.g., ontology refreshes, updates, anomaly alerts) to connected clients, aligning with live operational monitoring requirements.

This refined specification not only consolidates existing functionality but also enhances data integrity and real-time operational awareness, thereby advancing the mission of building resilient, live-data driven ontologies.
