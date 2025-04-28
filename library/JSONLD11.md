# JSONLD11

## Crawl Summary
Keywords, context definition fields, IRI resolution rules, processing modes, data model nodes forms, processor API signatures, exceptions, configuration, best practices, and troubleshooting steps.

## Normalised Extract
Table of Contents
1. Syntax Tokens and Keywords
2. Context Definitions
3. IRI Resolution
4. Processing Modes
5. Data Model Structures
6. Algorithms Summary
7. API Methods
8. Errors
9. Configuration
10. Best Practices
11. Troubleshooting

1. Syntax Tokens and Keywords
- @context,@id,@type,@value,@list,@set,@language,@vocab,@base,@graph,@included,@reverse,@index,@nest,@direction,@version,@json,@none,@explicit
- Literal @version value: numeric 1.1

2. Context Definitions
TermDefinition:
  @id: IRI string
  @type: IRI
  @container: one of list,set,index,id,type,language
  @reverse: boolean
  @language: BCP47 code/null
  @direction: "ltr"|"rtl"|null
  @prefix: boolean
  @protected: boolean
Context value: IRI | map | array of contexts
Default vocabulary: @vocab: IRI|null
Base IRI from @base or doc URL

3. IRI Resolution
Expand IRI: RFC3986#5.2
Compact IRI: prefix:suffix where prefix term maps to IRI
Vocabulary-relative: @vocab+term

4. Processing Modes
json-ld-1.1 (default)
json-ld-1.0 disables 1.1 features; errors on numeric @version 1.1

5. Data Model Structures
NodeObject: map without @value,@list,@set or top-level only @graph
ValueObject: {"@value":literal, optional "@type"|"@language"|"@direction"}
ListObject: {"@list":array, optional "@index":string}
SetObject: {"@set":array, optional "@index":string}
GraphObject: {"@graph":array, optional "@id":IRI, "@index":string}

6. Algorithms Summary
expand(input,options): Promise<expandedDocuments>
compact(input,context,options): Promise<compactedDoc>
flatten(input,context?,options): Promise<flattenedDoc>
frame(input,frame,options): Promise<framedDoc>
toRDF(input,options): Promise<QuadMap>
fromRDF(quads,options): Promise<expandedDoc>

7. API Methods (complete signatures in referenceDetails)

8. Errors
InvalidContext, InvalidIRIMapping, UnresolvedPrefix, LoadingDocumentFailed, ProcessingModeMismatch

9. Configuration
options: {base?:string,documentLoader?:(iri)=>Promise<Document>,processingMode?:"json-ld-1.0"|"json-ld-1.1",expandContext?:any,compactToRelative?:boolean,skipExpansion?:boolean}

10. Best Practices
- Local context caching
- Explicit processingMode
- Frame for predictable structure
- Explicit @id for blank nodes

11. Troubleshooting
- CLI --trace
- Check CORS, MIME application/ld+json
- Log active context mid-process

## Supplementary Details
Context loading: defaultDocumentLoader fetches JSON-LD with fetch(), enforces Content-Type application/ld+json. documentLoader must return {documentUrl:string,document:Object}. Processing order: parse JSON, preprocess context, expand IRIs, term-scoped contexts, container processing, type coercion, list-setting, embedding, indexing, framing, normalization. Default options: base: input document URL, processingMode: json-ld-1.1, documentLoader: built-in loader. Context priority: local expansions override remote. Container processing order: @language, @index, @id, @type, @list, @set. Type coercion rules: if @type defined in term definition, coerce value to that datatype. Language direction: defaults to context baseDirection.

## Reference Details
// Example: expand
import { JSONLDProcessor } from 'jsonld';

const processor: JSONLDProcessor = require('jsonld');

(async ()=>{
  const expanded = await processor.expand(
    {"@context":"https://schema.org/","name":"Alice"},
    {
      base: 'https://example.com/',
      expandContext: { ex: 'https://example.com/' },
      documentLoader: async iri => {
        const res = await fetch(iri, {headers:{Accept:'application/ld+json'}});
        return {documentUrl: res.url, document: await res.json()};
      }
    }
  );
  console.log(expanded);
})();

// toRDF
const quads = await processor.toRDF(doc, {produceGeneralizedRdf:false});
quads.get('default').forEach(({subject,predicate,object,graph})=>{
  console.log(`${subject} ${predicate} ${object.value} .`);
});

// fromRDF
const jsonld = await processor.fromRDF(quads, {rdfDirection:'i18n-datatype'});

// CLI usage
jsonld expand --trace input.jsonld > expanded.jsonld
jsonld toRDF --format nquads input.jsonld > out.nq

// Best practice: local context hosting
const localLoader = (iri)=>{
  if(iri==='https://schema.org/') return Promise.resolve({documentUrl:iri,document: require('./schema.context.json')});
  return defaultDocumentLoader(iri);
};

