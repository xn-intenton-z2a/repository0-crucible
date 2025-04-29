# SHACL_CORE

## Crawl Summary
Namespaces bound to URIs, core classes sh:Shape, sh:NodeShape, sh:PropertyShape with exact properties and default values, all constraint components with required parameters and default settings, validation report model with all result properties and datatypes, SHACL list semantics.

## Normalised Extract
Table of Contents
1 Namespace Prefix Bindings
2 Core Classes and Properties
3 Constraint Components and Parameter Definitions
4 Validation Report Model
5 SHACL List Semantics

1 Namespace Prefix Bindings
rdf  http://www.w3.org/1999/02/22-rdf-syntax-ns#
rdfs http://www.w3.org/2000/01/rdf-schema#
sh   http://www.w3.org/ns/shacl#
owl  http://www.w3.org/2002/07/owl#
xsd  http://www.w3.org/2001/XMLSchema#
ex   http://example.com/ns#

2 Core Classes and Properties
sh:Shape parameters: targetClass rdfs:Class, targetNode any, targetObjectsOf rdf:Property, targetSubjectsOf rdf:Property, deactivated xsd:boolean default false, severity sh:Severity default sh:Violation, message xsd:string default none
sh:NodeShape inherits sh:Shape and adds property sh:property sh:PropertyShape, closed xsd:boolean default false, ignoredProperties rdf:List default rdf:nil
sh:PropertyShape inherits sh:Shape and adds path rdf:Property or path expression, minCount xsd:integer default 1, maxCount xsd:integer no default, datatype/class/node/name/description/defaultValue/group

3 Constraint Components and Parameter Definitions
Value Type: class datatype required; nodeKind optional with allowed values IRI BlankNode Literal
Cardinality: minCount default 0; maxCount optional
Value Range: minExclusive Inclusive, maxExclusive Inclusive of any literal no defaults
String-based: minLength default 0; maxLength optional; pattern regex; languageIn list of language tags; uniqueLang default false
Logical: not one Shape; and or or xone list of Shapes
Shape-based: node one NodeShape; property one PropertyShape; qualifiedValueShape one Shape; qualifiedMinCount default 0; qualifiedMaxCount optional
Other: closed default false; ignoredProperties list default empty; hasValue any; in list of allowed values

4 Validation Report Model
ValidationReport: conforms xsd:boolean, result list of ValidationResult, shapesGraphWellFormed xsd:boolean
ValidationResult: focusNode any, resultPath property or path, value any, sourceShape Shape, sourceConstraintComponent IRI, detail nested ValidationResult, resultMessage string, resultSeverity Severity

5 SHACL List Semantics
Definition of SHACL list: rdf:nil or node with exactly one rdf:first and one rdf:rest linking to another list, no cycles, member order by rdf:first then rdf:rest chain

## Supplementary Details
Implementation Steps
1 Load shapes graph and data graph in RDF/Turtle
2 Apply SHACL Core validation engine
3 If shapesGraph contains sh:entailment with regime E and processor does not support E then fail
4 Pre-bind $this, $shapesGraph, $currentShape in SPARQL-based constraints if SHACL-SPARQL
5 Collect all ValidationResult and assemble ValidationReport

Configuration Options
sh:deactivated: xsd:boolean default false disables a Shape
sh:closed: xsd:boolean default false disallows triples not covered by property shapes
sh:ignoredProperties: rdf:List default rdf:nil allows specific extra predicates
sh:severity: sh:Severity default sh:Violation sets message severity
sh:entailment: IRI list of entailment regimes required

Parameter Effects
minCount zero enforces minimum occurrences
maxCount restricts maximum occurrences if set
pattern uses JavaScript regex syntax for xsd:string
languageIn uses BCP47 language tag list
uniqueLang enforces distinct language tags on string values


## Reference Details
Turtle Vocabulary Fragment

@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

sh:class a rdf:Property ;
  rdfs:domain sh:PropertyShape ;
  rdfs:range rdfs:Class ;
  sh:parameter sh:parameter_class .

sh:parameter_class a sh:Parameter ;
  sh:path sh:class ;
  sh:datatype rdfs:Class ;
  sh:minCount 1 ;
  sh:maxCount 1 .

sh:minCount a rdf:Property ;
  rdfs:domain sh:PropertyShape ;
  rdfs:range xsd:integer ;
  sh:defaultValue 0 .

