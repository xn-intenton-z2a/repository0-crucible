# Overview

Provide a GraphQL server endpoint to offer flexible querying of π calculation results, convergence data, and benchmark reports using a single HTTP API. Clients can retrieve data with precise type definitions, execute multiple queries per request, and explore the schema interactively via GraphiQL.

# Implementation

1. Dependencies
   • Add or verify dependencies: graphql and express-graphql in package.json.
   • No other new libraries required; reuse existing Zod schemas and calculation functions.

2. Schema Definition
   • Define GraphQLObjectType PiResult with fields: algorithm (String!), result (Float!), durationMs (Int!), digits (Int), samples (Int), level (Int), errorTolerance (Float), iterations (Int), samplesUsed (Int).
   • Define GraphQLObjectType DataPoint with fields: index (Int!), approximation (Float), error (Float!).
   • Define GraphQLObjectType BenchmarkRecord with fields: algorithm (String!), result (Float!), durationMs (Int!), error (Float!), digits (Int), samples (Int), level (Int), errorTolerance (Float).
   • Define Query type with fields:
     - pi(args: PiParamsInput!): PiResult!
     - piData(args: PiParamsInput!): [DataPoint!]!
     - benchmark(args: BenchmarkParamsInput!): [BenchmarkRecord!]!
   • Define PiParamsInput and BenchmarkParamsInput input types mirroring REST query parameters.

3. Express Integration
   • In createApp(), import { graphqlHTTP } from express-graphql and graphql schema from GraphQL.js.
   • Register middleware: app.use('/graphql', apiKeyAuthMiddleware, rateLimitMiddleware, graphqlHTTP({ schema, graphiql: true })).
   • Reuse existing Zod ApiParamsSchema and benchmark logic inside resolver functions.

4. Authentication and Rate Limiting
   • Apply the same API key authentication and express-rate-limit configuration to /graphql as for REST endpoints.

# Testing

1. Unit Tests in tests/unit/server.test.js:
   • Query /graphql with POST containing a simple pi query and assert correct result and types.
   • Query piData and verify array of DataPoint objects with index and error fields.
   • Query benchmark and verify an array of BenchmarkRecord objects for all algorithms with correct fields.
   • Invalid queries or variables should return GraphQL errors with descriptive messages.

# Documentation

1. docs/USAGE.md:
   • Under **GraphQL Endpoint**, add section for POST /graphql with examples of queries and introspection via GraphiQL.
   • Provide sample queries for pi, piData, and benchmark, showing variables syntax.

2. README.md:
   • Under **Features**, add **GraphQL API** with a brief description and example of launching GraphiQL and sample curl commands for GraphQL queries.