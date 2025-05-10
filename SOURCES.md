# Node.js Standard Library
## https://nodejs.org/api/
The authoritative Node.js ESM-compatible runtime reference covering modules such as fs, http/https, streams, worker_threads, performance_hooks, and AbortController. This unified documentation details API signatures, backpressure semantics, atomic operations, and module resolution for building high-performance, cancellable, and parallelizable π computations. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# CLI Parsing and Validation
## https://github.com/yargs/yargs/blob/master/docs/api.md
Official Yargs documentation describing command and option definitions, nested subcommands, middleware, and help/version generators. Critical for designing a flexible CLI supporting flags for π computation, caching, benchmarking, visualizations, streaming, and diagnostics. Actively maintained with examples and best practices.
## https://github.com/colinhacks/zod
Comprehensive Zod guide for schema-based validation and type inference of CLI inputs and HTTP query parameters. Shows how to define synchronous/asynchronous validators, custom error messages, and integration with command routers. Last updated 2024; widely used in TypeScript and JavaScript ecosystems.
## License: MIT

# Configuration Management
## https://github.com/nodeca/js-yaml#readme
Guide to parsing and serializing YAML/JSON configurations with custom types, schema validations, and error handling. Enables structured defaults and environment-specific overrides for precision, caching, and server settings. Last updated 2024.
## https://github.com/motdotla/dotenv#readme
Instructions for loading environment variables securely from .env files with validation patterns. Essential for managing secret keys and deployment configurations without code changes. Last updated 2024.
## License: MIT, BSD-2-Clause

# Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
In-depth API reference for Decimal.js covering unlimited precision arithmetic operations, configurable rounding modes, and performance trade-offs. Fundamental for implementing Machin, Gauss–Legendre, and Chudnovsky π algorithms with consistent accuracy. Last updated 2023.
## License: MIT

# High-Precision π Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Provides mathematical derivation, convergence proofs, and binary-splitting pseudo-code for the Chudnovsky series. Enables efficient high-digit π calculations with rapid convergence characteristics. Last edited June 2024; CC BY-SA 3.0.
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Details the BBP formula for direct digit extraction in hexadecimal, demonstrating methods for random-access digit computation. Last edited June 2024; CC BY-SA 3.0.
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Outlines Ramanujan–Sato series families and their convergence rates, guiding algorithm selection for precision and performance requirements. Last edited June 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# Performance and HTTP Testing
## https://vitest.dev/guide/
Guide to Vitest’s ESM-native test runner with snapshot testing, mocking capabilities, coverage reports, and watch mode. Suitable for unit and integration tests of π calculations, CLI handlers, and HTTP endpoints. Last updated 2024.
## https://github.com/visionmedia/supertest
High-level API for testing HTTP servers by abstracting request/response cycles, streaming data assertions, and handling redirects/timeouts in Express applications. Last updated 2024.
## License: MIT

# CLI Progress Bars
## https://github.com/cli-progress/cli-progress#readme
Documentation for real-time console progress bars with single/multi-bar support, custom tokens, TTY detection, and graceful teardown. Vital for user feedback during long-running π computations, caching operations, and benchmarks. Last updated 2024.
## License: MIT

# Observability and Metrics
## https://github.com/siimon/prom-client#readme
Official prom-client API for defining counters, gauges, histograms, and custom metric registries to expose /metrics endpoints compatible with Prometheus. Last updated 2024.
## https://opentelemetry.io/docs/instrumentation/js/
Comprehensive guide to instrumenting Node.js applications with OpenTelemetry, including automatic instrumentation, tracer/metric setup, and exporting to backends like Jaeger or Prometheus. Last updated 2024.
## License: MIT, Apache-2.0

# HTTP and Streaming Protocols
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
IETF HTTP/1.1 specification section on chunked transfer encoding and message framing. Crucial for implementing streamed π digit SSE and backpressure handling. Last updated 2014; IETF standard.
## https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events
MDN guide to Server-Sent Events, covering EventSource API usage, reconnection strategies, and SSE data formats for one-way real-time streams. Last updated 2024.
## License: IETF Trust, CC BY-SA 2.5

# Worker Threads and Pooling
## https://nodejs.org/api/worker_threads.html
Official Node.js Worker Threads documentation detailing thread creation, messaging APIs, SharedArrayBuffer usage, and performance considerations. Enables parallel execution of π computations across CPU cores. Last updated June 2024.
## https://github.com/piscinajs/piscina#readme
Guide to Piscina’s high-performance thread pool for Node.js, explaining task queuing, concurrency control, and graceful shutdown patterns. Simplifies scaling π calculation workloads. Last updated March 2024.
## License: CC-BY-4.0, MIT

# File I/O, Caching, and Atomic Operations
## https://github.com/npm/write-file-atomic#readme
Instructions for atomic file writes ensuring complete replacement and crash-safe persistence. Supports reliable π result caching without partial writes. Last updated 2023.
## https://github.com/atomicjolt/proper-lockfile#readme
Details cross-process locking strategies with stale lock detection and automatic retries for safe concurrent cache access. Last updated 2022.
## License: MIT

# HTTP Framework for REST APIs
## https://expressjs.com/en/4x/api.html
Express.js API reference covering routing, middleware, request/response handling, streaming responses, and error management. Fundamental for building /pi and /benchmark REST endpoints. Last updated 2024.
## License: MIT

# Visualization and Reporting
## https://www.chartjs.org/docs/latest/
Chart.js documentation for client-side chart creation, plugin development, and performance tuning when rendering large datasets. Used for generating convergence and distribution charts on the client. Last updated 2024.
## https://quickchart.io/documentation/
Official QuickChart REST API docs for server-side on-demand chart image generation, detailing URL configuration parameters, rate limits, and caching strategies for PNG outputs. Last updated 2024.
## https://github.com/typpo/quickchart-js#readme
quickchart-js Node.js client library guide for interacting with the QuickChart API, covering initialization, error handling, and advanced customization. Last updated 2024.
## https://ejs.co/#docs
EJS templating docs for dynamic HTML and Markdown report generation, including template syntax, partials, and layout patterns. Last updated 2024.
## License: MIT

# API Documentation and Schema
## https://swagger.io/specification/
OpenAPI Specification v3 reference detailing object definitions for API design, validation rules, and documentation generation for RESTful services. Useful for describing /pi and /benchmark endpoints programmatically. Last updated 2022; maintained by the OpenAPI Initiative.
## https://github.com/drwpow/openapi-zod#readme
Guide to generating OpenAPI schemas from Zod validation definitions, enabling automated API documentation and request validation middleware. Last updated 2024.
## License: Apache-2.0, MIT

# String Search Algorithms
## https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string-search_algorithm
Comprehensive overview of the Boyer-Moore substring search algorithm with bad-character and good-suffix heuristics. Essential for implementing efficient searchPi pattern matching across large π digit strings. Last edited 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0