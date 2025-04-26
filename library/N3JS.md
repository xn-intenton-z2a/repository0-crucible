# N3JS

## Crawl Summary
npm package n3 v1.25.2 provides RDF.js low-level implementations in JavaScript: DataFactory with namedNode, blankNode, literal, variable, defaultGraph, quad, triple; Parser and StreamParser with format, baseIRI, blankNodePrefix, isImpliedBy options for Turtle, TriG, N-Triples, N-Quads, N3, RDF-star; Writer and StreamWriter with prefixes, format, end options to serialize quads to strings or streams; Store and EntityIndex for in-memory quad storage and search with add, remove, match, getQuads, countQuads, forEach, getSubjects, getPredicates, getObjects, getGraphs, and DatasetCore interface; Reasoner for Basic Graph Pattern rules; default behaviors: permissive mode, blankNodePrefix 'b', end true. UMD bundle via browserify -s N3 or CDN script.

## Normalised Extract
Table of Contents

1 Installation
2 DataFactory
3 Parser
4 StreamParser
5 Writer
6 StreamWriter
7 Store
8 EntityIndex
9 Reasoner
10 Configuration Defaults
11 RDF/JS Interfaces

1 Installation
Install: npm install n3
Browser: browserify -s N3 entry.js -o bundle.js
CDN: <script src=https://unpkg.com/n3/browser/n3.min.js></script>

2 DataFactory
NamedNode(iri: string): NamedNode
BlankNode([value?]): BlankNode
Literal(value: string, language?: string, datatype?: NamedNode): Literal
Variable(value: string): Variable
DefaultGraph(): DefaultGraph
Quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad
Triple(subject: Term, predicate: Term, object: Term): Triple

3 Parser
Constructor options
 format?: string  values Turtle TriG N-Triples N-Quads N3 Notation3 text/n3 or mime types; includes '*' for RDF-star
 baseIRI?: string default undefined
 blankNodePrefix?: string default 'b'
 isImpliedBy?: boolean default false
Methods
 parse(input, callback(error, quad, prefixes))  emits quads; last callback quad null and prefixes object
 parse(input, handlers)  handlers.onQuad(err,quad) required; onPrefix(prefix,iri) optional; onComment(comment) optional
 parse(input) returns Quad[] synchronously

4 StreamParser
Constructor options as Parser plus
 prefixes?: {[prefix:string]:string}
 comments?: boolean default false
Events
data(quad:Quad) prefix(prefix:string,iri:NamedNode) comment(comment:string) end()

5 Writer
Constructor
 new Writer([output],[ options ])
 options.prefixes?: {[prefix:string]:string}
 options.format?: string default Turtle or TriG
 options.end?: boolean default true if output is stream
Methods
 addQuad(quad:Quad): this
 addPrefix(prefix:string,iri:string): this
 end(callback(error,result:string)): void
 toString(): string

6 StreamWriter
Constructor options same as Writer without output parameter
Sink and Readable stream: write(quad) emits data(string)

7 Store
Constructor
 new Store([quads],[{entityIndex}])
Properties size:number
Methods add(quad), addQuad(quad), addQuads(quads[]), removeQuad(quad):boolean, removeQuads(quads[]):number, remove(stream):void, removeMatches(s?,p?,o?,g?):void, deleteGraph(g):void, createBlankNode():BlankNode
Search match(s?,p?,o?,g?) returns Iterable<Quad> getQuads(s?,p?,o?,g?) returns Quad[] countQuads(s?,p?,o?,g?) returns number forEach(fn), every(fn):boolean, some(fn):boolean getSubjects(p?,o?,g?) returns Term[] forSubjects(p?,o?,g?,fn) getPredicates(s?,o?,g?) forPredicates(...) getObjects(s?,p?,g?) forObjects(...) getGraphs(s?,p?,o?) forGraphs(...) iterator via for..of

8 EntityIndex
 new EntityIndex() share index across stores to reduce memory

9 Reasoner
 new Reasoner(store)
 reason(rules:Quad[]|Store) applies Basic Graph Pattern rules to store

10 Configuration Defaults
 Parser blankNodePrefix='b'; isImpliedBy=false; permissive format
 Writer format=Turtle; end=true
 StreamParser comments=false

