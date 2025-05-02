# HYDRA_CORE

## Crawl Summary
hydra:Link defines dereferenceable link properties; hydra:Operation requires hydra:method (HTTP verb), optional hydra:expects, hydra:returns, hydra:possibleStatus; hydra:ApiDocumentation defines hydra:entrypoint, supportedClass, supportedOperation, supportedProperty; hydra:SupportedProperty defines hydra:property, hydra:required, hydra:readable, hydra:writable; hydra:Collection exposes hydra:member; hydra:PartialCollectionView adds hydra:first, hydra:next, hydra:offset, hydra:limit, hydra:pageIndex, hydra:pageLimit, hydra:pageReference; hydra:IriTemplate and IriTemplateMapping specify server URI templates via hydra:template and hydra:mapping; hydra:Status and hydra:Error augment HTTP status codes; clients discover API docs via HTTP Link header rel hydra:apiDocumentation; Prefer header hydra.extension hints extensions; default JSON-LD context at http://www.w3.org/ns/hydra/context.jsonld

## Normalised Extract
Table of Contents:
1. Namespaces
2. Link Class (hydra:Link)
3. Operation Class (hydra:Operation)
4. API Documentation (hydra:ApiDocumentation)
5. Supported Property (hydra:SupportedProperty)
6. Collections and Pagination (hydra:Collection, hydra:PartialCollectionView)
7. IriTemplate and Mappings (hydra:IriTemplate, hydra:IriTemplateMapping)
8. Status and Error (hydra:Status, hydra:Error)
9. API Discovery via Link Header

1. Namespaces
IRI: http://www.w3.org/ns/hydra/core#
Prefix: hydra

2. Link Class
- Domain: resource properties
- Range: IRI for dereferenceable links
- Properties: hydra:operation→Operation list, hydra:title, hydra:description

3. Operation Class
- hydra:method: HTTP verb string (e.g. GET, POST)
- hydra:expects: request payload class IRI
- hydra:returns: response payload class IRI
- hydra:possibleStatus: Status resources list
- hydra:expectsHeader, hydra:returnsHeader: HTTP header names list

4. API Documentation
- hydra:title, hydra:description: strings
- hydra:entrypoint: IRI to API main resource
- hydra:supportedClass: list of supported resource classes
- hydra:supportedOperation: list of global operations
- hydra:supportedProperty: list of property metadata

5. SupportedProperty
- hydra:property: IRI of property
- hydra:required: boolean default=false
- hydra:readable: boolean default=true
- hydra:writable: boolean default=true

6. Collections and Pagination
- hydra:Collection: hydra:member list
- hydra:PartialCollectionView extends Collection with hydra:first, hydra:next, hydra:previous, hydra:last (IRIs);
  hydra:offset, hydra:limit, hydra:pageIndex, hydra:pageLimit (nonNegInt); hydra:pageReference (string)

7. IriTemplate and Mappings
- hydra:IriTemplate: hydra:template literal (RFC6570), hydra:mapping list
  hydra:variableRepresentation (BasicRepresentation or ExplicitRepresentation)
  hydra:resolveRelativeTo for base URI behavior
- hydra:IriTemplateMapping: hydra:variable (string), hydra:property (IRI), hydra:required (boolean default=false)

8. Status and Error
- hydra:Status: hydra:statusCode (nonNegInt), hydra:description (string)
- hydra:Error: subclass of hydra:Status for detailed errors

9. API Discovery
- HTTP GET or HEAD on base URI
- Expect Link header:
  Link: <API_DOC_URL>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Retrieve API_DOC_URL as JSON-LD ApiDocumentation resource


