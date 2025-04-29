# SHEX_GRAMMAR

## Crawl Summary
ShExC EBNF grammar covering declarations (BASE, PREFIX, IMPORT), start shapeExprDecl rule, shape expression operators (OR, AND, NOT), triple expression constructs (oneOf, group, unary, include), cardinality operators (*, +, ?, {m,n}), XML Schema facets (numeric and string), lexical token patterns (IRIREF, PNAME, STRING_LITERAL, LANGTAG, numeric and boolean literals), escape sequences (ECHAR, UCHAR), and annotations/semantic actions. Data size 974998 bytes, 143057 links.

## Normalised Extract
Table of Contents
1 Declarations
2 Start Shape Declaration
3 Shape Expression Operators
4 Triple Expressions
5 Cardinality Operators
6 Facets
7 Lexical Tokens
8 Escape Sequences
9 Annotations & Semantic Actions

1 Declarations
baseDecl = BASE IRIREF
prefixDecl = PREFIX PNAME_NS IRIREF
importDecl = IMPORT IRIREF

2 Start Shape Declaration
shapeExprDecl = shapeExprLabel = inlineShapeExpression

3 Shape Expression Operators
inlineShapeExpression = inlineShapeOr (OR inlineShapeOr)*
inlineShapeOr = inlineShapeAnd (AND inlineShapeAnd)*
inlineShapeAnd = inlineShapeNot (AND inlineShapeNot)*
inlineShapeNot = NOT? inlineShapeAtom
inlineShapeAtom = nonLitNodeConstraint shapeOrRef? | litNodeConstraint | ( inlineShapeExpression ) | . | shapeDefinition | shapeRef

4 Triple Expressions
oneOfTripleExpr = multiElementOneOf singleElementGroup (| singleElementGroup)+
groupTripleExpr = multiElementGroup unaryTripleExpr (; unaryTripleExpr)* (; ($ tripleExprLabel)?)
unaryTripleExpr = (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?
includeExpr = INCLUDE ( tripleExpression ) cardinality? annotation* semanticActions senseFlags?

5 Cardinality Operators
cardinality = * | + | ? | REPEAT_RANGE
REPEAT_RANGE = { INTEGER (, (INTEGER | *)? )? }

6 Facets
numericFacet = MININCLUSIVE | MINEXCLUSIVE | MAXINCLUSIVE | MAXEXCLUSIVE | TOTALDIGITS | FRACTIONDIGITS
stringFacet = LENGTH | MINLENGTH | MAXLENGTH | PATTERN

7 Lexical Tokens
IRIREF = < ([^#0000- < >"{}|^`\\] | UCHAR)* >
PNAME_NS = PN_PREFIX? :
PNAME_LN = PNAME_NS PN_LOCAL
STRING_LITERAL1 = ' ([^'\\\n\r] | ECHAR | UCHAR)* '
STRING_LITERAL2 = " ([^"\\\n\r] | ECHAR | UCHAR)* "
LANGTAG = @ [a-zA-Z]+ (- [a-zA-Z0-9]+)*
numericLiteral = INTEGER | DECIMAL | DOUBLE
booleanLiteral = true | false

