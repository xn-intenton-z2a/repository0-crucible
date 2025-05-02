# CLI_SUBCOMMANDS

Provides a unified CLI subcommand framework in src/lib/main.js that supports multiple ontology-related operations under a single entry point.

## Overview

Extend main to detect and dispatch subcommands by name. Each subcommand must handle its own option parsing, validation, data retrieval or file I/O, and call generateOntology to produce a JSON-LD OWL ontology document.

## Subcommands

### convert

Reads a local JSON file of term definitions and generates a JSON-LD OWL ontology.

Usage

node src/lib/main.js convert --input <path> --ontology-iri <iri> [--base-iri <iri>] [--output <path>]

--input        Path to JSON file containing term definitions
--ontology-iri Mandatory IRI for the ontology root
--base-iri     Optional base IRI for relative term IRIs
--output       Path to write the resulting ontology JSON-LD; defaults to stdout

Implementation Details

1. Parse and validate input, ontology-iri, base-iri, and output options.
2. Use fs/promises to read the input file and parse its JSON content.
3. Invoke generateOntology with the parsed data and options.
4. Serialize the returned document with JSON.stringify and write to the output path or stdout.
5. Exit with nonzero code on errors in argument parsing, file operations, or JSON parsing.

Tests

Add unit tests in tests/unit/cli-convert.test.js to cover:
- Successful conversion writes correct OWL document to a temp file.
- Missing input triggers an error exit code and stderr message.
- Missing ontology-iri triggers an error exit code and stderr message.
- Base-iri option appears as @base in the context.

### capital-cities

Fetches capital cities from a public REST API and generates a JSON-LD OWL ontology.

Usage

node src/lib/main.js capital-cities --ontology-iri <iri> [--base-iri <iri>] [--output <path>] [--api-endpoint <url>]

--ontology-iri Mandatory IRI for the ontology root
--base-iri     Optional base IRI for relative term IRIs
--output       Path to write the resulting ontology JSON-LD; defaults to stdout
--api-endpoint Optional REST Countries API endpoint; defaults to https://restcountries.com/v3.1/all

Implementation Details

1. Parse and validate ontology-iri, base-iri, output, and api-endpoint options.
2. Fetch country data from the specified API endpoint using fetch.
3. Transform the JSON array into a map of term definitions keyed by country name with a capital property.
4. Invoke generateOntology with the transformed data and options.
5. Write the JSON-LD document to the output path or stdout.
6. Exit with nonzero code on argument parsing errors, network failures, or file I/O errors.

Tests

Add unit tests in tests/unit/cli-capitals.test.js to cover:
- Successful execution writes correct OWL node for a known capital.
- Missing ontology-iri triggers an error exit code and stderr message.
- Custom api-endpoint parameter is honored.

## Documentation

Update README.md and docs/USAGE.md with examples of both subcommands showing full invocation and sample output.
