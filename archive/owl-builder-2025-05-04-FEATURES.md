features/EMOTICON_SERVICE.md
# features/EMOTICON_SERVICE.md
# EMOTICON_SERVICE Feature

# Overview
Unify and extend the emoticon core service into a consistent interface offering CLI, HTTP server, Express middleware, GraphQL API, programmatic API, diagnostics, and custom configuration.

# CLI Interface
- Default invocation prints a random emoticon in plain text
- Options:
  --config <path> for JSON or YAML custom list
  --diagnostics for JSON diagnostics
  --list to enumerate emoticons with zero-based indices
  --seed <n> for deterministic selection
  --json for JSON output
  --count <n> for batch output
  --interactive or -i for REPL
  --serve to start the HTTP server
  --port <n> to set the server port
  --help or -h and --version or -v
- Invalid inputs produce error messages and appropriate exit codes

# HTTP API
- Endpoints activated when --serve or via Express middleware
- GET / returns a random emoticon in text/plain
- GET /list returns all emoticons one per line in text/plain
- GET /json returns JSON with face, mode, and seed
- GET /json?seed=<n> returns deterministic JSON or 400 error on invalid seed
- GET /json?count=<n> returns JSON array of emoticons, supports seed for sequential output
- GET /json?list or /json/list returns full emoticon array in JSON
- GET /version returns { version } in application/json
- GET /health returns OK in text/plain
- GET /metrics exposes Prometheus counters: emoticon_requests_total, emoticon_requests_root_total, emoticon_requests_list_total, emoticon_requests_json_total, emoticon_requests_seeded_total, emoticon_requests_errors_total
- GET /ui serves an HTML interface with controls for random, seeded, count, and list operations
- All responses include Access-Control-Allow-Origin: * header

# Express Middleware
- Export createEmoticonRouter() returning an Express Router with the same HTTP endpoints, CORS headers, metrics counters, and web UI

# GraphQL API
- Define a GraphQL schema using graphql-js with Query type fields:
  random: String!
  seeded(seed: Int!): String!
  list: [String!]!
  count(count: Int!, seed: Int): [String!]!
  version: String!
- Export graphQLHandler() as Express middleware mounted at /graphql supporting GET and POST with JSON body parsing
- Apply CORS on all GraphQL responses
- Validate seed and count as non-negative integers, return GraphQL errors on invalid inputs
- Increment internal counters for random, seeded, and count resolvers

# Programmatic API
- Export functions:
  listFaces(), randomFace(), seededFace(seed), emoticonJson({ face, mode, seed }), configureEmoticons({ configPath }), getEmoticonDiagnostics(), createEmoticonRouter(), graphQLHandler(), and version constant

# Diagnostics and Configuration
- Load custom emoticon list at runtime via --config flag or EMOTICONS_CONFIG environment variable
- configureEmoticons returns a diagnostics object with version, configSource, emoticonCount, isCustomConfig, colorStyle, supportsColorLevel and updates internal state
- getEmoticonDiagnostics returns the last diagnostics snapshot without side effects

# Dependencies
- Add graphql to package.json dependencies and import necessary graphql-js types