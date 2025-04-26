# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core RDF-based data model, context definitions, term mapping, data coercion rules, and processing algorithms, including expand, compact, flatten, frame, and toRDF operations. It details error-handling behaviors, framing, normalization, and canonicalization strategies—critical for implementing robust `--refresh`, `--merge-persist`, and `--query` workflows and ensuring lossless round-trip conversions between JSON and RDF.
Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation provides a concise introduction to OWL 2, covering its three profiles (EL, QL, RL), core constructs (Classes, ObjectProperty, DatatypeProperty), and syntax mappings (RDF/XML, Functional, Manchester). It guides the design of standard @context definitions for OWL ontologies and the interpretation of axioms when transforming JSON inputs into OWL in the `--refresh` workflow.
Last Updated: 11 December 2012. Authoritative W3C Standard.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
Defines the full syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF datasets. Covers graph patterns, property paths, filters, aggregates, solution modifiers, and algebraic operators—foundational for implementing the `--query` feature using jsonld.toRDF, N3.Store, and SPARQL.js to parse and execute queries in-process.
Last Updated: 21 March 2013. Highly authoritative W3C Recommendation.
## CC0 1.0 Universal

# RDF 1.1 Concepts and Abstract Syntax
## https://www.w3.org/TR/rdf11-concepts/
Describes the abstract syntax and data model of RDF 1.1, including terms (IRIs, literals, blank nodes), triples, graphs, and graph merging. Clarifies the mapping from JSON-LD to RDF triples used by jsonld.toRDF and in-memory stores like N3.Store, ensuring correct interpretation of graphs, blank nodes, and datatypes when flattening and deduplicating ontologies.
Last Updated: 25 February 2014. Highly authoritative W3C Recommendation.
## W3C Document License

# JavaScript RDF & SPARQL Libraries
## https://www.npmjs.com/package/n3
N3.js is a high-performance, standards-compliant JavaScript library for parsing and serializing RDF in N-Triples, N-Quads, Turtle, and TriG formats, featuring an in-memory N3.Store for efficient triple storage and streaming parsers/writers. Combined with the SPARQL.js package for parsing SPARQL 1.1 into ASTs, these libraries power in-process SPARQL execution and RDF handling in the `--refresh`, `--merge-persist`, and `--query` workflows.
Last Published: current. MIT License.
## MIT

# jsonld.js JavaScript Library
## https://www.npmjs.com/package/jsonld
Digital Bazaar’s jsonld.js offers a complete JavaScript implementation of the JSON-LD API (expand, compact, flatten, frame, toRDF). It integrates seamlessly with Node.js, supports in-memory normalization, graph merging, and XSD datatype coercion—essential for the `--refresh` transformation pipeline and deduplication in `--merge-persist`.
Last Published: 2024. MIT License.
## MIT

# Node.js Core API Reference
## https://nodejs.org/api/http.html
Comprehensive documentation for the built-in Node.js HTTP and fs/promises modules. Details creating RESTful servers, routing, request/response handling, stream support, and asynchronous file operations—foundational for implementing the `--serve` API endpoints, file I/O in `--refresh` and `--merge-persist`, and handling streaming query results.
Current for Node.js v20.x. Authoritative OpenJS Foundation documentation.
## CC BY-SA 3.0

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
Public JSON API delivering detailed country data (names, ISO codes, capitals, regions, populations). The `/v3.1/all` endpoint returns comprehensive arrays ideal for the `--capital-cities` alias and for feeding dynamic data into the `--refresh` workflow. Includes parameters, response schemas, and practical usage examples.
Last Reviewed: 2024. Data licensed under CC0.
## CC0 1.0 Universal