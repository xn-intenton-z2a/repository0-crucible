# Node.js Core API & Modules
## https://nodejs.org/api/
Comprehensive reference for all built-in Node.js modules—including file I/O (`fs`), path resolution (`path`), URL handling (`url`, `URL`, `URLSearchParams`), HTTP/HTTPS server and client APIs (`http`, `https`), streams, process utilities, interactive CLI support via `readline`, and error handling patterns. Essential for implementing CLI flags, interactive REPL, HTTP endpoints (`/face`, `/faces`), streaming responses, and robust module architecture. Last updated June 2024; maintained by the Node.js Foundation and the OpenJS Foundation.
## Node.js Foundation (MIT-like)

# minimist
## https://github.com/substack/minimist
Minimalist argument parser for Node.js supporting short and long flags, type coercion, default values, and aliases. Powers parsing of CLI options such as `--face`, `--count`, `--serve`, `--port`, `--theme`, `--color`, and more. Enables zero-dependency interfaces with clear validation and help messaging. Highly authoritative due to widespread community adoption; last updated July 2023.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml#readme
Pure JavaScript YAML parser and dumper supporting safe loading, custom schemas, and detailed error reporting. Documents `yaml.load`, `yaml.dump`, schema customization, and security considerations for untrusted inputs. Crucial for reading and validating `.cruciblerc` and `cruconfig.yaml` face lists. Last updated May 2024; widely used in Node.js projects.
## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Covers parsing rules, override behavior, variable validation, and production best practices. Enables secure runtime configuration of `PORT`, `OPENAI_API_KEY`, and other secrets across CLI and server modes. Last updated March 2024; industry-standard.
## MIT License

# Vitest Testing Framework
## https://vitest.dev/guide/
Vite-native testing framework offering unit and integration tests, mocking, snapshot testing, and coverage reporting. Covers CLI usage, configuration options, watch mode, and API for defining tests and hooks. Used extensively for testing CLI logic, HTTP endpoints, interactive REPL, and configuration validation. Last updated April 2024; active community support.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal standard for OpenAPI 3.0.3 defining `info`, `servers`, `paths`, `components`, security schemes, and JSON Schema integration. Serves as the blueprint for generating and validating API schemas (e.g., future `/openapi.json` endpoint). Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# OpenAI Node.js Library
## https://github.com/openai/openai-node
Official Node.js SDK for interacting with the OpenAI API. Includes `Configuration` and `OpenAIApi` classes, methods for completions and chat streams, error handling patterns, and rate-limit management. Critical for AI-driven face generation (`--ai-face`) and streaming responses. Last updated May 2024; maintained by OpenAI.
## MIT License

# OpenAI API Reference
## https://platform.openai.com/docs/api-reference
Comprehensive reference for OpenAI REST endpoints, authentication, error handling, rate limits, and best practices for deterministic outputs. Details request/response payloads and parameter usage (`model`, `temperature`, `max_tokens`). Essential for integrating generative AI capabilities in CLI and HTTP modes. Last updated 2024.
## Public Domain (OpenAI)

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
Type-safe schema validation library for TypeScript and JavaScript. Documents primitive/composite schemas, parsing, coercion, custom error messages, and asynchronous validations. Utilized for validating configuration files (`.cruciblerc`, `cruconfig.yaml`), CLI options, and HTTP request parameters. Last updated February 2024.
## MIT License

# JSON Schema
## https://json-schema.org/specification.html
De facto standard for defining JSON data structures and validation rules. Covers meta-schemas, validation keywords (`type`, `properties`, `required`), data types, and cross-document references (`$ref`). Critical for defining and validating HTTP request/response payloads and API contracts. Draft 2020-12; maintained under CC0 1.0 Universal.
## CC0 1.0 Universal

# MDN Web Docs - HTTP & URL APIs
## https://developer.mozilla.org/en-US/docs/Web/HTTP
Detailed MDN reference for the HTTP protocol: methods, status codes, headers (including content negotiation and CORS), and best practices for API design. Also covers WHATWG URL API (`URL`, `URLSearchParams`) for constructing and parsing query strings in Node.js. Last updated April 2024; maintained by Mozilla.
## CC BY-SA 2.5

# Chalk ANSI Styling
## https://github.com/chalk/chalk
Lightweight library for styling terminal string output with ANSI colors and styles. Provides template literals, nested styling, and theme customization. Essential for implementing the `--color` flag to enhance emotional feedback in CLI mode. Last updated March 2024; widely adopted.
## MIT License

# seedrandom
## https://github.com/davidbau/seedrandom
Robust pseudo-random number generator supporting seeding via string or numeric seeds, deterministic floats/integers, reproducible sequences, and state export/import. Implements an LCG algorithm with performance trade-offs. Enables deterministic face generation in CLI and HTTP modes and simplifies testing. Last updated December 2023.
## MIT License

# ASCII Art & CLI Patterns
## https://www.npmjs.com/package/ascii-faces
Curated collection of ASCII art facial expressions with theming, batch selection, and simple API for random retrieval. Demonstrates extensibility patterns and integration of custom palettes. Influenced by classic CLI tools like Cowsay (text wrapping, streaming output) for designing robust terminal feedback. Last published January 2024.
## MIT License

# MDN Web Docs - Regular Expressions
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
Authoritative guide to JavaScript Regular Expressions: syntax, flags, character classes, grouping, lookarounds, and performance considerations. Essential for implementing the `--filter` feature and validating user-supplied patterns. Last updated 2024; maintained by Mozilla.
## CC BY-SA 2.5

# Unicode Consortium - Emoji List
## https://unicode.org/emoji/charts/emoji-list.html
Official Unicode chart of all standardized emoji, including code points, categories, and sample glyphs. Provides comprehensive reference for selecting and categorizing emoji faces in the `--emoji` feature. Last updated 2024; maintained by the Unicode Consortium.
## Unicode License (free use)