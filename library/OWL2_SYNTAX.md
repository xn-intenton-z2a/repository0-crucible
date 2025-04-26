# OWL2_SYNTAX

## Crawl Summary
Defines greedy regex-based lexical analysis algorithm with delimiter-aware token emission; BNF notation for functional-style syntax; terminal symbols: nonNegativeInteger, quotedString, languageTag, nodeID; IRI full and abbreviated forms with prefix expansion; structural equivalence rules for unordered associations and duplicate elimination; grammar delimiters and parse error conditions.

## Normalised Extract
Table of Contents

1 Lexical Analysis
2 BNF Grammar Notation
3 Data Type Tokens
4 IRI Syntax and Abbreviation
5 Structural Equivalence Rules
6 Duplicate Handling
7 Delimiters and Token Boundaries
8 Parsing Edge Cases

1 Lexical Analysis
 algorithm GreedyTokenize(input):
   for each terminalSymbol T define regex R_T
   p ← 0
   while p < input.length:
     match ← longest R_T at p
     if no match reject
     if T ≠ whitespace and T ≠ comment emit token T
     p ← p + match.length
     if match.text.lastChar ∉ delimiters and input[p] ∉ delimiters:
       wsMatch ← match whitespace or comment at p
       if no wsMatch reject
       p ← p + wsMatch.length
   return tokenStream

2 BNF Grammar Notation
 nonterminal    : boldface name
 terminal       : 'literal' or italic English description
 zeroOrMore     : { symbol }
 zeroOrOne      : [ symbol ]
 alternative    : symbol | symbol

