# Node.js Core APIs
## https://nodejs.org/api/
Comprehensive reference to Node.js core modules, covering ECMAScript module resolution, http/https server and client APIs, Streams (including async iterables and chunked transfer), Worker Threads for parallel computation, Performance Hooks for precise timing, and fs/promises for file I/O. This authoritative documentation is essential for implementing the CLI tool’s core functionality, including HTTP API server endpoints, streaming digit computations, and multithreaded Chudnovsky calculations. Last updated June 2024 under the OpenJS Foundation; authoritative as the official Node.js documentation.
## License: CC-BY-4.0

# GitHub REST API
## https://docs.github.com/en/rest
Official reference for GitHub’s RESTful API, detailing endpoints for workflows, issues, pull requests, repository content management, and more. While primarily used for repository automation, understanding these endpoints can inform how the CLI or server could integrate or trigger GitHub-based workflows. Provides comprehensive schemas, parameter definitions, and examples necessary for custom integrations. Maintained by GitHub and regularly updated (current as of July 2024).
## License: CC-BY-4.0

# ESLint & Formatting Tools
## https://eslint.org/docs/latest/
Detailed guide to ESLint for enforcing code quality, customizing rules, and plugin development, with integration advice for Prettier to maintain a consistent code style. Essential for maintaining clean, maintainable source code and avoiding common pitfalls in complex Node.js applications. ESLint last updated 2024; Prettier last updated May 2024.
## License: MIT

# Vitest Testing Framework
## https://vitest.dev/guide/
Next-generation test runner providing fast unit and integration testing, built-in mocking, and coverage reporting. Supports ECMAScript Modules, watch mode, and parallel test execution for rapid feedback loops. Critical for validating algorithm correctness, HTTP endpoint behavior, and CLI option parsing. Version 3.x; MIT License.
## License: MIT

# cli-progress Library
## https://github.com/cli-progress/cli-progress#readme
In-depth documentation for the cli-progress library, covering single and multi-bar setups, custom formatting tokens, and TTY detection. Essential for implementing real-time progress bars in the CLI when computing large numbers of π digits, ensuring accurate user feedback and graceful handling of non-TTY outputs. Last updated 2024.
## License: MIT

# Decimal.js Arbitrary-Precision Arithmetic
## https://mikemcl.github.io/decimal.js/
Official documentation for Decimal.js, detailing API methods for arbitrary-precision decimal arithmetic, configurable rounding modes, and performance considerations. Critical for implementing the Chudnovsky algorithm with high accuracy and predictable performance characteristics. Last updated 2023; MIT License.
## License: MIT

# Chudnovsky Algorithm Overview
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Authoritative overview of the Chudnovsky algorithm for computing π using a rapidly converging series. Provides the mathematical formulation, convergence proofs, and performance characteristics necessary for high-performance digit computations. Last edited May 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# Bailey–Borwein–Plouffe Formula
## https://en.wikipedia.org/wiki/Bailey%E2%80%93Borwein%E2%80%93Plouffe_formula
Comprehensive explanation of the BBP digit-extraction algorithm for π, which enables computation of individual hexadecimal digits at arbitrary positions without full-series summation. Essential for implementing both single-digit and digit-range extraction features. Last edited June 2024; CC BY-SA 3.0.
## License: CC BY-SA 3.0

# js-yaml Configuration Library
## https://github.com/nodeca/js-yaml#readme
README and API documentation for js-yaml, covering YAML parsing, serialization, schema definitions, and error handling. Used for loading and validating project-level configuration files (YAML/JSON) to seed CLI defaults. Last updated 2024; MIT License.
## License: MIT

# EJS Templating
## https://github.com/mde/ejs#readme
Official README for the EJS templating engine, describing syntax, API for render and compile functions, and integration with Node.js. Crucial for generating dynamic benchmark and report templates in markdown or HTML formats. Last updated 2023; MIT License.
## License: MIT

# Chart.js Node Rendering
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Guide to rendering Chart.js charts server-side with Node.js, covering canvas setup, chart configuration options, and exporting to PNG or buffer outputs. Vital for creating performance visualizations embedded in CLI reports. Last updated 2024; MIT License.
## License: MIT

# Yargs CLI Parser
## https://github.com/yargs/yargs/blob/master/docs/api.md
Comprehensive API documentation for yargs, detailing command definitions, option parsing, middleware, and automated help/version generation. Key for building a robust, intuitive CLI interface with structured commands and global flags. Last updated July 2024; MIT License.
## License: MIT

# prom-client Library
## https://github.com/siimon/prom-client#readme
Documentation for prom-client, covering metric types (Counters, Gauges, Histograms, Summaries), registry management, and Prometheus exposition compliance. Critical for instrumenting application and algorithm performance and exposing a /metrics endpoint in the HTTP API. Last updated 2024; MIT License.
## License: MIT

# Zod Schema Validation
## https://zod.dev/
Full documentation for Zod, a TypeScript-first schema validation library. Covers schema creation, unification, transformations, and error handling patterns. Essential for validating CLI configuration files and runtime inputs with strict type safety. Version 3.x; MIT License.
## License: MIT

# dotenv Environment Configuration
## https://github.com/motdotla/dotenv#readme
Guide to dotenv for loading environment variables from .env files into process.env. Useful for configuring default ports, cache directories, or API keys without hardcoding values. Includes best practices for security and deployment. Last updated 2024; MIT License.
## License: BSD-2-Clause

# Prometheus Exposition Format
## https://prometheus.io/docs/instrumenting/exposition_formats/
Official Prometheus documentation on the text-based exposition formats (version 0.0.4) used to expose metrics. Details the syntax, conventions, and content negotiation required by prom-client’s /metrics endpoint, ensuring full compliance with Prometheus scraping. Current as of 2024; licensed under CC-BY 4.0.
## License: CC-BY-4.0