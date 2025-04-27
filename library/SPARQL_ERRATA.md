# SPARQL_ERRATA

## Crawl Summary
List of 23 errata for SPARQL 1.1 Query, Protocol, Update, and Graph Store: specific corrections to grammar, keyword semantics, evaluation order, error handling in aggregates, blank node scoping, path translations, and footnote references, with explicit definitions and replacement texts.

## Normalised Extract
Table of Contents
1  errata-query-1  Definition of ALP
2  errata-query-2  GroupGraphPattern lexical order
3  errata-query-3  PropertyListPathNotEmpty object lists
4  clarification-query-1  IN evaluation semantics
5  clarification-query-2  RDFterm-equals extension case
6  editorial-query-1  defn_evalGraph parenthesis
7  editorial-query-2  Join spacing fix
8  errata-query-4  CONCAT zero/one-arg definitions
9  editorial-query-3  DELETE DATA footnote link
10 errata-query-5  Aggregates nesting restriction
11 errata-query-6  Aggregate error handling
12 errata-query-7  LeftJoin clause correction
13 errata-query-7a LeftJoin Diff note
14 errata-query-8  Substitute scoping rules
15 errata-query-9  BIND pattern ordering
16 errata-query-10 VALUES in substitute
17 errata-query-11 Aggregation multiset vs set
18 errata-query-12 Diff false-on-error rule
19 errata-query-13 Filter grammar cleanup
20 errata-query-14 "unaggregated variables" definition
21 errata-query-15 GRAPH blank node behavior
22 errata-query-16 SAMPLE defined preference
23 errata-query-17 Blank node label reuse
24 errata-query-18 Path translation sequence fix
25 errata-query-19 BindingValue to DataBlockValue
26 errata-query-20 DISTINCT+OrderBy ordering
27 errata-query-21 EMPTY GROUP BY aggregation
28 errata-query-22 SUM and aggregate example multisets
29 errata-query-23 MIN/MAX consistency issues

Details
errata-query-1
Definition of ALP: V initialized as empty set, not multiset.

errata-query-2
GroupGraphPattern processing: iterate elements in lexical parse order.

errata-query-3
Grammar rule [83] change both ObjectListPathNotEmpty object lists to ObjectListPath.

clarification-query-1
IN operator: evaluate left-hand expression once and reuse result.

clarification-query-2
Section 17.3.1 reference fix: extension case defined below in 17.4.1.7 RDFterm-equals.

editorial-query-1
Add missing right parenthesis to R := Union(R, Join(eval(D(D[i]), P), Ω(?var->i))).

editorial-query-2
Correct Join definition spacing: Join(Ω1, Ω2) = { merge(μ1, μ2) | μ1 in Ω1 and μ2 in Ω2 ... }.

errata-query-4
Define CONCAT variants: zero args returns "", one arg returns operand, two or more uses fn:concat.

editorial-query-3
DELETE DATA footnote must refer to DELETE DATA rule (footnote 39), not DELETE WHERE.

errata-query-5
Disallow nesting aggregate functions inside other aggregates; enforce at parse time.

errata-query-6
MAX and other aggregates with errors: specify fallback to same result handling for different functions.

errata-query-7
LeftJoin expansion third clause: universal quantification when expr false.

errata-query-7a
Second and third clauses form Diff; leave Filter(expr, Join) ∪ Diff unaffected.

errata-query-8
Substitute operation: exclude variables not visible at outermost graph pattern.

errata-query-9
BIND example ordering: use Extend and Join forms as specified.

errata-query-10
Substitute must handle VALUES-bound variables and inner scope variables correctly.

errata-query-11
Aggregation definition replace multiset with set and wrap P in Group(exprlist,P).

errata-query-12
Diff treats error-evaluating expressions as false.

errata-query-13
Filter definition omit extraneous D(G) parameter.

errata-query-14
Define term "unaggregated variables" or reword usage in section 18.2.4.1.

errata-query-15
GRAPH blank node handling: in WHERE treat as variable, in quad block generate unique per-solution labels.

