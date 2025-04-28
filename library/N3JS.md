# N3JS

## Crawl Summary
Installation: npm install n3, require('n3') or UMD via CDN. DataFactory API: namedNode, literal, defaultGraph, quad. Parser API: constructor options format, baseIRI, blankNodePrefix, isImpliedBy; parse(input, callback|listeners|sync)
StreamParser: Readable stream with optional comments and prefix events.
Writer API: constructor with prefixes, format, end; methods addQuad, blank, list, end. StreamWriter: Writable stream sink.
Store API: constructor with optional entityIndex; properties size; methods addQuad(s), removeQuad(s), removeMatches, deleteGraph, createBlankNode, match, getQuads, countQuads, getSubjects/predicates/objects/graphs.
Reasoner API: Reasoner(store), reason(rules).
Compatibility: full RDF/JS, W3C RDF1.1 and RDF-star.


## Normalised Extract
Table of Contents:
1  Installation
2  DataFactory
3  Parser
4  StreamParser
5  Writer
6  StreamWriter
7  Store
8  Reasoner

1 Installation
  npm install n3
  const N3 = require('n3');  // Node.js import
  <script src="https://unpkg.com/n3/browser/n3.min.js"></script>  // Browser UMD

2 DataFactory
  namedNode(value: string): NamedNode
  literal(value: string, language?: string, datatype?: NamedNode): Literal
  defaultGraph(): DefaultGraph
  quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad

3 Parser
  new N3.Parser({format?: string, baseIRI?: string, blankNodePrefix?: string, isImpliedBy?: boolean})
  parse(input: string|Stream, callback: (error, quad, prefixes?)=>void): void
  parse(input: string, listeners: {onQuad, onPrefix?, onComment?}): void
  parse(input: string): Quad[]
  Options:
    format: 'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'Notation3'|'text/n3'
    baseIRI: IRI string
    blankNodePrefix: prefix string or ''
    isImpliedBy: boolean

4 StreamParser
  new N3.StreamParser(options?)  // options same as Parser plus comments?: boolean
  rdfStream.pipe(streamParser).pipe(destination)

5 Writer
  new N3.Writer(streamOrOptions)
    options.prefixes: Record<string,string>
    options.format: 'Turtle'|'N-Triples'|...  default Turtle/TriG
    options.end: boolean
  addQuad(subject, predicate, object, graph?): Writer
  blank(predicate, object): BlankNode
  list(terms: Term[]): BlankNode
  end(callback: (error, result)=>void): void

6 StreamWriter
  new N3.StreamWriter({prefixes, format?, end?})
  streamParser.pipe(streamWriter).pipe(process.stdout)

7 Store
  new N3.Store(quads?: Quad[], {entityIndex?: EntityIndex})
  size: number
  addQuad(quad): void
  addQuads(quads): void
  removeQuad(quad): boolean
  removeQuads(quads): number
  remove(matchesStream): Promise<number>
  removeMatches(s?, p?, o?, g?): number
  deleteGraph(graph): number
  createBlankNode(): BlankNode
  match(s?, p?, o?, g?): Iterable<Quad>
  getQuads(s?, p?, o?, g?): Quad[]
  countQuads(s?, p?, o?, g?): number
  getSubjects(p?, o?, g?): Term[]
  getPredicates(s?, o?, g?): Term[]
  getObjects(s?, p?, g?): Term[]
  getGraphs(s?, p?, o?): Term[]

8 Reasoner
  import {Reasoner} from 'n3';
  new Reasoner(store)
  reason(rules: string|Quad[]): void


## Supplementary Details
Parser strict mode: set format to MIME or name, e.g. {format:'application/trig'} for TriG strict. Notation3 supported via {format:'N3'|'Notation3'|'text/n3'}. RDF-star enabled when format contains '*'.
Base IRI resolution: baseIRI option sets the default graph context. Default blank node prefix uses pattern b{digit}_. Disable by blankNodePrefix:''.
StreamParser comments event: options.comments=true to emit onComment(comment: string).
Writer blank nodes and lists: use writer.blank(predicate,object) and writer.list([terms]) to manually create Turtle shorthand. Streaming writers cannot auto-detect blank/list usage.
Store sharing: instantiate EntityIndex: new N3.EntityIndex(); pass {entityIndex} to multiple stores to share term index and reduce memory.
Reasoner limits: only Basic Graph Patterns in premise and conclusion. No built-in functions or backward chaining.

