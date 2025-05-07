# Node.js Core API Reference
## https://nodejs.org/api/
Comprehensive reference for all built-in Node.js modules including `fs`, `path`, `url`, `http/https`, `process`, `readline`, `os`, and streams. Covers file I/O, environment variables, HTTP server/client APIs, event-driven architecture, module resolution, signal handling, and system utilities such as CPU and memory information. Essential for implementing CLI flags (`--face`, `--list-*`), interactive REPL, HTTP server routes, diagnostics endpoints, and graceful shutdown. Last updated June 2024; maintained by the Node.js Foundation and the OpenJS Foundation.
## Node.js Foundation (MIT-like)

# Node.js HTTP Module
## https://nodejs.org/api/http.html
Deep dive into the Node.js core HTTP APIs: `http.createServer`, `IncomingMessage`, `ServerResponse`, request/response headers, status codes, streaming, and CORS header configuration. Crucial for building JSON and text endpoints (`/face`, `/list-faces`, `/list-categories`, `/diagnostics`, `/openapi.json`), parsing query parameters, managing content negotiation, and handling errors in serve mode. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# Node.js Readline Module
## https://nodejs.org/api/readline.html
Provides interfaces for reading lines from input streams, interactive prompts, and event handling. Details on `readline.createInterface`, asynchronous iteration, history control, and prompt management, underpinning the interactive REPL (`--interactive`) commands and session behavior. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# Node.js OS Module
## https://nodejs.org/api/os.html
Defines operating system-related utility methods and properties such as CPU information, memory usage, system uptime, load averages, network interfaces, and user information. Essential for implementing diagnostics (`--diagnostics` flag and `/diagnostics` endpoint) by programmatically gathering host metrics and system health data. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# ECMAScript Modules in Node.js
## https://nodejs.org/api/esm.html
Explains ES module support in Node.js: `import`/`export`, `import.meta.url`, dynamic `import()`, package exports, and file URL resolution. Guides structuring the CLI and HTTP server as ESM, handling package metadata, and ensuring consistent module imports. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# minimist
## https://github.com/substack/minimist
Minimist is a minimalist argument parser for Node.js, supporting parsing of short and long flags, type coercion, default values, and aliases. In this repository, it powers parsing for flags like `--ascii-face`, `--count`, `--serve`, `--port`, and `--faces-file`. Configurable boolean flags, alias mapping, and default values make it ideal for simple CLI tools without introducing large dependencies. Last updated July 2023; widely used and highly authoritative based on community adoption.
## MIT License

# minimatch
## https://github.com/isaacs/minimatch
Provides glob pattern matching functionality for filtering file paths and strings using syntax similar to Unix shell. Supports advanced features such as negation, extended patterns, and custom match options. Can be leveraged for processing file-based commands (e.g., `--merge-persist`, `--refresh`) where pattern-based selection of configuration or data files is required. Last updated May 2024; maintained by the npm community.
## ISC License

# js-yaml
## https://github.com/nodeca/js-yaml#readme
A pure JavaScript YAML parser and dumper supporting safe loading, custom schemas, and error handling. Documents `yaml.load`, `yaml.dump`, and security considerations when parsing untrusted content. Used for reading configuration files (`.cruciblerc`, `cruconfig.yaml`) and custom face definitions (`--faces-file`). Last updated May 2024; highly authoritative community project.
## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Covers parsing rules, override behavior, and security best practices for production workflows. Enables management of runtime configuration (e.g., `PORT`, `OPENAI_API_KEY`) across CLI and server modes. Last updated March 2024; widely adopted.
## MIT License

# Vitest Testing Framework
## https://vitest.dev/guide/
Vite-native testing framework offering unit/integration tests, mocking, snapshot testing, and coverage reporting. Covers CLI usage, configuration options, watch mode, and API for defining tests and hooks. Used extensively for testing CLI logic, HTTP API endpoints, and REPL behavior. Last updated April 2024; active community support.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal specification for OpenAPI 3.0.3: defines `info`, `servers`, `paths`, `components`, security schemes, and JSON Schema integration. Serves as the blueprint for generating and validating the `/openapi.json` endpoint and API documentation. Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# OpenAPI Node.js Library
## https://github.com/openai/openai-node
Official Node.js SDK for interacting with the OpenAI API. Includes `Configuration` and `OpenAIApi` classes, helper methods for completions and chat streams, error handling patterns, and best practices for request batching and response streaming. Crucial for implementing AI-driven face generation (`--ai-face`) and handling rate limits programmatically. Last updated May 2024; maintained by OpenAI.
## MIT License

# OpenAI API Reference
## https://platform.openai.com/docs/api-reference
Comprehensive reference for OpenAI API endpoints, including Chat Completions, authentication, error handling, and rate limits. Details request/response payloads, parameters like `model`, `temperature`, and `max_tokens`, and guides best practices for deterministic output. Essential for integrating AI capabilities in the CLI and HTTP server. Last updated 2024; maintained by OpenAI.
## Public Domain (OpenAI)

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
Type-safe schema validation library for TypeScript and JavaScript. Documents primitive and composite schemas, parsing, coercion, custom error messages, and asynchronous validations. Utilized to validate configuration files (`.cruciblerc`, `cruconfig.yaml`), CLI options, and HTTP request parameters. Last updated February 2024; MIT License.
## MIT License

# EJS Templating Engine
## https://ejs.co/#docs
Embedded JavaScript templating engine with syntax for interpolation, conditional rendering, loops, and includes/partials. Useful for generating dynamic HTML in the HTTP server’s root endpoint (`/`), and for potential Swagger UI or Redoc integration. Last updated 2024; MIT License.
## MIT License

# JSON Schema
## https://json-schema.org/specification.html
De facto standard for defining the structure and validation rules of JSON data. The specification details meta-schemas, validation keywords (`type`, `properties`, `required`, etc.), data types, and referencing. Critical for defining and validating `/openapi.json` components, configuration files, and HTTP request bodies. Draft 2020-12 published 2020; maintained by JSON Schema Org. Highly authoritative specification.
## CC0 1.0 Universal