## Supplementary Details
Default property values: SupportedProperty required=false, readable=true, writable=true; IriTemplate variableRepresentation default=BasicRepresentation; Accept header for Hydra JSON-LD: application/ld+json; CORS preflight: OPTIONS with Access-Control-Request-Headers matching hydra:expectsHeader; Prefer header usage: Prefer: hydra.extension="EXTENSION_IRI"; HTTP Link header discovery rel="http://www.w3.org/ns/hydra/core#apiDocumentation"; clients must cache remote context (Cache-Control: max-age=86400); dereference only same-origin resources by default; fallback per RFC3986 (5.1.3-5.1.4) if resolveRelativeTo missing

## Reference Details
JSON-LD Context Example:
{
  "@context": {
    "hydra": "http://www.w3.org/ns/hydra/core#",
    "operation": "hydra:operation",
    "method": {"@id":"hydra:method","@type":"@id"},
    "expects": {"@id":"hydra:expects","@type":"@id"},
    "returns": {"@id":"hydra:returns","@type":"@id"},
    "possibleStatus": {"@id":"hydra:possibleStatus","@type":"@id"}
  }
}

Embedded Operation Example:
{
  "@context":"http://www.w3.org/ns/hydra/context.jsonld",
  "@id":"/items",
  "@type":"hydra:Collection",
  "hydra:member": [{"@id":"/items/1"}],
  "hydra:operation":[{
    "@type":"hydra:Operation",
    "hydra:method":"POST",
    "hydra:expects":"schema:Thing",
    "hydra:returns":"schema:Thing",
    "hydra:possibleStatus":[
      {"hydra:statusCode":201,"hydra:description":"Created"},
      {"hydra:statusCode":400,"hydra:description":"Bad Request"}
    ]
  }]
}

Implementation Pattern:
1. Emit HTTP Link header with rel hydra:apiDocumentation on all responses.
2. Provide API documentation resource at that IRI with JSON-LD and hydra:ApiDocumentation fields.
3. Include hydra:operation in entity representations to expose write affordances.
4. Use IriTemplate for search interfaces and attach supportedOperation when methods differ from GET.
5. Document status codes with hydra:possibleStatus; subclass hydra:Error for error payloads.

Best Practices:
- Cache remote context; use minimal client precomputations.
- Always verify runtime payloads; expect unknown status codes and properties.
- Include human-readable titles and descriptions via hydra:title and hydra:description.

Troubleshooting:
Command: curl -i -H "Accept: application/ld+json" http://api.example.com/ | grep Link
Expected: Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"

Command: curl -X OPTIONS http://api.example.com/items \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization"
Expected headers:
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  Access-Control-Allow-Headers: Content-Type, Authorization

## Information Dense Extract
hydra:Link(domain:any,range:IRI): hydra:operation→hydra:Operation list; hydra:Operation: hydra:method(HTTP verb), hydra:expects/returns(Class IRI), hydra:possibleStatus(Status list), hydra:expectsHeader/returnsHeader(headerNames); hydra:ApiDocumentation: hydra:title,hydra:description(xsd:string),hydra:entrypoint(IRI),hydra:supportedClass(Class list),hydra:supportedOperation(Operation list),hydra:supportedProperty(SupportedProperty list); hydra:SupportedProperty: hydra:property(IRI),hydra:required(false),hydra:readable(true),hydra:writable(true); hydra:Collection: hydra:member(list); hydra:PartialCollectionView: hydra:first/next/previous/last(IRI),hydra:offset/limit/pageIndex/pageLimit(nonNegInt),hydra:pageReference(string); hydra:IriTemplate: hydra:template(RFC6570),hydra:mapping([IriTemplateMapping]),hydra:variableRepresentation(Basic|Explicit),hydra:resolveRelativeTo; hydra:IriTemplateMapping: hydra:variable(string),hydra:property(IRI),hydra:required(false); hydra:Status: hydra:statusCode(nonNegInt),hydra:description; hydra:Error subclass; API discovery via HTTP Link header rel hydra:apiDocumentation; Prefer header hydra.extension for extensions; context default http://www.w3.org/ns/hydra/context.jsonld

