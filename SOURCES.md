# W3C RDF 1.1 Concepts and OWL 2 Web Ontology Language
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/

This combined W3C Recommendation provides both the RDF 1.1 data model (IRIs, literals, blank nodes, triples, and graphs), abstract syntaxes (Turtle, RDF/XML, JSON-LD), formal semantics, and conformance criteria, together with the OWL 2 Web Ontology Language constructs—classes, properties, individuals, datatypes, and axioms. It includes code examples for parsing, serialization, ontology authoring, and validation, offering a one-stop reference for building, transforming, and validating RDF graphs and OWL ontologies before JSON-LD emission. (Last updated: RDF 25 February 2014; OWL 2 Overview 27 October 2009; authoritative as W3C Recommendations.)

## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification and API
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/

These paired W3C Recommendations define JSON-LD 1.1: framing, compaction, expansion, context processing, normalization, and RDF conversion algorithms, along with the JavaScript API for programmatic JSON-LD operations. Detailed pseudocode, error-handling strategies, extension points, and embedding guidelines equip library authors to ingest external data and emit fully compliant JSON-LD within OWL builder workflows. (Last updated: Spec 16 May 2020; API 29 May 2020; authoritative as W3C Recommendations.)

## License
W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Suite: Query, Protocol, Update, Graph Store HTTP, and JSON Results
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

This comprehensive suite covers:
- The SPARQL 1.1 Query Language (SELECT, ASK, CONSTRUCT, DESCRIBE, federation, aggregation).
- Protocol: HTTP GET/POST, content negotiation, URL parameters, and error codes.
- Update: INSERT, DELETE, transactions, and graph targeting.
- Graph Store HTTP: RESTful CRUD on RDF graphs.
- JSON Results: JSON encoding for SELECT and ASK results.

Examples illustrate parameter tuning, rate-limit handling, and parsing against endpoints like DBpedia. Critical for building robust SPARQL clients, servers, and federated pipelines. (Last updated 21 March 2013; authoritative as W3C Recommendations.)

## License
W3C Document License (CC-BY 4.0)

# Node.js Core APIs: HTTP, File System, URL, Fetch, and ESM
## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/esm.html

Official Node.js v20 documentation for core modules used by owl-builder:
- HTTP: Server creation, routing, headers, and status codes for RESTful, SPARQL, and query endpoints.
- FS: Directory and file operations (existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync) for CLI commands and data persistence.
- URL: WHATWG URL and URLSearchParams for constructing and parsing request URLs.
- Fetch: Global fetch API for HTTP requests, JSON parsing, timeouts, and error handling.
- ESM: ECMAScript Module loading, file extensions, and interop patterns.

Provides patterns for health checks, streaming responses, and integration with SPARQL endpoints. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)

## License
OpenJS Foundation and contributors (MIT License)

# RDF/JS Data Model and Streams with rdf-ext Implementation
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://rdf-ext.github.io/

The RDF/JS Community Specifications define language-agnostic interfaces for RDF factories (IRIs, literals, blank nodes, triples/quads, datasets) and a minimal streaming abstraction for processing RDF streams. The rdf-ext implementation extends these specs with concrete factories, parsers, serializers, and in-memory datasets. Together, they enable interoperable, memory-efficient RDF graph construction and streaming, and seamless integration with Comunica for SPARQL queries in Node.js. (Spec last updated January 2022; rdf-ext docs last updated 2024; authoritative as community standards and official implementation.)

## License
MIT License

# Comunica SPARQL Query Framework
## https://comunica.dev/docs/query/framework

The Comunica documentation describes building modular SPARQL query engines in JavaScript: actor pipelines, HTTP connectors, federation strategies, query optimization, and custom extension points. It illustrates how to compose sources (local & remote), handle large result streams, and integrate with cache and metadata. Essential for extending CLI and HTTP server features with advanced, federated SPARQL capabilities. (Last updated 2024; authoritative as official Comunica documentation.)

## License
MIT License

# JSON-LD JavaScript Implementation (jsonld.js)
## https://github.com/digitalbazaar/jsonld.js#readme

The jsonld.js repository provides a robust JavaScript implementation of the JSON-LD 1.1 API, including compaction, expansion, flattening, framing, normalization, and RDF conversion. It offers detailed usage examples, extension points for custom document loaders, asynchronous streaming interfaces, and error-handling strategies. Key for programmatic manipulation of JSON-LD documents during intermediate and enhanced ontology construction. (Last updated: 2024; authoritative as official GitHub README.)

## License
MIT License

# DBpedia SPARQL Endpoint Documentation
## https://wiki.dbpedia.org/services-resources/sparql-endpoint

The DBpedia SPARQL Endpoint documentation details the usage of the public SPARQL HTTP service provided by DBpedia. It covers query parameters (query, default-graph-uri), HTTP methods (GET/POST), result formats (JSON, XML, CSV), rate limits, timeout settings, and best practices for efficient querying. Essential for integrating the --capital-cities feature and custom SPARQL queries against DBpedia. (Last updated: 2024; authoritative as official DBpedia wiki.)

## License
Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)