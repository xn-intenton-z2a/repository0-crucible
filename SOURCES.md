# Node.js Core API & Modules
## https://nodejs.org/api/
Comprehensive reference for all built-in Node.js modules—including file I/O (`fs`), path resolution (`path`), URL handling (`url`, `URL`, `URLSearchParams`), HTTP/HTTPS server and client APIs (`http`, `https`), streams, process utilities, and interactive CLI support via the `readline` module. Includes detailed guidance on ESM support (import/export syntax, dynamic imports, `import.meta.url`, package exports). Essential for implementing features such as CLI flags, interactive REPL, HTTP endpoints (`/face`, `/faces`, `/diagnostics`, `/openapi.json`), streaming responses, and robust module structuring. Last updated June 2024; maintained by the Node.js Foundation and the OpenJS Foundation.
## Node.js Foundation (MIT-like)

# minimist
## https://github.com/substack/minimist
Minimalist argument parser for Node.js supporting short and long flags, type coercion, default values, and aliases. Powers parsing of CLI options such as `--face`, `--count`, `--serve`, `--port`, `--faces-file`, `--theme`, and `--color`. Enables zero-dependency interfaces with clear validation and help messaging. Highly authoritative due to widespread community adoption; last updated July 2023.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml#readme
Pure JavaScript YAML parser and dumper supporting safe loading, custom schemas, and detailed error reporting. Documents `yaml.load`, `yaml.dump`, schema customization, and security considerations when handling untrusted content. Crucial for reading and validating `.cruciblerc` and `cruconfig.yaml` custom face lists. Last updated May 2024; highly credible community project.
## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Covers parsing rules, override behavior, and production best practices for secure configuration management. Enables runtime configuration such as `PORT` and `OPENAI_API_KEY` across CLI and server modes. Last updated March 2024; widely adopted.
## MIT License

# Vitest Testing Framework
## https://vitest.dev/guide/
Vite-native testing framework offering unit and integration tests, mocking, snapshot testing, and coverage reporting. Covers CLI usage, configuration options, watch mode, and API for defining tests and hooks. Used extensively for testing CLI logic, HTTP API endpoints, interactive REPL, and configuration validation. Last updated April 2024; active community support.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal standard for OpenAPI 3.0.3 defining `info`, `servers`, `paths`, `components`, security schemes, and JSON Schema integration. Serves as the blueprint for generating and validating the `/openapi.json` endpoint and interactive API docs. Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# OpenAPI Node.js Library
## https://github.com/openai/openai-node
Official Node.js SDK for interacting with the OpenAI API. Includes `Configuration` and `OpenAIApi` classes, methods for completions and chat streams, error handling patterns, and rate limit management. Critical for AI-driven face generation (`--ai-face`) and streaming responses. Last updated May 2024; maintained by OpenAI.
## MIT License

# OpenAI API Reference
## https://platform.openai.com/docs/api-reference
Comprehensive reference for OpenAI API endpoints, authentication, error handling, and rate limits. Details request and response payloads, parameters (`model`, `temperature`, `max_tokens`), and best practices for deterministic output. Essential for integrating AI capabilities in CLI and HTTP server modes. Last updated 2024; maintained by OpenAI.
## Public Domain (OpenAI)

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
Type-safe schema validation library for TypeScript and JavaScript. Documents primitive and composite schemas, parsing, coercion, custom error messages, and asynchronous validations. Utilized for validating configuration files (`.cruciblerc`, `cruconfig.yaml`), CLI options, and HTTP request parameters. Last updated February 2024.
## MIT License

# JSON Schema
## https://json-schema.org/specification.html
De facto standard for defining the structure and validation rules of JSON data. Covers meta-schemas, validation keywords (`type`, `properties`, `required`), data types, and `$ref` referencing. Critical for defining and validating `/openapi.json`, configuration files, and HTTP request bodies. Draft 2020-12 published 2020; maintained by JSON Schema Org.
## CC0 1.0 Universal

# MDN Web Docs - HTTP & URL APIs
## https://developer.mozilla.org/en-US/docs/Web/HTTP
Detailed MDN reference for the HTTP protocol: methods, status codes, headers (including content negotiation and CORS), and best practices for API design and consumption. Also covers the WHATWG URL API (`URL`, `URLSearchParams`) for constructing and parsing URLs and query strings in Node.js. Last updated April 2024; maintained by Mozilla.
## CC BY-SA 2.5

# Chalk ANSI Styling
## https://github.com/chalk/chalk
Lightweight library for styling terminal string output with ANSI colors and styles. Provides template literals, nested styling, and theme customization. Essential for implementing the `--color` flag to enhance emotional feedback in CLI mode. Last updated March 2024; widely adopted in the Node.js ecosystem.
## MIT License

# seedrandom
## https://github.com/davidbau/seedrandom
Robust pseudo-random number generator library supporting seeding via string or numeric seeds, deterministic floats and integers, reproducible sequences, and state export/import. Implements an LCG algorithm with configurable options and performance trade-offs. Enables deterministic ASCII face generation in CLI and HTTP modes. Last updated December 2023; MIT License; authoritative use in testing and client-side randomness.
## MIT License

# ascii-faces
## https://www.npmjs.com/package/ascii-faces
Curated collection of ASCII art facial expressions with a simple API for random selection, theming via mood tags, and batch output. Demonstrates extensibility patterns, face categorization, and randomization techniques. Serves as a competitor reference for implementing face selection, theming, and custom collections. Last published January 2024; MIT License; active community usage.
## MIT License

# Commander.js
## https://github.com/tj/commander.js#readme
Comprehensive framework for building Node.js CLI applications with support for commands, subcommands, options, flags, auto-generated help, and argument validation. Provides patterns for nested commands, custom help text, and lifecycle hooks—useful for evolving beyond basic parsing with `minimist`. Last updated June 2024; MIT License; widely adopted by major CLI tools.
## MIT License

# Cowsay
## https://github.com/piuccio/cowsay#readme
Classic ASCII-art speech bubble generator demonstrating advanced CLI design, text wrapping, and dynamic input handling. Offers interactive modes, customizable templates, and configurable eyes and tongue parameters. Provides actionable insights on structuring output, handling streams, and improving user feedback in terminal applications. Last updated May 2024; MIT License.