# HYDRA_CORE

## Crawl Summary
Namespace: hydra = http://www.w3.org/ns/hydra/core#; key classes: Link, Operation, ApiDocumentation, Class, SupportedProperty, Collection, PartialCollectionView, IriTemplate, TemplatedLink, Status, Error; key properties with domains/ranges and multiplicities; discovery via HTTP Link header rel=hydra:apiDocumentation; use JSON-LD @context to map hydra terms; embed hydra:operation affordances in representations; pagination and templated links via IriTemplate; error handling via Status and application/problem+json

## Normalised Extract
Table of Contents
1 Namespace Definition
2 API Discovery Header
3 hydra:Link
4 hydra:Operation
5 hydra:ApiDocumentation
6 Class and SupportedProperty
7 Collections
8 IriTemplate and TemplatedLink
9 Status and Error

1 Namespace Definition
Prefix: hydra
IRI: http://www.w3.org/ns/hydra/core#

2 API Discovery Header
HTTP Header: Link: <{apiDocumentationIRI}>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
Methods: GET, HEAD

3 hydra:Link
Type: rdf:Class
Usage: annotate properties representing dereferenceable IRIs
No mandatory properties

4 hydra:Operation
Type: rdf:Class
Properties:
hydra:method (1..1, xsd:string)
hydra:expects (0..1, IRI of class)
hydra:returns (0..1, IRI of class)
hydra:possibleStatus (0..*, hydra:Status)
hydra:expectsHeader (0..*, xsd:string)
hydra:returnsHeader (0..*, xsd:string)

5 hydra:ApiDocumentation
Type: rdf:Class
Properties:
hydra:title (1..1, xsd:string)
hydra:description (0..1, xsd:string)
hydra:entrypoint (1..1, IRI)
hydra:supportedClass (0..*, hydra:Class)
hydra:supportedOperation (0..*, hydra:Operation)

6 Class and SupportedProperty
hydra:Class properties:
hydra:supportedOperation (0..*, hydra:Operation)
hydra:supportedProperty (0..*, hydra:SupportedProperty)

hydra:SupportedProperty properties:
hydra:property (1..1, IRI)
hydra:required (0..1, xsd:boolean)
hydra:readable (0..1, xsd:boolean)
hydra:writable (0..1, xsd:boolean)

7 Collections
hydra:Collection:
hydra:member (0..*, IRI or embedded resource)
hydra:totalItems (0..1, xsd:integer)

hydra:PartialCollectionView:
hydra:first (0..1, IRI)
hydra:next (0..1, IRI)
hydra:previous (0..1, IRI)
hydra:last (0..1, IRI)

8 IriTemplate and TemplatedLink
hydra:IriTemplate properties:
hydra:template (1..1, xsd:string, RFC6570)
hydra:mapping (1..*, hydra:IriTemplateMapping)
hydra:variableRepresentation (0..1, BasicRepresentation|ExplicitRepresentation)

hydra:IriTemplateMapping:
hydra:variable (1..1, xsd:string)
hydra:property (1..1, IRI)
hydra:required (0..1, xsd:boolean)

templated links: use hydra:TemplatedLink

9 Status and Error
hydra:Status:
hydra:statusCode (1..1, xsd:integer)
hydra:description (0..1, xsd:string)

hydra:Error: subclass of hydra:Status


## Supplementary Details
1 Configure JSON-LD Context
- Include in API responses:
  @context: {"hydra":"http://www.w3.org/ns/hydra/core#","vocab":"http://api.example.com/vocab#"}
2 Emit HTTP Discovery Header
- In server: add response header:
  Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
3 Define ApiDocumentation Resource
- At /doc:
  {
    "@id": "http://api.example.com/doc/",
    "@type": "hydra:ApiDocumentation",
    "hydra:title": "Issue Tracker API",
    "hydra:entrypoint": "http://api.example.com/",
    "hydra:supportedClass": [ ... ]
  }
4 Represent Operations in Payloads
- Embed in resources:
  "hydra:operation": [{"hydra:method":"POST","hydra:expects":"vocab:Issue","hydra:returns":"vocab:Issue"}]
5 Pagination Pattern
- Use hydra:PartialCollectionView for pages
- Provide hydra:first, hydra:next links
6 Templated Search
- Define IriTemplate at documentation:
  template: "http://api.example.com/issues{?search}", mapping variable search to hydra:freetextQuery required:true
7 CORS and Headers
- Document hydra:expectsHeader: ["Content-Type","Authorization"]
- Document hydra:returnsHeader: ["Location","Content-Type"]


## Reference Details
### Hydra Vocabulary OWL Definitions (Turtle)
@prefix hydra: <http://www.w3.org/ns/hydra/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

