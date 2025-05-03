# Overview
The GraphQL API provides a new endpoint that exposes the emoticon service via GraphQL at path /graphql. It leverages express-graphql middleware with schema definitions that mirror the existing programmatic API.

# Schema
Define a Query type with fields
 randomFace returns EmoticonType
 listFaces returns list of String
 seededFace accepts seed Int and returns EmoticonType
 emoticonJson accepts mode String and seed Int and returns EmoticonType
 version returns String
Define EmoticonType with fields face String mode String seed Int

# Endpoint
Mount an Express route at /graphql using express-graphql middleware. Support both GET and POST methods. Enable GraphiQL interface when NODE_ENV is not production. Validate input arguments and propagate errors according to GraphQL specification.

# Integration
Reuse existing configuration loader and reset logic before each request. Add a new counter emoticon_requests_graphql_total and increment on each query execution. Include Access-Control-Allow-Origin header on responses. Update package dependencies to include graphql and express-graphql.

# Usage
Example query
 query {
   randomFace { face mode seed }
 }