# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined set of W3C Recommendations defines the RDF data model (IRIs, literals, blank nodes, triples, graphs) and the OWL 2 ontology language, including Turtle, RDF/XML, and JSON-LD serializations, concrete syntaxes, and formal semantics. It is the authoritative reference for constructing, serializing, and reasoning over OWL ontologies in both CLI and HTTP-based workflows. (Last updated: RDF Concepts 25 Feb 2014; OWL 2 Overview 27 Oct 2009; OWL 2 Semantics 11 Dec 2012; authoritative as W3C Recommendations.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 Core and API specifications define algorithms for framing, compaction, expansion, and normalization (URDNA2015). The jsonld.js library implements these features with pluggable document loaders, streaming support, and robust error handling, enabling seamless JSON-LD processing in Node.js OWL builder pipelines. (Last updated: JSON-LD 1.1 May 2020; jsonld.js v1.8.1 2024; authoritative as W3C specs and reference implementation.)
## License
W3C Document License (CC-BY 4.0); MIT License

# SPARQL 1.1 Specifications & Server Implementations
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://jena.apache.org/documentation/fuseki2/
## https://graphdb.ontotext.com/documentation/standard/
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
This source aggregates SPARQL 1.1 Recommendations for query, update, HTTP protocol, and JSON result serializations, with practical deployment guides for Apache Jena Fuseki and Ontotext GraphDB servers. It also covers best practices and rate limits for public endpoints like DBpedia and Wikidata, including authentication, federation, and performance tuning for resilient Node.js clients. (Last updated: SPARQL specs Mar 2013; Fuseki 4.x; GraphDB Standard 2023; endpoints continuously updated; authoritative as official documentation.)
## License
W3C Document License (CC-BY 4.0); Apache License 2.0; GraphDB documentation license

# JavaScript RDF Ecosystem & Node.js Core Modules
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/http.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/globals.html#fetch
## https://fetch.spec.whatwg.org/
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
## https://github.com/Callidon/sparqljs#readme
## https://linkeddata.github.io/rdflib.js/
## https://vitest.dev/
A consolidated reference for Node.js v20 core modules (fs for file operations, path resolution, performance timing, HTTP server/client, streams, URL/ESM loader, global fetch), the WHATWG Fetch spec, the RDF/JS Data Model and Streams specifications, rdf-ext data factories, Comunica federated query framework, SPARQL.js parser/serializer, rdflib.js graph toolkit, and Vitest v3 testing patterns. These docs inform robust CLI and HTTP server implementations, efficient file and performance handling, streaming-first RDF processing, modular SPARQL query construction, graph management, and comprehensive test suites. (Current as of Node.js v20.x, RDF/JS Jan 2022, Comunica 2024, SPARQL.js 2023, rdflib.js 2024, Vitest continuously updated; authoritative as official Node.js docs and active community specs/implementations.)
## License
MIT (Node.js, rdf-ext, Comunica, SPARQL.js, rdflib.js, Vitest); WHATWG License (Fetch); CC0/Public Domain (RDF/JS Streams)

# Linked Data Platform (LDP) Specification
## https://www.w3.org/TR/ldp/
The LDP Recommendation defines RESTful HTTP interactions for managing RDF resources and containers, specifying content negotiation, CRUD operations (POST, GET, PUT, PATCH, DELETE), and container semantics. LDP ensures standardized APIs for publishing and consuming linked data in OWL and JSON-LD formats. (Last updated: 30 Jun 2015; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# RDF/Schema Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
This combined source covers SHACL for declarative, graph-based RDF validation with a formal semantics and conformance suite, and ShEx for concise shape expressions including compact and JSON serializations. The shex.js library provides a JavaScript reference implementation with streaming validation and detailed error reporting. Together they enable rigorous ontology and data graph integrity checks. (Last updated: SHACL 21 Oct 2017; ShEx Semantics 2020; shex.js v4.x 2023; authoritative as W3C spec, ShEx community spec, and reference implementation.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain (ShEx spec); MIT License (shex.js)

# Apache Jena TDB2 Documentation
## https://jena.apache.org/documentation/tdb2/
The Jena TDB2 documentation provides a comprehensive guide to the high-performance native RDF triplestore within Apache Jena. It covers dataset creation, transaction APIs, bulk data loading, backup/restore strategies, and performance tuning for large-scale OWL ontologies. (Last updated: 2023; authoritative as official Apache Jena project docs.)
## License
Apache License 2.0

# SPARQL-HTTP-Client Library
## https://github.com/zazuko/sparql-http-client#readme
The SPARQL-HTTP-Client library offers a lightweight, promise-based Node.js client for interacting with SPARQL endpoints. It supports configurable GET/POST queries, Accept header negotiation, authentication, pagination, and streaming of results, enabling robust programmatic SPARQL operations with minimal boilerplate. (Last updated: 2024; authoritative as active open-source project.)
## License
MIT License