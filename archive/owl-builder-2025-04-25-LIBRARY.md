library/OWL2_OVERVIEW.md
# library/OWL2_OVERVIEW.md
# OWL2_OVERVIEW

## Crawl Summary
OWL 2 Overview: Defines ontology structure (classes, properties, individuals) per OWL 2 Structural Specification. Syntax options include RDF/XML (mandatory), OWL/XML, Functional, Manchester, and Turtle. Semantics are provided via Direct Semantics (SROIQ compatible) and RDF-Based Semantics (RDF mapping). Profiles (EL, QL, RL) offer tailored sublanguages for performance and reasoning trade-offs. Documentation roadmap details core specifications and change log history with explicit version dates and editorial notes.

## Normalised Extract
Table of Contents:
1. Introduction
   - OWL 2 provides classes, properties, individuals, and data values in Semantic Web ontologies.
2. Ontologies
   - Defined using UML in the OWL 2 Structural Specification; can be represented as RDF graphs using the Mapping to RDF Graphs document.
3. Syntaxes
   - RDF/XML: URI: http://www.w3.org/TR/2012/REC-owl2-overview-20121211/, Mandatory interchange format.
   - OWL/XML: XML Serialization; optional for XML processing.
   - Functional Syntax: Follows Structural Specification for clear formal structure.
   - Manchester Syntax: Human readable; used in several editors.
   - Turtle: Optional alternative for RDF triple representation.
4. Semantics
   - Direct Semantics: Uses SROIQ; requires syntactic conditions (e.g. transitive constraints in number restrictions) for OWL 2 DL.
   - RDF-Based Semantics: Maps OWL 2 ontologies to RDF graphs; compatible with RDF Semantics; enables OWL 2 Full interpretation.
   - Correspondence theorem ensures inferences remain valid across both semantics.
5. Profiles
   - EL: Optimized for polynomial time reasoning in large ontologies.
   - QL: Enables efficient conjunctive queries via relational databases (AC0, LogSpace).
   - RL: Rule-based reasoning directly on RDF triples with sound (and in many cases complete) query responses.
6. Relationship to OWL 1
   - Structural similarities with OWL 1 ensuring full backward compatibility.
   - Introduces new syntactic sugar (e.g. disjoint union), richer datatypes, and qualified cardinality restrictions.
7. Documentation Roadmap
   - Lists eleven documents including core specifications (Structural Specification, Mapping to RDF Graphs, Direct Semantics, RDF-Based Semantics, Conformance) and user guides (Overview, Primer, Quick Reference Guide).
8. Change Log
   - Sections for Changes Since Recommendation, Proposed Recommendation, and Last Call with precise dates (e.g., Recommendation 27 October 2009, update on 5 April 2012).
9. Acknowledgements
   - Detailed list of working group attendees and key contributors with institutional affiliations and roles.
This extract provides explicit technical details and references for direct implementation in ontology development and Semantic Web tools.

## Supplementary Details
Technical Specifications:
- OWL 2 Structural Specification: Defines ontology structure via UML diagrams and a functional-style syntax for compact representation. Includes conditions for OWL 2 DL (e.g., no transitive properties in number restrictions).
- Syntax Configurations:
    * RDF/XML: Mandatory; endpoint URL: http://www.w3.org/TR/2012/REC-owl2-overview-20121211/.
    * OWL/XML: Optional; used for XML-based processing.
    * Functional Syntax: Optional; mirrors structural specification for clarity.
    * Manchester Syntax: Optional; human-readable with editor support.
    * Turtle: Optional; lightweight form for RDF triple serialization.
- Semantics Details:
    * Direct Semantics: Maps ontology elements to SROIQ; method enforces syntactic conditions for validity.
    * RDF-Based Semantics: Applies mapping rules to convert ontology into RDF graphs; supports OWL 2 Full and adheres to extended RDF semantic conditions.
- Profiles Implementation:
    * EL, QL, RL are defined as subsets of the structural elements with explicit restrictions; profile selection is based on performance needs and reasoning capabilities.
- Implementation Steps:
    1. Choose a concrete syntax (e.g. RDF/XML) based on tool support.
    2. Validate ontology against Structural Specification conditions for OWL 2 DL if using Direct Semantics.
    3. For rule-based reasoning, apply OWL 2 RL profile with specified mapping to RDF triples.
    4. Verify semantic consistency using both Direct and RDF-Based Semantics via correspondence theorem.
- Configuration Options:
    * Syntax selection: { format: 'RDF/XML' | 'OWL/XML' | 'Functional' | 'Manchester' | 'Turtle' }.
    * Semantics mode: { mode: 'Direct' (for DL) | 'RDF-Based' (for full ontologies) }.
- Best Practices:
    * Use RDF/XML as the common interchange format.
    * Validate ontology consistency with both semantic interpretations.
    * Employ Manchester Syntax for manual editing and review.
    * Select the appropriate profile (EL, QL, RL) based on application domain and performance requirements.
- Troubleshooting Procedures:
    * Command for validating RDF/XML: use OWL API validator with command line: "owlapi-validator --input ontology.owl --format RDF/XML"; expected output: valid if no syntax errors.
    * For semantic errors in OWL 2 DL: check conditions outlined in Section 3 of the Structural Specification; use detailed logs to identify clause violations (e.g. transitivity in number restrictions).
    * Use correspondence theorem checks to compare inference results between Direct and RDF-Based Semantics.

## Reference Details
API Specifications and Implementation Patterns:
- No explicit SDK methods in the document; however, the following patterns apply:

Pattern for Ontology Creation:
Method: createOntology(String ontologyIRI) -> Ontology
Parameters: ontologyIRI: String (e.g. 'http://example.org/myOntology')
Return Type: Ontology object with methods for adding classes, properties, individuals.

Pattern for Adding Classes:
Method: addClass(Ontology ontology, String classIRI) -> void
Parameters: ontology: Ontology object
            classIRI: String
Example Implementation:
// Create an ontology
Ontology ontology = createOntology('http://example.org/myOntology');
// Add a class
addClass(ontology, 'http://example.org/myOntology#Person');

Configuration Options in OWL Tools (e.g., OWL API configuration):
Property: syntaxFormat, Values: 'RDF/XML' (default), 'OWL/XML', 'Functional', 'Manchester', 'Turtle'
Property: semanticsMode, Values: 'Direct', 'RDF-Based'
Effect: Determines the parsing, validation, and reasoning strategy.

Best Practices:
- Always validate ontology against the OWL 2 Structural Specification conditions before reasoning.
- Use RDF/XML format for exchange between systems.
- For manual editing, convert to Manchester Syntax for readability.
- When using rule-based reasoning (OWL 2 RL), ensure the rule engine applies the complete set of inference rules as defined in the Profiles document.

Troubleshooting Steps:
1. Validate file using command: owlapi-validator --input ontology.owl --format RDF/XML
2. If errors occur, check the log for specific clause references (e.g., Section 3 of Structural Specification) and adjust transitive properties in cardinality restrictions.
3. Compare inference results between Direct and RDF-Based Semantics by running: owl-inference-checker --ontology ontology.owl --mode Direct
4. If discrepancies are found, consult the correspondence theorem details in the RDF-Based Semantics document.

Return Types and Exceptions:
- createOntology: returns Ontology; throws OntologyCreationException if invalid IRI.
- addClass: returns void; throws InvalidOntologyException if ontology fails structural checks.

These detailed specifications and patterns are directly extracted from the OWL 2 Overview documentation and provide a concrete implementation blueprint for developers using OWL 2 in Semantic Web environments.

## Information Dense Extract
OWL2: Ontology language with defined UML structure; Syntax: RDF/XML (mandatory), OWL/XML, Functional, Manchester, Turtle; Semantics: Direct (SROIQ compatible, strict conditions) and RDF-Based (RDF graph mapping, full ontology support); Profiles: EL (polynomial reasoning), QL (AC0 query performance), RL (rule-based reasoning, sound/complete on ground queries); Documentation: includes Structural Specification, Mapping to RDF Graphs, Direct and RDF-Based Semantics, Conformance, Profiles; API patterns: createOntology(String IRI) -> Ontology; addClass(Ontology, String) -> void; Config options: syntaxFormat ('RDF/XML' default), semanticsMode ('Direct' or 'RDF-Based'); Troubleshooting: owlapi-validator, owl-inference-checker; Exceptions: OntologyCreationException, InvalidOntologyException; Reference URIs provided; change log details with dates; full technical details per W3C TR/owl2-overview.

## Sanitised Extract
Table of Contents:
1. Introduction
   - OWL 2 provides classes, properties, individuals, and data values in Semantic Web ontologies.
