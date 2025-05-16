# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
Comprehensive guide for both hosted RESTful and in-process chart generation on the server, as well as client-side rendering via CDN. QuickChart and Image-Charts detail URL-based chart creation with theming, export formats, rate limits, and watermarking. Chart.js, ChartjsNodeCanvas, and node-canvas demonstrate server-side canvas setup, Docker-compatible PNG pipelines, performance tuning, payload optimization, and integration into Express endpoints. For client dashboards, Chart.js via CDN patterns are outlined, including chart configuration, data binding, and responsive layouts. Essential for both CLI (`--chart`) and HTTP (`/pi/chart`, `/dashboard`) visualizations.
## License: CC0 1.0 Universal / MIT

# Express.js & Security Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
## https://helmetjs.github.io/
## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Authoritative reference for building secure and performant Express 4.x applications with real-time streaming. Covers core APIs, routing conventions, JSON and CORS middleware, IP-based rate limiting (`express-rate-limit`), HTTP header protections (CSP, HSTS, X-Frame-Options) with Helmet, standard 429 Too Many Requests responses, and Server-Sent Events (`text/event-stream` usage, reconnection, event framing) on endpoints like `/pi/stream`. Guides best practices for endpoints including `/pi`, `/metrics`, and `/dashboard`, balancing security, streaming performance, and user experience.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest
## https://github.com/sindresorhus/execa
## https://benchmarkjs.com
Integrated reference for fast unit, integration, and performance testing in Node.js. Vitest supports test isolation, mocks, snapshots, and coverage reporting. SuperTest enables HTTP assertions against Express endpoints. Execa drives CLI process testing and output capture. Benchmark.js facilitates micro-benchmarks with statistical analysis for algorithm performance. Crucial for validating correctness, API flows, CLI tooling, and benchmarking π calculation methods.
## License: MIT

# Schema Validation with Zod
## https://github.com/colinhacks/zod#readme
## https://zod.dev/
In-depth TypeScript-first runtime schema validation. Explains synchronous/asynchronous parsing, custom refinements, error reporting, schema composition, and passthrough modes. Vital for enforcing API parameters (`ApiParamsSchema`) and CLI options (`CLIOptionsSchema`), ensuring robust error responses and type safety.
## License: MIT

# Configuration Management & Argument Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Demonstrates layered configuration strategies: environment variables via dotenv, hierarchical discovery with cosmiconfig, and CLI parsing with minimist. Covers default overrides, aliasing, merging strategies, and error handling for both server and CLI modes.
## License: MIT

# Data Serialization & Templating
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
## https://tools.ietf.org/html/rfc4180
Combined guide to YAML parsing/dumping (`load`, `safeLoad`, `dump`), Embedded JavaScript Templates (EJS) for dynamic HTML, and the CSV standard (RFC 4180) for reliable CSV export. Explains YAML security considerations, EJS syntax (partials, filters, caching), and CSV formatting guidelines (escaping, line breaks, headers). Supports multi-format output for HTTP CSV endpoints, CLI exports, and dashboard templates.
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
## https://prometheus.io/docs/instrumenting/exposition_formats/
Guides Prometheus metrics (`prom-client`), structured JSON logging with Pino (`pino`, `pino-pretty`, `pino-http`), and OpenTelemetry instrumentation in Node.js/Express. Covers SDK setup, exporters (OTLP, Prometheus), tracing, metrics pipelines, exposition format details for scraping, and developer-friendly log formatting. Essential for end-to-end observability across CLI and server contexts.
## License: MIT / Apache-2.0

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources for BigInt and Decimal.js high-precision arithmetic. MDN BigInt docs describe native large-integer support. Decimal.js covers configurable precision and operations. JavaScript Algorithms details Chudnovsky, Gauss–Legendre, and Ramanujan–Sato methods with convergence analysis. Essential for implementing accurate π calculation algorithms.
## License: CC0 / MIT

# Code Quality & Formatting
## https://eslint.org/docs/latest/user-guide/configuring
## https://prettier.io/docs/en/index.html
Combines ESLint and Prettier guides on rule configuration, plugin integrations, and formatting strategies. Covers editor integrations, caching, and CI pipeline enforcement. Ensures consistent code style, automated fixes, and maintainability across CLI and server code.
## License: MIT

# Node.js Core, Streams, ESM Modules & Performance
## https://nodejs.org/api/
## https://nodejs.org/api/streams.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference for built-in Node.js modules including Streams (Readable, Writable, Transform), Worker Threads for offloading CPU-intensive tasks, ESM module loading, and Performance Hooks for profiling. Covers asynchronous file system promises, error handling, backpressure management, module import/export semantics, and performance tracing. Foundational for CLI I/O, caching, parallel computations, and server tuning.
## License: Node.js license / CC BY 4.0

# Atomic File Writes & File Operations
## https://github.com/npm/write-file-atomic
## https://github.com/moxystudio/proper-lockfile#readme
Combined utilities for safe atomic saving of files and cross-process locking to prevent data corruption during concurrent writes. Explains write-file-atomic's temporary file renaming strategy and proper-lockfile's lock acquisition, retry strategies, stale lock detection, and fallback behaviors. Crucial for reliable `.pi_cache.json` persistence with atomic guarantees.
## License: MIT

# GitHub Actions & Workflow Configuration
## https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
## https://github.com/actions/setup-node
## https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows
Official references for defining and optimizing GitHub Actions workflows. Explains YAML syntax for triggers, jobs, steps, reusable workflows, secrets management, and the setup-node action. Covers dependency caching strategies (`actions/cache`), environment variables, matrix builds, and performance tuning. Essential for CI/CD automation and integrating external workflows like agentic-lib.
## License: CC BY-SA 2.5

# API Key Authentication & Security Schemes
## https://owasp.org/www-project-api-security/
## https://swagger.io/docs/specification/authentication/api-keys/
Comprehensive best practices and technical guidance for securing HTTP APIs with API key authentication. OWASP API Security Top Ten outlines common threats and mitigation strategies including key rotation, rate limiting, and proper error handling. The Swagger guide details defining `apiKey` security schemes in OpenAPI, specifying header, query, or cookie placement, and integrating API key checks into documentation and middleware. Directly informs implementation of `X-API-KEY` validation and OpenAPI `securitySchemes`.
## License: CC BY 4.0

# CSV Formatting & Parsing
## https://csv.js.org/parse/doc
## https://csv.js.org/stringify/doc
Combined documentation for the `csv-parse` and `csv-stringify` libraries, detailing streaming and callback-based CSV parsing and generation compliant with RFC 4180. Covers performance considerations, asynchronous API patterns, Node.js stream integration, and custom delimiter/quote handling. Essential for robust CSV output in HTTP endpoints (`/pi`, `/pi/data`) and parsing any CSV inputs or logs.
## License: MIT

# Fetch API & URLSearchParams
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
Authoritative MDN documentation on the Fetch API for performing HTTP requests in browser contexts and available in Node.js via global fetch. Explains request initialization, response parsing, streaming responses, and error handling. The URLSearchParams guide demonstrates efficient query string construction for REST endpoints. Crucial for implementing the interactive dashboard’s client-side logic that fetches JSON and CSV data and updates the Chart.js visualization in real time.
## License: CC BY-SA 2.5