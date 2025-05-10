# Decimal.js
## https://mikemcl.github.io/decimal.js/
Comprehensive API reference and usage guide for Decimal.js, the arbitrary-precision arithmetic library at the core of all π computations in this project. Covers precision configuration, rounding modes, performance tuning, and advanced series algorithms (Machin, Gauss–Legendre, Chudnovsky) with extensive usage examples. Essential for precision management, avoiding rounding errors, and optimizing calculation speed in high-digit computations.
Last updated 2024; highly authoritative as the library’s official documentation.
## MIT License

# QuickChart.js Client Library
## https://github.com/typpo/quickchart-js
Official JavaScript client for QuickChart.io providing a fluent API to build chart configurations, fetch rendered images or URLs, and manage SSL, custom fonts, and advanced rendering options. Demonstrates integration patterns for line, bar, and multi-dataset charts, theming, axes customization, and sizing. Critical for PNG report generation in convergence, distribution, benchmark, and comparison features.
Last updated 2024.
## MIT License

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Authoritative guide to Express 4.x, detailing routing, middleware design, error handling, request parsing, response streaming, and static file serving. Foundational for building HTTP API endpoints, SSE streaming, JSON services, and integrating diagnostic middleware in our π service.
Official docs under MIT License.
## MIT License

# Node.js Core API Reference
## https://nodejs.org/api/
Centralized documentation for Node.js core modules including worker_threads, fs.promises, readline, perf_hooks, and others. Covers Worker creation and message passing, file I/O promises, interactive CLI interfaces, high-resolution timing, and event-loop metrics. Crucial for parallel π computation, atomic file operations, REPL mode, diagnostics, and more across Node 20.
Node.js v20; Node.js License.
## Node.js License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, asynchronous parsing, and error formatting. Critical for defining and validating CLI flag schemas, configuration inputs (cosmiconfig), HTTP request parameters, and ensuring robust input handling.
Maintained under MIT License.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml
Official repository and documentation for js-yaml, detailing YAML parsing and stringification APIs, custom schema creation, and security best practices. Essential for script mode parsing, HTML report generation from YAML scripts, and configuration file handling.
Last published 2024.
## BSD-2-Clause

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for discovering and loading configuration files (JSON, YAML, JS), search order, caching strategies, and error handling. Vital for the PI Configuration feature that merges defaults, environment settings, and CLI flags.
Last updated 2024.
## MIT License

# proper-lockfile
## https://www.npmjs.com/package/proper-lockfile
Official npm package documentation for reliable file locking and atomic write operations in Node.js. Covers acquiring and releasing locks, retry strategies, and ensuring data integrity under concurrent access—crucial for the PI Cache feature.
Last published 2024.
## MIT License

# cli-progress
## https://github.com/cli-progress/cli-progress
Versatile progress bar library for Node.js supporting single and multi-bar displays, custom formatting tokens, and real-time console updates. Important for live progress indicators in long-running π computations and benchmarking processes when `--progress` is enabled.
Last updated 2024.
## MIT License

# EJS
## https://ejs.co/#docs
Embedded JavaScript templating engine docs covering template syntax, partials, includes, and custom filters. Fundamental for HTML report generation to template dashboards, embed Base64 images, and render code blocks in static reports.
Last updated 2024.
## MIT License

# Vitest Testing Framework
## https://vitest.dev/api/
Official Vitest documentation for writing unit, integration, and end-to-end tests in Node.js. Covers test suite APIs (`describe`, `test`, `expect`), mocking, setup/teardown hooks, configuration options, and coverage reporting. Critical for maintaining robust test suites across core features and HTTP endpoints.
Last updated 2024.
## MIT License

# Wikipedia: Computation of π
## https://en.wikipedia.org/wiki/Computation_of_pi
Comprehensive overview of historical and modern algorithms for computing π, including Machin-like formulas, Gauss–Legendre, Chudnovsky, and BBP series. Details convergence rates, implementation considerations, and performance characteristics. Valuable for understanding algorithmic foundations, error bounds, and selecting optimal methods. Continuously updated; highly authoritative.
## CC BY-SA 3.0

# OpenAPI Specification
## https://spec.openapis.org/oas/latest.html
The authoritative specification for OpenAPI (formerly Swagger) detailing the OpenAPI 3.1.0 schema for describing RESTful APIs. Includes definitions for paths, components, parameters, and responses. Essential for implementing and synchronizing the Swagger UI documentation, ensuring the HTTP API spec stays up-to-date.
Last updated 2023; maintained by the OpenAPI Initiative under the OSI-Critical Open Group Public License.
## OSP-1.0

# swagger-ui-express
## https://github.com/scottie1984/swagger-ui-express
Official middleware package for serving Swagger UI in Express applications. Provides `serve` and `setup` functions to mount interactive API documentation. Key for integrating API explorer and enabling live testing of π HTTP endpoints.
Last updated 2024.
## MIT License

# Node.js Performance Hooks API
## https://nodejs.org/api/perf_hooks.html
Centralized documentation for the Node.js `perf_hooks` module, including `performance.now()`, `performance.timerify()`, `PerformanceObserver`, and `performance.eventLoopUtilization()`. Covers collection of high-resolution timing and event-loop metrics. Essential for implementing the Diagnostics feature to measure compute time, memory usage, and event-loop utilization in π computations and HTTP responses.
Node.js v20; Node.js License.
## Node.js License

# MDN Web API: AbortController
## https://developer.mozilla.org/en-US/docs/Web/API/AbortController
Comprehensive guide to the `AbortController` and `AbortSignal` Web API, detailing usage patterns for aborting fetch requests, timers, and custom asynchronous workflows. Covers signal event listeners, `abort()` semantics, timeout patterns, and integration in both browser and Node.js environments. Vital for the Operation Timeout feature to create and propagate abort signals for graceful cancellation of long-running π computations and HTTP requests.
Continuously updated; CC BY-SA 2.5 license.
## CC BY-SA 2.5