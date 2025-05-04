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
- HTTP Server Mode: using `--serve` (`-S`) starts an HTTP API server on port `3000` by default, or on a custom port via `--port` (`-p`).

## Flags and Defaults

- `--count`, `-c` (integer ≥1, default: `1`): number of faces to display.
- `--category`, `-C` (`happy`, `sad`, `angry`, `surprised`, `all`; default: `all`): emotion category.
- `--seed`, `-s` (nonnegative integer): seed for reproducible output.
- `--json`, `-j`: output JSON payload.
- `--serve`, `-S`: start HTTP server mode (default: off).
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

## Programmatic API

You can use the library directly in your code:

```javascript
import { generateFaces, listCategories } from '@xn-intenton-z2a/repository0-crucible';

// Generate faces programmatically
const result = generateFaces({ count: 3, category: 'happy', seed: 42 });
console.log(result.faces); // Array of faces

// List available categories (including custom via config)
const categories = listCategories();
console.log(categories);
```

## License

Released under the Apache-2.0 License.
