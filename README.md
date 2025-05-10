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

### HTTP API

Start the server:

```bash
node src/lib/main.js --serve --port 3000
```

Query π:

```bash
curl 'http://localhost:3000/pi?digits=5&algorithm=chudnovsky'
```
