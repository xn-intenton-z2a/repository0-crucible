# JS_YAML

## Crawl Summary
Installation via npm. CLI flags: --help, --version, --compact, --trace. API methods: load(string, options), loadAll(string, iterator, options), dump(object, options). Each method signature, return types, thrown YAMLException. Default schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA. Dump options: indent (2), noArrayIndent (false), skipInvalid (false), flowLevel (-1), styles, sortKeys (false), lineWidth (80), noRefs (false), noCompatMode (false), condenseFlow (false), quotingType (' by default), forceQuotes (false), replacer. Tag style presets per tag: !!null, !!int, !!bool, !!float. Supported YAML tags mapping to JS types. Key caveats: array/object keys conversion, implicit mapping lookup limitation.

## Normalised Extract
Table of Contents
1. Installation
2. CLI Usage
3. load()
4. loadAll()
5. dump()
6. Schemas
7. Styles
8. Types
9. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3. load(string, options)
Signature: load(string, options)
Parameters:
  string: YAML document text
  options.filename: string|null (default null)
  options.onWarning: function(YAMLException)|null (default null)
  options.schema: Schema constant (DEFAULT_SCHEMA by default)
  options.json: boolean (default false)
Returns: parsed JS value
Throws: YAMLException on error or multi-doc input

4. loadAll(string, iterator?, options?)
Signature: loadAll(string, iterator?, options?)
Parameters:
  string: multi-document YAML text
  iterator: function(doc) to handle each document
  options: same as load()
Returns: array of parsed values (if no iterator) or undefined
Throws: YAMLException on parse error

5. dump(object, options)
Signature: dump(object, options)
Parameters:
  object: JS value to serialize
  options.indent: number (default 2)
  options.noArrayIndent: boolean (default false)
  options.skipInvalid: boolean (default false)
  options.flowLevel: number (default -1)
  options.styles: map tag=>style
  options.schema: Schema constant (DEFAULT_SCHEMA)
  options.sortKeys: boolean|function (default false)
  options.lineWidth: number (default 80)
  options.noRefs: boolean (default false)
  options.noCompatMode: boolean (default false)
  options.condenseFlow: boolean (default false)
  options.quotingType: ' or " (default ')
  options.forceQuotes: boolean (default false)
  options.replacer: function(key, value)
Returns: YAML-formatted string
Throws: YAMLException if invalid types and skipInvalid=false

6. Schemas
FAILSAFE_SCHEMA: only string, array, object
JSON_SCHEMA: JSON-compatible types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: full YAML 1.2 support

7. Styles
!!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
!!int: binary(0b...), octal(0o...), decimal(...), hexadecimal(0x...)
!!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
!!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

8. Types
!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

9. Caveats
JS objects/arrays as keys are stringified
Implicit block mapping key lookups unsupported

## Supplementary Details
Ensure safe dumping by using skipInvalid=true to omit functions and regexps. Example: dump(obj, { skipInvalid: true }). Use json option on load to accept duplicate keys override: load(str, { json: true }). To preserve references, set noRefs=false (default) else noRefs=true disables aliases. For key sorting in output: dump(obj, { sortKeys: true }) or custom sort function. To increase nesting block style to flow style at level 2: dump(obj, { flowLevel: 2 }). Adjust line width: dump(obj, { lineWidth: 120 }). Disable YAML1.1 compatibility: dump(obj, { noCompatMode: true }). Combine quoting: dump(obj, {  quotingType: '"', forceQuotes: true }).

## Reference Details
// Load single document
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const doc = yaml.load(fs.readFileSync('example.yml','utf8'),{
    filename:'example.yml',
    onWarning: warn=>console.warn(warn.message),
    schema: yaml.CORE_SCHEMA,
    json: true
  });
  console.log(doc);
} catch(e) {
  console.error(e.name, e.message);
}

// Load multiple documents
const docs = yaml.loadAll(fs.readFileSync('multi.yml','utf8'), null, { schema: yaml.DEFAULT_SCHEMA });
// Or with iterator
yaml.loadAll(data, d=>console.log(d), { onWarning: ()=>{} });

// Dump object to YAML
const out = yaml.dump({a:1,b:2}, {
  indent:4,
  noArrayIndent:true,
  skipInvalid:false,
  flowLevel:0,
  styles:{'!!int':'hexadecimal'},
  schema: yaml.JSON_SCHEMA,
  sortKeys:(a,b)=>a.localeCompare(b),
  lineWidth:120,
  noRefs:true,
  noCompatMode:true,
  condenseFlow:true,
  quotingType:'"',
  forceQuotes:true,
  replacer:(key,value)=>key==='secret'?undefined:value
});
fs.writeFileSync('out.yaml',out,'utf8');

// CLI version
// Check version
js-yaml --version
// Compact errors
js-yaml -c bad.yml
// Trace errors
js-yaml -t bad.yml

// Troubleshooting
// Command: js-yaml bad.yml
// Expected: YAMLException: unacceptable character at line X