11 RDF/JS Interfaces
 DataFactory implements DataFactory, Terms implement NamedNode,BlankNode,Literal,Variable,DefaultGraph; Parser implements Parser; StreamParser implements Stream & Sink; Writer implements Sink; StreamWriter implements Stream & Sink; Store implements Store,Source,Sink,DatasetCore

## Supplementary Details
Configuration Parameters
Parser options
 format strict values: 'N-Triples','application/trig','N3','Notation3','text/n3'
 format permissive default combines Turtle,TriG,N-Triples,N-Quads,RDF-star
 baseIRI default undefined; used to resolve relative IRIs
 blankNodePrefix 'b' prevents collisions; set to empty string to disable prefixing
 isImpliedBy false; when true outputs _:q log:isImpliedBy _:p

Writer options
 prefixes default {}  map prefix to namespace URI
 format default 'Turtle' or 'TriG' if named graph quads present; 'N-Triples','application/trig' for forced modes
 end default true when writing to stream; set false to keep stream open

StreamParser options inherit Parser options with additional
 prefixes:{[prefix:string]:string} predeclare prefixes in stream
 comments:false; set true to emit comment events

EntityIndex
 share single instance across multiple stores to reduce Term duplication

Reasoner
 supports only forward reasoning Basic Graph Patterns; built-ins and backward-chaining unsupported

Implementation Steps
1 import N3
2 instantiate DataFactory and create terms
3 instantiate Parser or StreamParser with options
4 parse input via callback or handlers or sync array
5 optionally pipe streams for large files
6 instantiate Writer or StreamWriter with prefixes
7 serialize quads via addQuad and end or by piping streams
8 instantiate Store with optional shared EntityIndex
9 add quads and query via match or getQuads
10 instantiate Reasoner and apply rules


## Reference Details
DataFactory API

Function NamedNode(iri: string): NamedNode
Function BlankNode(value?: string): BlankNode
Function Literal(value: string, language?: string, datatype?: NamedNode): Literal
Function Variable(value: string): Variable
Function DefaultGraph(): DefaultGraph
Function Quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad
Function Triple(subject: Term, predicate: Term, object: Term): Triple

Parser API

Constructor Parser(options?: {
 format?: string,
 baseIRI?: string,
 blankNodePrefix?: string,
 isImpliedBy?: boolean
})
Method parse(input: string|Stream, callback: (error: Error|null, quad: Quad|null, prefixes?: {[prefix: string]: NamedNode}) => void): void
Method parse(input: string|Stream, handlers: { onQuad(err:Error|null,quad:Quad):void; onPrefix?(prefix:string,iri:NamedNode):void; onComment?(comment:string):void }): void
Method parse(input: string): Quad[]

StreamParser API

Constructor StreamParser(options?: { format?:string; baseIRI?:string; blankNodePrefix?:string; isImpliedBy?:boolean; prefixes?:{[p:string]:string}; comments?:boolean })
Event 'data'(quad:Quad)
Event 'prefix'(prefix:string,iri:NamedNode)
Event 'comment'(comment:string)
Event 'end'()

Writer API

Constructor Writer(output?:WritableStream|undefined, options?:{ prefixes?:{[p:string]:string}; format?:string; end?:boolean })
Method addQuad(quad:Quad): this
Method addPrefix(prefix:string, iri:string): this
Method end(callback:(error:Error|null,result:string)=>void): void
Method toString(): string

StreamWriter API

Constructor StreamWriter(options?:{ prefixes?:{[p:string]:string}; format?:string })
Sink method write(quad:Quad): boolean
Event 'data'(chunk:string)
Event 'end'()

Store API

