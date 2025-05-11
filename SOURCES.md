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
Comprehensive reference for Express 4.x API, covering application setup, routing, middleware patterns, request parsing (json, urlencoded), response streaming, error handling, and integration points. Essential for implementing REST endpoints (/pi, /benchmark, /pi/analysis, /ui, /pi/stream), applying CORS, configuring chunked transfer for streaming, integrating rate limiting middleware, and mounting GraphQL or Swagger UI interfaces. Updated regularly by the Express.js Core Team.
## MIT License

# express-rate-limit
## https://github.com/nfriedly/express-rate-limit#readme
Library documentation for express-rate-limit middleware. Describes usage patterns, configuration options for windowMs and max, header settings, and error handling. Essential for implementing API rate limiting to protect CPU-intensive π endpoints using options like --rate-limit-window-ms and --rate-limit-max. Last updated 2024; maintained by the community.
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
Minimalist command-line interface library documentation, detailing declarative command and option definitions, argument parsing, validation, and auto-generated help. Ideal for implementing flags like --digits, --cache, --benchmark, --serve, --graphql, --stream, --analyze, --diagnostics, and --progress in a structured CLI. De-facto standard for Node.js CLI tooling.
## MIT License

# Node.js Core and Streams APIs
## https://nodejs.org/api/
Central reference for Node.js built-in modules, including fs/promises, path, url, worker_threads, perf_hooks, and the streams API (Readable, Writable, Duplex, Transform). Essential for file I/O, parallel computation, performance measurement, HTTP chunked transfer, and real-time streaming of π digits in CLI and server modes. Covers Node.js v20+ features and best practices.
## Node.js License

# Zod
## https://github.com/colinhacks/zod
TypeScript-first schema validation library documentation, covering synchronous and asynchronous parsing, refinements, and error handling. Critical for validating CLI inputs and HTTP/GraphQL query and mutation parameters to ensure robust, type-safe argument handling. Last updated 2024.
## MIT License

# Configuration File and Environment Variables Libraries
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
Documentation for dotenv and js-yaml libraries to load environment variables and parse configuration files. Covers dotenv usage for loading .env files into process.env, variable substitution, and parsing YAML with js-yaml including schema validation, error handling, and load options. Crucial for implementing features to load .env and .pi-config.yaml files, merge defaults, env vars, and CLI flags, ensuring robust configuration management. Last updated 2024; widely adopted.
## MIT License

# EJS
## https://ejs.co/#docs
Embedded JavaScript templating engine documentation, describing template syntax, partials, includes, and custom helper functions. Used for generating interactive HTML reports and dashboards (/ui), embedding π values, analysis tables, and chart images via base64 URIs. Last updated 2024.
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
Detailed description of the Chudnovsky series for π, including the mathematical formula, convergence properties, and strategies for parallel term computation. Vital for implementing and validating the Chudnovsky algorithm with worker threads.
## CC BY-SA

# GraphQL API Documentation
## https://graphql.org/learn/
## https://github.com/graphql/express-graphql
Official GraphQL learn guide and express-graphql middleware docs. Covers SDL schema definitions, queries, mutations, resolvers, introspection, error handling, and mounting GraphQL endpoints in Express with GraphiQL integration and performance tuning. Fundamental for exposing π computation, analysis, and benchmarking via a flexible GraphQL /graphql endpoint. Last updated 2024; spec is CC0 1.0 Universal, middleware is MIT License.
## CC0 1.0 Universal / MIT License