// Troubleshooting commands
// 1. Verify JSON-LD version
grep 'json-ld' input.jsonld
// 2. Trace loading
jsonld expand --loader node --trace input.jsonld


## Information Dense Extract
@context:@context,@id,@type,@value,@list,@set,@language,@vocab,@base,@graph,@included,@reverse,@index,@nest,@direction,@version,@json,@none,@explicit;TermDefinition:{@id:IRI,@type:IRI,@container:(list,set,index,id,type,language),@reverse:boolean,@language:BCP47|null,@direction:ltr|rtl|null,@prefix:boolean,@protected:boolean};Context:Iri|Map|Array;DefaultVocab:@vocab:Iri|null;Base:@base|URL;IRIMode:RFC3986;Compact:prefix:suffix;Mode:json-ld-1.1|json-ld-1.0;Node:{!@value,!@list,!@set|only @graph};Value:{@value,optional(@type|@language|@direction)};List:{@list,@index?};Set:{@set,@index?};Graph:{@graph,@id?,@index?};expand(input,opts)->Promise any[];compact(input,ctx,opts)->Promise any;flatten(input,ctx?,opts)->Promise any;frame(input,frame,opts)->Promise any;toRDF(input,opts)->Promise Map<string,Quad[]>;fromRDF(quads,opts)->Promise any;Errors:InvalidContext,InvalidIRIMapping,UnresolvedPrefix,LoadingDocumentFailed,ProcessingModeMismatch;Opts:{base?:string,documentLoader?:(iri)=>Promise<{documentUrl,document}>,processingMode?,expandContext?,compactToRelative?,skipExpansion?};BestPractices:cache contexts,explicitMode,frame,explicitIds;Troubleshoot:--trace,CORS,MIME,logContext

## Sanitised Extract
Table of Contents
1. Syntax Tokens and Keywords
2. Context Definitions
3. IRI Resolution
4. Processing Modes
5. Data Model Structures
6. Algorithms Summary
7. API Methods
8. Errors
9. Configuration
10. Best Practices
11. Troubleshooting

1. Syntax Tokens and Keywords
- @context,@id,@type,@value,@list,@set,@language,@vocab,@base,@graph,@included,@reverse,@index,@nest,@direction,@version,@json,@none,@explicit
- Literal @version value: numeric 1.1

2. Context Definitions
TermDefinition:
  @id: IRI string
  @type: IRI
  @container: one of list,set,index,id,type,language
  @reverse: boolean
  @language: BCP47 code/null
  @direction: 'ltr'|'rtl'|null
  @prefix: boolean
  @protected: boolean
Context value: IRI | map | array of contexts
Default vocabulary: @vocab: IRI|null
Base IRI from @base or doc URL

3. IRI Resolution
Expand IRI: RFC3986#5.2
Compact IRI: prefix:suffix where prefix term maps to IRI
Vocabulary-relative: @vocab+term

4. Processing Modes
json-ld-1.1 (default)
json-ld-1.0 disables 1.1 features; errors on numeric @version 1.1

5. Data Model Structures
NodeObject: map without @value,@list,@set or top-level only @graph
ValueObject: {'@value':literal, optional '@type'|'@language'|'@direction'}
ListObject: {'@list':array, optional '@index':string}
SetObject: {'@set':array, optional '@index':string}
GraphObject: {'@graph':array, optional '@id':IRI, '@index':string}

6. Algorithms Summary
expand(input,options): Promise<expandedDocuments>
compact(input,context,options): Promise<compactedDoc>
flatten(input,context?,options): Promise<flattenedDoc>
frame(input,frame,options): Promise<framedDoc>
toRDF(input,options): Promise<QuadMap>
fromRDF(quads,options): Promise<expandedDoc>

7. API Methods (complete signatures in referenceDetails)

8. Errors
InvalidContext, InvalidIRIMapping, UnresolvedPrefix, LoadingDocumentFailed, ProcessingModeMismatch

9. Configuration
options: {base?:string,documentLoader?:(iri)=>Promise<Document>,processingMode?:'json-ld-1.0'|'json-ld-1.1',expandContext?:any,compactToRelative?:boolean,skipExpansion?:boolean}

10. Best Practices
- Local context caching
- Explicit processingMode
- Frame for predictable structure
- Explicit @id for blank nodes

11. Troubleshooting
- CLI --trace
- Check CORS, MIME application/ld+json
- Log active context mid-process

## Original Source
JSON-LD 1.1 Core & Processing Algorithms
https://www.w3.org/TR/json-ld11/

## Digest of JSONLD11

# JSON-LD 1.1 Recommendation (16 July 2020)

## 1. Syntax Tokens and Keywords

