# Overview

Extend the command-line interface to include five core subcommands: convert, capital-cities, list-terms, get-term, and filter. Ensure consistent argument parsing, validation, error handling, and output behavior across all commands for a cohesive CLI experience.

# Implementation

1. Command Dispatch
   - Recognize global flag --diagnostics before subcommand dispatch.
   - Shift the first positional argument as the subcommand name.
   - On unknown subcommand print error to stderr and exit with code 1.

2. Convert Subcommand
   - Flags: --input (string required), --ontology-iri (string required), --base-iri (string optional), --output (string optional).
   - Read and parse JSON from input file. Call generateOntology with provided ontologyIri and baseIri. Serialize result with indent 2. Write to output file if --output is provided else print to stdout. On errors log Error during conversion: message and exit code 1.

3. Capital-Cities Subcommand
   - Flags: --ontology-iri (string required), --base-iri (string optional), --api-endpoint (string optional default https://restcountries.com/v3.1/all), --output (string optional).
   - Fetch country data. On non-2xx response log HTTP status error and exit 1. Extract countries with non-empty capitals into a term map. Call generateOntology, serialize, and write or print. On errors log Error during capital-cities: message and exit 1.

4. List-Terms Subcommand
   - Flags: --input (string required).
   - Read and parse JSON-LD document. Validate that data["@graph"] is an array. Print each node["@id"] on a separate line to stdout. On missing or invalid @graph log Invalid ontology: missing @graph array and exit 1. On other errors log Error during list-terms: message and exit 1.

5. Get-Term Subcommand
   - Flags: --input (string required), --term (string required), --output (string optional).
   - Read and parse JSON-LD. Validate @graph is array. Locate node by comparing local name after '#' to the provided term. If found serialize node with indent 2 and write or print. If not found log Term not found: term and exit 1. On I/O or parse errors log Error during get-term: message and exit 1.

6. Filter Subcommand
   - Flags: --input (string required), --property (string required), --value (string required), --output (string optional).
   - Read and parse JSON-LD. Validate @graph is array. Iterate nodes selecting those where node[property] strictly equals the provided value. Collect matches into an array. Serialize matches with indent 2. Write to output file if provided else print to stdout. On missing flags log validation errors and exit 1. On I/O, parse errors, or missing @graph log Error during filter: message and exit 1.

# Testing

Add tests for filter in tests/unit/cli-filter.test.js covering:
 • successful filtering to stdout
 • writing filtered nodes to file when --output is provided
 • missing required flags returns code 1 and logs errors
 • invalid JSON or missing @graph scenarios exit with code 1 and appropriate messages
 • no nodes match returns code 0 and outputs an empty array

# Documentation

Update README.md under the Command-Line Interface section to document the filter subcommand with flags --input, --property, --value, --output and usage examples. In docs/USAGE.md under CLI Usage add a section for filter showing flags and example invocation.