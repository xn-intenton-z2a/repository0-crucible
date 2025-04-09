# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature continues to manage live OWL ontologies with an HTTP API and now also integrates enhanced diagnostic telemetry endpoints. This update extends the existing endpoints by adding a diagnostics interface that provides real-time aggregated telemetry and health insights.

## Overview

- **Live Data Integration & Auto Refresh:** Continues to integrate live data from verified endpoints and supports configurable refresh intervals with both automated and manual triggering.
- **HTTP API Endpoints:** In addition to the existing endpoints (GET /ontology, POST /refresh, GET /export, POST /update, GET /query), a new endpoint is added for diagnostics.
- **Security & Notifications:** Retains API key checks, real-time WebSocket notifications, and robust logging with diagnostic telemetry.
- **Enhanced Diagnostics:** Exposes a new diagnostics endpoint to provide aggregated diagnostic summaries and telemetry related to environment variable parsing and other internal events.

## HTTP API Endpoints

- **GET /ontology:** Returns the current ontology as JSON.
- **POST /refresh:** Triggers a live data refresh of the ontology and persists updates.
- **GET /export:** Exports the current ontology in OWL XML format.
- **POST /update:** Updates ontology metadata based on JSON payload input.
- **GET /query:** Executes search queries against ontology concepts.
- **GET /diagnostics:** Returns a JSON payload containing diagnostic information:
  - **Diagnostic Summary:** Includes a timestamped message and system version (via enhancedDiagnosticSummary()).
  - **Aggregated Telemetry:** Provides details of NaN fallback events and environment variable parsing issues (via getAggregatedNaNSummary()).

## Implementation Details

- Extend the existing HTTP router to incorporate the GET /diagnostics endpoint.
- When this endpoint is invoked, the server should execute the following:
  - Call `enhancedDiagnosticSummary()` to gather a current health snapshot.
  - Call `getAggregatedNaNSummary()` to retrieve aggregated telemetry on invalid environment variable inputs.
  - Return a combined JSON response with both sets of diagnostics data.
- Maintain existing diagnostic logging and security measures, ensuring that only authorized users can access detailed diagnostics if necessary.
- Update documentation and usage examples in the README and CONTRIBUTING guidelines to reflect the new endpoint.

## Benefits and User Impact

- **Real-Time Health Monitoring:** Users can quickly retrieve a comprehensive view of the system’s diagnostic status.
- **Easier Troubleshooting:** Aggregated telemetry on environment variable issues and other diagnostic logs aid in faster debugging and system tuning.
- **Enhanced Transparency:** The diagnostics endpoint provides visibility into internal telemetry, bolstering user confidence in the system's live data integration and error handling capabilities.

This update aligns with the mission of building dynamic, live-data driven OWL ontologies and enhances the overall developer and operational experience through improved observability.