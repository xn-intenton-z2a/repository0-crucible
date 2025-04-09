# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature provides comprehensive management and live integration of OWL ontologies using verified public endpoints. This service not only builds dynamic ontologies but also incorporates enhanced diagnostics, aggregated telemetry, and real-time notifications via HTTP and WebSocket endpoints.

## Overview

- **Live Data Integration & Auto Refresh:**
  - Retrieves ontology data from live endpoints using configurable retry counts and delays.
  - Supports both automatic periodic refresh and manual triggering via API endpoints.
  - In emergency cases, a static fallback mode is available.

- **HTTP API Endpoints:**
  - **GET /ontology:** Returns the current ontology in JSON format.
  - **POST /refresh:** Triggers a live data refresh, persists the updated ontology, and broadcasts notifications.
  - **GET /export:** Exports the ontology in OWL XML format.
  - **POST /update:** Updates ontology metadata based on JSON input.
  - **GET /query:** Searches ontology concepts.
  - **GET /diagnostics:** Returns detailed diagnostic logs including environment variable warnings.
  - **GET /diagnostics/naN:** Returns an aggregated telemetry summary of non-numeric environment variable inputs.
  - **GET /crawl:** Initiates concurrent data crawling across various public endpoints, separating successes and errors.

- **Enhanced Diagnostics & Telemetry:**
  - Detailed logging of live data attempts, with exponential backoff and jitter.
  - Aggregation of telemetry regarding non-numeric environment variables (e.g., inputs like "NaN" in various formats) with a configurable warning threshold (via the environment variable `NANFALLBACK_WARNING_THRESHOLD`).
  - Strict mode support: When enabled, non-numeric values throw errors instead of falling back.

- **WebSocket Notifications:**
  - A real-time notification system broadcasts JSON payloads when key ontology events occur (refresh, update, merge).
  - Payload includes updated ontology title, tool version, timestamp, and a status message.

- **CLI Integration:**
  - Comprehensive command line support for building, updating, querying, and managing ontology data.
  - Command line flags allow for overriding default environment variable values (e.g., `--livedata-retry-default` and `--livedata-delay-default`), triggering diagnostic summary views (`--diagnostic-summary-naN`), and even disabling live data integration (`--disable-live`).

- **Data Persistence & Merging:**
  - Ontologies can be persisted to JSON files, backed up, cleared, and merged using both static and live data sources.
  - Utility functions provide support for merging multiple ontology models, each enriched with a timestamp.

## Benefits and User Impact

- **Improved Observability:** 
  - Aggregated diagnostic telemetry provides administrators with insights into environment variable misconfigurations and live data integration issues.

- **Reliability and Resilience:**
  - Exponential backoff mechanisms, detailed error logs, and fallback strategies ensure smooth operation even when some live endpoints fail.

- **Real-Time Updates:**
  - Through WebSocket notifications, clients receive immediate updates upon ontology changes, enhancing integration with downstream systems.

- **Flexible Integration:**
  - Multiple endpoints and CLI options make the service adaptable to diverse deployment environments and operator needs.

This comprehensive feature aligns with the mission of building dynamic, live-data driven OWL ontologies while providing robust diagnostics and real-time operational visibility.