2. Ontologies
   - Defined using UML in the OWL 2 Structural Specification; can be represented as RDF graphs using the Mapping to RDF Graphs document.
3. Syntaxes
   - RDF/XML: URI: http://www.w3.org/TR/2012/REC-owl2-overview-20121211/, Mandatory interchange format.
   - OWL/XML: XML Serialization; optional for XML processing.
   - Functional Syntax: Follows Structural Specification for clear formal structure.
   - Manchester Syntax: Human readable; used in several editors.
   - Turtle: Optional alternative for RDF triple representation.
4. Semantics
   - Direct Semantics: Uses SROIQ; requires syntactic conditions (e.g. transitive constraints in number restrictions) for OWL 2 DL.
   - RDF-Based Semantics: Maps OWL 2 ontologies to RDF graphs; compatible with RDF Semantics; enables OWL 2 Full interpretation.
   - Correspondence theorem ensures inferences remain valid across both semantics.
5. Profiles
   - EL: Optimized for polynomial time reasoning in large ontologies.
   - QL: Enables efficient conjunctive queries via relational databases (AC0, LogSpace).
   - RL: Rule-based reasoning directly on RDF triples with sound (and in many cases complete) query responses.
6. Relationship to OWL 1
   - Structural similarities with OWL 1 ensuring full backward compatibility.
   - Introduces new syntactic sugar (e.g. disjoint union), richer datatypes, and qualified cardinality restrictions.
7. Documentation Roadmap
   - Lists eleven documents including core specifications (Structural Specification, Mapping to RDF Graphs, Direct Semantics, RDF-Based Semantics, Conformance) and user guides (Overview, Primer, Quick Reference Guide).
8. Change Log
   - Sections for Changes Since Recommendation, Proposed Recommendation, and Last Call with precise dates (e.g., Recommendation 27 October 2009, update on 5 April 2012).
9. Acknowledgements
   - Detailed list of working group attendees and key contributors with institutional affiliations and roles.
This extract provides explicit technical details and references for direct implementation in ontology development and Semantic Web tools.

## Original Source
W3C Semantic Web & Linked Data Standards
https://www.w3.org/TR/owl2-overview/

## Digest of OWL2_OVERVIEW

# OWL2_OVERVIEW

Retrieved Date: 2023-10-11
Data Size: 19558034 bytes
Links Found: 40922

## Overview
This document is the W3C Recommendation for the OWL 2 Web Ontology Language (Second Edition) published on 11 December 2012. It details the formal structure, syntaxes, semantics, profiles, and change history of OWL 2 for Semantic Web applications.

## Table of Contents
1. Introduction
2. Ontologies
3. Syntaxes
4. Semantics
5. Profiles
6. Relationship to OWL 1
7. Documentation Roadmap
8. Change Log
9. Acknowledgements

## 1. Introduction
OWL 2 is an ontology language for the Semantic Web with formally defined meaning. It provides constructs for classes, properties, individuals, and data types. The language is designed to be used in RDF documents with explicit mappings to RDF graphs.

## 2. Ontologies
- Defined in the OWL 2 Structural Specification.
- Conceptual structure is represented by UML diagrams.
- Two views: abstract structure and RDF graph representation (Mapping to RDF Graphs document).
- Functional-style syntax option matches the structural specification exactly.

## 3. Syntaxes
Supported syntaxes include:

Name: RDF/XML
Specification: Mapping to RDF Graphs, RDF/XML
Status: Mandatory
Purpose: Interchange format; must be supported by all conformant tools.

Name: OWL/XML
Specification: XML Serialization
Status: Optional
Purpose: Easier processing with XML tools.

Name: Functional Syntax
Specification: Structural Specification
Status: Optional
Purpose: Clearly shows the formal structure of ontologies.

Name: Manchester Syntax
Specification: Manchester Syntax
Status: Optional
Purpose: Human readable; commonly used in ontology editors.

Name: Turtle
Specification: Mapping to RDF Graphs, Turtle
Status: Optional, Not from OWL-WG
Purpose: Read/write RDF triples in a concise form.

## 4. Semantics
Two semantic approaches are provided:

Direct Semantics:
- Assigns meaning directly to ontology structures.
- Compatible with SROIQ description logic.
- OWL 2 DL ontologies satisfy syntactic conditions (e.g., restrictions on transitive properties in number restrictions).

RDF-Based Semantics:
- Assigns meaning by mapping OWL 2 ontologies to RDF graphs.
- Fully compatible with RDF Semantics.
- Allows interpretation of any OWL 2 ontology without restrictions (OWL 2 Full).

A correspondence theorem links Direct and RDF-Based Semantics ensuring consistency between inference results.

## 5. Profiles
OWL 2 defines three sub-languages:

OWL 2 EL:
- Enables polynomial time reasoning for large ontologies.

OWL 2 QL:
- Enables conjunctive query answering in LogSpace/AC0 via relational database technology.

OWL 2 RL:
- Supports rule-based reasoning directly on RDF triples; guarantees soundness and often completeness for ground atomic queries (Theorem PR1).

## 6. Relationship to OWL 1
- Overall structure similar to OWL 1 with largely equivalent building blocks.
- Backwards compatibility: All OWL 1 ontologies are valid OWL 2 ontologies with identical practical inferences.
- New features include richer datatype support, qualified cardinality restrictions, and additional property characteristics (asymmetry, reflexivity, disjointness, etc.).

## 7. Documentation Roadmap
Core specifications include:
1. Document Overview - introductory guide.
2. Structural Specification and Functional-Style Syntax - defines constructs and global restrictions.
3. Mapping to RDF Graphs - defines the RDF serialization for OWL 2.
4. Direct Semantics - model theoretic semantics for OWL 2.
5. RDF-Based Semantics - extension of RDF semantics for OWL 2.
6. Conformance - requirements for compliance and testing.
7. Profiles - detailed restrictions for OWL 2 EL, QL, RL.
8. Supplementary user documents such as the OWL 2 Primer, New Features and Rationale, and Quick Reference Guide.

## 8. Change Log
Detailed log with three sections:
- Changes Since Recommendation
- Changes Since Proposed Recommendation
- Changes Since Last Call
Includes specific dates (e.g., Recommendation of 27 October 2009, changes following XSD 1.1 adoption on 5 April 2012) and minor editorial adjustments.

## 9. Acknowledgements
Lists the members of the OWL Working Group, key reviewers (e.g., Ivan Herman, Ian Horrocks, Peter F. Patel-Schneider) and provides recognition to past contributors including OWL1.1 submissions and OWLED workshop participants.

## Attribution
Content extracted from W3C TR/owl2-overview. Attribution to W3C OWL Working Group, with copyrights © 2012 W3C®.

## Attribution
- Source: W3C Semantic Web & Linked Data Standards
- URL: https://www.w3.org/TR/owl2-overview/
- License: License: W3C Document Notice
- Crawl Date: 2025-04-25T00:38:39.950Z
- Data Size: 19558034 bytes
- Links Found: 40922

## Retrieved
2025-04-25
library/SPARQL_QUERY.md
# library/SPARQL_QUERY.md
# SPARQL_QUERY

## Crawl Summary
SPARQL 1.1 Query Language W3C Recommendation (21 March 2013) including exact syntax specifications for IRIs, literals, query variables, blank nodes, and triple pattern constructs. Contains detailed sections on query forms (SELECT, CONSTRUCT, ASK, DESCRIBE), RDF term grammar, use of BASE and PREFIX for IRI resolution, full filter usage with regex and arithmetic operators, and complete code examples with data and result sets.

## Normalised Extract
Table of Contents:
1. DOCUMENT STRUCTURE
   - Namespace declarations, data descriptions in Turtle, and RDF term definitions.
