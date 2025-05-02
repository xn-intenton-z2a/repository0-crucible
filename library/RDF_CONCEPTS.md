# RDF_CONCEPTS

## Crawl Summary
RDF graphs are sets of triples subject predicate object with terms IRI blank node literal. IRIs must be absolute RFC3987 strings; equality via string comparison. Literals are lexical form datatype IRI optional language tag; simple literals map to xsd:string. Blank nodes local anonymous identifiers; use Skolem IRIs under /.well-known/genid/ for global identification. RDF datasets include one default graph and named graphs with unique names. Recognized datatypes are RDF-compatible XSD types and rdf:HTML rdf:XMLLiteral. Graph and dataset isomorphism defined by bijection on blank nodes preserving terms.

## Normalised Extract
Table of Contents:
1. RDF Triple Structure
2. RDF Term Specifications
3. IRI Syntax and Equality
4. Literal Composition and Value Mapping
5. Blank Node Handling and Skolemization
6. RDF Graph Definition
7. RDF Dataset Structure
8. Recognized Datatype IRIs

1. RDF Triple Structure
Subject: IRI or blank node
Predicate: IRI
Object: IRI, literal, or blank node
Triples form unordered sets representing RDF graphs.

2. RDF Term Specifications
IRI: Unicode string per RFC3987 absolute form
Literal: lexical form, datatype IRI, optional language tag for rdf:langString; simple literal equals xsd:string
Blank node: anonymous term, not equal to any IRI or literal

3. IRI Syntax and Equality
IRIs must conform to RFC3987 syntax, be absolute, may include fragments. Compare IRIs by exact character sequence. Avoid non-normal forms: uppercase scheme or domain, unnecessary percent-encoding, default ports, empty path, dot segments, lowercase hex in percent-encoding, non-NFC Unicode.

4. Literal Composition and Value Mapping
Lexical form must be Unicode NFC. Datatype IRI directs lexical-to-value function. If lexical form outside datatype lexical space, literal is ill-typed but accepted. Language-tagged strings use rdf:langString and valid BCP47 tag.

5. Blank Node Handling and Skolemization
Blank nodes carry no global identifier. To substitute, generate Skolem IRIs under authority A: https://A/.well-known/genid/UniqueSuffix. Enables ID persistence and exchange.

6. RDF Graph Definition
Graph: set of triples. Graph isomorphism: existence of bijection mapping blank nodes between graphs preserving IRIs, literals, and triple membership.

7. RDF Dataset Structure
Dataset: one default graph plus zero or more named graphs. Named graph: pair (nameTerm, RDF graph), where nameTerm is IRI or blank node. Graph names unique. Blank nodes may be shared across graphs. SPARQL 1.1 requires IRI names; skolemize blank nodes when targeting SPARQL.

8. Recognized Datatype IRIs
All http://www.w3.org/2001/XMLSchema#xxx must refer to xsd:xxx RDF-compatible type. Allocate rdf:HTML at http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML and rdf:XMLLiteral at http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral. Datatypes define lexical space value space and mapping.

## Supplementary Details
IRI Normalization Checklist:
- scheme and authority to lowercase
- omit default port
- ensure non-empty path ending with '/'
- remove '/./' and '/../'
- uppercase hex in percent-encoding
- NFC normalization

Recommended RDF-Compatible XSD Types (IRI and Value Space):
xsd:string: Unicode strings
xsd:boolean: {"true","false","1","0"}
xsd:integer: arbitrary precision integers
xsd:decimal: arbitrary precision decimals
xsd:float: IEEE 754 32-bit
xsd:double: IEEE 754 64-bit
xsd:date: YYYY-MM-DD with optional timezone
xsd:dateTime: ISO 8601 date-time
xsd:duration: ISO 8601 durations
xsd:hexBinary: hex-encoded binary
xsd:base64Binary: base64-encoded binary

Skolemization Implementation Steps:
1. For each blank node in graph, generate UUID or counter
2. Construct Skolem IRI: baseAuthority + '/.well-known/genid/' + identifier
3. Replace blank node label with Skolem IRI in each triple

Dataset Construction Pattern:
1. Define defaultGraphTriples array
2. Define namedGraphs map from IRI/blank node to triple arrays
3. When serializing for SPARQL, ensure all graph names are IRIs; replace blank node names with Skolem IRIs


