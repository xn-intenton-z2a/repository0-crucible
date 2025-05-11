# Overview
This feature adds support for generating an OpenAPI 3.0 specification for the HTTP API endpoints, enabling clients and tools to integrate seamlessly.

# CLI Interface
Extend main(args) to accept the following flag:
--openapi <file>       Output the OpenAPI JSON specification to the specified file; if omitted, write to stdout

When --openapi is present, bypass normal operations (calculations, benchmarks, server startup) and output the OpenAPI spec.

# Implementation Details
• Define an OpenAPI 3.0 compliant JSON object with metadata (info, version, servers) and paths for /pi and /benchmark endpoints, including parameters, request validation, response schemas (PiResponse, BenchmarkResponse, ErrorResponse).
• In src/lib/main.js, after parsing args, detect --openapi. Construct the spec object in memory, serialize with JSON.stringify(spec, null, 2), and write to stdout or to the given file via fs/promises.writeFile.
• Reuse existing validation logic or manually define parameter schemas to ensure consistency with HTTP_API behavior.
• Do not introduce external dependencies for spec generation; leverage built-in modules.

# Testing
• Unit tests in tests/unit/main.test.js:
  – Invoke main with ['--openapi'] and verify the returned object has keys openapi, info, paths with entries /pi and /benchmark.
  – Mock fs/promises.writeFile and verify it is called when a file path is provided.
• E2E tests in tests/e2e/cli.test.js:
  – Run the CLI with --openapi, parse stdout as JSON, and assert top-level keys openapi, info, paths.
  – Run the CLI with --openapi openapi.json and assert that openapi.json exists, contains valid JSON, and includes the correct paths.

# Documentation
Update README.md to document the --openapi flag, provide usage examples:
    node src/lib/main.js --openapi
    node src/lib/main.js --openapi api-spec.json
Include a note that the generated specification is compliant with OpenAPI 3.0 and can be used with Swagger UI or other tools.