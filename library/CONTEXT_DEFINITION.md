# CONTEXT_DEFINITION

## Crawl Summary
Context definitions must use the @context key whose value may be a string, object, or array. In object contexts, keys map to term definitions: simple (string to IRI) or expanded (object with @id, @type, @container, @language, @direction, @reverse, @prefix, @protected, @context, @nest). Global context settings include @base, @vocab, @language, @direction, @version. Terms with @prefix true allow compact IRIs using term as prefix. @container values determine how values are represented: @list for arrays, @set for sets, @id to build maps keyed by IRI, @index for index maps, @language for language maps, @vocab to map values against default vocabulary.

## Normalised Extract
Table of Contents
1 Context Syntax
2 Term Definition Keywords
3 Context Global Settings

1 Context Syntax
Value types:
  - String: remote context IRI loaded via HTTP GET
  - Object: inline context map
  - Array: ordered list of context entries

2 Term Definition Keywords
@id: IRI or null; maps term to absolute IRI; null to disable term
@type: IRI/compact IRI/term; coerces values to typed literals or IRIs
@container: one of @list,@set,@id,@index,@language,@vocab; restructures value containers
@language: BCP47 code or null; sets default language for string
@direction: ltr,rtl or null; sets base direction for string
@reverse: IRI/term; defines reverse property expansion
@prefix: true|false; designates term as prefix for compact IRIs
@protected: true|false; locks term to prevent override
@context: IRI/object; embedded context scoped to term
@nest: string; forwards nested properties to subject

3 Context Global Settings
@base: IRI or null; resolves relative IRIs
@vocab: IRI or null; default vocabulary IRI for unprefixed terms
@language: BCP47 code or null; default language
@direction: ltr,rtl or null; default base direction
@version: 1.1; enforces JSON-LD 1.1 processing mode


## Supplementary Details
Remote Context Loading Algorithm:
1 Perform HTTP GET on context IRI with header Accept: application/ld+json
2 Follow HTTP redirects (up to 5)
3 On 200 OK with Content-Type application/ld+json parse body as JSON-LD context
4 On 406 or other 2xx with incompatible type, attempt to process as JSON then extract @context
5 Cache contexts per HTTP caching headers
6 Merge contexts in array order; later definitions override earlier unless @protected

Context Precedence Rules:
- Local term definitions override remote contexts for same term unless @protected
- Global settings (@base,@vocab,@language,@direction) apply after merging
- @version must be processed first to determine processing mode


## Reference Details
Context Definition Object Schema:
{
  term: string : string | {
    @id        : IRI | null,
    @type      : IRI | compactIRI | term,
    @container : '@list' | '@set' | '@id' | '@index' | '@language' | '@vocab',
    @language  : BCP47 | null,
    @direction : 'ltr' | 'rtl' | null,
    @reverse   : IRI | term,
    @prefix    : boolean,
    @protected : boolean,
    @context   : IRI | object,
    @nest      : string
  }
}

Example Full Context Definition:
{
  '@context': [
    'http://example.com/context/base.jsonld',
    {
      '@base': 'http://example.com/data/',
      '@vocab': 'http://schema.org/',
      'name': 'http://xmlns.com/foaf/0.1/name',
      'homepage': { '@id': 'foaf:homepage', '@type': '@id' },
      'ex': { '@prefix': true, '@id': 'http://example.com/vocab#' },
      'labels': { '@container': '@language' },
      'orderedItems': { '@container': '@list' }
    }
  ]
}

Best Practices:
- Always specify @version:1.1 in top-level @context to enforce JSON-LD 1.1 mode
- Use @vocab for common vocabulary to simplify term definitions
- Declare prefixes explicitly with @prefix for compactIRIs

Troubleshooting:
1 curl -I -H "Accept: application/ld+json" http://example.com/context.jsonld
   Expect Status 200 and Content-Type: application/ld+json
2 If parser error "Term already defined": check @protected flags
3 If IRI not resolved: verify @base and @vocab values


## Information Dense Extract
@context = string|object|array RemoteLoad via HTTP GET Accept:application/ld+json cache per HTTP headers merge in order
TermDefinition = string(IRI)|object({@id:IRI|null @type:IRI|term @container:@list|@set|@id|@index|@language|@vocab @language:BCP47|null @direction:ltr|rtl|null @reverse:IRI term @prefix:boolean @protected:boolean @context:IRI object @nest:string})
GlobalSettings in context object keys: @base:IRI|null @vocab:IRI|null @language:BCP47|null @direction:ltr|rtl|null @version:1.1
PrefixTerm if @prefix:true enables term:local suffix => IRI concatenation
Container reshape values based on @container mapping


## Sanitised Extract
Table of Contents
1 Context Syntax
2 Term Definition Keywords
3 Context Global Settings

1 Context Syntax
Value types:
  - String: remote context IRI loaded via HTTP GET
  - Object: inline context map
  - Array: ordered list of context entries

2 Term Definition Keywords
@id: IRI or null; maps term to absolute IRI; null to disable term
@type: IRI/compact IRI/term; coerces values to typed literals or IRIs
@container: one of @list,@set,@id,@index,@language,@vocab; restructures value containers
@language: BCP47 code or null; sets default language for string
@direction: ltr,rtl or null; sets base direction for string
@reverse: IRI/term; defines reverse property expansion
@prefix: true|false; designates term as prefix for compact IRIs
@protected: true|false; locks term to prevent override
@context: IRI/object; embedded context scoped to term
@nest: string; forwards nested properties to subject

3 Context Global Settings
@base: IRI or null; resolves relative IRIs
@vocab: IRI or null; default vocabulary IRI for unprefixed terms
@language: BCP47 code or null; default language
@direction: ltr,rtl or null; default base direction
@version: 1.1; enforces JSON-LD 1.1 processing mode

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT_DEFINITION

# Context Definitions

## Context Syntax
A JSON-LD context is defined using the @context key in a JSON document. The value of @context may be:

- A string (IRI) referencing a remote context document
- An object (map) containing term definitions and context settings
- An array combining any mix of strings and objects

## Term Definition Object
Each entry in a context object defines a term and may be either:

- A simple term definition: a string mapping to an IRI
- An expanded term definition: an object with one or more of the following keys:
  - @id        : IRI or null
  - @type      : IRI, compact IRI, or term; defines type coercion
  - @container : one of @list, @set, @id, @index, @language, @vocab
  - @language  : BCP47 language code or null
  - @direction : "ltr", "rtl", or null
  - @reverse   : IRI or term indicating reverse property
  - @prefix    : true or false; whether this term is a prefix
  - @protected : true or false; whether term is protected
  - @context   : embedded context (object or IRI)
  - @nest      : string for nested property forwarding

## Context Settings
Context-level entries (keys in the @context map starting with @) configure global behavior:

- @base      : IRI or null; base IRI for resolving relative IRIs
- @vocab     : IRI or null; default vocabulary IRI for terms
- @language  : BCP47 code or null; default language for string values
- @direction : "ltr", "rtl", or null; default base direction
- @version   : 1.1 (numeric) to enforce JSON-LD 1.1 processing mode



## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: CC0 1.0 Universal
- Crawl Date: 2025-04-26T12:57:20.223Z
- Data Size: 14472365 bytes
- Links Found: 102705

## Retrieved
2025-04-26
