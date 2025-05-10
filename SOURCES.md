# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library used for all π computations in this project. It details configuration of precision, rounding modes, performance considerations, and includes extensive examples for high-precision series algorithms (Machin, Gauss–Legendre, Chudnovsky). Essential for correctly setting precision margins, avoiding rounding errors, and optimizing speed in core algorithms. Last updated 2024; highly authoritative as the library’s official site.
## MIT License

# QuickChart API Reference
## https://quickchart.io/documentation/
Official documentation for QuickChart’s HTTP chart-rendering API. It provides the JSON schema for constructing line, bar, and multi-series charts, customization of styling options, time-series support, and integration examples in Node.js. Critical for automating convergence and distribution visualizations (PNG output) within CLI and HTTP contexts. Reflects updates as of 2024; highly authoritative for chart configuration details.
## Unlicense-like free use terms

# QuickChart.js Client Library
## https://github.com/typpo/quickchart-js
Official JavaScript client library for QuickChart.io, providing a fluent API to build chart configurations, request rendered images or URLs, and handle SSL, custom fonts, and advanced rendering options. Offers promise-based methods for Node.js and browser environments, simplifying integration without manual HTTP calls. Last updated 2024; widely used in production.
## MIT License

# Node.js Readline
## https://nodejs.org/api/readline.html
Official documentation for the Node.js Readline module, which provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time. Covers creating interactive prompts, command history, custom completion functions, SIGINT handling, and the asynchronous `question` API. Crucial for implementing the REPL mode in the CLI with robust input parsing and graceful termination. Last updated 2024; authoritative as part of the official Node.js docs.
## Node.js License

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x routing, middleware patterns, error handling, request parsing, and response streaming. Key resource for building the HTTP REST endpoints, configuring JSON and URL-encoded parsers, and integrating server-sent events infrastructure in the HTTP API. Official docs maintained under MIT License.
## MIT License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide detailing the text/event-stream MIME type, SSE message formatting, reconnection behavior, and usage examples in Node.js. Provides actionable patterns for implementing real-time π digit streaming endpoints and handling client disconnects. Continuously updated; content under MDN’s Open Web Docs license.
## CC BY-SA 2.5

# Node.js API Reference
## https://nodejs.org/api/
Comprehensive reference for Node.js core modules in v20, including `worker_threads` (parallel computation), `fs.promises` (atomic file operations), `perf_hooks` (high-resolution timing), `process.memoryUsage` (diagnostics), `AbortController` (operation timeouts), and `readline`. Essential for threading, file I/O, performance measurement, cancellation, and interactive interfaces. Licensed under Node.js License.
## Node.js License

# cli-progress
## https://github.com/cli-progress/cli-progress
GitHub repository and API docs for cli-progress, a flexible console progress bar library. Guides integration of live feedback for long-running π calculations and benchmarks, including custom formatting, multi-bar support, and color themes. Active project licensed under MIT.
## MIT License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, asynchronous parsing, and error formatting. Crucial for validating CLI flags, configuration inputs, and scripting-mode schemas. Maintained under MIT License.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml
Official repository and documentation for js-yaml, detailing YAML parsing and stringification APIs, custom schema creation, and security considerations. Essential for implementing the scripting mode with YAML support and handling configuration files. Last published 2024; content under BSD-2-Clause.
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for configuration file discovery (JSON, YAML, JS), search order, caching strategies, and error handling. Key for the configuration feature to load defaults before CLI parsing. Last updated 2024; MIT License.
## MIT License

# MDN BigInt & Number Conversion
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN reference for JavaScript BigInt and `Number.toString(radix)`, detailing syntax, performance considerations, edge cases, and cross-environment behavior. Guides implementation of hexadecimal and binary π representations (BBP extraction, base conversion). Content under CC BY-SA 2.5.
## CC BY-SA 2.5

# Bailey–Borwein–Plouffe formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Wikipedia entry on the BBP algorithm, including series derivation, complexity analysis, and pseudocode for extracting arbitrary hexadecimal π digits without computing preceding digits. Core reference for the extractPiHex feature. CC BY-SA 3.0.
## CC BY-SA 3.0

# Chudnovsky algorithm
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Detailed Wikipedia article on the Chudnovsky series for π, covering the mathematical derivation, convergence rate, and implementation pseudocode. Offers guidance on high-performance arithmetic loops, factorial handling, and convergence thresholds for Chudnovsky-based π computation. CC BY-SA 3.0.
## CC BY-SA 3.0

# MPFR & GMP Manuals
## https://www.mpfr.org/mpfr-current/mpfr.html
Manual for MPFR, a foundational C library for multiple-precision floating-point arithmetic, covering function references, rounding modes, performance optimizations, and configuration options.
## LGPL License

## https://gmplib.org/manual/
Manual for GMP, the GNU multiple-precision library for integer arithmetic, including API details, algorithmic strategies, and low-level optimizations. Useful for understanding and benchmarking arbitrary-precision arithmetic strategies. Last updated 2024.
## LGPL License

# Pi Delivery API Reference
## https://api.pi.delivery/v1/documentation
Public REST API for retrieving π digits with support for offset, digit count, and base conversion. Demonstrates practical patterns for HTTP-based digit access and can inform the repository’s HTTP API design. No authentication required; usage subject to service terms. Last checked 2024.
## Public API (free to use without authentication)