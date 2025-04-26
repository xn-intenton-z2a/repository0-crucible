# Description
Add a CLI flag --serve to start a local HTTP server that exposes core CLI features as REST endpoints. This satisfies the mission to provide an HTTP interface for exploring and querying OWL builder functionality without switching to the CLI.

# Implementation
Extend main to detect the --serve flag. When present, do the following:
  • Read port number from environment variable PORT or default to 3000
  • Create an HTTP server using the built-in http module
  • Route requests as follows:
      • GET /help  Respond with plain text help message identical to the CLI help output
      • GET /sources  Respond with a JSON array of the combined default and custom data sources, formatted with two-space indentation
      • GET /diagnostics  Respond with the diagnostics JSON produced by the existing diagnostics logic
      • Any other path  Respond with 404 status and a plain text error message
  • Log a startup message indicating the server is listening and keep the process running until manually terminated
Preserve existing behavior when --serve is not present.

# Endpoints
GET /help
  Content-Type: text/plain
  Body: CLI usage instructions and available options

GET /sources
  Content-Type: application/json
  Body: Array of objects with name and url for each data source

GET /diagnostics
  Content-Type: application/json
  Body: Diagnostics object with version, nodeVersion, platform, arch, cwd, publicDataSources, commands

# Testing
Add unit tests in tests/unit/main.test.js that do the following:
  • Start the server by calling main(["--serve"]) and capture the returned server instance
  • Use http or native fetch to issue GET requests to /help, /sources, and /diagnostics
  • Verify status code, content type header, and response body match expected outputs
  • Close the server after tests complete
Ensure tests do not hang and perform cleanup even if assertions fail.

# Documentation Updates
Update docs/FEATURES.md and README.md under Features to describe the serve option. Include example curl commands and sample responses for each endpoint.