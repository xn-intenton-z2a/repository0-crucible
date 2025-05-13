# Overview

Provide real time streaming of approximation and error data for pi calculations via server sent events in the HTTP API and newline delimited JSON in the CLI. This allows users to monitor convergence progress as it happens rather than waiting for complete results.

# Implementation

1. Dependencies
   • No new dependencies required use native Node and express response streaming capabilities

2. HTTP API Integration
   • In createApp register GET /pi/stream endpoint
   • On each request set response headers Content-Type text/event-stream Cache-Control no-cache Connection keep-alive
   • For each data point reuse convergence logic from /pi/data but stream each point as an SSE event with event data and a JSON payload containing index approximation and error
   • After completion send an SSE event with event end to signal stream close

3. CLI Integration
   • Extend minimist and CLIOptionsSchema to support new boolean flag --stream
   • When --stream is set bypass file writing and compute convergence data in sequence outputting each data point as a newline delimited JSON object to stdout
   • After streaming complete exit process

4. Error Handling
   • Wrap streaming loops in try catch on errors send SSE event error with a message or write error to stderr in CLI then close or exit with code 1

# Testing

1. HTTP Tests in tests/unit/server.test.js
   • Use supertest to GET /pi/stream with parameters such as digits and algorithm
   • Verify status 200 Content-Type text/event-stream and that the response body contains multiple lines beginning with data colon and an end event at the conclusion
2. CLI Tests in tests/unit/main.test.js
   • Spy on console.log run main with --stream option and convergence parameters
   • Assert console.log is called repeatedly with JSON objects containing index approximation and error

# Documentation

1. docs/USAGE.md
   • Under REST Endpoints document GET /pi/stream with example curl get http colon slash slash localhost colon 3000 slash pi slash stream question digits equals 5
   • Under Options document new stream flag for CLI with example node src slash lib slash main dot js --digits 5 --stream
2. README.md
   • Under Features add a Streaming Data feature with description and examples for both HTTP SSE and CLI streaming