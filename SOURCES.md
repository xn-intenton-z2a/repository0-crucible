# QuickChart API Documentation
## https://quickchart.io/documentation
Detailed guide to the QuickChart.io REST API for generating charts as images. Includes the full JSON schema for chart definitions, URL parameter conventions, and HTTP endpoints for synchronous and asynchronous rendering. Provides practical usage examples for customizing chart types, colors, labels, and export options—vital for on-demand PNG chart generation in benchmarking and reporting features. Continuously updated; authoritative source maintained by QuickChart.io.
## CC0 1.0 Universal

# Chart.js Documentation
## https://www.chartjs.org/docs/latest/
Official Chart.js documentation covering chart types (bar, line, pie, etc.), dataset and scale configuration, animation options, and plugin architecture. Critical for crafting QuickChart chart configurations, understanding data structures, and leveraging advanced features like custom scripts, interactivity, and theme customization. Last updated 2024; maintained by the Chart.js Core Team.
## MIT License

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Authoritative reference for Express 4.x, covering routing, middleware integration (including CORS), error handling, request parsing, and response streaming. Foundation for defining HTTP endpoints (/pi, /benchmark, /metrics), configuring server behavior, and ensuring robust request lifecycle management. Official docs with precise API signatures.
## MIT License

# CORS Middleware for Express
## https://github.com/expressjs/cors
Documentation for the Express CORS middleware, detailing configuration options for origins, methods, headers, credentials, and preflight caching. Essential for enabling secure cross-origin requests on HTTP API endpoints when integrating with web front-ends. Last updated 2024.
## MIT License

# SuperTest
## https://github.com/visionmedia/supertest
Library documentation for HTTP assertions and integration testing of Express applications. Describes request chaining, expectations, and hooks for test runners—essential for end-to-end tests of /pi and /benchmark endpoints, status codes, and response schemas. Last updated 2024; broadly adopted by the Node.js testing community.
## MIT License

# Vitest
## https://vitest.dev/
Comprehensive documentation for Vitest, a Vite-native test framework. Covers configuration, mocking, snapshot testing, performance metrics, and CLI runner usage. Critical for writing unit and integration tests for CLI functions and HTTP server behavior. Latest stable version; actively maintained.
## MIT License

# Commander.js
## https://github.com/tj/commander.js
Minimalist command-line interface library documentation, detailing declarative command and option definitions, argument parsing, validation, and auto-generated help. Ideal for implementing flags like --digits, --benchmark, --serve, --cache, --diagnostics, --openapi, and --progress. De-facto standard for Node.js CLI tooling.
## MIT License

# Node.js Core and Advanced APIs
## https://nodejs.org/api/
Central reference for Node.js built-in modules (fs/promises, path, url) and advanced APIs (worker_threads, perf_hooks, AbortController, zlib). Essential for file I/O, parallel computation, high-resolution performance measurement, HTTP server features, and streaming. Covers Node.js v20+ features and best practices.
## Node.js License

# Zod
## https://github.com/colinhacks/zod
TypeScript-first schema validation library documentation, covering synchronous and asynchronous parsing, refinements, and error handling. Critical for validating CLI inputs and HTTP query parameters to ensure robust and type-safe argument handling in CLI and Express routes. Last updated 2024.
## MIT License

# EJS
## https://ejs.co/#docs
Embedded JavaScript templating engine documentation, describing template syntax, partials, includes, and custom helper functions. Used for generating HTML reports and dashboards that embed π values and charts. Last updated 2024.
## MIT License

# prom-client
## https://github.com/siimon/prom-client
Prometheus client library documentation for Node.js, covering Counter, Gauge, Histogram, and Summary metric types, registry configuration, and exposition formats. Crucial for instrumenting HTTP endpoints and exposing /metrics for monitoring π service performance and latency. Last updated 2024.
## MIT License

# OpenAPI Specification (OAS)
## https://spec.openapis.org/oas/v3.1.0
Official OpenAPI 3.1 specification, defining the structure for API schemas, paths, components, and security. Essential for generating accurate API documentation, driving validation workflows, and ensuring compatibility with tools like Swagger UI. Last updated 2023; authoritative.
## CC0 1.0 Universal

# Swagger UI
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
Guide to installing and integrating Swagger UI for interactive API documentation. Covers static hosting, Express middleware, theming, and serving OpenAPI specs—essential for providing live documentation of /pi, /benchmark, and /metrics endpoints. Latest release 2024; Apache-2.0.
## Apache-2.0

# cli-progress
## https://github.com/streamich/cli-progress#readme
Documentation for cli-progress, a versatile terminal progress bar library for Node.js. Describes SingleBar and MultiBar APIs, configuration options (bar styles, formats, frequency), and event handling. Critical for implementing the --progress flag and real-time feedback during large π computations. Maintained by the community; MIT License.
## MIT License

# MDN BigInt Documentation
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
Comprehensive guide to the JavaScript BigInt primitive—covering creation via literal syntax and constructor, arithmetic operations, type coercion rules, and performance considerations. Essential for understanding high-precision integer arithmetic used in π computation algorithms and avoiding pitfalls with numeric overflow and rounding.
## CC BY-SA 2.5

# Wikipedia: Chudnovsky algorithm
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Detailed description of the Chudnovsky series for π, including the mathematical formula, convergence rate, and term calculation. Highlights opportunities for parallel computation by splitting series terms—vital for implementing and validating the chudnovsky option with worker threads. Maintained by the Wikipedia community; updated continuously.
## CC BY-SA 3.0