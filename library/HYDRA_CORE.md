# HYDRA_CORE

## Crawl Summary
Vocabulary prefix hydra maps to http://www.w3.org/ns/hydra/core#. Core classes: Link, Operation, ApiDocumentation, SupportedProperty, Collection, PartialCollectionView, IriTemplate, TemplatedLink, Status, Error. Core properties: method, expects, returns, possibleStatus, supportedOperation, supportedProperty, member, memberAssertion, template, mapping, variable, property, required, variableRepresentation. JSON-LD clients must include remote context caching. Discover API via HTTP Link header rel=hydra:apiDocumentation. IriTemplate uses RFC6570, BasicRepresentation (default) or ExplicitRepresentation. PartialCollectionView exposes pagination: first, next, previous, last. Error responses use application/problem+json with hydra error context header.

## Normalised Extract
Table of Contents

1 Vocabulary Namespace
2 Link Affordance
3 Operation Definition
4 API Documentation Structure
5 Supported Properties and Operations
6 Collection and Pagination
7 IRI Templates and Templated Links
8 Status and Error Handling
9 Discovery Mechanism


1 Vocabulary Namespace
   hydra prefix: http://www.w3.org/ns/hydra/core#
   Use in JSON-LD context: {"hydra":"http://www.w3.org/ns/hydra/core#"}

2 Link Affordance
   Define property as Link:
     "@context": {"hydra":"...#"},
     "@type":"hydra:Link",
     "hydra:source": "schema:Event",
     "hydra:property": {"@id":"http://api.example.com/vocab#comments"}
   Client interprets value with @id as IRI to dereference.

3 Operation Definition
   hydra:Operation required property meth od:
     "hydra:operation": {"@type":"hydra:Operation","hydra:method":"POST"}
   Optional expects, returns:
     "hydra:expects":"vocab:Issue","hydra:returns":"vocab:Issue"
   Document status codes:
     "hydra:possibleStatus":{"hydra:statusCode":201}

4 API Documentation Structure
   Root: hydra:ApiDocumentation
     hydra:title: xsd:string
     hydra:description: xsd:string
     hydra:entryPoint: IRI
     hydra:class: list of class IRIs
     hydra:possibleStatus: list of Status resources

5 Supported Properties and Operations
   hydra:supportedProperty on class:
     mapping: property IRI, required true/false, readable true/false, writeable true/false, supportedOperation: Operation resource
   hydra:supportedOperation lists operations on a class or a Link property.

6 Collection and Pagination
   hydra:Collection: include members via hydra:member, members as IRI or object
   hydra:PartialCollectionView: properties hydra:first, hydra:next, hydra:previous, hydra:last (all optional)
   Client follows pagination links to retrieve full set.

7 IRI Templates and Templated Links
   hydra:IriTemplate: hydra:template (RFC6570 string), hydra:mapping: one or more hydra:IriTemplateMapping
   Mapping: hydra:variable (name), hydra:property (IRI), hydra:required (true/false default false)
   hydra:variableRepresentation: BasicRepresentation or ExplicitRepresentation
   Use hydra:TemplatedLink to define search interface:
     "hydra:search":{"@type":"hydra:TemplatedLink","hydra:template":"http://api...{/q}","hydra:mapping":[{"hydra:variable":"q","hydra:property":"hydra:freetextQuery","hydra:required":true}]}

8 Status and Error Handling
   hydra:Status: hydra:statusCode xsd:integer, hydra:title, hydra:description
   hydra:Error extends Status
   Use application/problem+json with HTTP header:
     Content-Type: application/problem+json
     Link: <http://www.w3.org/ns/hydra/core#error>; rel="http://www.w3.org/ns/hydra/context"

9 Discovery Mechanism
   HTTP Link header on any response:
     Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
   Client may use GET or HEAD to fetch documentation.


## Supplementary Details
JSON-LD Context Snippet:
{
  "@context":{
    "hydra":"http://www.w3.org/ns/hydra/core#",
    "schema":"http://schema.org/"
  }
}

HTTP Server Configuration:
- Add header: Link: <{API_DOC_URL}>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Ensure CORS exposes Link header or use Access-Control-Expose-Headers: Link

Implementation Steps:
1. Install hydra-core tooling: npm install hydra-core
2. Define JSON-LD context file and host it at /contexts/hydra.jsonld
3. In API responses include context and hydra terms in payload
4. Configure server to generate hydra:ApiDocumentation resource at documented URL
5. For each domain class, populate supportedProperty and supportedOperation lists
6. For collections, embed hydra:Collection with hydra:member and optional PartialCollectionView
7. For search, attach hydra:TemplatedLink to entryPoint with hydra:search mapping
8. On errors, serialize Error resources using application/problem+json and link to hydra error context


## Reference Details
Vocabulary Terms and Definitions:
- hydra:Link (Class)
    Domain: rdf:Property
    Range: IRI

- hydra:Operation (Class)
    hydra:method (IRI->xsd:string) (required)
    hydra:expects (Operation->Class IRI) (optional)
    hydra:returns (Operation->Class IRI) (optional)
    hydra:possibleStatus (Operation->Status) (zero or more)
    hydra:statusCode on Status (xsd:integer)

