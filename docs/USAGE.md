# PI Calculation CLI & HTTP Server Usage

This tool computes π to arbitrary precision and provides versatile output options, caching, progress indicators, benchmarking, and an HTTP server interface.

## CLI Options

  --digits <n>           Number of decimal places (1–10000). Default: 100
  --method <name>        Calculation method: `chudnovsky` (default), `gauss-legendre`, `machin`, `nilakantha`
  --format <type>        Output format: `text` (default) or `png`
  --output <path>        File path for PNG output (required when `--format=png`)
  --group-size <n>       Insert a space every _n_ digits (integer ≥1)
  --line-length <n>      Wrap the output into lines of length _n_ (integer ≥1)
  --no-cache             Disable cache lookup and persistence for this run
  --cache-file <path>    Custom path to cache file (default: `.pi_cache.json`)
  --progress             Enable CLI progress reporting
  --progress-interval <n> Emit progress updates every _n_% (1–100). Default: 5
  --benchmark            Run performance benchmarks instead of printing π
  --benchmark-runs <n>   Number of runs per method (integer ≥1). Default: 3
  --benchmark-json       Output raw JSON array of benchmark results
  --serve                Start HTTP server mode (ignores other output flags)
  --port <n>             Port for HTTP server. Default: 3000
  --help                 Show usage information

## Examples

### CLI Examples

Compute π to 200 digits using Machin’s formula:

  node src/lib/main.js --digits 200 --method machin

Render a PNG of the first 500 digits:

  node src/lib/main.js --digits 500 --format png --output pi.png

Group digits and wrap lines:

  node src/lib/main.js --digits 1000 --group-size 5 --line-length 50

Disable cache for a one-off run:

  node src/lib/main.js --digits 300 --no-cache

Enable progress reporting every 10%:

  node src/lib/main.js --digits 5000 --progress --progress-interval 10

Generate benchmark results as JSON:

  node src/lib/main.js --digits 100 --benchmark --benchmark-runs 5 --benchmark-json

Display human-readable benchmark table:

  node src/lib/main.js --digits 100 --benchmark --benchmark-runs 5

### HTTP Server Examples

Start the server on port 4000:

  node src/lib/main.js --serve --port 4000

Get π as text:

  curl "http://localhost:4000/pi?digits=100&method=chudnovsky&format=text"

Get π as PNG image:

  curl "http://localhost:4000/pi?digits=100&format=png" --output pi.png

Stream progress via SSE:

  curl "http://localhost:4000/pi/stream?digits=1000&progress"

Run a benchmark over HTTP:

  curl "http://localhost:4000/benchmark?digits=50&methods=machin,gauss-legendre&runs=3"

Retrieve the OpenAPI specification:

  curl http://localhost:4000/openapi.json

Access Swagger UI:

  open http://localhost:4000/docs

## Notes

- For PNG rendering, ensure `--output` is specified; the CLI writes a monochrome image with monospaced digits.
- The cache layer speeds up repeated runs; disable with `--no-cache` if fresh computation is needed.
- SSE endpoints (`/pi/stream`) emit `progress` and final `result` events.
