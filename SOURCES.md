# W3C OWL 2 Web Ontology Language Document Overview
## https://www.w3.org/TR/owl2-overview/
The OWL 2 Overview provides a high-level introduction to the concepts, profiles (OWL 2 EL/RL/QC/DL), and use cases for building ontologies on the Web. It outlines practical modeling patterns (e.g., class axioms, property restrictions) and explains core reasoning tasks such as consistency checking and classification. This document is essential for understanding which OWL profile best matches your performance and reasoning requirements during ontology generation in `owl-builder`.
Last updated: December 2012. Authoritative as the W3C recommendation process ensures broad community review.
## W3C Software and Document License

# W3C OWL 2 Structural Specification and Functional-Style Syntax
## https://www.w3.org/TR/owl2-syntax/
This specification defines the abstract syntax, functional-style notation, and concrete grammar for OWL 2 ontologies. It provides detailed grammar productions, serialization rules, and mapping to RDF, enabling precise generation and parsing of OWL constructs in JSON form. Key sections describe restrictions for profiles and explain how to convert between RDF/XML, Turtle, and functional syntax.
Last updated: December 2012. Full normative specification from the W3C.
## W3C Software and Document License

# W3C RDF 1.1 Primer
## https://www.w3.org/TR/rdf11-primer/
An accessible guide to RDF 1.1 data model, serialization syntaxes (Turtle, JSON-LD), and best practices for linked data. It includes practical examples for expressing graphs, IRIs, literals, and blank nodes, crucial for transforming JSON objects into RDF triples or reading linked data from web APIs.
Last updated: March 2014. Authoritative entry point for RDF concepts.
## W3C Software and Document License

# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The definitive guide to JSON-LD 1.1, covering context definitions, framing, compaction, expansion, and API design. It includes code samples for embedding linked data in JSON and guidelines for custom context setup—critical for producing compact, interoperable JSON representations of OWL ontologies.
Last updated: July 2019. W3C Recommendation.
## W3C Software and Document License

# Wikidata REST API
## https://www.wikidata.org/w/api.php
A comprehensive reference for the MediaWiki‐based REST API powering Wikidata. It details query modules (action=query), entity content endpoints (action=wbgetentities), parameterization for languages and revisions, and paging options. This source is crucial for crawling rich entity data (labels, statements) and converting them into OWL individuals or annotation properties.
Last known update: continuously maintained by Wikimedia. Public domain.
## Public Domain

# Wikidata SPARQL Endpoint
## https://query.wikidata.org/
Documentation of the SPARQL endpoint with example queries, result formats (JSON, XML, CSV), rate limits, and service description. It offers templated examples for retrieving class hierarchies, property usage, and qualifiers—key techniques for building ontology imports and schema alignment in `owl-builder`.
Last updated: ongoing. Community‐verified endpoint documentation.
## Public Domain

# Apache Jena Documentation
## https://jena.apache.org/documentation/
Covers the Jena API for Java-based RDF processing, SPARQL engine (ARQ), ontology API, and command‐line tools (riot, tdbloader). Though Java-centric, this documentation provides insight into common RDF processing pipelines, reasoning configurations (OWL Miner), and tuning SPARQL performance—guidance translatable to JS-based tooling.
Last updated: 2023.
## Apache-2.0

# rdflib.js Documentation
## https://linkeddata.github.io/rdflib.js/doc/index.html
Official API reference for rdflib.js, covering graph manipulation, fetcher for HTTP‐based RDF acquisition, parsers/serializers for Turtle, RDF/XML, and JSON-LD, as well as query interfaces. Demonstrates how to load remote ontologies, perform in-memory reasoning, and serialize graphs—directly applicable patterns for `owl-builder` implementations.
Last updated: 2022.
## MIT

# N3.js Documentation
## https://n3.js.org/
Documentation for the N3.js library, including the N3Parser, N3Writer, and N3.Store. It provides performance benchmarks, streaming API usage, and examples for handling large RDF datasets in Node.js—essential for efficient crawling and conversion pipelines.
Last updated: 2021.
## MIT

# OGC API - Features
## https://ogcapi.ogc.org/features/
The Open Geospatial Consortium's OGC API – Features standard defines RESTful endpoints for geographic feature retrieval. It specifies GeoJSON responses, paging, filtering, and coordinate reference system support. This is a high-value pattern for integrating spatial datasets into OWL ontologies (e.g., capital cities example) through an API-first approach.
Last updated: 2022.
## CC-BY 4.0

