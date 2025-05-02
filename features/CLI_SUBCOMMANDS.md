# Overview
Provide a unified CLI entrypoint in src/lib/main.js that routes multiple subcommands under a single invocation. Each subcommand must perform option parsing, validation, and invoke the generateOntology library to produce a JSON-LD OWL document.

# Subcommands

## convert
Read a local JSON file of term definitions, generate a JSON-LD OWL ontology, and write to stdout or a file.

Usage
node src/lib/main.js convert --input <path> --ontology-iri <iri> [--base-iri <iri>] [--output <path>]

Options
--input        Path to JSON file of term definitions (required)
--ontology-iri IRI for the ontology root (required)
--base-iri     Base IRI for term identifiers (optional)
--output       File path to write the ontology JSON-LD, defaults to stdout (optional)

## capital-cities
Fetch country data from a REST API and generate a JSON-LD OWL ontology of capitals.

Usage
node src/lib/main.js capital-cities --ontology-iri <iri> [--base-iri <iri>] [--output <path>] [--api-endpoint <url>]

Options
--ontology-iri IRI for the ontology root (required)
--base-iri     Base IRI for term identifiers (optional)
--output       File path to write the ontology JSON-LD, defaults to stdout (optional)
--api-endpoint URL of REST Countries API, defaults to https://restcountries.com/v3.1/all (optional)

# Implementation Details
1. Use Zod schemas to parse process.argv and validate options for each subcommand.
2. Implement handler modules in src/lib/commands/convert.js and src/lib/commands/capitalCities.js.
3. In convert handler use fs/promises readFile to load and parse the input JSON, then call generateOntology with the parsed data and options.
4. In capital-cities handler use fetch to retrieve country data, map each country to a term definition with its capital, then call generateOntology.
5. Serialize the JSON-LD document with JSON.stringify(document, null, 2) and write using fs/promises writeFile or stdout.
6. Exit with code 0 on success; exit with code 1 and log an error message on missing required options, I/O errors, network failures, or JSON parsing errors.

# Tests
Add unit tests in tests/unit/cli-convert.test.js and tests/unit/cli-capitals.test.js:

• Successful conversion writes a correct JSON-LD file and prints expected graph nodes.
• Missing required options produce exit code 1 and a descriptive error message.
• Custom base-iri appears in the @context of the output.
• For capital-cities test fetching from a mock API endpoint and verify known country capital mapping.

# Documentation Updates
Update README.md to include full usage examples for both convert and capital-cities commands with sample output. Enhance docs/USAGE.md to include option tables and invocation snippets for both subcommands.