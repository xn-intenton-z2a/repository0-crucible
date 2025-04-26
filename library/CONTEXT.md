# CONTEXT

## Crawl Summary
Context definitions: @context supports object, array, IRI. Term definitions accept keys @id, @type, @container, @language, @direction, @context, @prefix, @protected, @nest, @version. Default mappings: @vocab, @base. Processing mode locked to numeric 1.1. Context merge order: array sequence then nested contexts. Terms mapped to IRIs via resolution against base or via prefix mappings. Container directives define list, set, index, id, type, language, graph behavior. Keyword aliasing controlled by @prefix boolean. Embedded contexts propagate only after term definitions. Null resets definitions.

## Normalised Extract
Table of Contents:
1 Context Entry Forms
2 Term Definition Keys
3 Base and Vocabulary Mapping
4 Language and Direction Control
5 Container Mappings
6 Keyword Aliasing
7 Processing Mode Enforcement
8 Context Merge Algorithm

1 Context Entry Forms
 object: map of term names → term definition or embedded context
 array: ordered list of context entries processed sequentially
 IRI: load external context document; same processing rules apply

2 Term Definition Keys
 key: @id
  value: IRI or null; null removes mapping; relative IRIs resolved against @base
 key: @type
  value: IRI or keyword @id or @vocab or null; defines datatype coercion or node type expansion
 key: @container
  value: @list,@set,@index,@id,@type,@language,@graph or null; instructs container processing
 key: @language
  value: BCP47 tag or null; default language for simple strings
 key: @direction
  value: 'ltr','rtl',null; default text direction for strings
 key: @context
  value: object,array,IRI; nested context applied after term mapping
 key: @prefix
  value: boolean; true allows term used as prefix in compact IRI
 key: @protected
  value: boolean; true prevents term redefinition
 key: @nest
  value: keyword or term; enables property nesting in compact/expand
 key: @version
  value: numeric 1.1; required to activate JSON-LD 1.1 features

3 Base and Vocabulary Mapping
 @base: IRI or null; resolves relative IRI references
 @vocab: IRI or null; default namespace for terms without prefix

4 Language and Direction Control
 @language in context: sets default language tag for value objects
 @direction in context: sets default direction for string values

5 Container Mappings
 list: map value to array preserving order
 set: map value to unordered array, duplicate removal
 id: index node objects by their @id
 type: index by @type values
 language: group values by language tag
 graph: index by graph name

6 Keyword Aliasing
 prefix true: term expansion when suffix present; prevents reserved word usage
 protected true: term cannot be overridden by nested contexts

7 Processing Mode Enforcement
 context @version must be numeric 1.1; non-numeric or mismatched values cause error

8 Context Merge Algorithm
 sequential processing: base context, array contexts, nested contexts
 for each term definition: validate keys, resolve IRIs, assign mappings, apply overrides unless protected

## Supplementary Details
Term Key Specifications:
- @id: must match RFC3987 IRI grammar or be null. Relative IRIs resolved via @base. Null removes mapping.
- @type: allowed values: full IRI, '@id','@vocab', or null. Sets type coercion for value objects or type mapping for node objects.
- @container: must be one of '@list','@set','@index','@id','@type','@language','@graph'. Defines container behavior in expansion/compaction.
- @language: BCP47 syntax; processors must lowercase language subtags.
- @direction: exact string 'ltr','rtl' or null; processors must enforce Unicode BiDi.
- @context: object, array, or IRI. When object, recursively processed after parent context; when IRI, document loaded synchronously before evaluation.
- @prefix: boolean true/false. True indicates term can act as IRI prefix in compact IRIs.
- @protected: boolean. True prevents further overriding of term definition; error on redefinition.
- @nest: single term name or '@nest' alias. Allows nested property expansion.
- @version: numeric literal 1.1 only. JSON-LD 1.0 processors must error on numeric.

Configuration Options:
- contexts can be merged: later definitions override earlier ones unless @protected.
- default mappings: @base and @vocab may be null to disable.
- container mapping default: none; absence means simple property mapping.

