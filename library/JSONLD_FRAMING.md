# JSONLD_FRAMING

## Crawl Summary
JsonLdProcessor.frame(input, frame, options) returns Promise<object> or invokes callback. JsonLdOptions framing-specific fields: embed:'@once'|'@always'|'@never' (default '@once'), explicit:boolean=false, omitDefault:boolean=false, omitGraph:boolean=false, requireAll:boolean=false, ordered:boolean=false. Framing keywords @embed, @explicit, @omitDefault, @omitGraph, @requireAll, @ordered override options. Algorithm: expand input/frame, generate node map, frame match, value pattern match, embed recursively, apply @default content, compact output. Error codes: invalidFrameError, invalidFrameKeywordError.

## Normalised Extract
Table of Contents:
1. Framing API Method Signature
2. Frame Options (JsonLdOptions)
3. Framing Keywords
4. Matching Features
   4.1 Property Matching
   4.2 Wildcard Matching
   4.3 Absence Matching
   4.4 Value Pattern Matching
   4.5 @id Matching
   4.6 Empty Frame
5. Default Content (@default)
6. Algorithm Steps
7. Data Structures
8. Reverse Framing
9. Framing Named Graphs

1. Framing API Method Signature
   Interface JsonLdProcessor {
     frame(input: any, frame: object|any[], options?: JsonLdOptions): Promise<object>;
     frame(input, frame, options, callback): void;
   }

2. Frame Options (JsonLdOptions)
   embed: '@once'|'@always'|'@never' (default '@once')
   explicit: boolean (default false)
   omitDefault: boolean (default false)
   omitGraph: boolean (default false)
   requireAll: boolean (default false)
   ordered: boolean (default false)

3. Framing Keywords
   Use @embed, @explicit, @omitDefault, @omitGraph, @requireAll, @ordered within frame objects to set flags locally.

4. Matching Features
4.1 Property Matching:
   Frame property:value matches node objects with same property and value.
4.2 Wildcard Matching:
   property:{} matches any value present for that property.
4.3 Absence Matching:
   property:[] matches node objects lacking that property, adds null if explicit inclusion false.
4.4 Value Pattern Matching:
   property:{'@value':{}, '@language':'lang'} matches value objects with language tag.
4.5 @id Matching:
   '@id':'IRI' or array of IRIs matches nodes by identifier.
4.6 Empty Frame:
   {} matches all node objects at top-level.

5. Default Content (@default)
   property:{'@default':value} in frame supplies default value when missing; defaults for @type supported.

6. Algorithm Steps
   expand input/frame
   generate node map
   apply Frame Matching Algorithm
   value pattern matching
   recursive embedding by embed flag
   default insertion
   compact with frame context

7. Data Structures
   JsonLdContext: map for term resolution
   JsonLdOptions: framing and core API options

8. Reverse Framing
   Use JSON-LD API reverse flag on properties to invert embedding direction.

9. Framing Named Graphs
   Frame with @graph key to target named graphs; omitGraph controls top-level output.


## Supplementary Details
Implementation Steps:
1. Expand document: expanded = await jsonld.expand(input, {expandContext, documentLoader, processingMode});
2. Flatten expanded: flattened = await jsonld.flatten(expanded, {}, {documentLoader, processingMode});
3. Frame flattened: framed = await jsonld.frame(flattened, frame, {embed:'@once', explicit:false, omitDefault:false, omitGraph:false, requireAll:false, ordered:false, documentLoader, processingMode});
4. Compact framed: result = await jsonld.compact(framed, frameContext, {compactArrays, documentLoader, processingMode});

JsonLdOptions defaults:
  embed:'@once', explicit:false, omitDefault:false, omitGraph:false, requireAll:false, ordered:false

DocumentLoader:
  function(url:string):Promise<RemoteDocument>

Error Behavior:
- invalidFrameError: thrown if frame missing required keys or invalid JSON-LD structure
- invalidFrameKeywordError: thrown if framing keyword value not in allowed set

Reverse Framing:
  options.expandContext may include '@reverse':{'prop':'@id'} to invert edges

Named Graph Framing:
  Frame object:
    '@graph':{'@id':'graphIRI', 'prop':{...}}
  omitGraph:true to inline nodes without @graph wrapper


## Reference Details
## API Method Signature

```js
interface JsonLdProcessor {
  frame(
    input: any,
    frame: object|any[],
    options?: JsonLdOptions,
    callback?: (err: JsonLdError|null, framed?: object, meta?: JsonLdMeta) => void
  ): Promise<object> | void;
}
```

Parameters:
- input: object|array|string|RemoteDocument (expanded or flattened JSON-LD)
- frame: object|array|string (JSON-LD framing document)
- options: JsonLdOptions

