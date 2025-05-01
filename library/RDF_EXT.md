# RDF_EXT

## Crawl Summary
Install via npm install --save rdf-ext. Import default export as rdf. Default export is instance of @rdfjs/environment. Available factories: DataFactory, DatasetFactory, FetchFactory, FormatsFactory, GrapoiFactory, NamespaceFactory, PrefixMapFactory, TermMapFactory, TermSetFactory, TraverserFactory. Experimental ScoreFactory.

## Normalised Extract
Table of Contents
1 Installation
2 Import and Default Export
3 Environment Factories
4 Experimental Features

1 Installation
  npm install --save rdf-ext

2 Import and Default Export
  import rdf from 'rdf-ext'

3 Environment Factories
  DataFactory:
    namedNode(value:string):NamedNode
    blankNode(value?:string):BlankNode
    literal(value:string, languageOrDatatype?:string|NamedNode):Literal
    defaultGraph():DefaultGraph
    variable(value:string):Variable
    quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
  DatasetFactory:
    dataset():Dataset
  FetchFactory:
    fetch(input:RequestInfo,init?:RequestInit):Promise<Response>
  FormatsFactory:
    register(format:string,serializer:Serializer):void
    get(format:string):Serializer
  GrapoiFactory:
    graphPointer(subject:Term,dataset?:Dataset):GraphPointer
  NamespaceFactory:
    namespace(uri:string):Namespace
  PrefixMapFactory:
    prefixMap(entries:Record<string,string>):PrefixMap
  TermMapFactory:
    termMap(entries:Array<[Term,Term]>):TermMap
  TermSetFactory:
    termSet(entries:Array<Term>):TermSet
  TraverserFactory:
    traverse(dataset:Dataset,options?:TraverserOptions):AsyncIterable<Term>

4 Experimental Features
  ScoreFactory:
    score(dataset:Dataset):number


## Supplementary Details
Environment instantiation: import rdf from 'rdf-ext'. rdf is preconfigured with registered factories. Node.js polyfill: npm install node-fetch; globalThis.fetch = require('node-fetch'). Default formats registered: application/n-quads->NQuadsSerializer; application/trig->TriGSerializer. To add custom serializer: formats.register('text/turtle',TurtleSerializer). Implementation steps: create dataset via rdf.dataset(); add quads via dataset.add(rdf.quad(...)); serialize via formats.get('application/n-quads').import(dataset.toStream()); async iterate output chunks. To parse: const parser=formats.parsers.get('application/n-quads'); const stream = parser.import(stringToStream(data)); const dataset = await rdf.dataset().import(stream);

## Reference Details
DataFactory
  namedNode(value:string):NamedNode
  blankNode(value?:string):BlankNode
  literal(value:string,languageOrDatatype?:string|NamedNode):Literal
  defaultGraph():DefaultGraph
  variable(value:string):Variable
  quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
  equals(a:Term,b:Term):boolean

DatasetFactory
  dataset():Dataset
  dataset(importStream:Stream<Quad>):Promise<Dataset>

FetchFactory
  fetch(input:RequestInfo,init?:RequestInit):Promise<Response>

FormatsFactory
  register(format:string,serializer:Serializer):void
  get(format:string):Serializer
  parsers:Record<string,Parser>
  serializers:Record<string,Serializer>

GrapoiFactory
  graphPointer(subject:Term,dataset?:Dataset):GraphPointer

NamespaceFactory
  namespace(uri:string):Namespace
  namespace.bind(prefix:string,uri:string):void

PrefixMapFactory
  prefixMap(entries:Record<string,string>):PrefixMap
  prefixMap.set(prefix:string,uri:string):void
  prefixMap.get(prefix:string):string|undefined

TermMapFactory
  termMap(entries:Array<[Term,Term]>):TermMap
  termMap.set(key:Term,value:Term):void
  termMap.get(key:Term):Term|undefined

TermSetFactory
  termSet(entries:Array<Term>):TermSet
  termSet.add(term:Term):void
  termSet.has(term:Term):boolean

TraverserFactory
  traverse(dataset:Dataset,options?:TraverserOptions):AsyncIterable<Term>

ScoreFactory (experimental)
  score(dataset:Dataset):number

Best practices:
  reuse rdf object factories; use streaming for large datasets; register only needed serializers.

