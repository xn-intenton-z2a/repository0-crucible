# HYDRA_CORE

## Crawl Summary
Namespace fixed at http://www.w3.org/ns/hydra/core#. Key classes: Link, Operation, ApiDocumentation, IriTemplate, Collection, PartialCollectionView, Status, Error. Link marks dereferenceable IRIs. Operation defines HTTP method plus optional expects, returns, statusCode. ApiDocumentation defines title, description, entrypoint, supportedClass, possibleStatus. IriTemplate defines template string, mapping variables to properties, variableRepresentation, resolveRelativeTo. Collections via hydra:member; paging via hydra:PartialCollectionView with hydra:first/next/previous/last. Error reporting via hydra:Status and hydra:Error with statusCode, title, description. Clients discover API docs via HTTP Link header with rel hydra:apiDocumentation. IriTemplate expansions follow RFC6570 with Basic or Explicit representations.

## Normalised Extract
Table of Contents
1 Prefix and Namespace
2 Classes
 2.1 Link
 2.2 Operation
 2.3 ApiDocumentation
 2.4 IriTemplate
 2.5 Collection & PartialCollectionView
 2.6 Status & Error
3 HTTP Discovery
4 IriTemplate Serialization

1 Prefix and Namespace
Namespace IRI: http://www.w3.org/ns/hydra/core#
Prefix: hydra

2 Classes
2.1 Link
Definition: rdfs:Class hydra:Link
Use: Mark property as dereferenceable
Example:
  @context{ "hydra":"http://www.w3.org/ns/hydra/core#" }
  "@type":"hydra:Link"

2.2 Operation
Definition: rdfs:Class hydra:Operation
Required:
  hydra:method  IRI  http://www.w3.org/2011/http-methods#GET | POST | PUT | DELETE
Optional:
  hydra:expects  IRI  class of input
  hydra:returns  IRI  class of output
  hydra:statusCode  xsd:integer

2.3 ApiDocumentation
Definition: rdfs:Class hydra:ApiDocumentation
Required:
  hydra:title  xsd:string
  hydra:description  xsd:string
  hydra:entrypoint  IRI
Optional:
  hydra:supportedClass  IRI
  hydra:possibleStatus  hydra:Status

2.4 IriTemplate
Definition: rdfs:Class hydra:IriTemplate
Required:
  hydra:template  xsd:string  syntax RFC6570
  hydra:mapping  hydra:IriTemplateMapping
Optional:
  hydra:variableRepresentation  hydra:BasicRepresentation|hydra:ExplicitRepresentation
  hydra:resolveRelativeTo  hydra:IriTemplateResolution

2.5 Collection & PartialCollectionView
hydra:Collection  rdfs:Class
  hydra:member  IRI or object
hydra:PartialCollectionView  rdfs:Class
  hydra:first|last|next|previous  IRI

2.6 Status & Error
hydra:Status  rdfs:Class
  hydra:statusCode  xsd:integer
  hydra:title  xsd:string
  hydra:description  xsd:string
hydra:Error  rdfs:Class  subclass of hydra:Status

3 HTTP Discovery
Clients send GET or HEAD to root
Look for Link header rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
Retrieve URI as ApiDocumentation

4 IriTemplate Serialization
BasicRepresentation: lexical form
ExplicitRepresentation: "lexical"@lang ^^datatype


## Supplementary Details
1. HTTP Headers
- Link: <{apiDocumentationURI}>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Prefer: Preference: return=representation; include="http://www.w3.org/ns/hydra/core#extension"

2. JSON-LD Context
- hydra:method -> http://www.w3.org/2011/http-methods#GET etc.
- hydra:operation -> hydra:Operation

3. Configuration Steps
- Expose HTTP Link header on all responses
- Host JSON-LD context at /hydra/context.jsonld

4. Usage Patterns
- Embed supportedOperation on hydra:Link properties for dynamic affordances
- Use hydra:SupportedProperty to define read-only/write-only


