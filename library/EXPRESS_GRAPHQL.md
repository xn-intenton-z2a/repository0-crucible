# EXPRESS_GRAPHQL

## Crawl Summary
graphqlHTTP(options) returns an Express middleware handling GraphQL over HTTP GET and POST. Options.schema must be a GraphQLSchema. Optional options include rootValue, context, graphiql (false by default), pretty (false), validationRules array, customFormatErrorFn(error) handler, fieldResolver resolver function, and extensions hook. Supports standard query parameters: query, variables (JSON), operationName, raw.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Middleware Setup
 3 Options Interface
 4 GraphQL over HTTP Parameters
 5 GraphiQL Integration
 6 Error Handling

1 Installation
  npm install express-graphql graphql express

2 Middleware Setup
  const app = express()
  app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql }))

3 Options Interface
  schema: GraphQLSchema (required)
  rootValue: any container for resolvers
  context: any passed to resolvers
  graphiql: boolean enable IDE (default false)
  pretty: boolean enable pretty JSON (default false)
  validationRules: ValidationRule[] override rules
  customFormatErrorFn: (error) => formatted error object
  fieldResolver: (source, args, context, info) => resolved value
  extensions: (info) => additional response extensions

4 GraphQL over HTTP Parameters
  HTTP Methods: GET, POST
  query: GraphQL query string
  variables: JSON object of variables
  operationName: name of operation to execute
  raw: boolean if raw result without formatting

5 GraphiQL Integration
  Enable only in development
  graphiql option accepts boolean
  Defaults: endpoint URL '/graphql'

6 Error Handling
  Missing schema throws Error 'Must provide schema'
  malformed JSON body returns 400 with error message


## Supplementary Details
Default values:
  graphiql: false
  pretty: false
  validationRules: GraphQL specified rules from graphql/validation
  context: {} if not provided
Middleware ordering:
  Place bodyParser.json() before graphqlHTTP to parse POST bodies

Environment-based GraphiQL:
  const dev = process.env.NODE_ENV !== 'production'
  app.use('/graphql', graphqlHTTP({ schema, graphiql: dev }))

Integration steps:
  1 Import express, graphqlHTTP, buildSchema
  2 Define GraphQL schema string
  3 Build schema with buildSchema
  4 Define rootValue with resolver functions
  5 Apply middleware to Express route
  6 Start server on chosen port


## Reference Details
API Specification:
  Function: graphqlHTTP
    Signature: (options: Options | () => Options) => (req: Request, res: Response, next: NextFunction) => void
  Type Options:
    schema                   GraphQLSchema (must implement GraphQLSchema)
    rootValue?               any
    context?                 any
    graphiql?                boolean default: false
    pretty?                  boolean default: false
    validationRules?         ValidationRule[] default: [specified rules]
    customFormatErrorFn?     (error: GraphQLError) => any
    fieldResolver?           GraphQLFieldResolver<any, any>
    extensions?              (info: { document: DocumentNode, variables: Record<string, any>, operationName: string, result: ExecutionResult }) => Record<string, any>

Code Example:
import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
const schema = buildSchema('type Query{hello:String}')
const root = { hello: () => 'Hello!' }
const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  context: { user: req.user },
  graphiql: true,
  validationRules: [],
  customFormatErrorFn: (err) => ({ message: err.message, locations: err.locations }),
  extensions: ({ result }) => ({ runTime: Date.now() - startTime }),
}))
app.listen(4000, () => console.log('Server running'))

Implementation Patterns:
  Use environment variable for GraphiQL flag
  Use middleware chaining: bodyParser.json(), graphqlHTTP()
  Pass context per request by supplying a function thunk returning options

Configuration Options:
  graphiql true enables IDE at endpoint
  pretty true formats JSON output with indentation
  customFormatErrorFn allows masking stack trace

Best Practices:
  Restrict graphiql to non-production
  Pre-compile schema in build step
  Supply context for authentication

Troubleshooting Procedures:
  Command: curl -X POST -H 'Content-Type: application/json' --data '{"query":"{hello}"}' http://localhost:4000/graphql
    Expected: {"data":{"hello":"Hello"}}
  Error 'Must provide schema': Ensure options.schema is set
  400 on invalid JSON: Check body-parser placement


## Information Dense Extract
graphqlHTTP(options) returns Express middleware. Options.schema: GraphQLSchema. Optional: rootValue, context, graphiql=false, pretty=false, validationRules: ValidationRule[], customFormatErrorFn(error)->any, fieldResolver(source,args,context,info)->any, extensions({document,variables,operationName,result})->object. Middleware requires bodyParser.json() ahead. HTTP GET/POST params: query(String), variables(JSON), operationName(String), raw(Boolean). Enable graphiql only in dev. Use curl -X POST -H 'Content-Type: application/json' --data '{"query":"..."}' to test. Error 'Must provide schema' if schema missing. Validate requests with customFormatErrorFn and validationRules overrides. Context injection via options thunk: graphqlHTTP(() => ({schema, context: {user}})).

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Middleware Setup
 3 Options Interface
 4 GraphQL over HTTP Parameters
 5 GraphiQL Integration
 6 Error Handling

1 Installation
  npm install express-graphql graphql express

2 Middleware Setup
  const app = express()
  app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql }))

3 Options Interface
  schema: GraphQLSchema (required)
  rootValue: any container for resolvers
  context: any passed to resolvers
  graphiql: boolean enable IDE (default false)
  pretty: boolean enable pretty JSON (default false)
  validationRules: ValidationRule[] override rules
  customFormatErrorFn: (error) => formatted error object
  fieldResolver: (source, args, context, info) => resolved value
  extensions: (info) => additional response extensions

4 GraphQL over HTTP Parameters
  HTTP Methods: GET, POST
  query: GraphQL query string
  variables: JSON object of variables
  operationName: name of operation to execute
  raw: boolean if raw result without formatting

5 GraphiQL Integration
  Enable only in development
  graphiql option accepts boolean
  Defaults: endpoint URL '/graphql'

6 Error Handling
  Missing schema throws Error 'Must provide schema'
  malformed JSON body returns 400 with error message

## Original Source
GraphQL API Documentation
https://github.com/graphql/express-graphql

## Digest of EXPRESS_GRAPHQL

# express-graphql Middleware

express-graphql exports a single function graphqlHTTP

# Method Signature

graphqlHTTP(options: Options | () => Options) => RequestHandler

# Options Interface

Options:
  schema                  GraphQLSchema (required)
  rootValue               any
  context                 any
  graphiql                boolean (default false)
  pretty                  boolean (default false)
  validationRules         ValidationRule[]
  customFormatErrorFn     (error: GraphQLError) => any
  fieldResolver           GraphQLFieldResolver<any, any>
  extensions              (info: ExtensionInfo) => Record<string, any)

# Usage Example

import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(
  'type Query { hello: String }'
)
const root = { hello: () => 'Hello world!' }

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({ schema, rootValue: root, graphiql: true })
)
app.listen(4000)

# GraphQL over HTTP Details

Supports GET and POST
Query parameters:
  query         GraphQL query string
  variables     JSON object
  operationName string
  raw           boolean

# Retrieval

Content retrieved on 2024-06-20

## Attribution
- Source: GraphQL API Documentation
- URL: https://github.com/graphql/express-graphql
- License: CC0 1.0 Universal / MIT License
- Crawl Date: 2025-05-11T07:58:32.270Z
- Data Size: 552486 bytes
- Links Found: 4716

## Retrieved
2025-05-11
