# Node.js Core APIs
## https://nodejs.org/api/
The authoritative reference for Node.js built-in modules including HTTP/HTTPS servers, Streams, Worker Threads, Performance Hooks, Crypto primitives, and fs/promises. Essential for implementing HTTP endpoints with chunked transfer encoding, backpressure management, precise timing, secure token generation, file I/O operations, and parallel π computations. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# CLI Parsing and Validation
## https://github.com/yargs/yargs/blob/master/docs/api.md
The official API documentation for yargs, covering command definitions, option parsing, nested commands, middleware hooks, and auto-generated help/version interfaces. Critical for the repository’s structured CLI supporting flags such as --calculate-pi, --digits, --algorithm, --benchmark, --use-cache, and --progress. Actively maintained with comprehensive examples.
## License: MIT

# Configuration and Environment Management
## https://github.com/nodeca/js-yaml#readme
Detailed guide on parsing YAML and JSON configurations with js-yaml, including schema definitions, custom types, and error handling. Enables hierarchical defaults and flexible overrides for precision settings, benchmark parameters, and server configurations. Last updated 2024.

## https://github.com/motdotla/dotenv#readme
Practical instructions for loading and validating environment variables from .env files, managing secrets, and preventing accidental exposure in version control. Supports secure configuration for development and production. Last updated 2024.
## License: MIT (js-yaml), BSD-2-Clause (dotenv)

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Comprehensive reference for Decimal.js, detailing API methods for arbitrary-precision decimal arithmetic, configurable rounding modes, precision control, and performance benchmarks. Fundamental for implementing Machin, Gauss–Legendre, and Chudnovsky π series with predictable accuracy and speed trade-offs. Last updated 2023.
## License: MIT

# High-Precision π Calculation Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Authoritative overviews of advanced π algorithms: the binary-splitting Chudnovsky series for bulk computation, the digit-extraction BBP formula for selective decimal places, and rapidly convergent Ramanujan–Sato series. Includes mathematical derivations, convergence rates, and pseudo-code guiding practical implementation. Last edited June 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# Testing Frameworks and HTTP Testing Tools
## https://vitest.dev/guide/
Modern ESM-native test runner with built-in mocking, snapshot testing, coverage reports, and watch mode. Ideal for unit and integration tests of calculation functions, caching logic, CLI handlers, and HTTP endpoints.

## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP endpoints and streaming responses in Express or similar frameworks. Simplifies assertions for JSON payloads, status codes, headers, and timeouts. Last updated 2024.
## License: MIT

# CLI Progress Bars
## https://github.com/cli-progress/cli-progress#readme
Detailed usage of cli-progress for single and multi-bar setups, custom formatting tokens, TTY detection, and graceful teardown. Crucial for real-time feedback during lengthy π computations and benchmarking tasks. Last updated 2024.
## License: MIT

# Observability Tools (Prometheus & OpenTelemetry)
## https://github.com/siimon/prom-client#readme
Official API for prom-client, covering metric types (counters, gauges, histograms), registries, and custom exporter integration. Enables /metrics endpoints for scraping performance and error rates.

## https://opentelemetry.io/docs/instrumentation/js/
Guidance on instrumenting Node.js applications with OpenTelemetry: tracer setup, automatic instrumentation, metric collection, and exporting to backends like Jaeger or Prometheus. Last updated 2024.
## License: MIT (prom-client), Apache-2.0 (OpenTelemetry)

# Asynchronous Data Flow and Streaming Protocols
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
## https://tools.ietf.org/html/rfc6455
## https://nodejs.org/api/stream.html
## https://developer.mozilla.org/docs/Web/API/AbortController
Integrated guidance on HTTP/1.1 chunked transfer framing, WebSocket messaging, Node.js stream primitives (Readable, Writable, Duplex, Transform), backpressure semantics, and abortable asynchronous operations. Essential for building robust, cancellable real-time digit streaming and data pipelines. Last updated 2024.
## License: IETF Trust (RFCs), MIT (Node.js), CC BY-SA 2.5 (MDN)

# Worker Threads
## https://nodejs.org/api/worker_threads.html
Official guide to the Worker Threads module, detailing Worker creation, parent-worker messaging, SharedArrayBuffer patterns, and pool designs. Enables parallelizing π calculations across CPU cores with safe data transfer and concurrency control. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Visualization and Reporting Libraries
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas
## https://ejs.co/#docs
A comprehensive suite for generating visual and textual benchmark reports: Chart.js for dynamic chart expressions, node-canvas for server-side rendering to image formats, and EJS for templating HTML or Markdown outputs. Covers performance considerations and embedding patterns. Last updated 2024.
## License: MIT

# Piscina Worker Thread Pool Library
## https://github.com/piscinajs/piscina#readme
High-performance worker thread pool implementation for Node.js. Explains pool creation, task queuing, concurrency controls, timeout handling, and performance tuning. Offers a scalable alternative to manual Worker management for parallel π computations. Last updated March 2024; widely used in production.
## License: MIT

# QuickChart API and Node.js Client
## https://quickchart.io/documentation/
## https://github.com/typpo/quickchart-js#readme
Comprehensive reference for QuickChart’s REST API and quickchart-js client library. Details JSON chart configuration, server-side image generation limits, URL length considerations, and Node integration patterns for automated performance charting. REST docs updated 2024; client library MIT.
## License: MIT

# Node.js HTTP Framework - Express.js
## https://expressjs.com/en/4x/api.html
Authoritative API reference for Express.js, covering routing, middleware composition, request/response handling, streaming responses, and error management. Essential for serving π computation results via REST or streaming endpoints. Last updated 2024.
## License: MIT

# Server-Sent Events (SSE)
## https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events
Practical guide to implementing Server-Sent Events for one-way real-time data streams over HTTP. Covers EventSource API usage in browsers, reconnection strategies, SSE formats, and compatibility considerations. Ideal for streaming π digits or progress updates to web clients. Last updated 2024.
## License: CC BY-SA 2.5

# Data Schema Validation with Zod
## https://github.com/colinhacks/zod
The official Zod documentation covers schema-based validation of JavaScript objects and command-line arguments, including type inference, custom validators, asynchronous checks, and integration patterns with CLI parsers. Essential for robust input validation in both CLI and HTTP endpoints, enabling consistent error handling and developer-friendly messages. Last updated 2024; widely adopted in TypeScript and JavaScript projects.
## License: MIT