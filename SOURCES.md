# W3C OWL 2 Web Ontology Language Document Overview

## https://www.w3.org/TR/owl2-overview/
The OWL 2 Overview is the definitive W3C Recommendation for OWL 2, detailing classes, properties, individuals, datatypes, axioms, profiles, and RDF-based serializations. It includes formal semantics, conformance criteria, and programmatic examples for authoring and validating OWL 2 ontologies. Essential for ensuring compliance with the latest OWL 2 standard and understanding core modeling constructs. (Last updated 27 October 2009; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# W3C RDF 1.1 Concepts and Abstract Syntax

## https://www.w3.org/TR/rdf11-concepts/
Defines the RDF 1.1 data model: IRIs, literals, blank nodes, triples, and graphs, along with canonical parsing and serialization forms (Turtle, RDF/XML, JSON-LD). Provides the abstract syntax and formal semantics that underpin RDF-based tools and frameworks, ensuring interoperability across implementations. (Last updated 25 February 2014; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1: A JSON-Based Serialization for Linked Data

## https://www.w3.org/TR/json-ld11/
Covers JSON-LD framing, compaction, expansion, and context processing to map JSON documents to RDF graphs. Describes the processing algorithms, error handling, extension points, and best practices for embedding linked data in web applications. Critical for ingesting and emitting JSON-LD in OWL builder pipelines with minimal overhead. (Last updated 16 May 2020; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Query Language

## https://www.w3.org/TR/sparql11-query/
Specifies SPARQL 1.1 query forms (SELECT, ASK, CONSTRUCT, DESCRIBE), aggregation, subqueries, property paths, federation, and update operations. Defines the grammar, evaluation semantics, optimization considerations, and result formats. Indispensable for executing complex graph queries and mutating RDF datasets or OWL ontologies. (Last updated 21 March 2013; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# RDFJS Data Model Specification

## https://rdf.js.org/data-model-spec/
The RDFJS Data Model Specification defines the interfaces for core RDF entities such as Term, NamedNode, Literal, BlankNode, Variable, DefaultGraph, Quad, Dataset, and Graph. It outlines methods and properties required for RDFJS-compliant libraries, ensuring interoperability between different JavaScript RDF tooling (e.g., rdflib.js, Comunica). Fundamental for implementing in-memory graph manipulations, serialization, and streaming data across RDFJS ecosystems. (Last updated 2017; authoritative as the de facto community specification for JavaScript RDF interfaces.)

## License
CC0 1.0 Universal

# SHACL 1.1 - Shapes Constraint Language

## https://www.w3.org/TR/shacl/
The SHACL specification provides a language for validating RDF graphs against a set of conditions called shapes. It details shape definitions, constraint components, validation result structures, and recommendations for extensibility. Vital for enforcing schema-level constraints and quality checks on both input data and generated OWL ontologies. (Last updated 17 July 2017; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# DBpedia SPARQL Endpoint Documentation

## https://wiki.dbpedia.org/online-access
This page outlines how to access DBpedia's SPARQL endpoint, including endpoint URL configurations, query parameters (`query`, `default-graph-uri`, `timeout`, `format`), supported result formats (JSON, XML, CSV), CORS policies, rate limits, and best practices for efficient querying. It provides concrete examples and troubleshooting tips, directly supporting the implementation of the `--capital-cities` feature and other SPARQL-based workflows. (Last reviewed 2023; authoritative as the official DBpedia community documentation.)

## License
Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)

# Eclipse RDF4J HTTP Server REST API

## https://rdf4j.org/documentation/programming/rdf4j-server-rest-api/
The RDF4J HTTP Server REST API documentation covers HTTP endpoints for repository management, SPARQL query and update operations, transaction handling, data import/export (RDF/XML, Turtle, JSON-LD), and security configurations. It includes request/response examples in JSON and XML, HTTP status codes, and performance tuning guidance. Essential for integrating RDF4J triple stores into ingestion pipelines and providing an alternative to Apache Jena Fuseki. (Last reviewed 2023; authoritative as the official Eclipse Foundation documentation.)

## License
Eclipse Public License 2.0