## Reference Details
RDF Graph Model API Signatures (pseudocode):
interface RDFTerm {}
class NamedNode implements RDFTerm {
  constructor(value: string)
  value: string // absolute IRI
}
class BlankNode implements RDFTerm {
  constructor(id?: string)
  id: string // local identifier
}
class Literal implements RDFTerm {
  constructor(value: string, datatype?: NamedNode, language?: string)
  value: string
  datatype: NamedNode
  language: string
}
class Triple {
  constructor(subject: RDFTerm, predicate: NamedNode, object: RDFTerm)
  subject: RDFTerm
  predicate: NamedNode
  object: RDFTerm
}
class Graph {
  triples: Set<Triple>
  add(triple: Triple): void
  has(triple: Triple): boolean
  isomorphic(other: Graph): boolean
}
class Dataset {
  defaultGraph: Graph
  namedGraphs: Map<RDFTerm, Graph>
  addNamedGraph(name: RDFTerm, graph: Graph): void
  getGraph(name: RDFTerm): Graph | undefined
}

Code Example: Skolemizing blank nodes
const graph = new Graph();
graph.add(new BlankNode('b0'), new NamedNode('http://example.com/p'), new Literal('value', new NamedNode('http://www.w3.org/2001/XMLSchema#string')));
const skolemBase = 'http://example.com/.well-known/genid/';
let counter=0;
graph.triples.forEach(t => {
  if (t.subject instanceof BlankNode) {
    t.subject = new NamedNode(skolemBase + (counter++));
  }
  if (t.object instanceof BlankNode) {
    t.object = new NamedNode(skolemBase + (counter++));
  }
});

Best Practice: Always normalize IRIs at creation:
function normalizeIri(iri: string): string {
  // use ICU or URL API to lowercase host, remove default port, normalize path, NFC
}

Troubleshooting:
Command: rapper -i turtle -o ntriples input.ttl > output.nt
Expected: no syntax errors, resulting N-Triples on stdout
If ill-typed literal encountered, warnings like "Warning: ill-typed literal 'abc'^^<xsd:integer>"

SPARQL Dataset Usage:
When using GRAPH ?g { ?s ?p ?o }, ensure ?g bound only to IRI values. If dataset contains blank-node-named graphs, skolemize first to avoid empty results.

## Information Dense Extract
Triples: subject(IR|BN) predicate(IR) object(IR|LT|BN). IRIs: RFC3987 absolute, simple string comparison, normalize scheme/host lowercase, remove default port, percent-encoding uppercase, strip dot segments, NFC. Literals: (lexicalForm, datatypeIRI, [langTag]), simpleLiterals map to xsd:string, illTyped accepted. BlankNodes local, skolemize to https://domain/.well-known/genid/ID. Graph: set<Triple>, isomorphic if blank-node bijection. Dataset: defaultGraph + Map<name(RI|BN),Graph>, SPARQL requires IRI names. Recognized Datatypes: xsd:string, boolean, integer, decimal, float, double, date, dateTime, duration, hexBinary, base64Binary, rdf:HTML, rdf:XMLLiteral. API classes: NamedNode(value), BlankNode(id), Literal(value,datatype,lang), Triple(s,p,o), Graph.add(),isomorphic(), Dataset.addNamedGraph(),getGraph(). Normalize IRIs on creation. Skolemization code pattern. Troubleshoot with rapper CLI: warnings for ill-typed literals.

## Sanitised Extract
Table of Contents:
1. RDF Triple Structure
2. RDF Term Specifications
3. IRI Syntax and Equality
4. Literal Composition and Value Mapping
5. Blank Node Handling and Skolemization
6. RDF Graph Definition
7. RDF Dataset Structure
8. Recognized Datatype IRIs

1. RDF Triple Structure
Subject: IRI or blank node
Predicate: IRI
Object: IRI, literal, or blank node
Triples form unordered sets representing RDF graphs.

2. RDF Term Specifications
IRI: Unicode string per RFC3987 absolute form
Literal: lexical form, datatype IRI, optional language tag for rdf:langString; simple literal equals xsd:string
Blank node: anonymous term, not equal to any IRI or literal