Implementation Steps:
1. Initialize active context with base @base and @vocab entries if present.
2. For each context in @context array: load and expand.
3. Validate @version; reject if not exactly 1.1 numeric.
4. Process term definitions: validate keys; resolve IRI values; create term-to-IRI, container and type maps.
5. Apply nested contexts after parent term definitions.
6. Freeze protected term definitions; subsequent overrides cause errors.


## Reference Details
Grammar for @context (EBNF):

Context      ::= ObjectContext | ArrayContext | IRIReference
ArrayContext ::= '[' Context (',' Context)* ']'
ObjectContext ::= '{' (ContextEntry (',' ContextEntry)*)? '}'
ContextEntry ::= TermName ':' (IRIReference | 'null' | TermDefinitionObject)
TermDefinitionObject ::= '{' (TermKey ':' TermValue) (',' TermKey ':' TermValue)* '}'
TermKey      ::= '@id' | '@type' | '@container' | '@language' | '@direction' | '@context' | '@prefix' | '@protected' | '@nest' | '@version'
TermValue    ::= IRIReference | String | Boolean | Number | 'null' | Array
String values: BCP47 for @language; 'ltr'/'rtl' for @direction; specific keywords for @container; exactly 1.1 numeric for @version
IRIReference: absolute or relative IRI per RFC3987; relative resolved against active @base
Boolean: 'true' or 'false'
Number: JSON number (no quotes)

Processing Algorithm Outline:
1. If context is array, for each entry in order apply steps 2-5
2. If context is IRI, fetch and parse external document as JSON; treat result as object context
3. If context is object, for each ContextEntry:
   a. TermName must not be keyword unless reserved mapping
   b. If TermValue is string: set termDefinition.@id = expand IRI
   c. If TermValue is null: remove term from active context
   d. If TermValue is object: for each TermKey, assign termDefinition property with TermValue after resolution
4. Enforce @protected: skip redefinitions if protected true, else error
5. After all entries, set active context.termMap[TermName] to termDefinition

Error Conditions:
- @version not numeric 1.1
- Unsupported TermKey values
- IRIReference invalid syntax
- Redefinition of protected term

Example Implementation Pattern (JavaScript pseudocode):

function processContext(activeContext, contextValue) {
  if (Array.isArray(contextValue)) {
    contextValue.forEach(ctx => processContext(activeContext, ctx)); return;
  }
  if (typeof contextValue === 'string') {
    let external = fetchContext(contextValue); processContext(activeContext, external['@context']); return;
  }
  Object.entries(contextValue).forEach(([term, definition]) => {
    let defObj = {};
    if (definition === null) { delete activeContext[term]; return; }
    if (typeof definition === 'string') { defObj['@id'] = expandIri(definition, activeContext.base); }
    else { Object.entries(definition).forEach(([k,v]) => {
        switch(k) {
          case '@id': defObj['@id'] = v===null?null:expandIri(v,activeContext.base); break;
          case '@type': defObj['@type'] = resolveType(v,activeContext); break;
          case '@container': defObj['@container'] = v; break;
          case '@language': defObj['@language'] = v; break;
          case '@direction': defObj['@direction'] = v; break;
          case '@context': defObj['@context'] = v; break;
          case '@prefix': defObj['@prefix'] = v; break;
          case '@protected': defObj['@protected'] = v; break;
          case '@nest': defObj['@nest'] = v; break;
          case '@version': if(v!==1.1) throw Error('Invalid version'); break;
        }
      });
    }
    if(activeContext[term]?.['@protected']) throw Error('Protected term');
    activeContext[term] = defObj;
  });
}

## Information Dense Extract
@context supports object,array,IRI. Term definitions with keys: @id (IRI|null), @type (IRI|@id|@vocab|null), @container(@list|@set|@index|@id|@type|@language|@graph), @language(BCP47|null), @direction(ltr|rtl|null), @context(object|array|IRI), @prefix(boolean), @protected(boolean), @nest(term), @version(1.1). Default mapping: @base (IRI|null), @vocab(IRI|null). Processing: merge contexts sequentially, resolve relative IRIs per @base, enforce @version numeric 1.1, assign term-to-IRI and container maps, freeze protected terms, error on invalid grammar or protected override.

