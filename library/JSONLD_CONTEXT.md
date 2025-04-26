# JSONLD_CONTEXT

## Crawl Summary
Context keys directives: @version numeric 1.1 switch; @vocab IRI mapping; @base IRI resolution; compact IRIs prefix:suffix; alias keywords via custom term mappings; scoped contexts under property or type; embedded contexts propagate left-to-right override; remote imports via @import; term protection via @protected boolean.

## Normalised Extract
Table of Contents:
1 Processing Mode (@version)
2 Default Vocabulary (@vocab)
3 Base IRI (@base)
4 Compact IRIs
5 Keyword Aliasing
6 Scoped Contexts
7 Context Propagation
8 Remote Imports (@import)
9 Term Protection (@protected)

1 Processing Mode (@version)
Value type: numeric
Allowed value: 1.1
Implementation: validate numeric type; if not 1.1 error; set processingMode=json-ld-1.1

2 Default Vocabulary (@vocab)
Value type: IRI string or null
Effect: apply IRI as default namespace for unprefixed terms
Example: "@vocab": "https://schema.org/"

3 Base IRI (@base)
Value type: IRI string or null
Effect: resolve relative IRI references
Example: "@base": "https://api.example.com/v1/"

4 Compact IRIs
Pattern: prefix:suffix
Validation: prefix must exist in context; suffix must match NCName or valid fragment

5 Keyword Aliasing
Mapping syntax: "alias": {"@id": "@keyword"}
Example: "id": {"@id":"@id"}

6 Scoped Contexts
Definition inside term mapping: "term": {"@context": {...}}
Property scope: apply when term used as property
Type scope: apply when term used in @type value

7 Context Propagation
Algorithm: outer @context applied first; nested @context entries override previous; apply merge order sequentially

8 Remote Imports (@import)
Syntax: "@import": "context-iri"
Operation: issue HTTP GET to IRI, parse JSON-LD context, merge as inline at position

9 Term Protection (@protected)
Syntax: "termName": {"@id":"http://example.com/term","@protected":true}
Behavior: subsequent contexts cannot override protected term mapping

## Supplementary Details
Parameter definitions:
- @version: numeric must equal 1.1; context-local only; error if missing or different
- @vocab: string IRI or null; one per context; default unset
- @base: string IRI or null; default to document location if missing
- @language: string BCP47 code or null; default language for string values
- @direction: "ltr", "rtl", or null; default direction for string values
- @import: IRI string; fetch and merge remote context synchronously
- @protected: boolean; default false; prevents term redefinition

Implementation steps:
1. Read @version, validate type and value
2. Read @import entries in order, fetch and merge each remote context
3. For each term definition in @context:
   a. Process @protected flag
   b. Map term to IRI via @id or derived via @vocab/@base
   c. Create compact IRI prefix mapping for term
4. Apply nested @context entries at runtime when encountering scoped contexts in data
5. Merge contexts left-to-right; enforce @protected semantics


## Reference Details
Context Definition Grammar (JSON-LD 1.1 Appendix 9.15):
<ContextDefinition> ::= '"@context"' ':' (<IRI> | <ContextMap> | <ContextArray>)
<ContextMap> ::= '{' (<TermDefinition> (',' <TermDefinition>)* (',' '@import': <IRI>)*)? '}'
<TermDefinition> ::= <Term> ':' (<TermDefinitionValue> | null)
<TermDefinitionValue> ::= <IRI> | <KeywordAliasMap> | <ExpandedTermDefinition>
<KeywordAliasMap> ::= '{' '@id': <Keyword> '}'
<ExpandedTermDefinition> ::= '{' '@id': <IRI> (',' '@type': <IRI> )? (',' '@language': <LangCode>)? (',' '@direction': "ltr"|"rtl"|null)? (',' '@context': <ContextDefinition>)? (',' '@protected': true|false)? '}'
Complete term definition parameters:
- @id: IRI string • required unless value is null
- @type: IRI string • optional
- @language: BCP47 language tag or null • optional
- @direction: ltr, rtl, or null • optional
- @context: ContextDefinition • optional
- @container: "@list","@set","@index","@id","@type","@language","@graph" or array thereof • optional
- @protected: boolean • optional

Concrete Example:
{
  "@context": {
    "@version": 1.1,
    "schema": "https://schema.org/",
    "name": {"@id": "schema:name","@protected":true},
    "ex": {"@id": "http://example.com/","@context": {"sub":"http://example.com/sub/"}},
    "@import": "https://example.com/remoteContext.jsonld"
  }
}

