# RDF11_CONCEPTS

## Crawl Summary
• RDF graph: set of triples (s,p,o) where s ∈ IRI|blankNode, p ∈ IRI, o ∈ IRI|literal|blankNode.
• RDF dataset: one default graph + zero or more named graphs with IRI or blank node names.
• IRIs: absolute, RFC3987, string equality, best practices for normalization.
• Literals: lexicalForm, datatype IRI, optional language tag; mapping rules; ill-typed handling; term equality rules.
• BlankNodes: local scope; optional Skolemization using /.well-known/genid/{UUID}.
• Datatypes: recognized XSD 1.1 types and non-normative rdf:HTML and rdf:XMLLiteral; mapping definitions.
• Isomorphism: graph and dataset bijections preserving blank nodes, IRIs, literals, triple membership, and graph names.

## Normalised Extract
Table of Contents:
1. RDF Term Model
2. IRIs
3. Literals
4. Blank Nodes and Skolemization
5. RDF Graphs
6. RDF Datasets
7. Datatypes
8. Isomorphism

1. RDF Term Model
   Terms = {IRI, literal, blank node}. Each term type distinct. Triples = (subject, predicate, object).
   subject ∈ IRI ∪ blank node; predicate ∈ IRI; object ∈ IRI ∪ literal ∪ blank node.

2. IRIs
   - Syntax: Unicode per RFC3987, absolute, optional fragment.
   - Comparison: simple string compare (case-sensitive). No further normalization.
   - Resolution: relative IRIs resolved via base IRI per RFC3986.
   - Best-practice normalization: lowercase scheme/authority, omit default port, avoid . or .., use NFC, lowercase hex in percent-encoding.

3. Literals
   - Components: lexicalForm, datatypeIRI, [languageTag].
   - If datatypeIRI == rdf:langString: value=(lexicalForm, lowercased languageTag).
   - If datatypeIRI ∈ recognized set: apply lexical-to-value mapping as defined in XMLSchema1.1. Invalid forms yield semantic inconsistency but accepted.
   - Term equality: exact character-wise match across all components.

4. Blank Nodes and Skolemization
   - Blank nodes: local, no global ID; identifiers from syntax not part of abstract syntax.
   - To Skolemize: mint unique IRI e.g. https://example.com/.well-known/genid/{UUID}. Replace each bNode.

5. RDF Graphs
   - Graph = set of triples.
   - Nodes = subjects∪objects. Predicates may also appear as nodes.

6. RDF Datasets
   - Structure: { defaultGraph, namedGraphs }.
   - defaultGraph: unnamed RDF graph.
   - namedGraphs: set of (name ∈ IRI ∪ bNode, graph).

7. Datatypes
   - Recognized datatype IRIs include xsd:string, xsd:boolean, xsd:decimal, xsd:integer, xsd:dateTime, etc.
   - Datatype = (lexical space, value space, mapping).
   - rdf:HTML and rdf:XMLLiteral: mapping via DOM fragment parsing and normalization.

8. Isomorphism
   - Graph isomorphic if bijection M on nodes mapping blank nodes↔blank nodes, preserving triples.
   - Dataset isomorphic extends graph isomorphism to default and named graphs with name mapping.


## Supplementary Details
• Implementation Step: Resolve relative IRIs by baseIRI.resolve(relativeIRI) using RFC3986 rules before creating NamedNode.
• Validate IRI: check absolute syntax via regex ^[A-Za-z][A-Za-z0-9+.-]*:.+ and percent-decode to ensure compliance with RFC3987.
• Create literal: Literal(lexicalForm:String, datatypeIRI:NamedNode, languageTag? : String). Enforce languageTag lowercase.
• Recognized datatype IRIs: maintain registry mapping IRI → parsingFunction. For XML Schema types use xs mapping: xsd:integer→BigInt, xsd:decimal→Decimal, xsd:boolean→Boolean, xsd:dateTime→Date.
• Ill-typed literal handling: catch parsingFunction error, emit warning logger.warn('Ill-typed literal', lexicalForm, datatypeIRI).
• Blank node replacement: for each blank node b, generate skolemIRI = `${authority}/.well-known/genid/${uuidv4()}`, replaceTerm(b, NamedNode(skolemIRI)).
• Graph isomorphism: implement canonicalization by generating deterministic mapping for blank nodes using sorted triple strings, then compare.


## Reference Details
// Example: JavaScript RDFJS Data Model Implementation

