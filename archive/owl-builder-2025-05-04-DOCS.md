docs/USAGE.md
# docs/USAGE.md
# Usage

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Commands

```bash
node src/lib/main.js [--count N] [--category CATEGORY] [--seed S] [--json] [--serve] [--port P] [--config FILE] [--unique] [--help]
```

### Options

- `--count`, `-c`: number of faces to display (default: `1`)
- `--category`, `-C`: emotion category (`happy`, `sad`, `angry`, `surprised`, `all`, or custom categories from config) (default: `all`)
- `--seed`, `-s`: nonnegative integer seed for reproducible output
- `--json`, `-j`: output JSON payload
- `--serve`, `-S`: start HTTP server mode (CORS enabled for all origins)
- `--port`, `-p`: port for HTTP server (default: `3000`)
- `--config`, `-f`: path to JSON or YAML configuration file to override or extend face categories
- `--unique`, `-u`: ensure returned faces are unique within the request; error if count exceeds pool size
- `--help`, `-h`: show this help message

### Available Categories

- `happy`
- `sad`
- `angry`
- `surprised`
- `all` (default)
- Custom categories defined via configuration files (use the `--config` flag)

### Examples

```bash
# Display a single random face
node src/lib/main.js

# Display three happy faces
node src/lib/main.js --count 3 --category happy

# Display two faces reproducibly with a seed
node src/lib/main.js --count 2 --seed 42

# Display five sad faces with a specific seed
node src/lib/main.js --count 5 --category sad --seed 100

# Display two faces in JSON format
node src/lib/main.js --count 2 --category surprised --seed 123 --json
# e.g. {"faces":["😮","(⊙_⊙)"],"category":"surprised","count":2,"seed":123}

# Display three unique faces without replacement
node src/lib/main.js --unique --count 3

# Override happy category with a custom JSON config
node src/lib/main.js --config ./tests/unit/fixtures/custom.json --category happy --count 2
# e.g. H1 H2

# Add and use a new custom category via JSON config
node src/lib/main.js --config ./tests/unit/fixtures/custom.json --category custom --count 2
# e.g. C1 C2
```

### Programmatic API

```js
import { generateFaces, listCategories } from '@xn-intenton-z2a/repository0-crucible';

// Generate faces programmatically
const result = generateFaces({ count: 3, category: 'happy', seed: 42 });
console.log(result.faces); // Array of faces

// List available categories without custom config
console.log(listCategories());
// => ['happy', 'sad', 'angry', 'surprised', 'all']

// List available categories with custom config
console.log(
  listCategories({ config: 'tests/unit/fixtures/custom.json' })
);
// => ['happy', 'sad', 'angry', 'surprised', 'custom', 'all']
```

### HTTP Server Mode

Use `--serve` or `-S` to start an HTTP server instead of printing to stdout. Use `--port` or `-p` to specify the port (default: `3000`). CORS is enabled by default for all origins.

```bash
# Start server on default port 3000
node src/lib/main.js --serve

# Start server on port 8080
node src/lib/main.js --serve --port 8080

# Query the /faces endpoint in JSON (shared OptionsSchema validated)
curl "http://localhost:8080/faces?count=2&category=sad&seed=100&unique=true"
# => {"faces":[...],"category":"sad","count":2,"seed":100}

# Invalid parameters return HTTP 400 with JSON error response
curl "http://localhost:8080/faces?count=abc"
# => {"error":"Expected number, received \"abc\""}

# Query /faces endpoint in text format
curl "http://localhost:8080/faces?count=2&format=text&unique=true"
# => 😢
# => 😮
```docs/README.md
# docs/README.md
# repository0-crucible

CLI tool that outputs random ASCII/emoticon faces as emotional feedback.

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Features

- Outputs random ASCII face expressions for emotional feedback.
- Configurable flags for count, category, and reproducible output via seed.
- Custom Face Configuration: override or extend face categories via JSON/YAML with `--config` (`-f`).
- HTTP Server Mode: using `--serve` (`-S`) starts an HTTP API server on port `3000` by default, or on a custom port via `--port` (`-p`). CORS enabled for all origins.

## Flags and Defaults

- `--count`, `-c` (integer ≥1, default: `1`): number of faces to display.
- `--category`, `-C` (`happy`, `sad`, `angry`, `surprised`, `all`; default: `all`): emotion category.
- `--seed`, `-s` (nonnegative integer): seed for reproducible output.
- `--json`, `-j`: output JSON payload.
- `--serve`, `-S`: start HTTP server mode (default: off). CORS enabled for all origins.
- `--port`, `-p` (integer ≥1, default: `3000`): port for HTTP server.
- `--config`, `-f` (string): path to JSON or YAML file to override or extend face categories.
- `--help`, `-h`: display usage information.

## Available Categories

happy, sad, angry, surprised, all (plus custom categories via `--config`)

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

4. Display two faces in JSON format:

   ```bash
   node src/lib/main.js --count 2 --category surprised --seed 123 --json
   # => {"faces":["😮","(⊙_⊙)"],"category":"surprised","count":2,"seed":123}
   ```

5. Override happy category with a custom JSON config:

   ```bash
   node src/lib/main.js --config ./tests/unit/fixtures/custom.json --category happy --count 2
   # e.g. H1 H2
   ```

6. Add and use a new custom category via JSON config:

   ```bash
   node src/lib/main.js --config ./tests/unit/fixtures/custom.json --category custom --count 2
   # e.g. C1 C2
   ```

## HTTP Server Mode

Use `--serve` (`-S`) to start an HTTP server instead of printing to stdout. Use `--port` (`-p`) to specify the port (default: `3000`). CORS is enabled by default for all origins.

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