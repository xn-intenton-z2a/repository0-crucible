# SSE_NOTIFICATIONS

This feature introduces a Server-Sent Events (SSE) notification channel to complement the existing WebSocket-based real-time updates. While WebSockets are efficient for bidirectional communication, some clients and integrations benefit from the simplicity of HTTP streaming. SSE offers a lightweight alternative for continuously pushing ontology update events to subscribed clients.

## Overview

- **Additional Notification Channel:** Provides a unidirectional, HTTP-based streaming interface that emits events when ontology operations (refresh, merge, update) occur.
- **Easy Client Integration:** Clients can use standard EventSource (in modern browsers) or any HTTP client capable of processing event streams to receive live updates.
- **Seamless Integration:** Runs alongside the existing WebSocket service in the same repository and leverages the same diagnostic and logging systems.

## Implementation Details

- **HTTP Endpoint:** An endpoint (e.g. `/sse`) will be added to the HTTP server. When accessed, the endpoint will use the SSE protocol (with `Content-Type: text/event-stream`) and keep the connection open.
- **Event Broadcasting:** Ontology update functions (refresh, merge, update) will trigger an event to both WebSocket and SSE clients. The payload includes fields such as `updatedOntologyTitle`, `version`, `timestamp`, and a `statusMessage`.
- **Connection Management:** The server will manage client connections by keeping an array of active SSE client response objects and properly handling client disconnects.
- **Lightweight Addition:** Designed to be implemented in a single source file alongside the current notification mechanisms, ensuring minimal overhead.

## Benefits and User Impact

- **Broader Integration Support:** Allows clients that cannot or prefer not to use WebSocket connections to still receive real-time updates.
- **Simplified HTTP Streaming:** Utilizes native browser APIs such as EventSource, reducing the need for additional client libraries.
- **Mission Alignment:** Enhances the owl-builder mission by expanding live data integration options and providing flexible, robust notification channels.

## Usage Example

1. Run the CLI tool with the web server option (e.g. `npm run serve`).
2. Open a browser or use an HTTP client to connect to `http://localhost:3000/sse`.
3. The client will receive a continuous event stream. In a browser, use:

   ```js
   const evtSource = new EventSource('http://localhost:3000/sse');
   evtSource.onmessage = (event) => {
     const data = JSON.parse(event.data);
     console.log('SSE Update:', data);
   };
   ```

This feature delivers a robust, additional notification path that complements the current WebSocket notifications, ensuring compatibility with a wide range of client environments.