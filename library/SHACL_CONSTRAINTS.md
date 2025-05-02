# SHACL_CONSTRAINTS

## Crawl Summary
Value type constraints: sh:class (domain PropertyShape, range rdfs:Class), sh:datatype (PropertyShape, XML datatype IRI), sh:nodeKind (PropertyShape, one of sh:IRI, sh:BlankNode, sh:Literal, sh:BlankNodeOrIRI). Cardinality constraints: sh:minCount and sh:maxCount accept xsd:integer. Range constraints: sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive accept literals. String constraints: sh:minLength, sh:maxLength integers; sh:pattern regex; sh:languageIn list of xsd:string; sh:uniqueLang boolean. Property pair constraints: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals accept rdf:Property. Logical: sh:not shape; sh:and, sh:or, sh:xone lists of shapes. Shape-based: sh:node NodeShape; sh:property PropertyShape; sh:qualifiedValueShape Shape; sh:qualifiedMinCount, sh:qualifiedMaxCount integers. Other: sh:closed boolean; sh:ignoredProperties list of rdf:Property; sh:hasValue RDF term; sh:in list of terms.

## Normalised Extract
Table of Contents
1. Value Type Constraints
2. Cardinality Constraints
3. Value Range Constraints
4. String Constraints
5. Property Pair Constraints
6. Logical Constraints
7. Shape-Based Constraints
8. Other Constraints

1. Value Type Constraints
   • sh:class — PropertyShape → rdfs:Class; single
   • sh:datatype — PropertyShape → XML datatype IRI; single
   • sh:nodeKind — PropertyShape → sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI; single

2. Cardinality Constraints
   • sh:minCount — PropertyShape → xsd:integer; single
   • sh:maxCount — PropertyShape → xsd:integer; single

3. Value Range Constraints
   • sh:minExclusive — PropertyShape → literal; single
   • sh:minInclusive — PropertyShape → literal; single
   • sh:maxExclusive — PropertyShape → literal; single
   • sh:maxInclusive — PropertyShape → literal; single

4. String Constraints
   • sh:minLength — PropertyShape → xsd:integer; single
   • sh:maxLength — PropertyShape → xsd:integer; single
   • sh:pattern — PropertyShape → xsd:string (regex); single
   • sh:languageIn — PropertyShape → RDF list of language tags; single
   • sh:uniqueLang — PropertyShape → xsd:boolean; single

5. Property Pair Constraints
   • sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals — PropertyShape → rdf:Property; single each

6. Logical Constraints
   • sh:not — Shape → Shape; single
   • sh:and, sh:or, sh:xone — Shape → RDF list of Shape; single each

7. Shape-Based Constraints
   • sh:node — PropertyShape → NodeShape; single
   • sh:property — NodeShape/PropertyShape → PropertyShape; multiple
   • sh:qualifiedValueShape — PropertyShape → Shape; single
   • sh:qualifiedMinCount, sh:qualifiedMaxCount — PropertyShape → xsd:integer; single each

8. Other Constraints
   • sh:closed — NodeShape → xsd:boolean; single
   • sh:ignoredProperties — NodeShape → RDF list of rdf:Property; single
   • sh:hasValue — PropertyShape → any RDF term; single
   • sh:in — PropertyShape → RDF list of RDF terms; single

## Supplementary Details
1. Prefix Declaration: prefix sh: <http://www.w3.org/ns/shacl#>
2. Define a NodeShape:
   ex:MyShape a sh:NodeShape;
     sh:targetClass ex:Person;
     sh:property [ sh:path ex:age; sh:datatype xsd:integer; sh:minInclusive 0; sh:maxInclusive 150 ].
3. Cardinality: omit sh:maxCount for unbounded; omit sh:minCount to allow zero.
4. Combine constraints by listing multiple parameters within a property shape.
5. Use RDF lists for sh:and, sh:or, sh:xone and sh:in:
   _:list1 rdf:first ex:Value1; rdf:rest _:list2. _:list2 rdf:first ex:Value2; rdf:rest rdf:nil.
6. To restrict by nodeKind: sh:nodeKind sh:IRI.
7. To disallow additional properties: set sh:closed true and list allowed predicates in sh:property or sh:ignoredProperties.
8. For qualified counts: include sh:qualifiedValueShape and sh:qualifiedMinCount/MaxCount in the same property shape block.


## Reference Details
Vocabulary domain/range/cardinality per parameter as listed in detailed digest. Turtle example:

@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix ex: <http://example.com/ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

en:PersonShape a sh:NodeShape;
  sh:targetClass ex:Person;
  sh:closed true;
  sh:property [
    sh:path ex:ssn;
    sh:datatype xsd:string;
    sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$";
    sh:maxCount 1
  ];
  sh:property [
    sh:path ex:worksFor;
    sh:nodeKind sh:IRI;
    sh:class ex:Company
  ];
  sh:ignoredProperties ( rdf:type ) .

