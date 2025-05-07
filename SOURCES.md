# Node.js Core API & HTTP Module
## https://nodejs.org/api/
Comprehensive reference for all built-in Node.js modules, including file I/O (`fs`), path resolution (`path`), URL handling (`url`), and HTTP/HTTPS server and client APIs (`http`, `https`). Covers event-driven architecture, streams, process utilities, and detailed HTTP server patterns—creating servers with `http.createServer`, parsing `IncomingMessage`, responding with `ServerResponse`, managing headers (including CORS), and graceful shutdown. Essential for implementing CLI flags, HTTP endpoints (`/face`, `/faces`, `/diagnostics`, `/openapi.json`), streaming responses, error handling, and diagnostics endpoints. Last updated June 2024; maintained by the Node.js Foundation and the OpenJS Foundation.

## Node.js Foundation (MIT-like)

# ECMAScript Modules in Node.js
## https://nodejs.org/api/esm.html
Explains ES module support in Node.js: `import`/`export`, `import.meta.url`, dynamic `import()`, package exports, and file URL resolution. Guides structuring the CLI and HTTP server as native ESM, handling package metadata, and ensuring consistent module imports across environments. Last updated June 2024; maintained by the Node.js Foundation.

## Node.js Foundation (MIT-like)

# minimist
## https://github.com/substack/minimist
Minimalist argument parser for Node.js, supporting short and long flags, type coercion, default values, and aliases. Powers parsing of `--ascii-face`, `--count`, `--serve`, `--port`, `--faces-file`, `--theme`, and `--color`. Enables simple, zero-dependency CLI interfaces with clear validation and help messaging. Last updated July 2023; highly authoritative based on widespread community adoption.

## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml#readme
Pure JavaScript YAML parser and dumper supporting safe loading, custom schemas, and detailed error reporting. Documents `yaml.load`, `yaml.dump`, schema customization, and security considerations for untrusted content. Used for reading `.cruciblerc`, `cruconfig.yaml`, and custom faces files. Last updated May 2024; highly credible community project.

## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Covers parsing rules, override behavior, and production best practices for secure configuration management. Enables runtime configuration such as `PORT` and `OPENAI_API_KEY` across CLI and server modes. Last updated March 2024; widely adopted.

## MIT License

# Vitest Testing Framework
## https://vitest.dev/guide/
Vite-native testing framework offering unit/integration tests, mocking, snapshot testing, and coverage reporting. Covers CLI usage, configuration options, watch mode, and API for defining tests and hooks. Used for testing CLI logic, HTTP API endpoints, and REPL behavior. Last updated April 2024; active community support.

## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal specification for OpenAPI 3.0.3: defines the structure of `info`, `servers`, `paths`, `components`, security schemes, and JSON Schema integration. Serves as the blueprint for generating and validating the `/openapi.json` endpoint and API documentation. Published under CC0 1.0 Universal by the OpenAPI Initiative.

## CC0 1.0 Universal

# OpenAPI Node.js Library
## https://github.com/openai/openai-node
Official Node.js SDK for interacting with the OpenAI API. Includes `Configuration` and `OpenAIApi` classes, methods for completions and chat streams, error handling patterns, and rate limit management. Critical for AI-driven face generation (`--ai-face`) and streaming responses. Last updated May 2024; maintained by OpenAI.

## MIT License

# OpenAI API Reference
## https://platform.openai.com/docs/api-reference
Comprehensive reference for OpenAI API endpoints, authentication, error handling, and rate limits. Details request/response payloads, parameters (`model`, `temperature`, `max_tokens`), and best practices for deterministic output. Essential for integrating AI capabilities in both CLI and HTTP server modes. Last updated 2024; maintained by OpenAI.

## Public Domain (OpenAI)

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
Type-safe schema validation library for TypeScript and JavaScript. Documents primitive and composite schemas, parsing, coercion, custom error messages, and asynchronous validations. Utilized for validating configuration files (`.cruciblerc`, `cruconfig.yaml`), CLI options, and HTTP request parameters. Last updated February 2024.

## MIT License

# EJS Templating Engine
## https://ejs.co/#docs
Embedded JavaScript templating engine supporting interpolation, conditional rendering, loops, and partials. Useful for dynamic HTML pages, Swagger UI or Redoc integration, and other server-side templates. Last updated 2024; MIT License.

## MIT License

# JSON Schema
## https://json-schema.org/specification.html
De facto standard for defining the structure and validation rules of JSON data. Covers meta-schemas, validation keywords (`type`, `properties`, `required`), data types, and `$ref` referencing. Critical for defining and validating `/openapi.json`, configuration files, and HTTP request bodies. Draft 2020-12 published 2020; maintained by JSON Schema Org.

## CC0 1.0 Universal

# MDN Web Docs - HTTP & URL APIs
## https://developer.mozilla.org/en-US/docs/Web/HTTP
Detailed MDN reference for the HTTP protocol: methods, status codes, headers (including content negotiation and CORS), and best practices for API design and consumption. Also covers the WHATWG URL API (`URL`, `URLSearchParams`) for constructing and parsing URLs and query strings in Node.js and browsers. Last updated April 2024; maintained by Mozilla.

## CC BY-SA 2.5

# Chalk ANSI Styling
## https://github.com/chalk/chalk
Lightweight library for styling terminal string output with ANSI colors and styles. Provides template literals, nested styling, and theme customization. Essential for the `--color` flag to enhance emotional feedback in CLI mode. Last updated March 2024; widely adopted in Node.js ecosystem.

## MIT License

# seedrandom
## https://github.com/davidbau/seedrandom
Robust pseudo-random number generator library supporting seeding via string or numeric seeds, deterministic floats and integers, reproducible sequences, and state export/import. Provides `seedrandom()` to create independent PRNG instances, enabling deterministic ASCII face generation in both CLI and HTTP modes. Covers LCG algorithm details, seeding options, and performance considerations. Last updated December 2023; MIT License; authoritative use in testing and client-side randomness.

## MIT License

# ascii-faces
## https://www.npmjs.com/package/ascii-faces
Curated collection of ASCII art facial expressions with a simple API for random selection, theming by mood tags, and batch output. Demonstrates extensibility patterns, face categorization, and randomization techniques. Useful as a competitor reference for implementing face selection, theming, and custom collections. Last published January 2024; MIT License; active community usage.

## MIT License