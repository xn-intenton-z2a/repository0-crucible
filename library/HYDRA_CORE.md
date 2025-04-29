# HYDRA_CORE

## Crawl Summary
hydra prefix and IRI; Link class annotation in RDF and JSON-LD context; Operation class with HTTP method, expects, returns, possibleStatus; ApiDocumentation entrypoint, supportedClass, supportedProperty, supportedOperation; Collection and PartialCollectionView pagination relations; IriTemplate syntax, mapping variables, Basic/ExplicitRepresentation; TemplatedLink search property; Error and Status classes with hydra:statusCode and RFC7807 headers; HTTP Link header discovery; Prefer header extension hint.

## Normalised Extract
Table of Contents:
1 Namespace and Prefix
2 Link Affordances
3 Operations
4 API Documentation
5 SupportedProperty and SupportedOperation
6 Collections and Pagination
7 IRI Templates and TemplatedLink
8 Error and Status Representation
9 Discovery via HTTP Link Header
10 Extension Support

1 Namespace and Prefix
IRI: http://www.w3.org/ns/hydra/core#
Prefix: hydra

2 Link Affordances
Define RDF property of type hydra:Link to mark dereferenceable links.
JSON-LD context entry must include "@hydra:link": true and "@type": "@id".

3 Operations
Hydra:Operation vocabulary:
hydra:method: HTTP verb string
hydra:expects: expected payload class IRI
hydra:returns: return payload class IRI
hydra:possibleStatus: array of hydra:Status
hydra:expectsHeader, hydra:returnsHeader: header names or objects {name, values, closedSet}.

4 API Documentation
hydra:ApiDocumentation class:
hydra:title: string
hydra:description: string
hydra:entrypoint: IRI of root resource
hydra:supportedClass: list of class IRIs
hydra:possibleStatus: global status definitions

5 SupportedProperty and SupportedOperation
hydra:SupportedProperty instances:
hydra:property: property IRI
hydra:title, hydra:description
hydra:required: boolean
hydra:readable, hydra:writable: boolean
Attach hydra:supportedOperation to classes or SupportedProperty.

6 Collections and Pagination
hydra:Collection class with hydra:member links.
hydra:PartialCollectionView class with hydra:first, hydra:next, hydra:previous, hydra:last.
hydra:memberAssertion blocks with hydra:subject, hydra:property, hydra:object.

7 IRI Templates and TemplatedLink
hydra:IriTemplate properties:
hydra:template: literal template string (default RFC6570)
hydra:mapping: hydra:IriTemplateMapping array
hydra:variableRepresentation: BasicRepresentation | ExplicitRepresentation
IriTemplateMapping:
hydra:variable: variable name
hydra:property: mapped property IRI
hydra:required: boolean
TemplatedLink class for properties with IRI templates; predefined property hydra:search.

8 Error and Status Representation
hydra:Status and hydra:Error classes with hydra:statusCode: integer, hydra:title, hydra:description.
Use application/problem+json media type; include Link header rel hydra:context to map fields.

9 Discovery via HTTP Link Header
Server MUST emit Link: <docIRI>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation" on all API responses.
Client retrieves API documentation from docIRI via GET or HEAD.

10 Extension Support
Use Prefer HTTP header: Prefer: return=representation; include="extensionIRI" to hint available vocabularies.
Server MUST honor RFC7240 Prefer header semantics.


## Supplementary Details
Implementation Steps:
1 Add JSON-LD context header: Accept: application/ld+json; profile="http://www.w3.org/ns/hydra/context.jsonld".
2 Expose API entry point using HTTP Link header: Link: <https://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation".
3 In representations, include @context referencing remote context JSON-LD.
4 For each link property in domain vocab, mark JSON-LD context entry with @hydra:link:true and @type:@id.
5 Embed hydra:Operation affordances:
   - hydra:method: exact uppercase HTTP verb.
   - hydra:expects and hydra:returns: exact class IRIs.
   - hydra:possibleStatus: list of hydra:Status objects with hydra:statusCode integer and hydra:title.
6 Document classes in ApiDocumentation:
   - hydra:entrypoint: root IRI
   - hydra:supportedClass: IRIs of classes with associated supportedOperation and supportedProperty lists.
