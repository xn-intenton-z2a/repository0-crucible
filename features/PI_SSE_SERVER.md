# π SSE Streaming Server

# Usage

Add a new CLI flag --stream-pi-sse or -s followed by a port number to start an HTTP server streaming the digits of π to connected clients using Server-Sent Events (SSE).

Example:

  node src/lib/main.js --stream-pi-sse 3000

Client Subscription:

  const es = new EventSource('http://localhost:3000/events');
  es.onmessage = e => console.log(e.data);

# Implementation Details

1. Extend argument parsing in main to detect --stream-pi-sse or -s and validate the following argument as an integer port between 1024 and 65535. On invalid input, display an error message and exit with status 1.
2. Use Node's built-in http module to create a server listening on the specified port.
3. When a client issues a GET request to the /events endpoint:
    - Respond with status 200 and headers:
        Content-Type: text/event-stream
        Cache-Control: no-cache
        Connection: keep-alive
    - Send an initial SSE comment to establish the connection.
    - Stream the digits of π in small batches (for example, 10 digits per event) by writing frames of the form:
        id:<incremental id>\n
event:digits\n
data:<batch of π digits>\n\n
    - Send a keep-alive comment (":keep-alive\n\n") every 30 seconds for idle connections.
4. Use the existing π calculation implementation (or integrate the π algorithm module) to generate digits on demand.
5. Cleanly handle client disconnects by closing the response.

# Testing

Add tests in tests/unit/main.test.js to cover:

- Invocation without arguments and with invalid port to exit with an error status.
- Invocation with a valid port returns an HTTP server instance.
- Perform an HTTP GET request to /events and verify the response headers include text/event-stream and that at least one SSE frame is received.