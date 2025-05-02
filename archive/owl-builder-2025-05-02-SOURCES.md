# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
The W3C OWL 2 Overview specification provides a comprehensive introduction to OWL 2 semantics, syntax, and profiles (EL, QL, RL). It includes concrete examples of class axioms, property restrictions, and profile-specific constraints essential for generating or validating ontologies in any toolchain. Last published December 2012 and maintained by the W3C Semantic Web Activity, it remains authoritative for understanding core OWL constructs and profiles.
## W3C Document License (CC-BY 4.0)

# RDF 1.1 Concepts and Abstract Syntax
## https://www.w3.org/TR/rdf11-concepts/
This W3C Recommendation defines the RDF 1.1 data model with triples, graphs, IRIs, literals, and blank nodes. It is serialization-neutral, making it vital for mapping JSON or JSON-LD inputs into RDF graphs. Published March 2014, it ensures compliance across RDF and OWL serializations and informs the core graph-building routines.
## W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The W3C JSON-LD 1.1 spec covers context syntax, framing, compaction, and expansion algorithms. It offers practical examples for converting JSON payloads into RDF triples and embedding OWL annotations in JSON structures. Updated July 2020, it is the definitive guide for JSON-LD processing.
## W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
SPARQL 1.1 Query defines SELECT, ASK, CONSTRUCT, and DESCRIBE forms, along with aggregates, subqueries, and federated queries. Detailed grammar and examples are essential for implementing and testing SPARQL against OWL-enriched datasets. Published January 2013.
## W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Protocol
## https://www.w3.org/TR/sparql11-protocol/
Specifies HTTP request/response formats, parameter conventions, and error handling for SPARQL queries and updates. Critical for integrating remote SPARQL endpoints into CLI tools and web services. Published March 2013.
## W3C Document License (CC-BY 4.0)

# Turtle RDF Syntax
## https://www.w3.org/TR/turtle/
Defines the human-readable Turtle syntax for RDF graphs, covering prefixes, triples, blank nodes, collections, and literals. Advanced examples (property paths, inline annotations) inform serialization and parsing modules. Published February 2014.
## W3C Document License (CC-BY 4.0)

# SHACL: Shapes Constraint Language
## https://www.w3.org/TR/shacl/
SHACL defines a language to validate RDF graphs against shapes. Node shapes, property shapes, and SPARQL-based constraints are outlined, enabling validation of generated OWL ontologies. Published July 2017.
## W3C Document License (CC-BY 4.0)

# RDFJS Data Model Specification
## https://rdf.js.org/data-model-spec/
Defines standard JavaScript interfaces for RDF terms, quads, and datasets, ensuring interoperability among RDF/JS libraries. Interface definitions and contracts guide implementation of libraries and consumption by the OWL JSON toolchain.
## Community Specification (MIT-like)

# Apache Jena Fuseki Documentation
## https://jena.apache.org/documentation/fuseki2/
Covers installation, configuration, and CLI operations for running a SPARQL server with Jena Fuseki. Includes loading TTL/OWL files, executing updates, and securing endpoints—essential for persisting or querying OWL JSON outputs.
## Apache License 2.0

# DBpedia SPARQL Endpoint
## https://dbpedia.org/sparql
Public SPARQL endpoint exposing structured data from Wikipedia. Demonstrates query patterns for retrieving classes, properties, and entities, enabling enrichment of OWL ontologies. Highlights pagination, timeouts, and optimization techniques. Data licensed under CC BY-SA 3.0.
## Creative Commons Attribution-ShareAlike 3.0

# REST Countries API
## https://restcountries.com/v3.1/all
Provides country data (names, capitals, ISO codes, geospatial data) via HTTPS with CORS. Documentation includes example queries, filtering parameters, and response schemas for rapid prototyping of ontology individuals.
## MIT License

# GeoNames Web Services
## http://www.geonames.org/export/ws-overview.html
Offers RESTful endpoints for geographic information (countries, cities, time zones). Overview explains parameters, rate limits, and response formats—crucial for gazetteer integration. Data under CC BY 4.0.
## Creative Commons Attribution 4.0

# JSON-LD JavaScript Library (jsonld.js)
## https://github.com/digitalbazaar/jsonld.js
Official JSON-LD implementation in JavaScript. Contains API references, usage examples, and context processing routines for expansion, compaction, and framing—key for OWL-aligned JSON-LD transformations.
## MIT License

# N3.js RDF Library
## https://github.com/rdfjs/N3.js
High-performance JavaScript library for RDF parsing and serialization (Turtle, N-Triples, TriG). Streaming interfaces and pattern matching examples for efficient processing of large OWL datasets.
## MIT License

# rdflib.js Linked Data Library
## http://linkeddata.github.io/rdflib.js/docs/
Provides an RDF graph store for browser and Node.js with parsers, serializers, SPARQL querying, patching, and offline stores. Informs design of persistence and query features in OWL JSON.
## MIT License

