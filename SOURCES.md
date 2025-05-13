# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://axios-http.com/docs/intro
Comprehensive guide combining hosted RESTful chart generation (QuickChart, Image-Charts) with in-process rendering via Chart.js and node-canvas. Covers chart JSON schema, URL parameter conventions, theming, canvas setup, drawing pipelines, and PNG export. Includes HTTP client integration (Axios), performance tuning, payload sizing, and fallback strategies between local and remote rendering for CLI (`--chart`) and Express endpoints (`/pi/chart`). Last updated 2024; QuickChart and Image-Charts docs are CC0; Chart.js, ChartjsNodeCanvas, node-canvas, and Axios are MIT licensed.
## CC0 1.0 Universal / MIT

# Express.js & Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Authoritative reference for Express 4.x core APIs, routing, middleware patterns, request parsing, and error handling. Covers CORS and rate-limiting modules demonstrating secure, performant REST endpoint construction and middleware chaining. Directly supports CLI-driven serve mode (`--serve`) and key routes (`/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`). Last updated 2024; MIT licensed.
## MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest
## https://github.com/sindresorhus/execa
## https://benchmarkjs.com/
## https://github.com/bestiejs/benchmark.js
Integrated reference for unit, integration, end-to-end, and performance testing in Node.js. Covers Vitest’s fast runner, mocking, snapshot and coverage features; SuperTest’s HTTP assertions; Execa’s child-process control for CLI workflows; and Benchmark.js’s statistical micro-benchmark suite. Essential for validating algorithm correctness, API behavior, and runtime performance in both CLI and server contexts. Last updated 2024; MIT licensed.
## MIT

# Zod Schema Validation
## https://github.com/colinhacks/zod
Comprehensive TypeScript-first runtime schema validation library. Details synchronous/asynchronous parsing, refinements, custom error formatting, and schema composition, crucial for robust CLI argument and HTTP query validation. Includes clear error messages, safe defaults, and hygienic `.passthrough()` semantics for extensible APIs. Last updated 2024; MIT licensed.
## MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Demonstrates layered configuration through environment variables (`.env`), YAML files, hierarchical discovery (cosmiconfig), and CLI parsing (minimist). Shows merging strategies, default overrides, aliasing, and error handling for both CLI and Express server modes to enable flexible user defaults. Last updated 2024; MIT licensed.
## MIT

# Seeded Randomness with seedrandom
## https://github.com/davidbau/seedrandom
Official guide to reproducible pseudorandom number generation in JavaScript. Covers seeding strategies, state serialization, algorithm options (Alea, ARC4, MT19937), and entropy considerations. Vital for deterministic Monte Carlo sampling (`--seed`) in CLI and HTTP modes, ensuring repeatable results and test stability. Last updated 2023; MIT licensed.
## MIT

# EJS Templating Engine
## https://ejs.co/#docs
Official documentation for Embedded JavaScript templating: syntax for includes, partials, filters, and helper functions. Explains performance optimizations (caching, compile options) and use cases for dynamic HTML report/dashboard generation embedding π values, convergence tables, and charts. Last updated 2024; MIT licensed.
## MIT

# API Specifications & Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
OpenAPI 3.1 specification and Swagger UI integration for interactive REST API docs, client-code generation, and request/response validation. Includes setup via swagger-ui-express, custom theming, and OAuth2 flows, powering live docs at `/docs` and machine-readable spec at `/openapi.json`. Last updated 2024; CC0 / Apache-2.0 / MIT.
## CC0 1.0 Universal / Apache-2.0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-pretty
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
Guides for Prometheus metrics (`prom-client`), structured logging with Pino (and `pino-pretty`), HTTP middleware integration via `pino-http`, and OpenTelemetry instrumentation for Node.js/Express. Covers SDK configuration, exporter setup (OTLP, Prometheus), tracing, metrics pipelines, request/response logging, and human-friendly log formatting. Enables end-to-end observability in both CLI and server contexts. Last updated 2024; MIT / Apache-2.0.
## MIT / Apache-2.0

# Node.js Core & Advanced APIs
## https://nodejs.org/api/
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/readline.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/path.html
Comprehensive reference for built-in Node.js modules and advanced APIs (worker threads, performance hooks, streams, REPL). Essential for CLI I/O, parallel Monte Carlo sampling, performance measurement, and interactive modes. Last updated 2024; Node.js Foundation.
## Node.js License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Detailed overview of the SSE protocol: EventSource API, HTTP headers (`text/event-stream`), reconnection, data encoding, and event formatting. Crucial for real-time `/pi/stream` endpoint and CLI JSON-lines streaming. Last updated 2024; CC BY-SA 2.5.
## CC BY-SA 2.5

# Numerical Computing & Arbitrary-Precision Arithmetic
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Authoritative resources for JavaScript `BigInt` precision, Decimal.js arbitrary-precision arithmetic, and advanced π algorithms (Chudnovsky, Gauss–Legendre, Ramanujan–Sato). Explains mathematical derivations, convergence rates, performance trade-offs, guard digits, and error management for high-precision computations. Last updated 2024; CC BY-SA 4.0 / MIT.
## CC BY-SA 4.0 / MIT

# NDJSON Specification
## https://github.com/ndjson/ndjson-spec
Defines newline-delimited JSON for streaming objects with backpressure handling. Describes formatting, parsing, and best practices for CLI (`--stream`) and SSE JSON streams. Last updated 2023; CC0 licensed.
## CC0 1.0 Universal

# ESLint Configuration
## https://eslint.org/docs/latest/user-guide/configuring
## https://github.com/google/eslint-config-google
Official guide to ESLint configuration, rule hierarchies, plugin integration, and extending style guides (Google). Covers automated fixing in CI, JSON/YAML config formats, and performance tuning. Last updated 2024; MIT licensed.
## MIT

# Prettier Code Formatter
## https://prettier.io/docs/en/index.html
Comprehensive reference for Prettier formatting: supported languages, config options (`.prettierrc`), CLI usage, editor integrations, and caching strategies. Shows pre-commit/CI integration for consistent code style enforcement. Last updated 2024; MIT licensed.
## MIT

# Dependency Management Automation
## https://github.com/raineorshine/npm-check-updates
A CLI utility for scanning and updating package.json dependencies. Explains version range filtering (major, minor, patch), interactive and CI-friendly modes, and configuration via `.ncurc`. Essential for keeping dependencies current without manual checks. Last updated 2024; maintained by raineorshine; MIT licensed.
## MIT