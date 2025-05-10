# Node.js Core APIs
## https://nodejs.org/api/
The authoritative reference for Node.js built-in modules including HTTP/HTTPS servers, Streams, Worker Threads, Performance Hooks, Crypto primitives, and fs/promises. Essential for implementing HTTP endpoints with chunked transfer encoding, backpressure management, precise timing, secure token generation, file I/O, and multithreaded π computations via worker_threads. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# CLI Parsing and Validation
## https://github.com/yargs/yargs/blob/master/docs/api.md
The official API docs for yargs, covering command definitions, option parsing, nested commands, middleware, and auto-generated help/version interfaces. Critical for the repository’s structured CLI interface supporting flags like --calculate-pi, --timeout, --serve, and global options.
## https://zod.dev/
Comprehensive guide to Zod, a TypeScript-first runtime schema validation library. Describes schema definitions, transformations, union/intersection types, parsing/coercion, and structured error reporting. Used for validating CLI arguments and HTTP request inputs with strict type safety. Version 3.x, last updated 2024.
## License: MIT

# Configuration and Environment Management
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
Combined documentation for js-yaml and dotenv detailing YAML/JSON parsing patterns, hierarchical configuration overrides, environment variable loading, and secure .env management. Vital for --config support and default value handling without hardcoding sensitive data. Last updated 2024.
## License: MIT (js-yaml), BSD-2-Clause (dotenv)

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Official reference for Decimal.js, detailing API for arbitrary-precision decimal arithmetic, configurable rounding modes, precision control, and performance considerations. Key to implementing Chudnovsky, Ramanujan, and Gauss–Legendre series with predictable accuracy and efficiency. Last updated 2023.
## License: MIT

# High-Precision π Calculation Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Authoritative overviews of advanced π algorithms: the binary-splitting Chudnovsky series, direct-digit-extraction BBP formula, and rapidly convergent Ramanujan–Sato series. Provides mathematical foundations, convergence analysis, and implementation guidance for bulk computation and selective digit extraction. Last edited June 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# OpenAPI Documentation
## https://spec.openapis.org/oas/v3.0.3
## https://github.com/Surnet/swagger-jsdoc#readme
Comprehensive coverage of the OpenAPI 3.0 specification and swagger-jsdoc integration. Explains defining paths, parameters, schemas, security schemes, and JSDoc-based spec generation. Essential for generating interactive API docs and client SDKs from in-code annotations. Spec revised July 2023; swagger-jsdoc updated 2024.
## License: CC0 (OpenAPI), MIT (swagger-jsdoc)

# Testing Frameworks and HTTP Testing Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
Reference docs for Vitest—a fast, modern test runner with mocking, snapshot, and coverage support—and Supertest for HTTP assertions. Enables writing unit, integration, and end-to-end tests for CLI commands, computation modules, and HTTP endpoints. Versions 2024; actively maintained.
## License: MIT

# CLI Progress Bars
## https://github.com/cli-progress/cli-progress#readme
Detailed usage of cli-progress for single and multi-bar configurations, custom formatting, TTY detection, and graceful redirection. Crucial for real-time visual feedback during long-running π calculations and benchmarks. Last updated 2024.
## License: MIT

# Streaming Protocols and Libraries
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
## https://tools.ietf.org/html/rfc6455
## https://github.com/websockets/ws
RFC 7230 §4.1 defines HTTP/1.1 chunked transfer framing; RFC 6455 specifies the WebSocket protocol. The ws library offers a Node.js WebSocket server implementation. This trio is foundational for real-time digit streaming over HTTP and WebSocket with proper framing and backpressure handling. RFCs published 2014/2011; ws updated 2024.
## License: IETF Trust (RFCs), MIT (ws)

# Observability Tools (Prometheus & OpenTelemetry)
## https://github.com/siimon/prom-client#readme
## https://opentelemetry.io/docs/instrumentation/js/
Combined documentation for prom-client metrics and OpenTelemetry JavaScript instrumentation. Covers metric types, registries, tracer APIs, exporters, and auto-instrumentation. Supports /metrics endpoints and distributed tracing for π computation workflows. Last updated 2024.
## License: MIT (prom-client), Apache-2.0 (OpenTelemetry)

# Worker Threads
## https://nodejs.org/api/worker_threads.html
Official guide to the worker_threads module, detailing Worker creation, parent–worker messaging, SharedArrayBuffer usage, and pool patterns. Enables parallelizing π calculations across CPU cores with safe data transfer and concurrency control. Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Node.js Streams API
## https://nodejs.org/api/stream.html
Comprehensive documentation for Readable, Writable, Duplex, and Transform streams, pipeline utilities, backpressure semantics, and async iteration. Essential for efficient chunked HTTP responses, CLI streaming, and handling large digit datasets without high memory overhead. Last updated June 2024.
## License: CC-BY-4.0

# AbortController & Timeout Patterns
## https://developer.mozilla.org/en-US/docs/Web/API/AbortController
Detailed MDN guide on AbortController and AbortSignal for abortable asynchronous operations. Explains integrating timeouts, cancellation signals, and graceful cleanup. Fundamental for --timeout support in both CLI and HTTP handlers. Last updated 2024; maintained by Mozilla.
## License: CC BY-SA 2.5

# Visualization and Reporting Libraries
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas
## https://ejs.co/#docs
Comprehensive suite for generating visual and textual benchmark reports: Chart.js for responsive chart configurations, node-canvas for server-side rendering to PNG, and EJS for templating HTML or Markdown reports. Covers customization, performance considerations, and integration patterns for end-to-end reporting. Last updated 2024.
## License: MIT

# OpenAI Node.js SDK
## https://platform.openai.com/docs/libraries/node-js
Official documentation for the OpenAI Node.js client library, including setup, authentication patterns, API call structures, streaming completions, error handling, and rate limit management. Enables integrating AI-driven insights or automation into the π computation workflow. Last updated 2024.
## License: MIT

# GitHub Actions Reusable Workflows
## https://docs.github.com/en/actions/using-workflows/reusing-workflows
Detailed guidelines for creating and consuming reusable workflows in GitHub Actions. Explains workflow call syntax, inputs/outputs definitions, triggering strategies, and best practices for modular CI/CD pipelines. Fundamental for the repository’s template-based automation using agentic-lib workflows. Last updated 2024.
## License: CC-BY-4.0