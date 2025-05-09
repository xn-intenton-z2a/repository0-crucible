# Overview

Add an HTTP API server to expose π calculation and benchmarking endpoints.

# CLI Interface

--serve  
Start the HTTP API server on the specified port (default: 3000).

--port <number>  
Optional port number for the HTTP server.

# Implementation

- Extend src/lib/main.js to detect the --serve flag and start an HTTP server using the built-in http module.  
- Expose GET /calculate endpoint accepting digits and algorithm query parameters.  
- Expose GET /benchmark endpoint accepting digits and algorithms query parameters, returning performance metrics.  
- Support response formats JSON and CSV based on a format query parameter or Accept header.  
- Leverage existing calculate and benchmark functions for core logic.  
- Ensure proper error handling and graceful shutdown of the server.

# Testing

- Add unit tests in tests/unit/main.test.js to verify server startup and shutdown.  
- Use HTTP requests to test /calculate and /benchmark endpoints with valid and invalid parameters.  
- Verify response status codes, content types, and payload correctness.

# Documentation

- Update README.md to document the HTTP API endpoints with example curl commands.  
- Include notes on configuring port and format options.