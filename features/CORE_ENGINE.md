# CORE_ENGINE: Unified Live Data, Diagnostics, Service, and Recovery Engine

## Overview
This feature integrates live data ingestion, anomaly detection, comprehensive diagnostics, telemetry aggregation, scheduling, RDF export, in-memory caching, and automated backup and rollback into a single robust engine. In this update, we enhance the rollback mechanism with custom backup scheduling and detailed real-time notifications to alert users of both successful and failed recovery attempts. 

## Live Data Integration & Anomaly Detection
- **Live Data Ingestion:** Continuously fetches live data from verified public endpoints and validates it against expected schemas.
- **Anomaly Detection:** Monitors the live data for inconsistencies (e.g., missing or empty data arrays) and triggers detailed diagnostic logging alongside real-time WebSocket alerts.

## Unified Diagnostics & Telemetry
- **Centralized Logging:** Combines legacy inline logging and advanced diagnostic telemetry for a comprehensive view of system operations.
- **Telemetry Aggregation:** Collects and exports diagnostic logs and telemetry data in formats such as JSON or CSV via CLI commands.
- **Diagnostic Feedback:** Provides immediate, timestamped logs during data ingestion, backup, and rollback operations.

## Scheduling, RDF Export & Live Data Caching
- **Scheduled Maintenance:** Manages routine tasks such as ontology refreshes, backups, and merges. Backup intervals can now be configured by the user.
- **RDF Export:** Converts ontologies into standardized RDF formats (Turtle or RDF/XML) for external integrations.
- **In-Memory Caching:** Implements a caching layer with a configurable Time-To-Live (TTL) to optimize live data fetching performance.

## Backup, Automated Rollback & Enhanced Notifications
- **Backup Mechanism:** Regularly saves the current state of the ontology as a backup file (e.g., `ontology-backup.json`) for rapid recovery during anomalies.
- **Automated Rollback:** In the event of data anomalies, the system automatically attempts to restore the last known good backup.
- **Enhanced Rollback Notifications:** Provides detailed real-time notifications (via WebSocket and CLI logs) on the outcome of rollback attempts, including explicit indications for both success and failure.
- **Custom Backup Scheduling:** Offers user-configurable backup intervals to better align with different operational needs and data update frequencies.

## CLI & Web Interface Integration
- **Unified Server Instance:** Both CLI commands and HTTP endpoints for status, telemetry, and GraphQL queries operate on a single server instance.
- **Real-Time Notifications:** Key ontology operations (refresh, merge, rollback, update) trigger WebSocket notifications that include the updated ontology title, version, timestamp, and a descriptive status message.
- **Interactive Diagnostics Viewer:** An integrated CLI viewer displays aggregated logs in real-time, aiding quick troubleshooting and system monitoring.

## Migration and Backwards Compatibility
- **Seamless Upgrade:** All legacy CLI commands and functionalities remain supported, ensuring a smooth transition to the enhanced engine.
- **Updated Documentation:** README and CONTRIBUTING guides have been revised to incorporate the new backup scheduling and enhanced rollback notification details.

## Benefits
- **Increased System Robustness:** User-configurable backup scheduling and detailed rollback notifications reduce downtime and improve recovery reliability.
- **Centralized Management:** A single engine now efficiently manages live data integration, diagnostics, caching, and recovery, minimizing complexity.
- **Improved Visibility:** Detailed, real-time feedback through logs and notifications provides immediate clarity on system health and operational outcomes.
- **Enhanced User Experience:** Integrated CLI and web interfaces streamline operational workflows, offering swift insights into system status and recovery actions.