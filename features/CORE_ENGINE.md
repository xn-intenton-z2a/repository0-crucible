# CORE_ENGINE: Unified Live Data, Diagnostics, Service, and Recovery Engine

## Overview
This feature integrates live data ingestion, anomaly detection, comprehensive diagnostics, telemetry aggregation, scheduling, RDF export, in-memory caching, and now, automated backup and rollback. It consolidates multiple functionalities such as diagnostic logging, telemetry summaries, and real-time notifications into a unified engine that powers the overall ontology management workflow.

## Live Data Integration & Anomaly Detection
- **Live Data Ingestion:** Continually fetches live data from verified public endpoints and validates it against expected schemas.
- **Anomaly Detection & Feedback:** Detects anomalies (e.g., missing or empty data arrays) and triggers detailed diagnostic logging and real-time WebSocket alerts.

## Unified Diagnostics & Telemetry
- **Centralized Logging:** Merges legacy inline logging with advanced diagnostic telemetry. Logs include environment variable normalization, NaN fallback events, and operational events.
- **Telemetry Aggregation & Export:** Aggregates diagnostic logs and telemetry data. Telemetry can be exported in JSON or CSV formats via CLI commands.
- **Interactive CLI Viewer:** Displays aggregated logs in a user-friendly interface for real-time troubleshooting.

## Scheduling, RDF Export & Live Data Caching
- **Scheduled Maintenance:** Manages tasks such as ontology refreshing, backups, and merges, configurable via environment variables and CLI commands.
- **RDF Export:** Converts dynamically built ontologies into standardized RDF formats (Turtle or RDF/XML) for external integrations.
- **In-Memory Caching:** Implements a caching layer for live data fetches with a configurable Time-To-Live (TTL) to optimize performance.

## Backup & Automated Rollback
- **Backup Mechanism:** Regularly saves the current ontology state to a backup file (e.g., `ontology-backup.json`) to be used for recovery during data anomalies.
- **Automated Rollback:** In the event of detected anomalies, the system attempts to restore the last known good backup automatically. Rollbacks are logged in detail and trigger WebSocket notifications to inform connected clients of the recovery status.
- **Diagnostic Insights:** Detailed logs and aggregated telemetry around rollback events provide insights into the nature of data anomalies and system recoveries.

## CLI & Web Interface Integration
- **Unified Server Instance:** Supports CLI commands, HTTP endpoints (for status and telemetry data), and GraphQL queries under a single server instance.
- **Real-Time Notifications:** Uses WebSocket to broadcast updates during key ontology operations including refreshes, merges, and rollbacks.
- **Enhanced Interactive Help:** Provides command suggestions and contextual help, ensuring smoother navigation between core functionalities.

## Migration and Backwards Compatibility
- **Seamless Integration:** All legacy CLI commands (for diagnostics, export/import, etc.) remain active. The backup and rollback systems are now integrated without impacting existing user workflows.
- **Updated Documentation:** README and CONTRIBUTING guides have been updated to reflect the enhanced recovery mechanisms alongside the traditional live data and diagnostics capabilities.

## Benefits
- **Increased Reliability:** Automated backup and recovery mechanisms significantly reduce downtime during data anomalies.
- **Centralized Management:** A single engine now manages live data ingestion, diagnostics, telemetry, caching, and recovery, reducing code duplication and complexity.
- **Enhanced Visibility:** Detailed diagnostic logs and real-time notifications provide immediate insights into system health and recovery actions.
- **User-Friendly:** The integrated CLI and web interfaces ease operational workflows, ensuring users receive real-time feedback and recovery status alerts.