# JSON-LD Example
{
  "@context": { "sh": "http://www.w3.org/ns/shacl#" },
  "@id": "ex:PersonShape",
  "@type": "sh:NodeShape",
  "sh:targetClass": { "@id": "ex:Person" },
  "sh:property": [
    { "sh:path": { "@id": "ex:ssn" }, "sh:datatype": { "@id": "xsd:string" }, "sh:pattern": "[0-9]{3}-[0-9]{2}-[0-9]{4}", "sh:maxCount": 1 },
    { "sh:path": { "@id": "ex:worksFor" }, "sh:class": { "@id": "ex:Company" } }
  ]
}

Java API Example
Model dataModel = RDFDataMgr.loadModel("data.ttl");
Model shapesModel = RDFDataMgr.loadModel("shapes.ttl");
ValidationReport report = ShaclValidator.get().validate(shapesModel.getGraph(), dataModel.getGraph(), true);
if (!report.conforms()) {
  report.getEntries().forEach(e -> System.err.println(e.getMessage()));
}

CLI Usage
shacl --data data.ttl --shapes shapes.ttl --output report.ttl

Troubleshooting
Command: shacl --data invalidData.ttl --shapes shapes.ttl
Expected Output contains rdf:type sh:ValidationReport with sh:conforms false and at least one sh:ValidationResult


## Information Dense Extract
prefixes rdf rdfs sh xsd owl ex; classes sh:Shape sh:NodeShape sh:PropertyShape; properties targetClass rdfs:Class targetNode any targetObjectsOf rdf:Property targetSubjectsOf rdf:Property deactivated xsd:boolean false severity sh:Severity sh:Violation message xsd:string; NodeShape adds property sh:property list closed false ignoredProperties rdf:nil; PropertyShape adds path property minCount 1 maxCount unlimited datatype/class/node/name/description/defaultValue/group; constraint components definitions: ValueType(class datatype required nodeKind optional), Cardinality(minCount0 maxCount unlimited), ValueRange(minExclusive Inclusive no default), String(minLength0 maxLength unlimited pattern regex languageIn list uniqueLang false), Logical(not one, and/or/xone lists), ShapeBased(node property qualifiedValueShape qualifiedMinCount0 qualifiedMaxCount unlimited), Other(closed false ignoredProperties empty hasValue any in list); list semantics rdf:nil or node(first rest chain no cycles); ValidationReport(conforms boolean result list shapesGraphWellFormed boolean); ValidationResult(focusNode value resultPath sourceShape sourceConstraintComponent detail message severity)

## Sanitised Extract
Table of Contents
1 Namespace Prefix Bindings
2 Core Classes and Properties
3 Constraint Components and Parameter Definitions
4 Validation Report Model
5 SHACL List Semantics

1 Namespace Prefix Bindings
rdf  http://www.w3.org/1999/02/22-rdf-syntax-ns#
rdfs http://www.w3.org/2000/01/rdf-schema#
sh   http://www.w3.org/ns/shacl#
owl  http://www.w3.org/2002/07/owl#
xsd  http://www.w3.org/2001/XMLSchema#
ex   http://example.com/ns#

2 Core Classes and Properties
sh:Shape parameters: targetClass rdfs:Class, targetNode any, targetObjectsOf rdf:Property, targetSubjectsOf rdf:Property, deactivated xsd:boolean default false, severity sh:Severity default sh:Violation, message xsd:string default none
sh:NodeShape inherits sh:Shape and adds property sh:property sh:PropertyShape, closed xsd:boolean default false, ignoredProperties rdf:List default rdf:nil
sh:PropertyShape inherits sh:Shape and adds path rdf:Property or path expression, minCount xsd:integer default 1, maxCount xsd:integer no default, datatype/class/node/name/description/defaultValue/group

3 Constraint Components and Parameter Definitions
Value Type: class datatype required; nodeKind optional with allowed values IRI BlankNode Literal
Cardinality: minCount default 0; maxCount optional
Value Range: minExclusive Inclusive, maxExclusive Inclusive of any literal no defaults
String-based: minLength default 0; maxLength optional; pattern regex; languageIn list of language tags; uniqueLang default false
Logical: not one Shape; and or or xone list of Shapes
Shape-based: node one NodeShape; property one PropertyShape; qualifiedValueShape one Shape; qualifiedMinCount default 0; qualifiedMaxCount optional
Other: closed default false; ignoredProperties list default empty; hasValue any; in list of allowed values

4 Validation Report Model
ValidationReport: conforms xsd:boolean, result list of ValidationResult, shapesGraphWellFormed xsd:boolean
ValidationResult: focusNode any, resultPath property or path, value any, sourceShape Shape, sourceConstraintComponent IRI, detail nested ValidationResult, resultMessage string, resultSeverity Severity

