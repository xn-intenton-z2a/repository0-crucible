# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
Comprehensive reference for both hosted REST-based and in-process chart generation. QuickChart and Image-Charts detail URL parameters, theming, export formats (PNG, SVG), rate limits, and watermarking. Chart.js v4 docs cover component registration and plugin architecture. ChartjsNodeCanvas and node-canvas guides walk through headless canvas setup, Docker-friendly pipelines, performance tuning, and integration into Express endpoints (e.g., `/pi/chart`). Essential for CLI (`--chart`) and HTTP (`/pi/chart`, `/dashboard`) visualizations. Last updated: 2024. Authority: Official docs and GitHub repositories widely used in production.
## License: CC0 1.0 Universal / MIT

# Express.js & Security Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
## https://helmetjs.github.io/
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Authoritative Express 4.x API reference for building secure, high-performance REST and SSE endpoints. Covers routing, JSON parsing, CORS configuration, IP-based rate limiting with custom handlers, HTTP header hardening (CSP, HSTS, XSS Protection) via Helmet, and Server-Sent Events best practices. Directly informs middleware setup for `/pi`, `/metrics`, `/pi/stream`, and health endpoints. Last revised: 2024. Authority: Core project docs and MDN.
## License: MIT

# Testing & Benchmarking Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest#readme
## https://github.com/sindresorhus/execa#readme
## https://benchmarkjs.com
Practical guides for unit, integration, CLI, and performance testing in Node.js. Vitest provides fast test execution, mocking, snapshot testing, and coverage analysis. SuperTest offers HTTP assertions for Express servers. Execa enables robust CLI process control and output capture. Benchmark.js supports statistically sound micro-benchmarks. Essential for validating π computations, API behaviors, streaming SSE, CLI flags, and algorithm performance. Last updated: 2024.
## License: MIT

# Zod Schema Validation & OpenAPI Integration
## https://zod.dev/
## https://github.com/asteasolutions/zod-to-openapi
In-depth TypeScript-first runtime schema validation with Zod: parsing pipelines, custom refinements, error flattening, and schema composition. Paired with zod-to-openapi, this source demonstrates generating OpenAPI v3 specs and Swagger UI directly from Zod definitions, enabling spec-driven development and reducing duplication. Covers metadata annotations, decorators, path and response schemas, and handling validation errors in Express middleware. Last updated: 2024. Authority: Official docs and active community repository.
## License: MIT

# Configuration Management & CLI Parsing
## https://github.com/motdotla/dotenv#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
Detailed patterns for layered configuration: environment variables, hierarchical config file discovery, and CLI argument parsing. Demonstrates variable expansion, default overrides, aliasing, merging, and error handling for both server (`--serve`) and CLI modes. Tools include dotenv for `.env` files, cosmiconfig for flexible search, and minimist for simple flag parsing. Last updated: 2023–2024. Authority: Widely adopted libraries.
## License: MIT

# CLI Parsing with Yargs
## https://yargs.js.org/docs/
Official Yargs documentation covering command parsing, option definitions, aliases, default values, and middleware. Demonstrates building robust, self-documenting CLIs with `.option()`, commands, validation, and custom help messages. Vital for implementing `--serve`, `--port`, `--digits`, `--algorithm`, and output flags. Last updated: 2024.
## License: MIT

# Data Serialization & Templating
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
## https://tools.ietf.org/html/rfc4180
## https://csv.js.org/parse/doc
## https://csv.js.org/stringify/doc
Comprehensive reference for YAML (`js-yaml`), templating (EJS), and CSV standards (RFC4180). Covers streaming APIs, custom delimiters, escaping strategies, synchronous/asynchronous usage, and performance considerations. Supports multi-format outputs for CSV endpoints, CLI exports, and HTML dashboards. Last reviewed: 2024.
## License: MIT

# OpenAPI & Interactive Documentation & Security
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
## https://owasp.org/www-project-api-security/
## https://swagger.io/docs/specification/authentication/api-keys/
Defines OpenAPI 3.1 schema authoring, validation, and interactive UI integration with Swagger UI and Express. Covers API key security schemes in OpenAPI (header, query, cookie), and OWASP best practices for authentication, rotation, and threat mitigation. Guides spec-driven development, embedding Swagger UI at `/api-docs`, and documenting secure endpoints. Last updated: 2024.
## License: CC0 1.0 Universal / Apache-2.0 / MIT / CC BY 4.0

# Express OpenAPI Validator
## https://github.com/cdimascio/express-openapi-validator#readme
Middleware to validate HTTP requests and responses against OpenAPI 3 specs in Express. Shows how to load spec files, define security handlers, perform automatic request body, query, parameters, and response validation, and format errors consistently. Simplifies API maintenance and ensures contract consistency between code and documentation. Last updated: 2024. Authority: Popular OSS project with wide adoption.
## License: MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
## https://prometheus.io/docs/instrumenting/exposition_formats/
End-to-end observability patterns for Node.js services. Prom-client for Prometheus metrics, Pino for structured logging (HTTP, pretty print), and OpenTelemetry JS SDK for tracing and metrics pipelines. Details exporters (OTLP, Prometheus), registry configuration, auto-instrumentation, and exposition format specifics. Last reviewed: 2024.
## License: MIT / Apache-2.0

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js#readme
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources on native BigInt, Decimal.js precision control, and algorithmic implementations (Chudnovsky, Gauss–Legendre, Ramanujan–Sato, Monte Carlo, Leibniz). Includes performance trade-offs, convergence analysis, and sample code. Essential for implementing and benchmarking multiple π approximation techniques. Last updated: 2024.
## License: CC0 / MIT

# Code Quality & Formatting
## https://eslint.org/docs/latest/user-guide/configuring
## https://prettier.io/docs/en/index.html
Best practices for linting and formatting JavaScript/TypeScript with ESLint and Prettier. Covers rule configuration, plugin ecosystems, CI integration, caching strategies, and automatic code fixes. Ensures consistent style, prevents errors, and supports repository standards. Last updated: 2024.
## License: MIT

# Node.js Core APIs & Performance
## https://nodejs.org/api/
## https://nodejs.org/api/streams.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
Authoritative Node.js reference: ESM modules, Streams, Worker Threads for parallelism, and Performance Hooks for high-resolution profiling. Guides error handling, backpressure management, asynchronous FS operations, and module semantics critical for CLI, server, and compute-intensive workflows. Last reviewed: 2024.
## License: Node.js license / CC BY 4.0

# GitHub Actions & CI/CD Workflows
## https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
## https://github.com/actions/setup-node#readme
## https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows
Official documentation for defining, optimizing, and reusing GitHub Actions. Explains triggers, job matrices, secrets management, and caching strategies. Underpins CI pipelines and integration of Intentïon’s reusable workflows (`agentic-lib`). Last updated: 2024.
## License: CC BY-SA 2.5

# Fetch API & URLSearchParams
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
Browser and Node.js Fetch API documentation covering HTTP requests, streaming responses, error handling, and abort signals. URLSearchParams guides efficient query string construction and encoding. Fundamental for dashboard client logic and server-side API consumption. Last updated: 2024.
## License: CC BY-SA 2.5

# Agentic-lib Reusable Workflows
## https://github.com/xn-intenton-z2a/agentic-lib#readme
Intentïon’s library of reusable GitHub Actions workflows. Documents schedule triggers, file path mappings, permission scopes, and seeding strategies for repository initialization. Direct source, latest 2024 updates, MIT license. Empowers CI reuse and customization across projects.
## License: MIT