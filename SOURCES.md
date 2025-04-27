# W3C OWL 2 Web Ontology Language Document Overview

## https://www.w3.org/TR/owl2-overview/

The OWL 2 Overview is the definitive W3C Recommendation covering OWL 2 ontology constructs—classes, properties, individuals, datatypes, and axioms—alongside RDF-based serializations. It provides formal semantics, conformance criteria, and code examples for authoring and validating OWL 2 ontologies. Essential for ensuring compliance with the latest standard and guiding the transformation of ontology models to JSON-LD with precise vocabulary mappings. (Last updated 27 October 2009; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# W3C RDF 1.1 Concepts and Abstract Syntax

## https://www.w3.org/TR/rdf11-concepts/

This W3C Recommendation defines the RDF 1.1 data model—IRIs, literals, blank nodes, triples, and graphs—along with the abstract syntax for Turtle, RDF/XML, and JSON-LD. It details parsing, serialization, and formal semantics that underpin all RDF-based tooling. Crucial for constructing, validating, and traversing RDF graphs before any OWL transformations or JSON-LD processing. (Last updated 25 February 2014; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 (Specification and API)

## https://www.w3.org/TR/json-ld11/

## https://www.w3.org/TR/json-ld11-api/

These W3C Recommendations together specify JSON-LD 1.1 framing, compaction, expansion, context processing algorithms, and the JavaScript API for programmatic JSON-LD operations (compaction, expansion, framing, normalization, RDF conversion). They cover error handling, extension points, embedding strategies, and algorithmic pseudocode for library authors. Essential for ingesting external data and emitting compliant JSON-LD within OWL builder workflows. (Spec last updated 16 May 2020; API last updated 29 May 2020; authoritative as W3C Recommendations.)

## License

W3C Document License (CC-BY 4.0)

# SPARQL 1.1: Query, Protocol, Update, and Graph Store HTTP

## https://www.w3.org/TR/sparql11-overview/

## https://www.w3.org/TR/sparql11-protocol/

## https://www.w3.org/TR/sparql11-update/

## https://www.w3.org/TR/sparql11-http-rdf-update/

This combined SPARQL 1.1 suite includes:

- **Query Language (Overview)**: SELECT, ASK, CONSTRUCT, DESCRIBE, federation, and aggregation syntax.
- **Protocol**: HTTP GET/POST request formats, URL parameters, content negotiation, error handling for remote query and update endpoints.
- **Update**: INSERT/DELETE operations, graph targeting, transactions, and error semantics.
- **Graph Store HTTP**: RESTful HTTP operations for creating, reading, updating, and deleting RDF graphs.

Incorporates best practices for public endpoints (e.g., DBpedia, Wikidata), HTTP parameter tuning, rate-limit handling, and efficient result parsing. Essential for building robust SPARQL clients, servers, and federated query pipelines. (All last updated 21 March 2013; authoritative as W3C Recommendations.)

## License

W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Query Results JSON Format

## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

This W3C Recommendation specifies the JSON encoding for SPARQL SELECT and ASK query results, defining the `head` and `results` structure, variable bindings, lexical forms, language tags, and datatype annotations. Crucial for parsing JSON responses from SPARQL endpoints (DBpedia, Wikidata, Fuseki) and handling error conditions. (Last updated 21 March 2013; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# DBpedia SPARQL Endpoint Guide

## https://wiki.dbpedia.org/services-resources/sparql-endpoint

The official DBpedia SPARQL Endpoint Guide outlines endpoint URLs, supported query parameters, HTTP headers (including `Accept` for JSON and XML), rate limits, timeouts, and pagination strategies. Provides practical examples and troubleshooting tips for constructing efficient queries and handling large result sets. Essential for developers integrating DBpedia data via SPARQL, ensuring reliability and performance. (Content under Creative Commons Attribution-ShareAlike 3.0; authoritative as DBpedia community documentation.)

## License

CC BY-SA 3.0

# W3C Shapes Constraint Language (SHACL)

## https://www.w3.org/TR/shacl/

SHACL defines a declarative language for validating RDF graphs against a set of shapes (node and property constraints). The spec covers core constraint components, SHACL-SPARQL extensions for custom rules, target declarations, and validation result structures. Vital for verifying the structural integrity and semantic consistency of generated OWL ontologies before publication. (Last updated 20 July 2017; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# Node.js Core APIs: HTTP, File System, URL, and Fetch

## https://nodejs.org/api/http.html

## https://nodejs.org/api/fs.html

## https://nodejs.org/api/url.html

## https://nodejs.org/api/globals.html#fetch

Official Node.js v20 documentation for core modules used in `owl-builder`:

- **HTTP**: `http.createServer`, routing strategies, headers, status codes—building RESTful and SPARQL endpoints.
- **FS**: synchronous file and directory operations (`fs.existsSync`, `fs.mkdirSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.writeFileSync`) essential for CLI commands.
- **URL**: WHATWG URL API and `URLSearchParams` for constructing SPARQL query URLs.
- **Fetch**: global `fetch` API for HTTP GET/HEAD requests, JSON parsing, and error handling.

Delivers actionable patterns for data retrieval, health checks, and integration with SPARQL endpoints. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)

## License

OpenJS Foundation and contributors, MIT License