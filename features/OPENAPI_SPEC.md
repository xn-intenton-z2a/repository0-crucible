# Overview

This feature generates an OpenAPI 3.0 specification document for all exposed HTTP API endpoints (calculate, digits, benchmark, metrics, algorithms). It provides a machine-readable contract that clients and tools can use for code generation, validation, and interactive API exploration.

# CLI Interface

--openapi
    Print the full OpenAPI JSON specification to stdout.

--openapi-output <path>
    Write the OpenAPI JSON specification to the specified file path.

# Implementation

- Add a dependency on swagger-jsdoc to package.json.
- In src/lib/main.js:
  • Import swaggerJsdoc from swagger-jsdoc.
  • Define a JSDoc-based configuration object with info (title, version, description from package.json), servers (e.g., http://localhost:{port}), and paths definitions matching each API route (/calculate, /digits, /benchmark, /metrics, /algorithms).
  • When parsing CLI args, detect --openapi and --openapi-output options before starting the HTTP server logic.
    - If --openapi is present (with or without --serve), invoke swaggerJsdoc(config) to generate the spec object.
    - Serialize the spec to JSON with 2-space indentation.
    - If --openapi-output is provided, write the JSON to the given file path, creating directories as needed.
    - Otherwise, write the JSON to stdout and exit with status code zero.
  • Ensure this logic does not start the HTTP server or perform any π computations when generating the spec.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Invoke main with ["--openapi"] and capture stdout; parse as JSON; assert openapi property equals "3.0.0" and paths object contains expected keys.
  • Invoke main with ["--openapi","--openapi-output","temp/openapi.json"] using a temporary directory; verify the file is created and contains valid OpenAPI JSON.
  • Test that combining --openapi with --serve does not start the HTTP server and exits immediately after printing spec.

# Documentation

- Update README.md under Features:
  • Document the --openapi and --openapi-output flags with example usages:
      node src/lib/main.js --openapi > openapi.json
      node src/lib/main.js --openapi --openapi-output api-spec.json
  • Explain how the generated OpenAPI document can be used with tools like Swagger UI or code generators.