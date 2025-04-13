# REST_API Feature

## Overview
This feature adds a REST API endpoint to the owl-builder repository. The REST API provides a lightweight HTTP server that allows users to query and interact with generated OWL ontologies. It complements the existing CLI features (e.g., --capital-cities) by offering a programmatic interface to access ontology data.

## Implementation Details
- **HTTP Server:** Integrate Node.js's built-in HTTP modules to create a simple server that listens on a configurable port (defaulting to 3000).
- **CLI Integration:** Extend the main CLI parser to accept a `--serve` flag. When this flag is used, the application starts the REST API server.
- **API Endpoints:** 
  - GET `/ontologies`: Returns a list of available OWL ontologies (e.g., from the capital cities command and future data sets).
  - GET `/ontologies/:id`: Returns the detailed OWL ontology for the specified identifier.
  - POST `/ontologies/refresh`: Trigger data refresh and ontology regeneration from public data sources.
- **Error Handling:** Ensure proper error reporting and status codes for unsupported routes or failures in data processing.
- **Testing:** 
  - Add unit tests to verify the server starts and responses are correctly returned.
  - Integration tests to simulate API requests and check for expected outputs.

## Documentation
- Update the README.md to include a brief overview and usage examples of the REST API.
- Provide clear instructions on how to start the server via the CLI (`node src/lib/main.js --serve`) and how to interact with the API endpoints.

## Future Considerations
- Secure the API endpoints with API keys or token-based authentication if needed.
- Integrate detailed logging and monitoring for server diagnostics.
- Extend API endpoints to cover additional ontology management features as the project evolves.