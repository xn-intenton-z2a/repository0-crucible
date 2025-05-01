# HYDRA_CORE

## Crawl Summary
Namespace hydra defined at http namespace. Core classes Link, Operation, ApiDocumentation, Class, SupportedProperty, Collection, PartialCollectionView, IriTemplate, IriTemplateMapping, Status, Error. Link indicates dereferenceable property. Operation includes HTTP method and optional expects returns status and header specs. ApiDocumentation defines entry point, supported classes. SupportedProperty allows marking required readable writable flags. Collections support paging via PartialCollectionView. IriTemplate with template literal, mappings, variableRepresentation, resolveRelativeTo. Status encapsulates HTTP status codes and descriptions; Error subclass for errors. Remote JSON-LD context available.

## Normalised Extract
Table of Contents

1 Namespace Declaration
2 Link Class
3 Operation Class
4 ApiDocumentation Class
5 Class Description
6 SupportedProperty Class
7 Collection and PartialCollectionView
8 IriTemplate Class
9 IriTemplateMapping Class
10 Status and Error

1 Namespace Declaration
Prefix hydra maps to IRI http://www.w3.org/ns/hydra/core
Suggested use of prefix hydra in JSON LD contexts

2 Link Class
hydra Link is subclass of rdf Property
Use hydra property to define dereferenceable links
Properties
 hydra property IRI of linked property
 hydra templated boolean indicating templated link use

3 Operation Class
hydra Operation extends hydra Link
Required property hydra method one of HTTP methods GET POST PUT DELETE PATCH HEAD OPTIONS
Optional properties
 hydra expects IRI of expected resource class
 hydra returns IRI of returned resource class
 hydra possibleStatus list of hydra Status instances with hydra statusCode integer
 hydra expectsHeader list of header names required in request
 hydra returnsHeader list of header names returned in response
 hydra title human readable title literal
 hydra description human readable description literal

4 ApiDocumentation Class
Define top level API documentation resource
Required property hydra entrypoint IRI of entry point resource
Optional properties
 hydra title literal
 hydra description literal
 hydra supportedClass list of hydra Class instances describing resource classes

5 Class Description
hydra Class describes resource type
Properties
 hydra title literal
 hydra description literal
 hydra supportedProperty list of hydra SupportedProperty entries
 hydra supportedOperation list of hydra Operation entries

6 SupportedProperty Class
Describes property usage on a class
Properties
 hydra property IRI of property
 hydra required boolean default false
 hydra readable boolean default true
 hydra writable boolean default true

7 Collection and PartialCollectionView
hydra Collection holds hydra member list of resources
hydra PartialCollectionView subclasses hydra Collection
 Optional paging properties hydra first hydra last hydra next hydra previous all IRIs
 hydra member same as Collection

8 IriTemplate Class
Describe runtime URL templates
Properties
 hydra template literal using RFC6570 syntax
 hydra variableRepresentation Literal default BasicRepresentation explicit or basic
 hydra mapping list of hydra IriTemplateMapping entries
 hydra resolveRelativeTo IRI to base expansion context

9 IriTemplateMapping Class
Maps template variable to property
Properties
 hydra variable literal name in template
 hydra property IRI of linked property for value extraction
 hydra required boolean default false

10 Status and Error
hydra Status encapsulates HTTP status details
Properties
 hydra statusCode integer HTTP status code
 hydra title literal short description
 hydra description literal detailed description
hydra Error subclass of hydra Status for error semantics

## Supplementary Details
Implementation Steps

1 Add context reference to JSON LD responses using @context "http://www.w3.org/ns/hydra/context.jsonld"
2 Annotate hyperlinks with hydra Link properties to mark dereferenceable links
3 Embed hydra Operation entries in resource representations under hydra operation
   a Set hydra method to desired HTTP method
   b Optionally set hydra expects and hydra returns to resource class IRIs
   c Document possible HTTP status codes using hydra possibleStatus entries with hydra statusCode values
4 Document API entry point using HTTP Link header
   Name: Link
   Relation: http://www.w3.org/ns/hydra/core#apiDocumentation
   Value: URL of ApiDocumentation resource
5 Create ApiDocumentation resource at specified URL
   a Set @type hydra ApiDocumentation
   b Set hydra entrypoint to root resource IRI
   c Populate hydra supportedClass entries for each resource class
6 Define hydra Class entries
   a Use hydra supportedProperty to list class properties with hydra property IRIs and flags required readable writable
   b Use hydra supportedOperation for operations on all instances of class
7 Use hydra Collection and PartialCollectionView for collections and paging
   a Include hydra member entries
   b Link to pages using hydra first last next previous
