# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
Comprehensive reference for both hosted REST-based and in-process chart generation. QuickChart and Image-Charts detail URL parameters, theming, export formats (PNG, SVG), rate limits, and watermarking. Chart.js v4 docs cover component registration and plugin architecture. ChartjsNodeCanvas and node-canvas guides walk through headless canvas setup, Docker-friendly pipelines, performance tuning, and integration into Express endpoints (e.g., `/pi/chart`). Essential for CLI (`--chart`) and HTTP (`/pi/chart`, `/dashboard`) visualizations.
## License: CC0 1.0 Universal / MIT

# Express.js & Security Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
## https://helmetjs.github.io/
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Authoritative Express 4.x API reference for building secure, high-performance REST and SSE endpoints. Covers routing, JSON parsing, CORS, global middleware ordering, IP-based rate limiting with custom handlers, HTTP header hardening (CSP, HSTS, XSS Protection) via Helmet, and Server-Sent Events best practices. Directly informs middleware setup for `/pi`, `/metrics`, `/pi/stream`, and health endpoints.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest#readme
## https://github.com/sindresorhus/execa#readme
## https://benchmarkjs.com
Practical guides for unit, integration, CLI, and performance testing in Node.js. Vitest provides fast test execution, mocking, snapshots, and coverage. SuperTest offers HTTP assertions for Express servers. Execa enables robust CLI process control and output capture. Benchmark.js supports statistically sound micro-benchmarks. Essential for validating π computations, API behaviors, streaming SSE, CLI flags, and algorithm performance.
## License: MIT

# Schema Validation with Zod
## https://github.com/colinhacks/zod#readme
## https://zod.dev/
In-depth TypeScript-first runtime schema validation and inference. Explains parsing pipelines, custom refinements, error flattening, schema composition, and metadata. Vital for secure API parameter validation (`ApiParamsSchema`), CLI options enforcement, and error response consistency.
## License: MIT

# Zod to OpenAPI Integration
## https://github.com/asteasolutions/zod-to-openapi
Library bridging Zod schemas to OpenAPI 3, enabling automatic spec and Swagger UI generation from validation definitions. Covers metadata annotations, decorators, path and response schemas, reducing duplication between code and documentation.
## License: MIT

# Configuration Management & CLI Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Detailed patterns for layered configuration: environment variables, hierarchical config discovery, and CLI argument parsing. Demonstrates variable expansion, default overrides, aliasing, merging, and error handling for both server (`--serve`) and CLI modes.
## License: MIT

# Data Serialization & Templating
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
## https://tools.ietf.org/html/rfc4180
## https://csv.js.org/parse/doc
## https://csv.js.org/stringify/doc
Comprehensive reference for YAML (`js-yaml`), templating (EJS), and CSV standards (RFC4180). Covers streaming APIs, custom delimiters, escaping strategies, performance considerations, and synchronous/asynchronous usage. Supports multi-format outputs for CSV endpoints, CLI exports, and HTML dashboards.
## License: MIT

# OpenAPI & Interactive Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
Defines OpenAPI 3.1 schema authoring, validation, and interactive UI integration. Guides spec-driven development, embedding Swagger UI, and serving machine-readable `/openapi.json`. Powers live API docs (`/docs`) and client generation.
## License: CC0 1.0 Universal / Apache-2.0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
## https://prometheus.io/docs/instrumenting/exposition_formats/
End-to-end observability patterns for Node.js services. Prom-client for Prometheus metrics, Pino for structured logging (HTTP, pretty print), and OpenTelemetry JS SDK for tracing and metrics pipelines. Details exporters (OTLP, Prometheus), registry configuration, auto-instrumentation, and exposition format specifics.
## License: MIT / Apache-2.0

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js#readme
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources on native BigInt, Decimal.js precision control, and algorithmic implementations (Chudnovsky, Gauss–Legendre, Ramanujan–Sato, Monte Carlo, Leibniz). Includes performance trade-offs, convergence analysis, and sample code.
## License: CC0 / MIT

# Code Quality & Formatting
## https://eslint.org/docs/latest/user-guide/configuring
## https://prettier.io/docs/en/index.html
Best practices for linting and formatting JavaScript/TypeScript. Covers rule configuration, plugin ecosystems, CI enforcement, editor integration, and caching strategies. Ensures consistent style and automatic code fixes.
## License: MIT

# Node.js Core APIs & Performance
## https://nodejs.org/api/
## https://nodejs.org/api/streams.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
Authoritative Node.js reference: ESM modules, Streams (Readable/Writable/Transform), Worker Threads for parallelism, Performance Hooks for high-resolution profiling. Guides error handling, backpressure, asynchronous FS, and module semantics critical for CLI, server, and compute-intensive workflows.
## License: Node.js license / CC BY 4.0

# GitHub Actions & CI/CD Workflows
## https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
## https://github.com/actions/setup-node#readme
## https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows
Official documentation for defining, optimizing, and reusing GitHub Actions. Explains triggers, job matrices, secrets, caching strategies, and `setup-node` usage. Underpins CI pipelines and integration of Intentïon’s reusable workflows (`agentic-lib`).
## License: CC BY-SA 2.5

# API Key Security & OpenAPI Schemes
## https://owasp.org/www-project-api-security/
## https://swagger.io/docs/specification/authentication/api-keys/
Guides robust API key authentication, rotation, and threat mitigation patterns from OWASP API Security Top Ten. Swagger API Key security schemes documentation covers defining header, query, or cookie-based authentication in OpenAPI. Directly informs middleware for `X-API-KEY` validation and documentation.
## License: CC BY 4.0

# Fetch API & URLSearchParams
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
Browser and Node.js fetch documentation for HTTP requests, streaming responses, and error handling. URLSearchParams guides efficient query string construction. Fundamental for dashboard client logic and server-side API consumption.
## License: CC BY-SA 2.5

# Agentic-lib Reusable Workflows
## https://github.com/xn-intenton-z2a/agentic-lib#readme
Intentïon’s library of reusable GitHub Actions workflows. Documents schedule triggers, file path mappings, permission scopes, and seeding strategies for repository initialization. Direct source, latest 2024 updates, MIT license. Empowers CI reuse and customization.
## License: MIT