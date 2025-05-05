# Usage

Run the CLI tool:

```bash
node src/lib/main.js [options]
```

## Options

- `--help`: Show help and exit.
- `--demo`: Run the interactive demo showcasing seeded generation, uniqueness without replacement, and HTTP integration.
- `--serve`: Launch the HTTP server on port 3000 (use `--port=<port>` to override).
- `--port=<port>`: Specify the port for the HTTP server (default: 3000).
- `--diagnostics`: Show diagnostics.
- `--build-intermediate`: Build intermediate stage.
- `--build-enhanced`: Build enhanced stage.
- `--refresh`: Refresh data.
- `--merge-persist`: Merge and persist changes.

## Help

To view usage instructions:

```bash
node src/lib/main.js --help
```

Example output:

```
Usage: node src/lib/main.js [options]

Options:
  --help                Show help and exit
  --demo                Run the interactive demo
  --serve               Launch the HTTP server
  --port=<port>         Specify the port for HTTP server (default: 3000)
  --diagnostics         Show diagnostics
  --build-intermediate  Build intermediate stage
  --build-enhanced      Build enhanced stage
  --refresh             Refresh data
  --merge-persist       Merge and persist changes
```

## API: generateFacesCore

Generate ASCII faces with seeded randomness, category filtering, and optional uniqueness.

### Signature

```js
/**
 * Generate ASCII faces with seeded randomness.
 * @param {Object} options
 * @param {number} options.count - Positive integer count of faces.
 * @param {number} options.seed - Seed integer for RNG.
 * @param {string} options.category - One of "all", "happy", "sad", "angry", "surprised".
 * @param {boolean} [options.unique=false] - Enforce unique faces.
 * @returns {{id:number,face:string}[]} Array of face objects.
 */
```

### Examples

```js
import { generateFacesCore } from "@xn-intenton-z2a/repository0-crucible";
const faces = generateFacesCore({ count: 3, seed: 42, category: "happy", unique: true });
console.log(faces);
// [ { id: 1, face: ":)" }, { id: 2, face: ":D" }, { id: 3, face: "(:" } ]
```

### Errors

Examples of errors thrown by invalid options:

```bash
> generateFacesCore({ count: 0, seed: 1, category: "all" });
// RangeError: count must be a positive integer

> generateFacesCore({ count: 10, seed: 1, category: "sad", unique: true });
// RangeError: unique constraint violated: requested 10 but only 5 available
``` 

## Demo

To start the interactive demo:

```bash
node src/lib/main.js --demo
```

Example output:

```
=== Interactive Demo ===
[{"id":1,"face":":)"},{"id":2,"face":"-:)"},{"id":3,"face":":D"}]
[{"id":1,"face":":)"},{"id":2,"face":":-\)"},{"id":3,"face":"(:"}]
To launch HTTP server: node src/lib/main.js --serve
curl "http://localhost:3000/faces?count=2&seed=7"
Response: {"faces":[{"id":1,"face":":)"}]}
```

## HTTP Server Mode

To start the HTTP server:

```bash
node src/lib/main.js --serve
```

Example request:

```bash
curl "http://localhost:3000/faces?count=2&seed=7"
```

Example JSON response:

```json
{"faces":[{"id":1,"face":":)"},{"id":2,"face":":D"}]}
```
