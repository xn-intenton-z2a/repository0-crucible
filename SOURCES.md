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

# SPARQL 1.1 Query & Protocol
## https://www.w3.org/TR/sparql11-overview/
This combined entry covers both the SPARQL 1.1 Query Language specification and its HTTP Protocol. It explains grammar, operators, graph patterns, solution modifiers, result forms, and endpoint communication patterns (methods, parameters, streaming). Essential for parsing, validating and executing SPARQL (`queryOntology`) against remote endpoints.
Published March 2013. Authoritative W3C Recommendation.
## License: W3C Document License

# Comunica SPARQL Documentation
## https://comunica.dev/docs/query/sparql/
Official guide to using the Comunica SPARQL engine in JavaScript, covering engine configuration, bindings, HTTP sources, and performance tuning. Provides actionable examples for setting default graphs, passing bindings, and handling result streams in `queryOntology`.
Last updated 2024. Licensed under MIT. Highly practical for our `@comunica/query-sparql` integration.
## License: MIT

# JSON Query and Transformation Languages
## https://docs.jsonata.org/ & https://jmespath.org/specification.html
A consolidated overview of JSONata and JMESPath, two expressive JSON query languages. JSONata provides functional operators (filtering, aggregation, path navigation) for transformation pipelines, while JMESPath offers projection and filtering semantics in JSON. Useful for enhancing or benchmarking `esjQuery` features with richer querying capabilities.
JSONata v1.8 published April 2024 (Apache-2.0). JMESPath spec maintained since 2017 (MIT).
## License: Apache-2.0 (JSONata), MIT (JMESPath)

# Wikidata API Entities Module
## https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities
Documentation for the `wbgetentities` module, enabling retrieval of structured Wikidata items in JSON. Essential for our data crawler (`fetchSource`) to fetch and map public entity data into OWL concepts and individuals.
Live documentation; API governed by CC-BY-SA 3.0 for docs and CC0 for data.
## License: CC-BY-SA 3.0 (docs), CC0 (data)

# Wikidata Query Service User Manual
## https://www.mediawiki.org/wiki/Wikibase_Query_Service/User_Manual
Guide to executing SPARQL queries against the Wikidata Query Service endpoint. Includes examples of querying item labels, property values, and qualifiers—directly applicable to `queryOntology` against remote sources.
Last reviewed 2024.
## License: CC-BY-SA 3.0

# DBpedia SPARQL Endpoint
## https://wiki.dbpedia.org/datasets/sparql-endpoint
Official documentation for accessing the DBpedia public SPARQL endpoint, detailing endpoint URLs, supported parameters, rate limits, and sample queries. Useful as a complementary data source for generating ontologies from linked open data.
Maintained by the DBpedia community; content under CC-BY 4.0.
## License: CC-BY 4.0

# JSON-LD JavaScript Implementation (jsonld.js)
## https://github.com/digitalbazaar/jsonld.js
The reference JavaScript implementation of JSON-LD, providing complete functionality for context processing, framing, and RDF conversions. Studying its modular design can inform performance optimizations and error handling in our library.
Repository last updated 2024.
## License: BSD-3-Clause

# Reference Implementations & Toolkits
## https://github.com/jsonld-java/jsonld-java & https://github.com/digininja/owljs
Covers Java (`jsonld-java`) and Node.js (`OwlJS`) implementations of JSON-LD and OWL toolkits respectively, showcasing context processing, framing, serialization, and reasoning support. Useful for cross-language design patterns and advanced feature considerations.
`jsonld-java` last updated 2024 (Apache-2.0). `OwlJS` released 2023 (MIT).
## License: Apache-2.0, MIT

# Apache Jena Documentation
## https://jena.apache.org/documentation/
Comprehensive tutorials and API references for Apache Jena, a Java framework for RDF and OWL processing. Offers insights on ontology models, SPARQL execution, and inference that can guide feature parity and potential Java interop considerations.
Published regularly; licensed under Apache-2.0.
## License: Apache-2.0

# RDF/JS Data Model Specification
## https://rdf.js.org/data-model-spec/
Community-driven specification defining the RDF/JS interfaces for terms, quads, and datasets in JavaScript. Establishes a standard data model that can inform interoperable graph representations and potential integration with RDF/JS libraries.
Published 2020; CC-BY 4.0.
## License: CC-BY 4.0

# N3.js RDF Library
## https://github.com/rdfjs/N3.js#readme
High-performance Node.js library for parsing and serializing RDF in N3, Turtle, TriG, and N-Triples formats. Offers streaming support and an in-memory quad store for advanced graph operations, complementing JSON-LD conversion workflows.
Repository last updated 2024.
## License: MIT

# RDF 1.1 Concepts and Abstract Syntax
## https://www.w3.org/TR/rdf11-concepts/
Describes the RDF graph data model, including triples, subjects, predicates, and objects, and the abstract syntax used for serializing RDF. Underpins understanding of JSON-LD to RDF conversion in `jsonld.toRDF` and `jsonld.fromRDF` processes.
Published February 2014. Authoritative as W3C Recommendation.
## License: W3C Document License