Constructor Store(quads?:Quad[], options?:{ entityIndex?:EntityIndex })
Property size: number
Method add(quad:Quad): void
Method addQuad(quad:Quad): void
Method addQuads(quads:Quad[]): void
Method removeQuad(quad:Quad): boolean
Method removeQuads(quads:Quad[]): number
Method remove(stream:Stream): void
Method removeMatches(subject?:Term,predicate?:Term,object?:Term,graph?:Term): void
Method deleteGraph(graph:Term): void
Method createBlankNode():BlankNode
Method match(subject?:Term,predicate?:Term,object?:Term,graph?:Term):Iterable<Quad>
Method getQuads(subject?:Term,predicate?:Term,object?:Term,graph?:Term):Quad[]
Method countQuads(subject?:Term,predicate?:Term,object?:Term,graph?:Term):number
Method forEach(fn:(quad:Quad)=>void):void
Method every(fn:(quad:Quad)=>boolean):boolean
Method some(fn:(quad:Quad)=>boolean):boolean
Method getSubjects(predicate?:Term,object?:Term,graph?:Term):Term[]
Method forSubjects(predicate?:Term,object?:Term,graph?:Term,fn:(subject:Term)=>void):void
Method getPredicates(subject?:Term,object?:Term,graph?:Term):Term[]
Method forPredicates(subject?:Term,object?:Term,graph?:Term,fn:(predicate:Term)=>void):void
Method getObjects(subject?:Term,predicate?:Term,graph?:Term):Term[]
Method forObjects(subject?:Term,predicate?:Term,graph?:Term,fn:(object:Term)=>void):void
Method getGraphs(subject?:Term,predicate?:Term,object?:Term):Term[]
Method forGraphs(subject?:Term,predicate?:Term,object?:Term,fn:(graph:Term)=>void):void
Iterator [Symbol.iterator]():Iterator<Quad>

EntityIndex API

Constructor EntityIndex()

Reasoner API

Constructor Reasoner(store:Store)
Method reason(rules:Quad[]|Store):void  // Applies Basic Graph Pattern rules; mutates store

Configuration Options and Effects

Parser.blankNodePrefix default 'b'; setting '' disables prefixing
Parser.format default permissive; strict by passing specific format or mime type
Parser.isImpliedBy default false; true switches rule output style
StreamParser.comments default false; true emits comment events
Writer.format default 'Turtle' or 'TriG'; override with 'N-Triples','application/trig'
Writer.end default true on stream output; false to keep stream open

Best Practices

Use StreamParser and StreamWriter for large files to avoid high memory usage and backpressure. Share EntityIndex across stores for memory optimization. Predeclare prefixes via Writer or StreamParser options to shorten output. Use strict format in Parser to validate input.

Troubleshooting Procedures

1 Parsing large TTL files hangs
  Solution: switch to StreamParser; pipeline fs.createReadStream('file.ttl').pipe(new N3.StreamParser()).on('data',...).

2 Unexpected blank node collisions
  Solution: set blankNodePrefix to unique value per parser: new N3.Parser({ blankNodePrefix: 'x_' }).

3 Strict validation errors
  Solution: pass specific format mime type: new N3.Parser({ format: 'application/trig' }).

4 Slow consumer backpressure
  Command example:
    const parser = new N3.StreamParser();
    fs.createReadStream('data.ttl').pipe(parser).pipe(new Writable({ objectMode: true, write(q,_,cb){ console.log(q); setTimeout(cb,1000); }}));



## Information Dense Extract
npm install n3; DataFactory AP: namedNode(iri), blankNode([value]), literal(val,lang,datatype), variable(val), defaultGraph(), quad(s,p,o,g), triple(s,p,o); Parser(new Parser({format?,baseIRI?,blankNodePrefix='b',isImpliedBy=false})).parse(input,callback|handlers)|sync; StreamParser(new StreamParser({format?,baseIRI?,blankNodePrefix?,isImpliedBy?,prefixes?,comments=false})).on('data',quad).on('prefix',p,iri).on('comment',c); Writer(new Writer(output?,{prefixes?,format='Turtle',end=true})).addQuad(Q).addPrefix(p,iri).end(cb)|toString(); StreamWriter(new StreamWriter({prefixes?,format})).write(Q).pipe(dest); Store(new Store([Q],{entityIndex?})).size, addQuad,addQuads,removeQuad,removeQuads,removeMatches,deleteGraph,createBlankNode,match, getQuads,countQuads,forEach,every,some,getSubjects/forSubjects,getPredicates/forPredicates,getObjects/forObjects,getGraphs/forGraphs,iterator; EntityIndex(); Reasoner(new Reasoner(store)).reason(rules); Defaults: Parser.format permissive superset, blankNodePrefix=b, isImpliedBy=false; Writer.format Turtle/TriG, end=true; StreamParser.comments=false. Use streams for large files; share EntityIndex; strict format via format option.

## Sanitised Extract
Table of Contents

1 Installation
2 DataFactory
3 Parser
4 StreamParser
5 Writer
6 StreamWriter
7 Store
8 EntityIndex
9 Reasoner
10 Configuration Defaults
11 RDF/JS Interfaces

