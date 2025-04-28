# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined set of W3C Recommendations defines the RDF data model (IRIs, literals, blank nodes, triples, graphs) and the OWL 2 ontology language, detailing Turtle, RDF/XML, and JSON-LD serializations, concrete syntaxes, and formal semantics. It is the authoritative reference for constructing, serializing, and reasoning over OWL ontologies in both CLI and HTTP-based workflows. (Last updated: RDF Concepts 25 Feb 2014; OWL 2 Overview 27 Oct 2009; OWL 2 Semantics 11 Dec 2012.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
Defines the JSON-LD 1.1 Core and API algorithms for framing, compaction, expansion, and normalization (URDNA2015). The jsonld.js library provides a production-ready Node.js implementation with pluggable document loaders, streaming support, and comprehensive error handling, enabling seamless JSON-LD processing in OWL-builder pipelines. (Last updated: JSON-LD 1.1 May 2020; jsonld.js v1.8.1 Apr 2024.)
## License
W3C Document License (CC-BY 4.0); MIT License

# SPARQL 1.1 Specifications & Server Deployments
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://jena.apache.org/documentation/fuseki2/
## https://graphdb.ontotext.com/documentation/standard/
Aggregates SPARQL 1.1 Recommendations for querying, updating, HTTP protocol, and JSON result serializations, alongside deployment and tuning guides for Apache Jena Fuseki and Ontotext GraphDB. It covers performance optimization, authentication, federation, and best practices for resilient Node.js clients and public endpoints like DBpedia and Wikidata. (Last updated: SPARQL specs Mar 2013; Fuseki 4.x; GraphDB Standard 2023.)
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
A consolidated reference for Node.js v20 core modules (fs, path, perf_hooks, http, streams, URL/ESM loader, global fetch), the WHATWG Fetch spec, the RDF/JS Data Model and Streams specifications, rdf-ext data factories, the Comunica federated query framework, SPARQL.js parser/serializer, rdflib.js graph toolkit, and Vitest v3 testing patterns. These docs underpin robust CLI and HTTP server implementations, efficient file and performance handling, streaming-first RDF processing, modular SPARQL query construction, graph management, and comprehensive test suites. (Current as of Node.js v20.x; RDF/JS Jan 2022; Comunica 2024; SPARQL.js 2023; rdflib.js 2024; Vitest continuously updated.)
## License
MIT (Node.js, rdf-ext, Comunica, SPARQL.js, rdflib.js, Vitest); WHATWG License (Fetch); CC0/Public Domain (RDF/JS Streams)

# Linked Data Platform & Hydra Core Vocabulary
## https://www.w3.org/TR/ldp/
## https://www.hydra-cg.com/spec/latest/core/
Specifies RESTful HTTP interactions for managing RDF resources and containers (LDP), including content negotiation, CRUD operations, and container semantics, alongside the Hydra Core Vocabulary for hypermedia-driven APIs with link relations, affordances, and hypermedia controls. Essential for designing coherent, self-describing HTTP endpoints in OWL-builder. (Last updated: LDP 30 Jun 2015; Hydra Core Apr 2024.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain (Hydra spec)

# RDF/Schema Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Covers SHACL for declarative RDF graph validation with formal semantics and conformance tests, and ShEx for concise shape expressions in compact and JSON serializations. The shex.js library offers a JavaScript reference implementation with streaming validation and detailed error reporting, enabling rigorous ontology and data graph integrity checks. (Last updated: SHACL 21 Oct 2017; ShEx Semantics 2020; shex.js v4.x 2023.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain (ShEx spec); MIT License (shex.js)

# JSON Schema Specification & Zod Validation Library
## https://json-schema.org/specification.html
## https://github.com/colinhacks/zod#readme
JSON Schema provides a declarative vocabulary to define and validate JSON structures, including JSON-LD contexts and RDF shapes. The Zod library offers runtime, TypeScript-first schema validation with composable and type-safe builders, enabling concise validators for configuration files, HTTP payloads, and transformed ontology artifacts. (Last updated: JSON Schema 2020-12 Dec 2020; Zod v3.24.3 Apr 2024.)
## License
CC0/Public Domain (JSON Schema); MIT License (Zod)

# Apache Jena ARQ & TDB2 Documentation
## https://jena.apache.org/documentation/arq/
## https://jena.apache.org/documentation/tdb2/
## https://jena.apache.org/documentation/fuseki2/
ARQ is Jena’s SPARQL query engine offering advanced features like service federation, custom functions, and high-performance graph pattern matching. TDB2 is Jena’s transactional RDF storage backend optimized for large-scale datasets, and Fuseki2 provides a robust SPARQL-over-HTTP server with authentication, CORS, and scalability tuning. Together, they serve as a reference Java-based stack for deploying production RDF stores and SPARQL endpoints, informing performance tuning, clustering, and resilience strategies. (Last updated: ARQ 4.x 2023; TDB2 2023; Fuseki 4.x.)
## License
Apache License 2.0