# repository0-crucible

CLI tool that outputs random ASCII/emoticon faces as emotional feedback.

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Features

- Outputs random ASCII face expressions for emotional feedback.
- Configurable flags for count, category, and reproducible output via seed.
- HTTP Server Mode: Using `--serve` (`-S`) starts an HTTP API server on port `3000` by default, or on a custom port via `--port` (`-p`).

## Flags and Defaults

- `--count`, `-c` (integer ≥1, default: `1`): number of faces to display.
- `--category`, `-C` (`happy`, `sad`, `angry`, `surprised`, `all`; default: `all`): emotion category.
- `--seed`, `-s` (nonnegative integer): seed for reproducible output.
- `--json`, `-j`: output JSON payload.
- `--serve`, `-S`: start HTTP server mode (default: off).
- `--port`, `-p` (integer ≥1, default: `3000`): port for HTTP server.
- `--help`, `-h`: display usage information.

## Available Categories

happy, sad, angry, surprised, all

## Examples

1. Display a single random face (default):

   ```bash
   node src/lib/main.js
   # e.g. 😊
   ```

2. Display three happy faces:

   ```bash
   node src/lib/main.js --count 3 --category happy
   # e.g. 😄 😊 😀
   ```

3. Display two faces reproducibly with a seed:

   ```bash
   node src/lib/main.js -c 2 -s 42
   # e.g. 😢 😮  (will be the same each run)
   ```

4. Show help:

   ```bash
   node src/lib/main.js --help
   ```

## HTTP Server Mode

Use `--serve` (`-S`) to start an HTTP server instead of printing to stdout. Use `--port` (`-p`) to specify the port (default: `3000`).

```bash
# Start server on default port 3000
node src/lib/main.js --serve

# Start server on port 8080
node src/lib/main.js --serve --port 8080

# Query the /faces endpoint in JSON
curl "http://localhost:8080/faces?count=2&category=sad&seed=100"
# => {"faces":[...],"category":"sad","count":2,"seed":100}

# Query the /health endpoint
curl "http://localhost:8080/health"
# => {"status":"OK"}

# Query /faces endpoint in plain text
curl "http://localhost:8080/faces?count=2&format=text"
# => 😢
# => 😮
```

## License

Released under the MIT License.
