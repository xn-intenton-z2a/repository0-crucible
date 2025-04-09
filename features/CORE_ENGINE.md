# CORE_ENGINE: Unified Live Data, Diagnostics & Service Engine

## Overview
This feature integrates live data ingestion, anomaly detection, comprehensive diagnostics, telemetry aggregation, scheduling, RDF export, and an in-memory caching mechanism into a single unified engine. It consolidates the diagnostic logging and interactive CLI telemetry viewer previously housed in the DIAGNOSTICS module, streamlining maintenance and improving developer experience.

## Live Data Integration & Anomaly Detection
- **Live Data Ingestion:** Continually fetches live data from verified public endpoints and validates it against expected schemas.
- **Anomaly Detection & Rollback:** Detects anomalies such as missing or empty data arrays. On detection, triggers detailed diagnostic logging, WebSocket notifications, and an automated rollback to the last known good backup.
- **Interactive Feedback:** Provides real-time logs and alerts to assist in troubleshooting and rapid diagnosis.

## Unified Diagnostics & Telemetry
- **Centralized Logging:** Merges legacy inline logging with advanced diagnostic telemetry for environment variable parsing, explicit and implicit NaN inputs, and operational events.
- **Telemetry Aggregation & Export:** Aggregates diagnostic logs and telemetry data that can be exported via CLI flags in JSON or CSV formats.
- **Interactive CLI Viewer:** Retains an interactive telemetry viewer that displays aggregated logs in a user-friendly table format, offering real-time summaries and context for troubleshooting.

## Scheduling, RDF Export & Live Data Caching
- **Scheduled Maintenance:** Manages tasks for ontology refreshing, backups, and merging, configurable via environment variables and CLI commands.
- **RDF Export Functionality:** Converts the dynamically built ontology into standardized RDF formats (Turtle or RDF/XML) and integrates with export commands.
- **In-Memory Caching:** Implements a caching layer for live data fetches with configurable TTL, reducing redundant network calls and improving performance.

## CLI & Web Interface Integration
- **Unified Interface:** Shares a single server instance to support CLI commands, HTTP endpoints (including a status endpoint and telemetry data endpoint), and GraphQL queries.
- **Interactive Help & Real-Time Updates:** Integrates enhanced CLI help that offers command suggestions and contextual usage information, along with real-time WebSocket updates during key ontology operations.

## Migration and Backwards Compatibility
- **Seamless Transition:** Merges the previously separate DIAGNOSTICS module into the CORE_ENGINE, ensuring all legacy CLI flags (e.g., for telemetry export and diagnostic summaries) remain active.
- **Documentation Updates:** README and CONTRIBUTING documents will be updated to reflect the consolidated functionalities and new interactive interface.

## Benefits
- **Centralized Management:** A single engine that reduces code duplication and simplifies operational workflows.
- **Enhanced Visibility:** Real-time diagnostics and aggregated telemetry provide immediate insights into operational health.
- **Improved Performance:** Efficient live data caching and scheduling reduce network overhead and streamline data processing.
- **User-Friendly Interface:** Consolidated CLI and web endpoints lower the learning curve and improve overall developer productivity.