2. QUERY FORMS
   - SELECT: Example: SELECT ?title WHERE { <http://example.org/book/book1> dc:title ?title } returns 'SPARQL Tutorial'.
   - CONSTRUCT: Format with graph building; template triples become output RDF graph.
   - ASK and DESCRIBE: Defined with precise expected behavior.
3. RDF TERM SYNTAX
   - IRIs: Use IRIREF definitions, prefixed names (PREFIX book: <http://example.org/book/>, book:book1 resolves accordingly), and relative IRIs using BASE.
   - Literals: Syntax allows double or single quotes, optional language tags ("chat"@fr) and datatype IRI using ^^ ("1"^^xsd:integer).
   - Variables: Noted with ? or $, e.g., ?var.
   - Blank Nodes: Represented as _:[label] or abbreviated with [].
4. TRIPLE PATTERN SYNTAX
   - Single triple: Subject, Predicate, Object pattern (e.g., <http://example.org/book/book1> dc:title ?title).
   - Predicate-Object lists using semicolon;
   - Object Lists using comma for shared subject and predicate.
5. EXPRESSIONS AND FILTERS
   - Filters using regex: e.g., FILTER regex(?title, '^SPARQL') and numeric comparisons: FILTER (?price < 30.5).
6. EXTRACTION OF VALUES
   - Use of BIND and assignment expressions: BIND(CONCAT(?G, ' ', ?S) AS ?name).
7. ADVANCED GRAMMAR DETAILS
   - Includes full grammar for IRIs, blank nodes and handling escapes in SPARQL local names.
8. CODE EXAMPLES
   - Detailed query examples with associated data and expected results provided inline with comments.
Each entry includes exact syntax, configuration using BASE and PREFIX, and concrete examples directly applicable by developers.

## Supplementary Details
Technical Specifications:
- Namespace and BASE declaration:
   BASE <http://example.org/book/>
   PREFIX dc: <http://purl.org/dc/elements/1.1/>
   PREFIX book: <http://example.org/book/>
- IRIs: Must be enclosed in <> or defined via PREFIX. Example: <http://example.org/book/book1> or book:book1.
- Literals: Exact forms include "text"; language tags appended with @ (e.g., "chat"@fr); typed literals with ^^ (e.g., "42"^^xsd:integer).
- Query Variables: Identified with ? or $. 
- Triple Patterns: Written as subject predicate object. Abbreviations include use of ';' for multiple predicates for the same subject, and ',' for multiple objects for the same predicate.
- Query examples:
   Data: @prefix dc: <http://purl.org/dc/elements/1.1/> .
         <http://example.org/book/book1> dc:title "SPARQL Tutorial" .
   Query: SELECT ?title WHERE { <http://example.org/book/book1> dc:title ?title }.
- Filter expressions: Use regex with optional flags (e.g., i for case-insensitivity), numeric comparisons, and string functions such as CONCAT, str, and language tag matches.
- Blank Nodes: Represented as _:<label> or []. Unique labels are auto-generated if omitted.
- Detailed troubleshooting:
   * Validate query syntax using SPARQL grammar rules.
   * Ensure BASE and PREFIX declarations are correctly specified to resolve relative IRIs.
   * Confirm literal datatypes (xsd:integer, xsd:decimal, xsd:double) are used as per data expectations.
   * Use of FILTER conditions must match exact literal forms; mismatches in language tags or datatypes will result in no solution.
- Configuration options:
   * BASE URI: Default from retrieval URI if not provided explicitly.
   * PREFIX mappings: Must be unique and correctly resolved.
   * SPARQL Query processors should implement full grammar as per section 19 of the specification.

## Reference Details
API and SDK-like Specifications for SPARQL Query Language:

// Query method signature example:
// Function: executeSPARQLQuery
// Parameters:
//   query: string - The SPARQL query to be executed.
//   dataset: RDFGraph - The RDF dataset against which the query is run.
// Returns: QueryResult - An object containing variable bindings, RDF graph for CONSTRUCT queries, or boolean for ASK queries.
// Throws: SyntaxError if query is malformed, QueryExecutionError if dataset does not match grammar.

function executeSPARQLQuery(query: string, dataset: RDFGraph): QueryResult

// Example usage:
// Data setup in Turtle:
// @prefix dc: <http://purl.org/dc/elements/1.1/> .
// <http://example.org/book/book1> dc:title "SPARQL Tutorial" .

// Query example:
// SELECT ?title WHERE { <http://example.org/book/book1> dc:title ?title } 
// Expected result: { title: "SPARQL Tutorial" }

// Full configuration options for SPARQL processor:
// - BASE: Set using BASE <URI> (default from retrieval context if absent).
// - PREFIX declarations: Map prefix labels to IRIs (e.g., PREFIX book: <http://example.org/book/>).
// - Query modes: SELECT (returns table of bindings), CONSTRUCT (returns RDF graph), ASK (returns boolean), DESCRIBE (returns resource descriptions).

// Troubleshooting procedure:
// 1. Run query with debug mode enabled to output intermediate parsed AST.
// 2. Validate namespace resolution: Confirm all PREFIX mappings resolve to a valid IRI.
// 3. Check FILTER expressions: Run regex separately ensuring pattern and flags are accurate.
// 4. For blank node discrepancies, compare query results with expected auto-generated labels.
// 5. Command to test query using CLI tool:
//    $ sparql-client --query 'SELECT ?title WHERE { <http://example.org/book/book1> dc:title ?title }' --data dataset.ttl
// Expected output: A JSON with key "title" and value "SPARQL Tutorial".

// Best practices:
// - Always include explicit BASE and PREFIX declarations to avoid ambiguity.
// - Use typed literals explicitly for numeric comparisons: e.g., 42 is equivalent to "42"^^xsd:integer.
// - When using BIND and expressions, ensure correct concatenation and string function usage without extraneous whitespace.
// - Validate the SPARQL grammar using available validators before deployment.


## Information Dense Extract
SPARQL 1.1, W3C Rec 21-Mar-2013, BASE <http://example.org/book/>, PREFIX dc: <http://purl.org/dc/elements/1.1/>, IRIs: <http://example.org/book/book1> resolves via PREFIX, Literals: "text", "chat"@fr, "42"^^xsd:integer; Variables: ? and $; Blank Nodes: _:<label> or []; Triple Patterns: subject predicate object, use of ';' and ',' for grouping; Query forms: SELECT, CONSTRUCT, ASK, DESCRIBE; FILTER functions: regex(?title, '^SPARQL', 'i'), numeric filters (?price < 30.5); Expression assignment: BIND(CONCAT(?G, ' ', ?S) AS ?name); API signature: executeSPARQLQuery(query: string, dataset: RDFGraph): QueryResult; Troubleshooting: Use CLI tools, debug AST, validate namespace mappings.

## Sanitised Extract
Table of Contents:
1. DOCUMENT STRUCTURE
   - Namespace declarations, data descriptions in Turtle, and RDF term definitions.
2. QUERY FORMS
   - SELECT: Example: SELECT ?title WHERE { <http://example.org/book/book1> dc:title ?title } returns 'SPARQL Tutorial'.
   - CONSTRUCT: Format with graph building; template triples become output RDF graph.
   - ASK and DESCRIBE: Defined with precise expected behavior.
3. RDF TERM SYNTAX
   - IRIs: Use IRIREF definitions, prefixed names (PREFIX book: <http://example.org/book/>, book:book1 resolves accordingly), and relative IRIs using BASE.
   - Literals: Syntax allows double or single quotes, optional language tags ('chat'@fr) and datatype IRI using ^^ ('1'^^xsd:integer).
   - Variables: Noted with ? or $, e.g., ?var.
   - Blank Nodes: Represented as _:[label] or abbreviated with [].
4. TRIPLE PATTERN SYNTAX
   - Single triple: Subject, Predicate, Object pattern (e.g., <http://example.org/book/book1> dc:title ?title).
   - Predicate-Object lists using semicolon;
   - Object Lists using comma for shared subject and predicate.
5. EXPRESSIONS AND FILTERS
   - Filters using regex: e.g., FILTER regex(?title, '^SPARQL') and numeric comparisons: FILTER (?price < 30.5).
6. EXTRACTION OF VALUES
   - Use of BIND and assignment expressions: BIND(CONCAT(?G, ' ', ?S) AS ?name).
7. ADVANCED GRAMMAR DETAILS
   - Includes full grammar for IRIs, blank nodes and handling escapes in SPARQL local names.
8. CODE EXAMPLES
   - Detailed query examples with associated data and expected results provided inline with comments.
Each entry includes exact syntax, configuration using BASE and PREFIX, and concrete examples directly applicable by developers.

## Original Source
SPARQL 1.1 Query Language
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_QUERY

# SPARQL 1.1 Query Language Specification

Retrieved on: 2023-11-24

## Overview
This document contains the precise technical details of the SPARQL 1.1 Query Language as defined by the W3C Recommendation (21 March 2013). It includes the grammar, query forms, RDF term syntax, triple pattern constructs, query examples with both data and results, and the full table of contents with section-level specifications.

## Key Sections

### 1. Document Structure and Conventions
- Document Outline: Sections 1 to 22 and Appendices
- Namespace declarations and data descriptions in Turtle format
- Definitions for RDF Terms, Simple Literals, blank nodes, IRIs, and query variables

### 2. Query Forms and Basic Graph Patterns
- SELECT query: returns variable bindings (e.g., SELECT ?title WHERE { <http://example.org/book/book1> dc:title ?title }).
- CONSTRUCT query: returns an RDF graph built from a template.
- ASK and DESCRIBE query forms are documented with their precise semantics.

### 3. RDF Term Syntax
- IRIs: Syntax defined by IRIREF with examples of absolute, relative, and prefixed names. Example:
  BASE <http://example.org/book/>
  PREFIX book: <http://example.org/book/>
  Example: book:book1 translates to http://example.org/book/book1
- Literals: Detailed syntax for string literals with language tags and datatype specifiers. Examples:
  "chat" vs. "chat"@fr
  "1"^^xsd:integer vs. 1
- Query Variables: Denoted with '?' or '$' (e.g., ?abc, $abc are identical).
- Blank Nodes: Syntax using [] and explicit labels (e.g., _:[label]).

### 4. Triple Pattern Syntax
- Single triple pattern: <http://example.org/book/book1> dc:title ?title
- Predicate-Object Lists using ';'.
- Object Lists using ','.

### 5. SPARQL Expressions and Filters
- FILTER expressions apply functions like regex, arithmetic constraints, and logical conditions.
- Examples include matching literals with language tags and numeric types:
  SELECT ?v WHERE { ?v ?p "cat"@en }
  SELECT ?v WHERE { ?v ?p 42 }

### 6. Advanced Patterns and Aggregations
- Optional patterns (using OPTIONAL keyword) and negation constructs (FILTER NOT EXISTS, MINUS).
- Assignment using BIND and direct expression in SELECT clauses (e.g., CONCAT(?G, " ", ?S) AS ?name).

### 7. SPARQL Grammar Specifications
- Complete grammar rules provided for RDF terms, IRIs, literals, triple patterns, and blank nodes.
- Detailed explanations of prefixed names, relative IRIs, and how SPARQL resolves them using the BASE keyword.

### 8. Code Examples
- Data example in Turtle and matching query examples with expected result sets.
- Full sample on creating RDF graphs using CONSTRUCT queries with serialization in RDF/XML.

## Attribution and Data Size
- Crawled data size: 98912517 bytes
- Total links processed: 107140
- No errors encountered during crawl.


## Attribution
- Source: SPARQL 1.1 Query Language
- URL: https://www.w3.org/TR/sparql11-query/
- License: License: W3C Document Notice
- Crawl Date: 2025-04-22T04:48:48.716Z
- Data Size: 98912517 bytes
- Links Found: 107140

## Retrieved
2025-04-22
library/JSON_LD.md
# library/JSON_LD.md
# JSON_LD

## Crawl Summary
JSON-LD 1.1 defines a JSON-based serialization for Linked Data. Key technical details include processing modes (default 1.1), context based mappings for term disambiguation, usage of base IRI for resolving relative URLs, and support for multiple document forms (expanded, compacted, flattened, framed). The specification includes sections for advanced context usage, indexing techniques (property, language, and node identifier indexing), embedding in HTML, and a set of normative grammar definitions including all syntax tokens and keywords.

## Normalised Extract
Table of Contents:
1. INTRODUCTION
   - Purpose, scope and design goals
2. DATA MODEL
   - Graph-based structure: nodes (with @id, properties) and value objects (with @value, @type)
   - Blank node conventions: identifiers start with _:
3. CONTEXT DEFINITIONS
   - @context mapping: term to IRI, @language for default language, @vocab for vocabulary, and @base for base IRI resolution
4. COMPACT AND EXPANDED FORMS
   - Expanded: full IRIs; Compact: uses shortened IRIs via context mappings
   - Arrays representation: lists vs sets differentiation using @list and @set keys
5. ADVANCED PROCESSING
   - Processing mode: parameter @version with numeric value 1.1 triggers JSON-LD 1.1 features
   - Scoped contexts and protected term definitions
6. EMBEDDING AND LINKING
   - Embedding JSON-LD in HTML: inheriting base IRI from HTML base element, restrictions on JSON-LD script content
7. SYNTAX TOKENS AND KEYWORDS
   - Detailed normative keywords: @id, @context, @value, @type, @graph, and others; case-sensitivity strictly enforced
8. JSON-LD API
   - Method signatures for common operations: compact, expand, frame, and flatten with explicit parameter types and return types

Detailed Technical Information:
INTRODUCTION: JSON-LD 1.1 is designed to express linked data using JSON. It provides a smooth upgrade from JSON by adding context-based IRI expansion.
DATA MODEL: Represents a directed graph, where nodes are objects with properties. Blank nodes are identified with _:. Literal values include strings, numbers, booleans. Node objects distinguish between resources and literal values.
CONTEXT DEFINITIONS: Use a JSON object under the @context key. Define default language via @language (e.g., "en"), default vocabulary via @vocab (e.g., "http://schema.org/") and base IRI with @base.
COMPACT AND EXPANDED FORMS: Expanded form uses full IRIs; compact form uses abbreviated IRIs with context mappings. Elements such as lists are represented using arrays with @list, and sets using @set.
ADVANCED PROCESSING: The @version key must be set to 1.1 in the context for enabling new features. Advanced indexing techniques (language, property, node ID indexing) are available.
EMBEDDING AND LINKING: HTML embedding requires JSON-LD script elements to adhere to restrictions; base IRI is inherited from HTML's base tag if present.
SYNTAX TOKENS: All keywords (e.g. @id, @context, @value) are literal, case-sensitive strings. Their precise usage is governed by normative sections.
JSON-LD API: Provides operations such as compact(input, context, options), expand(input, options), frame(input, frame, options). Each method accepts a JSON object and returns a Promise resolving to a processed JSON object.

## Supplementary Details
Technical Specifications:
- Context Configuration: Provide a JSON map to @context. Example parameters include:
  @base: 'http://example.com/', @vocab: 'http://schema.org/', @language: 'en'.
- Processing Mode: Set @version to 1.1 (numeric) in context to enforce JSON-LD 1.1 processing. Legacy documents with version 1.0 are rejected if numeric value provided.
- Node Objects: Must contain unique keys; blank nodes use identifiers starting with '_:'.
- Arrays and Lists: Use @list to represent ordering; use @set for unordered collection. Single values can be normalized as arrays using explicit configuration.
- API Method Signatures (as defined in JSON-LD 1.1 API):
   compact(input: Object, context: Object, options?: Object) -> Promise<Object>
   expand(input: Object, options?: Object) -> Promise<Object>
   frame(input: Object, frame: Object, options?: Object) -> Promise<Object>
   flatten(input: Object, options?: Object) -> Promise<Object>
- Implementation Steps:
   1. Parse input JSON document.
   2. Apply @context for IRI expansion and term mapping.
   3. Process nodes and values according to the data model (distinguishing node objects and value objects).
   4. Apply ordering and index mapping if using @list, @set, or language maps.
   5. Serialize output in chosen form (compacted, expanded, flattened or framed).
- Configuration Options:
   options.base: String, default empty, used to resolve relative IRIs.
   options.documentLoader: Function to fetch remote contexts; default uses built-in fetch.
   options.processMode: String, default 'json-ld-1.1', can be set to 'json-ld-1.0' to disable advanced features.
- Best Practices:
   * Always define a context to avoid ambiguity.
   * Use explicit @version = 1.1 to enable new features.
   * Validate returned JSON-LD using dedicated validators (e.g., jsonld-cli --validate).
   * Test API operations with controlled examples: input objects with explicit @id and embedded contexts.
- Troubleshooting Procedures:
   * If processor returns errors on @version, verify context contains numeric value 1.1.
   * For IRI resolution failures, check that options.base is correctly specified and that @base is provided in the context.
   * In case of unexpected structure, run expand() method and examine intermediate node objects.
   * Use verbose mode (if available) in the JSON-LD API to output step-by-step processing details.

## Reference Details
API Specifications and Code Examples:

Method: compact(input: Object, context: Object, options?: Object) -> Promise<Object>
Parameters:
 - input: JSON object representing the expanded JSON-LD document.
 - context: JSON object specifying term mappings, including keys such as @base, @vocab, @language, and @version (must be numeric 1.1).
 - options (optional): Object with additional configuration like processMode ('json-ld-1.1' or 'json-ld-1.0'), base IRI override, and custom documentLoader function.
Return: Promise resolving to a compacted JSON object that maps IRIs to terms based on provided context.

Method: expand(input: Object, options?: Object) -> Promise<Object>
Parameters:
 - input: JSON document in compacted or framed form.
 - options (optional): Options including processMode and documentLoader.
Return: Promise resolving to an expanded JSON object with full IRIs.

Method: frame(input: Object, frame: Object, options?: Object) -> Promise<Object>
Parameters:
 - input: JSON-LD document.
 - frame: JSON object describing the desired frame structure. Frame objects may include directives for matching node objects and embedding linked nodes.
 - options (optional): Similar configuration options as above.
Return: Promise resolving to a framed JSON object.

Example Usage (Comments indicate steps):
// Import JSON-LD API library
// const jsonld = require('jsonld');

// Define an input JSON-LD document
// let inputDoc = { "@context": { "name": "http://schema.org/name", "homepage": { "@id": "http://schema.org/url", "@type": "@id" } }, "@id": "http://example.com/person/123", "name": "John Doe", "homepage": "http://johndoe.com" };

// Define context for compaction
// let context = { "@context": { "name": "http://schema.org/name", "homepage": { "@id": "http://schema.org/url", "@type": "@id" } } };

// Compact the document
// jsonld.compact(inputDoc, context).then(compacted => {
//    console.log('Compacted JSON-LD:', compacted);
// }).catch(error => {
//    console.error('Error during compaction:', error);
// });

Troubleshooting:
- Command: jsonld-cli --validate file.jsonld
  Expected Output: Validation passes with detailed mapping of keywords and resolved IRIs.
- If errors occur, verify that @version is set to 1.1 in the context and that all IRIs are absolute or correctly resolvable with provided @base.

Configuration Options in SDK:
 - options.base (default: ""): string; used to resolve relative IRIs.
 - options.documentLoader (default: built-in fetch): function(url: string): Promise<Object>;
 - options.processMode (default: "json-ld-1.1"): string; switching to "json-ld-1.0" disables JSON-LD 1.1 features.

Best Practices:
 - Always include a complete @context to disambiguate terms.
 - Validate output using both expand and compact to ensure reversibility.
 - Use verbose logging in development mode to trace processing steps.

Detailed Instructional Material:
1. Set up environment with Node.js and install JSON-LD API library via npm.
2. Write unit tests using frameworks such as Mocha or Vitest to validate changes in compacted and expanded forms.
3. Use documented API methods with error handling blocks to catch exceptions and log detailed error messages with stack traces.

## Information Dense Extract
JSON-LD 1.1: JSON serialization for Linked Data; key concepts: @context, @id, @value, @type; data model: directed graph with nodes, blank nodes (_:), and literals; forms: expanded (full IRIs), compacted (context mapping), flattened, framed; API: compact(input:Object, context:Object, options?:Object)->Promise<Object>, expand(input:Object, options?:Object)->Promise<Object>, frame(input:Object, frame:Object, options?:Object)->Promise<Object); configuration: options.base (string), documentLoader (function), processMode ('json-ld-1.1' default); troubleshooting: validate with jsonld-cli --validate file.jsonld; best practices: explicit @context, numeric @version=1.1, use verbose logging, unit tests; complete syntax tokens and keyword definitions provided in normative sections.

## Sanitised Extract
Table of Contents:
1. INTRODUCTION
   - Purpose, scope and design goals
2. DATA MODEL
   - Graph-based structure: nodes (with @id, properties) and value objects (with @value, @type)
   - Blank node conventions: identifiers start with _:
3. CONTEXT DEFINITIONS
   - @context mapping: term to IRI, @language for default language, @vocab for vocabulary, and @base for base IRI resolution
4. COMPACT AND EXPANDED FORMS
   - Expanded: full IRIs; Compact: uses shortened IRIs via context mappings
   - Arrays representation: lists vs sets differentiation using @list and @set keys
5. ADVANCED PROCESSING
   - Processing mode: parameter @version with numeric value 1.1 triggers JSON-LD 1.1 features
   - Scoped contexts and protected term definitions
6. EMBEDDING AND LINKING
   - Embedding JSON-LD in HTML: inheriting base IRI from HTML base element, restrictions on JSON-LD script content
7. SYNTAX TOKENS AND KEYWORDS
   - Detailed normative keywords: @id, @context, @value, @type, @graph, and others; case-sensitivity strictly enforced
8. JSON-LD API
   - Method signatures for common operations: compact, expand, frame, and flatten with explicit parameter types and return types

Detailed Technical Information:
INTRODUCTION: JSON-LD 1.1 is designed to express linked data using JSON. It provides a smooth upgrade from JSON by adding context-based IRI expansion.
DATA MODEL: Represents a directed graph, where nodes are objects with properties. Blank nodes are identified with _:. Literal values include strings, numbers, booleans. Node objects distinguish between resources and literal values.
CONTEXT DEFINITIONS: Use a JSON object under the @context key. Define default language via @language (e.g., 'en'), default vocabulary via @vocab (e.g., 'http://schema.org/') and base IRI with @base.
COMPACT AND EXPANDED FORMS: Expanded form uses full IRIs; compact form uses abbreviated IRIs with context mappings. Elements such as lists are represented using arrays with @list, and sets using @set.
ADVANCED PROCESSING: The @version key must be set to 1.1 in the context for enabling new features. Advanced indexing techniques (language, property, node ID indexing) are available.
EMBEDDING AND LINKING: HTML embedding requires JSON-LD script elements to adhere to restrictions; base IRI is inherited from HTML's base tag if present.
SYNTAX TOKENS: All keywords (e.g. @id, @context, @value) are literal, case-sensitive strings. Their precise usage is governed by normative sections.
JSON-LD API: Provides operations such as compact(input, context, options), expand(input, options), frame(input, frame, options). Each method accepts a JSON object and returns a Promise resolving to a processed JSON object.

## Original Source
JSON-LD 1.1 Documentation
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD

# JSON-LD 1.1 SPECIFICATION

Retrieved on: 2023-10-04

## Overview
JSON-LD 1.1 is a JSON-based serialization format for Linked Data. It extends JSON by introducing terms such as @context, @id, @value, and @type for representing semantic graphs.

## Key Components
- JSON-LD Processing Mode: Values include 1.0 for legacy and 1.1 for extended features.
- Base IRI: Mechanism for resolving relative IRIs using document base or context provided values.
- Compact IRI: Syntax prefix:suffix forms allowing abbreviation of IRIs.
- Context Definitions: Mapping terms to IRIs including configuration for default language (@language) and default vocabulary (@vocab).
- Node and Value Objects: Differentiation between structures that represent nodes (with properties) versus values (with literal @value and type).

## Detailed Sections
1. Introduction
   - Overview and goals of JSON-LD in linking existing JSON systems with Linked Data semantics.

2. Data Model
   - Graph-based model: Nodes, edges, blank nodes. Technical details include unique blank node identifiers (starting with _:), node objects, and value objects.

3. Advanced Concepts
   - Expanded contexts, scoped contexts, and control over property nesting via @context and protected term definitions.
   - Descriptions on value ordering (lists, sets) and use of @set with @type.

4. Forms of Documents
   - Expanded Form: Detailed representation with full IRIs.
   - Compacted Form: Utilizes context to shorten IRIs, represent lists as arrays, and normalize singular values.
   - Flattened and Framed Forms: Methods to restructure JSON-LD data according to user requirements.

5. Embedding and Interpreting
   - Embedding JSON-LD in HTML and inheriting base IRI from <base> element.
   - Use of Link Relationships to modify behavior (interpreter mode).

6. Grammar and Keywords
   - Full enumeration of syntax tokens and keywords (e.g., @id, @context, @value, @list, @set, @graph).
   - Case-sensitivity enforcement and normative definitions according to RFC and W3C standards.

7. API and Processing
   - Specifications for processing algorithms including context processing, expansion, compaction and frame processing.
   - Integration with JSON-LD 1.1 API providing method signatures for operations like compact, expand and frame.

## Attribution
Data Size: 14472503 bytes; 102705 links found; Crawled without error.

## Attribution
- Source: JSON-LD 1.1 Documentation
- URL: https://www.w3.org/TR/json-ld11/
- License: License: W3C Document Notice
- Crawl Date: 2025-04-23T04:48:41.112Z
- Data Size: 14472503 bytes
- Links Found: 102705

## Retrieved
2025-04-23
library/NODE_ESM.md
# library/NODE_ESM.md
# NODE_ESM

## Crawl Summary
ESM in Node.js supports two module systems. Key technical points include explicit markers (.mjs, package.json "type" field, --input-type flag) to define module type, resolution via URL semantics, and specialized handling of import specifiers (relative, bare, absolute). Detailed algorithms ESM_RESOLVE and ESM_FILE_FORMAT define resolution behavior, including support for JSON, WASM, and dynamic import(). The technical content covers built-in modules and interoperability with CommonJS, with strict rules for file extensions, URL encoding, and package exports/imports resolution.

## Normalised Extract
Table of Contents:
1. Introduction
   - Definition of ECMAScript modules
   - Code example: Exporting and importing functions
2. Enabling
   - Flags and file extensions to enable ES modules and CommonJS
   - Example configuration in package.json and CLI arguments
3. Packages
   - Explanation of bare, relative, and absolute specifiers
   - Package resolution via package.json exports
4. Import Specifiers and Attributes
   - Detailed types: relative, bare, absolute
   - Syntax for import with attributes and required type for JSON
5. Built-in Modules and Dynamic Imports
   - Built-in module usage with default and named exports
   - Dynamic import() and its support in both module systems
6. import.meta and its Properties
   - import.meta.dirname, filename, url, and resolve(specifier) method with version notes and behavior
7. Interoperability with CommonJS
   - Mechanism for wrapping CommonJS modules as ES modules
   - Details on lack of __filename and __dirname, and use of module.createRequire
8. JSON and Wasm Modules
   - Mandatory syntax for JSON import
   - Experimental status and flag requirements for Wasm modules
9. Top-Level Await
   - Allowing await at module top-level with failure behavior
10. Loaders and Customization Hooks
    - Customizing resolution with module hooks
11. Resolution and Loading Algorithm
    - ESM_RESOLVE: Step-by-step algorithm for resolving module specifiers including error conditions
    - ESM_FILE_FORMAT: Determining module format based on file extension and package type
Detailed Details:
- Use .mjs extension or package.json "type": "module" to trigger ESM.
- When resolving, if specifier is URL, use directly; if relative, use parent's URL; if bare, use PACKAGE_RESOLVE.
- JSON modules require with { type: 'json' }.
- import.meta.resolve returns a string URL synchronously and accepts an optional parent URL parameter when experimental flag is set.
- ESM_RESOLVE algorithm checks for valid URL, relative specifiers, bare specifiers; computes format via ESM_FILE_FORMAT which checks extensions (.mjs -> module, .cjs -> commonjs, .json -> json, etc.)
- Error handling includes Invalid Module Specifier, Module Not Found, and Unsupported Directory Import.
- Customization hooks override resolution; ensure synchronous operation to avoid deadlock.


## Supplementary Details
Exact Parameter Values and Configuration Options:
- File Extensions: '.mjs', '.cjs', '.json', '.wasm', '.node'
- package.json "type": Accepts 'module' or 'commonjs'
- CLI Flags: --input-type=module or --input-type=commonjs, --experimental-wasm-modules, --experimental-import-meta-resolve

Detailed Implementation Steps for Resolution:
1. ESM_RESOLVE(specifier, parentURL):
   - If specifier is a valid URL, parse and return.
   - Else if specifier starts with '/', './', or '../', resolve relative to parentURL.
   - Else if specifier starts with '#', use PACKAGE_IMPORTS_RESOLVE.
   - Otherwise, treat as bare specifier and use PACKAGE_RESOLVE.
2. ESM_FILE_FORMAT(url):
   - Check file extension:
     - .mjs returns 'module'
     - .cjs returns 'commonjs'
     - .json returns 'json'
     - .wasm returns 'wasm' (if flag enabled)
     - .node returns 'addon' (if flag enabled)
   - For .js without extension, detect package type via package.json and source analysis
3. PACKAGE_RESOLVE and its subroutines perform file system lookups using parent directory traversal until a package.json is found.
4. Troubleshooting Tips:
   - If module not found, ensure correct file extension and valid package.json exports.
   - For resolution errors (Invalid Module Specifier), verify that specifiers are correctly formatted and percent-encoded where needed.

Configuration Effects:
- Enabling flags alter behavior of WASM and addon resolution.
- package.json "exports" field restricts accessible module paths.

Implementation Example for import.meta.resolve:
  const depURL = import.meta.resolve('./dep.js');
  // Expected output: absolute URL string for './dep.js'


## Reference Details
API Specifications and SDK Signatures:

-- import.meta.resolve(specifier: string, parent?: string|URL): string
   Returns an absolute URL by resolving specifier against import.meta.url or provided parent URL.
   Examples:
     const url1 = import.meta.resolve('component-lib/asset.css');
     // returns: file:///app/node_modules/component-lib/asset.css
     const url2 = import.meta.resolve('./dep.js');
     // returns: file:///app/dep.js

-- ESM_RESOLVE(specifier: string, parentURL: string): { format: string, resolved: string }
   Steps:
     1. If specifier is a valid URL, set resolved = URL(specifier).
     2. Else if specifier starts with '/', './', '../', compute URL resolution with parentURL.
     3. Else if specifier starts with '#', call PACKAGE_IMPORTS_RESOLVE.
     4. Else, treat as bare specifier and call PACKAGE_RESOLVE, traversing up directories.
   Errors:
     - Invalid Module Specifier
     - Module Not Found
     - Unsupported Directory Import

-- ESM_FILE_FORMAT(url: string): string
   Returns one of: 'module', 'commonjs', 'json', 'wasm', 'addon'.
   Logic:
     - Ends with '.mjs' -> 'module'
     - Ends with '.cjs' -> 'commonjs'
     - Ends with '.json' -> 'json'
     - For '.js': analyze package.json type and source module syntax

-- PACKAGE_RESOLVE(packageSpecifier: string, parentURL: string): string
   Implements resolution for bare specifiers using:
     - Lookup of node_modules
     - Reading package.json (READ_PACKAGE_JSON)
     - Processing exports field (PACKAGE_EXPORTS_RESOLVE)

Code Example in ESM:
  // addTwo.mjs
  function addTwo(num) {
    return num + 2;
  }
  export { addTwo };

  // app.mjs
  import { addTwo } from './addTwo.mjs';
  console.log(addTwo(4));

Configuration Options:
- --input-type: 'module' or 'commonjs'
- package.json "type": 'module' or 'commonjs'
- Experimental flags: --experimental-wasm-modules, --experimental-import-meta-resolve

Troubleshooting Procedures:
1. For resolution errors, run node with increased verbosity to see resolution paths.
2. Check file extensions and ensure proper URL encoding.
3. For JSON modules, ensure import syntax includes with { type: 'json' }.
4. Use module.createRequire() when needing CommonJS require in ESM.

Best Practices:
- Always specify file extensions in import statements.
- Use import.meta for module-specific details instead of __dirname or __filename.
- Validate package.json exports to avoid module not found errors.
- Use dynamic import() for asynchronous module loading in both ESM and CommonJS.


## Information Dense Extract
ESM support via .mjs/package.json type/module; CLI flag --input-type; specifiers: relative (required extension), bare (node_modules lookup, package.json exports), absolute (file:// URL); import.meta properties: dirname, filename, url, resolve(specifier) returning absolute URL synchronously; ESM_RESOLVE algorithm: valid URL check, relative resolution, PACKAGE_RESOLVE for bare specifiers; ESM_FILE_FORMAT: .mjs->module, .cjs->commonjs, .json->json, .wasm->wasm (if experimental), else detect via package.json; CommonJS interop: default export wrapping module.exports, no __filename/__dirname; JSON modules require with { type: 'json' }; top-level await supported; dynamic import() available; customization hooks for resolution; errors: Invalid Module Specifier, Module Not Found, Unsupported Directory Import; API methods include import.meta.resolve(specifier, parent) and internal ESM_RESOLVE(specifier, parentURL) with detailed error handling and file system traversal.

## Escaped Extract
Table of Contents:
1. Introduction
   - Definition of ECMAScript modules
   - Code example: Exporting and importing functions
2. Enabling
   - Flags and file extensions to enable ES modules and CommonJS
   - Example configuration in package.json and CLI arguments
3. Packages
   - Explanation of bare, relative, and absolute specifiers
   - Package resolution via package.json exports
4. Import Specifiers and Attributes
   - Detailed types: relative, bare, absolute
   - Syntax for import with attributes and required type for JSON
5. Built-in Modules and Dynamic Imports
   - Built-in module usage with default and named exports
   - Dynamic import() and its support in both module systems
6. import.meta and its Properties
   - import.meta.dirname, filename, url, and resolve(specifier) method with version notes and behavior
7. Interoperability with CommonJS
   - Mechanism for wrapping CommonJS modules as ES modules
   - Details on lack of __filename and __dirname, and use of module.createRequire
8. JSON and Wasm Modules
   - Mandatory syntax for JSON import
   - Experimental status and flag requirements for Wasm modules
9. Top-Level Await
   - Allowing await at module top-level with failure behavior
10. Loaders and Customization Hooks
    - Customizing resolution with module hooks
11. Resolution and Loading Algorithm
    - ESM_RESOLVE: Step-by-step algorithm for resolving module specifiers including error conditions
    - ESM_FILE_FORMAT: Determining module format based on file extension and package type
Detailed Details:
- Use .mjs extension or package.json 'type': 'module' to trigger ESM.
- When resolving, if specifier is URL, use directly; if relative, use parent's URL; if bare, use PACKAGE_RESOLVE.
- JSON modules require with { type: 'json' }.
- import.meta.resolve returns a string URL synchronously and accepts an optional parent URL parameter when experimental flag is set.
- ESM_RESOLVE algorithm checks for valid URL, relative specifiers, bare specifiers; computes format via ESM_FILE_FORMAT which checks extensions (.mjs -> module, .cjs -> commonjs, .json -> json, etc.)
- Error handling includes Invalid Module Specifier, Module Not Found, and Unsupported Directory Import.
- Customization hooks override resolution; ensure synchronous operation to avoid deadlock.

## Original Source
Node.js ECMAScript Modules (ESM) Documentation
https://nodejs.org/api/esm.html

## Digest of NODE_ESM

# Introduction

ECMAScript modules (ESM) are the official standard for packaging JavaScript code for reuse. Node.js fully supports ESM as specified, including interoperability with CommonJS. 

# Enabling

To enable an ES module in Node.js, use one of the following:
- File extension .mjs
- package.json field "type": "module"
- --input-type flag set to "module"

For CommonJS, use:
- File extension .cjs
- package.json field "type": "commonjs"
- --input-type flag set to "commonjs"

If no explicit marker is provided, Node.js inspects the source for ES module syntax and selects accordingly.

# Packages

Modules can be structured as packages. Bare specifiers (e.g., "some-package") are resolved using Node.js module resolution. If a package.json has an "exports" field, only the defined paths are accessible.

# Import Specifiers

There are three types of specifiers:
1. Relative specifiers (e.g. './startup.js' or '../config.mjs') which require file extensions.
2. Bare specifiers (e.g. 'some-package' or 'some-package/shuffle') which may or may not require extensions depending on the package's exports configuration.
3. Absolute specifiers (e.g. 'file:///opt/nodejs/config.js').

# Mandatory File Extensions

When using the import keyword, file extensions must be provided, including in directory indexes (e.g. './startup/index.js').

# URLs and URL Schemes

Module resolution transforms specifiers to URLs. Supported schemes include:
- file:
- node:
- data:

For file URLs, special characters (e.g. '#' and '?') must be percent-encoded. The use of url.pathToFileURL is recommended for conversion.

# file: URLs

Modules loaded with file: URLs are sensitive to query strings and fragments, which cause multiple loads if changed. The root can be referenced through '/', '//' or 'file:///' examples.

# data: Imports

Introduced in v12.10.0. Supports:
- text/javascript for ES modules
- application/json for JSON modules (requires with { type: 'json' })
- application/wasm for WebAssembly

Data URLs do not support relative resolution.

# node: Imports

Supported since v14.13.1. Use node: URLs to load Node.js builtin modules (e.g. "node:fs/promises").

# Import Attributes

Inline syntax for passing extra information with module specifiers. Syntax examples include:

  import fooData from './foo.json' with { type: 'json' };

Only the "type" attribute is supported. In JSON modules, the type attribute (value 'json') is mandatory.

# Built-in Modules

Built-in modules (e.g., fs, events, buffer) export named API features. They are accessible via the default export representing module.exports alongside named exports. Example usage:

  import EventEmitter from 'node:events';
  const e = new EventEmitter();

  import fs, { readFileSync } from 'node:fs';

Sync builtin exports can be updated via module.syncBuiltinESMExports().

# import() Expressions

Dynamic import() is supported in both CommonJS and ES modules, allowing asynchronous loading of modules.

# import.meta

A meta property available only in ES modules. Key sub-properties include:
- import.meta.dirname: Directory name of the current module (v21.2.0)
- import.meta.filename: Absolute path with symlinks resolved (v21.2.0)
- import.meta.url: Absolute file URL of the current module
- import.meta.resolve(specifier): Synchronously resolves a module specifier to an absolute URL using Node.js resolution algorithm (v20.6.0)

# Interoperability with CommonJS

ES modules can import CommonJS modules. When imported, the default export represents module.exports and a namespace wrapper may be constructed to expose named exports discovered by static analysis.

Key points:
- No require, exports, or module.exports in ES modules
- __filename and __dirname are unavailable; use import.meta instead
- Addon Loading and require.resolve are not available in ES modules

# JSON Modules

JSON files can be imported using:

  import packageConfig from './package.json' with { type: 'json' };

Only a default export is provided; cache entries are shared with CommonJS.

# Wasm Modules

WebAssembly modules (.wasm) can be imported when the --experimental-wasm-modules flag is enabled. The module exports an instantiation interface.

# Top-level await

Supported since v14.8.0. Allows the use of await at the top-level. Failure to resolve leads to an exit code 13. Example:

  export const five = await Promise.resolve(5);

# Loaders

Loaders allow customization of module loading via hooks. Older documentation refers to custom loader hooks for tasks such as source transformation and format determination.

# Resolution and Loading Algorithm

The algorithm (ESM_RESOLVE) returns a resolved URL and suggested module format based on the specifier type. It works as follows:

1. If the specifier is a valid URL, use it directly.
2. For relative (starts with '/', './', '../') or hash specifiers, resolve against parentURL.
3. For bare specifiers, use PACKAGE_RESOLVE to resolve via node_modules and package.json "exports".

Sub-algorithms include:
- ESM_FILE_FORMAT: Determines module format based on file extension or package type. Returns
  - "module" for '.mjs'
  - "commonjs" for '.cjs'
  - "json" for '.json'
  - "wasm" for '.wasm' if experimental flag enabled
  - "addon" for '.node' if addon modules enabled

- PACKAGE_RESOLVE: Resolves bare specifiers by traversing parent directories, checking package.json and "exports" field.
- PACKAGE_EXPORTS_RESOLVE and PACKAGE_IMPORTS_RESOLVE: Process exports and imports fields in package.json to determine correct file mapping.
- LOOKUP_PACKAGE_SCOPE and READ_PACKAGE_JSON: Helpers to locate package.json and determine package scope.

Errors thrown include:
- Invalid Module Specifier
- Invalid Package Configuration
- Module Not Found
- Unsupported Directory Import

# Customizing ESM Resolution

Module customization hooks allow modification of the default resolution algorithm. Example projects exist to simulate CommonJS resolution behavior in ESM contexts.

Retrieved: 2023-10-05
Attribution: Data Size: 4312169 bytes, 5283 Links Found, No Errors

## Attribution
- Source: Node.js ECMAScript Modules (ESM) Documentation
- URL: https://nodejs.org/api/esm.html
- License: License: MIT
- Crawl Date: 2025-04-22T02:30:18.248Z
- Data Size: 4312169 bytes
- Links Found: 5283

## Retrieved
2025-04-22
library/VITEST.md
# library/VITEST.md
# VITEST

## Crawl Summary
Vitest framework technical details include installation commands (npm, yarn, pnpm, bun), test file naming conventions (.test. or .spec.), configuration via vite.config.ts and vitest.config.ts, CLI usage (vitest, vitest run --coverage), dependency optimization options (deps.external, deps.inline, deps.cacheDir), workspaces with defineWorkspace, and troubleshooting through command line flags and merging configurations. Detailed configuration options with types, defaults and behavior are provided.

## Normalised Extract
Table of Contents:
1. Getting Started
2. Installation
3. Writing Tests
4. Configuring Vitest
5. CLI Options
6. Dependency Optimization
7. Workspaces
8. Troubleshooting

1. Getting Started:
- Framework: Vitest integrates with Vite, supports ESM, TypeScript, JSX.
- Requirements: Vite >= v5.0.0, Node >= v18.0.0.

2. Installation:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

3. Writing Tests:
- Sample function in sum.js:
  export function sum(a, b) { return a + b }
- Test file sum.test.js:
  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
- Package.json script:
  "scripts": { "test": "vitest" }

4. Configuring Vitest:
- Use vite.config.ts for unified configuration. For separate testing configuration, create vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test: { // custom options } })
- Merge with Vite config using mergeConfig if needed.

5. CLI Options:
- Default commands: vitest, vitest run --coverage
- Flags: --config, --port, --https, -w/--watch, -u/--update

6. Dependency Optimization:
- Options under test.deps:
  external (default: [/\/node_modules\//]), inline (default: [] or true for full inlining), cacheDir (default: 'node_modules/.vite')
- Optimizer options: deps.optimizer { ssr, web } with enabled flag false by default.

7. Workspaces:
- Define multiple configurations in vitest.workspace.ts using defineWorkspace. Example includes glob patterns and inline config objects with 'test' property parameters like environment, setupFiles.

8. Troubleshooting:
- For snapshot updates use -u
- Bun users must run 'bun run test'
- To debug merging issues, verify that separate config files are merged with mergeConfig.


## Supplementary Details
Installation requires Node >= v18.0.0 and Vite >= v5.0.0. Configuration examples:

vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
      globals: false,
      environment: 'node',
      runner: 'node',
      pool: 'forks',
      deps: {
        external: [/\/node_modules\//],
        inline: [],
        cacheDir: 'node_modules/.vite',
        optimizer: { ssr: { enabled: false }, web: { enabled: false } }
      }
    }
  })

For merging Vite config with Vitest:
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'
  export default mergeConfig(viteConfig, defineConfig({ test: { exclude: ['packages/template/*'] } }))

Workspaces file example (vitest.workspace.ts):
  import { defineWorkspace } from 'vitest/config'
  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
    { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
  ])

Command Line usage:
- Run tests: npm run test
- Update snapshots: vitest --update
- Run without watch: vitest run
- CLI help: npx vitest --help

Troubleshooting:
- For dependency issues, check deps.optimizer settings and cacheDir for stale modules.
- Use VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency prompts.


## Reference Details
API Specifications and Code Examples:

1. Function Signature for Test Example:
---------------------------
File: sum.js
Signature: export function sum(a: number, b: number): number
Example:
  export function sum(a, b) {
    return a + b
  }
---------------------------
File: sum.test.js
Import: import { expect, test } from 'vitest'
Usage:
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

2. Configuration API (vitest.config.ts):
---------------------------
Import:
  import { defineConfig } from 'vitest/config'
Configuration Object:
  {
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
      globals: false,
      environment: 'node',
      runner: 'node',
      pool: 'forks',
      deps: {
        external: [/\/node_modules\//],
        inline: [],
        cacheDir: 'node_modules/.vite',
        optimizer: {
          ssr: { enabled: false },
          web: { enabled: false }
        }
      }
    }
  }

3. Merging Configurations using mergeConfig:
---------------------------
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*']
    }
  }))

4. Workspaces Setup:
---------------------------
File: vitest.workspace.ts
Example:
  import { defineWorkspace } from 'vitest/config'

  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    {
      test: {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts']
      }
    },
    {
      test: {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts']
      }
    }
  ])

5. CLI Usage and Options:
---------------------------
Scripts in package.json:
  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }
CLI Options:
  --config <path>: Specify custom config file
  --update or -u: Update snapshot files
  --watch or -w: Enable watch mode
  --port: Specify server port
  --https: Enable HTTPS

6. Best Practices & Troubleshooting:
---------------------------
- Always include .test. or .spec. in file names for automatic discovery.
- Use the same configuration for Vite and Vitest when possible.
- For Bun users, run tests with 'bun run test'.
- If merging config files, ensure that Vite options are not overridden unexpectedly.
- To debug module transformation issues, inspect the cache directory and adjust deps.optimizer.force if needed.
- For automatic dependency installation issues, set the VITEST_SKIP_INSTALL_CHECKS=1 environment variable.

Return Types, Exceptions: Vitest API does not throw specific exceptions in configuration, errors are reported during runtime test execution.


## Information Dense Extract
Vitest framework; Requirements: Vite>=5.0.0, Node>=18.0.0; Installation: npm, yarn, pnpm, bun; Test file naming: *.test.*, *.spec.*; Sample function: export function sum(a, b): number { return a + b }; Test example using import { expect, test } from 'vitest'; Config via vitest.config.ts using defineConfig; Merge Vite and Vitest configs with mergeConfig; CLI: vitest, vitest run, flags --config, --update, --watch; Dependency options: deps.external [/\/node_modules\//], deps.inline, cacheDir 'node_modules/.vite', optimizer options for ssr/web; Workspaces defined via defineWorkspace with glob patterns; Best practices: single config file, proper test naming, use CLI help npx vitest --help; Troubleshooting: check cacheDir, set VITEST_SKIP_INSTALL_CHECKS=1; Detailed API specs include method signatures, configuration object structure, CLI commands.

## Sanitised Extract
Table of Contents:
1. Getting Started
2. Installation
3. Writing Tests
4. Configuring Vitest
5. CLI Options
6. Dependency Optimization
7. Workspaces
8. Troubleshooting

1. Getting Started:
- Framework: Vitest integrates with Vite, supports ESM, TypeScript, JSX.
- Requirements: Vite >= v5.0.0, Node >= v18.0.0.

2. Installation:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

3. Writing Tests:
- Sample function in sum.js:
  export function sum(a, b) { return a + b }
- Test file sum.test.js:
  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
- Package.json script:
  'scripts': { 'test': 'vitest' }

4. Configuring Vitest:
- Use vite.config.ts for unified configuration. For separate testing configuration, create vitest.config.ts:
  import { defineConfig } from 'vitest/config'
  export default defineConfig({ test: { // custom options } })
- Merge with Vite config using mergeConfig if needed.

5. CLI Options:
- Default commands: vitest, vitest run --coverage
- Flags: --config, --port, --https, -w/--watch, -u/--update

6. Dependency Optimization:
- Options under test.deps:
  external (default: [/'/node_modules'//]), inline (default: [] or true for full inlining), cacheDir (default: 'node_modules/.vite')
- Optimizer options: deps.optimizer { ssr, web } with enabled flag false by default.

7. Workspaces:
- Define multiple configurations in vitest.workspace.ts using defineWorkspace. Example includes glob patterns and inline config objects with 'test' property parameters like environment, setupFiles.

8. Troubleshooting:
- For snapshot updates use -u
- Bun users must run 'bun run test'
- To debug merging issues, verify that separate config files are merged with mergeConfig.

## Original Source
Vitest Testing Framework
https://vitest.dev/

## Digest of VITEST

# Vitest Testing Framework

Retrieved Date: 2023-11-24

## Overview
Vitest is a Vite-native testing framework that supports ESM, TypeScript, and JSX. It reuses Vite configuration and plugins and is compatible with Jest (expect, snapshot, coverage, etc.).

## Installation

Install Vitest using one of the following methods:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest

Note: Vitest requires Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests

Create a file sum.js:

  export function sum(a, b) {
    return a + b
  }

Create a test file sum.test.js:

  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

Ensure test files include .test. or .spec. in their filename and add script in package.json:

  {
    "scripts": {
      "test": "vitest"
    }
  }

## Configuring Vitest

Vitest supports unified configuration with Vite. In Vite projects, Vitest reads vite.config.ts. To override, create vitest.config.ts with higher priority:

Example (vitest.config.ts):

  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      // Test configuration here
    }
  })

You can also use CLI option --config to specify a custom configuration file.

For non-Vite projects, use the test property in your config file:

  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      // ...
    }
  })

### Merging Vite and Vitest Configuration

When using separate files, use mergeConfig:

  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      // ...
    }
  }))

