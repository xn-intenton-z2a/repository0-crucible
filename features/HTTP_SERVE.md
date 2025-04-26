# HTTP Serve

## Overview
Add a --serve CLI option that starts an HTTP server enabling ontology and data source operations via HTTP.
Users can run node src/lib/main.js --serve to start the server.

# Functionality

- Recognize --serve flag and optional --port <number> argument.
- Listen on specified port (default 3000).
- GET /health returns status ok with JSON {"status": "ok"}.
- GET /sources returns list of configured data source keys from SOURCES constant.
- GET /fetch/:sourceKey invokes existing fetch logic to retrieve remote JSON and return JSON response or error.

# Usage

node src/lib/main.js --serve
node src/lib/main.js --serve --port 8080

# Testing

Write unit tests to start server on an ephemeral port and verify that GET /health and /sources respond correctly and that invalid routes return 404.

# Documentation

Update README.md to document the --serve flag, server endpoints, port configuration, and example curl commands.