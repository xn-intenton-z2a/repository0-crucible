# SHACL_CORE

## Crawl Summary
Core SHACL vocabulary: sh:Shape, sh:NodeShape, sh:PropertyShape. Namespace prefixes: rdf,rdfs,sh,xsd. Constraint parameters for property shapes grouped by category (value type, cardinality, range, string, pair, logical, shape-based, other). Validation algorithm: link shapes graph, compute focus nodes from targets (sh:targetNode, sh:targetClass, sh:targetSubjectsOf, sh:targetObjectsOf), apply constraints, produce results. Validation report: sh:ValidationReport with conforms flag, results list, shapesGraphWellFormed flag; sh:ValidationResult with focusNode, resultPath, value, sourceShape, sourceConstraintComponent, detail, resultMessage, resultSeverity. Entailment: sh:entailment values, failure on unsupported regimes.

## Normalised Extract
Table of Contents:
1  Namespace Prefixes
2  Core Classes and Properties
   2.1 sh:Shape Properties
   2.2 sh:NodeShape Extensions
   2.3 sh:PropertyShape Constraint Parameters
3  Validation Process
   3.1 Linking Shapes Graph
   3.2 Focus Node Computation
   3.3 Constraint Evaluation
4  Validation Report Structure
5  Entailment Configuration

1 Namespace Prefixes
  rdf:  http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  sh:   http://www.w3.org/ns/shacl#
  xsd:  http://www.w3.org/2001/XMLSchema#

2 Core Classes and Properties
2.1 sh:Shape Properties
  sh:targetNode      -> IRI or literal (zero-or-more)
  sh:targetClass     -> rdfs:Class       (zero-or-more)
  sh:targetSubjectsOf-> rdf:Property     (zero-or-more)
  sh:targetObjectsOf -> rdf:Property     (zero-or-more)
  sh:deactivated     -> xsd:boolean      (zero-or-one; default false)
  sh:message         -> xsd:string or rdf:langString (zero-or-more)
  sh:severity        -> sh:Severity      (zero-or-one; default sh:Violation)

2.2 sh:NodeShape (subclass of sh:Shape)
  inherits all sh:Shape properties
  sh:property      -> sh:PropertyShape (zero-or-more)

2.3 sh:PropertyShape Constraint Parameters
  - Value Type
      sh:class     -> rdfs:Resource      (zero-or-one)
      sh:datatype  -> rdfs:Resource      (zero-or-one)
      sh:nodeKind  -> sh:NodeKind        (zero-or-one)
  - Cardinality
      sh:minCount  -> xsd:integer        (zero-or-one; default 0)
      sh:maxCount  -> xsd:integer        (zero-or-one; default unlimited)
  - Value Range
      sh:minExclusive  -> xsd:anyAtomicType (zero-or-one)
      sh:minInclusive  -> xsd:anyAtomicType (zero-or-one)
      sh:maxExclusive  -> xsd:anyAtomicType (zero-or-one)
      sh:maxInclusive  -> xsd:anyAtomicType (zero-or-one)
  - String-based
      sh:minLength  -> xsd:integer        (zero-or-one)
      sh:maxLength  -> xsd:integer        (zero-or-one)
      sh:pattern    -> xsd:string         (zero-or-one; regex)
      sh:languageIn -> rdf:List           (zero-or-one)
      sh:uniqueLang -> xsd:boolean        (zero-or-one; default false)
  - Property Pair
      sh:equals    -> rdf:Property        (zero-or-more)
      sh:disjoint  -> rdf:Property        (zero-or-more)
      sh:lessThan  -> rdf:Property        (zero-or-one)
      sh:lessThanOrEquals -> rdf:Property (zero-or-one)
  - Logical
      sh:not       -> sh:Shape            (zero-or-one)
      sh:and       -> rdf:List            (zero-or-one)
      sh:or        -> rdf:List            (zero-or-one)
      sh:xone      -> rdf:List            (zero-or-one)
  - Shape-based
      sh:node      -> sh:NodeShape        (zero-or-one)
      sh:property  -> sh:PropertyShape     (zero-or-more)
      sh:qualifiedValueShape  -> sh:Shape    (zero-or-one)
      sh:qualifiedMinCount    -> xsd:integer (zero-or-one)
      sh:qualifiedMaxCount    -> xsd:integer (zero-or-one)
  - Other
      sh:closed           -> xsd:boolean    (zero-or-one; default false)
      sh:ignoredProperties-> rdf:Property    (zero-or-more)
      sh:hasValue         -> any RDF term    (zero-or-one)
      sh:in               -> rdf:List        (zero-or-one)

