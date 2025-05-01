# CAPITAL_CITIES_CLI

Adds a new CLI subcommand to fetch capital cities data from a public API and convert it into a JSON-LD OWL ontology document. This command retrieves country data from the REST Countries API, extracts capital city information, invokes generateOntology, and writes the result to a file or stdout.

# Usage

node src/lib/main.js capital-cities --ontology-iri <iri> [--base-iri <iri>] [--output <path>] [--api-endpoint <url>]

--ontology-iri   Mandatory IRI for the ontology root
--base-iri       Optional base IRI for relative term IRIs
--output         Path to write the resulting ontology JSON-LD. If omitted, output to stdout
--api-endpoint   Optional URL for the REST Countries API endpoint; defaults to https://restcountries.com/v3.1/all

# Implementation details

The main function detects the capital-cities command. It reads and validates required options, fetches JSON data from the specified API endpoint using the global fetch API, and transforms the array of country objects into a map of term definitions. Each term key is the country name, and properties include the capital array. After data transformation, the command calls generateOntology with parsed options and writes JSON.stringify of the result to the output path or console.log. Errors in argument parsing, network failures, or file operations should result in a nonzero exit code and an error message to stderr.

# Tests

Add unit tests in tests/unit/cli-capitals.test.js to cover the following scenarios

- Successful execution writes correct ontology containing a node for a known country capital
- Missing ontology-iri triggers an error exit code and message to stderr
- Custom api-endpoint parameter is used instead of the default URL

Also update README with an example of the capital-cities command invocation.