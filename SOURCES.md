# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core data model, context definitions, term mapping, data coercion, and processing algorithms, as well as the JSON-LD API operations (expand, compact, flatten, frame, toRDF). It covers framing, normalization (e.g., RDF Dataset Canonicalization), compaction/expansion rules, and detailed options and error-handling behaviors required for robust programmatic JSON-LD processing. This source is essential for implementing consistent ontology generation, flattening, merging, and conversion to RDF in both CLI commands and library contexts. Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation provides a comprehensive high-level overview of OWL 2, including its three profiles (EL, QL, RL), core constructs like owl:Class and owl:ObjectProperty, and mappings to RDF/XML and OWL 2 Functional Syntax. It outlines key axioms, semantics, and inference patterns necessary for building and reasoning over OWL ontologies expressed as JSON-LD. Last Updated: 11 December 2012. Authoritative W3C standard.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
The SPARQL 1.1 Query Language specification describes syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF datasets. It covers graph patterns, property paths, filters, solution modifiers (LIMIT, OFFSET), and algebraic operators, forming the basis for implementing query execution features in CLI tools and services. Last Updated: 21 March 2013. Highly authoritative W3C Recommendation.
## CC0 1.0 Universal

# JavaScript RDF & SPARQL Libraries
## https://www.npmjs.com/package/n3
The N3.js library is a performant, standards-compliant JavaScript implementation for parsing and serializing RDF in N-Triples, N-Quads, Turtle, and TriG formats, with an in-memory N3.Store for triple storage and streaming parsers/writers. Combined with SPARQL.js (https://www.npmjs.com/package/sparqljs) for full SPARQL 1.1 parsing and AST generation, this source addresses core implementation needs for loading JSON-LD–derived RDF, constructing triple stores, parsing queries, and executing graph-pattern matching. Last Published: current. MIT License.
## MIT

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
The REST Countries API provides extensive country data in JSON, including names, ISO codes, capitals, regions, and populations. The `/v3.1/all` endpoint returns an array of country objects ideal for generating capital‐city ontologies or broader country datasets. Documentation details query parameters, response schemas, and example payloads, guiding implementation of the `--refresh` and `--capital-cities` features in the CLI. Publicly accessible without authentication. Last Reviewed: 2024. Data licensed under CC0.
## CC0 1.0 Universal

# Wikidata Query Service User Manual
## https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
This manual explains how to craft and execute SPARQL queries against the Wikidata RDF dataset, including example queries, supported output formats (JSON, CSV), and performance considerations. It covers pagination, caching strategies, and filtering large result sets, directly informing the implementation of the `--query` feature for federated SPARQL endpoints. Continuously maintained. Licensed under CC0.
## CC0 1.0 Universal

# SHACL Shapes Constraint Language
## https://www.w3.org/TR/shacl/
The W3C Recommendation for SHACL defines a language for validating RDF graphs against a set of conditions (“shapes”). It details core SHACL constructs (sh:NodeShape, sh:PropertyShape), constraint components (datatype, minCount, pattern), SPARQL-based constraints (sh:SPARQLConstraint), and validation reporting. Advanced topics like nested shapes, path expressions, and functions are also covered. Last Updated: 03 October 2017. Highly authoritative W3C Recommendation.
## Creative Commons Attribution 4.0 International (CC BY 4.0)

# OpenAPI Specification v3.1
## https://spec.openapis.org/oas/v3.1.0
The OpenAPI Specification v3.1.0 defines a standard, language-agnostic interface for RESTful APIs, leveraging JSON Schema for data models. It describes document structure (info, paths, components), operation objects (parameters, requestBody, responses), and security schemes. This source is essential for modeling and documenting the CLI’s HTTP server endpoints under the `--serve` feature, enabling consistent, machine-readable API definitions and client generation. Last Updated: 10 February 2023. Licensed under Apache 2.0.
## Apache 2.0