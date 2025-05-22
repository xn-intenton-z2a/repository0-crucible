# Spigot Algorithm (Rabinowitz–Wagon)
## https://en.wikipedia.org/wiki/Spigot_algorithm
The spigot algorithm generates digits of π sequentially without requiring large intermediate factorials or arbitrary-precision divisions. This Wikipedia entry, last updated April 2024, details the algorithmic steps, memory complexity O(n), and pseudocode crucial for implementing computePiSpigot in JavaScript. It highlights carry-handling optimizations and digit-extraction logic directly informing core implementation and performance tuning.
## License: CC BY-SA 3.0

# Chudnovsky Algorithm
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Presents the fast-converging series by the Chudnovsky brothers for π, offering a convergence rate of ~14 digits per series term. Includes mathematical derivation, error bounds, and pseudocode examples. Last revised March 2023, this authoritative source underpins computePiChudnovsky implementation, guiding precision configuration and loop termination criteria.
## License: CC BY-SA 3.0

# Bailey–Borwein–Plouffe (BBP) Formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Introduces the BBP formula for computing binary/hex digits of π at arbitrary positions, enabling non-sequential digit extraction. Covers mathematical derivation and sample code snippets, offering a pathway for future algorithmic extensions in direct digit access. Last updated January 2024.
## License: CC BY-SA 3.0

# Unbounded Spigot Algorithms for the Digits of π (Rabinowitz & Wagon)
## https://arxiv.org/abs/cs/0004013
Peer-reviewed paper providing rigorous proofs for unbounded spigot algorithms that stream π digits with O(1) extra memory per digit. The arXiv version (April 2000) includes full algorithm analysis, complexity proofs, and pseudocode vital for advanced, production-grade implementations.
## License: Open Access (arXiv)

# decimal.js Documentation
## http://mikemcl.github.io/decimal.js/
Official documentation for decimal.js library (v10+), covering configuration, arithmetic methods, rounding modes, and performance considerations. Latest published (2024) under MIT license, this source is essential for configuring high-precision contexts and understanding internal operations in computePiChudnovsky.
## License: MIT

# node-canvas (canvas) README
## https://github.com/Automattic/node-canvas#readme
Comprehensive README for node-canvas library (v2+), detailing installation nuances across platforms, an HTML5-compatible canvas API, PNG encoding, and performance tuning. Updated June 2023, MIT licensed. Guides rendering logic and resource management for PNG output in the CLI tool.
## License: MIT

# minimist Argument Parser README
## https://github.com/substack/minimist#readme
Minimalist argument parser for Node.js CLI tools. This README (last updated February 2024) explains parsing strategies, option definitions, and security considerations for untrusted inputs. Informs the CLI option handling and default behaviors in main.js.
## License: MIT

# Node.js Official API Reference
## https://nodejs.org/api/
Central reference for Node.js built-in modules including fs (file I/O), console (timing/logging), ESM module loader, and performance hooks. Current LTS v20 docs (2024) provide method signatures, usage examples, and deprecation notes critical for implementing reliable file operations, diagnostics, and module imports.
## License: MIT

# big.js Arbitrary-Precision Decimal Arithmetic
## https://github.com/MikeMcl/big.js#readme
Documentation for big.js (v6+), a compact library for arbitrary-precision decimal arithmetic in JavaScript. Compares API design and performance trade-offs with decimal.js. Updated May 2023, MIT licensed. Useful for evaluating alternative big-number packages in high-precision contexts.
## License: MIT

# agentic-lib GitHub Workflows
## https://github.com/xn-intenton-z2a/agentic-lib#readme
The agentic-lib repository provides reusable GitHub Actions workflows for CI/CD automation, including scheduling, parameterization, and container-based tasks. This README (last updated April 2024) explains workflow inputs, outputs, and best practices used in this template, essential for understanding and extending automated build, test, and deployment processes.
## License: Apache-2.0