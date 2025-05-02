# JSON-LD 1.1 Specification
## https://www.w3.org/TR/json-ld11/
The official W3C Recommendation for JSON-LD 1.1 outlines the data model, processing algorithms, and serialization formats (JSON and JSON-LD) for linked data. It provides detailed information on @context definitions, term expansion, compaction, framing, and @graph management. This is essential for implementing JSON-LD output, ensuring that @context handling in generateOntology aligns with the standard. (Published July 16, 2020)
## License
W3C Document License

# OWL 2 Web Ontology Language Overview
## https://www.w3.org/TR/owl2-overview/
This W3C Recommendation introduces the key concepts, constructs, and profiles (OWL 2 DL, EL, QL, RL) of the OWL 2 ontology language. It explains class hierarchies, properties, individuals, and ontology IRI roles. Vital for understanding how to structure the @graph nodes and choose appropriate OWL constructs in the JSON-LD document. (Published October 27, 2009)
## License
W3C Document License

# OWL 2 Quick Reference
## https://www.w3.org/TR/owl2-quick-reference/
A concise reference sheet of OWL 2 syntax in functional, RDF/XML, and Manchester formats. Includes common vocabulary IRIs (e.g., owl:Class, rdf:Property) and axioms. Helps developers map JavaScript objects to OWL 2 terms when building graph nodes, ensuring correct @id and term properties. (Published October 27, 2009)
## License
W3C Document License

# jsonld.js (JavaScript JSON-LD API)
## https://github.com/digitalbazaar/jsonld.js
An open-source JavaScript library for JSON-LD operations: expansion, compaction, framing, normalization, and more. Offers low-level APIs to manipulate contexts and graphs, with streaming support and promise-based methods. Useful as a reference or fallback for advanced JSON-LD transformations beyond simple @context and @graph generation. (Last updated 2024)
## License
MIT

# RDF/JS Specification
## https://rdf.js.org/
Defines standard interfaces for RDF data structures (Term, Quad, Dataset) in JavaScript, enabling interoperability between RDF libraries. Although generateOntology produces JSON-LD objects directly, understanding RDF/JS can guide extension towards streaming data, quad management, or integration with RDF stores. (Latest version 2023)
## License
CC0

# Zod Schema Validation
## https://github.com/colinhacks/zod
Zod is a TypeScript-first schema declaration and validation library. The CLI uses Zod to validate subcommand options (e.g., --input, --ontology-iri). Its documentation covers schema creation, parsing, async transforms, and custom error formatting—key for robust option handling in the convert and capital-cities commands. (Last release May 2024)
## License
MIT

# Node.js fs/promises API
## https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
Documentation for the promise-based file system API, including readFile, writeFile, and directory operations. Essential for implementing convert and other file-based subcommands: reading JSON input, writing output files, and error handling best practices. (Node.js Foundation)
## License
CC BY 4.0

# Node.js Process and CLI Best Practices
## https://nodejs.org/api/process.html#processargv
Details on accessing process.argv, environment variables, exit codes, and synchronous vs asynchronous operations in Node.js. Guides how to parse CLI arguments and ensure graceful error messages and exit behavior, as used by the --diagnostics flag implementation. (Node.js Foundation)
## License
CC BY 4.0

# Node.js ESM import.meta.url
## https://nodejs.org/api/esm.html#esm_import_meta_url
Explains import.meta.url and how to derive file paths in ES modules (using fileURLToPath and dirname). Critical for locating package.json in the --diagnostics implementation without CommonJS. (Node.js Foundation)
## License
CC BY 4.0

# Node.js Path Module
## https://nodejs.org/api/path.html
Comprehensive documentation of Node.js path module functions, including join, dirname, basename, extname, and platform-specific path considerations. Essential for resolving file locations in ESM modules and constructing cross-platform paths when reading and writing files in the CLI tool. (Node.js Foundation)
## License
CC BY 4.0

# REST Countries API Documentation
## https://restcountries.com/#api-endpoints-v3-all
Provides endpoint definitions and response schemas for fetching country data, including capitals. The capital-cities subcommand relies on this API. Understanding pagination, field filters, and error responses helps build resilient fetch logic. (Public domain)
## License
Public Domain

# Node.js Global Fetch API
## https://nodejs.org/api/globals.html#fetch
Details the global fetch API available in Node.js (v18+), including request initiation, Response object handling, streaming interfaces, AbortController support, and network error semantics. Critical for implementing robust HTTP requests in the capital-cities command. (Node.js Foundation)
## License
CC BY 4.0

# Fetch API (MDN)
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
In-depth specification of the Fetch standard as implemented in browsers and Node.js, covering Request and Response objects, promise-based handling, streamed bodies, headers, and error semantics. Useful reference for understanding fetch behaviors, CORS, and edge cases when integrating external APIs. (MDN)
## License
Creative Commons Attribution-ShareAlike

# Vitest Automated Testing Framework
## https://vitest.dev/
A Vite-native unit test framework with Jest-compatible API, snapshot testing, and built-in coverage. Documentation covers mocking, spying (vi.spyOn), asynchronous tests, and configuration. Directly applicable for writing and extending tests under tests/unit and tests/e2e. (MIT License)
## License
MIT