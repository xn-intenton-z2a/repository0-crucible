# HTTP API

## Summary

Enable serving ASCII face functionality over HTTP, allowing integration with web services and automated clients.

## CLI Usage

Start the HTTP server on a specific port:

```bash
node src/lib/main.js --serve --port 8080
```

Or use the `PORT` environment variable:

```bash
PORT=5000 node src/lib/main.js --serve
```

## Startup Message

On successful launch, the CLI logs:
```
Listening on http://localhost:<port>
```

## Endpoints

All responses include `Content-Type: application/json` and `Access-Control-Allow-Origin: *`.

### GET /face

Query parameters:
- `count` (integer ≥1, default `1`)
- `seed` (integer ≥0)
- `category` (string)
- `facesFile` (string filepath)
- `mergeFaces` (boolean `true` or `false`)

**Success** (200):
```json
{ "faces": ["( ͡° ͜ʖ ͡°)", "(ᵔ ͜ʖᵔ)"] }
```

**Error** (400):
```json
{ "error": "<descriptive message>" }
```

### GET /list-faces

Query parameters: `category`, `facesFile`, `mergeFaces`.

**Success** (200):
```json
{ "faces": ["( ͡° ͜ʖ ͡°)", "( ಠ ͜ʖ ಠ)"] }
```

### GET /list-categories

Query parameters: `facesFile`, `mergeFaces`.

**Success** (200):
```json
{ "categories": ["happy", "angry", "sad"] }
```

### GET /diagnostics

Query parameters: `facesFile`, `mergeFaces`, `seed`.

**Success** (200): JSON object with:
- `nodeVersion`: Node.js version
- `cliVersion`: CLI version from package.json
- `builtInFacesCount`: number of built-in faces
- `categories`: sorted array of category names
- `customLoaded`: `true` if a custom file was provided
- `customFacesCount`: number of custom faces loaded
- `mergeMode`: one of `none`, `replace`, `merge`
- `seed`: provided seed or `null`
- `timestamp`: ISO timestamp

On file errors (400), the response includes an `error` field:
```json
{ "error": "Cannot read file: ..." }
```

### GET /openapi.json

Returns an OpenAPI 3.0.3 specification for the API.

**Usage Example:**
```bash
curl "http://localhost:3000/openapi.json"
```

**Success** (200): JSON object with keys:
- `openapi`: "3.0.3"
- `info`: contains `title`, `version`, `description`
- `servers`: list of server URLs
- `paths`: definitions for `/face`, `/list-faces`, `/list-categories`, `/diagnostics`, and `/openapi.json`

### All Other Routes

**404 Not Found** (404):
```json
{ "error": "Not Found" }
```
