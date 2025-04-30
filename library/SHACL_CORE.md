# SHACL_CORE

## Crawl Summary
4.1: sh:class requires class IRI; sh:datatype expects xsd datatype; sh:nodeKind limits node type. 4.2: sh:minCount and sh:maxCount enforce occurrence counts. 4.3: sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive define literal-based range checks. 4.4: sh:minLength, sh:maxLength control string lengths; sh:pattern enforces regex; sh:languageIn and sh:uniqueLang restrict language tags. 4.5: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals express cross-property comparisons. 4.6: sh:not, sh:and, sh:or, sh:xone enable boolean combination of shapes. 4.7: sh:node, sh:property apply nested shapes; qualifiedValueShape with qualifiedMinCount and qualifiedMaxCount enforce counted shapes. 4.8: sh:closed locks additional properties; sh:ignoredProperties exempts properties; sh:hasValue and sh:in restrict allowed values.

## Normalised Extract
Table of Contents
1 Value Type Constraint Components
2 Cardinality Constraint Components
3 Value Range Constraint Components
4 String-based Constraint Components
5 Property Pair Constraint Components
6 Logical Constraint Components
7 Shape-based Constraint Components
8 Other Constraint Components

1 Value Type Constraint Components
sh:class: IRI of class; single or multiple; enforces RDF type membership.
sh:datatype: IRI of xsd datatype; single; enforces literal datatype.
sh:nodeKind: IRI from {sh:BlankNode, sh:IRI, sh:Literal, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral}; single.

2 Cardinality Constraint Components
sh:minCount: integer ≥ 0; default 0; enforces at least n occurrences.
sh:maxCount: integer ≥ 0; no default; enforces at most n occurrences.

3 Value Range Constraint Components
sh:minExclusive: literal; focus values > literal.
sh:minInclusive: literal; focus values ≥ literal.
sh:maxExclusive: literal; focus values < literal.
sh:maxInclusive: literal; focus values ≤ literal.

4 String-based Constraint Components
sh:minLength: integer ≥ 0; enforces minimum string length.
sh:maxLength: integer ≥ 0; enforces maximum string length.
sh:pattern: regex string; SPARQL regex syntax; must match at least one substring.
sh:languageIn: List of xsd:languageTag strings; literal language tag must be in list.
sh:uniqueLang: boolean; if true, each language tag appears at most once.

5 Property Pair Constraint Components
sh:equals: property IRI; values equal to values of this property on same focus node.
sh:disjoint: property IRI; values disjoint from values of this property.
sh:lessThan: property IRI; value < values of this property.
sh:lessThanOrEquals: property IRI; value ≤ values.

6 Logical Constraint Components
sh:not: shape IRI; focus nodes must not conform.
sh:and: List of shape IRIs; must conform to all.
sh:or: List of shape IRIs; must conform to at least one.
sh:xone: List of shape IRIs; must conform to exactly one.

7 Shape-based Constraint Components
sh:node: NodeShape IRI; nested node shape.
sh:property: PropertyShape IRI; nested property shape.
sh:qualifiedValueShape: Shape IRI; shape for counted values.
sh:qualifiedMinCount: integer ≥ 0; min count.
sh:qualifiedMaxCount: integer ≥ 0; max count.

8 Other Constraint Components
sh:closed: boolean; default false; if true, no extra properties allowed.
sh:ignoredProperties: List of property IRIs; exempt from closed.
sh:hasValue: RDF term; value must equal this.
sh:in: List of RDF terms; value must be one of these.

## Supplementary Details
Prerequisites
Define prefix bindings:
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX ex: <http://example.com/ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

Implementation Steps
1 Create a Shapes Graph in Turtle
   - Use sh:NodeShape and sh:PropertyShape classes
   - Declare sh:targetClass or sh:targetNode on node shapes
   - Inside node shape, add sh:property statements linking to blank-node property shapes
2 Define Property Shapes
   - Use sh:path to identify property IRI
   - Apply constraint parameters (sh:datatype, sh:maxCount, sh:pattern, etc.)
3 Validate Data Graph
   - Load data graph and shapes graph into SHACL engine
   - Call validation API: validate(dataGraph, shapesGraph, options)
4 Handle Validation Report
   - Check sh:conforms boolean
   - Inspect sh:ValidationResult entries for sh:focusNode, sh:resultPath, sh:resultMessage

Configuration Options
--infer  : boolean default false : apply RDFS entailment
--debug  : boolean default false : log SPARQL queries
--results-format : text|ttl|json default text


