# REALTIME_MONITOR

## Overview
This feature combines real-time notifications with HTTP metrics export to enhance system observability. It unifies the current WebSocket-based notification system with a new metrics endpoint that reports aggregated diagnostic telemetry, live data integration performance, and system health statistics.

## Real-time Notifications
- Maintains the existing WebSocket server that broadcasts ontology update events and diagnostic messages.
- Sends standardized JSON payloads containing fields such as `updatedOntologyTitle`, `version`, `timestamp`, and `statusMessage`.

## Metrics Export
- Introduces an HTTP endpoint (`/metrics`) on the same server used for notifications.
- Provides real-time metrics including aggregated telemetry summaries (e.g., NaN fallback counts), uptime, and key performance indicators for live data integration.
- Allows external monitoring tools to poll or scrape system metrics for continuous monitoring.

## Implementation Details
- Add a new route (`/metrics`) to the HTTP server started with the `--serve` flag.
- Merge the logic of the WebSocket notifications with additional routines that gather and serve metrics data in JSON format.
- Expose configuration via environment variables to enable/disable metrics export and adjust refresh intervals.
- Ensure the merged module adheres to existing code quality and testing guidelines as per CONTRIBUTING.md.

## Benefits
- Consolidates monitoring capabilities into a single, cohesive feature that offers both real-time updates and snapshot metrics.
- Enhances user and developer observability and troubleshooting through immediate notifications and continuous metrics reporting.
- Improves integration with external monitoring systems for proactive system management.
