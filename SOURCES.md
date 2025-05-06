# Node.js Core API Reference
## https://nodejs.org/api/
Comprehensive reference for all built-in Node.js modules, including `fs`, `path`, `url`, `http/https`, `process`, `readline`, and streams. Covers file I/O, environment variables, HTTP server/client APIs, event-driven patterns, module resolution, and signal handling. Essential for implementing CLI flags (`--face`, `--list-*`), parsing files, and managing shutdown in both non-interactive and HTTP server modes. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# Node.js HTTP Module
## https://nodejs.org/api/http.html
Deep dive into Node.js core HTTP APIs: `http.createServer`, `IncomingMessage`, `ServerResponse`, request/response headers, status codes, and streaming. Explains low-level routing, response serialization, and CORS header management—critical for building the built-in HTTP JSON endpoints (`/face`, `/list-faces`, `/diagnostics`, `/openapi.json`) and graceful server shutdown. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# Node.js Readline Module
## https://nodejs.org/api/readline.html
Provides interfaces for reading lines from input streams, interactive prompts, and handling user events. Details on `readline.createInterface`, question/answer patterns, asynchronous iteration, and history control. Crucial for implementing the interactive REPL (`--interactive`) that processes commands without restarting the CLI. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# ECMAScript Modules in Node.js
## https://nodejs.org/api/esm.html
Explains ES module support in Node.js: `import`/`export` syntax, `import.meta.url`, dynamic `import()`, and resolution of file URLs. Guides structuring the CLI as ESM, handling package metadata, and writing clean module imports. Last updated June 2024; maintained by the Node.js Foundation.
## Node.js Foundation (MIT-like)

# js-yaml
## https://github.com/nodeca/js-yaml#readme
A pure JavaScript YAML parser and dumper supporting safe loading and custom schemas. Documents `yaml.load`, `yaml.dump`, error handling, and security considerations. Used for reading user configuration (`.cruciblerc`, `cruconfig.yaml`) and custom face definitions (`--faces-file`). Last updated 2024; highly authoritative community project.
## MIT License

# Dotenv Configuration Library
## https://github.com/motdotla/dotenv#readme
Lightweight module to load environment variables from a `.env` file into `process.env`. Covers parsing rules, override behavior, and security implications. Enables managing runtime configuration (e.g., `PORT`, `OPENAI_API_KEY`) and environment-based defaults for CLI and server modes. Updated 2024; widely adopted.
## MIT License

# GitHub Actions Workflow Syntax
## https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
Official guide to authoring GitHub Actions workflows: YAML schema for triggers, jobs, steps, reusable workflows, expressions, and environment variables. Vital for configuring CI/CD pipelines, test runners, and release automation for this repository. Last updated 2024; maintained by GitHub.
## CC BY 4.0

# Vitest Testing Framework
## https://vitest.dev/guide/
Fast Vite-native testing framework for unit and integration tests, mocking, snapshot testing, and coverage reporting. Covers CLI usage, configuration options, and API for defining tests and hooks. Used extensively for testing core logic, HTTP API endpoints, and interactive REPL behavior. Last updated 2024; active open-source project.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.0.3
Formal specification document for OpenAPI 3.0.3: describes `info`, `servers`, `paths`, `components` (schemas, parameters, responses), security, and JSON schema integration. Provides the blueprint for generating and validating the `/openapi.json` endpoint, client SDKs, and API documentation. Published under CC0 1.0 Universal by the OpenAPI Initiative.
## CC0 1.0 Universal