# SHACL - Shapes Constraint Language
## https://www.w3.org/TR/shacl/
Defines a vocabulary and rules for validating RDF graphs, including shapes, constraints, and SPARQL-based extensions. Essential for implementing future graph validation features in the library (e.g., ensuring generated OWL ontologies meet shape constraints).
Published July 2023. Authoritative as W3C Recommendation.
## License: W3C Document License

# JSON Schema Core (Draft 2020-12)
## https://json-schema.org/draft/2020-12/json-schema-core.html
The meta-schema and core definitions for JSON Schema validation, defining vocabulary for data modeling, type keywords, and validation mechanisms. Valuable for mapping JSON Schema constructs to OWL classes and properties in `generateOntology`.
Last updated December 2020.
## License: CC0

# SPARQL 1.1 Update
## https://www.w3.org/TR/sparql11-update/
Specification of the SPARQL 1.1 Update language, detailing the syntax and semantics of INSERT, DELETE, LOAD, and other graph update operations. Provides guidance for implementing future ontology modification commands (e.g., `updateOntology`).
Published March 2013. Authoritative as W3C Recommendation.
## License: W3C Document License

# Node.js Global Fetch API
## https://nodejs.org/api/globals.html#fetch
Official Node.js v20 documentation describing the built-in global `fetch` function, including its usage, request/response details, streaming support, and error handling. This reference ensures our `fetchSource` implementation aligns with the platform’s native HTTP client.
Last updated 2024. Authoritative as Node.js Foundation documentation.
## License: MIT

# MDN Fetch API
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Comprehensive guide to the Fetch API standards in browsers, covering HTTP methods, request/response objects, streaming, CORS, and error scenarios. Provides broader context and best practices for implementing reliable HTTP fetching in our data crawler.
Last reviewed 2024. Community-maintained; CC-BY-SA 2.5.
## License: CC-BY-SA 2.5

# Zod Validation Library
## https://zod.dev
Documentation for Zod, a TypeScript-first schema validation library used for parsing and validating input data. Offers examples of schema definitions, type inference, and error formatting—applicable for enhancing option and payload validation in our API surfaces.
Latest version 3.x. License: MIT. Highly practical for robust input handling.
## License: MIT

# Vitest Testing Framework
## https://vitest.dev
Official documentation for Vitest, a blazing-fast test runner and assertion library for Vite and ESM projects. Covers test configuration, mock APIs, snapshot testing, and coverage reports. Essential for expanding our test suite (`vitest`) effectively.
Last updated 2024. Licensed under MIT.
## License: MIT

# JSEP JavaScript Expression Parser
## https://github.com/EricSmekens/jsep
Lightweight JavaScript Expression Parser that parses JS expressions into ASTs. Provides grammar definitions for identifiers, literals, operators, and supports custom plugins. Useful for formalizing our `queryOntology` expression parsing and error diagnostics.
Repository last updated 2024. License: MIT.
## License: MIT

# SPARQL.js - SPARQL Parser in JavaScript
## https://github.com/RubenVerborgh/SPARQL.js
A JavaScript library that parses SPARQL queries into JSON syntax trees and serializes back. Enables programmatic inspection and transformation of SPARQL queries, which can be leveraged for advanced query rewriting in `queryOntology`.
Last updated 2024. License: MIT.
## License: MIT

# Dotenv - Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Defines how to load environment variables from `.env` files into `process.env`. Guides configuration patterns for API endpoints and credentials in our data crawler, ensuring consistent handling of secrets and defaults.
Version 16.x. Documentation under MIT.
## License: MIT

# rdf-ext: RDF/JS Library Ecosystem
## https://github.com/rdf-ext/rdf-ext
Collection of utilities and implementations for RDF/JS data models and parsers, including dataset factories and serialization. Useful for advanced graph manipulation, dataset merging, and streaming operations that could complement our JSON-LD handling.
Last updated 2024. License: MIT.
## License: MIT

# GraphQL-LD Documentation
## https://graphql-ld.dev/docs/getting-started
Integrates GraphQL query syntax with Linked Data sources using JSON-LD contexts, enabling expressive data retrieval from RDF endpoints. Includes technical setup, context mappings, resolver patterns, and performance guidelines—actionable for designing alternative query interfaces in our CLI.
Last updated 2024. Licensed under MIT.
## License: MIT

# OWL API (Java) Documentation
## http://owlcs.github.io/owlapi/apidocs/
Comprehensive Java API for building, manipulating, and serializing OWL ontologies programmatically. Covers ontology classes, properties, axioms, and reasoning support via HermiT and other reasoners. Essential for cross-language reference and design patterns.
Last updated 2023; maintained by the OWLAPI community.
## License: LGPL-3.0-or-later