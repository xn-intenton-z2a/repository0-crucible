# Chart Rendering & Server-Side Integration
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Comprehensive guide combining external RESTful chart generation (QuickChart.io, Image-Charts) with server-side rendering using Chart.js and Node-Canvas. Covers JSON schema for chart definitions, URL parameter conventions, theming, and HTTP endpoints alongside Chart.js plugin architecture, Canvas context creation, and rendering pipelines. Provides actionable examples for on-demand PNG output in CLI `--chart` mode and HTTP `/pi/chart` endpoint. Last updated 2024; QuickChart is CC0 1.0 and Chart.js/Node-Canvas are MIT licensed and widely adopted by developers.
## CC0 1.0 Universal / MIT

# Express.js & Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Authoritative reference for Express 4.x core APIs, routing, middleware patterns, request parsing, error handling, plus essential middleware for CORS and rate limiting. Provides best practices for secure, performant REST endpoints and fits directly into implementing CLI-driven HTTP servers and the `/pi` suite of routes. Last updated 2024; maintained by the Express.js team.
## MIT

# Testing Tools: Vitest & SuperTest
## https://vitest.dev/
## https://github.com/visionmedia/supertest
Covers modern testing with Vitest, including configuration, mocking, snapshot testing, and performance metrics, alongside SuperTest’s HTTP assertion utilities for Express endpoints. Essential for unit, integration, and end-to-end tests of CLI and server behavior, with examples for mocking fs, console, and async flows. Last updated 2024; widely adopted in Node.js projects.
## MIT

# Node.js Runtime & Parallelism
## https://nodejs.org/api/
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/stream.html
Central documentation for Node.js built-ins, including file system, path, URL utilities, streams API (Readable, Writable, Transform), worker_threads for multi-core parallelism, and performance hooks for high-resolution timing. Critical for implementing file I/O, parallel Monte Carlo sampling (`--workers`), streaming convergence data, and accurate performance measurement. Last updated 2024; maintained by Node.js core team.
## Node.js License

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first validation library for synchronous/asynchronous parsing, refinements, and structured error reporting. Crucial for enforcing robust CLI argument and HTTP query parameter schemas, yielding clear error messages and safe defaults in both CLI and Express handlers. Last updated 2024.
## MIT

# Configuration Management
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://github.com/cosmiconfig/cosmiconfig#readme
Comprehensive coverage of environment and configuration file loading: reading `.env` with dotenv, parsing YAML via js-yaml, and hierarchical discovery/merging of JSON, YAML, and `package.json` configs with cosmiconfig. Provides patterns for layering CLI flags, environment variables, and file-based defaults. Last updated 2024.
## MIT

# Seeded Randomness with Seedrandom
## https://github.com/davidbau/seedrandom
Documentation for creating reproducible pseudorandom generators in JavaScript, covering seeding strategies, state serialization, and multiple PRNG algorithms (Alea, ARC4, MT19937). Fundamental for deterministic Monte Carlo sampling (`--seed`). Last updated 2023.
## MIT

# EJS Templating Engine
## https://ejs.co/#docs
Official guide to Embedded JavaScript templating engine syntax, including includes, partials, filters, and helper functions. Enables generation of dynamic HTML reports and dashboards embedding π values, charts, and convergence tables. Last updated 2024.
## MIT

# API Specifications & Documentation
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
OpenAPI 3.1.0 specification for defining RESTful schemas and Swagger UI for interactive API documentation and testing. Essential for standardizing `/pi`, `/pi/data`, and `/pi/chart` endpoints, generating live docs, and ensuring contract accuracy. Last updated 2024.
## CC0 1.0 Universal / Apache-2.0

# BigInt & π Algorithms Reference
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
## https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
Authoritative references for JavaScript `BigInt` and high-precision π algorithms (Chudnovsky, Ramanujan–Sato, Gauss–Legendre series). Covers mathematical derivations, convergence properties, and integer-based computation strategies critical for arbitrary-precision implementations. Last updated 2024; widely cited.
## CC BY-SA 4.0

# Observability: Logging & Metrics
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
## https://github.com/pinojs/pino-pretty
Guides for instrumenting Node.js with Prometheus metrics (`prom-client` for counters, gauges, histograms) and structured JSON logging with `pino` and human-friendly output via `pino-pretty`. Essential for a `/metrics` endpoint, runtime diagnostics, and log-driven insights in CLI and server modes. Last updated 2024.
## MIT

# Decimal.js for Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
Detailed API reference for `decimal.js`, enabling high-precision decimal calculations with configurable precision and rounding. Crucial for implementing Gauss–Legendre, Chudnovsky, and Ramanujan–Sato methods beyond native BigInt limits. Last release v10.4.3; MIT License.
## MIT

# minimist Argument Parsing
## https://www.npmjs.com/package/minimist
Official documentation for `minimist`, detailing positional arguments, boolean flags, string coercion, default values, aliases, and error handling. Central to robust CLI parsing of options (`--digits`, `--algorithm`, `--samples`, `--convergence-data`, etc.). Last updated 2024.
## MIT

# CLI Progress Indicators with cli-progress
## https://www.npmjs.com/package/cli-progress
## https://github.com/AndiDittrich/Node.CLI-Progress
Documentation for adding dynamic progress bars in terminal applications. Covers multi-bar support, custom renderers, and performance considerations for long-running tasks like iterative π computation and parallel Monte Carlo sampling (`--workers`). Improves user feedback with live progress and ETA. Last updated 2024.
## MIT