hydra:Operation a rdfs:Class .
hydra:method a rdf:Property ; rdfs:domain hydra:Operation ; rdfs:range xsd:string ; hydra:required true .
hydra:expects a rdf:Property ; rdfs:domain hydra:Operation ; rdfs:range rdfs:Class .
hydra:returns a rdf:Property ; rdfs:domain hydra:Operation ; rdfs:range rdfs:Class .
hydra:possibleStatus a rdf:Property ; rdfs:domain hydra:Operation ; rdfs:range hydra:Status .
hydra:expectsHeader a rdf:Property ; rdfs:domain hydra:Operation ; rdfs:range xsd:string .
hydra:returnsHeader a rdf:Property ; rdfs:domain hydra:Operation ; rdfs:range xsd:string .

hydra:ApiDocumentation a rdfs:Class .
hydra:title a rdf:Property ; rdfs:domain hydra:ApiDocumentation ; rdfs:range xsd:string ; hydra:required true .
hydra:description a rdf:Property ; rdfs:domain hydra:ApiDocumentation ; rdfs:range xsd:string .
hydra:entrypoint a rdf:Property ; rdfs:domain hydra:ApiDocumentation ; rdfs:range rdfs:Resource ; hydra:required true .

### JSON Example: Creating an Issue (Node.js)
const client = new HydraClient({ entrypoint: 'http://api.example.com/' });
const issue = await client.create('issues', {title:'Bug','description':'Details'});
console.log(issue['@id']);

### Java Example (hydra-java)
@ApiResource(path="/issues")
public class Issue {
  @ApiProperty
  private String title;
}

### Troubleshooting
1 Missing operations in payload:
  - Verify @context mapping contains hydra prefix
  - Check server emits hydra:operation in JSON-LD
2 API Documentation not discovered:
  curl -I http://api.example.com/ | grep Link
  Expected: Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
3 IriTemplate expansion errors:
  - Ensure template syntax RFC6570
  - Verify mapping variables match property names


## Information Dense Extract
hydra namespace: http://www.w3.org/ns/hydra/core#; Link header rel=hydra:apiDocumentation for discovery; hydra:Link for dereferenceable IRIs; hydra:Operation(method string[1], expects IRI, returns IRI, possibleStatus Status[0..*], expectsHeader string*, returnsHeader string*); hydra:ApiDocumentation(title string[1], description string, entrypoint IRI[1], supportedClass Class*, supportedOperation Operation*); hydra:SupportedProperty(property IRI[1], required boolean, readable boolean, writable boolean); hydra:Collection(member IRI|resource*, totalItems integer); hydra:PartialCollectionView(first|last|next|previous IRI); hydra:IriTemplate(template string RFC6570[1], mapping IriTemplateMapping*, variableRepresentation Basic|Explicit); IriTemplateMapping(variable string[1], property IRI[1], required boolean); hydra:Status(statusCode integer[1], description string); hydra:Error subclass Status; JSON-LD @context mapping hydra; embed operations under hydra:operation; use PartialCollectionView for paging; define search via IriTemplate; document headers via hydra:expectsHeader and hydra:returnsHeader; troubleshooting: validate @context, Link header, template syntax.

## Sanitised Extract
Table of Contents
1 Namespace Definition
2 API Discovery Header
3 hydra:Link
4 hydra:Operation
5 hydra:ApiDocumentation
6 Class and SupportedProperty
7 Collections
8 IriTemplate and TemplatedLink
9 Status and Error

1 Namespace Definition
Prefix: hydra
IRI: http://www.w3.org/ns/hydra/core#

2 API Discovery Header
HTTP Header: Link: <{apiDocumentationIRI}>; rel='http://www.w3.org/ns/hydra/core#apiDocumentation'
Methods: GET, HEAD

3 hydra:Link
Type: rdf:Class
Usage: annotate properties representing dereferenceable IRIs
No mandatory properties

4 hydra:Operation
Type: rdf:Class
Properties:
hydra:method (1..1, xsd:string)
hydra:expects (0..1, IRI of class)
hydra:returns (0..1, IRI of class)
hydra:possibleStatus (0..*, hydra:Status)
hydra:expectsHeader (0..*, xsd:string)
hydra:returnsHeader (0..*, xsd:string)

5 hydra:ApiDocumentation
Type: rdf:Class
Properties:
hydra:title (1..1, xsd:string)
hydra:description (0..1, xsd:string)
hydra:entrypoint (1..1, IRI)
hydra:supportedClass (0..*, hydra:Class)
hydra:supportedOperation (0..*, hydra:Operation)

6 Class and SupportedProperty
hydra:Class properties:
hydra:supportedOperation (0..*, hydra:Operation)
hydra:supportedProperty (0..*, hydra:SupportedProperty)

hydra:SupportedProperty properties:
hydra:property (1..1, IRI)
hydra:required (0..1, xsd:boolean)
hydra:readable (0..1, xsd:boolean)
hydra:writable (0..1, xsd:boolean)

