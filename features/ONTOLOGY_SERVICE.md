# Ontology Service

The Ontology Service is the central engine of owl-builder, responsible for building, updating, validating, and persisting OWL ontologies by leveraging live, verified public data sources. This service integrates robust live data fetching, real-time anomaly detection, and enriched diagnostic telemetry, while also exposing a series of CLI commands for enhanced operational control.

# Live Data Integration

- Fetches live data from trusted public APIs with retry logic including exponential backoff and jitter.
- Falls back to a legacy static ontology build only when live data retrieval fails.
- Supports CLI overrides for parameters such as retry counts and initial delays to ensure flexible deployments.

# Real-Time Anomaly Detection

- Validates live data retrieval by ensuring that key schema properties (e.g. non-empty 'entries' arrays) are present.
- When anomalies are detected (missing or empty data arrays), logs detailed diagnostic messages and triggers WebSocket alerts with comprehensive metadata.
- Provides a dedicated CLI command (`--detect-anomaly`) to simulate anomaly scenarios for testing and debugging purposes.

# Diagnostic Telemetry and Environment Variable Handling

- Implements advanced telemetry batching to aggregate warnings for non-numeric environment variable inputs, avoiding log flooding.
- Normalizes environment variables to ensure consistency. In strict mode, non-numeric inputs will immediately throw errors.
- Offers a CLI command (`--export-telemetry`) to export aggregated telemetry data in JSON (default) or CSV formats, supporting operational monitoring and debugging.

# WebSocket Notifications

- Integrates a WebSocket server that broadcasts real-time notifications for key ontology operations such as refreshes, updates, and merges.
- Notifications include updated ontology title, version, timestamp, and a descriptive status message, ensuring that connected clients are promptly informed of system state changes.

# Enhanced Diagnostic and Simulation Mode

- Introduces additional diagnostics for simulating failures and viewing detailed telemetry summaries via CLI commands (e.g. `--diagnostic-summary`, `--diagnostic-summary-naN`).
- Aggregates detailed telemetry data such as NaN fallback incidents, including counts, timestamps, and CLI override indicators.
- Enables developers to trigger simulated anomaly states to test end-to-end error handling and recovery workflows without external disruptions.

This comprehensive service framework consolidates the core functionalities of ontology management while integrating enhanced monitoring, diagnostics, and simulation capabilities, aligning with the mission of handling live data in a robust and transparent manner.