# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core RDF-based data model, context definitions, term mapping, data coercion rules, and processing algorithms—expand, compact, flatten, frame, and toRDF. It details error handling, framing, normalization, and canonicalization strategies, crucial for implementing `--refresh`, `--merge-persist`, and `--query` features. Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
A concise introduction to OWL 2 covering its profiles (EL, QL, RL), core constructs (Classes, ObjectProperty, DatatypeProperty), and syntax mappings (RDF/XML, Functional, Manchester). Guides design of `@context` definitions and interpretation of axioms when transforming JSON inputs into OWL in the `--refresh` workflow. Last Updated: 11 December 2012. Authoritative W3C Recommendation.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
Defines syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF. Covers graph patterns, property paths, filters, aggregates, solution modifiers, and algebraic operators. Foundational for implementing the `--query` feature with SPARQL.js and N3.Store. Last Updated: 21 March 2013. Highly authoritative W3C Recommendation.
## CC0 1.0 Universal

# RDF 1.1 and RDF/XML Specifications
## https://www.w3.org/TR/rdf11-concepts/
Describes the abstract syntax and data model of RDF 1.1, including IRIs, literals, blank nodes, triples, and graphs. Clarifies mapping from JSON-LD to RDF triples essential for graph merging and normalization.
## https://www.w3.org/TR/n-quads/
Specifies the N-Quads plain text serialization for RDF datasets, including ordering, line-based parsing rules, and canonical ordering—critical for implementing jsonld.toRDF outputs and consistent serialization in `--export-format nquads`.
## https://www.w3.org/TR/turtle/
Outlines the Turtle syntax for RDF graphs, including prefixes, shorthand properties, and collections. Enables serialization of N-Quads into user-friendly Turtle in the `--export-format turtle` workflow.
## https://www.w3.org/TR/rdf-syntax-grammar/
Defines the RDF/XML syntax for serializing RDF graphs in XML format. Covers element rules, QName resolution, collections, and containers—essential for implementing `--export-format rdfxml`.
## W3C Document License

# JavaScript RDF & SPARQL Libraries
## https://www.npmjs.com/package/n3
N3.js provides parsing and serializing of RDF in N-Triples, N-Quads, Turtle, and TriG, alongside an in-memory N3.Store and streaming parsers/writers. Powers efficient RDF handling in `--refresh`, `--export-format`, and `--query` workflows. Last Published: current.
## MIT

## https://www.npmjs.com/package/sparqljs
SPARQL.js parses SPARQL 1.1 queries into abstract syntax trees, facilitating in-process query execution and validation of SELECT and ASK operations. Last Published: current.
## MIT

## https://comunica.dev/docs/query/quickstart/
The Comunica SPARQL query engine for JavaScript offers a modular approach to execute SPARQL queries over heterogeneous RDF sources, including quads, HTTP endpoints, and file stores. Demonstrates integrations with N3.Store and advanced querying over combined datasets. Provides actionable examples and performance considerations. Last Updated: 2024.
## MIT

# jsonld.js JavaScript Library
## https://www.npmjs.com/package/jsonld
Digital Bazaar’s jsonld.js offers a complete JSON-LD API implementation for expand, compact, flatten, frame, and toRDF. Integrates with Node.js, supports datatypes and normalization—core to `--refresh` and `--merge-persist`. Last Published: 2024.
## MIT

# Node.js HTTP and File System API Reference
## https://nodejs.org/api/http.html
Comprehensive docs for the built-in HTTP module, including server creation, routing, streams, and request/response handling. Underpins the `--serve` REST API endpoints and streaming results. Last Reviewed: 2024.
## CC BY-SA 3.0

## https://nodejs.org/api/fs.html#fs_fs_promises_api
Details the fs/promises API for asynchronous file operations, essential for reading and writing ontology files in `--refresh`, `--merge-persist`, and `--export-format` flows. Last Reviewed: 2024.
## CC BY-SA 3.0

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
Public JSON API delivering country data (names, ISO codes, capitals, regions, populations). The `/v3.1/all` endpoint returns arrays ideal for `--capital-cities`. Includes parameters, response schemas, and examples. Last Reviewed: 2024.
## CC0 1.0 Universal