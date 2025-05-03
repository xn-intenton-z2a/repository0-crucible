# repository0-crucible

`repository0-crucible` is a CLI application and JavaScript library that outputs random ASCII emoticons, supports deterministic seeding, JSON output, interactive REPL sessions, and HTTP server mode with monitoring.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

- Default (no flags): Outputs a random emoticon in plain text.
- `--config <path>`    : Load a custom emoticon list from a JSON or YAML file (overrides the default list).
- `--list`: List all available emoticons with zero-based indices.
- `--seed <n>`: Provide a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error and exit with code 1.
- `--json`: Output results in JSON format. Can be combined with `--seed` or `--list`.
- `--interactive`, `-i`: Launch an interactive REPL with commands: `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`: Display help message and exit with code 0.
- `--version`, `-v`: Print application version and exit with code 0.
- `--serve`: Start HTTP server mode.
- `--port <n>`: Specify HTTP server port (default: 3000); invalid ports produce an error and exit with code 1.

### Environment Variable

- `EMOTICONS_CONFIG`: Path to a JSON or YAML file containing an array of emoticon strings; used when `--config` is not provided.

## CLI Usage Examples

```bash
# Random emoticon
node src/lib/main.js

# Load custom emoticon list from JSON
node src/lib/main.js --config fixtures/custom.json

# Load custom emoticon list from YAML via env var
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --list

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
# Alias for version flag
node src/lib/main.js -v
```

## HTTP Server Usage Examples

```bash
# Start the server (default port 3000)
node src/lib/main.js --serve

# Start server on port 4000
node src/lib/main.js --serve --port 4000

# Start server with custom emoticon list from JSON
node src/lib/main.js --serve --config fixtures/custom.json

# Start server with custom emoticon list via YAML env var
EMOTICONS_CONFIG=fixtures/custom.yml node src/lib/main.js --serve

# Random emoticon (plain text)
curl http://localhost:3000/

# List emoticons (plain text)
curl http://localhost:3000/list

# Random JSON
curl http://localhost:3000/json

# Seeded JSON (seed=2)
curl http://localhost:3000/json?seed=2

# Health endpoint
curl http://localhost:3000/health

# Version endpoint
curl http://localhost:3000/version

# Metrics endpoint
curl http://localhost:3000/metrics

# List JSON array via path
curl http://localhost:3000/json/list

# List JSON array via query
curl http://localhost:3000/json?list

# Error: Invalid seed returns 400 (plain text)
curl http://localhost:3000/json?seed=abc

# Error: Invalid seed returns 400 and JSON error
curl -H "Accept: application/json" http://localhost:3000/json?seed=abc

# Non-GET request without Accept header returns 404 plain text
curl -X POST http://localhost:3000/

# Non-GET request with Accept: application/json returns 404 JSON error
curl -X DELETE -H "Accept: application/json" http://localhost:3000/unknown
```