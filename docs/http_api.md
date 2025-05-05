# HTTP_API Feature

## Description

The HTTP API mode exposes ASCII faces and metadata via RESTful endpoints for programmatic integration.

## CLI Options

- `--serve`, `-S`
  Start the HTTP server (default port 3000).
- `--port <number>`, `-p <number>`
  Specify a custom listening port for the server.

## Endpoints

- **GET /face**
  Returns a single random ASCII face as plain text.

- **GET /faces**
  Returns a JSON array of all faces formatted as `"index: face"`.

- **GET /names**
  Returns a JSON array of sorted face identifiers.

- **GET /seed/:value**
  - If `:value` is a valid number:
    - Returns deterministic face as plain text.
  - Otherwise:
    - HTTP 400 with JSON `{ "error": "Invalid seed value" }`.

- **GET /name/:face**
  - If `:face` exists (case-insensitive):
    - Returns the corresponding face as plain text.
  - Otherwise:
    - HTTP 404 with JSON `{ "error": "Face not found" }`.

- **GET /diagnostics**
  Returns a JSON object with:
  ```json
  {
    "nodeVersion": "<string>",
    "appVersion": "<string>",
    "faceCount": <number>,
    "faceNames": ["<name1>", "<name2>", ...],
    "dependencies": { "<pkg>": "<version>", ... }
  }
  ```

- **All other routes**
  HTTP 404 with JSON `{ "error": "Not Found" }`.

## Usage Examples

```bash
repository0-crucible --serve
repository0-crucible --serve --port 4000
curl http://localhost:3000/face
curl http://localhost:3000/faces
curl http://localhost:3000/names
curl http://localhost:3000/seed/42
curl http://localhost:3000/name/frown
curl http://localhost:3000/diagnostics
```