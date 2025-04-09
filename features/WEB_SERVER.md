# WEB_SERVER: Integrated HTTP and WebSocket Notifications

## Overview
This feature introduces an integrated web server with a WebSocket notification system. It allows users and monitoring tools to quickly check the status of owl-builder via an HTTP endpoint while also receiving real-time alerts for critical ontology events such as refreshes, merges, updates, and rollbacks.

- **HTTP Endpoint:** A simple HTTP server responds to GET requests on the root path (`/`) with a status message indicating that the server is running.
- **WebSocket Integration:** A WebSocket server is attached to the HTTP server to broadcast JSON notifications whenever key ontology operations occur. This allows connected clients to receive immediate updates without polling.
- **Configurable Port:** The server listens on a configurable port (default 3000) defined by the environment variable `PORT`.
- **CLI Activation:** Users can start the web server using a dedicated CLI flag (e.g., `--serve`), ensuring that the functionality remains optional for different deployment scenarios.

## Implementation Details
1. **HTTP Server Setup:**
   - Use Node's built-in `http` module to create the server.
   - Define a route for GET requests to `/` that returns a plain text message (e.g., "owl-builder Web Server Running").

2. **WebSocket Integration:**
   - Utilize the `ws` library to create a WebSocket server bound to the same HTTP server.
   - Maintain a global reference (e.g., `global.wsServer`) to allow broadcasting notifications to all connected clients.
   - When key ontology operations occur (refresh, merge, rollback, etc.), use the WebSocket server to send a JSON payload including fields like `updatedOntologyTitle`, `version`, `timestamp`, and `statusMessage`.

3. **Configuration and CLI Integration:**
   - Allow the port to be overridden via the `PORT` environment variable.
   - Add a new CLI flag `--serve` that triggers the startup of the web server.
   - Ensure seamless integration with existing CLI commands without disrupting other functionalities (e.g., CLI_MENU and SCHEDULED_TASKS).

## Benefits
- **Real-Time Monitoring:** Enables users and external systems to receive live notifications about ontology updates and system status.
- **Simplified Deployment:** Consolidates HTTP and WebSocket functionality into a single feature that can be easily activated via CLI.
- **Enhanced User Experience:** Provides a simple way to check system health and view immediate feedback from ontology operations.
- **Scalability:** The server architecture allows for future expansion, such as adding more routes or additional real-time services.

## Migration Notes
- This feature is added alongside existing features (CLI_MENU and SCHEDULED_TASKS), keeping the repository within the maximum three high-level features. No existing features are removed.
- Documentation in the README and CONTRIBUTING files should be updated to reference this new feature and its usage details.