7 Collections
hydra:Collection:
hydra:member (0..*, IRI or embedded resource)
hydra:totalItems (0..1, xsd:integer)

hydra:PartialCollectionView:
hydra:first (0..1, IRI)
hydra:next (0..1, IRI)
hydra:previous (0..1, IRI)
hydra:last (0..1, IRI)

8 IriTemplate and TemplatedLink
hydra:IriTemplate properties:
hydra:template (1..1, xsd:string, RFC6570)
hydra:mapping (1..*, hydra:IriTemplateMapping)
hydra:variableRepresentation (0..1, BasicRepresentation|ExplicitRepresentation)

hydra:IriTemplateMapping:
hydra:variable (1..1, xsd:string)
hydra:property (1..1, IRI)
hydra:required (0..1, xsd:boolean)

templated links: use hydra:TemplatedLink

9 Status and Error
hydra:Status:
hydra:statusCode (1..1, xsd:integer)
hydra:description (0..1, xsd:string)

hydra:Error: subclass of hydra:Status

## Original Source
Linked Data Platform & Hydra
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespaces
- Prefix: hydra
- IRI: http://www.w3.org/ns/hydra/core#

## Discovery
- HTTP Link Header: Link: <{apiDocumentationIRI}>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Default method: GET or HEAD on publisher homepage

## Classes and Key Properties

### hydra:Link (rdf:Class)
Properties:
- None mandatory. Used to annotate properties whose values are dereferenceable IRIs.

### hydra:Operation (rdf:Class)
Properties:
- hydra:method (required, range xsd:string): HTTP method name (GET, POST, PUT, DELETE)
- hydra:expects (optional, range IRI of schema/class): request payload type
- hydra:returns (optional, range IRI of schema/class): response payload type
- hydra:possibleStatus (optional, range hydra:Status): expected HTTP status codes
- hydra:expectsHeader (optional, range xsd:string): list of header names expected
- hydra:returnsHeader (optional, range xsd:string): list of header names returned

### hydra:ApiDocumentation (rdf:Class)
Properties:
- hydra:title (required, range xsd:string)
- hydra:description (optional, range xsd:string)
- hydra:entrypoint (required, range IRI): main API entrypoint resource
- hydra:supportedClass (optional, range hydra:Class)
- hydra:supportedOperation (optional, range hydra:Operation)

### hydra:Class (rdf:Class)
Properties:
- hydra:supportedOperation (range hydra:Operation)
- hydra:supportedProperty (range hydra:SupportedProperty)

### hydra:SupportedProperty (rdf:Class)
Properties:
- hydra:property (required, range IRI)
- hydra:required (optional, range xsd:boolean)
- hydra:readable (optional, range xsd:boolean)
- hydra:writable (optional, range xsd:boolean)
- hydra:description (optional, range xsd:string)
- hydra:title (optional, range xsd:string)

### hydra:Collection (rdf:Class)
Properties:
- hydra:member (repeatable, range IRI or embedded resource)
- hydra:totalItems (optional, range xsd:integer)

### hydra:PartialCollectionView (rdf:Class)
Properties:
- hydra:first (optional, range IRI)
- hydra:last (optional, range IRI)
- hydra:next (optional, range IRI)
- hydra:previous (optional, range IRI)

### hydra:memberAssertion (rdf:Class)
Properties:
- hydra:subject (required, range IRI)
- hydra:property (required, range IRI)
- hydra:object (required, range IRI)

### hydra:IriTemplate (rdf:Class)
Properties:
- hydra:template (required, range xsd:string, RFC6570)
- hydra:mapping (repeatable, range hydra:IriTemplateMapping)
- hydra:variableRepresentation (optional, range xsd:string: BasicRepresentation or ExplicitRepresentation)

### hydra:IriTemplateMapping (rdf:Class)
Properties:
- hydra:variable (required, range xsd:string)
- hydra:property (required, range IRI)
- hydra:required (optional, range xsd:boolean)

### hydra:TemplatedLink (rdf:Class)
Subclass of hydra:Link, used for properties whose values are IRI templates

### hydra:Status (rdf:Class)
Properties:
- hydra:statusCode (required, range xsd:integer)
- hydra:description (optional, range xsd:string)

### hydra:Error (rdf:Class)
Subclass of hydra:Status

## Serialization and Context
- Use JSON-LD with @context mapping hydra terms to full IRIs
- Inline remote contexts or reference via remote @context URL for caching

## Pagination Controls
- Client-initiated via hydra:offset, hydra:limit, hydra:pageIndex, hydra:pageReference


## Attribution
- Source: Linked Data Platform & Hydra
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: License
- Crawl Date: 2025-04-28T11:08:57.983Z
- Data Size: 443961 bytes
- Links Found: 294

## Retrieved
2025-04-28
