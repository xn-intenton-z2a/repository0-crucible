# OWL2_OVERVIEW

## Crawl Summary
Syntaxes  : RDF/XML (mandatory), OWL/XML, Functional, Manchester, Turtle (optional). Semantics : Direct (SROIQ-based, OWL 2 DL), RDF-Based (OWL 2 Full). Profiles : EL (polytime), QL (AC0 via SQL), RL (polytime rule-based). Relationship to OWL 1: full backward compatibility, new expressivity: qualified cardinality, asymmetric/reflexive/disjoint properties, richer datatypes, enhanced annotations.

## Normalised Extract
Table of Contents
1 Syntaxes
2 Semantics
3 Profiles
4 Relationship to OWL 1

1 Syntaxes
- RDF/XML: MappingToRDFGraphs+RDF/XML; mandatory; all tools must support it for interchange
- OWL/XML: XMLSerialization; optional; use with XML tools (schema, XQuery)
- Functional Syntax: StructuralSpecification; optional; functional-style serialization matching UML-based structural spec
- Manchester Syntax: ManchesterSyntax; optional; human-readable DL syntax for editors
- Turtle: MappingToRDFGraphs+Turtle; optional; human-friendly RDF triples

2 Semantics
- Direct Semantics: assigns model-theoretic semantics compatible with SROIQ DL; applies only to OWL 2 DL ontologies that satisfy syntactic restrictions (e.g., no transitive properties in cardinality restrictions)
- RDF-Based Semantics: extends RDF Semantics to OWL 2; applies to any OWL 2 ontology serialized as RDF; guarantees soundness, completeness within OWL 2 RL ground atomic queries (PR1)
- Correspondence Theorem (OWL 2 RDF-Based Semantics §7.2): for any OWL 2 DL ontology, inferences under Direct Semantics remain valid under RDF-Based Semantics after mapping

3 Profiles
- OWL 2 EL: subset allowing only conjunctions, existential restrictions on simple roles; reasoning in polynomial time; target: very large ontologies requiring performance guarantees
- OWL 2 QL: subset allowing conjunctive queries answering in AC0 via standard SQL databases; target: large ABox, lightweight TBox, direct relational data access
- OWL 2 RL: rule-based subset supporting polynomial-time reasoning via forward-chaining rules on RDF triples; sound for all OWL 2 ontologies, complete for RL-consistent ones under ground atomic queries (PR1)

4 Relationship to OWL 1
- Full backward compatibility: OWL 1 ontologies valid under OWL 2 with identical inferences
- New features: disjoint union of classes, rich datatypes/dataRanges, qualified cardinalities, asymmetric/reflexive/disjoint properties, annotation enhancements
- Added three profiles, new Manchester Syntax, relaxed some DL restrictions

## Supplementary Details
1. Direct Semantics Syntactic Conditions (OWL 2 DL):
   - TransitiveProperty cannot appear in ObjectExactCardinality, ObjectMaxCardinality, ObjectMinCardinality restrictions
   - Disjoint Union declarations allowed only on named classes
   - Datatype definitions must reference XSD 1.1 built-in or user-defined datatypes as per OWL 2 Structural Spec §4
2. OWL/XML Root Element: <Ontology xmlns="http://www.w3.org/2002/07/owl#" xml:base="baseIRI">
   - child elements: Declaration, Annotation, Axiom elements
3. Manchester Syntax Prefix Declarations:
   Prefix: owl: = <http://www.w3.org/2002/07/owl#>
   Prefix: rdf: = <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
   Prefix: xsd: = <http://www.w3.org/2001/XMLSchema#>
   ClassAssertion(:John :Person)
   ObjectPropertyAssertion(:hasParent :John :Mary)
4. RDF/XML Serialization Element for Class declaration:
   <owl:Class rdf:about="http://example.org/Person"/>

## Reference Details
No SDK or code-level APIs defined in Overview. Use the following normative documents for API details and method signatures:
- OWL 2 Structural Specification and Functional-Style Syntax: full grammar, functional-style declarations, element types, UML diagrams
- OWL 2 Mapping to RDF Graphs: exact mapping rules from functional syntax to RDF triples
- OWL 2 RDF-Based Semantics: RDFSemantics extension conditions, semantic conditions, interpretations, entailment regimes
- OWL 2 Direct Semantics: SROIQ interpretation rules, datatype semantics, entailment conditions
- OWL 2 Conformance: conformance test suite definitions, required tool behaviors


## Information Dense Extract
Syntaxes:RDF/XML(mandatory),OWL/XML,Functional,Manchester,Turtle. Semantics:Direct(SROIQ DL, OWL 2 DL only; no transitive in cardinals),RDF-Based(OWL 2 Full; sound, RL complete under PR1). Profiles:EL(polytime),QL(AC0 via SQL),RL(polytime rule-based, sound for all, RL-consistent complete). Backward compatible OWL 1. New features:qualCard,richDatatypes,asymm/reflexive/disjointProps,annotations,profiles,ManchesterSyntax.

## Sanitised Extract
Table of Contents
1 Syntaxes
2 Semantics
3 Profiles
4 Relationship to OWL 1

