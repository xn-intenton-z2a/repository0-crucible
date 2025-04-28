# N3_JS

## Crawl Summary
Installation: npm install n3; UMD bundle flag -s N3; CDN at unpkg.com. DataFactory methods: namedNode(string), literal(string, languageOrDatatype), defaultGraph(), blankNode([label]), variable(string), quad(subject, predicate, object, [graph]). Parser: new N3.Parser(options) with format (string), baseIRI (string), blankNodePrefix (string), isImpliedBy (boolean); parse(input, callback) returns quads via callback; parse(input) returns Quad[] synchronously; N3.StreamParser supports Readable streams, options include comments (boolean). Writer: new N3.Writer(output?, options) with prefixes, format, end; methods addQuad, blank, list, end(callback). N3.StreamWriter: objectMode Writable, RDF.js Sink. Store: new N3.Store(quads?, options) with entityIndex; properties size; methods addQuad(s), removeQuad(s), remove, removeMatches, deleteGraph, createBlankNode, match, getQuads, countQuads, forEach, every, some, getSubjects/forSubjects, getPredicates/forPredicates, getObjects/forObjects, getGraphs/forGraphs, iterator. EntityIndex for shared indexing. Reasoner: new Reasoner(store), reason(rules) supports basic graph patterns only. Interfaces: DataFactory, Stream & Sink, Store, Source, Sink, DatasetCore.

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
10 Interfaces
11 Compatibility

1 Installation
 npm install n3
 browserify entry.js -s N3 -o bundle.js
 script src="https://unpkg.com/n3/browser/n3.min.js"

2 DataFactory
 namedNode(value:string):NamedNode
 literal(value:string,languageOrDatatype?:string|NamedNode):Literal
 defaultGraph():DefaultGraph
 blankNode(label?:string):BlankNode
 variable(value:string):Variable
 quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad

3 Parser
 new N3.Parser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean})
 parse(input:string|Readable,callback:(error:Error|null,quad:Quad|null,prefixes?:Record<string,NamedNode>)=>void):void
 parse(input:string):Quad[]

4 StreamParser
 new N3.StreamParser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean,comments?:boolean})
 Implements Readable(objectMode), Sink

5 Writer
 new N3.Writer(output?:Writable|object,{prefixes?:Record<string,string>,format?:string,end?:boolean})
 addQuad(subject:Term,predicate:Term,object:Term,graph?:Term):void
 blank(predicate:Term,object:Term):BlankNode
 blank(statements:{predicate:Term,object:Term}[]):BlankNode
 list(items:Term[]):BlankNode
 end(callback?:(error:Error|null,result:string)=>void):void

6 StreamWriter
 new N3.StreamWriter(output:Writable,{prefixes?:Record<string,string>})
 Implements Writable(objectMode), Sink

7 Store
 new N3.Store(quads?:Quad[],{entityIndex?:EntityIndex})
 size:number
 addQuad(Quad):void
 addQuads(Quad[]):void
 removeQuad(Quad):void
 removeQuads(Quad[]):void
 remove(input:Quad[]|AsyncIterable<Quad>|Readable|{subject?:Term,predicate?:Term,object?:Term,graph?:Term}):void
 removeMatches(subject?:Term,predicate?:Term,object?:Term,graph?:Term):void
 deleteGraph(graph:Term):void
 createBlankNode(label?:string):BlankNode
 match(subject?:Term,predicate?:Term,object?:Term,graph?:Term):Iterable<Quad>
 getQuads(...):Quad[]
 countQuads(...):number
 forEach(cb:(Quad)=>void,...):void
 every(cb:(Quad)=>boolean,...):boolean
 some(cb:(Quad)=>boolean,...):boolean
 getSubjects(...):Term[]
 forSubjects(cb:(Term)=>void,...):void
 getPredicates(...):Term[]
 forPredicates(cb,...)...:void
 getObjects(...):Term[]
 forObjects(cb,...)...:void
 getGraphs(...):Term[]
 forGraphs(cb,...)...:void
 [Symbol.iterator]():Iterator<Quad>

8 EntityIndex
 new N3.EntityIndex()
 share across stores

9 Reasoner
 new Reasoner(store:Store)
 reason(rules:string|Quad[]):void

10 Interfaces
 DataFactory implements RDF.DataFactory
 Parser, StreamParser implement RDF.Stream & Sink
 Writer, StreamWriter implement RDF.Stream & Sink
 Store implements RDF.Store,Source,Sink,DatasetCore

11 Compatibility
 Formats: Turtle,TriG,N-Triples,N-Quads,N3,Notation3,text/n3,RDF-star via name or MIME type or wildcard
 strict mode via format option

