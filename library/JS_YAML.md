# JS_YAML

## Crawl Summary
load(string, options): return JS types or throw YAMLException; options: filename, onWarning, schema, json. loadAll: multi-document support, optional iterator. dump(object, options): serialize to YAML; options: indent, noArrayIndent, skipInvalid, flowLevel, styles, schema, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer. Schemas: FAILSAFE, JSON, CORE, DEFAULT. Styles per tag. Supported types list. CLI flags: -h, -v, -c, -t.

## Normalised Extract
Table of Contents:
1 Installation
2 CLI Tool
3 API Methods
  3.1 load
  3.2 loadAll
  3.3 dump
4 Schemas
5 Styles Map
6 Supported Types
7 Caveats

1 Installation
npm install js-yaml
npm install -g js-yaml for CLI

2 CLI Tool
Command: js-yaml file
Flags:
  -h or --help
  -v or --version
  -c or --compact
  -t or --trace

3 API Methods
3.1 load(string, options)
Signature: load(string, options)
Returns: JS primitive or object
Throws: YAMLException
Options:
  filename: string or null
  onWarning: function(YAMLException)
  schema: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA
  json: boolean

3.2 loadAll(string, [iterator], [options])
Signature: loadAll(string[, iterator(yDoc) ][, options])
Returns: array of docs if no iterator
Options same as load

3.3 dump(object, options)
Signature: dump(object, options)
Returns: string
Options:
  indent: number
  noArrayIndent: boolean
  skipInvalid: boolean
  flowLevel: number
  styles: map<tag,style>
  schema: Schema
  sortKeys: boolean|function
  lineWidth: number
  noRefs: boolean
  noCompatMode: boolean
  condenseFlow: boolean
  quotingType: ' or "
  forceQuotes: boolean
  replacer: function(key,value)

4 Schemas
FAILSAFE_SCHEMA: only strings, arrays, plain objects
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML types

5 Styles Map
Tag -> available styles -> default
!!null: canonical,lowercase,uppercase,camelcase -> lowercase
!!int: binary,octal,decimal,hexadecimal -> decimal
!!bool: lowercase,uppercase,camelcase -> lowercase
!!float: lowercase,uppercase,camelcase -> lowercase

6 Supported Types
!!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map

7 Caveats
Arrays or objects as keys stringify via toString(); implicit block mapping duplicate anchors unsupported.

## Supplementary Details
Default option values:
load.filename: null
load.onWarning: null
load.schema: DEFAULT_SCHEMA
load.json: false

dump.indent:2
dump.noArrayIndent:false
dump.skipInvalid:false
dump.flowLevel:-1
dump.styles:{}
dump.schema: DEFAULT_SCHEMA
dump.sortKeys:false
dump.lineWidth:80
dump.noRefs:false
dump.noCompatMode:false
dump.condenseFlow:false
dump.quotingType:'
dump.forceQuotes:false
dump.replacer:null

Implementation steps:
1 import yaml: const yaml = require('js-yaml')
2 read file: const data = fs.readFileSync(path, 'utf8')
3 parse: const doc = yaml.load(data, {filename:path,onWarning:warn, schema:JSON_SCHEMA})
4 serialize: const out = yaml.dump(obj, {indent:4,sortKeys:true})
5 write: fs.writeFileSync(pathOut, out)

Core functionality:
- multi-doc parse via loadAll
- skip invalid types by skipInvalid
- use json:true to override duplicate keys
- control alias references via noRefs
- adjust flow vs block via flowLevel and condenseFlow

## Reference Details
// Load API
yaml.load(string, options) -> Object|string|number|null|undefined throws YAMLException
options:
  filename: string|null
  onWarning: (YAMLException)->void
  schema: FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA
  json: boolean

// loadAll API
yaml.loadAll(string, iterator(doc), options) -> void
yaml.loadAll(string, undefined, options) -> Array<doc>

// dump API
yaml.dump(object, options) -> string
options:
  indent: number
  noArrayIndent: boolean
  skipInvalid: boolean
  flowLevel: number
  styles: Record<string,string>
  schema: Schema
  sortKeys: boolean|((a,b)=>number)
  lineWidth: number
  noRefs: boolean
  noCompatMode: boolean
  condenseFlow: boolean
  quotingType: "'"|"\""
  forceQuotes: boolean
  replacer: (key,value)=>any

// Schema constants
yaml.FAILSAFE_SCHEMA
yaml.JSON_SCHEMA
yaml.CORE_SCHEMA
yaml.DEFAULT_SCHEMA

// Styles Example
yaml.dump(obj, {styles:{'!!null':'canonical'}, sortKeys:true})

// CLI Patterns
js-yaml file.yaml > out.json
js-yaml -t broken.yaml  # show trace
js-yaml -c bad.yaml  # compact errors

// Best Practices
Use loadAll for multi-doc streams
Use skipInvalid to skip unsupported types
Use sortKeys:fn to customize key order
Use noRefs:true to inline duplicates

// Troubleshooting
Command: js-yaml config.yaml
Error: YAMLException: JS-YAML: unacceptable document
Solution: add onWarning callback, enable json:true for duplicate keys

Node.js code:
const yaml=require('js-yaml'), fs=require('fs')
try {
  const obj=yaml.load(fs.readFileSync('input.yaml','utf8'),{filename:'input.yaml',onWarning:warn, schema:JSON_SCHEMA})
} catch(e){console.error(e.message)}

