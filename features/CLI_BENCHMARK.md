# Overview

Expand the existing command‐line benchmarking feature to also provide an HTTP endpoint for on‐demand multi‐algorithm performance comparison.  Users can invoke benchmarks via CLI flags or spin up a local HTTP server to query results programmatically.

# API

Export the existing function `benchmarkPi(digits: number, runs?: number, methods?: string[]): Promise<BenchmarkResult[]>` unchanged, where `BenchmarkResult` has:

  • method: string  
  • averageTimeMs: number  
  • minTimeMs: number  
  • maxTimeMs: number  
  • runs: number

Add a new function `startBenchmarkServer(options?: { port?: number, methods?: string[] }): http.Server` that:

  • Launches an HTTP server on the given port (default 3000).  
  • Handles GET requests to `/benchmark` with query parameters `digits`, `runs`, `methods` and returns JSON BenchmarkResult[].  
  • Optionally serves an HTML summary at `/benchmark/html` if `Accept: text/html`.

# CLI Usage

  --benchmark            Run performance benchmarks instead of printing π.  
  --benchmark-runs <n>   Number of times to execute each method (default: 3).  
  --benchmark-json       Output raw JSON instead of a table.

When `--benchmark` is present, ignore `--format` and `--output`.  If `--method` is provided, benchmark only that method; otherwise all supported methods.  

# HTTP API Usage

Run the tool with `--serve [--port <n>]`:  

  node src/lib/main.js --serve --port 4000  

Endpoints:  
  GET /benchmark?digits=1000&runs=5&methods=chudnovsky,gauss-legendre  
    • Returns JSON array of BenchmarkResult objects.  
  GET /benchmark/html?digits=1000  
    • Returns an HTML table summary of default methods.

# Implementation Details

1. In `src/lib/pi.js`, reuse `benchmarkPi` as-is.  No changes required.  
2. In `src/lib/main.js`:  
   - Parse `--serve` and optional `--port`.  
   - If `--serve` is set, call `startBenchmarkServer({ port, methods })` and log the listening URL.  
   - Otherwise, preserve existing CLI benchmarking behavior under `--benchmark` flags.  
3. In `src/lib/server.js` (or within main.js):  
   - Use Node's built-in `http` module to create a server.  
   - Parse URL and query params, validate inputs, call `benchmarkPi`, and return JSON or HTML.  
   - Handle error cases with appropriate HTTP status codes.
4. No additional dependencies required; use `perf_hooks` and `http` from Node core.

# Testing

- Unit tests for `startBenchmarkServer` handling valid and invalid query parameters in `tests/unit/server.test.js`.  
- Integration test in `tests/e2e/serve.test.js`: launch the server on an ephemeral port, perform HTTP GET to `/benchmark`, assert JSON structure and status code.  
- Extend existing CLI tests in `tests/unit/main.test.js` to cover `--serve --port 0` and ensure the server starts without errors.

# Documentation

- Update `docs/USAGE.md` to document `--serve`, port flag, HTTP endpoints with examples.  
- Update `README.md` under Features to list “HTTP benchmarking API” and provide sample curl commands.  
- Add notes in `CONTRIBUTING.md` on testing HTTP endpoints and documenting JSON schemas.