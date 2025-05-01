# W3C JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The foundational W3C Recommendation defining the JSON-LD 1.1 data model, framing, context processing, and expansion algorithms. This specification provides detailed normative definitions for context syntax, term definitions, and data manipulation, directly informing our implementation of `compact` and `expand` functions. It also covers advanced features such as RDF conversions and framing semantics.
Published June 2020. Authoritative as a W3C Recommendation.
## License: W3C Document License

# W3C JSON-LD 1.1 API
## https://www.w3.org/TR/json-ld11-api/
A companion W3C Recommendation specifying the JavaScript API for JSON-LD processors. It defines the `jsonld.compact`, `jsonld.expand`, `jsonld.flatten`, and framing interfaces, error handling, option parameters, and asynchronous processing models. Critical for aligning our library API signatures and options structures.
Published June 2020. Authoritative as a W3C Recommendation.
## License: W3C Document License

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
Comprehensive introduction to OWL 2 DL, detailing ontology constructs, class expressions, property restrictions, and reasoning support. It guides the structure of generated ontologies and clarifies semantic intended meanings for classes, properties, and individuals in our JSON-LD output.
Published October 2009; updated as W3C Recommendation. Highly authoritative for ontology design.
## License: W3C Document License

# OWL 2 Mapping to RDF Graphs
## https://www.w3.org/TR/owl2-mapping-to-rdf/
Normative rules for serializing OWL 2 ontologies as RDF graphs, specifying how class axioms, data properties, and object properties map to triples. This mapping underpins our JSON-LD OWL generation (`generateOntology`) by ensuring proper `@id` usage and predicate IRIs.
Published December 2012. W3C Recommendation with full technical mappings.
## License: W3C Document License

# SPARQL 1.1 Query Language
## https://www.w3.org/TR/sparql11-query/
The formal W3C specification for SPARQL 1.1, describing the grammar, operators, graph patterns, solution modifiers, and result forms. Directly informs how we process and validate SPARQL queries in `queryOntology` and drive correct translation to Comunica queries.
Published March 2013. Authoritative W3C Recommendation.
## License: W3C Document License

# SPARQL 1.1 Protocol
## https://www.w3.org/TR/sparql11-protocol/
Defines HTTP-based communication patterns for SPARQL endpoints, including request methods, parameter formats, and result streaming. Essential for implementing SPARQL over HTTP and aligning our CLI `--query` behavior to standard protocols.
Published March 2013. W3C Recommendation.
## License: W3C Document License

# Comunica SPARQL Documentation
## https://comunica.dev/docs/query/sparql/
Official guide to using the Comunica SPARQL engine in JavaScript, covering engine configuration, bindings, HTTP sources, and performance tuning. Provides actionable examples for setting default graphs, passing bindings, and handling result streams in `queryOntology`.
Last updated 2024. Licensed under MIT. Highly practical for our `@comunica/query-sparql` integration.
## License: MIT

# JSONata Query and Transformation Language
## https://docs.jsonata.org/
Detailed reference for JSONata’s functional query and transformation syntax, including path navigation, filtering, and aggregation operators. Offers a more expressive alternative to simple dot‐expression querying, informing possible enhancements to our `esjQuery` feature.
Actively maintained; v1.8 published April 2024. Licensed under Apache-2.0.
## License: Apache-2.0

# JMESPath Specification
## https://jmespath.org/specification.html
Defines the formal grammar and evaluation semantics for JMESPath, a JSON query language supporting projections, filters, and multi-select. Useful for extending or benchmarking our simple expression-based queries in `esjQuery`.
Published 2017; specification maintained by the community. Licensed under MIT.
## License: MIT

# Wikidata API Entities Module
## https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities
Documentation for the `wbgetentities` module, enabling retrieval of structured Wikidata items in JSON. Essential for our data crawler (`fetchSource`) to fetch and map public entity data into OWL concepts and individuals.
Live documentation, updated continuously. API governed by CC-BY-SA 3.0 for docs and CC0 for data.
## License: CC-BY-SA 3.0 (docs), CC0 (data)

# Wikidata Query Service User Manual
## https://www.mediawiki.org/wiki/Wikibase_Query_Service/User_Manual
Guide to executing SPARQL queries against the Wikidata Query Service endpoint. Includes examples of querying item labels, property values, and qualifiers—directly applicable to `queryOntology` against remote sources.
Last reviewed 2024. Content under CC-BY-SA 3.0.
## License: CC-BY-SA 3.0

# DBpedia SPARQL Endpoint
## https://wiki.dbpedia.org/datasets/sparql-endpoint
Official documentation for accessing the DBpedia public SPARQL endpoint, detailing endpoint URLs, supported parameters, rate limits, and sample queries. Useful as a complementary data source for generating ontologies from linked open data.
Maintained by the DBpedia community; content under CC-BY 4.0.
## License: CC-BY 4.0

# JSON-LD JavaScript Implementation (jsonld.js)
## https://github.com/digitalbazaar/jsonld.js
The reference JavaScript implementation of JSON-LD, providing complete functionality for context processing, framing, and RDF conversions. Studying its modular design can inform performance optimizations and error handling in our library.
Repository last updated 2024. Licensed under BSD-3-Clause.
## License: BSD-3-Clause

# Apache Jena Documentation
## https://jena.apache.org/documentation/
Comprehensive tutorials and API references for Apache Jena, a Java framework for RDF and OWL processing. Offers insights on ontology models, SPARQL execution, and inference that can guide feature parity and potential Java interop considerations.
Published regularly; licensed under Apache-2.0.
## License: Apache-2.0

# RDFLib Python Library
## https://rdflib.readthedocs.io/en/stable/
Documentation for RDFLib’s graph APIs, SPARQL support, and serialization mechanisms in Python. Provides comparative patterns for graph construction, query execution, and context management that can inspire enhancements to our core JSON-LD/OWL processing.
Stable release documentation (2023). Licensed under BSD.
## License: BSD

# OBO Foundry Metadata and Ontology Formats
## http://www.obofoundry.org/ontology-development/ontology-file-utilization.html
Standards and best practices for developing and distributing OWL ontologies in the biomedical domain. Useful for structuring `@graph` metadata and ensuring interoperability with existing ontology ecosystems.
Maintained collaboratively; terms usually under CC-BY 1.0.
## License: CC-BY 1.0