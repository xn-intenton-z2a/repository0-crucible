# OWL2_PRIMER

## Crawl Summary
Functional-Style Syntax templates for core OWL constructs: ClassAssertion( Class Individual ), SubClassOf( SubClass SuperClass ), EquivalentClasses( ClassList ), DisjointClasses( ClassList ), ObjectPropertyAssertion( Property Subject Object ), NegativeObjectPropertyAssertion( Property Subject Object ), SubObjectPropertyOf( SubProperty SuperProperty ), ObjectPropertyDomain( Property Class ), ObjectPropertyRange( Property Class ), DataPropertyAssertion( Property Subject Literal^^xsdType ), NegativeDataPropertyAssertion( Property Subject Literal^^xsdType ), DataPropertyDomain( Property Class ), DataPropertyRange( Property xsdType ). All shown with matching Turtle serialization. Leveraging IRIs per RFC3987, datatypes from XML Schema. Naming conventions: unambiguous inflected or hasOf forms. Open-world semantics, no unique names assumption. Tools must support RDF/XML mapping, Manchester, Turtle, Functional-Style and OWL/XML syntaxes.

## Normalised Extract
Table of Contents
1 Class Assertions
2 Subclass Axioms
3 Equivalent Classes
4 Disjoint Classes
5 Object Property Assertions
6 Negative Object Property Assertions
7 Property Hierarchies
8 Domain and Range Restrictions
9 Data Property Assertions
10 Negative Data Property Assertions
11 Data Property Domain and Range

1 Class Assertions
Functional-Style: ClassAssertion( :Class :Individual )
Turtle: :Individual rdf type :Class .

2 Subclass Axioms
Functional-Style: SubClassOf( :SubClass :SuperClass )
Turtle: :SubClass rdfs subClassOf :SuperClass .

3 Equivalent Classes
Functional-Style: EquivalentClasses( :Class1 :Class2 )
Turtle: :Class1 owl equivalentClass :Class2 .

4 Disjoint Classes
Functional-Style: DisjointClasses( :ClassA :ClassB )
Turtle: [] rdf type owl AllDisjointClasses ; owl members ( :ClassA :ClassB ) .

5 Object Property Assertions
Functional-Style: ObjectPropertyAssertion( :Property :Subject :Object )
Turtle: :Subject :Property :Object .

6 Negative Object Property Assertions
Functional-Style: NegativeObjectPropertyAssertion( :Property :Subject :Object )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetIndividual :Object .

7 Property Hierarchies
Functional-Style: SubObjectPropertyOf( :SubProperty :SuperProperty )
Turtle: :SubProperty rdfs subPropertyOf :SuperProperty .

8 Domain and Range Restrictions
Functional-Style: ObjectPropertyDomain( :Property :DomainClass )
ObjectPropertyRange( :Property :RangeClass )
Turtle: :Property rdfs domain :DomainClass ; rdfs range :RangeClass .

9 Data Property Assertions
Functional-Style: DataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: :Subject :Property Literal .

10 Negative Data Property Assertions
Functional-Style: NegativeDataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetValue Literal .

11 Data Property Domain and Range
Functional-Style: DataPropertyDomain( :Property :DomainClass )
DataPropertyRange( :Property xsdType )
Turtle: :Property rdfs domain :DomainClass ; rdfs range xsdType .

## Supplementary Details
IRI and datatype specifications
- IRIs per RFC3987, abbreviate with prefixes defined via PrefixDeclaration in Section 8.2
- Datatypes: all XML Schema primitive and derived: xsd string, integer, nonNegativeInteger, boolean, dateTime, double etc.

Mandatory syntax support
- OWL 2 tools must support RDF/XML mapping [OWL 2 RDF Mapping]
- Optional syntaxes: Functional-Style, Manchester, OWL/XML

Semantics and reasoning
- Open-world assumption: absence of assertion is not negative
- No unique names assumption: sameAs and differentFrom must be declared explicitly
- Reasoners compliant with Direct Semantics [OWL 2 Direct Semantics] and RDF-Based Semantics [OWL 2 RDF-Based Semantics]