# DBpedia SPARQL Endpoint
## https://dbpedia.org/sparql
Endpoint documentation with usage guidelines, sample queries for class and property extraction, and details on dataset coverage and update frequency. DBpedia offers structured knowledge extracted from Wikipedia that can seed ontology classes and instances, complementing OWL creation workflows.
Last updated: 2023.
## CC-BY-SA 3.0

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
The SPARQL 1.1 Query Language specification defines syntax and semantics for querying RDF graphs. It provides comprehensive guidance on query forms (SELECT, ASK, CONSTRUCT, DESCRIBE), solution modifiers (ORDER BY, LIMIT), subqueries, aggregates, and property paths. This source is critical for implementing query capabilities over generated OWL ontologies stored as RDF or JSON representations, enabling extraction of class hierarchies, instance retrieval, and inference-driven queries within `owl-builder`.
Last updated: March 2013. W3C Recommendation; normative reference for query engine compliance.
## W3C Software and Document License

# SPARQL 1.1 Update
## https://www.w3.org/TR/sparql11-update/
Defines the syntax and semantics for updating RDF graphs, including INSERT, DELETE, and combined operations within SPARQL Update requests. It is indispensable for implementing mutation operations on OWL ontologies exposed via a SPARQL endpoint or used in local graph stores, allowing incremental ontology evolution and annotation.
Last updated: March 2013. W3C Recommendation.
## W3C Software and Document License

# SPARQL 1.1 Protocol
## https://www.w3.org/TR/sparql11-protocol/
Specifies the HTTP-based protocol for executing SPARQL queries and updates over the web. It outlines request/response formats, content negotiation, and error handling, which is key for integrating remote SPARQL services into `owl-builder` workflows and ensuring interoperability with standard-compliant endpoints.
Last updated: March 2013. W3C Recommendation.
## W3C Software and Document License

# SPARQL 1.1 Service Description
## https://www.w3.org/TR/sparql11-service-description/
Describes how SPARQL endpoints can advertise their capabilities, supported features, and dataset metadata using RDF vocabulary. Leveraging service descriptions allows `owl-builder` to dynamically adapt to endpoint limits, supported query forms, and default dataset selections, improving resilience and configurability.
Last updated: March 2013. W3C Recommendation.
## W3C Software and Document License

# OWL 2 RDF-Based Semantics
## https://www.w3.org/TR/owl2-rdf-based-semantics/
Provides the formal semantics for OWL 2 ontologies when serialized as RDF graphs. It defines interpretation functions, entailment regimes, and semantic conditions for class and property axioms, enabling `owl-builder` to validate ontology correctness and support custom reasoning workflows based on RDF entailment.
Last updated: December 2012. W3C Recommendation.
## W3C Software and Document License

# RDF Schema 1.1
## https://www.w3.org/TR/rdf-schema/
Defines the RDF Schema (RDFS) vocabulary for basic ontological modeling, including classes, properties, and hierarchies. Understanding RDFS is fundamental for extending OWL ontologies with lightweight schema constructs and interoperability with non-OWL datasets in `owl-builder`.
Last updated: April 2014. W3C Recommendation.
## W3C Software and Document License

# SHACL - Shapes Constraint Language
## https://www.w3.org/TR/shacl/
Specifies a language for validating RDF graphs against shapes (constraints). SHACL shapes can enforce cardinalities, datatype constraints, and value ranges on OWL individuals and properties, offering a pragmatic approach to data quality assurance in ontologies generated or consumed by `owl-builder`.
Last updated: October 2017. W3C Recommendation.
## W3C Software and Document License

# RDF-Star
## https://www.w3.org/TR/rdf-star/
Introduces RDF-Star, an extension of RDF that allows triples to be treated as first-class subjects for annotations. This emerging standard supports provenance and metadata modeling on statements, which can be leveraged in `owl-builder` for annotating ontology axioms and data transformations.
Last updated: October 2021. W3C Note.
## W3C Software and Document License