JsonLdOptions fields:
- documentLoader?: DocumentLoader = user-supplied loader
- base?: string = undefined
- processingMode?: 'json-ld-1.0'|'json-ld-1.1' = 'json-ld-1.1'
- expandContext?: any = undefined
- compactArrays?: boolean = true
- graph?: boolean = false
- embed?: '@once'|'@always'|'@never' = '@once'
- explicit?: boolean = false
- omitDefault?: boolean = false
- omitGraph?: boolean = false
- requireAll?: boolean = false
- ordered?: boolean = false

Return:
- Promise resolving to framed JSON-LD object
- Or void if callback provided

Errors:
- JsonLdError.code = 'invalidFrameError'
- JsonLdError.code = 'invalidFrameKeywordError'

## Code Example

```js
const jsonld = require('jsonld');
const inputDoc = require('./input.json');
const frameDoc = require('./frame.json');
const frameContext = {"@vocab":"http://example.org/"};

async function runFraming() {
  try {
    const expanded = await jsonld.expand(inputDoc, {processingMode:'json-ld-1.1'});
    const flattened = await jsonld.flatten(expanded, {}, {processingMode:'json-ld-1.1'});
    const options = {embed:'@once', explicit:false, omitDefault:false, omitGraph:false, requireAll:false, ordered:false};
    const framed = await jsonld.frame(flattened, frameDoc, options);
    const compacted = await jsonld.compact(framed, frameContext, {compactArrays:true});
    console.log(JSON.stringify(compacted, null, 2));
  } catch (err) {
    console.error(err.code, err.message);
  }
}

runFraming();
```

## Best Practices
- Always expand and flatten before framing to normalize graph structure.
- Supply a custom documentLoader for remote contexts.
- Use explicit:true to output only declared frame properties.
- Use omitDefault:true to avoid null placeholders for missing data.
- Use ordered:true when deterministic embedding order is required.

## Troubleshooting

1. Invalid @embed value:
   Error: JsonLdError.code === 'invalidFrameKeywordError'
   Expected '@once', '@always', or '@never'.
   Fix: ensure frame contains valid @embed value.

2. No output or empty frame result:
   - Check flattened subjects: console.log(await jsonld.flatten(...));
   - Verify frame property paths match expanded data IRIs.
   - Use wildcard {} or array [] patterns to broaden matches.

3. Unexpected default nulls:
   - Omit default placeholders with omitDefault:true.

4. Debug metadata:
   Provide callback to frame to inspect meta argument:
   ```js
   jsonld.frame(flattened, frameDoc, options, (err, framed, meta) => {
     console.dir(meta, {depth:5});
   });
   ```

5. CLI usage:
   ```bash
   jsonld frame input.json frame.json \
     --embed=@once --explicit=false --omitDefault=false \
     --omitGraph=false --requireAll=false --ordered=false \
     -o output.json
   ```

## Information Dense Extract
JsonLdProcessor.frame(input:any,frame:any,options?:JsonLdOptions):Promise<object>. JsonLdOptions embed:'@once'|'@always'|'@never'(default '@once'), explicit:boolean=false, omitDefault:boolean=false, omitGraph:boolean=false, requireAll:boolean=false, ordered:boolean=false. Framing keywords @embed,@explicit,@omitDefault,@omitGraph,@requireAll,@ordered override options locally. Matching: property:value, wildcard {}, absence [], value patterns {@value, @language, @type, @direction}, @id string|array, empty frame {}. Default content via {@default:value} injects missing props. Algorithm: expand->node map->frame match->value pattern->embed->default->compact. Errors: invalidFrameError, invalidFrameKeywordError. Code: await jsonld.expand->flatten->frame->compact. Best practices: flatten input, custom documentLoader, use explicit/omitDefault/ordered flags. Troubleshoot via meta callback and CLI flags.

## Sanitised Extract
Table of Contents:
1. Framing API Method Signature
2. Frame Options (JsonLdOptions)
3. Framing Keywords
4. Matching Features
   4.1 Property Matching
   4.2 Wildcard Matching
   4.3 Absence Matching
   4.4 Value Pattern Matching
   4.5 @id Matching
   4.6 Empty Frame
5. Default Content (@default)
6. Algorithm Steps
7. Data Structures
8. Reverse Framing
9. Framing Named Graphs

1. Framing API Method Signature
   Interface JsonLdProcessor {
     frame(input: any, frame: object|any[], options?: JsonLdOptions): Promise<object>;
     frame(input, frame, options, callback): void;
   }

