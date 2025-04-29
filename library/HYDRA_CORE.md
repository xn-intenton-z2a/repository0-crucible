# HYDRA_CORE

## Crawl Summary
Namespace: http://www.w3.org/ns/hydra/core#, prefix hydra; Classes: hydra:Link for dereferenceable properties; hydra:Operation with required hydra:method and optional hydra:expects, hydra:returns, hydra:statusCode, hydra:expectsHeader, hydra:returnsHeader, hydra:description, hydra:title; hydra:ApiDocumentation with hydra:entrypoint, hydra:supportedClass, hydra:supportedProperty, hydra:possibleStatus; hydra:SupportedProperty with hydra:property, hydra:required, hydra:readable, hydra:writeable, hydra:supportedOperation; Collections: hydra:Collection with hydra:member, hydra:totalItems; hydra:PartialCollectionView with pagination IRIs; IriTemplate: hydra:template, hydra:variableMapping, hydra:variableRepresentation, hydra:resolveRelativeTo; Error handling: hydra:Status, hydra:Error, application/problem+json + Link header; Discovery via HTTP Link header rel hydra:apiDocumentation

## Normalised Extract
Table of Contents
1. Namespace and Context Configuration
2. Link Property Definition
3. Operation Definition and Usage
4. API Documentation Structure
5. Supported Properties and Operations
6. Collections and Paging
7. IRI Template Syntax and Expansion
8. Error and Status Handling
9. API Discovery via HTTP Headers

1. Namespace and Context Configuration
Iri: http://www.w3.org/ns/hydra/core#
prefix: hydra
JSON-LD Context Snippet:
  "hydra": "http://www.w3.org/ns/hydra/core#"

2. Link Property Definition
Property type: hydra:Link
Domain: any class defining a link property
Range: IRI
Client behavior: dereference the @id values
Context mapping:
  "comments": {"@id": "http://api.example.com/vocab#comments","@type":"hydra:Link"}

3. Operation Definition and Usage
Class: hydra:Operation
Required: hydra:method (value: GET|POST|PUT|DELETE|PATCH)
Optional:
  hydra:expects (IRI)
  hydra:returns (IRI)
  hydra:statusCode (xsd:integer)
  hydra:expectsHeader (xsd:string or JSON array)
  hydra:returnsHeader (xsd:string or JSON array)
  hydra:title (xsd:string)
  hydra:description (xsd:string)
Example:
  {"@type":"hydra:Operation","hydra:method":"POST","hydra:expects":"schema:Comment","hydra:returns":"schema:Comment","hydra:statusCode":201}

4. API Documentation Structure
Class: hydra:ApiDocumentation
Properties:
  hydra:title (string)
  hydra:description (string)
  hydra:entrypoint (IRI)
  hydra:supportedClass (hydra:Class array)
  hydra:supportedProperty (hydra:SupportedProperty array)
  hydra:possibleStatus (hydra:Status array)

5. Supported Properties and Operations
Class: hydra:SupportedProperty
Properties:
  hydra:property (IRI)
  hydra:required (boolean)
  hydra:readable (boolean)
  hydra:writeable (boolean)
  hydra:title (string)
  hydra:description (string)
  hydra:supportedOperation (hydra:Operation array)

6. Collections and Paging
hydra:Collection:
  hydra:member (IRI or object)
  hydra:totalItems (integer)
hydra:PartialCollectionView:
  hydra:first, hydra:next, hydra:previous, hydra:last (IRI of view)

7. IRI Template Syntax and Expansion
Class: hydra:IriTemplate
Properties:
  hydra:template (string) — default RFC6570
  hydra:variableMapping (hydra:IriTemplateMapping array)
  hydra:variableRepresentation (hydra:BasicRepresentation|hydra:ExplicitRepresentation)
  hydra:resolveRelativeTo (boolean)
Mapping:
  hydra:IriTemplateMapping:
    hydra:variable (string)
    hydra:property (IRI)
    hydra:required (boolean)

8. Error and Status Handling
Class: hydra:Status
Properties:
  hydra:statusCode (integer)
  hydra:title (string)
  hydra:description (string)
Class: hydra:Error (subclass of hydra:Status)
Response Content-Type: application/problem+json
Required Header: Link: <contextIRI>; rel="http://www.w3.org/ns/hydra/core#context"

