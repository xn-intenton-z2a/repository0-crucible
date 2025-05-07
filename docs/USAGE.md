# Usage

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- Random ASCII face generation (`--face`): Output a single random ASCII face.
- Batch output (`--count`, `-c`): Output multiple faces in one invocation.
- Custom faces configuration (`--config <path>`): Load additional faces from a YAML or JSON file.
- Theme selection (`--theme`, `-t`): Select a predefined face theme (`happy`, `sad`, `surprised`).
- HTTP server mode (`--serve`, `-s`) with port override (`--port`, `-p`): Serve faces over HTTP.
- HTTP output formats: JSON (default) and plain text (`Accept: text/plain` header).

## CLI Usage Examples

```bash
node src/lib/main.js --face
node src/lib/main.js --face --count 3
node src/lib/main.js --face --theme happy -c 2
node src/lib/main.js --face --config faces.yaml
```

## HTTP Server Mode

Start the HTTP server on the default port (3000):

```bash
node src/lib/main.js --serve
```

Start the HTTP server on a custom port:

```bash
node src/lib/main.js --serve --port 8080
```

### HTTP Endpoints

#### GET /face

- Default response (JSON):

  ```bash
  curl localhost:3000/face
  ```

- Batch count (JSON):

  ```bash
  curl localhost:3000/face?count=2
  ```

- Plain text response:

  ```bash
  curl -H "Accept: text/plain" localhost:3000/face
  ```

#### GET /faces

- Default response (JSON):

  ```bash
  curl localhost:3000/faces
  ```

- Exclude custom faces:

  ```bash
  curl localhost:3000/faces?includeCustom=false
  ```

- Plain text response:

  ```bash
  curl -H "Accept: text/plain" localhost:3000/faces
  ```
