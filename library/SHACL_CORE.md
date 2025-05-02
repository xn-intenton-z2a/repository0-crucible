# SHACL_CORE

## Crawl Summary
SHACL Core: defines sh:NodeShape and sh:PropertyShape with required parameters and constraint components. PropertyShape must declare sh:path (rdf:Property or Path) and one or more of class, datatype, cardinality, range, string, pair, logical, shape-based, or other constraints. ValidationReport uses sh:conforms, sh:result, sh:shapesGraphWellFormed. SHACL-SPARQL adds SPARQL-based constraints via sh:select, sh:ask, with pre-bound variables $this, $shapesGraph, $currentShape.

## Normalised Extract
Table of Contents:
1 Namespace Bindings
2 Shape Definitions
3 Property Shape Constraints
4 Validation Report
5 SHACL-SPARQL Constraints

1 Namespace Bindings
  sh: http://www.w3.org/ns/shacl#
  rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  xsd: http://www.w3.org/2001/XMLSchema#

2 Shape Definitions
  NodeShape:
    Required targets: sh:targetClass or sh:targetNode or sh:targetSubjectsOf or sh:targetObjectsOf
    Severity: sh:severity default sh:Violation
    Message: sh:message string
    Deactivation: sh:deactivated boolean
    Embed property constraints with sh:property -> PropertyShape
  PropertyShape:
    Path: sh:path rdf:Property or path expression
    Constraint parameters: choose one or more of:
      Value type: sh:class IRI, sh:datatype IRI, sh:nodeKind IRI among sh:BlankNode, sh:IRI, sh:Literal
      Cardinality: sh:minCount integer >=0, sh:maxCount integer >=0
      Range: sh:minInclusive, sh:maxInclusive, sh:minExclusive, sh:maxExclusive literal or typed literal
      String: sh:minLength, sh:maxLength integer >=0; sh:pattern regex; sh:languageIn list of language tags; sh:uniqueLang boolean
      Pair: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals rdf:Property
      Logical: sh:not single shape; sh:and, sh:or, sh:xone list of shapes
      Shape-based: sh:node shape; sh:property propertyshape; sh:qualifiedValueShape, sh:qualifiedMinCount, sh:qualifiedMaxCount qualified constraints
      Other: sh:closed boolean; sh:ignoredProperties list of properties; sh:hasValue single term; sh:in list of terms
    Non-validating: sh:name string, sh:description string, sh:order integer, sh:group group, sh:defaultValue any

3 Property Shape Constraints
  Constraint parameters precise types and cardinalities as above

4 Validation Report
  sh:ValidationReport:
    sh:conforms boolean
    sh:result repeated sh:ValidationResult
    sh:shapesGraphWellFormed boolean
  sh:ValidationResult:
    sh:focusNode term
    sh:resultPath path
    sh:value term
    sh:sourceShape shape
    sh:sourceConstraintComponent constraint component
    sh:resultSeverity severity
    sh:resultMessage repeated string
    sh:detail repeated ValidationResult

5 SHACL-SPARQL Constraints
  Define SPARQL-based constraint with:
    sh:prefixes list of (prefix, namespace)
    sh:select SELECT query string or sh:ask ASK query string
  Pre-bound variables: $this, $shapesGraph, $currentShape

## Supplementary Details
Constraint component parameter defaults and effects:
- sh:severity: default sh:Violation; values: sh:Info, sh:Warning, sh:Violation
- sh:deactivated: default false; true disables shape
- cardinality bounds: minCount default 0; maxCount no default (unbounded)
- sh:closed: default false; true forbids properties not in shape
- sh:ignoredProperties: default empty; used when sh:closed true

Implementation steps:
1 Load shapes graph as RDF Model
2 Load data graph as RDF Model
3 Parse shapes: Shapes shapes = Shapes.parse(shapesModel)
4 Validate: ValidationReport report = ShaclValidator.get().validate(shapes, dataModel)
5 Extract report.conforms(), report.getResults()

Entailment:
- sh:entailment: IRI; if unsupported, processor MUST fail
- Common IRIs: http://www.w3.org/ns/formats/SPARQL10Query

Serialization:
- Turtle: use prefix declarations above
- JSON-LD: include @context for sh:, rdf:, rdfs:, xsd:


## Reference Details
Java API (TopBraid SHACL):
Shapes.parse(Model model) -> Shapes
ShaclValidator.get() -> ShaclValidator
ValidationReport validate(Shapes shapes, Model data)
boolean ValidationReport.conforms()
List<ValidationResult> ValidationReport.getResults()
Resource ValidationResult.getFocusNode()
Path ValidationResult.getResultPath()
RDFNode ValidationResult.getValue()
Resource ValidationResult.getSourceShape()
Resource ValidationResult.getSourceConstraintComponent()
Resource ValidationResult.getResultSeverity()
List<Literal> ValidationResult.getResultMessages()

