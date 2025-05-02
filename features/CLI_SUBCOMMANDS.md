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

Ensure all additions follow CONTRIBUTING.md guidelines, maintain code style, include tests, and integrate seamlessly with existing subcommand patterns.