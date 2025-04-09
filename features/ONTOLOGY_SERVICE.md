# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature provides comprehensive management of live OWL ontologies via an HTTP API. It offers live data integration, auto-refresh capabilities, extensive diagnostics including environment variable parsing and telemetry, and robust data crawling. This updated specification now includes an extended section for aggregated telemetry summary that consolidates NaN fallback warnings from the environment variable parsing routine.

# Overview

- **Live Data Integration & Auto Refresh:** Retrieves and updates live ontology data from verified endpoints with configurable refresh intervals. Automatic and manual triggers are supported.
- **HTTP API Endpoints:** Provides a suite of endpoints to access, update, export, and query ontologies, as well as specialized endpoints for data crawling and enhanced diagnostics.
- **Enhanced Security & Logging:** Retains robust API key verification, real-time notifications via WebSocket, and comprehensive diagnostic logging.
- **Integrated Diagnostics & Telemetry:** Aggregates diagnostic logs including environment variable parsing warnings. Invalid non-numeric inputs (e.g., variations of "NaN") are captured and batched for review.

# Aggregated Telemetry Summary

- **NaN Fallback Telemetry:** When environment variables contain non-numeric values, a warning is logged and detailed telemetry is generated. This telemetry captures the raw input, normalized value, count of occurrences, and timestamps.
- **Configurable Warning Threshold:** The number of warnings logged per unique normalized invalid input is controlled by the `NANFALLBACK_WARNING_THRESHOLD` environment variable (default is 1).
- **CLI & API Access:** The aggregated telemetry summary is accessible via the CLI flag `--diagnostic-summary-naN` and can be exposed via a dedicated HTTP API endpoint (e.g. GET `/diagnostics/naN`) for real-time monitoring.

# HTTP API Endpoints

In addition to existing endpoints, the following are noteworthy:

- **GET /ontology:** Returns the current ontology as JSON.
- **POST /refresh:** Triggers a live data refresh, persists the updated ontology, and broadcasts an update via WebSocket.
- **GET /export:** Exports the current ontology in OWL XML format.
- **POST /update:** Updates ontology metadata via JSON payload.
- **GET /query:** Searches for ontology concepts based on query parameters.
- **GET /diagnostics:** Provides a detailed JSON payload of aggregated diagnostic logs, including environment variable warnings.
- **GET /crawl:** Initiates data crawling across public endpoints. It separates fetch successes and errors.
- **GET /diagnostics/naN:** (New) Returns the aggregated telemetry summary for environment variable NaN fallback warnings.

# Benefits and User Impact

- **Improved Observability:** Users gain immediate insights into both system health and misconfigured environment variables through aggregated telemetry data.
- **Enhanced Reliability:** By capturing and aggregating telemetry on invalid environment variable inputs, administrators can address configuration issues proactively.
- **Seamless Integration:** Enhanced diagnostics are integrated with existing endpoints and broadcasts, reducing fragmentation and ensuring that all ontology operations produce actionable insights.

This extension aligns with the mission of dynamically building live-data driven OWL ontologies and significantly improves system observability and troubleshooting capabilities.