## Information Dense Extract
load(s,opts):opts=filename|null,onWarning|null, schema=DEFAULT_SCHEMA,json=false. Return JS types or throw. loadAll(s,iter?,opts)=>Array or void. dump(obj,opts):indent=2,noArrayIndent=false,skipInvalid=false,flowLevel=-1,styles={},schema=DEFAULT_SCHEMA,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType=' ,forceQuotes=false,replacer=null. Schemas: FAILSAFE,JSON,CORE,DEFAULT. Styles per tag: !!null->[canonical,lowercase,uppercase,camelcase],!!int->[binary,octal,decimal,hexadecimal],!!bool->[lowercase,uppercase,camelcase],!!float->[lowercase,uppercase,camelcase]. Types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map. CLI: js-yaml [-h|-v|-c|-t] file. Patterns: use skipInvalid,sortKeys,flowLevel,noRefs. Exceptions: YAMLException.

## Sanitised Extract
Table of Contents:
1 Installation
2 CLI Tool
3 API Methods
  3.1 load
  3.2 loadAll
  3.3 dump
4 Schemas
5 Styles Map
6 Supported Types
7 Caveats

1 Installation
npm install js-yaml
npm install -g js-yaml for CLI

2 CLI Tool
Command: js-yaml file
Flags:
  -h or --help
  -v or --version
  -c or --compact
  -t or --trace

3 API Methods
3.1 load(string, options)
Signature: load(string, options)
Returns: JS primitive or object
Throws: YAMLException
Options:
  filename: string or null
  onWarning: function(YAMLException)
  schema: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA
  json: boolean

3.2 loadAll(string, [iterator], [options])
Signature: loadAll(string[, iterator(yDoc) ][, options])
Returns: array of docs if no iterator
Options same as load

3.3 dump(object, options)
Signature: dump(object, options)
Returns: string
Options:
  indent: number
  noArrayIndent: boolean
  skipInvalid: boolean
  flowLevel: number
  styles: map<tag,style>
  schema: Schema
  sortKeys: boolean|function
  lineWidth: number
  noRefs: boolean
  noCompatMode: boolean
  condenseFlow: boolean
  quotingType: ' or '
  forceQuotes: boolean
  replacer: function(key,value)

4 Schemas
FAILSAFE_SCHEMA: only strings, arrays, plain objects
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML types

5 Styles Map
Tag -> available styles -> default
!!null: canonical,lowercase,uppercase,camelcase -> lowercase
!!int: binary,octal,decimal,hexadecimal -> decimal
!!bool: lowercase,uppercase,camelcase -> lowercase
!!float: lowercase,uppercase,camelcase -> lowercase

6 Supported Types
!!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map

7 Caveats
Arrays or objects as keys stringify via toString(); implicit block mapping duplicate anchors unsupported.

## Original Source
js-yaml
https://www.npmjs.com/package/js-yaml

## Digest of JS_YAML

# JS-YAML Technical Digest
Retrieved: 2024-06-01
Data Size: 416494 bytes
Links Found: 2387

# Installation

npm install js-yaml
npm install -g js-yaml  (for CLI)

# CLI Usage

Usage: js-yaml [-h] [-v] [-c] [-t] file

Options:
  -h, --help     Show help and exit
  -v, --version  Show version and exit
  -c, --compact  Display errors in compact mode
  -t, --trace    Show full stack trace on error

# API Methods

## load(string, options)
Parses a single-document YAML string and returns JavaScript values or throws YAMLException.

Signature:
  load(string, options)

Return:
  Object | string | number | null | undefined

Throws:
  YAMLException on parse errors or multi-document input

Options:
  filename    (string, default: null)    Path in error messages
  onWarning   (function(YAMLException), default: null)
  schema      (Schema, default: DEFAULT_SCHEMA)
  json        (boolean, default: false)    Duplicate keys override if true

## loadAll(string, iterator, options)
Parses multi-document YAML. Returns array if no iterator provided; otherwise calls iterator(doc) for each.

Signature:
  loadAll(string[, iterator(doc) ][, options])

Return:
  Array<Object|string|number|null|undefined> or void

Options: same as load

## dump(object, options)
Serializes JavaScript values to a YAML document string.

Signature:
  dump(object, options)

Return:
  string

Options:
  indent         (integer, default:2)
  noArrayIndent  (boolean, default:false)
  skipInvalid    (boolean, default:false)
  flowLevel      (integer, default:-1)
  styles         (object<tag:string, style:string>)
  schema         (Schema, default: DEFAULT_SCHEMA)
  sortKeys       (boolean|function, default:false)
  lineWidth      (integer, default:80)
  noRefs         (boolean, default:false)
  noCompatMode   (boolean, default:false)
  condenseFlow   (boolean, default:false)
  quotingType    ("'"|"\"", default:"'")
  forceQuotes    (boolean, default:false)
  replacer       (function(key, value), default:null)

# Schemas

FAILSAFE_SCHEMA: strings, arrays, objects only
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON
DEFAULT_SCHEMA: all YAML types

# Styles Table

Tag       Styles                  Default
!!null    canonical,lowercase,...  lowercase
!!int     binary,octal,decimal,... decimal
!!bool    lowercase,uppercase,... lowercase
!!float   lowercase,uppercase,... lowercase

# Supported Types

!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

# Caveats

Objects or arrays used as mapping keys are stringified via toString().
Implicit block mapping keys with duplicate anchors are not supported.

## Attribution
- Source: js-yaml
- URL: https://www.npmjs.com/package/js-yaml
- License: BSD-2-Clause
- Crawl Date: 2025-05-10T14:32:59.245Z
- Data Size: 416494 bytes
- Links Found: 2387

## Retrieved
2025-05-10
