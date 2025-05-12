# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://axios-http.com/docs/intro
Comprehensive guide combining external RESTful chart generation services (QuickChart.io, Image-Charts) with on-server rendering through Chart.js and node-canvas. Covers JSON schema for chart definitions, URL-based parameter conventions, theming, HTTP endpoints, Canvas context setup, drawing pipelines, PNG export, and HTTP client patterns (Axios) for remote chart fetch. Includes practical examples for CLI `--chart` and Express `/pi/chart` modes, optimizing image size, performance, and fallback strategies between local and external rendering. Last updated 2024; QuickChart and Image-Charts docs are CC0 1.0; Chart.js, ChartjsNodeCanvas, node-canvas, and Axios are MIT licensed.
## CC0 1.0 Universal / MIT

# Express.js & Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Authoritative reference for Express 4.x core APIs, routing, middleware patterns, request parsing, and error handling, augmented with CORS and rate-limiting middleware. Provides best practices for secure, performant REST endpoints and integration with CLI-driven HTTP servers (`--serve`) and `/pi`, `/pi/data`, `/pi/chart`, and `/pi/stream` routes. Includes configuration examples, middleware chaining, and production deployment considerations. Last updated 2024; maintained by the Express.js team.
## MIT

# Testing Tools: Vitest & SuperTest
## https://vitest.dev/
## https://github.com/visionmedia/supertest
Detailed guides for modern testing in Node.js: Vitest’s fast test runner, mocking, snapshot testing, and performance metrics, alongside SuperTest’s HTTP assertion utilities for Express endpoints. Essential for unit, integration, end-to-end, and CLI behavior tests, including streaming and chart modes. Includes configuration tips, parallel execution, and coverage integration. Last updated 2024; widely adopted in the Node.js ecosystem.
## MIT

# Zod Schema Validation
## https://github.com/colinhacks/zod
Comprehensive TypeScript-first schema validation library for both CLI arguments and HTTP query parameters. Covers synchronous/asynchronous parsing, refinements, custom error formatting, and schema composition. Crucial for enforcing robust input validation with clear error messages and safe defaults in both CLI and Express modes. Last updated 2024.
## MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Combine environment variable loading (`.env`), YAML parsing, hierarchical discovery/merging via cosmiconfig, and basic CLI argument parsing with minimist. Demonstrates layered overrides of CLI flags, environment variables, and file-based defaults, along with aliasing and error handling. Includes examples for config-first defaults merged before validation. Last updated 2024.
## MIT

# Seeded Randomness with seedrandom
## https://github.com/davidbau/seedrandom
Official documentation for reproducible pseudorandom generators in JavaScript, including seeding strategies, state serialization, and algorithm selection (Alea, ARC4, MT19937). Vital for deterministic Monte Carlo sampling (`--seed`) in CLI and HTTP API modes, ensuring consistent results across runs and tests. Last updated 2023.
## MIT

# EJS Templating Engine
## https://ejs.co/#docs
Official guide to Embedded JavaScript templating: syntax for includes, partials, filters, and helper functions. Enables dynamic HTML report and dashboard generation embedding π values, convergence tables, and charts, with performance tips for large templates and caching strategies in web UI dashboards. Last updated 2024.
## MIT

# API Specifications & Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
OpenAPI 3.1.0 specification for defining RESTful schemas with precise typing and parameter definitions, plus Swagger UI for interactive API documentation and client code generation. Includes middleware setup for hosting Swagger UI via swagger-ui-express, enabling live docs at `/docs` with custom themes and OAuth2 flows. Essential for standardizing `/pi`, `/pi/data`, `/pi/chart`, and `/pi/stream` endpoints and validating request/response contracts. Last updated 2024.
## CC0 1.0 Universal / Apache-2.0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-pretty
## https://opentelemetry.io/docs/js/
Guides for instrumenting Node.js applications with Prometheus metrics (`prom-client` counters, gauges, histograms), structured logging via `pino` plus human-friendly output with `pino-pretty`, and OpenTelemetry auto-instrumentation for HTTP/Express. Covers SDK configuration, exporter setups (OTLP, Prometheus), tracing, and metrics pipelines. Enables comprehensive runtime diagnostics and end-to-end observability for both CLI and server modes. Last updated 2024; MIT / Apache-2.0 licenses.
## MIT / Apache-2.0

# CLI Progress Indicators with cli-progress
## https://www.npmjs.com/package/cli-progress
## https://github.com/AndiDittrich/Node.CLI-Progress
Documentation for `cli-progress`, covering multi-bar support, custom renderers, dynamic updates, and performance considerations for long-running tasks like iterative π computation and parallel Monte Carlo sampling (`--workers`). Enhances user feedback with live progress bars and ETA displays. Last updated 2024.
## MIT

# Node.js Core & Advanced APIs
## https://nodejs.org/api/
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/readline.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/path.html
Comprehensive coverage of Node.js built-in modules and advanced APIs, including filesystem operations, path utilities, streams, `worker_threads` for parallelism, `perf_hooks` for high-resolution timing, and `readline` for interactive REPL. Critical for CLI I/O, parallel Monte Carlo sampling, REPL mode, and performance measurement. Last updated 2024; maintained by the Node.js core team.
## Node.js License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Detailed overview of Server-Sent Events (SSE) protocol including EventSource API, HTTP headers (`Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`), reconnection behavior, data encoding, and event formatting. Essential for implementing real-time streaming convergence endpoint (`/pi/stream`) and CLI JSON lines output. Last updated 2024; MDN content licensed under CC BY-SA 2.5.
## CC BY-SA 2.5

# Numerical Computing & Arbitrary-Precision Arithmetic
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
## https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
Authoritative references for JavaScript `BigInt` precision handling and advanced π calculation algorithms (Chudnovsky, Ramanujan–Sato, Gauss–Legendre) combined with Decimal.js arbitrary-precision decimal arithmetic. Covers mathematical derivations, convergence rates, guard digits, performance trade-offs, and safe error thresholds. Crucial for implementing high-precision series and iterative methods beyond native limits. Last updated 2024; Wikipedia content under CC BY-SA 4.0 and Decimal.js is MIT licensed.
## CC BY-SA 4.0 / MIT

# NDJSON Specification
## https://github.com/ndjson/ndjson-spec
The NDJSON (newline-delimited JSON) specification defines a simple format for streaming JSON objects as text lines. It provides guidance on formatting, parsing, and handling backpressure for CLI `--stream` output and SSE JSON streams. Last updated 2023; spec licensed under CC0 1.0 Universal.
## CC0 1.0 Universal

# Execa for CLI Process Execution
## https://github.com/sindresorhus/execa
Promise-based process execution and control library for Node.js, offering comprehensive APIs to run child processes with easy stdout/stderr capture, exit code handling, custom stdio, and timeouts. Ideal for writing robust end-to-end CLI tests (`test:e2e`), automating executions, and validating outputs under various scenarios. Last updated 2024; MIT licensed.
## MIT

# Benchmark.js for Precise Benchmarks
## https://benchmarkjs.com/
## https://github.com/bestiejs/benchmark.js
High-resolution microbenchmarking suite for JavaScript, providing statistically robust measurements, sample filtering, and performance analysis beyond simple `Date.now()` timings. Supports Node.js and browser environments, facilitating accurate benchmarking of π calculation algorithms under varied conditions. Last updated 2024; MIT licensed.
## MIT