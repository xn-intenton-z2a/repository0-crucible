# Ontology Service and Telemetry

This updated feature consolidates ontology management with integrated diagnostic telemetry capabilities. The service unifies live data integration, secure ontology operations, and aggregated telemetry reporting into a single cohesive module. Diagnostic telemetry now includes aggregated summaries of environment variable parsing anomalies such as non-numeric inputs, accessible via both a dedicated HTTP `/telemetry` endpoint and a CLI flag (`--diagnostic-summary-naN`).

## Overview

- **Unified Ontology Management:** Performs live data integration to build, update, refresh, backup, query, and merge ontologies. A static fallback remains available for emergencies.
- **Integrated Telemetry:** Aggregates diagnostic events related to environment variable normalization errors (e.g., invalid non-numeric inputs). Each unique anomaly is logged once, with details including the raw input, CLI override indicator, and timestamp. Aggregated summaries are accessible via the CLI and HTTP.
- **Enhanced Security and Notifications:** Incorporates API key verification for data-modifying operations and broadcasts real-time notifications via WebSocket upon key ontology events.

## Implementation Details

- **Live Data Integration:** Fetches ontological data from verified public endpoints with exponential backoff, configurable via environment variables and CLI override flags. Error handling falls back to a static ontology when necessary.
- **Diagnostic Telemetry:** Merges functionalities from the legacy telemetry summary feature. Environment variable parsing errors trigger asynchronous, batched warnings and aggregated logging. The telemetry summary is exposed over HTTP at `/telemetry` and via the CLI flag `--diagnostic-summary-naN`.
- **Security and Notifications:** Security middleware enforces API key authentication. Ontology updates broadcast update messages (including updated ontology title, version, timestamp, and status message) to connected WebSocket clients.

## Usage Example

1. **Launching the Service:**
   - Run the CLI tool with commands such as `--build-live`, `--refresh`, or `--merge-persist` to manage ontologies.
   - Use `--diagnostic-summary-naN` to view aggregated telemetry for environment variable anomalies.
   - Start the web server with `--serve` to enable both HTTP endpoints and the integrated WebSocket server.

2. **Accessing Telemetry Data:**
   - HTTP: Navigate to `http://localhost:<port>/telemetry` for a JSON summary of diagnostic logs.
   - CLI: Run `node src/lib/main.js --diagnostic-summary-naN` to output the aggregated telemetry report.

## Benefits and User Impact

- **Simplified Maintenance:** Merging telemetry diagnostics with ontology operations reduces duplication and streamlines troubleshooting.
- **Improved Debugging:** Aggregated telemetry provides actionable insights for configuration issues, helping users quickly identify and resolve environment variable errors.
- **Enhanced Security and Real-Time Updates:** Secure operations combined with notifications keep users informed of changes as they occur.
