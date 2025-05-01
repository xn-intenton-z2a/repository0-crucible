# JSON2OWL_CLI

Adds a new subcommand to the CLI for converting a JSON file of term definitions into a JSON-LD OWL ontology document. This command reads a local JSON file, generates an ontology via generateOntology, and writes the result to a file or stdout.

# Usage

node src/lib/main.js convert --input <path> --ontology-iri <iri> [--base-iri <iri>] [--output <path>]

--input  Path to a JSON file containing data
--ontology-iri Mandatory IRI for the ontology root
--base-iri Optional base IRI for relative term IRIs
--output Path to write the resulting ontology JSON-LD. If omitted, output to stdout

# Implementation details

The main function will be extended to detect the convert command. It will parse arguments, validate required options, read the input file using fs, call generateOntology with parsed options, then write JSON.stringify of the result to the output path or pipe to console.log. Use built-in fs module and JSON methods. Errors in argument parsing or file operations should result in a nonzero exit code and an error message to stderr.

# Tests

Add unit tests in tests/unit/cli-convert.test.js to cover the following scenarios

- Successful conversion writes correct content to a temporary file
- Missing input path triggers an error
- Missing ontology-iri triggers an error
- Conversion with base-iri includes @base in the context

Also update README with an example of the convert command.