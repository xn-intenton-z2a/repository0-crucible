# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core concepts, algorithms, and processing model for representing Linked Data in JSON. This specification provides essential details on @context definitions, term mapping, data coercion, framing, normalization (e.g., RDF Dataset Canonicalization), and compaction/expansion rules needed to ensure consistent ontology generation and merging. Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation gives a high-level overview of OWL 2, including profiles (EL, QL, RL), owl:Class and owl:ObjectProperty constructs, and mappings to RDF/XML and OWL 2 Functional Syntax. It outlines key axioms, semantics, and inference patterns necessary for constructing and reasoning over OWL ontologies. Essential for structuring JSON-LD contexts and @graph entries to align with OWL vocabularies and enable downstream reasoning. Last Updated: 11 December 2012. Authoritative W3C standard.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
The SPARQL 1.1 Query Language specification describes syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF datasets. It covers algebraic operators, filters, graph patterns, property paths, and solution modifiers (LIMIT, OFFSET), providing the basis for implementing query features in CLI tools. Last Updated: 21 March 2013. W3C Recommendation.
## CC0 1.0 Universal

# JavaScript RDF & SPARQL Libraries
## https://www.npmjs.com/package/n3
The N3.js library offers a performant, standards-compliant JavaScript implementation for parsing and serializing RDF in N-Triples, N-Quads, Turtle, and TriG formats, including an N3.Store for in-memory triple storage and streaming parsers/writers. In combination with SPARQL.js (https://www.npmjs.com/package/sparqljs), which provides a full SPARQL 1.1 parser and AST generator, this source addresses core implementation needs for loading JSON-LD–derived RDF, constructing stores, parsing queries, and executing graph-pattern matching. Last Published: current. This merged reference streamlines dependency management for RDF/SPARQL processing in JavaScript.
## MIT

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
The REST Countries API provides comprehensive country data in JSON, including names, ISO codes, capitals, regions, and populations. Its /v3.1/all endpoint returns an array of country objects ideal for generating capital cities or broader country ontologies. Documentation details query parameters, response schemas, and example payloads, guiding implementation of the --refresh and --capital-cities features. Publicly accessible without authentication. Last Reviewed: 2024. Data licensed under CC0.
## CC0 1.0 Universal

# Node.js Global Fetch API
## https://nodejs.org/api/globals.html#fetch
Node.js v18+ includes a built-in global fetch API conforming to the WHATWG Fetch Standard. This documentation covers request/response objects, streaming bodies, error handling, and abort signals—key for robust implementation of source data retrieval in CLI commands. It ensures that HTTP fetch calls integrate seamlessly without external dependencies and outlines compatibility notes and edge cases. Last Updated: reflects Node.js v20. Authoritative Node.js docs.
## MIT

# Wikidata Query Service User Manual
## https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
The Wikidata Query Service manual explains how to craft and execute SPARQL queries against the Wikidata RDF dataset, including example queries, output formats (JSON, CSV), and performance considerations. It offers best practices for pagination, caching, and filtering large result sets, directly informing implementations of the --query feature for federated SPARQL endpoints. Last Updated: continually maintained. Licensed under CC0.
## CC0 1.0 Universal

# JSON-LD 1.1 API
## https://www.w3.org/TR/json-ld11-api/
This W3C Recommendation details the JSON-LD 1.1 API operations, including algorithms for expand, compact, flatten, frame, and toRDF (conversion to RDF datasets/N-Quads). It provides essential options and error-handling behaviors required for programmatic JSON-LD processing, enabling reliable normalization and merging of ontologies in CLI and library contexts. Last Updated: 25 February 2020. Highly authoritative as a formal W3C Recommendation.
## CC0 1.0 Universal