Apache Jena validation Java API:

import org.apache.jena.rdf.model.Model;
import org.apache.jena.shacl.ValidationReport;
import org.apache.jena.shacl.ShaclValidator;

Model shapes = RDFDataMgr.loadModel("shapes.ttl");
Model data   = RDFDataMgr.loadModel("data.ttl");
ValidationReport report = ShaclValidator.get().validate(shapes.getGraph(), data.getGraph());
boolean conforms = report.conforms();
report.getEntries().forEach(r -> System.out.println(r.message()));

Maven dependency:
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-shacl</artifactId>
  <version>4.8.0</version>
</dependency>

Troubleshooting:
- If shapes graph is ill-formed, the validator throws ShaclValidationException with message starting "Ill-formed shapes graph".
- Enable debug logging: -Djena.shacl.log=true
- Expected output on missing sh:datatype violation: ValidationResult focusNode ex:Alice, path ex:ssn, value "ABC", sourceConstraintComponent sh:pattern.


## Information Dense Extract
sh:class PropertyShape→rdfs:Class 0..1; sh:datatype PropertyShape→xsd:datatype IRI 0..1; sh:nodeKind PropertyShape→sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI 0..1; sh:minCount PropertyShape→xsd:integer 0..1; sh:maxCount PropertyShape→xsd:integer 0..1; sh:minExclusive PropertyShape→literal 0..1; sh:minInclusive PropertyShape→literal 0..1; sh:maxExclusive PropertyShape→literal 0..1; sh:maxInclusive PropertyShape→literal 0..1; sh:minLength PropertyShape→xsd:integer 0..1; sh:maxLength PropertyShape→xsd:integer 0..1; sh:pattern PropertyShape→xsd:string(regex) 0..1; sh:languageIn PropertyShape→rdf:List of xsd:string 0..1; sh:uniqueLang PropertyShape→xsd:boolean 0..1; sh:equals|sh:disjoint|sh:lessThan|sh:lessThanOrEquals PropertyShape→rdf:Property 0..1; sh:not Shape→Shape 0..1; sh:and|sh:or|sh:xone Shape→rdf:List of Shape 0..1; sh:node PropertyShape→NodeShape 0..1; sh:property NodeShape/PropertyShape→PropertyShape 0..*; sh:qualifiedValueShape PropertyShape→Shape 0..1; sh:qualifiedMinCount|sh:qualifiedMaxCount PropertyShape→xsd:integer 0..1; sh:closed NodeShape→xsd:boolean 0..1; sh:ignoredProperties NodeShape→rdf:List of rdf:Property 0..1; sh:hasValue PropertyShape→any RDF term 0..1; sh:in PropertyShape→rdf:List of RDF terms 0..1.

## Sanitised Extract
Table of Contents
1. Value Type Constraints
2. Cardinality Constraints
3. Value Range Constraints
4. String Constraints
5. Property Pair Constraints
6. Logical Constraints
7. Shape-Based Constraints
8. Other Constraints

1. Value Type Constraints
    sh:class  PropertyShape  rdfs:Class; single
    sh:datatype  PropertyShape  XML datatype IRI; single
    sh:nodeKind  PropertyShape  sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI; single

2. Cardinality Constraints
    sh:minCount  PropertyShape  xsd:integer; single
    sh:maxCount  PropertyShape  xsd:integer; single

3. Value Range Constraints
    sh:minExclusive  PropertyShape  literal; single
    sh:minInclusive  PropertyShape  literal; single
    sh:maxExclusive  PropertyShape  literal; single
    sh:maxInclusive  PropertyShape  literal; single

4. String Constraints
    sh:minLength  PropertyShape  xsd:integer; single
    sh:maxLength  PropertyShape  xsd:integer; single
    sh:pattern  PropertyShape  xsd:string (regex); single
    sh:languageIn  PropertyShape  RDF list of language tags; single
    sh:uniqueLang  PropertyShape  xsd:boolean; single

5. Property Pair Constraints
    sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals  PropertyShape  rdf:Property; single each

6. Logical Constraints
    sh:not  Shape  Shape; single
    sh:and, sh:or, sh:xone  Shape  RDF list of Shape; single each

7. Shape-Based Constraints
    sh:node  PropertyShape  NodeShape; single
    sh:property  NodeShape/PropertyShape  PropertyShape; multiple
    sh:qualifiedValueShape  PropertyShape  Shape; single
    sh:qualifiedMinCount, sh:qualifiedMaxCount  PropertyShape  xsd:integer; single each

8. Other Constraints
    sh:closed  NodeShape  xsd:boolean; single
    sh:ignoredProperties  NodeShape  RDF list of rdf:Property; single
    sh:hasValue  PropertyShape  any RDF term; single
    sh:in  PropertyShape  RDF list of RDF terms; single