import { DataFactory } from 'rdf-data-factory';
const DF = new DataFactory();

// Create IRI term
function createNamedNode(iri:String): NamedNode {
  if (!isAbsoluteIRI(iri)) throw new Error('IRI must be absolute');
  return DF.namedNode(iri);
}

// Create literal with optional language or datatype
function createLiteral(lex:String, langOrDatatype?: String|NamedNode): Literal {
  if (typeof langOrDatatype === 'string') {
    return DF.literal(lex, langOrDatatype.toLowerCase());
  } else if (langOrDatatype) {
    return DF.literal(lex, langOrDatatype);
  } else {
    return DF.literal(lex);
  }
}

// Create blank node
function createBlankNode(id?:String): BlankNode {
  return id ? DF.blankNode(id) : DF.blankNode();
}

// Build triple and graph
function addTriple(graph: RDFGraph, s:Term, p:NamedNode, o:Term) {
  graph.add(DF.quad(s,p,o));
}

// Skolemize blank nodes in graph
function skolemizeGraph(graph:RDFGraph, authority:String) {
  const mapping = new Map();
  graph.forEach(q => {
    [q.subject, q.object].forEach(term => {
      if (term.termType === 'BlankNode') {
        if (!mapping.has(term.value)) {
          const skolemIRI = `${authority}/.well-known/genid/${uuidv4()}`;
          mapping.set(term.value, DF.namedNode(skolemIRI));
        }
      }
    });
  });
  mapping.forEach((skolem, bnodeId) => {
    graph = graph.mapTerms(term => term.termType==='BlankNode' && term.value===bnodeId ? skolem : term);
  });
  return graph;
}

// IRI normalization
function normalizeIRI(iri:String):String {
  const url = new URL(iri);
  url.pathname = normalizePath(url.pathname);
  url.hostname = url.hostname.toLowerCase();
  url.protocol = url.protocol.toLowerCase();
  return url.toString();
}

// Troubleshooting
// Command: node scripts/validate.js dataset.ttl
// Expected Output: 'Valid RDF dataset; default graph contains 42 triples; 3 named graphs.'



## Information Dense Extract
RDF graph = set of triples (s∈IRI|bNode, p∈IRI, o∈IRI|literal|bNode). IRI: absolute RFC3987, string eq. Literals=lexicalForm+datatypeIRI[+langTag], datatype mapping per XSD1.1, invalid forms yield warnings. Blank nodes local; optional Skolemization via /.well-known/genid/{UUID}. Dataset=defaultGraph+{name∈IRI|bNode,graph}. Recognized datatypes: xsd:string,integer,decimal,boolean,dateTime,etc; rdf:HTML parses via DOM5 fragment; rdf:XMLLiteral via DOM4 DocFragment.normalize(). Graph iso: bijection M: bNode↔bNode, IRI→itself, lit→itself, preserves triples. Dataset iso: extends graph iso over default and named graphs.

## Sanitised Extract
Table of Contents:
1. RDF Term Model
2. IRIs
3. Literals
4. Blank Nodes and Skolemization
5. RDF Graphs
6. RDF Datasets
7. Datatypes
8. Isomorphism

1. RDF Term Model
   Terms = {IRI, literal, blank node}. Each term type distinct. Triples = (subject, predicate, object).
   subject  IRI  blank node; predicate  IRI; object  IRI  literal  blank node.

2. IRIs
   - Syntax: Unicode per RFC3987, absolute, optional fragment.
   - Comparison: simple string compare (case-sensitive). No further normalization.
   - Resolution: relative IRIs resolved via base IRI per RFC3986.
   - Best-practice normalization: lowercase scheme/authority, omit default port, avoid . or .., use NFC, lowercase hex in percent-encoding.

3. Literals
   - Components: lexicalForm, datatypeIRI, [languageTag].
   - If datatypeIRI == rdf:langString: value=(lexicalForm, lowercased languageTag).
   - If datatypeIRI  recognized set: apply lexical-to-value mapping as defined in XMLSchema1.1. Invalid forms yield semantic inconsistency but accepted.
   - Term equality: exact character-wise match across all components.

4. Blank Nodes and Skolemization
   - Blank nodes: local, no global ID; identifiers from syntax not part of abstract syntax.
   - To Skolemize: mint unique IRI e.g. https://example.com/.well-known/genid/{UUID}. Replace each bNode.

5. RDF Graphs
   - Graph = set of triples.
   - Nodes = subjectsobjects. Predicates may also appear as nodes.