## Reference Details
Example Shapes Graph in Turtle

ex:PersonShape a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:closed true ;
  sh:ignoredProperties ( rdf:type ) ;
  sh:property [
    a sh:PropertyShape ;
    sh:path ex:ssn ;
    sh:datatype xsd:string ;
    sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$" ;
    sh:maxCount 1 ;
  ] ;
  sh:property [
    a sh:PropertyShape ;
    sh:path ex:worksFor ;
    sh:nodeKind sh:IRI ;
    sh:class ex:Company ;
  ] .

Python pySHACL Validation Example

from pyshacl import validate
import rdflib

graph = rdflib.Graph()
graph.parse('data.ttl', format='turtle')
shapes = rdflib.Graph()
shapes.parse('shapes.ttl', format='turtle')

conforms, report_graph, report_text = validate(
    data_graph=graph,
    shacl_graph=shapes,
    inference='rdfs',
    debug=False,
    serialize_report_graph='json'
)

print('Conforms:', conforms)
print(report_text)

Troubleshooting

Command: pyshacl --data data.ttl --shapes shapes.ttl --prefix sh: http://www.w3.org/ns/shacl#
Expected Output: Validation report with conforms=true or JSON with results array

Ill-formed Shapes
- Missing sh:path in PropertyShape triggers error: "PropertyShape must have sh:path"
- Invalid datatype IRI triggers SPARQL error: "Unknown datatype"


## Information Dense Extract
sh:class  requires rdfs:Class IRI
sh:datatype requires xsd:Datatype IRI
sh:nodeKind requires one of six sh: nodeKind IRIs
sh:minCount/minCount enforce integer bounds per focus node
sh:maxCount enforces upper bound per focus node
sh:minExclusive/minInclusive/maxExclusive/maxInclusive enforce literal range checks
sh:minLength/maxLength enforce literal length
sh:pattern enforces regex match per literal
sh:languageIn enforces literal language tag from list
sh:uniqueLang enforces unique language tags
sh:equals/disjoint/lessThan/lessThanOrEquals enforce property comparison
sh:not/and/or/xone enforce logical shape combination
sh:node and sh:property apply nested shapes
sh:qualifiedValueShape with qualifiedMinCount/qualifiedMaxCount enforce counted nested shapes
sh:closed locks extra properties; default false
sh:ignoredProperties exempts properties from closed
sh:hasValue enforces literal equality
sh:in enforces value membership
Turtle example and pySHACL usage pattern included

## Sanitised Extract
Table of Contents
1 Value Type Constraint Components
2 Cardinality Constraint Components
3 Value Range Constraint Components
4 String-based Constraint Components
5 Property Pair Constraint Components
6 Logical Constraint Components
7 Shape-based Constraint Components
8 Other Constraint Components

1 Value Type Constraint Components
sh:class: IRI of class; single or multiple; enforces RDF type membership.
sh:datatype: IRI of xsd datatype; single; enforces literal datatype.
sh:nodeKind: IRI from {sh:BlankNode, sh:IRI, sh:Literal, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral}; single.

2 Cardinality Constraint Components
sh:minCount: integer  0; default 0; enforces at least n occurrences.
sh:maxCount: integer  0; no default; enforces at most n occurrences.

3 Value Range Constraint Components
sh:minExclusive: literal; focus values > literal.
sh:minInclusive: literal; focus values  literal.
sh:maxExclusive: literal; focus values < literal.
sh:maxInclusive: literal; focus values  literal.

4 String-based Constraint Components
sh:minLength: integer  0; enforces minimum string length.
sh:maxLength: integer  0; enforces maximum string length.
sh:pattern: regex string; SPARQL regex syntax; must match at least one substring.
sh:languageIn: List of xsd:languageTag strings; literal language tag must be in list.
sh:uniqueLang: boolean; if true, each language tag appears at most once.

5 Property Pair Constraint Components
sh:equals: property IRI; values equal to values of this property on same focus node.
sh:disjoint: property IRI; values disjoint from values of this property.
sh:lessThan: property IRI; value < values of this property.
sh:lessThanOrEquals: property IRI; value  values.

6 Logical Constraint Components
sh:not: shape IRI; focus nodes must not conform.
sh:and: List of shape IRIs; must conform to all.
sh:or: List of shape IRIs; must conform to at least one.
sh:xone: List of shape IRIs; must conform to exactly one.

7 Shape-based Constraint Components
sh:node: NodeShape IRI; nested node shape.
sh:property: PropertyShape IRI; nested property shape.
sh:qualifiedValueShape: Shape IRI; shape for counted values.
sh:qualifiedMinCount: integer  0; min count.
sh:qualifiedMaxCount: integer  0; max count.

