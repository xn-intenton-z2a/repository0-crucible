# OPENAPI_SPEC

## Crawl Summary
openapi:string required format major.minor.patch; $schema: URI default value; info:title,version required; servers:url template syntax, default [/]; paths:key pattern '/', values PathItem or $ref; components: reusable maps for schemas,responses,parameters,...; securitySchemes:type enum, parameters conditional on type; versioning: major.minor defines feature set, patch ignored; JSON/YAML representations interchangeable; keys case-sensitive; patterned fields with regex; YAML 1.2 constraints.

## Normalised Extract
Table of Contents:
1. OpenAPI Object
2. Info Object
3. Server Object
4. Paths Object
5. Components Object
6. Security Scheme Object

1. OpenAPI Object
 Fields:
  openapi: string (required), format /^\d+\.\d+\.\d+$/, value = "3.1.0" or compatible 3.1.*
  $schema: string (URI), default = https://spec.openapis.org/oas/3.1/schema/2021-02-16
  info: Info Object (see section 2)
  servers: array<Server Object>, default = [{ url: "/" }]
  paths: map<string, PathItemObject | ReferenceObject> (keys begin with "/", at least one of paths/components/webhooks present)
  components: Components Object (see section 5)
  security: array<SecurityRequirementObject>
  tags: array<TagObject>
  externalDocs: ExternalDocumentationObject

2. Info Object
 Fields:
  title: string (required)
  version: string (required)
  description: string
  termsOfService: string (URL)
  contact: { name: string; url: string (URL); email: string (email) }
  license: { name: string; url: string (URL) | identifier: string (SPDX) }

3. Server Object
 Fields:
  url: string (required), may include variables {name}
  description: string
  variables: map<string, { enum?: string[]; default: string; description?: string }>

4. Paths Object
 Key pattern: /^\/.+/  Value: PathItemObject | ReferenceObject

5. Components Object
 Fields (all optional):
  schemas: map<string, SchemaObject | ReferenceObject>
  responses: map<string, ResponseObject | ReferenceObject>
  parameters: map<string, ParameterObject | ReferenceObject>
  examples, requestBodies, headers, securitySchemes, links, callbacks, pathItems: similar maps

6. Security Scheme Object
 Fields:
  type: enum ["apiKey","http","oauth2","openIdConnect"] (required)
  name: string (required if apiKey)
  in: enum ["query","header","cookie"] (required if apiKey)
  scheme: string (required if http)
  bearerFormat: string (optional if http)
  flows: OAuthFlowsObject (required if oauth2)
  openIdConnectUrl: string (URL, required if openIdConnect)


## Supplementary Details
Versioning:
- major.minor designates feature set (3.1). patch addresses clarifications. Tooling should ignore patch.
Format:
- JSON or YAML 1.2 (YAML tags limited to JSON Failsafe; keys scalar strings). CommonMark 0.27 for descriptions.
Case Sensitivity:
- Field names case-sensitive except map keys when noted.
Patterned Fields:
- keys matching regex ^[a-zA-Z0-9.\-_]+$ for components fields; /^\/.+/ for paths.
Relative References (URIs):
- resolved per RFC3986 Section 5.2 using document URI base; JSON-Pointer for fragments (RFC6901).
Relative References (URLs):
- resolved against Server Object url per RFC3986 Section 5.2.
Schema Dialects:
- JSON Schema Draft 2020-12. format property optional for primitives (e.g. int64, date-time).
Rich Text:
- description fields support CommonMark syntax.
Defaults:
- allowEmptyValue for query parameters default false; explode default based on style; reserved by RFC3986.


