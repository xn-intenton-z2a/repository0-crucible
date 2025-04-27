# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined set of W3C Recommendations defines the core RDF data model (IRIs, literals, blank nodes, triples, graphs) and the OWL 2 ontology language, including serializations (Turtle, RDF/XML, JSON-LD), syntaxes, and formal semantics. These specifications provide essential guidelines for constructing, serializing, and reasoning over OWL ontologies in both CLI workflows and HTTP-based services. (Last updated: RDF Concepts 25 Feb 2014; OWL 2 Overview 27 Oct 2009; OWL 2 Semantics 11 Dec 2012; OWL 2 Syntax 27 Oct 2009; authoritative as W3C Recommendations.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL provides a robust language for validating RDF graphs against declarative shapes, with path expressions, node and property constraints, and detailed validation reports. Its formal semantics and conformance test suite ensure data quality and schema compliance after ontology construction. (Last updated: 21 Oct 2017; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 specifications and API define framing, compaction, expansion, context processing, and normalization (URDNA2015). The jsonld.js library offers a production-ready implementation with custom document loaders, streaming support, and error-handling patterns. These sources are critical for ingesting and emitting JSON-LD in OWL builder workflows. (Last updated: Specs May 2020; jsonld.js 2024; authoritative as official W3C specs and implementation.)
## License
W3C Document License (CC-BY 4.0); MIT License

# SPARQL 1.1 Specifications & Public Endpoints
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
This comprehensive set of SPARQL 1.1 Recommendations covers the query language, HTTP protocol, update operations, RDF graph store interactions, and JSON result formats. Public endpoint guides for DBpedia and Wikidata detail rate limits, federation strategies, and resilient client practices in Node.js. These are foundational for implementing CLI commands, federated pipelines, and update workflows. (Last updated: Specs Mar 2013; DBpedia 2024; Wikidata continuously updated; authoritative as W3C Recommendations and official guides.)
## License
W3C Document License (CC-BY 4.0); DBpedia CC BY-SA 3.0; Wikidata CC0/Public Domain

# Node.js v20 Core Modules, Fetch API & Vitest v3
## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/events.html
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://vitest.dev/
A unified reference for Node.js v20 core modules (HTTP server/client, filesystem, URL/path utilities, ESM modules, global fetch, performance hooks, events), the standard Fetch API for HTTP interactions, and Vitest v3 testing framework. These sources enable robust CLI command implementations, HTTP services, performance measurement, and comprehensive test suites. (Current as of Node v20.x; MDN and Vitest docs updated continuously; authoritative as official Node.js, MDN, and Vitest documentation.)
## License
MIT License (Node.js & Vitest); MDN content CC0/Public Domain

# RDF/JS Data Model, rdf-ext, Comunica & SPARQL.js
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
## https://github.com/Callidon/sparqljs#readme
This ecosystem specification and toolkit defines RDF/JS interfaces for nodes, quads, and streams, with implementations including rdf-ext (data factories, parsers, serializers), Comunica (modular, federated SPARQL query engine with actor pipelines), and SPARQL.js (SPARQL AST parser/serializer). Together they form a scalable, streaming-first RDF processing stack in Node.js for query construction and execution. (Specs Jan 2022; rdf-ext 2024; Comunica 2024; SPARQL.js 2023; authoritative as community-defined specs and active OSS.)
## License
RDF/JS Specs (MIT); rdf-ext (MIT); Comunica (MIT); SPARQL.js (MIT)

# Apache Jena Fuseki SPARQL Server
## https://jena.apache.org/documentation/fuseki2/
Detailed documentation for deploying and configuring the Fuseki SPARQL 1.1 server, including dataset management, authentication, CORS, HTTP updates, performance tuning, and CLI utilities (`tdb2` loader). Essential for hosting local or production SPARQL endpoints to support source refresh, testing, and custom data pipelines. (Current as of Fuseki 4.x; authoritative as Apache project documentation.)
## License
Apache License 2.0

# Linked Data Platform (LDP) Specification
## https://www.w3.org/TR/ldp/
The LDP Recommendation specifies RESTful HTTP interactions for managing RDF resources and containers, including resource creation (POST), retrieval (GET), updates (PUT, PATCH), deletion (DELETE), and membership management in containers. LDP ensures standardized content negotiation, RDF formats, and container semantics, enabling linked-data-driven HTTP APIs for OWL and JSON-LD artifacts. (Last updated: 30 June 2015; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)