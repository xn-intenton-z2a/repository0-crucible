# Usage

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Commands

```bash
node src/lib/main.js [--count N] [--category CATEGORY] [--seed S] [--json] [--serve] [--port P] [--config FILE] [--help]
```

### Options

- `--count`, `-c`: number of faces to display (default: `1`)
- `--category`, `-C`: emotion category (`happy`, `sad`, `angry`, `surprised`, `all`, or custom categories from config) (default: `all`)
- `--seed`, `-s`: nonnegative integer seed for reproducible output
- `--json`, `-j`: output JSON payload
- `--serve`, `-S`: start HTTP server mode
- `--port`, `-p`: port for HTTP server (default: `3000`)
- `--config`, `-f`: path to JSON or YAML configuration file to override or extend face categories
- `--help`, `-h`: show this help message

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

# Override happy category with a custom JSON config
node src/lib/main.js --config ./tests/unit/fixtures/custom.json --category happy --count 2
# e.g. H1 H2

# Override sad category with a custom YAML config
node src/lib/main.js -f ./config/custom.yaml --category sad -c 3

# Add and use a new custom category via JSON config
node src/lib/main.js --config ./tests/unit/fixtures/custom.json --category custom --count 2
# e.g. C1 C2
```

### HTTP Server Mode

Use `--serve` or `-S` to start an HTTP server instead of printing to stdout. Use `--port` or `-p` to specify the port (default: `3000`).

```bash
# Start server on default port 3000
node src/lib/main.js --serve

# Start server on port 8080
node src/lib/main.js --serve --port 8080

# Query the /faces endpoint in JSON (shared OptionsSchema validated)
curl "http://localhost:8080/faces?count=2&category=sad&seed=100"
# => {"faces":[...],"category":"sad","count":2,"seed":100}

# Invalid parameters return HTTP 400 with JSON error response
curl "http://localhost:8080/faces?count=abc"
# => {"error":"Expected number, received \"abc\""}

# Query /faces endpoint in text format
curl "http://localhost:8080/faces?count=2&format=text"
# => 😢
# => 😮
```

### Unified API Surface

The CLI, HTTP endpoints, and programmatic API share a single `OptionsSchema` for consistent defaults, validation, and error handling:

- **CLI**: Flags `--count`, `--category`, `--seed`, `--json`, `--serve`, `--port`, `--config`, all validated via `OptionsSchema`.
- **HTTP**: Query parameters `count`, `category`, `seed`, `format`, `config` parsed and validated with the same schema; invalid inputs yield HTTP 400 errors.
- **Programmatic**: Functions `generateFaces(options)` and `listCategories()` follow the same schema and behavior.
