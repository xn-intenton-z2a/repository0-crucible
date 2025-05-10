# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library at the core of all π computations in this project. Covers configuration of precision and rounding modes, performance considerations, and detailed examples for high-precision series algorithms (Machin, Gauss-Legendre, Chudnovsky). Essential for correctly setting precision margins, avoiding rounding errors, and optimizing speed. Last updated 2024; maintained by MikeMcl.  
## MIT License

# QuickChart API Reference
## https://quickchart.io/documentation/
Official documentation for QuickChart’s HTTP chart-rendering API, including JSON schema for line and bar charts, style customization, and integration examples in Node.js. Critical for automating convergence and distribution visualizations (PNG output) within CLI and HTTP contexts. Reflects updates as of 2024.  
## Unlicense-like free use terms

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide detailing the text/event-stream MIME type, SSE message formatting, reconnection behavior, and usage examples in Node.js. Provides actionable patterns for implementing real-time π digit streaming endpoints. Continuously updated; content under MDN’s Open Web Docs license.  
## CC BY-SA 2.5

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x routing, middleware, error handling, and response streams. Key for building HTTP endpoints (/pi, /benchmark, /pi/stream) and parsing query parameters securely. Official docs maintained under MIT License.  
## MIT License

# Node.js worker_threads
## https://nodejs.org/api/worker_threads.html
Official Node.js documentation for the worker_threads module, covering Worker class, message passing, thread pool considerations, and performance implications. Fundamental for implementing parallel π computation and partial-sum aggregation. Node.js v20 reference; under Node.js License.  
## Node.js License

# Node.js FS Promises
## https://nodejs.org/api/fs.html#fs_fs_promises_writefile_file_data_options
Documentation of the fs.promises API, with emphasis on atomic write strategies (temporary file + rename) to ensure safe export and caching of π results. Official Node.js v20 docs.  
## Node.js License

# Node.js perf_hooks
## https://nodejs.org/api/perf_hooks.html
Official docs for performance measurement in Node.js, including high-resolution timers, PerformanceObserver, and eventLoopUtilization metrics. Enables in-depth diagnostics of compute, I/O, and event-loop behavior. Node.js v20 reference.  
## Node.js License

# cli-progress
## https://github.com/cli-progress/cli-progress
GitHub repository and API docs for cli-progress, a flexible console progress bar library. Guides integration of live feedback for long-running π calculations and benchmarks. Active project licensed under MIT.  
## MIT License

# zod
## https://github.com/colinhacks/zod
Schema validation library docs for Zod, covering declarative input schemas, refinements, and error formatting. Crucial for CLI flag validation and script schema enforcement. Maintained under MIT License.  
## MIT License

# js-yaml
## https://www.npmjs.com/package/js-yaml
Official npm package documentation for js-yaml, detailing YAML parsing and stringification APIs, schema customization, and security considerations. Essential for implementing scripting mode with YAML support. Last published 2024; content under BSD-2-Clause.  
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for configuration file discovery and parsing (JSON, YAML, JS). Explains search order, caching, and error handling. Key for the PI Configuration feature to load defaults before CLI parsing. Last updated 2024; MIT License.  
## MIT License

# MDN BigInt & Number Conversion
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN reference for JavaScript BigInt and Number.toString(radix), detailing syntax, performance, and edge cases. Guides implementation of hexadecimal and binary π representations (BBP extraction, base conversion). Content under CC BY-SA 2.5.  
## CC BY-SA 2.5

# Bailey–Borwein–Plouffe formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Wikipedia entry on the BBP algorithm, including series derivation, complexity analysis, and pseudocode for extracting arbitrary hexadecimal π digits without computing preceding digits. Core reference for the extractPiHex feature. CC BY-SA 3.0.  
## CC BY-SA 3.0

# mpmath π module
## https://mpmath.org/doc/current/pi.html
Documentation for mpmath’s π routines in Python, covering algorithmic choices, convergence rates, and performance benchmarks. Offers comparative insight for optimizing JavaScript implementations. Last updated 2023; BSD License.  
## BSD License

# Node.js AbortController
## https://nodejs.org/api/globals.html#class-abortcontroller
Official Node.js documentation for the global AbortController and AbortSignal classes. Explains usage patterns for creating controllers, listening for abort events, and integrating signal-based cancellation into long-running operations (e.g., π calculations, HTTP requests). Essential for implementing the --timeout CLI feature and graceful abort logic in async flows. Node.js v20 reference; highly authoritative.  
## Node.js License

# Node.js process.memoryUsage
## https://nodejs.org/api/process.html#process_memoryusage
Documentation of the process.memoryUsage API, detailing heapUsed, heapTotal, rss, and other memory metrics. Critical for the Diagnostics feature to capture and report memory consumption before and after π computations and other operations. Node.js v20 reference; under Node.js License.  
## Node.js License