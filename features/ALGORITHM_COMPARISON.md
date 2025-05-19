# Algorithm Comparison Feature

## Feature Overview
Run all supported π computation algorithms sequentially for a given digit length and report side-by-side benchmark results, enabling users to choose the fastest or most efficient method at their required precision.

## Requirements

1. Add a --compare flag in the CLI. When provided with --digits <n> and --compare, automatically run all available algorithms (chudnovsky, bbp, machin) and record computation time and peak memory usage for each.
2. Extend the HTTP server with a GET /benchmark endpoint that accepts a digits query parameter and an optional compare=true parameter. When compare=true or when no algorithm is specified, compute and benchmark all supported algorithms and return combined results.
3. Validate that digits is a positive integer within the practical limit (e.g. up to 10000). On invalid input, exit the CLI with code 1 and print an error, or return HTTP 400 with a descriptive JSON error in the API.
4. Leverage existing algorithm implementations from the calculator feature, using process.hrtime for timing and process.memoryUsage for memory measurements. Do not introduce external dependencies.
5. Ensure that benchmarking overhead is minimal and does not alter algorithm results.

## Behavior

CLI:
- Running node src/lib/main.js --digits 1000 --compare outputs a formatted table:
  algorithm   | time(ms) | memory(MB)
  ------------|----------|-----------
  chudnovsky  | 12       | 25.3      
  bbp         | 15       | 27.1      
  machin      | 20       | 30.5      

HTTP:
- GET /benchmark?digits=500&compare=true returns status 200 and JSON:
  {
    "digits": 500,
    "benchmarks": {
      "chudnovsky": { "timeMs": 5, "memoryMb": 10.2 },
      "bbp":         { "timeMs": 6, "memoryMb": 11.0 },
      "machin":      { "timeMs": 8, "memoryMb": 12.5 }
    }
  }

Errors:
- Invalid digits parameter yields exit code 1 in CLI or HTTP 400 with JSON { "error": "..." }.

## Testing

- Unit tests for a new compareBenchmarks(digits) function verifying that it returns a structure with keys for each algorithm and numeric timeMs and memoryMb values.
- Integration tests invoking the CLI with --compare and asserting correct table output and exit code.
- HTTP tests for GET /benchmark endpoints with compare=true and without algorithm parameter, validating status codes and response body.

## Documentation Updates

- Update README.md to list "Compare Pi computation algorithm performance" in the Features section.
- Add CLI usage examples and sample table output in docs/USAGE.md.