1 Installation
Install: npm install n3
Browser: browserify -s N3 entry.js -o bundle.js
CDN: <script src=https://unpkg.com/n3/browser/n3.min.js></script>

2 DataFactory
NamedNode(iri: string): NamedNode
BlankNode([value?]): BlankNode
Literal(value: string, language?: string, datatype?: NamedNode): Literal
Variable(value: string): Variable
DefaultGraph(): DefaultGraph
Quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad
Triple(subject: Term, predicate: Term, object: Term): Triple

3 Parser
Constructor options
 format?: string  values Turtle TriG N-Triples N-Quads N3 Notation3 text/n3 or mime types; includes '*' for RDF-star
 baseIRI?: string default undefined
 blankNodePrefix?: string default 'b'
 isImpliedBy?: boolean default false
Methods
 parse(input, callback(error, quad, prefixes))  emits quads; last callback quad null and prefixes object
 parse(input, handlers)  handlers.onQuad(err,quad) required; onPrefix(prefix,iri) optional; onComment(comment) optional
 parse(input) returns Quad[] synchronously

4 StreamParser
Constructor options as Parser plus
 prefixes?: {[prefix:string]:string}
 comments?: boolean default false
Events
data(quad:Quad) prefix(prefix:string,iri:NamedNode) comment(comment:string) end()

5 Writer
Constructor
 new Writer([output],[ options ])
 options.prefixes?: {[prefix:string]:string}
 options.format?: string default Turtle or TriG
 options.end?: boolean default true if output is stream
Methods
 addQuad(quad:Quad): this
 addPrefix(prefix:string,iri:string): this
 end(callback(error,result:string)): void
 toString(): string

6 StreamWriter
Constructor options same as Writer without output parameter
Sink and Readable stream: write(quad) emits data(string)

7 Store
Constructor
 new Store([quads],[{entityIndex}])
Properties size:number
Methods add(quad), addQuad(quad), addQuads(quads[]), removeQuad(quad):boolean, removeQuads(quads[]):number, remove(stream):void, removeMatches(s?,p?,o?,g?):void, deleteGraph(g):void, createBlankNode():BlankNode
Search match(s?,p?,o?,g?) returns Iterable<Quad> getQuads(s?,p?,o?,g?) returns Quad[] countQuads(s?,p?,o?,g?) returns number forEach(fn), every(fn):boolean, some(fn):boolean getSubjects(p?,o?,g?) returns Term[] forSubjects(p?,o?,g?,fn) getPredicates(s?,o?,g?) forPredicates(...) getObjects(s?,p?,g?) forObjects(...) getGraphs(s?,p?,o?) forGraphs(...) iterator via for..of

8 EntityIndex
 new EntityIndex() share index across stores to reduce memory

9 Reasoner
 new Reasoner(store)
 reason(rules:Quad[]|Store) applies Basic Graph Pattern rules to store

10 Configuration Defaults
 Parser blankNodePrefix='b'; isImpliedBy=false; permissive format
 Writer format=Turtle; end=true
 StreamParser comments=false

11 RDF/JS Interfaces
 DataFactory implements DataFactory, Terms implement NamedNode,BlankNode,Literal,Variable,DefaultGraph; Parser implements Parser; StreamParser implements Stream & Sink; Writer implements Sink; StreamWriter implements Stream & Sink; Store implements Store,Source,Sink,DatasetCore

## Original Source
JavaScript RDF & SPARQL Libraries
https://www.npmjs.com/package/n3

## Digest of N3JS

# Installation

npm install n3

Browser UMD bundle via browserify or webpack: browserify -s N3 input.js -o bundle.js
<script src="https://unpkg.com/n3/browser/n3.min.js"></script>

# DataFactory

Factory functions (imported via const { DataFactory } = require('n3')):

NamedNode(iri: string): NamedNode
BlankNode([value?: string]): BlankNode
Literal(value: string, language?: string, datatype?: NamedNode): Literal
Variable(value: string): Variable
DefaultGraph(): DefaultGraph
Quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad
Triple(subject: Term, predicate: Term, object: Term): Triple

# Parser

Constructor: new N3.Parser(options?: {
  format?: string                      // permissive by default; accepts 'Turtle','TriG','N-Triples','N-Quads','N3','Notation3','text/n3' or mime types; '*'-suffix enables RDF-star
  baseIRI?: string                     // default undefined
  blankNodePrefix?: string             // default 'b'
  isImpliedBy?: boolean                // default false; when true, outputs backwards chaining with log:isImpliedBy
})

