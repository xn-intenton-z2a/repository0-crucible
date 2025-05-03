library/JSYAML.md
# library/JSYAML.md
# JSYAML

## Crawl Summary
load: parse single YAML document -> object|string|number|null|undefined, throws YAMLException; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false. loadAll: multi-document support, returns Document[] or invokes iterator(doc); options same as load. dump: serialize object -> YAML string; options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='single', forceQuotes=false, replacer=null. Schemas: FAILSAFE, JSON, CORE, DEFAULT. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file. Installation: npm install js-yaml; npm install -g js-yaml.

## Normalised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
   3.1 load
   3.2 loadAll
   3.3 dump
4 Schemas
5 Options
6 Tags & Types
7 Caveats

1 Installation
npm install js-yaml
npm install -g js-yaml

2 CLI Usage
Command: js-yaml [-h] [-v] [-c] [-t] file
Options:
-h, --help: show help and exit
-v, --version: show version and exit
-c, --compact: display errors compactly
-t, --trace: show stack trace on error

3 API Methods
3.1 load(string, options?)
Signature:
  load(string: string, options?: {
    filename?: string;
    onWarning?: (warn: YAMLException) => void;
    schema?: Schema;
    json?: boolean;
  }): any
Returns: object|string|number|null|undefined
Throws: YAMLException

3.2 loadAll(string, iterator?, options?)
Signature:
  loadAll(string: string, iterator?: (doc: any) => void, options?: {
    filename?: string;
    onWarning?: (warn: YAMLException) => void;
    schema?: Schema;
    json?: boolean;
  }): any[] | void

3.3 dump(object, options?)
Signature:
  dump(object: any, options?: {
    indent?: number;
    noArrayIndent?: boolean;
    skipInvalid?: boolean;
    flowLevel?: number;
    styles?: Record<string,string>;
    schema?: Schema;
    sortKeys?: boolean | ((a:string,b:string)=>number);
    lineWidth?: number;
    noRefs?: boolean;
    noCompatMode?: boolean;
    condenseFlow?: boolean;
    quotingType?: 'single' | 'double';
    forceQuotes?: boolean;
    replacer?: (key:any,value:any)=>any;
  }): string

4 Schemas
FAILSAFE_SCHEMA: strings, arrays, plain objects only
JSON_SCHEMA: all JSON-supported types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML 1.2 types

5 Options (defaults)
indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='single', forceQuotes=false

6 Tags & Types
!!null null
!!bool boolean
!!int number
!!float number
!!binary Buffer
!!timestamp Date
!!omap Array<[key,value]>
!!pairs Array<[key,value]>
!!set Object<key,null>
!!str string
!!seq Array<any>
!!map Object

7 Caveats
- Arrays or objects used as keys are converted via toString()
- Implicit block mapping key duplicates not supported

## Supplementary Details
Default schema: DEFAULT_SCHEMA. To load JSON-like YAML and override duplicate key error: set json=true. To ignore invalid types (Function, RegExp) during dump: set skipInvalid=true. To enforce flow or block style: adjust flowLevel. To sort keys: set sortKeys=true or provide comparator. To set unlimited line width: lineWidth=-1. To condense flow style: condenseFlow=true. To choose quoting style: quotingType='single' or 'double'. To apply custom styles: styles={ '!!null':'canonical', '!!int':'hexadecimal' }. Use onWarning hook: onWarning=(warning)=>console.warn(warning.message,warning.mark). Implementation steps: 1. fs.readFileSync(path,'utf8') 2. yaml.load(input,{filename:path,onWarning, schema, json}) inside try-catch. 3. yaml.dump(object,{...options}). 4. fs.writeFileSync(path,out,'utf8').

## Reference Details
Code example:
const yaml = require('js-yaml');
const fs = require('fs');
function warnHandler(warning){
  console.warn('YAML Warning:', warning.message, 'at', warning.mark);
}
// Load a document
try{
  const input = fs.readFileSync('config.yml', 'utf8');
  const doc = yaml.load(input, {
    filename: 'config.yml',
    onWarning: warnHandler,
    schema: yaml.JSON_SCHEMA,
    json: true
  });
  console.log(doc);
} catch(e){
  console.error('YAML Load Error:', e.name, e.message, e.stack);
}

// Dump an object
const obj = { key: 123, arr: [1,2,3], invalid: () => {} };
const output = yaml.dump(obj, {
  indent: 4,
  noArrayIndent: true,
  skipInvalid: true,
  flowLevel: 0,
  styles: { '!!null': 'empty', '!!bool': 'uppercase' },
  sortKeys: (a,b)=>a.localeCompare(b),
  lineWidth: 120,
  noRefs: true,
  noCompatMode: true,
  condenseFlow: true,
  quotingType: 'double',
  forceQuotes: true,
  replacer: (key,value)=> typeof value==='function'?undefined:value
});
fs.writeFileSync('out.yml', output, 'utf8');

// Troubleshooting
// Error: YAMLException: unacceptable kind of an object to dump
// Fix: enable skipInvalid or remove functions/regexps
// CLI errors:
// js-yaml missing.yml  // prints error and stack trace
// js-yaml -c missing.yml  // prints compact error

