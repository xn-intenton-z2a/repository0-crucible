# W3C RDF 1.1 Concepts and OWL 2 Web Ontology Language
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
This combined W3C Recommendation provides the RDF 1.1 data model and the OWL 2 Web Ontology Language overview. It specifies IRIs, literals, blank nodes, triples, graphs, key OWL constructs including classes, properties, and individuals, with abstract syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics, conformance criteria, parsing and serialization examples, and ontology authoring patterns. This foundation is critical for constructing, transforming, and validating RDF graphs and ontologies in both CLI and HTTP workflows. (Last updated: RDF Concepts 25 February 2014; OWL 2 Overview 27 October 2009; authoritative as W3C Recommendation.)
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
The JSON-LD 1.1 specifications and API define framing, compaction, expansion, context processing, normalization (URDNA2015), and RDF conversion algorithms. The jsonld.js library provides custom document loader hooks, asynchronous streaming support, and comprehensive error handling. Together they enable seamless ingestion and emission of JSON-LD in OWL builder workflows, with practical code examples for context management and conversion to N-Quads. (Last updated: Spec & API May 2020; jsonld.js 2024; authoritative as W3C Recommendation and official implementation.)
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
This collection covers the SPARQL 1.1 Query Language, Protocol, Update operations, Graph Store HTTP, and JSON Results formats, alongside guidance for public endpoints (DBpedia, Wikidata). It details query forms, federation strategies, HTTP conventions, rate limits, result serialization, and best practices for resilient SPARQL clients and federated pipelines in Node.js. (Specs last updated March 2013; DBpedia 2024; Wikidata continuously updated; authoritative as W3C Recommendations and official endpoint guides.)
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
A combined reference for Node.js v20 core modules including HTTP servers, file I/O, URL and path utilities, ESM module loading, global fetch usage (including streaming responses, error handling, and timeouts), performance measurement via perf_hooks, and event-driven patterns via the events module. Also includes Fetch API details from MDN and Vitest v3, a Vite-native testing framework for ESM-first projects, detailing mocking, spies, snapshots, parallel execution, V8-based coverage, and lifecycle hooks. Essential for robust CLI commands, HTTP endpoints, performance-aware operations, event handling, and comprehensive test suites. (Current as of Node.js v20.x; MDN fetch and Vitest docs updated continuously; authoritative as official Node.js, MDN, and Vitest documentation.)
## License
OpenJS Foundation and contributors (MIT License); MDN content (CC0/Public Domain)

# RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
These community specifications define language-agnostic RDF factory interfaces and streaming abstractions, while rdf-ext offers concrete factories, parsers, serializers, and in-memory datasets for efficient graph construction. Comunica builds on these to provide a modular SPARQL query engine in JavaScript, detailing actor pipelines, HTTP connectors, federation strategies, and streaming result handling. Together they form an end-to-end stack for building, querying, and federating RDF data in Node.js. (Specs updated January 2022; rdf-ext & Comunica docs updated 2024; authoritative as community standards and official implementations.)
## License
RDF/JS specs (MIT); rdf-ext (MIT); Comunica (MIT)

# OWL 2 Semantics & Syntax
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
This combined W3C Recommendation defines the formal semantics for OWL 2 ontologies encoded in RDF graphs (entailment rules, interpretation structures, and conformance criteria) along with the abstract syntax for class expressions, property axioms, data ranges, and annotation patterns. It is essential for correct reasoning over JSON-LD-generated RDF triples and guides serialization of ontology structures in both CLI and programmatic outputs. (Last updated: RDF-Based Semantics 11 December 2012; Abstract Syntax 27 October 2009; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# Apache Jena Fuseki SPARQL Server
## https://jena.apache.org/documentation/fuseki2/
The Apache Jena Fuseki documentation provides detailed guidance on deploying and configuring a SPARQL 1.1 server, including dataset setup, authentication and CORS, HTTP update support, performance tuning, and CLI tools (`tdb2` loader). This source is critical for users who need to host local or production SPARQL endpoints to support `refreshSources`, testing, and custom data pipelines within the owl-builder ecosystem. (Current as of Fuseki 4.x; authoritative as Apache project documentation.)
## License
Apache License 2.0