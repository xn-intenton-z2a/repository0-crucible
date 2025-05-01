# W3C JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The foundational W3C Recommendation defining the JSON-LD 1.1 data model, framing, context processing, and expansion algorithms. Provides detailed normative definitions for context syntax, term definitions, and data manipulation, directly informing our implementation of `compact` and `expand` functions. Covers advanced features such as RDF conversions and framing semantics.
Published June 2020. Authoritative as a W3C Recommendation.
## License: W3C Document License

# W3C JSON-LD 1.1 API
## https://www.w3.org/TR/json-ld11-api/
A companion W3C Recommendation specifying the JavaScript API for JSON-LD processors. Defines `jsonld.compact`, `jsonld.expand`, `jsonld.flatten`, and framing interfaces, error handling, option parameters, and asynchronous processing models. Critical for aligning our library API signatures and options structures.
Published June 2020. Authoritative as a W3C Recommendation.
## License: W3C Document License

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
Comprehensive introduction to OWL 2 DL, detailing ontology constructs, class expressions, property restrictions, and reasoning support. Guides the structure of generated ontologies and clarifies semantic intended meanings for classes, properties, and individuals in our JSON-LD output.
Published October 2009; updated as W3C Recommendation. Highly authoritative for ontology design.
## License: W3C Document License

# OWL 2 Mapping to RDF Graphs
## https://www.w3.org/TR/owl2-mapping-to-rdf/
Normative rules for serializing OWL 2 ontologies as RDF graphs, specifying how class axioms, data properties, and object properties map to triples. Underpins our JSON-LD OWL generation (`generateOntology`) by ensuring proper `@id` usage and predicate IRIs.
Published December 2012. W3C Recommendation with full technical mappings.
## License: W3C Document License

# SPARQL 1.1 Query & Protocol
## https://www.w3.org/TR/sparql11-overview/
This combined entry covers both the SPARQL 1.1 Query Language specification and its HTTP Protocol. Explains grammar, operators, graph patterns, solution modifiers, result forms, and endpoint communication patterns (methods, parameters, streaming). Essential for parsing, validating and executing SPARQL (`queryOntology`) against remote endpoints.
Published March 2013. Authoritative W3C Recommendation.
## License: W3C Document License

# JavaScript SPARQL Tools
## https://comunica.dev/docs/query/sparql/
## https://github.com/RubenVerborgh/SPARQL.js
Consolidated guidance on JavaScript SPARQL processing: Comunica engine configuration, bindings, HTTP sources, streaming results, and engine tuning alongside SPARQL.js parsing of queries into JSON syntax trees for programmatic inspection and rewriting. Informs our `queryOntology` implementation and potential performance optimizations.
Last updated 2024. Licensed under MIT.
## License: MIT

# JSON Query and Transformation Languages
## https://docs.jsonata.org/
## https://jmespath.org/specification.html
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

# JSEP JavaScript Expression Parser
## https://github.com/EricSmekens/jsep
Lightweight JavaScript Expression Parser that parses JS expressions into ASTs. Provides grammar definitions for identifiers, literals, operators, and supports custom plugins. Useful for formalizing our `queryOntology` expression parsing and error diagnostics.
Repository last updated 2024. License: MIT.
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

# Java Semantic Web Frameworks
## https://jena.apache.org/documentation/
## http://owlcs.github.io/owlapi/apidocs/
Comprehensive Java-based tooling: Apache Jena tutorials and API references for RDF and OWL processing, and the OWL API programmatic interface covering ontology classes, properties, axioms, and reasoning with HermiT. Provides cross-language design patterns and potential interop considerations.
Jena licensed under Apache-2.0; OWL API licensed LGPL-3.0-or-later.
## License: Apache-2.0, LGPL-3.0-or-later

