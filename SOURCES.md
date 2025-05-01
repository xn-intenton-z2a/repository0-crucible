# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview
The OWL 2 Web Ontology Language Overview provides a high-level introduction to OWL 2, including its different species (DL, EL, QL, RL), profiles, and common use cases. It defines key modeling constructs (classes, properties, individuals, datatypes) and shows how OWL ontologies integrate with RDF and RDFS. This document is maintained by the W3C and is authoritative for implementing OWL-compliant tools. Last updated February 27 2012.
## License
W3C Document License

# OWL 2 Web Ontology Language Structural Specification and Functional-Style Syntax
## https://www.w3.org/TR/owl2-syntax
This specification defines the abstract syntax, the RDF-based semantics, and the functional-style textual syntax of OWL 2. It details how to serialize ontologies in Turtle or RDF/XML and formalizes the grammar for programmatic generation and parsing. Essential for any implementation that generates or consumes OWL via JSON-LD transformation. Last updated December 11 2012.
## License
W3C Document License

# RDF 1.1 Concepts and Abstract Syntax
## https://www.w3.org/TR/rdf11-concepts
The RDF 1.1 Concepts and Abstract Syntax specification defines the data model for RDF graphs, including triples, named graphs, IRIs, literals, and blank nodes. It is foundational for converting JSON-LD contexts into RDF graphs, ensuring correct interpretation of terms and data types. Last updated January 25 2014.
## License
W3C Document License

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query
SPARQL 1.1 is the standard RDF query language used by public endpoints like Wikidata and DBpedia. This specification covers query forms (SELECT, CONSTRUCT, ASK, DESCRIBE), graph patterns, solution modifiers, and built-in functions. Crucial for generating SPARQL queries in the CLI to fetch ontology source data. Last updated March 21 2013.
## License
W3C Document License

# JSON-LD 1.1 Recommendation
## https://www.w3.org/TR/json-ld11/
JSON-LD 1.1 is the W3C Recommendation for representing Linked Data in JSON. It explains contexts, compacting, expanding, framing, and normalization algorithms that are directly used when producing JSON-LD OWL ontologies. Detailed examples show how to author contexts to map JSON keys to IRIs. Last updated June 25 2020.
## License
W3C Document License

# jsonld.js (JSON-LD API for JavaScript)
## https://github.com/digitalbazaar/jsonld.js#readme
jsonld.js is the de facto JavaScript library for processing JSON-LD in Node and browsers. Its README and API reference provide code examples for context processing, expansion, compaction, framing, and RDF dataset conversion. This source is invaluable for integrating JSON-LD processing into the owl-builder pipeline. License and versioning information are clearly documented in the repo. Latest release v5.x.
## License
MIT

# N3.js (RDFJS Triple Store and Parser)
## https://github.com/rdfjs/N3.js#readme
N3.js is a fast RDFJS-compliant library offering parsers, writers, and stores for N3/Turtle and TriG. The README includes usage patterns for parsing streams, constructing triples, and serializing back to Turtle or JSON-LD, which can guide efficient ontology graph handling in JavaScript. Latest major version: 2.x.
## License
MIT

# rdflib.js (JavaScript RDF Library)
## https://solid.github.io/rdflib.js/doc/
rdflib.js documentation covers the Store API, NamedNode, Literal handling, SPARQL updates, fetcher utilities, and formula queries. It demonstrates how to load RDF graphs from URLs, execute local queries, and serialize back to various formats. Offers patterns for caching and reasoning that can be adapted to JSON-LD OWL workflows.
## License
MIT

# Wikidata Query Service User Guide
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Guide
The user guide for Wikidata’s SPARQL endpoint details request formats, query limits, pagination, and response structure (JSON). It includes best practices for efficient querying and handling large result sets, directly applicable when crawling public data for ontology construction.
## License
CC0 1.0 Universal

# World Bank Data API Basics
## https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures
This article explains the RESTful World Bank API, including endpoint conventions, filters, pagination options, and data formats (JSON, XML). It is a model for integrating economic indicator data into OWL ontologies via programmatic calls.
## License
Creative Commons Attribution 4.0 International

# OpenStreetMap Overpass API
## https://wiki.openstreetmap.org/wiki/Overpass_API
The Overpass API documentation provides the query language (Overpass QL), endpoint usage patterns, streaming options, and rate-limiting rules for extracting geospatial data from OpenStreetMap. Key for building geographic ontologies and examples like --capital-cities.
## License
Open Database License (ODbL) 1.0

# GBIF API (Global Biodiversity Information Facility)
## https://www.gbif.org/developer/summary
GBIF’s API summary outlines endpoint routes for species, occurrences, datasets, and taxonomy, with details on query parameters, paging, and licensing metadata. Essential for pulling biodiversity data into OWL ontologies in JSON form.
## License
CC0 1.0 Universal

# DBpedia SPARQL Endpoint Guide
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
DBpedia’s SPARQL endpoint guide describes URL patterns, accepted formats, query length limits, and output serializations. Offers examples of federated queries that can enrich ontologies with linked data from multiple sources.
## License
Creative Commons Attribution-ShareAlike 3.0

# OntoSpy Documentation
## https://ontospy.readthedocs.io/en/latest/
OntoSpy is a Python library for introspecting OWL ontologies, generating class/property hierarchies, and exporting documentation. While Python-based, its approach to graph traversal and metadata extraction informs best practices for building similar tooling in JavaScript.
## License
MIT