# Overview

Add a new subcommand `filter` to allow users to select ontology nodes based on a specified property name and value. This enables more flexible queries over JSON-LD OWL documents without requiring full SPARQL support.

# Implementation

1. Subcommand Dispatch
   - In main.js, detect the `filter` subcommand when the first CLI argument is `filter`.
   - Parse flags using zod:
     • `input` (string, required): path to the JSON-LD ontology file.
     • `property` (string, required): the node property key to filter by.
     • `value` (string, required): the expected value for the given property.
     • `output` (string, optional): path to write the filtered nodes JSON. Defaults to stdout if omitted.

2. File Loading and Validation
   - Read the file at `input` using fs.readFile.
   - Parse the file content as JSON; report parse errors to stderr and exit with code 1.
   - Validate that parsed data contains an array at `@graph`; if missing or not an array, log `Invalid ontology: missing @graph array` to stderr and exit code 1.

3. Filtering Logic
   - Iterate over each node in `@graph` and check if the node has the specified `property` key and its value strictly equals the provided `value` string.
   - Collect all matching node objects into an array `results`.

4. Output
   - Serialize `results` with indent 2.
   - If `output` flag is provided, write to the specified file using fs.writeFile, otherwise print to stdout.
   - Return exit code 0 on success.

5. Error Handling
   - On any file I/O, JSON parse, or write error, log a descriptive message prefixed with `Error during filter:` to stderr and return exit code 1.

# Testing

1. Create tests/unit/cli-filter.test.js covering:
   • Successful filtering to stdout by mocking fs.readFile, spying on console.log, and supplying a sample `@graph` with nodes matching and not matching the filter.
   • Writing filtered nodes to a file when `--output` is provided and verifying file contents.
   • Missing required flags (`input`, `property`, or `value`) returns exit code 1 and logs errors.
   • Invalid JSON or missing `@graph` scenarios exit with code 1 and appropriate error messages.
   • No nodes match filter results in exit code 0 and outputs an empty array.

# Documentation

1. Update README.md under Command-Line Interface to document the `filter` subcommand with flags and usage examples.
2. In docs/USAGE.md under CLI Usage, add a section for `filter`:
   • Flags: `--input`, `--property`, `--value`, `--output`
   • Example invocation and expected JSON output.