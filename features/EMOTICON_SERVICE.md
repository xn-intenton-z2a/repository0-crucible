# EMOTICON_SERVICE Feature

# Overview
Unify and extend the emoticon core service into a single consistent interface supporting CLI usage, HTTP server with metrics, Express middleware, GraphQL API, programmatic API, diagnostics, and custom configuration.

# CLI Interface
- Default invocation prints a random emoticon in plain text.
- Flags: --config <path> for custom JSON or YAML list, --diagnostics for JSON diagnostics, --list to enumerate all emoticons with indices, --seed <n> for deterministic selection, --json for JSON output, --count <n> for batch output, --interactive/-i for REPL, --serve to start HTTP server, --port <n> to specify server port, --version/-v and --help/-h.
- Invalid inputs produce error messages and appropriate exit codes.

# HTTP API
- Built-in server mode on --serve with endpoints GET /, /list, /json, /json/list, /version, /health, /metrics, /ui.
- Query parameters: seed, count, list for deterministic and batch retrieval.
- Responses include Access-Control-Allow-Origin header and correct content types (text/plain, application/json, text/html).
- Prometheus-style metrics with counters for total requests, list, json, seeded, root, and errors.

# Express Middleware
- Export createEmoticonRouter() returning an Express Router with the same HTTP endpoints, CORS, counters, and web UI.

# GraphQL API
- Define a GraphQL schema using graphql-js with Query fields random, seeded(seed: Int!), list, count(count: Int!, seed: Int), version.
- Export graphQLHandler() middleware mounted at /graphql supporting GET and POST with express.json parsing.
- Apply CORS on all GraphQL responses.
- Validate seed and count as non-negative integers and return GraphQL errors on invalid input.
- Increment the same internal counters when resolvers invoke random or seeded selection.

# Programmatic API
- Export listFaces(), randomFace(), seededFace(seed), emoticonJson({ face, mode, seed }), configureEmoticons({ configPath }), getEmoticonDiagnostics(), graphQLHandler(), createEmoticonRouter(), and version constant.

# Diagnostics and Configuration
- Load custom emoticon lists at runtime via --config flag or EMOTICONS_CONFIG env var.
- configureEmoticons returns a diagnostics object with version, configSource, emoticonCount, isCustomConfig, colorStyle, supportsColorLevel and updates internal state.
- getEmoticonDiagnostics returns the last diagnostics snapshot without side effects.

# Dependencies
- Add graphql to package.json dependencies for GraphQL support.