errata-query-16
SAMPLE: SHOULD select defined value over undef if errors in choice multiset.

errata-query-17
Blank node label reuse rule applies across property paths and triple patterns.

errata-query-18
Sequence path translation: X seq(P, Q) Y -> X P ?V . ?V Q Y.

errata-query-19
Section 18.2.2.6: use DataBlockValue instead of BindingValue and link appropriately.

errata-query-20
DISTINCT and projection must preserve ordering from OrderBy even when ordering variables not projected.

errata-query-21
Aggregate with no GROUP BY and no matches: implement empty result set group handling as zero-row group.

errata-query-22
SUM, Avg, GroupConcat, Sample argument examples must use multisets of lists; update examples accordingly.

errata-query-23
Ensure consistency of MIN and MAX definitions between subsections 18.5.1.5 and 18.5.1.6.


## Supplementary Details
Parameter Corrections and Sections Affected
- ALP Initialization  section 17.4.1.1
- GroupGraphPattern Ordering  section 17.3.1
- Grammar Rule [83]  section 17.4.1.9
- IN Operator Evaluation  section 17.3.2
- RDFterm-equals Extension  section 17.4.1.7
- FILTER Parenthesis  section 17.4.3
- Join Definition  section 17.4.2
- CONCAT Variants  SPARQL Functions section 17.6
- DELETE DATA Footnotes section 19.6
- Aggregate Nesting  section 18.8
- Error Handling in Aggregates  section 18.5
- LeftJoin and Diff  section 17.4.4
- Substitute Scoping  section 17.4.5
- BIND Pattern Ordering  section 17.4.6
- VALUES in Substitute  section 17.4.7
- Aggregation Definition  section 18.5.1
- Diff Error Rule  section 17.4.4
- Filter Definition  section 17.4.3
- Unaggregated Variables  section 18.2.4.1
- GRAPH Blank Node Semantics  section 19.6
- SAMPLE Return Preference  section 18.5.1.4
- Blank Node Labels  sections 5.1.1, 19.6
- Path Translation  section 18.2.2.4
- DataBlockValue Reference  section 18.2.2.6
- DISTINCT and OrderBy  section 18.2.1
- Empty GROUP BY Handling  section 18.2.4
- Aggregate Examples  section 18.5.1
- MIN/MAX Consistency  sections 18.5.1.5,18.5.1.6

## Reference Details
Errata Implementation Patterns
- On grammar corrections, update parser patterns in SPARQL grammar file. Use corrected BNF lines verbatim.
- Enforce IN evaluation once by caching left expression result in evaluation engine.
- In graph pattern translation engine, sort elements by lexical order before processing.
- In filter and join operations, update abstract algebra definitions as specified, ensuring correct parenthesis and spacing.
- For CONCAT, implement overloads: zero-arg returns empty string, one-arg identity, multi-arg using underlying fn:concat.
- Update DELETE DATA footnote links in HTML and PDF outputs to footnote 39.
- In aggregate function implementations, disallow nested calls at parse or compile time, throw syntax error if detected.
- Define error propagation in aggregates: implement MAX error rule and uniform fallback for other functions.
- LeftJoin: replace third clause implementation to use universal check for expr false; merge with Diff component.
- Modify substitute operation in query preprocessor to exclude variables not in outermost projection; track scope levels.
- BIND: ensure Extend and Join combinators generate correct algebra tree as per corrected patterns.
- VALUES: include VALUES-bound variables in substitute variable set; treat inner-scoped names as distinct identifiers.
- Aggregation: wrap inner pattern P in Group(exprlist,P) before evaluation; treat multiset as set for binding merge.
- Diff: treat error in expr evaluation as false; use effective boolean value logic.
- GRAPH: in triple pattern builder, if in WHERE generate variable for blank node; in quad builder generate fresh blank node ID per solution.
- SAMPLE: alter sample function to prefer non-error values; implement error checking in multiset selection.
- Blank Node Labels: implement label reuse rule across patterns; adjust blank node label generator.
- Path Translation: correct sequence translation to produce intermediate variable ?V then link endpoint Y.
- Reference replacement: update DataBlockValue links in developer documentation.
- DISTINCT+OrderBy: modify projection pipeline to maintain ordering when ordering fields not in projection.
- Empty GROUP BY: implement logic to create one empty group with empty value bindings for aggregates.
- Examples: update code samples in documentation with corrected multisets of lists for SUM, Avg, GroupConcat, Sample.
- MIN/MAX: align definitions and examples; update function implementations to reflect consistency.

