# HTTP Server

# Overview
Implement an HTTP server mode so users can launch a web API for face generation.  This extends the existing CLI tool with a new flag and native HTTP endpoint.

# CLI Flag Handling
When main is invoked with the --serve flag, start an HTTP server listening on port 3000.  Do not exit the process.  Remove or bypass demo behavior when --demo is present.

# Endpoint
Provide a GET route at /faces that accepts these query parameters:  count (integer), category (string), seed (integer), unique (boolean).  Validate and coerce types.  Call generateFacesCore with parsed options.  Respond with JSON:  an object containing a faces array of generated items.

# Implementation
Modify src/lib/main.js:
- Add an HTTP server using Node's built-in http module.
- Parse URL and query string to extract parameters.
- Invoke generateFacesCore and wrap result in { faces: [...] }.
- Set appropriate response headers and 200 status.
- Log startup message with the listening port.

# Tests
In tests/unit/main.test.js or a new unit test file:
- Start the server in a beforeAll hook on an ephemeral port (e.g. 0).
- Use global fetch to request GET /faces with sample queries.
- Confirm response status is 200 and JSON has a faces array matching generateFacesCore output structure.
- Cleanly close the server in afterAll.

# Documentation
Update docs/USAGE.md and README.md:
- Document the new --serve flag and how to launch the HTTP API.
- Include example curl invocation:  curl http://localhost:3000/faces?count=2&seed=7
- Show example JSON response.

# Dependencies
No new dependencies required; use Node 20 built-in http and url modules.
