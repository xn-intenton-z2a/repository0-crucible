# DIAGNOSTICS Feature

## Overview
Capture detailed runtime diagnostics for pi computations, benchmarking, chart generation, and HTTP operations. Provide insights into execution time, memory usage, and event-loop utilization to help users and developers analyze performance characteristics of the tool.

## Functional Requirements
- Integrate Node.js perf_hooks and process APIs to measure key metrics:
  - Record high-resolution start and end times for parsing inputs, core computation, and output phases.
  - Capture memoryUsage metrics (heapUsed, heapTotal, rss) before and after main operations.
  - Use performance.eventLoopUtilization() to collect event-loop idle and active durations.
- Wrap library functions (calculatePi, benchmarkPi, visualizePiDigits, startHttpServer) when diagnostics is enabled:
  - Begin diagnostics before the core action and stop after completion or error.
  - Aggregate timing and memory metrics into a diagnostics report object.
- Format the diagnostics report as JSON and output it to stderr after the primary CLI output or HTTP response.

## CLI Interface
- Add a `--diagnostics` boolean flag to src/lib/main.js CLI router (zod schema).
- When `--diagnostics` is present:
  - Enable diagnostics collection for the invoked command path.
  - After the command completes, print a JSON diagnostics report to stderr containing:
    - totalTimeMs
    - parseTimeMs
    - computeTimeMs
    - outputTimeMs
    - memoryBefore and memoryAfter (heapUsed, heapTotal, rss)
    - eventLoopUtilization
- Example invocation:
  node src/lib/main.js --digits 1000 --algorithm chudnovsky --diagnostics

## Testing
- Unit tests in tests/unit/main.test.js:
  - Mock `perf_hooks.performance` and `process.memoryUsage` to simulate metrics.
  - Verify that `--diagnostics` triggers a JSON report on stderr with the expected fields.
  - Confirm no diagnostics output when the flag is absent.
- CLI integration tests:
  - Invoke the CLI with `--diagnostics` and sample flags, assert stderr JSON validity and presence of metric keys.

## Dependencies
- Use built-in Node.js modules (`perf_hooks`, `process`). No new external dependencies required.