# Overview

Unify and extend the command-line interface to support five core subcommands: convert, capital-cities, list-terms, get-term, and filter. Ensure each subcommand uses consistent option parsing, validation, error handling, and output behavior, providing a single cohesive CLI experience.

# Implementation

1. Command Dispatch
   - After handling --diagnostics, read the first CLI argument as the subcommand name.
   - Support subcommands: convert, capital-cities, list-terms, get-term, filter.
   - If an unknown subcommand is provided, print an error to stderr and exit with code 1.

2. Convert Handler (existing behavior)
   - Require flags --input and --ontology-iri; support optional --base-iri and --output.
   - Read and parse JSON from the input file; throw on parse error.
   - Call generateOntology with provided options; serialize with indent 2.
   - Write to file if --output is provided, otherwise print to stdout.
   - On error, log a descriptive message to stderr prefixed with "Error during conversion:" and return exit code 1.

3. Capital-Cities Handler (existing behavior)
   - Require flag --ontology-iri; support optional --base-iri, --api-endpoint, and --output.
   - Fetch country data from REST API; on non-2xx response, log HTTP status error and return code 1.
   - Extract countries with non-empty capital arrays into a term map.
   - Call generateOntology and serialize; write or print as in convert.
   - On network or processing error, log "Error during capital-cities:" and return code 1.

4. List-Terms Handler (existing behavior)
   - Require flag --input; no other flags.
   - Read and parse the ontology file; if data["@graph"] is not an array, log "Invalid ontology: missing @graph array" and exit with code 1.
   - Console.log each node["@id"] on a separate line; return code 0.
   - On any file I/O or parse error, log "Error during list-terms:" and exit code 1.

5. Get-Term Handler (existing behavior)
   - Require flags --input and --term; support optional --output.
   - Read and parse the ontology file; validate that data["@graph"] is an array.
   - Locate the node whose local name (substring after '#') matches the provided term.
   - If found, serialize the node with indent 2; write or print accordingly.
   - If not found, log "Term not found: <term>" and exit with code 1.
   - On file I/O or parse error, log "Error during get-term:" and exit code 1.

6. Filter Handler (new behavior)
   - Require flags --input, --property, --value; support optional --output.
   - Read and parse the ontology file; validate that data["@graph"] is an array.
   - Iterate nodes in @graph, selecting those where node[property] strictly equals the provided value string.
   - Collect matching nodes into an array and serialize with indent 2.
   - Write to file if --output is provided, otherwise print to stdout.
   - On missing flags, log validation errors and return code 1.
   - On file I/O, parse errors, or missing @graph, log "Error during filter:" and exit code 1.

# Testing

1. Update or add tests/unit/cli-convert.test.js, cli-capitals.test.js, cli-listterms.test.js, cli-getterm.test.js to ensure existing behavior remains passing.
2. Add tests/unit/cli-filter.test.js covering:
   • Successful filtering to stdout.
   • Writing filtered nodes to file when --output is provided.
   • Missing required flags returns code 1 and logs errors.
   • Invalid JSON or missing @graph scenarios exit with code 1 and appropriate messages.
   • No nodes match returns code 0 and outputs an empty array.

# Documentation

1. Update README.md under Command-Line Interface to document the filter subcommand with flags --input, --property, --value, --output and usage examples.
2. In docs/USAGE.md under CLI Usage, add a section for filter:
   • Flags: --input, --property, --value, --output
   • Example invocation and expected JSON output