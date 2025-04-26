# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core concepts, algorithms, and processing model for representing Linked Data in JSON. This specification provides essential details on @context definitions, term mapping, data coercion, and framing, all critical for transforming arbitrary JSON into valid JSON-LD documents. It describes normalization (e.g., RDF Dataset Canonicalization) and compaction/expansion rules needed to ensure consistent ontology generation and merging. Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation gives a high-level overview of OWL 2, including profiles (EL, QL, RL), owl:Class and owl:ObjectProperty constructs, and mapping to RDF/XML and OWL 2 Functional Syntax. It outlines key axioms, semantics, and inference patterns necessary for building and reasoning over OWL ontologies. Essential for understanding how to structure JSON-LD contexts and @graph entries to align with OWL vocabularies and enable downstream reasoning. Last Updated: 11 December 2012. Authoritative W3C standard.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
The SPARQL 1.1 Query Language specification describes syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF datasets. It covers algebraic operators, filters, graph patterns, property paths, and solution modifiers (LIMIT, OFFSET), providing the basis for implementing query features in CLI tools. This source addresses core implementation needs for parsing and executing SPARQL queries against ontologies loaded into N3 stores or similar RDF libraries. Last Updated: 21 March 2013. W3C Recommendation.
## CC0 1.0 Universal

# N3.js RDF Library for JavaScript
## https://www.npmjs.com/package/n3
N3.js is a performant, standards-compliant JavaScript library for parsing and serializing RDF in N-Triples, N-Quads, Turtle, and TriG formats. It provides an N3.Store for in-memory triple storage, streaming parsers, and writers, enabling efficient loading of JSON-LD–derived RDF for SPARQL execution. Core functions include adding/removing triples, pattern matching, and stream-based processing—essential for implementing the --query feature and graph merging. Last Published: current. MIT License (as listed on npm).
## MIT

# SPARQL.js: SPARQL Parser for JavaScript
## https://www.npmjs.com/package/sparqljs
SPARQL.js offers a JavaScript parser and generator for SPARQL queries, supporting full SPARQL 1.1 syntax. It returns an abstract syntax tree (AST) that can be used to programmatically inspect and execute query patterns. Vital for CLI implementations that accept raw SPARQL strings, transform them into query operations, and integrate with N3.js stores. Last Published: current. MIT License.
## MIT

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
The REST Countries API provides comprehensive country data in JSON, including names, codes, capitals, regions, and populations. Its /v3.1/all endpoint returns an array of country objects ideal for generating a capital cities ontology or broader country ontologies. Documentation details query parameters, response schemas, and example payloads, guiding implementation of the --refresh and --capital-cities features. Publicly accessible without authentication. Last Reviewed: 2024. Data licensed under CC0.
## CC0

# Node.js Global Fetch API
## https://nodejs.org/api/globals.html#fetch
Node.js v18+ includes a built-in global fetch API conforming to the WHATWG Fetch Standard. This documentation covers request/response objects, streaming bodies, error handling, and abort signals—key for robust implementation of source data retrieval in CLI commands. It ensures that HTTP fetch calls integrate seamlessly without external dependencies, and outlines compatibility notes and edge cases. Last Updated: reflects Node.js v20. Authoritative Node.js docs.
## MIT

# Wikidata Query Service User Manual
## https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
The Wikidata Query Service manual explains how to craft and execute SPARQL queries against the Wikidata RDF dataset, including example queries, output formats (JSON, CSV), and performance considerations. It offers best practices for pagination, caching, and filtering large result sets, directly informing implementations of the --query feature for federated SPARQL endpoints. Last Updated: continually maintained. Licensed under CC0.
## CC0