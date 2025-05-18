# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
Comprehensive reference for both hosted REST-based and in-process chart generation. QuickChart and Image-Charts detail URL parameters, theming, export formats (PNG, SVG), rate limits, and watermarking. Chart.js v4 docs cover component registration and plugin architecture. ChartjsNodeCanvas and node-canvas guides walk through headless canvas setup, Docker-friendly pipelines, performance tuning, and integration into Express endpoints (e.g., `/pi/chart`). Essential for CLI (`--chart`) and HTTP (`/pi/chart`, `/dashboard`) visualizations. Last updated: 2024. Authority: Official docs and GitHub repositories widely used in production.
## License: CC0 1.0 Universal / MIT

# Node-Canvas & PNG Rendering
## https://github.com/Automattic/node-canvas#readme
Deep dive into server-side Canvas API for Node.js. Covers installation prerequisites (Cairo dependencies), canvas creation, font registration, text metrics, and buffer output for PNG and PDF formats. Emphasizes performance tuning (batch rendering, memory management) and cross-platform considerations. Critical for rendering π digits as monospaced text in CLI and HTTP endpoints. Last updated: 2024. Authority: Maintained by Automattic and widely used in production.
## License: MIT

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

# CLI Progress Bar (cli-progress)
## https://www.npmjs.com/package/cli-progress
Official CLI-progress documentation detailing how to integrate a flexible, performant progress bar into Node.js console applications. Covers single and multibar setups, customizable formats, update intervals, and themes. Demonstrates start(), update(), and stop() methods, handling of uninterruptable streams, and performance considerations. Essential for real-time progress display in π calculation loops when `--progress` is enabled. Last updated: 2024. Authority: NPM registry and GitHub project.
## License: MIT

# Zod Schema Validation, OpenAPI Generation & CLI Configuration
## https://zod.dev/
## https://github.com/asteasolutions/zod-to-openapi
## https://github.com/motdotla/dotenv#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
## https://www.npmjs.com/package/minimist
## https://yargs.js.org/docs/
In-depth TypeScript-first runtime schema validation with Zod: parsing pipelines, custom refinements, error flattening, and schema composition. Paired with zod-to-openapi, this source demonstrates generating OpenAPI v3 specs and Swagger UI directly from Zod definitions. Configuration patterns include layered `.env` loading via dotenv, hierarchical config discovery with cosmiconfig, simple flag parsing with minimist, and robust CLI definitions with Yargs: commands, option aliases, defaults, and custom help. Enables spec-driven development, reduces duplication, and provides flexible server/CLI setups. Last updated: 2024. Authority: Official docs and active community repositories.
## License: MIT

# Data Serialization & Templating
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
## https://tools.ietf.org/html/rfc4180
## https://csv.js.org/parse/doc
## https://csv.js.org/stringify/doc
Comprehensive reference for YAML (`js-yaml`), templating (EJS), and CSV standards (RFC4180). Covers streaming APIs, custom delimiters, escaping strategies, and performance considerations. Supports multi-format outputs for CSV endpoints, CLI exports, and HTML dashboards. Last reviewed: 2024. Authority: Official package docs and IETF.
## License: MIT

# OpenAPI & Interactive Documentation & Security
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
## https://owasp.org/www-project-api-security/
## https://swagger.io/docs/specification/authentication/api-keys/
Defines OpenAPI 3.1 schema authoring, validation, and interactive UI integration with Swagger UI and Express. Covers API key security schemes (header, query, cookie), OAuth flows, and OWASP best practices for authentication, rotation, and threat mitigation. Guides spec-driven development, embedding Swagger UI at `/api-docs`, and documenting secure endpoints. Last updated: 2024. Authority: Official standards and OWASP.
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
End-to-end observability patterns for Node.js services. Prom-client for Prometheus metrics, Pino for structured logging (HTTP, pretty print), and OpenTelemetry JS SDK for tracing and metrics pipelines. Details exporters (OTLP, Prometheus), registry configuration, auto-instrumentation, and exposition format specifics. Last reviewed: 2024. Authority: Official SDKs and ecosystem projects.
## License: MIT / Apache-2.0

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js#readme
## https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/numerical/pi/pi.md
Comprehensive resources on native BigInt, Decimal.js precision control, and algorithmic implementations (Chudnovsky, Gauss–Legendre, Ramanujan–Sato, Monte Carlo, Leibniz). Includes performance trade-offs, convergence analysis, and sample code. Essential for implementing and benchmarking multiple π approximation techniques including high-performance Chudnovsky. Last updated: 2024. Authority: Official MDN and well-known algorithm repositories.
## License: CC0 / MIT

# Code Quality & Formatting
## https://eslint.org/docs/latest/user-guide/configuring
## https://prettier.io/docs/en/index.html
Best practices for linting and formatting JavaScript/TypeScript with ESLint and Prettier. Covers rule configuration, plugin ecosystems, CI integration, caching strategies, and automatic code fixes. Ensures consistent style, prevents errors, and supports repository standards. Last updated: 2024. Authority: Official docs.
## License: MIT

# Node.js Core APIs, File System & Performance
## https://nodejs.org/api/
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/streams.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
Authoritative Node.js reference: File System and Path modules for reading, writing, and managing files and directories (including recursive directory creation), ESM modules, Streams for data pipelines, Worker Threads for parallelism, and Performance Hooks for high-resolution profiling. Guides error handling, backpressure management, and asynchronous operations critical for CLI, server, and compute-intensive workflows including file-based caching and PNG generation. Last reviewed: 2024. Authority: Official Node.js documentation.
## License: Node.js license / CC BY 4.0

# GitHub Actions & CI/CD Workflows
## https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
## https://github.com/actions/setup-node#readme
## https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows
Official documentation for defining, optimizing, and reusing GitHub Actions. Explains triggers, job matrices, secrets management, and caching strategies. Underpins CI pipelines and integration of Intentïon’s reusable workflows (`agentic-lib`). Last updated: 2024. Authority: GitHub docs.
## License: CC BY-SA 2.5

# Fetch API & URLSearchParams
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
Browser and Node.js Fetch API documentation covering HTTP requests, streaming responses, error handling, and abort signals. URLSearchParams guides efficient query string construction and encoding. Fundamental for dashboard client logic and server-side API consumption. Last updated: 2024. Authority: MDN.
## License: CC BY-SA 2.5

# Agentic-lib Reusable Workflows
## https://github.com/xn-intenton-z2a/agentic-lib#readme
Intentïon’s library of reusable GitHub Actions workflows. Documents schedule triggers, file path mappings, permission scopes, and seeding strategies for repository initialization. Direct source, latest 2024 updates, MIT license. Empowers CI reuse and customization across projects. 
## License: MIT