docs/ALGORITHM_SELECTION.md
# docs/ALGORITHM_SELECTION.md
# ALGORITHM_SELECTION Feature

This feature adds support for selecting the π calculation algorithm and number of worker threads via CLI flags.

## CLI Flags

- `--algorithm <machin|chudnovsky|ramanujan>`: Choose the algorithm to compute π (default: `machin`).
- `--workers <n>`: Number of worker threads for parallel computation (default: `1`). Only affects the `chudnovsky` algorithm; ignored for others.

### Error Handling

- Invalid algorithm names print `Error: Invalid algorithm '<value>'` and exit with code `1`.
- Invalid or out-of-range worker counts print
  `Error: --workers requires a positive integer ≤ <cpuCount>` and exit with code `1`.

## Usage

```bash
# Default algorithm (Machin)
node src/lib/main.js --digits 10

# Ramanujan algorithm
node src/lib/main.js --digits 200 --algorithm ramanujan

# Chudnovsky algorithm with parallel workers
node src/lib/main.js --digits 500 --algorithm chudnovsky --workers 4
```
docs/CALCULATE_PI.md
# docs/CALCULATE_PI.md
# CALCULATE_PI Feature

This feature adds a `--digits <n>` flag to the CLI tool in `src/lib/main.js`, allowing computation of π (Pi) to a specified number of decimal places.

## Usage

```bash
# Default (10 decimal places)
node src/lib/main.js
# -> 3.1415926536

# Specify digits
node src/lib/main.js --digits 5
# -> 3.14159

# Rounding behavior
node src/lib/main.js --digits 3
# -> 3.142

# Help output
node src/lib/main.js --help
``` 

## Options

- `--digits <n>`: Number of decimal places to calculate (integer, default: 10, max: 1000)
- `--help`, `-h`: Show help information

## Limits & Performance

- Maximum supported digits: 1000 (requests above this will display an error and exit with a non-zero status).
- Under the hood, uses a Machin-like formula with BigInt arithmetic and extra precision for correct rounding.
- Calculating up to 1000 digits completes in under 2 seconds on modern CI environments.
docs/SSE.md
# docs/SSE.md
# Server-Sent Events (SSE)

## Overview

This feature enables streaming π digits in real time over an SSE (Server-Sent Events) endpoint when the HTTP server mode is active.

## CLI Flags

- `--serve <port>`: Start the HTTP server on the specified port.
- `--sse`: Enable the SSE endpoint.
- `--sse-path <path>`: Set the URL path for the SSE stream (default: `/pi/sse`).
- `--sse-chunk-size <n>`: Number of characters per SSE message (default: `100`).

## Usage

Start the server with SSE streaming enabled:

```bash
node src/lib/main.js --serve 3000 --sse --sse-path /pi/sse --sse-chunk-size 50
```

The endpoint will stream events at the specified path:

```bash
curl http://localhost:3000/pi/sse?digits=100&chunkSize=20
```

## Client Example

```js
const es = new EventSource('http://localhost:3000/pi/sse?digits=100&chunkSize=20');
es.onmessage = (e) => console.log('chunk', e.data);
es.addEventListener('done', () => console.log('stream complete'));
```
