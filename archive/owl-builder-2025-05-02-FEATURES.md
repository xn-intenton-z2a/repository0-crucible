features/CLI_SUBCOMMANDS.md
# features/CLI_SUBCOMMANDS.md
# Overview

Implement a unified command-line interface entrypoint in src/lib/main.js that dispatches subcommands, validates flags with Zod, handles I/O errors, and outputs JSON or logs errors consistently. Support diagnostics and core subcommands for ontology conversion and querying.

# Implementation

1. Dispatch Logic
   - Recognize global flag --diagnostics before any subcommand and print diagnostic info (version, node version, args) to stdout with exit code 0.
   - Extract first positional argument as subcommand name and route to handler functions.
   - On unknown subcommand, log error to stderr: "Unknown command: <subcommand>", exit code 1.

2. Shared Argument Parsing
   - For each subcommand define a Zod schema for expected flags and types.
   - Parse flags: collect args starting with -- and their values, map to object.
   - Validate with Zod; on failure, log each error to stderr, exit code 1.

3. I/O Helpers
   - Read JSON files with fs/promises.readFile; catch and log I/O and JSON parse errors as "Error during <subcommand>: <message>", exit code 1.
   - Write output with fs/promises.writeFile if --output flag provided; otherwise write to stdout via console.log(JSON.stringify(value, null, 2)).

# Subcommands

- convert
  - Flags: --input (string, required), --ontology-iri (string, required), --base-iri (string, optional), --output (string, optional).
  - Read JSON from input, call generateOntology, serialize with indent 2, write to file or stdout.

- capital-cities
  - Flags: --ontology-iri (string, required), --base-iri (string, optional), --api-endpoint (string, optional, default https://restcountries.com/v3.1/all), --output (string, optional).
  - Fetch country data, on non-2xx response log "Error fetching country data: HTTP <status> <statusText>", exit 1.
  - Build data map for non-empty capitals, call generateOntology, serialize, output.

- list-terms
  - Flags: --input (string, required).
  - Read JSON-LD, ensure @graph is array; on missing log "Invalid ontology: missing @graph array", exit 1.
  - Log each node @id to stdout on separate lines.

- get-term
  - Flags: --input (string, required), --term (string, required), --output (string, optional).
  - Read JSON-LD, validate @graph, find node with @id ending in #term; if not found log "Term not found: <term>", exit 1.
  - Serialize node, write to output or stdout.

- filter
  - Flags: --input (string, required), --property (string, required), --value (string, required), --output (string, optional).
  - Read JSON-LD, validate @graph, filter nodes where node[property] strictly equals value.
  - Output JSON array of matches.

- query
  - Flags: --input (string, required), --pointer (string, required), --output (string, optional).
  - Validate pointer starts with '/'; on invalid pointer log "Error during query: <message>", exit 1.
  - Implement evaluatePointer as per JSON_POINTER.md; on ReferenceError, RangeError, TypeError catch and log error.
  - Serialize extracted value and output.

# Testing

- Add tests in tests/unit/cli-query.test.js covering:
  • Successful pointer extraction to stdout.
  • Writing to file with --output.
  • Missing flags exits 1 and logs validation errors.
  • Invalid pointer syntax and non-existent path yield descriptive errors and exit 1.

# Documentation

- Update README.md under CLI Usage to add diagnostics and query sections with flags --input, --pointer, --output and examples.
- Update docs/USAGE.md to include query usage in CLI Usage guide with examples.

# Consistency

Follow CONTRIBUTING.md: ESM modules, Node 20 compatibility, tests with Vitest, use zod for validation, consistent error messages, code style, and logging conventions.features/HTTP_SERVER.md
# features/HTTP_SERVER.md
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