# LINKED_DATA_BP

## Crawl Summary
HTTP URIs for identifying resources; content negotiation mappings for HTML, Turtle, JSON-LD; URI stability rules; HTTP redirection codes for persistence; embedding license metadata via dcterms:license; reuse of DCAT, org, qb vocabularies with key classes and properties; mapping relational data to RDF via R2RML TriplesMaps; serialization formats; machine access methods including SPARQL GET parameters and Accept headers; DCAT-based dataset metadata; announcement channels; persistence policy documentation.

## Normalised Extract
Table of Contents
1. URI Design Principles
2. License Metadata Embedding
3. Vocabulary Reuse
4. RDF Conversion via R2RML
5. Machine-Access Interfaces
6. Dataset Catalog Description
7. Persistence Policy

1. URI Design Principles
Use HTTP scheme only
Accept header routing:
 Accept:text/html→text/html; charset=UTF-8
 Accept:text/turtle→text/turtle; charset=UTF-8
 Accept:application/ld+json→application/ld+json
Avoid query parameters conveying state
Define persistent URI policy with 301 and 303 redirections
PURL or HTTPS-only service for secure environments

2. License Metadata Embedding
Assign dcterms:license triple per dataset
Value = license dereferenceable URI (e.g. https://creativecommons.org/licenses/by/4.0/)
Include within RDF output header

3. Vocabulary Reuse
DCAT core:
 dcat:Dataset
 dcat:distribution→dcat:Distribution
 dcat:accessURL→IRI
Organization ontology:
 org:Organization
 org:hasUnit
Data Cube:
 qb:DataSet
 qb:Observation
 qb:measureType

4. RDF Conversion via R2RML
Define rr:TriplesMap
 rr:logicalTable tableName
 rr:subjectMap template
 rr:predicateObjectMap predicate and column mapping
Serialize to Turtle or JSON-LD

5. Machine-Access Interfaces
SPARQL endpoint:
 GET /sparql?query=<sparql>&default-graph-uri=<IRI>
 Header Accept:application/sparql-results+json
REST JSON-LD:
 GET /api/{resource} returns application/ld+json
Raw download:
 GET /data/{dataset}.ttl returns text/turtle

6. Dataset Catalog Description
Publish dcat:Dataset graph with:
 dcterms:title; dcterms:description
 dcterms:issued; dcterms:modified
 dcat:distribution {dcat:accessURL,dcat:mediaType}

7. Persistence Policy
Host /uri-policy.txt plain text
List 301 and 303 rules
Define retention period and change procedure

## Supplementary Details
1. HTTP Server Configuration
Apache example for content negotiation:
  <Directory "/var/www/html">
    Options MultiViews
    AddType application/ld+json .jsonld
    AddType text/turtle .ttl
  </Directory>

2. SPARQL Endpoint Setup
Fuseki example:
  fuseki-server --update --mem /dataset
  SPARQL endpoint at http://localhost:3030/dataset/sparql
  Accept header handles JSON, XML, CSV

3. R2RML Processor Invocation
  rrloader --triples-map mapping.ttl --output graph.ttl

4. DCAT Publishing
  curl -X PUT -H "Content-Type: text/turtle" \
    --data @dcat.ttl http://example.gov/catalog

5. Announcing Catalog
  echo "New dataset published at http://example.gov/catalog" | mail -s "New LOD" data-list@example.gov


## Reference Details
A. SPARQL HTTP Protocol
Method: GET
URL: /sparql
Query parameters:
 query (required): SPARQL query string
 default-graph-uri (optional, repeatable): IRI
 named-graph-uri (optional, repeatable): IRI
 output: determined by Accept header

Headers:
 Accept: application/sparql-results+json | application/ld+json | text/csv

Response: 200 OK
 Content-Type: as negotiated
 Body: SPARQL Results XML/JSON or RDF graph serialization

B. R2RML TriplesMap Syntax (Turtle)
Prefix rr: <http://www.w3.org/ns/r2rml#>
:TriplesMap1
 rr:logicalTable [ rr:tableName "facilities" ];
 rr:subjectMap [
   rr:template "http://example.gov/facility/{id}";
   rr:class <http://example.gov/schema#Facility>
 ];
 rr:predicateObjectMap [
   rr:predicate <http://www.w3.org/2003/01/geo/wgs84_pos#lat>;
   rr:objectMap [ rr:column "latitude" ]
 ];

C. JSON-LD API Endpoint
GET /api/facility/{id}
Headers:
 Accept: application/ld+json

Response:
 HTTP/1.1 200 OK
 Content-Type: application/ld+json; charset=UTF-8
 Body:
 {
   "@context": [ ... ],
   "@id": "http://example.gov/facility/123",
   "@type": "Facility",
   "latitude": 41.40338,
   "longitude": 2.17403
 }

D. Troubleshooting
Issue: 406 Not Acceptable
 Command: curl -H "Accept: application/ld+json" http://example.gov/resource
 Expected: application/ld+json body
 Fix: enable AddType for .jsonld and MultiViews in server config

Issue: SPARQL endpoint 404
 Check: correct path /sparql, verify server running
 Command: curl -I http://localhost:3030/dataset/sparql
 Expected: HTTP/1.1 200 OK

## Information Dense Extract
HTTP URIs only; content negotiation: text/html, text/turtle, application/ld+json via Accept header; URIs omit dynamic tokens; persistent policy with 301/303 redirection or PURL service; embed dcterms:license per dataset; reuse DCAT (dcat:Dataset, dcat:distribution, dcat:accessURL), org (org:Organization, org:hasUnit), qb (qb:DataSet, qb:Observation, qb:measureType); map relational tables via R2RML TriplesMap (rr:logicalTable tableName, rr:subjectMap template+class, rr:predicateObjectMap column); serialize to Turtle/JSON-LD; SPARQL GET /sparql?query=&default-graph-uri= with Accept negotiation; JSON-LD REST API GET /api/{resource}; raw download GET /data/{dataset}.ttl; publish catalog using DCAT triples with dcterms:title,description,issued,modified, dcat:distribution(accessURL,mediaType); announce via email/blog; host /uri-policy.txt listing 301/303 rules and retention; Apache MultiViews & AddType config; Fuseki --update --mem /dataset; rrloader invocation; curl PUT for DCAT; curl troubleshooting for 406 and 404

## Sanitised Extract
Table of Contents
1. URI Design Principles
2. License Metadata Embedding
3. Vocabulary Reuse
4. RDF Conversion via R2RML
5. Machine-Access Interfaces
6. Dataset Catalog Description
7. Persistence Policy

1. URI Design Principles
Use HTTP scheme only
Accept header routing:
 Accept:text/htmltext/html; charset=UTF-8
 Accept:text/turtletext/turtle; charset=UTF-8
 Accept:application/ld+jsonapplication/ld+json
Avoid query parameters conveying state
Define persistent URI policy with 301 and 303 redirections
PURL or HTTPS-only service for secure environments

2. License Metadata Embedding
Assign dcterms:license triple per dataset
Value = license dereferenceable URI (e.g. https://creativecommons.org/licenses/by/4.0/)
Include within RDF output header

3. Vocabulary Reuse
DCAT core:
 dcat:Dataset
 dcat:distributiondcat:Distribution
 dcat:accessURLIRI
Organization ontology:
 org:Organization
 org:hasUnit
Data Cube:
 qb:DataSet
 qb:Observation
 qb:measureType

4. RDF Conversion via R2RML
Define rr:TriplesMap
 rr:logicalTable tableName
 rr:subjectMap template
 rr:predicateObjectMap predicate and column mapping
Serialize to Turtle or JSON-LD

5. Machine-Access Interfaces
SPARQL endpoint:
 GET /sparql?query=<sparql>&default-graph-uri=<IRI>
 Header Accept:application/sparql-results+json
REST JSON-LD:
 GET /api/{resource} returns application/ld+json
Raw download:
 GET /data/{dataset}.ttl returns text/turtle

6. Dataset Catalog Description
Publish dcat:Dataset graph with:
 dcterms:title; dcterms:description
 dcterms:issued; dcterms:modified
 dcat:distribution {dcat:accessURL,dcat:mediaType}

7. Persistence Policy
Host /uri-policy.txt plain text
List 301 and 303 rules
Define retention period and change procedure

## Original Source
Linked Data Best Practices
https://www.w3.org/TR/ld-bp/

## Digest of LINKED_DATA_BP

# Best Practices for Publishing Linked Data

retrieved: 2024-06-11
source data size: 12870794 bytes

## 1 URI Design Principles

- Use HTTP URIs as global identifiers.
- Support content negotiation for at least one machine-readable form:
  - Accept: text/html → HTML representation
  - Accept: text/turtle → Turtle serialization
  - Accept: application/ld+json → JSON-LD serialization
- URIs must omit session tokens, timestamps or stateful parameters; remain stable indefinitely.
- Implement a persistence strategy:
  - Use 301 Moved Permanently when resource URIs change.
  - Use 303 See Other for non-information resources.
  - Leverage PURL or HTTPS-only redirection services for high-security domains.

## 2 License Specification

- Embed license metadata with each dataset:
  - dcterms:license → <license URI>
  - Example: dcterms:license “https://creativecommons.org/licenses/by/4.0/”

## 3 Standard Vocabularies

- Reuse existing vocabularies; extend only when necessary.
- Key vocabularies and their core classes/properties:
  - DCAT:
    - dcat:Dataset
    - dcat:distribution (link to dcat:Distribution)
    - dcat:accessURL (IRI to service endpoint)
  - DCAT-AP profiles for government data catalogs.
  - Organization Ontology:
    - org:Organization
    - org:hasUnit
  - Data Cube Vocabulary:
    - qb:DataSet
    - qb:Observation
    - qb:measureType

## 4 Data Conversion

- Map source records to RDF triples via scripts or mapping languages:
  - R2RML mappings: define rr:TriplesMap with rr:subjectMap, rr:predicateObjectMap.
  - Example Turtle snippet:
    @prefix rr: <http://www.w3.org/ns/r2rml#> .
    :TriplesMap1
      rr:logicalTable [ rr:tableName “facilities” ];
      rr:subjectMap [ rr:template “http://example.gov/facility/{id}”; rr:class ex:Facility];
      rr:predicateObjectMap [ rr:predicate ex:latitude; rr:objectMap [ rr:column “lat” ] ] .
- Serialize converted graph to preferred formats: Turtle, JSON-LD, RDF/XML.

## 5 Machine-Access Methods

- Direct URI resolution (“follow your nose”).
- SPARQL HTTP Protocol endpoint:
  - HTTP GET /sparql?query=<sparql>&default-graph-uri=<graph>
  - Required headers: Accept: application/sparql-results+json or application/ld+json
- RESTful JSON-LD API endpoints:
  - GET /api/facility/{id} → returns application/ld+json
- Raw dataset download:
  - GET /data/dataset.ttl
  - Content-Type: text/turtle; charset=UTF-8

## 6 Dataset Announcement & Metadata

- Publish catalog description with DCAT:
  - dcat:Dataset
  - dcterms:title; dcterms:description
  - dcterms:issued; dcterms:modified
  - dcat:distribution with dcat:accessURL and dcat:mediaType
- Announce via:
  - Mailing lists, blogs, Linked Data portals
  - Register SPARQL endpoint in federation indices

## 7 Persistence and Social Contract

- Define URI policy document at /uri-policy.txt:
  - Outline redirection rules, retention commitments
- Provide human- and machine-readable stability statement:
  - e.g., HTTP GET /v1/{resource} → 301 to /v2/{resource}


## Attribution
- Source: Linked Data Best Practices
- URL: https://www.w3.org/TR/ld-bp/
- License: License if known
- Crawl Date: 2025-04-29T05:49:55.665Z
- Data Size: 12870794 bytes
- Links Found: 50794

## Retrieved
2025-04-29
