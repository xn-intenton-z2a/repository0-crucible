# JSON-LD 1.1 Specification Suite
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://www.w3.org/TR/json-ld11-framing/
The W3C Recommendation suite for JSON-LD 1.1 includes the core data model, framing, compaction, expansion, normalization algorithms, and a JavaScript API reference. It details @context definitions, term expansion rules, graph operations, error handling, and advanced framing patterns. Essential for implementing all **generateOntology**, framing, filtering, and normalization subcommands. (Published July 2020; authoritative W3C Recommendation)
## W3C Document License

# OWL 2 Specifications
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-quick-reference/
## https://www.w3.org/TR/owl2-semantics/
Comprehensive guidance on OWL 2 constructs, profiles (DL, EL, QL, RL), syntaxes (Functional, RDF/XML, Manchester), and formal semantics. Crucial for vocabulary selection, ensuring generated JSON-LD OWL ontologies conform to entailment, consistency, and interoperability requirements. (Overview published October 2009; definitive W3C Recommendation)
## W3C Document License

# SHACL – Shapes Constraint Language
## https://www.w3.org/TR/shacl/
Defines node shapes, property shapes, and constraint types (minCount, datatype, pattern) for RDF graph validation. Directly informs adding validation layers to guarantee **generateOntology** outputs meet expected shape definitions and data integrity rules. (Published October 2017)
## W3C Document License

# SPARQL 1.1 Recommendation Suite
## https://www.w3.org/TR/sparql11-query/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/2012/REC-rdf-graph-store-protocol-20120927/
Combined recommendations covering SPARQL query and update operations alongside the Graph Store HTTP Protocol for remote graph management. Provides syntax, protocols, and HTTP endpoints for querying, inserting, deleting, and loading RDF graphs—critical foundations for future CLI or server subcommands handling federated stores. (Published 2012 & 2013)
## W3C Document License

# RDF/JS Specification
## https://rdf.js.org/
Standard JavaScript interfaces for RDF terms, quads, and datasets promoting library interoperability. Guides streaming quad-based processing and store integration beyond simple JSON-LD manipulation. (Last updated 2023)
## CC0

# jsonld.js (JavaScript JSON-LD API)
## https://github.com/digitalbazaar/jsonld.js
An open-source library implementing JSON-LD core algorithms in JavaScript with promise-based and streaming APIs. Serves as a reference for advanced compaction, expansion, framing, normalization, and performance tuning in **generateOntology** and CLI workflows. (Last updated 2024)
## MIT License

# jsonld-cli (Command-Line Interface)
## https://github.com/digitalbazaar/jsonld-cli
A modular CLI wrapper around jsonld.js showcasing subcommands, streaming integration, and robust error handling. Useful model for the **convert**, framing, and normalization subcommands in main.js. (Last updated 2024)
## MIT License

# jsonld-java (Java JSON-LD API)
## https://github.com/jsonld-java/jsonld-java
Java implementation of the JSON-LD Processing Algorithms and API, covering expansion, compaction, framing, and normalization. Demonstrates cross-language approach and edge-case handling, which can inspire JavaScript feature parity and interoperability testing. (Last commit 2023)
## Apache-2.0

# N3.js (RDF/JS Turtle and N3 Library)
## https://github.com/rdfjs/N3.js
High-performance parser and serializer for Turtle/N3 formats implementing RDF/JS interfaces. Enables conversion pipelines between JSON-LD and other RDF syntaxes or streaming processing in Node.js. (Last updated 2024)
## MIT License

# rdflib.js (Linked Data Library for JavaScript)
## https://github.com/linkeddata/rdflib.js
Comprehensive toolkit for parsing, serializing, and querying RDF graphs in JSON-LD, Turtle, and other formats. Demonstrates complex graph manipulation patterns and SPARQL integration for advanced CLI features. (Last commit 2024)
## MIT License

# Comunica – Modular SPARQL Query Engine
## https://comunica.dev/docs/query/query-overview/
Documentation on federated SPARQL querying over HTTP endpoints, files, and RDF/JS datasets. Essential for building dynamic query or validation features in CLI or server modes. (Latest version 2024)
## MIT License

# Apache Jena ARQ Query Engine
## https://jena.apache.org/documentation/query/
Enterprise-grade SPARQL engine documentation, covering query algebra, optimization, and federation. Provides architectural insights for scaling CLI query subcommands and potential server implementations. (Updated 2023)
## Apache-2.0

# Apache Jena Fuseki Server
## https://jena.apache.org/documentation/fuseki2/
Documentation for configuring Fuseki SPARQL server: dataset management, security, and REST API usage. Inspires HTTP-based graph store operations and server subcommand design. (Updated 2023)
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first schema declaration and validation library used for robust CLI option parsing. Covers transforms and custom error formatting essential for consistent subcommand behavior. (Last release May 2024)
## MIT License

# Understanding JSON Schema
## https://json-schema.org/understanding-json-schema/
Authoritative guide with examples on object/array schemas, conditionals, and references. Informs future export of Zod schemas to JSON Schema for interoperability and validation workflows. (Updated July 2024)
## CC0 (Public Domain)

