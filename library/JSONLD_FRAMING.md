# JSONLD_FRAMING

## Crawl Summary
Frame input documents by matching a JSON-LD frame structure using keys @context,@id,@type and framing flags (@embed,@explicit,@omitDefault,@omitGraph,@requireAll). The framing algorithm expands both input and frame, generates a flattened subject map, then recursively matches outermost frame object to select node objects, embedding or referencing based on embed flag. JsonLdProcessor.frame method signature returns a promise of the framed document. JsonLdOptions include embed('@once'||'@always'||'@never'), explicit(boolean), omitDefault(boolean), omitGraph(boolean), requireAll(boolean), processingMode('json-ld-1.1'||'json-ld-1.0'), documentLoader(function), base(string), expandContext(object).

## Normalised Extract
Table of Contents:
1. Framing API Method  
2. JsonLdOptions Properties  
3. Frame Document Structure  
4. Framing Flags and Their Effects  
5. Matching Mechanisms  
6. Usage Examples

1. Framing API Method
  Name: frame  
  Input: any JSON-LD data (object or array)  
  Frame: JSON-LD frame document (object)  
  Options: JsonLdOptions  
  Output: Promise resolving to framed JSON-LD document (object)

2. JsonLdOptions Properties
  embed: '@once'||'@always'||'@never' (default '@once')
  explicit: boolean (default false)
  omitDefault: boolean (default false)
  omitGraph: boolean (default false)
  requireAll: boolean (default false)
  processingMode: 'json-ld-1.1'||'json-ld-1.0' (default 'json-ld-1.1')
  documentLoader: function(Iri)->Promise<Response> (default built-in)
  base: string (base IRI for expansion)
  expandContext: object|array (context(s) applied during expansion)

3. Frame Document Structure
  Must contain @context mapping; optional @id and @type selectors; nested property names map values or frame objects; frame objects may include @default specifying fallback value for missing property or type.

4. Framing Flags and Their Effects
  @embed controls object embedding vs reference: @once embeds first occurrence, @always embeds every, @never yields only references.
  @explicit=true suppresses output of properties not explicitly declared in frame.
  @omitDefault=true omits adding default-valued properties.
  @omitGraph=true omits top-level @graph wrapper when data contains single node.
  @requireAll=true requires all frame properties present in input for match.

5. Matching Mechanisms
  Property matching: exact literal or nested frame objects.
  Wildcard ({}): match any value present for property.
  Absence ([]): match absence of property and add null output if explicit false.
  Value matching: frame may specify @value,@language,@type constraints nested.
  ID matching: @id may be string or array of strings to match specific node IRI(s).

6. Usage Examples
  - Basic call: frame(inputDoc,frameDoc,{embed:'@once'})
  - Type-based frame selecting Library->Book->Chapter  
  - Property matching example filtering by title or location  
  - Wildcard and absence matching cases  
  - Language-based value matching using @value and @language  
  - ID-based framing with single or array of IRIs

## Supplementary Details
Parameter values and defaults:
embed: '@once' embeds the first matching node in place then references further matches; '@always' embeds all matches; '@never' never embeds, always uses references.  
explicit: when true, only properties declared in frame appear in output, others are omitted.  
omitDefault: when true, properties with default values from frame are omitted from output if missing in input.  
omitGraph: when true and only one top-level node results, the @graph property is omitted.  
requireAll: when true, frame matches only nodes containing all properties listed in frame; when false matches any listed property.  
processingMode: 'json-ld-1.1' enables JSON-LD 1.1 framing, 'json-ld-1.0' disables 1.1-specific features or errors if context requests 1.1.  
documentLoader signature: function(url: string): Promise<{contextUrl:string|null,documentUrl:string,response:object}>.  
base: base IRI string used to resolve relative IRIs.  
expandContext: JSON-LD context object or array inserted before expansion algorithm.  
Implementation steps:
1. Expand input and frame using JSON-LD expansion algorithm with options.processingMode, options.expandContext.  
2. Generate node map by blank node inlining and subject flattening.  
3. Starting from outermost frame object, recursively apply Frame Matching Algorithm, using Frame Matching and Value Pattern Matching algorithms.  
4. Construct framed output, applying flags: embedding vs referencing, default values, explicit suppression, graph omission.  
5. Compact output using frame's @context and JsonLdContext.  



