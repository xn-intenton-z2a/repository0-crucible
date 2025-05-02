# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 outlines the data model, processing algorithms, and serialization formats (JSON and JSON-LD) for linked data. It provides detailed information on @context definitions, term expansion, compaction, framing, and @graph management. This is essential for implementing JSON-LD output, ensuring that @context handling in generateOntology aligns with the standard. (Published July 16, 2020)
## W3C Document License

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation introduces the key concepts, constructs, and profiles (OWL 2 DL, EL, QL, RL) of the OWL 2 ontology language. It explains class hierarchies, properties, individuals, and ontology IRI roles. Vital for understanding how to structure the @graph nodes and choose appropriate OWL constructs in the JSON-LD document. (Published October 27, 2009)
## W3C Document License

# OWL 2 Quick Reference
## https://www.w3.org/TR/owl2-quick-reference/
A concise reference sheet of OWL 2 syntax in functional, RDF/XML, and Manchester formats. Includes common vocabulary IRIs (e.g., owl:Class, rdf:Property) and axioms. Helps developers map JavaScript objects to OWL 2 terms when building graph nodes, ensuring correct @id and term properties. (Published October 27, 2009)
## W3C Document License

# JSON-LD Processing Algorithms and API
## https://www.w3.org/TR/json-ld11-api/
Specifies the detailed algorithms for expansion, compaction, flattening, framing, and normalization of JSON-LD documents, along with a high-level API for common operations. Critical for implementing advanced transformations, error handling, and performance optimizations in generateOntology or future framing features. (Published July 9, 2020)
## W3C Document License

# OWL 2 RDF-Based Semantics
## https://www.w3.org/TR/owl2-semantics/
Defines the formal model-theoretic semantics for OWL 2 ontologies expressed in RDF. Provides precise definitions of entailment, interpretation of class and property axioms, and consistency conditions. Valuable for understanding how generated JSON-LD OWL documents will be interpreted by reasoners and for validating semantic correctness. (Published October 27, 2009)
## W3C Document License

# SHACL - Shapes Constraint Language
## https://www.w3.org/TR/shacl/
The official W3C Recommendation for the Shapes Constraint Language (SHACL) defines a standard vocabulary and mechanisms for describing and validating constraints on RDF graphs. Covers node shapes, property shapes, constraints (minCount, datatype, pattern), and validation report structure. Essential for adding validation steps to verify that generated OWL JSON-LD ontologies adhere to defined shapes. (Published October 2017)
## W3C Document License

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
The official W3C recommendation for SPARQL 1.1 outlines syntax and semantics for querying RDF data. Covers SELECT, ASK, CONSTRUCT, DESCRIBE queries, graph pattern matching, federation, and update forms. Essential if the CLI is extended to support querying generated ontologies or validating content against expected patterns. (Published March 21, 2013)
## W3C Document License

# SPARQL 1.1 Graph Store HTTP Protocol
## https://www.w3.org/TR/sparql11-http-rdf-update/
Defines the HTTP protocol for managing RDF graphs via SPARQL endpoints. Includes GET, POST, PUT, DELETE methods, content negotiation, and error handling. Useful for future CLI subcommands that need to publish or update generated ontologies in remote triple stores. (Published March 21, 2013)
## W3C Document License

# SPARQL 1.1 Update
## https://www.w3.org/TR/sparql11-update/
Describes the SPARQL 1.1 Update language, defining operations (INSERT, DELETE, LOAD, CLEAR, CREATE, DROP) for modifying RDF graphs. Provides syntax, semantics, and examples for graph updates. Critical for building CLI features that programmatically alter or synchronize ontologies in triple stores. (Published March 21, 2013)
## W3C Document License

# RDF/JS Specification
## https://rdf.js.org/
Defines standard interfaces for RDF data structures (Term, Quad, Dataset) in JavaScript, enabling interoperability between RDF libraries. Although generateOntology produces JSON-LD objects directly, understanding RDF/JS can guide extension towards streaming data, quad management, or integration with RDF stores. (Latest version 2023)
## CC0

# jsonld.js (JavaScript JSON-LD API)
## https://github.com/digitalbazaar/jsonld.js
An open-source JavaScript library for JSON-LD operations: expansion, compaction, framing, normalization, and more. Offers low-level APIs to manipulate contexts and graphs, with streaming support and promise-based methods. Useful as a reference or fallback for advanced JSON-LD transformations beyond simple @context and @graph generation. (Last updated 2024)
## MIT License

