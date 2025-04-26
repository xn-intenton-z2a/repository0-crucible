# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 defines the core data model, context definitions, term mapping, data coercion, and processing algorithms, as well as the JSON-LD API operations (expand, compact, flatten, frame, toRDF). It thoroughly details options and error-handling behaviors essential for robust programmatic JSON-LD processing in both CLI and library contexts. Its framing and normalization sections guide merging and canonicalizing multiple JSON-LD fragments—core to the `--refresh` and `--merge-persist` features.
Last Updated: 16 January 2020. Highly authoritative as the formal W3C Recommendation.
## CC0 1.0 Universal

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
The W3C Recommendation offers a high-level introduction to OWL 2, covering the three profiles (EL, QL, RL), core constructs like owl:Class and owl:ObjectProperty, and syntax mappings for RDF/XML and the OWL 2 Functional Syntax. Understanding these constructs is vital for designing the standard @context and interpreting class/property axioms when transforming JSON data into OWL ontologies.
Last Updated: 11 December 2012. Authoritative W3C standard.
## CC0 1.0 Universal

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
This specification defines syntax and semantics for SELECT, ASK, CONSTRUCT, and DESCRIBE queries over RDF datasets. It covers graph patterns, property paths, filters, solution modifiers, and algebraic operators, forming the basis for implementing the `--query` feature via jsonld.toRDF, N3.Store, and SPARQL.js parsing.
Last Updated: 21 March 2013. Highly authoritative W3C Recommendation.
## CC0 1.0 Universal

# JavaScript RDF & SPARQL Libraries
## https://www.npmjs.com/package/n3
N3.js is a performant, standards-compliant JavaScript implementation for parsing and serializing RDF in N-Triples, N-Quads, Turtle, and TriG formats, with an in-memory N3.Store for triple storage and streaming parsers/writers. Paired with SPARQL.js for parsing SPARQL 1.1 into ASTs, these libraries underpin the `--query` execution engine and RDF handling in refresh/merge workflows.
Last Published: current. MIT License.
## MIT

# REST Countries API
## https://restcountries.com/#api-endpoints-v3-all
The REST Countries API provides detailed country data (names, ISO codes, capitals, regions, populations) via publicly accessible JSON endpoints. The `/v3.1/all` endpoint returns a rich array ideal for generating `--capital-cities` ontologies and for use in the `--refresh` workflow. Documentation includes request parameters, response schemas, and examples.
Last Reviewed: 2024. Data licensed under CC0.
## CC0 1.0 Universal

# Wikidata SPARQL Query Service User Manual
## https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
A practical guide to crafting and running SPARQL queries against Wikidata’s RDF store. It covers query syntax, output formats (JSON, CSV), pagination strategies, and performance tips—directly informing federated query implementations in the `--query` and `--serve` features.
Continuously maintained. Licensed under CC0.
## CC0 1.0 Universal

# jsonld.js JavaScript Library
## https://www.npmjs.com/package/jsonld
The Digital Bazaar `jsonld.js` library provides a full JavaScript implementation of the JSON-LD API, including expand, compact, flatten, frame, and toRDF operations. It integrates seamlessly with Node.js, enabling in-memory normalization, RDF conversion, and graph merging essential to the `--refresh` and `--merge-persist` features.
Last Published: 2024. MIT License.
## MIT

# Node.js HTTP & File System APIs
## https://nodejs.org/api/http.html
Comprehensive reference for the built-in Node.js HTTP module and the `fs/promises` API. This source details creating RESTful servers, handling routes, parsing request bodies, and performing asynchronous file operations—foundational for the internal HTTP server in the `--serve` feature and for reading/writing ontologies on disk.
Current for Node.js v20.x. Authoritative OpenJS Foundation documentation.
## CC BY-SA 3.0