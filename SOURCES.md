# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-profiles/
A comprehensive set of W3C Recommendations defining:
- The RDF 1.1 data model (IRIs, literals, blank nodes, triples, graphs) and its Turtle, RDF/XML, and JSON-LD serializations.
- The OWL 2 ontology language with formal RDF-based semantics and concrete syntaxes.
- The OWL 2 Profiles (EL, QL, RL) specification identifying tractable fragments for scalable reasoning and query optimization.
This authoritative reference underpins ontology construction, serialization, and reasoning in both CLI and HTTP workflows. (Last updated: RDF Concepts Feb 2014; OWL 2 Overview Oct 2009; OWL 2 Semantics Dec 2012; OWL 2 Profiles Jan 2012.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
Defines the JSON-LD 1.1 Core and API algorithms for framing, compaction, expansion, and normalization (URDNA2015). The jsonld.js library provides a production-ready Node.js implementation with pluggable document loaders, streaming support, and comprehensive error handling. Essential for seamless JSON-LD processing in OWL-builder pipelines. (Last updated: JSON-LD 1.1 May 2020; jsonld.js v1.8.1 Apr 2024.)
## License
W3C Document License (CC-BY 4.0); MIT License

# SPARQL 1.1 & RDF-over-HTTP Server Deployments
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://jena.apache.org/documentation/fuseki2/
## https://graphdb.ontotext.com/documentation/standard/
Aggregates SPARQL 1.1 Recommendations for querying, updating, HTTP protocol, and JSON result serializations alongside deployment guides for Apache Jena Fuseki and Ontotext GraphDB. Covers endpoint configuration, authentication, federation patterns, performance tuning, and best practices for resilient Node.js clients and public SPARQL endpoints. (Last updated: SPARQL specs Mar 2013; Fuseki 4.x; GraphDB 2023.)
## License
W3C Document License (CC-BY 4.0); Apache License 2.0; GraphDB Documentation License

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
A consolidated reference for Node.js v20 core modules (fs, path, perf_hooks, http, streams, URL/ESM loader, global fetch), the WHATWG Fetch spec, RDF/JS Data Model and Streams specifications, the rdf-ext data factories, Comunica federated query framework, SPARQL.js parser/serializer, rdflib.js graph toolkit, and Vitest v3 for testing. Essential for robust CLI/HTTP servers, streaming-first RDF workflows, SPARQL query construction, graph management, and comprehensive test suites. (Current as of Node.js v20.x; RDF/JS Jan 2022; Comunica 2024; SPARQL.js 2023; rdflib.js 2024; Vitest continuously updated.)
## License
MIT (Node.js, rdf-ext, Comunica, SPARQL.js, rdflib.js, Vitest); WHATWG License (Fetch); CC0/Public Domain (RDF/JS Streams)

# Linked Data Platform & Hydra Core Vocabulary
## https://www.w3.org/TR/ldp/
## https://www.hydra-cg.com/spec/latest/core/
Specifies RESTful HTTP interactions for managing RDF resources and containers (LDP) including content negotiation, CRUD operations, and container semantics, alongside the Hydra Core Vocabulary for hypermedia-driven APIs with affordances and controls. Critical for designing self-describing HTTP endpoints in OWL-builder. (Last updated: LDP Jun 2015; Hydra Apr 2024.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain (Hydra spec)

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Covers SHACL for declarative RDF graph validation with formal semantics and conformance tests, and ShEx for compact shape expressions with JSON and Turtle serializations. The shex.js library offers streaming validation and detailed error reporting for rigorous ontology and data graph integrity checks. (Last updated: SHACL Oct 2017; ShEx 2020; shex.js v4.x 2023.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain (ShEx spec); MIT License (shex.js)

# Apache Jena Framework & Storage Backend
## https://jena.apache.org/documentation/arq/
## https://jena.apache.org/documentation/tdb2/
## https://jena.apache.org/documentation/fuseki2/
ARQ is Jena’s SPARQL query engine offering federation, custom functions, and optimized graph pattern matching. TDB2 is a transactional RDF storage backend for large-scale datasets. Fuseki2 provides a SPARQL-over-HTTP server with authentication, CORS, and scalability tuning. Together they serve as a Java-based production reference stack for RDF stores, informing clustering, performance, and resilience strategies. (Last updated: ARQ 4.x 2023; TDB2 2023; Fuseki 4.x.)
## License
Apache License 2.0

# Eclipse RDF4J Programming Guide
## https://rdf4j.org/documentation/programmers-guide/
## https://rdf4j.org/documentation/release-notes/
The Eclipse RDF4J Programmer’s Guide details Java APIs for Model, Repository, and Sail layers, SPARQL query execution, transaction management, inferencing, and repository configuration. Includes code snippets, Spring integration, and tuning advice for high-throughput RDF processing. Authoritative for JVM-based application embedding. (Last updated: RDF4J 4.x series 2023.)
## License
Eclipse Public License 2.0