# Overview

Enhance the CLI entrypoint in src/lib/main.js to fully implement and document two core subcommands: convert and capital-cities. Ensure robust option parsing, error handling, and output behavior for both commands, aligned with existing diagnostics support.

# Implementation

1. Command dispatch
   - After handling --diagnostics, inspect the first CLI argument as subcommand name.
   - If name is convert or capital-cities, invoke respective handler. Otherwise print error to stderr and return exit code 1.

2. Convert handler
   - Define a zod schema requiring input, ontology-iri; optional base-iri, output.
   - Read and parse the input JSON file using fs.promises.readFile.
   - Call generateOntology with parsed data and options.
   - Serialize result with JSON.stringify(indent 2).
   - If output path provided, write to file; otherwise print to stdout.
   - On errors (file access, parse, generateOntology), log descriptive message to stderr and return exit code 1.

3. Capital-cities handler
   - Define a zod schema requiring ontology-iri; optional base-iri, api-endpoint (default https://restcountries.com/v3.1/all), output.
   - Use global fetch to retrieve country data from api-endpoint.
   - Filter for entries with non-empty capital arrays.
   - Construct a term map: key is country name (common or official), value is object with capital set to first capital.
   - Call generateOntology with term map and options.
   - Serialize and write or print as in convert handler.
   - Handle fetch or processing errors by logging to stderr and returning exit code 1.

4. Option parsing and validation
   - Use zod for both handlers to ensure clear error messages on invalid or missing flags.

# Testing

- Update tests/unit/cli-convert.test.js for convert handler scenarios (already present).
- Add tests/unit/cli-capitals.test.js:
   • Mock global fetch to return sample country data with and without capitals.
   • Invoke CLI with capital-cities flags and capture stdout or file write; assert JSON-LD document graph includes only countries with capitals and correct term IDs and properties.
   • Test missing required flags returns exit code 1 and logs descriptive error.
   • Test fetch failure returns exit code 1 and logs error.

# Documentation

1. README.md: under Command-Line Interface, document capital-cities command with options table, usage examples, and sample JSON-LD output.
2. docs/USAGE.md: add section for capital-cities subcommand, list flags, defaults, invocation snippets, and expected output fields.
