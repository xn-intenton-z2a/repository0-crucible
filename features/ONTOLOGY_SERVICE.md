# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature manages live OWL ontologies via an HTTP API with robust diagnostic, telemetry, and notification capabilities. This updated specification enhances the existing service by adding a Diagnostic Dashboard that presents real-time aggregated telemetry and diagnostic summaries in an easy-to-read, browser-based format.

## Overview

- **Live Data Integration & Auto Refresh:** Continuously retrieves and updates live ontology data from verified endpoints with configurable refresh intervals and both automatic and manual triggers.
- **HTTP API Endpoints for Ontology Management:** Provides endpoints such as GET /ontology, POST /refresh, GET /export, POST /update, and GET /query to support ontology access, updates, and querying.
- **Enhanced Security & Logging:** Retains robust API key checks, integrated real-time notifications via WebSocket, and comprehensive logging for all ontology operations.
- **Integrated Diagnostics & Telemetry:** Aggregates environment variable parsing errors into telemetry records. Invalid (non-numeric) input values trigger asynchronous warnings that are batched and summarized. This information can be retrieved through CLI flags (e.g. `--diagnostic-summary-naN`) and via dedicated API endpoints.

## HTTP API Endpoints

- **GET /ontology:** Returns the current ontology in JSON format.
- **POST /refresh:** Triggers live data refresh, persists the updated ontology, and broadcasts a WebSocket notification.
- **GET /export:** Exports the current ontology as an OWL XML document.
- **POST /update:** Updates ontology metadata using input JSON payload.
- **GET /query:** Searches ontology concepts based on query parameters.
- **GET /diagnostics:** Provides a detailed JSON payload including system health and aggregated environment telemetry logs.

## Diagnostic Dashboard

### Overview

To further empower users and administrators with actionable insights, a new Diagnostic Dashboard has been integrated into the ONTOLOGY_SERVICE. This dashboard is accessible via a new web endpoint and provides a browser-friendly view of critical diagnostic and telemetry information.

### Features

- **Real-Time Telemetry Display:** The dashboard lists aggregated telemetry records such as non-numeric environment variable warnings (including counts, raw input values, and timestamps).
- **System Health Summary:** Presents current diagnostic summaries, including the system version, timestamp, and status messages from operations like live data refresh and persistence.
- **Auto-Refresh Capability:** The dashboard automatically updates at regular intervals, ensuring that users are always viewing the latest diagnostic data.
- **Interactive Interface:** Offers a simple HTML layout where diagnostics are displayed in a clear table format, with options to filter or sort the telemetry data.

### Implementation Details

- **New Endpoint (/dashboard):** A dedicated HTTP GET endpoint (e.g. GET /dashboard) serves an HTML page that renders the diagnostic dashboard. This page queries existing diagnostic functions (such as `enhancedDiagnosticSummary()` and `getAggregatedNaNSummary()`) to display real-time status and telemetry information.
- **Client-Side Auto-Refresh:** Basic JavaScript on the dashboard page polls the diagnostics endpoint periodically (e.g., every 10 seconds) to update the display without full page reloads.
- **Seamless Integration:** Designed to run on the same HTTP server as existing endpoints, thus simplifying deployment and maintenance.

## Benefits and User Impact

- **Improved Visibility:** Users gain immediate insight into system health, environmental misconfigurations, and potential issues through both a JSON diagnostics endpoint and a user-friendly dashboard.
- **Faster Troubleshooting:** Aggregated telemetry helps quickly identify patterns in configuration errors, reducing time to resolution.
- **Enhanced Developer Experience:** By combining real-time notifications with a graphical diagnostic interface, developers and operators can better monitor live data integration and system performance.

This updated ONTOLOGY_SERVICE feature aligns with the mission of building dynamic, live-data-driven OWL ontologies. It enhances operational transparency and reliability by merging robust API functionality with a powerful, interactive diagnostic dashboard.
