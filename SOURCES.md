# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined set of W3C Recommendations defines the RDF data model (IRIs, literals, blank nodes, triples, graphs) and the OWL 2 ontology language, including Turtle, RDF/XML, and JSON-LD serializations, concrete syntaxes, and formal semantics. It is the authoritative reference for constructing, serializing, and reasoning over OWL ontologies in both CLI and HTTP-based workflows. (Last updated: RDF Concepts 25 Feb 2014; OWL 2 Overview 27 Oct 2009; OWL 2 Semantics 11 Dec 2012; authoritative as W3C Recommendations.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL provides a declarative, graph-based language for validating RDF graphs against complex shape expressions, including path constraints, cardinalities, and custom severity levels. Its formal semantics and comprehensive conformance test suite ensure reliable data integrity checks after ontology transformations. (Last updated: 21 Oct 2017; authoritative as W3C Recommendation.)
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

# Node.js v20 Core Modules, Streams API, Fetch & URL Standards & Vitest v3
## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/events.html
## https://fetch.spec.whatwg.org/
## https://url.spec.whatwg.org/
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://vitest.dev/
A unified reference for Node.js v20 core modules (HTTP server/client, filesystem, URL/path utilities, ESM loader, global fetch, streams, performance hooks, events), the WHATWG Fetch and URL standards for consistent behavior across platforms, the standard Fetch API on the web (MDN), and Vitest v3 testing patterns. These docs inform robust CLI and HTTP server implementations, performance measurement, stream-based data processing, and comprehensive test suites. (Current as of Node.js v20.x, WHATWG specs constantly maintained; MDN and Vitest docs updated continuously; authoritative as official Node.js, WHATWG, and Vitest documentation.)
## License
MIT License (Node.js & Vitest); WHATWG License (Fetch & URL); MDN content CC0/Public Domain

# RDF/JS Data Model, rdf-ext, Comunica, SPARQL.js & rdflib.js
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
## https://github.com/Callidon/sparqljs#readme
## https://linkeddata.github.io/rdflib.js/
These community-driven specifications and libraries define standard RDF/JS interfaces for nodes, quads, and streams, with rdf-ext providing data factories, parsers, and serializers, Comunica enabling modular, federated SPARQL querying, SPARQL.js offering a SPARQL-to-AST parser/serializer, and rdflib.js delivering a high-level graph store, fetcher, and RDF parsing/serializing toolkit. Together they power scalable, interoperable, and streaming-first RDF processing in JavaScript. (Specs Jan 2022; rdf-ext & Comunica 2024; SPARQL.js 2023; rdflib.js 2024; authoritative as active OSS and community specs.)
## License
MIT License; CC0/Public Domain (rdflib.js)

# Linked Data Platform (LDP) Specification
## https://www.w3.org/TR/ldp/
The LDP Recommendation defines RESTful HTTP interactions for managing RDF resources and containers, specifying content negotiation, CRUD operations (POST, GET, PUT, PATCH, DELETE), and container semantics. LDP ensures standardized APIs for publishing and consuming linked data in OWL and JSON-LD formats. (Last updated: 30 Jun 2015; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# ShEx 2.0 Shapes Expression Language & shex.js Implementation
## https://shex.io/shex-semantics/
## https://shex.io/shex-documents/
## https://github.com/shexSpec/shex.js#readme
ShEx (Shape Expressions) provides a concise, formal language for validating RDF graphs against shape schemas, offering constraint constructs for properties, datatypes, and cardinalities. The official specification details both compact and JSON serializations and validation algorithms, while shex.js delivers a JavaScript reference implementation with parsing, compilation, and execution support for streaming and error reporting. This complements SHACL by providing an alternative, developer-friendly validation toolkit. (Last updated: ShEx Semantics 2020; shex.js v4.x 2023; authoritative as official spec and reference implementation.)
## License
CC0/Public Domain (spec); MIT License (shex.js)