# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library used for all π computations in this project. Covers configuration of precision, rounding modes, performance considerations, and detailed examples for high-precision series algorithms (Machin, Gauss–Legendre, Chudnovsky). Essential for correctly setting precision margins, avoiding rounding errors, and optimizing speed. Last updated 2024; maintained by MikeMcl.
## MIT License

# QuickChart API Reference
## https://quickchart.io/documentation/
Official documentation for QuickChart’s HTTP chart-rendering API. Includes JSON schema for line, bar, and multi-series charts, style customization, time-series support, and integration examples in Node.js. Critical for automating convergence and distribution visualizations (PNG output) within CLI and HTTP contexts. Reflects updates as of 2024; highly authoritative for chart configuration details.
## Unlicense-like free use terms

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x routing, middleware patterns, error handling, and response streaming. Key for building HTTP endpoints (/pi, /benchmark, /pi/stream, /export, /convergence, /distribution, /search, /hex, /decimal) and parsing query parameters securely. Official docs maintained under MIT License.
## MIT License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide detailing the text/event-stream MIME type, SSE message formatting, reconnection behavior, and usage examples in Node.js. Provides actionable patterns for implementing real-time π digit streaming endpoints. Continuously updated; content under MDN’s Open Web Docs license.
## CC BY-SA 2.5

# Node.js API Reference
## https://nodejs.org/api/
Comprehensive reference for Node.js core modules in v20, including worker_threads (parallel computation), fs.promises (atomic file operations), perf_hooks (high-resolution timing), process (memoryUsage metrics), and global AbortController (cancellation patterns). Provides essential technical specifications and best practices for threading, file I/O, performance measurement, memory diagnostics, and graceful abort logic in long-running operations.
## Node.js License

# cli-progress
## https://github.com/cli-progress/cli-progress
GitHub repository and API docs for cli-progress, a flexible console progress bar library. Guides integration of live feedback for long-running π calculations and benchmarks, including custom formatting, multi-bar support, and color themes. Active project licensed under MIT.
## MIT License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, custom error messages, and asynchronous parsing. Crucial for CLI flag validation, script schema enforcement, and merging config with runtime arguments. Maintained under MIT License.
## MIT License

# js-yaml
## https://www.npmjs.com/package/js-yaml
Official npm package documentation for js-yaml, detailing YAML parsing and stringification APIs, custom schema creation, and security considerations. Essential for implementing scripting mode with YAML support. Last published 2024; content under BSD-2-Clause.
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for configuration file discovery (JSON, YAML, JS), search order, caching strategies, and error handling. Key for the PI Configuration feature to load defaults before CLI parsing. Last updated 2024; MIT License.
## MIT License

# MDN BigInt & Number Conversion
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN reference for JavaScript BigInt and Number.toString(radix), detailing syntax, performance, edge cases, and cross-environment considerations. Guides implementation of hexadecimal and binary π representations (BBP extraction, base conversion). Content under CC BY-SA 2.5.
## CC BY-SA 2.5

# Bailey–Borwein–Plouffe formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Wikipedia entry on the BBP algorithm, including series derivation, complexity analysis, and pseudocode for extracting arbitrary hexadecimal π digits without computing preceding digits. Core reference for the extractPiHex feature. CC BY-SA 3.0.
## CC BY-SA 3.0

# mpmath π module
## https://mpmath.org/doc/current/pi.html
Documentation for mpmath’s π routines in Python, covering algorithmic choices, convergence rates, and performance benchmarks. Offers comparative insight for optimizing JavaScript implementations and benchmarking results. Last updated 2023; BSD License.
## BSD License

# MPFR Manual
## https://www.mpfr.org/mpfr-current/mpfr.html
Official manual for the MPFR library, a C library for correct-rounding multiple-precision floating-point computations. Includes detailed algorithmic descriptions, rounding mode behaviors, and performance tuning options. Useful for understanding low-level implementation details and optimizing arbitrary-precision arithmetic. Last updated 2024; LGPL License.
## LGPL License

# GMP Manual
## https://gmplib.org/manual/
Documentation of the GNU Multiple Precision Arithmetic Library (GMP), focusing on integer, rational, and floating-point routines. Covers function references, performance recommendations, and low-level optimizations. Valuable for insights into high-performance arbitrary-precision arithmetic strategies. Last updated 2024; LGPL License.
## LGPL License

# Pi Delivery API Reference
## https://api.pi.delivery/v1/documentation
Public REST API for retrieving π digits with support for offset, digit count, and base conversion. Demonstrates practical patterns for HTTP-based digit access and can inform your repository’s HTTP API design. No authentication required; usage subject to service terms.
## Public API (free to use without authentication)