## Information Dense Extract
load(string,{filename:null,onWarning:null,schema:DEFAULT_SCHEMA,json:false})=>any|throws YAMLException; loadAll(string,iterator?,{filename?,onWarning?,schema?,json?})=>any[]|void; dump(object,{indent:2,noArrayIndent:false,skipInvalid:false,flowLevel:-1,styles:{},schema:DEFAULT_SCHEMA,sortKeys:false,lineWidth:80,noRefs:false,noCompatMode:false,condenseFlow:false,quotingType:'single',forceQuotes:false,replacer:null})=>string; CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file; Schemas: FAILSAFE, JSON, CORE, DEFAULT; Tags: !!null,null;!!bool,boolean;!!int,number;!!float,number;!!binary,Buffer;!!timestamp,Date;!!omap,Array<[k,v]>;!!pairs,Array<[k,v]>;!!set,Object<k,null>;!!str,string;!!seq,Array<any>;!!map,Object; Options defaults as above; json=true to override duplicate-key error; skipInvalid=true to ignore invalid types; sortKeys:bool|func; flowLevel:n; condenseFlow:true; quotingType:'single'|'double'; replacer:(k,v)=>any.

## Sanitised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
   3.1 load
   3.2 loadAll
   3.3 dump
4 Schemas
5 Options
6 Tags & Types
7 Caveats

1 Installation
npm install js-yaml
npm install -g js-yaml

2 CLI Usage
Command: js-yaml [-h] [-v] [-c] [-t] file
Options:
-h, --help: show help and exit
-v, --version: show version and exit
-c, --compact: display errors compactly
-t, --trace: show stack trace on error

3 API Methods
3.1 load(string, options?)
Signature:
  load(string: string, options?: {
    filename?: string;
    onWarning?: (warn: YAMLException) => void;
    schema?: Schema;
    json?: boolean;
  }): any
Returns: object|string|number|null|undefined
Throws: YAMLException

3.2 loadAll(string, iterator?, options?)
Signature:
  loadAll(string: string, iterator?: (doc: any) => void, options?: {
    filename?: string;
    onWarning?: (warn: YAMLException) => void;
    schema?: Schema;
    json?: boolean;
  }): any[] | void

3.3 dump(object, options?)
Signature:
  dump(object: any, options?: {
    indent?: number;
    noArrayIndent?: boolean;
    skipInvalid?: boolean;
    flowLevel?: number;
    styles?: Record<string,string>;
    schema?: Schema;
    sortKeys?: boolean | ((a:string,b:string)=>number);
    lineWidth?: number;
    noRefs?: boolean;
    noCompatMode?: boolean;
    condenseFlow?: boolean;
    quotingType?: 'single' | 'double';
    forceQuotes?: boolean;
    replacer?: (key:any,value:any)=>any;
  }): string

4 Schemas
FAILSAFE_SCHEMA: strings, arrays, plain objects only
JSON_SCHEMA: all JSON-supported types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML 1.2 types

5 Options (defaults)
indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='single', forceQuotes=false

6 Tags & Types
!!null null
!!bool boolean
!!int number
!!float number
!!binary Buffer
!!timestamp Date
!!omap Array<[key,value]>
!!pairs Array<[key,value]>
!!set Object<key,null>
!!str string
!!seq Array<any>
!!map Object

7 Caveats
- Arrays or objects used as keys are converted via toString()
- Implicit block mapping key duplicates not supported

## Original Source
js-yaml
https://github.com/nodeca/js-yaml#readme

## Digest of JSYAML

# JS-YAML 1.2 Parser/Writer for JavaScript

# Installation

npm install js-yaml
npm install -g js-yaml

# CLI Usage

Usage: js-yaml [-h] [-v] [-c] [-t] file

# API Methods

## load(string[, options])
Parses a single YAML document. Returns object|string|number|null|undefined or throws YAMLException.

Options:
- filename (string, default: null)
- onWarning (YAMLException => void, default: null)
- schema (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA; default: DEFAULT_SCHEMA)
- json (boolean, default: false)

## loadAll(string[, iterator][, options])
Parses multi-document YAML. Applies iterator(doc) per document or returns Document[]

## dump(object[, options])
Serializes object to YAML string.

Options:
- indent (number, default: 2)
- noArrayIndent (boolean, default: false)
- skipInvalid (boolean, default: false)
- flowLevel (number, default: -1)
- styles (Object<tag,style>, default: {})
- schema (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA; default: DEFAULT_SCHEMA)
- sortKeys (boolean|Function, default: false)
- lineWidth (number, default: 80)
- noRefs (boolean, default: false)
- noCompatMode (boolean, default: false)
- condenseFlow (boolean, default: false)
- quotingType ("single"|"double", default: "single")
- forceQuotes (boolean, default: false)
- replacer ((key, value) => any, default: null)

# Supported Tags and Types
!!null: JavaScript null
!!bool: JavaScript boolean
!!int: JavaScript number
!!float: JavaScript number
!!binary: Node.js Buffer
!!timestamp: JavaScript Date
!!omap: Array<[key,value]>
!!pairs: Array<[key,value]>
!!set: Object<key,null>
!!str: JavaScript string
!!seq: Array<any>
!!map: JavaScript Object

# Styles
!!null: canonical, lowercase, uppercase, camelcase, empty
!!int: binary, octal, decimal, hexadecimal
!!bool: lowercase, uppercase, camelcase
!!float: lowercase, uppercase, camelcase

# Caveats
- Arrays or objects used as keys are stringified via toString()
- Implicit block mapping key duplicates not supported

Retrieved on 2024-06-05
Source: https://github.com/nodeca/js-yaml#readme
Data Size: 621272 bytes
Links Found: 5005
Error: None

## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-02T21:23:01.545Z
- Data Size: 621272 bytes
- Links Found: 5005

## Retrieved
2025-05-02
