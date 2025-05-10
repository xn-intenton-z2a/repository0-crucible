# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library used for π calculations. Covers configuration of precision and rounding modes, performance considerations, and examples for high-precision computations. Essential for understanding how to correctly set precision margins, avoid rounding errors, and leverage Decimal methods in complex series algorithms. Last updated 2024; maintained by MikeMcl under MIT License.
## MIT License

# QuickChart API Reference
## https://quickchart.io/documentation/
Official documentation for QuickChart, detailing chart configuration options, HTTP endpoints, and image rendering parameters. Provides actionable JSON schema for crafting line and bar charts, customization of styles, and integration examples in Node.js. Crucial for implementing convergence and distribution visualizations and for automating PNG generation in CLI and HTTP contexts. Reflects changes as of 2024 and is hosted under an open usage policy (free tier docs).
## Unlicense-like free use terms

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide to Server-Sent Events, explaining the text/event-stream MIME type, message formatting, reconnection behavior, and SSE event dispatch in Node.js servers. Provides code examples and HTTP header requirements for implementing real-time π digit streaming endpoints. Authoritative community resource updated regularly; content under MDN’s Open Web Docs license (CC BY-SA 2.5).
## CC BY-SA 2.5

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x methods, middleware patterns, routing, and error handling. Key for building robust HTTP endpoints (/pi, /benchmark) and parsing query parameters securely. Includes examples of streaming responses and integration with AbortController. Official Express documentation maintained under MIT License.
## MIT License

# Node.js worker_threads
## https://nodejs.org/api/worker_threads.html
Official Node.js documentation for the worker_threads module, covering Worker class, message passing, and performance implications. Essential for distributing π series computation across threads, handling partition logic, and combining partial sums. Provides best practices for cleanup, error propagation, and thread pool sizing. Node.js v20 reference; content under Node.js License.
## Node.js License

# Node.js FS Promises
## https://nodejs.org/api/fs.html#fs_fs_promises_writefile_file_data_options
Documentation of the fs.promises API, focusing on writeFile and atomic write strategies (temporary file then rename). Crucial for ensuring safe file exports of π values and caching mechanisms without external dependencies. Official Node.js docs update for v20; content under Node.js License.
## Node.js License

# cli-progress
## https://github.com/cli-progress/cli-progress
GitHub repository and API documentation for the cli-progress library, detailing progress bar creation, rendering options, and multi-bar support. Guides integration of live console feedback for compute- and I/O-intensive π operations. Updated frequently; project licensed under MIT.
## MIT License

# zod
## https://github.com/colinhacks/zod
Schema validation library docs for Zod, covering parsing, refinements, and error handling. Fundamental for building robust CLI flag validation and dispatch logic. Includes examples for nested schemas and custom error messages. Maintained under MIT License with active community contributions.
## MIT License

# Node.js perf_hooks
## https://nodejs.org/api/perf_hooks.html
Official docs for Node.js perf_hooks module, including performance.now(), PerformanceObserver, and eventLoopUtilization metrics. Enables detailed diagnostics collection around π computation phases, memory usage, and event-loop monitoring. Vital for implementing the --diagnostics feature. Node.js v20; Node.js License.
## Node.js License

# MDN BigInt
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN reference for JavaScript BigInt support, syntax, and methods. Important for implementing the BBP extraction of hexadecimal π digits without arbitrary-precision libraries. Includes performance notes and cross-environment support considerations. MDN site content under CC BY-SA 2.5.
## CC BY-SA 2.5

# Bailey–Borwein–Plouffe formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Detailed explanation of the BBP algorithm for computing arbitrary hexadecimal digits of π. Includes series derivation, complexity analysis, and sample pseudocode. Critical for implementing the extractPiHex feature efficiently. Updated regularly; licensed under CC BY-SA 3.0.
## CC BY-SA 3.0

# mpmath π module
## https://mpmath.org/doc/current/pi.html
Documentation for mpmath’s π computational routines in Python, highlighting algorithm choices, convergence properties, and performance benchmarks. Offers comparative insights into series implementations and error behavior, useful for validating and optimizing JavaScript counterparts. Maintained under BSD License.
## BSD License

# MDN Numbers and radix conversion
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
MDN documentation on Number.prototype.toString(radix) behavior, edge cases, and performance implications. Guides implementation of base-2, base-10, and base-16 formatting of π strings, including prefix conventions. Content under CC BY-SA 2.5.
## CC BY-SA 2.5