## Reference Details
--- DataFactory ---
NamedNode:
  function namedNode(value: string): NamedNode
  Returns NamedNode with .termType='NamedNode', .value=value
Literal:
  function literal(value: string, language?: string, datatype?: NamedNode): Literal
  When language provided: .datatype=rdflib.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'), .language=language
  When datatype provided: .datatype=datatype
DefaultGraph:
  function defaultGraph(): DefaultGraph
Quad:
  function quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad
  Returns .subject, .predicate, .object, .graph(defaultGraph())

--- Parser ---
Constructor: new Parser(options?: {
  format?: string;  // Default: permissive superset
  baseIRI?: string; // URI
  blankNodePrefix?: string; // Default: 'b{digit}_'
  isImpliedBy?: boolean; // Default: false
})

Method parse(input: string|Stream, callback|listeners):
  parse(input, (error: Error|null, quad: Quad|null, prefixes?: Record<string,string>)=>void): void
  parse(text: string, {onQuad, onPrefix?, onComment?}): void
  parse(text: string): Quad[]

Error handling: callback receives Error when parse error; quad is null when complete; prefixes returned at end when using callback API.

--- StreamParser ---
Constructor: new StreamParser(options?: {
  format?: string;
  baseIRI?: string;
  blankNodePrefix?: string;
  isImpliedBy?: boolean;
  comments?: boolean; // Default: false
})

Usage example:
  const streamParser = new N3.StreamParser({comments:true});
  fs.createReadStream('file.ttl').pipe(streamParser).pipe(new Writable({objectMode:true, write(quad,enc,cb){ console.log(quad); cb(); }}));

--- Writer ---
Constructor: new Writer(output?: Writable|{prefixes: Record<string,string>; format?: string; end?: boolean})
Properties:
  prefix:N/A; internal map of prefix to namespace

Methods:
  addQuad(s:Term,p:Term,o:Term,g?:Term): Writer
  blank(predicate: Term, object: Term): BlankNode
  list(elements: Term[]): BlankNode
  end(cb: (error:Error|null, result:string)=>void): void

Example: create TTL string with prefix c:
  const writer=new Writer({prefixes:{c:'http://example.org/#'}});
  writer.addQuad(quad(namedNode('http://example.org/#Tom'),namedNode('rdf:type'),namedNode('http://example.org/#Cat')));
  writer.end((err,res)=>console.log(res));

Configuration:
  format: 'N-Triples'|'application/trig'
  end: when false, stream writer does not close output

--- StreamWriter ---
Constructor: new StreamWriter({prefixes, format?: string; end?: boolean})
Pipe usage: streamParser.pipe(streamWriter).pipe(destination)

--- Store ---
Constructor: new Store(quads?: Quad[], {entityIndex?: EntityIndex})
Properties:
  size: number // count of quads
Methods:
  addQuad(quad: Quad): void
  addQuads(quads: Quad[]): void
  removeQuad(quad: Quad): boolean // returns if removed
  removeQuads(quads: Quad[]): number // count removed
  remove(stream: Stream<Quad>): Promise<number>
  removeMatches(s?:Term,p?:Term,o?:Term,g?:Term): number
  deleteGraph(graph:Term): number
  createBlankNode(): BlankNode
Query methods:
  match(s?,p?,o?,g?): Iterable<Quad>
  getQuads(s?,p?,o?,g?): Quad[]
  countQuads(s?,p?,o?,g?): number
  forEach(callback:(quad:Quad)=>void,s?,p?,o?,g?): void
  every(callback:(quad:Quad)=>boolean,s?,p?,o?,g?): boolean
  some(callback:(quad:Quad)=>boolean,s?,p?,o?,g?): boolean
  getSubjects(p?,o?,g?): Term[]
  getPredicates(s?,o?,g?): Term[]
  getObjects(s?,p?,g?): Term[]
  getGraphs(s?,p?,o?): Term[]

Example: share entityIndex between stores
  const idx=new EntityIndex();
  const store1=new Store([], {entityIndex:idx});
  const store2=new Store([], {entityIndex:idx});

--- Reasoner ---
Constructor: new Reasoner(store: Store)
Method:
  reason(rules: string | Quad[]): void // mutates store
Rules syntax: Notation3 rules with BGP premises and conclusions

--- Troubleshooting ---
1  Blank node collisions: enable blankNodePrefix to distinguish: {blankNodePrefix:'x_'} expected _:x_1
2  Parsing large files: use StreamParser to avoid memory overflow
3  Unexpected streaming behavior: set writer end:false to keep stream open
4  Prefixes not applied: ensure prefixes map provided to Writer or StreamWriter