Troubleshooting Commands
1  Validate corrected grammar: antlr4 -Dlanguage=Java SPARQL.g4 and run test suite
2  Check CONCAT overloads: run unit test concatZeroArg, concatOneArg, concatMultiArg
3  Test PRINT of errata fixes: build documentation and verify footnote links in output.pdf
4  Aggregate nesting error: parse "SELECT (SUM(MAX(?v)) AS ?x) WHERE {...}" should fail
5  LeftJoin behavior: run algebra engine test leftjoin-errata-7


## Information Dense Extract
errata-query-1: ALP Init empty set; errata-query-2: lexical order for GroupGraphPattern; errata-query-3: ObjectListPathNotEmpty paths to ObjectListPath; clarification-query-1: IN LHS single eval; clarification-query-2: link extension in RDFterm-equals; editorial-query-1: add parenthesis in defn_evalGraph; editorial-query-2: Join spacing; errata-query-4: CONCAT()="", CONCAT(X)=X, CONCAT(X1,X2,...)=fn:concat; editorial-query-3: DELETE DATA footnote=39; errata-query-5: no nested aggregates; errata-query-6: errors in aggregates fallback; errata-query-7: LeftJoin third clause universal false; errata-query-7a: Diff combination intact; errata-query-8: substitute scope hide nested vars; errata-query-9: BIND Extend/BGP ordering; errata-query-10: include VALUES vars in substitute; errata-query-11: Aggregation multiset→set, wrap P; errata-query-12: Diff error→false; errata-query-13: filter omit D(G); errata-query-14: define unaggregated variables; errata-query-15: GRAPH blank node variable vs unique ID; errata-query-16: SAMPLE prefer defined; errata-query-17: reuse blank node labels; errata-query-18: seq(P,Q) translate to X P ?V . ?V Q Y; errata-query-19: BindingValue→DataBlockValue; errata-query-20: DISTINCT+OrderBy preserve order; errata-query-21: empty GROUP BY produce one empty group; errata-query-22: aggregate examples use list multisets; errata-query-23: align MIN/MAX definitions

## Sanitised Extract
Table of Contents
1  errata-query-1  Definition of ALP
2  errata-query-2  GroupGraphPattern lexical order
3  errata-query-3  PropertyListPathNotEmpty object lists
4  clarification-query-1  IN evaluation semantics
5  clarification-query-2  RDFterm-equals extension case
6  editorial-query-1  defn_evalGraph parenthesis
7  editorial-query-2  Join spacing fix
8  errata-query-4  CONCAT zero/one-arg definitions
9  editorial-query-3  DELETE DATA footnote link
10 errata-query-5  Aggregates nesting restriction
11 errata-query-6  Aggregate error handling
12 errata-query-7  LeftJoin clause correction
13 errata-query-7a LeftJoin Diff note
14 errata-query-8  Substitute scoping rules
15 errata-query-9  BIND pattern ordering
16 errata-query-10 VALUES in substitute
17 errata-query-11 Aggregation multiset vs set
18 errata-query-12 Diff false-on-error rule
19 errata-query-13 Filter grammar cleanup
20 errata-query-14 'unaggregated variables' definition
21 errata-query-15 GRAPH blank node behavior
22 errata-query-16 SAMPLE defined preference
23 errata-query-17 Blank node label reuse
24 errata-query-18 Path translation sequence fix
25 errata-query-19 BindingValue to DataBlockValue
26 errata-query-20 DISTINCT+OrderBy ordering
27 errata-query-21 EMPTY GROUP BY aggregation
28 errata-query-22 SUM and aggregate example multisets
29 errata-query-23 MIN/MAX consistency issues

