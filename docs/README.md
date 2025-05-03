# repository0-crucible

`repository0-crucible` is a CLI application and JavaScript library that outputs random ASCII emoticons, supports deterministic seeding, JSON output, diagnostic reporting, interactive REPL sessions, HTTP server mode with monitoring and metrics, and a programmatic API.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## CLI Usage

### CLI Features

- `--config <path>`    : Load a custom emoticon list from a JSON or YAML file (errors and exits 1 on missing or invalid file).
- `--diagnostics`      : Output diagnostics as JSON and exit 0.
- `--list`             : List all available emoticons with zero-based indices, one per line.
- `--seed <n>`         : Deterministically select an emoticon by a non-negative integer seed (errors and exits 1 on invalid input).
- `--json`             : Output results in JSON format; can combine with `--seed`, `--list`, or `--count`.
- `--count <n>`        : Output multiple emoticons. In plain mode prints n emoticons (one per line); in JSON mode outputs an array of n strings; can combine with `--seed` for sequential seed-based output (errors and exits 1 on invalid input).
- `--interactive, -i`  : Launch interactive REPL supporting commands `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help, -h`         : Show help message and exit 0.
- `--version, -v`      : Show application version and exit 0.
- `--serve`            : Start built-in HTTP server mode.
- `--port <n>`         : Specify HTTP server port (default: 3000; errors and exits 1 on invalid input).

### CLI Examples

```bash
# Print a single random emoticon
node src/lib/main.js

# List default emoticons with indices
node src/lib/main.js --list

# Print a deterministic emoticon by seed
node src/lib/main.js --seed 5

# Print a random emoticon as JSON
node src/lib/main.js --json

# Print a seeded JSON emoticon
node src/lib/main.js --json --seed 5

# List all emoticons as a JSON array
node src/lib/main.js --json --list

# Print multiple random emoticons in plain text
node src/lib/main.js --count 3

# Print multiple random emoticons as a JSON array
node src/lib/main.js --json --count 2

# Print multiple seeded emoticons starting from seed 5
node src/lib/main.js --seed 5 --count 4

# Load custom emoticon list from JSON and list
node src/lib/main.js --config custom.json --list

# Diagnostics mode (flag)
node src/lib/main.js --diagnostics

# Diagnostics mode (environment variable)
EMOTICONS_DIAGNOSTICS=1 node src/lib/main.js --diagnostics

# Interactive REPL
node src/lib/main.js --interactive
# or
node src/lib/main.js -i
```

## HTTP API

All HTTP responses include the header `Access-Control-Allow-Origin: *`.

### Endpoints

- **GET /**  
  Returns a single random emoticon in plain text.  
  Content-Type: `text/plain`  
  ```bash
  curl http://localhost:3000/
  ```

- **GET /list**  
  Returns all emoticons, one per line in plain text.  
  Content-Type: `text/plain`  
  Increments `emoticon_requests_list_total`.  
  ```bash
  curl http://localhost:3000/list
  ```

- **GET /json**  
  Returns a JSON object: `{ "face": string, "mode": "random", "seed": null }`.  
  Content-Type: `application/json`  
  Increments `emoticon_requests_json_total`.  
  ```bash
  curl http://localhost:3000/json
  ```

- **GET /json?seed=<n>**  
  Returns `{ "face": string, "mode": "seeded", "seed": <n> }` for valid `<n>`.  
  Invalid `<n>` yields 400 error with JSON or plain text based on `Accept` header.  
  Increments `emoticon_requests_json_total` and `emoticon_requests_seeded_total`.  
  ```bash
  curl http://localhost:3000/json?seed=2
  curl -H "Accept: application/json" http://localhost:3000/json?seed=abc
  ```

- **GET /json?count=<n>**  
  Returns a JSON array of `<n>` random emoticons.  
  With `seed=<s>`, returns `<n>` sequential seeded emoticons starting from `<s>`.  
  Invalid inputs yield status 400.  
  Increments `emoticon_requests_json_total` and, if seeded, `emoticon_requests_seeded_total`.  
  ```bash
  curl http://localhost:3000/json?count=3
  curl http://localhost:3000/json?seed=5&count=3
  ```

- **GET /json?list** and **GET /json/list**  
  Returns a JSON array of all emoticon strings.  
  Content-Type: `application/json`  
  Increments `emoticon_requests_json_total`.  
  ```bash
  curl http://localhost:3000/json?list
  curl http://localhost:3000/json/list
  ```

- **GET /version**  
  Returns `{ "version": string }`.  
  ```bash
  curl http://localhost:3000/version
  ```

- **GET /health**  
  Returns `OK` in plain text.  
  Content-Type: `text/plain`  
  Does not increment counters.

- **GET /metrics**  
  Returns Prometheus-compatible metrics.  
  Content-Type: `text/plain; version=0.0.4`  
  ```bash
  curl http://localhost:3000/metrics
  ```

- **Any other path or non-GET request**  
  Returns 404 error in JSON or plain text based on `Accept` header and increments `emoticon_requests_errors_total`.

## Programmatic API

You can import and use the core utilities directly in your code:

```js
import {
  listFaces,
  randomFace,
  seededFace,
  emoticonJson,
} from '@xn-intenton-z2a/repository0-crucible';

console.log(listFaces());
// [":)",":-([",":D",...] ]

console.log(randomFace());
// e.g. ":D"

console.log(seededFace(3));
// Deterministic based on seed; e.g. "(¬_¬)"

console.log(
  emoticonJson({ mode: 'seeded', seed: 3 })
);
// { face: ":)", mode: "seeded", seed: 3 }
```

### Express Middleware

You can mount the Express middleware in your server:

```js
import express from 'express';
import { createEmoticonRouter } from '@xn-intenton-z2a/repository0-crucible';

const app = express();
app.use(createEmoticonRouter());
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
```