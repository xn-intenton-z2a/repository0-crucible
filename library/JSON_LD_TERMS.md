# JSON_LD_TERMS

## Crawl Summary
Defines  forty-five JSON-LD keywords and data structures with exact mapping rules: active context for runtime term resolution; base direction via @direction = "ltr"|"rtl"|null; compact IRI syntax prefix:suffix; @context entries as map/IRI/array; @language must be BCP47 or null; frame syntax with @id,@type,@embed,@explicit; named graph objects with @graph,@id,@index; id maps with @container=@id; index maps with @container=@index; JSON literal datatype rdf:JSON; internal representation types; processor operations: expand,compact,flatten,frame,normalize,toRDF,fromRDF; container maps for @language,@list,@set,@type; processingMode option; vocabulary mapping via @vocab.

## Normalised Extract
Table of Contents:
1 active context
2 base direction
3 compact IRI
4 context
5 default language
6 default object
7 embedded context
8 expanded term definition
9 frame
10 frame object
11 graph object
12 id map
13 implicitly named graph
14 included block
15 index map
16 JSON literal
17 JSON-LD document
18 internal representation
19 JSON-LD Processor
20 JSON-LD value
21 keyword
22 language map
23 list object
24 local context
25 nested property
26 node object
27 node reference
28 prefix
29 processing mode
30 scoped context
31 set object
32 term
33 term definition
34 type map
35 typed value
36 value object
37 vocabulary mapping

Details:
1 active context resolves terms during processing
2 @direction: "ltr","rtl",null sets base text direction
3 prefix:suffix compacts IRIs using context term prefix
4 @context: map/IRI/array for term-to-IRI, vocab, base, language, direction
5 @language: BCP47 code or null for untagged strings
6 @default key maps default values in framing
7 embedded @context may appear in nodes, values, graphs, lists, sets
8 term definition map with @id, @type, @container, @reverse, @language, @direction
9 frame document defines matching/embedding rules using @context, @embed, @explicit
10 frame objects map portions of input to output structure
11 graph object: map with @graph plus optional @id,@index
12 id map: @container=@id term mapping IRI to node objects
13 implicitly named graphs from @container=@graph definitions
14 @included alias merges node objects into output
15 index map: @container=@index maps to scalar or node/value/list/set or arrays
16 JSON literal uses @type @json and datatype rdf:JSON
17 JSON-LD document serializes RDF dataset with maps and arrays
18 internal representation uses arrays, maps, strings, numbers, booleans, null
19 Processor must implement expand, compact, flatten, frame, normalize, toRDF, fromRDF
20 JSON-LD value: string, number, boolean, typed value, language-tagged string
21 keywords: strings starting with @: @context,@id,@type,@value,@list,@set,etc
22 language map: @container=@language, keys=BCP47, values=string/null/arrays
23 list object: map with @list and optional @index
24 local context: @context map overrides active context
25 nested property: key whose value is map flattened into node object
26 node object: map without @value,@list,@set representing resource properties
27 node reference: @id-only node object
28 prefix: context term whose IRI used for compact IRI prefix
29 processing mode: default 'json-ld-1.1', set via @version or API option
30 scoped context: type- or property-scoped contexts via @context in term definitions
31 set object: map with @set and optional @index
32 term: context key mapping to IRI or definition
33 term definition: context entry for term as string or map
34 type map: @container=@type, map from IRI to node object(s)
35 typed value: @value with @type datatype IRI
36 value object: @value with optional @type/@language/@direction/@index
37 vocabulary mapping: @vocab IRI/compact IRI/term/null for default vocabulary

## Supplementary Details
@direction values: "ltr" (left-to-right), "rtl" (right-to-left), null resets; processors must enforce BCP47 language tags in @language; expanded term definition fields: @id must be IRI or compact IRI; @type must be IRI or keyword; @container one of @list, @set, @index, @id, @type, @language; @reverse indicates reverse property; @language default applies to untyped strings; @context entries evaluated in order: map before IRI imports; @version numeric 1.1 only; processingMode API option accepts 'json-ld-1.0' and 'json-ld-1.1'; vocabulary mapping via @vocab must be IRI or null; prefix definitions map term to IRI namespace for compact IRIs; default object @default value applied during framing when input lacks frame branch; included blocks merge before expansion; id and index maps generate specialized index structures

## Reference Details
JSON-LD API (jsonld.js) method signatures:

expand(input: object|string, options?: {
  base?: string;
  expandContext?: object|string;
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  documentLoader?: (url:string)=>Promise<{document:object}>;
}): Promise<Array<object>>

compact(input: object|string, context: object|string, options?: {
  base?: string;
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  compactToRelative?: boolean;
  expandContext?: object|string;
  documentLoader?: ...;
}): Promise<object>