Methods:
parse(input: string|Stream, callback(error: Error|null, quad: Quad|null, prefixes?: { [prefix: string]: NamedNode }): void): void
parse(input: string|Stream, handlers: {
  onQuad(err: Error|null, quad: Quad): void            // required
  onPrefix?(prefix: string, iri: NamedNode): void
  onComment?(comment: string): void
}): void
parse(input: string): Quad[]                            // synchronous, returns all quads

# StreamParser

Constructor: new N3.StreamParser(options?: {
  format?: string
  baseIRI?: string
  blankNodePrefix?: string
  isImpliedBy?: boolean
  prefixes?: { [prefix: string]: string }
  comments?: boolean                  // emit 'comment' events
})

Events:
'data'(quad: Quad)
'prefix'(prefix: string, iri: NamedNode)
'comment'(comment: string)
'end'()

# Writer

Constructor: new N3.Writer(output?: WritableStream|string, options?: {
  prefixes?: { [prefix: string]: string }
  format?: string                      // 'Turtle' or 'TriG' by default; 'N-Triples','application/trig'
  end?: boolean                        // default true when output is stream
})

Methods:
addQuad(quad: Quad): this
addPrefix(prefix: string, iri: string): this
end(callback(error: Error|null, result: string): void): void
toString(): string

# StreamWriter

Constructor: new N3.StreamWriter(options?: {
  prefixes?: { [prefix: string]: string }
  format?: string
})

Streams:
writable sink: .write(quad: Quad)
readable: 'data'(chunk: string)

# Store

Constructor: new N3.Store(quads?: Quad[], options?: { entityIndex?: EntityIndex })

Properties:
size: number

Methods:
add(quad: Quad): void
addQuad(quad: Quad): void
addQuads(quads: Quad[]): void
removeQuad(quad: Quad): boolean
removeQuads(quads: Quad[]): number
remove(stream: Stream): void
removeMatches(subject?: Term, predicate?: Term, object?: Term, graph?: Term): void
deleteGraph(graph: Term): void
createBlankNode(): BlankNode

Search:
match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Iterable<Quad>
getQuads(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Quad[]
countQuads(subject?: Term, predicate?: Term, object?: Term, graph?: Term): number
forEach(callback: (quad: Quad) => void): void
every(callback: (quad: Quad) => boolean): boolean
some(callback: (quad: Quad) => boolean): boolean
getSubjects(predicate?: Term, object?: Term, graph?: Term): Term[]
forSubjects(predicate?: Term, object?: Term, graph?: Term, callback: (subject: Term) => void): void
getPredicates(subject?: Term, object?: Term, graph?: Term): Term[]
forPredicates(subject?: Term, object?: Term, graph?: Term, callback: (predicate: Term) => void): void
getObjects(subject?: Term, predicate?: Term, graph?: Term): Term[]
forObjects(subject?: Term, predicate?: Term, graph?: Term, callback: (object: Term) => void): void
getGraphs(subject?: Term, predicate?: Term, object?: Term): Term[]
forGraphs(subject?: Term, predicate?: Term, object?: Term, callback: (graph: Term) => void): void
[Symbol.iterator](): Iterator<Quad>

# EntityIndex

Constructor: new N3.EntityIndex()
Shared across multiple stores to reduce duplicate Term instances

# Reasoner

Constructor: new N3.Reasoner(store: Store)
Methods:
reason(rules: Quad[]|Store): void          # Mutates store by applying Basic Graph Pattern rules

# Configuration Options

Parser blankNodePrefix default 'b'; format default permissive; strict by format option; RDF-star by '*' format; StreamWriter comments off; Writer end default true

# Interfaces

All classes implement corresponding RDF/JS interfaces:
DataFactory implements DataFactory
Parser implements Parser
StreamParser implements Stream & Sink
Writer implements Sink
StreamWriter implements Stream & Sink
Store implements Store, Source, Sink, DatasetCore


## Attribution
- Source: JavaScript RDF & SPARQL Libraries
- URL: https://www.npmjs.com/package/n3
- License: MIT
- Crawl Date: 2025-04-26T13:49:15.269Z
- Data Size: 467089 bytes
- Links Found: 1584

## Retrieved
2025-04-26