8 Escape Sequences
ECHAR = \\ [tbnrf\"'\\]
UCHAR = \\u HEX HEX HEX HEX | \\U HEX{8}

9 Annotations & Semantic Actions
annotation = @ predicate object
semanticActions = % iri (CODE | %) rdfLiteral
senseFlags = EXTERNAL | START

## Supplementary Details
Token regex patterns
IRIREF: ^<((?:[^#0000- <>"{}|^`\\]|\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8})*)>$
PNAME_NS: ^(?:[A-Za-z]|[\u00B7-\u36F]|[\u203F-\u2040])*:$
PNAME_LN: ^PNAME_NSPN_LOCAL$
STRING_LITERAL1: ^'([^'\\\n\r]|\\[tbnrf"'\\]|\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8})*'$
LANGTAG: ^@[a-zA-Z]+(-[a-zA-Z0-9]+)*$
numericLiteral: ^[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$
booleanLiteral: ^(?:true|false)$
UCHAR and ECHAR definitions as per grammar
Cardinality semantics: * → [0,∞], + → [1,∞], ? → [0,1], {m,n} → [m,n]
Parser steps
1. Lex input with regex patterns above
2. Parse declarations
3. Build shape AST via recursive grammar rules
4. Validate facets against XML Schema value ranges
5. Attach annotations and semantic actions to AST nodes

## Reference Details


## Information Dense Extract
ShExC grammar EBNF: baseDecl: BASE IRIREF; prefixDecl: PREFIX PNAME_NS IRIREF; importDecl: IMPORT IRIREF; shapeExprDecl: shapeExprLabel = inlineShapeExpression; inlineShapeExpression: inlineShapeOr (OR inlineShapeOr)*; inlineShapeOr: inlineShapeAnd (AND inlineShapeAnd)*; inlineShapeAnd: inlineShapeNot (AND inlineShapeNot)*; inlineShapeNot: NOT? inlineShapeAtom; inlineShapeAtom: nonLitNodeConstraint shapeOrRef? | litNodeConstraint | (inlineShapeExpression) | . | shapeDefinition | shapeRef; oneOfTripleExpr: multiElementOneOf singleElementGroup (| singleElementGroup)+; groupTripleExpr: multiElementGroup unaryTripleExpr (; unaryTripleExpr)* (; ($ tripleExprLabel)?); unaryTripleExpr: (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?; includeExpr: INCLUDE (tripleExpression) cardinality? annotation* semanticActions senseFlags?; cardinality: *|+|?|REPEAT_RANGE; REPEAT_RANGE: {INTEGER(,(INTEGER|*)?)?}; numericFacet: MININCLUSIVE|MINEXCLUSIVE|MAXINCLUSIVE|MAXEXCLUSIVE|TOTALDIGITS|FRACTIONDIGITS; stringFacet: LENGTH|MINLENGTH|MAXLENGTH|PATTERN; IRIREF: <([^#0000- <>")|UCHAR)*>; PNAME_NS: PN_PREFIX?:; PNAME_LN: PNAME_NS PN_LOCAL; STRING_LITERAL: '([^'\\\n\r]|ECHAR|UCHAR)*'|"([^"\\\n\r]|ECHAR|UCHAR)*"; LANGTAG: @[a-zA-Z]+(-[a-zA-Z0-9]+)*; numericLiteral: INTEGER|DECIMAL|DOUBLE; booleanLiteral: true|false; ECHAR: \\ [tbnrf"'\\]; UCHAR: \\uHEX4|\\UHEX8; annotation: @predicateobject; semanticActions: %iri(CODE|%)rdfLiteral; senseFlags: EXTERNAL|START; cardinality semantics: *=0..∞,+=1..∞,?=0..1,{m,n}=m..n.

## Sanitised Extract
Table of Contents
1 Declarations
2 Start Shape Declaration
3 Shape Expression Operators
4 Triple Expressions
5 Cardinality Operators
6 Facets
7 Lexical Tokens
8 Escape Sequences
9 Annotations & Semantic Actions

1 Declarations
baseDecl = BASE IRIREF
prefixDecl = PREFIX PNAME_NS IRIREF
importDecl = IMPORT IRIREF

2 Start Shape Declaration
shapeExprDecl = shapeExprLabel = inlineShapeExpression

3 Shape Expression Operators
inlineShapeExpression = inlineShapeOr (OR inlineShapeOr)*
inlineShapeOr = inlineShapeAnd (AND inlineShapeAnd)*
inlineShapeAnd = inlineShapeNot (AND inlineShapeNot)*
inlineShapeNot = NOT? inlineShapeAtom
inlineShapeAtom = nonLitNodeConstraint shapeOrRef? | litNodeConstraint | ( inlineShapeExpression ) | . | shapeDefinition | shapeRef

4 Triple Expressions
oneOfTripleExpr = multiElementOneOf singleElementGroup (| singleElementGroup)+
groupTripleExpr = multiElementGroup unaryTripleExpr (; unaryTripleExpr)* (; ($ tripleExprLabel)?)
unaryTripleExpr = (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?
includeExpr = INCLUDE ( tripleExpression ) cardinality? annotation* semanticActions senseFlags?

5 Cardinality Operators
cardinality = * | + | ? | REPEAT_RANGE
REPEAT_RANGE = { INTEGER (, (INTEGER | *)? )? }

6 Facets
numericFacet = MININCLUSIVE | MINEXCLUSIVE | MAXINCLUSIVE | MAXEXCLUSIVE | TOTALDIGITS | FRACTIONDIGITS
stringFacet = LENGTH | MINLENGTH | MAXLENGTH | PATTERN

7 Lexical Tokens
IRIREF = < ([^#0000- < >'{}|^'''] | UCHAR)* >
PNAME_NS = PN_PREFIX? :
PNAME_LN = PNAME_NS PN_LOCAL
STRING_LITERAL1 = ' ([^''''n'r] | ECHAR | UCHAR)* '
STRING_LITERAL2 = ' ([^''''n'r] | ECHAR | UCHAR)* '
LANGTAG = @ [a-zA-Z]+ (- [a-zA-Z0-9]+)*
numericLiteral = INTEGER | DECIMAL | DOUBLE
booleanLiteral = true | false

8 Escape Sequences
ECHAR = '' [tbnrf''''']
UCHAR = ''u HEX HEX HEX HEX | ''U HEX{8}

9 Annotations & Semantic Actions
annotation = @ predicate object
semanticActions = % iri (CODE | %) rdfLiteral
senseFlags = EXTERNAL | START

## Original Source
Shape Expressions (ShEx) — RDF Graph Structure Validation
https://shex.io/shex-semantics/

## Digest of SHEX_GRAMMAR

# ShExC Grammar EBNF

## Declarations

baseDecl = BASE IRIREF
prefixDecl = PREFIX PNAME_NS IRIREF
importDecl = IMPORT IRIREF

## Start Shape Declaration

shapeExprDecl = shapeExprLabel "=" inlineShapeExpression

## Shape Expression Operators

inlineShapeExpression = inlineShapeOr (OR inlineShapeOr)*
inlineShapeOr = inlineShapeAnd (AND inlineShapeAnd)*
inlineShapeAnd = inlineShapeNot (AND inlineShapeNot)*
inlineShapeNot = NOT? inlineShapeAtom
inlineShapeAtom = nonLitNodeConstraint shapeOrRef? | litNodeConstraint | "(" inlineShapeExpression ")" | "." | shapeDefinition | shapeRef

## Triple Expressions

oneOfTripleExpr = multiElementOneOf singleElementGroup ("|" singleElementGroup)+
groupTripleExpr = multiElementGroup unaryTripleExpr (';' unaryTripleExpr)* (';' ('$' tripleExprLabel)?)
unaryTripleExpr = (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?
includeExpr = INCLUDE "(" tripleExpression ")" cardinality? annotation* semanticActions senseFlags?

## Cardinality

cardinality = "*" | "+" | "?" | REPEAT_RANGE
REPEAT_RANGE = "{" INTEGER ("," (INTEGER | "*")? )? "}"

## Facets

numericFacet = MININCLUSIVE | MINEXCLUSIVE | MAXINCLUSIVE | MAXEXCLUSIVE | TOTALDIGITS | FRACTIONDIGITS
stringFacet = LENGTH | MINLENGTH | MAXLENGTH | PATTERN
xsFacet = numericFacet | stringFacet

## Lexical Tokens

IRIREF = "<" ([^#0000- <>\"{}|^`\\] | UCHAR)* ">"
PNAME_NS = PN_PREFIX? ":"
PNAME_LN = PNAME_NS PN_LOCAL
STRING_LITERAL1 = "'" ([^'\\\n\r] | ECHAR | UCHAR)* "'"
STRING_LITERAL2 = '"' ([^"\\\n\r] | ECHAR | UCHAR)* '"'
LANGTAG = "@" [a-zA-Z]+ ("-" [a-zA-Z0-9]+)*
numericLiteral = INTEGER | DECIMAL | DOUBLE
booleanLiteral = TRUE | FALSE

## Escape Sequences

ECHAR = "\\" [tbnrf\"'\\]
UCHAR = "\\u" HEX HEX HEX HEX | "\\U" HEX HEX HEX HEX HEX HEX HEX HEX

## Annotations and Semantic Actions

annotation = "@" predicate object
semanticActions = "%" iri (CODE | "%") rdfLiteral
senseFlags = EXTERNAL | START

## Retrieval Metadata

Retrieved from https://shex.io/shex-semantics/ on 2024-06-20
Data Size: 974998 bytes, Links Found: 143057

## Attribution
- Source: Shape Expressions (ShEx) — RDF Graph Structure Validation
- URL: https://shex.io/shex-semantics/
- License: License if known
- Crawl Date: 2025-04-29T17:50:07.468Z
- Data Size: 974998 bytes
- Links Found: 143057

## Retrieved
2025-04-29
