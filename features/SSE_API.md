# Overview

Introduce a Server-Sent Events endpoint in HTTP server mode to stream π digits in real time using EventSource clients. This complements existing HTTP chunk streaming and WebSocket APIs by offering a lightweight, browser-friendly SSE protocol.

# CLI Interface

Extend main(args) to accept the following flags alongside --serve and --cors:

--sse                       Enable SSE endpoint for π streaming (default: off)
--sse-path <path>           URL path for the SSE endpoint (default: /pi/sse)
--sse-chunk-size <n>        Number of digits per SSE message (default: 100)

When --sse is provided and the server is running, clients can connect with EventSource to the specified path with query parameters digits and optionally override chunkSize.

# Implementation Details

In src/lib/main.js during HTTP server setup when --serve and opts.sse are enabled:
• Import the existing getPiStream async generator from calculation module.
• After express.json and other middleware, define a route:
  app.get(opts.ssePath, async (req, res) => {
    // Validate query params digits (integer ≥1 ≤1000) and chunkSize (positive integer)
    // On validation error respond with 400 and JSON error
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const controller = new AbortController();
    req.on('close', () => controller.abort());
    try {
      for await (const chunk of getPiStream(digits, chunkSize, { signal: controller.signal })) {
        // SSE data event per chunk
        res.write(`data: ${chunk}\n\n`);
      }
      // Signal completion
      res.write('event: done\ndata: done\n\n');
    } catch (err) {
      // On abort do nothing; on other errors send event:error
      if (!controller.signal.aborted) {
        res.write(`event: error\ndata: ${err.message}\n\n`);
      }
    } finally {
      res.end();
    }
  });

Ensure chunkSize override in query and default from opts.sseChunkSize. Existing streaming logic should accept AbortSignal for cancellation.

# Testing

Add tests in tests/unit/main.test.js using supertest or raw HTTP:
• Start server with main(['--serve','0','--sse']); capture the instance.
• Perform GET /pi/sse?digits=20&chunkSize=5 and intercept raw text events; assert status 200, content-type text/event-stream and body contains "data: " prefixes and an "event: done" event at the end.
• Test default chunk size when only --sse is enabled and query param chunkSize is omitted.
• Test invalid query parameters (non-integer digits or negative chunkSize) return status 400 and JSON error body.
• Simulate client abort by closing connection early and assert server does not hang or throw unhandled exceptions.

# Documentation

Update README.md under HTTP API section:
• Document the --sse, --sse-path, and --sse-chunk-size flags.
• Provide an example:
    // Start server with SSE enabled
    node src/lib/main.js --serve 3000 --cors --sse
    // In browser or Node.js EventSource:
    const es = new EventSource('http://localhost:3000/pi/sse?digits=100&chunkSize=20');
    es.onmessage = e => console.log('chunk', e.data);
    es.addEventListener('done', () => console.log('stream complete'));