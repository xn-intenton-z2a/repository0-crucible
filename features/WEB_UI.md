# Summary

Provide a simple web interface when serve mode is enabled. A GET request to root / returns an HTML page with a form and interactive controls to generate faces, list faces and categories, and view diagnostics. The UI uses fetch to call the existing HTTP API endpoints and displays results without requiring a separate client.

# Specification

- New route GET / serves a self-contained HTML page.  The page includes:
    - Input fields for count, seed, category, facesFile path, and mergeFaces flag.
    - Buttons to trigger generate faces, list faces, list categories, and view diagnostics.
    - A display section for results or error messages.
- The HTML is embedded directly in main.js as a template string.
- The server responds to GET / with Content-Type text/html and status 200.
- The page uses JavaScript fetch calls to existing endpoints: /face, /list-faces, /list-categories, and /diagnostics.  Fetch responses are parsed as JSON and rendered in the display section.
- Errors returned by fetch are caught and displayed to the user.

# Testing

- Add a unit test in tests/unit/http_api.test.js:
    - Issue GET / on the running server and assert status 200.
    - Assert the response body contains <!DOCTYPE html> and references to the fetch targets: /face, /list-faces, /list-categories, /diagnostics.

# Documentation

- Update README.md under Features to mention the web UI available at root when serve mode is active.
- In docs/HTTP_API.md add a section describing the root UI, its controls, and how it interacts with the API.

# Implementation Details

- In serveMode in src/lib/main.js, before routing API endpoints, check if pathname is "/" or empty.  If so send the HTML template string with res.writeHead(200, {"Content-Type":"text/html"}) and res.end.
- Define the HTML template as a constant in main.js.  Include minimal inline CSS and JavaScript.
- Ensure existing API endpoints continue to work unchanged.
