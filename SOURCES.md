# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined set of W3C Recommendations defines the core RDF data model (IRIs, literals, blank nodes, triples, graphs) and the OWL 2 ontology language, including abstract syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics (RDF-based entailment, interpretation structures), syntax for classes, properties, axioms, data ranges, and annotation patterns, plus conformance criteria and serialization guidelines. It provides the foundational specifications necessary to correctly construct, serialize, and reason over OWL ontologies in both CLI workflows and HTTP-based pipelines. (Last updated: RDF Concepts 25 February 2014; OWL 2 Overview 27 October 2009; OWL 2 Semantics 11 December 2012; OWL 2 Abstract Syntax 27 October 2009; authoritative as W3C Recommendations.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL defines a vocabulary and validation algorithms for expressing constraints on RDF graphs, including node and property shapes, path constraints, and detailed validation reports. Its formal semantics and conformance tests are essential for implementing robust data validation pipelines after ontology construction and ensuring artifacts adhere to schema and business rules. (Last updated: 21 October 2017; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & JavaScript Implementation (jsonld.js)
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 specs and associated JavaScript API define framing, compaction, expansion, context processing, normalization (URDNA2015), and conversion between JSON-LD and RDF. The jsonld.js library provides a complete implementation with support for custom document loaders, asynchronous streaming, and error handling, including examples for context management and conversion to N-Quads. These sources are essential for ingesting and emitting JSON-LD in OWL builder workflows. (Last updated: Specs & API May 2020; jsonld.js 2024; authoritative as W3C Recommendation and official implementation.)
## License
W3C Document License (CC-BY 4.0); MIT License for jsonld.js

# SPARQL 1.1 Specifications & Public Endpoints
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
This collection of SPARQL 1.1 Recommendations details the query language, protocol, update operations, graph store HTTP interactions, and JSON results formats. Public endpoint guides for DBpedia and Wikidata provide examples on rate limits, federation strategies, HTTP conventions, and best practices for resilient SPARQL clients in Node.js. These sources support implementing features like `--capital-cities`, `--query`, and federated pipelines. (Last updated: Specs March 2013; DBpedia 2024; Wikidata continuously updated; authoritative as W3C Recommendations and official endpoint guides.)
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
A consolidated reference covering Node.js v20 core modules (HTTP server/client, file I/O, URL/path utilities, ESM modules, global fetch, performance hooks, event emitters), the standardized Fetch API for HTTP interactions, and Vitest v3 – a Vite-native testing framework. These sources provide actionable guidance for implementing CLI commands, HTTP endpoints, performance measurements, and comprehensive test suites. (Current as of Node.js v20.x; MDN and Vitest docs updated continuously; authoritative as official Node.js, MDN, and Vitest documentation.)
## License
OpenJS Foundation and contributors (MIT License); MDN content (CC0/Public Domain)

# RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
These community specifications define the RDF/JS data model interfaces and streaming abstractions, while rdf-ext provides concrete factories, parsers, serializers, and in-memory datasets. Comunica’s modular SPARQL engine builds on these principles, detailing actor pipelines, HTTP connectors, federated query strategies, and streaming result handling, delivering an end-to-end stack for RDF processing in Node.js. (Specs updated January 2022; rdf-ext & Comunica docs updated 2024; authoritative as community standards and official implementations.)
## License
RDF/JS specs (MIT); rdf-ext (MIT); Comunica (MIT)

# Apache Jena Fuseki SPARQL Server
## https://jena.apache.org/documentation/fuseki2/
Apache Jena Fuseki documentation covers deploying and configuring a SPARQL 1.1 server, including dataset management, authentication, CORS, HTTP updates, performance tuning, and command-line utilities (`tdb2` loader). Crucial for hosting local or production SPARQL endpoints to support source refresh, testing, and custom data pipelines within the OWL builder system. (Current as of Fuseki 4.x; authoritative as Apache project documentation.)
## License
Apache License 2.0

# SPARQL.js: JavaScript Query Builder & Parser
## https://github.com/Callidon/sparqljs#readme
SPARQL.js provides a robust JavaScript library for parsing SPARQL queries into an abstract syntax tree (AST) and serializing ASTs back to SPARQL strings. It supports all SPARQL 1.1 query and update forms, enabling programmatic construction and validation of queries in Node.js applications. This tool can be used to build and manipulate SPARQL queries dynamically in OWL builder workflows. (Last updated: 2023; authoritative as a widely used open-source library.)
## License
MIT License