# CONTEXT_CONFIG

## Crawl Summary
@context Entry grammar definitions: @context can be IRI, object, or array. ContextObject has termDefinition entries. TermDefinition may be simple IRI or a complex map with exact keys: @id, @type, @container, @context, @reverse, @language, @direction, @prefix. Default vocabulary via @vocab, base IRI via @base. Processing mode controlled by @version. Remote contexts loaded via HTTP GET; must implement caching (Cache-Control, ETag) and handle HTTP redirects and errors. Security: filter unknown keywords, enforce CORS.

## Normalised Extract
Table of Contents
1. Context Signature
2. Term Definition Structure
3. Default Vocabulary (@vocab)
4. Base IRI (@base)
5. Processing Mode (@version)
6. Term Definition Keys

1. Context Signature
@context: IRI | ContextObject | Array<IRI|ContextObject>

2. Term Definition Structure
ContextObject: { termName: IRI | ContextDefinition }
ContextDefinition: {
  @id?: IRI;
  @type?: IRI|"@id";
  @container?: "@list"|"@set"|"@id"|"@type"|"@index"|"@language";
  @context?: IRI|ContextObject|Array<...>;
  @reverse?: IRI;
  @language?: string|null;
  @direction?: "ltr"|"rtl"|null;
  @prefix?: boolean;
}

3. Default Vocabulary (@vocab)
@vocab: IRI
Effect: terms without prefix expand to IRI concatenated after @vocab value.

4. Base IRI (@base)
@base: IRI
Effect: resolve relative IRIs in @id, @type, @vocab.

5. Processing Mode (@version)
@version: 1.1
Effect: enable JSON-LD 1.1 features; 1.0 processors will error on numeric

6. Term Definition Keys
@id: map term to absolute or compact IRI
@type: coerce value types
@container: group values as list, set, index, language map
@context: nested context scope
@reverse: define reverse property
@language: default language tag
@direction: string direction
@prefix: expose term as IRI prefix

