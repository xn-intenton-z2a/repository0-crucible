# Usage

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Commands

```bash
node src/lib/main.js [--count N] [--category CATEGORY] [--seed S] [--json] [--serve] [--port P] [--help]
```

### Options

- `--count`, `-c`: number of faces to display (default: `1`)
- `--category`, `-C`: emotion category (`happy`, `sad`, `angry`, `surprised`, `all`) (default: `all`)
- `--seed`, `-s`: nonnegative integer seed for reproducible output
- `--json`, `-j`: output JSON payload
- `--serve`, `-S`: start HTTP server mode
- `--port`, `-p`: port for HTTP server (default: `3000`)
- `--help`, `-h`: show this help message

### Examples

```bash
# Display a single random face
node src/lib/main.js

# Display three happy faces
node src/lib/main.js --count 3 --category happy

# Display two faces from any category with seed for reproducibility
node src/lib/main.js --count 2 --seed 42

# Display five sad faces with a specific seed
node src/lib/main.js --count 5 --category sad --seed 100

# Display two faces in JSON format
node src/lib/main.js --count 2 --category surprised --seed 123 --json
# e.g. {"faces":["😮","(⊙_⊙)"],"category":"surprised","count":2,"seed":123}

# Show help and options
node src/lib/main.js --help
```

### HTTP Server Mode

Use `--serve` or `-S` to start an HTTP server instead of printing to stdout. Use `--port` or `-p` to specify the port (default: `3000`).

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

## Library API

You can generate faces programmatically by importing the functions from the library:

```js
import { generateFaces, listCategories } from '@xn-intenton-z2a/repository0-crucible';

// Default usage
const result = generateFaces();
console.log(result.faces, result.category, result.count, result.seed);
// e.g. ['😊'] 'all' 1 null

// Custom options
const custom = generateFaces({ count: 3, category: 'happy', seed: 42 });
console.log(custom);
// e.g. { faces: ['😀','😄','😊'], category: 'happy', count: 3, seed: 42 }

// List available categories
console.log(listCategories());
// ['happy','sad','angry','surprised','all']
```
