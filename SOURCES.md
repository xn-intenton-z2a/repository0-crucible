# W3C OWL 2 Web Ontology Language Document Overview

## https://www.w3.org/TR/owl2-overview/
The OWL 2 Overview is the definitive W3C Recommendation detailing the OWL 2 ontology language constructs—classes, properties, individuals, datatypes, axioms, and RDF-based serializations. It provides formal semantics, conformance criteria, and programmatic examples for authoring and validating OWL 2 ontologies. This source ensures compliance with the latest standard and deep understanding of core modeling constructs essential for transformations into JSON-LD. (Last updated 27 October 2009; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# W3C RDF 1.1 Concepts and Abstract Syntax

## https://www.w3.org/TR/rdf11-concepts/
Defines the RDF 1.1 data model—IRIs, literals, blank nodes, triples, and graphs—along with canonical parsing and serialization forms (Turtle, RDF/XML, JSON-LD). It presents the abstract syntax and formal semantics underpinning all RDF-based tooling, ensuring interoperability. Crucial for building and validating RDF graphs prior to OWL transformation. (Last updated 25 February 2014; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1: A JSON-Based Serialization for Linked Data

## https://www.w3.org/TR/json-ld11/
Covers JSON-LD framing, compaction, expansion, and context processing to map JSON documents to RDF graphs. Describes processing algorithms, error handling, extension points, and best practices for embedding and extracting linked data. Critical for ingesting and emitting JSON-LD in OWL pipelines with minimal overhead. (Last updated 16 May 2020; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Query Language

## https://www.w3.org/TR/sparql11-query/
Specifies SPARQL 1.1 query forms (SELECT, ASK, CONSTRUCT, DESCRIBE), aggregation, subqueries, property paths, federation, and update operations. Defines grammar, evaluation semantics, optimization considerations, and result formats. Indispensable for executing complex graph queries and mutating RDF datasets or OWL ontologies. (Last updated 21 March 2013; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# RDFJS Data Model Specification

## https://rdf.js.org/data-model-spec/
Defines JavaScript interfaces for core RDF entities—Term, NamedNode, Literal, BlankNode, DefaultGraph, Quad, Dataset, Graph—specifying methods and properties required for RDFJS-compliant libraries. Ensures interoperability across popular JS RDF tooling (e.g., rdflib.js, Comunica). Fundamental for in-memory graph manipulations, serialization, and streaming in node-based pipelines. (Last updated 2017; authoritative as the de facto community specification.)

## License
CC0 1.0 Universal

# SPARQL 1.1 Protocol for RDF

## https://www.w3.org/TR/rdf-sparql-protocol/
Details the SPARQL Protocol for RDF over HTTP, including request methods (GET/POST), query and update operation endpoints, result format negotiation, error codes, and HTTP headers. Provides examples of parameterized requests, content-type negotiation, and best practices for client-server interactions. Essential for implementing robust fetch-based SPARQL clients and middleware. (Last updated 21 March 2013; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# Apache Jena Fuseki Documentation

## https://jena.apache.org/documentation/fuseki2/
Official guide to configuring and using Apache Jena Fuseki—a SPARQL server with RESTful endpoints over TDB2. Covers server setup, dataset management, SPARQL query and update endpoints, transaction handling, CORS, security, metrics, and performance tuning. Provides concrete examples (curl, HTTP requests) for integrating Fuseki into data ingestion and OWL-building pipelines. (Last reviewed with Fuseki 4.7.0; authoritative as the official project documentation.)

## License
Apache License 2.0

# DBpedia SPARQL Endpoint Documentation

## https://wiki.dbpedia.org/online-access
Outlines access to DBpedia’s public SPARQL endpoint (`https://dbpedia.org/sparql`), including query URL syntax, HTTP parameters (`query`, `default-graph-uri`, `timeout`, `format`), supported result formats (JSON, XML, CSV), CORS policies, rate limits, and efficient querying practices. Provides troubleshooting tips and examples directly supporting the `--capital-cities` feature. (Last reviewed 2023; authoritative as official DBpedia community documentation.)

## License
Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)