# CONTEXT_DEF

## Crawl Summary
Context Definition section of JSON-LD 1.1 details the structure and processing rules for @context, including keyword definitions (@version, @base, @vocab, @language, @direction), term definition properties (@id, @type, @container, @reverse, @prefix, @protected), and the algorithm for interpreting and merging contexts.

## Normalised Extract
Table of Contents
1. Context Object Structure
2. Keywords and Value Types
3. Term Definition Properties
4. Context Processing Steps

1. Context Object Structure
Context may be a single IRI string, an object, or an array of strings/objects. When an array, process each entry in sequence; later entries override earlier.

2. Keywords and Value Types
@version : number 1.1 only  
@base    : IRI|string|null  
@vocab   : IRI|string|null  
@language: string|null (BCP47)  
@direction: "ltr"|"rtl"|null

3. Term Definition Properties
@id       : IRI|string|null
@type     : IRI|string|null
@container: enum("@list","@set","@index","@language","@id","@type") or array of enum
@reverse  : boolean
@prefix   : boolean
@protected: boolean

4. Context Processing Steps
Step 1: Start with parent activeContext or empty context.  
Step 2: For @version, validate numeric 1.1, set processing mode.  
Step 3: Iterate entries:  
a) If value null delete mapping.  
b) For term definitions create mapping object.  
c) Normalize @container to array.  
d) Expand @id/@type to absolute IRI using base or vocab.  
e) Check for cycles.  
Step 4: Return merged activeContext.

## Supplementary Details
Supported @context configuration options:
- processingMode: "json-ld-1.1" (enables JSON-LD 1.1 features) or "json-ld-1.0" (disables 1.1 keywords)
- base: absolute IRI string or null to override document location
- expandContext: local context object for expansion API

Implementation Steps:
1. Load JSON-LD document.  
2. Extract @context value (IRI, object or array).  
3. Call context processing algorithm.  
4. Merge resulting term definitions into activeContext.  
5. Use activeContext for compaction, expansion, framing, flattening operations.

Best practice: pin @version to numeric 1.1 as first entry to prevent older processors misinterpreting context.

## Reference Details
JSON-LD API Method Signatures

1. expand(input, options)
Signature: function expand(input: object|string|RemoteDocument|Array, options?: ExpandOptions) => Promise<object[]>
ExpandOptions:
  expandContext?: object
  base?: string
  processingMode?: "json-ld-1.0"|"json-ld-1.1"

2. compact(input, context, options)
Signature: function compact(input: object|string|RemoteDocument|Array, context: object|string, options?: CompactOptions) => Promise<object>
CompactOptions:
  base?: string
  processingMode?: "json-ld-1.0"|"json-ld-1.1"
  compactArrays?: boolean (default true)

3. frame(input, frame, options)
Signature: function frame(input: object|string|RemoteDocument|Array, frame: object|string, options?: FrameOptions) => Promise<object>
FrameOptions:
  base?: string
  processingMode?: "json-ld-1.0"|"json-ld-1.1"
  embed?: boolean (default true)
  explicit?: boolean (default false)
  omitGraph?: boolean (default false)

4. flatten(input, context, options)
Signature: function flatten(input: object|string|RemoteDocument|Array, context?: object|string, options?: FlattenOptions) => Promise<object>
FlattenOptions:
  base?: string
  processingMode?: "json-ld-1.0"|"json-ld-1.1"

Concrete Example:
```js
const jsonld = require('jsonld');

const doc = { "@context": {"name": "http://schema.org/name"}, "name": "Alice" };
jsonld.expand(doc, { processingMode: 'json-ld-1.1' })
  .then(expanded => console.log(expanded))
  .catch(err => console.error(err));
```

Troubleshooting:
To debug context resolution:
1. Set environment variable DEBUG=jsonld:context
2. Run API call, observe console logs:
   > DEBUG=jsonld:context node test.js
Expected log: 
  context parsing entry name → @id set to http://schema.org/name