9. API Discovery via HTTP Headers
Header:
  Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
Methods: GET or HEAD



## Supplementary Details
1. JSON-LD Context URL: https://www.w3.org/ns/hydra/context.jsonld (cacheable remote context).
2. Default Template Syntax: RFC6570 (level 1).
3. VariableRepresentation defaults:
   BasicRepresentation: lexical form, no escaping, no type/language.
   ExplicitRepresentation: "value"@lang or "value"^^datatypeIRI, no escaping.
4. HTTP Status codes mapping:
   200-299: Success, hydra:Status optional
   400-499: Client errors, use hydra:Error with application/problem+json.
   500-599: Server errors, use hydra:Error with subclass-specific details.
5. Discovery: API servers MUST include Link header on every response for continuous discoverability.
6. Clients SHOULD preload API documentation and re-fetch on errors to account for runtime changes.


## Reference Details
# Class: hydra:Operation
hydra:method (range: xsd:string)
hydra:expects (range: rdfs:Resource)
hydra:returns (range: rdfs:Resource)
hydra:statusCode (range: xsd:integer)
hydra:expectsHeader (range: rdf:Property or array)
hydra:returnsHeader (range: rdf:Property or array)
hydra:title (range: xsd:string)
hydra:description (range: xsd:string)

# Class: hydra:ApiDocumentation
hydra:title (xsd:string)
hydra:description (xsd:string)
hydra:entrypoint (IRI)
hydra:supportedClass (hydra:Class array)
hydra:supportedProperty (hydra:SupportedProperty array)
hydra:possibleStatus (hydra:Status array)

# Class: hydra:SupportedProperty
hydra:property (IRI) REQUIRED
hydra:required (xsd:boolean) DEFAULT false
hydra:readable (xsd:boolean) DEFAULT true
hydra:writeable (xsd:boolean) DEFAULT true
hydra:title (xsd:string) OPTIONAL
hydra:description (xsd:string) OPTIONAL
hydra:supportedOperation (hydra:Operation array)

# Class: hydra:Collection
hydra:member (IRI or object)
hydra:totalItems (xsd:integer) OPTIONAL

# Class: hydra:PartialCollectionView
hydra:first (IRI)
hydra:next (IRI)
hydra:previous (IRI)
hydra:last (IRI)

# Class: hydra:IriTemplate
hydra:template (xsd:string) REQUIRED
hydra:variableMapping (hydra:IriTemplateMapping array) REQUIRED
hydra:variableRepresentation (hydra:BasicRepresentation|hydra:ExplicitRepresentation) DEFAULT hydra:BasicRepresentation
hydra:resolveRelativeTo (xsd:boolean) DEFAULT false

# Class: hydra:IriTemplateMapping
hydra:variable (xsd:string) REQUIRED
hydra:property (IRI) REQUIRED
hydra:required (xsd:boolean) DEFAULT false

# Class: hydra:Status
hydra:statusCode (xsd:integer) REQUIRED
hydra:title (xsd:string) OPTIONAL
hydra:description (xsd:string) OPTIONAL

# Class: hydra:Error < hydra:Status
Use application/problem+json
Additional Header: Link: <contextIRI>; rel="http://www.w3.org/ns/hydra/core#context"

## Implementation Patterns
1. Define JSON-LD context once in API root response:
   {"@context":"https://www.w3.org/ns/hydra/context.jsonld"}
2. Template usage:
   {"search":{"@type":"hydra:TemplatedLink","hydra:template":"http://api.example.com/issues{?query}","hydra:variableMapping":[{"hydra:variable":"query","hydra:property":"hydra:freetextQuery","hydra:required":true}],"hydra:resolveRelativeTo":true}}
3. PartialCollectionView:
   {"@id":"http://api.example.com/issues?page=2","@type":"hydra:PartialCollectionView","hydra:first":"?page=1","hydra:last":"?page=10","hydra:next":"?page=3"}

## Best Practices
- Always use hydra:Link for dereferenceable IRIs.
- Use application/problem+json with Hydra Error context header.
- Re-fetch API documentation after error status codes to adapt to runtime changes.
- Use JSON-LD remote context URL for compact payloads.

