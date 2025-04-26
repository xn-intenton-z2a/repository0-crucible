# RDF_SYNTAX

## Crawl Summary
Triples: (subject: IRI|BN, predicate: IRI, object: IRI|Literal|BN). Graph = set of triples. Dataset = default graph + zero+ named graphs. Terms: IRIs must be absolute, RFC3987, simple string equality, normalization guidelines. Literals: lexical form, datatype IRI, optional language tag. Blank nodes: local scope, use Skolem IRIs (.well-known/genid/). Datatypes: supported XSD built-ins + rdf:HTML + rdf:XMLLiteral. Graph isomorphism: bijection on nodes preserving structure. Dataset isomorphism: extends graph iso to named graphs.

## Normalised Extract
Table of Contents
1 RDF Triple Structure
2 RDF Graph Definition
3 RDF Dataset Composition
4 IRI Syntax and Normalization
5 Literal Structure and Value Mapping
6 Blank Node Handling and Skolemization
7 Datatype Recognition
8 Graph/Dataset Isomorphism

1 RDF Triple Structure
subject: IRI or BN; predicate: IRI; object: IRI, Literal, or BN

2 RDF Graph Definition
graph G = set of triples {(s,p,o),...}
nodes(G) = ∪ subjects ∪ objects

3 RDF Dataset Composition
dataset D = { default: Gdefault, named: { (name_i, G_i) } }
name_i = IRI or BN

4 IRI Syntax and Normalization
IRI ::= absolute Unicode string per RFC3987
contains optional fragment. equality: simple string eq
Normalization rules:
  - lower-case scheme/host
  - omit default port
  - avoid /./ and /../
  - NFC unicode
  - minimal percent-encoding

5 Literal Structure and Value Mapping
Literal ::= (lexicalForm, datatypeIRI, [langTag])
lexicalForm ∈ Unicode NFC
datatypeIRI ∈ recognized IRIs
if datatypeIRI = rdf:langString then langTag ∈ BCP47
lexical-to-value: apply datatype-specific mapping; ill-typed literals accepted

6 Blank Node Handling and Skolemization
Blank Node: unlabeled term, local scope
Skolem IRI: https://<auth>/.well-known/genid/<unique>
System MUST mint globally unique Skolem IRIs

7 Datatype Recognition
recognized IRI list:
  - XSD built-ins: xsd:string, xsd:integer, xsd:decimal, xsd:boolean, xsd:dateTime, etc.
  - rdf:HTML
  - rdf:XMLLiteral

8 Graph/Dataset Isomorphism
Graph iso: bijection M on nodes
  M maps IRIs and literals to themselves
  M maps BNs bijectively
  triples preserved: G’ = { (M(s),p,M(o)) }
Dataset iso extends graph iso + preserves graph names


## Supplementary Details
IRI resolution follows RFC3986 base IRI resolution. Relative IRIs in concrete syntaxes resolved against provided base. Implementations SHOULD support parsing IRIs, normalizing to NFC, percent-encode necessary chars. Literal lexical-to-value mapping for XSD datatypes per XML Schema Part2. Implementations recognize ill-typed literals, raise warnings. Blank node Skolemization: generate UUID per BN, prepend well-known path. Ensure Skolem IRI uniqueness. RDF dataset parsing: treat default graph if no named graphs. Implementations SHOULD accept BN graph names but warn for SPARQL compatibility. Graph iso checks: use hash-based node mapping, preserve triple multiset.

## Reference Details
API: rdflib.Graph.add(subject:Term, predicate:Term, object:Term) -> None
rdflib.Graph.triples((subject, predicate, object)) -> Iterator[Triple]
rdflib.Graph.serialize(format:str='turtle', base:str=None) -> str
rdflib.Dataset.default_context: Graph
rdflib.Dataset.contexts() -> Iterator[Graph]

