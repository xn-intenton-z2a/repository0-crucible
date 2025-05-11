# Overview

Add an HTTP server mode to the CLI tool that exposes π calculation and benchmarking endpoints and provides an interactive Swagger UI for API exploration. This feature enables programmatic integration, monitoring, and effortless testing of the service.

# CLI Interface

Extend main(args) to accept the following flags:

--serve <port>       Start HTTP server on the specified port (default: 3000)
--cors                Enable CORS support on all routes for cross-origin requests
--swagger-ui          Serve an interactive Swagger UI at /docs for API documentation and testing

When --serve is present, the tool launches the HTTP server instead of performing local calculations or benchmarks.

# Implementation Details

• Install and import express and cors as dependencies in package.json.
• In src/lib/main.js:  
  – After parsing args, detect opts.serve and opts.cors.  
  – Create an Express app.  
  – If opts.cors is true, apply cors() middleware globally.  
  – Apply express.json() and express.urlencoded({ extended: true }) for future extension.  

• Define routes:  
  GET /pi  
    - Query parameter digits (integer, default 10).  
    - Validate with zod. On error, respond 400 JSON { error: string }.  
    - Call calculatePi(digits) and respond JSON { digits, pi } with status 200.  

  GET /benchmark  
    - Query parameter digits (comma-separated integers, default 10,100,500).  
    - Validate list items with zod. On error, respond 400.  
    - Call benchmarkPi(digitsArray) and respond JSON array of { digits, time } objects.  

  GET /openapi.json  
    - Generate or load the OpenAPI 3.0 spec for /pi and /benchmark endpoints.  
    - Respond JSON spec with correct content type.  

• Swagger UI Integration (if --swagger-ui is true):  
  – Install swagger-ui-dist as a dependency.  
  – Import absolutePath from swagger-ui-dist.  
  – Serve static files at /docs from swagger-ui-dist.absolutePath().  
  – Instruct users to navigate to /docs?url=/openapi.json to view the API docs.  

• Start the server:  
  – Call app.listen(opts.serve) and return the server instance from main when invoked programmatically.  
  – Ensure main awaits server startup in test scenarios.

# Testing

Add unit tests in tests/unit/main.test.js with supertest and vitest:

• Start the server with main(["--serve","0"]) and capture the instance.  
• Test GET /pi?digits=5 returns status 200 and body { digits: 5, pi: string matching /^3\.14159/ }.  
• Test GET /pi?digits=invalid returns status 400 and error JSON.  
• Test GET /benchmark?digits=2,5 returns status 200 and an array of two objects with correct digits fields.  
• Test GET /openapi.json returns 200 and a valid OpenAPI JSON with paths /pi and /benchmark.  
• When --swagger-ui is supplied, test GET /docs returns status 200 and HTML containing link to swagger-ui.css.  

After tests, close the server to free the port.

# Documentation

Update README.md under a new HTTP Server section:

• Document the --serve, --cors, and --swagger-ui flags and defaults.  
• Provide examples:  
    node src/lib/main.js --serve 4000 --cors --swagger-ui  
    curl http://localhost:4000/pi?digits=50  
    curl http://localhost:4000/benchmark?digits=10,100  
    Open http://localhost:4000/docs?url=/openapi.json in a browser.  
• Note that Swagger UI assets are served under /docs and API spec under /openapi.json.  
• Ensure links and examples are accurate and show user flows for JSON APIs and UI exploration.