## Troubleshooting Procedures
1. Missing Link header:
   Command: curl -I http://api.example.com
   Expect: Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
2. JSON-LD parsing errors:
   Command: jsonld-cli expand --input api-response.json
   Expected: Expanded JSON-LD with @id and @type for all hydra terms
3. Template expansion failures:
   Command: test code snippet expanding template in client library; verify resolved IRI matches expected pattern


## Information Dense Extract
hydra:Link marks properties with dereferenceable IRIs; hydra:Operation requires hydra:method {GET,POST,PUT,DELETE,PATCH}; optional expects/returns IRIs, statusCode integer, expectsHeader/returnsHeader strings; hydra:ApiDocumentation defines entrypoint, supportedClass, supportedProperty, possibleStatus; hydra:SupportedProperty defines property IRI, required:boolean (false), readable:boolean(true), writeable:boolean(true), supportedOperation operations; hydra:Collection uses member IRIs or objects, totalItems optional; hydra:PartialCollectionView uses first,next,previous,last IRIs; hydra:IriTemplate uses template string (RFC6570), variableMapping array mapping variable names to property IRIs with required flags; variableRepresentation defaults to BasicRepresentation, can be ExplicitRepresentation using "value"^^datatype or "value"@lang; hydra:Status defines statusCode integer; hydra:Error subclass for application/problem+json with context Link header; API discovery via HTTP Link header rel hydra:apiDocumentation; use remote JSON-LD context at https://www.w3.org/ns/hydra/context.jsonld

## Sanitised Extract
Table of Contents
1. Namespace and Context Configuration
2. Link Property Definition
3. Operation Definition and Usage
4. API Documentation Structure
5. Supported Properties and Operations
6. Collections and Paging
7. IRI Template Syntax and Expansion
8. Error and Status Handling
9. API Discovery via HTTP Headers

1. Namespace and Context Configuration
Iri: http://www.w3.org/ns/hydra/core#
prefix: hydra
JSON-LD Context Snippet:
  'hydra': 'http://www.w3.org/ns/hydra/core#'

2. Link Property Definition
Property type: hydra:Link
Domain: any class defining a link property
Range: IRI
Client behavior: dereference the @id values
Context mapping:
  'comments': {'@id': 'http://api.example.com/vocab#comments','@type':'hydra:Link'}

3. Operation Definition and Usage
Class: hydra:Operation
Required: hydra:method (value: GET|POST|PUT|DELETE|PATCH)
Optional:
  hydra:expects (IRI)
  hydra:returns (IRI)
  hydra:statusCode (xsd:integer)
  hydra:expectsHeader (xsd:string or JSON array)
  hydra:returnsHeader (xsd:string or JSON array)
  hydra:title (xsd:string)
  hydra:description (xsd:string)
Example:
  {'@type':'hydra:Operation','hydra:method':'POST','hydra:expects':'schema:Comment','hydra:returns':'schema:Comment','hydra:statusCode':201}

4. API Documentation Structure
Class: hydra:ApiDocumentation
Properties:
  hydra:title (string)
  hydra:description (string)
  hydra:entrypoint (IRI)
  hydra:supportedClass (hydra:Class array)
  hydra:supportedProperty (hydra:SupportedProperty array)
  hydra:possibleStatus (hydra:Status array)

5. Supported Properties and Operations
Class: hydra:SupportedProperty
Properties:
  hydra:property (IRI)
  hydra:required (boolean)
  hydra:readable (boolean)
  hydra:writeable (boolean)
  hydra:title (string)
  hydra:description (string)
  hydra:supportedOperation (hydra:Operation array)

6. Collections and Paging
hydra:Collection:
  hydra:member (IRI or object)
  hydra:totalItems (integer)
hydra:PartialCollectionView:
  hydra:first, hydra:next, hydra:previous, hydra:last (IRI of view)

7. IRI Template Syntax and Expansion
Class: hydra:IriTemplate
Properties:
  hydra:template (string)  default RFC6570
  hydra:variableMapping (hydra:IriTemplateMapping array)
  hydra:variableRepresentation (hydra:BasicRepresentation|hydra:ExplicitRepresentation)
  hydra:resolveRelativeTo (boolean)
Mapping:
  hydra:IriTemplateMapping:
    hydra:variable (string)
    hydra:property (IRI)
    hydra:required (boolean)

