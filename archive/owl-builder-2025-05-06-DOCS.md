docs/ascii_face.md
# docs/ascii_face.md
# ASCII_FACE Feature

## Description

The CLI application outputs facial expressions using ASCII art in various modes.

## CLI Options

- `--face` (default)
  Print a single random ASCII face.

- `--list-faces`
  List all available faces with zero-based indices.

- `--list-names`, `-l`
  List all available face identifiers sorted alphabetically.

- `--seed <value>`, `-s <value>`
  Select a face deterministically using the provided numeric seed. An empty seed string (`""`) falls back to random selection.

- `--count <number>`, `-c <number>`
  Specify how many faces to print (must be positive integer).

- `--name <face>`, `-n <face>`
  Print the specified ASCII face by its name (case-insensitive).

- `--serve`, `-S`
  Start the HTTP API server (default port 3000).

- `--port <number>`, `-p`
  Specify a custom server port.

- `--help`, `-h`
  Show usage information and exit.

- `--diagnostics`, `-d`
  Show runtime and application diagnostics information and exit.

- `--color`, `-C`
  Enable colored output.

- `--no-color`
  Disable colored output.

- `--color-level <level>`
  Force ANSI color level (0-3).

## Usage Examples

### Default / Single Face Mode

```bash
$ repository0-crucible
<random face>
```

Example:
```
$ repository0-crucible
(╯°□°）╯
```

### List Faces Mode

```bash
$ repository0-crucible --list-faces
```

Example:
```
0: (ಠ_ಠ)
1: (╯°□°）╯
2: (¬_¬)
3: (^_^)/
```

### List Names Mode

```bash
$ repository0-crucible --list-names
```

Or with alias:
```
$ repository0-crucible -l
```

Example:
```
frown
smile
surprised
wink
```

### Seed Mode

```bash
$ repository0-crucible --seed 42
```

Or with alias:
```
$ repository0-crucible -s 42
```

Example:
```
(¬_¬)
```

Deterministic with same seed:
```
$ repository0-crucible --seed 1
(ಠ_ಠ)
$ repository0-crucible -s 1
(ಠ_ಠ)
```

Empty seed:
```
$ repository0-crucible --seed ""
<random face>
```

### Batch Mode (Multiple Faces)

```bash
$ repository0-crucible --count 3
```

Example:
```
(¬_¬)
(ಠ_ಠ)
(^_^)/
```

Combining seed and count:
```bash
$ repository0-crucible --seed 2 --count 3
```

Example:
```
(╯°□°）╯
(¬_¬)
(ಠ_ಠ)
```

### Named Mode

```bash
$ repository0-crucible --name frown
```

Or with alias:
```
$ repository0-crucible -n surprised
```

Example:
```
(ಠ_ಠ)
```

### Color Output

```bash
$ repository0-crucible --color
```

Example (colored):
```[32m(^_^)\u001b[39m
```

### Help Mode

```bash
$ repository0-crucible --help
```

Or with alias:
```
$ repository0-crucible -h
```

Displays:
```
Usage: repository0-crucible [options]
```

### Diagnostics Mode

```bash
$ repository0-crucible --diagnostics
```

Or with alias:
```
$ repository0-crucible -d
```

Example:
```
Diagnostics:
... lines ...
```docs/README_ADDITIONS.md
# docs/README_ADDITIONS.md
## HTTP Server Mode

- **HTTP Server Mode** (`--serve`, `-S`): Start the ASCII face HTTP API server with an optional `--port <number>` flag.

### Usage Examples for HTTP Server Mode

```bash
$ repository0-crucible --serve
$ repository0-crucible --serve --port 4000
```

For detailed endpoint documentation, see [HTTP API Documentation](http_api.md).docs/http_api.md
# docs/http_api.md
# HTTP_API Feature

## Description

The HTTP API mode exposes ASCII faces and metadata via RESTful endpoints for programmatic integration.

## CLI Options

- `--serve`, `-S`
  Start the HTTP server (default port 3000).
- `--port <number>`, `-p <number>`
  Specify a custom listening port for the server.

## Endpoints

- **GET /face**
  Returns a single random ASCII face as plain text.

- **GET /faces**
  Returns a JSON array of all faces formatted as `"index: face"`.

- **GET /names**
  Returns a JSON array of sorted face identifiers.

- **GET /seed/:value**
  - If `:value` is a valid number:
    - Returns deterministic face as plain text.
  - Otherwise:
    - HTTP 400 with JSON `{ "error": "Invalid seed value" }`.

- **GET /name/:face**
  - If `:face` exists (case-insensitive):
    - Returns the corresponding face as plain text.
  - Otherwise:
    - HTTP 404 with JSON `{ "error": "Face not found" }`.

- **GET /diagnostics**
  Returns a JSON object with:
  ```json
  {
    "nodeVersion": "<string>",
    "appVersion": "<string>",
    "faceCount": <number>,
    "faceNames": ["<name1>", "<name2>", ...],
    "dependencies": { "<pkg>": "<version>", ... }
  }
  ```

- **All other routes**
  HTTP 404 with JSON `{ "error": "Not Found" }`.

## Usage Examples

```bash
repository0-crucible --serve
repository0-crucible --serve --port 4000
curl http://localhost:3000/face
curl http://localhost:3000/faces
curl http://localhost:3000/names
curl http://localhost:3000/seed/42
curl http://localhost:3000/name/frown
curl http://localhost:3000/diagnostics
```docs/diagnostics.md
# docs/diagnostics.md
# Diagnostics Feature

## Description

The diagnostics mode provides essential information about the runtime, application version, configured faces, and project dependencies for troubleshooting and verification purposes.

## CLI Options

- `--diagnostics`, `-d`
  Invoke diagnostics mode. No other flags are permitted alongside.

## Output

When invoked, the CLI prints the following lines:

```
Diagnostics:
Node.js version: <version>
Application version: <version>
Face count: <number>
Face names: <name1>, <name2>, ...
Dependencies:
- <package1>@<version>
- <package2>@<version>
...
```

### Example

```bash
repository0-crucible --diagnostics
```

```
Diagnostics:
Node.js version: v20.5.0
Application version: 1.4.0
Face count: 4
Face names: frown, smile, surprised, wink
Dependencies:
- dotenv@16.5.0
- ejs@3.1.10
- js-yaml@4.1.0
- minimatch@9.0.5
- openai@4.96.2
- seedrandom@3.0.5
- zod@3.24.4
```

## Error Conditions

- Extra arguments or flags after `--diagnostics` / `-d`

  ```bash
  repository0-crucible --diagnostics extra
  ```

  Prints: `Error: unknown flag 'extra'` and exits with code 1.
