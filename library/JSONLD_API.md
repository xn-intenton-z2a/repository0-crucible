# JSONLD_API

## Crawl Summary
JsonLdProcessor interface with methods expand, compact, flatten, frame, toRDF, fromRDF defined in WebIDL with input, context/frame, options arguments and Promise return; RdfDataset and Quad interfaces; JsonLdOptions dictionary listing base, expandContext, documentLoader, processingMode, produceGeneralizedRdf, skipExpansion, ordered, embed, explicit, omitGraph; DocumentLoader signature and RemoteDocument dictionary; JsonLdError codes and structure.

## Normalised Extract
Table of Contents:
1. JsonLdProcessor Interface
2. JsonLdOptions Type
3. DocumentLoader and RemoteDocument
4. Error Handling

1. JsonLdProcessor Interface
  expand(input:object, options:JsonLdOptions):Promise<object>
    - Removes context; expands IRIs; outputs expanded form array or object
    - options.base: base IRI for relative resolution
    - options.expandContext: local context to merge
  compact(input:object, context:object, options:JsonLdOptions):Promise<object>
    - Applies provided context; compacts IRIs to terms or compact IRIs
    - options.processingMode: "json-ld-1.0" | "json-ld-1.1"
  flatten(input:object, context:object|null, options:JsonLdOptions):Promise<object>
    - Collects all node properties in single node object; assigns blank node identifiers
  frame(input:object, frame:object, options:JsonLdOptions):Promise<object>
    - Matches nodes against frame; embeds according to embed, explicit, omitGraph flags
  toRDF(input:object, options:JsonLdOptions):Promise<RdfDataset>
    - Serializes JSON-LD to RDF Dataset; options.produceGeneralizedRdf toggles generalized triples
  fromRDF(dataset:RdfDataset, options:JsonLdOptions):Promise<object>
    - Converts RDF dataset to JSON-LD; options.base and processingMode apply

2. JsonLdOptions Type
  base: string (default: document URL)
  expandContext: object (additional context to apply before expansion)
  documentLoader: (url:string)=>Promise<RemoteDocument> (default: built-in fetch)
  processingMode: "json-ld-1.0" | "json-ld-1.1" (default: "json-ld-1.1")
  produceGeneralizedRdf: boolean (default: false)
  skipExpansion: boolean (default: false)
  ordered: boolean (default: false)
  embed: boolean (default: true for frame)
  explicit: boolean (default: false for frame)
  omitGraph: boolean (default: false for frame)

3. DocumentLoader and RemoteDocument
  DocumentLoader(url) => Promise<RemoteDocument>
  RemoteDocument:
    documentUrl: final URL after redirects
    document: parsed JSON-LD or RDF dataset
    contextUrl: URL of linked context if `Link` header present
    context: preloaded context object

4. Error Handling
  All API calls reject with JsonLdError:
    name: "JsonLdError"
    code: one of LoadingDocumentFailed, InvalidRemoteDocument, InvalidContext, ExpansionError, CompactError, FrameError, ToRdfError, FromRdfError
    message: human-readable detail
    cause: underlying Error object or URI


## Supplementary Details
- Default DocumentLoader uses HTTP GET with Accept: application/ld+json, application/json, text/turtle
- To override context caching, supply custom documentLoader intercepting contextUrl
- To enable 1.0 compatibility, set processingMode to "json-ld-1.0"; errors thrown if context uses 1.1-only keywords
- For large graphs, set ordered=true on toRDF to sort triples lexicographically by subject, predicate, object, graph
- Frame embed/explicit/omitGraph behavior:
  embed:false => only nodes matching at top-level
  explicit:true => output only specified properties; others omitted
  omitGraph:true => omit @graph wrapper in result


## Reference Details
// SDK method signatures and examples

import { JsonLdProcessor, JsonLdOptions } from 'jsonld';
const processor = new JsonLdProcessor();

// Expand example
enum Mode { V1_0 = 'json-ld-1.0', V1_1 = 'json-ld-1.1' }
async function expandExample(input:any) {
  const opts: JsonLdOptions = {
    base: 'http://example.com/',
    documentLoader: (url) => fetchDocument(url),
    processingMode: Mode.V1_1
  };
  return await processor.expand(input, opts);
}

// Compact example
async function compactExample(input:any, ctx:any) {
  const opts: JsonLdOptions = { skipExpansion: false };
  return await processor.compact(input, ctx, opts);
}

// Flatten example
async function flattenExample(input:any, ctx:any|null) {
  const opts: JsonLdOptions = {};
  return await processor.flatten(input, ctx, opts);
}

// Frame example
async function frameExample(input:any, frame:any) {
  const opts: JsonLdOptions = { embed: true, explicit: false, omitGraph: false };
  return await processor.frame(input, frame, opts);
}

// RDF conversion example
toRdfExample(processor, input) {
  const opts: JsonLdOptions = { produceGeneralizedRdf: true, ordered: true };
  return processor.toRDF(input, opts);
}

// Error handling
try {
  await processor.expand(input, {});
} catch(e) {
  if (e.code === 'LoadingDocumentFailed') {
    console.error('Failed to load', e.cause);
  }
}

// Troubleshooting
// Command-line test using Node REPL
// > node -e "require('jsonld').expand({"@id":"_:b0"}).then(console.log).catch(console.error)"
// Expected output: [{"@id":"_:b0"}]


