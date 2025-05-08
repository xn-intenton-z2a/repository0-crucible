# OPENAPI_SPEC

## Crawl Summary
openapi: string; info{title,version}; servers[{url,variables}]; paths{/...: pathItem}; components{schemas,responses,parameters,examples,requestBodies,headers,securitySchemes,links,callbacks}; parameter.name,in,required,style,explode,allowReserved; requestBody.content[mediaType]; response.description,content; schema.types,formats; securitySchemes.(type,name,in,flows); OAuth2 flows

## Normalised Extract
Table of Contents:
1 OpenAPI Root
2 Info Metadata
3 Server Configuration
4 Paths Definition
5 Path Item Operations
6 Operation Structure
7 Components Registry
8 Parameter Definition
9 Request Body Specification
10 Response Specification
11 Schema Definition
12 Security Schemes

1 OpenAPI Root
openapi: "3.0.3"
info.version: API version string
info.title: API title
2 Info Metadata
title (string), version (string), optional description, termsOfService (URL), contact{name,url,email}, license{name,url}
3 Server Configuration
servers[]: url:string, description:string, variables{ name:{default:string,enum:[string],description:string} }
4 Paths Definition
paths:{"/{resource}/{id}":{operations,parameters,servers}}
5 Path Item Operations
object fields: get,put,post,delete,patch,etc → Operation Object; parameters[] applies to all operations
6 Operation Structure
tags[], summary,string, description,string, operationId,string, parameters[], requestBody, responses{statusCode:Response Object}, security[], servers[]
7 Components Registry
components.schemas{name:Schema}, parameters{name:Parameter}, responses{name:Response}, requestBodies{name:RequestBody}, headers{name:Header}, securitySchemes{name:SecurityScheme}, examples, links, callbacks
8 Parameter Definition
name:string,in:(path|query|header|cookie),required:boolean,deprecated:boolean,style:(form|simple|matrix|label|spaceDelimited|pipeDelimited|deepObject),explode:boolean,allowReserved:boolean,schema:Schema,example,examples,content{mediaType:MediaType}
9 Request Body Specification
description, required:boolean, content{mediaType:{schema:Schema,examples,encoding:{property:{contentType,headers,style,explode,allowReserved}}}}
10 Response Specification
description, headers, content{mediaType:{schema,examples,encoding}}, links
11 Schema Definition
fixedFields:title,type,format,properties,required,allOf,oneOf,anyOf,not,items,additionalProperties,description,default,enum,nullable,deprecated,readOnly,writeOnly
12 Security Schemes
type:apiKey{name,in},http{scheme,bearerFormat},oauth2{flows},openIdConnect{openIdConnectUrl}


## Supplementary Details
- Semantic Versioning: major.minor.patch. openapi field MUST match spec version.  
- YAML: version 1.2, common constraints: JSON Failsafe schema, scalar string keys, markdown in description fields.  
- Path Templating: parameters in path MUST match template names.  
- Content negotiation: media types evaluated by most specific match.  
- Style defaults: query=form, path=simple, header=simple, cookie=form.  
- explode default: form=true, others=false.  
- allowEmptyValue: only query, default false.  
- deepObject style: for object query parameters.  
- Security Requirement: OR logic within array; empty {} makes optional.  


## Reference Details
# Full API Specifications

## OpenAPI Object
openapi: string (REQUIRED, regex "^(\\d+\\.){2}\\d+$")
info: Info Object
servers: [ Server Object ] default=[{url:"/"}]
paths: Paths Object (REQUIRED)
components: Components Object
security: [ Security Requirement Object ]
tags: [ Tag Object ]
externalDocs: External Documentation Object

## Info Object
title: string (REQUIRED)
description: string
toS: URL (RFC3986)
contact:
  name: string
  url: URL
  email: email
license:
  name: string (REQUIRED)
  url: URL (REQUIRED)
version: string (REQUIRED)

## Server Object
url: string (REQUIRED)
description: string
variables:
  <name>:
    enum: [string]
    default: string (REQUIRED)
    description: string

## Paths Object
Type: Object
Keys: "/" prefix; value: Path Item Object

## Path Item Object
$ref: URL
summary: string
description: string
servers: [ Server Object ]
parameters: [ Parameter | Reference ]
operations:
  get,put,post,delete,options,head,patch,trace: Operation Object

## Operation Object
tags: [ string ]
summary: string
description: string
externalDocs: External Documentation Object
operationId: string (unique)
parameters: [ Parameter | Reference ]
requestBody: RequestBody | Reference
responses: {<statusCode>: Response | Reference} (REQUIRED)
callbacks: {<name>: Callback | Reference}
deprecated: boolean (default=false)
security: [ Security Requirement ]
servers: [ Server ]

## Components Object
schemas: {<name>: Schema | Reference}
responses: {<name>: Response | Reference}
parameters: {<name>: Parameter | Reference}
examples: {<name>: Example | Reference}
requestBodies: {<name>: RequestBody | Reference}
headers: {<name>: Header | Reference}
securitySchemes: {<name>: SecurityScheme | Reference}
links: {<name>: Link | Reference}
callbacks: {<name>: Callback | Reference}

