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

# Chart.js Node Canvas Integration
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Provides a Node.js integration for server-side rendering of Chart.js charts using node-canvas. Covers setup of ChartJSNodeCanvas, configuration of chart dimensions, registration of fonts, and usage of renderToBuffer and renderToStream methods to produce PNG outputs. Crucial for implementing the --chart CLI option and the /pi/chart HTTP endpoint with actionable examples for rendering line charts of π convergence. Last updated 2024; maintained under MIT License on GitHub.
## MIT License

# Express.js and Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/cors
## https://github.com/nfriedly/express-rate-limit
Comprehensive reference for Express 4.x API, covering application setup, routing, middleware patterns, request parsing, response streaming, error handling, and integration points. Includes detailed guides on configuring CORS for cross-origin requests and implementing rate limiting with express-rate-limit (windowMs, max requests, standard headers). Essential for REST, analysis, streaming, and WebSocket upgrade endpoints.
## MIT License

# Testing Tools: Vitest & SuperTest
## https://vitest.dev/
## https://github.com/visionmedia/supertest
Comprehensive documentation for Vitest, a Vite-native test framework covering configuration, mocking, snapshot testing, performance metrics, and CLI runner usage. Paired with SuperTest’s HTTP assertion and integration testing guides for Express applications, describing request chaining, expectations, and hooks for test runners. Critical for unit, E2E, and GraphQL tests of both CLI and HTTP/GraphQL server behavior.
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
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
Consolidated reference for API schema definitions, documentation, and protocol implementations across REST, GraphQL, and real-time streaming interfaces. Includes the OpenAPI 3.1 specification for defining HTTP endpoints and components, Swagger UI integration for interactive API exploration, the official GraphQL Learn guide and express-graphql middleware for GraphQL server setup, the ws library for WebSocket communications, and MDN’s Server-Sent Events guide for unidirectional event streaming. Essential for designing and documenting /pi, /benchmark, /graphql, /ws/pi, /pi/sse, and other protocol-based endpoints. Last updated 2024; licenses vary by tool.
## CC0 1.0 Universal / Apache-2.0 / MIT License

# BigInt and Pi Algorithms Reference
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
## https://en.wikipedia.org/wiki/Ramanujan%E2%80%93Sato_series
Comprehensive guide to JavaScript BigInt primitive—creation, arithmetic operations, type coercion, and performance considerations—from MDN, paired with in-depth descriptions of the Chudnovsky and Ramanujan series from Wikipedia. Includes mathematical formulas, convergence properties, and strategies for parallel term computation—vital for implementing algorithm selection and high-precision π calculation. Last updated 2024; authoritative and widely cited.
## CC BY-SA 4.0

# Observability: Logging & Metrics
## https://github.com/siimon/prom-client#readme
## https://github.com/pinojs/pino
Detailed documentation for prom-client and Pino libraries to instrument Node.js applications. prom-client covers default metrics, custom Counter, Gauge, Histogram, and Summary metrics, registry management, and Express middleware integration to expose Prometheus endpoints. Pino provides high-performance structured JSON logging, covering configuration, serializers, transports, and best practices for log management and redaction. Essential for exposing /metrics and capturing operational and performance data across CLI and HTTP modes. Last updated 2024.
## MIT License

# OpenAI API Reference
## https://platform.openai.com/docs/api-reference
Official OpenAI API reference covering endpoints for completions, chat, embeddings, and fine-tuning. Includes detailed parameter specifications, request/response schemas, rate limit guidance, and code examples in multiple languages. Critical for integrating AI-driven features and ensuring correct usage of the OpenAI service in CLI commands and server endpoints. Last updated 2024; authoritative.
## Proprietary

# Decimal.js
## https://mikemcl.github.io/decimal.js/
## https://github.com/MikeMcl/decimal.js
Comprehensive documentation for decimal.js library, detailing arbitrary-precision decimal arithmetic capabilities. Covers API methods for construction, arithmetic operations, configuration of precision and rounding modes, and performance considerations. Essential for implementing the Gauss-Legendre algorithm for π calculation with Decimal objects. Last release v10.4.3; maintained on GitHub.
## MIT License

# Node.js Performance Hooks API
## https://nodejs.org/api/perf_hooks.html
Documentation for Node.js Performance Hooks, including high-resolution timers (performance.now()), PerformanceObserver, mark and measure functions, and performance entry types. Provides best practices for measuring execution duration with minimal overhead—critical for implementing accurate benchmarking of π calculation algorithms. Last updated 2024.
## Node.js License