- hydra:ApiDocumentation (Class)
    hydra:title xsd:string
    hydra:description xsd:string
    hydra:entryPoint IRI
    hydra:class IRI (zero or more)
    hydra:possibleStatus Status (zero or more)

- hydra:SupportedProperty (Class)
    hydra:property IRI (required)
    hydra:title xsd:string
    hydra:description xsd:string
    hydra:required xsd:boolean (default false)
    hydra:readable xsd:boolean (default true)
    hydra:writeable xsd:boolean (default true)
    hydra:supportedOperation Operation (zero or more)

- hydra:Collection (Class)
    hydra:member IRI or object ({"@id":IRI})
    hydra:memberAssertion uses hydra:subject, hydra:property, hydra:object triples

- hydra:PartialCollectionView (Class)
    hydra:first IRI
    hydra:next IRI
    hydra:previous IRI
    hydra:last IRI

- hydra:IriTemplate (Class)
    hydra:template xsd:string (RFC6570)
    hydra:mapping IriTemplateMapping (one or more)
    hydra:variableRepresentation hydra:BasicRepresentation or hydra:ExplicitRepresentation

- hydra:IriTemplateMapping (Class)
    hydra:variable xsd:string (required)
    hydra:property IRI (required)
    hydra:required xsd:boolean (default false)

- hydra:TemplatedLink (Class)
    Domain: rdf:Property
    Equivalent to IriTemplate
    Predefined: hydra:search

- hydra:Status (Class)
    hydra:statusCode xsd:integer (required)
    hydra:title xsd:string
    hydra:description xsd:string

- hydra:Error (Class)
    SubClass of hydra:Status

SDK Examples:
JavaScript (hydra-core client):
const hydraClient = require('hydra-core').Client;
const client = new hydraClient({ entrypoint: 'http://api.example.com/' });
client.getApiDocumentation().then(doc => { console.log(doc.title); });

Generic HTTP Client:
// Discover API Documentation
curl -I http://api.example.com/ \
  -H "Accept: application/ld+json"
// Expect header:
// Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"

Troubleshooting:
Command: curl -i http://api.example.com/resource/1
Expected: JSON-LD payload containing @context pointing to hydra core context
Error: Missing @context -> ensure JSON-LD serializer includes context

Command: curl -i http://api.example.com/
Error: No Link header -> configure server: res.setHeader('Link', `<${docUrl}>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"`)


## Information Dense Extract
hydra namespace= http://www.w3.org/ns/hydra/core#; prefix=hydra; JSON-LD context: {hydra:URI}. Core classes: Link(rdf:Property), Operation(method[xsd:string],expects[Class],returns[Class],possibleStatus[Status]), ApiDocumentation(title[xsd:string],description[xsd:string],entryPoint[IRI],class[IRI],possibleStatus[Status]), SupportedProperty(property[IRI],required[boolean],readable[boolean],writeable[boolean],supportedOperation[Operation]), Collection(member[IRI|object],memberAssertion[triple pattern]), PartialCollectionView(first[next|previous|last][IRI]), IriTemplate(template[RFC6570],mapping[IriTemplateMapping],variableRepresentation[{Basic,Explicit}]), IriTemplateMapping(variable[xsd:string],property[IRI],required[boolean]), TemplatedLink(rdf:Property as IriTemplate; hydra:search predefined), Status(statusCode[xsd:integer],title[xsd:string],description[xsd:string]), Error(subclass of Status). Key properties: hydra:method,hydra:expects,hydra:returns,hydra:possibleStatus,hydra:supportedOperation,hydra:supportedProperty,hydra:member,hydra:template,hydra:mapping,hydra:variableRepresentation. Discovery: HTTP Link header rel=hydra:apiDocumentation. Error responses: application/problem+json with Link to hydra error context. IriTemplate uses RFC6570; default BasicRepresentation. PartialCollectionView: optional pagination links. SupportedProperty enables read/write/required flags. IriTemplateMapping enables variable mapping to properties and required flag.

## Sanitised Extract
Table of Contents

1 Vocabulary Namespace
2 Link Affordance
3 Operation Definition
4 API Documentation Structure
5 Supported Properties and Operations
6 Collection and Pagination
7 IRI Templates and Templated Links
8 Status and Error Handling
9 Discovery Mechanism


1 Vocabulary Namespace
   hydra prefix: http://www.w3.org/ns/hydra/core#
   Use in JSON-LD context: {'hydra':'http://www.w3.org/ns/hydra/core#'}

2 Link Affordance
   Define property as Link:
     '@context': {'hydra':'...#'},
     '@type':'hydra:Link',
     'hydra:source': 'schema:Event',
     'hydra:property': {'@id':'http://api.example.com/vocab#comments'}
   Client interprets value with @id as IRI to dereference.