Example Code (Java):
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.topbraid.shacl.Shapes;
import org.topbraid.shacl.validation.ValidationReport;
import org.topbraid.shacl.validation.ShaclValidator;

Model shapesModel = FileManager.get().loadModel('shapes.ttl');
Model dataModel = FileManager.get().loadModel('data.ttl');
Shapes shapes = Shapes.parse(shapesModel);
ValidationReport report = ShaclValidator.get().validate(shapes, dataModel);
if(!report.conforms()){
  for(ValidationResult r : report.getResults()){
    System.err.println('Focus: '+r.getFocusNode()+' Path: '+r.getResultPath()+' Message: '+r.getResultMessages());
  }
}

Turtle Example:

@prefix ex: <http://example.com/ns#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:PersonShape a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:property [
    sh:path ex:ssn ;
    sh:datatype xsd:string ;
    sh:pattern '^[0-9]{3}-[0-9]{2}-[0-9]{4}$' ;
    sh:maxCount 1 ;
  ] ;
  sh:property [
    sh:path ex:worksFor ;
    sh:class ex:Company ;
    sh:minCount 1 ;
  ] ;
  sh:closed true ;
  sh:ignoredProperties ( rdf:type ) .

Troubleshooting:
- Error: Missing required sh:path -> Ensure each PropertyShape includes sh:path
- Use rapper to validate Turtle:
  rapper -i turtle -c shapes.ttl
  Expected: No errors, otherwise correct syntax at indicated line
- Validation failures with ill-formed shapes:
  log contains: 'sh:shapesGraphWellFormed false' -> check shape declarations against constraint component rules


## Information Dense Extract
prefixes: sh, rdf, rdfs, xsd. NodeShape: must declare target* plus optional severity, message, deactivated, property. PropertyShape: mandatory sh:path; constraint parameters: class, datatype, nodeKind; cardinality: minCount>=0, maxCount>=0; range: minInclusive, maxInclusive, minExclusive, maxExclusive; string: minLength>=0, maxLength>=0, pattern regex, languageIn list, uniqueLang boolean; property pairs: equals, disjoint, lessThan, lessThanOrEquals; logical: not, and list, or list, xone list; shape-based: node, property, qualified shapes; other: closed boolean (default false), ignoredProperties list; in list; hasValue. ValidationReport: sh:conforms boolean, sh:result*, sh:shapesGraphWellFormed boolean. ValidationResult: focusNode, resultPath, value, sourceShape, sourceConstraintComponent, resultSeverity, resultMessage*, detail*. SHACL-SPARQL: define sh:prefixes list; sh:select or sh:ask string; pre-bound $this, $shapesGraph, $currentShape. Java API: Shapes.parse(Model), ShaclValidator.get().validate(Shapes, Model) -> ValidationReport. Use rapper for syntax validation. Entailment: sh:entailment IRIs, failure if unsupported.

## Sanitised Extract
Table of Contents:
1 Namespace Bindings
2 Shape Definitions
3 Property Shape Constraints
4 Validation Report
5 SHACL-SPARQL Constraints

1 Namespace Bindings
  sh: http://www.w3.org/ns/shacl#
  rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  xsd: http://www.w3.org/2001/XMLSchema#

2 Shape Definitions
  NodeShape:
    Required targets: sh:targetClass or sh:targetNode or sh:targetSubjectsOf or sh:targetObjectsOf
    Severity: sh:severity default sh:Violation
    Message: sh:message string
    Deactivation: sh:deactivated boolean
    Embed property constraints with sh:property -> PropertyShape
  PropertyShape:
    Path: sh:path rdf:Property or path expression
    Constraint parameters: choose one or more of:
      Value type: sh:class IRI, sh:datatype IRI, sh:nodeKind IRI among sh:BlankNode, sh:IRI, sh:Literal
      Cardinality: sh:minCount integer >=0, sh:maxCount integer >=0
      Range: sh:minInclusive, sh:maxInclusive, sh:minExclusive, sh:maxExclusive literal or typed literal
      String: sh:minLength, sh:maxLength integer >=0; sh:pattern regex; sh:languageIn list of language tags; sh:uniqueLang boolean
      Pair: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals rdf:Property
      Logical: sh:not single shape; sh:and, sh:or, sh:xone list of shapes
      Shape-based: sh:node shape; sh:property propertyshape; sh:qualifiedValueShape, sh:qualifiedMinCount, sh:qualifiedMaxCount qualified constraints
      Other: sh:closed boolean; sh:ignoredProperties list of properties; sh:hasValue single term; sh:in list of terms
    Non-validating: sh:name string, sh:description string, sh:order integer, sh:group group, sh:defaultValue any