5 SHACL List Semantics
Definition of SHACL list: rdf:nil or node with exactly one rdf:first and one rdf:rest linking to another list, no cycles, member order by rdf:first then rdf:rest chain

## Original Source
RDF Graph Shape Validation Standards: SHACL & ShEx
https://www.w3.org/TR/shacl/

## Digest of SHACL_CORE

# SHACL CORE LANGUAGE SPECIFICATION

## Namespace Prefix Bindings
rdf  http://www.w3.org/1999/02/22-rdf-syntax-ns#
rdfs http://www.w3.org/2000/01/rdf-schema#
sh   http://www.w3.org/ns/shacl#
owl  http://www.w3.org/2002/07/owl#
xsd  http://www.w3.org/2001/XMLSchema#
ex   http://example.com/ns#

## Core Classes and Properties
sh:Shape
  sh:targetClass    rdfs:Class             
  sh:targetNode     any IRI or literal    
  sh:targetObjectsOf rdf:Property         
  sh:targetSubjectsOf rdf:Property        
  sh:deactivated    xsd:boolean default false
  sh:severity       sh:Severity default sh:Violation
  sh:message        xsd:string or rdf:langString default none

sh:NodeShape   subclass of sh:Shape
  sh:property   sh:PropertyShape (multiple)
  sh:closed     xsd:boolean default false
  sh:ignoredProperties rdf:List default rdf:nil

sh:PropertyShape   subclass of sh:Shape
  sh:path        rdf:Property or sequence path
  sh:minCount    xsd:integer default 1
  sh:maxCount    xsd:integer no default
  sh:datatype    rdfs:Resource
  sh:class       rdfs:Resource
  sh:node        sh:NodeShape
  sh:name        xsd:string
  sh:description xsd:string
  sh:defaultValue any
  sh:group       sh:PropertyGroup

## Constraint Components and Parameters
Value Type
  sh:class       rdfs:Resource required
  sh:datatype    rdfs:Resource required
  sh:nodeKind    [ sh:IRI sh:BlankNode sh:Literal ] default none

Cardinality
  sh:minCount    xsd:integer default 0
  sh:maxCount    xsd:integer no default

Value Range
  sh:minExclusive   anyLiteral no default
  sh:minInclusive   anyLiteral no default
  sh:maxExclusive   anyLiteral no default
  sh:maxInclusive   anyLiteral no default

String-based
  sh:minLength   xsd:integer default 0
  sh:maxLength   xsd:integer no default
  sh:pattern     xsd:string regex no default
  sh:languageIn  rdf:List of xsd:languageTags default rdf:nil
  sh:uniqueLang  xsd:boolean default false

Logical
  sh:not           sh:Shape
  sh:and           rdf:List of sh:Shape
  sh:or            rdf:List of sh:Shape
  sh:xone          rdf:List of sh:Shape

Shape-based
  sh:node            sh:NodeShape
  sh:property        sh:PropertyShape
  sh:qualifiedValueShape       sh:Shape
  sh:qualifiedMinCount         xsd:integer default 0
  sh:qualifiedMaxCount         xsd:integer no default

Other
  sh:closed            xsd:boolean default false
  sh:ignoredProperties rdf:List default rdf:nil
  sh:hasValue          any
  sh:in                rdf:List of allowed values

## Validation Report Structure
sh:ValidationReport
  sh:conforms         xsd:boolean
  sh:result           rdf:List of sh:ValidationResult
  sh:shapesGraphWellFormed xsd:boolean

sh:ValidationResult
  sh:focusNode       any
  sh:resultPath      rdf:Property or path
  sh:value           any
  sh:sourceShape     sh:Shape
  sh:sourceConstraintComponent  rdf:IRI
  sh:detail          sh:ValidationResult
  sh:resultMessage   xsd:string or rdf:langString
  sh:resultSeverity  sh:Severity

## SHACL List Definition
A SHACL list is either rdf:nil or a node with exactly one rdf:first and one rdf:rest whose object is another SHACL list. Members order follow rdf:first then rdf:rest chain. No cycles.



## Attribution
- Source: RDF Graph Shape Validation Standards: SHACL & ShEx
- URL: https://www.w3.org/TR/shacl/
- License: License if known
- Crawl Date: 2025-04-29T20:51:52.892Z
- Data Size: 18127168 bytes
- Links Found: 144052

## Retrieved
2025-04-29