8 Other Constraint Components
sh:closed: boolean; default false; if true, no extra properties allowed.
sh:ignoredProperties: List of property IRIs; exempt from closed.
sh:hasValue: RDF term; value must equal this.
sh:in: List of RDF terms; value must be one of these.

## Original Source
RDF Graph Shape Validation Standards: SHACL & ShEx
https://www.w3.org/TR/shacl/

## Digest of SHACL_CORE

# Value Type Constraint Components

sh:class
Parameter: rdfs:Class
Accepts a class IRI. Indicates that every value of the focus property must be a SHACL instance of the given class.

sh:datatype
Parameter: xsd:Datatype IRI
Specifies that every value must be a literal of the given datatype.

sh:nodeKind
Parameter: one of sh:BlankNode, sh:IRI, sh:Literal, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral
Specifies the kind of RDF node required.

# Cardinality Constraint Components

sh:minCount
Parameter: xsd:integer
Defines the minimum number of occurrences of the property per focus node.

sh:maxCount
Parameter: xsd:integer
Defines the maximum number of occurrences of the property per focus node.

# Value Range Constraint Components

sh:minExclusive
Parameter: literal value comparable by SPARQL
Excludes the given literal value; focus values must be greater.

sh:minInclusive
Parameter: literal value comparable by SPARQL
Focus values must be greater than or equal to the given literal.

sh:maxExclusive
Parameter: literal value comparable by SPARQL
Excludes the given literal; focus values must be less.

sh:maxInclusive
Parameter: literal value comparable by SPARQL
Focus values must be less than or equal to the given literal.

# String-based Constraint Components

sh:minLength
Parameter: xsd:integer
Minimum string length of literal values.

sh:maxLength
Parameter: xsd:integer
Maximum string length of literal values.

sh:pattern
Parameter: xsd:string (regex)
Regular expression that literal values must match.

sh:languageIn
Parameter: rdf:List of language tags
Allowed language tags for literal values.

sh:uniqueLang
Parameter: xsd:boolean
If true, literal values must each have a unique language tag.

# Property Pair Constraint Components

sh:equals
Parameter: rdf:Property IRI
Focus values must be equal to values of the given property on the same node.

sh:disjoint
Parameter: rdf:Property IRI
Focus values must be disjoint from values of the given property.

sh:lessThan
Parameter: rdf:Property IRI
Focus values must be less than values of the given property.

sh:lessThanOrEquals
Parameter: rdf:Property IRI
Focus values must be less than or equal to values of the given property.

# Logical Constraint Components

sh:not
Parameter: sh:Shape IRI
Focus nodes must not conform to the given shape.

sh:and
Parameter: rdf:List of sh:Shape IRIs
Focus nodes must conform to all shapes in the list.

sh:or
Parameter: rdf:List of sh:Shape IRIs
Focus nodes must conform to at least one shape in the list.

sh:xone
Parameter: rdf:List of sh:Shape IRIs
Focus nodes must conform to exactly one shape in the list.

# Shape-based Constraint Components

sh:node
Parameter: sh:NodeShape IRI
Applies the given node shape to focus nodes.

sh:property
Parameter: sh:PropertyShape IRI
Applies the given property shape to focus nodes.

sh:qualifiedValueShape
Parameter: sh:Shape IRI
Specifies a shape that each value must conform to, counted by min and max.

sh:qualifiedMinCount
Parameter: xsd:integer
Minimum count of values conforming to qualifiedValueShape.

sh:qualifiedMaxCount
Parameter: xsd:integer
Maximum count of values conforming to qualifiedValueShape.

# Other Constraint Components

sh:closed
Parameter: xsd:boolean (default false)
If true, focus nodes cannot have properties other than those declared in property shapes or ignoredProperties.

sh:ignoredProperties
Parameter: rdf:List of rdf:Property IRIs
Properties exempted from closed constraint.

sh:hasValue
Parameter: any RDF term
Focus nodes must have this exact value for the property.

sh:in
Parameter: rdf:List of RDF terms
Focus property values must be one of the listed values.

Retrieved on: 2024-06-16

## Attribution
- Source: RDF Graph Shape Validation Standards: SHACL & ShEx
- URL: https://www.w3.org/TR/shacl/
- License: License if known
- Crawl Date: 2025-04-30T04:51:13.994Z
- Data Size: 21477283 bytes
- Links Found: 170631

## Retrieved
2025-04-30