Details
errata-query-1
Definition of ALP: V initialized as empty set, not multiset.

errata-query-2
GroupGraphPattern processing: iterate elements in lexical parse order.

errata-query-3
Grammar rule [83] change both ObjectListPathNotEmpty object lists to ObjectListPath.

clarification-query-1
IN operator: evaluate left-hand expression once and reuse result.

clarification-query-2
Section 17.3.1 reference fix: extension case defined below in 17.4.1.7 RDFterm-equals.

editorial-query-1
Add missing right parenthesis to R := Union(R, Join(eval(D(D[i]), P), (?var->i))).

editorial-query-2
Correct Join definition spacing: Join(1, 2) = { merge(1, 2) | 1 in 1 and 2 in 2 ... }.

errata-query-4
Define CONCAT variants: zero args returns '', one arg returns operand, two or more uses fn:concat.

editorial-query-3
DELETE DATA footnote must refer to DELETE DATA rule (footnote 39), not DELETE WHERE.

errata-query-5
Disallow nesting aggregate functions inside other aggregates; enforce at parse time.

errata-query-6
MAX and other aggregates with errors: specify fallback to same result handling for different functions.

errata-query-7
LeftJoin expansion third clause: universal quantification when expr false.

errata-query-7a
Second and third clauses form Diff; leave Filter(expr, Join)  Diff unaffected.

errata-query-8
Substitute operation: exclude variables not visible at outermost graph pattern.

errata-query-9
BIND example ordering: use Extend and Join forms as specified.

errata-query-10
Substitute must handle VALUES-bound variables and inner scope variables correctly.

errata-query-11
Aggregation definition replace multiset with set and wrap P in Group(exprlist,P).

errata-query-12
Diff treats error-evaluating expressions as false.

errata-query-13
Filter definition omit extraneous D(G) parameter.

errata-query-14
Define term 'unaggregated variables' or reword usage in section 18.2.4.1.

errata-query-15
GRAPH blank node handling: in WHERE treat as variable, in quad block generate unique per-solution labels.

errata-query-16
SAMPLE: SHOULD select defined value over undef if errors in choice multiset.

errata-query-17
Blank node label reuse rule applies across property paths and triple patterns.

errata-query-18
Sequence path translation: X seq(P, Q) Y -> X P ?V . ?V Q Y.

errata-query-19
Section 18.2.2.6: use DataBlockValue instead of BindingValue and link appropriately.

errata-query-20
DISTINCT and projection must preserve ordering from OrderBy even when ordering variables not projected.

errata-query-21
Aggregate with no GROUP BY and no matches: implement empty result set group handling as zero-row group.

errata-query-22
SUM, Avg, GroupConcat, Sample argument examples must use multisets of lists; update examples accordingly.

errata-query-23
Ensure consistency of MIN and MAX definitions between subsections 18.5.1.5 and 18.5.1.6.

## Original Source
SPARQL 1.1: Query, Protocol, Update, and Graph Store HTTP
https://www.w3.org/TR/sparql11-http-rdf-update/

## Digest of SPARQL_ERRATA

# SPARQL 1.1 HTTP and Update Errata
Retrieved: 2024-06-05

# errata-query-1  Definition of ALP
Original: Let V = empty multiset  
Correction: Let V = empty set

# errata-query-2  GroupGraphPattern lexical order
Original: For each element E in the GroupGraphPattern  
Correction: Elements are processed in lexical (parse) order

# errata-query-3  PropertyListPathNotEmpty object lists
Original: both object lists uses should be ObjectListPath  
Correction: Change both instances to ObjectListPath

# clarification-query-1  IN evaluation semantics
Original: no note on repeated evaluation  
Correction: Left-hand side of IN is evaluated once only

# clarification-query-2  Extension case in RDFterm-equals
Original: ambiguity in "defined above" reference  
Correction: Note extension case in 17.4.1.7 (RDFterm-equals)

