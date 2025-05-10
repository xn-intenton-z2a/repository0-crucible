# JS_YAML

## Crawl Summary
load(source: string, options?): any; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false. loadAll(source: string, iterator?, options?): any[]. dump(obj: any, options?): string; options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType=' or "', forceQuotes=false, replacer?; Supported schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA; Styles per tag; Supported YAML types; CLI usage

## Normalised Extract
Table of Contents:
1. load(source, options)
2. loadAll(source, iterator, options)
3. dump(obj, options)
4. LoadOptions parameters and defaults
5. DumpOptions parameters and defaults
6. Schemas and their definitions
7. Styles mapping table
8. Supported YAML tags and JS types
9. CLI usage and flags

1. load(source: string, options?: LoadOptions): any
   source: YAML string
   options.filename: string|null = null
   options.onWarning: (e)=>void = null
   options.schema: Schema = DEFAULT_SCHEMA
   options.json: boolean = false
   Returns first document or throws YAMLException

2. loadAll(source: string, iterator?: (doc)=>void, options?: LoadOptions): any[]
   Returns array of documents if no iterator, else applies iterator to each

3. dump(obj: any, options?: DumpOptions): string
   options.indent: number = 2
   options.noArrayIndent: boolean = false
   options.skipInvalid: boolean = false
   options.flowLevel: number = -1
   options.styles: { [tag]: string } = {}
   options.schema: Schema = DEFAULT_SCHEMA
   options.sortKeys: boolean|func = false
   options.lineWidth: number = 80
   options.noRefs: boolean = false
   options.noCompatMode: boolean = false
   options.condenseFlow: boolean = false
   options.quotingType: '\''|" = '\''
   options.forceQuotes: boolean = false
   options.replacer: func

4. Schemas:
   FAILSAFE_SCHEMA: strings, arrays, plain objects
   JSON_SCHEMA: JSON types
   CORE_SCHEMA: same as JSON_SCHEMA
   DEFAULT_SCHEMA: all YAML 1.2 tags

5. Styles table per tag as defined above

6. Supported tags with JS mappings

7. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

## Supplementary Details
- LoadOptions type definition:
  interface LoadOptions { filename?: string; onWarning?: (e: YAMLException)=>void; schema?: Schema; json?: boolean; }
- DumpOptions type definition:
  interface DumpOptions { indent?: number; noArrayIndent?: boolean; skipInvalid?: boolean; flowLevel?: number; styles?: {[tag:string]:string}; schema?: Schema; sortKeys?: boolean|((a,b)=>number); lineWidth?: number; noRefs?: boolean; noCompatMode?: boolean; condenseFlow?: boolean; quotingType?: '"'|'\''; forceQuotes?: boolean; replacer?: (key:any,value:any)=>any; }
- Schema constants:
  const FAILSAFE_SCHEMA: Schema;
  const JSON_SCHEMA: Schema;
  const CORE_SCHEMA: Schema;
  const DEFAULT_SCHEMA: Schema;
- Exception type:
  class YAMLException extends Error { mark: Mark; message: string; }
- CLI error codes:
  0: success; 1: parse error; 2: file read error; 3: unknown option
- Loading steps:
  1. read file as utf8
  2. call yaml.load or yaml.loadAll
  3. handle exceptions via try/catch or onWarning callback
- Dumping steps:
  1. prepare JS object
  2. call yaml.dump with options
  3. write output to file or stdout


## Reference Details
## TypeScript Signatures
```ts
import { load, loadAll, dump, FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA, Schema, YAMLException } from 'js-yaml';

declare function load(source: string, options?: LoadOptions): any;
declare function loadAll(source: string, iterator?: (doc: any)=>void, options?: LoadOptions): any[];
declare function dump(obj: any, options?: DumpOptions): string;

interface LoadOptions {
  filename?: string;
  onWarning?: (e: YAMLException)=>void;
  schema?: Schema;
  json?: boolean;
}

interface DumpOptions {
  indent?: number;
  noArrayIndent?: boolean;
  skipInvalid?: boolean;
  flowLevel?: number;
  styles?: { [tag:string]:string };
  schema?: Schema;
  sortKeys?: boolean|((a:any,b:any)=>number);
  lineWidth?: number;
  noRefs?: boolean;
  noCompatMode?: boolean;
  condenseFlow?: boolean;
  quotingType?: '"'|'\'';
  forceQuotes?: boolean;
  replacer?: (key:any,value:any)=>any;
}
```

