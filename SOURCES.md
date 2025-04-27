# W3C OWL 2 Web Ontology Language Document Overview

## https://www.w3.org/TR/owl2-overview/
The OWL 2 Overview is the definitive W3C Recommendation covering OWL 2 ontology constructs—classes, properties, individuals, datatypes, and axioms—alongside RDF-based serializations. It provides formal semantics, conformance criteria, and code examples for authoring and validating OWL 2 ontologies. This source is essential for ensuring compliance with the latest standard, guiding the transformation of ontology models to JSON-LD representations with precise vocabulary mappings. (Last updated 27 October 2009; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# W3C RDF 1.1 Concepts and Abstract Syntax

## https://www.w3.org/TR/rdf11-concepts/
This W3C Recommendation defines the RDF 1.1 data model—IRIs, literals, blank nodes, triples, and graphs—along with the abstract syntax for Turtle, RDF/XML, and JSON-LD. It details parsing, serialization, and formal semantics that underpin all RDF-based tooling. Crucial for constructing, validating, and traversing RDF graphs before any OWL transformations or JSON-LD processing. (Last updated 25 February 2014; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1: A JSON-Based Serialization for Linked Data

## https://www.w3.org/TR/json-ld11/
This W3C Recommendation specifies JSON-LD 1.1 framing, compaction, expansion, and context processing algorithms for mapping JSON documents to RDF graphs and vice versa. It covers error handling, extension points, and embedding strategies, providing best practices to minimize round-trip overhead in semantic pipelines. Essential for ingesting external data and emitting compliant JSON-LD within OWL builder workflows. (Last updated 16 May 2020; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 API

## https://www.w3.org/TR/json-ld11-api/
The JSON-LD 1.1 API specification details programmatic interfaces—JavaScript APIs and algorithmic pseudocode—for processing JSON-LD documents: compaction, expansion, framing, normalization, and RDF conversion. It provides implementation guidelines and error diagnostics for library authors. Critical for integrating JSON-LD processing directly into Node.js modules with predictable behavior and extension hooks. (Last updated 29 May 2020; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# SPARQL 1.1: Query Language, Protocol, Update, and Graph Store HTTP

## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
This combined SPARQL 1.1 suite includes:
- **Query Language (Overview)**: SELECT, ASK, CONSTRUCT, DESCRIBE, federation, and aggregation syntax.
- **Protocol**: HTTP GET/POST request formats, URL parameters, content negotiation, error handling for remote query and update endpoints.
- **Update**: INSERT/DELETE operations, graph targeting, transactions, and error semantics.
- **Graph Store HTTP**: RESTful HTTP operations for creating, reading, updating, and deleting RDF graphs.
The description incorporates public endpoint best practices (DBpedia, Wikidata), HTTP parameter tuning, rate-limit handling, and efficient result parsing. Essential for building robust SPARQL clients, servers, and federated query pipelines. (All last updated 21 March 2013; authoritative as W3C Recommendations.)

## License
W3C Document License (CC-BY 4.0)

# Apache Jena Fuseki Documentation

## https://jena.apache.org/documentation/fuseki2/
The official guide to configuring and using Apache Jena Fuseki—an open source SPARQL server over TDB2—covers dataset management, SPARQL query/update endpoints, transaction handling, security (authentication, CORS), performance tuning, and metrics. Provides concrete curl examples and HTTP request patterns for integrating Fuseki into data ingestion, health-check, and OWL builder pipelines. (Tested with Fuseki 4.7.0; authoritative as project documentation.)

## License
Apache License 2.0

# W3C Shapes Constraint Language (SHACL)

## https://www.w3.org/TR/shacl/
SHACL defines a declarative language for validating RDF graphs against a set of shapes (node and property constraints). The spec covers core constraint components, SHACL-SPARQL extensions for custom rules, target declarations, and validation result structures. Vital for verifying the structural integrity and semantic consistency of generated OWL ontologies before publication. (Last updated 20 July 2017; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# Node.js Core APIs: HTTP, File System, and Fetch

## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/globals.html#fetch
Official Node.js v20 documentation for core modules used in `owl-builder`:
- **HTTP**: `http.createServer`, routing strategies, headers, status codes—building RESTful and SPARQL endpoints.
- **FS**: synchronous file and directory operations (`fs.existsSync`, `fs.mkdirSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.writeFileSync`) essential for CLI commands like `--build-intermediate`, `--merge-persist`, and `--refresh`.
- **Fetch**: Standardized global `fetch` API for HTTP GET/HEAD requests, JSON parsing, and error handling. Delivers actionable patterns for data retrieval, health checks, and integration with SPARQL endpoints. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)

## License
OpenJS Foundation and contributors, MIT License