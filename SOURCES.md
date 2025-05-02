# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 details the data model, framing, compaction, expansion, and normalization algorithms. It covers @context definitions, term expansion rules, and the use of @graph. Essential for ensuring that generateOntology outputs conform to the standard and interoperate with other JSON-LD tools. (Published July 16, 2020)  
## W3C Document License

# JSON-LD Processing Algorithms and API
## https://www.w3.org/TR/json-ld11-api/
Defines the step-by-step algorithms for expansion, compaction, flattening, framing, and normalization, along with a high-level JavaScript API. Critical for implementing advanced transformations, error handling, and performance optimizations in generateOntology and potential framing or normalization subcommands. (Published July 9, 2020)  
## W3C Document License

# JSON-LD Framing
## https://www.w3.org/TR/json-ld11-framing/
Specifies how to extract and reshape specific node structures from JSON-LD documents using frames. Covers embedding strategies, conditional filters, and nested shapes. Useful for implementing get-term, filter, or custom framing-based outputs. (Published July 16, 2020)  
## W3C Document License

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
Introduces the core constructs of OWL 2 (classes, properties, individuals) and its profiles (DL, EL, QL, RL). Guides the structure of @graph nodes and selection of OWL vocabulary terms for JSON-LD outputs. (Published October 27, 2009)  
## W3C Document License

# OWL 2 Quick Reference
## https://www.w3.org/TR/owl2-quick-reference/
A concise reference of OWL 2 syntax in functional, RDF/XML, and Manchester formats. Lists common IRIs (e.g., owl:Class, rdf:Property) and axiom patterns—helpful for mapping JavaScript objects to OWL constructs in generateOntology. (Published October 27, 2009)  
## W3C Document License

# OWL 2 RDF-Based Semantics
## https://www.w3.org/TR/owl2-semantics/
Provides the formal semantics for OWL 2 ontologies expressed in RDF, including entailment principles and consistency conditions. Useful for validating that generated JSON-LD OWL documents will be correctly interpreted by reasoners. (Published October 27, 2009)  
## W3C Document License

# SHACL – Shapes Constraint Language
## https://www.w3.org/TR/shacl/
Standard vocabulary and validation framework for describing constraints on RDF graphs. Covers node shapes, property shapes, and constraint types (minCount, datatype, pattern). Essential for adding validation layers to ensure generated ontologies meet expected shape definitions. (Published October 2017)  
## W3C Document License

# SPARQL 1.1 Recommendation Set
## Query Language: https://www.w3.org/TR/sparql11-query/
## Update Language: https://www.w3.org/TR/sparql11-update/
## Graph Store HTTP Protocol: https://www.w3.org/TR/sparql11-http-rdf-update/
These combined W3C Recommendations cover querying (SELECT, CONSTRUCT, ASK), update operations (INSERT, DELETE, LOAD), and HTTP protocols for graph store management. Useful for future CLI extensions involving remote triple-store queries, updates, and federation. (All published March 21, 2013)  
## W3C Document License

# RDF/JS Specification
## https://rdf.js.org/
Defines standard JavaScript interfaces for RDF terms, quads, and datasets to promote library interoperability. Guides potential streaming, quad-based processing, or integration with RDF stores beyond simple JSON-LD object manipulation. (Last updated 2023)  
## CC0

# jsonld.js (JavaScript JSON-LD API)
## https://github.com/digitalbazaar/jsonld.js
An open-source library implementing JSON-LD operations—expansion, compaction, framing, normalization—with streaming support and promise-based API. Serves as reference for advanced JSON-LD handling and can be leveraged if deeper control is needed beyond generateOntology. (Last updated 2024)  
## MIT License

# jsonld-cli (JSON-LD Command-Line Interface)
## https://github.com/digitalbazaar/jsonld-cli
Provides a CLI wrapper around jsonld.js demonstrating modular subcommands, streaming, and error handling patterns. Useful to model the structure of convert, framing, and normalization subcommands in main.js. (Last updated 2024)  
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
Documentation on configuring and running federated SPARQL queries over HTTP endpoints, files, and RDFJS datasets. Useful for building on-the-fly query or validation features in the CLI. (Latest version 2024)  
## MIT License

