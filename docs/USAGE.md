# Usage

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- `--face`            Display a random ASCII face
- `--count`, `-c`     Number of faces to output (default: 1)
- `--config`          Load additional faces from a YAML or JSON file
- `--theme`, `-t`     Select a predefined face theme (`happy`, `sad`, `surprised`)
- `--serve`, `-s`     Start HTTP server mode
- `--port`, `-p`      Specify server port (default: 3000)
- `--help`, `-h`      Show help message

## CLI Usage Examples

### Single face
```bash
node src/lib/main.js --face
```

### Batch faces
```bash
node src/lib/main.js --face --count 3
```

### Theme selection
```bash
node src/lib/main.js --face --theme happy -c 2
```

### Custom config
```bash
node src/lib/main.js --face --config faces.yaml
```

## HTTP Endpoints

All HTTP endpoints return JSON by default. To receive plain text, include the header `Accept: text/plain`.

### GET /face

- Default (JSON):
  ```bash
  curl localhost:3000/face
  ```
  Response: JSON string, e.g., `"(^_^)"`

- Batch count (JSON):
  ```bash
  curl localhost:3000/face?count=2
  ```
  Response: JSON array, e.g., `["^_^)>","(T_T)"]`

- Plain text:
  ```bash
  curl -H "Accept: text/plain" localhost:3000/face
  ```
  Response: plain text face, e.g., `(^_^)`

### GET /faces

- Default (JSON):
  ```bash
  curl localhost:3000/faces
  ```
  Response: JSON array of all faces

- Exclude custom faces:
  ```bash
  curl localhost:3000/faces?includeCustom=false
  ```
  Response: JSON array excluding user-supplied faces

- Plain text:
  ```bash
  curl -H "Accept: text/plain" localhost:3000/faces
  ```
  Response: newline-separated list of faces
````