Method Signatures (Python rdflib example):
class Graph:
  def add(self, triple: Tuple[Term,Term,Term]) -> None:
    """Add triple to graph. triple: (s,p,o)"""
  def triples(self, pattern: Tuple[Optional[Term],Optional[Term],Optional[Term]]) -> Iterator[Tuple[Term,Term,Term]]:
    """Return triples matching pattern."""
  def serialize(self, destination:Union[str,IO]=None, format:str='turtle', base:Optional[str]=None) -> Union[str,bytes]:
    """Serialize graph."
class Dataset:
  default_context: Graph
  def add_graph(self, graph:Graph, name:Optional[Term]=None) -> None
  def remove_graph(self, name:Term) -> None

Configuration Options:
parse: format: one of 'turtle', 'trig', 'nquads', 'json-ld'; base: str
serialize: format: same; encoding: 'utf-8'

Best Practices:
- Normalize IRIs before use
- Use Skolem IRIs for BN when merging datasets
- Reject non-absolute IRIs at parse time
- Log warnings on ill-typed literals
- Use named graphs for provenance tracking

Troubleshooting:
Command: rdfpipe --parse turtle --serialize n-quads input.ttl > output.nq
Expected: valid N-Quads; errors printed to stderr for malformed IRIs/literals
Error: Non-absolute IRI => exit code 1 with message "IRI must be absolute:<value>"



## Information Dense Extract
Triple = (s:IRI|BN, p:IRI, o:IRI|Literal|BN); Graph = set<Triple>; Dataset={ default:G, named:Set<(name:IRI|BN,G)> }; IRI: RFC3987 absolute str, simple-string equality, normalize lowercase scheme/host, remove default port, avoid ./. ../, NFC unicode, minimal percent-encoding; Literal=(lexForm:UnicodeNFC, datatypeIRI, lang?); if datatypeIRI=rdf:langString then lang∈BCP47; lexical-to-value per XSD mapping; ill-typed accepted; BN local id, Skolemize->https://<auth>/.well-known/genid/<uuid>; Recognized datatypes: XSD#string,integer,decimal,boolean,dateTime,... + rdf:HTML + rdf:XMLLiteral; Graph iso: bij M(BN↔BN, IRI/lit id, preserve triples); Dataset iso extends graph iso to named graphs; rdflib.Graph.add((s,p,o)); .triples((s,p,o)); .serialize(fmt,base); Dataset.default_context; .add_graph(graph,name); parse formats=['turtle','trig','nquads','json-ld'] base:str; serialize encoding=utf-8; best practices: normalize IRIs, Skolemize BN, reject non-absolute IRIs, log ill-typed; troubleshoot: rdfpipe parse turtle serialize n-quads input.ttl > out.nq; error on non-abs IRI exit1; warnings on ill-typed lirals.

## Sanitised Extract
Table of Contents
1 RDF Triple Structure
2 RDF Graph Definition
3 RDF Dataset Composition
4 IRI Syntax and Normalization
5 Literal Structure and Value Mapping
6 Blank Node Handling and Skolemization
7 Datatype Recognition
8 Graph/Dataset Isomorphism

1 RDF Triple Structure
subject: IRI or BN; predicate: IRI; object: IRI, Literal, or BN

2 RDF Graph Definition
graph G = set of triples {(s,p,o),...}
nodes(G) =  subjects  objects

3 RDF Dataset Composition
dataset D = { default: Gdefault, named: { (name_i, G_i) } }
name_i = IRI or BN

4 IRI Syntax and Normalization
IRI ::= absolute Unicode string per RFC3987
contains optional fragment. equality: simple string eq
Normalization rules:
  - lower-case scheme/host
  - omit default port
  - avoid /./ and /../
  - NFC unicode
  - minimal percent-encoding

5 Literal Structure and Value Mapping
Literal ::= (lexicalForm, datatypeIRI, [langTag])
lexicalForm  Unicode NFC
datatypeIRI  recognized IRIs
if datatypeIRI = rdf:langString then langTag  BCP47
lexical-to-value: apply datatype-specific mapping; ill-typed literals accepted

6 Blank Node Handling and Skolemization
Blank Node: unlabeled term, local scope
Skolem IRI: https://<auth>/.well-known/genid/<unique>
System MUST mint globally unique Skolem IRIs

7 Datatype Recognition
recognized IRI list:
  - XSD built-ins: xsd:string, xsd:integer, xsd:decimal, xsd:boolean, xsd:dateTime, etc.
  - rdf:HTML
  - rdf:XMLLiteral

8 Graph/Dataset Isomorphism
Graph iso: bijection M on nodes
  M maps IRIs and literals to themselves
  M maps BNs bijectively
  triples preserved: G = { (M(s),p,M(o)) }
Dataset iso extends graph iso + preserves graph names

## Original Source
W3C RDF 1.1 Concepts and Abstract Syntax
https://www.w3.org/TR/rdf11-concepts/

## Digest of RDF_SYNTAX

# RDF Abstract Syntax and Concepts

## 1. RDF Graphs

### Triple Structure
- RDF triple = (subject, predicate, object)
- subject: IRI or Blank Node
- predicate: IRI
- object: IRI or Literal or Blank Node

### RDF Graph
- Set of triples
- Nodes = subjects and objects

## 2. RDF Datasets

### Dataset Structure
- default graph: unnamed RDF graph
- named graphs: (graphName, RDF graph) pairs; graphName: IRI or Blank Node

## 3. RDF Terms

### IRIs
- Syntax: Unicode string conforming to RFC3987
- MUST be absolute
- equality: simple string comparison (case-sensitive)
- normalization to avoid:
  - uppercase in scheme/host
  - unnecessary percent-encoding
  - explicit default port
  - empty path
  - "/./" or "/../"
  - unnormalized NFC

### Literals
- lexical form: Unicode string (NFC)
- datatype IRI: identifies datatype
- optional language tag for rdf:langString
- simple literal = lexical form + xsd:string
- equality: lexical form, datatype IRI, language tag match

### Blank Nodes
- unlabeled resources with only local identifiers
- replaceable via Skolem IRIs: .well-known/genid/{id}

## 4. Datatypes

- Recognized datatype IRIs: xmlschema built-ins + rdf:HTML + rdf:XMLLiteral
- XML Schema Datatypes: https://www.w3.org/2001/XMLSchema#xxx

## 5. Skolemization

- Replace blank nodes with Skolem IRIs
- Use .well-known/genid/{uuid}

## 6. Graph/Dataset Comparison

### Graph Isomorphism
- bijection M on nodes
- preserves IRIs and literals
- maps triples

### Dataset Isomorphism
- bijection M on nodes, triples, graphs
- preserves named graphs and default graph



## Attribution
- Source: W3C RDF 1.1 Concepts and Abstract Syntax
- URL: https://www.w3.org/TR/rdf11-concepts/
- License: License
- Crawl Date: 2025-04-26T20:47:03.262Z
- Data Size: 40070448 bytes
- Links Found: 118691

## Retrieved
2025-04-26