8 When runtime URL construction needed use hydra IriTemplate
   a Define hydra template literal using RFC6570 syntax
   b List hydra mapping entries mapping template variables to properties
   c Optionally set hydra variableRepresentation to ExplicitRepresentation for type aware serialization
9 Use hydra Status and Error to document possible status codes and error types
   a Subclass hydra Status for custom error types
   b Return application/problem+json content with appropriate hydra error context header


## Reference Details
Full JSON LD Example of ApiDocumentation and Resource Descriptions

{
  "@context":"http://www.w3.org/ns/hydra/context.jsonld",
  "@type":"hydra:ApiDocumentation",
  "@id":"http://api.example.com/doc/",
  "hydra:title":"Issue Tracker API",
  "hydra:description":"Manage issues with hypermedia",
  "hydra:entrypoint":{"@id":"http://api.example.com/vocab#entry"},
  "hydra:supportedClass":[
    {
      "@id":"http://api.example.com/vocab#Issue",
      "@type":"hydra:Class",
      "hydra:title":"Issue",
      "hydra:description":"A reported issue",
      "hydra:supportedProperty":[
        {
          "hydra:property":"schema:title",
          "hydra:required":true,
          "hydra:readable":true,
          "hydra:writable":false
        },
        {
          "hydra:property":"schema:creator",
          "hydra:required":false,
          "hydra:readable":true,
          "hydra:writable":false
        }
      ],
      "hydra:supportedOperation":[
        {
          "@type":"hydra:Operation",
          "hydra:method":"GET",
          "hydra:expects":"http://api.example.com/vocab#Issue",
          "hydra:returns":"http://api.example.com/vocab#Issue",
          "hydra:possibleStatus":[{"@type":"hydra:Status","hydra:statusCode":200}],
          "hydra:expectsHeader":["Accept"],
          "hydra:returnsHeader":["Content-Type"]
        },
        {
          "@type":"hydra:Operation",
          "hydra:method":"DELETE",
          "hydra:possibleStatus":[{"@type":"hydra:Status","hydra:statusCode":204}],
          "hydra:expectsHeader":["Authorization"],
          "hydra:returnsHeader":["Link"]
        }
      ]
    }
  ]
}

HTTP Discovery Example

Request
curl -I -H "Accept: application/ld+json" http://api.example.com/

Response Headers
Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"

Troubleshooting

Problem: No hydra apiDocumentation link header returned
Solution:
  1 Send HTTP HEAD request instead of GET
  2 Check alternative content types application/json or application/ld+json
  3 Inspect response bodies for @context entries

curl -I -H "Accept: application/ld+json" http://api.example.com/entry
Expected: Link header with rel http://www.w3.org/ns/hydra/core#apiDocumentation

## Information Dense Extract
hydra prefix http://www.w3.org/ns/hydra/core context URL http://www.w3.org/ns/hydra/context.jsonld hydra Link subclass of rdf Property marks dereferenceable property hydra templated boolean hydra Operation subclass of hydra Link method required one of GET POST PUT DELETE PATCH HEAD OPTIONS hydra expects IRI hydra returns IRI hydra possibleStatus hydra Status entries hydra expectsHeader hydra returnsHeader hydra title literal hydra description literal hydra ApiDocumentation entrypoint IRI supportedClass list hydra Class hydra Class hydra title hydra description hydra supportedProperty list hydra SupportedProperty hydra property IRI hydra required boolean hydra readable boolean hydra writable boolean hydra supportedOperation list hydra Operation hydra Collection hydra member list hydra PartialCollectionView paging first last next previous hydra IriTemplate template literal RFC6570 hydra variableRepresentation Basic or Explicit hydra mapping hydra IriTemplateMapping variable literal property IRI required boolean hydra resolveRelativeTo IRI hydra Status statusCode integer hydra title hydra description hydra Error subclass application/problem+json responses with hydra error context header

## Sanitised Extract
Table of Contents

1 Namespace Declaration
2 Link Class
3 Operation Class
4 ApiDocumentation Class
5 Class Description
6 SupportedProperty Class
7 Collection and PartialCollectionView
8 IriTemplate Class
9 IriTemplateMapping Class
10 Status and Error

1 Namespace Declaration
Prefix hydra maps to IRI http://www.w3.org/ns/hydra/core
Suggested use of prefix hydra in JSON LD contexts

2 Link Class
hydra Link is subclass of rdf Property
Use hydra property to define dereferenceable links
Properties
 hydra property IRI of linked property
 hydra templated boolean indicating templated link use

3 Operation Class
hydra Operation extends hydra Link
Required property hydra method one of HTTP methods GET POST PUT DELETE PATCH HEAD OPTIONS
Optional properties
 hydra expects IRI of expected resource class
 hydra returns IRI of returned resource class
 hydra possibleStatus list of hydra Status instances with hydra statusCode integer
 hydra expectsHeader list of header names required in request
 hydra returnsHeader list of header names returned in response
 hydra title human readable title literal
 hydra description human readable description literal