## Parameter Object
name: string (REQUIRED)
in: "path"|"query"|"header"|"cookie" (REQUIRED)
description: string
required: boolean (default false; path=true)
deprecated: boolean (default false)
allowEmptyValue: boolean (default false, query only)
style: string
explode: boolean
allowReserved: boolean
schema: Schema | Reference
example: any
examples: {<name>: Example | Reference}
content: {<mediaType>: MediaType}

## Request Body Object
description: string
content: {<mediaType>: MediaType} (REQUIRED)
required: boolean (default false)

## Response Object
description: string (REQUIRED)
headers: {<name>: Header | Reference}
content: {<mediaType>: MediaType}
links: {<name>: Link | Reference}

## Schema Object
title: string
description: string
default: any
enum: [any]
type: "string"|"number"|"integer"|"boolean"|"array"|"object"
format: string
properties: {<name>: Schema | Reference}
required: [string]
additionalProperties: boolean | Schema | Reference
items: Schema | Reference
allOf/oneOf/anyOf: [Schema | Reference]
not: Schema | Reference
nullable: boolean
readOnly/writeOnly: boolean
deprecated: boolean
xml: XML Object
discriminator: Discriminator Object
externalDocs: External Documentation Object
example: any

## Security Scheme Object
type: "apiKey"|"http"|"oauth2"|"openIdConnect"(REQUIRED)
description: string
name: string (apiKey)
in: "query"|"header"|"cookie"(apiKey)
scheme: string (http)
bearerFormat: string
describes the format of the bearer token
flows: OAuthFlows (oauth2)
openIdConnectUrl: URL (openIdConnect)

## OAuthFlows Object
implicit/password/clientCredentials/authorizationCode: OAuthFlow Object

## OAuthFlow Object
authorizationUrl: URL (implicit, authorizationCode)
tokenUrl: URL (password, clientCredentials, authorizationCode)
refreshUrl: URL
tScopes: {<scope>: description}

## MediaType Object
schema: Schema | Reference
examples: {<name>: Example | Reference}
encoding: {<name>: Encoding}

## Encoding Object
contentType: string
headers: {<name>: Header | Reference}
style: string
explode: boolean
allowReserved: boolean

## Reference Object
$ref: URL (REQUIRED)

## Security Requirement Object
{<name>: [string]}

