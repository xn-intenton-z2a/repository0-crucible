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

Query endpoints with `curl`:

```bash
# Compute pi
curl "http://localhost:3000/pi?digits=5&algorithm=chudnovsky"

# Benchmark pi computations
curl "http://localhost:3000/benchmark?minDigits=1&maxDigits=3&step=1&algorithm=machin"

# Get convergence image (PNG header only)
curl --output convergence.png "http://localhost:3000/convergence?digits=20&iterations=5&algorithm=machin"

# Get digit distribution image
curl --output dist.png "http://localhost:3000/distribution?digits=10&algorithm=machin"

# Search for pattern in pi
curl "http://localhost:3000/search?pattern=314&digits=10&all=true"

# Extract decimal digits
curl "http://localhost:3000/decimal?position=0&count=3"

# Export pi as text
curl "http://localhost:3000/export?digits=5&format=txt"

# Export pi as JSON
curl "http://localhost:3000/export?digits=5&format=json"

# Stream pi via SSE
curl "http://localhost:3000/pi/stream?digits=5"
```

Other CLI and API usage is documented in the `docs/` directory.
