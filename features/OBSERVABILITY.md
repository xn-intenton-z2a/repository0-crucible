# OBSERVABILITY

This feature consolidates diagnostic logging, telemetry, configuration audit logging, real-time notifications, and HTTP metrics export into a single unified observability service. It merges the functionalities previously defined in the DIAGNOSTICS and REALTIME_MONITOR features to provide a centralized interface for system monitoring, troubleshooting, and performance insights.

## Overview

- **Unified Logging & Telemetry:** Provides multi-channel logging (console, file, and optionally via HTTP) along with asynchronous batching of diagnostic events. All log messages are timestamped and include detailed context information, such as the effective configuration state and diagnostic warnings for non-numeric environment inputs.

- **Configuration Audit Logging:** Automatically captures the current, normalized configuration state (including CLI overrides and environment variable resolutions) at startup or on-demand using a specific CLI flag (e.g. `--config-audit`). This audited configuration is persisted to a file (e.g. `config_audit.json`) for analysis and troubleshooting.

- **Aggregated Telemetry Summary:** Aggregates NaN fallback and other diagnostic telemetry events, ensuring that each unique invalid input is logged exactly once even under high concurrency. The telemetry summary can be viewed via a CLI flag (e.g. `--diagnostic-summary-naN`) and via a new HTTP endpoint.

- **Real-Time Notifications & Metrics Export:** Integrates the existing WebSocket-based notification system with HTTP endpoints. A dedicated route (e.g. `/metrics` or `/telemetry`) exposes aggregated diagnostic data, uptime, performance metrics, and configuration audit snapshots. This allows external monitoring tools to scrape or poll key performance indicators in real time.

## Implementation Details

- **Merged Services:** Consolidates the previously separate DIAGNOSTICS and REALTIME_MONITOR modules into one cohesive unit. All diagnostic messages, telemetries, and audit logs are unified and easily accessible from a centralized API.

- **CLI Integration:** Retains all existing CLI flags (e.g. `--config-audit` and `--diagnostic-summary-naN`) and introduces additional options to trigger the HTTP telemetry endpoints if needed.

- **HTTP and WebSocket Endpoints:** A combined HTTP server supports both the static web server (for basic status checks) and dynamic endpoints for metrics export. The `/metrics` endpoint now not only reports live data integration performance and system health but also aggregated telemetry summaries. Meanwhile, the embedded WebSocket server continues broadcasting real-time notifications on ontology updates.

- **Resilience and Performance:** Uses promise-based batching for logging to ensure atomicity even under high concurrency. The unified module is built to seamlessly integrate with the existing live data integration and diagnostic frameworks, aligning with the repository's mission to provide robust, real-time ontology building from live public data sources.

## Benefits

- **Centralized Observability:** Consolidates diagnostic logging, configuration auditing, and real-time monitoring into a single robust service.
- **Improved Troubleshooting:** Offers administrators and developers a one-stop interface to diagnose misconfigurations, track telemetry events, and monitor system health both via CLI and over HTTP/WebSocket.
- **Simplified Codebase:** Reduces duplication and streamlines future enhancements by combining similar features into the new OBSERVABILITY service.
- **Enhanced Integration:** Facilitates integration with external monitoring tools and dashboards, ensuring proactive system management and rapid incident response.
