# HTTP Pi Server Feature

## Feature Overview
Implement an HTTP API to serve pi digits and visualizations as text or PNG over HTTP, enabling programmatic access and integration.

## Requirements
1. Support a --serve flag to start an HTTP server instead of CLI output.
2. Support an optional --port parameter to specify the listening port, defaulting to 8080.
3. Implement a GET /pi endpoint accepting digits and benchmark query parameters, returning a JSON response with the pi value and optional benchmark data.
4. Implement a GET /visualize endpoint accepting digits, width and scheme query parameters, returning a PNG image of the pi visualization.
5. Use Node built-in http and url modules with no additional dependencies.
6. Validate all input parameters and return HTTP 400 with clear error messages on invalid values.

## Behavior
- node src/lib/main.js --serve starts the HTTP server.
- GET /pi?digits=1000 returns a JSON object with a pi string of 1000 digits.
- GET /pi?digits=500&benchmark=true returns benchmark metadata including execution time and memory usage.
- GET /visualize?digits=1000 returns a PNG image with default width and color scheme.
- Endpoints return HTTP status 200 on success and 4XX on client errors.

## Testing
- Unit tests for request handlers that parse query parameters and generate responses.
- Integration tests that start the server and validate JSON and PNG responses using HTTP requests.

## Documentation Updates
- Update README to list Serve pi via HTTP API under Features.
- Add usage examples for --serve and curl commands to fetch endpoints.
