# Node.js Platform & Performance
## https://nodejs.org/api/
Comprehensive reference to Node.js built-in modules including file I/O (`fs`), HTTP server and client (`http`, `https`), streams (`stream`), URL handling (`url`), performance measurement (`perf_hooks`), and the ECMAScript module system (ESM). Also includes guidance on binary data and event loop monitoring for precise performance instrumentation.
## https://nodejs.org/api/worker_threads.html
Official documentation for CPU-bound parallelism using worker threads in Node.js, covering thread spawning, message passing (`MessagePort`), `SharedArrayBuffer`, and best practices for avoiding event-loop blockage. Crucial for offloading intensive π computation tasks.
## License: MIT-like

# CLI & Terminal Utilities
## https://github.com/substack/minimist
## https://github.com/chalk/chalk
## https://github.com/AndiDittrich/Node.CLI-Progress
Suite for parsing CLI flags (`minimist`), styling terminal output (`chalk`), and rendering progress bars (`cli-progress`). Enables robust handling of options (`--calculate-pi`, `--benchmark-pi`, `--output-dir`), styled logs, and real-time feedback during lengthy computations.
## MIT License

# Configuration & Validation Libraries
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
## https://github.com/colinhacks/zod#readme
## https://json-schema.org/specification.html
Tooling for parsing YAML (`js-yaml`), `.env` files (`dotenv`), runtime schema enforcement (`zod`), and formal JSON Schema contracts. Ensures configuration correctness, safe CLI inputs, and validated HTTP payloads.
## License: js-yaml (MIT), dotenv (MIT), zod (MIT), JSON Schema (CC0 1.0)

# Testing Frameworks & HTTP Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
`Vitest` offers fast unit and integration testing with ESM support, mocks, and coverage, while `Supertest` facilitates end-to-end HTTP testing against Express routes. Together they validate algorithm accuracy, CLI behavior, and API stability.
## MIT License

# Web Frameworks & API Specifications
## https://expressjs.com/en/4x/api.html
## https://spec.openapis.org/oas/v3.0.3
## https://github.com/ajv-validator/ajv
Minimal and flexible web framework (`Express`) for routing, middleware, and streaming responses; complemented by the OpenAPI Specification for defining RESTful APIs and `Ajv` for JSON Schema validation. Powers `/pi`, `/benchmark`, and `/metrics` endpoints with documented contracts.
## License: Express & Ajv (MIT), OpenAPI Spec (CC0 1.0)

# Monitoring & Benchmarking Tools
## https://github.com/siimon/prom-client#readme
## https://benchmarkjs.com/
Guides for instrumenting Node.js applications with Prometheus metrics and high-resolution benchmarking of π algorithms. Covers metrics types, exposing `/metrics` endpoints, statistical analysis, and reproducible performance comparisons.
## MIT License

# Arithmetic & Numeric Libraries
## https://github.com/MikeMcl/decimal.js#readme
## https://mathjs.org/docs/datatypes/bignumber.html
## https://github.com/davidbau/seedrandom
Libraries for arbitrary-precision decimals (`decimal.js`), big numbers (`math.js`), and seedable random number generation (`seedrandom`). Provide configurable precision, rounding modes, and deterministic randomness for algorithm verification and benchmarking.
## License: decimal.js (MIT), math.js (Apache-2.0), seedrandom (MIT)

# mpmath Python Library Documentation
## https://mpmath.org/doc/
Extensive documentation for `mpmath`, a Python library for real and complex floating-point arithmetic with arbitrary precision. Covers implementations of Chudnovsky, Gauss–Legendre, and BBP formulas, binary splitting, and benchmarks. Provides code examples and performance tips.
## BSD-3-Clause

# Visualization & Template Tools
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas
## https://github.com/SeanSobey/ChartjsNodeCanvas
## https://github.com/joshmarinacci/pureimage#readme
## https://ejs.co/#docs
Combined documentation for server-side chart generation and HTML templating using Chart.js, Canvas, and EJS. Enables automated creation of performance graphs in PNG format and dynamic report pages.
## MIT License

# GMP & MPFR Manuals
## https://gmplib.org/manual/
## https://www.mpfr.org/mpfr-current/manual.html
Manuals for the GNU MP (GMP) and MPFR libraries, detailing multi-precision integer and floating-point algorithms, memory management, binary splitting, rounding modes, and performance tuning. Inform design of high-performance arbitrary-precision operations.
## License: GNU LGPL v3

# JavaScript BigInt API
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
Documentation for JavaScript's built-in `BigInt`, including syntax, operations, performance considerations, and interoperability with other numeric types. Essential for native arbitrary-precision integer arithmetic without external dependencies.
## License: CC BY-SA 2.5

# Chudnovsky Algorithm Overview
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Comprehensive explanation of the Chudnovsky series for calculating π, including series expansion, convergence analysis, and binary splitting optimizations. Provides mathematical foundations and pseudocode essential for implementing high-performance π computation.
## License: CC BY-SA 3.0

# BBP Formula for π
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Details the Bailey–Borwein–Plouffe (BBP) formula, enabling direct extraction of hexadecimal digits of π. Covers series definition, digit-extraction algorithms, and performance trade-offs for memory-efficient implementations.
## License: CC BY-SA 3.0