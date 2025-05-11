# QuickChart API Documentation
## https://quickchart.io/documentation
Detailed guide to the QuickChart.io REST API for generating charts as images. Includes the full JSON schema for chart definitions, URL parameter conventions, and HTTP endpoints for synchronous and asynchronous rendering. Provides practical usage examples for customizing chart types, colors, labels, and export options—vital for on-demand PNG chart generation in both HTTP API and CLI benchmarking/charting features. Continuously updated; authoritative source maintained by QuickChart.io.
## CC0 1.0 Universal

# Chart.js Documentation
## https://www.chartjs.org/docs/latest/
Official Chart.js documentation covering chart types (bar, line, pie, etc.), dataset and scale configuration, animation options, and plugin architecture. Critical for crafting QuickChart chart configurations, understanding data structures, and leveraging advanced features like custom scripts, interactivity, and theming. Last updated 2024; maintained by the Chart.js Core Team.
## MIT License

# quickchart-js Client Library
## https://github.com/quickchart/quickchart-js
Client library documentation for quickchart-js, detailing programmatic chart generation in Node.js. Covers instantiation of QuickChart objects, chart option schemas, methods such as toBinary() and toURL(), and usage examples for automating image export in CLI and HTTP handlers. Updated frequently on GitHub; provides async/await patterns, error handling, and CLI integration guidance.
## MIT License

# Express.js Documentation
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express 4.x, covering routing, middleware integration, request parsing, response streaming, and error handling. Essential for defining REST endpoints (/pi, /benchmark, /metrics, /pi/analysis, /ui, /pi/stream), integrating CORS, and mounting GraphQL or Swagger UI middleware. Updated regularly by the Express.js Core Team.
## MIT License

# SuperTest
## https://github.com/visionmedia/supertest
Library documentation for HTTP assertions and integration testing of Express applications. Describes request chaining, expectations, and hooks for test runners—vital for end-to-end tests of HTTP endpoints, status codes, and content types in both REST and GraphQL modes. Last updated 2024; broadly adopted by the Node.js testing community.
## MIT License

# Vitest
## https://vitest.dev/
Comprehensive documentation for Vitest, a Vite-native test framework. Covers configuration, mocking, snapshot testing, performance metrics, and CLI runner usage. Critical for writing unit and integration tests for both CLI functions and HTTP/GraphQL server behavior. Latest stable version; actively maintained.
## MIT License

# Commander.js
## https://github.com/tj/commander.js
Minimalist command-line interface library documentation, detailing declarative command and option definitions, argument parsing, validation, and auto-generated help. Ideal for implementing flags like --digits, --cache, --benchmark, --serve, --graphql, --stream, --analyze, --diagnostics, and --progress. De-facto standard for Node.js CLI tooling.
## MIT License

# Node.js Core and Streams APIs
## https://nodejs.org/api/
Central reference for Node.js built-in modules, including fs/promises, path, url, worker_threads, perf_hooks, and the streams API (Readable, Writable, Duplex, Transform). Essential for file I/O, parallel computation, performance measurement, HTTP chunked transfer, and real-time streaming of π digits in CLI and server modes. Covers Node.js v20+ features and best practices.
## Node.js License

# Zod
## https://github.com/colinhacks/zod
TypeScript-first schema validation library documentation, covering synchronous and asynchronous parsing, refinements, and error handling. Critical for validating CLI inputs and HTTP/GraphQL query and mutation parameters to ensure robust, type-safe argument handling. Last updated 2024.
## MIT License

# EJS
## https://ejs.co/#docs
Embedded JavaScript templating engine documentation, describing template syntax, partials, includes, and custom helper functions. Used for generating interactive HTML reports and dashboards (/ui), embedding π values, analysis tables, and chart images via base64 URIs. Last updated 2024.
## MIT License

# prom-client
## https://github.com/siimon/prom-client
Prometheus client library documentation for Node.js, covering Counter, Gauge, Histogram, and Summary metric types, registry configuration, and exposition formats. Crucial for instrumenting HTTP endpoints and exposing /metrics for monitoring π service performance and latency. Last updated 2024.
## MIT License

# OpenAPI and Swagger UI
## https://spec.openapis.org/oas/v3.1.0
Official OpenAPI 3.1 specification defining structure for API schemas, paths, components, and security. Essential for generating accurate API documentation and driving validation workflows.
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
Guide to installing and integrating Swagger UI for interactive API documentation. Covers static hosting, Express middleware, theming, and serving OpenAPI specs—vital for live documentation of REST endpoints. Uses Apache-2.0; spec is CC0 1.0 Universal.
## CC0 1.0 Universal / Apache-2.0

# cli-progress
## https://github.com/streamich/cli-progress#readme
Documentation for cli-progress, a terminal progress bar library for Node.js. Describes SingleBar and MultiBar APIs, configuration options, and event handling. Critical for implementing the --progress flag to visualize computation progress in the CLI. Maintained by the community; MIT License.
## MIT License

# BigInt and Chudnovsky Algorithm
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
Comprehensive guide to JavaScript BigInt primitive—creation, arithmetic operations, type coercion, and performance considerations. Essential for high-precision integer arithmetic in π computation algorithms.
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Detailed description of the Chudnovsky series for π, including the mathematical formula, convergence properties, and strategies for parallel term computation. Vital for implementing and validating the chudnovsky algorithm with worker threads.
## CC BY-SA

# GraphQL Specification
## https://graphql.org/learn/
Official GraphQL Learn documentation covering schema definition language (SDL), query and mutation syntax, type system, resolvers, and introspection. Provides foundational knowledge for building a GraphQL API layer that unifies π computation, analysis, and benchmarking.
## CC0 1.0 Universal

# express-graphql Documentation
## https://github.com/graphql/express-graphql
Guide to integrating GraphQL into Express applications using express-graphql middleware. Covers schema mounting, GraphiQL IDE options, error handling, and performance tuning. Essential for exposing /graphql endpoints backed by core computation logic.
## MIT License