frame(input, frame, options?): Promise<object>

flatten(input, context?, options?): Promise<object>

normalize(input, options?: {algorithm?: 'URDNA2015'|'URGNA2012'; format?: 'application/n-quads'}): Promise<string>

toRDF(input, options?: {format?: 'application/n-quads'; produceGeneralizedRdf?: boolean}): Promise<string|object>

fromRDF(input: object|string, options?: {useNativeTypes?: boolean; rdfDirection?: 'i18n-datatype'|'compound-literal'}): Promise<object>

Examples:
import jsonld from 'jsonld';

const context = {
  '@version': 1.1,
  '@language': 'en',
  '@direction': 'ltr',
  '@vocab': 'http://schema.org/'
};
const doc = { '@context': context, 'name': 'Example' };

jsonld.compact(doc, context)
  .then(compacted => console.log(compacted))
  .catch(err => console.error('JSON-LD Error:', err));

Best practices:
- Always include @version=1.1 in context to prevent legacy processing
- Use explicit @vocab to shorten IRIs
- Define prefixes for common namespaces (schema, rdf, rdfs)
- Provide documentLoader with caching and error handling

Troubleshooting:
- Command: DEBUG=jsonld node script.js
  Expected: logs of documentLoader invocations and expansion steps
- If Error: "Invalid JSON-LD syntax at line X" -> verify quotes and commas
- Missing context definitions -> resulting keys remain unexpanded; fix @context mappings

## Information Dense Extract
active context: runtime term resolution; @direction: ltr|rtl|null; compact IRI: prefix:suffix; @context: map|IRI|array; @language: BCP47|null; @default: default in framing; embedded @context in node,value,graph,list,set; term definition: map(@id, @type, @container(@list,@set,@index,@id,@type,@language), @reverse,@language,@direction); frame: matching with @embed,@explicit; graph object: @graph,@id?,@index?; id map: @container=@id; implicitly named graph: @container=@graph; @included merges nodes; index map: @container=@index; JSON literal: @type=@json rdf:JSON; JSON-LD document: RDF dataset; internal rep: arrays,maps,scalars; processor ops: expand,compact,flatten,frame,normalize,toRDF,fromRDF; JSON-LD value: string|number|boolean|typed|lang-tag; keywords: @*; language map: @container=@language; list object: @list,@index?; local context: @context map; nested property: flattening; node object: no @value,@list,@set; node reference: @id-only; prefix: compact IRI namespace; processingMode: 'json-ld-1.1'|'json-ld-1.0'; scoped context: type|property; set object: @set,@index?; term: context key; term definition: string|map; type map: @container=@type; typed value: @value,@type; value object: @value plus optional properties; vocabulary mapping: @vocab|null.

## Sanitised Extract
Table of Contents:
1 active context
2 base direction
3 compact IRI
4 context
5 default language
6 default object
7 embedded context
8 expanded term definition
9 frame
10 frame object
11 graph object
12 id map
13 implicitly named graph
14 included block
15 index map
16 JSON literal
17 JSON-LD document
18 internal representation
19 JSON-LD Processor
20 JSON-LD value
21 keyword
22 language map
23 list object
24 local context
25 nested property
26 node object
27 node reference
28 prefix
29 processing mode
30 scoped context
31 set object
32 term
33 term definition
34 type map
35 typed value
36 value object
37 vocabulary mapping

Details:
1 active context resolves terms during processing
2 @direction: 'ltr','rtl',null sets base text direction
3 prefix:suffix compacts IRIs using context term prefix
4 @context: map/IRI/array for term-to-IRI, vocab, base, language, direction
5 @language: BCP47 code or null for untagged strings
6 @default key maps default values in framing
7 embedded @context may appear in nodes, values, graphs, lists, sets
8 term definition map with @id, @type, @container, @reverse, @language, @direction
9 frame document defines matching/embedding rules using @context, @embed, @explicit
10 frame objects map portions of input to output structure
11 graph object: map with @graph plus optional @id,@index
12 id map: @container=@id term mapping IRI to node objects
13 implicitly named graphs from @container=@graph definitions
14 @included alias merges node objects into output
15 index map: @container=@index maps to scalar or node/value/list/set or arrays
16 JSON literal uses @type @json and datatype rdf:JSON
17 JSON-LD document serializes RDF dataset with maps and arrays
18 internal representation uses arrays, maps, strings, numbers, booleans, null
19 Processor must implement expand, compact, flatten, frame, normalize, toRDF, fromRDF
20 JSON-LD value: string, number, boolean, typed value, language-tagged string
21 keywords: strings starting with @: @context,@id,@type,@value,@list,@set,etc
22 language map: @container=@language, keys=BCP47, values=string/null/arrays
23 list object: map with @list and optional @index
24 local context: @context map overrides active context
25 nested property: key whose value is map flattened into node object
26 node object: map without @value,@list,@set representing resource properties
27 node reference: @id-only node object
28 prefix: context term whose IRI used for compact IRI prefix
29 processing mode: default 'json-ld-1.1', set via @version or API option
30 scoped context: type- or property-scoped contexts via @context in term definitions
31 set object: map with @set and optional @index
32 term: context key mapping to IRI or definition
33 term definition: context entry for term as string or map
34 type map: @container=@type, map from IRI to node object(s)
35 typed value: @value with @type datatype IRI
36 value object: @value with optional @type/@language/@direction/@index
37 vocabulary mapping: @vocab IRI/compact IRI/term/null for default vocabulary