## Information Dense Extract
Installation:npm install n3; require('n3') or include n3.min.js
DataFactory:namedNode(str):NamedNode;literal(str,lang?,datatype?):Literal;defaultGraph():DefaultGraph;quad(s,p,o,g?):Quad
Parser:new Parser({format?,baseIRI?,blankNodePrefix?,isImpliedBy?});parse(input,cb|listeners|string):void|Quad[]
StreamParser:new StreamParser(opts+comments?);pipe RDF streams
Writer:new Writer(stream|{prefixes,format?,end?});addQuad(s,p,o,g?);blank(pred,obj);list(terms);end(cb)
StreamWriter:new StreamWriter({prefixes,format?,end?});pipe streamParser→writer→out
Store:new Store(quads[],{entityIndex?});size;addQuad(s),removeQuad(s),removeMatches(pattern);match(pattern),getQuads, countQuads,getSubjects|Predicates|Objects|Graphs;createBlankNode()
Reasoner:new Reasoner(store);reason(rules)
Options:format:'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'text/n3' or MIME;RDF-star with '*';baseIRI URI;blankNodePrefix str or '';isImpliedBy boolean;comments boolean
Interfaces:implements RDF/JS DataFactory,Term,Quad,Stream,Sink,Store,Source,DatasetCore
Compatibility:full RDF1.1 + RDF-star + Notation3


## Sanitised Extract
Table of Contents:
1  Installation
2  DataFactory
3  Parser
4  StreamParser
5  Writer
6  StreamWriter
7  Store
8  Reasoner

1 Installation
  npm install n3
  const N3 = require('n3');  // Node.js import
  <script src='https://unpkg.com/n3/browser/n3.min.js'></script>  // Browser UMD

2 DataFactory
  namedNode(value: string): NamedNode
  literal(value: string, language?: string, datatype?: NamedNode): Literal
  defaultGraph(): DefaultGraph
  quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad

3 Parser
  new N3.Parser({format?: string, baseIRI?: string, blankNodePrefix?: string, isImpliedBy?: boolean})
  parse(input: string|Stream, callback: (error, quad, prefixes?)=>void): void
  parse(input: string, listeners: {onQuad, onPrefix?, onComment?}): void
  parse(input: string): Quad[]
  Options:
    format: 'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'Notation3'|'text/n3'
    baseIRI: IRI string
    blankNodePrefix: prefix string or ''
    isImpliedBy: boolean

4 StreamParser
  new N3.StreamParser(options?)  // options same as Parser plus comments?: boolean
  rdfStream.pipe(streamParser).pipe(destination)

5 Writer
  new N3.Writer(streamOrOptions)
    options.prefixes: Record<string,string>
    options.format: 'Turtle'|'N-Triples'|...  default Turtle/TriG
    options.end: boolean
  addQuad(subject, predicate, object, graph?): Writer
  blank(predicate, object): BlankNode
  list(terms: Term[]): BlankNode
  end(callback: (error, result)=>void): void

6 StreamWriter
  new N3.StreamWriter({prefixes, format?, end?})
  streamParser.pipe(streamWriter).pipe(process.stdout)

7 Store
  new N3.Store(quads?: Quad[], {entityIndex?: EntityIndex})
  size: number
  addQuad(quad): void
  addQuads(quads): void
  removeQuad(quad): boolean
  removeQuads(quads): number
  remove(matchesStream): Promise<number>
  removeMatches(s?, p?, o?, g?): number
  deleteGraph(graph): number
  createBlankNode(): BlankNode
  match(s?, p?, o?, g?): Iterable<Quad>
  getQuads(s?, p?, o?, g?): Quad[]
  countQuads(s?, p?, o?, g?): number
  getSubjects(p?, o?, g?): Term[]
  getPredicates(s?, o?, g?): Term[]
  getObjects(s?, p?, g?): Term[]
  getGraphs(s?, p?, o?): Term[]

8 Reasoner
  import {Reasoner} from 'n3';
  new Reasoner(store)
  reason(rules: string|Quad[]): void

## Original Source
JavaScript RDF & JSON-LD Ecosystem
https://github.com/rdfjs/N3.js#readme

## Digest of N3JS

# Installation

**Node.js**

- Command: `npm install n3`
- Import: `const N3 = require('n3');`
- Browser (UMD): bundle with webpack or browserify using `-s N3`, or include `<script src="https://unpkg.com/n3/browser/n3.min.js"></script>`