## Full Code Examples
### Single Document Load
```js
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const content = fs.readFileSync('config.yml','utf8');
  const data = yaml.load(content, {
    filename: 'config.yml',
    schema: yaml.JSON_SCHEMA,
    onWarning: (e) => console.warn('YAML warning:', e.message),
    json: true
  });
  console.log(data);
} catch (err) {
  console.error('YAML load error:', err.message);
  process.exit(1);
}
```

### Multi-Document Load
```js
yaml.loadAll(fs.readFileSync('multi.yml','utf8'), (doc) => {
  processDocument(doc);
}, { schema: yaml.CORE_SCHEMA });
```

### Dump with Custom Options
```js
const output = yaml.dump(
  { foo: 'bar', list: [1,2,3] },
  {
    indent: 4,
    sortKeys: (a,b) => a.localeCompare(b),
    styles: { '!!null':'empty' },
    lineWidth: 120,
    noRefs: true,
    forceQuotes: true
  }
);
fs.writeFileSync('out.yml', output, 'utf8');
```

## Best Practices
- Use `schema: JSON_SCHEMA` for strict JSON compatibility
- Set `skipInvalid: true` when dumping data containing functions or regexps to avoid exceptions
- Always specify `filename` in LoadOptions for meaningful error context
- Use `sortKeys` for deterministic dumps in CI pipelines

## Troubleshooting
1. Unexpected multi-doc error in `load`: use `loadAll` or disable multi-doc via `flowLevel`.
2. Invalid type during dump: set `skipInvalid: true` or remove unsupported values.
3. Long lines exceed width: adjust `lineWidth` or set `lineWidth: -1` for no limit.
4. Duplicate key error: use `json: true` to override duplicates or handle in `onWarning`.

Commands:
```bash
# Validate a YAML file
node -e "require('js-yaml').load(fs.readFileSync('file.yml','utf8'))"

# Dump an object via CLI
echo "{foo:'bar'}" | js-yaml
```

## Information Dense Extract
load(source:string,options?:{filename?:string,onWarning?:(e:YAMLException)=>void,schema?:Schema,json?:boolean}):any; loadAll(source:string,iterator?:(doc:any)=>void,options?:LoadOptions):any[]; dump(obj:any,options?:{indent?:number,noArrayIndent?:boolean,skipInvalid?:boolean,flowLevel?:number,styles?:Record<string,string>,schema?:Schema,sortKeys?:boolean|((a,b)=>number),lineWidth?:number,noRefs?:boolean,noCompatMode?:boolean,condenseFlow?:boolean,quotingType?:'"'|'\'',forceQuotes?:boolean,replacer?:(k,v)=>any}):string; DEFAULT_SCHEMA,JSON_SCHEMA,CORE_SCHEMA,FAILSAFE_SCHEMA; YAMLException extends Error; Supported tags: !!null,null; !!bool,boolean; !!int,number; !!float,number; !!binary,Buffer; !!timestamp,Date; !!omap|!!pairs,array of pairs; !!set,object; !!str,string; !!seq,array; !!map,object; CLI: js-yaml [-h|-v|-c|-t] file; common options defaults as above; best practices: set schema, skipInvalid, sortKeys; troubleshooting: use loadAll, skipInvalid, json override duplicates; commands: node -e "...", echo|js-yaml

## Sanitised Extract
Table of Contents:
1. load(source, options)
2. loadAll(source, iterator, options)
3. dump(obj, options)
4. LoadOptions parameters and defaults
5. DumpOptions parameters and defaults
6. Schemas and their definitions
7. Styles mapping table
8. Supported YAML tags and JS types
9. CLI usage and flags

1. load(source: string, options?: LoadOptions): any
   source: YAML string
   options.filename: string|null = null
   options.onWarning: (e)=>void = null
   options.schema: Schema = DEFAULT_SCHEMA
   options.json: boolean = false
   Returns first document or throws YAMLException

2. loadAll(source: string, iterator?: (doc)=>void, options?: LoadOptions): any[]
   Returns array of documents if no iterator, else applies iterator to each

