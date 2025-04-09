# Ontology Service

This feature consolidates all ontology management functionalities into a single, cohesive service. It provides CLI and RESTful HTTP interactions to build, update, query, persist, and manage ontologies with a strong emphasis on live data integration and enhanced diagnostics.

## Overview

- **Unified Management:** Combines legacy and live data ontology building, offering both CLI commands and HTTP endpoints for ontology operations.
- **Live Data Integration & Fallback:** Leverages verified public endpoints to construct ontologies in real time, while retaining a static fallback for emergencies.
- **Authentication & Security:** Secures data-modifying operations with API key or token-based authentication and includes robust diagnostic logging.
- **Enhanced Diagnostics & Telemetry:** Implements detailed diagnostic logging for failed data fetch attempts and environment variable parsing anomalies. Telemetry data includes timestamps, raw inputs, CLI override flags, and aggregated event counts.

## Telemetry API & Aggregated Diagnostics

- **HTTP Endpoint Addition:** Extends the ontology service HTTP server with a new `/telemetry` endpoint. When accessed, this endpoint calls the function `getAggregatedNaNSummary()` to retrieve aggregated telemetry data on environment variable parsing failures (for example, non-numeric inputs encountered during configuration).
- **CLI Integration:** Provides a new CLI flag `--diagnostic-summary-naN` that outputs aggregated telemetry data. This aggregation batches multiple occurrences of similar invalid inputs, logging a single diagnostic warning per unique normalized value.
- **Benefits:**
  - **Real-Time Diagnostics:** Immediate access to telemetry data for troubleshooting environment configuration issues.
  - **Proactive Monitoring:** Aggregated telemetry helps detect repeated configuration issues and facilitates proactive system maintenance.
  - **Unified User Experience:** Consistent integration across CLI and HTTP interfaces within the ontology service.

## Implementation Details

- **Live Data vs. Fallback:** If live data integration is disabled via configuration (`DISABLE_LIVE_DATA`), the service falls back to a static ontology, with a clear warning logged.
- **Environment Variable Parsing:** The feature includes inline utilities to normalize, parse, and verify environment variable inputs. In non-strict mode, non-numeric inputs trigger a one-time telemetry event, while in strict mode an error is thrown immediately.
- **Asynchronous Telemetry Logging:** Uses a promise-based batching mechanism to ensure that repeated invalid inputs are logged atomically, even under high concurrency.
- **WebSocket Notifications:** When key operations occur (refresh, merge, or update), the service broadcasts a JSON payload, including the updated title, version, timestamp, and status message, to all connected WebSocket clients.

## Benefits and User Impact

- **Robust Ontology Management:** Offers a reliable and secure platform for dynamic ontology building using live data streams.
- **Enhanced Observability:** The integrated telemetry API and aggregated diagnostics empower developers and operators to quickly detect, diagnose, and remediate configuration issues.
- **Seamless Integration:** By combining CLI commands and HTTP endpoints, users gain flexibility in how they operate and monitor the system.
- **Improved Quality Assurance:** Detailed logging and telemetry support contribute to stable deployments and easier troubleshooting during development and production.

With these enhancements, the Ontology Service remains focused on providing reliable, live data-driven ontology management while offering advanced diagnostics and monitoring capabilities to support robust production environments.