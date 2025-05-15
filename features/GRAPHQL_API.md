# Overview
Provide a GraphQL endpoint for π calculations and data retrieval. This feature complements existing REST and SSE interfaces with a strongly-typed GraphQL schema, enabling clients to request exactly the data they need in a single call.

# Implementation

1. Dependencies
   • Add graphql and apollo-server-express to package.json dependencies.

2. Schema Definition
   • Define a GraphQL schema with types:
     - `PiResult` (fields: result: Float!, algorithm: String!, durationMs: Int!, diagnostics: PiDiagnostics)
     - `PiDiagnostics` (optional fields: digits: Int, samples: Int, iterations: Int, level: Int, samplesUsed: Int)
     - `DataPoint` (fields: index: Int!, approximation: Float, error: Float!)
   • Extend `Query` with fields:
     - `pi(digits: Int, algorithm: String, samples: Int, level: Int, maxIterations: Int, errorTolerance: Float, diagnostics: Boolean): PiResult!`
     - `piData(digits: Int, algorithm: String, samples: Int): [DataPoint!]!`

3. Server Setup
   • In createApp(), import { ApolloServer } from apollo-server-express and build the schema with `gql`.
   • Instantiate ApolloServer({ typeDefs, resolvers, context }) and apply middleware at `/graphql` after JSON parsing but before other routes.
   • Map GraphQL queries to existing calculation functions and data generators, reusing ApiParamsSchema for validation.
   • Configure CORS or body size limits if needed.

# Testing

1. Unit Tests (tests/unit/server.test.js)
   • Test POST /graphql with query for `pi` using default parameters and expect `data.pi.result` equals 3.14159.
   • Test a GraphQL query for `pi(algorithm:"chudnovsky",digits:2)` returns 3.14.
   • Test a query for `piData(digits:2,algorithm:"leibniz")` returns an array of DataPoint with correct shape.
   • Test invalid arguments (e.g., digits:-1) yield GraphQL errors with validation messages.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add **GraphQL API** section with example curl POST:
     ```bash
     curl -X POST http://localhost:3000/graphql \
       -H "Content-Type: application/json" \
       -d '{"query":"{ pi(digits:3,algorithm:\"naive\") { result } }"}'
     ```

2. README.md
   • Under **Features**, add **GraphQL API** with brief description and instructions to send queries to `/graphql`.
