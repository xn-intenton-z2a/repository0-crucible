# Overview

The CLI entrypoint in src/lib/main.js will support two subcommands: convert and capital-cities. Users can invoke each subcommand with specific options to generate JSON-LD OWL ontologies from a local file or from a public API.

# Implementation

1. Command dispatch
   Parse the first argument as the subcommand name. If the subcommand is not recognized or missing, print an error and return exit code 1.

2. Option validation
   Use zod to define schemas for each subcommand:
   - convert: schema of options --input <path> (required), --ontology-iri <iri> (required), --base-iri <iri> (optional), --output <path> (optional).
   - capital-cities: schema of options --ontology-iri <iri> (required), --base-iri <iri> (optional), --api-endpoint <url> (optional, default https://restcountries.com/v3.1/all), --output <path> (optional).

3. Convert handler
   - Import fs from node:fs/promises.
   - Read the file at the input path and parse its JSON content into a data object.
   - Call generateOntology(data, { ontologyIri, baseIri }).
   - Serialize the result with JSON.stringify(document, null, 2).
   - If output path is provided, write the serialized document to that file; otherwise, print to stdout.

4. Capital-cities handler
   - Use global fetch to request country data from the API endpoint.
   - Filter countries with non-empty capital, map each to a term: key is country name, value is an object with capital property set to the first capital entry.
   - Call generateOntology with the map of terms and options.
   - Serialize and write or print the output as in the convert handler.

5. Error handling
   Catch synchronous and asynchronous errors in each handler, log an error message to stderr, and return exit code 1.

# Testing

Add unit tests under tests/unit:
- cli-convert.test.js:
  • Test successful conversion reads a temporary JSON file of term definitions, invokes main with convert options, captures stdout or file write, and verifies the JSON-LD document structure and graph nodes.
  • Test missing required options returns exit code 1 with descriptive error message.
  • Test custom base-iri appears in @context.

- cli-capitals.test.js:
  • Mock fetch to return sample country data with capitals.
  • Invoke main with capital-cities options and capture output, verify term definitions and @graph mapping of country names to capital properties.
  • Test error on fetch failure returns exit code 1 and logs an error.

# Documentation

1. Update README.md under Command-Line Interface:
   - Describe convert and capital-cities subcommands with example commands:
     node src/lib/main.js convert --input path/to/terms.json --ontology-iri http://example.org/onto --output result.json
     node src/lib/main.js capital-cities --ontology-iri http://example.org/onto
   - Show sample JSON-LD output for each subcommand.

2. Update docs/USAGE.md:
   - Add sections for convert and capital-cities with tables of options and invocation snippets.
   - Describe default values and error conditions.