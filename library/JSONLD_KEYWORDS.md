# JSONLD_KEYWORDS

## Crawl Summary
List of  thirty-two JSON-LD specific terms and their exact keyword names, expected value types, allowed contexts, and container mappings. Each term is defined by its keyword (e.g. @context,@id,@type,@list,@set,@language,@direction) with normative constraints and usage scope.

## Normalised Extract
Table of Contents
1. Term and Keyword List
2. Detailed Keyword Definitions

1. Term and Keyword List
active context
base direction (@direction)
compact IRI
context (@context)
default language (@language)
default object
embedded context
expanded term definition
frame
frame object
graph object
id map
implicitly named graph
included block
index map
language map
list object
local context
nested property
node object
node reference
prefix
processing mode
scoped context
set object
term
type map
typed value
value object
vocabulary mapping (@vocab)

2. Detailed Keyword Definitions
active context: runtime context structure used to resolve term definitions
base direction: use @direction key with literal "ltr","rtl" or null
compact IRI: syntax prefix:suffix, prefix must map to IRI
context: @context entry value may be IRI, map, or array of these
default language: @language key mapping to [BCP47] code or null
default object: map containing @default entry resets default values
embedded context: nested @context inside node/value/graph/list/set or term definition
expanded term definition: map containing any of @id(IRI),@type(IRI),@container(one of @list,@set,@index,@language,@graph,@id,@type),@language(BCP47|string|null),@direction("ltr"|"rtl"|null),@context(context),@protected(true|false)
frame: JSON-LD document defining matching and embedding rules
frame object: entry in frame for matching node or value shapes
graph object: map with an @graph array plus optional @id, @index
id map: container mapping type @id, values node objects keyed by IRI
implicitly named graph: term definition with @container:@graph yields named graph
included block: @included entry with array of node objects for inclusion
index map: container mapping type @index, values string,number,boolean,null,node/value/list/set or array
language map: container mapping type @language, keys BCP47 codes, values string|null|array
list object: map with @list array and optional @index
local context: @context map definition embedded in document
nested property: nested map inside node object for grouping only
node object: map representing resource or blank node; may include @id,@type,properties; excludes @value,@list,@set when top-level
node reference: node object with only @id entry
prefix: term mapping that serves as IRI prefix for compact IRI expansion
processing mode: API option or @version entry, values json-ld-1.0 or json-ld-1.1
scoped context: @context in expanded term defining context scoped to type or property
set object: map with @set array and optional @index
term: key in context mapping to IRI
term definition: entry in @context mapping term to IRI or map of keyword entries
type map: container mapping type @type, map keys interpreted as type IRIs
typed value: map with @value (string) and @type IRI
value object: map with @value, optional @type,@language,@direction for typed and language strings
vocabulary mapping: @vocab entry mapping default vocabulary IRI or null


## Supplementary Details
Implementation details:
- Context parser must recognize @context at document, node, graph, value, list, set, and term-definition levels.
- Term definition maps: parse string values as shorthand for {"@id":value}.
- Keyword entries valid in term definition: @id, @type, @container, @language, @direction, @context, @protected.
- Container mapping returns different internal structures: @list→list array, @set→set array, @index→map index→entries, @language→language map, @graph→graph container, @id→id map, @type→type map.
- Language tag validation per BCP47 section 2.2.9: lowercase normalization required.
- Processing mode selection: if context contains @version:1.1 numeric, enforce JSON-LD1.1 feature set; if @version string, reject or ignore per processor.
- Compact IRI resolution: split on colon, match prefix term in active context, then resolve suffix relative to prefix IRI. If no prefix match, term is keyword or error.
- Protected term definitions: @protected:true prevents term override on subsequent contexts.
- Scoped contexts: when term used as type or property, merge type- or property-scoped context before processing children.


## Reference Details
Best practices and patterns:
1. Defining a simple context:
{
  "@context": {
    "schema": "http://schema.org/",
    "name": "schema:name",
    "homepage": {"@id":"schema:url","@type":"@id"}
  }
}
2. Container mapping example:
{
  "@context": {
    "tags": {"@id":"schema:keywords","@container":"@set"},
    "translations": {"@id":"schema:description","@container":"@language"}
  }
}
3. Processing mode configuration (jsonld.js):
jsonld.expand(doc,{processingMode:'json-ld-1.1',strictSSL:true})
4. Error handling:
- Duplicate term definitions: throw ReferenceError("Term already defined and protected: termName").
- Invalid language tag: throw SyntaxError("Invalid language tag: tag").
5. Troubleshooting:
Command: node validateContext.js myContext.json
Expected output on success: "Context valid"
On error: "Error at key 'name': @id must be a string with valid IRI"


