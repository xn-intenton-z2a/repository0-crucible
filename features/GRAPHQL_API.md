# Overview
Provide a GraphQL HTTP endpoint for querying emoticon data alongside existing REST and CLI interfaces. This feature leverages the graphql library to define a typed schema and resolvers that expose random, seeded, list, count, and version queries through a single GraphQL endpoint. All queries share the same configuration, metrics, and custom emoticon list support as the existing server.

# Schema Definition
Define a GraphQL schema with the following Query fields

  random  Returns a single random emoticon string
  seeded(seed Int!)  Returns a deterministically selected emoticon based on the provided non-negative integer seed
  list  Returns an array of all available emoticon strings
  count(count Int!, seed Int)  Returns an array of count emoticon strings; if seed is provided, uses sequential seeded selection starting from seed; otherwise random
  version  Returns the application version string

Ensure input validation in resolvers: non negative integers for seed and count, error handling returns GraphQL errors on invalid inputs.

# HTTP Endpoint
Mount a POST and GET endpoint at /graphql on the existing Express router. Accept GET with query parameter query and variables, and accept POST with JSON body containing query, variables. Use express.json for POST parsing. Execute incoming queries using graphql function against the defined schema. Attach Access Control Allow Origin header on all responses. Increment emoticon_requests_total for every request, and if resolvers invoke random or seeded selection, increment the corresponding counters.

# Programmatic API
Export a graphQLHandler function that returns an Express middleware function. This middleware uses the same schema and context including listFaces, randomFace, seededFace, emoticonJson, version, custom config logic, and the counters object. Developers can mount graphQLHandler on any Express application.

# Configuration and Metrics
Reuse the custom config loader for EMOTICONS_CONFIG and the CLI flag config. The GraphQL context must include current emoticon list, version, and Express counters from createEmoticonRouter options. Document how to enable diagnostics mode and custom config within GraphQL introspection or queries if desired.