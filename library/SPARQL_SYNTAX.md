# SPARQL_SYNTAX

## Crawl Summary
Defines SPARQL 1.1 grammar for IRI syntax (IRIREF and PrefixedName), prefix mapping, BASE resolution (RFC3986 sec 5.1.1), literal forms (STRING_LITERAL, LANGTAG, datatype via ^^, numeric shortcuts for xsd:integer, decimal, double, boolean), query variable markers ('?' or '$'), blank node label forms and abbreviated '[]', 'predicateObjectList' and 'objectList' constructs for triple patterns.

## Normalised Extract
Table of Contents
1 IRI Syntax
2 Prefixed Names
3 Relative IRIs
4 Literals
5 Variables
6 Blank Nodes
7 Triple Patterns

1 IRI Syntax
  grammar production iri: IRIREF|PrefixedName
  IRIREF: '<' IRI-reference '>'
  prohibits '<','>','"',' ',"{","}",'|','\\','^','`'
2 Prefixed Names
  PREFIX PNAME_NS IRIREF
  PNAME_NS: PN_PREFIX|':'
  PN_PREFIX: PN_CHARS_BASE((PN_CHARS|'.')*PN_CHARS)? ':'
  PN_LOCAL: (PN_CHARS_U|[0-9])((PN_CHARS|'.')*PN_CHARS)?
  mapping: IRI associated with prefix + local part
3 Relative IRIs
  BASE IRIREF
  resolve per RFC3986 sec5.1.1 only basic algorithm, no normalization
4 Literals
  STRING_LITERAL("..."|'...') with optional LANGTAG('@...') or '^^'iri
  numeric shortcuts: INTEGER->[lexical]^^xsd:integer, DECIMAL->[lexical]^^xsd:decimal, DOUBLE->[lexical]^^xsd:double
  BooleanLiteral: true,false->[lexical]^^xsd:boolean
5 Variables
  ('?'| '$')VarName
  VarName: (PN_CHARS_U|[0-9])((PN_CHARS|'.')*PN_CHARS)?
6 Blank Nodes
  '_:'VarName ; abbreviated [] or [predicateObjectList]
  each [] allocates a fresh blank node
7 Triple Patterns
  subject predicateObjectList
  predicateObjectList: verb objectList (';' verb objectList)*
  objectList: object (',' object)*
  subject/verb/object: Var|iri|literal|BlankNode


## Supplementary Details
BASE and PREFIX directives
  BASE IRIREF: defines Base IRI for resolving relative IRIs using RFC3986 section 5.1.1 basic algorithm only
  PREFIX PNAME_NS IRIREF: binds PNAME_NS to IRIREF; PNAME_NS may be ':' for empty prefix
IRI resolution
  PrefixedName = resolve prefix binding + local part
  Relative IRI = resolve against Base IRI, no syntax-based or scheme-based normalization
Literal shortcuts
  INTEGER: digits only -> xsd:integer
  DECIMAL: digits with '.' -> xsd:decimal
  DOUBLE: exponent form -> xsd:double
  Boolean: true,false -> xsd:boolean
Blank node allocation
  Each '[]' or '[ ... ]' in a basic graph pattern is replaced by a new blank node label
Triple pattern grouping
  Semicolon ';' groups multiple verb-object lists under one subject
  Comma ',' groups multiple objects under one predicate

