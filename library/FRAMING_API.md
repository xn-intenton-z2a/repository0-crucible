# FRAMING_API

## Crawl Summary
• JsonLdProcessor.frame(input:Object|Array, frame:Object, options:JsonLdOptions):Promise<Object|Array>
• JsonLdOptions flags: processingMode(default 'json-ld-1.1'), base, expandContext, embed(default '@once'), explicit, omitDefault, omitGraph, requireAll, ordered
• JsonLdError codes: 'invalid frame', 'invalid embed value', 'recursion limit exceeded'
• Usage: require('jsonld').frame, async/await pattern
• Key flags impact: ordered affects sorting, requireAll enforces strict property presence, omitDefault suppresses defaults


## Normalised Extract
Table of Contents
1 Framing API Overview
2 Frame Matching Options
3 JsonLdProcessor.frame signature
4 JsonLdOptions flags and defaults
5 Error codes and handling
6 Node.js framing example
7 Implementation pattern steps
8 Best practices
9 Troubleshooting steps

1 Framing API Overview
The API method frame takes an expanded JSON-LD input document and a frame document containing matching rules and returns a shaped output matching the frame.

2 Frame Matching Options
Embed flag values: @once, @last, @always, @never
explicit boolean: include only declared properties
omitDefault boolean: omit added null defaults
omitGraph boolean: omit top-level @graph when single tree
requireAll boolean: enforce all frame properties present
ordered boolean: sort arrays by IRI order

3 JsonLdProcessor.frame signature
Promise<Object|Array> frame(
  input: Object|Array,
  frame: Object,
  options?: JsonLdOptions
)

4 JsonLdOptions flags and defaults
processingMode: 'json-ld-1.1' (default) or 'json-ld-1.0'
base: string (document base IRI)
expandContext: Object
embed: '@once' (default)
explicit: false (default)
omitDefault: false (default)
omitGraph: false (default)
requireAll: false (default)
ordered: false (default)

5 Error codes and handling
JsonLdError thrown with name 'JsonLdError', code in {invalid frame, invalid embed value, recursion limit exceeded}, message.

6 Node.js framing example
Load input and frame JSON files; call jsonld.frame with options; await result; handle errors.

7 Implementation pattern steps
1 Load/parse JSON-LD input
2 Define frame with context and matching rules
3 Configure options
4 Call frame method
5 Process or log result

8 Best practices
Use ordered:false for performance
Strict matching with requireAll:true only when required
Combine explicit:true and omitDefault:true to avoid null placeholders

9 Troubleshooting steps
Run node example, check error.code and error.message; verify frame syntax and valid embed values; reduce frame depth if recursion error occurs.

## Supplementary Details
JsonLdOptions details:
processingMode: when set to 'json-ld-1.0', disables 1.1 framing features, else default 'json-ld-1.1'.
base: used to resolve relative IRIs in input and frame.
expandContext: applied before expansion to augment active context.
embed:@once embeds each referenced node only once; @last embeds last encountered; @always embeds every reference; @never emits only node references.
explicit:true prevents automatic addition of properties defined in frame but missing in input; default false adds null values or defaults.
omitDefault:true suppresses null or default placeholders; default false includes them.
omitGraph:true omits top-level @graph wrapper when only one top-level node exists; default false always uses @graph.
requireAll:true ensures that all non-flag properties in frame must appear in input node for match; default false matches any one.
ordered:true sorts arrays of node objects and values by IRI lexical order; default false preserves input order.

Implementation steps:
Fetch or read JSON-LD document
Expand input with jsonld.expand or assume expanded
Construct frame document conforming to JSON-LD framing keywords and context
Set JsonLdOptions flags to desired behavior
Call jsonld.frame(expandedInput, frame, options)
If needed, compact result with jsonld.compact or toRDF
Handle or log JsonLdError exceptions


## Reference Details
API Specifications:
interface JsonLdProcessor {
  frame(
    input: Object | Array,
    frame: Object,
    options?: JsonLdOptions
  ): Promise<Object | Array>;
}