## Information Dense Extract
openapi:string;info{title:string,version:string};servers[url:string,variables{name:{default:string,enum:[string],description:string}}];paths{"/<path>":{parameters:[{name,in,required:boolean,style,explode,allowReserved,schema}],servers,operations{get,post,put,delete,patch,options,head,trace: {operationId,parameters,requestBody:content{<mediaType>:schema},responses{<code>:content{<mediaType>:schema},description},security,servers}}};components{schemas,parameters,responses,requestBodies,headers,securitySchemes,links,callbacks};schema{type,format,properties,required,allOf,oneOf,anyOf,not,items,additionalProperties,enum,default,nullable,readOnly,writeOnly,example,deprecated};securitySchemes{apiKey{name,in},http{scheme,bearerFormat},oauth2{flows:{implicit,authorizationCode,password,clientCredentials}},openIdConnect{openIdConnectUrl}}

## Sanitised Extract
Table of Contents:
1 OpenAPI Root
2 Info Metadata
3 Server Configuration
4 Paths Definition
5 Path Item Operations
6 Operation Structure
7 Components Registry
8 Parameter Definition
9 Request Body Specification
10 Response Specification
11 Schema Definition
12 Security Schemes

1 OpenAPI Root
openapi: '3.0.3'
info.version: API version string
info.title: API title
2 Info Metadata
title (string), version (string), optional description, termsOfService (URL), contact{name,url,email}, license{name,url}
3 Server Configuration
servers[]: url:string, description:string, variables{ name:{default:string,enum:[string],description:string} }
4 Paths Definition
paths:{'/{resource}/{id}':{operations,parameters,servers}}
5 Path Item Operations
object fields: get,put,post,delete,patch,etc  Operation Object; parameters[] applies to all operations
6 Operation Structure
tags[], summary,string, description,string, operationId,string, parameters[], requestBody, responses{statusCode:Response Object}, security[], servers[]
7 Components Registry
components.schemas{name:Schema}, parameters{name:Parameter}, responses{name:Response}, requestBodies{name:RequestBody}, headers{name:Header}, securitySchemes{name:SecurityScheme}, examples, links, callbacks
8 Parameter Definition
name:string,in:(path|query|header|cookie),required:boolean,deprecated:boolean,style:(form|simple|matrix|label|spaceDelimited|pipeDelimited|deepObject),explode:boolean,allowReserved:boolean,schema:Schema,example,examples,content{mediaType:MediaType}
9 Request Body Specification
description, required:boolean, content{mediaType:{schema:Schema,examples,encoding:{property:{contentType,headers,style,explode,allowReserved}}}}
10 Response Specification
description, headers, content{mediaType:{schema,examples,encoding}}, links
11 Schema Definition
fixedFields:title,type,format,properties,required,allOf,oneOf,anyOf,not,items,additionalProperties,description,default,enum,nullable,deprecated,readOnly,writeOnly
12 Security Schemes
type:apiKey{name,in},http{scheme,bearerFormat},oauth2{flows},openIdConnect{openIdConnectUrl}

## Original Source
OpenAPI Specification (OAS)
https://spec.openapis.org/oas/v3.0.3

## Digest of OPENAPI_SPEC

# OpenAPI Specification v3.0.3 (retrieved 2023-10-07)

## 1. OpenAPI Object  
openapi: string (REQUIRED, semantic version)  
info: Info Object (REQUIRED)  
servers: [ Server Object ] (default: [{ url: "/" }])  
paths: Paths Object (REQUIRED)  
components: Components Object  
security: [ Security Requirement Object ]  
tags: [ Tag Object ]  
externalDocs: External Documentation Object

## 2. Info Object
- title: string (REQUIRED)
- description: string
- termsOfService: URL
- contact: Contact Object
- license: License Object
- version: string (REQUIRED)

## 3. Server Object
- url: URL template (REQUIRED)
- description: string
- variables: Map[string, Server Variable Object]

## 4. Paths Object
Patterned fields: "/path" → Path Item Object

## 5. Path Item Object
- $ref: string (URL)
- summary: string
- description: string
- operations: get, put, post, delete, options, head, patch, trace: Operation Object
- servers: [ Server Object ]
- parameters: [ Parameter Object | Reference Object ]

## 6. Operation Object
- tags: [ string ]
- summary: string
- description: string
- externalDocs: External Documentation Object
- operationId: string (unique)
- parameters: [ Parameter Object | Reference Object ]
- requestBody: Request Body Object | Reference Object
- responses: Map[string (status code), Response Object | Reference Object] (REQUIRED)
- callbacks: Map[string, Callback Object | Reference Object]
- deprecated: boolean (default false)
- security: [ Security Requirement Object ]
- servers: [ Server Object ]

## 7. Components Object
- schemas: Map[string, Schema Object | Reference Object]
- responses: Map[string, Response Object | Reference Object]
- parameters: Map[string, Parameter Object | Reference Object]
- examples: Map[string, Example Object | Reference Object]
- requestBodies: Map[string, Request Body Object | Reference Object]
- headers: Map[string, Header Object | Reference Object]
- securitySchemes: Map[string, Security Scheme Object | Reference Object]
- links: Map[string, Link Object | Reference Object]
- callbacks: Map[string, Callback Object | Reference Object]

## 8. Parameter Object
- name: string (REQUIRED)
- in: "query" | "header" | "path" | "cookie" (REQUIRED)
- description: string
- required: boolean (default false; MUST=true for in=path)
- deprecated: boolean (default false)
- allowEmptyValue: boolean (default false)
- style: ... (default: form|simple|form|simple)
- explode: boolean
- allowReserved: boolean
- schema: Schema Object | Reference Object
- example: any
- examples: Map[string, Example Object | Reference Object]
- content: Map[string (mediaType), Media Type Object]

## 9. Request Body Object
- description: string
- content: Map[string (mediaType), Media Type Object] (REQUIRED)
- required: boolean (default false)

## 10. Response Object
- description: string (REQUIRED)
- headers: Map[string, Header Object | Reference Object]
- content: Map[string (mediaType), Media Type Object]
- links: Map[string, Link Object | Reference Object]

## 11. Schema Object
Fixed fields: title, multipleOf, maximum, exclusiveMaximum, minimum, exclusiveMinimum, maxLength, minLength, pattern, maxItems, minItems, uniqueItems, maxProperties, minProperties, required, enum, type, allOf, oneOf, anyOf, not, items, properties, additionalProperties, description, format, default, nullable, discriminator, readOnly, writeOnly, xml, externalDocs, example, deprecated

## 12. Security Scheme Object
- type: "apiKey" | "http" | "oauth2" | "openIdConnect" (REQUIRED)
- description: string
- name: string (REQUIRED for apiKey)
- in: "query" | "header" | "cookie" (REQUIRED for apiKey)
- scheme: string (REQUIRED for http)
- bearerFormat: string
- flows: OAuth Flows Object (REQUIRED for oauth2)
- openIdConnectUrl: URL (REQUIRED for openIdConnect)

## 13. OAuth Flows Object
Map: implicit, password, clientCredentials, authorizationCode: OAuth Flow Object

## 14. Encoding Object
- contentType: string
- headers: Map[string, Header Object | Reference Object]
- style: string
- explode: boolean
- allowReserved: boolean

## Attribution
- Source: OpenAPI Specification (OAS)
- URL: https://spec.openapis.org/oas/v3.0.3
- License: CC0 1.0 Universal
- Crawl Date: 2025-05-08T09:30:25.292Z
- Data Size: 17035172 bytes
- Links Found: 55931

## Retrieved
2025-05-08
