# WEB_DASHBOARD

## Overview
The WEB_DASHBOARD feature consolidates the existing WEB_UI and OBSERVABILITY functionalities into a single, unified web-based dashboard. This integrated interface provides users with real-time ontology monitoring, diagnostic telemetry, and interactive controls. In addition, it introduces external webhook integration, enabling automated notifications to third-party systems when ontology events (refresh, update, merge) occur.

## Features
- **Unified Dashboard:** Combines the visual elements of the legacy web UI with real-time diagnostic and telemetry metrics previously available in OBSERVABILITY.
- **Real-Time Notifications:** Leverages both embedded WebSocket channels and configurable webhook endpoints to push updates instantly to connected clients and external systems.
- **Interactive Controls:** Offers buttons and controls to trigger key ontology operations (e.g., refresh, merge, update) directly from the dashboard.
- **Aggregated Diagnostics:** Displays live diagnostic logs, aggregated telemetry summaries (including environment variable parsing warnings), and system metrics.
- **External Integration:** Sends JSON payloads to preconfigured webhook URLs on ontology events, enabling seamless integration with external monitoring or automation platforms.

## Implementation Details
- The dashboard will be served under a dedicated HTTP endpoint (e.g., `/dashboard`).
- A minimal, responsive HTML/CSS/JavaScript frontend will be embedded within the repository, reusing existing WebSocket code for live notifications.
- The backend will merge data from ontology service functions with diagnostic logs and telemetry summaries, and will also trigger outbound HTTP calls to webhook endpoints configured via environment variables.
- The code is designed to reside in a single source file module with minimal additional dependencies, ensuring ease of maintenance and rapid deployment.

## Benefits
- **Consolidated Experience:** Users benefit from a single interface that provides both interactive control and deep insight into system health and performance.
- **Enhanced Integration:** External systems can directly receive notifications via webhooks, streamlining automated workflows and incident responses.
- **Improved Maintainability:** Merging similar functionalities reduces code duplication and simplifies future feature expansions.
- **Real-Time Visibility:** Immediate feedback on both ontology state and diagnostic events enhances troubleshooting and operational efficiency.