## Sanitised Extract
Table of Contents:
1. Namespaces
2. Link Class (hydra:Link)
3. Operation Class (hydra:Operation)
4. API Documentation (hydra:ApiDocumentation)
5. Supported Property (hydra:SupportedProperty)
6. Collections and Pagination (hydra:Collection, hydra:PartialCollectionView)
7. IriTemplate and Mappings (hydra:IriTemplate, hydra:IriTemplateMapping)
8. Status and Error (hydra:Status, hydra:Error)
9. API Discovery via Link Header

1. Namespaces
IRI: http://www.w3.org/ns/hydra/core#
Prefix: hydra

2. Link Class
- Domain: resource properties
- Range: IRI for dereferenceable links
- Properties: hydra:operationOperation list, hydra:title, hydra:description

3. Operation Class
- hydra:method: HTTP verb string (e.g. GET, POST)
- hydra:expects: request payload class IRI
- hydra:returns: response payload class IRI
- hydra:possibleStatus: Status resources list
- hydra:expectsHeader, hydra:returnsHeader: HTTP header names list

4. API Documentation
- hydra:title, hydra:description: strings
- hydra:entrypoint: IRI to API main resource
- hydra:supportedClass: list of supported resource classes
- hydra:supportedOperation: list of global operations
- hydra:supportedProperty: list of property metadata

5. SupportedProperty
- hydra:property: IRI of property
- hydra:required: boolean default=false
- hydra:readable: boolean default=true
- hydra:writable: boolean default=true

6. Collections and Pagination
- hydra:Collection: hydra:member list
- hydra:PartialCollectionView extends Collection with hydra:first, hydra:next, hydra:previous, hydra:last (IRIs);
  hydra:offset, hydra:limit, hydra:pageIndex, hydra:pageLimit (nonNegInt); hydra:pageReference (string)

7. IriTemplate and Mappings
- hydra:IriTemplate: hydra:template literal (RFC6570), hydra:mapping list
  hydra:variableRepresentation (BasicRepresentation or ExplicitRepresentation)
  hydra:resolveRelativeTo for base URI behavior
- hydra:IriTemplateMapping: hydra:variable (string), hydra:property (IRI), hydra:required (boolean default=false)

8. Status and Error
- hydra:Status: hydra:statusCode (nonNegInt), hydra:description (string)
- hydra:Error: subclass of hydra:Status for detailed errors

9. API Discovery
- HTTP GET or HEAD on base URI
- Expect Link header:
  Link: <API_DOC_URL>; rel='http://www.w3.org/ns/hydra/core#apiDocumentation'
- Retrieve API_DOC_URL as JSON-LD ApiDocumentation resource

## Original Source
Hydra Core Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespace

- IRI: http://www.w3.org/ns/hydra/core#
- Prefix: hydra

## Class Definitions

### hydra:Link
- rdf:type: rdfs:Class
- Purpose: Identifies dereferenceable IRI-valued properties in representations.
- Properties:
  - hydra:operation: rdf:Property; domain: hydra:Link; range: hydra:Operation; multiplicity: 0..*
  - hydra:description: rdf:Property; domain: hydra:Link; range: rdf:XMLLiteral
  - hydra:title: rdf:Property; domain: hydra:Link; range: rdf:XMLLiteral

### hydra:Operation
- rdf:type: rdfs:Class
- Purpose: Defines HTTP requests for state transitions.
- Required property:
  - hydra:method: rdf:Property; domain: hydra:Operation; range: xsd:string (HTTP method name)
- Optional properties:
  - hydra:expects: rdf:Property; domain: hydra:Operation; range: rdfs:Class
  - hydra:returns: rdf:Property; domain: hydra:Operation; range: rdfs:Class
  - hydra:possibleStatus: rdf:Property; domain: hydra:Operation; range: hydra:Status; multiplicity: 0..*
  - hydra:expectsHeader: rdf:Property; domain: hydra:Operation; range: xsd:string; multiplicity: 0..*
  - hydra:returnsHeader: rdf:Property; domain: hydra:Operation; range: xsd:string; multiplicity: 0..*

