# SHACL_CONSTRAINTS

## Crawl Summary
Value Type Constraints: sh:class, sh:datatype, sh:nodeKind with ranges and semantics; Cardinality: sh:minCount (default 0), sh:maxCount (unbounded); Value Range: sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive over numeric/date literals; String-based: sh:minLength, sh:maxLength, sh:pattern (regex), sh:languageIn (list), sh:uniqueLang (boolean); Property Pair: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals comparing two paths; Logical: sh:not (single shape), sh:and/or/xone (list of shapes); Shape-based: sh:node (nested node shape), sh:property (nested property shape), qualified shapes with counts; Other: sh:closed (boolean, enforces closed shapes), sh:ignoredProperties (list), sh:hasValue, sh:in (list)

## Normalised Extract
Table of Contents:
1. Value Type Constraint Components
2. Cardinality Constraint Components
3. Value Range Constraint Components
4. String-based Constraint Components
5. Property Pair Constraint Components
6. Logical Constraint Components
7. Shape-based Constraint Components
8. Other Constraint Components

1. Value Type Constraint Components
  - sh:class: IRI of RDF Class. Applies on each value node. FocusNode conforms if for each value v, triple (v rdf:type Class) exists or inferred via rdfs:subClassOf.
  - sh:datatype: IRI of XSD datatype. Each value must be literal with this datatype.
  - sh:nodeKind: IRI. Allowed values: sh:IRI, sh:Literal, sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral. Each value node tested against chosen kind.

2. Cardinality Constraint Components
  - sh:minCount: integer >=0. Count of values for path must be >= minCount.
  - sh:maxCount: integer >=0. Count of values for path must be <= maxCount.

3. Value Range Constraint Components
  - sh:minExclusive: literal comparable. All values > minExclusive.
  - sh:minInclusive: literal comparable. All values >= minInclusive.
  - sh:maxExclusive: literal comparable. All values < maxExclusive.
  - sh:maxInclusive: literal comparable. All values <= maxInclusive.

4. String-based Constraint Components
  - sh:minLength: integer >=0. String length >= minLength.
  - sh:maxLength: integer >=0. String length <= maxLength.
  - sh:pattern: string regex. Literal lexical form matches pattern (full match).
  - sh:languageIn: list of language tags. Literal language tag in list.
  - sh:uniqueLang: boolean. If true, no duplicate language tags across values.

5. Property Pair Constraint Components
  - sh:equals: path. Value set of path1 equals set of values of path2.
  - sh:disjoint: path. Intersection of values empty.
  - sh:lessThan: path. Max(value1) < Min(value2).
  - sh:lessThanOrEquals: path. Max(value1) <= Min(value2).

6. Logical Constraint Components
  - sh:not: single Shape. FocusNode must not conform to shape.
  - sh:and: list of Shapes. FocusNode must conform to all shapes.
  - sh:or: list of Shapes. FocusNode must conform to at least one.
  - sh:xone: list of Shapes. Exactly one shape must conform.

7. Shape-based Constraint Components
  - sh:node: NodeShape. Each value node validated against NodeShape.
  - sh:property: PropertyShape. Each value node validated against nested PropertyShape.
  - sh:qualifiedValueShape: Shape + integer qMin+qMax. Count of values conforming to shape controlled by qMin,qMax.

8. Other Constraint Components
  - sh:closed: boolean. If true, every property of focus node must be declared by shapes or ignoredProperties.
  - sh:ignoredProperties: list of predicates. Excluded from closed constraint.
  - sh:hasValue: resource or literal. Path must include this exact value.
  - sh:in: list of resources/literals. Path values subset of list.


