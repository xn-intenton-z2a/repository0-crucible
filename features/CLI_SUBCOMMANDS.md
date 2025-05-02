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

Follow CONTRIBUTING.md: ESM modules, Node 20 compatibility, tests with Vitest, use zod for validation, consistent error messages, code style, and logging conventions.