# Reference JSON-LD and OWL Implementations
## https://github.com/digitalbazaar/jsonld.js
## https://github.com/jsonld-java/jsonld-java
## https://github.com/digininja/owljs
Reference implementations in JavaScript (`jsonld.js`) and Java (`jsonld-java`, `OwlJS`) showcasing context processing, framing, serialization, and reasoning support. Useful for performance tuning, error handling, and advanced feature design.
Last updated 2024. Licenses: BSD-3-Clause, Apache-2.0, MIT.
## License: BSD-3-Clause, Apache-2.0, MIT

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

# Fetch API (Node.js & Browser)
## https://nodejs.org/api/globals.html#fetch
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Unified reference for the Fetch API in Node.js v20 and browsers, covering request/response objects, streaming, CORS, and error handling. Ensures our `fetchSource` implementation aligns with platform-native HTTP clients and adheres to web standards.
Node.js docs updated 2024 (MIT); MDN last reviewed 2024 (CC-BY-SA 2.5).
## License: MIT, CC-BY-SA 2.5

# Utility Libraries for Configuration, Validation, Templating & Patterns
## https://github.com/motdotla/dotenv
## https://github.com/nodeca/js-yaml#readme
## https://ejs.co/#docs
## https://zod.dev
## https://github.com/isaacs/minimatch
Documentation for key utility packages: dotenv (environment variable loading), js-yaml (YAML parsing/dumping), EJS (embedded JS templating), Zod (schema validation), and minimatch (glob pattern matching). Essential for robust configuration, input validation, template-driven outputs, and file matching in CLI workflows.
All licensed under MIT; package docs last updated 2024.
## License: MIT

# REST Countries API v3.1
## https://restcountries.com/#api-endpoints-v3-all
The REST Countries API provides a comprehensive endpoint to retrieve country data in JSON format, including names, capitals, region, population, and more. The `/v3.1/all` endpoint returns an array of country objects with normalized property names and supports field filtering via query parameters. Essential for implementing the `--capital-cities` feature, allowing efficient HTTP GET requests, response filtering, and JSON parsing.
## License: Public domain / free to use

# OpenAI API Reference
## https://platform.openai.com/docs/api-reference
Official OpenAI REST API documentation covering authentication, request/response schemas, completions, chat, embeddings, and usage examples. Valuable for extending CLI features like `--refresh` or AI-driven data generation, providing concrete API patterns and error handling guidance.
Last updated 2024. See OpenAI API Terms of Service for usage.
## License: Proprietary (see terms)

# RDFLib Documentation
## https://rdflib.readthedocs.io/en/stable/
Python library for RDF graph processing, supporting parsing/serializing various formats, SPARQL querying, and graph manipulation. Contains extensive code examples and API references; useful as a cross-language reference for feature parity and advanced graph operations.
Last updated 2024. Licensed under BSD-3-Clause.
## License: BSD-3-Clause

# Protégé Desktop Documentation
## https://protege.stanford.edu/documentation/
Comprehensive user and developer guide for the Protégé OWL ontology editor, covering UI workflows, ontology modeling best practices, plugin architecture, and reasoning integration. Provides a rich conceptual reference to inform ontology design patterns and tool interoperability.
Last updated 2023. Licensed under BSD-2-Clause.
## License: BSD-2-Clause

# Yargs CLI Arguments Parser Documentation
## https://yargs.js.org/docs/
Comprehensive guide to using yargs for command-line argument parsing in Node.js, including option definitions, positional arguments, command modules, automatic help text generation, and advanced usage patterns. Could simplify and enhance our CLI flag handling in `main.js`.
Last updated 2024. Licensed under MIT.
## License: MIT

# Node.js File System API Documentation
## https://nodejs.org/api/fs.html
The Node.js File System module reference, detailing `fs.watch`, `fs.promises`, file streams, and directory operations. Essential for implementing and optimizing CLI commands like `--refresh`, `--serve`, and intermediate build features that depend on watching or manipulating files.
Last updated 2024. Licensed under MIT.
## License: MIT