## Reference Details
API Vocabulary:
Class hydra:Link
Properties:
  hydra:readable  xsd:boolean default true
  hydra:writable  xsd:boolean default false

Class hydra:Operation
Properties:
  hydra:method  IRI (one of http://www.w3.org/2011/http-methods#GET, POST, PUT, DELETE, PATCH)
  hydra:expects  IRI any rdfs:Class
  hydra:returns  IRI any rdfs:Class
  hydra:statusCode  xsd:integer

Class hydra:ApiDocumentation
Properties:
  hydra:title  xsd:string
  hydra:description  xsd:string
  hydra:entrypoint  IRI
  hydra:supportedClass  IRI
  hydra:possibleStatus  hydra:Status

Class hydra:IriTemplate
Properties:
  hydra:template  xsd:string
  hydra:mapping  hydra:IriTemplateMapping [1..*]
  hydra:variableRepresentation  hydra:BasicRepresentation|hydra:ExplicitRepresentation
  hydra:resolveRelativeTo  hydra:IriTemplateResolution

Class hydra:Collection
Properties:
  hydra:member  IRI|object [0..*]

Class hydra:PartialCollectionView
Properties: hydra:first, hydra:last, hydra:next, hydra:previous  IRI optional

Class hydra:Status
Properties:
  hydra:statusCode  xsd:integer
  hydra:title  xsd:string
  hydra:description  xsd:string

Class hydra:Error subclass of hydra:Status

Code Example:
{
  "@context": "/hydra/context.jsonld",
  "@type": "hydra:ApiDocumentation",
  "hydra:title": "IssueTracker API",
  "hydra:description": "API for issue tracking",
  "hydra:entrypoint": "/issues",
  "hydra:supportedClass": [
    { "@id": "Issue" }
  ]
}


## Information Dense Extract
Namespace=http://www.w3.org/ns/hydra/core# Classes={Link,Operation,ApiDocumentation,IriTemplate,Collection,PartialCollectionView,Status,Error} Properties Link={hydra:readable:boolean,true;hydra:writable:boolean,false} Operation={hydra:method:IRI(rdf HTTP methods),hydra:expects:Class,hydra:returns:Class,hydra:statusCode:integer} ApiDocumentation={hydra:title:string,hydra:description:string,hydra:entrypoint:IRI,hydra:supportedClass:IRI,hydra:possibleStatus:Status} IriTemplate={hydra:template:string(RFC6570),hydra:mapping:IriTemplateMapping+,hydra:variableRepresentation:(BasicRepresentation|ExplicitRepresentation),hydra:resolveRelativeTo:IriTemplateResolution} Collection={hydra:member:IRI|object*} PartialCollectionView={hydra:first|last|next|previous:IRI?} Status={hydra:statusCode:integer,hydra:title:string,hydra:description:string} Error=subclass Status HTTP Discovery: header Link rel=hydra:apiDocumentation expand templates per RFC6570 Basic or Explicit expansions

## Sanitised Extract
Table of Contents
1 Prefix and Namespace
2 Classes
 2.1 Link
 2.2 Operation
 2.3 ApiDocumentation
 2.4 IriTemplate
 2.5 Collection & PartialCollectionView
 2.6 Status & Error
3 HTTP Discovery
4 IriTemplate Serialization

1 Prefix and Namespace
Namespace IRI: http://www.w3.org/ns/hydra/core#
Prefix: hydra

2 Classes
2.1 Link
Definition: rdfs:Class hydra:Link
Use: Mark property as dereferenceable
Example:
  @context{ 'hydra':'http://www.w3.org/ns/hydra/core#' }
  '@type':'hydra:Link'

2.2 Operation
Definition: rdfs:Class hydra:Operation
Required:
  hydra:method  IRI  http://www.w3.org/2011/http-methods#GET | POST | PUT | DELETE
Optional:
  hydra:expects  IRI  class of input
  hydra:returns  IRI  class of output
  hydra:statusCode  xsd:integer

2.3 ApiDocumentation
Definition: rdfs:Class hydra:ApiDocumentation
Required:
  hydra:title  xsd:string
  hydra:description  xsd:string
  hydra:entrypoint  IRI
Optional:
  hydra:supportedClass  IRI
  hydra:possibleStatus  hydra:Status

2.4 IriTemplate
Definition: rdfs:Class hydra:IriTemplate
Required:
  hydra:template  xsd:string  syntax RFC6570
  hydra:mapping  hydra:IriTemplateMapping
Optional:
  hydra:variableRepresentation  hydra:BasicRepresentation|hydra:ExplicitRepresentation
  hydra:resolveRelativeTo  hydra:IriTemplateResolution

2.5 Collection & PartialCollectionView
hydra:Collection  rdfs:Class
  hydra:member  IRI or object
hydra:PartialCollectionView  rdfs:Class
  hydra:first|last|next|previous  IRI

2.6 Status & Error
hydra:Status  rdfs:Class
  hydra:statusCode  xsd:integer
  hydra:title  xsd:string
  hydra:description  xsd:string
hydra:Error  rdfs:Class  subclass of hydra:Status

3 HTTP Discovery
Clients send GET or HEAD to root
Look for Link header rel='http://www.w3.org/ns/hydra/core#apiDocumentation'
Retrieve URI as ApiDocumentation

4 IriTemplate Serialization
BasicRepresentation: lexical form
ExplicitRepresentation: 'lexical'@lang ^^datatype

## Original Source
Hydra Core Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary Detailed Digest (retrieved 2024-06-10)

## Hydra Namespace
- IRI: http://www.w3.org/ns/hydra/core#
- Prefix: hydra

## Classes and Properties

### hydra:Link
- Type: rdfs:Class
- Purpose: Marks a property as a dereferenceable hyperlink.
- Usage: Define a property with `rdf:type hydra:Link` to indicate its value is an IRI to dereference.

### hydra:Operation
- Type: rdfs:Class
- Required Properties:
  - `hydra:method` (HTTP method, IRI from http://www.w3.org/2011/http-methods#)
- Optional Properties:
  - `hydra:expects` (IRI of expected input class)
  - `hydra:returns` (IRI of returned output class)
  - `hydra:statusCode` (integer HTTP status code hints)

### hydra:ApiDocumentation
- Type: rdfs:Class
- Required Properties:
  - `hydra:title` (xsd:string)
  - `hydra:description` (xsd:string)
  - `hydra:entrypoint` (IRI of entry point resource)
- Optional Properties:
  - `hydra:supportedClass` (link to classes)
  - `hydra:possibleStatus` (hydra:Status definitions)

### hydra:IriTemplate
- Type: rdfs:Class
- Required Properties:
  - `hydra:template` (xsd:string, RFC6570 URI template)
  - `hydra:mapping` (hydra:IriTemplateMapping)
- Optional Properties:
  - `hydra:variableRepresentation` (hydra:BasicRepresentation | hydra:ExplicitRepresentation)
  - `hydra:resolveRelativeTo` (hydra:IriTemplateResolution)

### hydra:Collection
- Type: rdfs:Class
- Properties:
  - `hydra:member` (IRI or embedded members)

### hydra:PartialCollectionView
- Type: rdfs:Class
- Properties:
  - `hydra:first`, `hydra:last`, `hydra:next`, `hydra:previous` (IRIs to views)

### hydra:Status and hydra:Error
- Type: rdfs:Class
- Properties:
  - `hydra:statusCode` (integer)
  - `hydra:title`, `hydra:description` (xsd:string)

## HTTP Discovery
- Clients MUST look for HTTP Link header `<...>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"`.
- Use GET or HEAD to retrieve ApiDocumentation.

## IriTemplate Serialization
- BasicRepresentation: expand variables to lexical form.
- ExplicitRepresentation: serialize literals with quotes and type or language tags.



## Attribution
- Source: Hydra Core Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: License if known
- Crawl Date: 2025-04-29T02:22:13.338Z
- Data Size: 443961 bytes
- Links Found: 294

## Retrieved
2025-04-29
