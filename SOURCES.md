# Node.js Process API
## https://nodejs.org/api/process.html#process_argv
The Node.js Process API documentation details `process.argv`, environment variables, and process control functions. It explains how command-line arguments are represented, platform-specific behaviors, and recommended parsing patterns. This is critical for reliably handling flags like `--help`, `--seed`, `--list`, `--json`, `--serve`, `--port`, and the new `--count` option in both CLI and HTTP modes. Includes examples and edge-case considerations.
## Node.js Foundation (MIT-like)

# Node.js ES Modules
## https://nodejs.org/api/esm.html#esm_import_meta_url
Covers ES module support in Node.js, including `import.meta.url`, file URL resolution, dynamic imports, and interoperability between CommonJS and ESM. Essential for loading modules, resolving file paths with `fileURLToPath`, and maintaining compatibility in modern ESM-based CLI and HTTP server implementations.
## Node.js Foundation (MIT-like)

# Node.js TTY Module
## https://nodejs.org/api/tty.html
Documentation on the TTY ReadStream and WriteStream interfaces for detecting interactive terminals, obtaining window size (columns/rows), and configuring raw mode for real-time keypress handling. Vital for implementing interactive REPL features, ANSI styling detection, and controlled ASCII-art display in terminal applications.
## Node.js Foundation (MIT-like)

# Node.js FS Promises API
## https://nodejs.org/api/fs.html#fs_promises_api
Details promise-based file system operations (`readFile`, `writeFile`, `mkdir`, etc.) with robust error handling. Crucial for asynchronously persisting configuration files, caching templates, loading custom emoticon definitions, and supporting both JSON and YAML input formats.
## Node.js Foundation (MIT-like)

# Node.js Path Module
## https://nodejs.org/api/path.html
Guidance on file path utilities like `resolve`, `join`, and `basename` to ensure reliable asset loading and configuration lookup relative to the CLI’s execution context and HTTP middleware mounting.
## Node.js Foundation (MIT-like)

# Node.js URL Module
## https://nodejs.org/api/url.html
Details the WHATWG URL API including `URL` and `URLSearchParams` classes, parsing, formatting, and resolution techniques. Essential for robust handling of request URLs, query parameters, routing logic, and generating links within Express or standalone HTTP servers.
## Node.js Foundation (MIT-like)

# Node.js Console API
## https://nodejs.org/api/console.html
Details methods (`log`, `error`, `table`) and custom console instances. Important for consistent, structured logging and formatted output across CLI commands and HTTP server logs, including error cases and diagnostics output.
## Node.js Foundation (MIT-like)

# Node.js Readline
## https://nodejs.org/api/readline.html
Explains the Readline module for building interactive command-line interfaces, including line-by-line input, prompts, keypress events, and history management. Used for REPL support in interactive `--interactive` mode.
## Node.js Foundation (MIT-like)

# Node.js HTTP Module
## https://nodejs.org/api/http.html
The core HTTP module covers `http.createServer`, request/response streams, manual routing patterns, header management, content negotiation, and status code handling. Essential for crafting endpoints like `/`, `/list`, `/json`, `/metrics`, `/version`, and `/health` with precise control over responses, CORS headers, and error cases.
## Node.js Foundation (MIT-like)

# ANSI Escape Codes Reference
## https://en.wikipedia.org/wiki/ANSI_escape_code
An authoritative overview of ANSI escape sequences for text styling, cursor positioning, and terminal control codes. Crucial for implementing colored output, animations, and cursor movements in ASCII-emoticon displays and progress indicators.
## CC BY-SA 3.0

# Chalk
## https://github.com/chalk/chalk#readme
A popular terminal string styling library for Node.js, offering intuitive APIs to apply colors, bolding, and other text styles. Enhances readability, contrast, and theming of CLI outputs, ASCII-art headers, and HTTP log coloring. Last published 2023.
## MIT License

# Commander.js
## https://github.com/tj/commander.js#readme
A robust Node.js module for building CLI applications, covering command definitions, option parsing, help generation, and subcommands. Provides best-practice examples for scalable CLI interfaces, custom flags like `--count`, and automatic documentation.
## MIT License

# CLI Frameworks
## https://oclif.io/docs/introduction
Introduces popular multi-command CLI frameworks—Salesforce’s oclif and Yarn’s Clipanion—demonstrating structured command organization, plugin architectures, decorator-based definitions, and built-in help generation for maintainable codebases.
## MIT License

# Conventional Commits Specification
## https://www.conventionalcommits.org/en/v1.0.0/
Defines a lightweight convention for commit message formatting, enabling automated changelog generation, semantic-release workflows, and consistent versioning. Guides integration with tools like Commitizen and semantic-release to enforce change classification.
## CC0 Public Domain

