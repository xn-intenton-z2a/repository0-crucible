# π Calculator CLI and HTTP Server

`repository0-crucible` is a command-line tool and JavaScript library for computing π to arbitrary precision using multiple algorithms. It supports text and PNG outputs, caching, progress reporting, text formatting, benchmarking, and an HTTP server interface with Server-Sent Events (SSE).

## Installation

Install from npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

Or clone and install dependencies:

```bash
git clone https://github.com/xn-intenton-z2a/repository0-crucible.git
cd repository0-crucible
npm install
```

## CLI Usage

Invoke the CLI with:

```bash
node src/lib/main.js --help
```

### Key Features

#### π Calculation
Compute π digits (1–10000) with four methods:

```bash
node src/lib/main.js --digits 1000 --method machin
```

Methods: `chudnovsky` (default), `gauss-legendre`, `machin`, `nilakantha`.

#### PNG Rendering
Render the π digits into a monochrome PNG image (requires `--output`):

```bash
node src/lib/main.js --digits 500 --format png --output pi.png
```

#### Text Formatting
Group digits and wrap lines for readability:

```bash
node src/lib/main.js --digits 1000 --group-size 5 --line-length 50
```

- `--group-size <n>`: insert a space every _n_ digits
- `--line-length <n>`: wrap output into lines of length _n_

#### Caching
Enable transparent caching of results (default), disable or customize cache file:

```bash
# Disable cache lookup and persistence
dnode src/lib/main.js --digits 200 --no-cache

# Use a custom cache file
dnode src/lib/main.js --digits 200 --cache-file /tmp/pi_cache.json
```

#### Progress Reporting
Show real-time progress in CLI or stream via HTTP SSE:

```bash
# CLI progress updates every 5% (default)
node src/lib/main.js --digits 5000 --progress

# Custom interval (every 10%)
node src/lib/main.js --digits 5000 --progress --progress-interval 10
```

#### Benchmarking Mode
Measure performance of one or all methods:

```bash
# Human-readable table
node src/lib/main.js --digits 100 --benchmark --benchmark-runs 5

# Raw JSON output
node src/lib/main.js --digits 100 --benchmark --benchmark-runs 5 --benchmark-json
```

#### HTTP Server Mode
Start an HTTP server (default port 3000) to serve endpoints:

```bash
node src/lib/main.js --serve --port 8080
```

- `GET /pi?digits=100&method=chudnovsky&format=text`
- `GET /pi?digits=100&format=png`
- `GET /pi/stream?digits=100&progress` (SSE stream)
- `GET /benchmark?digits=50&methods=machin,gauss-legendre&runs=3`
- `GET /openapi.json` (OpenAPI spec)
- `GET /docs` (Swagger UI)

## Examples

```bash
# Default π output (100 digits)
npm run start

# 50-digit π as PNG
npm run start -- --digits 50 --format png --output small_pi.png

# Stream progress over HTTP SSE
curl http://localhost:3000/pi/stream?digits=1000&progress=true
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on reporting issues, submitting PRs, coding standards, testing, and documentation updates.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).