## Supplementary Details
Implementation Steps to Apply Constraint Components:
1. Include SHACL namespace prefix: PREFIX sh: <http://www.w3.org/ns/shacl#>
2. Define a shapes graph as RDF dataset in Turtle or JSON-LD.
3. For each focus class or node, create a sh:NodeShape with sh:targetClass or sh:targetNode.
4. Within NodeShape, add one or more sh:property triples pointing to a blank node of type sh:PropertyShape.
5. On each PropertyShape, add one or more constraint parameter triples: sh:datatype , sh:minCount , etc.
6. Optionally set common parameters on NodeShape: sh:severity (sh:Violation, sh:Warning, sh:Info), sh:message (xsd:string).
7. Execute SHACL validation engine (e.g., TopBraid SHACL API or JavaScript SHACL library) pointing to data graph and shapes graph.
8. Inspect validation report: triples of type sh:ValidationReport and sh:ValidationResult.

Configuration Options:
- sh:severity: Allowed values: sh:Violation, sh:Warning, sh:Info. Default: sh:Violation.
- sh:deactivated: boolean. When true, shape ignored during validation. Default: false.

Best Practices:
- Group related constraints in one PropertyShape to reduce traversal.
- Use sh:closed with sh:ignoredProperties to enforce schema completeness.
- Set sh:message with placeholders: Literal with '''{{path}}''' to include path IRI in error.

Detailed Troubleshooting:
Command to detect ill-formed shapes: Run SPARQL query against shapes graph:

SELECT ?shape ?p ?o WHERE {
  { ?shape a sh:PropertyShape ; sh:minCount ?m . FILTER(?m < 0) }
  UNION
  { ?shape a sh:PropertyShape ; sh:maxCount ?M . FILTER(?M < 0) }
}
Expected Output: No rows. Rows indicate invalid negative cardinality.


## Reference Details
Example Turtle Shape Definition:

@prefix ex: <http://example.com/ns#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:PersonShape
  a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:severity sh:Violation ;
  sh:message "Property violation on path {path}: {value}" ;
  sh:closed true ;
  sh:ignoredProperties ( rdf:type ) ;
  sh:property [
    sh:path ex:ssn ;
    sh:datatype xsd:string ;
    sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$" ;
    sh:maxCount 1 ;
  ] , [
    sh:path ex:worksFor ;
    sh:node ex:CompanyShape ;
    sh:minCount 1 ;
  ] .

ex:CompanyShape
  a sh:NodeShape ;
  sh:property [
    sh:path rdf:type ;
    sh:equals ex:Company ;
    sh:minCount 1 ;
  ] .

Validation Invocation (JavaScript using "@zazuko/shacl-js"):

import { SHACLValidator } from '@zazuko/shacl-js';
import rdf from 'rdf-ext';

const dataGraph = rdf.dataset().import(rdf.parsers['text/turtle'].parse(dataTurtle));
const shapesGraph = rdf.dataset().import(rdf.parsers['text/turtle'].parse(shapesTurtle));

const validator = new SHACLValidator(shapesGraph, { factory: rdf });
const report = await validator.validate(dataGraph);
if (!report.conforms) {
  report.results.forEach(result => {
    console.error(`Severity: ${result.severity.value}`);
    console.error(`FocusNode: ${result.focusNode.value}`);
    console.error(`Path: ${result.path.value}`);
    console.error(`Message: ${result.message.value}`);
  });
}

Return Types:
- ValidationReport: { conforms: boolean, results: ValidationResult[] }
- ValidationResult: { focusNode: NamedNode, path: NamedNode, value: Term, sourceShape: NamedNode, message: Literal, severity: NamedNode }

Step-by-step Pattern:
1. Load graphs.
2. Initialize validator with shapesGraph.
3. Call validate(dataGraph).
4. Check report.conforms.
5. Iterate report.results for details.

Common Configuration Options for '@zazuko/shacl-js':
- factory: RDFJS DataFactory instance.
- maxErrors: integer to stop after N errors. Default: Infinity.
- debug: boolean to log internal SPARQL queries. Default: false.

Best Practice Code Patterns:
- Reuse SHACLValidator instance for multiple data graphs when shapesGraph unchanged.
- Pre-compile SPARQL queries by setting debug=true and caching query objects.

