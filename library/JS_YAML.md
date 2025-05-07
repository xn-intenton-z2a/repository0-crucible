# JS_YAML

## Crawl Summary
Installation: npm install js-yaml  CLI: js-yaml [-h] [-v] [-c] [-t] file

Methods:
• load(string, options) -> parsed doc; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false; throws on multi-doc input
• loadAll(string, iterator?, options) -> array of docs or applies iterator
• dump(object, options) -> YAML string; options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false|func, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType="'", forceQuotes=false, replacer=null

Supported schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
Supported types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map
Styles per tag: canonical,lowercase,uppercase,camelcase,empty,binary,octal,decimal,hexadecimal

Caveats: complex keys stringified, implicit block mapping keys unsupported

## Normalised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
  3.1 load
  3.2 loadAll
  3.3 dump
4 Schema Options
5 Dump Styling
6 Supported Types
7 Caveats

1 Installation
Run npm install js-yaml or npm install -g js-yaml for CLI.

2 CLI Usage
Command: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file
  -h show help
  -v show version
  -c compact error messages
  -t show stack trace

3 API Methods
3.1 load
Signature: yaml.load(string, options) -> Object|string|number|null|undefined
Throws: YAMLException on parse error or multi-doc input
Options:
  filename: string|null default null
  onWarning: function(YAMLException) default null
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  json: boolean default false

3.2 loadAll
Signature: yaml.loadAll(string, iterator?, options) -> Array<any> if no iterator
iterator(doc) called per document
Options: same as load

3.3 dump
Signature: yaml.dump(object, options) -> string
Throws: YAMLException on invalid types unless skipInvalid=true
Options:
  indent: number default 2
  noArrayIndent: boolean default false
  skipInvalid: boolean default false
  flowLevel: number default -1
  styles: object tag->style default {}
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  sortKeys: boolean|function default false
  lineWidth: number default 80
  noRefs: boolean default false
  noCompatMode: boolean default false
  condenseFlow: boolean default false
  quotingType: ' or " default '
  forceQuotes: boolean default false
  replacer: function(key,value) default null

4 Schema Options
FAILSAFE_SCHEMA: strings, arrays, plain objects
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML types

5 Dump Styling
Available styles per tag:
  !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
  !!int: binary(0b1010), octal(0o52), decimal(42), hexadecimal(0x2A)
  !!bool: lowercase(true), uppercase(TRUE), camelcase(True)
  !!float: lowercase(.inf), uppercase(.INF), camelcase(.Inf)
Use options.styles:{ '!!null':'canonical' }

6 Supported Types
!!null -> null
!!bool -> boolean
!!int -> number
!!float -> number
!!binary -> Buffer
!!timestamp -> Date
!!omap -> Array<[k,v]>
!!pairs -> Array<[k,v]>
!!set -> Array<object with null values>
!!str -> string
!!seq -> Array<any>
!!map -> object

7 Caveats
• Using arrays or objects as keys stringifies via toString()
• Implicit block mapping keys with anchors unsupported


## Supplementary Details
Installation: npm install js-yaml@latest or npm install -g js-yaml@latest for CLI. Ensure Node.js >= v6.

Loading file example:
const fs = require('fs')
const yaml = require('js-yaml')
try {
  const source = fs.readFileSync('config.yml','utf8')
  const config = yaml.load(source, { filename:'config.yml', onWarning:w=>console.warn(w.message), schema:yaml.JSON_SCHEMA, json:true })
} catch(e) {
  if(e instanceof yaml.YAMLException) console.error('YAML parse error:',e.message)
  else throw e
}

Dumping object example:
const obj = { name:'app', items:[1,2,3] }
const yml = yaml.dump(obj, { indent:4, noArrayIndent:true, flowLevel:0, sortKeys:(a,b)=>a.localeCompare(b), lineWidth:-1, quotingType:'"', forceQuotes:true })

Schema definitions:
const {FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA} = require('js-yaml')

Define custom style:
yaml.dump(obj, { styles:{ '!!int':'hexadecimal' } })


## Reference Details
// load method
const yaml = require('js-yaml')
// Signature: load(string: string, options?: {
//   filename?: string|null,
//   onWarning?: (e: YAMLException)=>void,
//   schema?: Schema,
//   json?: boolean
// }) => any
// Throws YAMLException

// loadAll method
// Signature: loadAll(string: string, iterator?: (doc:any)=>void, options?: sameAsLoad) => any[]

// dump method
// Signature: dump(object: any, options?: {
//   indent?: number,
//   noArrayIndent?: boolean,
//   skipInvalid?: boolean,
//   flowLevel?: number,
//   styles?: {[tag:string]:string},
//   schema?: Schema,
//   sortKeys?: boolean|((a:string,b:string)=>number),
//   lineWidth?: number,
//   noRefs?: boolean,
//   noCompatMode?: boolean,
//   condenseFlow?: boolean,
//   quotingType?: '"'|"'",
//   forceQuotes?: boolean,
//   replacer?: (key:any,value:any)=>any
// }) => string

// Best practice: safe loading
function safeLoadFile(path) {
  const src = fs.readFileSync(path,'utf8')
  return yaml.load(src, { schema: yaml.JSON_SCHEMA, json:true })
}

// Troubleshooting:
// Command to run CLI with full trace:
// js-yaml --trace config.yml
// Expected output on invalid YAML:
// Error: unacceptable indentation at line 3, column 5:
//     key: value
//     ^


