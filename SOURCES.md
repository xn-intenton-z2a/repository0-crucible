# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 details the data model, framing, compaction, expansion, and normalization algorithms. It covers @context definitions, term expansion rules, and the use of @graph. Essential for ensuring that **generateOntology** outputs conform to the standard and interoperate with other JSON-LD tools. (Published July 16, 2020)
## W3C Document License

# JSON-LD Processing Algorithms and API
## https://www.w3.org/TR/json-ld11-api/
Defines step-by-step algorithms for expansion, compaction, flattening, framing, and normalization, along with a JavaScript API reference. Critical for implementing advanced transformations, error handling, and performance optimizations in **generateOntology** and framing or normalization subcommands. (Published July 9, 2020)
## W3C Document License

# JSON-LD Framing
## https://www.w3.org/TR/json-ld11-framing/
Specifies how to extract and reshape specific node structures from JSON-LD documents using frames. Covers embedding strategies, conditional filters, and nested shapes, directly informing **get-term**, **filter**, and custom framing-based outputs. (Published July 16, 2020)
## W3C Document License

# OWL 2 Specifications
## Overview: https://www.w3.org/TR/owl2-overview/
## Quick Reference: https://www.w3.org/TR/owl2-quick-reference/
## RDF-Based Semantics: https://www.w3.org/TR/owl2-semantics/
A consolidated entry covering OWL 2 core constructs (classes, properties, individuals), profiles (DL, EL, QL, RL), syntaxes (functional, RDF/XML, Manchester), and formal semantics. Guides vocabulary selection and ensures generated JSON-LD OWL documents adhere to entailment and consistency principles. (Overview published October 27, 2009)
## W3C Document License

# SHACL – Shapes Constraint Language
## https://www.w3.org/TR/shacl/
Standard vocabulary and validation framework for describing constraints on RDF graphs. Covers node shapes, property shapes, and constraint types (minCount, datatype, pattern). Essential for adding validation layers to ensure generated ontologies meet expected shape definitions. (Published October 2017)
## W3C Document License

# SPARQL 1.1 Recommendation Set
## Query: https://www.w3.org/TR/sparql11-query/
## Update: https://www.w3.org/TR/sparql11-update/
These combined W3C Recommendations cover querying (SELECT, CONSTRUCT, ASK), update operations (INSERT, DELETE, LOAD), and outline the Graph Store HTTP protocol for managing RDF graphs over REST. Foundations for potential CLI or server subcommands handling remote triple-store operations and federation. (Published March 21, 2013)
## W3C Document License

# RDF/JS Specification
## https://rdf.js.org/
Defines standard JavaScript interfaces for RDF terms, quads, and datasets to promote library interoperability. Guides potential streaming, quad-based processing, and integration with RDF stores beyond simple JSON-LD object manipulation. (Last updated 2023)
## CC0

# jsonld.js (JavaScript JSON-LD API)
## https://github.com/digitalbazaar/jsonld.js
An open-source library implementing JSON-LD operations—expansion, compaction, framing, normalization—with streaming support and promise-based API. Serves as a reference for advanced JSON-LD handling and can be leveraged for deeper control beyond **generateOntology**. (Last updated 2024)
## MIT License

# jsonld-cli (JSON-LD Command-Line Interface)
## https://github.com/digitalbazaar/jsonld-cli
Provides a CLI wrapper around jsonld.js demonstrating modular subcommands, streaming, and robust error handling. Useful to model the structure of **convert**, framing, and normalization subcommands in main.js. (Last updated 2024)
## MIT License

# N3.js (RDF/JS Turtle and N3 Library)
## https://github.com/rdfjs/N3.js
High-performance parser and serializer for Turtle/N3 formats implementing RDF/JS interfaces. Enables conversions between JSON-LD and other RDF formats or direct streaming pipelines. (Last updated 2024)
## MIT License

# rdflib.js (Linked Data Library for JavaScript)
## https://github.com/linkeddata/rdflib.js
Comprehensive RDF toolkit for parsing, serializing, querying (SPARQL), and persistence in multiple formats (JSON-LD, Turtle). Demonstrates real-world graph manipulation patterns to inform future CLI enhancements. (Last commit 2024)
## MIT License

# Comunica – Modular SPARQL Query Engine
## https://comunica.dev/docs/query/query-overview/
Documentation on configuring and running federated SPARQL queries over HTTP endpoints, files, and RDF/JS datasets. Useful for building on-the-fly query or validation features in the CLI. (Latest version 2024)
## MIT License

# Apache Jena — ARQ Query Engine Documentation
## https://jena.apache.org/documentation/query/
Enterprise-grade SPARQL engine docs, covering syntax, query algebra, optimization, and federation. Provides performance and architectural insights for future CLI query or server subcommands. (Documentation updated 2023)
## Apache-2.0

# Apache Jena — Fuseki Server Documentation
## https://jena.apache.org/documentation/fuseki2/
Documentation for Fuseki, Jena's SPARQL server, covering server configuration, dataset management, security, and REST API usage. Provides a model for HTTP-based triple store operations to inspire the serve subcommand architecture. (Documentation updated 2023)
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first schema declaration and validation library used to validate CLI options. Covers parsing, transforms, and custom error formatting crucial for robust subcommand option handling. (Last release May 2024)
## MIT License

# Understanding JSON Schema
## https://json-schema.org/understanding-json-schema/
Authoritative guide to JSON Schema, examples for object and array schemas, references, and conditionals. Informs future export of Zod schemas to JSON Schema for interoperability or validation workflows. (Updated July 2024)
## CC0 (Public Domain)

