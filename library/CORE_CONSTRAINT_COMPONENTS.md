# CORE_CONSTRAINT_COMPONENTS

## Crawl Summary
Value Type: class, datatype, nodeKind; Cardinality: minCount, maxCount; Range: minExclusive, minInclusive, maxExclusive, maxInclusive; String: minLength, maxLength, pattern, languageIn, uniqueLang; Pair: equals, disjoint, lessThan, lessThanOrEquals; Logic: not, and, or, xone; Shape-based: node, property, qualifiedValueShape, qualifiedMinCount, qualifiedMaxCount; Other: closed, ignoredProperties, hasValue, in; ValidationReport and ValidationResult structures.

## Normalised Extract
Contents:
1  Value Type Components
2  Cardinality Components
3  Value Range Components
4  String Components
5  Property Pair Components
6  Logical Components
7  Shape-based Components
8  Other Components
9  Validation Report Structures

1  Value Type Components
sh:class  IRI of required class  cardinality 0..1
sh:datatype  IRI of XSD datatype  cardinality 0..1
sh:nodeKind  sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI  cardinality 0..1

2  Cardinality Components
sh:minCount  xsd:integer ≥0  cardinality 0..1
sh:maxCount  xsd:integer ≥0  cardinality 0..1

3  Value Range Components
sh:minExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:minInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1

4  String Components
sh:minLength  xsd:integer ≥0  cardinality 0..1
sh:maxLength  xsd:integer ≥0  cardinality 0..1
sh:pattern  xsd:string  regex anchored  cardinality 0..1
sh:languageIn  RDF list of BCP47  cardinality 0..1
sh:uniqueLang  xsd:boolean  cardinality 0..1

5  Property Pair Components
sh:equals|sh:disjoint|sh:lessThan|sh:lessThanOrEquals  IRI of property  cardinality 0..1 each

6  Logical Components
sh:not  IRI of sh:Shape  cardinality 0..1
sh:and|sh:or|sh:xone  RDF list of sh:Shape  cardinality 0..1 each

7  Shape-based Components
sh:node  IRI of NodeShape  cardinality 0..1
sh:property  IRI of PropertyShape  cardinality 0..1
sh:qualifiedValueShape  IRI of NodeShape  cardinality 0..1
sh:qualifiedMinCount|sh:qualifiedMaxCount  xsd:integer  cardinality 0..1 each

8  Other Components
sh:closed  xsd:boolean  cardinality 0..1
sh:ignoredProperties  RDF list of IRIs  cardinality 0..1
sh:hasValue  RDF term  cardinality 0..1
sh:in  RDF list of RDF terms  cardinality 0..1

9  Validation Report Structures
sh:ValidationReport  sh:conforms xsd:boolean; sh:result rdf:List of sh:ValidationResult
sh:ValidationResult  sh:focusNode; sh:resultPath; sh:value; sh:sourceShape; sh:sourceConstraintComponent; sh:detail; sh:resultMessage; sh:resultSeverity

