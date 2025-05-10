# Node.js Core APIs
## https://nodejs.org/api/
Comprehensive reference for Node.js core modules, including HTTP/HTTPS server and client APIs, Streams for efficient I/O, Worker Threads for parallel execution, AbortController for cancellation patterns, Performance Hooks for precise timing, fs/promises for file operations, URL and QueryString utilities, built-in util, events, timers, and Crypto primitives. This documentation is the authoritative source for implementing HTTP endpoints, chunked transfer encoding, backpressure management, precise timeouts, secure token generation, and multithreaded π computations.
Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Yargs CLI Parser
## https://github.com/yargs/yargs/blob/master/docs/api.md
Official API documentation for yargs, detailing command definitions, option parsing, nested commands, middleware hooks, and automatic help/version generation. Critical for building a structured CLI interface that supports flags like --calculate-pi, --timeout, --serve, and global options. Includes examples on custom command modules and advanced parsing strategies to ensure robust user input handling.
Last updated July 2024; actively maintained by the yargs community.
## License: MIT

# Zod Schema Validation
## https://zod.dev/
Comprehensive guide to Zod, a TypeScript-first runtime schema validation library. Covers schema declarations, transformations, union and intersection types, parsing and coercion, and detailed error reporting. Essential for validating CLI arguments, configuration files, HTTP query parameters, and request payloads with strict type safety and consistent error messages across all features.
Version 3.x; last updated 2024.
## License: MIT

# Configuration and Environment Management
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
Combined documentation for js-yaml and dotenv, enabling YAML/JSON configuration parsing and environment variable loading. Provides patterns for hierarchical configuration, secure .env management, and validation integration. Critical for implementing --config file support, default values, and secret management without hardcoding sensitive settings.
Last updated 2024.
## License: MIT (js-yaml), BSD-2-Clause (dotenv)

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Official reference for Decimal.js, detailing API methods for arbitrary-precision decimal arithmetic, configurable rounding modes, performance tuning, and precision control. Key for implementing Chudnovsky and Ramanujan π algorithms with predictable accuracy and performance, and for converting BBP outputs to decimal when necessary.
Last updated 2023.
## License: MIT

# π Computation Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Authoritative overview of high-precision π algorithms: the Chudnovsky series (binary splitting approach and convergence analysis), the BBP formula for direct digit extraction, and Ramanujan–Sato series for rapid convergence via modular equations. Essential for implementing bulk π calculation, digit-range extraction, and algorithm selection.
Last edited June 2024; licensed CC BY-SA 3.0.
## License: CC BY-SA 3.0

# OpenAPI Documentation
## https://spec.openapis.org/oas/v3.0.3
## https://github.com/Surnet/swagger-jsdoc#readme
Combined guide to the OpenAPI 3.0 Specification and swagger-jsdoc. Provides instruction on defining paths, parameters, schemas, security schemes, and tooling to generate interactive API docs and client SDKs. Crucial for generating machine-readable contracts from JSDoc and ensuring consistent HTTP API definitions.
Spec last revised July 2023; swagger-jsdoc updated 2024.
## License: CC0 (OpenAPI), MIT (swagger-jsdoc)

# Testing Frameworks and HTTP Testing Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
Reference documentation for Vitest, a fast and modern testing framework with mocking, snapshot testing, and coverage, and Supertest for high-level HTTP assertions. Together they enable unit, integration, and end-to-end tests for algorithms, CLI parsing, HTTP endpoints, and error-handling logic.
Versions 2024; actively maintained.
## License: MIT

# cli-progress Library
## https://github.com/cli-progress/cli-progress#readme
Extensive documentation for cli-progress, covering single and multi-bar setups, custom formatting, manual and automatic TTY detection, and graceful output redirection. Essential for integrating real-time progress bars in the CLI during long-running π computations and benchmarks.
Last updated 2024.
## License: MIT

# JavaScript BigInt
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
In-depth MDN guide to the BigInt primitive, including literal and constructor usage, arithmetic and bitwise operations, and conversion methods. Covers performance considerations and memory trade-offs when handling very large integers in π computation steps like factorials and binary splitting.
Last updated 2024; maintained by Mozilla.
## License: CC BY-SA 2.5

# Streaming Protocols and Libraries
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
## https://tools.ietf.org/html/rfc6455
## https://github.com/websockets/ws
Comprehensive resources on HTTP/1.1 chunked transfer encoding (RFC 7230 §4.1), the WebSocket protocol (RFC 6455), and the ws Node.js library. Provides framing details, backpressure handling, and multi-client support necessary for robust real-time π digit streaming over HTTP and WebSocket.
RFCs published 2014 and 2011; ws library updated 2024.
## License: IETF Trust (RFCs), MIT (ws)

# Observability Tools (Prometheus & OpenTelemetry)
## https://github.com/siimon/prom-client#readme
## https://opentelemetry.io/docs/instrumentation/js/
Combined documentation for prom-client and OpenTelemetry JS instrumentation. Covers metric types, registries, tracer APIs, exporters, and auto-instrumentation modules. Critical for collecting application metrics, exposing a /metrics endpoint, and performing distributed tracing of π computations.
Last updated 2024.
## License: MIT (prom-client), Apache-2.0 (OpenTelemetry)

# Worker Threads
## https://nodejs.org/api/worker_threads.html
Official guide to the worker_threads module, detailing Worker and WorkerPool creation, parentPort communication, SharedArrayBuffer usage, and error handling. Essential for parallelizing π calculations across CPU cores with safe data transfer and performance tuning.
Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Node.js Streams API
## https://nodejs.org/api/stream.html
Definitive documentation for the Node.js Streams API, covering Readable, Writable, Duplex, and Transform streams, backpressure management, pipeline utilities, and async iteration. Crucial for implementing chunked HTTP responses, CLI streaming, and efficient memory usage when handling large π digit datasets.
Last updated June 2024.
## License: CC-BY-4.0

# AbortController and AbortSignal (MDN)
## https://developer.mozilla.org/en-US/docs/Web/API/AbortController
Detailed MDN documentation on AbortController and AbortSignal, describing how to implement cancellation and timeouts for Promises, fetch requests, and custom APIs. Key for implementing robust timeout control (--timeout) and graceful abort handling across CLI and HTTP operations.
Last updated 2024; maintained by Mozilla.
## License: CC BY-SA 2.5

# Express-rate-limit Middleware
## https://github.com/express-rate-limit/express-rate-limit#readme
API documentation for the express-rate-limit middleware, demonstrating configurable rate limiting strategies, sliding windows, IP-based quotas, and integration with Express apps. Provides actionable patterns for enforcing per-client request limits, back-off strategies, and custom error handlers.
Last updated 2024; widely adopted in production Node.js services.
## License: MIT