7 For pagination, return hydra:Collection or hydra:PartialCollectionView with hydra:member and hydra:next/hydra:previous links.
8 Define hydra:IriTemplate in JSON-LD with hydra:template, hydra:mapping array of objects including hydra:variable, hydra:property, hydra:required boolean.
   - Default representation syntax RFC6570; to override use hydra:variableRepresentation with hydra:ExplicitRepresentation.
9 On errors, respond with application/problem+json, include Link header to hydra error context, return JSON-LD fields: type, title, detail, status, instance.
10 To support extensions, allow client to send Prefer header with include="extensionIRI". Process extension vocabularies accordingly.

Configuration Options:
- context JSON-LD URL: http://www.w3.org/ns/hydra/context.jsonld
- error context URL: http://www.w3.org/ns/hydra/error
- Use RFC6570 URI template syntax by default.


## Reference Details
Complete API Specifications and Examples:

1 HTTP Headers and Discovery
- On all API responses include:
    Link: <https://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Accept header to request Hydra JSON-LD:
    Accept: application/ld+json; profile="http://www.w3.org/ns/hydra/context.jsonld"

2 API Documentation Retrieval
Command:
  curl -i https://api.example.com/doc/
Response (200 OK, application/ld+json):
{
  "@context": "http://www.w3.org/ns/hydra/context.jsonld",
  "@id": "/doc/",
  "@type": "hydra:ApiDocumentation",
  "hydra:title": "Issue Tracker API",
  "hydra:description": "API for filing and commenting issues.",
  "hydra:entrypoint": "/issues/",
  "hydra:supportedClass": [
    {
      "@id": "vocab:Issue",
      "@type": "hydra:Class",
      "hydra:supportedProperty": [
        { "hydra:property": "vocab:title", "hydra:required": true, "hydra:readable": true, "hydra:writable": true }
      ],
      "hydra:supportedOperation": [
        { "@type":"hydra:Operation","hydra:method":"GET","hydra:returns":"vocab:Issue" },
        { "@type":"hydra:Operation","hydra:method":"POST","hydra:expects":"vocab:Issue","hydra:returns":"vocab:Issue","hydra:possibleStatus":[{"@type":"hydra:Status","hydra:statusCode":201}]} 
      ]
    }
  ]
}

3 Collection Retrieval and Pagination
Command:
  curl -i 'https://api.example.com/issues?page=1&limit=10'
Response:
{
  "@type": "hydra:Collection",
  "hydra:member": [ { "@id": "/issues/1" }, ... ],
  "hydra:totalItems": 42,
  "hydra:PartialCollectionView": {
    "@type": "hydra:PartialCollectionView",
    "hydra:first": "/issues?page=1&limit=10",
    "hydra:next": "/issues?page=2&limit=10",
    "hydra:last": "/issues?page=5&limit=10"
  }
}

4 IRI Template and TemplatedLink
Context entry:
  "search": { "@id": "hydra:search", "@type": "@id", "@type": "hydra:TemplatedLink" }
In responses:
  "search": {
    "@type": "hydra:IriTemplate",
    "hydra:template": "https://api.example.com/issues{?q}",
    "hydra:mapping": [
      { "@type": "hydra:IriTemplateMapping","hydra:variable":"q","hydra:property":"vocab:freetextQuery","hydra:required":false }
    ]
  }
Expand template with q=error via code or HTTP client.

5 Operation Invocation Examples
Create new issue:
  curl -X POST 'https://api.example.com/issues' \
    -H 'Content-Type: application/ld+json' \
    -d '{"@context":"http://www.w3.org/ns/hydra/context.jsonld","@type":"vocab:Issue","vocab:title":"New bug"}'

Modify issue:
  curl -X PUT 'https://api.example.com/issues/1' \
    -H 'Content-Type: application/ld+json' \
    -d '{"@context":"http://www.w3.org/ns/hydra/context.jsonld","@id":"/issues/1","@type":"vocab:Issue","vocab:title":"Updated title"}'

Delete issue:
  curl -X DELETE 'https://api.example.com/issues/1'

6 Error Responses and Troubleshooting
Error response example:
  HTTP/1.1 400 Bad Request
  Content-Type: application/problem+json
  Link: <http://www.w3.org/ns/hydra/error>; rel="http://www.w3.org/ns/hydra/core#context"

Body:
  {
    "@context": "http://www.w3.org/ns/hydra/error",
    "type": "Error",
    "title": "ValidationError",
    "detail": "Missing required property: title",
    "status": 400,
    "instance": "/issues/"
  }