## Information Dense Extract
activeContext-runtimeContext;baseDirection-@direction=>"ltr"|"rtl"|null;compactIRI-prefix:suffix via context;context-@context=>IRI|object|array;defaultLanguage-@language=>BCP47|string|null;defaultObject:@default key;embeddedContext:nested @context;expandedTermDef:{@id:IRI,@type:IRI,@container:@list|@set|...,@language:BCP47,@direction:"ltr"|"rtl",@context, @protected:true|false};frame:document for framing;frameObject:entry in frame;graphObject:@graph array,+optional @id,@index;idMap:@container:@id =>IRI->nodeObjects;implicitlyNamedGraph:@container:@graph;includedBlock:@included->nodeObjects;indexMap:@container:@index->map;languageMap:@container:@language->lang->string|null|array;listObject:@list,array[@index];localContext:@context map;nestedProperty:map group;nodeObject:map no @value,@list,@set;nodeReference:@id only;prefix:term->IRI prefix;processingMode:json-ld-1.0|1.1 via API or @version;scopedContext:@context in term;setObject:@set,array[@index];term:context key->IRI;termDefinition:string or map;typeMap:@container:@type->nodeObjects;typedValue:@value with @type;valueObject:@value,@type,@language,@direction;vocabMapping:@vocab->IRI|compactIRI|null

## Sanitised Extract
Table of Contents
1. Term and Keyword List
2. Detailed Keyword Definitions

1. Term and Keyword List
active context
base direction (@direction)
compact IRI
context (@context)
default language (@language)
default object
embedded context
expanded term definition
frame
frame object
graph object
id map
implicitly named graph
included block
index map
language map
list object
local context
nested property
node object
node reference
prefix
processing mode
scoped context
set object
term
type map
typed value
value object
vocabulary mapping (@vocab)

2. Detailed Keyword Definitions
active context: runtime context structure used to resolve term definitions
base direction: use @direction key with literal 'ltr','rtl' or null
compact IRI: syntax prefix:suffix, prefix must map to IRI
context: @context entry value may be IRI, map, or array of these
default language: @language key mapping to [BCP47] code or null
default object: map containing @default entry resets default values
embedded context: nested @context inside node/value/graph/list/set or term definition
expanded term definition: map containing any of @id(IRI),@type(IRI),@container(one of @list,@set,@index,@language,@graph,@id,@type),@language(BCP47|string|null),@direction('ltr'|'rtl'|null),@context(context),@protected(true|false)
frame: JSON-LD document defining matching and embedding rules
frame object: entry in frame for matching node or value shapes
graph object: map with an @graph array plus optional @id, @index
id map: container mapping type @id, values node objects keyed by IRI
implicitly named graph: term definition with @container:@graph yields named graph
included block: @included entry with array of node objects for inclusion
index map: container mapping type @index, values string,number,boolean,null,node/value/list/set or array
language map: container mapping type @language, keys BCP47 codes, values string|null|array
list object: map with @list array and optional @index
local context: @context map definition embedded in document
nested property: nested map inside node object for grouping only
node object: map representing resource or blank node; may include @id,@type,properties; excludes @value,@list,@set when top-level
node reference: node object with only @id entry
prefix: term mapping that serves as IRI prefix for compact IRI expansion
processing mode: API option or @version entry, values json-ld-1.0 or json-ld-1.1
scoped context: @context in expanded term defining context scoped to type or property
set object: map with @set array and optional @index
term: key in context mapping to IRI
term definition: entry in @context mapping term to IRI or map of keyword entries
type map: container mapping type @type, map keys interpreted as type IRIs
typed value: map with @value (string) and @type IRI
value object: map with @value, optional @type,@language,@direction for typed and language strings
vocabulary mapping: @vocab entry mapping default vocabulary IRI or null

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of JSONLD_KEYWORDS

# JSON-LD Specific Terms and Keywords

This section provides the complete normative definitions of JSON-LD terms and keywords as specified in JSON-LD 1.1 Recommendation (16 July 2020).

## Term Definitions

active context
    A context used at runtime for resolving terms

base direction
    @direction key; value: "ltr" | "rtl" | null

compact IRI
    prefix:suffix; requires prefix mapping in context

context
    @context entry; value: IRI | object | array

default language
    @language key; value: BCP47 language code | null

default object
    object with @default key

embedded context
    @context appearing inside node, value, graph, list, set or term definition

expanded term definition
    map containing keyword entries (@id, @type, @container, @language, @direction, @context, @protected)

frame
    JSON-LD document describing transformation rules

frame object
    map inside frame for matching node or value

graph object
    map with @graph and optional @id, @index

id map
    container mapping @id; map keys→node objects

implicitly named graph
    expanded term definition with @container:@graph

included block
    @included map entry with array of node objects

index map
    container mapping @index; values: string, number, boolean, null, node/value/list/set objects or array

language map
    container mapping @language; keys: BCP47 codes; values: string|null|array of strings

list object
    map with @list and optional @index

local context
    context map via @context keyword

nested property
    map entry inside node for sub-structure only

node object
    map representing RDF node; no @value,@list,@set; not top-level @graph-only

node reference
    node object with only @id

prefix
    term mapping to string that as IRI prefix for compact IRI

processing mode
    runtime mode; options: json-ld-1.0, json-ld-1.1; set via API option or @version

scoped context
    @context entry in expanded term for type or property scope

set object
    map with @set and optional @index

term
    short string in context mapping to IRI

term definition
    context entry: string→@id, or map with keyword keys

type map
    @container:@type mapping; map keys→node objects

typed value
    map with @value and @type IRI

value object
    map with @value and optional @type,@language,@direction

vocabulary mapping
    @vocab key; value: IRI | compact IRI | term | null


## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: W3C Document License
- Crawl Date: 2025-05-02T16:49:39.122Z
- Data Size: 12552365 bytes
- Links Found: 88987

## Retrieved
2025-05-02
