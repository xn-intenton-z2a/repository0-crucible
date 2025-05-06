# Node.js Core API Reference
## https://nodejs.org/api/
Combined reference for Node.js built-in modules including `fs`, `path`, `url`, `http`/`https`, `process`, `readline`, and streams. Covers file I/O, environment variables, HTTP server/client APIs, event-driven patterns, module resolution, child process spawning, and ES module support (import/export, `import.meta.url`). Essential for CLI features (`--template`, `--output`, `--serve`), HTTP JSON endpoints, diagnostics, and graceful shutdown. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# Express Framework Documentation
## https://expressjs.com/en/4x/api.html
Official API guide for Express.js, covering routing, middleware, request/response handling, and error management. Demonstrates patterns for structuring HTTP endpoints, validation, and JSON responses with minimal boilerplate—key for scalable HTTP API mode. Latest version 4.x; actively maintained by the Express.js community.
## MIT License

# ANSI Escape Codes Reference
## https://en.wikipedia.org/wiki/ANSI_escape_code
Authoritative overview of ANSI escape sequences for text styling, cursor control, and screen manipulation. Details SGR parameters, CSI utilities, and 256-color/truecolor support. Critical for colored CLI output and dynamic ASCII-art banners (`--color` flag). CC BY-SA 3.0.
## CC BY-SA 3.0

# js-yaml
## https://github.com/nodeca/js-yaml#readme
Pure JavaScript YAML parser and dumper supporting custom schemas and safe loading. Documents API for loading/dumping YAML, error handling, and security considerations. Used for parsing config and custom face definitions (`.cruciblerc`, `cruconfig.yaml`, `--faces-file`). Last updated 2024.
## MIT License

# OpenAI Node.js SDK
## https://github.com/openai/openai-node#readme
Official TypeScript-first client for OpenAI’s REST API in Node.js. Covers authentication, request/response handling, streaming completions, retry strategies, and error management. Includes examples for dynamic face generation or analytics. Updated April 2024.
## MIT License

# OpenAI REST API Reference
## https://platform.openai.com/docs/api-reference
Definitive reference for OpenAI’s REST endpoints—completions, chat, images, and models. Documents request schemas, response formats, rate limits, pagination, and errors. Useful for low-level integration, custom workflows, and advanced usage. Last reviewed May 2024; maintained by OpenAI.
## OpenAI Terms of Use

# figlet.js
## https://github.com/patorjk/figlet.js
JavaScript port of FIGlet for generating stylized ASCII art with various fonts. Details sync/async APIs, font loading, and custom font integration. Useful for enhanced banners and themed face display in CLI and HTTP modes. Last updated 2023.
## MIT License

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
TypeScript-first schema validation library for parsing and validating CLI inputs, JSON/YAML face definitions, HTTP query parameters, and config files. Offers declarative schemas, type inference, and detailed errors. Last updated 2024.
## MIT License

# seedrandom
## https://github.com/davidbau/seedrandom#readme
High-quality, seedable pseudorandom generator for JavaScript supporting multiple algorithms and state serialization. Provides reproducible output across environments—crucial for deterministic face selection (`--seed`). Last updated 2024.
## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Documents parsing rules, configuration options, and security considerations. Facilitates managing runtime configuration (e.g., `PORT`) and environment-based defaults (`--env-file`, `CRUCIBLE_*`). Updated 2024.
## MIT License

# EJS Templating Engine
## https://github.com/mde/ejs#readme
Fast, minimal templating engine supporting `<% %>` syntax, partials, filters, and custom delimiters. Documents `ejs.render`, `ejs.renderFile`, and context binding patterns. Crucial for templated output (`--template`, `--output`) in HTML, Markdown, or text. Last updated 2024.
## MIT License

# GitHub Actions Workflow Syntax
## https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
Official documentation for GitHub Actions YAML syntax, covering triggers, jobs, steps, reusable workflows, and expressions. Vital for CI/CD configuration, automated testing, and deployment pipelines. Last updated 2024.
## CC BY 4.0

# Testing Libraries (Vitest, JSDOM)
## https://vitest.dev/guide/
Official guide for Vitest, a fast Vite-native test runner with features for unit/integration testing, mocking, coverage reporting, and CLI usage. Used for testing core logic, interactive REPL, and HTTP API endpoints.
## https://github.com/jsdom/jsdom#readme
JavaScript headless implementation of the DOM and HTML standards for Node.js. Provides a browser-like environment for tests requiring DOM APIs. Used alongside Vitest for isolated DOM tests.
## MIT License

# Fetch API and CORS Documentation
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
Comprehensive guide to the browser Fetch API—request construction, streaming responses, JSON parsing, headers, and error handling—paired with an authoritative overview of Cross-Origin Resource Sharing (CORS) headers and policies. Essential for client-side UI scripts fetching `/face` and `/diagnostics`, handling network errors, and configuring CORS for HTTP JSON endpoints. Last reviewed 2024; maintained by MDN Web Docs.
## CC BY-SA 3.0

# OpenAPI Specification
## https://spec.openapis.org/oas/v3.0.3
The formal specification for OpenAPI 3.0.3, detailing the structure and syntax for defining RESTful APIs, including `info` objects, `servers`, `paths`, `components` (schemas, parameters, responses), and security definitions. Crucial for generating and serving an accurate OpenAPI document at `/openapi.json`, validating query parameters, and integrating with API tooling. Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal

# ECMAScript Modules in Node.js
## https://nodejs.org/api/esm.html
Comprehensive guide to using ES modules in Node.js, including `import`/`export` syntax, `import.meta.url`, dynamic imports, and module resolution in an ESM context. Essential for structuring this CLI app as ESM, handling file URLs, and reading package metadata. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)
