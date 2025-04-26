# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core RDF-based data model, context definitions, term mapping, data coercion rules, and processing algorithms, including expand, compact, flatten, frame, and toRDF operations. It details error‐handling behaviors, the framing and normalization processes, and canonicalization strategies—all critical for implementing robust `--refresh` and `--merge-persist` features and ensuring lossless round‐trip conversions.
Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation provides a concise introduction to OWL 2, covering its three profiles (EL, QL, RL), core constructs (owl:Class, owl:ObjectProperty, data properties), and syntax mappings (RDF/XML, Functional Syntax). It guides designing the standard @context for OWL ontologies and interpreting class/property axioms when transforming JSON data into OWL in the `--refresh` workflow.
Last Updated: 11 December 2012. Authoritative W3C Standard.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
Defines the full syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF datasets. Covers graph patterns, property paths, filters, aggregates, solution modifiers, and algebraic operators—foundational for implementing the `--query` feature with jsonld.toRDF, N3.Store, and SPARQL.js.
Last Updated: 21 March 2013. Highly authoritative W3C Recommendation.
## CC0 1.0 Universal

# JavaScript RDF & SPARQL Libraries
## https://www.npmjs.com/package/n3
N3.js is a high-performance, standards-compliant JavaScript library for parsing and serializing RDF in N-Triples, N-Quads, Turtle, and TriG formats, featuring an in-memory N3.Store for efficient triple storage and streaming parsers/writers. Paired with the SPARQL.js package for parsing SPARQL 1.1 into ASTs, these libraries form the core of in-process SPARQL execution and RDF handling in the `--refresh`, `--merge-persist`, and `--query` workflows.
Last Published: current. MIT License.
## MIT

# jsonld.js JavaScript Library
## https://www.npmjs.com/package/jsonld
Digital Bazaar’s jsonld.js offers a full JavaScript implementation of the JSON-LD API (expand, compact, flatten, frame, toRDF). It integrates seamlessly with Node.js and supports in-memory normalization, RDF conversion, and graph merging—essential for `--refresh` data transformations and deduplication in `--merge-persist`.
Last Published: 2024. MIT License.
## MIT

# Node.js Core API Reference
## https://nodejs.org/api/http.html
Comprehensive documentation for the built-in Node.js HTTP and fs/promises modules. Details creating RESTful servers, routing, request/response handling, stream support, and asynchronous file operations—foundational for implementing the `--serve` API endpoints and reading/writing ontology files on disk.
Current for Node.js v20.x. Authoritative OpenJS Foundation documentation.
## CC BY-SA 3.0

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
Public JSON API delivering detailed country data (names, ISO codes, capitals, regions, populations). The `/v3.1/all` endpoint returns comprehensive arrays ideal for the `--capital-cities` alias and for feeding into the `--refresh` workflow. Includes parameters, response schemas, and usage examples.
Last Reviewed: 2024. Data licensed under CC0.
## CC0 1.0 Universal

# Wikidata SPARQL Query Service User Manual
## https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
A practical guide to crafting SPARQL queries against Wikidata’s RDF service. Covers advanced query patterns, pagination strategies, output formats (JSON, CSV), and performance considerations—directly informing federated query and streaming implementations in the `--query` and `--serve` features.
Continuously maintained. Licensed under CC0.
## CC0 1.0 Universal