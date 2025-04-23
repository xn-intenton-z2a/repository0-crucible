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
