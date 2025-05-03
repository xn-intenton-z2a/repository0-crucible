# @xn-intenton-z2a/repository0-crucible

`@xn-intenton-z2a/repository0-crucible` is a CLI application and JavaScript library that outputs random ASCII emoticons, supports deterministic seeding, JSON output, interactive REPL sessions, and HTTP server mode with monitoring endpoints.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

- **Default** (no flags): Outputs a random emoticon in plain text.
- `--list`             : List all available emoticons with zero-based indices.
- `--seed <n>`         : Provide a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error and exit with code 1.
- `--json`             : Output results in JSON format; can be combined with `--seed` or `--list`.
- `--interactive`, `-i`: Launch an interactive REPL with commands: `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`       : Show help message and exit with code 0.
- `--version`, `-v`    : Print application version and exit with code 0.
- `--serve`            : Start HTTP server mode.
- `--port <n>`         : Specify HTTP server port (default: 3000); invalid ports produce an error and exit with code 1.

## CLI Usage Examples

```bash
# Show help
node src/lib/main.js --help

# Random emoticon
node src/lib/main.js

# List emoticons
node src/lib/main.js --list

# Deterministic emoticon (seed=5)
node src/lib/main.js --seed 5

# JSON output
node src/lib/main.js --json

# Seeded JSON output
node src/lib/main.js --json --seed 5

# JSON list array
node src/lib/main.js --json --list

# Interactive REPL
node src/lib/main.js --interactive
node src/lib/main.js -i

# Version
node src/lib/main.js --version
node src/lib/main.js -v
``` 

## HTTP Server

Start the server:

```bash
# Default port 3000
node src/lib/main.js --serve

# Custom port 4000
node src/lib/main.js --serve --port 4000
```

### Endpoints

- **GET /**
  - Returns a random emoticon (plain text).
  - Content-Type: `text/plain`
- **GET /list**
  - Returns all emoticons, one per line (plain text).
  - Content-Type: `text/plain`
- **GET /json**
  - Returns a JSON object: `{ "face": string, "mode": "random", "seed": null }`.
  - Content-Type: `application/json`
- **GET /json?seed=<n>**
  - Returns `{ "face": string, "mode": "seeded", "seed": <n> }` or 400 on invalid seed.
  - Content-Type: `application/json` (when Accept header requests JSON) or `text/plain`.
- **GET /json?list** or **GET /json/list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
- **GET /version**
  - Returns the current application version: `{ "version": string }`.
  - Content-Type: `application/json`
- **GET /metrics**
  - Returns Prometheus-style metrics:
    - `emoticon_requests_total`
    - `emoticon_requests_root_total`
    - `emoticon_requests_list_total`
    - `emoticon_requests_json_total`
    - `emoticon_requests_seeded_total`
    - `emoticon_requests_errors_total`
  - Content-Type: `text/plain; version=0.0.4`
- **Any other path**
  - Responds with 404 Not Found (plain text or JSON error based on Accept header).

#### HTTP Examples

```bash
# Random plain text
curl http://localhost:3000/

# List all emoticons in plain text
curl http://localhost:3000/list

# Random JSON
curl http://localhost:3000/json

# Seeded JSON (seed=2)
curl http://localhost:3000/json?seed=2

# List JSON array via query
curl http://localhost:3000/json?list

# Version endpoint
curl http://localhost:3000/version

# Metrics endpoint
curl http://localhost:3000/metrics

# Error: Invalid seed (plain text)
curl http://localhost:3000/json?seed=abc

# Error: Invalid seed (JSON)
curl -H "Accept: application/json" http://localhost:3000/json?seed=abc

# Unknown path (plain text)
curl http://localhost:3000/unknown

# Unknown path (JSON)
curl -H "Accept: application/json" http://localhost:3000/unknown
``` 

## Programmatic API

Import and use the core utilities directly:

```js
import { listFaces, randomFace, seededFace, emoticonJson, version } from '@xn-intenton-z2a/repository0-crucible';

console.log(listFaces());
// [":)", ":-(", ":D", ...]

console.log(randomFace());
// e.g. ":D"

console.log(seededFace(3));
// e.g. "(¬_¬)"

console.log(emoticonJson({ mode: 'seeded', seed: 3 }));
// { face: "(¬_¬)", mode: "seeded", seed: 3 }

console.log(version);
// e.g. "1.2.1-0"
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.