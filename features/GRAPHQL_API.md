# Overview
Extend the emoticon service with a GraphQL API endpoint that allows clients to query random, seeded, and batched emoticons programmatically.

# Schema Definition
Define a GraphQL schema using graphql-js:  
- Query type fields:  
  random: String!  
  seeded(seed: Int!): String!  
  list: [String!]!  
  count(count: Int!, seed: Int): [String!]!  
  version: String!  

# Middleware Export
Export a function graphQLHandler() that returns an Express middleware mounted at /graphql.  
- Supports GET and POST requests.  
- Parses JSON bodies for POST.  
- Applies CORS header Access-Control-Allow-Origin: * on responses.  

# Validation and Error Handling
Validate seed and count arguments as non-negative integers. Return GraphQL errors for invalid input. Increment internal counters for random, seeded, and count requests.

# Dependencies
Add graphql to dependencies and import graphql, GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString from graphql-js.