# dotenv
## https://github.com/motdotla/dotenv#readme
A zero-dependency module for loading environment variables from `.env` files. Covers parsing rules, variable expansion, and security considerations, enabling configurable CLI behavior via environment settings like `EMOTICONS_CONFIG` and `EMOTICONS_DIAGNOSTICS`.
## BSD-2-Clause

# EJS Templating
## https://ejs.co/#docs
An embedded JavaScript templating engine with syntax for interpolation, includes, and layouts. Applicable to generating dynamic help screens, banner templates, or ASCII-art wrappers in CLI applications and Express middlewares.
## MIT License

# ESLint
## https://eslint.org/docs/latest/
Official ESLint documentation outlining rule configuration, plugin management, and integration with formatters like Prettier. Ensures code quality, consistency, and style enforcement across a growing codebase and CI workflows.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml#readme
A pure JavaScript YAML parser and dumper that supports custom schemas. Documents APIs for parsing, stringifying, and safe loading—useful for reading and writing YAML-based configurations or emoticon definition sets.
## MIT License

# npm package.json "bin" Field
## https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin
Explains how to configure the `bin` field to expose executables when publishing an npm package. Covers cross-platform shebang usage, distribution best practices, and version handling for CLI release management.
## OpenJS Foundation (MIT)

# OpenAI Node.js SDK
## https://github.com/openai/openai-node#readme
The official client for OpenAI’s REST API, detailing authentication, request/response workflows, streaming support, and error handling. Enables integration of AI-driven emoticon generation or analysis features as advanced extensions.
## MIT License

# Prometheus Client Library
## https://github.com/siimon/prom-client#readme
A Prometheus instrumentation client for Node.js that provides APIs to define and register counters, histograms, and gauges. Includes default system metrics, registry management, and exposition-format output for `/metrics` endpoints.
## MIT License

# Prometheus Exposition Format
## https://prometheus.io/docs/instrumenting/exposition_formats/
Describes the Prometheus text-based exposition format for metrics including HELP and TYPE headers, metric naming conventions, and version compatibility (e.g. version 0.0.4). Provides essential guidelines for constructing custom `/metrics` endpoints readable by Prometheus servers and exporters.
## CC BY 4.0

# Prometheus Naming Best Practices
## https://prometheus.io/docs/practices/naming/
Outlines conventions for naming metrics, labels, and histogram buckets in Prometheus, emphasizing consistency and clarity. This guides design of internal counters (e.g. `emoticon_requests_total`) and labels for accurate monitoring and alerting.
## CC BY 4.0

# Release & Versioning Practices
## https://semver.org/spec/v2.0.0.html
The formal Semantic Versioning specification defines breaking changes, feature releases, and patches. Guides release planning, backward compatibility, and version clarity. Also covers tooling like Commitizen for enforcing conventional commits.
## CC0 Public Domain

# Supertest
## https://github.com/visionmedia/supertest#readme
A SuperAgent-driven library for testing HTTP servers in Node.js. Demonstrates patterns for writing expressive tests against endpoints, including query strings, header negotiation, and JSON/plain-text response assertions.
## MIT License

# Twelve-Factor App: Config
## https://12factor.net/config
Outlines best practices for configuration management via environment variables, detailing 12-factor principles for declarative formats and separation of config from code. Guides design of CLI options and env-var integration to support flexible deployment.
## (none)

# Vitest Documentation
## https://vitest.dev/guide/
Comprehensive guide to Vitest including test definitions, mocking, snapshot testing, and coverage reporting. Covers configuration options, ensuring robust unit and integration tests for CLI, HTTP, and Express middleware behaviors.
## MIT License

# Yargs
## https://yargs.js.org/docs/
A declarative CLI argument parser supporting commands, options, middleware, and validation. Offers both imperative and builder APIs with examples for maintaining consistent help output and advanced flag handling.
## MIT License

# Zod Schema Validation
## https://github.com/colinhacks/zod#readme
A TypeScript-first schema declaration and validation library. Shows parsing of CLI flags, environment variables, and JSON inputs with strong typing, ensuring robust validation of user options and helpful error messages.
## MIT License

# Express Routing
## https://expressjs.com/en/4x/guide/routing.html
Official Express documentation on routing and middleware composition. Describes `Router` instances, parameterized routes, mounting sub-routers, and middleware chaining—fundamental for integrating `createEmoticonRouter` into existing Express applications.
## MIT License

# Fastify Framework
## https://www.fastify.io/docs/latest/
Introduces Fastify as a high-performance HTTP framework with schema-based validation, plugin architecture, and built-in support for JSON schemas. Useful as a reference for alternative routing designs and performance-oriented server patterns.
## MIT License

# MDN CORS
## https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
Comprehensive guide to Cross-Origin Resource Sharing (CORS), explaining preflight requests, headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`), and security implications. Helps ensure correct CORS handling in HTTP responses.
## CC BY-SA 2.5