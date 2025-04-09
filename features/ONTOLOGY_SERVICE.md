# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature continues to manage live OWL ontologies via an HTTP API and now includes a more robust diagnostic and telemetry framework that consolidates both operational health and environment variable diagnostics. This unified service ensures real-time monitoring, enhanced logging, and aggregated telemetry reporting to aid in rapid troubleshooting and performance management.

## Overview

- **Live Data Integration & Auto Refresh:** Continues to integrate live data from verified endpoints with support for configurable refresh intervals and both automated and manual triggering.
- **HTTP API Endpoints:** In addition to existing endpoints (GET /ontology, POST /refresh, GET /export, POST /update, GET /query), a dedicated diagnostics endpoint (GET /diagnostics) is provided.
- **Security & Logging:** Retains API key checks, real-time notifications via WebSocket, and robust logging of ontology operations and HTTP interactions.
- **Environment Telemetry & Diagnostics:** In response to the need for error handling in environment variable parsing, this feature now integrates an aggregated telemetry system. Invalid or non-numeric environment inputs trigger asynchronous, batched warnings and are aggregated in telemetry reports. Users can access these details via a new CLI flag (`--diagnostic-summary-naN`) and through the diagnostics endpoint. This additional layer of telemetry logs details including the raw input value, the parsing context and whether the input came via a CLI override.

## HTTP API Endpoints

- **GET /ontology:** Returns the current ontology as JSON.
- **POST /refresh:** Triggers a live data refresh of the ontology, persists updates, and broadcasts a WebSocket notification.
- **GET /export:** Exports the current ontology in OWL XML format.
- **POST /update:** Updates ontology metadata based on a JSON payload.
- **GET /query:** Executes search queries against ontology concepts.
- **GET /diagnostics:** Returns a detailed JSON payload combining the following:
  - **Diagnostic Summary:** A timestamped message and current system version (via enhancedDiagnosticSummary()).
  - **Aggregated Environment Telemetry:** Summarizes all invalid environment variable parsing events (via getAggregatedNaNSummary()), facilitating quick identification of configuration issues.

## Implementation Details

- **API Consolidation:** The service aggregates all ontology management functions and diagnostic routines under a single module. The GET /diagnostics endpoint now returns both system health and environmental telemetry data.
- **Enhanced Logging & Telemetry:** Diagnostic messages are logged asynchronously using promise-based batching. Each unique environment variable parsing error is logged only once with a telemetry record detailing the raw input, normalization process, the use of CLI overrides, and a timestamp.
- **Integration with Notifications:** Ontology update events are broadcast to all connected WebSocket clients. This notification includes version details, update timestamps, and a status message (e.g., "Ontology refreshed").

## Benefits and User Impact

- **Proactive Diagnostics:** The aggregated telemetry for environment variable inputs ensures that misconfigurations are identified quickly and handled consistently, reducing runtime errors.
- **Unified Health Monitoring:** By merging live data diagnostics with environment and operational logging, users have a single, comprehensive view of the system's health.
- **Improved Developer Experience:** Enhanced documentation and clear CLI flags save troubleshooting time and improve overall confidence in the live data integration and system configuration.

This updated feature aligns directly with the mission of dynamically building live-data driven OWL ontologies with an emphasis on robust diagnostics and efficient troubleshooting.
