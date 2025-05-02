# Overview
Enhance the CLI entrypoint to implement two core subcommands: convert and capital-cities. The convert command reads a local JSON file of term definitions and generates a JSON-LD OWL ontology document. The capital-cities command fetches country data from a public REST API, extracts capital city terms, and outputs a JSON-LD OWL ontology.

# Implementation
1. Command dispatch
   - After diagnostics handling, inspect the first argument as subcommand name.
   - If the name is convert or capital-cities, invoke the corresponding handler, else print an error to stderr and return exit code 1.
   - Use zod to define and validate option schemas for each subcommand.

2. Convert handler
   - Define a schema requiring input (file path) and ontology-iri, with optional base-iri and output path.
   - Use fs promises to read the input file and parse JSON to a data object.
   - Call generateOntology with the data object and options.
   - Serialize the resulting JSON-LD document with JSON stringify using indent of 2.
   - If an output path is provided, write the serialized document to that file, otherwise print to stdout.
   - Catch and handle errors: log a descriptive message to stderr and return exit code 1.

3. Capital-cities handler
   - Define a schema requiring ontology-iri, optional base-iri, optional api-endpoint with default https://restcountries.com/v3.1/all, and optional output path.
   - Use global fetch to request the country list from the API endpoint.
   - Filter countries that have a non-empty capital array.
   - Build a term map where each key is the country name and its value is an object with capital equal to the first capital string.
   - Call generateOntology with the term map and options, then serialize and write or print as in convert handler.
   - Handle fetch or processing errors by logging to stderr and returning exit code 1.

4. Option parsing
   - Use zod to parse raw CLI arguments into validated options for each handler.
   - Ensure clear error messages on validation failures and return exit code 1.

# Testing
Add unit tests under tests/unit:
- cli-convert.test.js
  • Mock a temporary JSON file of term definitions, invoke the CLI with convert options, capture stdout or file write, and assert the JSON-LD document has correct @context, @id, and @graph nodes.
  • Test missing required options returns exit code 1 and logs a descriptive error.
  • Test custom base-iri appears in @context.
- cli-capitals.test.js
  • Mock global fetch to return sample country data with and without capital arrays.
  • Invoke the CLI with capital-cities options and capture output, verify the document graph includes only countries with capitals and correct term properties.
  • Test fetch failure returns exit code 1 and logs an error.

# Documentation
1. Update README.md under Command-Line Interface:
   - Document the convert and capital-cities commands, listing their options, usage examples, and sample outputs.
   - Show example: node src/lib/main.js convert --input path/terms.json --ontology-iri http://example.org/onto --output result.json
   - Show example: node src/lib/main.js capital-cities --ontology-iri http://example.org/onto
2. Update docs/USAGE.md under CLI Usage:
   - Add sections for convert and capital-cities with tables of option names, descriptions, and defaults.
   - Include invocation snippets and expected JSON-LD output fields.