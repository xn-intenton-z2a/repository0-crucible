# JSON_LD_SYNTAX

## Crawl Summary
@context: must be IRI,map,array. Term definitions: string→IRI or map with @id,@type,@container,@language,@direction,@protected,@reverse,@context. Keywords: @id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version,@nest. Top-level forms: expanded,compacted,flattened,framed. Data structures: node,value,list,set,graph. Processing mode: default json-ld-1.1 or numeric @version1.1. IRI resolution: base IRI from document or @base. All keys are case-sensitive.

## Normalised Extract
Table of Contents:
1 Context Definitions
2 Keywords and Syntax Tokens
3 Data Structures
4 Document Forms
5 Grammar Productions

1 Context Definitions
@context: value must be one of:
  IRI (absolute or relative)
  map of term definitions
  array of any combination of the above
Term definition:
  simple: string→IRI
  expanded: map with entries:
    @id: IRI
    @type: IRI
    @container: @list,@set,@language,@index,@id,@type,@graph
    @language: BCP47 tag or null
    @direction: ltr, rtl or null
    @protected: true|false
    @reverse: true|false
    @context: IRI, map or array

2 Keywords and Syntax Tokens
Keywords: @context,@id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version,@nest
All keywords and values are case-sensitive.
@version must be numeric 1.1 to activate JSON-LD1.1 processing mode.

3 Data Structures
Node object: map without top-level @value,@list,@set or with other properties.
Value object: map with @value and optional @type,@language,@index.
List object, Set object: map with @list or @set and optional @index.
Graph object: map with @graph and optional @id,@index.
Language map: map BCPT47 tag → string|array|null.
Index map: map scalar|node/value/list/set → scalar,array,object.

4 Document Forms
Expanded: all IRIs absolute, all values arrays, omit defaults.
Compacted: use terms for IRIs, collapse values when default applies, arrays for lists.
Flattened: one array of node objects with unique @id.
Framed: apply frame document maps with @embed,@explicit,@omitDefault.

5 Grammar Productions
ContextDefinition = object-literal / IRI / array
TermDefinition    = string / map
Keyword           = %x40context / %x40id / %x40type / ... / %x40nest


