# Node.js Core & JavaScript Guides
## https://nodejs.org/api/
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/
Comprehensive reference to Node.js built-in modules including file I/O (`fs`), networking (`http`, `https`), streams (`stream`), URL handling (`url`), performance measurement (`perf_hooks`), and the ECMAScript module system (ESM). Paired with MDN’s in-depth JavaScript guides covering control flow, data types, regular expressions, Unicode/Emoji support, and JavaScript’s native `BigInt` type (construction, arithmetic, binary operations, performance considerations). Essential for implementing CLI commands, HTTP endpoints (`/pi`, `/benchmark`), streaming digit sequences, progress indicators, and dynamic templating. Last updated June 2024; maintained by the Node.js Foundation (MIT-like) and MDN (CC BY-SA 2.5).
## Mixed Licenses: Node.js Foundation (MIT-like), MDN (CC BY-SA 2.5)

# CLI & Terminal Utilities
## https://github.com/substack/minimist
## https://github.com/chalk/chalk
## https://github.com/AndiDittrich/Node.CLI-Progress
Unified suite for parsing command-line arguments (`minimist`), applying ANSI color styling (`chalk`), and rendering interactive progress bars (`cli-progress`). Enables robust handling of flags (`--algorithm`, `--digits`, `--format`, `--progress`), rich colorized output for emphasis and warnings, and user feedback during long-running π calculations. Last updated: minimist July 2023, chalk March 2024, cli-progress May 2024.
## MIT License

# Configuration & Validation Libraries
## https://github.com/nodeca/js-yaml#readme
## https://github.com/motdotla/dotenv#readme
## https://github.com/colinhacks/zod#readme
## https://json-schema.org/specification.html
Tooling for reading, validating, and coercing structured data: `js-yaml` for YAML config files, `dotenv` for environment variable management, `zod` for runtime schema enforcement, and the JSON Schema specification for formal data contracts. Critical for validating CLI input, HTTP payloads, cache formats, and OpenAPI components. Last updated May 2024 (js-yaml), March 2024 (dotenv), February 2024 (zod), Draft 2020-12 (JSON Schema).
## Mixed Licenses: js-yaml (MIT), dotenv (MIT), zod (MIT), JSON Schema (CC0 1.0 Universal)

# Testing Frameworks & HTTP Testing Tools
## https://vitest.dev/guide/
## https://github.com/visionmedia/supertest
`Vitest` offers fast unit and integration testing with ES modules, mocking, snapshot testing, and coverage reporting. `Supertest` enables end-to-end HTTP tests against Express routes (`/pi`, `/benchmark`). Together they ensure algorithm correctness, CLI behavior, and API stability. Last updated April 2024 (Vitest), January 2024 (Supertest).
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
The formal standard for defining RESTful APIs with `info`, `paths`, `components`, security schemes, and JSON Schema integration. Powers the `/openapi.json` endpoint and drives documentation-driven API development. Published June 2023 under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# Swagger UI Express
## https://github.com/scottie1984/swagger-ui-express
Express middleware to serve interactive Swagger UI documentation directly from an OpenAPI spec. Simplifies API exploration and debugging by generating a user-friendly web interface for `/openapi.json`. Last updated February 2024.
## MIT License

# OpenAI SDK & API Reference
## https://github.com/openai/openai-node
Detailed Node.js SDK reference for interacting with the OpenAI API, including configuration options, request/response schemas, streaming chat completions, error handling, and rate limit guidance. Utilized for AI-augmented CLI extensions and streaming outputs. Last updated May 2024.
## MIT License

# Express.js API
## https://expressjs.com/en/4x/api.html
A minimal, flexible web framework for Node.js featuring robust routing, middleware patterns, query parsing, and error handling. Powers the `/pi` and `/benchmark` endpoints, JSON and PNG responses, and integrates with validation, caching, and metrics middleware. Last updated May 2024.
## MIT License

# Arithmetic & Numeric Libraries
## https://github.com/MikeMcl/decimal.js#readme
## https://mathjs.org/docs/datatypes/bignumber.html
## https://github.com/davidbau/seedrandom
Support for arbitrary-precision decimal arithmetic (`decimal.js`), BigNumber operations (`math.js`), and deterministic pseudo-random number generation (`seedrandom`). Provides configurable precision, rounding modes, performance tuning, and seedable RNG for reproducible benchmarks. Last updated March 2024 (decimal.js), January 2024 (math.js), December 2023 (seedrandom).
## Mixed Licenses: decimal.js (MIT), math.js (Apache-2.0), seedrandom (MIT)

# Benchmarking Library
## https://benchmarkjs.com/
A high-resolution benchmarking toolkit offering statistical analysis, asynchronous test support, and detailed reporting. Ideal for comparing π computation algorithms (Leibniz, Gauss-Legendre, Chudnovsky) and measuring throughput under consistent load. Last updated January 2024.
## MIT License

# Canvas & Charting
## https://github.com/Automattic/node-canvas
## https://www.chartjs.org/docs/latest/
`node-canvas` provides a headless Canvas API for Node.js, while Chart.js documentation covers chart types, configuration, plugins, and responsive design. Used for generating PNG visualizations of error margins, performance matrices, and digit distributions via server-side rendering. Last updated April 2024 (node-canvas), May 2024 (Chart.js).
## MIT License

# Chartjs Node Canvas
## https://github.com/SeanSobey/ChartjsNodeCanvas
Specialized library to integrate Chart.js with Node.js using a headless canvas. Configurable dimensions, background, and analog API mirroring Chart.js, enabling server-side creation of static PNG charts from datasets. Essential for rendering performance and error plots in PNG format within CLI and HTTP routes. Last updated May 2024.
## MIT License

# EJS Templates
## https://ejs.co/#docs
Official EJS documentation covering syntax for embedding JavaScript in HTML, partials, filters, layouts, and rendering APIs (`ejs.render`, `ejs.renderFile`). Essential for generating dynamic HTML reports with embedded charts and data tables. Last updated 2024.
## MIT License

# Flat-Cache for Persistence
## https://github.com/royriojas/flat-cache#readme
A lightweight file-based cache for Node.js, enabling fast JSON data storage and retrieval with minimal dependencies. Used for persistent caching of π digits and benchmark results with configurable directories and cleanup policies. Last updated February 2023.
## MIT License

# Ajv JSON Schema Validator
## https://github.com/ajv-validator/ajv
A fast and extensible JSON Schema validator supporting multiple draft versions (Draft-07/2019-09/2020-12), custom keywords, asynchronous validation, and format extensions. Ideal for validating HTTP request payloads against OpenAPI schemas in Express routes. Last updated March 2024.
## MIT License

# calc-pi npm package
## https://github.com/benolayinka/calc-pi
An open-source Node.js package offering multiple π computation algorithms (Leibniz, Gauss-Legendre, Chudnovsky) with both synchronous and asynchronous APIs, streaming interfaces, and progress events. Demonstrates optimized implementations and real-time updates, useful for benchmarking and comparative studies. Last updated January 2024.
## MIT License