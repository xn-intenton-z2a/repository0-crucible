# Node.js Platform & Performance
## https://nodejs.org/api/
Comprehensive reference to Node.js core APIs including file I/O (fs), HTTP server and client (http, https), streams (stream), URL handling (url), performance measurement hooks (perf_hooks), and ECMAScript module system (ESM). Covers binary data handling, event loop diagnostics, and best practices for high-throughput, low-latency services. Last updated June 2024; authoritative as the official Node.js documentation under the OpenJS Foundation.
## License: MIT-like

# CLI & Terminal Utilities
## https://github.com/substack/minimist
Parser for CLI flags supporting boolean, string, and default values. Essential for decoding --calculate-pi, --benchmark-pi, --serve, and other command-line options with minimal overhead and no external dependencies.
## https://github.com/chalk/chalk
Lightweight library for styling terminal output with ANSI escape codes. Enables colorized logs, emphasis, and structured error messaging in the CLI.
## https://github.com/AndiDittrich/Node.CLI-Progress
Flexible progress bar rendering for long-running operations. Supports custom formatting, multiple bars, and real-time updates during π computation or benchmarks. Maintained under MIT.
## License: MIT

# Configuration & Validation Libraries
## https://github.com/nodeca/js-yaml#readme
YAML file parsing and stringifying for hierarchical configurations. Critical for user-provided YAML settings in config files. (MIT)
## https://github.com/motdotla/dotenv#readme
Loads environment variables from .env into process.env. Simplifies secret management and configuration overrides. (MIT)
## https://github.com/colinhacks/zod#readme
Type-safe schema validation and parsing at runtime. Ensures CLI inputs and HTTP payloads conform to expected shapes with clear error reporting. (MIT)
## https://json-schema.org/specification.html
Formal specification for JSON Schema v2020-12. Defines structure, types, and validation rules for JSON documents. Foundational for Ajv and schema-driven API contracts. (CC0 1.0)
## License: js-yaml (MIT), dotenv (MIT), zod (MIT), JSON Schema (CC0 1.0)

# Testing Frameworks & HTTP Tools
## https://vitest.dev/guide/
Next-generation test runner with built-in mocking, watch mode, native ESM support, and snapshot testing. Streamlines unit, integration, and E2E tests for CLI and API features. (v3.1.3, MIT)
## https://github.com/visionmedia/supertest
High-level abstraction for HTTP assertions against Express (or HTTP) servers. Simplifies testing of /calculate, /benchmark, and metrics endpoints with rich chaining API. (MIT)
## License: MIT

# Web Frameworks & API Specifications
## https://expressjs.com/en/4x/api.html
Minimalist web framework offering routing, middleware, streaming responses, and plugin ecosystem. Drives the HTTP API for π services with proven scalability in production. (Express 4.x, maintained by the OpenJS Foundation)
## https://spec.openapis.org/oas/v3.0.3
Official OpenAPI v3.0.3 specification. Enables API design-first approach, automated documentation generation, request validation, and client code generation. (CC0 1.0)
## https://github.com/ajv-validator/ajv
Fast JSON Schema validator for Node.js and browsers. Integrates with OpenAPI schemas to enforce request and response contracts at runtime. (MIT)
## License: Express & Ajv (MIT), OpenAPI Spec (CC0 1.0)

# Monitoring & Benchmarking Tools
## https://github.com/siimon/prom-client#readme
Instrumentation library providing Prometheus metric types (Counter, Gauge, Histogram, Summary) and HTTP endpoint exposure. Vital for real-time observability of π calculations. (MIT)
## https://benchmarkjs.com/
High-resolution benchmarking suite for JavaScript. Offers statistical reporting, asynchronous support, and customizable benchmarks crucial for comparing π algorithms. (Last release Jan 2024; MIT)
## License: MIT

# Arithmetic & Numeric Libraries
## https://github.com/MikeMcl/decimal.js#readme
Arbitrary-precision decimal arithmetic for base-10 calculations. Implements configurable precision, rounding, and performance knobs to support Chudnovsky and related series. (MIT)
## https://mathjs.org/docs/datatypes/bignumber.html
BigNumber support in Math.js with robust operator overloading, unit support, and matrix operations. Alternative for decimal.js when vectorized operations are needed. (Apache-2.0)
## https://github.com/davidbau/seedrandom
Seedable pseudorandom number generator for reproducible randomness. Useful when introducing randomness in benchmarking or probabilistic algorithms. (MIT)
## License: decimal.js (MIT), math.js (Apache-2.0), seedrandom (MIT)

# mpmath Python Library Documentation
## https://mpmath.org/doc/
In-depth guide to mpmath’s real and complex arithmetic algorithms including Chudnovsky, Gauss–Legendre, and BBP series. Covers binary splitting, convergence analysis, and Python code examples. (v1.2.1, BSD-3-Clause)

# Visualization & Template Tools
## https://www.chartjs.org/docs/latest/
Official Chart.js docs for constructing line, bar, and scatter plots. Describes configuration options, plugin architecture, and data-driven updates suitable for performance charts. (CC BY 4.0)
## https://github.com/Automattic/node-canvas
Node bindings for Cairo graphics library. Enables creation of images (PNG, JPEG) in pure JavaScript, powering server-side chart rendering. (MIT)
## https://github.com/SeanSobey/ChartjsNodeCanvas
Wrapper to integrate Chart.js with node-canvas. Simplifies API to render charts directly in Node processes without a browser. (MIT)
## https://ejs.co/#docs
Embedded JavaScript templating for generating HTML reports and dashboards. Lightweight syntax and partials facilitate dynamic report pages. (MIT)
## License: MIT

# GMP & MPFR Manuals
## https://gmplib.org/manual/
Comprehensive manual for GNU MP (GMP) library detailing multi-precision integer algorithms, limb management, and low-level tuning. Serves as inspiration for JavaScript BigInt optimizations. (LGPL v3)
## https://www.mpfr.org/mpfr-current/manual.html
Official MPFR manual covering multi-precision floating-point with well-defined rounding semantics, error bounds, and performance guidelines. (LGPL v3)
## License: GNU LGPL v3

# JavaScript BigInt API
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN reference for native BigInt type, including syntax, methods, and interoperability with Number. Crucial for optimized integer-only pi routines. (CC BY-SA 2.5)

# Chudnovsky Algorithm Overview
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Authoritative mathematical description of the Chudnovsky series for π. Includes convergence proofs, binary splitting pseudo-code, and performance considerations for high-precision implementations. (CC BY-SA 3.0)

# BBP Formula for π
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Detailed exposition of the BBP digit-extraction algorithm that computes arbitrary hexadecimal digits of π without prior digits. Highlights memory-efficient implementation strategies. (CC BY-SA 3.0)

# Gauss–Legendre Algorithm
## https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
Description of the iterative Gauss–Legendre algorithm for π, focusing on arithmetic-geometric mean (AGM) convergence. Includes complexity analysis and numerical stability tips for high-precision runs. (CC BY-SA 3.0)

# Binary Splitting Method
## https://en.wikipedia.org/wiki/Binary_splitting
General binary splitting framework for fast evaluation of series. Explains divide-and-conquer approach, cost analysis, and implementation patterns that reduce multiplication overhead in π algorithms. (CC BY-SA 3.0)

# Prometheus Exposition Formats
## https://prometheus.io/docs/instrumenting/exposition_formats/
Specification of the Prometheus text and OpenMetrics exposition formats. Defines metric naming conventions, data types, and best practices for instrumenting and exposing π computation metrics. (Apache-2.0)
