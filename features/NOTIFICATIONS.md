# NOTIFICATIONS

This feature consolidates all real-time notification mechanisms into a single, unified module. It merges the functionality of outbound Webhook notifications and Server-Sent Events (SSE) into a coherent interface for external integrations, browser clients, and other monitoring systems.

## Overview

- **Unified Channels:** Provides dual notification channels over a single integrated interface. Clients can choose to receive updates either via configurable HTTP webhooks or via an SSE stream.
- **Configurable Options:** Users can enable one or both channels by setting environment variables. Webhook endpoints are specified through a comma-separated list (e.g., `WEBHOOK_URL`), while the SSE endpoint is available at a dedicated HTTP route (e.g., `/sse`).
- **Real-Time Updates:** Any key ontology operation (refresh, merge, update) triggers a broadcast to all connected clients. Each notification includes details such as the ontology title, version, timestamp, and a status message.

## Implementation Details

- **Notification Abstraction:** The notification service provides a single API for triggering messages. Internally, it dispatches messages to both HTTP webhook destinations and active SSE connections as appropriate.
- **Asynchronous Delivery & Retry:** Webhook notifications are sent asynchronously with basic retry logic and exponential backoff, ensuring robust delivery. SSE notifications are streamed continuously to connected clients with proper connection management (handling connection initiation and disconnect events).
- **Diagnostic Logging:** Enhanced logging is integrated. All notification attempts are logged with timestamps and status details to aid in monitoring and troubleshooting.
- **Configuration:** 
  - Environment variables such as `WEBHOOK_URL`, `WEBHOOK_RETRY_COUNT`, and `WEBHOOK_RETRY_DELAY` control the behavior for webhook delivery.
  - The SSE endpoint is fixed but can be updated via CLI flags if necessary.

## Benefits and User Impact

- **Simplified Integration:** External systems and browser clients benefit from a unified service, reducing the need for multiple integrations and separate connections.
- **Resource Optimization:** Consolidating the notification mechanisms reduces code duplication and ensures a more maintainable codebase aligned with the mission of delivering dynamic, live data-driven ontology management.
- **Flexible Client Options:** Consumers can select the notification channel that best fits their environment, enhancing overall system interoperability.

## Usage Example

1. **Configuration (for Webhooks):**
   ```bash
   export WEBHOOK_URL="https://example.com/webhook,https://another-endpoint.com/hooks"
   ```

2. **Running the Server:**
   Launch the CLI with the web server option (e.g., `npm run serve`). The unified notification service will initialize automatically.

3. **Client Integration (for SSE):**
   In a browser, use:
   ```js
   const evtSource = new EventSource('http://localhost:3000/sse');
   evtSource.onmessage = (event) => {
     const data = JSON.parse(event.data);
     console.log('Notification Update:', data);
   };
   ```

4. **Triggering Notifications:**
   Ontology operations such as updates or refreshes automatically broadcast a JSON payload (with fields `updatedOntologyTitle`, `version`, `timestamp`, and `statusMessage`) through the unified service.
