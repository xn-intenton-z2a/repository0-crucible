docs/HTTP_API.md
# docs/HTTP_API.md
# HTTP_API Feature

## Overview
Provide an HTTP server mode for the emoticon CLI that exposes endpoints for random emoticon selection, deterministic seeding, full list retrieval over HTTP, JSON count support, version reporting, and monitoring via metrics, plus an interactive web UI. This feature enables integration of the emoticon service into web-based workflows, dashboards, and monitoring systems.

**All responses include Access-Control-Allow-Origin: * by default.**

## Configuration
The HTTP server supports loading a custom emoticon list using the same mechanism as the CLI:

- CLI Flag: `--config <path>` to a JSON or YAML file.
- Environment Variable: `EMOTICONS_CONFIG` if the CLI flag is not provided.

When using a custom list, endpoints `/`, `/list`, `/json`, `/json?seed=<n>`, `/json?count=<n>`, and `/json/list` will use emoticons from the provided list:

```bash
# Start server with custom JSON config
node src/lib/main.js --serve --config fixtures/custom.json

# Start server with custom YAML config via env var
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --serve
```

## Endpoints

- **GET /**
  - Returns a single random emoticon as plain text.
  - Content-Type: `text/plain`
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /list**
  - Returns all available emoticons, one per line in plain text.
  - Content-Type: `text/plain`
  - Increments `emoticon_requests_list_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json**
  - Returns a JSON object: `{ "face": string, "mode": "random", "seed": null }`.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json?seed=<n>**
  - If `<n>` is a non-negative integer, returns `{ "face": string, "mode": "seeded", "seed": <n> }` deterministically selected.
  - If `<n>` is invalid, responds with status 400 and error message.
  - Content-Type: `application/json` (when requested via Accept header) or `text/plain`
  - Increments `emoticon_requests_json_total` and `emoticon_requests_seeded_total` metrics.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json?count=<n>**
  - If `<n>` is a non-negative integer, returns a JSON array of `<n>` emoticon strings, random by default.
  - When combined with `seed=<s>`, returns `<n>` deterministic emoticons starting from seed `<s>`, i.e., seeds `<s>`, `<s+1>`, ..., `<s+n-1>`.
  - If `<n>` or `<s>` is invalid, responds with status 400 and error message in JSON or plain text based on Accept header.
  - Increments `emoticon_requests_json_total` metric and, if seeded, `emoticon_requests_seeded_total`.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json?list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /json/list**
  - Returns a JSON array of all emoticon strings.
  - Content-Type: `application/json`
  - Increments `emoticon_requests_json_total` metric.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /version**
  - Returns the current application version.
  - Content-Type: `application/json`
  - Response body: `{ "version": string }`
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /health**
  - Returns OK for health check probing.
  - Content-Type: `text/plain`
  - Response body: `OK`
  - Does not increment any counters.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /metrics**
  - Returns a Prometheus-compatible metrics exposition of internal request counters.
  - Content-Type: `text/plain; version=0.0.4`
  - Exposes counters: `emoticon_requests_total`, `emoticon_requests_root_total`, `emoticon_requests_list_total`, `emoticon_requests_json_total`, `emoticon_requests_seeded_total`, `emoticon_requests_errors_total`.
  - **Includes header** `Access-Control-Allow-Origin: *`

- **GET /ui**
  - Serves the interactive Emoticon Browser as HTML with client-side controls for random, seeded, count, and list fetches.
  - Content-Type: `text/html; charset=utf-8`
  - **Includes header** `Access-Control-Allow-Origin: *`

- **Any other path or non-GET request**
  - Responds with status `404`.
  - If `Accept: application/json` header is present, returns `{ "error": "Not Found" }`.
  - Otherwise returns plain text `Not Found`.
  - **Includes header** `Access-Control-Allow-Origin: *`

## Express Middleware

### createEmoticonRouter(options)

Exports a factory that creates an Express Router instance exposing the same HTTP API endpoints as the built-in server, including `/ui`.

**Options**

- None currently. The router uses the same custom configuration logic and emoticon list as the CLI and HTTP server.

**Usage Example**

```js
import express from 'express';
import { createEmoticonRouter } from '@xn-intenton-z2a/repository0-crucible';

const app = express();
app.use(createEmoticonRouter());
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```docs/EMOTICON_OUTPUT.md
# docs/EMOTICON_OUTPUT.md
# EMOTICON_OUTPUT Feature

This feature provides random ASCII emoticon output for the CLI application, offering an emotional feedback mechanism.

## Installation

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## CLI Options

- `--config <path>`    : Load a custom emoticon list from a JSON or YAML file (overrides the default list).
- `--diagnostics`      : Output application diagnostics as JSON and exit.
- `--list`           : Print the last result or list all available emoticons with their zero-based index, one per line (format: `0: :)`).
- `--seed <n>`       : Use a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error and exit code 1.
- `--json`           : Output results in JSON format. Can be combined with `--seed`, `--list`, or `--count`.
- `--count <n>`      : Output multiple emoticons. In plain mode, prints n emoticons, one per line; in JSON mode, outputs a JSON array of n emoticon strings. Can be combined with `--seed` to produce sequential seeded emoticons.
- `--interactive`, `-i` : Launch interactive REPL mode supporting commands `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`     : Display help message and exit with code 0.
- `--version`, `-v`  : Print application version and exit with code 0.

### Environment Variables

- `EMOTICONS_CONFIG` : Path to a JSON or YAML file containing an array of emoticon strings; used when `--config` is not provided.
- `EMOTICONS_DIAGNOSTICS` : When set, triggers diagnostics JSON output when `--diagnostics` is not provided.

## Usage Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# Print all emoticons in order with indices
node src/lib/main.js --list

# Print the same emoticon every run with seed 5
node src/lib/main.js --seed 5

# Error on invalid seed
node src/lib/main.js --seed abc
# Error: Invalid seed: abc

# Output a single random emoticon as JSON
node src/lib/main.js --json

# Seeded JSON emoticon
node src/lib/main.js --json --seed 5

# List all emoticons as JSON array
node src/lib/main.js --json --list

# Load custom emoticon list from JSON
node src/lib/main.js --config fixtures/custom.json

# Load custom emoticon list from YAML via env var
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --list

# Print multiple random emoticons in plain text
node src/lib/main.js --count 3

# Print multiple random emoticons as JSON
node src/lib/main.js --json --count 2

# Print multiple seeded emoticons starting from seed 5
node src/lib/main.js --seed 5 --count 4
```

## Diagnostics Mode Examples

```bash
# Output diagnostics as JSON
node src/lib/main.js --diagnostics

# Using environment variable
EMOTICONS_DIAGNISTICS=1 node src/lib/main.js
```

### Diagnostics JSON Schema

```json
{
  "version": "string",
  "configSource": "string",
  "emoticonCount": number,
  "isCustomConfig": boolean,
  "colorStyle": null,
  "supportsColorLevel": number
}
```

## Custom Configuration Examples

```bash
# Load custom emoticon list from JSON and display random emoticon
node src/lib/main.js --config fixtures/custom.json

# Load custom emoticon list from JSON and output seeded JSON emoticon
node src/lib/main.js --config fixtures/custom.json --json --seed 2

# Load custom emoticon list from YAML via env var and list emoticons
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --list
```

## Interactive Mode

Inside the REPL, use:

```text
> random        # Show a random emoticon
> seed 3        # Show emoticon for seed 3
> list          # List all emoticons with indices
> json          # Output last result or list as JSON
> help          # Show help message
> exit          # Exit the session
```

## Programmatic API

You can import the core utilities directly in your code, including the new configuration functions:

```js
import { listFaces, randomFace, seededFace, emoticonJson, configureEmoticons, getEmoticonDiagnostics } from '@xn-intenton-z2a/repository0-crucible';

// List, random, seeded usage
console.log(listFaces());
console.log(randomFace());
console.log(seededFace(3));
console.log(emoticonJson({ mode: 'seeded', seed: 3 }));

// Load custom emoticon list and get diagnostics
const diagnostics = configureEmoticons({ configPath: 'path/to/custom.json' });
console.log(diagnostics);

// Retrieve current diagnostics without side-effects
console.log(getEmoticonDiagnostics());
```docs/README.md
# docs/README.md
# repository0-crucible

A CLI and Node.js library for random and seeded ASCII emoticon output, featuring a built-in HTTP/Express server with Prometheus metrics and a Web UI, plus a programmatic API.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

Import in your code:

```js
import { listFaces } from '@xn-intenton-z2a/repository0-crucible';
```

## CLI Usage

### Flags

- `--config <path>`: Load a custom emoticon list (JSON or YAML)
- `--diagnostics`: Output diagnostics as JSON
- `--list`: List all emoticons with zero-based indices
- `--seed <n>`: Deterministic emoticon by non-negative seed
- `--json`: JSON output mode
- `--count <n>`: Output multiple emoticons
- `--interactive, -i`: Launch interactive REPL
- `--help, -h`: Display help and exit
- `--version, -v`: Print version and exit
- `--serve`: Start built-in HTTP server
- `--port <n>`: Specify HTTP server port (default: 3000)

### Examples

```bash
node src/lib/main.js --help
```
Prints usage text including all flags.

```bash
node src/lib/main.js --json --seed 3 --count 2
# Example output: [":D", "(¬_¬)"]
```

## HTTP Server & Endpoints

### Starting the server

```bash
node src/lib/main.js --serve [--port <n>]
```

### Key Endpoints

- `/` → Plain-text random emoticon
  ```bash
  curl http://localhost:3000/
  ```
- `/list` → Plain-text list of all emoticons
  ```bash
  curl http://localhost:3000/list
  ```
- `/json`, `/json?seed=<n>`, `/json?count=<n>`, `/json/list` → JSON responses
  ```bash
  curl http://localhost:3000/json?seed=1&count=3
  ```
- `/version` → `{ "version": "<current>" }`
  ```bash
  curl http://localhost:3000/version
  ```
- `/metrics` → Prometheus counters
  ```bash
  curl http://localhost:3000/metrics
  ```
- `/health` → `OK`
  ```bash
  curl http://localhost:3000/health
  ```
- `/ui` → Web UI browser (HTML)
  ```bash
  curl http://localhost:3000/ui
  ```

## Programmatic API

Exported functions and middleware:

`listFaces()`, `randomFace()`, `seededFace()`, `emoticonJson()`, `configureEmoticons()`, `getEmoticonDiagnostics()`, `createEmoticonRouter()`, `graphQLHandler()`

### Example

```js
import {
  listFaces,
  randomFace,
  seededFace,
  configureEmoticons,
  getEmoticonDiagnostics
} from '@xn-intenton-z2a/repository0-crucible';

console.log(listFaces());
console.log(randomFace());
console.log(seededFace(3));

const diag = configureEmoticons({ configPath: 'custom.json' });
console.log(getEmoticonDiagnostics());
```

## Documentation Links

- [HTTP API](HTTP_API.md)
- [Emoticon Output](EMOTICON_OUTPUT.md)
- [GraphQL API](../features/GRAPHQL_API.md)

## Verification

Copy and paste the commands and code snippets above into a terminal or code file to confirm they execute without errors.
