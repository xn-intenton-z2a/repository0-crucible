# Overview

Add support for graceful shutdown and cancellation in both CLI and HTTP server modes so that long-running π calculations, streaming, or benchmark operations can be aborted cleanly on user interrupt or system signals.

# CLI Behavior

• Listen for SIGINT and SIGTERM before dispatching any compute, stream, or benchmark operation.
• Create an AbortController and pass its signal to calculatePi, getPiStream, and benchmarkPi.
• On receiving a signal, invoke controller.abort(), print "Operation cancelled by user", and exit with code 130.
• Ensure that any partial output is cleaned up or flushed before exit.

# HTTP Server Behavior

• In --serve mode, listen for SIGINT and SIGTERM signals.
• On signal, stop accepting new connections via server.close(), close any WebSocketServer instances, and allow in-flight requests to complete or abort after a configurable timeout (default 5 seconds).
• After draining or on timeout, exit process with code 0.

# Implementation Details

• In src/lib/main.js, before parsing args, instantiate AbortController and attach listeners for process signals.
• Refactor calculatePi, getPiStream, and benchmarkPi functions to accept an optional AbortSignal and check signal.aborted in long loops or generator iterations, throwing an AbortError on cancellation.
• In CLI entrypoint, wrap compute or stream loops in a try/catch to handle AbortError: log the cancellation message and exit with code 130.
• In HTTP setup, capture the server instance returned by app.listen and on signal call server.close(), plus wsServer.close() if WebSocket is enabled, then set a timer to force exit after timeout.

# Testing

• Unit tests in tests/unit/main.test.js:
  - Mock an AbortSignal with aborted=true to verify calculatePi and getPiStream immediately throw AbortError.
  - Simulate signal handlers by invoking the registered callback and assert that main prints the cancellation message and calls process.exit(130).
• HTTP tests using supertest:
  - Start the server with --serve 0, send a request that triggers a delayed computation (e.g., large digits), programmatically emit SIGINT, and verify the server closes and the test exits without hanging.

# Documentation

• Update README.md with a new Graceful Shutdown section:
  - Describe how Ctrl+C or SIGTERM is handled in CLI and server modes.
  - Provide examples:
      # In CLI long run
      node src/lib/main.js --digits 100000 --stream
      # Press Ctrl+C to cancel
      Operation cancelled by user

      # In HTTP mode
      node src/lib/main.js --serve 3000
      # Press Ctrl+C, server shuts down gracefully