## Sanitised Extract
Table of Contents:
1 Context Entry Forms
2 Term Definition Keys
3 Base and Vocabulary Mapping
4 Language and Direction Control
5 Container Mappings
6 Keyword Aliasing
7 Processing Mode Enforcement
8 Context Merge Algorithm

1 Context Entry Forms
 object: map of term names  term definition or embedded context
 array: ordered list of context entries processed sequentially
 IRI: load external context document; same processing rules apply

2 Term Definition Keys
 key: @id
  value: IRI or null; null removes mapping; relative IRIs resolved against @base
 key: @type
  value: IRI or keyword @id or @vocab or null; defines datatype coercion or node type expansion
 key: @container
  value: @list,@set,@index,@id,@type,@language,@graph or null; instructs container processing
 key: @language
  value: BCP47 tag or null; default language for simple strings
 key: @direction
  value: 'ltr','rtl',null; default text direction for strings
 key: @context
  value: object,array,IRI; nested context applied after term mapping
 key: @prefix
  value: boolean; true allows term used as prefix in compact IRI
 key: @protected
  value: boolean; true prevents term redefinition
 key: @nest
  value: keyword or term; enables property nesting in compact/expand
 key: @version
  value: numeric 1.1; required to activate JSON-LD 1.1 features

3 Base and Vocabulary Mapping
 @base: IRI or null; resolves relative IRI references
 @vocab: IRI or null; default namespace for terms without prefix

4 Language and Direction Control
 @language in context: sets default language tag for value objects
 @direction in context: sets default direction for string values

5 Container Mappings
 list: map value to array preserving order
 set: map value to unordered array, duplicate removal
 id: index node objects by their @id
 type: index by @type values
 language: group values by language tag
 graph: index by graph name

6 Keyword Aliasing
 prefix true: term expansion when suffix present; prevents reserved word usage
 protected true: term cannot be overridden by nested contexts

7 Processing Mode Enforcement
 context @version must be numeric 1.1; non-numeric or mismatched values cause error

8 Context Merge Algorithm
 sequential processing: base context, array contexts, nested contexts
 for each term definition: validate keys, resolve IRIs, assign mappings, apply overrides unless protected

## Original Source
JSON-LD 1.1: A JSON-Based Serialization for Linked Data
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT

# Context Declaration Syntax  
Date Retrieved: 2024-06-15  
Source: W3C JSON-LD 1.1 Recommendation  
Data Size: 18953569 bytes

## 1. @context Entry Forms  
- Object: map of term names to term definitions or nested contexts  
- Array: ordered list of contexts (object or IRI)  
- IRI: reference to external context document

## 2. Term Definition Object Keys  
- @id: IRI or null  
- @type: IRI, @id, @vocab, or null  
- @container: one of @list, @set, @index, @id, @type, @language, @graph, or null  
- @language: BCP47 language code or null  
- @direction: "ltr", "rtl", or null  
- @context: embedded context (object, array, or IRI)  
- @prefix: boolean  
- @protected: boolean  
- @nest: keyword or term name  
- @version: number (must equal 1.1)

## 3. Context Processing Steps  
1. Merge contexts in array order  
2. For each term definition: resolve @id against base IRI if relative  
3. Apply @container mapping to term  
4. Validate reserved keys and values  
5. Build active context with term-to-IRI and container maps

## 4. Configuration Details  
- Default vocab mapping (@vocab): IRI or null  
- Base IRI (@base): IRI or null  
- Processing mode (@version in context): numeric 1.1 only  
- Keyword aliasing: @prefix true allows term expansion only when suffix follows colon

## 5. Example Context  
```json
{
  "@context": {
    "name": "http://schema.org/name",
    "ex": "http://example.org/vocab#",
    "age": { "@id": "ex:age", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
    "@vocab": "http://schema.org/",
    "@language": "en",
    "@base": "http://example.org/",
    "@version": 1.1
  }
}
```

## Attribution
- Source: JSON-LD 1.1: A JSON-Based Serialization for Linked Data
- URL: https://www.w3.org/TR/json-ld11/
- License: License
- Crawl Date: 2025-04-26T18:49:17.024Z
- Data Size: 18953569 bytes
- Links Found: 133857

## Retrieved
2025-04-26
