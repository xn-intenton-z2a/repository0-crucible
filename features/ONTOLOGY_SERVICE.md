# Ontology Service and Telemetry (Updated with Auto Refresh)

This feature consolidates ontology management, live data integration, and diagnostic telemetry capabilities into a single cohesive module. In addition to its existing responsibilities, the service now includes an automatic scheduled refresh mechanism for the ontology, ensuring that the underlying data remains up-to-date with minimal manual intervention.

# Overview

- **Unified Ontology Management:** Performs live data integration to build, update, refresh, backup, query, and merge ontologies. A static fallback is available for emergencies.
- **Integrated Diagnostic Telemetry:** Aggregates diagnostic events from environment variable parsing anomalies (such as non-numeric inputs) and logs them with detailed telemetry data. Telemetry is exposed via a dedicated HTTP `/telemetry` endpoint and via the CLI using `--diagnostic-summary-naN`.
- **Security and Notifications:** Enforces API key verification for data-modifying operations and broadcasts real-time notifications via WebSocket to alert clients of ontology changes.
- **Scheduled Auto Refresh:** Introduces a configurable mechanism to automatically refresh the ontology at regular intervals. This ensures that the ontology reflects the most current live data without requiring manual triggers.

# Scheduled Auto Refresh

### Features

- **Automatic Refreshing:** When enabled, the service will automatically call the live data build and refresh routines at a regular interval specified by the environment variable `AUTO_REFRESH_INTERVAL` (in milliseconds). A sensible default (e.g., 60000 ms) is used when not specified.
- **Configuration:** Users can configure the refresh interval via `AUTO_REFRESH_INTERVAL` and override defaults via CLI flags if needed. When auto refresh is active, regular telemetry logs and notifications are triggered on each successful refresh.
- **Resource Efficiency:** Utilizes a single timer loop that gracefully integrates with existing telemetry and persistence functions, ensuring that resources are optimized and no duplicate refresh cycles occur.
- **Real-Time Updates:** Each scheduled refresh broadcasts an update notification through the integrated WebSocket server. This notification includes details such as the updated ontology title, version, timestamp, and a status message (e.g., "Ontology auto-refreshed").

# Implementation Details

- **Timer Initialization:** On service start-up, if `AUTO_REFRESH_INTERVAL` is defined and not set to disable auto refresh (e.g., using a value of 0), initialize a timer that invokes the refresh routine (`refreshOntology`) at the specified interval.
- **Error Handling:** In case the auto refresh process encounters any errors (e.g., network issues while fetching live data), the error is logged in the diagnostic telemetry. The timer continues running and will attempt the next refresh cycle as scheduled.
- **Integration with Notifications:** After each successful auto refresh, the updated ontology is persisted and a WebSocket notification is sent to all connected clients.
- **Manual Override:** Users retain the ability to manually trigger the refresh process via the CLI (using the `--refresh` flag), which works in parallel with the auto refresh schedule.

# Benefits and User Impact

- **Timeliness:** Ensures that ontologies remain current with minimal manual oversight, aligning with the mission of dynamic, live data integration.
- **Enhanced Reliability:** By automating the refresh process, users experience fewer stale data issues and benefit from proactive updates.
- **Improved Diagnostics:** Integrates auto refresh events into diagnostic logs and telemetry, providing a complete picture of system health and configuration.
- **Seamless Integration:** This update builds on existing functionalities and requires only minimal configuration changes to enable auto refresh capabilities.
