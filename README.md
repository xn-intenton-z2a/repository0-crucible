# repository0-crucible

`repository0-crucible` is a JavaScript library and CLI tool for exploring and computing π (pi) to arbitrary precision. It supports multiple algorithms, caching, benchmarking, live progress bars, and an HTTP API for seamless integration.

## Installation

Install from npm:
```bash
npm install @xn-intenton-z2a/repository0-crucible decimal.js cli-progress quickchart-js express
```

## Features

- **π Calculation**: `calculatePi(digits, algorithm)`
  - `digits` (positive integer, default `100`)
  - `algorithm`: `machin`, `gauss-legendre`, or `chudnovsky`
- **Worker Threads**: `calculatePiParallel(digits, algorithm, threads)`
  - `threads`: number of worker threads (default `1`)
- **HTTP API**: start a RESTful API server to compute π and query results over HTTP

### CLI Usage

Flags:
- `--digits <n>`: integer ≥1 and ≤1e6; default: 100
- `--algorithm <machin|gauss-legendre|chudnovsky>`: default: machin
- `--threads <n>`: integer ≥1 and ≤ number of CPU cores; default: 1
- `--serve`: start the HTTP API server; default: false
- `--port <n>`: HTTP server port; default: 3000; use 0 for ephemeral port
- `--help`: show help and exit

### CLI Examples

```bash
# Compute 10 digits using Gauss-Legendre
node src/lib/main.js --digits 10 --algorithm gauss-legendre

# Multithreaded calculation (4 threads)
node src/lib/main.js --digits 1000 --algorithm chudnovsky --threads 4

# Start HTTP API on port 8080
node src/lib/main.js --serve --port 8080
```

### HTTP API

#### GET /pi

Compute π and return as JSON.

**Query Parameters:**

- `digits` (integer ≥1 and ≤1e6; default: 101 total characters — 1 integer digit + decimal point + 100 fractional digits)
- `algorithm` (string — `machin`, `gauss-legendre`, or `chudnovsky`; default: `machin`)

**Responses:**

- `200 OK`: 
```json
{ "pi": "<string>" }
```
- `400 Bad Request`: 
```json
{ "error": "Invalid digits" }
```
or
```json
{ "error": "Invalid algorithm" }
```

**Examples:**

```bash
curl 'http://localhost:3000/pi?digits=5&algorithm=chudnovsky'
# { "pi":"3.14159" }

curl 'http://localhost:3000/pi?digits=0'
# 400 Bad Request with { "error": "Invalid digits" }
```