# Node.js Core APIs
## https://nodejs.org/api/
Comprehensive reference to built-in Node.js modules including file I/O (`fs`), networking (`http`, `https`), streams, URL handling (`url`), process utilities (`process`), and performance timing (`performance.now()`). Essential for implementing CLI commands, HTTP endpoints (`/pi`, `/benchmark`), streaming modes, diagnostics, and core module architectures. Last updated June 2024; maintained by the Node.js Foundation under an MIT-like license.
## Node.js Foundation (MIT-like)

# CLI & Terminal Utilities
## https://github.com/substack/minimist
## https://github.com/chalk/chalk
## https://github.com/AndiDittrich/Node.CLI-Progress
Unified suite for command-line argument parsing, ANSI styling, and dynamic progress bars. `minimist` enables robust flag and option handling (`--algorithm`, `--digits`, `--format`, `--progress`), `chalk` provides rich color and style support for CLI output, and `cli-progress` adds interactive progress bars for long-running computations. These tools together streamline UX and error messaging in both interactive and batch modes. Last updates: minimist July 2023, chalk March 2024, cli-progress May 2024.
## MIT License

# Configuration & Validation Libraries
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
## https://github.com/colinhacks/zod#readme
## https://json-schema.org/specification.html
Comprehensive tooling for reading, validating, and coercing configuration and data schemas. `js-yaml` covers safe loading and custom schemas for YAML configs, `dotenv` manages environment variables from `.env` files, `zod` provides runtime schema definitions and type-safe validations, and the JSON Schema spec standardizes JSON data structure definitions. Critical for validating CLI input, HTTP payloads, and persistent cache formats. Last updated May 2024 (js-yaml), March 2024 (dotenv), February 2024 (zod), Draft 2020-12 (JSON Schema).
## Mixed Licenses: js-yaml (MIT), dotenv (MIT), zod (MIT), JSON Schema (CC0 1.0 Universal)

# Vitest Testing Framework
## https://vitest.dev/guide/
Vite-native testing solution offering unit and integration tests, mocking, snapshot testing, and coverage. Provides APIs for test suites and hooks, CLI testing utilities, and seamless support for ES modules. Key for verifying CLI logic, HTTP routes, algorithm correctness, progress indicators, and cache behaviors. Last updated April 2024; MIT License.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal standard for defining RESTful APIs with `info`, `paths`, `components`, security schemes, and JSON Schema integration. Drives the `/openapi.json` endpoint and documentation-driven development of the HTTP service. Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# OpenAI SDK & API Reference
## https://github.com/openai/openai-node
Detailed Node.js SDK reference for interacting with OpenAI, including configuration classes, request/response schemas, streaming chat completions, error handling, and rate-limit patterns. Used for AI-assisted command extensions and streaming output. Last updated May 2024.
## MIT License

# seedrandom
## https://github.com/davidbau/seedrandom
High-quality pseudo-random number generator supporting deterministic sequences with string or numeric seeds, state export/import, and performance trade-offs. Enables reproducible π algorithm tests and consistent benchmarking. Last updated December 2023.
## MIT License

# benchmark.js
## https://benchmarkjs.com/
High-resolution benchmarking library providing statistical methods, asynchronous test support, and rich reporting. Ideal for comparing π computation algorithms (Leibniz, Gauss-Legendre, Chudnovsky) and reporting throughput (digits/ms). Last updated January 2024.
## MIT License

# Express.js API
## https://expressjs.com/en/4x/api.html
Minimal and flexible web framework for Node.js with robust routing, middleware patterns, query parsing, and error handling. Powers the `/pi` and `/benchmark` endpoints, JSON/PNG responses, and server configuration via CLI or environment. Last updated May 2024.
## MIT License

# decimal.js
## https://github.com/MikeMcl/decimal.js#readme
Arbitrary-precision decimal arithmetic library with configurable precision, rounding modes, and performance considerations. Critical for implementing high-precision π algorithms (Gauss-Legendre, Chudnovsky) with reliable rounding and error control. Last updated March 2024.
## MIT License

# Canvas & Charting Libraries
## https://github.com/Automattic/node-canvas
## https://github.com/SeanSobey/ChartjsNodeCanvas
Node‐canvas implements the HTML5 Canvas API for Node.js, enabling programmatic generation of images and text rendering. ChartjsNodeCanvas integrates Chart.js for creating PNG charts of error margins, throughput, and digit sequences. Essential for producing visual outputs of π computations and benchmarks. Last updated April 2024.
## MIT License

# MDN Web Docs - JavaScript Guides
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
## https://developer.mozilla.org/en-US/docs/Web/Unicode/Emoji
Authoritative guides on JavaScript regular expressions (syntax, flags, performance) and Unicode/Emoji handling. Supports implementing `--filter` capabilities for digit streams and selecting emojis for interactive CLI feedback. Last updated 2024; CC BY-SA 2.5.
## CC BY-SA 2.5

# Flat-Cache for Persistence
## https://github.com/royriojas/flat-cache#readme
Simple file-based cache for Node.js projects, storing and retrieving JSON data quickly without external dependencies. Used to implement persistent caching of computed π digits and benchmark results, configurable cache directories, and auto-cleanup policies. Last updated February 2023.
## MIT License

# Math.js BigNumber & Numeric Capabilities
## https://mathjs.org/docs/datatypes/bignumber.html
Documentation for BigNumber support in Math.js, covering precision control, arithmetic operations, and configuration. Offers an alternative numeric engine for π calculations, with built-in support for bignumber operations and unit testing. Last updated January 2024.
## Apache-2.0