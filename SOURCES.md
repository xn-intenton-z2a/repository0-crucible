# W3C RDF 1.1 Concepts and OWL 2 Web Ontology Language
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
This combined W3C Recommendation provides the RDF 1.1 data model and the OWL 2 Web Ontology Language overview. It specifies IRIs, literals, blank nodes, triples, graphs, and key OWL constructs (classes, properties, individuals) along with abstract syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics, conformance criteria, parsing and serialization examples, and common ontology authoring patterns. This foundation is critical for constructing, transforming, and validating RDF graphs and ontologies in both CLI and HTTP workflows. (Last updated: RDF Concepts 25 February 2014; OWL 2 Overview 27 October 2009; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL defines a rich vocabulary and validation algorithms for expressing constraints on RDF graphs, including node and property shapes, path constraints, and detailed result reporting. Its formal semantics and conformance tests are essential for implementing robust data validation pipelines after ontology construction and ensuring artifacts adhere to business rules and schema requirements. (Last updated: 21 October 2017; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & JavaScript Implementation (jsonld.js)
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 specifications and API define framing, compaction, expansion, context processing, normalization, and RDF conversion algorithms. The jsonld.js library provides custom document loader hooks, asynchronous streaming support, and comprehensive error handling. Together they enable seamless ingestion and emission of JSON-LD in OWL builder workflows, with practical code examples for context management, normalization using URDNA2015, and conversion to N-Quads. (Last updated: Spec & API May 2020; jsonld.js 2024; authoritative as W3C Recommendation and official implementation.)
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
This collection covers SPARQL 1.1 Query Language, Protocol, Update operations, Graph Store HTTP, and JSON Results formats, alongside guidance for public endpoints (DBpedia, Wikidata). It details query forms, federation and pagination strategies, HTTP conventions, rate limits, result serialization, and best practices for building resilient SPARQL clients and federated pipelines in Node.js. (Specs last updated March 2013; DBpedia 2024; Wikidata continuously updated; authoritative as W3C Recommendations and official endpoint guides.)
## License
W3C Document License (CC-BY 4.0); DBpedia: CC BY-SA 3.0; Wikidata: CC0/Public Domain

# Node.js Core Modules, Fetch API & Vitest Testing Framework
## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/path.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/globals.html#fetch
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://vitest.dev/
A combined reference for Node.js v20 core modules and the MDN Fetch API, covering HTTP servers, file I/O, URL and path utilities, ESM module loading, and global fetch usage (streaming responses, error handling, timeouts). Includes Vitest v3, a Vite-native testing framework for ESM-first projects, detailing mocking, spies, snapshots, parallel execution, V8-based coverage, and lifecycle hooks. Essential for implementing robust CLI commands, HTTP endpoints, and comprehensive test suites. (Current as of Node.js v20.x; MDN fetch and Vitest docs updated continuously; authoritative as official Node.js, MDN, and Vitest documentation.)
## License
OpenJS Foundation and contributors (MIT License); MDN content (CC0/Public Domain)

# RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
## https://comunica.dev/docs/query/framework
These community specifications define language-agnostic RDF factory interfaces and streaming abstractions. rdf-ext offers concrete factories, parsers, serializers, and in-memory dataset implementations for efficient graph construction. Comunica builds on these to provide a modular SPARQL query engine in JavaScript, detailing actor pipelines, HTTP connectors, federation strategies, and streaming result handling. Together they form an end-to-end stack for building, querying, and federating RDF data in Node.js. (Specs updated January 2022; rdf-ext & Comunica docs updated 2024; authoritative as community standards and official implementations.)
## License
RDF/JS specs (MIT); rdf-ext (MIT); Comunica (MIT)

# OWL 2 RDF-Based Semantics
## https://www.w3.org/TR/owl2-rdf-based-semantics/
This W3C Recommendation defines formal semantics for OWL 2 ontologies encoded in RDF graphs. It describes semantic conditions, entailment rules, interpretation structures, and conformance criteria. This specification is essential for correct reasoning over JSON-LD-generated RDF triples and ensures ontology construction and SPARQL querying adhere to official OWL semantics. (Last updated: 11 December 2012; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# OWL 2 Abstract Syntax
## https://www.w3.org/TR/owl2-syntax/
This specification defines the abstract syntax for OWL 2, including class expressions, property axioms, data ranges, and annotation axiom patterns. It provides formal schemas for how OWL constructs should be modeled in JSON-LD contexts and guides serialization of ontology structures in CLI and programmatic outputs. (Last updated: 27 October 2009; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)