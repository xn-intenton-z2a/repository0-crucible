# Overview

Add a new filter subcommand to the CLI that selects ontology nodes by a specified property and value, producing a JSON-LD fragment of matching nodes.

# Implementation

1. Command Dispatch
   - Recognize the filter subcommand name after global flags.  Dispatch to its handler.

2. Flag Parsing and Validation
   - Supported flags: --input (string, required), --property (string, required), --value (string, required), --output (string, optional).
   - Use zod to validate presence and types of flags.  On validation failure, log errors and return exit code 1.

3. Filtering Logic
   - Read the input file as UTF-8, parse JSON.  If parsing fails, catch and log "Error during filter: <message>" and return exit code 1.
   - Ensure data["@graph"] is an array.  If missing or not an array, log "Error during filter: missing @graph array" and return exit code 1.
   - Iterate over each node in @graph and select those where node[property] strictly equals the provided value.  Collect matching nodes in an array.
   - Serialize the array of matches as JSON-LD fragment with indent 2.

4. Output
   - If --output is provided, write serialized results to the file path; otherwise print to stdout.
   - On I/O errors during write, log "Error during filter: <message>" and return exit code 1.
   - Always return exit code 0 on success, even if no nodes match (empty array output).

# Testing

Create tests in tests/unit/cli-filter.test.js covering:

- Successful filtering to stdout given matching nodes.
- Writing filtered results to a file when --output is provided.
- Missing required flags causes exit code 1 and logs validation errors.
- Invalid JSON input or missing @graph scenarios exit code 1 with appropriate error messages.
- No nodes match returns exit code 0 and prints an empty array.

# Documentation

1. README.md
   - Under the Command-Line Interface section, add a filter subcommand entry with flags --input, --property, --value, --output and example usage.

2. docs/USAGE.md
   - Under CLI Usage, insert a new section for filter showing flags, purpose, and an example invocation:
     node src/lib/main.js filter --input data.json --property type --value Person --output matches.json

Ensure contributions follow CONTRIBUTING.md guidelines, include new tests, update documentation, and maintain consistency with existing flag parsing patterns.