- Keywords: @context, @id, @type, @value, @list, @set, @language, @vocab, @base, @graph, @included, @reverse, @index, @nest, @direction, @version, @json, @none, @explicit
- Values: 1.1 (numeric), "json-ld-1.1" unsupported for @version in context

## 2. Context Definitions

- @context value types: IRI string, map of term definitions, array of contexts
- Term definition map fields: @id (IRI), @type (IRI), @container (@list,@set,@index,@id,@type,@language), @reverse (boolean), @language (BCP47 tag or null), @direction ("ltr","rtl",null), @nest (string key), @prefix (boolean), @protected (boolean)
- Default vocabulary: @vocab IRI or null
- Base IRI resolution: Use @base in context or document base location

## 3. IRI Resolution

- Expand relative IRI: resolution algorithm per RFC3986, section 5.2
- Compact IRI: prefix:suffix where prefix term maps to IRI+suffix
- Vocabulary-relative term: term expands to @vocab+term

## 4. Document Processing Modes

- json-ld-1.1: default
- json-ld-1.0: disable 1.1 features; error on 1.1 context usage

## 5. Data Model Structures

- Node object: map without @value,@list,@set or single top-level @graph
- Value object: map with @value, optional @type or @language or @direction
- List object: map with @list and optional @index
- Set object: map with @set and optional @index
- Graph object: map with @graph and optional @id,@index

## 6. Processing Algorithms

- Expand: produce expanded form
- Compact: require active context, produce compacted form
- Flatten: produce flat array of node objects
- Frame: apply frame document matching rules
- ToRDF: map to RDF dataset
- FromRDF: map RDF dataset to expanded JSON-LD

## 7. API Method Signatures

Interface JSONLDProcessor {
  expand(input          : any,
         options?       : {
           base?: string;
           expandContext?: any;
           processingMode?: "json-ld-1.0"|"json-ld-1.1";
           documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
         }
  ) : Promise<any[]>;

  compact(input          : any,
          context        : any,
          options?       : {
            base?: string;
            compactToRelative?: boolean;
            processingMode?: "json-ld-1.0"|"json-ld-1.1";
            documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
          }
  ) : Promise<any>;

  flatten(input          : any,
          context?       : any,
          options?       : {
            base?: string;
            processingMode?: "json-ld-1.0"|"json-ld-1.1";
            documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
          }
  ) : Promise<any>;

  frame(input          : any,
        frame             : any,
        options?          : {
          base?: string;
          compact?: boolean;
          embed?: boolean;
          explicit?: boolean;
          omitGraph?: boolean;
          pruneBlankNodeIdentifiers?: boolean;
          skipExpansion?: boolean;
          documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
        }
  ) : Promise<any>;

  toRDF(input          : any,
        options?       : {
          base?: string;
          produceGeneralizedRdf?: boolean;
          processingMode?: "json-ld-1.0"|"json-ld-1.1";
          documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
        }
  ) : Promise<Map<string,{subject:string;predicate:string;object:{value:string;type:string;datatype?:string;language?:string};graph?:string}[]>>;

  fromRDF(quads          : Map<string,{subject:string;predicate:string;object:{value:string;type:string;datatype?:string;language?:string};graph?:string}[]>,
          options         : {
            rdfDirection?: "i18n-datatype";
            processingMode?: "json-ld-1.0"|"json-ld-1.1";
          }
  ) : Promise<any>;
}

## 8. Errors and Exceptions

- InvalidContext: thrown when term definition malformed
- InvalidIRIMapping: invalid IRI expansion
- UnresolvedPrefix: compact IRI prefix not defined
- LoadingDocumentFailed: documentLoader rejected; includes error.url
- ProcessingModeMismatch: @version mismatch

## 9. Configuration Options

- documentLoader(iri): Promise resolving to {documentUrl,document}
- processingMode: "json-ld-1.0"|"json-ld-1.1" default json-ld-1.1
- base: string or document URL
- expandContext: JSON-LD context to apply before expansion
- compactToRelative: boolean default true
- skipExpansion: boolean default false

## 10. Best Practices

- Preload contexts locally to avoid network fetch
- Always set processingMode explicitly in security contexts
- Use framing to generate predictable document shape
- Manage blank nodes with explicit @id when preserving identity

## 11. Troubleshooting

- Use --trace option in CLI to log each algorithm step
- For document load failures, verify network CORS and server MIME type application/ld+json
- On expansion errors, print intermediate active context


## Attribution
- Source: JSON-LD 1.1 Core & Processing Algorithms
- URL: https://www.w3.org/TR/json-ld11/
- License: License if known
- Crawl Date: 2025-04-28T17:48:30.747Z
- Data Size: 13192003 bytes
- Links Found: 93583

## Retrieved
2025-04-28
