# Node-Canvas & PNG Rendering
## https://github.com/Automattic/node-canvas#readme
Deep dive into server-side Canvas API for Node.js. Covers installation prerequisites (Cairo dependencies), canvas creation, font registration, text metrics, and buffer output for PNG and PDF formats. Emphasizes performance tuning (batch rendering, memory management), cross-platform considerations, and integration into both CLI and HTTP endpoints for rendering π digits. Last updated: 2024. Authority: Maintained by Automattic and widely used in production.
## License: MIT

# Express.js & Security Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
## https://helmetjs.github.io/
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Authoritative Express 4.x API reference for building secure, high-performance REST and SSE endpoints. Covers routing, JSON parsing, CORS configuration, IP-based rate limiting, HTTP header hardening (CSP, HSTS, XSS Protection) via Helmet, and Server-Sent Events best practices. Directly informs middleware and endpoint setup for JSON/PNG π services and streaming. Last revised: 2024. Authority: Core project docs and MDN.
## License: MIT

# Zod Schema Validation & OpenAPI Generation
## https://zod.dev/
## https://github.com/asteasolutions/zod-to-openapi
In-depth TypeScript-first runtime schema validation with Zod: parsing pipelines, custom refinements, error flattening, and schema composition. Paired with zod-to-openapi, this describes generating OpenAPI v3 specs and Swagger UI directly from Zod definitions. Enables strict parameter validation for CLI flags and HTTP query parameters, and spec-driven development. Last updated: 2024. Authority: Official docs and active community repositories.
## License: MIT

# OpenAPI & Interactive Documentation & Security
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://github.com/scottie1984/swagger-ui-express#readme
## https://owasp.org/www-project-api-security/
Defines OpenAPI 3.1 schema authoring, validation, and interactive UI integration with Swagger UI and Express. Covers API key and OAuth security schemes, threat modeling, and OWASP best practices for authentication and authorization. Guides embedding Swagger UI at `/api-docs` and maintaining secure API documentation alongside implementation. Last updated: 2024. Authority: Official standards and OWASP.
## License: CC0 1.0 Universal / Apache-2.0 / MIT / CC BY 4.0

# Express OpenAPI Validator
## https://github.com/cdimascio/express-openapi-validator#readme
Middleware to validate HTTP requests and responses against OpenAPI 3 specs in Express. Shows how to load spec files, define security handlers, perform automatic request body, query, parameter, and response validation, and format errors consistently. Simplifies API maintenance and ensures contract consistency between code and documentation. Last updated: 2024. Authority: Popular OSS project with wide adoption.
## License: MIT

# Testing & HTTP Assertion Tools
## https://vitest.dev/
## https://github.com/visionmedia/supertest#readme
## https://github.com/sindresorhus/execa#readme
Practical guides for unit, integration, CLI, and HTTP endpoint testing in Node.js. Vitest provides fast test execution, mocking, snapshot testing, and coverage analysis. SuperTest offers HTTP assertions for Express servers. Execa enables robust CLI process control and output capture. Essential for validating π calculations, API behaviors, streaming SSE, CLI flags, and algorithm performance. Last updated: 2024.
## License: MIT

# CLI Progress Bar (cli-progress)
## https://www.npmjs.com/package/cli-progress
Official cli-progress documentation detailing how to integrate a flexible, performant progress bar into Node.js console applications. Covers single and multibar setups, customizable formats, update intervals, and themes. Demonstrates start(), update(), and stop() methods, handling of uninterruptable streams, and performance considerations. Essential for real-time progress display in π computation loops when `--progress` is enabled, with graceful handling when output formats change. Last updated: 2024. Authority: NPM registry and GitHub project.
## License: MIT

# Arbitrary-Precision Arithmetic & Pi Algorithms
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://mikemcl.github.io/decimal.js/
Comprehensive resources on native BigInt for integer precision, Decimal.js for arbitrary-precision decimal arithmetic, and algorithmic implementations (Chudnovsky, Gauss–Legendre, Ramanujan–Sato, Monte Carlo, Leibniz). Includes performance trade-offs, convergence analysis, and sample code. Essential for implementing and benchmarking high-performance Chudnovsky and other π approximation techniques. Last updated: 2024. Authority: Official MDN and well-known algorithm repositories.
## License: CC0 / MIT

# Observability & Telemetry
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-http#readme
## https://opentelemetry.io/docs/js/
## https://prometheus.io/docs/instrumenting/exposition_formats/
End-to-end observability patterns for Node.js services. Prom-client for Prometheus metrics, Pino for structured logging (HTTP, pretty print), and OpenTelemetry JS SDK for tracing and metrics pipelines. Details exporters (OTLP, Prometheus), registry configuration, auto-instrumentation, and exposition format specifics. Critical for monitoring π service performance, request rates, and health. Last reviewed: 2024. Authority: Official SDKs and ecosystem projects.
## License: MIT / Apache-2.0

# Code Quality & Formatting
## https://eslint.org/docs/latest/user-guide/configuring
## https://prettier.io/docs/en/index.html
Best practices for linting and formatting JavaScript/TypeScript with ESLint and Prettier. Covers rule configuration, plugin ecosystems, CI integration, caching strategies, and automatic code fixes. Ensures consistent style, prevents errors, and supports repository standards. Last updated: 2024. Authority: Official docs.
## License: MIT

# Node.js Core APIs & File System
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/streams.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
Authoritative Node.js reference for file system operations, path utilities, data streams, worker threads for parallelism, and performance hooks for high-resolution profiling. Guides error handling, backpressure management, and asynchronous operations critical for CLI, HTTP service, and compute-intensive workflows including file-based caching of π results. Last reviewed: 2024. Authority: Official Node.js documentation.
## License: Node.js license / CC BY 4.0

# GitHub Actions & CI/CD Workflows
## https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
## https://github.com/actions/setup-node#readme
## https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows
Official documentation for defining, optimizing, and reusing GitHub Actions. Explains triggers, job matrices, secrets management, and caching strategies. Underpins CI pipelines and integration of reusable workflows for testing, linting, and publishing. Last updated: 2024. Authority: GitHub docs.
## License: CC BY-SA 2.5

# Agentic-lib Reusable Workflows
## https://github.com/xn-intenton-z2a/agentic-lib#readme
Intentïon’s library of reusable GitHub Actions workflows. Documents schedule triggers, file path mappings, permission scopes, and seeding strategies for repository initialization. Direct source, latest 2024 updates, MIT license. Empowers CI reuse and customization across projects.
## License: MIT