Troubleshooting Commands:
- Verify context accessibility:
  curl -i http://www.w3.org/ns/hydra/context.jsonld
- Fallback to HEAD request if GET fails:
  curl -I https://api.example.com/doc/
- On missing statements for related resource, client SHOULD re-fetch API documentation or dereference resource URL if within same origin.

7 Best Practices
- Always include hydra context in @context array to reduce payload size via remote caching.
- Client must validate received hydra:operation hydra:method and hydra:possibleStatus at runtime.
- Use explicit JSON-LD type coercion for IRI values via "@type":"@id" mapping.
- Reload ApiDocumentation on failure to rebuild affordance metadata.


## Information Dense Extract
hydra: core prefix http://www.w3.org/ns/hydra/core#, JSON-LD context http://www.w3.org/ns/hydra/context.jsonld; Link class marked via @hydra:link:true and @type:@id; Operation must specify hydra:method (GET|POST|PUT|DELETE), hydra:expects classIRI, hydra:returns classIRI, hydra:possibleStatus array of {statusCode:int,title}; ApiDocumentation fields: hydra:entrypoint, supportedClass, supportedProperty (propertyIRI,required:boolean,readable:boolean,writable:boolean), supportedOperation; Collection via hydra:Collection with hydra:member; PartialCollectionView navigation via first,next,previous,last IRIs; IriTemplate uses hydra:template string, hydra:mapping array (variable,propertyIRI,required), default RFC6570 syntax, override via hydra:variableRepresentation; TemplatedLink for hydra:search; Status/Error with statusCode, title, detail, use application/problem+json and Link to hydra error context; discover api-doc via HTTP Link header rel hydra:apiDocumentation; client-driven pagination via hydra:pageIndex, hydra:limit or custom pageReference; extensions via Prefer header hydra.extension; error recovery: reload ApiDocumentation or dereference resource within same scheme and authority.

## Sanitised Extract
Table of Contents:
1 Namespace and Prefix
2 Link Affordances
3 Operations
4 API Documentation
5 SupportedProperty and SupportedOperation
6 Collections and Pagination
7 IRI Templates and TemplatedLink
8 Error and Status Representation
9 Discovery via HTTP Link Header
10 Extension Support

1 Namespace and Prefix
IRI: http://www.w3.org/ns/hydra/core#
Prefix: hydra

2 Link Affordances
Define RDF property of type hydra:Link to mark dereferenceable links.
JSON-LD context entry must include '@hydra:link': true and '@type': '@id'.

3 Operations
Hydra:Operation vocabulary:
hydra:method: HTTP verb string
hydra:expects: expected payload class IRI
hydra:returns: return payload class IRI
hydra:possibleStatus: array of hydra:Status
hydra:expectsHeader, hydra:returnsHeader: header names or objects {name, values, closedSet}.

4 API Documentation
hydra:ApiDocumentation class:
hydra:title: string
hydra:description: string
hydra:entrypoint: IRI of root resource
hydra:supportedClass: list of class IRIs
hydra:possibleStatus: global status definitions

5 SupportedProperty and SupportedOperation
hydra:SupportedProperty instances:
hydra:property: property IRI
hydra:title, hydra:description
hydra:required: boolean
hydra:readable, hydra:writable: boolean
Attach hydra:supportedOperation to classes or SupportedProperty.

6 Collections and Pagination
hydra:Collection class with hydra:member links.
hydra:PartialCollectionView class with hydra:first, hydra:next, hydra:previous, hydra:last.
hydra:memberAssertion blocks with hydra:subject, hydra:property, hydra:object.

7 IRI Templates and TemplatedLink
hydra:IriTemplate properties:
hydra:template: literal template string (default RFC6570)
hydra:mapping: hydra:IriTemplateMapping array
hydra:variableRepresentation: BasicRepresentation | ExplicitRepresentation
IriTemplateMapping:
hydra:variable: variable name
hydra:property: mapped property IRI
hydra:required: boolean
TemplatedLink class for properties with IRI templates; predefined property hydra:search.

8 Error and Status Representation
hydra:Status and hydra:Error classes with hydra:statusCode: integer, hydra:title, hydra:description.
Use application/problem+json media type; include Link header rel hydra:context to map fields.

9 Discovery via HTTP Link Header
Server MUST emit Link: <docIRI>; rel='http://www.w3.org/ns/hydra/core#apiDocumentation' on all API responses.
Client retrieves API documentation from docIRI via GET or HEAD.