## Supplementary Details
ParserOptions structure
 format: string default permissive superset
 baseIRI: string default undefined
 blankNodePrefix: string default b{digit}_
 isImpliedBy: boolean default false

StreamParserOptions same plus comments:boolean default false

WriterOptions
 prefixes: Record<string,string> default {}
 format: string default Turtle or TriG
 end: boolean default true in stream methods

StoreOptions
 entityIndex: EntityIndex default new per store

Reasoner supports only Basic Graph Patterns rule syntax in premise and conclusion, no builtins or backward chaining

UMD bundling flag: -s N3 for browserify

Error handling: Parser passes non-null error in callback; Writer.end callback receives error; Stream classes emit 'error' event


## Reference Details
DataFactory API
 Function signatures
 namedNode(value:string):NamedNode               // no exceptions
 literal(value:string,languageOrDatatype?:string|NamedNode):Literal // if datatype is NamedNode or string
 defaultGraph():DefaultGraph                     // always returns singleton DefaultGraph
 blankNode(label?:string):BlankNode               // if label provided must match /^[A-Za-z][A-Za-z0-9]*$/? else auto-generated
 variable(value:string):Variable                 // value without leading '?'
 quad(subject:Term,predicate:Term,object:Term,graph:Term=defaultGraph()):Quad
  Returns Quad with termType 'Quad'

Parser API
 Constructor new N3.Parser(options?)
 Throws TypeError if options.format is unrecognized
 parse(input,callback)
  Emits error callbacks, quad callbacks, final invocation with quad=null and prefixes map
 parse(input) sync throws SyntaxError on invalid syntax
 Options
  format: 'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'Notation3'|'text/n3'|'application/trig'|'application/n-quads'|'text/turtle' or containing '*' for RDF-star
  baseIRI: absolute IRI string
  blankNodePrefix: prefix string, empty allowed
  isImpliedBy: true changes backward-chaining rule predicate

StreamParser API
 extends Readable(objectMode)
 methods: _transform(chunk,enc,cb) internal
 emits 'data' events with Quad objects
 emits 'prefix' events prefix:string,iri:NamedNode if prefix encountered
 emits 'comment' events if comments:true
 emits 'error' on parse error

Writer API
 new N3.Writer(output?,options?)
 addQuad(subject,predicate,object,graph?)
  throws TypeError if terms invalid
 blank(predicate,object) and blank(statements[]) return BlankNode term for manual shorthand
 list(items[]) return BlankNode representing RDF list
 end(callback)
  callback signature (error:Error|null,result:string)
 stream mode: output.write() used, respect options.end

StreamWriter API
 extends Writable(objectMode)
 implements sink.write(quad)
 calling streamWriter.end() flushes buffer and emits 'end'

Store API
 new N3.Store(quads?,options?)
 addQuad,addQuads: ignore duplicates (Quad.equals)
 removeQuad,removeQuads: ignore missing
 remove input types: array, stream, generator
 removeMatches applies same pattern removal
 deleteGraph removeMatches(...,graph)
 createBlankNode auto-generates distinct identifiers
 match returns generator yielding Quad, can be used with for..of
 getQuads returns array snapshot
 countQuads returns number
 forEach executes callback for each matching
 every returns boolean
 some returns boolean
 getSubjects, getPredicates, getObjects, getGraphs return unique Term arrays
 forSubjects, etc call callback on each unique
 size reflects current number of quads
 Symbol.iterator same as match(undefined,undefined,undefined,undefined)

EntityIndex API
 new EntityIndex()
 internal structure Map<string,Term>
 used by multiple stores via options.entityIndex
 reduces memory for shared node objects

Reasoner API
 new Reasoner(store)
 reason(rules)
  rules: string or array of Quad
  performs forward-chaining: for each rule matching premise, adds conclusion quads to store
  mutates store
  errors on unsupported builtins or backward-chaining

Troubleshooting
 parse errors: use strict format: new Parser({format:'N-Triples'})
 increase stream highWaterMark: fs.createReadStream('file.ttl',{highWaterMark:65536})
 capture errors: parser.parse(stream,{onError:(err)=>console.error(err)})
 write errors: writer.end((err,res)=>{if(err)throw err})
 memory issues: use StreamParser and StreamWriter to process large files above memory

Best Practices
 use DataFactory.quad to construct quads
 reuse StreamParser for streams in pipelines
 share EntityIndex across stores to conserve memory
 prefer streaming API for large datasets
 explicitly set prefixes in Writer options for readable output


