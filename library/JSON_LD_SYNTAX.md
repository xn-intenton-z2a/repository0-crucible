# JSON_LD_SYNTAX

## Crawl Summary
JSON-LD defines a JSON-based linked data syntax with @context maps for term-to-IRI, keyword tokens (@id,@type,@value,@list,@set,@reverse,@base,@vocab,@language,@direction,@version,@nest,@graph,@included,@index), term definitions allowing @id,@type,@container,@language,@reverse,@nest,@prefix,@protected,@direction,@version,@vocab,@base, and four document forms (expanded, compacted, flattened, framed) via standard algorithms. Relative IRIs resolved against @base or document location; vocabulary-relative IRIs against @vocab. Processing mode json-ld-1.1 enforced via @version:1.1. Error conditions include invalid IRI, duplicate keys, conflicting definitions. Embedding via <script type="application/ld+json"> and link rel alternate. Security: reject non-JSON-LD MIME types, sanitize external contexts.

## Normalised Extract
Table of Contents:
1 Context Definitions
2 Keyword Syntax
3 Node and Value Objects
4 Data Structures and Graphs
5 Document Forms
6 IRI Resolution
7 Embedding
8 Processing Mode

1 Context Definitions
  @context: IRI | Map | Array. Defines term mappings and bases.
  Term Definition Map:
    @id: IRI
    @type: IRI or "@json"
    @container: "@list","@set","@index","@language","@id","@graph","@type"
    @language: BCP47 language tag or null
    @reverse: IRI
    @nest: term string
    @prefix: true|false
    @protected: true|false
    @direction: "ltr","rtl",null
    @version: numeric 1.1
    @vocab: IRI
    @base: IRI

2 Keyword Syntax
  @context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest

3 Node and Value Objects
  Node Object: Map without @value,@list,@set; may contain @id,@type,properties
  Value Object: Map with @value; optional @type,@language,@direction,@index,@nest
  List Object: @list: array; optional @index
  Set Object: @set: array; optional @index

4 Data Structures and Graphs
  Represent datasets: default graph, named graphs via @graph entries
  Blank nodes: _: prefix
  RDF triples via node objects and @reverse

5 Document Forms
  Expanded: expand(input, options) → Promise<object>
  Compacted: compact(input, context, options) → Promise<object>
  Flattened: flatten(input, context?, options) → Promise<object>
  Framed: frame(input, frame, options) → Promise<object>

6 IRI Resolution
  Relative IRI → resolved against @base or document location
  Vocabulary-relative IRI → resolved against @vocab

7 Embedding
  HTML: <script type="application/ld+json">…</script>
  Link: <link rel="alternate" type="application/ld+json" href="…">

8 Processing Mode
  Default: json-ld-1.1; @version:1.1 enforces mode; json-ld-1.0 mode rejects 1.1 features

## Supplementary Details
Parameter Values and Defaults:
@version: numeric 1.1 (errors if not exact numeric)
@direction: 'ltr','rtl',null; default inherited from context or HTML base element
@language: BCP47 language code or null; default null
@vocab: IRI or null; default null
@base: IRI or omitted; default document URL
@container options: '@list','@set','@index','@language','@id','@graph','@type'
Processing Options for API methods:
  documentLoader: function(url):Promise<object>
  expandContext: IRI|Map|Array
  compactToRelative: boolean (default false)
  graph: boolean (default false)
  skipContextCache: boolean (default false)
  processingMode: 'json-ld-1.0'|'json-ld-1.1' (default 'json-ld-1.1')
Implementation Steps:
1. Define @context in JSON-LD document header
2. Set base IRI via @base or HTML <base>
3. Load external contexts via documentLoader
4. Call expand(input,{documentLoader,processingMode})
5. Call compact(expanded,context,{skipContextCache})
6. Optionally flatten or frame
7. Serialize result as JSON

Configuration Effects:
- setting skipContextCache:true always refetches contexts
- compactToRelative:true outputs relative IRIs against base
- graph:true wraps output in @graph even if single node



## Reference Details
JavaScript API Method Signatures (jsonld.js v5.x):

