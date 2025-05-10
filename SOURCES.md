# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library driving all π computations in this project. Detailed configuration of precision, rounding modes, and performance considerations, with extensive examples for high-precision series algorithms (Machin, Gauss–Legendre, Chudnovsky). Essential for correctly setting precision margins, avoiding rounding errors, and optimizing speed in core algorithms.
Last updated 2024; highly authoritative as the library’s official site.
## MIT License

# QuickChart.js Client Library
## https://github.com/typpo/quickchart-js
Official JavaScript client library for QuickChart.io, offering a fluent API to build chart configurations, request rendered images or URLs, and handle SSL, custom fonts, and advanced rendering options. Provides promise-based methods for Node.js and browser environments, simplifying integration of line, bar, and multi-dataset charts for convergence, distribution, benchmarking, and comparative visualizations. Detailed usage patterns for configuring axes, tooltips, and theming.
Last updated 2024; MIT License.
## MIT License

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x routing, middleware patterns, error handling, request parsing, and response streaming. Key resource for building RESTful HTTP endpoints, error handlers, static asset serving, and implementing SSE streams in the HTTP API feature. Official docs maintained under MIT License.
## MIT License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide detailing the text/event-stream MIME type, SSE message formatting, reconnection behavior, and usage examples in Node.js and browsers. Provides actionable patterns for implementing real-time π digit streaming, handling client disconnects gracefully, and formatting SSE events.
Continuously updated; content under CC BY-SA 2.5 license.
## CC BY-SA 2.5

# AbortController API
## https://developer.mozilla.org/en-US/docs/Web/API/AbortController
MDN reference for AbortController and AbortSignal usage, demonstrating patterns for cancelling asynchronous operations, integrating with fetch, timers, and streaming computations. Essential for implementing the Operation Timeout feature and for cancelling SSE and HTTP requests gracefully.
Continuously updated; content under CC BY-SA 2.5 license.
## CC BY-SA 2.5

# Node.js Worker Threads API
## https://nodejs.org/api/worker_threads.html
Official Node.js documentation for the worker_threads module, covering Worker creation, message passing, transferable objects, error handling, and performance considerations. Essential for implementing parallel π computation with calculatePiParallel, partitioning work, and aggregating partial results. Node.js v20.
## Node.js License

# JavaScript BigInt
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN documentation on the BigInt data type enabling arbitrary-precision integers in JavaScript. Covers syntax, arithmetic operations, conversion methods, and integration with other APIs. Crucial for implementing large factorial computations in the Chudnovsky algorithm and handling high-precision indexing in extraction features.
Continuously updated; content under CC BY-SA 2.5 license.
## CC BY-SA 2.5

# Node.js File System Promises API
## https://nodejs.org/api/fs.html#fs_promises_api
fs.promises API reference covering file reading, writing, renaming, directory operations, and atomic file handling techniques. Crucial for exportPi atomic writes, persistent cache management, script mode file I/O, and HTML report generation. Includes best practices for error handling and performance. Node.js v20.
## Node.js License

# perf_hooks API
## https://nodejs.org/api/perf_hooks.html
Node.js perf_hooks module documentation detailing high-resolution timing APIs like performance.now(), PerformanceObserver, performance.timerify(), and eventLoopUtilization(). Critical for implementing diagnostics features to measure execution time, memory usage, and event-loop metrics.
Node.js v20.
## Node.js License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, asynchronous parsing, and error formatting. Crucial for validating CLI flags, configuration inputs (config mode, script mode), and HTTP API request schemas.
Maintained under MIT License.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml
Official repository and documentation for js-yaml, detailing YAML parsing and stringification APIs, custom schema creation, and security considerations. Essential for script mode and HTML report generation via YAML-based command scripts.
Last published 2024; content under BSD-2-Clause license.
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for configuration file discovery (JSON, YAML, JS), search order, caching strategies, and error handling. Key for the configuration feature to load defaults before CLI parsing or in scripting mode.
Last updated 2024; MIT License.
## MIT License

# Machin-like Formula
## https://en.wikipedia.org/wiki/Machin-like_formula
Wikipedia article on Machin-like formulas for π, detailing the arctan series expansions and convergence properties. Provides mathematical derivations and criteria for selecting arctan arguments to optimize convergence speed. Essential theoretical background for implementing and comparing Machin series in `calculatePi`.
License: CC BY-SA 3.0.
## CC BY-SA 3.0

# Gauss–Legendre Algorithm
## https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
Wikipedia page describing the Gauss–Legendre algorithm for π computation, including iterative arithmetic-geometric mean steps, convergence proofs, and error bounds. Crucial for understanding and verifying the implementation of the Gauss–Legendre path in `calculatePi`.
License: CC BY-SA 3.0.
## CC BY-SA 3.0

# Chudnovsky Algorithm
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Authoritative description of the Chudnovsky algorithm on Wikipedia, covering its series formula, convergence rate, and implementation considerations. Includes term-by-term error analysis and parameter selection. Fundamental reference for the high-performance Chudnovsky implementation.
License: CC BY-SA 3.0.
## CC BY-SA 3.0

# Bailey–Borwein–Plouffe (BBP) Formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Wikipedia documentation of the BBP formula for π digit extraction in base-16. Describes the series used to compute arbitrary hexadecimal digits without full preceding computation, which underpins the `extractPiHex` feature. Error analysis and algorithmic complexity details provided.
License: CC BY-SA 3.0.
## CC BY-SA 3.0