## Information Dense Extract
N3.js v1.x: install via npm or CDN. DataFactory: namedNode(string), literal(string,langOrDatatype), defaultGraph(), blankNode([label]), variable(string), quad(subject,predicate,object,[graph]). Parser: new N3.Parser({format?,baseIRI?,blankNodePrefix?,isImpliedBy?}); parse(input,callback) or parse(input):Quad[]. StreamParser: new N3.StreamParser({...,comments?}); emits Quad, 'prefix', 'comment', 'error'. Writer: new N3.Writer(output?,{prefixes?,format?,end?}); addQuad(...), blank(...), list(...), end(callback). StreamWriter: objectMode Writable, Sink. Store: new N3.Store(quads?,{entityIndex?}); size property; addQuad(s), removeQuad(s), remove(input), removeMatches(...), deleteGraph(graph), createBlankNode(), match(...):Iterable, getQuads(...):Quad[], countQuads(...):number, forEach/every/some, getSubjects/Predicates/Objects/Graphs and forX callbacks, iterator. EntityIndex: new N3.EntityIndex() share across stores. Reasoner: new Reasoner(store); reason(rules:string|Quad[]):void supporting only basic graph patterns. Interfaces: DataFactory->RDF.DataFactory; Parser/StreamParser->RDF.Stream & Sink; Writer/StreamWriter->RDF.Stream & Sink; Store->RDF.Store,Source,Sink,DatasetCore. Formats: Turtle,TriG,N-Triples,N-Quads,N3,Notation3,text/n3,RDF-star via names or MIME types, strict via format option.

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
10 Interfaces
11 Compatibility

1 Installation
 npm install n3
 browserify entry.js -s N3 -o bundle.js
 script src='https://unpkg.com/n3/browser/n3.min.js'

2 DataFactory
 namedNode(value:string):NamedNode
 literal(value:string,languageOrDatatype?:string|NamedNode):Literal
 defaultGraph():DefaultGraph
 blankNode(label?:string):BlankNode
 variable(value:string):Variable
 quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad

3 Parser
 new N3.Parser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean})
 parse(input:string|Readable,callback:(error:Error|null,quad:Quad|null,prefixes?:Record<string,NamedNode>)=>void):void
 parse(input:string):Quad[]

4 StreamParser
 new N3.StreamParser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean,comments?:boolean})
 Implements Readable(objectMode), Sink

5 Writer
 new N3.Writer(output?:Writable|object,{prefixes?:Record<string,string>,format?:string,end?:boolean})
 addQuad(subject:Term,predicate:Term,object:Term,graph?:Term):void
 blank(predicate:Term,object:Term):BlankNode
 blank(statements:{predicate:Term,object:Term}[]):BlankNode
 list(items:Term[]):BlankNode
 end(callback?:(error:Error|null,result:string)=>void):void

6 StreamWriter
 new N3.StreamWriter(output:Writable,{prefixes?:Record<string,string>})
 Implements Writable(objectMode), Sink

7 Store
 new N3.Store(quads?:Quad[],{entityIndex?:EntityIndex})
 size:number
 addQuad(Quad):void
 addQuads(Quad[]):void
 removeQuad(Quad):void
 removeQuads(Quad[]):void
 remove(input:Quad[]|AsyncIterable<Quad>|Readable|{subject?:Term,predicate?:Term,object?:Term,graph?:Term}):void
 removeMatches(subject?:Term,predicate?:Term,object?:Term,graph?:Term):void
 deleteGraph(graph:Term):void
 createBlankNode(label?:string):BlankNode
 match(subject?:Term,predicate?:Term,object?:Term,graph?:Term):Iterable<Quad>
 getQuads(...):Quad[]
 countQuads(...):number
 forEach(cb:(Quad)=>void,...):void
 every(cb:(Quad)=>boolean,...):boolean
 some(cb:(Quad)=>boolean,...):boolean
 getSubjects(...):Term[]
 forSubjects(cb:(Term)=>void,...):void
 getPredicates(...):Term[]
 forPredicates(cb,...)...:void
 getObjects(...):Term[]
 forObjects(cb,...)...:void
 getGraphs(...):Term[]
 forGraphs(cb,...)...:void
 [Symbol.iterator]():Iterator<Quad>

8 EntityIndex
 new N3.EntityIndex()
 share across stores

9 Reasoner
 new Reasoner(store:Store)
 reason(rules:string|Quad[]):void

10 Interfaces
 DataFactory implements RDF.DataFactory
 Parser, StreamParser implement RDF.Stream & Sink
 Writer, StreamWriter implement RDF.Stream & Sink
 Store implements RDF.Store,Source,Sink,DatasetCore

11 Compatibility
 Formats: Turtle,TriG,N-Triples,N-Quads,N3,Notation3,text/n3,RDF-star via name or MIME type or wildcard
 strict mode via format option

## Original Source
JavaScript RDF & Linked Data Libraries
https://github.com/rdfjs/N3.js#readme

## Digest of N3_JS

# N3.js Technical Specifications