3 Property Shape Constraints
  Constraint parameters precise types and cardinalities as above

4 Validation Report
  sh:ValidationReport:
    sh:conforms boolean
    sh:result repeated sh:ValidationResult
    sh:shapesGraphWellFormed boolean
  sh:ValidationResult:
    sh:focusNode term
    sh:resultPath path
    sh:value term
    sh:sourceShape shape
    sh:sourceConstraintComponent constraint component
    sh:resultSeverity severity
    sh:resultMessage repeated string
    sh:detail repeated ValidationResult

5 SHACL-SPARQL Constraints
  Define SPARQL-based constraint with:
    sh:prefixes list of (prefix, namespace)
    sh:select SELECT query string or sh:ask ASK query string
  Pre-bound variables: $this, $shapesGraph, $currentShape

## Original Source
SHACL (Shapes Constraint Language)
https://www.w3.org/TR/shacl/

## Digest of SHACL_CORE

# SHACL Core Language

Defines SHACL Core for representing shapes, targets, and constraints in RDF. All implementations MUST support:

Namespaces:
  sh: http://www.w3.org/ns/shacl#
  rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  xsd: http://www.w3.org/2001/XMLSchema#

## NodeShape and PropertyShape

NodeShape (sh:NodeShape)
  Domain: sh:Shape
  Properties:
    sh:targetClass (rdfs:Class) cardinality 1..
    sh:targetNode (IRI or literal) cardinality 0..*
    sh:targetSubjectsOf (rdf:Property)
    sh:targetObjectsOf (rdf:Property)
    sh:severity (sh:Severity) default sh:Violation
    sh:message (xsd:string or rdf:langString) cardinality 0..*
    sh:deactivated (xsd:boolean) default false
    sh:property (sh:PropertyShape) cardinality 0..*

PropertyShape (sh:PropertyShape)
  Domain: sh:Shape
  Required:
    sh:path (rdf:Property or sh:Path) cardinality 1
  Constraint parameters (choose one or more):
    sh:class (rdfs:Resource)
    sh:datatype (rdfs:Resource)
    sh:minCount (xsd:integer >=0)
    sh:maxCount (xsd:integer >=0)
    sh:minInclusive, sh:maxInclusive, sh:minExclusive, sh:maxExclusive (xsd:string or xsd:integer)
    sh:minLength, sh:maxLength (xsd:integer >=0)
    sh:pattern (xsd:string, Java regex)
    sh:languageIn (rdf:List of xsd:string language tags)
    sh:uniqueLang (xsd:boolean)
    sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals (rdf:Property)
    sh:not (sh:Shape)
    sh:and, sh:or, sh:xone (rdf:List of sh:Shape)
    sh:node (sh:NodeShape)
    sh:property (sh:PropertyShape)
    sh:closed (xsd:boolean) default false
    sh:ignoredProperties (rdf:List of rdf:Property)
    sh:in (rdf:List of RDF terms)
    sh:hasValue (any RDF term)
  Non-validating:
    sh:name, sh:description (xsd:string or rdf:langString)
    sh:order (xsd:integer)
    sh:group (sh:PropertyGroup)
    sh:defaultValue (any)

## Validation Report

sh:ValidationReport
  Instance of: sh:ValidationReport
  Properties:
    sh:conforms (xsd:boolean)
    sh:result (sh:ValidationResult) 0..*
    sh:shapesGraphWellFormed (xsd:boolean)

sh:ValidationResult
  Instance of: sh:ValidationResult
  Properties:
    sh:focusNode (node)
    sh:resultPath (rdf:Path)
    sh:value (any)
    sh:sourceShape (sh:Shape)
    sh:sourceConstraintComponent (sh:ConstraintComponent)
    sh:resultSeverity (sh:Severity)
    sh:resultMessage (xsd:string or rdf:langString) 0..*
    sh:detail (sh:ValidationResult) 0..*

# SPARQL-based Constraints (SHACL-SPARQL)

Pre-bound variables: $this, $shapesGraph, $currentShape. Use in sh:select or sh:ask validators.

Syntax: define sh:SPARQLConstraint
  sh:prefixes (rdf:List of prefix declarations)
  sh:select (xsd:string) SPARQL SELECT query
  sh:ask (xsd:string) SPARQL ASK query

# Retrieved
Date: 2024-06-01
Data Size: 20361046 bytes

## Attribution
- Source: SHACL (Shapes Constraint Language)
- URL: https://www.w3.org/TR/shacl/
- License: License: Royalty-Free W3C Recommendation
- Crawl Date: 2025-05-02T03:06:34.330Z
- Data Size: 20361046 bytes
- Links Found: 161811

## Retrieved
2025-05-02