## Reference Details
API Signature:
WebIDL:
interface JsonLdProcessor {
  Promise<object> frame(object input, object frame, JsonLdOptions               options);
};

JsonLdOptions WebIDL:
dictionary JsonLdOptions {
  boolean embed = '@once';
  boolean explicit = false;
  boolean omitDefault = false;
  boolean omitGraph = false;
  boolean requireAll = false;
  DOMString processingMode = 'json-ld-1.1';
  JsonLdDocumentLoader documentLoader = <built-in loader>;
  DOMString base = null;
  object|sequence<object> expandContext = [];
};

JavaScript SDK Method Signature (jsonld.js v6+):
jsonld.frame(inputDocument: object|Array<object>, frameDocument: object, options?: {
  embed?: '@once'|'@always'|'@never',
  explicit?: boolean,
  omitDefault?: boolean,
  omitGraph?: boolean,
  requireAll?: boolean,
  processingMode?: 'json-ld-1.1'|'json-ld-1.0',
  documentLoader?: (url: string)=>Promise<{contextUrl: string|null,documentUrl: string,response: any}>,
  base?: string,
  expandContext?: object|Array<object>
}): Promise<object>

Code Example:
```javascript
import jsonld from 'jsonld';

const input = require('./input.json');
const frame = require('./frame.json');

const options = {
  embed: '@always',
  explicit: true,
  omitDefault: false,
  omitGraph: true,
  requireAll: true,
  processingMode: 'json-ld-1.1',
  documentLoader: customLoader,
  base: 'http://example.org/',
  expandContext: {'@vocab':'http://example.org/'}
};

async function run() {
  try {
    const result = await jsonld.frame(input, frame, options);
    console.log(JSON.stringify(result, null, 2));
  } catch(err) {
    console.error('Framing error', err);
  }
}

run();
```

Best Practices:
- Pre-flatten large documents before framing to improve performance.
- Use explicit:true to avoid unexpected default nulls.
- Choose embed mode based on output size and reference needs.
- Supply custom documentLoader for offline environments.

Troubleshooting:
Command: node run-framing.js
Expected console log: JSON document with nested structure matching frame.
Error: Invalid @embed value => check frame.@embed must be '@once','@always' or '@never'.
Error: Frame did not match any nodes => verify frame selectors (@type,@id,property values) against input expansion results.
To debug subject map, insert console.log(nodeMap) after flattening algorithm in processor implementation.



## Information Dense Extract
JsonLdProcessor.frame(input,frame,options)->Promise<object>. Options: embed:'@once'|'@always'|'@never'(default '@once'), explicit:false, omitDefault:false, omitGraph:false, requireAll:false, processingMode:'json-ld-1.1', documentLoader:function, base:string, expandContext:object|array. Frame doc: must include @context, may include @id,@type/property constraints/@default. Flags:@embed controls embedding strategy; @explicit suppresses undeclared properties; @omitDefault suppresses defaulted nulls; @omitGraph suppresses top-level @graph; @requireAll enforces all properties for match. Matching: property exact, wildcard '{}', absence '[]', value patterns using @value/@language/@type, ID matching via @id string or array. Process: expand input+frame; generate subject map; apply Frame Matching Algorithm; compact result with context; return framed doc. Code example uses jsonld.frame(input,frame,options).

## Sanitised Extract
Table of Contents:
1. Framing API Method  
2. JsonLdOptions Properties  
3. Frame Document Structure  
4. Framing Flags and Their Effects  
5. Matching Mechanisms  
6. Usage Examples

1. Framing API Method
  Name: frame  
  Input: any JSON-LD data (object or array)  
  Frame: JSON-LD frame document (object)  
  Options: JsonLdOptions  
  Output: Promise resolving to framed JSON-LD document (object)

2. JsonLdOptions Properties
  embed: '@once'||'@always'||'@never' (default '@once')
  explicit: boolean (default false)
  omitDefault: boolean (default false)
  omitGraph: boolean (default false)
  requireAll: boolean (default false)
  processingMode: 'json-ld-1.1'||'json-ld-1.0' (default 'json-ld-1.1')
  documentLoader: function(Iri)->Promise<Response> (default built-in)
  base: string (base IRI for expansion)
  expandContext: object|array (context(s) applied during expansion)