1 Syntaxes
- RDF/XML: MappingToRDFGraphs+RDF/XML; mandatory; all tools must support it for interchange
- OWL/XML: XMLSerialization; optional; use with XML tools (schema, XQuery)
- Functional Syntax: StructuralSpecification; optional; functional-style serialization matching UML-based structural spec
- Manchester Syntax: ManchesterSyntax; optional; human-readable DL syntax for editors
- Turtle: MappingToRDFGraphs+Turtle; optional; human-friendly RDF triples

2 Semantics
- Direct Semantics: assigns model-theoretic semantics compatible with SROIQ DL; applies only to OWL 2 DL ontologies that satisfy syntactic restrictions (e.g., no transitive properties in cardinality restrictions)
- RDF-Based Semantics: extends RDF Semantics to OWL 2; applies to any OWL 2 ontology serialized as RDF; guarantees soundness, completeness within OWL 2 RL ground atomic queries (PR1)
- Correspondence Theorem (OWL 2 RDF-Based Semantics 7.2): for any OWL 2 DL ontology, inferences under Direct Semantics remain valid under RDF-Based Semantics after mapping

3 Profiles
- OWL 2 EL: subset allowing only conjunctions, existential restrictions on simple roles; reasoning in polynomial time; target: very large ontologies requiring performance guarantees
- OWL 2 QL: subset allowing conjunctive queries answering in AC0 via standard SQL databases; target: large ABox, lightweight TBox, direct relational data access
- OWL 2 RL: rule-based subset supporting polynomial-time reasoning via forward-chaining rules on RDF triples; sound for all OWL 2 ontologies, complete for RL-consistent ones under ground atomic queries (PR1)

4 Relationship to OWL 1
- Full backward compatibility: OWL 1 ontologies valid under OWL 2 with identical inferences
- New features: disjoint union of classes, rich datatypes/dataRanges, qualified cardinalities, asymmetric/reflexive/disjoint properties, annotation enhancements
- Added three profiles, new Manchester Syntax, relaxed some DL restrictions

## Original Source
OWL 2 Web Ontology Language Overview
https://www.w3.org/TR/owl2-overview/

## Digest of OWL2_OVERVIEW

# Syntaxes

Name            | Specification Document          | Status              | Purpose
--------------  | ------------------------------- | ------------------- | -------------------------------------------------
RDF/XML         | Mapping to RDF Graphs, RDF/XML  | Mandatory           | Interchange syntax; must be supported by all OWL 2 tools
OWL/XML         | XML Serialization               | Optional            | XML-based syntax; integrates with XML tools
Functional Syntax| Structural Specification        | Optional            | Compact functional-style syntax matching structural spec
Manchester Syntax| Manchester Syntax              | Optional            | Human-readable DL syntax for editors and UIs
Turtle          | Mapping to RDF Graphs, Turtle   | Optional (Not WG)   | Alternative RDF serialization; human-friendly triples

# Semantics

Direct Semantics (OWL 2 DL):
- Based on SROIQ description logic model-theoretic semantics
- Requires DL restrictions: no use of transitive properties in number restrictions; global syntactic conditions (see Structural Spec §3)
- Interprets OWL 2 DL ontologies via Direct Semantics document

RDF-Based Semantics (OWL 2 Full):
- Extends RDF Semantics to OWL 2
- Applies to any OWL 2 ontology mapped to RDF graphs
- Guarantees soundness; completeness only within OWL 2 RL under PR1

Correspondence: Inferences under Direct Semantics remain valid under RDF-Based Semantics after mapping (see RDF-Based Semantics §7.2)

# Profiles

Profile | Syntactic Scope                | Complexity    | Use Case
------- | ------------------------------ | ------------  | ---------------------------------------------------------
OWL 2 EL | Syntactic subset enabling EL   | PTime reasoning | Very large ontologies; polynomial-time guarantees
OWL 2 QL | Syntactic subset enabling QL   | AC0 query evaluation via SQL | Lightweight TBox with large ABox; direct DB querying
OWL 2 RL | Rule-based subset of OWL 2     | PTime rule evaluation | RDF triple rule engines; sound but potentially incomplete

# Relationship to OWL 1

- All OWL 1 ontologies remain valid OWL 2 ontologies with unchanged inferences
- Primary syntaxes, semantics correspondence theorem, and interoperability remain intact
- New features include qualified cardinality, richer datatypes, asymmetric/reflexive/disjoint properties, enhanced annotations, three new profiles, Manchester Syntax, and relaxed DL restrictions

# Change Log Highlights

5 April 2012: XSD 1.1 datatypes required; removed optional dependency note on XSD 1.1 Candidate Rec.
No substantive changes since 27 Oct 2009 Recommendation


## Attribution
- Source: OWL 2 Web Ontology Language Overview
- URL: https://www.w3.org/TR/owl2-overview/
- License: W3C Document License
- Crawl Date: 2025-05-02T13:48:39.973Z
- Data Size: 13312054 bytes
- Links Found: 31919

## Retrieved
2025-05-02