3 Data Type Tokens
 nonNegativeInteger ::= digit+
 quotedString       ::= '"' ( (anyChar except '"' or '\') | '\"' | '\\')* '"'
 languageTag        ::= '@' langtag (per BCP47)
 nodeID             ::= BLANK_NODE_LABEL (SPARQL)

4 IRI Syntax and Abbreviation
 fullIRI    ::= '<' IRIstring '>'
 IRIstring  ::= RFC3987
 prefixDecl ::= PN ':' IRIstring
 abbreviatedIRI ::= PN ':' localName
 expand(pn:rc): return prefixDecl[pn] + rc

5 Structural Equivalence Rules
 unorderedAssociations: ignore element order
 orderedAssociations: compare element by index
 classInstances: same UML class and each association structurally equivalent

6 Duplicate Handling
 when parsing lists (e.g., ClassExpressionList), remove duplicates by structural equivalence

7 Delimiters and Token Boundaries
 delimiters = { whitespace, '#', '"', '<', '>', ':', '@', '^', '(', ')', '[', ']', '{', '}', '.', ',' }
 ensure tokens end or begin with delimiter to separate

8 Parsing Edge Cases
 'SubClassOf:ABC' → token: IRI(SubClassOf:ABC)
 'pref: ABC' → error: 'ABC' not a valid token after prefix
 "10abc" → error: nonNegativeInteger '10' followed by 'a' without delimiter
 "10"^^xsd:integer and "10" ^^ xsd:integer → both parsed as [STRING, '^^', IRI(xsd:integer)]
 '"abc"@en' and '"abc" @en' → [STRING, LANGTAG(@en)]


## Supplementary Details
Lexical Regex Definitions:
 nonNegativeInteger: /^[0-9]+$/
 quotedString: /^"(\\"|\\\\|[^"])*"$/
 languageTag: /^@[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/
 nodeID: /^_:[A-Za-z][A-Za-z0-9]*$/
 identifier delimiters: whitespace or any of # " < > : @ ^ ( ) [ ] { } . ,

Prefix Declaration Syntax:
 PrefixDecl ::= 'Prefix' PN ':' IRIReference
 sample: Prefix :a <http://example.org/>

IRI Expansion:
 function expandIRI(pn:rc, prefixMap):
   if pn in prefixMap return prefixMap[pn] + rc else error

Duplicate Elimination Pattern:
 function removeDuplicates(list):
   output ← []
   for item in list:
     if no existing item' in output with structuralEq(item, item'):
       output.push(item)
   return output

Flattening Unions:
 function flattenUnion(expressions):
   set out
   for e in expressions:
     if e is UnionList add each sub to out else add e to out
   return out as list



## Reference Details
BNF Grammar (excerpt):
 ClassExpressionList ::= ClassExpression { ClassExpression }
 Ontology ::= OntologyID [ Declaration* ] [ Import* ] Axiom*
 Declaration ::= 'Declaration' '(' Entity ')'
 Entity ::= Class | ObjectProperty | DataProperty | NamedIndividual | AnnotationProperty

Terminal regex table:
 Token                Regex
 NONNEG_INT           /^[0-9]+$/
 QUOTED_STRING        /^"(\\"|\\\\|[^"])*"$/
 LANGTAG              /^@[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/
 BLANK_NODE_LABEL     /^_:[A-Za-z][A-Za-z0-9]*$/
 IRI_REF              /^<[^>]*>$/
 PN_PREFIX            /^[A-Za-z][A-Za-z0-9_\-]*:$/
 PN_LOCAL             /^[A-Za-z0-9_\-]+$/

Lexical Analyzer Implementation (pseudo-code):
 see normalisedExtract section 'Lexical Analysis'

Functional-style Syntax Parsing Pattern:
 1. Tokenize input using Lexical Analyzer
 2. Build AST via recursive descent following BNF rules:
    parseClassExpression:
      if nextToken == 'ObjectIntersectionOf':
        consume 'ObjectIntersectionOf'
        consume '('
        list ← []
        do list.push(parseClassExpression()) while nextToken != ')'
        consume ')'
        return IntersectionNode(list)
      ... similarly for other constructs

Prefix Map Configuration Options:
 prefixMap: dictionary of { string → string }
 default: {}
 effect: enables abbreviatedIRI resolution

Best Practice: always declare prefixes with trailing slash or hash to avoid URI merging.

Troubleshooting Procedures:
 Command: parseOwl2 -i ontology.owl2 -o ast.json
 Expected: exit code 0, ast.json contains 'Ontology' node
 Error: 'Unexpected token at line X': check for missing delimiters or unescaped quotes
 Fix: ensure whitespace around '^^' or '@', escape '"' within strings



## Information Dense Extract
Lexical: greedy regex match per terminal, delimiter-aware token boundaries; emit only non-whitespace/comment. Terminals: nonNegativeInteger:[0-9]+ quotedString:"(\"|\\|[^"])*"" languageTag:@[A-Za-z0-9]+(-[A-Za-z0-9]+)* nodeID:_:[A-Za-z][A-Za-z0-9]* IRI_REF:<[^>]*> PN_PREFIX:[A-Za-z][A-Za-z0-9_\-]*: PN_LOCAL:[A-Za-z0-9_\-]+. BNF: nonterminal bold, terminal in quotes, repetition { }, optional [ ], alternatives |. IRI: fullIRI=<IRIstring>; abbreviated=pn:localName; expand via prefixMap. StructuralEquiv: unordered associations ignore order; ordered compare index; flatten duplicate elements. FlattenUnion: merge nested unions. DuplicateElim: remove structurally equal items. PrefixDecl syntax: Prefix PN: <IRI>. AST: recursive descent per BNF. Errors: missing delimiter, unescaped '"', invalid token adjacency. Troubleshoot: check tokenization, ensure whitespace or distinct delimiters, validate prefix declarations.

## Sanitised Extract
Table of Contents

1 Lexical Analysis
2 BNF Grammar Notation
3 Data Type Tokens
4 IRI Syntax and Abbreviation
5 Structural Equivalence Rules
6 Duplicate Handling
7 Delimiters and Token Boundaries
8 Parsing Edge Cases

1 Lexical Analysis
 algorithm GreedyTokenize(input):
   for each terminalSymbol T define regex R_T
   p  0
   while p < input.length:
     match  longest R_T at p
     if no match reject
     if T  whitespace and T  comment emit token T
     p  p + match.length
     if match.text.lastChar  delimiters and input[p]  delimiters:
       wsMatch  match whitespace or comment at p
       if no wsMatch reject
       p  p + wsMatch.length
   return tokenStream

2 BNF Grammar Notation
 nonterminal    : boldface name
 terminal       : 'literal' or italic English description
 zeroOrMore     : { symbol }
 zeroOrOne      : [ symbol ]
 alternative    : symbol | symbol

3 Data Type Tokens
 nonNegativeInteger ::= digit+
 quotedString       ::= ''' ( (anyChar except ''' or ''') | '''' | '''')* '''
 languageTag        ::= '@' langtag (per BCP47)
 nodeID             ::= BLANK_NODE_LABEL (SPARQL)

4 IRI Syntax and Abbreviation
 fullIRI    ::= '<' IRIstring '>'
 IRIstring  ::= RFC3987
 prefixDecl ::= PN ':' IRIstring
 abbreviatedIRI ::= PN ':' localName
 expand(pn:rc): return prefixDecl[pn] + rc

5 Structural Equivalence Rules
 unorderedAssociations: ignore element order
 orderedAssociations: compare element by index
 classInstances: same UML class and each association structurally equivalent

6 Duplicate Handling
 when parsing lists (e.g., ClassExpressionList), remove duplicates by structural equivalence

7 Delimiters and Token Boundaries
 delimiters = { whitespace, '#', ''', '<', '>', ':', '@', '^', '(', ')', '[', ']', '{', '}', '.', ',' }
 ensure tokens end or begin with delimiter to separate

8 Parsing Edge Cases
 'SubClassOf:ABC'  token: IRI(SubClassOf:ABC)
 'pref: ABC'  error: 'ABC' not a valid token after prefix
 '10abc'  error: nonNegativeInteger '10' followed by 'a' without delimiter
 '10'^^xsd:integer and '10' ^^ xsd:integer  both parsed as [STRING, '^^', IRI(xsd:integer)]
 ''abc'@en' and ''abc' @en'  [STRING, LANGTAG(@en)]

## Original Source
W3C OWL 2 Specifications
https://www.w3.org/TR/owl2-syntax/

## Digest of OWL2_SYNTAX

# OWL 2 Syntax Technical Reference (Retrieved 2024-06-11)

## Lexical Analysis Algorithm

1. Create a regular expression for each terminal symbol (including whitespace and comments).
2. Initialize pointer p to the start of input.
3. Repeatedly match all regexes greedily at p. If no match, reject input.
4. If match is not whitespace or comment, emit corresponding token.
5. Advance p past the match. If the matched token does not end with a delimiter and next char is not a delimiter, match whitespace or comment; if none, reject.
6. Repeat until end of input.

## Functional-Style Syntax Grammar (BNF)

Example fragment:
```
ClassExpression     ::=    ObjectIntersectionOf '(' ClassExpressionList ')'
                         | ObjectUnionOf '(' ClassExpressionList ')'
ClassExpressionList ::=    ClassExpression { ClassExpression }
```
Delimited by whitespace, comments (#... to end of line), and XML-style delimiters.

## Data Type Definitions

- nonNegativeInteger : digits 0-9, at least one
- quotedString       : '"' (any chars except unpaired '"' or '\') '"', supports \" and \\
- languageTag        : '@' + BCP47 langtag
- nodeID             : SPARQL BLANK_NODE_LABEL

## IRI Representation

- fullIRI    : '<' RFC3987 IRI '>'
- prefixName : PN ':' rc    (rc = remainder of IRI string)
- Abbreviation: pn:rc expands to full IRI PI + rc

## Structural Equivalence and Normalization

- Unordered associations: element order irrelevant
- Duplicate elements in lists: flatten and remove duplicates
- Example flattening: ObjectUnionOf(a:Person a:Animal a:Animal) → ObjectUnionOf(a:Person a:Animal)

## Duplicate Elimination

Exchange syntaxes may contain duplicates; discard duplicates on conversion to structural model.

## Delimiters and Token Boundaries

Delimiters: '#', '"', '<', '>', whitespace, ':', '@', '^', '(', ')', '[', ']', '{', '}', '.', ','

## Parsing Edge Cases

- 'SubClassOf:ABC' → single prefixed IRI
- 'pref: ABC' → error, no delimiter after pref:



## Attribution
- Source: W3C OWL 2 Specifications
- URL: https://www.w3.org/TR/owl2-syntax/
- License: W3C Document License 1.0
- Crawl Date: 2025-04-26T02:16:58.170Z
- Data Size: 29611499 bytes
- Links Found: 23738

## Retrieved
2025-04-26