Troubleshooting Commands:
- Use Docker SHACL CLI:
  docker run --rm -v $(pwd):/data eclipse/shacl-cli validate -sh /data/shapes.ttl -data /data/data.ttl
Expected: report.ttl generated with sh:conforms value.


## Information Dense Extract
sh:class IRI, sh:datatype IRI, sh:nodeKind {IRI,Literal,BlankNode,BlankNodeOrIRI,BlankNodeOrLiteral,IRIOrLiteral}; sh:minCount integer>=0 default 0, sh:maxCount integer>=0 unbounded; sh:minExclusive,minInclusive,maxExclusive,maxInclusive literals numeric/date; sh:minLength,maxLength integer>=0; sh:pattern regex; sh:languageIn list(langTags); sh:uniqueLang boolean; sh:equals,disjoint,lessThan,lessThanOrEquals path comparisons; sh:not shape, sh:and|or|xone list(shapes); sh:node NodeShape nested, sh:property PropertyShape nested, sh:qualifiedValueShape Shape+int qualifiers; sh:closed boolean, sh:ignoredProperties list(predicates), sh:hasValue resource, sh:in list(values).

## Sanitised Extract
Table of Contents:
1. Value Type Constraint Components
2. Cardinality Constraint Components
3. Value Range Constraint Components
4. String-based Constraint Components
5. Property Pair Constraint Components
6. Logical Constraint Components
7. Shape-based Constraint Components
8. Other Constraint Components

1. Value Type Constraint Components
  - sh:class: IRI of RDF Class. Applies on each value node. FocusNode conforms if for each value v, triple (v rdf:type Class) exists or inferred via rdfs:subClassOf.
  - sh:datatype: IRI of XSD datatype. Each value must be literal with this datatype.
  - sh:nodeKind: IRI. Allowed values: sh:IRI, sh:Literal, sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral. Each value node tested against chosen kind.

2. Cardinality Constraint Components
  - sh:minCount: integer >=0. Count of values for path must be >= minCount.
  - sh:maxCount: integer >=0. Count of values for path must be <= maxCount.

3. Value Range Constraint Components
  - sh:minExclusive: literal comparable. All values > minExclusive.
  - sh:minInclusive: literal comparable. All values >= minInclusive.
  - sh:maxExclusive: literal comparable. All values < maxExclusive.
  - sh:maxInclusive: literal comparable. All values <= maxInclusive.

4. String-based Constraint Components
  - sh:minLength: integer >=0. String length >= minLength.
  - sh:maxLength: integer >=0. String length <= maxLength.
  - sh:pattern: string regex. Literal lexical form matches pattern (full match).
  - sh:languageIn: list of language tags. Literal language tag in list.
  - sh:uniqueLang: boolean. If true, no duplicate language tags across values.

5. Property Pair Constraint Components
  - sh:equals: path. Value set of path1 equals set of values of path2.
  - sh:disjoint: path. Intersection of values empty.
  - sh:lessThan: path. Max(value1) < Min(value2).
  - sh:lessThanOrEquals: path. Max(value1) <= Min(value2).

6. Logical Constraint Components
  - sh:not: single Shape. FocusNode must not conform to shape.
  - sh:and: list of Shapes. FocusNode must conform to all shapes.
  - sh:or: list of Shapes. FocusNode must conform to at least one.
  - sh:xone: list of Shapes. Exactly one shape must conform.

7. Shape-based Constraint Components
  - sh:node: NodeShape. Each value node validated against NodeShape.
  - sh:property: PropertyShape. Each value node validated against nested PropertyShape.
  - sh:qualifiedValueShape: Shape + integer qMin+qMax. Count of values conforming to shape controlled by qMin,qMax.

8. Other Constraint Components
  - sh:closed: boolean. If true, every property of focus node must be declared by shapes or ignoredProperties.
  - sh:ignoredProperties: list of predicates. Excluded from closed constraint.
  - sh:hasValue: resource or literal. Path must include this exact value.
  - sh:in: list of resources/literals. Path values subset of list.