2. Frame Options (JsonLdOptions)
   embed: '@once'|'@always'|'@never' (default '@once')
   explicit: boolean (default false)
   omitDefault: boolean (default false)
   omitGraph: boolean (default false)
   requireAll: boolean (default false)
   ordered: boolean (default false)

3. Framing Keywords
   Use @embed, @explicit, @omitDefault, @omitGraph, @requireAll, @ordered within frame objects to set flags locally.

4. Matching Features
4.1 Property Matching:
   Frame property:value matches node objects with same property and value.
4.2 Wildcard Matching:
   property:{} matches any value present for that property.
4.3 Absence Matching:
   property:[] matches node objects lacking that property, adds null if explicit inclusion false.
4.4 Value Pattern Matching:
   property:{'@value':{}, '@language':'lang'} matches value objects with language tag.
4.5 @id Matching:
   '@id':'IRI' or array of IRIs matches nodes by identifier.
4.6 Empty Frame:
   {} matches all node objects at top-level.

5. Default Content (@default)
   property:{'@default':value} in frame supplies default value when missing; defaults for @type supported.

6. Algorithm Steps
   expand input/frame
   generate node map
   apply Frame Matching Algorithm
   value pattern matching
   recursive embedding by embed flag
   default insertion
   compact with frame context

7. Data Structures
   JsonLdContext: map for term resolution
   JsonLdOptions: framing and core API options

8. Reverse Framing
   Use JSON-LD API reverse flag on properties to invert embedding direction.

9. Framing Named Graphs
   Frame with @graph key to target named graphs; omitGraph controls top-level output.

## Original Source
JSON-LD Framing
https://www.w3.org/TR/json-ld11-framing/

## Digest of JSONLD_FRAMING

# Framing Extension to JSON-LD API

## 5.1 JsonLdProcessor.frame

Interface JsonLdProcessor {
  /**
   * Frames a JSON-LD document by example, producing a tree layout matching a frame document.
   * @param input  object|array|string|RemoteDocument JSON-LD expanded or flattened input
   * @param frame  object|array|string         JSON-LD frame document
   * @param options JsonLdOptions               framing options
   * @param callback err, framed, meta        Node-style callback
   * @returns Promise<object> framed document if callback omitted
   */
  frame(
    input: any,
    frame: object|any[],
    options?: JsonLdOptions,
    callback?: (err: JsonLdError|null, framed?: object, meta?: JsonLdMeta) => void
  ): Promise<object> | void;
}

## 5.3.2 JsonLdOptions (framing)

Dictionary JsonLdOptions {
  documentLoader?: DocumentLoader;           // loader for remote contexts
  base?: string;                             // base IRI for expansion
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  expandContext?: any;                       // context to apply during expand
  compactArrays?: boolean;                   // omit arrays of single items
  graph?: boolean;                           // treat input as graph

  // framing-specific options:
  embed?: '@once'|'@always'|'@never';       // default '@once'
  explicit?: boolean;                       // require explicit properties, default false
  omitDefault?: boolean;                    // omit default values, default false
  omitGraph?: boolean;                      // omit top-level @graph if single node, default false
  requireAll?: boolean;                     // require all frame props to match, default false
  ordered?: boolean;                        // embed first-found node, default false
}

## 5.2 Error Handling

Throws JsonLdError with codes:
- invalidFrameError         if frame document is not valid JSON-LD
- invalidFrameKeywordError  if frame keywords have invalid values

## Framing Keywords (in-frame overrides options)

Keyword    | Value                              | Effect
-----------|------------------------------------|-------------------------------
@embed     | @once | @always | @never       | sets embed flag
@explicit  | true | false                    | sets explicit flag
@omitDefault | true | false                  | sets omitDefault flag
@omitGraph | true | false                    | sets omitGraph flag
@requireAll | true | false                   | sets requireAll flag
@ordered   | true | false                    | sets ordered flag

## Configuration Defaults

embed: "@once"
explicit: false
omitDefault: false
omitGraph: false
requireAll: false
ordered: false

## Framing Algorithm Overview

1. Expand input and frame to internal representation.
2. Generate node map via Node Map Generation algorithm.
3. Apply Frame Matching Algorithm per frame node object.
4. Use Value Pattern Matching Algorithm for @value, @language, @type, @direction.
5. Recursively embed matching node objects based on embed flag.
6. Insert default content for missing properties using @default in frame.
7. Compact result using frame context to produce JSON-LD.


## Attribution
- Source: JSON-LD Framing
- URL: https://www.w3.org/TR/json-ld11-framing/
- License: W3C Document License
- Crawl Date: 2025-05-02T15:48:35.290Z
- Data Size: 9690892 bytes
- Links Found: 58880

## Retrieved
2025-05-02
