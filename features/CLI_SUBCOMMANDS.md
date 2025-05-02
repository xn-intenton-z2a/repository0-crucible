# Overview

Ensure the CLI entrypoint in src/lib/main.js fully implements and documents two core subcommands: convert and capital-cities. Handle option parsing, validation, error handling, and output behavior consistently, building on existing diagnostics support.

# Implementation

1. Command Dispatch
   - After handling --diagnostics, read the first CLI argument as subcommand name.
   - If the subcommand is convert or capital-cities, invoke its handler. Otherwise log an error to stderr and return exit code 1.

2. Convert Handler (existing behavior)
   - Define a zod schema requiring input and ontology-iri; optional base-iri and output.
   - Read and parse the input JSON file using fs.promises.readFile.
   - Call generateOntology with parsed data and options.
   - Serialize result with JSON.stringify(indent 2).
   - If an output path is provided, write to file; otherwise print to stdout.
   - On file access, parse, or generation errors, log a descriptive message to stderr and return exit code 1.

3. Capital-Cities Handler (new implementation)
   - Define a zod schema requiring ontology-iri; optional base-iri, api-endpoint (default https://restcountries.com/v3.1/all), and output.
   - Use global fetch to retrieve country data from api-endpoint.
   - Filter for entries with non-empty capital arrays.
   - Build a term map where each key is the country name (common or official) and the value is an object with capital set to the first capital.
   - Call generateOntology with the term map and options.
   - Serialize and write or print the ontology as in convert handler.
   - On fetch, network, or processing errors, log a descriptive message to stderr and return exit code 1.

4. Validation and Error Handling
   - Use zod schemas for both handlers to ensure clear errors on missing or invalid flags.
   - Ensure exit codes are 0 on success and 1 on any failure.

# Testing

1. Update tests/unit/cli-convert.test.js to cover existing convert scenarios (already present).
2. Add tests/unit/cli-capitals.test.js:
   • Mock global fetch to return sample country data with and without capital fields.
   • Invoke CLI with capital-cities flags and capture stdout or file write; assert JSON-LD document graph includes only countries with capitals and correct term IDs and properties.
   • Test missing required flags returns exit code 1 and logs descriptive error.
   • Test fetch failures return exit code 1 and log an error.
3. Ensure existing tests for diagnostics and main termination continue to pass.

# Documentation

1. Update README.md under Command-Line Interface to document the capital-cities command:
   - List flags: --ontology-iri, --base-iri, --api-endpoint, --output.
   - Provide usage examples and sample JSON-LD output.
2. Update docs/USAGE.md under CLI Usage with a section for capital-cities, listing flags, defaults, invocation snippets, and expected output fields.
