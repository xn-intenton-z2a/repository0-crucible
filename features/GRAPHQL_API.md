# Overview

Add a GraphQL endpoint to the existing HTTP server that unifies PI calculation, digit frequency analysis, and performance benchmarking under a single flexible GraphQL schema. Clients can submit queries or mutations to compute PI, inspect digit distributions, or run benchmarks with a single HTTP POST.

# Schema Definition

Define a GraphQL schema with the following types and fields

Query
  pi(digits: Int!): PiResult
  analyzeFrequency(digits: Int!): AnalysisResult
  benchmark(digits: [Int!]!): [BenchmarkResult!]!

Type PiResult
  digits: Int!
  pi: String!

Type AnalysisResult
  digits: Int!
  counts: [Int!]!
  percentages: [Float!]!

Type BenchmarkResult
  digits: Int!
  time: Float!

# Implementation Details

• Add dependencies graphql and express-graphql to dependencies file
• In src/lib/main.js, detect a new flag --graphql to enable GraphQL server mode
• Import express, express.json, graphqlHTTP from express-graphql, and buildSchema from graphql
• Build the schema text and resolver object mapping pi analyzeFrequency and benchmark functions to existing calculatePi, analyzePi, and benchmarkPi implementations
• Mount a POST route at /graphql using graphqlHTTP with schema and root resolvers
• Apply express.json middleware before the GraphQL handler to parse request bodies
• Support query validation and error handling through graphqlHTTP default mechanisms
• Ensure existing REST endpoints remain unchanged when --graphql is not present

# Testing

• Add unit tests in tests/unit/main.test.js using supertest and vitest
  – Start the server with main(["--serve","0","--graphql"]) and capture the instance
  – POST a GraphQL query { pi(digits:5){ pi } } and assert status 200 and data pi matches 3.14159
  – POST a query for analyzeFrequency(digits:5) and assert counts array length 10 and percentages sum close to 100
  – POST a mutation or query for benchmark(digits:[10,100]) and assert an array of two objects with digits fields and numeric time
  – Test invalid queries produce GraphQL errors with status 400

# Documentation

• Update README.md to add a GraphQL API section under HTTP API
  – Document starting the server with --graphql flag and default port
  – Provide example curl commands posting JSON bodies with GraphQL queries
  – Show sample query and response for each field type
  – Note dependencies and endpoint path /graphql