# W3C RDF and SPARQL Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/sparql11-query/
Combines the RDF 1.1 Concepts and SPARQL 1.1 Query Language specifications. Defines the foundational RDF data model (triples, graphs, serializations like Turtle and RDF/XML) along with parsing/serialization algorithms, and the SPARQL query language syntax and semantics (SELECT, CONSTRUCT, ASK, DESCRIBE, aggregates, property paths). This source addresses core implementation needs by specifying low-level data structures, parsing/serialization requirements, and query execution semantics, essential for both building and querying OWL ontologies. Last updated 25 February 2014 (RDF Concepts) and 21 March 2013 (SPARQL); as W3C Recommendations they are the authoritative references.
## W3C Document License 1.0

# W3C OWL 2 Specifications
## https://www.w3.org/TR/owl2-primer/
## https://www.w3.org/TR/owl2-syntax/
Includes the OWL 2 Web Ontology Language Primer and the Structural Specification. The primer provides practical modeling examples with OWL/XML and Turtle, covering class expressions, property restrictions, and reasoning patterns. The structural spec details concrete syntaxes (Functional, Manchester, Turtle), grammar, and mapping to RDF triples. Together they guide ontology design, syntax validation, and ensure generated JSON-LD adheres to OWL semantics. Published 11 December 2012; as W3C Recommendations they are the definitive OWL 2 references.
## W3C Document License 1.0

# JSON-LD 1.1
## https://www.w3.org/TR/json-ld11/
The JSON-LD 1.1 specification defines serialization of RDF graphs in JSON, covering contexts, framing, compaction/expansion algorithms, and best practices for embedding linked data. Provides actionable guidance for transforming JSON sources into RDF triples and vice versa, including pseudocode for compaction and expansion. Last updated 16 July 2020; as a W3C Recommendation it is the definitive guide for JSON-LD processing.
## W3C Document License 1.0

# jsonld.js JavaScript Library
## https://github.com/digitalbazaar/jsonld.js#readme
The `jsonld` npm package implements the JSON-LD API in JavaScript, offering methods like expand, compact, flatten, frame, and toRDF. The README includes code snippets for converting between JSON-LD and RDF datasets, streaming large graphs, and handling context definitions. This source is crucial for the transform-to-OWL and query features, facilitating reliable JSON-LD manipulation. Last updated June 2024; MIT License.
## MIT License

# Node.js Global Fetch API
## https://nodejs.org/api/globals.html#fetch
Official Node.js documentation for the built-in global `fetch` API introduced in Node.js v18+. Covers Request and Response objects, streaming bodies, error handling, and AbortController integration. Essential for implementing robust data retrieval in the `--fetch` feature, including timeouts and incremental consumption. Last updated for Node.js v20; maintained by the Node.js Foundation.
## Node.js Foundation License

# REST Countries API Developer Documentation
## https://restcountries.com/
The REST Countries API offers a RESTful interface to retrieve comprehensive country data in JSON (names, codes, capitals, populations, geospatial data). Endpoints and query parameters for filtering, pagination, and field selection are documented with example responses. This source directly supports populating OWL ontologies with real-world geographic data and guides the implementation of the `--fetch` feature. Publicly accessible; data is in the public domain.
## Public Domain

# JavaScript RDF Library Ecosystem
## https://rdf.js.org/data-model-spec/
## https://github.com/linkeddata/rdflib.js#readme
## https://comunica.dev/docs/query/
A consolidated view of the RDF/JS Data Model Specification and two key libraries: `rdflib.js` for parsing, serializing, and storing RDF graphs in browsers and Node.js, and the Comunica framework for executing SPARQL queries over heterogeneous sources. This ecosystem provides the interfaces, factory methods, storage backends, and federated query execution APIs needed to build a full-stack OWL tooling pipeline. Public domain (spec) and MIT (libraries).
## Mixed (Public Domain & MIT)

# Zod Schema Validation Library
## https://github.com/colinhacks/zod#readme
`zod` is a TypeScript-first schema definition and validation library. The README demonstrates how to define schemas, perform strict parsing, and handle validation errors. Useful for validating input JSON before transformation into OWL, enforcing property types and required fields, and providing user-friendly error messages. Last updated May 2024; MIT License.
## MIT License