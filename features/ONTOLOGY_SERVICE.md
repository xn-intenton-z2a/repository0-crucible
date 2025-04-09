# ONTOLOGY_SERVICE

The ONTOLOGY_SERVICE feature manages live OWL ontologies via an HTTP API and provides extensive diagnostics, telemetry, and data crawling capabilities. This updated specification further integrates environment variable telemetry and real-time data crawling endpoints in order to enhance system observability and ensure robust live data integration.

## Overview

- **Live Data Integration & Auto Refresh:** Retrieves and updates live ontology data from verified endpoints with configurable refresh intervals. Both automatic and manual triggers are supported.
- **HTTP API Endpoints:** Provides a suite of endpoints to access, update, export, and query ontologies. New endpoints have been added to support data crawling and aggregated telemetry summaries.
- **Enhanced Security & Logging:** Retains robust API key verification, real-time notifications via WebSocket, and comprehensive diagnostic logging.
- **Integrated Diagnostics & Telemetry:** Aggregates diagnostic logs including environment variable parsing warnings. Invalid (non-numeric) environment variable inputs are batched, summarized, and can be retrieved via CLI flags (e.g. `--diagnostic-summary-naN`) and API endpoints.
- **Data Crawling Functionality:** Concurrently gathers data from a broad range of public endpoints. Results are separated into successful fetches and errors, enabling rapid troubleshooting.

## HTTP API Endpoints

- **GET /ontology:** Returns the current ontology as JSON.
- **POST /refresh:** Triggers a live data refresh, persists the updated ontology, and broadcasts a WebSocket notification.
- **GET /export:** Exports the current ontology in OWL XML format.
- **POST /update:** Updates ontology metadata via JSON payload.
- **GET /query:** Searches for ontology concepts based on query parameters.
- **GET /diagnostics:** Provides a detailed JSON payload of aggregated diagnostic logs, including environment variable warnings.
- **GET /crawl:** Initiates data crawling across public endpoints. It returns a structured result separating successes (with endpoint data and generated ontology XML) and errors with failure messages.

## Diagnostic Dashboard

The Diagnostic Dashboard has been enriched to include:

- **Real-Time Telemetry Display:** In addition to standard diagnostic information, it now lists aggregated environment variable issues. Non-numeric inputs (e.g. variations of "NaN") are recorded with counts, raw input, and timestamps.
- **System Health & Data Crawl Status:** Presents a summary of the live data crawl operations, including any endpoint failures and retry attempts.
- **Interactive Interface:** A simple HTML dashboard with auto-refresh capability, supporting filtering and sorting of diagnostics and telemetry data.

## Environment Variable Telemetry

- **Aggregation of Warnings:** Environment variable parsing errors (such as non-numeric inputs in critical variables) are captured and batched. A configurable threshold (set via `NANFALLBACK_WARNING_THRESHOLD`) governs the number of warning logs per unique input.
- **Accessible Summary:** The aggregated telemetry is accessible through CLI flags (e.g. `--diagnostic-summary-naN`) and integrated within the diagnostics API for realtime monitoring.

## Benefits and User Impact

- **Improved Observability:** Administrators and developers can immediately view both system health and configuration issues via the diagnostic dashboard and dedicated API endpoints.
- **Enhanced Reliability:** By integrating retry logic, exponential backoff in data crawling, and detailed telemetry on environment configuration, troubleshooting is accelerated and system stability is improved.
- **Streamlined API Interface:** A consistent and well-documented HTTP API provides a single point of access for both live data operations and diagnostic reporting, reducing complexity for users.

## Implementation Details

- **API Consolidation:** All ontology management functions have been centralized into a unified HTTP API module.
- **Diagnostic Enhancements:** The diagnostic logging now includes real-time aggregation of environment variable issues alongside existing system and operation logs.
- **Data Crawling Endpoint:** The new /crawl endpoint utilizes promise-based batching to concurrently fetch data from multiple public endpoints, categorizing results as successes or errors.
- **Seamless Integration:** The updated diagnostics and telemetry flow is fully integrated with existing diagnostic functions and WebSocket notifications, ensuring minimal disruption to users.

This enhanced ONTOLOGY_SERVICE feature aligns with the mission of dynamically building live-data driven OWL ontologies while providing actionable insights into system configuration and performance.