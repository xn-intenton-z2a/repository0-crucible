# RDFJS_STREAMS

## Crawl Summary
Data model interfaces: NamedNode, BlankNode, Literal, DefaultGraph, Variable, Quad, Dataset with method signatures. DataFactory methods with exact parameter and return types. Stream interfaces: Source<Q>(quad:Q|null, next?:() => void):void|Promise<void>; Sink<Q>.import(source): Promise<void>. Streaming utilities: arrayToStream, streamToArray, pipeline with concurrency and error-delay options via configure.

## Normalised Extract
Table of Contents
1 Data Model Interfaces
2 DataFactory API
3 Stream Interfaces
4 Streaming Utilities

1 Data Model Interfaces
 NamedNode(termType:'NamedNode',value:string)
 BlankNode(termType:'BlankNode',value:string)
 Literal(termType:'Literal',value:string,language:string,datatype:NamedNode)
 DefaultGraph(termType:'DefaultGraph',value:'')
 Variable(termType:'Variable',value:string)
 Quad(subject: NamedNode|BlankNode|Variable, predicate: NamedNode|Variable, object: NamedNode|BlankNode|Literal|Variable, graph: NamedNode|BlankNode|DefaultGraph|Variable)
 Dataset<Q>(size:number, add(quad:Q):this, delete(quad:Q):this, has(quad:Q):boolean, match(...):Dataset<Q>, toArray():Q[])

2 DataFactory API
 namedNode(value:string):NamedNode
 blankNode(value?:string):BlankNode
 literal(value:string, languageOrDatatype?:string|NamedNode):Literal
 defaultGraph():DefaultGraph
 variable(value:string):Variable
 quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
 dataset(quads?:Quad[]):Dataset<Quad>

3 Stream Interfaces
 Source<Q>(quad:Q|null,next?:()=>void):void|Promise<void>
 Sink<Q>.import(source:Source<Q>):Promise<void>

4 Streaming Utilities
 arrayToStream<Q>(quads:Q[]):Source<Q>
 streamToArray<Q>(source:Source<Q>):Promise<Q[]>
 pipeline<Q>(source:Source<Q>, ...transforms:Array<(quad:Q)=>Q>, sink:Sink<Q>):Promise<void>
 configure<Q>({maxConcurrency:number,delayErrors:boolean}):{arrayToStream,streamToArray,pipeline}

## Supplementary Details
Default parameters: StreamPipelineOptions.maxConcurrency=Infinity; delayErrors=false. Backpressure: next callback signals readiness for next quad. Error handling: pipeline rejects on first error unless delayErrors=true. Node.js stream compatibility: wrap Source with Readable.from for integration. Import patterns: sink.import returns completion Promise. DataFactory implementations must preserve termType and value properties. Dataset.match supports undefined args as wildcards.

## Reference Details
DataFactory.namedNode(value:string):NamedNode
 DataFactory.blankNode(value?:string):BlankNode
 DataFactory.literal(value:string,languageOrDatatype?:string|NamedNode):Literal
 DataFactory.defaultGraph():DefaultGraph
 DataFactory.variable(value:string):Variable
 DataFactory.quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
 DataFactory.dataset(quads?:Quad[]):Dataset<Quad>

Source<Q>(quad:Q|null,next?:()=>void):void|Promise<void>
 Sink<Q>.import(source:Source<Q>):Promise<void>

function arrayToStream<Q>(quads:Q[]):Source<Q> {
  let index=0; return function push(quad, next){
    if(index<quads.length){ next(); quad=quads[index++]; this(quad,next);} else { this(null);} }
}

async function streamToArray<Q>(source:Source<Q>):Promise<Q[]> {
  const result:Q[]=[];
  return new Promise((resolve,reject)=>{
    function sink(quad:Q|null){
      if(quad){ result.push(quad);} else { resolve(result);} }
    source(null);
    source=source;
  });
}

async function pipeline<Q>(source:Source<Q>, ...transforms:Array<(quad:Q)=>Q>, sink:Sink<Q>):Promise<void> {
  let transformedSource:Source<Q>=source;
  for(const fn of transforms){
    transformedSource=(quad, next)=>{
      const out=quad!==null?fn(quad):null;
      return transformedSource(out,next);
    };
  }
  return sink.import(transformedSource);
}

// Usage Example
import {arrayToStream, streamToArray, pipeline, configure} from 'rdfjs-streams';
const factory = /* DataFactory implementation */;
const quads = factory.dataset([factory.quad(...)]).toArray();
const source = arrayToStream(quads);
const sink:Sink<Quad> = { import: async (src) => { for await(const q of src) console.log(q); }};
await pipeline(source, q=>q, sink);

// Troubleshooting
// Error: UnhandledPromiseRejection when sink.import finishes with error
// Command: NODE_OPTIONS=--unhandled-rejections=strict node app.js
// Expected: stack trace and exit code 1