# jsonld-cli (JSON-LD Command-Line Interface)
## https://github.com/digitalbazaar/jsonld-cli
The jsonld-cli package provides a command-line interface for JSON-LD operations (expansion, compaction, framing, normalization), built on top of jsonld.js. Its architecture demonstrates patterns for implementing streaming, modular subcommands, and error handling in a JSON-LD context. Reviewing its implementation guides enhancements to support advanced JSON-LD workflows in this CLI. (Last updated 2024)
## MIT License

# N3.js (RDF/JS N3 Library)
## https://github.com/rdfjs/N3.js
A performant JavaScript library for parsing, serializing, and streaming N3/Turtle RDF formats. Implements the RDF/JS interfaces (Quad, Stream) and provides utilities for transform pipelines. Useful for cases where JSON-LD output must interoperate with N3 stores or when converting between RDF serializations. (Last updated 2024)
## MIT License

# rdflib.js (Linked Data Library for JavaScript)
## https://github.com/linkeddata/rdflib.js
Offers a comprehensive set of RDF tools for parsing, serializing, querying, and persisting linked data in JavaScript. Supports multiple serialization formats (JSON-LD, Turtle, N3), SPARQL updates, and storage backends. Provides real-world patterns for graph manipulation that can inform future enhancements to generateOntology and CLI subcommands. (Last commit 2024)
## MIT License

# Comunica (SPARQL Query Engine for JavaScript)
## https://comunica.dev/docs/query/query-overview/
A modular SPARQL query engine for JavaScript enabling federated query execution over diverse sources (HTTP, local files, RDFJS datasets). Documentation covers engine configuration, supported sources, optimization techniques, and extension points. Valuable reference for implementing on-the-fly querying or validation of JSON-LD OWL outputs. (Latest version 2024)
## MIT License

# Zod Schema Validation
## https://github.com/colinhacks/zod
Zod is a TypeScript-first schema declaration and validation library. The CLI uses Zod to validate subcommand options (e.g., --input, --ontology-iri). Documentation covers schema creation, parsing, async transforms, and custom error formatting—key for robust option handling in the convert, capital-cities, list-terms, and get-term commands. (Last release May 2024)
## MIT License

# Understanding JSON Schema
## https://json-schema.org/understanding-json-schema/
This resource explains the JSON Schema standard with clear examples for object, array, and primitive schemas, including validation keywords, references, and conditional subschemas. Although CLI option validation uses Zod, JSON Schema best practices inform robust schema design, error messaging, and future export of Zod schemas to JSON Schema for interoperability. (Updated July 2024)
## CC0 (Public Domain)

# Node.js Core API
## https://nodejs.org/api/
Comprehensive documentation of Node.js core modules including fs/promises (readFile, writeFile), process (argv, env, exit codes), URL and path utilities (fileURLToPath, URL class, join, dirname, basename), ESM module behaviors (import.meta.url), and the global fetch API with AbortController support. Essential reference for implementing the CLI’s file operations, module resolution, argument parsing, and HTTP requests. (Node.js v20.4.0)
## CC BY 4.0

# Vitest Automated Testing Framework
## https://vitest.dev/
A Vite-native unit test framework with a Jest-compatible API, snapshot testing, and built-in coverage support. Documentation covers mocking, spying (vi.spyOn), asynchronous tests, and configuration. Directly applicable for writing and extending tests under tests/unit and tests/e2e. (MIT License)
## MIT License

# Yargs (CLI Argument Parser)
## https://yargs.js.org/docs/
Yargs is a robust command-line argument parsing library for Node.js. It simplifies the definition of commands, options, and validations, and automatically generates help and error messages. Integrating Yargs could streamline the manual parsing in main.js, improve user experience for convert, capital-cities, list-terms, and get-term subcommands, and facilitate future command extensions with built-in middleware and localization support. (Active project, widely adopted in the Node.js ecosystem)
## MIT License

# REST Countries API Documentation
## https://restcountries.com/#api-endpoints-v3-all
Provides endpoint definitions and response schemas for fetching country data, including capitals. The capital-cities subcommand relies on this API. Understanding pagination, field filters, and error responses helps build resilient fetch logic and robust error handling. (Public domain)
## Public Domain

# RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format
## https://tools.ietf.org/html/rfc8259
Defines the JSON data interchange format, covering its grammar, data types, encoding (UTF-8), and media type registration. Essential for ensuring that generated JSON-LD outputs strictly conform to the JSON standard, enabling interoperability with JSON parsers and tooling. (IETF Trust)
## IETF Trust

# Commander.js
## https://github.com/tj/commander.js
A comprehensive Node.js framework for building command-line interfaces, supporting command definitions, nested subcommands, option parsing, version management, and automatic help generation. Commander.js offers an alternative to manual parsing and demonstrates structured CLI architecture that could be adopted to simplify main.js and enhance maintainability. (MIT License)
## MIT License