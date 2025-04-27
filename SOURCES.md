# W3C RDF 1.1 Concepts and OWL 2 Web Ontology Language
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
This combined W3C Recommendation provides the RDF 1.1 data model (IRIs, literals, blank nodes, triples, and graphs), abstract syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics, and conformance criteria, alongside OWL 2 constructs—classes, properties, individuals, datatypes, and axioms. It includes parsing and serialization examples, ontology authoring patterns, and validation guidelines critical for building, transforming, and validating RDF graphs and OWL ontologies within JSON-LD workflows. (Last updated: RDF Concepts 25 February 2014; OWL 2 Overview 27 October 2009; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# OWL 2 Primer
## https://www.w3.org/TR/owl2-primer/
The OWL 2 Primer offers an accessible introduction to ontology design, covering core OWL 2 profiles (EL, QL, RL), class and property modeling patterns, and common ontology design best practices. It provides step-by-step examples for expressing simple and complex constraints, making it invaluable for developers new to OWL modeling and for guiding implementation of ontology construction features. (Last updated: 11 December 2012; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL defines a rich vocabulary and validation algorithms for RDF graph constraints, including shape declarations, property and node constraints, and result reporting. This specification is essential for implementing data validation pipelines post-ontology construction, ensuring that generated OWL artifacts conform to required schemas and business rules. (Last updated: 21 October 2017; authoritative as W3C Recommendation.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification & JavaScript Implementation (jsonld.js)
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://github.com/digitalbazaar/jsonld.js#readme
These paired W3C Recommendations define JSON-LD 1.1 framing, compaction, expansion, context processing, normalization, and RDF conversion algorithms, alongside the JavaScript API. The jsonld.js implementation delivers these capabilities with robust usage examples, custom document loader hooks, asynchronous streaming support, and detailed error-handling strategies. Together, they empower programmatic JSON-LD ingestion and emission within OWL builder workflows. (Last updated: Spec & API May 2020; jsonld.js 2024; authoritative as W3C Recommendation and official implementation.)
## License
W3C Document License (CC-BY 4.0) for specifications; MIT License for jsonld.js implementation

# SPARQL 1.1 Specifications & Public Endpoints
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
This comprehensive collection includes the SPARQL 1.1 Query Language, Protocol, Update, Graph Store HTTP, and JSON Results specifications, alongside usage documentation for major public endpoints (DBpedia and Wikidata). It covers query forms, federation, HTTP conventions, rate limits, result serialization, and best practices—critical for building resilient SPARQL clients, servers, and federated pipelines. (Specs last updated March 2013; DBpedia 2024; Wikidata continually updated; authoritative as W3C Recommendations and official endpoint guides.)
## License
W3C Document License (CC-BY 4.0); DBpedia: Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0); Wikidata: Creative Commons CC0 or public domain

# Node.js Core APIs: HTTP, File System, URL, Fetch, and ESM
## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/esm.html
Official Node.js v20 documentation for core modules used by owl-builder: HTTP servers and routing for RESTful and SPARQL endpoints, file I/O for CLI commands and artifact persistence, URL parsing and construction, global fetch for HTTP requests with built-in timeouts and error handling, and ESM module loading patterns. Includes examples for streaming responses, health checks, and integration with SPARQL endpoints. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)
## License
OpenJS Foundation and contributors (MIT License)

# RDF/JS Data Model and Streams with rdf-ext Implementation
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/
The RDF/JS Community Specifications define language-agnostic interfaces for RDF factories and streaming abstractions. The rdf-ext implementation provides concrete factories, parsers, serializers, and in-memory datasets, enabling interoperable, memory-efficient RDF graph construction and streaming. This is foundational for seamless integration with Comunica and for building high-performance RDF workflows in Node.js. (Spec updated January 2022; rdf-ext docs updated 2024; authoritative as community standards and official implementation.)
## License
MIT License

# Comunica SPARQL Query Framework
## https://comunica.dev/docs/query/framework
The Comunica documentation guides building modular SPARQL query engines in JavaScript, covering actor pipelines, HTTP connectors, federation strategies, query optimization, and custom extension points. It demonstrates composing multiple sources, handling large result streams, and integrating caching and metadata—essential for extending CLI and HTTP server features with advanced, federated SPARQL capabilities. (Last updated 2024; authoritative as official Comunica documentation.)
## License
MIT License