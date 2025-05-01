# CONTEXT_DEFINITIONS

## Crawl Summary
@base: IRI or null for resolving relative IRIs
@vocab: IRI or null for default vocabulary mapping
@language: BCP47 code or null for default string language
@direction: ltr/rtl/null for base text direction
@version: numeric 1.1 to enforce processing mode
@import: IRI to include remote context
Term definitions: map entries with keys @id, @type, @container, @reverse, @language, @direction, @nest, @context
Context merging: sequential override; embedded before remote

## Normalised Extract
Table of Contents:
1. Base IRI (@base)
2. Default Vocabulary (@vocab)
3. Default Language (@language)
4. Base Direction (@direction)
5. Processing Mode (@version)
6. Context Import (@import)
7. Term Definitions
8. Context Merging

1. Base IRI (@base)
   Value: absolute IRI or null
   Behavior: resolve all relative IRIs in terms and values against @base. If null, no base used.

2. Default Vocabulary (@vocab)
   Value: absolute IRI or null
   Behavior: prefix applied to unprefixed terms when expanding

3. Default Language (@language)
   Value: BCP47 tag or null
   Behavior: assign language tag to string values when none provided

4. Base Direction (@direction)
   Value: "ltr", "rtl", null
   Behavior: assign base direction for string values when none provided

5. Processing Mode (@version)
   Value: 1.1
   Behavior: enforce JSON-LD 1.1 features; error in 1.0 processors

6. Context Import (@import)
   Value: absolute IRI
   Behavior: fetch remote context, merge its definitions

7. Term Definitions
   For each term:
     id: IRI or term reference
     type: IRI or term for typed values
     container: one of @list,@set,@index,@language,@id,@type,@graph
     reverse: IRI for reverse properties
     language: BCP47 code or null
     direction: "ltr","rtl",null
     nest: term key for nested properties
     context: IRI, map, or array to define embedded context

8. Context Merging
   Sequence: local embedded contexts first, then remote contexts in order of @import, then parent contexts
   Override: later definitions replace earlier ones for same term

## Supplementary Details
- HTTP GET for @import: Accept: application/ld+json
- Merge algorithm:
  1. Initialize active context
  2. For each context entry in array: if string, fetch; if map, merge
  3. For map merge: for each key, set or override term definition
- Resolution of relative IRIs: use IRI resolution algorithm per RFC3987
- Local vs embedded context: local applies to whole document, embedded applies to surrounding node or property
- JSON-LD parser options:
  processingMode: 'json-ld-1.1'
  documentLoader: custom loader function
  expandContext: initial context to apply before document context
- Node.js example: const options = { base: 'https://example.com/', expandContext: { '@vocab':'https://schema.org/' }, processingMode:'json-ld-1.1' }

## Reference Details
JSON-LD Processing API (jsonld.js):

Module: jsonld

Method: expand(input, options)
Parameters:
  input: object|array|string (document path or parsed JSON-LD)
  options:
    explicitContext: object|array|string
    base: string (base IRI)
    expandContext: object|array|string
    documentLoader: function(url)
    processingMode: 'json-ld-1.0'|'json-ld-1.1'
Returns: Promise resolving to expanded JSON-LD (array of node objects)

Method: compact(input, context, options)
Parameters:
  input: as above
  context: object|array|string
  options: as above plus:
    compactArrays: boolean (default true)
    skipExpansion: boolean (default false)
Returns: Promise resolving to compacted JSON-LD (object)

Method: flatten(input, context, options)
Parameters: same as compact
Returns: Promise resolving to flattened array of node objects

Method: frame(input, frame, options)
Parameters:
  frame: object (frame document)
Returns: Promise resolving to framed result (object)

Method: normalize(input, options)
Parameters:
  algorithm: 'URDNA2015'|'URGNA2012'
  expandContext, documentLoader, processingMode
Returns: Promise resolving to normalized triples (canonical N-Quads string)

Examples:
const jsonld = require('jsonld')
async function run(){
  const input = { '@context':{'name':'http://schema.org/name'}, 'name':'Alice' }
  const compacted = await jsonld.compact(input, {'@vocab':'http://schema.org/'}, { processingMode:'json-ld-1.1' })
  console.log(compacted)
}

Best practices:
- Preload common contexts via documentLoader cache
- Use processingMode 'json-ld-1.1' to access latest features
- Set base IRI to avoid relative IRI ambiguity

