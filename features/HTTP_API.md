# Overview
This feature adds an HTTP API server mode to the CLI tool, exposing endpoints for calculating π and running benchmarks over HTTP. Users can start a lightweight server to integrate π services into other applications.

# CLI Interface

Extend main(args) to accept the following flags:
--serve <port>       Start HTTP server listening on the specified port (default: 3000)
--cors               Enable CORS support on all routes

When the --serve flag is present, the tool launches the server instead of printing to stdout.

# Implementation Details

Use express and cors for HTTP handling. In main, when serve mode is detected:
  • Parse the port value and cors option from args
  • Import express and cors
  • Create an Express app instance
  • If cors flag is enabled, apply cors middleware globally
  • Define routes:
    GET /pi
      - Query parameter digits (integer, default 10)
      - Validate digits using zod or custom check
      - Call calculatePi(digits) and return JSON { digits: n, pi: string }
    GET /benchmark
      - Query parameter digits (comma-separated integers, default: 10,100,500)
      - Validate list and call benchmarkPi(digitsArray)
      - Return JSON array of objects { digits: n, time: ms }
  • Start the server on the specified port and return the server instance for testing and graceful shutdown

# Testing

In tests/unit/main.test.js extend to:
  • Import main and supertest
  • Start the server on a random port (port 0) by calling main(["--serve","0"]), capturing the returned server instance
  • Use supertest(server) to:
    - GET /pi?digits=5 and assert status 200 and response shape { digits: 5, pi: string }
    - GET /benchmark?digits=2,5 and assert status 200 and array length 2 with correct fields
    - GET /pi?digits=invalid and assert status 400 with error message
  • Close the server instance after tests complete

# Documentation

Update README.md to describe the --serve and --cors flags, include examples:

Start server on port 4000 with CORS:
  node src/lib/main.js --serve 4000 --cors

Access π calculation endpoint:
  curl http://localhost:4000/pi?digits=50

Access benchmark endpoint:
  curl http://localhost:4000/benchmark?digits=10,100