## Original Source
W3C Semantic Web Standards & JSON-LD
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD_TERMS

# JSON-LD Specific Term Definitions

## active context
A context that is used to resolve terms while the processing algorithm is running.

## base direction
Base direction for strings when no direct direction is specified; set via @direction = "ltr", "rtl", or null.

## compact IRI
Form prefix:suffix; prefix expands to an IRI in the context; suffix is appended to prefix IRI to form a full IRI.

## context
Map, IRI, or array defining term-to-IRI mappings, default vocabulary, base IRI, language, direction.

## default language
Language code (BCP47) or null; set via @language in context; applied to untagged strings.

## default object
Map containing @default entry; used by framing to fill missing values.

## embedded context
Context appearing as @context within node, value, graph, list, set, or expanded term definitions; may be map, IRI, or array.

## expanded term definition
Map containing one or more of @id, @type, @container, @reverse, @language, @direction entries to define a term.

## frame
JSON-LD document describing transformation of another JSON-LD document; contains matching and embedding rules.

## frame object
Map within frame document representing matching criteria for node or value objects; supports @id, @type, @embed, @explicit.

## graph object
Map with @graph entry and optional @id, @index; represents named graph; simple graph object lacks @id.

## id map
Map value of term with @container = @id; keys are IRIs representing @id; values are node objects.

## implicitly named graph
Named graph created from map entry where expanded term definition has @container = @graph.

## included block
Entry with key @included or alias; value is one or more node objects to be merged into output.

## index map
Map value of term with @container = @index; values may be string, number, boolean, null, node, value, list, set, or array of these.

## JSON literal
Literal with datatype IRI rdf:JSON; in value object @type = @json; valid JSON value.

## JSON-LD document
Serialization of an RDF dataset; composed of node, value, graph, list, or set objects.

## JSON-LD internal representation
Core data structures after parsing: arrays, maps, strings, numbers, booleans, null; used by algorithms.

## JSON-LD Processor
System implementing JSON-LD Processing Algorithms and API; must support at least expand, compact, flatten, frame, normalize, toRDF, fromRDF operations.

## JSON-LD value
String, number, true, false, typed value, or language-tagged string representing RDF literal.

## keyword
String specific to JSON-LD syntax (e.g., @context, @id, @type, @value, @list, @set).

## language map
Map value of term with @container = @language; keys are BCP47 codes; values are string, null, or array of strings/null.

## list object
Map with @list entry and optional @index; represents ordered collection.

## local context
Context specified via @context keyword within document; overrides active context.

## nested property
Map entry within node object whose value is map; its entries treated as if they were properties of the node.

## node object
Map not containing @value, @list, or @set (unless not top-level graph); represents properties of a node in the graph.

## node reference
Node object containing only @id key; used to reference existing node.

## prefix
Term mapping whose IRI value serves as prefix for compact IRIs.

## processing mode
Defines JSON-LD version rules; default json-ld-1.1; set via @version in context; API accepts options.processingMode = 'json-ld-1.0' or 'json-ld-1.1'.

## scoped context
@context within expanded term definition; type-scoped when term used as type, property-scoped when used as property.

## set object
Map with @set entry and optional @index; represents unordered collection.

## term
Short key in context mapping to IRI or expanded term definition; used as property name or type.

## term definition
Context entry where key is term; value is string (simple IRI) or map (expanded definition).

## type map
Map value of term with @container = @type; keys are IRIs representing types; values are node object or array of node objects.

## typed value
Map with @value and @type entries; @value is string; @type is datatype IRI.

## value object
Map with @value entry and optional @type, @language, @direction, @index entries; represents RDF literal.

## vocabulary mapping
Set via @vocab in context; IRI, compact IRI, term, or null; used to expand unprefixed terms to IRIs.

## Attribution
- Source: W3C Semantic Web Standards & JSON-LD
- URL: https://www.w3.org/TR/json-ld11/
- License: License if known
- Crawl Date: 2025-04-28T20:50:03.184Z
- Data Size: 13512089 bytes
- Links Found: 95873

## Retrieved
2025-04-28
