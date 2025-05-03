# EMOTICON_SERVICE Feature

# Overview
Unify emoticon output and consumption across all interfaces including CLI, HTTP server, Express middleware, GraphQL endpoint, and programmatic API. Ensure consistent handling of custom configuration, diagnostics, version reporting, metrics, and ANSI styling.

# GraphQL API Interface
- Add dependencies graphql and express-graphql to package.json
- Expose a GraphQL endpoint at /graphql on the existing Express router
- Define schema types:
  - type Query:
    - randomFace: String!
    - seededFace(seed: Int!): String!
    - listFaces: [String!]!
    - batchRandom(count: Int!): [String!]!
    - batchSeeded(seed: Int!, count: Int!): [String!]!
    - emoticonJson(mode: String!, seed: Int): EmoticonJson!
    - version: String!
  - type EmoticonJson { face: String! mode: String! seed: Int }
- Enable introspection and GraphiQL playground when NODE_ENV is not production
- Use the same EMOTICONS list and configuration logic for deterministic and random queries
- Increment a new counter graphql_requests_total for each operation and include it in Prometheus metrics

# Dependencies
- Add graphql and express-graphql to dependencies
- Ensure peer compatibility with existing Express and configuration modules

# Express Middleware
- In createEmoticonRouter, mount the GraphQL middleware at /graphql before existing REST routes
- Share the same configuration and counters object, adding graphql_requests_total

# Programmatic API
- Export graphqlSchema and graphqlMiddleware for embedding in other servers
- Maintain existing exports listFaces, randomFace, seededFace, emoticonJson, and version

# Diagnostics and Configuration
- No change: continue supporting --diagnostics, EMOTICONS_DIAGNOSTICS, --config, and EMOTICONS_CONFIG
- New GraphQL configuration respects custom emoticon sources and diagnostics output