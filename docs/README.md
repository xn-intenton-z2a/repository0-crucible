# repository0-crucible

`repository0-crucible` is a CLI application and JavaScript library that outputs random ASCII emoticons, supports deterministic seeding, JSON output, diagnostic reporting, interactive REPL sessions, and HTTP server mode with monitoring and metrics.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## CLI Features

- Default (no flags): Outputs a random emoticon in plain text.
- `--config <path>`      : Load a custom emoticon list from a JSON or YAML file (overrides the default list).
- `--diagnostics`        : Output application diagnostics as JSON and exit with code 0.
- `--list`               : List all available emoticons with zero-based indices, one per line.
- `--seed <n>`           : Provide a non-negative integer seed to deterministically select an emoticon; invalid seeds produce an error message and exit with code 1.
- `--json`               : Output results in JSON format. Can be combined with `--seed` or `--list`.
- `--count <n>`          : Output multiple emoticons per invocation; in plain mode prints n emoticons one per line, in JSON mode outputs a JSON array of n emoticon strings; can be combined with `--seed` for sequential seeded outputs.
- `--interactive`, `-i`  : Launch an interactive REPL supporting commands `random`, `seed <n>`, `list`, `json`, `help`, `exit`.
- `--help`, `-h`         : Display help message and exit with code 0.
- `--version`, `-v`      : Print application version and exit with code 0.
- `--serve`              : Start built-in HTTP server mode.
- `--port <n>`           : Specify HTTP server port (default: 3000); invalid ports produce an error message and exit with code 1.

## Usage Examples

### CLI Usage

```bash
# Print a single random emoticon
node src/lib/main.js

# List all default emoticons with indices
node src/lib/main.js --list

# Print a random emoticon as JSON
node src/lib/main.js --json

# Print a seeded emoticon in plain text
node src/lib/main.js --seed 5

# Print a seeded JSON emoticon
node src/lib/main.js --json --seed 5

# List all emoticons as a JSON array
node src/lib/main.js --json --list

# Load custom emoticon list and list them
node src/lib/main.js --config custom.json --list

# Diagnostics mode (flag)
node src/lib/main.js --diagnostics

# Diagnostics mode (environment variable)
EMOTICONS_DIAGNOSTICS=1 node src/lib/main.js

# Interactive REPL session
node src/lib/main.js --interactive
# or
node src/lib/main.js -i

# Print multiple random emoticons in plain text
node src/lib/main.js --count 3

# Print multiple random emoticons as JSON
node src/lib/main.js --json --count 2

# Print multiple seeded emoticons starting from seed 5
node src/lib/main.js --seed 5 --count 4
```

### HTTP Server Usage

Start the server and make HTTP requests to these endpoints (all responses include `Access-Control-Allow-Origin: *`):

```bash
# Start server on default port 3000
node src/lib/main.js --serve

# Start server on port 4000
node src/lib/main.js --serve --port 4000

# Random emoticon (plain text)
curl http://localhost:3000/

# List emoticons (plain text)
curl http://localhost:3000/list

# Random JSON emoticon
curl http://localhost:3000/json

# Seeded JSON emoticon (seed=2)
curl http://localhost:3000/json?seed=2

# List JSON array via path
curl http://localhost:3000/json/list

# List JSON array via query
curl http://localhost:3000/json?list

# Version endpoint
curl http://localhost:3000/version

# Health endpoint
curl http://localhost:3000/health

# Metrics endpoint
curl http://localhost:3000/metrics

# Error: Invalid seed returns 400 plain text
curl http://localhost:3000/json?seed=abc

# Error: Invalid seed returns 400 and JSON error
curl -H "Accept: application/json" http://localhost:3000/json?seed=abc

# Unknown path returns 404 (plain text)
curl http://localhost:3000/unknown

# Unknown path returns 404 and JSON error
curl -H "Accept: application/json" http://localhost:3000/unknown

# Inspect CORS header
curl -I http://localhost:3000/  # See Access-Control-Allow-Origin: *
```
