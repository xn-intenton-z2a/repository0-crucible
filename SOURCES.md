# QuickChart API Documentation
## https://quickchart.io/documentation
Detailed guide to the QuickChart.io REST API for generating charts as images. Includes full JSON schema for chart definitions, URL parameter conventions, and HTTP endpoints for synchronous and asynchronous rendering. Provides practical usage examples for customizing chart types, colors, labels, and export options—vital for on-demand PNG chart generation in both HTTP API and CLI analysis features. Continuously updated and maintained by QuickChart.io.
## CC0 1.0 Universal

# quickchart-js Client Library
## https://github.com/quickchart/quickchart-js
Client library documentation for quickchart-js, detailing programmatic chart generation in Node.js. Covers instantiation of QuickChart objects, chart option schemas, methods such as toBinary() and toURL(), and usage examples for automating image export in CLI and HTTP handlers. Essential for integrating chart creation into analysis and benchmarking endpoints. Updated frequently on GitHub.
## MIT License

# Chart.js Documentation
## https://www.chartjs.org/docs/latest/
Official Chart.js documentation covering chart types (bar, line, pie, etc.), dataset and scale configuration, animation options, and plugin architecture. Important for understanding core chart options and customizing appearance when building QuickChart configurations programmatically. Last updated 2024; maintained by the Chart.js Core Team.
## MIT License

# Express.js and Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Comprehensive reference for Express 4.x API, covering application setup, routing, middleware patterns, request parsing, response streaming, error handling, and integration points. Includes detailed guides on configuring CORS for cross-origin requests and implementing rate limiting with express-rate-limit (windowMs, max requests, standard headers). Essential for REST, analysis, streaming, and WebSocket upgrade endpoints. Last updated regularly by the Express.js core team.
## MIT License

# Testing Tools: Vitest & SuperTest
## https://vitest.dev/
## https://github.com/visionmedia/supertest
Comprehensive documentation for Vitest, a Vite-native test framework covering configuration, mocking, snapshot testing, performance metrics, and CLI runner usage. Paired with SuperTest’s HTTP assertion and integration testing guides for Express applications, describing request chaining, expectations, and hooks for test runners. Critical for unit, E2E, and GraphQL tests of both CLI and HTTP/GraphQL server behavior.
## MIT License

# CLI Libraries (Commander, Progress & Completion)
## https://github.com/tj/commander.js
## https://github.com/streamich/cli-progress#readme
## https://github.com/mklabs/tabtab#readme
Unified reference for key CLI tooling in the project. Commander.js provides declarative command and option definitions, argument parsing, validation, and auto-generated help. cli-progress offers SingleBar and MultiBar APIs for terminal progress bars used by the --progress flag. tabtab enables automatic shell completion script generation for bash, zsh, and fish, streamlining the --generate-completion feature. Together, these libraries form the backbone of the tool’s interactive and automated CLI interface.
## MIT License

# Node.js Core and Streams APIs
## https://nodejs.org/api/
Central reference for Node.js built-in modules, including fs/promises, path, url, worker_threads, perf_hooks, and the streams API (Readable, Writable, Duplex, Transform). Essential for file I/O, parallel computation, performance measurement, HTTP chunked transfer for streaming, real-time WebSocket integration, and module URL resolution. Covers Node.js v20+ features and best practices.
## Node.js License

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first schema validation library documentation, covering synchronous and asynchronous parsing, refinements, and error handling. Critical for validating CLI inputs and HTTP/GraphQL query and mutation parameters to ensure robust, type-safe argument handling. Last updated 2024.
## MIT License

# Configuration and Environment Variables
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
Documentation for dotenv and js-yaml libraries to load environment variables and parse configuration files. Covers dotenv usage for loading .env files into process.env, environment variable substitution, and parsing YAML with js-yaml including schema validation and error handling. Crucial for .pi-config.yaml, .env, and merging defaults with CLI flags. Last updated 2024.
## MIT License

# EJS Templating Engine
## https://ejs.co/#docs
Embedded JavaScript templating engine documentation, describing template syntax, partials, includes, and custom helper functions. Used for generating interactive HTML reports and dashboards (/ui), embedding π values, analysis tables, and chart images via base64 URIs. Last updated 2024.
## MIT License

# API Specifications and Protocols
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
## https://graphql.org/learn/
## https://github.com/graphql/express-graphql
## https://github.com/websockets/ws#readme
Consolidated reference for API schema definitions, documentation, and protocol implementations across REST, GraphQL, and WebSocket interfaces. Includes the OpenAPI 3.1 specification for defining HTTP endpoints and components, Swagger UI integration for interactive API exploration, the official GraphQL Learn guide and express-graphql middleware for GraphQL server setup, and the ws library for real-time WebSocket communications. Essential for designing and documenting /pi, /benchmark, /graphql, /ws/pi, and other protocol-based endpoints. Last updated 2024; licenses vary by tool.
## CC0 1.0 Universal / Apache-2.0 / MIT License

# BigInt and Pi Algorithms Reference
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Comprehensive guide to JavaScript BigInt primitive—creation, arithmetic operations, type coercion, and performance considerations—from MDN, paired with in-depth descriptions of the Chudnovsky and Ramanujan series from Wikipedia. Includes mathematical formulas, convergence properties, and strategies for parallel term computation—vital for implementing algorithm selection and high-precision π calculation. Last updated 2024; authoritative and widely cited.
## CC BY-SA 4.0

# Prometheus Client Library Documentation
## https://github.com/siimon/prom-client#readme
Detailed documentation for prom-client, the de facto Prometheus metrics library for Node.js. Covers default metrics collection, custom Counter, Gauge, Histogram, and Summary metrics, registry configuration, and integration with Express middleware. Essential for exposing operational and performance metrics (/metrics endpoint) and instrumenting HTTP requests and π calculation durations. Last updated 2024.
## MIT License

# Pino Logging Library
## https://github.com/pinojs/pino
High-performance Node.js logging library focusing on low-overhead, structured JSON logging. Documentation covers configuration of log levels, serializers, transports (pino-pretty), and integration with Express via middleware. Provides best practices for logging in CLI and HTTP server modes, including child loggers, hooks, and log redaction. Last updated 2024.
## MIT License

# Server-Sent Events (SSE) Documentation
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Comprehensive overview of the Server-Sent Events (SSE) protocol for unidirectional streaming of text-based event data over HTTP. Covers EventSource client usage, server-side event-stream formatting, reconnection behavior, and content-type requirements (text/event-stream). Critical for implementing the /pi/sse endpoint, handling client connections, and ensuring cross-browser compatibility. Last updated 2024; maintained by MDN contributors.
## CC0 1.0 Universal

# AbortController and AbortSignal Documentation
## https://developer.mozilla.org/en-US/docs/Web/API/AbortController
Authoritative guide to the AbortController and AbortSignal APIs for cancelable operations in JavaScript and Node.js. Details creating and using AbortController, listening for abort events, propagating signals to fetch, streams, and custom functions, as well as best practices for graceful cancellation and cleanup. Vital for implementing graceful shutdown, client-request abort handling in HTTP and WebSocket streams, and cancellation of long-running π computations. Last updated 2024; maintained by MDN contributors.
## CC0 1.0 Universal