3 Validation Process
3.1 Link shapes graph: sh:shapesGraph predicate
3.2 Compute focus nodes:
    apply targets: sh:targetNode, sh:targetClass, sh:targetSubjectsOf, sh:targetObjectsOf
3.3 For each focus node, evaluate all constraint parameters of each shape
    record failures if parameter conditions not met

4 Validation Report Structure
  Report: instance of sh:ValidationReport
    sh:conforms (boolean)
    sh:shapesGraphWellFormed (boolean)
    sh:result             -> list of sh:ValidationResult
  Result: instance of sh:ValidationResult
    sh:focusNode
    sh:resultPath
    sh:value
    sh:sourceShape
    sh:sourceConstraintComponent
    sh:detail           -> nested sh:ValidationResult
    sh:resultMessage
    sh:resultSeverity

5 Entailment
  sh:entailment -> IRI (zero-or-more)
  common regimes: sh:RDFS, sh:OWL
  unsupported regime -> validation error


## Supplementary Details
Implementation Steps:
1  Parse shapes graph as RDF with Turtle or JSON-LD
2  Ensure namespace prefixes match spec
3  Validate shapes graph syntactic rules: each shape node must satisfy one sh:Shape subclass and mandatory sh:path for property shapes
4  Load data graph as RDF
5  For each shape s:
   a  Compute targets: nodes in data graph where any sh:target* triple applies
6  For each target node and each constraint parameter p of s:
   a  Retrieve parameter value(s)
   b  Evaluate constraint: e.g., for sh:minCount  count(values(path,n)) >= minCount
   c  For failure, instantiate a sh:ValidationResult:
        focusNode  = target node
        resultPath = path expression used
        value      = offending value (if any)
        sourceShape= s
        sourceConstraintComponent = IRI of parameter p's constraint component
        resultMessage and resultSeverity from s
7  Aggregate all results into a sh:ValidationReport:
    sh:conforms              = no failures
    sh:shapesGraphWellFormed = true
    sh:result                = all validation results

Entailment Handling:
- If shapes graph contains sh:entailment E and E not supported, abort with error 'Unsupported entailment regime: E'
- Otherwise pre-compute inferences and include them in data graph queries

Configuration Options:
- deactivated: skip shape when set to true
- defaultValue: use when missing property values
- group: property grouping in UI generation



## Reference Details
Vocabulary and Parameter Specification:
- sh:Severity: enumeration {sh:Violation, sh:Warning, sh:Info}

Constraint API Patterns (generic RDF engine pseudo-code):

function validateShapes(dataGraph, shapesGraph) {
  report = new ValidationReport()
  report.shapesGraphWellFormed = isWellFormed(shapesGraph)
  for each shape in shapesGraph.getShapes():
    if shape.deactivated == true: continue
    focusNodes = getTargets(dataGraph, shape)
    for each node in focusNodes:
      for each parameter in shape.getConstraintParameters():
        component = parameter.getConstraintComponent()
        resultSet = component.evaluate(dataGraph, node, shape)
        for each fail in resultSet:
          vr = new ValidationResult()
          vr.focusNode = node
          vr.resultPath = parameter.path
          vr.value = fail.offendingValue
          vr.sourceShape = shape
          vr.sourceConstraintComponent = component.iri
          vr.resultMessage = selectMessage(shape, parameter)
          vr.resultSeverity = shape.severity or sh:Violation
          report.results.add(vr)
  report.conforms = report.results.isEmpty()
  return report
}

SPARQL-based Constraint Variables:
- $this -> focus node
- $shapesGraph -> shapes graph as dataset
- $currentShape -> shape being applied

Example Constraint Component Implementation:
Component: sh:minCount
Parameter: sh:minCount (xsd:integer)
Evaluation:
  count(dataGraph.values(node, shape.path)) < minCount -> violation