4 ApiDocumentation Class
Define top level API documentation resource
Required property hydra entrypoint IRI of entry point resource
Optional properties
 hydra title literal
 hydra description literal
 hydra supportedClass list of hydra Class instances describing resource classes

5 Class Description
hydra Class describes resource type
Properties
 hydra title literal
 hydra description literal
 hydra supportedProperty list of hydra SupportedProperty entries
 hydra supportedOperation list of hydra Operation entries

6 SupportedProperty Class
Describes property usage on a class
Properties
 hydra property IRI of property
 hydra required boolean default false
 hydra readable boolean default true
 hydra writable boolean default true

7 Collection and PartialCollectionView
hydra Collection holds hydra member list of resources
hydra PartialCollectionView subclasses hydra Collection
 Optional paging properties hydra first hydra last hydra next hydra previous all IRIs
 hydra member same as Collection

8 IriTemplate Class
Describe runtime URL templates
Properties
 hydra template literal using RFC6570 syntax
 hydra variableRepresentation Literal default BasicRepresentation explicit or basic
 hydra mapping list of hydra IriTemplateMapping entries
 hydra resolveRelativeTo IRI to base expansion context

9 IriTemplateMapping Class
Maps template variable to property
Properties
 hydra variable literal name in template
 hydra property IRI of linked property for value extraction
 hydra required boolean default false

10 Status and Error
hydra Status encapsulates HTTP status details
Properties
 hydra statusCode integer HTTP status code
 hydra title literal short description
 hydra description literal detailed description
hydra Error subclass of hydra Status for error semantics

## Original Source
Hydra Core Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespace Declaration
- Prefix: hydra
- IRI: http://www.w3.org/ns/hydra/core#

## Link Class (hydra:Link)
- Subclass of rdf:Property
- Purpose: indicate dereferenceable links
- Properties:
  - hydra:property (IRI)  
  - hydra:templated (xsd:boolean)

## Operation Class (hydra:Operation)
- Subclass of hydra:Link
- Required:
  - hydra:method (Literal, one of GET POST PUT DELETE PATCH HEAD OPTIONS)
- Optional:
  - hydra:expects (IRI of class or graph)
  - hydra:returns (IRI of class or graph)
  - hydra:possibleStatus (hydra:Status or subclass)
  - hydra:expectsHeader (Literal or list of header names)
  - hydra:returnsHeader (Literal or list of header names)
  - hydra:title (Literal)
  - hydra:description (Literal)

## ApiDocumentation Class (hydra:ApiDocumentation)
- Required:
  - hydra:entrypoint (IRI)
- Optional:
  - hydra:title (Literal)
  - hydra:description (Literal)
  - hydra:supportedClass (hydra:Class)

## Class Description (hydra:Class)
- Properties:
  - hydra:title (Literal)
  - hydra:description (Literal)
  - hydra:supportedProperty (hydra:SupportedProperty)
  - hydra:supportedOperation (hydra:Operation)

## SupportedProperty Class (hydra:SupportedProperty)
- Properties:
  - hydra:property (IRI)
  - hydra:required (xsd:boolean default false)
  - hydra:readable (xsd:boolean default true)
  - hydra:writable (xsd:boolean default true)

## Collection Classes
- hydra:Collection
  - Property: hydra:member (IRI or embedded object)
- hydra:PartialCollectionView
  - Optional properties: hydra:first hydra:last hydra:next hydra:previous (all IRI)
  - hydra:member

## IriTemplate Class (hydra:IriTemplate)
- Properties:
  - hydra:template (Literal)
  - hydra:variableRepresentation (Literal, hydra:BasicRepresentation or hydra:ExplicitRepresentation, default BasicRepresentation)
  - hydra:mapping (hydra:IriTemplateMapping)
  - hydra:resolveRelativeTo (IRI)

## IriTemplateMapping Class (hydra:IriTemplateMapping)
- Properties:
  - hydra:variable (Literal)
  - hydra:property (IRI)
  - hydra:required (xsd:boolean default false)

## Status Class (hydra:Status)
- Properties:
  - hydra:statusCode (xsd:integer)
  - hydra:title (Literal)
  - hydra:description (Literal)
- Subclass: hydra:Error
  - Additional semantics: error indicator

## Context Location
- Remote context URL: http://www.w3.org/ns/hydra/context.jsonld


## Attribution
- Source: Hydra Core Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: CC-BY 4.0
- Crawl Date: 2025-05-01T12:57:56.575Z
- Data Size: 603634 bytes
- Links Found: 391

## Retrieved
2025-05-01