3. dump(obj: any, options?: DumpOptions): string
   options.indent: number = 2
   options.noArrayIndent: boolean = false
   options.skipInvalid: boolean = false
   options.flowLevel: number = -1
   options.styles: { [tag]: string } = {}
   options.schema: Schema = DEFAULT_SCHEMA
   options.sortKeys: boolean|func = false
   options.lineWidth: number = 80
   options.noRefs: boolean = false
   options.noCompatMode: boolean = false
   options.condenseFlow: boolean = false
   options.quotingType: ''''|' = ''''
   options.forceQuotes: boolean = false
   options.replacer: func

4. Schemas:
   FAILSAFE_SCHEMA: strings, arrays, plain objects
   JSON_SCHEMA: JSON types
   CORE_SCHEMA: same as JSON_SCHEMA
   DEFAULT_SCHEMA: all YAML 1.2 tags

5. Styles table per tag as defined above

6. Supported tags with JS mappings

7. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

## Original Source
js-yaml Configuration Library
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Configuration and API Reference

Retrieved: 2024-06-15
Source: https://github.com/nodeca/js-yaml#readme
Data Size: 845065 bytes

# Installation
```bash
npm install js-yaml
npm install -g js-yaml    # for CLI
```

# CLI Usage
```bash
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file
```
Options:
- `-h, --help`: show help and exit
- `-v, --version`: show version and exit
- `-c, --compact`: compact error display
- `-t, --trace`: show stack trace on error

# Module Import
```js
const yaml = require('js-yaml');
const fs   = require('fs');
```

# API Methods

## load(string [ , options ])
Parses a single YAML document.
Signature:
```ts
yaml.load(source: string, options?: LoadOptions): any
```
Returns: object|string|number|null|undefined
Throws: YAMLException on error or multi-document input

LoadOptions:
- filename: string|null = null
- onWarning: (e: YAMLException) => void|null = null
- schema: Schema = DEFAULT_SCHEMA
- json: boolean = false

Schemas:
- FAILSAFE_SCHEMA
- JSON_SCHEMA
- CORE_SCHEMA
- DEFAULT_SCHEMA

## loadAll(string [, iterator] [, options])
Parses multi-document YAML.
Signature:
```ts
yaml.loadAll(source: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]
```
Returns: any[] if no iterator; applies iterator(doc) for each document
Throws: YAMLException on parse errors

## dump(object [ , options ])
Serializes JavaScript value to YAML.
Signature:
```ts
yaml.dump(obj: any, options?: DumpOptions): string
```
Returns: YAML string

DumpOptions:
- indent: number = 2
- noArrayIndent: boolean = false
- skipInvalid: boolean = false
- flowLevel: number = -1
- styles: { [tag: string]: string } = {}
- schema: Schema = DEFAULT_SCHEMA
- sortKeys: boolean|((a,b)=>number) = false
- lineWidth: number = 80
- noRefs: boolean = false
- noCompatMode: boolean = false
- condenseFlow: boolean = false
- quotingType: '\''|" = '\''
- forceQuotes: boolean = false
- replacer: (key: any, value: any) => any

# Styles Table (tag => style)
!!null: canonical|lowercase|uppercase|camelcase|empty
!!int: binary|octal|decimal|hexadecimal
!!bool: lowercase|uppercase|camelcase
!!float: lowercase|uppercase|camelcase

# Supported YAML Types
Tags to JS types:
- !!null -> null
- !!bool -> boolean
- !!int -> number
- !!float -> number
- !!binary -> Buffer
- !!timestamp -> Date
- !!omap -> [ [key,value], ... ]
- !!pairs -> [ [key,value], ... ]
- !!set -> { [key]: null }
- !!str -> string
- !!seq -> any[]
- !!map -> { [key]: any }

# Caveats
- JS objects/arrays used as keys are stringified via toString()
- Implicit block mapping key lookups not supported

# Example Code
```js
try {
  const doc = yaml.load(fs.readFileSync('example.yml','utf8'), { schema: yaml.JSON_SCHEMA });
  console.log(doc);
} catch(e) {
  console.error(e);
}

const yml = yaml.dump({ foo: 'bar', baz: [1,2,3] }, { sortKeys: true, styles: { '!!null':'canonical' } });
console.log(yml);
```

## Attribution
- Source: js-yaml Configuration Library
- URL: https://github.com/nodeca/js-yaml#readme
- License: License: MIT
- Crawl Date: 2025-05-10T03:39:37.124Z
- Data Size: 845065 bytes
- Links Found: 5457

## Retrieved
2025-05-10
