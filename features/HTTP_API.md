# Overview
This feature adds an HTTP server mode to the CLI tool, exposing endpoints for calculating π and running benchmarks over HTTP. Users can start a lightweight server to integrate π services into other applications.

# CLI Interface
Extend main(args) to accept the following flags:
--serve <port>       Start HTTP server listening on the specified port (default: 3000)
--cors               Enable CORS support on all routes

When the --serve flag is present, the tool launches the HTTP server instead of performing local calculations or benchmarks.

# Implementation Details
In src/lib/main.js:
• Import express and cors modules.
• After parsing args, detect --serve and --cors flags.
• Create an Express app instance. If --cors is enabled, apply cors middleware globally.
• Define routes:
  GET /pi
    - Query parameter digits (integer, default: 10)
    - Validate digits using a Zod schema; on validation error respond with status 400 and JSON error message.
    - Call calculatePi(digits) and respond with JSON { digits, pi }.
  GET /benchmark
    - Query parameter digits (comma-separated integers, default: 10,100,500)
    - Validate list items with Zod; on error respond with status 400.
    - Call benchmarkPi(digitsArray) and respond with JSON array of { digits, time } objects.
• Start the server with app.listen(port) and return the server instance from main for testing. Ensure main awaits server startup when called programmatically.
• Update package.json dependencies to include express and cors.

# Testing
In tests/unit/main.test.js:
• Import supertest and the main function.
• Start the server with main(["--serve","0"]), capturing the returned server instance.
• Use supertest(server) to:
  - GET /pi?digits=5 and assert status 200 and body has digits equal to 5 and pi matching /^3\.14159/.
  - GET /benchmark?digits=2,5 and assert status 200 and array length 2 with correct fields.
  - GET /pi?digits=invalid and assert status 400 and error message in body.
• After tests, close the server instance to free the port.

# Documentation
Update README.md to document the --serve and --cors flags:
  node src/lib/main.js --serve 4000 --cors

Provide examples for accessing endpoints:
  curl http://localhost:4000/pi?digits=50
  curl http://localhost:4000/benchmark?digits=10,100