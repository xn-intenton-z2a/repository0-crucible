# repository0-crucible

`repository0-crucible` is a JavaScript library and CLI tool for exploring and computing π (pi) to arbitrary precision. It supports multiple algorithms, worker threads, benchmarking, caching, progress bars, and an HTTP API for seamless integration.

## Installation

Install the CLI and library from npm:

```bash
npm install --save @xn-intenton-z2a/repository0-crucible
```

## Features

- **π Calculation**: compute π to arbitrary precision with `calculatePi(digits, algorithm)`.
- **Worker Threads**: parallel π computation using `calculatePiParallel(digits, algorithm, threads)`.
- **HTTP API**: start a RESTful server to compute π over HTTP.
- **Benchmarking**, **Caching**, **Visualizations**, **Progress Bars**, and more.

## CLI Usage

Usage: `node src/lib/main.js [options]`

Options:
- `--digits <n>`           Number of decimal places (1 to 1e6). Default: 100.
- `--algorithm <a>`        Algorithm: `machin`, `gauss-legendre`, or `chudnovsky`. Default: `machin`.
- `--threads <n>`          Number of worker threads (≥1, ≤ CPU cores). Default: 1.
- `--serve`                Start the HTTP API server. Default: `false`.
- `--port <n>`             Port for HTTP server (`0` for ephemeral). Default: 3000.
- `--help`                 Show help and exit.

## CLI Examples

```bash
# Compute 10 digits using Gauss-Legendre
node src/lib/main.js --digits 10 --algorithm gauss-legendre

# Multithreaded calculation (4 threads)
node src/lib/main.js --digits 1000 --algorithm chudnovsky --threads 4

# Start HTTP API on port 8080
node src/lib/main.js --serve --port 8080
```

## HTTP API

Start the server:

```bash
node src/lib/main.js --serve --port 3000
```

### GET /pi

Compute π and return as JSON.

**Query Parameters:**
- `digits` (integer ≥1 and ≤1e6; default: 1 integer digit + `.` + 100 fractional digits = 101 total characters)
- `algorithm` (string: `machin`, `gauss-legendre`, or `chudnovsky`; default: `machin`)

**Responses:**
- `200 OK`  
  ```json
  { "pi": "<string>" }
  ```
- `400 Bad Request`  
  ```json
  { "error": "Invalid digits" }
  ```  
or  
  ```json
  { "error": "Invalid algorithm" }
  ```

### HTTP API Examples

```bash
curl 'http://localhost:3000/pi?digits=5&algorithm=chudnovsky'
# { "pi":"3.14159" }

curl 'http://localhost:3000/pi?digits=0'
# 400 Bad Request with { "error": "Invalid digits" }
```