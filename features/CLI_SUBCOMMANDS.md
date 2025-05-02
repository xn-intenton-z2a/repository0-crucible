# CLI Subcommand Framework

Provide a unified CLI entrypoint in src/lib/main.js that routes multiple subcommands for ontology operations under a single invocation.

## Overview
Extend main to parse the first argument as a subcommand name and dispatch to handler modules. Ensure each handler performs option parsing, validation, data retrieval or file I/O, invokes generateOntology, and outputs JSON-LD to stdout or file.

## Subcommands

### convert

Read a local JSON file of term definitions and generate a JSON-LD OWL ontology.

Usage

node src/lib/main.js convert --input <path> --ontology-iri <iri> [--base-iri <iri>] [--output <path>]

Options

--input        Path to JSON file of term definitions (required)
--ontology-iri IRI for the ontology root (required)
--base-iri     Base IRI for term identifiers in the context (optional)
--output       File path to write the ontology JSON-LD; defaults to stdout (optional)

### capital-cities

Fetch country data from a REST API and generate a JSON-LD OWL ontology of capitals.

Usage

node src/lib/main.js capital-cities --ontology-iri <iri> [--base-iri <iri>] [--output <path>] [--api-endpoint <url>]

Options

--ontology-iri IRI for the ontology root (required)
--base-iri     Base IRI for term identifiers in the context (optional)
--output       File path to write the ontology JSON-LD; defaults to stdout (optional)
--api-endpoint REST Countries API endpoint; defaults to https://restcountries.com/v3.1/all (optional)

## Implementation Details

1. Parse `process.argv` to extract subcommand and options using Zod or a lightweight parser.
2. For `convert`, use fs/promises to read and parse the input JSON file.
3. For `capital-cities`, use fetch to retrieve country data, map each country to a term definition with a capital property.
4. Call `generateOntology(data, { ontologyIri, baseIri })` to produce the JSON-LD OWL document.
5. Serialize output with `JSON.stringify(document, null, 2)` and write to the specified file or `stdout`.
6. Exit with code 0 on success, nonzero on any error (argument parsing, I/O, network, JSON parsing).

## Tests

Add unit tests in `tests/unit/cli-convert.test.js` and `tests/unit/cli-capitals.test.js`:

- Successful conversion writes a correct JSON-LD file and prints expected graph nodes.
- Missing required options (`--input`, `--ontology-iri`) produce exit code 1 and error message.
- Custom `--base-iri` appears in the `@context` of the output.
- For `capital-cities`, test fetching from a mock API endpoint and verify known country capital mapping.

## Documentation Updates

- Update `README.md` to include full usage examples for both `convert` and `capital-cities` commands with sample output.
- Enhance `docs/USAGE.md` with detailed option tables and invocation snippets for both subcommands.

Ensure compatibility with Node 20, ESM, and follow existing style guidelines.  