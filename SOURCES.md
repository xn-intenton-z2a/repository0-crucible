# Node.js Core APIs
## https://nodejs.org/api/
Comprehensive reference to all built-in Node.js modules, including file I/O (`fs`), path (`path`), URL handling (`url`, `URL`, `URLSearchParams`), HTTP/HTTPS server and client APIs (`http`, `https`), streams, performance timing (`performance` API), interactive CLI (`readline`), process utilities (`process` object and signals), and error-handling patterns. Essential for implementing CLI flags, interactive REPL, HTTP endpoints (`/pi`, `/benchmark`), streaming modes, diagnostics, and core module architecture. Last updated June 2024; maintained by the Node.js Foundation and the OpenJS Foundation.
## Node.js Foundation (MIT-like)

# minimist
## https://github.com/substack/minimist
Minimalist argument parser for Node.js supporting short and long flags, type coercion, default values, and aliases. Powers parsing of CLI options such as `--algorithm`, `--digits`, `--format`, `--output`, `--benchmark`, `--serve`, `--port`, and more. Enables zero-dependency interfaces with clear validation and help messaging. Highly authoritative due to widespread community adoption; last updated July 2023.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml#readme
Pure JavaScript YAML parser and dumper supporting safe loading, custom schemas, and detailed error reporting. Documents `yaml.load`, `yaml.dump`, schema customization, and security considerations for untrusted inputs. Crucial for reading and validating configuration files such as `.cruciblerc` and `cruconfig.yaml`. Last updated May 2024; widely used in Node.js projects.
## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Covers parsing rules, override behavior, variable validation, and production best practices. Enables secure runtime configuration of `SERVER_PORT`, `OPENAI_API_KEY`, and other secrets across CLI, HTTP server, and diagnostics modes. Last updated March 2024; industry-standard.
## MIT License

# Vitest Testing Framework
## https://vitest.dev/guide/
Vite-native testing framework offering unit and integration tests, mocking, snapshot testing, and coverage reporting. Covers CLI usage, HTTP server testing, stream and interactive mode testing, and API for defining tests and hooks. Used extensively for validating CLI logic, HTTP endpoints, benchmarking outputs, and visual rendering. Last updated April 2024; active community support.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal standard for OpenAPI 3.0.3 defining `info`, `servers`, `paths`, `components`, security schemes, and JSON Schema integration. Serves as the blueprint for the `/openapi.json` endpoint and documentation-driven development of the HTTP API. Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# OpenAI SDK & API Reference
## https://github.com/openai/openai-node
Comprehensive Node.js SDK and API reference for interacting with the OpenAI platform. Includes `Configuration` and `OpenAIApi` classes, methods for completions and chat streams, authentication flows, rate-limit handling, error patterns, and REST endpoint parameter schemas. Critical for AI-driven extensions and streaming responses in the CLI and HTTP services. Last updated May 2024; maintained by OpenAI.
## MIT License

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
Type-safe schema validation library for TypeScript and JavaScript. Documents primitive and composite schemas, parsing/coercion, custom error messages, and asynchronous validations. Utilized for validating configuration files, CLI options, HTTP query/body parameters, and diagnostics schemas. Last updated February 2024.
## MIT License

# JSON Schema
## https://json-schema.org/specification.html
De facto standard for defining JSON data structures and validation rules. Covers meta-schemas, validation keywords (`type`, `properties`, `required`), data types, and cross-document references (`$ref`). Critical for defining and validating HTTP request/response payloads and configuration formats. Draft 2020-12; maintained under CC0 1.0 Universal.
## CC0 1.0 Universal

# Chalk ANSI Styling
## https://github.com/chalk/chalk
Lightweight library for styling terminal output with ANSI colors and styles. Provides template literals, nested styling, and theme customization. Essential for implementing the `--color` flag to enhance CLI and interactive emotional feedback. Last updated March 2024; widely adopted.
## MIT License

# seedrandom
## https://github.com/davidbau/seedrandom
Robust pseudo-random number generator supporting deterministic sequences via string or numeric seeds, reproducible floats/integers, and state import/export. Implements an LCG algorithm with performance trade-offs. Enables deterministic π generation and simplifies testing across modes. Last updated December 2023.
## MIT License

# benchmark.js
## https://benchmarkjs.com/
High-resolution benchmarking library for JavaScript. Provides statistical methods, asynchronous benchmarks, support for setup/teardown, and rich reporting. Ideal for measuring π calculation algorithms' performance and throughput, including across synchronous and asynchronous scenarios. Last updated January 2024; widely used in performance-critical JS projects.
## MIT License

# Express.js API
## https://expressjs.com/en/4x/api.html
Minimal and flexible Node.js web application framework with robust routing, middleware, HTTP utilities, and error handling. Fundamental for building the `/pi` and `/benchmark` HTTP endpoints, parsing query parameters, and serving JSON or PNG responses. Last updated May 2024; maintained by the Node.js community.
## MIT License

# decimal.js
## https://github.com/MikeMcl/decimal.js#readme
Arbitrary-precision decimal arithmetic library for JavaScript. Details configuration options (precision, rounding), methods for basic and advanced operations, and performance considerations. Key for implementing high-precision π calculations using Big Decimal arithmetic in algorithms like Gauss-Legendre and Chudnovsky. Last updated March 2024.
## MIT License

# Canvas & Charting Libraries
## https://github.com/Automattic/node-canvas
## https://github.com/SeanSobey/ChartjsNodeCanvas
Node Canvas replicates the HTML5 Canvas API in Node.js for programmatic image generation, including text and chart rendering. ChartjsNodeCanvas integrates Chart.js with Node Canvas to produce PNG charts. Critical for generating PNG visualizations of π digits or benchmarking error plots. Last updated April 2024; both under MIT License.
## MIT License

# MDN Web Docs - JavaScript Guides
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
## https://developer.mozilla.org/en-US/docs/Web/Unicode/Emoji
Authoritative JavaScript guides on Regular Expressions (syntax, flags, performance) and a comprehensive overview of Unicode and Emoji usage. Supports implementing robust `--filter` features and selecting/categorizing emoji in the CLI. Last updated 2024; maintained by Mozilla.
## CC BY-SA 2.5