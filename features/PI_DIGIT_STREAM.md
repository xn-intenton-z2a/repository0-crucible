# Overview
This feature streams π digits incrementally as they are computed, allowing clients to receive digit groups in real time without buffering the entire result in memory.

# CLI Interface
--calculate-pi <digits>  Compute π to the specified digit count and stream each block of digits to stdout as it is produced.
--stream                  Alias for --calculate-pi with streaming enabled.

# HTTP API
GET /stream
  Query Parameters:
    digits: number (required) - Number of digits to compute.
  Behavior:
    Responds with chunked transfer encoding, sending digit blocks as they become available.

# Implementation
- In src/lib/main.js, detect the --stream flag or the --calculate-pi flag when combined with --stream.
- Refactor the chudnovskyPi function to support an async iterable interface or EventEmitter that emits digit blocks at intervals.
- In the CLI handler, subscribe to the digit stream and write each chunk to stdout immediately, ensuring flushing between writes.
- In the HTTP server setup under --serve, add a route handler for GET /stream that:
  • Sets response headers Transfer-Encoding: chunked and Content-Type: text/plain
  • Listens to the digit stream, writing each chunk to the response as it arrives
  • Ends the response once the stream completes
- Use Node.js built-in stream and async iteration; no additional dependencies are required.

# Testing
- Add unit tests in tests/unit/main.test.js that:
  • Mock a chudnovskyPi implementation yielding known digit blocks
  • Verify CLI invocation with --stream writes each block to stdout in the correct order
  • Start the HTTP server and request GET /stream?digits=N; assert that response is chunked and contains all expected blocks
  • Simulate an error during streaming and verify the server responds with a 500 status and closes the connection gracefully

# Documentation
- Update README.md under Features to document the --stream flag and the /stream endpoint with example usage:
    node src/lib/main.js --calculate-pi 1000000 --stream
    curl http://localhost:3000/stream?digits=1000000