### hydra:ApiDocumentation
- rdf:type: rdfs:Class
- Purpose: Central machine-processable API descriptor.
- Properties:
  - hydra:title: required; range: xsd:string
  - hydra:description: required; range: xsd:string
  - hydra:entrypoint: required; range: rdfs:Resource
  - hydra:supportedClass: rdf:Property; range: rdfs:Class; multiplicity: 1..*
  - hydra:supportedOperation: rdf:Property; range: hydra:Operation; multiplicity: 0..*
  - hydra:supportedProperty: rdf:Property; range: hydra:SupportedProperty; multiplicity: 0..*

### hydra:SupportedProperty
- rdf:type: rdfs:Class
- Purpose: Describes class-dependent property attributes.
- Properties:
  - hydra:property: required; range: rdf:Property
  - hydra:title: optional; range: xsd:string
  - hydra:description: optional; range: xsd:string
  - hydra:required: optional; range: xsd:boolean; default: false
  - hydra:readable: optional; range: xsd:boolean; default: true
  - hydra:writable: optional; range: xsd:boolean; default: true

### hydra:Collection
- rdf:type: rdfs:Class
- Purpose: Represents a set of member resources.
- Properties:
  - hydra:member: rdf:Property; range: rdfs:Resource; multiplicity: 0..*

### hydra:PartialCollectionView
- rdf:type: rdfs:Class; rdfs:subClassOf hydra:Collection
- Purpose: Paged view on a collection.
- Optional properties:
  - hydra:first: range: rdfs:Resource
  - hydra:next: range: rdfs:Resource
  - hydra:previous: range: rdfs:Resource
  - hydra:last: range: rdfs:Resource
  - hydra:offset: range: xsd:nonNegativeInteger
  - hydra:limit: range: xsd:nonNegativeInteger
  - hydra:pageIndex: range: xsd:nonNegativeInteger
  - hydra:pageLimit: range: xsd:nonNegativeInteger
  - hydra:pageReference: range: xsd:string

### hydra:IriTemplate
- rdf:type: rdfs:Class
- Purpose: Server-provided URI template for client-side URI construction.
- Required properties:
  - hydra:template: range: rdf:PlainLiteral; datatype defaults to RFC6570 URI Template
  - hydra:mapping: range: hydra:IriTemplateMapping; multiplicity: 1..*
- Optional properties:
  - hydra:variableRepresentation: range: hydra:VariableRepresentation; default: hydra:BasicRepresentation
  - hydra:resolveRelativeTo: range: hydra:ResolveRelativeTo

### hydra:IriTemplateMapping
- rdf:type: rdfs:Class
- Properties:
  - hydra:variable: required; range: xsd:string
  - hydra:property: required; range: rdf:Property
  - hydra:required: optional; range: xsd:boolean; default: false

### hydra:Status
- rdf:type: rdfs:Class
- Purpose: Extend HTTP status semantics.
- Required property:
  - hydra:statusCode: range: xsd:nonNegativeInteger
- Optional property:
  - hydra:description: range: xsd:string

### hydra:Error
- rdf:type: rdfs:Class; rdfs:subClassOf hydra:Status
- Purpose: Error-specific status subclass.

## API Discovery

Clients MUST use HTTP GET or HEAD on a base URI to locate API documentation.
Server MUST include header:
Link: <API_DOC_URL>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
Client MUST retrieve the resource at API_DOC_URL as hydra:ApiDocumentation.

# Attribution and Metadata

- Source URL: https://www.hydra-cg.com/spec/latest/core/
- Retrieved: 2024-06-15
- Data Size: 689409 bytes

## Attribution
- Source: Hydra Core Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: CC BY 4.0
- Crawl Date: 2025-05-02T18:52:15.092Z
- Data Size: 689409 bytes
- Links Found: 450

## Retrieved
2025-05-02