expand(document: object|string, options?: {
  expandContext?: object|string|string[],
  documentLoader?: (url: string)=>Promise<{document:object,contextUrl?:string,contentType?:string}>,
  base?: string,
  processingMode?: 'json-ld-1.0'|'json-ld-1.1',
  skipContextCache?: boolean
}): Promise<object[]>

compact(document: object|string, context: object|string, options?: {
  documentLoader?: (url: string)=>Promise<{document:object,contextUrl?:string,contentType?:string}>,
  base?: string,
  processingMode?: 'json-ld-1.0'|'json-ld-1.1',
  compactToRelative?: boolean,
  graph?: boolean,
  skipContextCache?: boolean
}): Promise<object>

flatten(document: object|string, context?: object|string, options?: {
  documentLoader?: Function,
  base?: string,
  processingMode?: string,
  skipContextCache?: boolean
}): Promise<object>

frame(document: object|string, frame: object|string, options?: {
  documentLoader?: Function,
  base?: string,
  processingMode?: string,
  embed?: boolean,
  compact?: boolean,
  skipContextCache?: boolean
}): Promise<object>

Code Example:
import jsonld from 'jsonld';

async function process() {
  const doc = await jsonld.expand('doc.jsonld', {documentLoader,processingMode:'json-ld-1.1'});
  const compacted = await jsonld.compact(doc, {"schema": "http://schema.org/"}, {compactToRelative:true});
  console.log(JSON.stringify(compacted, null, 2));
}

Best Practices:
- Always specify @version:1.1 in context to lock processing mode
- Define @vocab when using common vocabulary to shorten IRIs
- Use skipContextCache during development to reflect context changes
- Provide a custom documentLoader to cache and validate remote contexts

Troubleshooting:
$ node myscript.js
Error: Invalid IRI "::example"
  inspect context term definitions for @id values

$ jsonld-cli expand --input data.jsonld --loader 'file'
Error: duplicate term "name" in @context
  ensure unique keys in context

$ jsonld-cli compact --input data.jsonld --context ctx.jsonld
Warning: processingMode json-ld-1.0 rejects @direction
  upgrade CLI to support json-ld-1.1


## Information Dense Extract
@context:IRI|Map|Array termMapKeys:@id@type@container@language@reverse@nest@prefix@protected@direction@version@vocab@base. Keywords:@context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest. NodeObject:map without @value,@list,@set; ValueObject:@value map. ListObject:@list array; SetObject:@set array. expand(input,opts)->Promise<object[]>; compact(input,ctx,opts)->Promise<object>; flatten(input,ctx?,opts)->Promise<object>; frame(input,frame,opts)->Promise<object>. Options:documentLoader(fn),base:IRI,processingMode:'json-ld-1.0'|'json-ld-1.1',skipContextCache:boolean,compactToRelative:boolean,graph:boolean,embed:boolean. IRI resolution: relative->@base|docURL; vocab->@vocab. ProcessingMode default json-ld-1.1; lock via @version:1.1. Errors on dup keys, invalid IRI, malformed context. Embedding:<script type="application/ld+json">; <link rel="alternate">. Default base direction:null; default language:null. Best practices:@version lock,@vocab,use skipContextCache,custom documentLoader.

## Sanitised Extract
Table of Contents:
1 Context Definitions
2 Keyword Syntax
3 Node and Value Objects
4 Data Structures and Graphs
5 Document Forms
6 IRI Resolution
7 Embedding
8 Processing Mode

1 Context Definitions
  @context: IRI | Map | Array. Defines term mappings and bases.
  Term Definition Map:
    @id: IRI
    @type: IRI or '@json'
    @container: '@list','@set','@index','@language','@id','@graph','@type'
    @language: BCP47 language tag or null
    @reverse: IRI
    @nest: term string
    @prefix: true|false
    @protected: true|false
    @direction: 'ltr','rtl',null
    @version: numeric 1.1
    @vocab: IRI
    @base: IRI

2 Keyword Syntax
  @context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest

