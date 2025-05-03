# @xn-intenton-z2a/repository0-crucible

`@xn-intenton-z2a/repository0-crucible` is a CLI application and JavaScript library that outputs random ASCII emoticons, supports deterministic seeding, JSON output, interactive REPL sessions, and HTTP server mode with monitoring.

## Installation

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

- Default (no flags): Outputs a random emoticon in plain text.
- `--list`             : List all available emoticons with zero-based indices.
- `--seed <n>`         : Use a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error and exit code 1.
- `--json`             : Output results in JSON format; can be combined with `--seed` or `--list`.
- `--interactive`, `-i`: Launch interactive REPL mode with commands: `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`       : Show help message and exit with code 0.
- `--version`, `-v`    : Print application version and exit with code 0.
- `--serve`            : Start HTTP server mode.
- `--port <n>`         : Specify HTTP server port (default: 3000).

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
node src/lib/main.js -i

# Version
node src/lib/main.js --version
node src/lib/main.js -v
```

## HTTP Server

```bash
# Start server (default port 3000)
node src/lib/main.js --serve

# Start server on port 4000
node src/lib/main.js --serve --port 4000
```

### Endpoints

Refer to [docs/HTTP_API.md](HTTP_API.md) for full endpoint descriptions and examples.

## Programmatic API

```js
import { listFaces, randomFace, seededFace, emoticonJson, version } from '@xn-intenton-z2a/repository0-crucible';
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.