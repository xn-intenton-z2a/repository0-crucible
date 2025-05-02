features/CLI_SUBCOMMANDS.md
# features/CLI_SUBCOMMANDS.md
# Overview

Consolidate all command-line interface functionality into a single coherent feature supporting convert, capital-cities, list-terms, get-term, filter, and query subcommands. Ensure consistent argument parsing, Zod validation, error handling, and output behavior across all commands for a unified CLI experience.

# Implementation

1. Command Dispatch
   - Recognize global flag --diagnostics before any subcommand.
   - Extract the first positional argument as the subcommand name.
   - On unrecognized subcommand, print an error to stderr and exit with code 1.

2. Shared Argument Parsing
   - Iterate restArgs, capture flags prefixed with -- and their values.
   - Validate flags per subcommand using Zod schemas.
   - On validation failure, log all error messages to stderr and return exit code 1.

3. Convert Subcommand
   - Flags: --input (string, required), --ontology-iri (string, required), --base-iri (string, optional), --output (string, optional).
   - Read JSON from input file, call generateOntology, serialize with indent 2, write to output file or stdout.
   - On errors, log "Error during conversion: <message>" and exit 1.

4. Capital-Cities Subcommand
   - Flags: --ontology-iri (string, required), --base-iri (string, optional), --api-endpoint (string, optional default https://restcountries.com/v3.1/all), --output (string, optional).
   - Fetch country data, handle non-2xx responses with descriptive error and exit 1.
   - Build term map for each country with a non-empty capital, call generateOntology, serialize, and write or print.
   - On errors, log "Error during capital-cities: <message>" and exit 1.

5. List-Terms Subcommand
   - Flags: --input (string, required).
   - Read JSON-LD, validate that @graph is an array, print each node @id on a separate line.
   - On missing @graph, log "Invalid ontology: missing @graph array" and exit 1.
   - On other errors, log "Error during list-terms: <message>" and exit 1.

6. Get-Term Subcommand
   - Flags: --input (string, required), --term (string, required), --output (string, optional).
   - Read JSON-LD, validate @graph array, locate node by local name (after '#'), serialize node, write or print.
   - If not found, log "Term not found: <term>" and exit 1.
   - On errors, log "Error during get-term: <message>" and exit 1.

7. Filter Subcommand
   - Flags: --input (string, required), --property (string, required), --value (string, required), --output (string, optional).
   - Read JSON-LD, validate @graph array, filter nodes where node[property] strictly equals value, serialize matches.
   - Write to output file or stdout. On missing @graph, log "Error during filter: missing @graph array" and exit 1.
   - On errors, log "Error during filter: <message>" and exit 1.

8. Query Subcommand
   - Flags: --input (string, required), --pointer (string, required), --output (string, optional).
   - Read and parse input JSON file. Validate pointer syntax: must start with '/'.
   - Implement JSON Pointer resolver: split on '/', unescape '~1' to '/' and '~0' to '~', traverse objects and arrays, throw descriptive errors on missing property or out-of-range index.
   - Serialize the extracted value with indent 2, write to output or stdout.
   - Catch ReferenceError, RangeError, TypeError, or I/O errors, log "Error during query: <message>" and exit 1.

# Testing

Add tests in tests/unit/cli-query.test.js:  
 • Successful extraction to stdout for nested values.  
 • Writing result to file with --output.  
 • Missing required flags exits with code 1 and logs validation errors.  
 • Invalid JSON input exits with code 1 and logs error.  
 • Pointer without leading slash exits with code 1 and descriptive error.  
 • Pointer to non-existent path exits with code 1 with descriptive error.

# Documentation

- Update README.md under the Command-Line Interface section to document the query subcommand with flags --input, --pointer, --output and example usages.
- Update docs/USAGE.md in CLI Usage with a section for query demonstrating invocation and expected output.

# Consistency

Ensure all additions follow CONTRIBUTING.md guidelines, maintain code style, include tests, and integrate seamlessly with existing subcommand patterns.features/HTTP_SERVER.md
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