Abbreviation and namespace
- Use PrefixDeclaration to bind IRI prefixes (ex: prefix : <http://example.org/> )

Best practices
- Name object properties with directional verbs (loves, hasChild) or hasOf pattern (parentOf)
- Always declare disjointness for sibling classes to enable unsatisfiable class detection
- Avoid domain/range as closed constraints; use only to infer type


## Reference Details
OWL API Implementation Patterns (Java)

Manager and DataFactory
```
OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
OWLDataFactory factory = manager.getOWLDataFactory();
OWLOntology ontology = manager.createOntology(IRI.create("http://example.org/ontology"));
```

Add ClassAssertion
```
OWLAxiom ax1 = factory.getOWLClassAssertionAxiom(
  factory.getOWLClass(IRI.create("http://example.org#Person")),
  factory.getOWLNamedIndividual(IRI.create("http://example.org#Mary"))
);
manager.applyChange(new AddAxiom(ontology, ax1));
```

Add Subclass axiom
```
OWLAxiom ax2 = factory.getOWLSubClassOfAxiom(
  factory.getOWLClass(IRI.create("http://example.org#Woman")),
  factory.getOWLClass(IRI.create("http://example.org#Person"))
);
manager.applyChange(new AddAxiom(ontology, ax2));
```

Negative Data Property Assertion
```
OWLAxiom ax3 = factory.getOWLNegativeDataPropertyAssertionAxiom(
  factory.getOWLDataProperty(IRI.create("http://example.org#hasAge")),
  factory.getOWLNamedIndividual(IRI.create("http://example.org#Jack")),
  factory.getOWLLiteral(53, OWL2Datatype.XSD_INTEGER)
);
manager.applyChange(new AddAxiom(ontology, ax3));
```

Reasoning and Troubleshooting
1. Load ontology
2. Use HermiT via OWL API
```
OWLReasonerFactory reasonerFactory = new org.semanticweb.HermiT.ReasonerFactory();
OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);
reasoner.precomputeInferences(InferenceType.CLASS_HIERARCHY, InferenceType.CLASS_ASSERTIONS);
```
3. Detect unintended inferences
```
NodeSet<OWLClass> types = reasoner.getTypes(
  factory.getOWLNamedIndividual(IRI.create("http://example.org#Felix")),
  true
);
System.out.println(types.getFlattened()); // Expected [http://example.org#Person]
```

Command-line Reasoning with ROBOT
```
robot reason --input example.owl --reasoner ELK --output classified.owl
robot verify --input classified.owl
```
Expected: no unsatisfiable classes; violations reported with line numbers.

Configuration Options
- choose reasoner: HermiT, ELK, FaCT++; set via reasonerFactory
- ontology format: RDFXMLDocumentFormat, ManchesterSyntaxDocumentFormat, TTLDocumentFormat
- prefix manager: DefaultPrefixManager("http://example.org#")


## Information Dense Extract
ClassAssertion( :C :i ) SubClassOf( :c :C ) EquivalentClasses( :A :B ) DisjointClasses( :A :B ) ObjectPropertyAssertion( :p :s :o ) NegativeObjectPropertyAssertion( :p :s :o ) SubObjectPropertyOf( :p :P ) ObjectPropertyDomain( :p :C ) ObjectPropertyRange( :p :C ) DataPropertyAssertion( :q :s "lit"^^xsd:t ) NegativeDataPropertyAssertion( :q :s "lit"^^xsd:t ) DataPropertyDomain( :q :C ) DataPropertyRange( :q xsd:t )

## Sanitised Extract
Table of Contents
1 Class Assertions
2 Subclass Axioms
3 Equivalent Classes
4 Disjoint Classes
5 Object Property Assertions
6 Negative Object Property Assertions
7 Property Hierarchies
8 Domain and Range Restrictions
9 Data Property Assertions
10 Negative Data Property Assertions
11 Data Property Domain and Range

1 Class Assertions
Functional-Style: ClassAssertion( :Class :Individual )
Turtle: :Individual rdf type :Class .

2 Subclass Axioms
Functional-Style: SubClassOf( :SubClass :SuperClass )
Turtle: :SubClass rdfs subClassOf :SuperClass .

3 Equivalent Classes
Functional-Style: EquivalentClasses( :Class1 :Class2 )
Turtle: :Class1 owl equivalentClass :Class2 .

4 Disjoint Classes
Functional-Style: DisjointClasses( :ClassA :ClassB )
Turtle: [] rdf type owl AllDisjointClasses ; owl members ( :ClassA :ClassB ) .

5 Object Property Assertions
Functional-Style: ObjectPropertyAssertion( :Property :Subject :Object )
Turtle: :Subject :Property :Object .

6 Negative Object Property Assertions
Functional-Style: NegativeObjectPropertyAssertion( :Property :Subject :Object )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetIndividual :Object .

7 Property Hierarchies
Functional-Style: SubObjectPropertyOf( :SubProperty :SuperProperty )
Turtle: :SubProperty rdfs subPropertyOf :SuperProperty .

8 Domain and Range Restrictions
Functional-Style: ObjectPropertyDomain( :Property :DomainClass )
ObjectPropertyRange( :Property :RangeClass )
Turtle: :Property rdfs domain :DomainClass ; rdfs range :RangeClass .

9 Data Property Assertions
Functional-Style: DataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: :Subject :Property Literal .

10 Negative Data Property Assertions
Functional-Style: NegativeDataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetValue Literal .

11 Data Property Domain and Range
Functional-Style: DataPropertyDomain( :Property :DomainClass )
DataPropertyRange( :Property xsdType )
Turtle: :Property rdfs domain :DomainClass ; rdfs range xsdType .

## Original Source
W3C OWL 2 Primer
https://www.w3.org/TR/owl2-primer/

## Digest of OWL2_PRIMER

# OWL 2 Primer Detailed Digest (Retrieved: 2024-06-10)

# Class Assertions
Functional-Style Syntax
ClassAssertion( :Person :Mary )
Turtle Syntax
:Mary rdf type :Person .

# Subclass Axioms
Functional-Style Syntax
SubClassOf( :Woman :Person )
Turtle Syntax
:Woman rdfs subClassOf :Person .

# Equivalent Classes
Functional-Style Syntax
EquivalentClasses( :Person :Human )
Turtle Syntax
:Person owl equivalentClass :Human .

# Disjoint Classes
Functional-Style Syntax
DisjointClasses( :Woman :Man )
Turtle Syntax
[] rdf type owl AllDisjointClasses ; owl members ( :Woman :Man ) .

# Object Property Assertions
Functional-Style Syntax
ObjectPropertyAssertion( :hasWife :John :Mary )
Turtle Syntax
:John :hasWife :Mary .

# Negative Object Property Assertions
Functional-Style Syntax
NegativeObjectPropertyAssertion( :hasWife :Bill :Mary )
Turtle Syntax
[] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Bill ; owl assertionProperty :hasWife ; owl targetIndividual :Mary .

# Property Hierarchies
Functional-Style Syntax
SubObjectPropertyOf( :hasWife :hasSpouse )
Turtle Syntax
:hasWife rdfs subPropertyOf :hasSpouse .

# Domain and Range Restrictions
Functional-Style Syntax
ObjectPropertyDomain( :hasWife :Man )
ObjectPropertyRange( :hasWife :Woman )
Turtle Syntax
:hasWife rdfs domain :Man ; rdfs range :Woman .

# Data Property Assertions
Functional-Style Syntax
DataPropertyAssertion( :hasAge :John 51^^xsd integer )
Turtle Syntax
:John :hasAge 51 .

# Negative Data Property Assertions
Functional-Style Syntax
NegativeDataPropertyAssertion( :hasAge :Jack 53^^xsd integer )
Turtle Syntax
[] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Jack ; owl assertionProperty :hasAge ; owl targetValue 53 .

# Data Property Domain and Range
Functional-Style Syntax
DataPropertyDomain( :hasAge :Person )
DataPropertyRange( :hasAge xsd nonNegativeInteger )
Turtle Syntax
:hasAge rdfs domain :Person ; rdfs range xsd nonNegativeInteger .

## Attribution
- Source: W3C OWL 2 Primer
- URL: https://www.w3.org/TR/owl2-primer/
- License: License
- Crawl Date: 2025-04-27T03:54:12.137Z
- Data Size: 18820085 bytes
- Links Found: 21149

## Retrieved
2025-04-27