## Information Dense Extract
load(string, {filename:null,onWarning:null, schema:DEFAULT_SCHEMA, json:false})=>any|throws YAMLException; loadAll(string, iterator?, options)=>any[]|undefined; dump(object,{indent:2,noArrayIndent:false,skipInvalid:false,flowLevel:-1,styles:{},schema:DEFAULT_SCHEMA,sortKeys:false,lineWidth:80,noRefs:false,noCompatMode:false,condenseFlow:false,quotingType:"'",forceQuotes:false,replacer})=>string.
Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA.
Tag styles per tag: !!null[cano:~,lower,null,NULL, Null, ""], !!int[binary,octal,decimal,hex], !!bool[lower,upper,camel], !!float[lower,upper,camel].
Types: !!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map.
CLI flags:-h,-v,-c,-t.
Caveats: object/array keys stringify, implicit block mapping unsupported.

## Sanitised Extract
Table of Contents
1. Installation
2. CLI Usage
3. load()
4. loadAll()
5. dump()
6. Schemas
7. Styles
8. Types
9. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3. load(string, options)
Signature: load(string, options)
Parameters:
  string: YAML document text
  options.filename: string|null (default null)
  options.onWarning: function(YAMLException)|null (default null)
  options.schema: Schema constant (DEFAULT_SCHEMA by default)
  options.json: boolean (default false)
Returns: parsed JS value
Throws: YAMLException on error or multi-doc input

4. loadAll(string, iterator?, options?)
Signature: loadAll(string, iterator?, options?)
Parameters:
  string: multi-document YAML text
  iterator: function(doc) to handle each document
  options: same as load()
Returns: array of parsed values (if no iterator) or undefined
Throws: YAMLException on parse error

5. dump(object, options)
Signature: dump(object, options)
Parameters:
  object: JS value to serialize
  options.indent: number (default 2)
  options.noArrayIndent: boolean (default false)
  options.skipInvalid: boolean (default false)
  options.flowLevel: number (default -1)
  options.styles: map tag=>style
  options.schema: Schema constant (DEFAULT_SCHEMA)
  options.sortKeys: boolean|function (default false)
  options.lineWidth: number (default 80)
  options.noRefs: boolean (default false)
  options.noCompatMode: boolean (default false)
  options.condenseFlow: boolean (default false)
  options.quotingType: ' or ' (default ')
  options.forceQuotes: boolean (default false)
  options.replacer: function(key, value)
Returns: YAML-formatted string
Throws: YAMLException if invalid types and skipInvalid=false

6. Schemas
FAILSAFE_SCHEMA: only string, array, object
JSON_SCHEMA: JSON-compatible types
CORE_SCHEMA: same as JSON_SCHEMA
DEFAULT_SCHEMA: full YAML 1.2 support

7. Styles
!!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty('')
!!int: binary(0b...), octal(0o...), decimal(...), hexadecimal(0x...)
!!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
!!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

8. Types
!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

9. Caveats
JS objects/arrays as keys are stringified
Implicit block mapping key lookups unsupported

## Original Source
js-yaml
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML API Reference (Retrieved 2024-06-12)

# Installation

npm install js-yaml
npm install -g js-yaml  // for CLI executable

# CLI Usage

js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

# load(string, options)

Parses a single YAML document string.

Signature:

  load(string, options)

Parameters:

  string: UTF-8 encoded YAML text
  options: {
    filename: string | null = null,
    onWarning: (YAMLException) => void | null = null,
    schema: Schema = DEFAULT_SCHEMA,
    json: boolean = false
  }

Returns: any (object|string|number|null|undefined)
Throws: YAMLException on parse error or multi-document input.

# loadAll(string, iterator, options)

Parses multi-document sources.

Signature:

  loadAll(string, iterator?, options?)

Parameters:

  string: UTF-8 YAML text with one or more documents
  iterator: (doc) => void (called per document)
  options: same as load()

Returns: any[] if iterator omitted, undefined if iterator provided.
Throws: YAMLException on parse error.

# dump(object, options)

Serializes JavaScript value to YAML.

Signature:

  dump(object, options)

Parameters:

  object: any JS value to serialize
  options: {
    indent: number = 2,
    noArrayIndent: boolean = false,
    skipInvalid: boolean = false,
    flowLevel: number = -1,
    styles: Record<string,string> = {},
    schema: Schema = DEFAULT_SCHEMA,
    sortKeys: boolean | ((a,b)=>number) = false,
    lineWidth: number = 80,
    noRefs: boolean = false,
    noCompatMode: boolean = false,
    condenseFlow: boolean = false,
    quotingType: "'" | '"' = "'",
    forceQuotes: boolean = false,
    replacer: (key,value) => any
  }

Returns: string (YAML document)
Throws: YAMLException on invalid types when skipInvalid=false.

# Schemas

  FAILSAFE_SCHEMA: strings, arrays, plain objects
  JSON_SCHEMA: JSON types
  CORE_SCHEMA: same as JSON_SCHEMA
  DEFAULT_SCHEMA: full YAML 1.2 spec types

# Supported Tag Styles

Tag          Style Names (effect)
!!null       canonical (~), lowercase (null), uppercase (NULL), camelcase (Null), empty ("")
!!int        binary (0b...), octal (0o...), decimal (...), hexadecimal (0x...)
!!bool       lowercase (true/false), uppercase (TRUE/FALSE), camelcase (True/False)
!!float      lowercase (.nan/.inf), uppercase (.NAN/.INF), camelcase (.NaN/.Inf)

# Supported Types

!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

# Caves & Limitations

- Objects/arrays as keys are stringified via toString().
- Implicit block mapping key lookups unsupported.



## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-06T18:33:07.026Z
- Data Size: 564474 bytes
- Links Found: 4607

## Retrieved
2025-05-06
