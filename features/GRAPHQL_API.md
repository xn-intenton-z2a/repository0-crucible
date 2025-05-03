# Overview
Implement a GraphQL API layer on top of the existing emoticon service to enable clients to query emoticons via a GraphQL endpoint. This provides a flexible interface for fetching random emoticons, seeded selections, full lists, and version information using GraphQL queries.

# GraphQL Schema
Define a GraphQL schema with a Query type exposing the following fields

random      : String       Returns a single random emoticon
seeded(seed: Int!)        : String       Returns a deterministic emoticon for a non-negative seed
list         : [String]     Returns the full list of emoticon strings
count(count: Int!, seed: Int) : [String] Returns an array of emoticons of length count, optionally starting at a seed offset
version      : String       Returns the current application version

# Endpoint and Middleware
Mount the GraphQL endpoint at /graphql supporting both GET with query parameter and POST with JSON body
Use express.json middleware for POST body parsing
Export a graphQLHandler function that returns an Express middleware instance wired to the schema
Ensure the handler applies the same CORS header Access-Control-Allow-Origin: * on every response

# Validation and Error Handling
Validate seed and count arguments as non-negative integers
Return GraphQL errors with appropriate messages for invalid inputs
Do not expose internal stack traces

# Metrics and Counters
Reuse the central emoticon request counters in main.js
Increment emoticon_requests_total and specific counters when resolvers for random, seeded, list, or count are invoked
Ensure metrics exposed via /metrics include the contributions from GraphQL queries

# Programmatic API
Export graphQLHandler alongside existing APIs so it can be mounted by applications
Document usage of graphQLHandler in README under Programmatic API section

# Tests and Documentation
Add unit tests for querying /graphql against the running Express app covering all Query fields and error cases
Update README.md and docs/HTTP_API.md to include GraphQL usage examples
Add graphql and graphql-tools (or graphql-js) to dependencies