Troubleshooting:
Command: node process.js
Expected: no "Context parse error". If error: verify context JSON syntax, ensure correct media type
Fetch remote context failure: check CORS headers, use custom documentLoader to override.


## Information Dense Extract
@base:IRI|null→resolves relative IRIs;@vocab:IRI|null→default vocab;@language:BCP47|null→string lang;@direction:ltr|rtl|null→text dir;@version:1.1→processor mode;@import:IRI→merge remote context;terms→@id,@type,@container,@reverse,@language,@direction,@nest,@context definitions;merge→embedded then remote, later override;API→expand,compact,flatten,frame,normalize methods with options:base,expandContext,documentLoader,processingMode,compactArrays.

## Sanitised Extract
Table of Contents:
1. Base IRI (@base)
2. Default Vocabulary (@vocab)
3. Default Language (@language)
4. Base Direction (@direction)
5. Processing Mode (@version)
6. Context Import (@import)
7. Term Definitions
8. Context Merging

1. Base IRI (@base)
   Value: absolute IRI or null
   Behavior: resolve all relative IRIs in terms and values against @base. If null, no base used.

2. Default Vocabulary (@vocab)
   Value: absolute IRI or null
   Behavior: prefix applied to unprefixed terms when expanding

3. Default Language (@language)
   Value: BCP47 tag or null
   Behavior: assign language tag to string values when none provided

4. Base Direction (@direction)
   Value: 'ltr', 'rtl', null
   Behavior: assign base direction for string values when none provided

5. Processing Mode (@version)
   Value: 1.1
   Behavior: enforce JSON-LD 1.1 features; error in 1.0 processors

6. Context Import (@import)
   Value: absolute IRI
   Behavior: fetch remote context, merge its definitions

7. Term Definitions
   For each term:
     id: IRI or term reference
     type: IRI or term for typed values
     container: one of @list,@set,@index,@language,@id,@type,@graph
     reverse: IRI for reverse properties
     language: BCP47 code or null
     direction: 'ltr','rtl',null
     nest: term key for nested properties
     context: IRI, map, or array to define embedded context

8. Context Merging
   Sequence: local embedded contexts first, then remote contexts in order of @import, then parent contexts
   Override: later definitions replace earlier ones for same term

## Original Source
W3C JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT_DEFINITIONS

# Context Definitions

Retrieved: 10 June 2024

## Overview
The @context in JSON-LD establishes mappings from terms to IRIs, controls base IRI resolution, default vocabulary, language, and processing mode. This section defines all context keywords and their allowed values.

# Context Keywords and Values

## @base
- Value: IRI or null
- Effect: Sets the base IRI for resolving relative IRI references in terms and values.
- Default: Document location

## @vocab
- Value: IRI or null
- Effect: Prefixed to terms without explicit prefix to form full IRI.
- Default: None; terms must be fully expanded.

## @language
- Value: BCP47 language tag string or null
- Effect: Default language for string values without language tags.
- Default: None

## @direction
- Value: "ltr", "rtl", or null
- Effect: Default base direction for strings without explicit direction.
- Default: null

## @version
- Value: Numeric; must be 1.1
- Effect: Sets processing mode to json-ld-1.1 or errors if processed by JSON-LD 1.0.
- Default: Implicit json-ld-1.1

## @import
- Value: IRI (document URL)
- Effect: Imports term definitions from referenced remote context.
- Default: None

## Term Definitions
- Simple: key: term, value: string (expanded IRI)
- Expanded: key: term, value: map with optional keys:
    - @id: IRI or term
    - @type: IRI or term for typed values
    - @container: @list, @set, @index, @language, @id, @type, or @graph
    - @reverse: property IRI
    - @language: BCP47 code or null
    - @direction: "ltr", "rtl", or null
    - @nest: term for nested properties
    - @context: embedded context (IRI, map, or array)

## Context Resolution
- Embedded contexts merged sequentially.
- Remote contexts fetched via HTTP GET, JSON media type.
- Merging: later definitions override earlier definitions for same term.



## Attribution
- Source: W3C JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: License: W3C Document License
- Crawl Date: 2025-05-01T17:46:54.100Z
- Data Size: 16073137 bytes
- Links Found: 113952

## Retrieved
2025-05-01