3. Frame Document Structure
  Must contain @context mapping; optional @id and @type selectors; nested property names map values or frame objects; frame objects may include @default specifying fallback value for missing property or type.

4. Framing Flags and Their Effects
  @embed controls object embedding vs reference: @once embeds first occurrence, @always embeds every, @never yields only references.
  @explicit=true suppresses output of properties not explicitly declared in frame.
  @omitDefault=true omits adding default-valued properties.
  @omitGraph=true omits top-level @graph wrapper when data contains single node.
  @requireAll=true requires all frame properties present in input for match.

5. Matching Mechanisms
  Property matching: exact literal or nested frame objects.
  Wildcard ({}): match any value present for property.
  Absence ([]): match absence of property and add null output if explicit false.
  Value matching: frame may specify @value,@language,@type constraints nested.
  ID matching: @id may be string or array of strings to match specific node IRI(s).

6. Usage Examples
  - Basic call: frame(inputDoc,frameDoc,{embed:'@once'})
  - Type-based frame selecting Library->Book->Chapter  
  - Property matching example filtering by title or location  
  - Wildcard and absence matching cases  
  - Language-based value matching using @value and @language  
  - ID-based framing with single or array of IRIs

## Original Source
JSON-LD Framing
https://www.w3.org/TR/json-ld11-framing/

## Digest of JSONLD_FRAMING

# Features

## Framing
Framing binds JSON-LD triple statements into a specific tree layout by matching a JSON-LD input document against a frame document. A frame document is a JSON-LD structure using keys:@context,@id,@type and other property names, plus framing keywords (@embed,@explicit,@default,@omitDefault,@omitGraph,@requireAll) to control matching and output shape.

## Framing Flags
- object embed flag (@embed): @once (default), @always, @never
- explicit inclusion flag (@explicit): false (default), true
- omit default flag (@omitDefault): false (default), true
- omit graph flag (@omitGraph): false (default), true
- require all flag (@requireAll): false (default), true

## Matching Patterns
- Match on properties: specify property name with literal value or nested frame
- Wildcard matching: use empty map ({}) as value to match any value of that property
- Absence matching: use empty array ([]) to match when property is not present
- Value matching: frame nested structures with @value,@language,@type constraints
- Identifier matching: use @id with string or array of IRIs

# Application Programming Interface

## JsonLdProcessor.frame(input, frame, options)
WebIDL signature:
```
Promise<object> frame(object input, object frame, JsonLdOptions options);
```  
JavaScript signature (jsonld.js):
```
frame(inputDocument  object,  frameDocument  object,  options?  JsonLdOptions): Promise<object>
```  
Returns a promise resolving to the framed output document.

## JsonLdOptions (fields and defaults)
- embed: one of '@once'||'@always'||'@never' (default '@once')
- explicit: boolean (default false)
- omitDefault: boolean (default false)
- omitGraph: boolean (default false)
- requireAll: boolean (default false)
- processingMode: string 'json-ld-1.1'||'json-ld-1.0' (default 'json-ld-1.1')
- documentLoader: function (IRI)->Promise<Response> (default bundled loader)
- base: string base IRI for relative resolution
- expandContext: object or array of contexts to apply before expansion

# Data Structures

### JsonLdContext
Map of term definitions and vocabulary mapping. Used for compaction of output.

### Frame Document
Must include @context. May include nested objects mapping property names to literal or frame objects.
Frame objects may include @default keys for default values when matched data lacks that property.

# Code Examples

### Basic framing call
```javascript
const framed = await jsonld.frame(input, frame, {embed:'@once', explicit:false});
```  
### Nested frame structure  
Frame selects nodes of type Library, embeds Books then Chapters:
```json
{  
  "@context":{"@vocab":"http://example.org/"},  
  "@type":"Library",  
  "contains":{  
    "@type":"Book",  
    "contains":{"@type":"Chapter"}  
  }  
}
```

## Attribution
- Source: JSON-LD Framing
- URL: https://www.w3.org/TR/json-ld11-framing/
- License: W3C Document License
- Crawl Date: 2025-05-02T14:48:52.310Z
- Data Size: 11430591 bytes
- Links Found: 67909

## Retrieved
2025-05-02
