# Summary

Extend the existing HTTP JSON API feature to include an OpenAPI specification for all endpoints and provide a spec endpoint for discovery and documentation integration.

# Specification

- Generate a complete OpenAPI 3.0.3 specification object describing these endpoints:
  • GET /face with query parameters: count, seed, category, facesFile, mergeFaces. Response schema: object with property faces (array of strings).
  • GET /list-faces with query parameters: category, facesFile, mergeFaces. Response schema: object with property faces (array of strings).
  • GET /list-categories with query parameters: facesFile, mergeFaces. Response schema: object with property categories (array of strings).
  • GET /diagnostics with query parameters: facesFile, mergeFaces, seed. Response schema: diagnostic object matching CLI diagnostics output.
  • GET /openapi.json: returns the generated OpenAPI specification in JSON.
- Add a new optional flag --openapi-file <path> in serve mode to write the spec to disk at startup. If omitted, spec is only served over HTTP.
- Content-Type for /openapi.json must be application/json.
- Ensure Access-Control-Allow-Origin: * header is set on all API responses.
- Validation of query parameters in HTTP handlers must align with parameter definitions in the OpenAPI spec.

# Testing

- Add tests in tests/unit/http_api_openapi.test.js. Start the server on an ephemeral port and request GET /openapi.json.
- Verify response status is 200, Content-Type is application/json, and the body is a valid OpenAPI object with info, paths, components, and correct operation definitions.
- Test that writing to disk works when --openapi-file is provided, creating or overwriting the specified file with a valid JSON spec.
- Test that invalid --openapi-file path yields a descriptive error and exits nonzero.

# Documentation

- Update README.md under Features to mention the OpenAPI spec endpoint and --openapi-file flag with examples.
- Update docs/HTTP_API.md to include a section OpenAPI Specification showing how to fetch and use the spec, and include a minimal snippet of the spec structure.
- Add an example curl command: curl http://localhost:3000/openapi.json.

# Implementation Details

- In src/lib/main.js, in the serve handler, after defining the HTTP server routes, construct an OpenAPI spec object in memory. Use a JS object literal matching OpenAPI 3.0.3 schema with info (title, version), servers array, paths object, and components schemas.
- Register a new route: if request.url startsWith '/openapi.json', respond with JSON.stringify(spec, null, 2) and headers Content-Type application/json and CORS header.
- Implement --openapi-file flag parsing in the serve setup. If provided, use fs.writeFileSync to write the spec object to the given path before listening, catching errors and calling errorExit.
- Ensure existing CORS header logic includes the new endpoint.
- Do not alter other endpoints beyond integration with the spec. Maintain consistent error handling and logging.