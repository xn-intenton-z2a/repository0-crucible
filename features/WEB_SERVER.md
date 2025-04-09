# WEB_SERVER: Integrated HTTP and WebSocket Notifications with Diagnostics

## Overview
This feature provides an integrated HTTP server and WebSocket service that not only serves as a status endpoint but also exposes diagnostic and telemetry endpoints. In addition to the existing root endpoint for status messages and real-time notifications via WebSocket, new REST endpoints are introduced to allow querying aggregated telemetry data and diagnostic summaries. This enhancement further supports monitoring and troubleshooting by providing easy access to environment variable warnings, real-time telemetry export data, and system health checks.

## Implementation Details
1. **HTTP Server Enhancements:**
   - The HTTP server continues to listen on a configurable port (default 3000), serving GET requests on the root path (`/`) with a plain text status message.
   - **New Diagnostics Endpoint:** A new GET endpoint at `/telemetry` is implemented to return aggregated telemetry data including NaN fallback warnings and diagnostic summaries in JSON format.
   - **Optional CSV Export:** An optional query parameter (e.g., `?format=csv`) can be provided to trigger CSV formatted output directly via the HTTP response, mirroring the CLI export functionality.

2. **WebSocket Integration:**
   - The existing WebSocket server attached to the HTTP server remains unchanged, broadcasting JSON notifications for ontology operations such as refreshes, merges, updates, and rollbacks.
   - These notifications continue to include fields like `updatedOntologyTitle`, `version`, `timestamp`, and `statusMessage` to inform connected clients in real time.

3. **Configuration and CLI Integration:**
   - The server port remains configurable via the `PORT` environment variable.
   - The CLI flag `--serve` activates the web server, ensuring that both status and diagnostic endpoints are available during runtime.
   - Documentation will be updated to reflect the new endpoints and their usage examples.

## Benefits
- **Enhanced Monitoring:** Developers and system administrators can now query detailed diagnostic telemetry directly via HTTP without resorting to CLI commands.
- **Improved Troubleshooting:** Aggregated telemetry and diagnostic summaries are easily accessible, enabling quicker resolution of configuration issues related to environment variables and live data anomalies.
- **Single Repository Scope:** All functionality is consolidated within a single repository, leveraging the existing server and WebSocket setup to extend value without adding complexity.

## Migration Notes
- Existing functionality remains unchanged. The new `/telemetry` endpoint is an addition to the current WEB_SERVER feature and does not interfere with other CLI commands or modules.
- Users are advised to update their documentation and usage guidelines (e.g., README and CONTRIBUTING files) to include details about the `/telemetry` endpoint and its CSV export option.
- No additional features need to be removed or merged, so this update is a non-breaking enhancement to the current WEB_SERVER feature.