## Reference Details
Grammar productions excerpt:
  PrefixDecl: 'PREFIX' PNAME_NS IRIREF
  BaseDecl: 'BASE' IRIREF
  Query: Prologue SelectQuery | Prologue ConstructQuery | ...
  Prologue: BaseDecl? PrefixDecl*
  PrefixedName: PNAME_LN | PNAME_NS
  PNAME_LN: PN_PREFIX PN_LOCAL
  IRIREF: '<' IRI-reference '>'
  StringLiteral1: '"' ([^"\\])* '"'
  LangTag: '@' [a-zA-Z]+ ('-' [a-zA-Z0-9]+)*
  NumericLiteral: INTEGER | DECIMAL | DOUBLE
  BooleanLiteral: 'true' | 'false'
  Var: ('?'| '$') VarName
  BlankNode: '_:' VarName
Examples:
  PREFIX ex: <http://example.org/>
  BASE <http://example.org/data/>
  SELECT ?s WHERE { ex:book ex:title ?title }
Best practices:
  always declare PREFIX for common namespaces
  use PREFIX rather than long IRIREF
  use numeric shortcuts for readability
  avoid relative IRIs unless BASE declared
Troubleshooting:
  Malformed IRIREF: parser error at unexpected '>' or missing '<'
  Unbound prefix: 'Unresolved prefix: abc'
  Example command: curl -G http://endpoint/sparql --data-urlencode 'query=SELECT ?s WHERE {?s ?p ?o}' -H 'Accept: application/sparql-results+json'
  Expected output: JSON with head.vars ["s"] and results.bindings

## Information Dense Extract
iri ::= '<' IRI-reference '>' | PN_PREFIX PN_LOCAL ; PNAME_NS ::= PN_PREFIX | ':' ; PREFIX PNAME_NS IRIREF ; BASE IRIREF ; literal ::= STRING_LITERAL (LANGTAG | '^^' iri)? | INTEGER | DECIMAL | DOUBLE | BooleanLiteral ; INTEGER ::= [0-9]+ ; DECIMAL ::= [0-9]*'.'[0-9]+ ; DOUBLE ::= ( [0-9]+('.'[0-9]*)? | '.'[0-9]+ ) [eE][+-]?[0-9]+ ; BooleanLiteral ::= 'true' | 'false' ; Var ::= ('?'| '$') VarName ; BlankNode ::= '_:' VarName | '[]' | '[ predicateObjectList ]' ; triplesSameSubject ::= subject predicateObjectList ; predicateObjectList ::= verb objectList (';' verb objectList)* ; objectList ::= object (',' object)* ; subject|verb|object ::= Var | iri | literal | BlankNode

## Sanitised Extract
Table of Contents
1 IRI Syntax
2 Prefixed Names
3 Relative IRIs
4 Literals
5 Variables
6 Blank Nodes
7 Triple Patterns

1 IRI Syntax
  grammar production iri: IRIREF|PrefixedName
  IRIREF: '<' IRI-reference '>'
  prohibits '<','>',''',' ','{','}','|','''','^','''
2 Prefixed Names
  PREFIX PNAME_NS IRIREF
  PNAME_NS: PN_PREFIX|':'
  PN_PREFIX: PN_CHARS_BASE((PN_CHARS|'.')*PN_CHARS)? ':'
  PN_LOCAL: (PN_CHARS_U|[0-9])((PN_CHARS|'.')*PN_CHARS)?
  mapping: IRI associated with prefix + local part
3 Relative IRIs
  BASE IRIREF
  resolve per RFC3986 sec5.1.1 only basic algorithm, no normalization
4 Literals
  STRING_LITERAL('...'|'...') with optional LANGTAG('@...') or '^^'iri
  numeric shortcuts: INTEGER->[lexical]^^xsd:integer, DECIMAL->[lexical]^^xsd:decimal, DOUBLE->[lexical]^^xsd:double
  BooleanLiteral: true,false->[lexical]^^xsd:boolean
5 Variables
  ('?'| '$')VarName
  VarName: (PN_CHARS_U|[0-9])((PN_CHARS|'.')*PN_CHARS)?
6 Blank Nodes
  '_:'VarName ; abbreviated [] or [predicateObjectList]
  each [] allocates a fresh blank node
7 Triple Patterns
  subject predicateObjectList
  predicateObjectList: verb objectList (';' verb objectList)*
  objectList: object (',' object)*
  subject/verb/object: Var|iri|literal|BlankNode

## Original Source
W3C RDF 1.1 and SPARQL 1.1 Specifications
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_SYNTAX

# SPARQL Syntax

This document defines SPARQL 1.1 query language syntax for RDF terms and triple patterns.

# IRI Syntax

   grammar production: iri
   matches IRIREF or PrefixedName
   IRIREF: '<' IRI-reference '>' (no '<','>','"',' ',"{","}","|","\\","^","`")
   PrefixedName: PN_PREFIX PN_LOCAL
   PN_PREFIX: PN_CHARS_BASE ((PN_CHARS|'.')* PN_CHARS)? ':'
   PN_LOCAL: (PN_CHARS_U|[0-9]) ((PN_CHARS|'.')* PN_CHARS)?
   PN_CHARS_BASE: [A-Z]|[a-z]|... (U+00C0–U+00D6, U+00D8–U+00F6, U+00F8–U+02FF, U+0370–U+037D, U+037F–U+1FFF, U+200C–U+200D, U+2070–U+218F, U+2C00–U+2FEF, U+3001–U+D7FF, U+F900–U+FDCF, U+FDF0–U+FFFD)

# Prefixed Names

   PREFIX declaration: 'PREFIX' PNAME_NS IRIREF
   PNAME_NS: PN_PREFIX|':'
   maps prefix label and local part to IRI by concatenation
   local part and prefix may be empty
   SPARQL local names allow digits at start and backslash escapes (e.g. ns:id\=123)

# Relative IRIs

   BASE declaration: 'BASE' IRIREF
   Resolution algorithm: RFC3986 section 5.1.1 (no normalization).
   If BASE absent, default Base IRI from retrieval or default URI.

# Literal Syntax

   literal
     : STRING_LITERAL (LANGTAG|('^^' iri))?
     | INTEGER
     | DECIMAL
     | DOUBLE
     | BooleanLiteral
   STRING_LITERAL: '"' [^"\\]* '"' | "'" [^'\\]* "'" | triple-quoted forms
   LANGTAG: '@' [a-zA-Z]+ ('-' [a-zA-Z0-9]+)*
   INTEGER: [0-9]+  -> '"lexical"^^xsd:integer'
   DECIMAL: [0-9]* '.' [0-9]+ -> '"lexical"^^xsd:decimal'
   DOUBLE: ( [0-9]+ ('.'[0-9]*)? [eE][+-]?[0-9]+ ) | ('.'[0-9]+ [eE][+-]?[0-9]+ ) -> '"lexical"^^xsd:double'
   BooleanLiteral: 'true'|'false' -> '"lexical"^^xsd:boolean'

# Query Variables

   Variable: ('?'| '$') VarName
   VarName: (PN_CHARS_U|[0-9]) ((PN_CHARS|'.')* PN_CHARS)?

# Blank Nodes

   BlankNode: '_:' (PN_CHARS_U|[0-9]) ((PN_CHARS|'.')* PN_CHARS)?
   Abbreviated: '[]' or '[ predicateObjectList ]'
   Each '[]' allocates a unique blank node label
   '[ :p  "v" ] :q "w"' => _:bNN :p "v" . _:bNN :q "w" .

# Triple Patterns

   TriplesTemplate: triplesSameSubject ('.' triplesSameSubject)*
   triplesSameSubject: subject predicateObjectList
   predicateObjectList: verb objectList (';' verb objectList)*
   objectList: object (',' object)*
   subject: Var| iri| BlankNode| 'triplesNode'
   verb: Var| iri
   object: Var| iri| literal| BlankNode| 'triplesNode'

# Predicate-Object Lists

   ?x foaf:name ?name ; foaf:mbox ?mbox .
   expands to two triple patterns with same subject

# Object Lists

   ?x foaf:nick "Alice","Alice_" .
   expands to two triple patterns with same subject/predicate


## Attribution
- Source: W3C RDF 1.1 and SPARQL 1.1 Specifications
- URL: https://www.w3.org/TR/sparql11-query/
- License: W3C Document License 1.0
- Crawl Date: 2025-04-26T06:50:38.617Z
- Data Size: 95260895 bytes
- Links Found: 103514

## Retrieved
2025-04-26
