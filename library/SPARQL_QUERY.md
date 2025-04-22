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
