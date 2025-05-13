# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://axios-http.com/docs/intro
Comprehensive guide for both hosted RESTful and in-process chart generation. QuickChart and Image-Charts offer URL-based rendering with extensive theming and export options. Chart.js, ChartjsNodeCanvas, and node-canvas cover server-side canvas setup, Docker-safe PNG pipelines, performance tuning, and payload optimization. Axios integration details HTTP client usage for fetching remote charts and fallback strategies. Critical for CLI (`--chart`) and Express (`/pi/chart`) PNG exports. Last updated 2024; QuickChart and Image-Charts docs CC0; Chart.js, ChartjsNodeCanvas, node-canvas, and Axios MIT licensed.
## License: CC0 1.0 Universal / MIT

# Express.js & Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Authoritative reference for building robust Express 4.x applications. Covers core APIs, routing, middleware patterns, CORS security, and rate-limiting strategies. Essential for implementing `/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`, and `/pi/batch` endpoints with performance and security best practices. Last updated 2024; MIT licensed.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest
## https://github.com/sindresorhus/execa
## https://benchmarkjs.com
Integrated reference for fast unit, integration, and performance testing in Node.js. Vitest offers mock support, snapshots, and coverage reporting. SuperTest provides HTTP assertions for API endpoints. Execa enables CLI process testing. Benchmark.js delivers micro-benchmark suites and statistical analysis. Crucial for validating correctness, API flows, and runtime efficiency. Last updated 2024; MIT licensed.
## License: MIT

# Schema Validation with Zod
## https://github.com/colinhacks/zod
In-depth TypeScript-first runtime schema validation. Explains synchronous/asynchronous parsing, refinements, custom error reporting, schema composition, and `.passthrough()`. Vital for reliable CLI and HTTP argument validation (`ApiParamsSchema`, `CLIOptionsSchema`). Last updated 2024; MIT licensed.
## License: MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Demonstrates layered configuration: environment variables via dotenv, YAML file parsing with js-yaml, hierarchical discovery using cosmiconfig, and CLI parsing with minimist. Covers merging strategies, default overrides, aliasing, and error handling for both CLI and server modes. Last updated 2024; MIT licensed.
## License: MIT

# Reproducible Randomness
## https://github.com/davidbau/seedrandom
Official guide to deterministic pseudorandom number generation in JavaScript. Details seeding methods, state serialization, choice of algorithms (Alea, ARC4, MT19937), and entropy management. Ensures repeatable Monte Carlo sampling (`--seed`) in CLI/HTTP for consistent results and robust tests. Last updated 2023; MIT licensed.
## License: MIT

# Templating with EJS
## https://ejs.co/#docs
Comprehensive documentation for Embedded JavaScript Templates. Covers syntax, partials, filters, caching, and compile-time options. Useful for dynamic HTML report and dashboard generation, embedding π values and convergence charts. Last updated 2024; MIT licensed.
## License: MIT

# YAML Serialization with js-yaml
## https://github.com/nodeca/js-yaml
Authoritative guide to serializing and parsing YAML in JavaScript. Explains `load`, `safeLoad`, `dump`, custom schemas, type definitions, and error handling. Critical for multi-format output support (`--format yaml`, `Accept: application/x-yaml`) in CLI and HTTP. Last updated 2024; MIT licensed.
## License: MIT

# OpenAPI & API Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
Defines OpenAPI 3.1 specification and interactive Swagger UI integration. Guides spec authoring, validation, client generation, and embedding. Powers live docs (`/docs`) and machine-readable spec (`/openapi.json`) in the HTTP API server. Last updated 2024; CC0 / Apache-2.0 / MIT licensed.
## License: CC0 1.0 Universal / Apache-2.0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-pretty
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
Guides Prometheus metrics (`prom-client`), structured JSON logging with Pino (`pino`, `pino-pretty`, `pino-http`), and OpenTelemetry instrumentation in Node.js/Express. Covers SDK setup, exporters (OTLP, Prometheus), tracing, metrics pipelines, and developer-friendly log formatting. Essential for end-to-end observability in CLI and server contexts. Last updated 2024; MIT / Apache-2.0 licensed.
## License: MIT / Apache-2.0

# Node.js Core & Advanced APIs
## https://nodejs.org/api/
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/fs.html
Comprehensive reference for built-in Node.js modules and advanced APIs including Worker Threads, Performance Hooks, Streams, and File System. Fundamental for CLI I/O, parallel π computations, performance measurement, and interactive modes. Last updated 2024; Node.js Foundation.
## License: Node.js license

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
In-depth MDN documentation on the SSE protocol. Explains EventSource usage, `text/event-stream` headers, reconnection logic, and event formatting. Critical for real-time `/pi/stream` endpoint and CLI streaming of convergence data. Last updated 2024; CC BY-SA 2.5.
## License: CC BY-SA 2.5

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources for BigInt and Decimal.js high-precision arithmetic. MDN BigInt docs describe native large-integer support; Decimal.js covers precision configuration and operations. JavaScript Algorithms details Chudnovsky, Gauss-Legendre, and Ramanujan–Sato methods with convergence analysis. Essential for implementing accurate π algorithms. Last updated 2024; CC0 / MIT licensed.
## License: CC0 / MIT

# NDJSON & JSON Lines
## https://github.com/ndjson/ndjson-spec
Official specification for newline-delimited JSON (NDJSON). Covers parsing, streaming best practices, and backpressure. Key for CLI (`--stream`) JSON-lines output and efficient SSE JSON streams. Last updated 2023; CC0 licensed.
## License: CC0 1.0 Universal

# ESLint & Code Quality
## https://eslint.org/docs/latest/user-guide/configuring
## https://github.com/google/eslint-config-google
Official ESLint configuration guide and Google preset. Details rule configuration, plugin usage, performance tuning, and automated fixes in CI. Helps maintain consistent code standards across the repository. Last updated 2024; MIT licensed.
## License: MIT

# Prettier Code Formatter
## https://prettier.io/docs/en/index.html
Comprehensive reference for Prettier formatting. Covers language support, CLI usage, editor integrations, caching, and CI integration. Ensures uniform code style with pre-commit hooks and automated fixes. Last updated 2024; MIT licensed.
## License: MIT