## Information Dense Extract
JsonLdProcessor methods: expand(input,opts):Promise<object>; compact(input,ctx,opts):Promise<object>; flatten(input,ctx,opts):Promise<object>; frame(input,frame,opts):Promise<object>; toRDF(input,opts):Promise<RdfDataset>; fromRDF(dataset,opts):Promise<object>. JsonLdOptions: base:string; expandContext:object; documentLoader:(url)=>Promise<RemoteDocument>; processingMode:'json-ld-1.0'|'json-ld-1.1'; produceGeneralizedRdf:boolean; skipExpansion:boolean; ordered:boolean; embed:boolean; explicit:boolean; omitGraph:boolean. DocumentLoader: (url)=>Promise<{documentUrl,document,contextUrl,context}>. Errors: JsonLdError{name,code:LoadingDocumentFailed|InvalidContext|ExpansionError|CompactError|FrameError|ToRdfError|FromRdfError,message,cause}.

## Sanitised Extract
Table of Contents:
1. JsonLdProcessor Interface
2. JsonLdOptions Type
3. DocumentLoader and RemoteDocument
4. Error Handling

1. JsonLdProcessor Interface
  expand(input:object, options:JsonLdOptions):Promise<object>
    - Removes context; expands IRIs; outputs expanded form array or object
    - options.base: base IRI for relative resolution
    - options.expandContext: local context to merge
  compact(input:object, context:object, options:JsonLdOptions):Promise<object>
    - Applies provided context; compacts IRIs to terms or compact IRIs
    - options.processingMode: 'json-ld-1.0' | 'json-ld-1.1'
  flatten(input:object, context:object|null, options:JsonLdOptions):Promise<object>
    - Collects all node properties in single node object; assigns blank node identifiers
  frame(input:object, frame:object, options:JsonLdOptions):Promise<object>
    - Matches nodes against frame; embeds according to embed, explicit, omitGraph flags
  toRDF(input:object, options:JsonLdOptions):Promise<RdfDataset>
    - Serializes JSON-LD to RDF Dataset; options.produceGeneralizedRdf toggles generalized triples
  fromRDF(dataset:RdfDataset, options:JsonLdOptions):Promise<object>
    - Converts RDF dataset to JSON-LD; options.base and processingMode apply

2. JsonLdOptions Type
  base: string (default: document URL)
  expandContext: object (additional context to apply before expansion)
  documentLoader: (url:string)=>Promise<RemoteDocument> (default: built-in fetch)
  processingMode: 'json-ld-1.0' | 'json-ld-1.1' (default: 'json-ld-1.1')
  produceGeneralizedRdf: boolean (default: false)
  skipExpansion: boolean (default: false)
  ordered: boolean (default: false)
  embed: boolean (default: true for frame)
  explicit: boolean (default: false for frame)
  omitGraph: boolean (default: false for frame)

3. DocumentLoader and RemoteDocument
  DocumentLoader(url) => Promise<RemoteDocument>
  RemoteDocument:
    documentUrl: final URL after redirects
    document: parsed JSON-LD or RDF dataset
    contextUrl: URL of linked context if 'Link' header present
    context: preloaded context object

4. Error Handling
  All API calls reject with JsonLdError:
    name: 'JsonLdError'
    code: one of LoadingDocumentFailed, InvalidRemoteDocument, InvalidContext, ExpansionError, CompactError, FrameError, ToRdfError, FromRdfError
    message: human-readable detail
    cause: underlying Error object or URI

## Original Source
JSON-LD 1.1 Specification and API
https://www.w3.org/TR/json-ld11-api/

## Digest of JSONLD_API

# JSON-LD 1.1 Processing Algorithms and API - Extract
Date Retrieved: 2023-10-10
Source: W3C Recommendation 16 July 2020 (JSON-LD 1.1 API)
Data Size: 34300293 bytes, Links: 160551, Error: None

## 9. The Application Programming Interface

### 9.1 JsonLdProcessor Interface
```webidl
interface JsonLdProcessor {
  Promise<object> expand(
    object input,
    JsonLdOptions options = {});
  Promise<object> compact(
    object input,
    object context,
    JsonLdOptions options = {});
  Promise<object> flatten(
    object input,
    object context = null,
    JsonLdOptions options = {});
  Promise<object> frame(
    object input,
    object frame,
    JsonLdOptions options = {});
  Promise<RdfDataset> toRDF(
    object input,
    JsonLdOptions options = {});
  Promise<object> fromRDF(
    RdfDataset dataset,
    JsonLdOptions options = {});
};
```

### 9.2 RDF Dataset Interfaces
```webidl
dictionary RdfDataset {
  any RDF:Quad[];
};
```
Quad structure: { subject: Term, predicate: Term, object: Term, graph: Term }
Term: IRI | BlankNode | Literal {value, datatype, language}

### 9.3 JsonLdOptions Type
```webidl
dictionary JsonLdOptions {
  DOMString base;
  object expandContext;
  DocumentLoader documentLoader;
  DOMString processingMode;      // "json-ld-1.0" or "json-ld-1.1"
  boolean produceGeneralizedRdf;
  boolean skipExpansion;
  boolean ordered;
  boolean embed;
  boolean explicit;
  boolean omitGraph;
};
```

### 9.4 Remote Document and Context Retrieval
```webidl
callback DocumentLoader = Promise<RemoteDocument> (
  DOMString url
);
dictionary RemoteDocument {
  DOMString documentUrl;
  any document;
  DOMString contextUrl;
  object context;
};
```

### 9.6 Error Handling
Errors throw `JsonLdError` instances with properties:
- `name`: "JsonLdError"
- `code`: "LoadingDocumentFailed", "InvalidContext", "ExpansionError", "CompactError", …
- `message`: detailed description
- `cause`: underlying error or URI



## Attribution
- Source: JSON-LD 1.1 Specification and API
- URL: https://www.w3.org/TR/json-ld11-api/
- License: License
- Crawl Date: 2025-04-27T07:48:08.468Z
- Data Size: 34300293 bytes
- Links Found: 160551

## Retrieved
2025-04-27
