# Usage

Run the CLI tool:

```bash
node src/lib/main.js [options]
```

## Options

- `--demo`: Run the interactive demo showcasing seeded generation, uniqueness without replacement, and HTTP integration.
- `--serve`: Launch the HTTP server on port 3000 (use `--port=<port>` to override).
- `--diagnostics`: Show diagnostics.
- `--build-intermediate`: Build intermediate stage.
- `--build-enhanced`: Build enhanced stage.
- `--refresh`: Refresh data.
- `--merge-persist`: Merge and persist changes.

## Demo

To start the interactive demo:

```bash
node src/lib/main.js --demo
```

Example output:

```
=== Interactive Demo ===
{"count":3,"category":"all","seed":42}
{"count":3,"category":"happy","seed":7,"unique":true}
To launch HTTP server: node src/lib/main.js --serve
curl "http://localhost:3000/faces?count=2&seed=7"
Response: {"faces":[{"id":1,"face":":)"}]}
```

Ensure the command exits with code 0.

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
{"faces":{"count":2,"seed":7,"category":"all","unique":false}}
```