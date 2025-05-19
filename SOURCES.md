# Gauss–Legendre Algorithm
## https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
The Gauss–Legendre algorithm is an iterative method for computing π that doubles the number of correct digits on each step by maintaining arithmetic–geometric mean sequences. This entry details the convergence properties, error bounds, and pseudocode, offering the core recurrence relations and high-precision arithmetic considerations. It addresses implementation needs for arbitrary-precision loops and provides complexity analysis (O(N log N) multiplication cost), directly applicable to a BigInt-based JS implementation.
## CC BY-SA 3.0

# Spigot Algorithm for π
## https://en.wikipedia.org/wiki/Spigot_algorithm_for_%CF%80
This resource describes the digit-extraction (spigot) algorithm of Rabinowitz & Wagon for generating π one digit at a time with O(N^2) complexity and low memory overhead. It includes the mathematical derivation, implementation pseudocode, and optimizations to reduce intermediate growth. Useful for direct translation into JavaScript using native BigInt arithmetic, with actionable insights on buffer sizing and digit streaming.
## CC BY-SA 3.0

# ECMAScript BigInt
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
MDN’s reference provides a comprehensive overview of the BigInt type in modern JavaScript: literal notation, arithmetic operators, conversion methods, and interoperation with Number types. It highlights pitfalls (e.g., mixing with Number), performance considerations, and gives code examples. Essential for validating that native BigInt suffices for high-precision routines without external libraries.
## CC BY-SA 2.5

# ECMAScript Language Specification: BigInt
## https://tc39.es/ecma262/#sec-numeric-types-number-tobigint
The official ECMAScript spec section defines the BigInt abstract operations, conversion semantics, and operator overloading rules. It is authoritative for implementation details, ensuring correctness when designing custom arithmetic loops and understanding edge-case behavior (e.g., division, modulo) in Node.js environments.
## CC BY 3.0

# node-canvas
## https://github.com/Automattic/node-canvas
The Automattic node-canvas library brings the Canvas API to Node.js, supporting text rendering, font metrics, and PNG output. The README and examples demonstrate how to set up fonts, draw monospaced text at 24px, and produce Buffer-backed PNG streams. Critical for implementing the π-digits-to-PNG feature end-to-end, including DPI settings and buffer export.
## MIT

# PNG Specification (PNG 1.2)
## http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html
The PNG 1.2 specification lays out the file format structure, chunk types, compression (DEFLATE), and palette/indexed-color modes. Understanding the binary layout can aid in validating that the canvas package output conforms and troubleshooting file corruption issues. Publicly available technical standard for deep debugging.
## Public Domain

# V8 BigInt Implementation and Performance
## https://v8.dev/blog/bigint
Google’s V8 team blog explores the C++ underpinnings of BigInt in V8, including internal representation, time complexities of core operations, and benchmarking data. It reveals hotspots and suggestions (e.g., avoiding repeated conversions) helpful for optimizing a pure-JS BigInt π routine on Node 20+.
## Open Source (V8 License)

# Benchmark.js
## https://benchmarkjs.com/
Benchmark.js is a robust library for micro- and macro-benchmarking JavaScript code. Documentation covers suite creation, statistical analysis (mean, margin of error), and asynchronous support. Integrating Benchmark.js tests provides reproducible performance metrics for comparing gauss-legendre vs. spigot algorithms and tracking regressions across versions.
## MIT

# mpmath: Arbitrary-Precision Arithmetic Library for Python
## https://mpmath.org/doc/current/
mpmath is a mature Python library for high-precision computations, including π, logarithms, and transcendental functions. The documentation provides algorithm choices (e.g., Ramanujan series, Chudnovsky), precision management, and performance benchmarks. While in Python, its algorithmic insights and error-handling models can inform JS implementations or alternative strategies.
## BSD 3-Clause

# GNU Multiple Precision Arithmetic (GMP) Manual
## https://gmplib.org/manual/
The GMP manual offers in-depth coverage of large-integer arithmetic routines, memory management, and optimization techniques in C. Reading its chapter on division and multiplication algorithms (Karatsuba, Toom-Cook, FFT) can guide future enhancements to JS BigInt performance or inform when to consider native addons for beyond-BigInt scales.
## LGPL/GPL