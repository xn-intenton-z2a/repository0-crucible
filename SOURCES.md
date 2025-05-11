# QuickChart API Documentation
## https://quickchart.io/documentation
Detailed guide to the QuickChart.io REST API for generating charts as images. Includes full JSON schema for chart definitions, URL parameter conventions, and HTTP endpoints for synchronous and asynchronous rendering. Provides practical usage examples for customizing chart types, colors, labels, and export options—vital for on-demand PNG chart generation in both HTTP API and CLI features. Continuously updated; authoritative source maintained by QuickChart.io.
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
Comprehensive reference for Express 4.x API, covering application setup, routing, middleware patterns, request parsing (json, urlencoded), response streaming, error handling, and integration points. Essential for implementing REST endpoints, applying CORS, configuring chunked transfer for streaming, integrating Swagger UI or GraphQL interfaces, and mounting metrics. Also references popular middleware such as express-rate-limit (https://github.com/nfriedly/express-rate-limit) for rate limiting. Updated regularly by the Express.js Core Team.
## MIT License

# CORS Middleware Documentation
## https://github.com/expressjs/cors
Official repository and documentation for CORS middleware in Express.js, covering configuration options for origin, methods, headers, credentials, and preflight behavior. Essential for enabling cross-origin HTTP requests in browser-based clients and APIs. Last updated 2024; maintained by the Express.js team and community.
## MIT License

# Testing Tools: Vitest & SuperTest
## https://vitest.dev/
## https://github.com/visionmedia/supertest
Comprehensive documentation for Vitest, a Vite-native test framework covering configuration, mocking, snapshot testing, performance metrics, and CLI runner usage. Paired with SuperTest’s HTTP assertion and integration testing guides for Express applications, describing request chaining, expectations, and hooks for test runners. Critical for unit and end-to-end testing of CLI functions and HTTP/GraphQL server behavior. Both are actively maintained and widely adopted.
## MIT License

# Commander.js
## https://github.com/tj/commander.js
Minimalist command-line interface library documentation, detailing declarative command and option definitions, argument parsing, validation, and auto-generated help. Ideal for implementing flags like --digits, --cache, --benchmark, --serve, --graphql, --stream, --analyze, --diagnostics, and --progress in a structured CLI. De-facto standard for Node.js CLI tooling.
## MIT License

# Node.js Core and Streams APIs
## https://nodejs.org/api/
Central reference for Node.js built-in modules, including fs/promises, path, url, worker_threads, perf_hooks, and the streams API (Readable, Writable, Duplex, Transform). Essential for file I/O, parallel computation, performance measurement, HTTP chunked transfer, real-time streaming of π digits, and module URL resolution. Covers Node.js v20+ features and best practices.
## Node.js License

# Zod
## https://github.com/colinhacks/zod
TypeScript-first schema validation library documentation, covering synchronous and asynchronous parsing, refinements, and error handling. Critical for validating CLI inputs and HTTP/GraphQL query and mutation parameters to ensure robust, type-safe argument handling. Last updated 2024.
## MIT License

# Configuration File and Environment Variables Libraries
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
Documentation for dotenv and js-yaml libraries to load environment variables and parse configuration files. Covers dotenv usage for loading .env files into process.env, environment variable substitution, and parsing YAML with js-yaml including schema validation, error handling, and load options. Crucial for implementing features to load .env and .pi-config.yaml files, merge defaults, env vars, and CLI flags, ensuring robust configuration management. Last updated 2024; widely adopted.
## MIT License

# EJS
## https://ejs.co/#docs
Embedded JavaScript templating engine documentation, describing template syntax, partials, includes, and custom helper functions. Used for generating interactive HTML reports and dashboards (/ui), embedding π values, analysis tables, and chart images via base64 URIs. Last updated 2024.
## MIT License

# OpenAPI and Swagger UI
## https://spec.openapis.org/oas/v3.1.0
## https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
Official OpenAPI 3.1 specification defining the structure for API schemas, paths, components, and security. Essential for generating accurate API documentation and driving validation workflows. Swagger UI guide covers installation, Express middleware integration, theming, and serving OpenAPI specs—vital for live documentation of REST endpoints.
## CC0 1.0 Universal / Apache-2.0

# cli-progress
## https://github.com/streamich/cli-progress#readme
Documentation for cli-progress, a terminal progress bar library for Node.js. Describes SingleBar and MultiBar APIs, configuration options, and event handling. Critical for implementing the --progress flag to visualize computation progress in the CLI. Maintained by the community.
## MIT License

# BigInt and Chudnovsky Algorithm
## https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
## https://en.wikipedia.org/wiki/Chudnovsky_algorithm
Comprehensive guide to JavaScript BigInt primitive—creation, arithmetic operations, type coercion, and performance considerations—paired with a detailed description of the Chudnovsky series for π, including the mathematical formula, convergence properties, and strategies for parallel term computation. Vital for implementing and validating the Chudnovsky algorithm with worker threads.
## CC BY-SA

# GraphQL API Documentation
## https://graphql.org/learn/
## https://github.com/graphql/express-graphql
Official GraphQL learn guide and express-graphql middleware docs. Covers SDL schema definitions, queries, mutations, resolvers, introspection, error handling, and mounting GraphQL endpoints in Express with GraphiQL integration and performance tuning. Fundamental for exposing π computation, analysis, and benchmarking via a flexible GraphQL /graphql endpoint. Last updated 2024.
## CC0 1.0 Universal / MIT License

# Prometheus Client Library Documentation
## https://github.com/siimon/prom-client#readme
Detailed documentation for prom-client, the de facto Prometheus metrics library for Node.js. Covers default metrics collection, custom Counter, Gauge, Histogram, and Summary metrics, registry configuration, and integration with Express middleware. Essential for exposing operational and performance metrics (/metrics endpoint) and instrumenting HTTP requests and π calculation durations.
## MIT License