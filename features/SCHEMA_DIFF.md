# SCHEMA_DIFF Feature

## Overview
This feature provides a comprehensive tool for comparing JSON Schema files. It enables developers to quickly identify differences between two schema versions through a command-line interface and an optional HTTP API endpoint. This assists teams in validating API changes and ensuring version consistency.

## Functionality
- **Command Line Interface (CLI)**: Integrates with the existing CLI to accept commands like `--diff` or `diff` with two schema file paths as arguments.
- **HTTP API Endpoint**: Optionally expose an HTTP endpoint to allow remote submission of two JSON Schema documents with alternative diff output formats.
- **Comparison Engine**: Compares JSON Schema documents by analyzing differences in properties, types, and structure. Supports both human-readable output and machine-parsable JSON format.
- **Output Handling**: Provides a detailed diff report that clearly highlights each discrepancy. Includes options for color-coded output and verbose logging.
- **Error Handling and Validation**: Robust input validation with helpful error messages if incorrect schemas or paths are provided.

## Implementation
- **CLI Integration**: Update `src/lib/main.js` to handle the `--diff` or `diff` commands and optionally a `--http` flag to start the HTTP server.
- **Comparison Module**: Implement a new module `src/lib/schemaDiff.js` to encapsulate the diff logic for comparing JSON Schema objects.
- **HTTP Server (Optional)**: Use a lightweight HTTP server library to expose an API endpoint for JSON Schema diff computation. This endpoint accepts POST requests, validates the schemas, runs the diff, and returns the result.
- **Testing**: Add unit tests in `tests/unit/schemaDiff.test.js` to verify both CLI and HTTP diff operations. Ensure error conditions and valid outputs are thoroughly tested.
- **Documentation**: Update the README.md and CONTRIBUTING.md files to document the new functionalities, including usage examples for both CLI and HTTP API modes.

## Integration & Testing
- Ensure compatibility with Node 20 and ECMAScript Module (ESM) standards.
- Follow code quality and testing guidelines from CONTRIBUTING.md.
- Validate feature functionality using test suites and manual runs through both CLI and HTTP endpoints.

## Value Proposition
This enhanced SCHEMA_DIFF feature empowers API developers by providing a robust, flexible way to compare JSON schemas. It streamlines the process of validating API changes, thereby reducing errors and improving team collaboration during version upgrades.