Best Practices:
- Always set @version:1.1 in top-level context
- Use absolute IRIs for @base and @vocab
- Group common term definitions in a single context file and import remotely
- Protect core terms with @protected:true to avoid accidental overrides

Troubleshooting:
- Error: "Invalid IRI in @base". Command: curl -I <baseIRI> returns HTTP 404. Fix: correct IRI to existing resource.
- Error: "Term redefinition prohibited" when merging contexts. Locate earlier context mapping with @protected:true and remove conflicting mapping.
- Error: "Unsupported processing mode". Occurs when JSON-LD 1.0 processor encounters @version numeric. Use a JSON-LD 1.1 compliant processor.

## Information Dense Extract
@version:1.1 numeric;@vocab:IRI|null;@base:IRI|null;@language:BCP47|null;@direction:ltr|rtl|null;@import:IRI;@protected:boolean;TermDefinition:@id:IRI;@type:IRI;@language:BCP47;@direction:ltr|rtl|null;@context:ContextDefinition;@container:["@list"|"@set"|"@index"|"@id"|"@type"|"@language"|"@graph"];Merge order:left-to-right;Protected terms:cannot override;Scoped contexts under termDefinition.@context;Compact IRI syntax:prefix:suffix must match context mapping;Error conditions:invalid type or value at @version, invalid IRI formats, redefinition of protected term.

## Sanitised Extract
Table of Contents:
1 Processing Mode (@version)
2 Default Vocabulary (@vocab)
3 Base IRI (@base)
4 Compact IRIs
5 Keyword Aliasing
6 Scoped Contexts
7 Context Propagation
8 Remote Imports (@import)
9 Term Protection (@protected)

1 Processing Mode (@version)
Value type: numeric
Allowed value: 1.1
Implementation: validate numeric type; if not 1.1 error; set processingMode=json-ld-1.1

2 Default Vocabulary (@vocab)
Value type: IRI string or null
Effect: apply IRI as default namespace for unprefixed terms
Example: '@vocab': 'https://schema.org/'

3 Base IRI (@base)
Value type: IRI string or null
Effect: resolve relative IRI references
Example: '@base': 'https://api.example.com/v1/'

4 Compact IRIs
Pattern: prefix:suffix
Validation: prefix must exist in context; suffix must match NCName or valid fragment

5 Keyword Aliasing
Mapping syntax: 'alias': {'@id': '@keyword'}
Example: 'id': {'@id':'@id'}

6 Scoped Contexts
Definition inside term mapping: 'term': {'@context': {...}}
Property scope: apply when term used as property
Type scope: apply when term used in @type value

7 Context Propagation
Algorithm: outer @context applied first; nested @context entries override previous; apply merge order sequentially

8 Remote Imports (@import)
Syntax: '@import': 'context-iri'
Operation: issue HTTP GET to IRI, parse JSON-LD context, merge as inline at position

9 Term Protection (@protected)
Syntax: 'termName': {'@id':'http://example.com/term','@protected':true}
Behavior: subsequent contexts cannot override protected term mapping

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of JSONLD_CONTEXT

# Advanced Context Usage

This section defines context mapping features for JSON-LD 1.1, specifying exact usage, allowed types, defaults, and processing effects.

## @version
- Type: numeric
- Allowed value: 1.1
- Effect: Switch processing mode to JSON-LD 1.1. JSON-LD 1.0 processors must error on non-numeric or non-1.1 values.

## @vocab
- Type: IRI or null
- Default: unset
- Effect: Sets default vocabulary IRI against which terms without prefix are expanded.

## @base
- Type: IRI or null
- Default: document location
- Effect: Resolves relative IRI references in terms and values.

## Compact IRIs
- Syntax: prefix:suffix
- prefix must match term mapping in context
- Suffix must be a valid IRI fragment

## Keyword Aliasing (@context entries mapping to @keyword)
- Map any JSON-LD keyword to a custom term
- Value: keyword name or null to disable keyword

## Scoped Contexts
- @context entry in expanded term definition under @context
- Property-scoped: appears under a property term definition
- Type-scoped: appears under a type term definition

## Context Propagation
- Embedded contexts in nested values propagate to descendant nodes
- Order: outermost contexts applied first, inner contexts override

## @import
- Type: IRI
- Effect: Load remote context from IRI and merge inline

## @protected
- Type: boolean
- Default: false
- Effect: Prevent term redefinition in subsequent contexts


## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: CC0 1.0 Universal
- Crawl Date: 2025-04-26T14:48:22.334Z
- Data Size: 19593741 bytes
- Links Found: 138212

## Retrieved
2025-04-26
