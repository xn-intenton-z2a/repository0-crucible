# W3C OWL 2 Web Ontology Language Document Overview

## https://www.w3.org/TR/owl2-overview/
The OWL 2 Overview is the definitive W3C Recommendation detailing the OWL 2 ontology language constructs—classes, properties, individuals, datatypes, axioms, and RDF-based serializations. It provides formal semantics, conformance criteria, and programmatic examples for authoring and validating OWL 2 ontologies. This source ensures compliance with the latest standard and deep understanding of core modeling constructs essential for transformations into JSON-LD. (Last updated 27 October 2009; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# W3C RDF 1.1 Concepts and Abstract Syntax

## https://www.w3.org/TR/rdf11-concepts/
Defines the RDF 1.1 data model—IRIs, literals, blank nodes, triples, and graphs—along with parsing and serialization forms (Turtle, RDF/XML, JSON-LD). It presents the abstract syntax and formal semantics that underpin all RDF-based tooling, ensuring interoperability across systems. Crucial for building and validating RDF graphs prior to OWL transformation. (Last updated 25 February 2014; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1: A JSON-Based Serialization for Linked Data

## https://www.w3.org/TR/json-ld11/
Covers JSON-LD framing, compaction, expansion, and context processing to map JSON documents to RDF graphs. Describes processing algorithms, error handling, extension points, and best practices for embedding and extracting linked data. Critical for ingesting and emitting JSON-LD in OWL pipelines with minimal overhead. (Last updated 16 May 2020; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# W3C SPARQL 1.1: Overview and Protocol

## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
Combines the SPARQL 1.1 Query Language overview and the SPARQL 1.1 Protocol specification. Provides comprehensive details on constructing SELECT, ASK, CONSTRUCT, and DESCRIBE queries, update operations, federation, and aggregation. The Protocol section defines HTTP GET/POST request formats, URL parameters, content negotiation, update services, and error handling for executing SPARQL operations over HTTP. Essential for building robust SPARQL clients and servers and integrating query/update endpoints in OWL builder pipelines. (Queries: Last updated 21 March 2013; Protocol: Last updated 21 March 2013; authoritative as W3C Recommendations.)

## License
W3C Document License (CC-BY 4.0)

# Apache Jena Fuseki Documentation

## https://jena.apache.org/documentation/fuseki2/
Official guide to configuring and using Apache Jena Fuseki—a SPARQL server with RESTful endpoints over TDB2. Covers server setup, dataset management, SPARQL query and update endpoints, transaction handling, CORS, security, metrics, and performance tuning. Provides concrete curl examples and HTTP request patterns for integrating Fuseki into data ingestion and OWL-building pipelines. (Tested with Fuseki 4.7.0; authoritative as project documentation.)

## License
Apache License 2.0

# W3C Shapes Constraint Language (SHACL)

## https://www.w3.org/TR/shacl/
Describes the SHACL language for validating RDF graphs against a set of conditions (shapes). Defines shapes graphs, node and property shapes, constraints, targets, and validation results. Includes SHACL Core and SHACL-SPARQL extension for custom constraints. Vital for validating and ensuring the integrity of generated OWL ontologies before publishing or downstream processing. (Last updated 20 July 2017; authoritative as a W3C Recommendation.)

## License
W3C Document License (CC-BY 4.0)

# Public SPARQL Endpoints: DBpedia and Wikidata

## https://wiki.dbpedia.org/online-access
## https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Help
Outlines access to two major public SPARQL endpoints: DBpedia’s (`https://dbpedia.org/sparql`) and Wikidata’s (`https://query.wikidata.org/sparql`). Covers HTTP parameters (`query`, `default-graph-uri`, `timeout`, `format`), supported result formats (JSON, XML, CSV), rate limits, CORS policies, and efficient querying practices. Provides troubleshooting tips and real-world examples (e.g., capital cities query) to support features like `--capital-cities` and federated queries. (DBpedia: reviewed 2023; Wikidata: updated 2024; authoritative community documentation.)

## License
Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)

# Node.js Core APIs: HTTP, File System, and Fetch

## https://nodejs.org/api/http.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/globals.html#fetch
Official Node.js v20 documentation for core modules used in `owl-builder`. The HTTP API guide details `http.createServer`, routing, headers, and status codes for building RESTful endpoints. The FS API documentation covers file and directory manipulation methods (e.g., `fs.existsSync`, `fs.mkdirSync`, `fs.readdirSync`, `fs.readFileSync`, `fs.writeFileSync`) essential for data persistence. The global `fetch` API reference explains HTTP request handling, response parsing, and error management. Together, they deliver actionable patterns for implementing CLI features like `--serve`, `--refresh`, and `--merge-persist`. (Current as of Node.js v20.x; authoritative as official Node.js documentation.)

## License
OpenJS Foundation and contributors, MIT License