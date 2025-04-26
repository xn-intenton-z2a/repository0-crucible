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

# SPARQL 1.1 Overview

## https://www.w3.org/TR/sparql11-overview/
Provides a comprehensive introduction to SPARQL 1.1, covering the query language, update operations, federation, and the HTTP protocol for querying RDF data. Includes specifications for SELECT, ASK, CONSTRUCT, DESCRIBE forms, aggregation, subqueries, parameterized queries, HTTP GET/POST usage, content negotiation, error handling, and best practices. Essential for implementing both SPARQL clients and servers, and for constructing robust queries within OWL builder pipelines. (Last updated 21 March 2013; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# Apache Jena Fuseki Documentation

## https://jena.apache.org/documentation/fuseki2/
Official guide to configuring and using Apache Jena Fuseki—a SPARQL server with RESTful endpoints over TDB2. Covers server setup, dataset management, SPARQL query and update endpoints, transaction handling, CORS, security, metrics, and performance tuning. Provides concrete curl examples and HTTP request patterns for integrating Fuseki into data ingestion and OWL-building pipelines. (Last reviewed with Fuseki 4.7.0; authoritative as the official project documentation.)

## License
Apache License 2.0

# DBpedia SPARQL Endpoint Documentation

## https://wiki.dbpedia.org/online-access
Outlines access to DBpedia’s public SPARQL endpoint (`https://dbpedia.org/sparql`), including query URL syntax, HTTP parameters (`query`, `default-graph-uri`, `timeout`, `format`), supported result formats (JSON, XML, CSV), CORS policies, rate limits, and efficient querying practices. Provides troubleshooting tips and examples directly supporting the `--capital-cities` feature. (Last reviewed 2023; authoritative as official DBpedia community documentation.)

## License
Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)

# W3C Shapes Constraint Language (SHACL)

## https://www.w3.org/TR/shacl/
Describes the SHACL language for validating RDF graphs against a set of conditions (shapes). Defines shapes graphs, node shapes, property shapes, constraints, targets, and validation results. Includes SHACL Core and SHACL-SPARQL extension for custom constraints. Vital for validating and ensuring the integrity of generated OWL ontologies before publishing or downstream processing. (Last updated 20 July 2017; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# Wikidata Query Service Documentation

## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Help
Provides detailed guidance for using the Wikidata SPARQL endpoint, including service URL (`https://query.wikidata.org/sparql`), HTTP parameters, supported query features (property paths, time-enabled queries, qualifiers), result formats, rate limits, and tips for efficient querying of large datasets. Demonstrates real-world query examples and best practices for federated queries. Serves as a competitor data source and pattern reference for `--capital-cities` and future enrichments. (Last updated 2024; maintained as official community documentation under wiki license.)

## License
Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)