3 Node and Value Objects
  Node Object: Map without @value,@list,@set; may contain @id,@type,properties
  Value Object: Map with @value; optional @type,@language,@direction,@index,@nest
  List Object: @list: array; optional @index
  Set Object: @set: array; optional @index

4 Data Structures and Graphs
  Represent datasets: default graph, named graphs via @graph entries
  Blank nodes: _: prefix
  RDF triples via node objects and @reverse

5 Document Forms
  Expanded: expand(input, options)  Promise<object>
  Compacted: compact(input, context, options)  Promise<object>
  Flattened: flatten(input, context?, options)  Promise<object>
  Framed: frame(input, frame, options)  Promise<object>

6 IRI Resolution
  Relative IRI  resolved against @base or document location
  Vocabulary-relative IRI  resolved against @vocab

7 Embedding
  HTML: <script type='application/ld+json'></script>
  Link: <link rel='alternate' type='application/ld+json' href=''>

8 Processing Mode
  Default: json-ld-1.1; @version:1.1 enforces mode; json-ld-1.0 mode rejects 1.1 features

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD_SYNTAX

# JSON-LD 1.1 Syntax and Grammar

# Context Definitions

## @context
Type: IRI | Array | Map
Default: document location
Purpose: define term-to-IRI mappings and processing directives

## Term Definition Map Keys
- @id  : IRI mapping for term
- @type: IRI or '@json'; coerces values to datatype or JSON literal
- @container: '@list','@set','@index','@language','@id','@graph','@type'
- @language: BCP47 language tag or null
- @reverse: IRI for reverse property definitions
- @nest: term in context used to nest properties
- @prefix: true|false (controls term expansion)
- @protected: true|false (locks term definition)
- @direction: 'ltr','rtl',null (base direction for string values)
- @version: numeric 1.1 (processing mode indicator)
- @vocab: IRI (default vocabulary mapping)
- @base: IRI (base for resolving relative IRIs)

# Keywords and Syntax Tokens

All JSON-LD keywords are case-sensitive strings beginning with '@':
@context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest

# Node and Value Objects

## Node Object
Map without '@value','@list','@set'; may contain '@id','@type','properties'

## Value Object
Map with '@value'; optional keys: '@type', '@language','@direction','@index','@nest'

## List and Set Objects
- @list: array of values or node/value objects; optional '@index'
- @set: array of values; optional '@index'

# Document Forms and Transformations

## Expanded Form
All terms expanded to absolute IRIs, values as objects. Use algorithm: expand(input, options).

## Compacted Form
Compaction with context: compact(input, context, options). Maps IRIs to terms, collapses values.

## Flattened Form
Flattens all graphs into top-level @graph with node objects: flatten(input, context?, options).

## Framed Form
Applies frame document to extract matching subgraphs: frame(input, frame, options).

# Embedding and Link Relations

## HTML Script Embedding
<script type="application/ld+json">JSON-LD document</script>
Base IRI inherited from HTML <base> element; restrict content to valid JSON

## Link Relations
<link rel="alternate" type="application/ld+json" href="doc.jsonld">

# IRI Resolution

Relative IRI references resolved against base IRI established by @base or document location; vocabulary-relative IRIs resolved against @vocab mapping.

# Serializing RDF

Use @graph, @id,@type, @reverse to express RDF triples and named graphs. RDF literal with datatype IRI and language tag.

# Processing Mode

Default: json-ld-1.1. Option @version:1.1 in context locks processor to 1.1; processors in json-ld-1.0 mode error on unsupported features.

# Error Conditions

MUST error on: duplicate keys in object; invalid IRI; unknown keyword usage; malformed context entries; conflicting term definitions.

# Security and Privacy Considerations

Processors MUST enforce JSON parsing rules; MUST reject scripts with non-JSON-LD MIME types; careful with external contexts to avoid injection.

# Retrieval: 2023-10-03
Attribution: W3C JSON-LD 1.1 Recommendation
Data Size: 16 393 397 bytes
Links Found: 116 186
Errors: None

## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: W3C Document License
- Crawl Date: 2025-05-02T17:56:25.128Z
- Data Size: 16393397 bytes
- Links Found: 116186

## Retrieved
2025-05-02
