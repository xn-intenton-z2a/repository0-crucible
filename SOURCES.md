# W3C RDF 1.1, OWL 2 Profiles & Semantics

## https://www.w3.org/TR/owl2-overview/

This consolidated source provides the high-level overview of the OWL 2 Web Ontology Language, linked to all foundational W3C Recommendations: RDF 1.1 Concepts & Abstract Syntax, OWL 2 Ontology Profiles (DL, EL, QL, RL), OWL 2 Structural Specification, OWL 2 Direct Semantics, and OWL 2 Mapping to RDF Graphs. It underpins context management, framing, reasoning, consistency checking, normalization, and serialization in the ontology build pipeline by defining graph modeling semantics, profile conformance, formal semantics, and RDF mapping. Last updated December 2012 for OWL 2; RDF 1.1 parts last updated June 2014. Authoritative W3C Recommendation.

## License if known

W3C Document License (CC-BY 4.0)

# W3C JSON-LD 1.1 Core, API & Processing Algorithms

## https://www.w3.org/TR/json-ld11/

This source provides the W3C Recommendation for JSON-LD 1.1 Core Processing Algorithms, Data Model, Syntax, and JSON-LD API for programmatic manipulation (compact, expand, flatten, frame). It defines context handling, framing semantics, and RDF conversion critical for JSON-LD operations in this repository. Last updated June 2020 (Core) and January 2022 (API). Authoritative W3C Recommendation.

## License if known

W3C Document License (CC-BY 4.0)

# Linked Data Best Practices & Hypermedia Vocabulary

## https://www.w3.org/TR/ld-bp/

Comprehensive guidelines for publishing and consuming HTTP-based Linked Data, covering IRI design, content negotiation, pagination, versioning, caching, and discoverability. Includes the Linked Data Platform (LDP 1.0) container semantics and Hydra Core Vocabulary (CC0) for hypermedia-driven REST APIs over RDF, directly informing endpoint schemes, HTTP methods, headers, and client navigation strategies. Last updated September 2020. Authoritative W3C Recommendation and Community Vocabulary.

## License if known

W3C Document License (CC-BY 4.0); CC0/Public Domain

# JavaScript Libraries & RDFJS Specifications

## https://github.com/colinhacks/zod#readme

A unified reference for runtime schema validation (Zod 3.x), W3C SHACL (July 2023) and ShEx (February 2023) shape definitions, the RDFJS data model and stream-processing specifications, the OWL manipulation toolkit (owljs), and the official JSON-LD JavaScript API implementation (jsonld.js). Provides type-safe parsing, streaming graph transformations, framing, validation, and ontology manipulation in browser and Node.js environments. Last updated June 2024. Maintained by open-source communities under MIT, CC0, and W3C licenses.

## License if known

MIT; CC0/Public Domain; W3C Document License (CC-BY 4.0)

# SPARQL Engines, Triplestores & HTTP APIs

## https://www.w3.org/TR/sparql11-overview/

This unified source consolidates W3C SPARQL 1.1 specifications (Query, Update, Protocol) and standard RDF serializations (Turtle, N-Quads), with implementation guidance for Apache Jena (SPARQL & RIOT), Eclipse RDF4J, and modular engines like Comunica (QueryEngine API). It also covers HTTP-based SPARQL endpoints, RESTful transaction management, configuration, optimization strategies, and security practices for production-grade integrations. Published 2013–2024. Authoritative W3C Recommendations and community implementations.

## License if known

W3C Document License (CC-BY 4.0); Apache 2.0; MIT; Eclipse Public License 2.0

# RDF Graph Shape Validation Standards: SHACL & ShEx

## https://www.w3.org/TR/shacl/

This source covers the W3C SHACL Recommendation for RDF graph validation—defining core shapes, property constraints, targets, and SPARQL-based extensions—and the community-driven Shape Expressions (ShEx) grammar for high-performance shape definitions and streaming validation. Essential for enforcing graph integrity and declarative validation in ontology pipelines. Last updated July 2023 (SHACL) and February 2023 (ShEx).

## License if known

W3C Document License (CC-BY 4.0); CC0/Public Domain

# Apache Jena Fuseki HTTP SPARQL Endpoint API

## https://jena.apache.org/documentation/fuseki2/fuseki-protocol.html

Provides a detailed HTTP API specification for SPARQL endpoints via Apache Jena Fuseki (v4.x). Covers query execution (GET/POST), update operations, dataset and graph management via the SPARQL Graph Store Protocol, CORS configuration, authentication, error codes, and URL patterns for endpoint administration. Essential for implementing and integrating HTTP-based SPARQL services in server and client modules. Last updated June 2024. Authoritative project documentation.

## License if known

Apache License 2.0

# Comunica Query Engine Documentation

## https://comunica.dev/docs/

Official documentation for Comunica, a modular SPARQL query engine for JavaScript and TypeScript. Includes configuration of actors, mediators, and source definitions; integration of in-memory and HTTP RDF sources; optimization techniques; streaming query results; and API usage patterns for the `QueryEngine` class. Directly informs the repository's programmatic `sparqlQuery` and `getCapitalCities` functions. Last updated April 2024. Maintained under MIT License.

## License if known

MIT