# W3C RDF 1.1 Concepts
## https://www.w3.org/TR/rdf11-concepts/
RDF 1.1 Concepts and Abstract Syntax is the foundational specification defining the RDF data model: triples, resources, literals, blank nodes, and graphs. It details serialization formats (RDF/XML, Turtle), parsing algorithms, and the abstract data model necessary for consistent construction and validation of RDF datasets. This source directly supports core implementation by specifying low-level data structures and API expectations for reading and writing RDF. Last updated 25 February 2014; as a W3C Recommendation it is the authoritative reference for any RDF-centric tooling.
## W3C Document License 1.0

# W3C OWL 2 Web Ontology Language Primer
## https://www.w3.org/TR/owl2-primer/
The OWL 2 Primer offers a practical introduction to modeling complex domains with OWL 2, including class expressions, property restrictions, and reasoning examples. It provides concrete OWL/XML and Turtle examples for ontology construction, mapping JSON-derived data into formal ontology elements. This primer addresses core needs such as designing taxonomies, defining equivalence or disjointness, and leveraging reasoners. Published as a W3C Recommendation on 11 December 2012, it remains the go-to guide for OWL ontology implementation.
## W3C Document License 1.0

# JSON-LD 1.1
## https://www.w3.org/TR/json-ld11/
The JSON-LD 1.1 specification defines how to serialize RDF graphs in JSON, enabling a seamless bridge between JSON data and RDF/OWL ontologies. It describes contexts, framing, compaction/expansion algorithms, and best practices for embedding linked data. Implementers gain actionable details on transforming JSON sources into RDF triples and back, addressing JSON-centric workflows in JavaScript. Last updated 16 July 2020; as a W3C Recommendation, it is the definitive guide for JSON-LD processing.
## W3C Document License 1.0

# RDF/JS Data Model Specification
## https://rdf.js.org/data-model-spec/
The RDF/JS Data Model spec defines a standard JavaScript API for creating, inspecting, and comparing RDF terms (NamedNode, Literal, BlankNode, Quad). It outlines interfaces, factory methods, and type signatures crucial for interoperable RDF libraries in Node.js and the browser. This ensures consistent in-memory representations of RDF for downstream OWL conversion. Published online under public domain dedication; maintained by the RDF/JS community.
## Public Domain

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
SPARQL 1.1 Query Language specifies syntax and semantics for querying RDF graphs, including SELECT, CONSTRUCT, ASK, and DESCRIBE forms, along with advanced features like subqueries, aggregates, and property paths. It is essential for extracting patterns from ontologies and for testing transformed OWL models. Last updated 21 March 2013; as a W3C Recommendation, it is the de facto standard for RDF data interrogation.
## W3C Document License 1.0

# DBpedia SPARQL Endpoint Documentation
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
This guide details accessing DBpedia’s public SPARQL endpoint, including endpoint URLs, query parameters, rate limits, and example queries. DBpedia’s ontology-aligned data serves as a real-world reference for ontology completeness and alignment tests. The documentation provides tips on pagination, HTTP headers, and result serialization formats (JSON, XML), enabling robust crawler implementations. Licensed under CC BY-SA 3.0.
## CC BY-SA 3.0

# rdflib.js JavaScript Library
## https://github.com/linkeddata/rdflib.js#readme
rdflib.js implements the RDF/JS interfaces and provides utilities for parsing, serializing, and storing RDF graphs in JavaScript. The README includes installation steps, code snippets for loading Turtle/JSON-LD, SPARQL querying in‐memory, and linking to remote endpoints. This source is vital for rapid prototyping of OWL workflows and aligns directly with the project’s module architecture. Last updated monthly; project is MIT-licensed.
## MIT License

# World Bank API Developer Guide
## https://datahelpdesk.worldbank.org/knowledgebase/articles/889386-developer-information-overview
The World Bank Open Data API guide explains RESTful endpoints for retrieving economic, social, and environmental indicators in JSON. It covers URL conventions, pagination, filtering, and bulk downloads—key for populating ontologies with global statistics. Examples demonstrate HTTP request formats and response structures, enabling straightforward integration into crawling modules. Data is in the public domain.
## Public Domain