# Hydra Core Vocabulary
## https://www.hydra-cg.com/spec/latest/core/
Defines a hypermedia-driven vocabulary for building REST APIs on top of JSON-LD. It outlines classes and properties for operations, resources, and collections—useful for designing hypermedia interfaces to browse, query, and mutate OWL ontologies managed by `owl-builder` over HTTP.
Last updated: February 2021. CC-BY 4.0.
## CC-BY 4.0

# Comunica Query Engine
## https://comunica.dev/docs/
Documentation for Comunica, a modular SPARQL query engine for JavaScript that can query over various RDF sources (HTTP, file, in-memory) and federation setups. It provides tutorials for constructing engine configurations, optimizing query plans, and extending with custom actors—ideal for embedding high-performance querying within `owl-builder` workflows.
Last updated: 2023. MIT License.
## MIT

# JSON-LD API (Core Algorithms)
## https://json-ld.org/spec/latest/json-ld-api/
The JSON-LD API specification defines the core algorithms and HTTP conventions for JSON-LD processing, including compaction, expansion, framing, normalization, as well as conversion between RDF and JSON-LD. It details algorithmic steps, error handling, and HTTP content negotiation patterns for JSON-LD, which are directly relevant to implementing the `compact`, `expand`, and `generateOntology` functions in `owl-builder`.
Last updated: January 2020. Authoritative as the W3C Recommendation for JSON-LD processing algorithms.
## CC-BY 4.0

# JSON-LD JavaScript Implementation (jsonld.js)
## https://github.com/digitalbazaar/jsonld.js/
The `jsonld.js` library documentation provides an API reference and usage examples for the official JavaScript implementation of JSON-LD 1.1. It covers asynchronous functions for compaction, expansion, framing, normalization, and RDF dataset conversion, along with context handling and custom document loaders—perfect for integrating into the `owl-builder` library and CLI.
Last updated: 2023. Licensed under MIT.
## MIT

# RDFJS Data Model Specification
## https://rdf.js.org/data-model-spec/
This specification defines standard interfaces for RDF Terms (NamedNode, BlankNode, Literal), Quads, and Datasets in JavaScript. It provides TypeScript definitions and usage patterns ensuring interoperability between RDF libraries, which guides consistent graph construction and serialization workflows in `owl-builder`.
Last updated: 2017. Community-maintained standard.
## CC-BY 4.0

# RDFJS Query Interface Specification
## https://rdf.js.org/query/spec/
The RDFJS Query Specification outlines an abstract query interface for RDF datasets in JavaScript, including asynchronous iteration and promise-based patterns for `match`, `find`, and `reduce` operations. These interfaces inform the design of in-memory querying capabilities when working with parsed OWL ontologies.
Last updated: 2017. Community-maintained standard.
## CC-BY 4.0

# JSON-LD Streaming Parser
## https://github.com/rubensworks/jsonld-streaming-parser.js
This library parses streaming JSON-LD inputs using a pull-based SAX-style API to handle large datasets without loading entire documents into memory. Documentation includes API usage, event streams for triples and quads, and examples for integration with Node.js streams—a key resource for building scalable crawling and transformation pipelines in `owl-builder`.
Last updated: 2022. Licensed under MIT.
## MIT

# Node.js Stream API
## https://nodejs.org/api/stream.html
The Node.js Stream API documentation covers the design and usage of readable, writable, duplex, and transform streams. It provides essential patterns for processing standard input (`process.stdin`) and output (`process.stdout`) in a CLI context, enabling streaming large JSON-LD payloads and efficient file handling in `owl-builder`.
Last updated: v20.5.1 (May 2024). Authoritative from Node.js Foundation.
## Node.js Foundation License

# Commander.js CLI Framework
## https://github.com/tj/commander.js
Commander.js documentation describes a mature API for building feature-rich command-line interfaces in Node.js, including option parsing, subcommands, and automatic help generation. This source offers practical guidance to implement the `--compact`, `--expand`, `--to-owl`, and other CLI flags defined for `owl-builder`.
Last updated: 2024. Licensed under MIT.
## MIT

# ES Modules in Node.js
## https://nodejs.org/api/esm.html
The Node.js ESM documentation explains how to use ECMAScript modules natively, covering import/export semantics, module resolution, file extension requirements, and interoperability with CommonJS. Understanding these details is critical for maintaining the ESM-based codebase of `owl-builder`.
Last updated: v20.5.1 (May 2024). Authoritative from Node.js Foundation.
## Node.js Foundation License