Component: sh:pattern
Parameter: sh:pattern (xsd:string)
Evaluation:
  for each literal v in dataGraph.values(node, shape.path):
    if not matches(regex, v) -> violation

Exception Codes:
- ErrIllFormedShape: shapesGraphWellFormed = false
- ErrUnsupportedEntailment: abort validation

Troubleshooting Commands:
- rdf-validator --syntax shapes.ttl -> syntax errors in shapes graph
- shacl-validator --data data.ttl --shapes shapes.ttl --report report.ttl
  Expected output: report.ttl with sh:ValidationReport.conforms true or false


## Information Dense Extract
Prefixes: rdf,rdfs,sh,xsd. Classes: sh:Shape, sh:NodeShape, sh:PropertyShape. sh:Shape properties: targetNode, targetClass, targetSubjectsOf, targetObjectsOf, deactivated, message, severity. sh:NodeShape adds sh:property. sh:PropertyShape adds sh:path plus constraint parameters: value type (sh:class,sh:datatype,sh:nodeKind), cardinality (sh:minCount,sh:maxCount), range (sh:minExclusive,sh:minInclusive,sh:maxExclusive,sh:maxInclusive), string (sh:minLength,sh:maxLength,sh:pattern,sh:languageIn,sh:uniqueLang), pair (sh:equals,sh:disjoint,sh:lessThan,sh:lessThanOrEquals), logical (sh:not,sh:and,sh:or,sh:xone), shape-based (sh:node,sh:property,sh:qualifiedValueShape,sh:qualifiedMinCount,sh:qualifiedMaxCount), other (sh:closed,sh:ignoredProperties,sh:hasValue,sh:in). Validation: compute focus nodes via targets, evaluate each constraint parameter, record failures as sh:ValidationResult, aggregate in sh:ValidationReport with conforms, shapesGraphWellFormed flags. ValidationResult: focusNode,resultPath,value,sourceShape,sourceConstraintComponent,detail,resultMessage,resultSeverity. Entailment: sh:entailment values must be supported or fail validation.

## Sanitised Extract
Table of Contents:
1  Namespace Prefixes
2  Core Classes and Properties
   2.1 sh:Shape Properties
   2.2 sh:NodeShape Extensions
   2.3 sh:PropertyShape Constraint Parameters
3  Validation Process
   3.1 Linking Shapes Graph
   3.2 Focus Node Computation
   3.3 Constraint Evaluation
4  Validation Report Structure
5  Entailment Configuration

1 Namespace Prefixes
  rdf:  http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  sh:   http://www.w3.org/ns/shacl#
  xsd:  http://www.w3.org/2001/XMLSchema#

2 Core Classes and Properties
2.1 sh:Shape Properties
  sh:targetNode      -> IRI or literal (zero-or-more)
  sh:targetClass     -> rdfs:Class       (zero-or-more)
  sh:targetSubjectsOf-> rdf:Property     (zero-or-more)
  sh:targetObjectsOf -> rdf:Property     (zero-or-more)
  sh:deactivated     -> xsd:boolean      (zero-or-one; default false)
  sh:message         -> xsd:string or rdf:langString (zero-or-more)
  sh:severity        -> sh:Severity      (zero-or-one; default sh:Violation)

2.2 sh:NodeShape (subclass of sh:Shape)
  inherits all sh:Shape properties
  sh:property      -> sh:PropertyShape (zero-or-more)

