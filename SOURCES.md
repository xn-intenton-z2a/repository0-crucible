# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined set of W3C Recommendations defines the core RDF data model (IRIs, literals, blank nodes, triples, graphs) and the OWL 2 ontology language, including syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics (RDF-based entailment, interpretation structures), and serialization guidelines. It is foundational for constructing, serializing, and reasoning over OWL ontologies in both CLI workflows and HTTP-based pipelines. (Last updated: RDF Concepts 25 February 2014; OWL 2 Overview 27 October 2009; OWL 2 Semantics 11 December 2012; OWL 2 Syntax 27 October 2009; authoritative as W3C Recommendations.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL provides a robust validation language for expressing and enforcing constraints on RDF graphs through shapes, property constraints, path expressions, and detailed validation reports. Its formal semantics and conformance tests ensure data quality and schema compliance after ontology construction. (Last updated: 21 October 2017; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 specs and JavaScript API define framing, compaction, expansion, context processing, normalization (URDNA2015), and conversion between JSON-LD and RDF. The jsonld.js library offers a production-ready implementation with custom document loaders, asynchronous streaming, and error-handling examples. These are critical for ingesting and emitting JSON-LD in OWL builder workflows. (Last updated: Specs & API May 2020; jsonld.js 2024; authoritative as W3C Recommendation and official implementation.)
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
This set of SPARQL 1.1 Recommendations covers the query language, protocol, update operations, graph store HTTP interactions, and JSON result formats. Public endpoint guides for DBpedia and Wikidata include rate limits, federation strategies, and best practices for resilient SPARQL clients in Node.js. These sources underpin features like `--capital-cities`, `--query`, and federated pipelines. (Last updated: Specs March 2013; DBpedia 2024; Wikidata continuously updated; authoritative as W3C Recommendations and official guides.)
## License
W3C Document License (CC-BY 4.0); DBpedia: CC BY-SA 3.0; Wikidata: CC0/Public Domain

# Node.js Core Modules, Fetch API & Vitest Testing Framework
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
A consolidated reference for Node.js v20 core modules (HTTP, file I/O, URL/path utilities, ESM modules, global fetch, performance hooks, event emitters), the standard Fetch API for HTTP interactions, and Vitest v3 – a Vite-native testing framework. These are essential for implementing CLI commands, HTTP servers, performance measurements, and comprehensive test suites. (Current as of Node.js v20.x; MDN and Vitest docs updated continuously; authoritative as official Node.js, MDN, and Vitest documentation.)
## License
MIT License (Node.js & Vitest); MDN content (CC0/Public Domain)

# RDF/JS Data Model, rdf-ext, Comunica & SPARQL.js
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
## https://github.com/Callidon/sparqljs#readme
This ecosystem specification and toolset defines RDF/JS interfaces for terms, quads, and streaming data processing, and provides mature JavaScript implementations: rdf-ext for data factories, parsers, serializers, and in-memory stores; Comunica for modular, federated SPARQL query execution with actor pipelines; and SPARQL.js for parsing and serializing SPARQL queries as ASTs. Together, they deliver a scalable, streaming-first stack for RDF processing, query construction, and federated pipelines in Node.js applications. (Specs updated January 2022; rdf-ext & Comunica docs 2024; SPARQL.js last updated 2023; authoritative as community specs and active open-source projects.)
## License
RDF/JS Specs (MIT); rdf-ext (MIT); Comunica (MIT); SPARQL.js (MIT)

# Apache Jena Fuseki SPARQL Server
## https://jena.apache.org/documentation/fuseki2/
Apache Jena Fuseki documentation covers deploying and configuring a SPARQL 1.1 server, including dataset management, authentication, CORS, HTTP updates, performance tuning, and command-line utilities (`tdb2` loader). It is crucial for hosting local or production SPARQL endpoints to support source refresh, testing, and custom data pipelines within the OWL builder system. (Current as of Fuseki 4.x; authoritative as Apache project documentation.)
## License
Apache License 2.0

# Hydra Core Vocabulary
## https://www.hydra-cg.com/spec/latest/core/
The Hydra Core Vocabulary defines a hypermedia-driven approach for RESTful APIs over linked data. It specifies resources, collections, operations, and search mechanisms to create self-descriptive, discoverable APIs for RDF and OWL resources. Using Hydra enables clients to navigate and invoke API operations dynamically based on machine-readable metadata. (Last updated: December 2019; authoritative as Hydra Core Group Recommendation.)
## License
CC0/Public Domain