## Supplementary Details
Processing mode option: json-ld-1.1 (default), or json-ld-1.0 via API option processingMode: 'json-ld-1.0'.
Base IRI precedence: @base in context > document location.
Compact IRI form: prefix:suffix where prefix maps via context term to IRI string ending in terminating character (/, #, :).
Default vocabulary (@vocab): IRI to prepend to unprefixed terms in compact form.
@language default: BCP47 code or null disables language coercion.
@direction default: 'ltr','rtl' or null disables direction.
@protected:true in term prevents context overrides.
@reverse:true alias for @reverse property mapping.
Language-tagged string representation: { "@value":string, "@language":BCP47 }.
Typed value representation: { "@value":string, "@type":datatypeIRI }.
Note: Arrays preserve order; Sets unordered unless explicitly @list.


## Reference Details
Grammar:
ContextDefinition：《IRI》 | 《object》 | 《array》
TermDefinition ：《string》 | 《object》
Keyword token codes: @context (0x40 636f6e74657874), @id, @type, @value, @language, @direction, @list, @set, @reverse, @graph, @included, @index, @container, @vocab, @base, @version, @nest

Example Context Binding:
{
  "@context":{
    "schema":"http://schema.org/",
    "name":"schema:name",
    "homepage":{
      "@id":"schema:url",
      "@type":"@id"
    }
  }
}

Implementation Pattern:
1 Parse JSON into core data structures (arrays,maps,strings,numbers,booleans,null).
2 Load active context from @context entries (merge local then remote contexts).
3 Expand terms: replace keys via context term definitions to full IRIs.
4 Apply container rules: wrap or unwrap lists, sets, maps by @container.
5 Normalize values: coerce to object form for value, list, set.
6 Flatten or frame if specified by API.
7 Serialize to target form (expanded/compacted/flattened/framed).

API Usage (JavaScript SDK):
jsonld.compact(input, context, options, callback)
  input: object or URL
  context: object or URL
  options.processingMode: 'json-ld-1.0'|'json-ld-1.1'
  options.base: IRI string
  options.expandContext: array of contexts
  callback(err, compacted)
jsonld.expand(input, options, callback)
  options.processingMode, base, documentLoader
jsonld.flatten(input, context?, options, callback)
jsonld.frame(input, frame, options, callback)

Configuration Options:
processingMode: default 'json-ld-1.1'
base: IRI string, defaults to document URL
documentLoader: function to fetch remote contexts, default HTTP GET
maxContextUrlLength: 2048 characters

Best Practices:
- Always declare @context at the top-level.
- Use @vocab to reduce long IRI values.
- Use @protected:true on shared contexts to prevent injection.
- Prefer @type:@id to enforce IRI typing.

Troubleshooting:
Error: Invalid keyword "@cntxt"
  Check @context spelling and case.
Error: Remote context load failed
  Verify documentLoader network access or supply custom loader:
  options.documentLoader = function(url,callback){ /* fetch or return local copy */ }
Command-line CLI (jsonld-tool):
Expand: jsonld -i input.json -o expanded.jsonld --validate false
Compact: jsonld -i expanded.jsonld -c context.json -o compacted.jsonld


## Information Dense Extract
@context: IRI|map|array. Term definition map keys:@id IRI,@type IRI,@container in[@list,@set,@language,@index,@id,@type,@graph],@language BCP47|null,@direction ltr|rtl|null,@protected boolean,@reverse boolean,@context IRI|map|array. Keywords(case-sensitive):@context,@id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version(1.1),@nest. Data structures: node object,map without top-level value/list/set; value object {@value,optional @type/@language/@index}; list/set object {@list/@set,optional @index}; graph object {@graph,optional @id/@index}; language map {tag→string|array|null}; index map {key→value}. Forms: expanded(all IRIs absolute, arrays, omit defaults),compacted(use terms,prefixes,default coercion),flattened(unique @id array),framed(match/embed rules). Grammar: ContextDefinition=object|IRI|array; TermDefinition=string|object; Keyword tokens:%x40context/%x40id/.../%x40nest. Processing: parse→load context→expand IRIs→apply containers→normalize→frame/flatten→serialize. API methods(jsonld.compact,expand,flatten,frame) signatures with input,context/frame,options{processingMode,base,documentLoader},callback(err,output). Default processingMode json-ld-1.1. Base IRI precedence:@base>@documentLocator. DocumentLoader default HTTP GET. maxContextUrlLength=2048. Best practices:@vocab,@protected,true,@type:@id. Troubleshoot: invalid keyword,loader errors; CLI: jsonld -i in -o out --validate false.

## Sanitised Extract
Table of Contents:
1 Context Definitions
2 Keywords and Syntax Tokens
3 Data Structures
4 Document Forms
5 Grammar Productions

1 Context Definitions
@context: value must be one of:
  IRI (absolute or relative)
  map of term definitions
  array of any combination of the above
Term definition:
  simple: stringIRI
  expanded: map with entries:
    @id: IRI
    @type: IRI
    @container: @list,@set,@language,@index,@id,@type,@graph
    @language: BCP47 tag or null
    @direction: ltr, rtl or null
    @protected: true|false
    @reverse: true|false
    @context: IRI, map or array

2 Keywords and Syntax Tokens
Keywords: @context,@id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version,@nest
All keywords and values are case-sensitive.
@version must be numeric 1.1 to activate JSON-LD1.1 processing mode.

3 Data Structures
Node object: map without top-level @value,@list,@set or with other properties.
Value object: map with @value and optional @type,@language,@index.
List object, Set object: map with @list or @set and optional @index.
Graph object: map with @graph and optional @id,@index.
Language map: map BCPT47 tag  string|array|null.
Index map: map scalar|node/value/list/set  scalar,array,object.

4 Document Forms
Expanded: all IRIs absolute, all values arrays, omit defaults.
Compacted: use terms for IRIs, collapse values when default applies, arrays for lists.
Flattened: one array of node objects with unique @id.
Framed: apply frame document maps with @embed,@explicit,@omitDefault.

5 Grammar Productions
ContextDefinition = object-literal / IRI / array
TermDefinition    = string / map
Keyword           = %x40context / %x40id / %x40type / ... / %x40nest

## Original Source
W3C JSON-LD 1.1 Core, API & Processing Algorithms
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD_SYNTAX

# JSON-LD 1.1 Syntax
Date retrieved: 2024-06-15

# Context Definitions

@context value     : IRI | map | array of IRI or map
Term definition    : string → IRI | map → expanded term definition
Expanded term keys : @id (IRI), @type (IRI), @container (one of @list,@set,@language,@index,@id,@type,@graph), @language (BCP47 or null), @direction (ltr,rtl or null), @protected (boolean), @reverse (boolean), @context (embedded context)

# Syntax Tokens and Keywords

Keywords          : @context, @id, @type, @value, @language, @direction, @list, @set, @reverse, @graph, @included, @index, @container, @vocab, @base, @version, @nest
Case-sensitivity : All keys, keywords, values are case-sensitive
Version keyword  : @version must be numeric 1.1 to activate JSON-LD 1.1 features

# Data Model Overview

Node object       : map not containing @value,@list,@set at top plus other keys or maps of properties
Value object      : map containing exactly @value and optional @type,@language,@index
Graph object      : map with @graph entry and optional @id,@index
List object       : map with @list and optional @index
Set object        : map with @set and optional @index
Language map      : map from BCP47 tag to string,array or null
Index map         : map from any scalar or node/value/list/set to values

# Expanded Form

Rules:
  All IRIs fully expanded
  All values as arrays
  Omit defaults: @language,null @direction,null

# Compacted Form

Rules:
  Compact IRIs using defined term prefixes
  Shorten values to strings when typing and language default apply
  Represent lists as arrays

# Framed Form

Frame document    : node/value maps containing match conditions and transform rules
Frame keys        : @embed, @explicit, @omitDefault

# JSON-LD Grammar (ABNF)

ContextDefinition = object-literal / IRI / array
TermDefinition    = string / map
Keyword           = %x40 context / %x40 id / %x40 type / %x40 value / %x40 language / %x40 direction / %x40 list / %x40 set / %x40 reverse / %x40 graph / %x40 included / %x40 index / %x40 container / %x40 vocab / %x40 base / %x40 version / %x40 nest


## Attribution
- Source: W3C JSON-LD 1.1 Core, API & Processing Algorithms
- URL: https://www.w3.org/TR/json-ld11/
- License: License if known
- Crawl Date: 2025-05-01T04:51:55.443Z
- Data Size: 18953733 bytes
- Links Found: 133857

## Retrieved
2025-05-01
