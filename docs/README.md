# repository0-crucible

`repository0-crucible` is a CLI application and JavaScript library that outputs random ASCII emoticons, supports deterministic seeding, JSON output, interactive REPL sessions, and HTTP server mode with monitoring.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

- Default: Outputs a random emoticon in plain text.
- `--list` : List all available emoticons with zero-based indices.
- `--seed <n>` : Select a deterministic emoticon for any non-negative integer seed; invalid seeds produce an error.
- `--json` : Output results in JSON format (random, seeded, or list).
- `--interactive`, `-i` : Launch an interactive REPL with commands: `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h` : Show help message and exit.
- `--version`, `-v` : Print application version and exit.
- `--serve` : Start HTTP server mode.
- `--port <n>` : Specify HTTP server port (default: 3000); invalid ports produce an error.

## CLI Usage Examples

```bash
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
# or
node src/lib/main.js -i

# Help message
node src/lib/main.js --help

# Version
node src/lib/main.js --version
``` 

## HTTP Server Usage Examples

Start the server (default port 3000):

```bash
node src/lib/main.js --serve
```

Start the server on port 4000:

```bash
node src/lib/main.js --serve --port 4000
```

Example HTTP requests:

```bash
# Random emoticon
curl http://localhost:3000/

# List emoticons
curl http://localhost:3000/list

# Random JSON
curl http://localhost:3000/json

# Seeded JSON
curl http://localhost:3000/json?seed=2

# JSON list via query
curl http://localhost:3000/json?list

# JSON list via path
curl http://localhost:3000/json/list

# Version endpoint
curl http://localhost:3000/version

# Metrics endpoint
curl http://localhost:3000/metrics
```  

## Programmatic API

Import and use core utilities in your code:

```js
import { listFaces, randomFace, seededFace, emoticonJson } from '@xn-intenton-z2a/repository0-crucible';

console.log(listFaces());
// [":)",":-(",":D",...]

console.log(randomFace());
// e.g. ":-D"

console.log(seededFace(3));
// e.g. "(¬_¬)"

console.log(emoticonJson({ mode: 'seeded', seed: 3 }));
// { face: "(¬_¬)", mode: "seeded", seed: 3 }
```