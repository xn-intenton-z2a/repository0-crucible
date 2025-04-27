# W3C OWL 2 Web Ontology Language Document Overview

## https://www.w3.org/TR/owl2-overview/

The OWL 2 Overview is the definitive W3C Recommendation describing OWL 2 ontology constructs—classes, properties, individuals, datatypes, and axioms—along with RDF-based serializations (RDF/XML, Turtle). It provides formal semantics, conformance criteria, and code examples for authoring and validating OWL 2 ontologies. Essential for ensuring compliance with the latest standards and guiding precise vocabulary mappings when generating JSON-LD from ontology models. (Last updated 27 October 2009; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# W3C OWL 2 Primer

## https://www.w3.org/TR/owl2-primer/

The OWL 2 Primer is an accessible tutorial offering practical guidance on modeling real-world domains with OWL 2. It covers core ontology design patterns, class expressions, property axioms, functional syntax, and common pitfalls. The Primer complements the formal Overview by illustrating examples, best practices, and profiling (OWL 2 RL, QL, EL) to optimize reasoning performance. (Last updated 11 December 2012; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# W3C RDF 1.1 Concepts and Abstract Syntax

## https://www.w3.org/TR/rdf11-concepts/

This W3C Recommendation defines the RDF 1.1 data model—IRIs, literals, blank nodes, triples, and graphs—along with abstract syntaxes for Turtle, RDF/XML, and JSON-LD. It details parsing rules, serialization guidelines, and formal semantics that underpin all RDF-based tooling. Crucial for constructing, validating, and traversing RDF graphs before any OWL transformations or JSON-LD production. (Last updated 25 February 2014; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 (Specification and API)

## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/

These paired W3C Recommendations specify JSON-LD 1.1 framing, compaction, expansion, context processing algorithms, and the JavaScript API for programmatic JSON-LD operations (compaction, expansion, framing, normalization, RDF conversion). They cover error handling, extension points, embedding strategies, and algorithmic pseudocode for library authors. Essential for ingesting external data and emitting compliant JSON-LD within OWL builder workflows. (Spec last updated 16 May 2020; API last updated 29 May 2020; authoritative as W3C Recommendations.)

## License

W3C Document License (CC-BY 4.0)

# SPARQL 1.1 Suite: Query, Protocol, Update, Graph Store HTTP, and JSON Results

## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/sparql11-http-rdf-update/
## https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

This comprehensive SPARQL 1.1 suite includes:
- **Query Language**: SELECT, ASK, CONSTRUCT, DESCRIBE, federation, aggregation, and subqueries.
- **Protocol**: HTTP GET/POST formats, content negotiation, error codes, and URL parameter conventions.
- **Update**: INSERT, DELETE, graph targeting, transactions, and error semantics.
- **Graph Store HTTP**: RESTful operations for creating, reading, updating, and deleting RDF graphs.
- **Results JSON**: Defines the JSON encoding for SELECT and ASK query results, covering the `head` and `results` structures, variable bindings, lexical forms, language tags, and datatype annotations.

Illustrates HTTP parameter tuning, rate-limit handling, efficient result parsing, and best practices for public endpoints (DBpedia, Wikidata, Fuseki). Critical for building robust SPARQL clients, servers, and federated query pipelines. (Last updated 21 March 2013; authoritative as W3C Recommendations.)

## License

W3C Document License (CC-BY 4.0)

# W3C Shapes Constraint Language (SHACL)

## https://www.w3.org/TR/shacl/

SHACL defines a declarative language for validating RDF graphs against shapes (node and property constraints). The specification covers core constraint components, SPARQL-based extensions for custom rules, target declarations, validation results structures, and performance considerations. Vital for verifying structural integrity and semantic consistency of generated OWL ontologies before publication. (Last updated 20 July 2017; authoritative as a W3C Recommendation.)

## License

W3C Document License (CC-BY 4.0)

# DBpedia SPARQL Endpoint Guide

## https://wiki.dbpedia.org/services-resources/sparql-endpoint

The DBpedia SPARQL Endpoint Guide outlines endpoint URLs, supported query parameters, HTTP headers (including `Accept` for JSON and XML), rate limits, timeouts, and pagination strategies. It provides practical examples and troubleshooting tips for constructing efficient queries and handling large result sets. Essential for developers integrating DBpedia data via SPARQL, ensuring reliability and performance of the capital-cities and other queries. (Content under Creative Commons Attribution-ShareAlike 3.0; authoritative as DBpedia community documentation.)

## License

Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)

# Node.js Core APIs: HTTP, File System, URL, and Fetch

## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/globals.html#fetch

Official Node.js v20 documentation for core modules used in `owl-builder`:
- **HTTP**: `http.createServer`, routing strategies, headers, and status codes for RESTful and SPARQL endpoints.
- **FS**: File and directory operations (`fs.existsSync`, `fs.mkdirSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.writeFileSync`) essential for CLI commands and data persistence.
- **URL**: WHATWG `URL` API and `URLSearchParams` for constructing SPARQL query URLs.
- **Fetch**: Global `fetch` API for HTTP requests, JSON parsing, and error handling.

Delivers actionable patterns for data retrieval, health checks, and integration with SPARQL endpoints. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)

## License

OpenJS Foundation and contributors (MIT License)