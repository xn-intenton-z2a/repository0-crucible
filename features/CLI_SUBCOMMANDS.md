# Overview

Unify and extend the command-line interface to support four core subcommands: convert, capital-cities, list-terms, and get-term. Ensure each subcommand uses consistent option parsing, validation, error handling, and output behavior.

# Implementation

1. Command Dispatch
   - After handling --diagnostics, read the first CLI argument as the subcommand name.
   - Support subcommands: convert, capital-cities, list-terms, get-term. If an unknown subcommand is provided, print an error to stderr and return exit code 1.

2. Convert Handler (existing behavior)
   - Require flags --input, --ontology-iri; support optional --base-iri, --output.
   - Read and parse JSON from the input file; generate ontology; serialize with indent 2; write to file or stdout.
   - On any error, log descriptive message to stderr and return exit code 1.

3. Capital-Cities Handler (existing behavior)
   - Require flag --ontology-iri; support optional --base-iri, --api-endpoint, --output.
   - Fetch country data; filter for entries with a capital; build a term map; generate ontology; serialize and write or print.
   - Handle HTTP errors and network errors with descriptive stderr messages and exit code 1.

4. List-Terms Handler (merged behavior)
   - Require flag --input; no other flags.
   - Read and parse JSON-LD ontology file; validate that it contains an @graph array.
   - For each node in @graph, console.log its @id on a separate line.
   - Return exit code 0 on success; on read, parse, or validation error, console.error a descriptive message and return exit code 1.

5. Get-Term Handler (new behavior)
   - Require flags --input and --term; support optional --output.
   - Read and parse JSON-LD ontology file; validate structure.
   - Search @graph for a node with local name matching the provided term (after the last '#').
   - If found, serialize that node with indent 2 and write to file or stdout. If not found, console.error a descriptive message and return exit code 1.

# Testing

1. Update existing tests/unit/cli-convert.test.js and tests/unit/cli-capitals.test.js to ensure coverage remains passing.
2. Add or update tests/unit/cli-listterms.test.js to cover:
   • Successful listing of term IDs to stdout by mocking fs.readFile and spying on console.log.
   • Missing --input flag returns exit code 1 with error message.
   • Invalid JSON or missing @graph returns exit code 1 with error message.
3. Create tests/unit/cli-getterm.test.js covering:
   • Successful retrieval of a term node to stdout by mocking fs.readFile and spying on console.log.
   • Writing output to file when --output is provided.
   • Missing required flags returns exit code 1 with error message.
   • Term not found returns exit code 1 with descriptive error.

# Documentation

1. Update README.md under Command-Line Interface to document the four subcommands with their flags, defaults, and usage examples.
2. In docs/USAGE.md under CLI Usage, add sections for list-terms and get-term, listing flags, default values, invocation snippets, and expected output formats.