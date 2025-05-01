# JS_YAML

## Crawl Summary
load(string,options) parses single-doc YAML into JS types or throws YAMLException; options filename, onWarning, schema (DEFAULT_SCHEMA), json (false). loadAll(string,iterator,options) handles multi-doc. dump(object,options) serializes with defaults indent=2,flowLevel=-1,skipInvalid=false,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType=' ,forceQuotes=false; supports STYLE map. CLI flags -h,--help,-v,--version,-c,--compact,-t,--trace. Schemas: FAILSAFE,JSON,CORE,DEFAULT.

## Normalised Extract
Table of Contents:
1. Method Signatures
2. Option Definitions
3. Schemas
4. Style Map
5. Supported Types
6. CLI Flags
7. Caveats

1. Method Signatures:
   - load(source: string, options?: LoadOptions) => any | throws YAMLException
   - loadAll(source: string, iterator?: (doc: any) => void, options?: LoadOptions) => any[] | void
   - dump(obj: any, options?: DumpOptions) => string

2. Option Definitions:
   LoadOptions:
     filename: string|null = null
     onWarning: (e: YAMLException)=>void|null = null
     schema: Schema = DEFAULT_SCHEMA
     json: boolean = false

   DumpOptions:
     indent: number = 2
     noArrayIndent: boolean = false
     skipInvalid: boolean = false
     flowLevel: number = -1
     styles: {[tag: string]: string} = {}
     schema: Schema = DEFAULT_SCHEMA
     sortKeys: boolean|((a: string,b: string)=>number) = false
     lineWidth: number = 80
     noRefs: boolean = false
     noCompatMode: boolean = false
     condenseFlow: boolean = false
     quotingType: "'"|"\"" = "'"
     forceQuotes: boolean = false
     replacer: ((key: string,value: any)=>any)|null = null

3. Schemas:
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

4. Style Map:
   {"!!null":"canonical","!!int":"decimal","!!bool":"lowercase","!!float":"lowercase"}

5. Supported Types:
   null, boolean, integer, float, buffer, date, omap, pairs, set, string, sequence, mapping

6. CLI Flags:
   -h,--help
   -v,--version
   -c,--compact
   -t,--trace

7. Caveats:
   Objects/arrays as keys are stringified; implicit block mapping nested keys unsupported.

## Supplementary Details
Installation:
  npm install js-yaml
  npm install -g js-yaml

Implementation Steps:
  1. require('js-yaml'), fs
  2. fs.readFileSync(path,'utf8')
  3. yaml.load(source,options) inside try/catch
  4. yaml.dump(object,options) and fs.writeFileSync if needed

Schema URLs:
  https://www.yaml.org/spec/1.2/spec.html#id2802346   (FAILSAFE_SCHEMA)
  https://www.yaml.org/spec/1.2/spec.html#id2803231   (JSON_SCHEMA)
  https://www.yaml.org/spec/1.2/spec.html#id2804923   (CORE_SCHEMA)

Configuration Effects:
  json=true: allow duplicate keys override instead of error
  skipInvalid=true: omit unsupported types on dump
  sortKeys=function: deterministic key order
  noCompatMode=true: emit YAML 1.2 features (unquoted yes/no)

Advanced Tags:
  js-yaml-js-types plugin for !!binary, !!timestamp, !!omap, !!pairs, !!set


## Reference Details
// Load API Specification
function load(source: string, options?: {
  filename?: string|null;
  onWarning?: (e: YAMLException)=>void;
  schema?: Schema;
  json?: boolean;
}): any;
Throws: YAMLException
Returns: Object|Array|String|Number|Boolean|null|undefined

// loadAll API Specification
function loadAll(source: string, iterator?: (doc: any)=>void, options?: LoadOptions): any[] | void;
Throws: YAMLException for invalid YAML
Returns: Array of documents if iterator omitted

// dump API Specification
function dump(obj: any, options?: {
  indent?: number;
  noArrayIndent?: boolean;
  skipInvalid?: boolean;
  flowLevel?: number;
  styles?: {[tag: string]: string};
  schema?: Schema;
  sortKeys?: boolean|((a:string,b:string)=>number);
  lineWidth?: number;
  noRefs?: boolean;
  noCompatMode?: boolean;
  condenseFlow?: boolean;
  quotingType?: "'"|"\"";
  forceQuotes?: boolean;
  replacer?: (key:string,value:any)=>any;
}): string;
Throws: YAMLException

// Code Example
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const src = fs.readFileSync('example.yml','utf8');
  const doc = yaml.load(src, {filename:'example.yml',schema:yaml.JSON_SCHEMA});
  console.log(doc);
} catch(e) {
  console.error(e.name, e.reason, 'at', e.mark);
}

// Best Practices:
// - Specify filename for accurate error location
// - Use json:true to match JSON.parse behavior
// - sortKeys for deterministic output in CI
// - noRefs to simplify output when refs not needed

// Troubleshooting:
// Command: js-yaml -c -t config.yml
// Expect on error: YAMLException: message at line:column
// To show stack: add -t flag


## Information Dense Extract
load(source,options)->any|throws YAMLException; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false; loadAll(source,iterator,options)->any[]|void; dump(obj,options)->string; options indent=2,flowLevel=-1,skipInvalid=false,styles={},schema=DEFAULT_SCHEMA,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType=' ,forceQuotes=false,replacer=null; schemas: FAILSAFE,JSON,CORE,DEFAULT; CLI flags: -h,-v,-c,-t; supported types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map; caveats: objects as keys stringify, implicit block mapping nested keys unsupported.