Full code example:
  import rdf from 'rdf-ext'
  import formats from '@rdfjs/formats-common'

  const dataset = rdf.dataset()
  const quad = rdf.quad(
    rdf.namedNode('http://example.org/s'),
    rdf.namedNode('http://example.org/p'),
    rdf.literal('o')
  )
  dataset.add(quad)

  const serializer = formats.serializers.get('application/n-quads')
  const output = serializer.import(dataset.toStream())
  let result = ''
  for await (const chunk of output) {
    result += chunk.toString()
  }
  console.log(result)

Troubleshooting:
  Error: fetch is not defined in Node.js
    fix: npm install node-fetch; add globalThis.fetch = require('node-fetch') at entry.
  Error: no serializer found for mime text/turtle
    fix: npm install @rdfjs/formats-common; register: formats.serializers.get('text/turtle')

## Information Dense Extract
npm install rdf-ext; import rdf from 'rdf-ext'; rdf: @rdfjs/environment with factories: DataFactory.namedNode(string):NamedNode blankNode([string]):BlankNode literal(string,string|NamedNode):Literal defaultGraph():DefaultGraph variable(string):Variable quad(Term,Term,Term,[Term]):Quad equals(Term,Term):boolean; DatasetFactory.dataset([Stream<Quad>]):Dataset|Promise<Dataset>; FetchFactory.fetch(RequestInfo,[RequestInit]):Promise<Response>; FormatsFactory.register(string,Serializer) get(string):Serializer; GrapoiFactory.graphPointer(Term,[Dataset]):GraphPointer; NamespaceFactory.namespace(string) bind(string,string); PrefixMapFactory.prefixMap(Object); TermMapFactory.termMap(Array<[Term,Term]>); TermSetFactory.termSet(Array<Term>); TraverserFactory.traverse(Dataset,[Options]):AsyncIterable<Term>; ScoreFactory.score(Dataset):number; Node.js: globalThis.fetch=require('node-fetch'); default serializers: application/n-quads->NQuadsSerializer; code: dataset.add(rdf.quad(...)); serializer.import(dataset.toStream()); async iteration;

## Sanitised Extract
Table of Contents
1 Installation
2 Import and Default Export
3 Environment Factories
4 Experimental Features

1 Installation
  npm install --save rdf-ext

2 Import and Default Export
  import rdf from 'rdf-ext'

3 Environment Factories
  DataFactory:
    namedNode(value:string):NamedNode
    blankNode(value?:string):BlankNode
    literal(value:string, languageOrDatatype?:string|NamedNode):Literal
    defaultGraph():DefaultGraph
    variable(value:string):Variable
    quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
  DatasetFactory:
    dataset():Dataset
  FetchFactory:
    fetch(input:RequestInfo,init?:RequestInit):Promise<Response>
  FormatsFactory:
    register(format:string,serializer:Serializer):void
    get(format:string):Serializer
  GrapoiFactory:
    graphPointer(subject:Term,dataset?:Dataset):GraphPointer
  NamespaceFactory:
    namespace(uri:string):Namespace
  PrefixMapFactory:
    prefixMap(entries:Record<string,string>):PrefixMap
  TermMapFactory:
    termMap(entries:Array<[Term,Term]>):TermMap
  TermSetFactory:
    termSet(entries:Array<Term>):TermSet
  TraverserFactory:
    traverse(dataset:Dataset,options?:TraverserOptions):AsyncIterable<Term>

4 Experimental Features
  ScoreFactory:
    score(dataset:Dataset):number

## Original Source
rdf-ext: RDF/JS Library Ecosystem
https://github.com/rdf-ext/rdf-ext

## Digest of RDF_EXT

# Installation

npm install --save rdf-ext

# Usage

import rdf from 'rdf-ext'

const term = rdf.namedNode('http://example.org/')

The default export is an instance of @rdfjs/environment containing the following factories:

DataFactory
DatasetFactory
FetchFactory
FormatsFactory
GrapoiFactory
NamespaceFactory
PrefixMapFactory
TermMapFactory
TermSetFactory
TraverserFactory

Experimental features:

ScoreFactory

# Retrieved on 2024-06-11

# Attribution

Source: rdf-ext repository README.md
Data size: 522407 bytes
Error: None

## Attribution
- Source: rdf-ext: RDF/JS Library Ecosystem
- URL: https://github.com/rdf-ext/rdf-ext
- License: License: MIT
- Crawl Date: 2025-05-01T21:46:33.396Z
- Data Size: 522407 bytes
- Links Found: 4369

## Retrieved
2025-05-01
