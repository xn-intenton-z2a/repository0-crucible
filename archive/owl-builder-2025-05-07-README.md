# repository0-crucible

A CLI tool that outputs random ASCII facial expressions as emotional feedback.

## Features

- Generate random ASCII faces (`--face` flag)
- Specify number of faces to output (`--face <count>`)
- Reproducible sequences with `--seed <seed>`
- Filter faces by category (`--category <category>`)
- List all faces in the library (`--list-faces`)
- List available categories (`--list-categories`)
- Interactive REPL mode (`--interactive`)
- Use custom face definitions from a JSON or YAML file (`--faces-file <path>`)
- Merge custom faces with built-in library (`--merge-faces`)
- Color output for faces (`--color [color]`), supported colors: black, red, green (default), yellow, blue, magenta, cyan, white
- Serve HTTP API (`--serve` flag) with endpoints for `/face`, `/list-faces`, `/list-categories`, and `/diagnostics` (default port 3000, configurable with `--port` flag or `PORT` environment variable)

## Installation

Install locally:

```bash
npm install
```

Or install globally:

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## CLI Usage

Invoke the CLI with one of the supported commands and options:

```bash
node src/lib/main.js [command] [options]
```

### Basic Face Generation

- Output one random face:
  ```bash
  node src/lib/main.js --face
  ```
- Output three random faces:
  ```bash
  node src/lib/main.js --face 3
  ```
- Reproducible output with a seed:
  ```bash
  node src/lib/main.js --face --seed 123
  ```
- Filter faces by category:
  ```bash
  node src/lib/main.js --face --category playful
  ```
- Combine count, category, and seed:
  ```bash
  node src/lib/main.js --face 2 --category playful --seed 42
  ```
- Colored output (default green):
  ```bash
  node src/lib/main.js --face --color
  ```
- Colored output with specified color:
  ```bash
  node src/lib/main.js --face 3 --color red
  ```

### Listing Faces and Categories

- List all faces in the current library:
  ```bash
  node src/lib/main.js --list-faces
  ```
- List faces filtered by category:
  ```bash
  node src/lib/main.js --list-faces --category happy
  ```
- List available categories:
  ```bash
  node src/lib/main.js --list-categories
  ```

### Interactive Mode

Start an interactive REPL session to explore available commands without restarting the CLI:

```bash
node src/lib/main.js --interactive
```

Inside the REPL, you can run commands such as:

- `face [count] [--seed <seed>] [--category <category>]`
- `list-faces [--category <category>]`
- `list-categories`
- `category <name>`
- `seed <number>`
- `custom <path> [--merge]`
- `help`
- `exit` or `quit`

### Custom Faces

Load custom face definitions from a file or merge them with built-in faces:

```bash
node src/lib/main.js --face --faces-file ./customFaces.json
node src/lib/main.js --face --faces-file ./customFaces.yaml --merge-faces
```

### HTTP API (Serve Mode)

Start the built-in HTTP server to serve JSON endpoints for face generation, listing, and diagnostics:

```bash
# Start on default port 3000
node src/lib/main.js --serve

# Specify port explicitly
node src/lib/main.js --serve --port 8080

# Or set via environment variable
PORT=5000 node src/lib/main.js --serve
```

Once running, you can query:

```bash
# Generate faces
curl "http://localhost:3000/face?count=3&seed=42"

# List all categories
curl "http://localhost:3000/list-categories"

# Retrieve diagnostics information
curl "http://localhost:3000/diagnostics"
```

For full details on the HTTP API, see [docs/HTTP_API.md](docs/HTTP_API.md).

## Library API

The package also exposes a programmatic API for face generation and listing.

```js
import { generateFaces, listFaces, listCategories } from '@xn-intenton-z2a/repository0-crucible';

// Generate 3 faces with a seed
const faces = generateFaces({ count: 3, seed: 42 });
console.log(faces);

// List all built-in faces
const allFaces = listFaces();
console.log(allFaces);

// List categories from a custom faces file
const categories = listCategories({ facesFile: './custom.json', mergeFaces: true });
console.log(categories);
```

## Repository Template

This repository was initially generated as a template to demonstrate CI/CD workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).

## Contributing

We welcome contributions! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License. See [LICENSE](./LICENSE) for details.