## Reference Details
1. Minimal JSON Example:
{
  "openapi": "3.1.0",
  "info": { "title": "My API", "version": "1.0.0" },
  "servers": [ { "url": "https://api.example.com/v1" } ],
  "paths": {
    "/items/{itemId}": {
      "get": {
        "operationId": "getItem",
        "parameters": [ { "name": "itemId", "in": "path", "required": true, "schema": { "type": "string" } } ],
        "responses": { "200": { "description": "OK", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/Item" } } } } }
      }
    }
  },
  "components": {
    "schemas": { "Item": { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" } }, "required": ["id","name"] } }
  }
}

2. Minimal YAML Example:
openapi: 3.1.0
info:
  title: My API
  version: "1.0.0"
servers:
  - url: https://api.example.com/v1
paths:
  /items/{itemId}:
    get:
      operationId: getItem
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
components:
  schemas:
    Item:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
      required: [id, name]

3. CLI Validation (swagger-cli):
npm install -g @apidevtools/swagger-cli
swagger-cli validate openapi.yaml
# Expected: "openapi.yaml is valid OpenAPI 3.1 definition"
# On error: "Error: reference not found: #/components/schemas/XYZ"

4. Programmatic Validation (Node.js):
const $RefParser = require("@apidevtools/swagger-parser");
async function validate(file) {
  try {
    const api = await $RefParser.validate(file);
    console.log("API validated: %s, version %s", api.info.title, api.info.version);
  } catch (err) {
    console.error("Validation error:", err.message);
    process.exit(1);
  }
}
validate("openapi.yaml");

5. Best Practices:
- Always include server variables enum when finite set.
- Use explicit operationId values following camelCase.
- Group reusable schemas under components.schemas and reference via $ref.
- Use JSON Schema Draft 2020-12 features: oneOf, anyOf, dependentRequired.

6. Troubleshooting:
Command: swagger-cli bundle --dereference openapi.yaml -o bundled.json
Expected output: prints warnings for circular refs, produces single file.
If circular reference error: inspect $ref loops, apply one-way references or break cycles with allOf.


## Information Dense Extract
openapi:string required format x.y.z; info:{title:string,version:string}+optional {description,termsOfService(URL),contact(name,url,email),license(name,identifier|url)}; servers:[] default[{url:"/"}], url template {var}, variables:{enum[],default,description}; paths:{"/path":PathItem|$ref}; PathItem: ops(get,post,...),parameters[],servers[],summary,description,$ref; components:{schemas,responses,parameters,examples,requestBodies,headers,securitySchemes,links,callbacks,pathItems} as maps; SecurityScheme:type(apiKey[name,in],http[scheme,bearerFormat],oauth2[flows],openIdConnect[url]); JSON/YAML interchangeable, YAML1.2 failsafe, keys case-sensitive, patterned fields regex, $ref resolution per RFC3986/RFC6901, versioning ignores patch, Schema uses draft2020-12 formats e.g. int64,date-time.

## Sanitised Extract
Table of Contents:
1. OpenAPI Object
2. Info Object
3. Server Object
4. Paths Object
5. Components Object
6. Security Scheme Object

1. OpenAPI Object
 Fields:
  openapi: string (required), format /^'d+'.'d+'.'d+$/, value = '3.1.0' or compatible 3.1.*
  $schema: string (URI), default = https://spec.openapis.org/oas/3.1/schema/2021-02-16
  info: Info Object (see section 2)
  servers: array<Server Object>, default = [{ url: '/' }]
  paths: map<string, PathItemObject | ReferenceObject> (keys begin with '/', at least one of paths/components/webhooks present)
  components: Components Object (see section 5)
  security: array<SecurityRequirementObject>
  tags: array<TagObject>
  externalDocs: ExternalDocumentationObject

2. Info Object
 Fields:
  title: string (required)
  version: string (required)
  description: string
  termsOfService: string (URL)
  contact: { name: string; url: string (URL); email: string (email) }
  license: { name: string; url: string (URL) | identifier: string (SPDX) }

3. Server Object
 Fields:
  url: string (required), may include variables {name}
  description: string
  variables: map<string, { enum?: string[]; default: string; description?: string }>

4. Paths Object
 Key pattern: /^'/.+/  Value: PathItemObject | ReferenceObject

5. Components Object
 Fields (all optional):
  schemas: map<string, SchemaObject | ReferenceObject>
  responses: map<string, ResponseObject | ReferenceObject>
  parameters: map<string, ParameterObject | ReferenceObject>
  examples, requestBodies, headers, securitySchemes, links, callbacks, pathItems: similar maps

6. Security Scheme Object
 Fields:
  type: enum ['apiKey','http','oauth2','openIdConnect'] (required)
  name: string (required if apiKey)
  in: enum ['query','header','cookie'] (required if apiKey)
  scheme: string (required if http)
  bearerFormat: string (optional if http)
  flows: OAuthFlowsObject (required if oauth2)
  openIdConnectUrl: string (URL, required if openIdConnect)

## Original Source
OpenAPI Specification (OAS)
https://spec.openapis.org/oas/v3.1.0

## Digest of OPENAPI_SPEC

# OpenAPI Specification v3.1.0 (Retrieved 2024-06-21)

# OpenAPI Object
- openapi (string, required): MUST be version number in format major.minor.patch (e.g. "3.1.0").
- $schema (string, optional): URI of meta-schema. Default: https://spec.openapis.org/oas/3.1/schema/2021-02-16.
- info (Info Object, required)
- servers (array of Server Object): default single entry with url "/".
- paths (map[string, Path Item Object | Reference Object]): at least one field required across paths/components/webhooks.
- components (Components Object)
- security (array of Security Requirement Object)
- tags (array of Tag Object)
- externalDocs (External Documentation Object)

# Info Object
- title (string, required)
- version (string, required)
- description (string)
- termsOfService (URL string)
- contact (Contact Object)
- license (License Object)

# Server Object
- url (string, required): supports variable substitutions in {brackets}.
- description (string)
- variables (map[string, Server Variable Object])

# Paths Object
- Keys: string starting with "/".
- Values: Path Item Object or Reference Object.

# Path Item Object
- $ref (string)
- summary (string)
- description (string)
- get, put, post, delete, options, head, patch, trace (Operation Object)
- servers (override array of Server Object)
- parameters (array of Parameter Object | Reference Object)

# Components Object
- schemas (map[string, Schema Object | Reference Object])
- responses, parameters, examples, requestBodies, headers, securitySchemes, links, callbacks, pathItems (maps)

# Security Scheme Object
- type (string, required): one of apiKey, http, oauth2, openIdConnect.
- name (string): required if type=apiKey.
- in (string): "query" | "header" | "cookie", required if type=apiKey.
- scheme (string): required if type=http.
- bearerFormat (string): optional if type=http and scheme=bearer.
- flows (OAuth Flows Object): required if type=oauth2.
- openIdConnectUrl (URL string): required if type=openIdConnect.

---
**Attribution**: Copyright © 2021 the Linux Foundation
Data Size: 19111465 bytes
Links Found: 59233
Error: None


## Attribution
- Source: OpenAPI Specification (OAS)
- URL: https://spec.openapis.org/oas/v3.1.0
- License: CC0 1.0 Universal
- Crawl Date: 2025-05-11T06:36:56.041Z
- Data Size: 19111465 bytes
- Links Found: 59233

## Retrieved
2025-05-11
