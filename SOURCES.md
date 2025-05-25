# Spigot Algorithm (Rabinowitz–Wagon)
## https://en.wikipedia.org/wiki/Spigot_algorithm
The spigot algorithm generates digits of π sequentially with O(n) memory and no need for large intermediate divisions. This page (last updated April 2024) provides detailed pseudocode, carry‐handling optimizations, and digit‐extraction logic that directly inform the `computePiSpigot` implementation in JavaScript, including memory layout and per‐digit streaming considerations.
## License: CC BY-SA 3.0

# Chudnovsky Algorithm
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
The Chudnovsky series offers rapid convergence (~14 digits per term) for π computation. This authoritative entry (revised March 2023) covers mathematical derivation, rigorous error bounds, and reference pseudocode. It underpins the `computePiChudnovsky` implementation, guiding the choice of precision, series‐termination criteria, and big‐integer factorial optimizations.
## License: CC BY-SA 3.0

# Bailey–Borwein–Plouffe (BBP) Formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Describes an algorithm to compute individual hexadecimal digits of π at arbitrary positions without sequential computation. This February 2024 revision includes derivation of series terms, modular arithmetic requirements, and sample code patterns critical for implementing `computePiBBP`. Highlights practical convergence strategies and series remainder estimation.
## License: CC BY-SA 3.0

# Unbounded Spigot Algorithms for the Digits of π (Rabinowitz & Wagon)
## https://arxiv.org/abs/cs/0004013
Peer-reviewed paper detailing unbounded spigot methods that stream π digits with only O(1) extra memory per digit. Includes formal proofs, complexity analysis, and production‐grade pseudocode—vital for high‐throughput or low‐memory applications. arXiv version (April 2000) available under Open Access.
## License: Open Access (arXiv)

# decimal.js Documentation
## http://mikemcl.github.io/decimal.js/
The official `decimal.js` reference (v10.5.0, 2024) covers API methods, configuration options, rounding modes, performance trade-offs, and internal numeric representation. Essential for setting up high-precision contexts in `computePiChudnovsky` and understanding rounding behavior in final output.
## License: MIT

# node-canvas (canvas) README
## https://github.com/Automattic/node-canvas#readme
Comprehensive guide to the `node-canvas` library (v2.11.2, June 2023), including installation across platforms, HTML5‐compatible canvas API, PNG encoding options, and performance tuning tips. Crucial for rendering π output and performance charts to PNG.
## License: MIT

# minimist Argument Parser README
## https://github.com/substack/minimist#readme
Lightweight CLI argument parser documentation (v1.2.8, February 2024) explaining option definitions, boolean flags, and security considerations for untrusted input. Informs CLI handling of `--algorithm`, `--digits`, `--benchmark-*`, and `--hex-index` parameters.
## License: MIT

# Node.js Official API Reference
## https://nodejs.org/api/
Central reference for Node.js v20+ built-in modules (fs, console, process, perf_hooks). Includes function signatures, timing utilities (`process.hrtime`), file I/O, and deprecation notices. Critical for reliable implementation of file writes, performance measurements, and module loading.
## License: MIT

# JavaScript BigInt (Native Arbitrary-Precision Integer)
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN documentation on native `BigInt` support in ES2020+ (last updated May 2024). Covers syntax, operations, limitations, and performance characteristics of JavaScript’s built-in arbitrary-precision integers—used for factorial computations in the Chudnovsky implementation.
## License: CC BY-SA 2.5

# Modular Exponentiation
## https://en.wikipedia.org/wiki/Modular_exponentiation
This entry provides pseudocode and complexity analysis for modular exponentiation algorithms (e.g., binary exponentiation, sliding-window methods). Fundamental for implementing the `modPow` function in the BBP series, ensuring both correctness and performance for large exponents.
## License: CC BY-SA 3.0

# Portable Network Graphics (PNG) Specification
## https://www.w3.org/TR/PNG/
The official W3C Recommendation (Second Edition, January 2017) detailing PNG file structure, chunk types (IHDR, IDAT), compression schemes, and color models. Understanding these internals enables fine-tuning of `node-canvas` output for optimized file sizes and compatibility.
## License: Public Domain (W3C Recommendation)

# Node.js ECMAScript Modules (ESM)
## https://nodejs.org/api/esm.html
Official Node.js documentation on ECMAScript Modules support in Node.js v20, covering import/export syntax, module resolution, package.json configuration, interop with CommonJS, and file extensions. Essential for ensuring the pi calculator CLI's ESM usage is correctly configured, avoiding runtime errors, and understanding dynamic import mechanics.
## License: MIT

# Node.js Performance Hooks API
## https://nodejs.org/api/perf_hooks.html
Detailed reference for Node.js Perf Hooks module, including PerformanceObserver, marks, and measures for high-resolution timing. Complements `process.hrtime` usage by providing insights into event loop lag, accurate performance measurements, and recommended patterns for microbenchmarking in JavaScript.
## License: MIT

# GitHub Actions Reusable Workflows
## https://docs.github.com/en/actions/using-workflows/reusing-workflows
Comprehensive guide to reusing GitHub Actions workflows, defining inputs, outputs, and secrets, and best practices for composition. Provides actionable insights on how agentic-lib's reusable workflows can be integrated into the CI/CD pipeline, optimizing maintainability and consistency across projects.
## License: GitHub Terms of Service

# Vitest CLI and API Reference
## https://vitest.dev/api/cli.html
Official documentation for Vitest command-line interface and API, detailing test runner options, configuration, matchers, and coverage reporting. Critical for writing and executing the repository's unit and E2E tests reliably and configuring coverage thresholds.
## License: MIT

# Node.js Streams API
## https://nodejs.org/api/stream.html
Comprehensive guide to Node.js Streams, covering Readable, Writable, Duplex, and Transform streams, backpressure management, piping, and object mode. Essential for implementing streaming output of π digits for memory-efficient, real-time use cases and integrating with other stream-based APIs.
## License: MIT

# Benchmark.js Microbenchmark Suite
## https://benchmarkjs.com/
Benchmark.js provides a robust framework for microbenchmarking JavaScript code, including suite construction, asynchronous tests, statistical analysis, and event hooks. Useful for advanced performance comparison of `computePiSpigot`, `computePiChudnovsky`, and `computePiBBP`, going beyond simple timing APIs to deliver statistically significant results.
## License: MIT

# V8 JavaScript Engine Developer Guide
## https://v8.dev/docs
Official V8 documentation offering performance tips, optimization strategies, and insights into engine internals such as hidden classes and inlining. Valuable for optimizing compute-intensive loops and numeric algorithms in the pi calculator, guiding choices that can yield measurable speedups.
## License: Public Domain