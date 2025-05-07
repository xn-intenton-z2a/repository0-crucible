# Node.js Core API Reference
## https://nodejs.org/api/
Comprehensive reference for all built-in Node.js modules including `fs`, `path`, `url`, `http/https`, `process`, and streams. Covers file I/O, environment variables, HTTP server/client APIs, event-driven architecture, module resolution, signal handling, and system utilities such as CPU and memory information. Essential for implementing CLI flags, HTTP server routes, diagnostics endpoints, and graceful shutdown. Last updated June 2024; maintained by the Node.js Foundation and the OpenJS Foundation.
## Node.js Foundation (MIT-like)

# Node.js HTTP Module
## https://nodejs.org/api/http.html
Deep dive into the Node.js core HTTP APIs: `http.createServer`, `IncomingMessage`, `ServerResponse`, request/response headers, status codes, streaming, and CORS header configuration. Crucial for building JSON and text endpoints (`/face`, `/list-faces`, `/diagnostics`, `/openapi.json`), parsing query parameters, managing content negotiation, and handling errors in serve mode. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# ECMAScript Modules in Node.js
## https://nodejs.org/api/esm.html
Explains ES module support in Node.js: `import`/`export`, `import.meta.url`, dynamic `import()`, package exports, and file URL resolution. Guides structuring the CLI and HTTP server as ESM, handling package metadata, and ensuring consistent module imports. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# minimist
## https://github.com/substack/minimist
Minimist is a minimalist argument parser for Node.js, supporting parsing of short and long flags, type coercion, default values, and aliases. In this repository, it powers parsing for flags like `--ascii-face`, `--count`, `--serve`, `--port`, and `--faces-file`. Configurable boolean flags, alias mapping, and default values make it ideal for simple CLI tools without introducing large dependencies. Last updated July 2023; widely used and highly authoritative based on community adoption.
## MIT License

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

# MDN Web Docs - URL and URLSearchParams
## https://developer.mozilla.org/en-US/docs/Web/API/URL
Comprehensive reference for the WHATWG URL API in browsers and Node.js, detailing construction and parsing of URLs, manipulation of query parameters using `URLSearchParams`, and handling of origins and paths. Essential for parsing incoming HTTP request URLs (`/face?count=...`) robustly and handling edge cases such as encoding and relative paths. Last updated June 2024; maintained by Mozilla.
## CC BY-SA 2.5

# MDN Web Docs - HTTP
## https://developer.mozilla.org/en-US/docs/Web/HTTP
Detailed overview of the HTTP protocol, methods, status codes, headers (including content negotiation and CORS), and best practices for building and consuming HTTP APIs. Critical for implementing request parsing, response formatting, error handling, and security configurations in the Node.js HTTP server. Last updated April 2024; maintained by Mozilla.
## CC BY-SA 2.5

# Chalk ANSI Styling
## https://github.com/chalk/chalk
Chalk is a lightweight JavaScript library for styling terminal string output with ANSI colors and styles. Provides methods for applying color and style transformations to strings, supports template literals, nested styling, and custom themes. Essential for implementing the `--color` flag to enhance CLI emotional feedback. Last updated March 2024; widely adopted in the Node.js ecosystem.
## MIT License