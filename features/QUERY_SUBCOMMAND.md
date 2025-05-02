# Overview

Add a new query subcommand to the CLI to retrieve a specific portion of a JSON-LD ontology document using a standard JSON Pointer. This enables users to extract nested values or graph nodes without writing custom parsing code.

# Implementation

1. Command Dispatch
   - Recognize the "query" subcommand in the main dispatcher after global flags.

2. Flag Parsing and Validation
   - Supported flags:
     - --input (string, required): Path to the JSON-LD ontology file.
     - --pointer (string, required): A JSON Pointer string (RFC 6901) identifying the element to extract.
     - --output (string, optional): Path to write the output JSON. If omitted, print to stdout.
   - Use zod to validate presence and types of flags. On validation failure, log errors and return exit code 1.

3. JSON Pointer Evaluation
   - Read and parse the input file as JSON. On parse error, log "Error during query: <message>" and return exit code 1.
   - Implement a pointer resolver that:
     - Splits the pointer on '/' tokens, ignoring the empty leading segment.
     - Unescapes '~1' to '/' and '~0' to '~' in each reference token.
     - Traverses objects by property name or arrays by numeric index.
     - Throws an error if a property is missing or an index is out of range.
   - Catch any ReferenceError, TypeError, or RangeError and log "Error during query: <message>", returning exit code 1.

4. Output
   - Serialize the extracted value with indentation of 2 spaces.
   - If --output is provided, write the serialized result to the given file; otherwise, print to stdout.
   - On write failure, log "Error during query: <message>" and return exit code 1.
   - On success, return exit code 0.

# Testing

- Create tests in tests/unit/cli-query.test.js covering:
  • Successful extraction to stdout for a nested value.
  • Writing extracted result to file when --output is provided.
  • Missing required flags returns code 1 and logs validation errors.
  • Invalid JSON input returns code 1 and logs error.
  • Invalid pointer syntax (e.g., missing leading slash) returns code 1 with descriptive error.
  • Pointer to non-existent path returns code 1 with descriptive error.

# Documentation

1. README.md
   - Under the Command-Line Interface section, add a new entry for the query subcommand with flags --input, --pointer, --output and usage examples.

2. docs/USAGE.md
   - Under CLI Usage, insert a section for query showing flags, purpose, and example invocation:
     node src/lib/main.js query --input ontology.json --pointer /@graph/0/name --output result.json

Ensure all additions follow the CONTRIBUTING.md guidelines, include new tests, and maintain consistency with existing subcommand patterns.