2.3 sh:PropertyShape Constraint Parameters
  - Value Type
      sh:class     -> rdfs:Resource      (zero-or-one)
      sh:datatype  -> rdfs:Resource      (zero-or-one)
      sh:nodeKind  -> sh:NodeKind        (zero-or-one)
  - Cardinality
      sh:minCount  -> xsd:integer        (zero-or-one; default 0)
      sh:maxCount  -> xsd:integer        (zero-or-one; default unlimited)
  - Value Range
      sh:minExclusive  -> xsd:anyAtomicType (zero-or-one)
      sh:minInclusive  -> xsd:anyAtomicType (zero-or-one)
      sh:maxExclusive  -> xsd:anyAtomicType (zero-or-one)
      sh:maxInclusive  -> xsd:anyAtomicType (zero-or-one)
  - String-based
      sh:minLength  -> xsd:integer        (zero-or-one)
      sh:maxLength  -> xsd:integer        (zero-or-one)
      sh:pattern    -> xsd:string         (zero-or-one; regex)
      sh:languageIn -> rdf:List           (zero-or-one)
      sh:uniqueLang -> xsd:boolean        (zero-or-one; default false)
  - Property Pair
      sh:equals    -> rdf:Property        (zero-or-more)
      sh:disjoint  -> rdf:Property        (zero-or-more)
      sh:lessThan  -> rdf:Property        (zero-or-one)
      sh:lessThanOrEquals -> rdf:Property (zero-or-one)
  - Logical
      sh:not       -> sh:Shape            (zero-or-one)
      sh:and       -> rdf:List            (zero-or-one)
      sh:or        -> rdf:List            (zero-or-one)
      sh:xone      -> rdf:List            (zero-or-one)
  - Shape-based
      sh:node      -> sh:NodeShape        (zero-or-one)
      sh:property  -> sh:PropertyShape     (zero-or-more)
      sh:qualifiedValueShape  -> sh:Shape    (zero-or-one)
      sh:qualifiedMinCount    -> xsd:integer (zero-or-one)
      sh:qualifiedMaxCount    -> xsd:integer (zero-or-one)
  - Other
      sh:closed           -> xsd:boolean    (zero-or-one; default false)
      sh:ignoredProperties-> rdf:Property    (zero-or-more)
      sh:hasValue         -> any RDF term    (zero-or-one)
      sh:in               -> rdf:List        (zero-or-one)

3 Validation Process
3.1 Link shapes graph: sh:shapesGraph predicate
3.2 Compute focus nodes:
    apply targets: sh:targetNode, sh:targetClass, sh:targetSubjectsOf, sh:targetObjectsOf
3.3 For each focus node, evaluate all constraint parameters of each shape
    record failures if parameter conditions not met

4 Validation Report Structure
  Report: instance of sh:ValidationReport
    sh:conforms (boolean)
    sh:shapesGraphWellFormed (boolean)
    sh:result             -> list of sh:ValidationResult
  Result: instance of sh:ValidationResult
    sh:focusNode
    sh:resultPath
    sh:value
    sh:sourceShape
    sh:sourceConstraintComponent
    sh:detail           -> nested sh:ValidationResult
    sh:resultMessage
    sh:resultSeverity

5 Entailment
  sh:entailment -> IRI (zero-or-more)
  common regimes: sh:RDFS, sh:OWL
  unsupported regime -> validation error

## Original Source
RDF Graph Shape Validation Standards: SHACL & ShEx
https://www.w3.org/TR/shacl/

## Digest of SHACL_CORE

# SHACL Core Language Specification