interface JsonLdOptions {
  processingMode?: 'json-ld-1.0' | 'json-ld-1.1';
  base?: string;
  expandContext?: Object;
  embed?: '@once' | '@last' | '@always' | '@never';
  explicit?: boolean;
  omitDefault?: boolean;
  omitGraph?: boolean;
  requireAll?: boolean;
  ordered?: boolean;
}

Error Codes:
{ code: 'invalid frame', message: string }
{ code: 'invalid embed value', message: string }
{ code: 'recursion limit exceeded', message: string }

Full Implementation Example:
```js
const jsonld = require('jsonld');

const inputDocument = {
  "@context": {"@vocab": "http://example.org/", "contains": {"@type": "@id"}},
  "@graph": [ /* array of node objects */ ]
};

const frameDocument = {
  "@context": {"@vocab": "http://example.org/"},
  "@type": "Library",
  "contains": {
    "@type": "Book",
    "contains": {"@type": "Chapter"}
  }
};

const options = {
  processingMode: 'json-ld-1.1',
  base: 'http://example.org/',
  embed: '@once',
  explicit: false,
  omitDefault: false,
  omitGraph: false,
  requireAll: false,
  ordered: false
};

async function runFraming() {
  try {
    const framed = await jsonld.frame(inputDocument, frameDocument, options);
    console.log(JSON.stringify(framed, null, 2));
  } catch(err) {
    console.error('Error framing JSON-LD:', err.code, err.message);
    process.exit(1);
  }
}

runFraming();
```

Configuration Defaults:
• Embed: '@once'
• Explicit: false
• omitDefault: false
• omitGraph: false
• requireAll: false
• ordered: false

Best Practices:
• Combine explicit:true with omitDefault:true to eliminate null placeholders.
• Use ordered:true when stable sorted output is required for diffing or canonicalization.
• Set processingMode to 'json-ld-1.0' to maintain compatibility with older processors.

Troubleshooting:
1. Run example: node framing-example.js
2. If error.code === 'invalid frame', verify frame has valid JSON-LD framing keywords (@type, @id, @embed, @default).
3. If error.code === 'invalid embed value', ensure embed is one of '@once','@last','@always','@never'.
4. For recursion errors, reduce nested frame depth or increase stack limit: node --stack-size=10000 framing-example.js

Expected CLI output: framed JSON-LD document structured per frame topology.

## Information Dense Extract
JsonLdProcessor.frame(input:Object|Array, frame:Object, options?:JsonLdOptions):Promise<Object|Array>
JsonLdOptions{processingMode:'json-ld-1.1'|'json-ld-1.0', base:string, expandContext:Object, embed:'@once'|'@last'|'@always'|'@never', explicit:boolean, omitDefault:boolean, omitGraph:boolean, requireAll:boolean, ordered:boolean}
Errors: JsonLdError{code:'invalid frame'|'invalid embed value'|'recursion limit exceeded'}
Example Pattern: const framed=await jsonld.frame(doc,frame,{embed:'@once',explicit:true,omitDefault:false,omitGraph:false,requireAll:true,ordered:true})
Best: explicit:true+omitDefault:true strips nulls; ordered:false for perf; processingMode:'json-ld-1.0' locks features
Troubleshoot: node example.js -> inspect err.code/err.message; adjust frame syntax; reduce nesting

## Sanitised Extract
Table of Contents
1 Framing API Overview
2 Frame Matching Options
3 JsonLdProcessor.frame signature
4 JsonLdOptions flags and defaults
5 Error codes and handling
6 Node.js framing example
7 Implementation pattern steps
8 Best practices
9 Troubleshooting steps

1 Framing API Overview
The API method frame takes an expanded JSON-LD input document and a frame document containing matching rules and returns a shaped output matching the frame.

2 Frame Matching Options
Embed flag values: @once, @last, @always, @never
explicit boolean: include only declared properties
omitDefault boolean: omit added null defaults
omitGraph boolean: omit top-level @graph when single tree
requireAll boolean: enforce all frame properties present
ordered boolean: sort arrays by IRI order

3 JsonLdProcessor.frame signature
Promise<Object|Array> frame(
  input: Object|Array,
  frame: Object,
  options?: JsonLdOptions
)