6. RDF Datasets
   - Structure: { defaultGraph, namedGraphs }.
   - defaultGraph: unnamed RDF graph.
   - namedGraphs: set of (name  IRI  bNode, graph).

7. Datatypes
   - Recognized datatype IRIs include xsd:string, xsd:boolean, xsd:decimal, xsd:integer, xsd:dateTime, etc.
   - Datatype = (lexical space, value space, mapping).
   - rdf:HTML and rdf:XMLLiteral: mapping via DOM fragment parsing and normalization.

8. Isomorphism
   - Graph isomorphic if bijection M on nodes mapping blank nodesblank nodes, preserving triples.
   - Dataset isomorphic extends graph isomorphism to default and named graphs with name mapping.

## Original Source
W3C RDF 1.1 Concepts and Abstract Syntax
https://www.w3.org/TR/rdf11-concepts/

## Digest of RDF11_CONCEPTS

# 1. Graph-based Data Model

An RDF graph G is a set of triples. Each triple is an ordered tuple (subject, predicate, object):
  • subject ∈ IRI ∪ blank node
  • predicate ∈ IRI
  • object ∈ IRI ∪ literal ∪ blank node

IRIs, literals and blank nodes are RDF terms. G is the default graph when in a dataset.

# 2. RDF Datasets

An RDF dataset D comprises:
  • Exactly one default graph G₀ (an RDF graph).
  • Zero or more named graphs {⟨nᵢ, Gᵢ⟩}, where each nᵢ ∈ IRI ∪ blank node and Gᵢ is an RDF graph.

Graph names must be unique within D. Blank nodes may be shared across graphs.

# 3. IRIs

IRIs in RDF abstract syntax:
  • MUST be absolute; MAY contain fragment identifiers.
  • Conform to RFC3987 (Unicode string). Equality: simple string comparison (RFC3987 §5.1). No further normalization.
  • Relative IRIs (in serialization) MUST be resolved against a base IRI (RFC3986).

IRI normalization best practices:
  • Lowercase scheme and host
  • Avoid percent-encoding unreserved chars
  • Omit default port (http://example.com/ vs http://example.com:80/)
  • Avoid /./ or /../ in path
  • Lowercase hex digits in percent-encoding
  • Use NFC for Unicode

# 4. Literals

A literal L consists of:
  • lexical form: Unicode string (should be NFC)
  • datatype IRI: IRI mapping lexical form to value space
  • optional language tag (if datatype IRI is rdf:langString)

Value determination:
  • If langString: value = (lexical form, language tag lowercased)
  • If datatype IRI ∈ recognized set, apply lexical-to-value mapping. If mapping fails: ill-typed literal (semantic inconsistency; graph accepted, warn optional).
  • If datatype IRI not recognized: value undefined.

Literal term equality: exact match on lexical form, datatype IRI, language tag.

# 5. Blank Nodes

Blank nodes are terms with no global identifier. Identifiers in syntax are local. To replace blank nodes:
  • Mint Skolem IRIs: scheme http(s) or other, path /.well-known/genid/{UUID}

This preserves graph semantics if Skolem IRIs unique.

# 6. Datatypes

Recognized datatype IRIs include all XSD built-in types (XMLSchema 1.1 Part 2) and:
  • rdf:HTML (non-normative)
  • rdf:XMLLiteral (non-normative)

Datatype = (lexical space, value space, lexical-to-value mapping).

Recommended XSD types: xsd:string, xsd:integer, xsd:decimal, xsd:dateTime, xsd:boolean, etc.

# 7. Graph Isomorphism

Two RDF graphs G and G' are isomorphic if there exists a bijection M on nodes such that:
  • M maps blank nodes↔blank nodes.
  • M(IRI)=IRI, M(literal)=literal.
  • (s,p,o)∈G iff (M(s),p,M(o))∈G'.

# 8. Dataset Isomorphism

Datasets D₁ and D₂ are isomorphic if there is a bijection M mapping nodes, triples, and graphs of D₁ to D₂ preserving blank node mapping, literal/IRI identity, triple structure, and graph name pairing.

*Retrieved: 2024-06-05*

## Attribution
- Source: W3C RDF 1.1 Concepts and Abstract Syntax
- URL: https://www.w3.org/TR/rdf11-concepts/
- License: License
- Crawl Date: 2025-04-26T21:47:44.959Z
- Data Size: 36858328 bytes
- Links Found: 111601

## Retrieved
2025-04-26
