# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://axios-http.com/docs/intro
Comprehensive guide combining hosted RESTful chart generation (QuickChart, Image-Charts) and in-process rendering with Chart.js and node-canvas. Details chart JSON schemas, URL parameter conventions, theming, canvas setup, Docker-safe rendering, and PNG export pipelines. Includes HTTP client integration (Axios), performance tuning, payload optimization, and fallback strategies between local and remote rendering for CLI (`--chart`) and Express endpoints (`/pi/chart`). Last updated 2024; QuickChart and Image-Charts docs are CC0; Chart.js, ChartjsNodeCanvas, node-canvas, and Axios are MIT licensed.
## License: CC0 1.0 Universal / MIT

# Express.js & Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Authoritative reference for building robust Express 4.x applications. Covers core APIs, routing, middleware interactions, security hardening (CORS), and rate-limiting best practices. Essential for constructing performant REST endpoints (`/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`, `/pi/batch`) and securing HTTP interfaces. Last updated 2024; MIT licensed.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest
## https://github.com/sindresorhus/execa
## https://benchmarkjs.com/
## https://github.com/bestiejs/benchmark.js
Integrated reference for comprehensive testing and performance measurement in Node.js. Covers Vitest’s fast runner, mocking, snapshot, and coverage features; SuperTest’s HTTP assertions for API endpoints; Execa’s CLI process control; and Benchmark.js’s micro-benchmark statistics. Crucial for validating correctness, integration flows, and runtime efficiency in CLI and server modes. Last updated 2024; MIT licensed.
## License: MIT

# Schema Validation with Zod
## https://github.com/colinhacks/zod
In-depth guide to TypeScript-first runtime schema validation. Details synchronous/asynchronous parsing, refinements, custom error messages, schema composition, and `.passthrough()` semantics. Critical for reliable CLI argument and HTTP query validation in dynamic APIs. Last updated 2024; MIT licensed.
## License: MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Demonstrates layered configuration patterns: environment variables (`.env`), YAML file parsing, hierarchical discovery (cosmiconfig), and CLI parsing (minimist). Illustrates merging strategies, default overrides, aliasing, and error handling for CLI and server modes. Last updated 2024; MIT licensed.
## License: MIT

# Reproducible Randomness
## https://github.com/davidbau/seedrandom
Official guide for deterministic pseudorandom number generation in JavaScript. Covers seeding methods, state serialization, algorithm choices (Alea, ARC4, MT19937), and entropy management. Vital for repeatable Monte Carlo sampling (`--seed`) in CLI and HTTP contexts to ensure consistent results and reliable tests. Last updated 2023; MIT licensed.
## License: MIT

# Templating with EJS
## https://ejs.co/#docs
Comprehensive documentation for Embedded JavaScript Templates. Covers template syntax, partials, filters, and performance optimizations (caching, compile options). Useful for dynamic HTML report and dashboard generation, embedding π values, convergence data, and charts. Last updated 2024; MIT licensed.
## License: MIT

# OpenAPI & API Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
Defines the OpenAPI 3.1 specification and integration patterns for interactive Swagger UI. Includes spec authoring, request/response validation, client code generation, and embedding flows. Powers live docs (`/docs`) and machine-readable spec (`/openapi.json`) in the HTTP API server. Last updated 2024; CC0 / Apache-2.0 / MIT.
## License: CC0 1.0 Universal / Apache-2.0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-pretty
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
Guides for Prometheus metrics (`prom-client`), structured logging with Pino (`pino`, `pino-pretty`, `pino-http`), and OpenTelemetry instrumentation in Node.js/Express. Covers SDK setup, exporter configuration (OTLP, Prometheus), tracing, metrics pipelines, and human-readable log formatting. Essential for end-to-end observability in CLI and server environments. Last updated 2024; MIT / Apache-2.0 licensed.
## License: MIT / Apache-2.0

# Node.js Core & Advanced APIs
## https://nodejs.org/api/
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/fs.html
Comprehensive reference for built-in Node.js modules and advanced APIs including worker threads, performance hooks, and streams. Fundamental for CLI I/O, parallel Pi computations, performance measurement, and interactive modes. Last updated 2024; Node.js Foundation.
## License: Node.js license

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Detailed MDN guide on the SSE protocol, covering EventSource usage, HTTP headers (`text/event-stream`), reconnection logic, and event formatting. Critical for real-time `/pi/stream` endpoint and CLI streaming. Last updated 2024; CC BY-SA 2.5.
## License: CC BY-SA 2.5

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources for arbitrary-precision arithmetic and Pi algorithm implementations. MDN BigInt docs explain native large-integer support; Decimal.js guides high-precision decimal computations and configuration. The JavaScript Algorithms project details implementations of Chudnovsky, Gauss-Legendre, and Ramanujan–Sato series with convergence analysis. Essential for high-precision π methods and performance considerations. Last updated 2024; MDN (CC0), Decimal.js (MIT), JavaScript Algorithms (MIT).
## License: CC0 / MIT

# NDJSON & JSON Lines
## https://github.com/ndjson/ndjson-spec
Official specification for newline-delimited JSON (NDJSON), covering parsing, streaming best practices, and backpressure handling. Key for implementing CLI (`--stream`) JSON-lines output and efficient SSE JSON streams. Last updated 2023; CC0 licensed.
## License: CC0 1.0 Universal

# ESLint & Code Quality
## https://eslint.org/docs/latest/user-guide/configuring
## https://github.com/google/eslint-config-google
Official ESLint configuration guide and Google style preset. Details rule configuration, plugin integration, performance tuning, and automated fixes in CI. Helps enforce consistent code standards across the repository. Last updated 2024; MIT licensed.
## License: MIT

# Prettier Code Formatter
## https://prettier.io/docs/en/index.html
Comprehensive reference for Prettier formatting across languages, CLI usage, editor integrations, and caching strategies. Shows pre-commit and CI integration for consistent code style enforcement. Last updated 2024; MIT licensed.
## License: MIT

# Dependency Management Automation
## https://github.com/raineorshine/npm-check-updates
CLI utility for automated scanning and upgrading of `package.json` dependencies. Explains version range filtering, interactive mode, and CI-friendly automation via `.ncurc`. Essential for maintaining up-to-date dependencies with minimal manual effort. Last updated 2024; MIT licensed.
## License: MIT