## Information Dense Extract
@context: object|array|string; keywords:@version=1.1(number),@base:IRI|null,@vocab:IRI|null,@language:BCP47|null,@direction:ltr|rtl|null; termDefinition:@id:IRI|null,@type:IRI|null,@container:enum|array,@reverse:bool,@prefix:bool,@protected:bool; algorithm: init activeContext, validate @version, for each entry delete nulls, create term mapping, normalize @container to array, expand IRIs against base/vocab, detect cycles; API: expand(input, {expandContext,base,processingMode})=>Promise<object[]>; compact(input,context,{base,processingMode,compactArrays})=>Promise<object>; frame(input,frame,{base,processingMode,embed,explicit,omitGraph})=>Promise<object>; flatten(input,context,{base,processingMode})=>Promise<object>; sample code: jsonld.expand(doc,{processingMode:'json-ld-1.1'}).catch; debug: DEBUG=jsonld:context

## Sanitised Extract
Table of Contents
1. Context Object Structure
2. Keywords and Value Types
3. Term Definition Properties
4. Context Processing Steps

1. Context Object Structure
Context may be a single IRI string, an object, or an array of strings/objects. When an array, process each entry in sequence; later entries override earlier.

2. Keywords and Value Types
@version : number 1.1 only  
@base    : IRI|string|null  
@vocab   : IRI|string|null  
@language: string|null (BCP47)  
@direction: 'ltr'|'rtl'|null

3. Term Definition Properties
@id       : IRI|string|null
@type     : IRI|string|null
@container: enum('@list','@set','@index','@language','@id','@type') or array of enum
@reverse  : boolean
@prefix   : boolean
@protected: boolean

4. Context Processing Steps
Step 1: Start with parent activeContext or empty context.  
Step 2: For @version, validate numeric 1.1, set processing mode.  
Step 3: Iterate entries:  
a) If value null delete mapping.  
b) For term definitions create mapping object.  
c) Normalize @container to array.  
d) Expand @id/@type to absolute IRI using base or vocab.  
e) Check for cycles.  
Step 4: Return merged activeContext.

## Original Source
JSON-LD 1.1
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT_DEF

# Context Definition

## 1. @context Structure

- A context is a JSON object, array or IRI.
- If an array, contexts are processed in order. Later definitions override earlier ones.
- Top-level context appears in the document as the value of the @context key.

## 2. Context Keywords and Types

Keyword   | Value Type                              | Default      | Effect
----------|-----------------------------------------|--------------|-----------------------------------
@version  | number (must be 1.1)                    | (none)       | Sets processingMode; must appear first
@base     | IRI string or null                      | document URL | Base IRI for resolving relative IRIs
@vocab    | IRI string or null                      | none         | Default vocabulary for term expansion
@language | BCP47 language tag string or null       | none         | Default language for untagged strings
@direction| "ltr", "rtl" or null                | none         | Default direction for untagged strings

## 3. Term Definitions

Each non-keyword entry in @context defines a term mapping.
Term mapping value may be:
  • string     → expanded to IRI or null
  • object     → map containing one or more of the following:
    • @id       : IRI or null
    • @type     : IRI, keyword or null
    • @container: "@list", "@set", "@index", "@language", "@id", "@type" or array of these
    • @reverse  : true | false
    • @prefix   : true | false
    • @protected: true | false
  • array      → combination of any of the above

## 4. Context Processing Algorithm (Condensed)

1. Initialize activeContext from previous context or initial context.
2. If @version present, require numeric 1.1, set processingMode to json-ld-1.1.
3. For each entry in local context (in source order):
   a. If value is null, delete existing term or keyword mapping.
   b. If key is a keyword, error.
   c. Create term definition:
      i. If value is string: set @id to value.
      ii. If value is object: assign properties from value map.
      iii. If @container present, normalize to array.
   d. Expand @id and @type relative to base or vocab.
   e. Validate no cycles in definitions.
4. Return new activeContext with merged term definitions.

## Attribution
- Source: JSON-LD 1.1
- URL: https://www.w3.org/TR/json-ld11/
- License: W3C Document License 1.0
- Crawl Date: 2025-04-25T23:36:06.380Z
- Data Size: 13832213 bytes
- Links Found: 98156

## Retrieved
2025-04-25
