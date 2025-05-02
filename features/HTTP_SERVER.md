# Overview

Add a serve subcommand to the CLI that launches an HTTP server exposing the ontology loaded from a JSON file as REST endpoints. The server will support endpoints to list all terms, retrieve a single term, query by JSON pointer, and return the full graph.

# Implementation

1. Argument Parsing
   - Extend dispatch logic in src/lib/main.js to recognize subcommand serve.
   - Collect flags input (string required) and port (string optional, default 3000).
   - Define a Zod schema requiring input nonempty and port optional numeric string matching digits.
   - On validation failure, log each error to stderr and exit code 1.

2. Ontology Loading
   - On serve invocation, read file at input path using fs/promises readFile.
   - Parse JSON and validate that @graph is an array.
   - On missing or invalid @graph, log error and exit code 1.

3. HTTP Server
   - Use the built in http module to create a server listening on the specified port.
   - Define endpoints:
     /graph
       Return full JSON-LD document with content type application/json and status 200.
     /terms
       Return JSON array of all node @id values from @graph with status 200.
     /term/:termName
       Extract termName from URL, find node in @graph by local name after '#'.
       If found, respond with JSON node and status 200; otherwise, respond status 404 with JSON { message: "Term not found" }.
     /query
       Accept query parameter pointer; require pointer to start with '/'.
       Use existing evaluatePointer helper logic to resolve value.
       On success respond with JSON result and status 200.
       On error, respond status 400 with JSON { message: error message }.
     For unmatched paths respond status 404 with JSON { message: "Not found" }.

4. Graceful Shutdown
   - Log a message when server starts and on errors.
   - Allow interruption via SIGINT to close server and exit.

# Testing

Add tests in tests/unit/cli-serve.test.js covering:
 • Missing required flags exits code 1 with validation errors.
 • Server starts on default port and responds to /graph with the full document.
 • /terms returns the correct list of IRIs.
 • /term/validName returns the correct node.
 • /term/invalidName returns 404 and proper JSON message.
 • /query pointer nested value returns correct JSON.
 • /query missing slash or invalid pointer returns 400 and error message.

# Documentation

Update README.md under Command Line Interface to document serve subcommand:
 • Flags --input and --port.
 • Example invocation: node src/lib/main.js serve --input path/ontology.json --port 8080.
 • List available endpoints and example HTTP requests and responses.
Update docs/USAGE.md to add HTTP Server section describing each endpoint and usage patterns.

# Consistency

Follow existing coding conventions in main.js for argument parsing and error handling. Use zod for flag validation. Use fs/promises and http module without new dependencies. Add tests using vitest and implement helper evaluatePointer from JSON_POINTER.md.