Retrieved: 2024-06-05
Source: W3C Recommendation SHACL 20 July 2017 (https://www.w3.org/TR/2017/REC-shacl-20170720/)

# 1. Namespace Prefixes

  - rdf:  http://www.w3.org/1999/02/22-rdf-syntax-ns#
  - rdfs: http://www.w3.org/2000/01/rdf-schema#
  - sh:   http://www.w3.org/ns/shacl#
  - xsd:  http://www.w3.org/2001/XMLSchema#
  - ex:   http://example.com/ns#

# 2. Core Classes and Properties

## 2.1 Class: sh:Shape

  - sh:targetNode      (zero-or-more)  IRI or literal
  - sh:targetClass     (zero-or-more)  rdfs:Class
  - sh:targetSubjectsOf(zero-or-more) rdf:Property
  - sh:targetObjectsOf (zero-or-more) rdf:Property
  - sh:deactivated     (zero-or-one)   xsd:boolean
  - sh:message         (zero-or-more)  xsd:string or rdf:langString
  - sh:severity        (zero-or-one)   sh:Severity

## 2.2 Class: sh:NodeShape (subclass of sh:Shape)

  - inherits all sh:Shape properties
  - sh:property        (zero-or-more)  sh:PropertyShape

## 2.3 Class: sh:PropertyShape (subclass of sh:Shape)

  - sh:path            (one-or-one)    rdf:Resource (property path)
  - sh:name            (zero-or-one)   xsd:string or rdf:langString
  - sh:description     (zero-or-one)   xsd:string or rdf:langString
  - sh:defaultValue    (zero-or-one)   any RDF term
  - sh:group           (zero-or-one)   sh:PropertyGroup
  - constraint parameters:
      - Value type:       sh:class (zero-or-one)   rdfs:Resource
                           sh:datatype (zero-or-one) rdfs:Resource
                           sh:nodeKind (zero-or-one)   sh:NodeKind
      - Cardinality:      sh:minCount (zero-or-one)   xsd:integer
                           sh:maxCount (zero-or-one)   xsd:integer
      - Value range:      sh:minExclusive (zero-or-one) xsd:anyAtomicType
                           sh:minInclusive (zero-or-one) xsd:anyAtomicType
                           sh:maxExclusive (zero-or-one) xsd:anyAtomicType
                           sh:maxInclusive (zero-or-one) xsd:anyAtomicType
      - String-based:     sh:minLength   (zero-or-one) xsd:integer
                           sh:maxLength   (zero-or-one) xsd:integer
                           sh:pattern     (zero-or-one) xsd:string
                           sh:languageIn  (zero-or-one) rdf:List
                           sh:uniqueLang  (zero-or-one) xsd:boolean
      - Property pairs:   sh:equals (zero-or-more) rdf:Property
                           sh:disjoint (zero-or-more) rdf:Property
                           sh:lessThan (zero-or-one) rdf:Property
                           sh:lessThanOrEquals (zero-or-one) rdf:Property
      - Logical:          sh:not (zero-or-one) sh:Shape
                           sh:and (zero-or-one) rdf:List
                           sh:or (zero-or-one) rdf:List
                           sh:xone (zero-or-one) rdf:List
      - Shape-based:      sh:node (zero-or-one) sh:NodeShape
                           sh:property (zero-or-more) sh:PropertyShape
                           sh:qualifiedValueShape (zero-or-one) sh:Shape
                           sh:qualifiedMinCount (zero-or-one) xsd:integer
                           sh:qualifiedMaxCount (zero-or-one) xsd:integer
      - Other:            sh:closed (zero-or-one) xsd:boolean
                           sh:ignoredProperties (zero-or-more) rdf:Property
                           sh:hasValue (zero-or-one) any RDF term
                           sh:in (zero-or-one) rdf:List

# 3. Validation Process

  - Link shapes graph: use sh:shapesGraph to associate a data graph with its shapes graph
  - Precondition: shapes graph must be well-formed (all syntactic rules satisfied)

## 3.1 Validation Steps

  1. For each shape in shapes graph, compute focus nodes based on targets
  2. For each focus node and each shape, validate all associated constraint components
  3. Collect violations as sh:ValidationResult instances
  4. Aggregate results into a sh:ValidationReport

## 3.2 Validation Report Structure

  - sh:ValidationReport (IRI/class)
      - sh:conforms (one-or-one) xsd:boolean
      - sh:result (zero-or-more)  sh:ValidationResult
      - sh:shapesGraphWellFormed (one-or-one) xsd:boolean

  - sh:ValidationResult
      - sh:focusNode (one-or-one)   IRI or blank node
      - sh:resultPath (zero-or-one) rdf:Resource
      - sh:value (zero-or-one)      RDF term
      - sh:sourceShape (zero-or-one) IRI or blank node
      - sh:sourceConstraintComponent (zero-or-one) IRI
      - sh:detail (zero-or-more)    sh:ValidationResult
      - sh:resultMessage (zero-or-more) xsd:string or rdf:langString
      - sh:resultSeverity (one-or-one) sh:Severity

# 4. Entailment

  - Property: sh:entailment (zero-or-more) IRI
    common values: http://www.w3.org/ns/shacl#RDFS, http://www.w3.org/ns/shacl#OWL
  - Behavior: if a shapes graph specifies an entailment regime not supported, validation MUST fail


## Attribution
- Source: RDF Graph Shape Validation Standards: SHACL & ShEx
- URL: https://www.w3.org/TR/shacl/
- License: License if known
- Crawl Date: 2025-04-29T18:52:25.166Z
- Data Size: 14330371 bytes
- Links Found: 113541

## Retrieved
2025-04-29