8. Error and Status Handling
Class: hydra:Status
Properties:
  hydra:statusCode (integer)
  hydra:title (string)
  hydra:description (string)
Class: hydra:Error (subclass of hydra:Status)
Response Content-Type: application/problem+json
Required Header: Link: <contextIRI>; rel='http://www.w3.org/ns/hydra/core#context'

9. API Discovery via HTTP Headers
Header:
  Link: <http://api.example.com/doc/>; rel='http://www.w3.org/ns/hydra/core#apiDocumentation'
Methods: GET or HEAD

## Original Source
Linked Data Best Practices & Hypermedia Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespace and Prefix
- Hydr a Core Vocabulary IRI: http://www.w3.org/ns/hydra/core#
- Suggested JSON-LD prefix: hydra

## Class Definitions

### hydra:Link
- Purpose: Marks a property whose values are dereferenceable IRIs.
- Usage in JSON-LD context:
```json
{"hydra": "http://www.w3.org/ns/hydra/core#",
 "comments": {"@id": "http://api.example.com/vocab#comments","@type":"hydra:Link"}}
```
- Client behavior: Dereference values where property @type is hydra:Link.

### hydra:Operation
- Purpose: Describes HTTP interactions (verbs, inputs, outputs).
- Required property: hydra:method (MUST be one of GET, POST, PUT, DELETE, PATCH).
- Optional properties:
  - hydra:expects: IRI of expected class or datatype.
  - hydra:returns: IRI of returned class or datatype.
  - hydra:statusCode: integer HTTP status code hint.
  - hydra:expectsHeader, hydra:returnsHeader: IRI or array of header names.
  - hydra:description, hydra:title: human-readable.

```json
{"@type":"hydra:Operation",
 "hydra:method":"POST",
 "hydra:expects":"schema:Comment",
 "hydra:returns":"schema:Comment",
 "hydra:statusCode":201}
```

## ApiDocumentation

- Class: hydra:ApiDocumentation
- Properties:
  - hydra:title: string
  - hydra:description: string
  - hydra:entrypoint: IRI of the API root resource
  - hydra:supportedClass: array of documentation skeletons (hydra:Class)
  - hydra:supportedProperty: hydra:SupportedProperty records
  - hydra:possibleStatus: hydra:Status or subclass

```json
{"@id":"http://api.example.com/doc/",
 "@type":"hydra:ApiDocumentation",
 "hydra:entrypoint":"http://api.example.com/",
 "hydra:supportedClass":[ ... ]}
```

## SupportedProperty and SupportedOperation
- hydra:SupportedProperty:
  - hydra:property: IRI of the predicate
  - hydra:required: boolean
  - hydra:readable: boolean
  - hydra:writeable: boolean
  - hydra:description, hydra:title
  - hydra:supportedOperation: list of hydra:Operation

## Collections

### hydra:Collection
- hydra:member: IRI or inline object of collection members
- hydra:totalItems: integer (optional)

### hydra:PartialCollectionView
- hydra:first, hydra:last, hydra:next, hydra:previous: IRIs
- Each view is a hydra:PartialCollectionView linked to hydra:Collection

## IriTemplate and TemplatedLink

### hydra:IriTemplate
- hydra:template: URI template literal (default RFC6570)
- hydra:variableMapping: array of hydra:IriTemplateMapping
- hydra:variableRepresentation: hydra:BasicRepresentation or hydra:ExplicitRepresentation
- hydra:resolveRelativeTo: hydra:Link context flag

### hydra:IriTemplateMapping
- hydra:variable: name in template
- hydra:property: IRI of property supplying values
- hydra:required: boolean

## Error and Status
- hydra:Status:
  - hydra:statusCode: integer
  - hydra:title, hydra:description
- hydra:Error (subclass)
  - Serialization: application/problem+json
  - Must include Link header: rel="http://www.w3.org/ns/hydra/core#context"

## Discovery via Link Header
- Header: Link: <docIRI>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Clients perform HTTP GET or HEAD on homepage


## Attribution
- Source: Linked Data Best Practices & Hypermedia Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: License if known
- Crawl Date: 2025-04-29T14:52:39.320Z
- Data Size: 443961 bytes
- Links Found: 294

## Retrieved
2025-04-29