## Supplementary Details
Implementation Steps:
1  Include SHACL vocabulary prefix: @prefix sh: <http://www.w3.org/ns/shacl#> .
2  Define NodeShape:
   ex:PersonShape a sh:NodeShape;
       sh:targetClass ex:Person;
       sh:property [ sh:path ex:ssn; sh:datatype xsd:string; sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$"; sh:maxCount 1 ];
       sh:property [ sh:path ex:worksFor; sh:class ex:Company; sh:minCount 0 ];
       sh:closed true; sh:ignoredProperties ( rdf:type ) .
3  Validate using CLI:
   shacl validate --data data.ttl --shapes shapes.ttl --output report.ttl
4  Interpret report.ttl: check sh:conforms false and iterate sh:result members.
Configuration Options:
- --fail-fast boolean default false abort on first violation
- --entailments none|rdfs|owl default none
- --output-format turtle|json|rdfxml default turtle

## Reference Details
Turtle Vocabulary:
Prefix bindings:
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix sh: <http://www.w3.org/ns/shacl#>

Shape Declaration Pattern:
NodeShape:
  ex:ShapeIRI a sh:NodeShape;
    sh:targetClass ex:SomeClass;
    [ sh:path ex:prop; sh:datatype xsd:string; sh:minCount 1; sh:maxCount 1 ] ;
    sh:closed true;
    sh:ignoredProperties ( rdf:type );
    sh:message "Custom message"@en .

Best Practices:
- Combine datatype and pattern for strict lexical forms.
- Use sh:closed and sh:ignoredProperties to enforce closed-world.
- Group related constraints in one property shape.

Troubleshooting:
Command: shacl validate --data bad-data.ttl --shapes shapes.ttl
Expected output: report.ttl containing sh:ValidationResult with sh:resultMessage describing violation.
If CLI exits code 0 but report sh:conforms true inspect debug with --log-level debug

Java API Example (TopBraid SHACL):
  Shapes shapes = Shapes.parse(new FileInputStream("shapes.ttl"), RDFFormat.TURTLE);
  Model data = Rio.parse(new FileInputStream("data.ttl"), "", RDFFormat.TURTLE);
  ValidationReport report = ShaclValidator.get().validate(shapes.getGraph(), data.getGraph());
  report.getEntries().forEach(e -> System.out.println(e.message()));

## Information Dense Extract
sh:class IRI; sh:datatype IRI; sh:nodeKind IRI; sh:minCount integer≥0; sh:maxCount integer≥0; sh:minExclusive|Inclusive|maxExclusive|Inclusive decimal|dateTime|string; sh:minLength|maxLength integer≥0; sh:pattern string regex; sh:languageIn list(tags); sh:uniqueLang boolean; sh:equals|disjoint|lessThan|lessThanOrEquals propertyIRI; sh:not shapeIRI; sh:and|or|xone list(shapeIRI); sh:node shapeIRI; sh:property propShapeIRI; sh:qualifiedValueShape shapeIRI; sh:qualifiedMinCount|MaxCount integer; sh:closed boolean; sh:ignoredProperties list(propIRI); sh:hasValue term; sh:in list(term); ValidationReport: sh:conforms boolean; sh:result list(ValidationResult); ValidationResult: focusNode; resultPath; value; sourceShape; sourceConstraintComponent; detail; resultMessage; resultSeverity; CLI: shacl validate --data data.ttl --shapes shapes.ttl --output report.ttl --fail-fast false --entailments none --output-format turtle; Java: Shapes.parse(...); ShaclValidator.get().validate(...).

## Sanitised Extract
Contents:
1  Value Type Components
2  Cardinality Components
3  Value Range Components
4  String Components
5  Property Pair Components
6  Logical Components
7  Shape-based Components
8  Other Components
9  Validation Report Structures

1  Value Type Components
sh:class  IRI of required class  cardinality 0..1
sh:datatype  IRI of XSD datatype  cardinality 0..1
sh:nodeKind  sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI  cardinality 0..1

2  Cardinality Components
sh:minCount  xsd:integer 0  cardinality 0..1
sh:maxCount  xsd:integer 0  cardinality 0..1

3  Value Range Components
sh:minExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:minInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1

4  String Components
sh:minLength  xsd:integer 0  cardinality 0..1
sh:maxLength  xsd:integer 0  cardinality 0..1
sh:pattern  xsd:string  regex anchored  cardinality 0..1
sh:languageIn  RDF list of BCP47  cardinality 0..1
sh:uniqueLang  xsd:boolean  cardinality 0..1

5  Property Pair Components
sh:equals|sh:disjoint|sh:lessThan|sh:lessThanOrEquals  IRI of property  cardinality 0..1 each

6  Logical Components
sh:not  IRI of sh:Shape  cardinality 0..1
sh:and|sh:or|sh:xone  RDF list of sh:Shape  cardinality 0..1 each

7  Shape-based Components
sh:node  IRI of NodeShape  cardinality 0..1
sh:property  IRI of PropertyShape  cardinality 0..1
sh:qualifiedValueShape  IRI of NodeShape  cardinality 0..1
sh:qualifiedMinCount|sh:qualifiedMaxCount  xsd:integer  cardinality 0..1 each

8  Other Components
sh:closed  xsd:boolean  cardinality 0..1
sh:ignoredProperties  RDF list of IRIs  cardinality 0..1
sh:hasValue  RDF term  cardinality 0..1
sh:in  RDF list of RDF terms  cardinality 0..1

9  Validation Report Structures
sh:ValidationReport  sh:conforms xsd:boolean; sh:result rdf:List of sh:ValidationResult
sh:ValidationResult  sh:focusNode; sh:resultPath; sh:value; sh:sourceShape; sh:sourceConstraintComponent; sh:detail; sh:resultMessage; sh:resultSeverity

## Original Source
RDF Graph Shape Validation Standards: SHACL & ShEx
https://www.w3.org/TR/shacl/

## Digest of CORE_CONSTRAINT_COMPONENTS

# Core Constraint Components

## 4.1 Value Type Constraint Components

- sh:class: IRI of required RDF class. Specifies allowed rdf:type values.
- sh:datatype: IRI of XML Schema datatype. Restricts literal value type.
- sh:nodeKind: IRI one of sh:IRI, sh:BlankNode, sh:Literal or sh:BlankNodeOrIRI. Specifies term kind.

## 4.2 Cardinality Constraint Components

- sh:minCount: xsd:integer ≥0. Minimum number of values.
- sh:maxCount: xsd:integer ≥0. Maximum number of values.

## 4.3 Value Range Constraint Components

- sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive: xsd:decimal, xsd:dateTime or xsd:string. Restrict numeric, date, or lexical ordering.

## 4.4 String-based Constraint Components

- sh:minLength, sh:maxLength: xsd:integer ≥0. Minimum or maximum string length.
- sh:pattern: xsd:string Regular expression anchored against lexical form.
- sh:languageIn: RDF list of BCP47 language tags.
- sh:uniqueLang: xsd:boolean true to enforce unique language tags.

## 4.5 Property Pair Constraint Components

- sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals: IRI of property. Compare values across properties.

## 4.6 Logical Constraint Components

- sh:not: sh:Shape. Negate shape.
- sh:and, sh:or: RDF list of sh:Shape. Logical conjunction or disjunction.
- sh:xone: RDF list of sh:Shape. Exactly one must validate.

## 4.7 Shape-based Constraint Components

- sh:node: IRI of NodeShape. Validates nodes against nested shape.
- sh:property: IRI of PropertyShape. Validates value nodes.
- sh:qualifiedValueShape: IRI of NodeShape; sh:qualifiedMinCount, sh:qualifiedMaxCount: xsd:integer.

## 4.8 Other Constraint Components

- sh:closed: xsd:boolean; sh:ignoredProperties: RDF list of IRIs. Prevent extra properties.
- sh:hasValue: RDF term. Require specific value.
- sh:in: RDF list of RDF terms. Enumerated allowed values.

# Validation Report Elements

- sh:ValidationReport: parameters sh:conforms xsd:boolean, sh:result rdf:List of sh:ValidationResult.
- sh:ValidationResult: parameters sh:focusNode IRI or literal, sh:resultPath IRI, sh:value RDF term, sh:sourceShape IRI, sh:sourceConstraintComponent IRI, sh:detail RDF list, sh:resultMessage rdf:langString, sh:resultSeverity sh:Severity.

## Attribution
- Source: RDF Graph Shape Validation Standards: SHACL & ShEx
- URL: https://www.w3.org/TR/shacl/
- License: License if known
- Crawl Date: 2025-04-29T19:49:24.742Z
- Data Size: 23040670 bytes
- Links Found: 182866

## Retrieved
2025-04-29
