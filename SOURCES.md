# Node.js Core APIs
## https://nodejs.org/api/
The authoritative reference for Node.js built-in modules including HTTP/HTTPS servers, Streams, Worker Threads, Performance Hooks, Crypto primitives, and fs/promises. Essential for implementing HTTP endpoints with chunked transfer encoding, backpressure management, precise timing, secure token generation, file I/O, and multithreaded π computations via worker_threads. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# CLI Parsing and Validation
## https://github.com/yargs/yargs/blob/master/docs/api.md
The official API docs for yargs, covering command definitions, option parsing, nested commands, middleware, and auto-generated help/version interfaces. Critical for the repository’s structured CLI interface supporting flags like --calculate-pi, --digits, --algorithm, --benchmark, and --progress.
## License: MIT

# Configuration and Environment Management
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
Combined documentation for js-yaml and dotenv detailing YAML/JSON parsing patterns, hierarchical configuration overrides, environment variable loading, and secure .env management. Vital for configuring default settings (precision, benchmarks) without hardcoding sensitive data. Last updated 2024.
## License: MIT (js-yaml), BSD-2-Clause (dotenv)

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Official reference for Decimal.js, detailing API for arbitrary-precision decimal arithmetic, configurable rounding modes, precision control, and performance considerations. Key to implementing Chudnovsky, Ramanujan, and Gauss–Legendre series with predictable accuracy and efficiency. Last updated 2023.
## License: MIT

# High-Precision π Calculation Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Authoritative overviews of advanced π algorithms: the binary-splitting Chudnovsky series for bulk computation, the digit-extraction BBP formula for selective digits, and rapidly convergent Ramanujan–Sato series. Provides mathematical foundations, convergence analysis, and pseudo-code guiding practical implementation. Last edited June 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# Testing Frameworks and HTTP Testing Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
Reference docs for Vitest—a modern ESM-native test runner with mocking, snapshot, and coverage support—and Supertest for HTTP assertions. Enables writing unit, integration, and end-to-end tests for CLI commands, computation modules, and any future HTTP APIs. Versions 2024; actively maintained.
## License: MIT

# CLI Progress Bars
## https://github.com/cli-progress/cli-progress#readme
Detailed usage of cli-progress for single and multi-bar configurations, custom formatting, TTY detection, and graceful redirection. Crucial for real-time visual feedback during long-running π calculations and benchmarks. Last updated 2024.
## License: MIT

# Observability Tools (Prometheus & OpenTelemetry)
## https://github.com/siimon/prom-client#readme
## https://opentelemetry.io/docs/instrumentation/js/
Combined documentation for prom-client metrics and OpenTelemetry JavaScript instrumentation. Covers metric types, registries, tracer APIs, exporters, and auto-instrumentation. Supports /metrics endpoints and distributed tracing for π computation workflows. Last updated 2024.
## License: MIT (prom-client), Apache-2.0 (OpenTelemetry)

# Asynchronous Data Flow and Streaming Protocols
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
## https://tools.ietf.org/html/rfc6455
## https://nodejs.org/api/stream.html
## https://developer.mozilla.org/docs/Web/API/AbortController
Integrated guidance on HTTP/1.1 chunked transfer framing, WebSocket messaging, Node.js stream primitives (Readable, Writable, Duplex, Transform), backpressure semantics, and abortable asynchronous operations. Essential for building robust, cancellable, real-time digit streaming and data pipelines. RFCs published 2011/2014; Node and MDN updated 2024.
## License: IETF Trust (RFCs), MIT (Node.js), CC BY-SA 2.5 (MDN)

# Worker Threads
## https://nodejs.org/api/worker_threads.html
Official guide to the worker_threads module, detailing Worker creation, parent–worker messaging, SharedArrayBuffer usage, and pool patterns. Enables parallelizing π calculations across CPU cores with safe data transfer and concurrency control. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Visualization and Reporting Libraries
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas
## https://ejs.co/#docs
Comprehensive suite for generating visual and textual benchmark reports: Chart.js for responsive chart configurations, node-canvas for server-side rendering to PNG, and EJS for templating HTML or Markdown reports. Covers customization, performance considerations, and integration patterns for end-to-end reporting. Last updated 2024.
## License: MIT

# Piscina Worker Thread Pool Library
## https://github.com/piscinajs/piscina#readme
High-performance worker thread pool implementation for Node.js. Details pool creation, task queuing, concurrency controls, timeout management, and performance tuning. Provides an alternative to manual Worker management for scalable parallel π calculations. Last updated March 2024; widely adopted in production.
## License: MIT

# QuickChart API and Node.js Client
## https://quickchart.io/documentation/
## https://github.com/typpo/quickchart-js#readme
Comprehensive reference for QuickChart’s REST API and the quickchart-js client library. Covers JSON-based chart configuration, server-side image generation endpoints, authentication, URL length considerations, and client integration patterns for automated performance charting. REST docs updated 2024; client library MIT.
## License: MIT

# Node.js HTTP Framework - Express.js
## https://expressjs.com/en/4x/api.html
Authoritative Express.js API reference for building HTTP servers and middleware-driven applications. Details routing, request/response handling, streaming response support, error handling, and modular architecture. Essential for serving π computation results as REST or streaming endpoints. Last updated 2024.
## License: MIT

# Server-Sent Events (SSE)
## https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events
Practical guide to implementing Server-Sent Events for one-way real-time data streams over HTTP. Covers event source setup, reconnection, message formats, and browser compatibility. Ideal for streaming π digits or progress updates to client applications with minimal overhead.
## License: CC BY-SA 2.5