# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://axios-http.com/docs/intro
Comprehensive guide for both hosted RESTful and in-process chart generation. QuickChart and Image-Charts offer URL-based rendering with theming, export formats, and rate limits. Chart.js, ChartjsNodeCanvas, and node-canvas demonstrate server-side canvas setup, Docker-compatible PNG pipelines, performance tuning, and payload optimization. Axios integration covers HTTP client usage for remote rendering, error handling, and fallback strategies. Essential for CLI (`--chart`) and Express (`/pi/chart`) PNG exports across environments. Last updated 2024; QuickChart and Image-Charts docs CC0; Chart.js, ChartjsNodeCanvas, node-canvas, and Axios MIT licensed.
## License: CC0 1.0 Universal / MIT

# Express.js & Security Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
## https://helmetjs.github.io/
Authoritative reference for building secure and performant Express 4.x applications. Covers core APIs, routing conventions, JSON and CORS middleware, IP-based rate limiting, and HTTP header protections (CSP, HSTS, X-Frame-Options) with Helmet. Guides application of best practices for endpoints like `/pi`, `/metrics`, and `/dashboard`, balancing security and performance. Last updated 2024; MIT licensed.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest
## https://github.com/sindresorhus/execa
## https://benchmarkjs.com
Integrated reference for fast unit, integration, and performance testing in Node.js. Vitest supports mocks, snapshots, and coverage reporting; SuperTest enables HTTP assertions for API endpoints; Execa drives CLI process testing; Benchmark.js facilitates micro-benchmarks with statistical analysis for runtime efficiency. Crucial for validating correctness, API flows, and benchmarking CLI/HTTP performance. Last updated 2024; MIT licensed.
## License: MIT

# Schema Validation with Zod
## https://github.com/colinhacks/zod
In-depth TypeScript-first runtime schema validation. Explains synchronous/asynchronous parsing, refinements, custom error reporting, schema composition, and passthrough modes. Vital for reliable CLI and HTTP argument validation (`ApiParamsSchema`, `CLIOptionsSchema`). Last updated 2024; MIT licensed.
## License: MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Demonstrates layered configuration: environment variables via dotenv, hierarchical discovery with cosmiconfig, and CLI parsing with minimist. Covers default overrides, aliasing, merging strategies, and error handling for both CLI and server modes. Last updated 2024; MIT licensed.
## License: MIT

# Data Serialization & Templating
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
Combined guide to YAML parsing/dumping (`load`, `safeLoad`, `dump`), custom schemas, and Embedded JavaScript Templates (EJS) for HTML report and dashboard generation. Explains YAML type definitions, security considerations, EJS syntax, partials, filters, caching, and compile-time options. Supports multi-format output and dynamic HTML assembly. Last updated 2024; MIT licensed.
## License: MIT

# Reproducible Randomness
## https://github.com/davidbau/seedrandom
Official guide to deterministic pseudorandom number generation in JavaScript. Details seeding methods, state serialization, choice of algorithms (Alea, ARC4, MT19937), and entropy management. Ensures repeatable Monte Carlo sampling (`--seed`) in CLI/HTTP for consistent results and robust tests. Last updated 2023; MIT licensed.
## License: MIT

# OpenAPI & API Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
Defines the OpenAPI 3.1 specification and interactive Swagger UI integration. Guides spec authoring, validation, client generation, and embedding via `swagger-ui-express`. Powers live docs (`/docs`) and machine-readable spec (`/openapi.json`) in the HTTP API server. Last updated 2024; CC0 / Apache-2.0 / MIT licensed.
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
Comprehensive reference for built-in Node.js modules and advanced APIs including Worker Threads, Performance Hooks, Streams, ESM module loading, and File System promises. Fundamental for CLI I/O, parallel π computations planning, performance measurement, and interactive HTTP modes. Last updated 2024; Node.js Foundation.
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
Comprehensive resources for BigInt and Decimal.js high-precision arithmetic. MDN BigInt docs describe native large-integer support; Decimal.js covers precision configuration and operations. JavaScript Algorithms details Chudnovsky, Gauss–Legendre, and Ramanujan–Sato methods with convergence analysis. Essential for implementing accurate π algorithms. Last updated 2024; CC0 / MIT licensed.
## License: CC0 / MIT

# ESLint & Code Quality
## https://eslint.org/docs/latest/user-guide/configuring
## https://github.com/google/eslint-config-google
Official ESLint configuration guide and Google preset. Details rule configuration, plugin usage, performance tuning, and automated fixes in CI pipelines. Helps maintain consistent code standards and prevent regressions. Last updated 2024; MIT licensed.
## License: MIT

# Prettier Code Formatter
## https://prettier.io/docs/en/index.html
Comprehensive reference for Prettier formatting. Covers language support, CLI usage, editor integrations, caching, and CI integration. Ensures uniform code style with pre-commit hooks and automated fixes. Last updated 2024; MIT licensed.
## License: MIT

# Atomic File Writes
## https://github.com/npm/write-file-atomic
Provides atomic file write operations for Node.js, ensuring safe updates to cache files (e.g., `.pi_cache.json`) by avoiding partial writes, handling temporary files, and robust error recovery. Essential for reliable result caching under concurrent execution. Last updated 2023; MIT licensed.
## License: MIT

# Node.js Best Practices
## https://github.com/goldbergyoni/nodebestpractices
Curated repository of high-value Node.js best practices covering performance optimization, scalability, security, error handling, testing, and code structure. Includes guidance on CPU-bound offloading (Worker Threads, child processes), event loop management, memory leaks, and production deployment patterns. Community-maintained and updated 2024; CC BY-SA 4.0 licensed.