# API_KEYS

## Crawl Summary
OpenAPI 3.0.4 securitySchemes.apiKey definitions: type=apiKey, in=header|query|cookie, name=<keyName>. Global security with security: - <schemeName>: []. Operation-specific security under paths.<path>.<operation>.security. Multiple API keys: define both under components.securitySchemes; AND by listing both in same security entry; OR by separate entries. 401 Unauthorized response via components.responses.UnauthorizedError with description and WWW-Authenticate header schema type:string.

## Normalised Extract
Table of Contents
1 Security Schemes Definition
2 Applying Security Globally
3 Operation-Specific Security
4 Multiple API Keys (AND, OR)
5 401 Unauthorized Response

1 Security Schemes Definition
 components.securitySchemes.ApiKeyAuth
  type: apiKey
  in: header  (options: header, query, cookie)
  name: X-API-KEY

2 Applying Security Globally
 security:
  - ApiKeyAuth: []

3 Operation-Specific Security
 paths./something.get.security:
  - ApiKeyAuth: []
 responses.200.description: OK (successfully authenticated)

4 Multiple API Keys (AND, OR)
 components.securitySchemes.apiKey
  type: apiKey  in: header  name: X-API-KEY
 components.securitySchemes.appId
  type: apiKey  in: header  name: X-APP-ID
 security (AND):
  - apiKey: []
    appId: []
 security (OR):
  - apiKey: []
  - appId: []

5 401 Unauthorized Response
 paths./something.get.responses.'401': $ref: "#/components/responses/UnauthorizedError"
 paths./something.post.responses.'401': $ref: "#/components/responses/UnauthorizedError"
 components.responses.UnauthorizedError.description: API key is missing or invalid
 components.responses.UnauthorizedError.headers.WWW_Authenticate.schema.type: string

## Supplementary Details
Parameter Values and Options
- type: must be "apiKey"
- in: one of "header", "query", "cookie"
- name: string matching header name, query parameter or cookie name

Implementation Steps
1. Generate a secure random 32-byte key (e.g., openssl rand -base64 32).
2. Store the key in environment variable API_KEY.
3. Define securitySchemes.ApiKeyAuth in your OpenAPI document as shown.
4. Set top-level security or operation-level security per your requirements.
5. Implement server-side middleware to extract key from request header, query or cookie.
6. Compare extracted key against expected value; respond with 401 on mismatch.

Best Practices
- Always serve over HTTPS.
- Rotate keys regularly and use versioned key identifiers.
- Limit operations that require API key to necessary endpoints.


## Reference Details
Express Middleware Example
function apiKeyAuth(req, res, next) {
  const key = req.header('X-API-KEY') || req.query.api_key || req.cookies['X-API-KEY'];
  if (!key || key !== process.env.API_KEY) {
    return res.status(401)
      .set('WWW-Authenticate', 'API key is missing or invalid')
      .json({ error: 'Unauthorized' });
  }
  next();
}
app.use(apiKeyAuth);

Swagger UI-Express Configuration
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    authAction: {
      ApiKeyAuth: {
        name: 'X-API-KEY',
        schema: { type: 'apiKey', in: 'header' },
        value: ''
      }
    }
  }
}));

Troubleshooting Steps
1. Verify key header is present:
   curl -v http://localhost:3000/something -H 'X-API-KEY: wrong'
   Expect 401 Unauthorized and header WWW-Authenticate: API key is missing or invalid
2. Check environment variable:
   echo $API_KEY
3. Regenerate key if missing:
   openssl rand -base64 32 > api_key.txt && export API_KEY=$(cat api_key.txt)


## Information Dense Extract
OpenAPI3.0.4 components.securitySchemes.ApiKeyAuth: type=apiKey,in=header|query|cookie,name=X-API-KEY; global security: security:[{ApiKeyAuth:[]}]; operation-level override: paths.<path>.<op>.security:[{ApiKeyAuth:[]}]; multiple keys: define apiKey and appId under securitySchemes; AND: single entry with both schemes; OR: separate entries; UnauthorizedError: components.responses.UnauthorizedError: description=API key is missing or invalid, headers.WWW_Authenticate.schema.type=string; Express middleware: extract req.header('X-API-KEY')|req.query.api_key|req.cookies['X-API-KEY'], compare to process.env.API_KEY, on fail res.status(401).set('WWW-Authenticate','API key is missing or invalid').json({error});","referenceDetails":

## Sanitised Extract
Table of Contents
1 Security Schemes Definition
2 Applying Security Globally
3 Operation-Specific Security
4 Multiple API Keys (AND, OR)
5 401 Unauthorized Response

1 Security Schemes Definition
 components.securitySchemes.ApiKeyAuth
  type: apiKey
  in: header  (options: header, query, cookie)
  name: X-API-KEY

2 Applying Security Globally
 security:
  - ApiKeyAuth: []

3 Operation-Specific Security
 paths./something.get.security:
  - ApiKeyAuth: []
 responses.200.description: OK (successfully authenticated)

4 Multiple API Keys (AND, OR)
 components.securitySchemes.apiKey
  type: apiKey  in: header  name: X-API-KEY
 components.securitySchemes.appId
  type: apiKey  in: header  name: X-APP-ID
 security (AND):
  - apiKey: []
    appId: []
 security (OR):
  - apiKey: []
  - appId: []

5 401 Unauthorized Response
 paths./something.get.responses.'401': $ref: '#/components/responses/UnauthorizedError'
 paths./something.post.responses.'401': $ref: '#/components/responses/UnauthorizedError'
 components.responses.UnauthorizedError.description: API key is missing or invalid
 components.responses.UnauthorizedError.headers.WWW_Authenticate.schema.type: string

## Original Source
API Key Authentication & Security Schemes
https://swagger.io/docs/specification/authentication/api-keys/

## Digest of API_KEYS

# API Keys

Some APIs use API keys for authorization. An API key is a token that a client provides when making API calls. The key can be sent in the query string, header, or cookie.

# Describing API Keys

```yaml
openapi: 3.0.4
components:
  securitySchemes:
    ApiKeyAuth:           # arbitrary name for the security scheme
      type: apiKey        # required: apiKey
      in: header          # required: one of header, query, cookie
      name: X-API-KEY     # required: name of header, query parameter or cookie
security:
  - ApiKeyAuth: []       # applies ApiKeyAuth globally to all operations
```

# Operation-Specific Security

```yaml
paths:
  /something:
    get:
      security:
        - ApiKeyAuth: []      # applies only to this operation
      responses:
        "200":
          description: OK (successfully authenticated)
```

# Multiple API Keys

```yaml
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
  - apiKey: []              # AND: both keys required
    appId: []
# OR: either key can be used
security:
  - apiKey: []
  - appId: []
```

# 401 Unauthorized Response

```yaml
paths:
  /something:
    get:
      responses:
        '401':
          $ref: "#/components/responses/UnauthorizedError"
    post:
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
```

## Attribution
- Source: API Key Authentication & Security Schemes
- URL: https://swagger.io/docs/specification/authentication/api-keys/
- License: License: CC BY 4.0
- Crawl Date: 2025-05-16T00:40:33.998Z
- Data Size: 673304 bytes
- Links Found: 6877

## Retrieved
2025-05-16