## Original Source
W3C Shapes Constraint Language (SHACL)
https://www.w3.org/TR/shacl/

## Digest of SHACL_CONSTRAINTS

# SHACL Core Constraint Components

## Value Type Constraint Components

### sh:class
- Predicate: http://www.w3.org/ns/shacl#class
- Range: rdfs:Resource (IRI)
- Cardinality: 0..1 per PropertyShape
- Semantics: each value of the path must be an instance of the given RDF class

### sh:datatype
- Predicate: http://www.w3.org/ns/shacl#datatype
- Range: rdfs:Datatype (IRI)
- Cardinality: 0..1 per PropertyShape
- Semantics: each value of the path must be a literal of the given datatype

### sh:nodeKind
- Predicate: http://www.w3.org/ns/shacl#nodeKind
- Range: IRI with allowed values {sh:IRI, sh:Literal, sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral}
- Cardinality: 0..1 per PropertyShape
- Semantics: restricts the kind of node (IRI, literal, blank node) allowed as values

## Cardinality Constraint Components

### sh:minCount
- Predicate: http://www.w3.org/ns/shacl#minCount
- Range: xsd:integer
- Cardinality: 0..1 per PropertyShape
- Default: 0
- Semantics: minimum number of values for the property path

### sh:maxCount
- Predicate: http://www.w3.org/ns/shacl#maxCount
- Range: xsd:integer
- Cardinality: 0..1 per PropertyShape
- Default: unbounded
- Semantics: maximum number of values for the property path

## Value Range Constraint Components

### sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive
- Predicates: http://www.w3.org/ns/shacl#minExclusive, etc.
- Range: xsd:literal comparables (numbers, dates)
- Cardinality: 0..1 each per PropertyShape
- Semantics: enforces numeric/date bounds on literal values

## String-based Constraint Components

### sh:minLength, sh:maxLength
- Range: xsd:integer
- Semantics: minimum/maximum string length

### sh:pattern
- Range: xsd:string (regular expression)
- Semantics: JavaScript-style regex for literal values

### sh:languageIn
- Range: rdf:List of language tags
- Semantics: restrict literal language tags

### sh:uniqueLang
- Range: xsd:boolean
- Semantics: enforces uniqueness of language-tagged string values

## Property Pair Constraint Components

### sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals
- Range: rdf:Resource (IRI or Literal)
- Cardinality: 0..1 each per PropertyShape
- Semantics: compares values of two paths on same focus node

## Logical Constraint Components

### sh:not, sh:and, sh:or, sh:xone
- Range: sh:Shape or rdf:List of sh:Shape
- Semantics: combines shapes with logical operators

## Shape-based Constraint Components

### sh:node
- Range: sh:NodeShape
- Semantics: nested validation; each value must conform to given node shape

### sh:property
- Range: sh:PropertyShape
- Cardinality: multiple
- Semantics: nested property shapes applied to values

### sh:qualifiedValueShape, sh:qualifiedMinCount, sh:qualifiedMaxCount
- Range: sh:Shape and xsd:integer
- Semantics: qualified (sh:node, sh:property) with count constraints

## Other Constraint Components

### sh:closed, sh:ignoredProperties
- sh:closed: xsd:boolean, enforces no extra properties except those in shapes or ignored list
- sh:ignoredProperties: rdf:List of predicates to be ignored when closed

### sh:hasValue
- Range: rdf:Resource (IRI or Literal)
- Semantics: requires that a specific value appears for the path

### sh:in
- Range: rdf:List of rdf:Resource
- Semantics: allows values only from a given list


## Attribution
- Source: W3C Shapes Constraint Language (SHACL)
- URL: https://www.w3.org/TR/shacl/
- License: License
- Crawl Date: 2025-04-27T01:08:27.598Z
- Data Size: 26167390 bytes
- Links Found: 206960

## Retrieved
2025-04-27
