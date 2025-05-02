# Overview

Introduce a serve subcommand to expose an HTTP API for querying ontology documents loaded from disk. This provides a programmatic interface for listing and retrieving term definitions over HTTP, complementing existing CLI capabilities.

# Implementation

1. Subcommand Dispatch
   - In main.js, detect subcommand serve when first argument is serve.
   - Parse flags --input (required) and --port (optional, default 3000).

2. Ontology Loading
   - On startup, read and parse the JSON-LD file specified by --input.
   - Validate presence of @graph array, return error if missing.
   - Build an in-memory map from local term name to node data for fast lookup.

3. HTTP Server
   - Use Node.js http module to start a server on the specified port.
   - Define endpoints:
     • GET /terms
       - Respond with JSON array of all term IRIs from @graph.
     • GET /terms/:termName
       - Look up local name in the map; if found, respond with the node JSON.
       - If not found, respond with status 404 and a JSON error message.
   - Set appropriate Content-Type headers and handle concurrent requests.
   - On any server error, log descriptive message to stderr and exit with code 1.

4. Graceful Shutdown
   - Listen for SIGINT and SIGTERM to close the HTTP server and exit cleanly.

# Testing

1. Create tests/unit/cli-serve.test.js:
   • Mock fs.readFile to provide a sample ontology JSON.
   • Invoke main(["serve","--input","dummy.json","--port","PORT"]) and await server startup.
   • Use http.request or global fetch to call GET /terms and GET /terms/:termName.
     - Verify status codes, response bodies, and Content-Type header.
   • Test missing --input flag results in exit code 1 and error message logged.
   • Test invalid JSON or missing @graph array returns exit code 1.
   • Test term not found returns 404 with a JSON error.

# Documentation

1. Update README.md under Command-Line Interface:
   - Document serve subcommand, its flags, defaults, and usage examples.

2. Update docs/USAGE.md under CLI Usage:
   - Add section for serve:
     • Flags: --input, --port
     • Example invocations
     • Sample HTTP request snippets and expected JSON responses.