4 JsonLdOptions flags and defaults
processingMode: 'json-ld-1.1' (default) or 'json-ld-1.0'
base: string (document base IRI)
expandContext: Object
embed: '@once' (default)
explicit: false (default)
omitDefault: false (default)
omitGraph: false (default)
requireAll: false (default)
ordered: false (default)

5 Error codes and handling
JsonLdError thrown with name 'JsonLdError', code in {invalid frame, invalid embed value, recursion limit exceeded}, message.

6 Node.js framing example
Load input and frame JSON files; call jsonld.frame with options; await result; handle errors.

7 Implementation pattern steps
1 Load/parse JSON-LD input
2 Define frame with context and matching rules
3 Configure options
4 Call frame method
5 Process or log result

8 Best practices
Use ordered:false for performance
Strict matching with requireAll:true only when required
Combine explicit:true and omitDefault:true to avoid null placeholders

9 Troubleshooting steps
Run node example, check error.code and error.message; verify frame syntax and valid embed values; reduce frame depth if recursion error occurs.

## Original Source
W3C Semantic Web Standards & JSON-LD
https://www.w3.org/TR/json-ld11-framing/

## Digest of FRAMING_API

# 5. Application Programming Interface (retrieved 2024-06-24)
Data Size: 16580275 bytes
Links Found: 98192
Error: None

## 5.1 JsonLdProcessor.frame
Signature:
  Promise<Object|Array> frame(input, frame, options)

Parameters:
  • input: Object or Array — expanded JSON-LD document to be framed
  • frame: Object — frame document specifying matching and embedding rules
  • options: JsonLdOptions (optional)

Return:
  • Promise resolving to framed output (Object or Array)

Exceptions:
  • JsonLdError{code: 'invalid frame'}
  • JsonLdError{code: 'invalid embed value'}
  • JsonLdError{code: 'recursion limit exceeded'}

## 5.2 JsonLdOptions
Interface JsonLdOptions {
  processingMode?: 'json-ld-1.0' | 'json-ld-1.1'               // default 'json-ld-1.1'
  base?: string                                              // base IRI for document resolution
  expandContext?: Object                                     // context to apply during expansion
  embed?: '@once' | '@last' | '@always' | '@never'           // default '@once'
  explicit?: boolean                                         // default false
  omitDefault?: boolean                                      // default false
  omitGraph?: boolean                                        // default false
  requireAll?: boolean                                       // default false
  ordered?: boolean                                          // default false
}

## 5.3 Error Handling
JsonLdError instances thrown with properties:
  • name: 'JsonLdError'
  • code: one of predefined error codes
  • message: human-readable description

## 5.4 Full Code Example (Node.js)
```js
const jsonld = require('jsonld');

(async () => {
  const doc = require('./library.json');
  const frame = require('./library-frame.json');
  const options = {
    embed: '@once',
    explicit: true,
    omitDefault: false,
    omitGraph: false,
    requireAll: true,
    ordered: true
  };
  try {
    const framed = await jsonld.frame(doc, frame, options);
    console.log(JSON.stringify(framed, null, 2));
  } catch(err) {
    console.error(err.code, err.message);
  }
})();
```

## 5.5 Implementation Pattern
1. Parse or fetch JSON-LD input document
2. Define a frame document conforming to the JSON-LD Framing keywords
3. Configure JsonLdOptions with required flags
4. Invoke JsonLdProcessor.frame(input, frame, options)
5. Handle resolved output or catch JsonLdError

## 5.6 Performance Best Practices
• Use ordered:false for large input to avoid sorting overhead
• Set requireAll:true only when strict matching is needed
• Combine omitDefault and explicit to minimize output size

## 5.7 Troubleshooting Procedures
Command:
  node run framing-example.js

Expected Output:
  JSON document structured per frame

Common Errors:
  • invalid frame: check frame contains only JSON-LD framing keywords
  • invalid embed value: use one of '@once','@last','@always','@never'
  • recursion limit exceeded: simplify nested frame depth


## Attribution
- Source: W3C Semantic Web Standards & JSON-LD
- URL: https://www.w3.org/TR/json-ld11-framing/
- License: License if known
- Crawl Date: 2025-04-28T21:49:04.460Z
- Data Size: 16580275 bytes
- Links Found: 98192

## Retrieved
2025-04-28
