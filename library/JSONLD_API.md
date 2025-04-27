# JSONLD_API

## Crawl Summary
JSON-LD JavaScript API WebIDL interfaces and default configuration

JsonLdProcessor methods with signatures:
 expand(input, options)→Promise<Object>
 compact(input, context, options)→Promise<Object>
 flatten(input, context, options)→Promise<Object>
 frame(input, frame, options)→Promise<Object>
 toRDF(input, options)→Promise<Any>
 fromRDF(dataset, options)→Promise<Object>
 normalize(input, options)→Promise<String>
 merge(input, options)→Promise<Object>

JsonLdOptions parameters:
 processingMode: "json-ld-1.1" (default) or "json-ld-1.0"
 base: IRI (default: document URL)
 expandContext: JSON-LD context map
 documentLoader: Function(URL)→Promise<{documentUrl,document}>
 profiles: Array<IRI>
 produceGeneralizedRdf: boolean
 useNative: boolean

## Normalised Extract
Table of Contents
1. JsonLdProcessor Interface
2. JsonLdOptions Parameters
3. Default Document Loader
4. merge() Utility
5. Profiles Option

1. JsonLdProcessor Interface
Methods and signatures:
 expand(JSONLDInput input, JsonLdOptions options) returns Promise<Object>
 compact(JSONLDInput input, JSONLDContext context, JsonLdOptions options) returns Promise<Object>
 flatten(JSONLDInput input, JSONLDContext context, JsonLdOptions options) returns Promise<Object>
 frame(JSONLDInput input, FrameDocument frame, JsonLdOptions options) returns Promise<Object>
 merge(JSONLDInput input, JsonLdOptions options) returns Promise<Object>
 toRDF(JSONLDInput input, JsonLdOptions options) returns Promise<Dataset or Quads>
 fromRDF(RDFDataset dataset, JsonLdOptions options) returns Promise<Object>
 normalize(JSONLDInput input, JsonLdOptions options) returns Promise<String>

2. JsonLdOptions Parameters
processingMode: "json-ld-1.1" | "json-ld-1.0"
base: absolute IRI string or null
expandContext: context map or null
documentLoader: function(url:String)→Promise<{documentUrl:String,document:Object}>
profiles: array of IRI strings
produceGeneralizedRdf: boolean
useNative: boolean

3. Default Document Loader
Signature:
 function defaultDocumentLoader(url:String)→Promise<{documentUrl:String,document:Object}>
Behavior:
 - Uses fetch API
 - Rejects on HTTP status ≥400
 - Parses JSON body
 - Returns object with documentUrl and document body

4. merge() Utility
Signature:
 merge(JSONLDInput input, JsonLdOptions options)→Promise<Object>
Behavior:
 - Concatenates multiple JSON-LD inputs into a single expanded document

5. profiles Option
Allows selection of profiles for compacting; overrides base context


## Supplementary Details
JsonLdOptions defaults
 processingMode="json-ld-1.1"
 base: document URL
 expandContext: null
 documentLoader: defaultDocumentLoader
 profiles: []
 produceGeneralizedRdf=false
 useNative=false

Example usage:
const options={processingMode:"json-ld-1.1",base:"https://example.com/",documentLoader:customLoader};
jsonld.expand(input,options).then(expanded=>console.log(expanded));

Custom document loader example:
function customLoader(url){
  if(url.startsWith("https://mycdn.com/"))return fetch(url).then(r=>r.json()).then(doc=>({documentUrl:url,document:doc}));
  throw new Error("Unsupported URL");
}

Profiles usage:
jsonld.compact(input,context,{profiles:["https://www.w3.org/ns/did/v1"]});

produceGeneralizedRdf:
jsonld.toRDF(input,{produceGeneralizedRdf:true}).then(dataset=>{/* dataset may include generalized triples */});

## Reference Details
WebIDL fragments:

interface JsonLdProcessor {
  Promise<Object> expand(JSONLDInput input, JsonLdOptions options);
  Promise<Object> compact(JSONLDInput input, JSONLDContext context, JsonLdOptions options);
  Promise<Object> flatten(JSONLDInput input, JSONLDContext context, JsonLdOptions options);
  Promise<Object> frame(JSONLDInput input, FrameDocument frame, JsonLdOptions options);
  Promise<Object> merge(JSONLDInput input, JsonLdOptions options);
  Promise<JsonLdRDF> toRDF(JSONLDInput input, JsonLdOptions options);
  Promise<Object> fromRDF(RDFDataset dataset, JsonLdOptions options);
  Promise<String> normalize(JSONLDInput input, JsonLdOptions options);
};

dictionary JsonLdOptions {
  DOMString processingMode = "json-ld-1.1";
  DOMString base = null;
  Any expandContext = null;
  JsonLdDocumentLoader documentLoader = defaultDocumentLoader;
  sequence<DOMString> profiles = [];
  boolean produceGeneralizedRdf = false;
  boolean useNative = false;
};

dictionary JsonLdDocumentLoaderResult {
  DOMString documentUrl;
  Any document;
};

typedef (JsonLdDocumentLoaderResult or Promise<JsonLdDocumentLoaderResult>) JsonLdDocumentLoader(DOMString url);

dictionary RDFDataset { /* conforms to RDF/JS spec: DatasetCore<Quad> */ };

dictionary JsonLdRDF { type: "application/n-quads" or "application/n-quads; charset=utf-8"; value: String; }

Example code:
import jsonld from 'jsonld';

const input={"@context":{"name":"http://xmlns.com/foaf/0.1/name"},"name":"Alice"};
const options={ processingMode:"json-ld-1.1", base:"https://example.com/" };
jsonld.compact(input, input['@context'], options).then(compacted=> {
  console.log(compacted);
}).catch(err=> console.error(err));

Best practices:
- Always set processingMode to match desired JSON-LD version
- Provide a custom documentLoader for authenticated or local contexts
- Use profiles to apply standard vocabularies during compaction
- Use toRDF with produceGeneralizedRdf when working with blank node generalized triples

Troubleshooting:
Command: curl -I https://example.com/context.json
Expected: HTTP/1.1 200 OK
If 404 or network error, ensure context URL is accessible or use local file loader.

Error patterns:
Error: HTTP Error: 404 → context URL typo or missing file
Error: JSON-LD only supports JSON content → ensure correct MIME type


## Information Dense Extract
JsonLdProcessor methods: expand(input,options)→Promise<Object>; compact(input,context,options)→Promise<Object>; flatten(input,context,options); frame(input,frame,options); merge(input,options); toRDF(input,options)→Promise<RDFDataset or N-Quads>; fromRDF(dataset,options)→Promise<Object>; normalize(input,options)→Promise<String>.

JsonLdOptions: processingMode (json-ld-1.1|json-ld-1.0), base (IRI|null), expandContext (Object|null), documentLoader(Function URL→Promise<{documentUrl,document}>), profiles(Array<IRI>), produceGeneralizedRdf(boolean), useNative(boolean).

defaultDocumentLoader uses fetch, rejects status>=400, returns {documentUrl,url,document:parsedJSON}.

Examples: jsonld.expand(input,{processingMode:"json-ld-1.1",base:"IRI",documentLoader:loader}); jsonld.compact(input,context,options); jsonld.toRDF(input,{produceGeneralizedRdf:true}).then(dataset=>...);

Best practices: set processingMode, custom loader for auth, use profiles for standard vocabs, produceGeneralizedRdf for generalized RDF; troubleshoot via curl -I contextURL; common errors HTTP 404, JSON parse errors.

## Sanitised Extract
Table of Contents
1. JsonLdProcessor Interface
2. JsonLdOptions Parameters
3. Default Document Loader
4. merge() Utility
5. Profiles Option