## Original Source
SHACL – Shapes Constraint Language
https://www.w3.org/TR/shacl/

## Digest of SHACL_CONSTRAINTS

# Core Constraint Components

Date Retrieved: 2024-06-15

## 4.1 Value Type Constraint Components

### 4.1.1 sh:class
• Domain: sh:PropertyShape
• Range: rdfs:Class
• Cardinality: 0..1

### 4.1.2 sh:datatype
• Domain: sh:PropertyShape
• Range: IRI of XML Schema datatype
• Cardinality: 0..1

### 4.1.3 sh:nodeKind
• Domain: sh:PropertyShape
• Range: one of sh:IRI, sh:BlankNode, sh:Literal, sh:BlankNodeOrIRI
• Cardinality: 0..1

## 4.2 Cardinality Constraint Components

### 4.2.1 sh:minCount
• Domain: sh:PropertyShape
• Range: xsd:integer (minimum 0)
• Cardinality: 0..1

### 4.2.2 sh:maxCount
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

## 4.3 Value Range Constraint Components

### 4.3.1 sh:minExclusive
• Domain: sh:PropertyShape
• Range: literal matching datatype of values
• Cardinality: 0..1

### 4.3.2 sh:minInclusive
• Domain: sh:PropertyShape
• Range: literal
• Cardinality: 0..1

### 4.3.3 sh:maxExclusive
• Domain: sh:PropertyShape
• Range: literal
• Cardinality: 0..1

### 4.3.4 sh:maxInclusive
• Domain: sh:PropertyShape
• Range: literal
• Cardinality: 0..1

## 4.4 String-based Constraint Components

### 4.4.1 sh:minLength
• Domain: sh:PropertyShape
• Range: xsd:integer (>=0)
• Cardinality: 0..1

### 4.4.2 sh:maxLength
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

### 4.4.3 sh:pattern
• Domain: sh:PropertyShape
• Range: xsd:string (regular expression)
• Cardinality: 0..1

### 4.4.4 sh:languageIn
• Domain: sh:PropertyShape
• Range: RDF list of xsd:string (language tags)
• Cardinality: 0..1

### 4.4.5 sh:uniqueLang
• Domain: sh:PropertyShape
• Range: xsd:boolean
• Cardinality: 0..1

## 4.5 Property Pair Constraint Components

### 4.5.1 sh:equals
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

### 4.5.2 sh:disjoint
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

### 4.5.3 sh:lessThan
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

### 4.5.4 sh:lessThanOrEquals
• Domain: sh:PropertyShape
• Range: rdf:Property
• Cardinality: 0..1

## 4.6 Logical Constraint Components

### 4.6.1 sh:not
• Domain: sh:Shape
• Range: sh:Shape
• Cardinality: 0..1

### 4.6.2 sh:and
• Domain: sh:Shape
• Range: RDF list of sh:Shape
• Cardinality: 0..1

### 4.6.3 sh:or
• Domain: sh:Shape
• Range: RDF list of sh:Shape
• Cardinality: 0..1

### 4.6.4 sh:xone
• Domain: sh:Shape
• Range: RDF list of sh:Shape
• Cardinality: 0..1

## 4.7 Shape-based Constraint Components

### 4.7.1 sh:node
• Domain: sh:PropertyShape
• Range: sh:NodeShape
• Cardinality: 0..1

### 4.7.2 sh:property
• Domain: sh:NodeShape or sh:PropertyShape
• Range: sh:PropertyShape
• Cardinality: 0..*

### 4.7.3 sh:qualifiedValueShape
• Domain: sh:PropertyShape
• Range: sh:Shape
• Cardinality: 0..1

### 4.7.4 sh:qualifiedMinCount
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

### 4.7.5 sh:qualifiedMaxCount
• Domain: sh:PropertyShape
• Range: xsd:integer
• Cardinality: 0..1

## 4.8 Other Constraint Components

### 4.8.1 sh:closed
• Domain: sh:NodeShape
• Range: xsd:boolean
• Cardinality: 0..1

### 4.8.2 sh:ignoredProperties
• Domain: sh:NodeShape
• Range: RDF list of rdf:Property
• Cardinality: 0..1

### 4.8.3 sh:hasValue
• Domain: sh:PropertyShape
• Range: any RDF term
• Cardinality: 0..1

### 4.8.4 sh:in
• Domain: sh:PropertyShape
• Range: RDF list of allowed RDF terms
• Cardinality: 0..1

## Attribution
- Source: SHACL – Shapes Constraint Language
- URL: https://www.w3.org/TR/shacl/
- License: W3C Document License
- Crawl Date: 2025-05-02T19:13:37.801Z
- Data Size: 15000832 bytes
- Links Found: 118960

## Retrieved
2025-05-02