10 Extension Support
Use Prefer HTTP header: Prefer: return=representation; include='extensionIRI' to hint available vocabularies.
Server MUST honor RFC7240 Prefer header semantics.

## Original Source
Linked Data Best Practices & Hypermedia Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespace

Prefix: hydra:
IRI: http://www.w3.org/ns/hydra/core#

## Classes

hydra:Link
hydra:Operation
hydra:ApiDocumentation
hydra:Collection
hydra:PartialCollectionView
hydra:SupportedProperty
hydra:IriTemplate
hydra:TemplatedLink
hydra:Status
hydra:Error

## Properties

hydra:link: Boolean annotation in JSON-LD context to mark a property as dereferenceable link.
hydra:operation: relation to hydra:Operation instances.
hydra:method: HTTP method string (GET, POST, PUT, DELETE).
hydra:expects: class IRI of expected request payload.
hydra:returns: class IRI of returned response payload.
hydra:possibleStatus: links to hydra:Status or hydra:Error defining HTTP status codes and descriptions.
hydra:expectsHeader / hydra:returnsHeader: list of HTTP header names or objects with name, values, closedSet boolean.
hydra:template: literal IRI template string (RFC6570 by default).
hydra:mapping: relation to one or more hydra:IriTemplateMapping instances.
hydra:variable: name of variable in IRI template.
hydra:property: IRI of property mapped to template variable.
hydra:required: boolean flag marking mapping variable as required.
hydra:variableRepresentation: BasicRepresentation or ExplicitRepresentation.
hydra:first / hydra:next / hydra:previous / hydra:last: navigation relations on hydra:PartialCollectionView.
hydra:member: relation to collection member resources.
hydra:subject / hydra:property / hydra:object: predicates for hydra:memberAssertion.
hydra:entrypoint: IRI of API entry point in hydra:ApiDocumentation.
hydra:supportedClass: relation to classes documented in hydra:ApiDocumentation.
hydra:supportedProperty: relation to hydra:SupportedProperty instances describing class properties.
hydra:supportedOperation: relation to operations supported by a class or property.
hydra:extension: IRI of extension vocabularies client supports (Prefer header).

## Usage Highlights

- To expose a dereferenceable link property:
  RDF/XML:
    <rdf:Property rdf:about="http://api.example.com/vocab#comments">
      <rdf:type rdf:resource="http://www.w3.org/ns/hydra/core#Link"/>
    </rdf:Property>

  JSON-LD context:
    "comments": { "@id": "vocab:comments", "@type": "@id", "@hydra:link": true }

- To add an affordance for a client operation:
  Representation payload:
    "operation": {
      "@type": "hydra:Operation",
      "hydra:method": "POST",
      "hydra:expects": "vocab:Issue",
      "hydra:returns": "vocab:Issue",
      "hydra:possibleStatus": [{ "@type":"hydra:Status","hydra:statusCode":201 }]
    }

- To document IRI templates:
  "search": {
    "@type": "hydra:IriTemplate",
    "hydra:template": "http://api.example.com/issues{?search}",
    "hydra:mapping": [
      { "@type": "hydra:IriTemplateMapping", "hydra:variable": "search", "hydra:property": "vocab:find", "hydra:required": false }
    ]
  }

- To paginate collections:
  Collection payload:
    "@type": "hydra:Collection",
    "hydra:member": [ { "@id": "http://api.example.com/issues/1" }, ... ],
    "hydra:PartialCollectionView": {
      "@type": "hydra:PartialCollectionView",
      "hydra:first": ".../page=1&limit=10",
      "hydra:next": ".../page=2&limit=10"
    }

- Error handling with RFC7807 compatibility:
  HTTP response:
    400 Bad Request
    Content-Type: application/problem+json
    Link: <http://www.w3.org/ns/hydra/error>; rel="http://www.w3.org/ns/hydra/core#context"
  Body:
    { "type":"Error","title":"Invalid input","detail":"Missing title","status":400 }

-Date retrieved: 2024-06-18
-Data size: 642145 bytes


## Attribution
- Source: Linked Data Best Practices & Hypermedia Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: License if known
- Crawl Date: 2025-04-29T13:04:21.681Z
- Data Size: 642145 bytes
- Links Found: 412

## Retrieved
2025-04-29
