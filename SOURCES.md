# Chart Rendering APIs
## https://quickchart.io/documentation
## https://documentation.image-charts.com/en
Detailed guide to generating charts via REST APIs using QuickChart.io and Image-Charts. Covers JSON schema for chart definitions, URL parameter conventions (chart types, colors, labels, theming), parameter limits, and HTTP endpoints. Provides practical examples for on-demand PNG rendering, customization, and fallback strategies. Essential for designing URL-based chart generation features such as /pi/chart and CLI --chart output. Last updated 2024; authoritative and widely used by developers.
## CC0 1.0 Universal / Proprietary (free tier)

# Chart.js & Node-Canvas Integration
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Official Chart.js documentation combined with ChartjsNodeCanvas integration guide. Covers core chart types (bar, line, pie, etc.), dataset and scale configuration, animation options, plugin architecture, and setting up ChartJSNodeCanvas with node-canvas for server-side rendering. Includes code examples for instantiating charts in a Canvas context and rendering to buffers or streams. Crucial for CLI and HTTP chart endpoints with actionable implementation details. Last updated 2024; maintained by Chart.js Core Team and community contributors.
## MIT License

# Express.js and Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Comprehensive reference for Express 4.x API setup, routing, middleware patterns, request parsing, error handling, and integration points. Includes CORS configuration and rate limiting strategies (windowMs, max requests). Essential for building REST, analysis, streaming, and WebSocket upgrade endpoints in the π HTTP server. Last updated 2024; maintained by the Express.js team.
## MIT License

# Testing Tools: Vitest & SuperTest
## https://vitest.dev/
## https://github.com/visionmedia/supertest
Documentation for Vitest (configuration, mocking, snapshot testing, performance metrics) paired with SuperTest’s HTTP assertion and integration testing guides. Crucial for unit, end-to-end, and integration tests of CLI and HTTP/GraphQL server behavior. Provides examples for mocking fs, console, and worker threads. Last updated 2024; widely adopted in modern Node.js projects.
## MIT License

# Node.js Core APIs
## https://nodejs.org/api/
## https://nodejs.org/api/perf_hooks.html
Central reference for Node.js built-in modules including fs/promises, path, url, worker_threads, and the streams API (Readable, Writable, Duplex, Transform), alongside the Performance Hooks API (performance.now(), PerformanceObserver, mark/measure). Essential for file I/O, parallel computation, streaming, and accurate performance measurement in π calculations and server operations. Node.js License.
## Node.js License

# Node.js Worker Threads
## https://nodejs.org/api/worker_threads.html
Detailed guide to the Worker Threads API in Node.js. Covers Worker creation, workerData transfers, parentPort communication, MessageChannel, performance considerations, and error handling. Vital for implementing --workers parallel Monte Carlo sampling feature to leverage multi-core CPUs. Last updated 2024; maintained by Node.js core team.
## Node.js License

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first schema validation library covering synchronous/asynchronous parsing, refinements, and error handling. Critical for validating CLI inputs and HTTP/GraphQL parameters to ensure robust, type-safe user interactions. Includes detailed examples for crafting complex schemas and error formatting. Last updated 2024; MIT License.
## MIT License

# Configuration and Environment Variables
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
Guides for loading environment variables with dotenv and parsing YAML with js-yaml, including schema validation and error handling. Important for managing .env, .pi-config.yaml, and merging defaults with CLI flags across environments. Last updated 2024; MIT License.
## MIT License

# EJS Templating Engine
## https://ejs.co/#docs
Documentation for Embedded JavaScript templating engine syntax, partials, includes, and helper functions. Used for generating interactive HTML reports and dashboards embedding π values, charts, and tables. Last updated 2024; MIT License.
## MIT License

# API Specifications and Protocols
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://graphql.org/learn/
## https://github.com/graphql/express-graphql
## https://github.com/websockets/ws#readme
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Consolidated reference for defining and interacting with REST, GraphQL, WebSocket, and SSE endpoints. Includes OpenAPI 3.1 spec for HTTP schemas, Swagger UI for interactive docs, express-graphql middleware, ws library for WebSockets, and MDN guide to Server-Sent Events. Essential for documenting and implementing /pi, /benchmark, /graphql, /ws/pi, /pi/sse, and related endpoints. CC0 1.0 Universal / Apache-2.0 / MIT License.
## CC0 1.0 Universal / Apache-2.0 / MIT License

# BigInt and π Algorithms Reference
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Comprehensive guide to JavaScript BigInt and in-depth descriptions of Chudnovsky and Ramanujan–Sato series. Covers mathematical formulas, convergence properties, and parallel term computation strategies. Vital for implementing high-precision π calculations. Authoritative and widely cited; last updated 2024. CC BY-SA 4.0.
## CC BY-SA 4.0

# Observability: Logging & Metrics
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
Documentation for prom-client and Pino to instrument Node.js apps. prom-client covers metrics registration (Counter, Gauge, Histogram, Summary) and Express middleware; Pino details structured JSON logging, serializers, and transports. Essential for /metrics endpoint and capturing performance data. Last updated 2024; MIT License.
## MIT License

# Decimal.js
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
Guide to arbitrary-precision decimal arithmetic with detailed API methods for precision and rounding configurations. Critical for implementing Gauss-Legendre, Chudnovsky, and Ramanujan-Sato algorithms with Decimal objects. Last release v10.4.3; MIT License.
## MIT License

# minimist - Argument Parsing
## https://www.npmjs.com/package/minimist
Official npm readme for minimist, detailing boolean flags, string coercion, default values, aliases, and error handling. Essential for robust CLI parsing of options (--digits, --algorithm, --samples, --benchmark, --error, etc.). MIT License.
## MIT License

# Node-Canvas Documentation
## https://github.com/Automattic/node-canvas#readme
Installation and Canvas API usage for server-side rendering of images and graphics in Node.js. Covers Canvas creation, drawing APIs, handling fonts, and exporting to buffers or streams. Essential for manual canvas manipulations and supporting chart generation pipelines. Last updated 2024; highly active repository with community contributions.
## MIT License

# CLI-Progress
## https://github.com/cli-progress/cli-progress#readme
Detailed guide to using cli-progress for terminal progress bars in Node.js CLI apps. Covers multi-bar support, formatting options, custom payloads, and controlling bar updates for long-running tasks. Essential for implementing --progress live feedback in π calculations. Last updated 2024; MIT License.
## MIT License