3 Operation Definition
   hydra:Operation required property meth od:
     'hydra:operation': {'@type':'hydra:Operation','hydra:method':'POST'}
   Optional expects, returns:
     'hydra:expects':'vocab:Issue','hydra:returns':'vocab:Issue'
   Document status codes:
     'hydra:possibleStatus':{'hydra:statusCode':201}

4 API Documentation Structure
   Root: hydra:ApiDocumentation
     hydra:title: xsd:string
     hydra:description: xsd:string
     hydra:entryPoint: IRI
     hydra:class: list of class IRIs
     hydra:possibleStatus: list of Status resources

5 Supported Properties and Operations
   hydra:supportedProperty on class:
     mapping: property IRI, required true/false, readable true/false, writeable true/false, supportedOperation: Operation resource
   hydra:supportedOperation lists operations on a class or a Link property.

6 Collection and Pagination
   hydra:Collection: include members via hydra:member, members as IRI or object
   hydra:PartialCollectionView: properties hydra:first, hydra:next, hydra:previous, hydra:last (all optional)
   Client follows pagination links to retrieve full set.

7 IRI Templates and Templated Links
   hydra:IriTemplate: hydra:template (RFC6570 string), hydra:mapping: one or more hydra:IriTemplateMapping
   Mapping: hydra:variable (name), hydra:property (IRI), hydra:required (true/false default false)
   hydra:variableRepresentation: BasicRepresentation or ExplicitRepresentation
   Use hydra:TemplatedLink to define search interface:
     'hydra:search':{'@type':'hydra:TemplatedLink','hydra:template':'http://api...{/q}','hydra:mapping':[{'hydra:variable':'q','hydra:property':'hydra:freetextQuery','hydra:required':true}]}

8 Status and Error Handling
   hydra:Status: hydra:statusCode xsd:integer, hydra:title, hydra:description
   hydra:Error extends Status
   Use application/problem+json with HTTP header:
     Content-Type: application/problem+json
     Link: <http://www.w3.org/ns/hydra/core#error>; rel='http://www.w3.org/ns/hydra/context'

9 Discovery Mechanism
   HTTP Link header on any response:
     Link: <http://api.example.com/doc/>; rel='http://www.w3.org/ns/hydra/core#apiDocumentation'
   Client may use GET or HEAD to fetch documentation.

## Original Source
Linked Data Platform & Hydra Core Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Namespace Definition

Vocabulary URI: http://www.w3.org/ns/hydra/core#
Suggested JSON-LD prefix: hydra

# Core Classes and Properties

## hydra:Link (Class)
Domain: rdf:Property
Description: Defines dereferenceable links; value must be an IRI.

## hydra:Operation (Class)
Required property: hydra:method (HTTP method name) 
Optional properties: hydra:expects (class IRI), hydra:returns (class IRI), hydra:possibleStatus (Status resource)

## hydra:ApiDocumentation (Class)
Properties: hydra:title (xsd:string), hydra:description (xsd:string), hydra:entryPoint (IRI of entry resource), hydra:class (IRI of supported class), hydra:possibleStatus (Status resource)

## hydra:SupportedProperty (Class)
Properties: hydra:property (IRI), hydra:title (xsd:string), hydra:description (xsd:string), hydra:required (xsd:boolean), hydra:readable (xsd:boolean), hydra:writeable (xsd:boolean), hydra:supportedOperation (Operation resource)

## hydra:SupportedOperation (Class)
Equivalent to hydra:Operation, used on properties.

## hydra:Collection (Class)
Property: hydra:member (IRI or object with @id), hydra:memberAssertion (triple pattern)

## hydra:PartialCollectionView (Class)
Optional properties: hydra:first, hydra:next, hydra:previous, hydra:last (all view IRIs)

## hydra:IriTemplate (Class)
Properties: hydra:template (template string), hydra:mapping (IriTemplateMapping resource), hydra:variableRepresentation (BasicRepresentation or ExplicitRepresentation), hydra:rdfSyntax (defaults RFC6570)

## hydra:IriTemplateMapping (Class)
Properties: hydra:variable (xsd:string), hydra:property (IRI), hydra:required (xsd:boolean default false)

## hydra:TemplatedLink (Class)
Applies IriTemplate semantics to a property; predefined mapping: hydra:search (IRI template for search)

## hydra:Status (Class)
Properties: hydra:statusCode (xsd:integer), hydra:title (xsd:string), hydra:description (xsd:string)

## hydra:Error (Class, subclass of Status)
No additional required properties

# HTTP Discovery

Hydra clients MUST look for HTTP Link header with rel="http://www.w3.org/ns/hydra/core#apiDocumentation" to discover ApiDocumentation.

# Conventions

Use JSON-LD context pointing hydra prefix to core URI. Cache remote context. Client MUST process all JSON-LD graphs; handle incomplete triples by consulting ApiDocumentation or dereferencing same-host IRIs.

# Conformance

Key words RFC2119 apply. All sections not marked non-normative are normative.

## Attribution
- Source: Linked Data Platform & Hydra Core Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: License
- Crawl Date: 2025-04-28T05:54:58.312Z
- Data Size: 455188 bytes
- Links Found: 298

## Retrieved
2025-04-28