# OWL API (Java) GitHub Wiki
## https://github.com/owlcs/owlapi/wiki
Detailed tutorials and code snippets for programmatic ontology creation in Java. Covers parsing RDF/XML, manipulating class expressions, and exporting to various syntaxes—valuable for comparative design.
## LGPL 3.0

# OWL 2 Structural Specification and Functional-Style Syntax
## https://www.w3.org/TR/owl2-syntax/
Defines OWL 2 functional syntax with class expressions, property axioms, and annotation structures. Blueprint for parsing or generating OWL textual representations beyond RDF. Published October 2012.
## W3C Document License (CC-BY 4.0)

# OWL 2 Mapping to RDF Graphs
## https://www.w3.org/TR/owl2-mapping-to-rdf/
Describes how OWL axioms and annotations map to RDF triples. Essential for consistent round-tripping between functional syntax, RDF, and JSON-LD. Published December 2012.
## W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Update
## https://www.w3.org/TR/sparql11-update/
Defines SPARQL Update operations (INSERT, DELETE, LOAD) and graph management. Crucial for CLI commands that mutate stored OWL JSON representations via SPARQL endpoints. Published March 2013.
## W3C Document License (CC-BY 4.0)

# OWL2JSON Community Group Report
## https://w3c-lbd-cg.github.io/owl2json/
Proposes a JSON serialization schema for OWL 2 constructs, including ontologies, axioms, and annotations. Provides actionable JSON schema definitions and examples directly informing the OWL JSON format design. Last revised December 2022.
## W3C Document License (CC-BY 4.0)

# OWLReady2 Python Library Documentation
## https://owlready2.readthedocs.io/en/latest/
OWLReady2 offers ontology-oriented programming in Python with inference support. Guides loading, manipulating, and saving OWL ontologies—useful for comparative API design in JavaScript. Updated May 2024.
## LGPL 3.0

# RDFLib Python Library Documentation
## https://rdflib.readthedocs.io/en/stable/
Mature Python implementation for RDF parsing, serialization, and SPARQL querying. Demonstrates modular parser, store, and query engine design for inspiration in structuring JavaScript components. Updated 2024.
## BSD 3-Clause

# RDF-Ext Core Library
## https://github.com/rdf-ext/rdf-ext
Modular JavaScript implementation of RDFJS interfaces. Provides datasets, parsers, serializers, and plugins—exemplifying composable architecture and performance considerations for large-scale RDF processing. Maintained under MIT.
## MIT License

# Eclipse RDF4J Documentation
## https://rdf4j.org/documentation/
Java framework for RDF and Linked Data with SPARQL support. Covers configuration, transactions, and inference—informing backend persistence strategies for OWL JSON outputs. Updated 2023.
## Eclipse Public License 2.0

# Node.js FS Promises API
## https://nodejs.org/api/fs.html#fs_promises_api
Official Node.js documentation for fs.promises, covering asynchronous file operations (read, write, watch). Essential for implementing CLI flags (e.g., --output) that read/write JSON ontology files reliably.
## Node.js Foundation (MIT-like)

# Node.js HTTP Module
## https://nodejs.org/api/http.html
Details server and client HTTP APIs in Node.js, including request/response handling, headers, streams, and error management. Crucial for building built-in HTTP servers or crawlers in the CLI tool.
## Node.js Foundation (MIT-like)

# Axios HTTP Client
## https://axios-http.com/docs/intro
Popular promise-based HTTP client for Node.js and browsers. Features request interception, automatic JSON parsing, and error handling—recommended for interacting with RESTful public data sources.
## MIT License

# Cheerio: jQuery for Server
## https://cheerio.js.org/
Fast, flexible library for server-side HTML parsing and manipulation using jQuery-like syntax. Useful for scraping HTML-based data sources when APIs are unavailable.
## MIT License

# JSON Schema Specification
## https://json-schema.org/specification.html
The IETF JSON Schema specification defines vocabulary and validation rules for JSON documents. Critical for designing and validating JSON schemas for OWL JSON outputs and input transformations. Latest draft.
## CC0 Public Domain

# Linked Data Fragments
## https://linkeddatafragments.org/
Describes a low-cost SPARQL query service delivering RDF data as paginated fragments. Offers actionable insights on balancing server load and client-side processing for federated data access.
## CC0 Public Domain

# GraphDB REST API
## https://docs.ontotext.com/graphdb/cloud/rest_api.html
Ontotext GraphDB REST API documentation for repository management, SPARQL updates, and inference configuration. Provides practical examples for integrating with hosted graph databases.
## Apache License 2.0

# Jena ARQ SPARQL Java API
## https://jena.apache.org/documentation/query/
Covers programmatic SPARQL querying using the ARQ engine in Jena, including QueryExecution, ResultSet handling, and optimization hints. Valuable for designing analogous JavaScript query abstractions.
## Apache License 2.0

# ISO 3166 Country Codes
## https://www.iso.org/iso-3166-country-codes.html
Official reference for ISO 3166 codes (alpha-2, alpha-3, numeric) and country names. Essential for consistent ontology individuals representing countries and capitals.
## Copyright © ISO (information freely available)