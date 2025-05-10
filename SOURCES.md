# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library driving all π computations in this project. Detailed configuration of precision, rounding modes, and performance considerations, with extensive examples for high-precision series algorithms (Machin, Gauss–Legendre, Chudnovsky). Essential for correctly setting precision margins, avoiding rounding errors, and optimizing speed in core algorithms.
Last updated 2024; highly authoritative as the library’s official site.
## MIT License

# QuickChart.js Client Library
## https://github.com/typpo/quickchart-js
Official JavaScript client library for QuickChart.io, offering a fluent API to build chart configurations, request rendered images or URLs, and handle SSL, custom fonts, and advanced rendering options. Provides promise-based methods for Node.js and browser environments, simplifying integration of line, bar, and multi-dataset charts for convergence, distribution, benchmarking, and comparative visualizations. Detailed usage patterns for configuring axes, tooltips, theming, and chart sizing.
Last updated 2024; MIT License.
## MIT License

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x routing, middleware patterns, error handling, request parsing, and response streaming. Key resource for building RESTful HTTP endpoints, SSE streams, static asset serving, and integrating diagnostic middleware in the HTTP API enhancement features. Official docs maintained under MIT License.
## MIT License

# AbortController API
## https://developer.mozilla.org/en-US/docs/Web/API/AbortController
MDN reference for AbortController and AbortSignal usage, demonstrating patterns for cancelling asynchronous operations, integrating with fetch, timers, streaming computations, and combining with Promise.race for operation timeouts. Essential for implementing the Operation Timeout feature and for cancelling HTTP requests gracefully.
Continuously updated; content under CC BY-SA 2.5 license.
## CC BY-SA 2.5

# Node.js Worker Threads API
## https://nodejs.org/api/worker_threads.html
Official Node.js documentation for the worker_threads module, covering Worker creation, message passing, transferable objects, error handling, and performance considerations. Critical for parallelizing π computation with calculatePiParallel, partitioning work across CPU cores, and aggregating partial sums. Node.js v20.
## Node.js License

# JavaScript BigInt
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN documentation on the BigInt data type enabling arbitrary-precision integers in JavaScript. Covers syntax, arithmetic operations, conversion methods, and integration with numeric algorithms. Crucial for implementing large factorial computations in the Chudnovsky algorithm and for integer-indexed operations in digit extraction features.
Continuously updated; content under CC BY-SA 2.5 license.
## CC BY-SA 2.5

# Node.js File System Promises API
## https://nodejs.org/api/fs.html#fs_promises_api
fs.promises API reference covering file reading, writing, renaming, directory operations, and atomic file handling techniques. Essential for exportPi atomic writes, persistent cache management, script mode file I/O, template-based HTML report generation, and safe concurrent access. Includes best practices for error handling and performance. Node.js v20.
## Node.js License

# perf_hooks API
## https://nodejs.org/api/perf_hooks.html
Node.js perf_hooks module documentation detailing high-resolution timing APIs like performance.now(), PerformanceObserver, performance.timerify(), and eventLoopUtilization(). Critical for implementing diagnostics features to measure execution time, memory usage, and event-loop metrics across core and HTTP-bound operations.
Node.js v20.
## Node.js License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, asynchronous parsing, and error formatting. Key resource for defining and validating CLI flag schemas, configuration inputs, and HTTP API request validation. Maintained under MIT License.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml
Official repository and documentation for js-yaml, detailing YAML parsing and stringification APIs, custom schema creation, and security considerations. Essential for script mode and HTML report generation via YAML-based command scripts. Last published 2024; content under BSD-2-Clause license.
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for configuration file discovery (JSON, YAML, JS), search order, caching strategies, and error handling. Key for the configuration feature to load defaults before CLI parsing or in scripting mode. Last updated 2024; MIT License.
## MIT License

# proper-lockfile
## https://www.npmjs.com/package/proper-lockfile
Official npm package documentation for safe file locking and atomic write operations in Node.js. Covers acquiring and releasing shared and exclusive locks, retry strategies, and ensuring data integrity under concurrent access. Crucial for implementing the PI Cache feature with atomic updates and safe concurrent reads. Last published 2024; MIT License.
## MIT License

# cli-progress
## https://github.com/cli-progress/cli-progress
Versatile progress bar library for Node.js that supports single and multi-bar displays, custom formatting, and real-time updates. Crucial for live console progress bars in long-running π computations and benchmarks with `--progress`. Well-documented with examples on customizing themes, formatting tokens, and update intervals. Last updated 2024; MIT License.
## MIT License

# EJS
## https://ejs.co/#docs
Embedded JavaScript templating engine. Provides syntax for generating HTML with embedded JavaScript, partials, includes, and filters. Essential for the HTML Report Generation feature to template dashboards, embed Base64 images, and render code blocks in static reports. Last updated 2024; MIT License.
## MIT License

# Node.js OS Module API
## https://nodejs.org/api/os.html
Official Node.js os module documentation, covering methods such as `os.cpus()`, `os.totalmem()`, `os.freemem()`, and platform detection. Critical for determining available CPU cores for worker thread partitioning and for gathering system information in diagnostics features. Node.js v20.
## Node.js License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide for Server-Sent Events (SSE) usage, illustrating how to stream event-stream data over HTTP, including setting correct headers (`text/event-stream`, `Cache-Control`, `Connection`), formatting messages, and handling client reconnects. Essential for implementing the PI Streaming feature to deliver real-time π digits. Continuously updated; CC BY-SA 2.5 license.
## CC BY-SA 2.5