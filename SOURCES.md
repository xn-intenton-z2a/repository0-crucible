# Node.js Core APIs
## https://nodejs.org/api/
The authoritative reference for Node.js built-in modules including HTTP/HTTPS servers, Streams, Worker Threads, Performance Hooks, Crypto primitives, and fs/promises. Essential for implementing HTTP endpoints with chunked transfer encoding, backpressure management, precise timing, secure token generation, file I/O operations, parallel π computations, and atomic file handling. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# CLI Parsing and Validation
## https://github.com/yargs/yargs/blob/master/docs/api.md
The official API documentation for yargs, covering command definitions, option parsing, nested commands, middleware hooks, and auto-generated help/version interfaces. Critical for building the repository’s structured CLI supporting flags such as --calculate-pi, --digits, --algorithm, --benchmark, --use-cache, and --progress. Actively maintained with comprehensive examples.
## https://github.com/colinhacks/zod
The authoritative guide for Zod schema validation, including synchronous and asynchronous type inference, custom validators, and integration patterns with CLI parsers like yargs. Enables robust flag validation, descriptive error reporting, and end-to-end input sanitization for both CLI commands and HTTP endpoints. Last updated 2024; widely adopted in TypeScript and JavaScript projects.
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
Detailed mathematical derivation and convergence analysis of the Chudnovsky series, including pseudo-code for efficient binary splitting implementations. Key for bulk π computations at high digit counts with rapid convergence. Last edited June 2024; CC BY-SA 3.0.
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Documentation of the BBP formula enabling direct digit extraction of π without full-series computation. Provides algorithmic formulas and examples of hexadecimal digit computation applicable to selective digit queries. Last edited June 2024; CC BY-SA 3.0.
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Overview of rapidly convergent Ramanujan–Sato series for π, with detailed series expansions and convergence rates. Guides selection of series based on performance and precision requirements in JavaScript implementations. Last edited June 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# Testing Frameworks and HTTP Testing Tools
## https://vitest.dev/guide/
Modern ESM-native test runner with built-in mocking, snapshot testing, coverage reports, and watch mode. Ideal for unit and integration tests of calculation functions, caching logic, CLI handlers, and HTTP endpoints. Last updated 2024.
## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP endpoints and streaming responses in Express or similar frameworks. Simplifies assertions for JSON payloads, status codes, headers, and timeouts. Last updated 2024.
## License: MIT

# CLI Progress Bars
## https://github.com/cli-progress/cli-progress#readme
Detailed usage of cli-progress for single and multi-bar setups, custom formatting tokens, TTY detection, and graceful teardown. Crucial for real-time feedback during lengthy π computations and benchmarking tasks. Last updated 2024.
## License: MIT

# Observability Tools (Prometheus & OpenTelemetry)
## https://github.com/siimon/prom-client#readme
Official API for prom-client, covering metric types (counters, gauges, histograms), registries, and custom exporter integration. Enables /metrics endpoints for scraping performance and error rates. Last updated 2024.
## https://opentelemetry.io/docs/instrumentation/js/
Guidance on instrumenting Node.js applications with OpenTelemetry: tracer setup, automatic instrumentation, metric collection, and exporting to backends like Jaeger or Prometheus. Last updated 2024.
## License: MIT (prom-client), Apache-2.0 (OpenTelemetry)

# Asynchronous Data Flow and Streaming Protocols
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
Standard specification for HTTP/1.1 chunked transfer framing and header parsing. Crucial for streaming π digits over HTTP endpoints with correct framing and backpressure management. Last updated 2014; IETF standard.
## https://tools.ietf.org/html/rfc6455
WebSocket protocol specification defining message framing, opcodes, and connection lifecycle. Provides foundation for real-time bidirectional streaming if extended beyond SSE. Last updated 2011; IETF standard.
## https://nodejs.org/api/stream.html
Official Node.js Streams API documentation, covering Readable, Writable, Duplex, and Transform streams, backpressure semantics, and pipeline patterns. Essential for implementing cancellable data pipelines and streaming digit outputs. Last updated June 2024.
## https://developer.mozilla.org/docs/Web/API/AbortController
Guide to the AbortController and AbortSignal APIs for abortable asynchronous operations in Node.js and browsers. Key for implementing cancellable computations and HTTP requests. Last updated 2024.
## License: IETF Trust, MIT, CC BY-SA 2.5 (MDN)

# Worker Threads
## https://nodejs.org/api/worker_threads.html
Official guide to the Worker Threads module, detailing Worker creation, parent-worker messaging, SharedArrayBuffer patterns, and pool designs. Enables parallelizing π calculations across CPU cores with safe data transfer and concurrency control. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Visualization and Reporting Libraries
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas
## https://ejs.co/#docs
## https://quickchart.io/documentation/
## https://github.com/typpo/quickchart-js#readme
A comprehensive suite for generating dynamic charts and reports: Chart.js for client-side chart definitions, node-canvas for server-side rendering, EJS for templating HTML/Markdown outputs, and QuickChart for on-demand image generation via REST. Covers JSON config, performance considerations, URL length limits, and integration patterns in Node.js. Last updated 2024.
## License: MIT

# Piscina Worker Thread Pool Library
## https://github.com/piscinajs/piscina#readme
High-performance worker thread pool implementation for Node.js. Explains pool creation, task queuing, concurrency controls, timeout handling, and performance tuning. Offers a scalable alternative to manual Worker management for parallel π computations. Last updated March 2024; widely used in production.
## License: MIT

# Node.js HTTP Framework - Express.js
## https://expressjs.com/en/4x/api.html
Authoritative API reference for Express.js, covering routing, middleware composition, request/response handling, streaming responses, and error management. Essential for serving π computation results via REST or streaming endpoints. Last updated 2024.
## License: MIT

# Server-Sent Events (SSE)
## https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events
Practical guide to implementing Server-Sent Events for one-way real-time data streams over HTTP. Covers EventSource API usage in browsers, reconnection strategies, SSE formats, and compatibility considerations. Ideal for streaming π digits or progress updates to web clients. Last updated 2024.
## License: CC BY-SA 2.5

# Atomic File Writes and Locking
## https://github.com/npm/write-file-atomic#readme
Comprehensive guide to write-file-atomic for atomic file writes in Node.js, ensuring complete file replacement and preventing partial writes. Supports safe persistence of cache files under concurrent access. Last updated 2023.
## https://github.com/atomicjolt/proper-lockfile#readme
Detailed instructions on file-level locking patterns using proper-lockfile, offering cross-process locks, lock stale keeping, and automatic retries. Essential for preventing cache corruption during simultaneous cache reads/writes. Last updated 2022.
## License: MIT