# W3C OWL 2 Web Ontology Language Document Overview
## https://www.w3.org/TR/owl2-overview/
The OWL 2 Overview provides a high-level introduction to the concepts, profiles (OWL 2 EL/RL/QC/DL), and use cases for building ontologies on the Web. It outlines practical modeling patterns (e.g., class axioms, property restrictions) and explains core reasoning tasks such as consistency checking and classification. This document is essential for understanding which OWL profile best matches your performance and reasoning requirements during ontology generation in `owl-builder`.
Last updated: December 2012. Authoritative as the W3C recommendation process ensures broad community review.
## W3C Software and Document License

# W3C OWL 2 Structural Specification and Functional-Style Syntax
## https://www.w3.org/TR/owl2-syntax/
This specification defines the abstract syntax, functional-style notation, and concrete grammar for OWL 2 ontologies. It provides detailed grammar productions, serialization rules, and mapping to RDF, enabling precise generation and parsing of OWL constructs in JSON form. Key sections describe restrictions for profiles and explain how to convert between RDF/XML, Turtle, and functional syntax.
Last updated: December 2012. Full normative specification from the W3C.
## W3C Software and Document License

# W3C RDF 1.1 Primer
## https://www.w3.org/TR/rdf11-primer/
An accessible guide to RDF 1.1 data model, serialization syntaxes (Turtle, JSON-LD), and best practices for linked data. It includes practical examples for expressing graphs, IRIs, literals, and blank nodes, crucial for transforming JSON objects into RDF triples or reading linked data from web APIs.
Last updated: March 2014. Authoritative entry point for RDF concepts.
## W3C Software and Document License

# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The definitive guide to JSON-LD 1.1, covering context definitions, framing, compaction, expansion, and API design. It includes code samples for embedding linked data in JSON and guidelines for custom context setup—critical for producing compact, interoperable JSON representations of OWL ontologies.
Last updated: July 2019. W3C Recommendation.
## W3C Software and Document License

# Wikidata REST API
## https://www.wikidata.org/w/api.php
A comprehensive reference for the MediaWiki‐based REST API powering Wikidata. It details query modules (action=query), entity content endpoints (action=wbgetentities), parameterization for languages and revisions, and paging options. This source is crucial for crawling rich entity data (labels, statements) and converting them into OWL individuals or annotation properties.
Last known update: continuously maintained by Wikimedia. Public domain.
## Public Domain

# Wikidata SPARQL Endpoint
## https://query.wikidata.org/
Documentation of the SPARQL endpoint with example queries, result formats (JSON, XML, CSV), rate limits, and service description. It offers templated examples for retrieving class hierarchies, property usage, and qualifiers—key techniques for building ontology imports and schema alignment in `owl-builder`.
Last updated: ongoing. Community‐verified endpoint documentation.
## Public Domain

# Apache Jena Documentation
## https://jena.apache.org/documentation/
Covers the Jena API for Java-based RDF processing, SPARQL engine (ARQ), ontology API, and command‐line tools (riot, tdbloader). Though Java-centric, this documentation provides insight into common RDF processing pipelines, reasoning configurations (OWL Miner), and tuning SPARQL performance—guidance translatable to JS-based tooling.
Last updated: 2023. Licensed under Apache-2.0.
## Apache-2.0

# rdflib.js Documentation
## https://linkeddata.github.io/rdflib.js/doc/index.html
Official API reference for rdflib.js, covering graph manipulation, fetcher for HTTP‐based RDF acquisition, parsers/serializers for Turtle, RDF/XML, and JSON-LD, as well as query interfaces. Demonstrates how to load remote ontologies, perform in-memory reasoning, and serialize graphs—directly applicable patterns for `owl-builder` implementations.
Last updated: 2022. MIT License.
## MIT

# N3.js Documentation
## https://n3.js.org/
Documentation for the N3.js library, including the N3Parser, N3Writer, and N3.Store. It provides performance benchmarks, streaming API usage, and examples for handling large RDF datasets in Node.js—essential for efficient crawling and conversion pipelines.
Last updated: 2021. MIT License.
## MIT

# OGC API - Features
## https://ogcapi.ogc.org/features/
The Open Geospatial Consortium's OGC API – Features standard defines RESTful endpoints for geographic feature retrieval. It specifies GeoJSON responses, paging, filtering, and coordinate reference system support. This is a high-value pattern for integrating spatial datasets into OWL ontologies (e.g., capital cities example) through an API-first approach.
Last updated: 2022. CC-BY 4.0.
## CC-BY 4.0

# DBpedia SPARQL Endpoint
## https://dbpedia.org/sparql
Endpoint documentation with usage guidelines, sample queries for class and property extraction, and details on dataset coverage and update frequency. DBpedia offers structured knowledge extracted from Wikipedia that can seed ontology classes and instances, complementing OWL creation workflows.
Last updated: 2023. CC-BY-SA 3.0