# W3C RDF 1.1 Concepts and OWL 2 Web Ontology Language
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
This combined W3C Recommendation provides the RDF 1.1 data model—IRIs, literals, blank nodes, triples, and graphs—alongside OWL 2 constructs: classes, properties, individuals, datatypes, and axioms. It details abstract syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics, conformance criteria, parsing and serialization examples, ontology authoring patterns, and validation guidelines critical for building, transforming, and validating RDF graphs and OWL ontologies. (Last updated: RDF Concepts 25 February 2014; OWL 2 Overview 27 October 2009; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL defines a rich vocabulary and validation algorithms for expressing constraints on RDF graphs, including shape declarations, property and node constraints, and detailed result reporting. This is essential for implementing robust data validation pipelines post-ontology construction to ensure artifacts conform to business rules and schema requirements. (Last updated: 21 October 2017; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & JavaScript Implementation (jsonld.js)
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
These paired W3C Recommendations define JSON-LD 1.1 framing, compaction, expansion, context processing, normalization, and RDF conversion algorithms, alongside the official JavaScript API. The jsonld.js implementation provides concrete document loader hooks, asynchronous streaming support, and detailed error-handling strategies, empowering seamless JSON-LD ingestion and emission within OWL builder workflows. (Last updated: Spec & API May 2020; jsonld.js 2024; authoritative as W3C Recommendation and official implementation.)
## License
W3C Document License (CC-BY 4.0) for specifications; MIT License for jsonld.js

# SPARQL 1.1 Specifications & Public Endpoints
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
This comprehensive collection covers SPARQL 1.1 Query Language, Protocol, Update, Graph Store HTTP, and JSON Results specifications, plus usage guidance for public endpoints like DBpedia and Wikidata. It details query forms, federation, HTTP conventions, rate limits, result serialization, and best practices—vital for building resilient SPARQL clients, servers, and federated pipelines. (Specs last updated March 2013; DBpedia 2024; Wikidata continuously updated; authoritative as W3C Recommendations and official endpoint guides.)
## License
W3C Document License (CC-BY 4.0); DBpedia: CC BY-SA 3.0; Wikidata: CC0/Public Domain

# Node.js Core Modules: HTTP, File System, URL, Path, Fetch, and ESM
## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/esm.html
Official Node.js v20 documentation for core modules used by owl-builder: HTTP servers and routing for RESTful and SPARQL endpoints, file I/O for CLI commands and artifact persistence, URL parsing and construction, path utilities for file and slug management, global fetch for HTTP requests with built-in timeouts and error handling, and ESM module loading patterns. Includes examples for streaming responses, health checks, integration with SPARQL endpoints, and filesystem operations. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)
## License
OpenJS Foundation and contributors (MIT License)

# RDF/JS Data Model and Streams with rdf-ext Implementation
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
The RDF/JS community specifications define language-agnostic interfaces for RDF factories and streaming abstractions. The rdf-ext implementation delivers concrete factories, parsers, serializers, and in-memory datasets, enabling interoperable, memory-efficient RDF graph construction and streaming pipelines. This foundation is critical for seamless integration with Comunica and high-performance RDF workflows in Node.js. (Spec updated January 2022; rdf-ext docs updated 2024; authoritative as community standards and official implementation.)
## License
MIT License

# Comunica SPARQL Query Framework
## https://comunica.dev/docs/query/framework
The Comunica documentation guides building modular SPARQL query engines in JavaScript, covering actor pipelines, HTTP connectors, federation strategies, query optimization, and custom extension points. It demonstrates composing multiple sources, handling large result streams, integrating caching and metadata—essential for extending CLI and HTTP server features with advanced, federated SPARQL capabilities. (Last updated 2024; authoritative as official Comunica documentation.)
## License
MIT License

# Vitest Testing Framework
## https://vitest.dev/
Vitest is a Vite-native unit test framework for ESM-first projects, offering built-in support for mocking, spies, snapshots, and parallel test execution. It integrates V8-based coverage, provides lifecycle hooks (beforeEach/afterEach), and seamless mocking of global APIs like fetch and fs—precisely matching the patterns used in this repository’s unit and HTTP integration tests. Its extensive configuration options enable robust, high-performance test suites. (Last updated 2024; authoritative as official Vitest documentation.)
## License
MIT License