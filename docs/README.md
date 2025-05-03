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