Date Retrieved: 2024-06-15
Data Size: 668921 bytes

# Installation

• npm install n3
• UMD bundle: browserify entry.js -s N3 -o bundle.js
• CDN: <script src="https://unpkg.com/n3/browser/n3.min.js"></script>

# DataFactory API

Signature:
• namedNode(value: string): NamedNode
• literal(value: string, languageOrDatatype?: string | NamedNode): Literal
• defaultGraph(): DefaultGraph
• blankNode([prefixOrLabel?: string]): BlankNode
• variable(value: string): Variable
• quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad

# Parser API

Constructor: new N3.Parser(options?: {
  format?: string             // e.g. 'Turtle','TriG','N-Triples','N3','application/trig','text/n3', 'TriG*'
  baseIRI?: string
  blankNodePrefix?: string    // default: 'b' + digit + '_'
  isImpliedBy?: boolean       // default: false
})

Methods:
• parse(input: string, callback: (error: Error|null, quad: Quad|null, prefixes?: Record<string,NamedNode>) => void): void
• parse(input: Readable, callback: ...): void
• parse(input: string): Quad[]    // synchronous

# StreamParser API

Constructor: new N3.StreamParser(options?: {
  format?: string
  baseIRI?: string
  blankNodePrefix?: string
  isImpliedBy?: boolean
  comments?: boolean        // default: false
})
Implements: Node.js Readable (objectMode), RDF.js Sink

# Writer API

Constructor: new N3.Writer(output?: Writable|object, options?: {
  prefixes?: Record<string,string>
  format?: string          // default: Turtle or TriG if named graphs
  end?: boolean            // default: true in streaming mode
})

Methods:
• addQuad(subject: Term, predicate: Term, object: Term, graph?: Term): void
• blank(predicate: Term, object: Term): BlankNode
• blank(statements: { predicate: Term, object: Term }[]): BlankNode
• list(items: Term[]): BlankNode
• end(callback?: (error: Error|null, result: string) => void): void

# StreamWriter API

Constructor: new N3.StreamWriter(output: Writable, options?: { prefixes?: Record<string,string> })
Implements: Node.js Writable (objectMode), RDF.js Sink

# Store API

Constructor: new N3.Store(quads?: Quad[], options?: { entityIndex?: EntityIndex })

Properties:
• size: number

Methods:
• addQuad(quad: Quad): void
• addQuads(quads: Quad[]): void
• removeQuad(quad: Quad): void
• removeQuads(quads: Quad[]): void
• remove(input: Quad[]|AsyncIterable<Quad>|Readable|{ subject?: Term, predicate?: Term, object?: Term, graph?: Term }): void
• removeMatches(subject?: Term, predicate?: Term, object?: Term, graph?: Term): void
• deleteGraph(graph: Term): void
• createBlankNode([prefixOrLabel?: string]): BlankNode
• match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Iterable<Quad>
• getQuads(subject?, predicate?, object?, graph?): Quad[]
• countQuads(subject?, predicate?, object?, graph?): number
• forEach(callback: (quad: Quad) => void, subject?, predicate?, object?, graph?): void
• every(callback: (quad: Quad) => boolean, subject?, predicate?, object?, graph?): boolean
• some(callback: (quad: Quad) => boolean, subject?, predicate?, object?, graph?): boolean
• getSubjects(predicate?, object?, graph?): Term[]
• forSubjects(callback: (subject: Term) => void, predicate?, object?, graph?): void
• getPredicates(subject?, object?, graph?): Term[]
• forPredicates(callback, subject?, object?, graph?): void
• getObjects(subject?, predicate?, graph?): Term[]
• forObjects(callback, subject?, predicate?, graph?): void
• getGraphs(subject?, predicate?, object?): Term[]
• forGraphs(callback, subject?, predicate?, object?): void
• [Symbol.iterator](): Iterator<Quad>

# EntityIndex API

Constructor: new N3.EntityIndex()
Use: share index across multiple stores

# Reasoner API

Constructor: new Reasoner(store: N3.Store)
Method: reason(rules: string | Quad[]): void    // supports only basic graph patterns

# RDF.js Interfaces

• DataFactory implements RDF.DataFactory
• Parser & StreamParser implement RDF.Stream & RDF.Sink
• Writer & StreamWriter implement RDF.Stream & RDF.Sink
• Store implements RDF.Store, RDF.Source, RDF.Sink, RDF.DatasetCore

## Attribution
- Source: JavaScript RDF & Linked Data Libraries
- URL: https://github.com/rdfjs/N3.js#readme
- License: License if known
- Crawl Date: 2025-04-28T15:49:45.907Z
- Data Size: 668921 bytes
- Links Found: 5111

## Retrieved
2025-04-28