# DataFactory

Provides factory methods to create RDF terms and quads:

- `namedNode(value: string): NamedNode`
- `literal(value: string, language?: string, datatype?: NamedNode): Literal`
- `defaultGraph(): DefaultGraph`
- `quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad`

# Parser

**Constructor**: `new N3.Parser(options?: { format?: string; baseIRI?: string; blankNodePrefix?: string; isImpliedBy?: boolean })`

**Methods**:

- `parse(input: string | Stream, onQuad: (error: Error|null, quad: Quad|null, prefixes?: Record<string,string>) => void): void`
- `parse(input: string, listeners: { onQuad: (err:Error|null, quad:Quad) => void; onPrefix?: (prefix:string, iri:NamedNode) => void; onComment?: (comment:string)=>void }): void`
- `parse(input: string): Quad[]`

**Options**:

- `format`: MIME type or name (`'Turtle'`, `'TriG'`, `'N-Triples'`, `'N-Quads'`, `'N3'`, `'Notation3'`, `'text/n3'`)
- `baseIRI`: base IRI for relative IRIs
- `blankNodePrefix`: default `'b' + digit + '_'`, set `''` to disable
- `isImpliedBy`: default `false`, when `true` emits `log:isImpliedBy`

# StreamParser

Implements Node.js Readable Stream & RDF.js Sink

**Constructor**: `new N3.StreamParser(options?: { format?: string; baseIRI?: string; blankNodePrefix?: string; isImpliedBy?: boolean; comments?: boolean })`

**Usage**:

- `streamParser.pipe(destinationSink)`
- `rdfStream.pipe(streamParser)`

# Writer

**Constructor**: `new N3.Writer(output?: WritableStream | { prefixes: Record<string,string>; format?: string; end?: boolean })`

**Methods**:

- `addQuad(subject: Term, predicate: Term, object: Term, graph?: Term): Writer`
- `blank(predicate: Term, object: Term): BlankNode`
- `list(elements: Term[]): BlankNode`
- `end(callback: (error: Error|null, result: string) => void): void`

**Default format**: `'Turtle'` or `'TriG'` if named graphs present
**Formats**: `'N-Triples'`, `'application/trig'`, RDF-star variants by adding `'*'`

# StreamWriter

Implements Node.js Writable Stream & RDF.js Sink

**Constructor**: `new N3.StreamWriter(options?: { prefixes: Record<string,string>; format?: string; end?: boolean })`

**Usage**:

- `streamParser.pipe(streamWriter).pipe(process.stdout)`

# Store

In-memory quad store implementing RDF/JS DatasetCore

**Constructor**: `new N3.Store(quads?: Quad[], options?: { entityIndex?: EntityIndex })`

**Properties**:

- `size: number`

**Methods**:

- `addQuad(quad: Quad): void`
- `addQuads(quads: Quad[]): void`
- `removeQuad(quad: Quad): boolean`
- `removeQuads(quads: Quad[]): number`
- `remove(stream: Stream<Quad>): Promise<number>`
- `removeMatches(subject?: Term, predicate?: Term, object?: Term, graph?: Term): number`
- `deleteGraph(graph: Term): number`
- `createBlankNode(): BlankNode`
- `match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Iterable<Quad>`
- `getQuads(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Quad[]`
- `countQuads(subject?: Term, predicate?: Term, object?: Term, graph?: Term): number`
- `getSubjects(predicate?: Term, object?: Term, graph?: Term): Term[]`
- `getPredicates(subject?: Term, object?: Term, graph?: Term): Term[]`
- `getObjects(subject?: Term, predicate?: Term, graph?: Term): Term[]`
- `getGraphs(subject?: Term, predicate?: Term, object?: Term): Term[]`

# Reasoner

**Classes**: `Reasoner`

**Constructor**: `new Reasoner(store: Store)`

**Methods**:

- `reason(rules: string | Quad[]): void`

# Compatibility & Interfaces

- Full support: RDF1.1 Turtle, TriG, N-Triples, N-Quads, RDF-star, Notation3
- Implements RDF/JS interfaces: DataFactory, Term, Quad, Stream, Sink, Store, Source, DatasetCore


## Attribution
- Source: JavaScript RDF & JSON-LD Ecosystem
- URL: https://github.com/rdfjs/N3.js#readme
- License: License if known
- Crawl Date: 2025-04-28T13:07:10.131Z
- Data Size: 668416 bytes
- Links Found: 5155

## Retrieved
2025-04-28