3. IRI Syntax and Equality
IRIs must conform to RFC3987 syntax, be absolute, may include fragments. Compare IRIs by exact character sequence. Avoid non-normal forms: uppercase scheme or domain, unnecessary percent-encoding, default ports, empty path, dot segments, lowercase hex in percent-encoding, non-NFC Unicode.

4. Literal Composition and Value Mapping
Lexical form must be Unicode NFC. Datatype IRI directs lexical-to-value function. If lexical form outside datatype lexical space, literal is ill-typed but accepted. Language-tagged strings use rdf:langString and valid BCP47 tag.

5. Blank Node Handling and Skolemization
Blank nodes carry no global identifier. To substitute, generate Skolem IRIs under authority A: https://A/.well-known/genid/UniqueSuffix. Enables ID persistence and exchange.

6. RDF Graph Definition
Graph: set of triples. Graph isomorphism: existence of bijection mapping blank nodes between graphs preserving IRIs, literals, and triple membership.

7. RDF Dataset Structure
Dataset: one default graph plus zero or more named graphs. Named graph: pair (nameTerm, RDF graph), where nameTerm is IRI or blank node. Graph names unique. Blank nodes may be shared across graphs. SPARQL 1.1 requires IRI names; skolemize blank nodes when targeting SPARQL.

8. Recognized Datatype IRIs
All http://www.w3.org/2001/XMLSchema#xxx must refer to xsd:xxx RDF-compatible type. Allocate rdf:HTML at http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML and rdf:XMLLiteral at http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral. Datatypes define lexical space value space and mapping.

## Original Source
RDF 1.1 Concepts and Abstract Syntax
https://www.w3.org/TR/rdf11-concepts/

## Digest of RDF_CONCEPTS

# RDF Triples
An RDF triple consists of three components:
- Subject: an IRI or a blank node
- Predicate: an IRI
- Object: an IRI, a literal, or a blank node
Triples are ordered as subject predicate object and collected in sets called RDF graphs.

# RDF Terms
IRIs, literals, and blank nodes. Term equality:
- IRI equality: simple string comparison per RFC3987 section 5.1, no further normalization
- Literal equality: identical lexical form, datatype IRI, and language tag if present
- Blank nodes: disjoint from IRIs and literals; identifiers not part of abstract syntax

# IRIs
Syntax: Unicode string conforming to RFC3987, absolute, may contain fragment identifiers
Normalization to avoid interoperability issues:
- Lowercase scheme and domain
- Avoid unnecessary percent-encoding
- Omit default port 80 in HTTP
- Ensure non-empty path
- Remove "/./" and "/../"
- Use uppercase hex digits in percent-encoding
- Unicode Normalization Form C

# Literals
Components:
- Lexical form: Unicode string (should be NFC)
- Datatype IRI: identifies mapping from lexical form to value
- Optional language tag for rdf:langString
Simple literal without datatype or language tag defaults to datatype xsd:string
Datatype mapping:
- If recognized, apply lexical-to-value mapping or accept ill-typed as graph generation

# Blank Nodes and Skolemization
Blank nodes are anonymous; to skolemize, mint a unique IRI per blank node. Use well-known IRI path /.well-known/genid/ under an HTTP or HTTPS authority. Example: http://example.com/.well-known/genid/12345

# RDF Graphs
An RDF graph is a set of triples. Graph isomorphism defined via bijection on blank nodes preserving IRIs and literals.

# RDF Datasets
Consist of exactly one default graph and zero or more named graphs (IRI or blank node name paired with graph). Named graphs may share blank nodes with the default graph. SPARQL uses only IRI names for named graphs; skolemize blank-node graph names to IRI to avoid interoperability issues.

# Datatypes
Recognized datatype IRIs must refer to RDF-compatible XSD types (http://www.w3.org/2001/XMLSchema#xxx) or rdf:HTML, rdf:XMLLiteral. XML Schema types and mapping:
- boolean, integer, decimal, float, double, string, dateTime, etc.

# Fragment Identifiers
Any IRI fragment identifier is part of the IRI; resolution and interaction outside abstract syntax not defined here.

## Attribution
- Source: RDF 1.1 Concepts and Abstract Syntax
- URL: https://www.w3.org/TR/rdf11-concepts/
- License: W3C Document License (CC-BY 4.0)
- Crawl Date: 2025-05-02T20:24:00.529Z
- Data Size: 49707300 bytes
- Links Found: 139852

## Retrieved
2025-05-02