## Sanitised Extract
Table of Contents:
1. Method Signatures
2. Option Definitions
3. Schemas
4. Style Map
5. Supported Types
6. CLI Flags
7. Caveats

1. Method Signatures:
   - load(source: string, options?: LoadOptions) => any | throws YAMLException
   - loadAll(source: string, iterator?: (doc: any) => void, options?: LoadOptions) => any[] | void
   - dump(obj: any, options?: DumpOptions) => string

2. Option Definitions:
   LoadOptions:
     filename: string|null = null
     onWarning: (e: YAMLException)=>void|null = null
     schema: Schema = DEFAULT_SCHEMA
     json: boolean = false

   DumpOptions:
     indent: number = 2
     noArrayIndent: boolean = false
     skipInvalid: boolean = false
     flowLevel: number = -1
     styles: {[tag: string]: string} = {}
     schema: Schema = DEFAULT_SCHEMA
     sortKeys: boolean|((a: string,b: string)=>number) = false
     lineWidth: number = 80
     noRefs: boolean = false
     noCompatMode: boolean = false
     condenseFlow: boolean = false
     quotingType: '''|'''' = '''
     forceQuotes: boolean = false
     replacer: ((key: string,value: any)=>any)|null = null

3. Schemas:
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

4. Style Map:
   {'!!null':'canonical','!!int':'decimal','!!bool':'lowercase','!!float':'lowercase'}

5. Supported Types:
   null, boolean, integer, float, buffer, date, omap, pairs, set, string, sequence, mapping

6. CLI Flags:
   -h,--help
   -v,--version
   -c,--compact
   -t,--trace

7. Caveats:
   Objects/arrays as keys are stringified; implicit block mapping nested keys unsupported.

## Original Source
js-yaml - YAML parser and dumper
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Usage and API

## Installation

npm install js-yaml
npm install -g js-yaml

## CLI Executable

usage: js-yaml [-h] [-v] [-c] [-t] file

 Positional arguments:
  file           File with YAML document(s)

 Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -t, --trace    Show stack trace on error

## API Methods

### load(string, options)
Parses a single YAML document. Returns one of: Object, Array, String, Number, Boolean, null or undefined. Throws YAMLException on error.

Options:
  filename    (string|null) default: null
  onWarning   (function|null) default: null  Called with YAMLException on each warning
  schema      (Schema) default: DEFAULT_SCHEMA
  json        (boolean) default: false  If true, duplicate mapping keys override instead of error

Available schemas:
  FAILSAFE_SCHEMA  only strings, arrays, plain objects
  JSON_SCHEMA      JSON types: string, number, array, object, boolean, null
  CORE_SCHEMA      alias for JSON_SCHEMA
  DEFAULT_SCHEMA   all YAML types

### loadAll(string, iterator, options)
Parses multi-document YAML source. Returns Array if iterator omitted, else applies iterator(doc) for each document.

Parameters:
  string    YAML source containing one or more documents
  iterator  (function) optional
  options   same as load

### dump(object, options)
Serializes object into YAML document. Throws on unsupported types unless skipInvalid true.

Options:
  indent         (number) default: 2  Spaces per indent level
  noArrayIndent  (boolean) default: false  Do not indent array elements
  skipInvalid    (boolean) default: false  Skip non-supported types instead of throwing
  flowLevel      (number) default: -1  Nesting level to switch to flow style, -1 = always block
  styles         (object) default: {}  Map of tag strings to style strings
  schema         (Schema) default: DEFAULT_SCHEMA
  sortKeys       (boolean|function) default: false  If true or function, sort keys accordingly
  lineWidth      (number) default: 80  Max line width, -1 = unlimited
  noRefs         (boolean) default: false  Do not convert duplicates into anchors and refs
  noCompatMode   (boolean) default: false  Do not maintain YAML 1.1 compatibility
  condenseFlow   (boolean) default: false  Remove spaces in flow sequences and mappings
  quotingType    (string) default: '  Quote style for strings: ' or "
  forceQuotes    (boolean) default: false  Quote all non-key strings
  replacer       (function|null) default: null  Preprocess key,value pairs like JSON.stringify replacer

## Style Values Table

Tag    | Available styles     | Example default
!!null | canonical, lowercase, uppercase, camelcase, empty | '~'
!!int  | binary, octal, decimal, hexadecimal | '42'
!!bool | lowercase, uppercase, camelcase | 'true'
!!float| lowercase, uppercase, camelcase | '.inf'

## Supported YAML Types
!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

## Caveats
JavaScript does not support objects or arrays as keys; they are stringified via toString().
Implicit block mapping keys cannot use property access; duplicate anchors in mappings cause load errors.

Retrieved 2024-06-10 from https://github.com/nodeca/js-yaml#readme
Data Size: 611651 bytes

## Attribution
- Source: js-yaml - YAML parser and dumper
- URL: https://github.com/nodeca/js-yaml#readme
- License: License: MIT
- Crawl Date: 2025-05-01T20:47:24.718Z
- Data Size: 611651 bytes
- Links Found: 4965

## Retrieved
2025-05-01
