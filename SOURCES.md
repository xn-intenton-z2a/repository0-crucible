# Node.js Core APIs
## https://nodejs.org/api/
Comprehensive reference to Node.js core modules, including HTTP/HTTPS server and client APIs, Streams (including async iterables and chunked transfer encoding), Worker Threads for parallel execution, AbortController for cancellation patterns, Performance Hooks for precise timing, fs/promises for file I/O, URL/QueryString utilities for parsing request parameters, built-in util, events, timers modules, and Crypto primitives (randomBytes, Hash, HMAC, Cipher, Decipher) for secure operations. This authoritative documentation is essential for implementing HTTP API endpoints, streaming π digit blocks, multithreaded calculations, robust timeout control, cancellation via AbortSignal, cryptographic token generation, error handling patterns, and backpressure management.
Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0

# Yargs CLI Parser
## https://github.com/yargs/yargs/blob/master/docs/api.md
Comprehensive API documentation for yargs, detailing command definitions, option parsing, nested commands, middleware, and automatic help/version generation. Key for building a structured CLI interface with commands like calculate-pi, extract-range, serve, rate limiting, and global flags (timeout, config, threads, verbosity), and for generating consistent usage instructions and error messages.
Last updated July 2024; actively maintained by the yargs community.
## License: MIT

# Zod Schema Validation
## https://zod.dev/
Full documentation for Zod, a TypeScript-first schema validation library. Covers schema creation, transformations, union/intersection types, parsing/coercion, and detailed error reporting. Essential for unified validation of CLI inputs, configuration files, and HTTP query parameters with strict type safety and consistent error messaging across all features, including error formatting and payload validation.
Version 3.x; last updated 2024.
## License: MIT

# Configuration and Environment Management
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
Guides for configuration file parsing (YAML/JSON) with js-yaml and environment variable management with dotenv. Together they enable loading and validating project-level YAML/JSON config files and secure .env-based environment settings. Critical for flexible CLI default options, secure configuration of ports, cache directories, timeouts, and feature flags without hardcoding.
Last updated 2024.
## License: MIT (js-yaml), BSD-2-Clause (dotenv)

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Official guide to Decimal.js, detailing API methods for arbitrary-precision decimal arithmetic, configurable rounding modes, performance considerations, and precision management. Critical for implementing the Chudnovsky and Ramanujan algorithms with predictable accuracy and performance, and for converting BBP output to decimal when required.
Last updated 2023.
## License: MIT

# π Computation Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Comprehensive overview of three core π computation methods: the Chudnovsky series for high-performance arbitrary-precision digit computation (including convergence proofs and term estimates), the Bailey–Borwein–Plouffe (BBP) formula for direct digit extraction without full-series summation, and the Ramanujan–Sato series offering rapid convergence via modular equations. Essential for implementing bulk π calculation, targeted digit/range extraction, and alternative algorithm selection in both CLI and HTTP APIs.
Last edited June 2024; licensed CC BY-SA 3.0.
## License: CC BY-SA 3.0

# OpenAPI Documentation
## https://spec.openapis.org/oas/v3.0.3
## https://github.com/Surnet/swagger-jsdoc#readme
Combined guide to the OpenAPI 3.0 Specification and swagger-jsdoc for generating machine-readable API contracts from JSDoc comments. Provides schemas for paths, parameters, request/response bodies, security schemes, and tooling for interactive documentation and client SDK generation. Critical for ensuring consistent API definitions, automated client SDK generation, and runtime validation for HTTP endpoints.
Spec last revised July 2023; swagger-jsdoc updated 2024.
## License: CC0 (OpenAPI), MIT (swagger-jsdoc)

# Testing Frameworks and HTTP Testing Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
Guide to Vitest, a fast unit and integration testing framework with mocking, snapshot testing, and coverage reporting, and Supertest for high-level HTTP assertions against Node.js servers. Together they enable comprehensive testing of algorithm correctness, CLI option parsing, HTTP route handlers, and error responses.
Versions 2024; actively maintained by the respective communities.
## License: MIT