## Workspaces Support

Define workspaces using a vitest.workspace.ts file. Example:

  import { defineWorkspace } from 'vitest/config'

  export default defineWorkspace([
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    {
      test: {
        name: 'happy-dom',
        root: './shared_tests',
        environment: 'happy-dom',
        setupFiles: ['./setup.happy-dom.ts']
      }
    },
    {
      test: {
        name: 'node',
        root: './shared_tests',
        environment: 'node',
        setupFiles: ['./setup.node.ts']
      }
    }
  ])

## Command Line Interface (CLI)

Default npm scripts:

  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }

Use "vitest run" to run tests once. Additional CLI options such as --port, --https can be specified. Run npx vitest --help for full options.

## Automatic Dependency Installation

Vitest automatically prompts installation for missing dependencies. Disable with environment variable VITEST_SKIP_INSTALL_CHECKS=1.

## IDE Integrations

An official Visual Studio Code extension is available to enhance the Vitest testing experience.

## Configuration Options Summary

- include: Glob patterns for test files (default: '**/*.{test,spec}.?(c|m)[jt]s?(x)')
- exclude: Glob patterns to ignore (default: ['**/node_modules/**', '**/dist/**', ...])
- globals: Boolean flag to enable global APIs (default: false)
- environment: Test environment ('node', 'jsdom', 'happy-dom', etc.)
- runner: Specify custom test runner (default: node)
- pool: Specify pool type ('threads', 'forks', 'vmThreads', etc., default: 'forks')

## Dependency Optimization and Transformation

Vitest supports dependency optimization using esbuild. Key options include:

- deps.external: Externalize node_modules dependencies
- deps.inline: Process modules for ESM compatibility
- deps.cacheDir: Default is 'node_modules/.vite'
- deps.optimizer: Options for SSR and Web bundling (enabled: false by default)

## Troubleshooting and Best Practices

- Updating snapshots: Use CLI flag -u
- For Bun users: run tests with 'bun run test'
- Ensure consistency if using separate config files by merging using mergeConfig.
- To debug dependency issues, check cache directories and disable optimizer force options if needed.

Attribution: Crawled from Vitest website
Data Size: 32006146 bytes

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/
- License: License: MIT
- Crawl Date: 2025-04-24T04:48:23.217Z
- Data Size: 32006146 bytes
- Links Found: 24493

## Retrieved
2025-04-24