1. JsonLdProcessor Interface
Methods and signatures:
 expand(JSONLDInput input, JsonLdOptions options) returns Promise<Object>
 compact(JSONLDInput input, JSONLDContext context, JsonLdOptions options) returns Promise<Object>
 flatten(JSONLDInput input, JSONLDContext context, JsonLdOptions options) returns Promise<Object>
 frame(JSONLDInput input, FrameDocument frame, JsonLdOptions options) returns Promise<Object>
 merge(JSONLDInput input, JsonLdOptions options) returns Promise<Object>
 toRDF(JSONLDInput input, JsonLdOptions options) returns Promise<Dataset or Quads>
 fromRDF(RDFDataset dataset, JsonLdOptions options) returns Promise<Object>
 normalize(JSONLDInput input, JsonLdOptions options) returns Promise<String>

2. JsonLdOptions Parameters
processingMode: 'json-ld-1.1' | 'json-ld-1.0'
base: absolute IRI string or null
expandContext: context map or null
documentLoader: function(url:String)Promise<{documentUrl:String,document:Object}>
profiles: array of IRI strings
produceGeneralizedRdf: boolean
useNative: boolean

3. Default Document Loader
Signature:
 function defaultDocumentLoader(url:String)Promise<{documentUrl:String,document:Object}>
Behavior:
 - Uses fetch API
 - Rejects on HTTP status 400
 - Parses JSON body
 - Returns object with documentUrl and document body

4. merge() Utility
Signature:
 merge(JSONLDInput input, JsonLdOptions options)Promise<Object>
Behavior:
 - Concatenates multiple JSON-LD inputs into a single expanded document

5. profiles Option
Allows selection of profiles for compacting; overrides base context

## Original Source
JSON-LD 1.1 Specification and API
https://www.w3.org/TR/json-ld11-api/

## Digest of JSONLD_API

# JsonLdProcessor Interface

WebIDL declaration:
interface JsonLdProcessor {
  Promise<Object> expand(JSONLDInput input, JsonLdOptions options);
  Promise<Object> compact(JSONLDInput input, JSONLDContext context, JsonLdOptions options);
  Promise<Object> flatten(JSONLDInput input, JSONLDContext context, JsonLdOptions options);
  Promise<Object> frame(JSONLDInput input, FrameDocument frame, JsonLdOptions options);
  Promise<Object> merge(JSONLDInput input, JsonLdOptions options);
  Promise<Any> toRDF(JSONLDInput input, JsonLdOptions options);
  Promise<Object> fromRDF(RDFDataset dataset, JsonLdOptions options);
  Promise<String> normalize(JSONLDInput input, JsonLdOptions options);
};

# JsonLdOptions Dictionary

WebIDL declaration:
dictionary JsonLdOptions {
  DOMString processingMode = "json-ld-1.1";
  DOMString base = null;
  DOMString expandContext = null;
  JsonLdDocumentLoader documentLoader = defaultDocumentLoader;
  Array<String> profiles = [];
  boolean produceGeneralizedRdf = false;
  boolean useNative = false;
  Any additional custom loader options;
};

# Default Document Loader

function defaultDocumentLoader(url) {
  return fetch(url).then(response => {
    return response.status >= 400
      ? Promise.reject(new Error(`HTTP Error: ${response.status}`))
      : response.json().then(body => ({ documentUrl: url, document: body }));
  });
}

# Configuration Options and Defaults

- processingMode: "json-ld-1.1" or "json-ld-1.0"
- base: Base IRI for relative resolution (default: document location)
- expandContext: Local context to use during expansion
- documentLoader: Function(url) returning Promise<{documentUrl, document}>
- profiles: Array of profile URIs for compact API
- produceGeneralizedRdf: Include generalized triples (default: false)
- useNative: Use native RDF dataset (default: false)

# Retrieval metadata

Source: JSON-LD 1.1 Processing Algorithms and API
Retrieved: 2024-06-25
Data Size: 32556606 bytes
Links Found: 153009
Error: None

## Attribution
- Source: JSON-LD 1.1 Specification and API
- URL: https://www.w3.org/TR/json-ld11-api/
- License: License
- Crawl Date: 2025-04-27T06:50:34.119Z
- Data Size: 32556606 bytes
- Links Found: 153009

## Retrieved
2025-04-27
