# Node.js Core & JavaScript Guides
## https://nodejs.org/api/
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/
Comprehensive reference to Node.js built-in modules including file I/O (`fs`), networking (`http`, `https`), streams (`stream`), URL handling (`url`), performance measurement (`perf_hooks`), and the ECMAScript module system (ESM), alongside authoritative MDN guides covering core JavaScript concepts such as control flow, data types, regular expressions, and Unicode/Emoji handling. Essential for implementing CLI commands, HTTP endpoints (`/pi`, `/benchmark`), streaming digit sequences, progress indicators, and advanced templating patterns. Last updated June 2024; maintained by the Node.js Foundation (MIT-like) and MDN (CC BY-SA 2.5).
## Mixed Licenses: Node.js Foundation (MIT-like), MDN (CC BY-SA 2.5)

# CLI & Terminal Utilities
## https://github.com/substack/minimist
## https://github.com/chalk/chalk
## https://github.com/AndiDittrich/Node.CLI-Progress
Unified suite for command-line argument parsing (`minimist`), ANSI styling (`chalk`), and dynamic progress bars (`cli-progress`). Enables robust handling of flags (`--algorithm`, `--digits`, `--format`, `--progress`), rich colorized output, and interactive progress feedback during lengthy π computations. Last updates: minimist July 2023, chalk March 2024, cli-progress May 2024.
## MIT License

# Configuration & Validation Libraries
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
## https://github.com/colinhacks/zod#readme
## https://json-schema.org/specification.html
Tooling for reading, validating, and coercing structured data: `js-yaml` for YAML configs, `dotenv` for environment variable management, `zod` for runtime schema definitions, and the JSON Schema specification for formal data contracts. Critical for validating CLI input, HTTP payloads, cache formats, and OpenAPI components. Last updated May 2024 (js-yaml), March 2024 (dotenv), February 2024 (zod), Draft 2020-12 (JSON Schema).
## Mixed Licenses: js-yaml (MIT), dotenv (MIT), zod (MIT), JSON Schema (CC0 1.0 Universal)

# Testing Frameworks & HTTP Testing Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
`Vitest` offers fast unit and integration testing with ES modules, mocking, snapshot testing, and coverage reporting. `Supertest` enables end-to-end HTTP tests against Express routes (`/pi`, `/benchmark`). Together they ensure algorithm correctness, CLI behavior, and HTTP API stability. Last updated April 2024 (Vitest), January 2024 (Supertest).
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal standard for defining RESTful APIs with `info`, `paths`, `components`, security schemes, and JSON Schema integration. Drives the `/openapi.json` endpoint and documentation-driven development of the HTTP service. Published June 2023 under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# Swagger UI Express
## https://github.com/scottie1984/swagger-ui-express
Middleware for Express to serve interactive Swagger UI documentation directly from an OpenAPI specification. Simplifies API exploration and debugging by generating a user-friendly web interface for `/openapi.json`. Last updated February 2024.
## MIT License

# OpenAI SDK & API Reference
## https://github.com/openai/openai-node
Detailed Node.js SDK reference for interacting with OpenAI, including configuration objects, request/response schemas, streaming chat completions, error handling, and rate-limit guidance. Utilized for AI-augmented command extensions and streaming outputs. Last updated May 2024.
## MIT License

# Express.js API
## https://expressjs.com/en/4x/api.html
Minimal and flexible web framework for Node.js with robust routing, middleware patterns, query parsing, and error handling. Powers the `/pi` and `/benchmark` endpoints, JSON and PNG responses, and supports middleware for validation, caching, and metrics. Last updated May 2024.
## MIT License

# Arithmetic & Numeric Libraries
## https://github.com/MikeMcl/decimal.js#readme
## https://mathjs.org/docs/datatypes/bignumber.html
## https://github.com/davidbau/seedrandom
Arbitrary-precision decimal arithmetic (`decimal.js`) and BigNumber support (`math.js`), plus deterministic pseudo-random number generation (`seedrandom`) for reproducible tests and benchmarking. Provides configurable precision, rounding modes, performance tuning, and seedable RNG state export/import. Last updated March 2024 (decimal.js), January 2024 (math.js), December 2023 (seedrandom).
## Mixed Licenses: decimal.js (MIT), math.js (Apache-2.0), seedrandom (MIT)

# Benchmarking Library
## https://benchmarkjs.com/
High-resolution benchmarking toolkit offering statistical analysis, asynchronous test support, and rich reporting. Ideal for comparing π computation algorithms (Leibniz, Gauss-Legendre, Chudnovsky) and measuring throughput (digits/ms) under consistent load. Last updated January 2024.
## MIT License

# Canvas & Charting
## https://github.com/Automattic/node-canvas
## https://github.com/SeanSobey/ChartjsNodeCanvas
## https://www.chartjs.org/docs/latest/
`node-canvas` provides a headless Canvas API, `ChartjsNodeCanvas` integrates Chart.js for server-side chart rendering, and Chart.js documentation covers chart types, dataset configuration, plugins, and responsive design. Essential for generating PNG visualizations of error margins, performance matrices, and digit sequences. Last updated April 2024 (node-canvas), May 2024 (Chart.js).
## MIT License

# EJS Templates
## https://ejs.co/#docs
Official documentation for EJS templating, covering syntax for embedding JavaScript in HTML, partials, custom filters, layouts, and rendering APIs (`ejs.render`, `ejs.renderFile`). Critical for generating HTML reports with dynamic charts and data tables. Last updated 2024.
## MIT License

# Flat-Cache for Persistence
## https://github.com/royriojas/flat-cache#readme
Simple file-based cache for Node.js, enabling fast store and retrieval of JSON data with minimal dependencies. Used for persistent caching of π digits and benchmark results with configurable directories and cleanup policies. Last updated February 2023.
## MIT License

# Ajv JSON Schema Validator
## https://github.com/ajv-validator/ajv
Fast and extensible JSON Schema validator supporting multiple draft versions (Draft-07/2019-09/2020-12), custom keywords, asynchronous validation, and format extensions. Ideal for validating HTTP request payloads against OpenAPI schemas in Express routes. Last updated March 2024.
## MIT License