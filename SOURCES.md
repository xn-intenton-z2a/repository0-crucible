# Chudnovsky Algorithm – Wikipedia
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
The Chudnovsky algorithm is a fast-converging infinite series for calculating π to millions of digits. It details the mathematical derivation, convergence rate, and implementation considerations essential for high-precision computation using arbitrary-precision arithmetic. This source provides direct pseudocode and complexity analysis, informing optimized JavaScript BigInt implementations. Last revised June 2024; highly authoritative under community peer-review.
## License: CC BY-SA 3.0

# Pi Computation Algorithms – Wikipedia
## https://en.wikipedia.org/wiki/Pi#Algorithms
Comprehensive overview of major π calculation algorithms, including the Chudnovsky series, Bailey–Borwein–Plouffe (BBP) digit-extraction method, and Machin-like arctangent formulas. Explains convergence properties, implementation trade-offs, and pseudocode examples for each approach. Enables informed selection and comparative benchmarking in both CLI and HTTP contexts. Last revised May 2024.
## License: CC BY-SA 3.0

# Node.js BigInt Documentation
## https://nodejs.org/api/bigint.html
Official Node.js reference for the built-in BigInt type, covering syntax, arithmetic operations, and performance characteristics. Highlights precision limits, conversion utilities, and best practices for high-precision algorithms like Chudnovsky. Essential for implementing deterministic π computations without external dependencies. Last updated April 2024.
## License: CC BY-4.0

# Canvas (node-canvas)
## https://github.com/Automattic/node-canvas
Primary library for server-side Canvas drawing in Node.js. Covers installation, API for creating and manipulating Canvas elements, pixel-level buffer access, and image exporting. Includes performance tuning tips crucial for `renderPiImage` and streaming PNGs directly to HTTP responses. 
## License: MIT

# D3-Scale-Chromatic
## https://github.com/d3/d3-scale-chromatic
Provides a suite of perceptually uniform color schemes via D3’s scale API. Documentation includes API reference, usage examples, and guidelines for selecting palettes that map π digit values to meaningful gradients. Directly applicable for building custom `--scheme` options. 
## License: BSD-3-Clause

# Commander.js CLI Framework
## https://github.com/tj/commander.js
A widely adopted Node.js library for parsing command-line arguments. Details option definitions, default values, validation hooks, and dynamic help generation. Enables robust implementation of flags like `--digits`, `--visualize`, `--algorithm`, `--distribution`, and `--cache` with clear error messaging. 
## License: MIT

# Vitest Testing Framework
## https://vitest.dev/
Modern, fast testing framework for Vite and Node.js. Documentation outlines unit and E2E testing patterns, mocking, coverage reporting, and performance testing utilities. Critical for validating `calculatePi`, `renderPiImage`, CLI behaviors, and HTTP endpoints. 
## License: MIT

# Node.js Performance Hooks API
## https://nodejs.org/api/perf_hooks.html
Describes Node’s built-in performance measurement APIs (PerformanceObserver, performance.now) for precise timing and resource monitoring. Essential for implementing the `--benchmark` feature, capturing execution time, and memory usage. Last updated April 2024.
## License: CC BY-4.0

# PNG (Portable Network Graphics) Specification
## https://www.w3.org/TR/PNG/
Official W3C spec defining the PNG file format, covering chunk structure, color types, compression methods, and metadata conventions. Provides the technical background necessary to troubleshoot image export and optimize Canvas streaming. 
## License: W3C Software Notice and License

# Node.js HTTP Module
## https://nodejs.org/api/http.html
Official Node.js documentation for the built-in HTTP module. Covers server creation, request/response handling, headers, status codes, and streaming. Fundamental for building the `--serve` feature and endpoints like `/pi`, `/visualize`, and `/distribution`. 
## License: CC BY-4.0

# Node.js URL Module
## https://nodejs.org/api/url.html
Details the WHATWG-compliant URL class and legacy URL API for parsing, formatting, and validating URLs. Crucial for extracting query parameters (`digits`, `algorithm`, `width`, `scheme`, `cache`) in HTTP handlers. 
## License: CC BY-4.0

# Node.js Streams API
## https://nodejs.org/api/stream.html
Documentation of the Stream interface for efficient, backpressure-aware handling of binary and text data. Vital for piping Canvas PNG output directly to HTTP responses or file streams with minimal overhead. 
## License: CC BY-4.0

# Node.js FS (Promises API)
## https://nodejs.org/api/fs.html#fs_promises_api
Describes the Promise-based file system API for non-blocking read/write operations. Guides implementation of the `--cache` feature, including reading, validating, and updating `.pi-cache.json`, handling errors, and ensuring data integrity. 
## License: CC BY-4.0

# Zod Schema Validation Library
## https://github.com/colinhacks/zod#readme
Zod is a TypeScript-first schema declaration and validation library. Its documentation covers schema creation, parsing, inference, and error handling. Using Zod simplifies robust validation of CLI arguments and HTTP request parameters. 
## License: MIT

# JavaScript Typed Arrays – MDN
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
Overview of JavaScript TypedArray objects for efficient handling of binary data buffers (Uint8ClampedArray, Uint32Array, etc.). Instructive for low-level pixel buffer manipulation when rendering π visualizations and optimizing memory usage. 
## License: CC BY-SA 2.5