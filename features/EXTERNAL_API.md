# Summary
Unify the programmatic library API and the HTTP JSON and browser UI endpoints into a single cohesive external integration feature.

# Node.js Library API
- Export generateFaces(options), listCategories(options), and listFaces(options) from src/lib/main.js using ESM syntax.
- Each function accepts a single options object with optional parameters: count, seed, category, facesFile, mergeFaces, mergeTheme, template, output, serve, diagnostics.
- Functions return promises or values: generateFaces resolves to an array of strings; listCategories and listFaces resolve to arrays of strings.
- On invalid parameters throw descriptive Error instances.
- Maintain existing CLI behavior by having main(args) delegate to these exports.

# HTTP JSON API and Browser UI
- Recognize a --serve flag to start an HTTP server on a specified port (default 3000).
- GET /face responds with JSON: { faces: [string,...] } based on query parameters matching CLI options.
- GET /diagnostics responds with a JSON diagnostics report when --diagnostics is enabled.
- GET / serves an HTML page with a controls form for count, seed, category, facesFile, mergeFaces and a client script that fetches /face and displays faces.
- Serve client-side script at GET /ui.js or inline in the HTML template.
- Set appropriate Content-Type headers for JSON, HTML, and JavaScript.
- On invalid query parameters return JSON errors with descriptive messages and HTTP 400 status.

# Testing
- Add unit tests in tests/unit/main.api.test.js for imported generateFaces, listCategories, listFaces functions.
- Add integration tests in tests/e2e/api.test.js using a tool like supertest or built-in HTTP module to verify HTTP endpoints and error handling.
- Use JSDOM in tests/e2e/ui.test.js to load the HTML page, simulate form submissions, and assert faces are rendered correctly.

# Documentation
- Update README.md under Features to describe the External API, showing both import examples and HTTP usage.
- Add docs/EXTERNAL_API.md explaining the library exports, server endpoints, query parameters, expected responses, and example client-side usage.