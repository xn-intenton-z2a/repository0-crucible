# API_KEYS

## Crawl Summary
Define apiKey security schemes with type: apiKey; in: header|query|cookie; name: <param>. Apply globally via top-level security or per-operation via paths[].get.security. Combine multiple keys in a single security array element for logical AND; separate elements for logical OR. Define 401 Unauthorized response in components.responses with WWW-Authenticate header schema type string and reference via $ref.

## Normalised Extract
Table of Contents:
 1 Defining API Key Security Scheme
 2 Applying API Key Globally
 3 Operation-Level Security
 4 Multiple API Keys (AND vs OR)
 5 401 Unauthorized Response

1 Defining API Key Security Scheme
 components.securitySchemes.<SchemeName>:
   type: apiKey
   in: header|query|cookie
   name: <parameterName>
 Valid values for in: header, query, cookie
<Example>
 components:
   securitySchemes:
     ApiKeyAuth:
       type: apiKey
       in: header
       name: X-API-KEY

2 Applying API Key Globally
 Use top-level security section after components:
 security:
   - <SchemeName>: []
 Example:
 security:
   - ApiKeyAuth: []

3 Operation-Level Security
 In paths.<path>.<method>.security replace or extend global security:
 paths:
   /resource:
     post:
       security:
         - ApiKeyAuth: []
       responses: {...}

4 Multiple API Keys (AND vs OR)
 Logical AND: list keys in same array element:
 security:
   - apiKey: []
     appId: []
 Logical OR: separate elements:
 security:
   - apiKey: []
   - appId: []
 Ensure components.securitySchemes defines both:
 components:
   securitySchemes:
     apiKey: {type: apiKey, in: header, name: X-API-KEY}
     appId: {type: apiKey, in: header, name: X-APP-ID}

5 401 Unauthorized Response
 Define common 401:
 components:
   responses:
     UnauthorizedError:
       description: API key is missing or invalid
       headers:
         WWW_Authenticate:
           schema: {type: string}
 Reference in operations:
 paths:
   /resource:
     get:
       responses:
         '401': {$ref: "#/components/responses/UnauthorizedError"}


## Supplementary Details
Parameter Values and Options:
 type: must be "apiKey"
 in: "header", "query" or "cookie"
 name: exact header or query parameter or cookie name used by clients

Implementation Steps:
 1 Add securitySchemes under components
 2 Reference scheme under global or operation-level security
 3 Implement server-side validation of header/query/cookie parameter
 4 If validation fails, return 401 with WWW-Authenticate header

Server Validation Example:
 Extract key: header X-API-KEY or query parameter api_key or cookie X-API-KEY
 Validate against stored keys

Security Recommendations:
 Use HTTPS to protect API key in transit
 Rotate keys periodically
 Reject missing or invalid keys with clear 401 responses


## Reference Details
OpenAPI 3.0 Components Definition:
 components:
   securitySchemes:
     ApiKeyAuth:
       type: apiKey
       in: header
       name: X-API-KEY
 security:
   - ApiKeyAuth: []
 paths:
   /something:
     get:
       security:
         - ApiKeyAuth: []
       responses:
         '200':
           description: OK
         '401':
           $ref: "#/components/responses/UnauthorizedError"
 components:
   responses:
     UnauthorizedError:
       description: API key is missing or invalid
       headers:
         WWW_Authenticate:
           schema:
             type: string

Express.js Middleware Example:
 function apiKeyMiddleware(req, res, next) {
   const key = req.header('X-API-KEY') || req.query.api_key || req.cookies['X-API-KEY'];
   if (!key || !validateApiKey(key)) {
     res.set('WWW-Authenticate','API key');
     return res.status(401).json({error:'Unauthorized'});
   }
   next();
 }
 app.use(apiKeyMiddleware);

Troubleshooting:
 Command:
 curl -i -H "X-API-KEY: invalid" https://api.example.com/something
 Expected:
 HTTP/1.1 401 Unauthorized
 WWW-Authenticate: API key
 {"error":"Unauthorized"}

Best Practices:
 Enforce HTTPS
 Store keys securely server-side
 Use distinct parameter names to avoid conflicts
 Prefix error responses with WWW-Authenticate header

