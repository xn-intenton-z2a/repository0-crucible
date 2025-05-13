# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://axios-http.com/docs/intro
Comprehensive guide for both hosted RESTful and in-process chart generation. QuickChart and Image-Charts offer URL-based rendering with theming, export formats, and rate limits. Chart.js, ChartjsNodeCanvas, and node-canvas demonstrate server-side canvas setup, Docker-compatible PNG pipelines, performance tuning, and payload optimization. Axios integration covers HTTP client usage for remote rendering, error handling, and fallback strategies. Essential for both CLI (`--chart`) and Express (`/pi/chart`) PNG exports across environments.
## License: CC0 1.0 Universal / MIT

# Express.js & Security Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
## https://helmetjs.github.io/
Authoritative reference for building secure and performant Express 4.x applications. Covers core APIs, routing conventions, JSON and CORS middleware, IP-based rate limiting, and HTTP header protections (CSP, HSTS, X-Frame-Options) with Helmet. Guides best practices for endpoints like `/pi`, `/metrics`, and `/dashboard`, balancing security and performance.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest
## https://github.com/sindresorhus/execa
## https://benchmarkjs.com
Integrated reference for fast unit, integration, and performance testing in Node.js. Vitest supports mocks, snapshots, and coverage reporting; SuperTest enables HTTP assertions for API endpoints; Execa drives CLI process testing; Benchmark.js facilitates micro-benchmarks with statistical analysis. Crucial for validating correctness, API flows, and benchmarking CLI/HTTP performance.
## License: MIT

# Schema Validation with Zod
## https://github.com/colinhacks/zod
In-depth TypeScript-first runtime schema validation. Explains synchronous/asynchronous parsing, refinements, custom error reporting, schema composition, and passthrough modes. Vital for reliable CLI and HTTP argument validation (`ApiParamsSchema`, `CLIOptionsSchema`).
## License: MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Demonstrates layered configuration: environment variables via dotenv, hierarchical discovery with cosmiconfig, and CLI parsing with minimist. Covers default overrides, aliasing, merging strategies, and error handling for both CLI and server modes.
## License: MIT

# Data Serialization & Templating
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
Combined guide to YAML parsing/dumping (`load`, `safeLoad`, `dump`), custom schemas, and Embedded JavaScript Templates (EJS) for HTML report and dashboard generation. Explains YAML type definitions, security considerations, EJS syntax, partials, filters, caching, and compile-time options. Supports multi-format output and dynamic HTML assembly.
## License: MIT

# OpenAPI & API Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
Defines the OpenAPI 3.1 specification and interactive Swagger UI integration. Guides spec authoring, validation, client generation, and embedding via `swagger-ui-express`. Powers live docs (`/docs`) and machine-readable spec (`/openapi.json`) in the HTTP API server.
## License: CC0 1.0 Universal / Apache-2.0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-pretty
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
Guides Prometheus metrics (`prom-client`), structured JSON logging with Pino (`pino`, `pino-pretty`, `pino-http`), and OpenTelemetry instrumentation in Node.js/Express. Covers SDK setup, exporters (OTLP, Prometheus), tracing, metrics pipelines, and developer-friendly log formatting. Essential for end-to-end observability in both CLI and server contexts.
## License: MIT / Apache-2.0

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
In-depth MDN documentation on the SSE protocol. Explains EventSource usage, `text/event-stream` headers, reconnection logic, and event formatting. Critical for real-time `/pi/stream` endpoint and CLI streaming of convergence data.
## License: CC BY-SA 2.5

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources for BigInt and Decimal.js high-precision arithmetic. MDN BigInt docs describe native large-integer support; Decimal.js covers precision configuration and operations. JavaScript Algorithms details Chudnovsky, Gauss–Legendre, and Ramanujan–Sato methods with convergence analysis. Essential for implementing accurate π algorithms.
## License: CC0 / MIT

# Code Quality & Formatting
## https://eslint.org/docs/latest/user-guide/configuring
## https://prettier.io/docs/en/index.html
Combines ESLint and Prettier guides on rule configuration, plugin integrations, and formatting strategies. Covers editor integrations, caching, and CI pipeline enforcement. Ensures consistent code style, automated fixes, and maintainability across CLI and server code.
## License: MIT

# Client-Side Browser APIs
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
## https://developer.mozilla.org/en-US/docs/Web/API/FormData
Authoritative MDN references for Fetch, URLSearchParams, and FormData. Explains request building, parameter encoding, and multipart form handling in browsers. Vital for implementing the interactive `/dashboard` client-side script to fetch `/pi` data and update charts dynamically.
## License: CC BY-SA 2.5

# Node.js Core, Streams & ESM Modules
## https://nodejs.org/api/
## https://nodejs.dev/learn/nodejs-streams
## https://nodejs.org/api/esm.html
Comprehensive reference for built-in Node.js modules including Streams (Readable, Writable, Transform), pipeline patterns, Worker Threads, Performance Hooks, and ESM module loading. Covers asynchronous file system promises, error handling, backpressure management, and module import/export semantics. Foundational for CLI I/O, caching, parallel computations, and server bundling.
## License: Node.js license / CC BY 4.0

# Atomic File Writes & File Operations
## https://github.com/npm/write-file-atomic
Documented utilities for safe and atomic saving of files, preventing data corruption during concurrent writes. Explains both async and sync APIs, temporary file strategies, file descriptor handling, and fallback behaviors. Crucial for implementing reliable file-based cache persistence (`.pi_cache.json`) with atomic write guarantees.
## License: MIT

# GitHub Actions & Workflow Configuration
## https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
Official reference for GitHub Actions workflow syntax, events, jobs, and steps. Details reusable workflows, secrets management, environment variables, cache strategies, and matrix builds. Essential for CI/CD automation and integrating external workflows like agentic-lib in GitHub repository templates.
## License: CC BY-SA 4.0

# Node.js Performance & Profiling
## https://nodejs.org/en/docs/guides/simple-profiling/
Guide on profiling and performance tuning in Node.js. Covers the built-in inspector, CPU and heap profiling, flamegraphs, diagnosing bottlenecks, and memory leak detection. Provides actionable steps to optimize π calculation loops, server request handling, and canvas rendering by identifying hotspots and tuning V8 settings.
## License: CC BY-SA 3.0