# SCHEMA_DIFF Feature

## Overview
This feature introduces a JSON Schema diff functionality to the repository. It allows developers to compare two JSON schema files and generate a human-readable diff report, helping teams track and validate changes between different versions of API definitions.

## Functionality
- **Command Line Interface**: Extend the existing CLI to accept a `--diff` or `diff` command that takes two file paths as input.
- **Comparison Engine**: Compare two JSON Schema documents and identify differences in properties, types, and structure.
- **Output**: Generate a clear, human-readable diff output. Optionally, support JSON formatted output for further processing.
- **Error Handling**: Validate inputs and provide meaningful error messages if incorrect schemas or file paths are provided.

## Implementation
- Modify the `src/lib/main.js` to parse the `diff` command and delegate to the comparison function.
- Create a new module (e.g., `src/lib/schemaDiff.js`) to perform the actual comparison logic.
- Write unit tests in `tests/unit/schemaDiff.test.js` to verify correct diff generation for various schema changes.
- Update the README.md to document the new `diff` functionality.

## Integration & Testing
- Ensure compatibility with Node 20 and ECMAScript Module (ESM) standards.
- Follow the guidelines provided in CONTRIBUTING.md regarding code quality, documentation, and testing.
- Validate the feature by running the existing CLI and ensuring the `diff` command functions correctly on provided test cases.

## Value Proposition
This feature aligns with the repository's mission to aid API developers in tracking and validating JSON Schema changes, thus streamlining the API version upgrade process and improving collaboration.