# Apache Jena — ARQ Query Engine Documentation
## https://jena.apache.org/documentation/query/
Enterprise-grade SPARQL engine docs, covering syntax, query algebra, optimization, and federation. Provides performance and architectural insights for future CLI query or server subcommands. (Documentation updated 2023)  
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first schema declaration and validation library used to validate CLI options. Covers parsing, transforms, and custom error formatting crucial for robust subcommand option handling. (Last release May 2024)  
## MIT License

# Understanding JSON Schema
## https://json-schema.org/understanding-json-schema/
Authoritative guide to JSON Schema, examples for object and array schemas, references, and conditionals. Informs future export of Zod schemas to JSON Schema for interoperability or validation workflows. (Updated July 2024)  
## CC0 (Public Domain)

# Node.js Core API
## https://nodejs.org/api/
Comprehensive guide to fs/promises, process.argv, URL and path utilities, ESM behaviors, and global fetch with AbortController. Essential reference for CLI file I/O, module resolution, and HTTP requests. (Node.js v20.4.0)  
## CC BY 4.0

# Node.js ECMAScript Modules (ESM)
## https://nodejs.org/api/esm.html
Details Node.js ESM support including import/export, package scopes, and interoperability with CommonJS. Vital for ensuring reliable dynamic imports and module resolution in this ESM-based CLI. (Node.js v20.4.0)  
## CC BY 4.0

# Fetch Standard
## https://fetch.spec.whatwg.org/
Living standard specifying the fetch() API, request/response objects, streaming, and caching behaviors. Authoritative for implementing HTTP requests with proper error handling and abort semantics in the CLI. (WHATWG)  
## WHATWG License

# REST Countries API Documentation
## https://restcountries.com/#api-endpoints-v3-all
Defines endpoints and response schemas for country data (including capitals). Guides pagination, field filters, and error handling for the capital-cities subcommand. (Public domain)  
## Public Domain

# RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format
## https://tools.ietf.org/html/rfc8259
Specifies the JSON grammar, data types, encoding rules, and media type. Ensures that generated JSON-LD output conforms strictly to the JSON standard. (Published December 2017)  
## IETF Trust

# Vitest Automated Testing Framework
## https://vitest.dev/
Vite-native unit testing framework with Jest-compatible API, snapshot and coverage support. Documentation covers mocking, spying, asynchronous tests, and configuration—directly applicable to existing tests in tests/unit. (MIT License)  
## MIT License

# Yargs — CLI Argument Parser
## https://yargs.js.org/docs/
Robust command-line parsing library for Node.js supporting commands, options, and validation. Could streamline manual parsing in main.js and automate help and error messages. Widely adopted and actively maintained.  
## MIT License

# EJS Templating Engine
## https://ejs.co/#docs
Lightweight JavaScript templating language documentation covering syntax, include/partials, filters, and custom delimiters. Useful for generating code samples or documentation templates within docs/ or as CLI output. (Last updated 2023)  
## MIT License

# js-yaml — YAML Parser and Dumper for JavaScript
## https://github.com/nodeca/js-yaml
Documentation on parsing and serializing YAML to JavaScript objects, safe loading, and schema customization. Relevant for future enhancements that read or write YAML configuration files. (Last updated 2024)  
## MIT License

# Minimatch — Glob Matching Library
## https://github.com/isaacs/minimatch
Docs for glob pattern matching, option flags (nocase, dot), and pattern negation. Provides utility for file globbing or filtering operations in CLI features. (Last updated 2024)  
## MIT License

# dotenv — Environment Variable Loader
## https://github.com/motdotla/dotenv
Documentation on loading environment variables from .env files, variable expansion, and configuration options. Useful for managing API keys or configuration in future CLI extensions. (Last updated 2024)  
## BSD-2-Clause

# OpenAI Node.js SDK
## https://github.com/openai/openai-node
Official SDK documentation describing authentication, request/response patterns, streaming completions, and configuration. Relevant for potential AI-driven extensions or example integrations in the CLI. (Last updated 2024)  
## MIT License

# JSON Data Query and Pointer Standards
## JSON Pointer (RFC 6901): https://tools.ietf.org/html/rfc6901
## JSONPath Reference: https://goessner.net/articles/JsonPath/
## JMESPath Specification: http://jmespath.org/specification.html
Covers JSON Pointer syntax for exact location targeting, JSONPath for path-based queries with wildcards, and JMESPath for functional query expressions. Guides implementation of filter, get-term, and potential advanced querying subcommands. (Published April 2013; JSONPath informal, JMESPath updated 2022)  
## Mix of IETF Trust / Public Domain / MIT License