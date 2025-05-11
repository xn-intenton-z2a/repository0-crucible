docs/PI_CALCULATION.md
# docs/PI_CALCULATION.md
# PI Calculation Feature

This documentation describes how to calculate π to arbitrary precision using this library's CLI or programmatic API.

## Programmatic API

Import and invoke the `calculatePi` function:

```js
import { calculatePi } from '@xn-intenton-z2a/repository0-crucible/src/lib/main.js';

(async () => {
  // Calculate π to 50 decimal places using Machin, Gauss-Legendre, or Chudnovsky algorithm
  const pi = await calculatePi(50, 'chudnovsky');
  console.log(pi.toFixed(50));
})();
```

### Parameters

- `digits` (number): Number of decimal places (integer between 1 and 1e6). Default: 100.
- `algorithm` (string): `'machin'`, `'gauss-legendre'`, or `'chudnovsky'`. Default: `'machin'`.

### Returns

A Decimal.js instance representing π with the specified precision.

## CLI Usage

Calculate π directly from the command line:

```bash
# Default: 100 decimal places, machin algorithm
node src/lib/main.js

# Specify digits and algorithm
node src/lib/main.js --digits 20 --algorithm gauss-legendre
node src/lib/main.js --digits 20 --algorithm chudnovsky
```

### Options

- `--digits <n>`: Number of decimal places (1 to 1000000). Default: 100.
- `--algorithm <machin|gauss-legendre|chudnovsky>`: Algorithm to use. Default: `machin`.
- `--help`: Show help message.

## Examples

```bash
# 5 decimal places using Machin
node src/lib/main.js --digits 5
# Output: 3.14159

# 10 decimal places, Chudnovsky algorithm
node src/lib/main.js --digits 10 --algorithm chudnovsky
# Output: 3.1415926535
```

## Error Handling

Invalid inputs result in descriptive error messages printed to stderr and a non-zero exit code. For example:

```bash
node src/lib/main.js --digits 0
# stderr: Invalid digits '0'. Must be integer between 1 and 1000000.
```docs/PI_WORKER_THREADS.md
# docs/PI_WORKER_THREADS.md
# PI Worker Threads Feature

This documentation describes the `calculatePiParallel` API and how to use the `--threads` flag in the CLI to perform π computation using Node.js worker threads.

## Programmatic API

Import and invoke the `calculatePiParallel` function:

```js
import { calculatePiParallel } from '@xn-intenton-z2a/repository0-crucible/src/lib/main.js';

(async () => {
  // Calculate π to 100 decimal places using 4 threads and the Chudnovsky algorithm
  const pi = await calculatePiParallel(100, 'chudnovsky', 4);
  console.log(pi.toFixed(100));
})();
```

### Parameters

- `digits` (number): Number of decimal places (integer between 1 and 1e6). Default: 100.
- `algorithm` (string): `'machin'`, `'gauss-legendre'`, or `'chudnovsky'`. Default: `'machin'`.
- `threads` (number): Number of worker threads to spawn (integer ≥ 1 and ≤ CPU cores). Default: 1.

### Returns

A `Promise<Decimal>` instance representing π with the specified precision.

## CLI Usage

Calculate π using multiple threads directly from the command line:

```bash
# Default: single-threaded (1 thread)
node src/lib/main.js --digits 1000 --algorithm machin

# Use 4 threads with the Chudnovsky algorithm
node src/lib/main.js --digits 1000 --algorithm chudnovsky --threads 4
```

### Options

- `--digits <n>`: Number of decimal places (1 to 1000000). Default: 100.
- `--algorithm <machin|gauss-legendre|chudnovsky>`: Algorithm to use. Default: `machin`.
- `--threads <n>`: Number of worker threads (≥1, ≤ number of CPU cores). Default: 1.
- `--help`: Show help message.
docs/HTTP_API.md
# docs/HTTP_API.md
# HTTP API Feature

This feature exposes core π operations via a RESTful HTTP API using Express.

## Starting the Server

Start the HTTP API server:

```bash
node src/lib/main.js --serve --port 3000
```

- `--serve`: start the HTTP server.
- `--port <n>`: port number to listen on (default `3000`). Use `0` to assign an ephemeral available port.

## Endpoints

### GET /pi

Compute π.

Query Parameters:

- `digits` (integer, optional): total number of π digits to return (including the integer part), minimum `1`, maximum `1e6`. Default: `101` (1 integer digit + decimal point + 100 fractional digits). For example, `digits=3` returns `"3.14"`; omitting `digits` returns 101 digits (`1` + `.` + `100` decimals).
- `algorithm` (string, optional): `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`).

Response: `200 OK`, JSON:

```json
{ "pi": "<string>" }
```

Error: `400 Bad Request`, JSON `{ "error": "<message>" }`.