## Information Dense Extract
yaml.load(string, {filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false}) -> any throws YAMLException
yaml.loadAll(string, iterator?, options) -> any[]
yaml.dump(object, {indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, styles={}, schema=DEFAULT_SCHEMA, sortKeys=false|func, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='\'', forceQuotes=false, replacer=null}) -> string
Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
Styles per tag: !!null(canonical,lowercase,uppercase,camelcase,empty), !!int(binary,octal,decimal,hexadecimal), !!bool(lowercase,uppercase,camelcase), !!float(lowercase,uppercase,camelcase)
Supported types: null,bool,int,float,binary(timestamp),Buffer,Date,omap,pairs,set,str,seq,map
CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file


## Sanitised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
  3.1 load
  3.2 loadAll
  3.3 dump
4 Schema Options
5 Dump Styling
6 Supported Types
7 Caveats

1 Installation
Run npm install js-yaml or npm install -g js-yaml for CLI.

2 CLI Usage
Command: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file
  -h show help
  -v show version
  -c compact error messages
  -t show stack trace

3 API Methods
3.1 load
Signature: yaml.load(string, options) -> Object|string|number|null|undefined
Throws: YAMLException on parse error or multi-doc input
Options:
  filename: string|null default null
  onWarning: function(YAMLException) default null
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  json: boolean default false

3.2 loadAll
Signature: yaml.loadAll(string, iterator?, options) -> Array<any> if no iterator
iterator(doc) called per document
Options: same as load

3.3 dump
Signature: yaml.dump(object, options) -> string
Throws: YAMLException on invalid types unless skipInvalid=true
Options:
  indent: number default 2
  noArrayIndent: boolean default false
  skipInvalid: boolean default false
  flowLevel: number default -1
  styles: object tag->style default {}
  schema: one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA default DEFAULT_SCHEMA
  sortKeys: boolean|function default false
  lineWidth: number default 80
  noRefs: boolean default false
  noCompatMode: boolean default false
  condenseFlow: boolean default false
  quotingType: ' or ' default '
  forceQuotes: boolean default false
  replacer: function(key,value) default null

4 Schema Options
FAILSAFE_SCHEMA: strings, arrays, plain objects
JSON_SCHEMA: JSON types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: all YAML types

5 Dump Styling
Available styles per tag:
  !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty('')
  !!int: binary(0b1010), octal(0o52), decimal(42), hexadecimal(0x2A)
  !!bool: lowercase(true), uppercase(TRUE), camelcase(True)
  !!float: lowercase(.inf), uppercase(.INF), camelcase(.Inf)
Use options.styles:{ '!!null':'canonical' }

6 Supported Types
!!null -> null
!!bool -> boolean
!!int -> number
!!float -> number
!!binary -> Buffer
!!timestamp -> Date
!!omap -> Array<[k,v]>
!!pairs -> Array<[k,v]>
!!set -> Array<object with null values>
!!str -> string
!!seq -> Array<any>
!!map -> object

7 Caveats
 Using arrays or objects as keys stringifies via toString()
 Implicit block mapping keys with anchors unsupported

## Original Source
js-yaml
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# js-yaml API Reference

# load(string, options)
Parses a YAML string as a single document.

Method signature:

  yaml.load(string[, options]) -> Object|string|number|null|undefined throws YAMLException

Options:
  filename            default null               string used in error messages
  onWarning           default null               function(YAMLException)
  schema              default DEFAULT_SCHEMA      one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
  json                default false              boolean: duplicate mapping keys override when true

Throws YAMLException on parse errors or multi-document input.

# loadAll(string, iterator, options)
Parses multi-document YAML string.

Method signature:

  yaml.loadAll(string[, iterator(doc)][, options]) -> Array<Object|string|number|null|undefined>

Parameters:
  iterator            function(doc) called for each doc
  options             same as load

Returns array of parsed documents if no iterator provided.

# dump(object, options)
Serializes JavaScript object to YAML.

Method signature:

  yaml.dump(object[, options]) -> string throws YAMLException

Options:
  indent              default 2     number of spaces for indentation
  noArrayIndent       default false boolean: do not indent array elements
  skipInvalid         default false boolean: skip invalid types without throwing
  flowLevel           default -1    number: depth to switch to flow style
  styles              default {}    object: tag to style map
  schema              default DEFAULT_SCHEMA one of FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA
  sortKeys            default false boolean or function(a,b)
  lineWidth           default 80    number: max line width, -1 unlimited
  noRefs              default false boolean: disable duplicate reference anchors
  noCompatMode        default false boolean: disable compat quoting for YAML1.1
  condenseFlow        default false boolean: omit spaces in flow style
  quotingType         default '      string: ''' or '"'
  forceQuotes         default false boolean: quote all non-key strings
  replacer            default null  function(key,value)

# Style options table
Tag      Styles                 Output examples
!!null   canonical,lowercase, uppercase,camelcase,empty
!!int    binary,octal,decimal,hexadecimal
!!bool   lowercase,uppercase,camelcase
!!float  lowercase,uppercase,camelcase

# Supported types
!!null => null
!!bool => boolean
!!int => number
!!float => number
!!binary => Buffer
!!timestamp => Date
!!omap => Array<[key,value]>
!!pairs => Array<[key,value]>
!!set => Array<object null>
!!str => string
!!seq => Array<any>
!!map => object

# Caveats
• Objects or arrays as mapping keys are stringified via toString().
• Implicit block mapping keys cannot be loaded.


## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-07T12:33:48.905Z
- Data Size: 553062 bytes
- Links Found: 4508

## Retrieved
2025-05-07
