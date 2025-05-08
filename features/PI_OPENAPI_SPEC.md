# Overview

Add a new command to generate an OpenAPI (Swagger) specification for the existing HTTP API endpoints, enabling users and tools to discover and integrate the service programmatically.

# Implementation

1. CLI Flag
   - Add a new flag --generate-openapi <path?> to src/lib/main.js argument parsing using minimist.
   - When provided with a file path, write the spec file at that location. When provided without a path, print the JSON or YAML spec to stdout.

2. OpenAPI Spec Generation
   - Build an OpenAPI 3.0 spec object with:
     * info: title from package.json.name, version from package.json.version
     * servers: one entry using SERVER_PORT default or CLI port flag
     * paths: definitions for /health, /pi, and /benchmark endpoints
       • parameters: digits, algorithm, format, etc.
       • responses: 200 and 400 with JSON schemas
   - Derive parameter schemas from existing zod validators and ALGORITHMS array.
   - Serialize spec to JSON. If output extension is .yaml or flag --yaml is present, use js-yaml to output YAML.

3. File I/O and Error Handling
   - Import fs/promises to write files.
   - Validate output directory and file permissions; on error, print to stderr and exit with code 1.
   - On success, exit with code 0.

# Testing

- Add tests in tests/unit/openapi.test.js:
  • Simulate CLI invocation with --generate-openapi spec.json and assert file exists and contains valid JSON with openapi and paths keys.
  • Simulate flag without path and capture stdout; parse output as JSON and assert expected spec fields.
  • Provide an invalid output path and verify process exits with code 1 and prints an error message.

# Documentation

- Update README.md:
  • Under CLI options, document --generate-openapi [path] and --yaml for YAML output.
  • Provide example commands:
      node src/lib/main.js --generate-openapi openapi.json
      node src/lib/main.js --generate-openapi > spec.yaml --yaml
  • Describe how to load the spec into Swagger UI or other tools.