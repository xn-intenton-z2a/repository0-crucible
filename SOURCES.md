# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library used for all π computations in this project. Covers configuration of precision, rounding modes, performance considerations, and detailed examples for high-precision series algorithms (Machin, Gauss–Legendre, Chudnovsky). Essential for correctly setting precision margins, avoiding rounding errors, and optimizing speed. Last updated 2024; highly authoritative as the library’s official site.
## MIT License

# QuickChart API Reference
## https://quickchart.io/documentation/
Official documentation for QuickChart’s HTTP chart-rendering API. Includes JSON schema for line, bar, and multi-series charts, style customization, time-series support, and integration examples in Node.js. Critical for automating convergence and distribution visualizations (PNG output) within CLI and HTTP contexts. Reflects updates as of 2024; highly authoritative for chart configuration details.
## Unlicense-like free use terms

# Chart.js Documentation
## https://www.chartjs.org/docs/latest/
Authoritative guide to Chart.js v4, the underlying visualization library used by QuickChart. Details core chart types (line, bar, scatter), dataset and axis configuration, plugin architecture, animations, and event hooks. Provides deep insight into chart customization, responsive design options, and performance tuning, enabling advanced graph styling and efficient data updates. Licensed under MIT; last updated 2024.
## MIT License

# QuickChart.js Client Library
## https://github.com/typpo/quickchart-js
Official JavaScript client library for QuickChart.io, providing a fluent API to build chart configurations, request rendered images or URLs, and handle SSL, custom fonts, and advanced rendering options. Offers convenient promise-based methods for Node.js and browser environments, simplifying integration without manual HTTP calls. Last updated 2024; widely used in production; MIT License.
## MIT License

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive overview of Express 4.x routing, middleware patterns, error handling, and response streaming. Key for building RESTful endpoints, query parsing, and middleware integrations in the HTTP API and server-sent events infrastructure. Official docs maintained under MIT License.
## MIT License

# Server-Sent Events (SSE)
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN guide detailing the text/event-stream MIME type, SSE message formatting, reconnection behavior, and usage examples in Node.js. Provides actionable patterns for implementing real-time π digit streaming endpoints. Continuously updated; content under MDN’s Open Web Docs license.
## CC BY-SA 2.5

# Node.js API Reference
## https://nodejs.org/api/
Comprehensive reference for Node.js core modules in v20, including worker_threads (parallel computation), fs.promises (atomic file operations), perf_hooks (high-resolution timing), process.memoryUsage (diagnostics), and AbortController (operation timeouts). Essential for threading, file I/O, performance measurement, and cancellation patterns. Licensed under Node.js License.
## Node.js License

# cli-progress
## https://github.com/cli-progress/cli-progress
GitHub repository and API docs for cli-progress, a flexible console progress bar library. Guides integration of live feedback for long-running π calculations and benchmarks, including custom formatting, multi-bar support, and color themes. Active project licensed under MIT.
## MIT License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, asynchronous parsing, and error formatting. Crucial for validating CLI flags, scripting mode schemas, and configuration inputs. Maintained under MIT License.
## MIT License

# js-yaml
## https://www.npmjs.com/package/js-yaml
Official npm package documentation for js-yaml, detailing YAML parsing and stringification APIs, custom schema creation, and security considerations. Essential for implementing scripting mode with YAML support. Last published 2024; content under BSD-2-Clause.
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for configuration file discovery (JSON, YAML, JS), search order, caching strategies, and error handling. Key for PI Configuration feature to load defaults before CLI parsing. Last updated 2024; MIT License.
## MIT License

# MDN BigInt & Number Conversion
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN reference for JavaScript BigInt and Number.toString(radix), detailing syntax, performance, edge cases, and cross-environment considerations. Guides implementation of hexadecimal and binary π representations (BBP extraction, base conversion). Content under CC BY-SA 2.5.
## CC BY-SA 2.5

# Bailey–Borwein–Plouffe formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Wikipedia entry on the BBP algorithm, including series derivation, complexity analysis, and pseudocode for extracting arbitrary hexadecimal π digits without computing preceding digits. Core reference for the extractPiHex feature. CC BY-SA 3.0.
## CC BY-SA 3.0

# Chudnovsky algorithm
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Detailed Wikipedia article on the Chudnovsky series for π, covering the mathematical derivation, convergence rate, and implementation pseudocode. Offers essential guidance on implementing high-performance arithmetic loops, factorial handling, and convergence thresholds for Chudnovsky-based π computation. CC BY-SA 3.0.
## CC BY-SA 3.0

# MPFR & GMP Manuals
## https://www.mpfr.org/mpfr-current/mpfr.html
Manual for MPFR, a foundational C library for multiple-precision floating-point arithmetic, covering function references, rounding modes, performance optimizations, and configuration options.
## https://gmplib.org/manual/
Manual for GMP, the GNU multiple-precision library for integer arithmetic, including API details, algorithmic strategies, and low-level optimizations. Useful for understanding and benchmarking arbitrary-precision arithmetic strategies. Last updated 2024.
## LGPL License

# Pi Delivery API Reference
## https://api.pi.delivery/v1/documentation
Public REST API for retrieving π digits with support for offset, digit count, and base conversion. Demonstrates practical patterns for HTTP-based digit access and can inform the repository’s HTTP API design. No authentication required; usage subject to service terms.
## Public API (free to use without authentication)
