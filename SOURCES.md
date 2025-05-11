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

# QuickChart API Documentation
## https://quickchart.io/documentation/
Technical reference for QuickChart’s REST API, detailing chart configuration schema, HTTP endpoints, request payload structure, response formats, and advanced features such as time-series charts, custom fonts, and server-side rendering options. Crucial for understanding the JSON chart spec and troubleshooting direct API interactions beyond client library abstractions. Last updated 2024; authoritative official documentation.
## Public Domain

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Authoritative guide to Express 4.x, detailing routing, middleware design, error handling, request parsing, response streaming, and static file serving. Foundational for building HTTP API endpoints, SSE streaming, JSON services, CORS integration, and integrating diagnostic middleware in our π service.
Official docs under MIT License.
## MIT License

# Node.js Core and Advanced APIs
## https://nodejs.org/api/
Centralized documentation for Node.js core modules (fs, path, url), with dedicated sections on worker_threads, perf_hooks, AbortController, and global web APIs including fetch. Covers file I/O, atomic operations, threading primitives, high-resolution timing, abort signals, concurrent locks, and HTTP server essentials in Node 20. Essential for implementing parallel computation, performance diagnostics, graceful cancellation, and robust server features.
Node.js v20; Node.js License.
## Node.js License

# zod
## https://github.com/colinhacks/zod
Declarative schema validation library docs, covering object schemas, refinements, asynchronous parsing, and error formatting. Critical for defining and validating CLI flag schemas, configuration inputs (cosmiconfig), HTTP request parameters, and ensuring robust input handling.
Maintained under MIT License.
## MIT License

# cosmiconfig
## https://github.com/davidtheclark/cosmiconfig
Comprehensive guide to using cosmiconfig for discovering and loading configuration files (JSON, YAML, JS), search order, caching strategies, and error handling. Vital for the PI Configuration feature that merges defaults, environment settings, and CLI flags.
Last updated 2024.
## MIT License

# js-yaml
## https://github.com/nodeca/js-yaml
Official documentation for js-yaml, covering YAML parsing and dumping in JavaScript, handling custom schemas, safeLoad vs load, and serialization options. Crucial for script mode parsing in batch operations, enabling flexible command sequencing via JSON or YAML.
Last updated 2024; maintained under MIT License.
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

# Swagger UI Express Middleware
## https://github.com/scottie1984/swagger-ui-express
Official middleware to integrate Swagger UI into Express applications. Provides `serve` and `setup` functions to host interactive API docs from an OpenAPI spec. Demonstrates mounting raw JSON spec at `/docs.json` and UI at `/docs`, CSS/JS customization, and middleware ordering considerations. Essential for the Swagger UI documentation feature in the HTTP server.
Last updated 2024; MIT License.
## MIT License

# MDN Web API: Server-Sent Events
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Comprehensive guide to Server-Sent Events (SSE), detailing the `EventSource` API, event types, reconnection behavior, and custom headers. Explains both server and client usage patterns, including establishing a persistent `text/event-stream`, sending formatted SSE messages, and handling events in JavaScript. Vital for implementing the `/pi/stream` SSE endpoint to stream π digits in real time.
Continuously updated; CC BY-SA 2.5.
## CC BY-SA 2.5

# CORS middleware for Express
## https://github.com/expressjs/cors
Official documentation for the `cors` middleware package for Express. Explains configuration of Access-Control-Allow-Origin, methods, headers, credentials support, and options for dynamic origin handling. Vital for implementing robust CORS support in the HTTP API server, including custom origin settings and preflight response handling.
Last updated 2024; MIT License.
## MIT License

# OpenAPI Specification 3.0.3
## https://spec.openapis.org/oas/3.0.3
Authoritative schema definition for OpenAPI 3.0, detailing syntax for defining RESTful API contracts, including paths, parameters, request/response schemas, components, servers, and security configurations. Fundamental for generating and validating OpenAPI docs and ensuring consistency between server implementation and interactive Swagger UI. Last updated 2021; provided by the OpenAPI Initiative under CC0.
## CC0

# Wikipedia: Pi Computation Algorithms
## https://en.wikipedia.org/wiki/Pi#Computation
Comprehensive overview of π calculation methods, including Machin-like formulas, the Gauss–Legendre algorithm, the Chudnovsky algorithm, and series convergence properties. Offers mathematical context, algorithmic complexity, and implementation considerations that guide selection of appropriate algorithms based on performance and precision requirements. Continuously updated under CC BY-SA 3.0.
## CC BY-SA 3.0