## Supplementary Details
Parameter Values and Effects
- @id: must be absolute IRI (e.g., https://schema.org/name) or compact IRI (e.g., schema:name)
- @type: IRI or '@id'; default no coercion
- @container: '@list','@set','@id','@type','@index','@language'; default none
- @context: URL or object; nested contexts override parent
- @reverse: IRI for reverse mapping
- @language: BCP47 code (e.g., 'en'); null disables default
- @direction: 'ltr'|'rtl'; null inherits base direction
- @prefix: true exposes term as prefix in compaction
Configuration Steps
1. Define @context in JSON-LD document header
2. Place @vocab and @base at top level for default expansion
3. Use term definitions for property aliasing
4. For nested contexts include @context within termDefinition
5. Load remote contexts with cache and error handling
6. To restrict to JSON-LD 1.0 set processingMode option in API

## Reference Details
JavaScript JSON-LD API (jsonld.js v1.8.3)

Method Signatures
expand(input: object|string, options?: {
  base?: string;
  expandContext?: object|string|Array;
  documentLoader?: (url:string)->Promise<object>;
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  skipExpansion?: boolean;
}) => Promise<Array<object>>

compact(input: object|string, context: object|string, options?: {
  base?: string;
  compactToRelative?: boolean;
  documentLoader?: Function;
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  compactArrays?: boolean;
  skipExpansion?: boolean;
}) => Promise<object>

flatten(input: object|string, context?: object|string, options?: object) => Promise<object>

frame(input: object|string, frame: object|string, options?: object) => Promise<object>

normalize(input: object|string, options?: {
  algorithm?: 'URDNA2015'|'URGNA2012';
  format?: 'application/n-quads'|'application/trig';
  documentLoader?: Function;
}) => Promise<string>

toRDF(input: object|string, options?: {
  base?: string;
  produceGeneralizedRdf?: boolean;
  format?: 'application/n-quads'|'application/trig';
}) => Promise<object>

fromRDF(quads: string|Array<any>, options?: {
  format?: 'application/n-quads';
  produceGeneralizedRdf?: boolean;
}) => Promise<object>

Code Example
const jsonld = require('jsonld');

(async () => {
  const doc = require('./input.json');
  const context = require('./context.json');
  const compacted = await jsonld.compact(doc, context, { base: 'https://example.com/', compactArrays: true });
  console.log(JSON.stringify(compacted, null, 2));
})();

Configuration Options and Effects
- base: string. Default undefined. Resolves relative IRIs.
- compactArrays: boolean. Default true. Collapses single-element arrays.
- skipExpansion: boolean. Default false. Skips initial expansion phase.
- processingMode: 'json-ld-1.0' or 'json-ld-1.1'. Default 'json-ld-1.1'.

Best Practices
1. Preload remote contexts using custom documentLoader with caching.
2. Invoke jsonld.normalize before signing linked data proofs.
3. Use '@vocab' for common term prefixes to shorten payload.
4. Set compactArrays to false when array membership is semantically significant.

Troubleshooting
Command: node debug.js
Expected: No unhandled promise rejections.

Common Errors and Resolutions
Error: Context URL not found
- Ensure HTTP 200 response and correct Content-Type: application/ld+json
- Implement documentLoader that follows redirects

Error: Cycle detected in context
- Use @vocab instead of nested @context recursion

## Information Dense Extract
@context: IRI|object|array; object:{term:IRI|{ @id?:IRI,@type?:IRI|@id,@container?:@list|@set|@id|@type|@index|@language,@context?:...,@reverse?:IRI,@language?:BCP47|null,@direction?:ltr|rtl|null,@prefix?:bool }}. Keys:@vocab:IRI default vocab,@base:IRI base resolution,@version:1.1 proc mode. Context loading: HTTP GET; cache via Cache-Control,ETag. JS API jsonld.expand(input,opts)->Promise<expanded>,jsonld.compact(input,ctx,opts)->Promise<compacted>,flatten,frame,normalize,toRDF,fromRDF. Options: base,documentLoader,processingMode,skipExpansion,compactArrays,algorithm,format. Best practices: preload contexts,normalize before signing. Troubleshooting: HTTP errors->check status,CORS; Cycle->remove nested contexts.

## Sanitised Extract
Table of Contents
1. Context Signature
2. Term Definition Structure
3. Default Vocabulary (@vocab)
4. Base IRI (@base)
5. Processing Mode (@version)
6. Term Definition Keys

1. Context Signature
@context: IRI | ContextObject | Array<IRI|ContextObject>

2. Term Definition Structure
ContextObject: { termName: IRI | ContextDefinition }
ContextDefinition: {
  @id?: IRI;
  @type?: IRI|'@id';
  @container?: '@list'|'@set'|'@id'|'@type'|'@index'|'@language';
  @context?: IRI|ContextObject|Array<...>;
  @reverse?: IRI;
  @language?: string|null;
  @direction?: 'ltr'|'rtl'|null;
  @prefix?: boolean;
}

3. Default Vocabulary (@vocab)
@vocab: IRI
Effect: terms without prefix expand to IRI concatenated after @vocab value.

4. Base IRI (@base)
@base: IRI
Effect: resolve relative IRIs in @id, @type, @vocab.

5. Processing Mode (@version)
@version: 1.1
Effect: enable JSON-LD 1.1 features; 1.0 processors will error on numeric

6. Term Definition Keys
@id: map term to absolute or compact IRI
@type: coerce value types
@container: group values as list, set, index, language map
@context: nested context scope
@reverse: define reverse property
@language: default language tag
@direction: string direction
@prefix: expose term as IRI prefix

## Original Source
JSON-LD 1.1
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT_CONFIG

# JSON-LD Context Configuration
Date retrieved: 2024-06-23

# @context Entry
The @context entry is defined by the JSON-LD Grammar (Appendix 9):

```grammar
@context ::= contextValue
contextValue ::= IRI | ContextObject | [ contextValue ( "," contextValue )* ]
ContextObject ::= '{' termDefinition ( ',' termDefinition )* '}'
termDefinition ::= termName ':' ( IRI | ContextDefinition )
ContextDefinition ::= '{' contextKeyValues '}'
contextKeyValues ::= ( '@id' ':' IRI )?
                 ( '@type' ':' ( IRI | '@id' ) )?
                 ( '@container' ':' ( '@list' | '@set' | '@id' | '@type' | '@index' | '@language' ) )?
                 ( '@context' ':' contextValue )?
                 ( '@reverse' ':' IRI )?
                 ( '@language' ':' string | null )?
                 ( '@direction' ':' 'ltr' | 'rtl' | null )?
                 ( '@prefix' ':' true | false )?
```

# Term Definition Properties
- "@id": absolute IRI or compact IRI mapping the term to an IRI
- "@type": datatype IRI or '@id' to coerce values to IRIs
- "@container": one of '@list','@set','@id','@type','@index','@language'
- "@context": embedded context to scope terms
- "@reverse": IRI for reverse properties
- "@language": BCP47 language tag or null to disable
- "@direction": 'ltr' or 'rtl' for string directionality
- "@prefix": true to expose term as a prefix for CURIEs

# Default Vocabulary and Base IRI
- "@vocab": absolute IRI as default vocabulary mapping for terms without prefix
- "@base": absolute IRI against which to resolve relative IRIs

# Processing Mode
- "@version": 1.1 to enforce JSON-LD 1.1 processing mode

# Context Loading
Remote contexts are loaded via HTTP GET, parsed as JSON-LD; processors must implement caching and HTTP error handling (status codes 200 OK for success, 3xx redirects, 4xx/5xx as errors).

# Caching Recommendations
- Use HTTP Cache-Control headers: max-age, ETag
- Maintain in-memory and on-disk cache keyed by context URL and ETag

# Security
- Validate remote contexts for expected properties; reject contexts with unknown keywords except for extensions.

## Attribution
- Source: JSON-LD 1.1
- URL: https://www.w3.org/TR/json-ld11/
- License: W3C Document License 1.0
- Crawl Date: 2025-04-26T01:08:03.555Z
- Data Size: 13192041 bytes
- Links Found: 93583

## Retrieved
2025-04-26
