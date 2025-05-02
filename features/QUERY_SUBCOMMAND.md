# Overview

Add a new query subcommand to the CLI that resolves JSON Pointers against JSON or JSON-LD files, extracting specific values for inspection or further processing. This subcommand will complement existing inspection tools by providing a precise mechanism for drilling into deeply nested structures.

# Implementation

1. Argument Parsing and Validation
   - Extend the dispatch logic in src/lib/main.js to recognize subcommand "query".
   - Collect flags from restArgs into an object with keys input, pointer, output.
   - Define a Zod schema requiring:
     • input: nonempty string pointing to a JSON file
     • pointer: nonempty string that must start with "/"
     • output: optional string
   - On validation failure, log each error to stderr and return exit code 1.

2. JSON Pointer Evaluation
   - Implement an evaluatePointer(document, pointer) helper in the query branch following JSON_POINTER.md:
     • If pointer is an empty string, return the entire document.
     • Split pointer by "/" into tokens, skipping the leading empty element.
     • Decode each token by replacing "~1" with "/" and "~0" with "~".
     • Traverse the document object:
       – If current value is an object, access the property matching token or throw ReferenceError if missing.
       – If current value is an array, ensure token matches /^
       (0|[1-9]\d*)$/; parse to integer index or throw RangeError on invalid or out of bounds.
       – If current value is neither object nor array, throw TypeError.
   - Wrap evaluation in try/catch to capture ReferenceError, RangeError, TypeError, I/O and JSON parsing errors.

3. Output
   - Serialize the extracted value with JSON.stringify and indent of 2 spaces.
   - If --output is provided, write to file using fs.writeFile; otherwise, log to stdout.
   - On error, log error message prefixed with "Error during query: " to stderr and exit code 1.

# Testing

Create tests in tests/unit/cli-query.test.js covering:

• Successful extraction of nested values printed to stdout.
• Successful writing of extracted value to a file when --output is used.
• Missing required flags (--input or --pointer) exits with code 1 and logs validation errors.
• Pointer without leading slash exits with code 1 and descriptive validation error.
• Pointer to a non-existent path throws ReferenceError, caught and logged with exit code 1.
• Pointer into non-array or non-object type throws TypeError, caught and logged.
• Invalid JSON input file exits with code 1 and logs a parse error.

# Documentation

1. Update README.md under the "Command-Line Interface" section to include the query subcommand:
   • Document flags --input, --pointer, --output.
   • Provide example invocations and expected output.

2. Update docs/USAGE.md in "CLI Usage" with a "query" section illustrating usage and pointer syntax.

# Consistency

Follow existing coding conventions and patterns from other subcommands. Add the new branch adjacent to filter in src/lib/main.js. Ensure error handling, logging, and exit code semantics are uniform. Include zod for flag schema and fs/promises for file operations. Include tests before committing.