# cli-progress Library
## https://github.com/cli-progress/cli-progress#readme
In-depth documentation for cli-progress, covering single and multi-bar setups, custom formatting tokens, manual and automatic TTY detection, and graceful handling of redirected output. Essential for implementing responsive, real-time progress bars during π digit computation, benchmarks, and spot-check verification workflows.
Last updated 2024.
## License: MIT

# Prometheus Metrics with prom-client
## https://github.com/siimon/prom-client#readme
Documentation for prom-client, covering metric types (Counters, Gauges, Histograms, Summaries), registry management, label support, and Prometheus exposition format compliance. Essential for instrumenting application performance, exposing a /metrics endpoint, and integrating with monitoring systems.
Last updated 2024.
## License: MIT

# Report Generation Tools
## https://github.com/mde/ejs#readme
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Combined overview of EJS templating and server-side Chart.js rendering via ChartjsNodeCanvas. EJS provides templating syntax, partials, and integration with Node.js for dynamic report generation, while ChartjsNodeCanvas enables headless rendering of Chart.js charts to PNG buffers. Together they power the generation of formatted benchmark and performance reports with embedded visualizations in Markdown or HTML.
Last updated 2023–2024.
## License: MIT

# Markdown-it and GitHub Flavored Markdown Plugin
## https://github.com/markdown-it/markdown-it#readme
## https://github.com/markdown-it-github/markdown-it-github#readme
Combined documentation for Markdown-it and the markdown-it-github plugin, covering extensible syntax parsing, token structures, plugin integration, customization of rendering rules, and GFM extensions such as tables, task lists, and autolinks. Essential for rendering dynamic markdown reports and documentation templates.
Last updated 2024; maintained by the markdown-it community.
## License: MIT

# JavaScript BigInt
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
Comprehensive guide to the BigInt primitive in JavaScript, detailing syntax for literal and constructor usage, arithmetic and bitwise operations, and conversion to/from strings. Covers performance characteristics, V8 implementation nuances, and memory implications when dealing with large integers. Critical for implementing factorial and binary-splitting steps using BigInt for precision-critical computations.
Last updated 2024; maintained by Mozilla.
## License: CC BY-SA 2.5

# Streaming Protocols and Libraries
## https://datatracker.ietf.org/doc/html/rfc7230#section-4.1
## https://tools.ietf.org/html/rfc6455
## https://github.com/websockets/ws
Consolidated resources covering chunked transfer encoding for HTTP/1.1 (RFC 7230 §4.1), the WebSocket protocol (RFC 6455), and the ws library for Node.js. These specifications and implementations are crucial for reliable real-time streaming of π digit blocks, framing control, handling fragmentation, backpressure, and multi-client support.
RFCs published 2014 and 2011; library updated 2024.
## License: IETF Trust (RFCs), MIT (ws)

# OpenTelemetry for Node.js
## https://opentelemetry.io/docs/instrumentation/js/
Practical guide to instrumenting Node.js applications with OpenTelemetry’s metrics, traces, and context propagation. Covers API usage, exporters, auto-instrumentation modules, and resource attributes. Valuable for end-to-end performance analysis of π computation workflows and distributed tracing insights beyond Prometheus metrics.
Last updated 2024.
## License: Apache-2.0

# Worker Threads
## https://nodejs.org/api/worker_threads.html
Official documentation for the Node.js worker_threads module, covering Worker and WorkerPool creation, parentPort communication, MessageChannel and SharedArrayBuffer usage, performance considerations, and error handling across threads. Essential for implementing parallel computation of π digits with safe data transfer, thread cleanup, and efficient workload partitioning.
Last updated June 2024; maintained by the OpenJS Foundation.
## License: CC-BY-4.0