# Node.js API Reference
## https://nodejs.org/api/
Comprehensive guide to Node.js core modules—file system, HTTP, ESM resolution, streams, and global fetch. Essential reference for file I/O, HTTP server/client code, dynamic imports, and stream-based processing in an ESM environment. (Node.js v20.4.0)
## CC BY 4.0

# REST Countries API Documentation
## https://restcountries.com/#api-endpoints-v3-all
Defines endpoints and response schemas for country data including capital fields. Guides pagination, filtering, and error handling for the **capital-cities** subcommand. (Public domain)
## Public Domain

# RFC 8259: The JSON Data Interchange Format
## https://tools.ietf.org/html/rfc8259
Specifies JSON grammar, data types, and encoding rules. Ensures JSON-LD outputs produced by **generateOntology** conform to the JSON standard. (Published December 2017)
## IETF Trust

# Vitest Automated Testing Framework
## https://vitest.dev/
Vite-native unit testing framework with Jest-compatible API, snapshot, and coverage support. Documentation on mocking, spying, and async tests directly applies to existing tests in tests/unit. (MIT License)
## MIT License

# Hydra Core Vocabulary
## https://www.hydra-cg.com/spec/latest/core/
Hypermedia-driven Web API framework using JSON-LD, defining templates, links, and operations. Offers best practices for discoverable, self-describing APIs—informing future serve subcommand design. (Latest release 2023)
## CC BY 4.0

# RESTful API Specifications
## https://jsonapi.org/format/
## https://spec.openapis.org/oas/v3.1.0
Combines JSON:API conventions (resource structure, relationships, error handling) and OpenAPI 3.1 machine-readable schemas. Crucial for designing consistent, self-documenting HTTP endpoints in serve/HTTP modes. (Published February 2021)
## CC0 (JSON:API) / Apache-2.0 (OpenAPI)

# Supertest — HTTP Assertions for Node.js
## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP servers with assertions on status, headers, and body. Essential for integration tests of serve subcommand endpoints. (Last updated 2024)
## MIT License

# RDF 1.1 Concepts and Abstract Syntax
## https://www.w3.org/TR/rdf11-concepts/
Defines the RDF graph model, term semantics (IRIs, blank nodes, literals), and processing rules. Foundational for understanding **generateOntology** graph construction and RDF/JS interfaces. (Published March 2014)
## W3C Document License

# Turtle – Terse RDF Triple Language
## https://www.w3.org/TR/turtle/
Specifies Turtle syntax for RDF serialization including prefixes, abbreviations, and directives. Underpins conversion of JSON-LD to Turtle via N3.js or other serializers. (Published February 2014)
## W3C Document License

# WHATWG Web Standards
## https://fetch.spec.whatwg.org/
## https://url.spec.whatwg.org/
Combined WHATWG specifications for the Fetch API and URL parsing/resolution. Covers request/response lifecycles, streaming, cache controls, IRI normalization—critical for HTTP interactions and IRI construction in JSON-LD contexts. (Latest revisions)
## CC0

# Commander.js – Node.js CLI Framework
## https://github.com/tj/commander.js#readme
Declarative API for defining Node.js CLIs with nested subcommands, option parsing, defaults, and auto-generated help. Patterns for organizing complex CLI tools that can inspire subcommand dispatch and help output enhancements in main.js. (Last updated 2024)
## MIT License

# Express.js and body-parser Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/body-parser
Express routing, middleware configuration, error handling patterns, and body-parser JSON/URL-encoded parsing capabilities. Directly applicable to the serve subcommand’s HTTP endpoints and middleware design. (Express 4.18, body-parser latest 2024)
## MIT License

# PyLD – Python JSON-LD Processor
## https://github.com/digitalbazaar/pyld
Reference implementation of JSON-LD algorithms in Python with context loaders and advanced error handling. Useful for cross-language consistency checks and edge-case algorithm insights. (Last updated 2023)
## MIT License

# RFC 6901: JSON Pointer
## https://tools.ietf.org/html/rfc6901
Defines JSON Pointer syntax for locating values within JSON documents, including token unescaping and error handling. Direct guide for implementing the **query** subcommand’s pointer resolver. (Published April 2013)
## IETF Trust

# json-pointer (Node.js JSON Pointer Library)
## https://github.com/janl/node-json-pointer
Minimal library providing get, set, and remove operations according to RFC 6901. Offers a robust API for pointer resolution and validation, streamlining **query** implementation and reducing custom traversal logic. (Last updated 2024)
## MIT License

# Wikidata Query Service User Manual
## https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
Wikidata Query Service (WDQS) user manual detailing SPARQL endpoint usage for querying the Wikimedia knowledge graph. It covers query endpoint setup, prefix management, result formats (JSON, CSV, RDF), pagination, optimization strategies (property paths, query plan inspection), and federated queries. Essential for implementing **crawl** and **query** subcommands against a high-volume, real-world SPARQL service. (Last updated March 2024; authoritative Wikimedia documentation)
## CC BY-SA 3.0

# DBpedia SPARQL Endpoint Documentation
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
DBpedia SPARQL endpoint documentation outlining endpoint configuration, supported query features, graph datasets, and HTTP parameters. Includes practical examples for querying linked open data, result streaming, and performance tuning. Directly informs building robust SPARQL-driven data ingestion and conversion pipelines for **generateOntology**. (Last reviewed 2023; maintained by the DBpedia community)
## CC BY-SA 3.0