# editorial-query-1  Missing parenthesis in defn_evalGraph
Original: R := Union(R, Join( eval(D(D[i]), P) , Ω(?var->i) )  
Correction: Add missing right parenthesis after Ω(?var->i)

# editorial-query-2  Join notation spacing
Original: Join(Ω1, Ω2) = { merge(μ1, μ2) | μ1 in Ω1and μ2 in Ω2 ... }
Correction: Insert space: Ω1 and Ω2

# errata-query-4  CONCAT zero and one-arg handling
Suggested fix: 
  CONCAT() = ""  
  CONCAT(X) = X  
  CONCAT(X1, X2, ...) = fn:concat(X1, X2, ...)

# editorial-query-3  DELETE DATA footnote link
Original: Footnote 40 links DELETE DATA to DELETE WHERE  
Correction: Link to footnote 39

# errata-query-5  Aggregates inside aggregates
Addition: Note that aggregate functions are not allowed inside other aggregate functions

# errata-query-6  Error handling in aggregates
Clarification: Define error behavior for MAX and other aggregates on error in expression

# errata-query-7  LeftJoin explanatory expansion
Original third clause error  
Correction: Use universal quantification: ∀ μ2 compatible and expr false

# errata-query-7a Further LeftJoin note
Note: second and third clauses combine to Diff; definitions unaffected

# errata-query-8  Substitute scoping
Correction: Exclude variables not visible at outermost level in nested patterns

# errata-query-9  BIND example position
Correct pattern: Extend(BGP(?s :p ?v), ?v2, 2*?v)  
Alternate Join pattern: Join(Extend({}, ?v2, 2*?v), BGP(?s :p ?v))

# errata-query-10  VALUES binding in substitute
Correction: substitute must consider variables from VALUES and inner scoped variables

# errata-query-11  Aggregation multiset vs set
Correction: Replace multiset by set in Definition of Aggregation; P replaced by Group(exprlist,P)

# errata-query-12  Diff error evaluation
Clarification: Expressions evaluating with error are considered false

# errata-query-13  Filter grammar simplification
Correction: Remove ", D(G)" from filter definition

# errata-query-14  "unaggregated variables" terminology
Note: Provide precise definition or reword section 18.2.4.1

# errata-query-15  GRAPH and blank nodes
WHERE clause: blank nodes treated as variables  
Quad block: blank nodes generate per-solution unique blank nodes

# errata-query-16  SAMPLE return value
Suggestion: SAMPLE SHOULD return defined value in preference to undef when error present

# errata-query-17  Blank node label reuse
Allow reuse of the same label across property paths and triple patterns

# editorial-query-4 Duplicate equivalence typo
Correction: "equivalence to graph patterns"

# clarification-query-3 "equivalent literals" defined
Clarification: same as literal equality in RDF Concepts; example distinguishes same-value vs same-term

# errata-query-18  Path translation correction
Original: ?V Q P  
Correction: ?V Q Y in seq(P,Q)

# errata-query-19  BindingValue terminology
Correction: Use and link DataBlockValue instead of BindingValue in section 18.2.2.6

# errata-query-20  DISTINCT and OrderBy ordering
Clarify: DISTINCT and project must preserve OrderBy when ordering based on non-projection variables

# errata-query-21  Aggregation with empty GROUP BY
Note: Problem when no GROUP BY and no matches; implementers should treat as zero-row group with empty multiset

# errata-query-22  SUM, Avg, GroupConcat, Sample examples
Correction: Use multiset of lists for Sum arguments; similar fixes for other aggregates

# errata-query-23  MIN vs MAX inconsistency
Note: Align example consistency between subsections 18.5.1.5 and 18.5.1.6

## Attribution
- Source: SPARQL 1.1: Query, Protocol, Update, and Graph Store HTTP
- URL: https://www.w3.org/TR/sparql11-http-rdf-update/
- License: License
- Crawl Date: 2025-04-27T03:08:27.924Z
- Data Size: 30460892 bytes
- Links Found: 49907

## Retrieved
2025-04-27
