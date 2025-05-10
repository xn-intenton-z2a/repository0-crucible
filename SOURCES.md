# Node.js Core APIs
## https://nodejs.org/api/
Comprehensive reference to Node.js core modules, including HTTP/HTTPS server and client APIs, Streams (including async iterables and chunked transfer encoding), Worker Threads for parallel execution, AbortController for cancellation patterns, Performance Hooks for precise timing, fs/promises for file I/O, URL/QueryString utilities for parsing request parameters, and built-in util, events, and timers modules. This authoritative documentation is essential for implementing HTTP API endpoints, streaming π digit blocks, multithreaded Chudnovsky calculations, robust timeout control, cancellation via AbortSignal, error handling patterns, and backpressure management. Last updated June 2024 under the OpenJS Foundation; official Node.js documentation.
## License: CC-BY-4.0

# Worker Threads API
## https://nodejs.org/api/worker_threads.html
Official Node.js Worker Threads documentation, covering creation and management of Worker instances, parentPort messaging, transferable objects, SharedArrayBuffer and Atomics for shared memory, and performance considerations. Essential for implementing parallel π computation by distributing series term workloads across threads, handling partial result aggregation, error propagation, and orderly shutdown. Last updated June 2024 under the OpenJS Foundation; official Node.js documentation.
## License: CC-BY-4.0

# HTTP Module
## https://nodejs.org/api/http.html
Comprehensive guide to Node.js HTTP server and client APIs, detailing request and response handling, headers management, streaming request bodies, chunked transfer encoding, and integration with URL/QueryString utilities. Crucial for building the HTTP API endpoints for π calculation, digit extraction, streaming outputs, rate limiting, and metrics exposition. Last updated June 2024 under the OpenJS Foundation; official Node.js documentation.
## License: CC-BY-4.0

# Node.js Crypto Module
## https://nodejs.org/api/crypto.html
Official documentation for the Crypto module, covering cryptographic primitives such as randomBytes for secure random number generation, hashing algorithms, HMAC, and cipher/decipher APIs. Essential for generating high-quality random positions during π digit verification, securing tokens or session data, and any future enhancements requiring cryptographic operations. Last updated June 2024 under the OpenJS Foundation; official Node.js documentation.
## License: CC-BY-4.0

# Yargs CLI Parser
## https://github.com/yargs/yargs/blob/master/docs/api.md
Comprehensive API documentation for yargs, detailing command definitions, option parsing, nested commands, middleware, and automatic help/version generation. Key for building a structured CLI interface with commands like calculate-pi, extract-range, serve, and global flags (timeout, config, threads, verbosity). Last updated July 2024; actively maintained by the yargs community.
## License: MIT

# Zod Schema Validation
## https://zod.dev/
Full documentation for Zod, a TypeScript-first schema validation library. Covers schema creation, transformations, union/intersection types, parsing/coercion, and detailed error reporting. Essential for unified validation of CLI inputs, configuration files, and HTTP query parameters with strict type safety and consistent error messaging. Version 3.x; last updated 2024.
## License: MIT

# js-yaml Configuration Library
## https://github.com/nodeca/js-yaml#readme
README and API documentation for js-yaml, covering YAML parsing, serialization, custom schema definitions, and error handling. Used for loading and validating project-level default CLI options from YAML or JSON configuration files. Last updated 2024.
## License: MIT

# dotenv Environment Configuration
## https://github.com/motdotla/dotenv#readme
Guide to dotenv for loading environment variables from .env files into process.env, with best practices for security, variable expansion, and integration into Node.js applications. Useful for configuring default ports, cache directories, timeout thresholds, and feature flags without hardcoding. Last updated 2024.
## License: BSD-2-Clause

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Official guide to Decimal.js, detailing API methods for arbitrary-precision decimal arithmetic, configurable rounding modes, performance considerations, and precision management. Critical for implementing the Chudnovsky algorithm with predictable accuracy and performance, and for converting BBP output to decimal when required. Last updated 2023.
## License: MIT

# π Computation Algorithms
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Comprehensive overview of two core π computation methods: the Chudnovsky series for high-performance arbitrary-precision digit computation (including convergence proofs, term estimates, and resource implications) and the Bailey–Borwein–Plouffe (BBP) formula for direct digit extraction without full-series summation. Essential for implementing both bulk π calculation and targeted digit/range extraction in CLI and HTTP APIs. Last edited May–June 2024; licensed CC BY-SA 3.0.
## License: CC BY-SA 3.0

# OpenAPI Documentation
## https://spec.openapis.org/oas/v3.0.3
## https://github.com/Surnet/swagger-jsdoc#readme
Combined guide to the OpenAPI 3.0 Specification and the swagger-jsdoc library for generating machine-readable API contracts from JSDoc comments. Provides schemas for paths, parameters, request/response bodies, security schemes, and tooling for interactive documentation and client code generation. Last revised July 2023 (spec) and updated 2024 (library). Maintained by the OpenAPI Initiative and the swagger-jsdoc community.
## License: CC0 (OpenAPI), MIT (Swagger JSDoc)

# Vitest Testing Framework
## https://vitest.dev/guide/
Next-generation test runner providing fast unit and integration testing with built-in mocking, snapshot testing, watch mode, and coverage reporting. Supports ECMAScript Modules and parallel test execution for rapid feedback on algorithm correctness, CLI parsing, timeout behavior, and HTTP endpoints. Version 3.x; last updated 2024.
## License: MIT

# cli-progress Library
## https://github.com/cli-progress/cli-progress#readme
In-depth documentation for cli-progress, covering single and multi-bar setups, custom formatting tokens, manual and automatic TTY detection, and graceful handling of redirected output. Essential for implementing responsive, real-time progress bars during π digit computation, benchmarks, and spot-check verification workflows. Last updated 2024.
## License: MIT

# Prometheus Metrics with prom-client
## https://github.com/siimon/prom-client#readme
Documentation for prom-client, covering metric types (Counters, Gauges, Histograms, Summaries), registry management, label support, and Prometheus exposition format compliance. Essential for instrumenting application performance, exposing a /metrics endpoint, and integrating with monitoring systems. Last updated 2024.
## License: MIT

# Report Generation Tools
## https://github.com/mde/ejs#readme
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Combined overview of EJS templating and Chart.js server-side rendering via ChartjsNodeCanvas. EJS provides templating syntax, partials, includes, and integration with Node.js for dynamic report generation in Markdown or HTML. ChartjsNodeCanvas enables headless rendering of Chart.js charts to PNG buffers. Together, they power the generation of formatted benchmark reports with embedded performance visualizations. Last updated 2023–2024.
## License: MIT

# Minimatch Glob Patterns
## https://github.com/isaacs/minimatch#minimatch
API reference for minimatch, a glob matching library used for matching file paths with patterns. Covers syntax for patterns, options for matching behavior, and examples for inclusion/exclusion lists. Handy for configuration file scanning, test file discovery, and file-based batching operations. Last updated 2024.
## License: MIT