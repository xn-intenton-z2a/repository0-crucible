# EMOTICON_SERVICE Feature

# Overview
Unify the core emoticon service to support CLI, built-in HTTP server, Express middleware, GraphQL endpoint, interactive REPL, diagnostics, programmatic API, and metrics. Ensure consistent configuration loading, custom emoticon lists, CORS, and counters across all interfaces.

# CLI Interface
- Default invocation prints one random emoticon.
- Flags:
  --config <path> load JSON or YAML emoticon list
  --diagnostics output JSON diagnostics and exit
  --list list all emoticons with indices
  --seed <n> deterministic selection by non-negative seed
  --json output in JSON; combine with seed, list, or count
  --count <n> output multiple emoticons
  --interactive, -i launch REPL with commands random, seed, list, json, help, exit
  --version, -v print version
  --help, -h show help and exit
  --serve start HTTP server on optional --port <n>

# HTTP API Endpoints
Use the built-in server when --serve is provided:
- GET / random emoticon in text/plain
- GET /list all emoticons one per line
- GET /json object or array based on query parameters seed, count, or list
- GET /json/list alias for JSON list
- GET /version object with version
- GET /health text OK
- GET /metrics Prometheus metrics of all counters
- GET /ui HTML Web UI with controls for random, seeded, count, and list
- All responses include Access-Control-Allow-Origin header
- Validate inputs, respond 400 on invalid seed or count with JSON or plain text based on Accept
- Increment counters: total, root, list, json, seeded, history, errors

# Express Middleware
Export createEmoticonRouter(options) returning an Express Router with the same HTTP API endpoints, CORS, counters, and UI.

# GraphQL API
- Define a GraphQL schema with Query fields:
  random: String
  seeded(seed: Int!): String
  list: [String]
  count(count: Int!, seed: Int): [String]
  version: String
- Validate seed and count as non-negative integers, return GraphQL errors on invalid inputs
- Mount endpoint at /graphql supporting GET with query and POST with JSON body
- Use express.json for parsing POST bodies
- Execute queries with graphql function, reuse emoticon list, version, and counters from the service
- Include CORS header on all responses
- Increment emoticon_requests_total and relevant counters when resolvers invoke random or seeded selection
- Export graphQLHandler() function returning the middleware

# Programmatic API
Export:
- listFaces(): string[]
- randomFace(): string
- seededFace(seed: number): string
- emoticonJson({ face, mode, seed }): object
- version constant
- graphQLHandler(): Express middleware
- createEmoticonRouter(options): Express Router

# Diagnostics and Configuration
- Load config via --config or EMOTICONS_CONFIG env var
- Diagnostics via --diagnostics flag or EMOTICONS_DIAGNOSTICS env var
- Diagnostics output JSON with version, configSource, emoticonCount, isCustomConfig, colorStyle, supportsColorLevel
- Reset to builtin list before loading custom config