# Node.js API Reference
## https://nodejs.org/api/
Comprehensive guide to Node.js core modules, including file system, HTTP, ESM module resolution, global fetch, AbortController, URL/path utilities, and streams. Essential reference for CLI file I/O, server creation, HTTP request handling, and dynamic imports in an ESM-based tool. (Node.js v20.4.0)
## CC BY 4.0

# REST Countries API Documentation
## https://restcountries.com/#api-endpoints-v3-all
Defines endpoints and response schemas for country data (including capitals). Guides pagination, field filters, and error handling for the **capital-cities** subcommand. (Public domain)
## Public Domain

# RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format
## https://tools.ietf.org/html/rfc8259
Specifies the JSON grammar, data types, encoding rules, and media type. Ensures that generated JSON-LD output conforms strictly to the JSON standard. (Published December 2017)
## IETF Trust

# Vitest Automated Testing Framework
## https://vitest.dev/
Vite-native unit testing framework with Jest-compatible API, snapshot and coverage support. Documentation covers mocking, spying, asynchronous tests, and configuration—directly applicable to existing tests in tests/unit. (MIT License)
## MIT License

# Hydra Core Vocabulary
## https://www.hydra-cg.com/spec/latest/core/
A framework for hypermedia-driven Web APIs using JSON-LD, defining templates, links, and operations. Offers best practices for enhanced discoverability and dynamic API navigation in JSON-LD APIs. (Latest release 2023)
## CC BY 4.0

# RESTful API Specifications
## https://jsonapi.org/format/
## https://spec.openapis.org/oas/v3.1.0
Combines JSON:API’s detailed conventions for resource structure, relationships, error responses, and pagination with OpenAPI 3.1's machine-readable paths, operations, and component schemas. Crucial for designing consistent, self-documenting, and validated HTTP endpoints in the serve subcommand. (JSON:API v1.1 / OpenAPI 3.1 Published February 2021)
## CC0 (JSON:API) / Apache-2.0 (OpenAPI)

# Supertest — HTTP Assertions for Node.js
## https://github.com/visionmedia/supertest
Provides a high-level abstraction for testing HTTP servers in Node.js, supporting assertions on response status, headers, and body. Essential for writing integration tests for the serve subcommand endpoints. (Last updated 2024)
## MIT License

# RDF 1.1 Concepts and Abstract Syntax
## https://www.w3.org/TR/rdf11-concepts/
Defines the abstract graph model, semantics of RDF triples, terms (IRIs, blank nodes, literals), and processing rules. It is essential for understanding how **generateOntology** constructs graphs and how RDF/JS interfaces represent them. (Published March 25, 2014)
## W3C Document License

# Turtle – Terse RDF Triple Language
## https://www.w3.org/TR/turtle/
Specifies the Turtle syntax for RDF, including abbreviations, prefixes, graph serialization, and directives. Provides the foundation for converting JSON-LD outputs to Turtle or integrating with N3.js serializers. (Published February 25, 2014)
## W3C Document License

# Fetch API Documentation and Standard
## https://fetch.spec.whatwg.org/
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Combined reference for the WHATWG Fetch Standard and MDN Fetch API documentation, covering request and response lifecycles, streaming, cache controls, credentials, and AbortController integration. Essential for robust HTTP interactions in the CLI tool and error handling across fetch-based subcommands. (WHATWG spec is CC0; MDN content under CC BY-SA)
## CC0 (spec) / CC BY-SA (MDN)

# URL Standard
## https://url.spec.whatwg.org/
Defines URL parsing, resolution, serialization algorithms, query parameters handling, and Internationalized Resource Identifiers (IRIs). Crucial for constructing and normalizing IRIs in JSON-LD contexts and managing file paths and dynamic imports in an ESM environment. (WHATWG standard, latest revision)
## CC0

# Commander.js – Node.js CLI Framework
## https://github.com/tj/commander.js#readme
Commander.js provides a robust, declarative API for defining command-line interfaces in Node.js. It supports nested subcommands, option parsing, default values, and automatic help generation. Its patterns for organizing complex CLI tools can inform enhancements to subcommand dispatch, flag validation, and help output in main.js. (Last updated 2024)
## MIT License

# Express.js and body-parser Middleware
## https://expressjs.com/en/4x/api.html
## https://github.com/expressjs/body-parser
Combines Express.js core routing, middleware interfaces, error handling patterns, and body-parser’s JSON and URL-encoded parsing capabilities. Covers middleware configuration, parse limits, and robust request handling strategies for the serve subcommand’s HTTP endpoints. (Express 4.18, body-parser latest 2024)
## MIT License

# PyLD – Python JSON-LD Processor
## https://github.com/digitalbazaar/pyld
The reference implementation of JSON-LD algorithms in Python, covering compaction, expansion, framing, and normalization. Includes context loader utilities and advanced error handling patterns. Useful for cross-language consistency checks and edge-case algorithm insights. (Last updated 2023)
## MIT License

# RFC 6901: JSON Pointer
## https://tools.ietf.org/html/rfc6901
Defines the JSON Pointer syntax for identifying specific values within a JSON document. Specifies token unescaping (~0, ~1), array indexing, and error handling, directly guiding the implementation of the **query** subcommand’s pointer resolver. (Published April 2013)
## IETF Trust

# json-pointer (Node.js JSON Pointer Library)
## https://github.com/janl/node-json-pointer
A minimal, MIT-licensed library providing `get`, `set`, and `remove` operations using RFC 6901 JSON Pointers. Offers a robust API for pointer resolution, validation, and edge-case handling, which can streamline the **query** implementation and reduce custom traversal logic. (Last updated 2024)
## MIT License