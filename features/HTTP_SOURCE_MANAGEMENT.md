# Description
Add HTTP endpoints to the existing CLI server for full management of data sources via REST. This feature complements the list, add, remove and update commands by exposing them as HTTP operations under /sources.

# HTTP Server Endpoints
- GET /sources
  Responds with status 200 and application/json body containing the merged list of public and custom sources as JSON.
- POST /sources
  Expects Content-Type application/json and a JSON body with name (string) and url (string). On success returns status 201 and application/json body with the updated list of sources. On invalid input returns 400 plain-text error.
- DELETE /sources/:identifier
  Removes a custom data source matching the identifier by name or url. On success returns status 200 and application/json body with the updated list of sources. If not found returns 404 plain-text error.
- PUT /sources/:identifier
  Expects Content-Type application/json and a JSON body with newName (string) and newUrl (string). Updates the custom source matching identifier. On success returns status 200 and application/json body with the merged list of sources. On invalid input or missing source returns 400 or 404 plain-text error.

# Testing
Add HTTP integration tests for each endpoint, verifying status codes, response content types, valid request handling, error cases, and body payloads.

# Documentation Updates
Update docs/FEATURES.md, docs/USAGE.md and README.md to describe the new /sources endpoints, including example HTTP requests and responses.