## Information Dense Extract
components.securitySchemes.ApiKeyAuth{type:apiKey,in:header,name:X-API-KEY} security:[{ApiKeyAuth:[]}] paths."/something".get.security:[{ApiKeyAuth:[]}] components.securitySchemes.apiKey{type:apiKey,in:header,name:X-API-KEY} components.securitySchemes.appId{type:apiKey,in:header,name:X-APP-ID} security:[{apiKey:[],appId:[]}] unauthorized:components.responses.UnauthorizedError{description:API key is missing or invalid,headers.WWW-Authenticate.schema.type:string} Express middleware: extract req.header('X-API-KEY')||req.query.api_key||req.cookies['X-API-KEY'], validate, else res.set('WWW-Authenticate','API key').status(401).json({error:'Unauthorized'})

## Sanitised Extract
Table of Contents:
 1 Defining API Key Security Scheme
 2 Applying API Key Globally
 3 Operation-Level Security
 4 Multiple API Keys (AND vs OR)
 5 401 Unauthorized Response

1 Defining API Key Security Scheme
 components.securitySchemes.<SchemeName>:
   type: apiKey
   in: header|query|cookie
   name: <parameterName>
 Valid values for in: header, query, cookie
<Example>
 components:
   securitySchemes:
     ApiKeyAuth:
       type: apiKey
       in: header
       name: X-API-KEY

2 Applying API Key Globally
 Use top-level security section after components:
 security:
   - <SchemeName>: []
 Example:
 security:
   - ApiKeyAuth: []

3 Operation-Level Security
 In paths.<path>.<method>.security replace or extend global security:
 paths:
   /resource:
     post:
       security:
         - ApiKeyAuth: []
       responses: {...}

4 Multiple API Keys (AND vs OR)
 Logical AND: list keys in same array element:
 security:
   - apiKey: []
     appId: []
 Logical OR: separate elements:
 security:
   - apiKey: []
   - appId: []
 Ensure components.securitySchemes defines both:
 components:
   securitySchemes:
     apiKey: {type: apiKey, in: header, name: X-API-KEY}
     appId: {type: apiKey, in: header, name: X-APP-ID}

5 401 Unauthorized Response
 Define common 401:
 components:
   responses:
     UnauthorizedError:
       description: API key is missing or invalid
       headers:
         WWW_Authenticate:
           schema: {type: string}
 Reference in operations:
 paths:
   /resource:
     get:
       responses:
         '401': {$ref: '#/components/responses/UnauthorizedError'}

## Original Source
API Key Authentication & Security Schemes
https://swagger.io/docs/specification/authentication/api-keys/

## Digest of API_KEYS

# Describing API Keys

In OpenAPI 3.0 define an apiKey security scheme and apply it via security.

openapi: 3.0.4
components:
  securitySchemes:
    ApiKeyAuth:                      # arbitrary scheme name
      type: apiKey                   # fixed value: apiKey
      in: header                     # valid values: header, query, cookie
      name: X-API-KEY                # name of header, query or cookie parameter
security:
  - ApiKeyAuth: []                  # apply globally to all operations

# Operation-Specific Security

paths:
  /something:
    get:
      security:
        - ApiKeyAuth: []             # apply only to this operation
      responses:
        '200':
          description: OK (successfully authenticated)

# Multiple API Keys

components:
  securitySchemes:
    apiKey:
      type: apiKey
      in: header
      name: X-API-KEY
    appId:
      type: apiKey
      in: header
      name: X-APP-ID
security:
  - apiKey: []
    appId: []                       # both apiKey AND appId required

security:
  - apiKey: []                     # apiKey OR appId allowed
  - appId: []

# 401 Unauthorized Response

paths:
  /something:
    get:
      responses:
        '401':
          $ref: "#/components/responses/UnauthorizedError"
components:
  responses:
    UnauthorizedError:
      description: API key is missing or invalid
      headers:
        WWW_Authenticate:
          schema:
            type: string

# Date Retrieved: 2024-06-10
Data Size: 766448 bytes
Links Found: 7313

## Attribution
- Source: API Key Authentication & Security Schemes
- URL: https://swagger.io/docs/specification/authentication/api-keys/
- License: License: CC BY 4.0
- Crawl Date: 2025-05-16T12:29:43.802Z
- Data Size: 766448 bytes
- Links Found: 7313

## Retrieved
2025-05-16