## Information Dense Extract
NamedNode:value:string;BlankNode:value:string;Literal:{value:string,language:string,datatype:NamedNode};DefaultGraph:value:'';Variable:value:string;Quad:{subject,predicate,object,graph};Dataset:size:number,add,delete,has,match,toArray;DataFactory.methods:namedNode,blankNode,literal,defaultGraph,variable,quad,dataset;Source<Q>(quad:Q|null,next?:()=>void):void|Promise;Sink<Q>.import(source):Promise;arrayToStream<Q>(Q[]):Source;streamToArray<Q>(Source):Promise<Q[]>;pipeline<Q>(Source,transforms:((Q)=>Q)[],Sink):Promise;configure opts:{maxConcurrency:number=Infinity,delayErrors:boolean=false} returns customized utilities;backpressure via next callback;error handling via delayErrors;Node.js integration via Readable.from(source)

## Sanitised Extract
Table of Contents
1 Data Model Interfaces
2 DataFactory API
3 Stream Interfaces
4 Streaming Utilities

1 Data Model Interfaces
 NamedNode(termType:'NamedNode',value:string)
 BlankNode(termType:'BlankNode',value:string)
 Literal(termType:'Literal',value:string,language:string,datatype:NamedNode)
 DefaultGraph(termType:'DefaultGraph',value:'')
 Variable(termType:'Variable',value:string)
 Quad(subject: NamedNode|BlankNode|Variable, predicate: NamedNode|Variable, object: NamedNode|BlankNode|Literal|Variable, graph: NamedNode|BlankNode|DefaultGraph|Variable)
 Dataset<Q>(size:number, add(quad:Q):this, delete(quad:Q):this, has(quad:Q):boolean, match(...):Dataset<Q>, toArray():Q[])

2 DataFactory API
 namedNode(value:string):NamedNode
 blankNode(value?:string):BlankNode
 literal(value:string, languageOrDatatype?:string|NamedNode):Literal
 defaultGraph():DefaultGraph
 variable(value:string):Variable
 quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
 dataset(quads?:Quad[]):Dataset<Quad>

3 Stream Interfaces
 Source<Q>(quad:Q|null,next?:()=>void):void|Promise<void>
 Sink<Q>.import(source:Source<Q>):Promise<void>

4 Streaming Utilities
 arrayToStream<Q>(quads:Q[]):Source<Q>
 streamToArray<Q>(source:Source<Q>):Promise<Q[]>
 pipeline<Q>(source:Source<Q>, ...transforms:Array<(quad:Q)=>Q>, sink:Sink<Q>):Promise<void>
 configure<Q>({maxConcurrency:number,delayErrors:boolean}):{arrayToStream,streamToArray,pipeline}

## Original Source
RDF/JS Data Model and Stream Specifications
https://rdf.js.org/streams/spec/

## Digest of RDFJS_STREAMS

# RDF/JS Streams Specification

Date Retrieved: 2024-06-15

## Data Model Interfaces

### NamedNode
interface NamedNode {
  termType: 'NamedNode'
  value: string
}

### BlankNode
interface BlankNode {
  termType: 'BlankNode'
  value: string
}

### Literal
interface Literal {
  termType: 'Literal'
  value: string
  language: string
  datatype: NamedNode
}

### DefaultGraph
interface DefaultGraph {
  termType: 'DefaultGraph'
  value: ''
}

### Variable
interface Variable {
  termType: 'Variable'
  value: string
}

### Quad
interface Quad {
  subject: NamedNode | BlankNode | Variable
  predicate: NamedNode | Variable
  object: NamedNode | BlankNode | Literal | Variable
  graph: NamedNode | BlankNode | DefaultGraph | Variable
}

### Dataset<Q extends Quad>
interface Dataset<Q extends Quad> {
  size: number
  add(quad: Q): this
  delete(quad: Q): this
  has(quad: Q): boolean
  match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Dataset<Q>
  toArray(): Q[]
}

## DataFactory
interface DataFactory<D extends DefaultGraph, Q extends Quad, N extends NamedNode, B extends BlankNode, L extends Literal, V extends Variable> {
  namedNode(value: string): N
  blankNode(value?: string): B
  literal(value: string, languageOrDatatype?: string | NamedNode): L
  defaultGraph(): D
  variable(value: string): V
  quad(subject: Term, predicate: Term, object: Term, graph?: Term): Q
  dataset(quads?: Q[]): Dataset<Q>
}

## Stream Interfaces

### Source<Q extends Quad>
type Source<Q> = (quad: Q | null, next?: () => void) => void | Promise<void>

### Sink<Q extends Quad>
interface Sink<Q> {
  import(source: Source<Q>): Promise<void>
}

## Streaming Utilities

### arrayToStream
function arrayToStream<Q extends Quad>(quads: Q[]): Source<Q>

### streamToArray
function streamToArray<Q extends Quad>(source: Source<Q>): Promise<Q[]>

### pipeline
function pipeline<Q extends Quad>(source: Source<Q>, ...transforms: Array<(quad: Q) => Q>, sink: Sink<Q>): Promise<void>

### configure
interface StreamPipelineOptions {
  maxConcurrency: number
  delayErrors: boolean
}

function configure<Q extends Quad>(options: StreamPipelineOptions): {
  arrayToStream: (quads: Q[]) => Source<Q>
  streamToArray: (source: Source<Q>) => Promise<Q[]>
  pipeline: (source: Source<Q>, transforms: Array<(quad: Q) => Q>, sink: Sink<Q>) => Promise<void>
}

## Attribution
- Source: RDF/JS Data Model and Stream Specifications
- URL: https://rdf.js.org/streams/spec/
- License: License
- Crawl Date: 2025-04-27T05:48:17.714Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27
