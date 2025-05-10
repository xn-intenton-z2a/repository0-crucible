# JSYAML

## Crawl Summary
Installation via npm or global CLI. API methods load, loadAll, dump with full LoadOptions and DumpOptions definitions. Default values and schemas. YAML-JS type tag mapping. CLI usage flags.

## Normalised Extract
Table of Contents:
1. Installation
2. CLI Usage
3. API Methods
   3.1 load
   3.2 loadAll
   3.3 dump
4. LoadOptions
5. DumpOptions
6. Schema Constants
7. YAML Tag to JS Type Mapping
8. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
Command syntax: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] <file>
Flags:
  -h, --help
  -v, --version
  -c, --compact
  -t, --trace

3. API Methods
3.1 load(input: string, options?: LoadOptions): any
  Parses single YAML document. Throws YAMLException. No multi-doc support.
3.2 loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void
  Parses multi-document YAML. Invokes iterator per doc if provided; else returns array.
3.3 dump(input: any, options?: DumpOptions): string
  Serializes JS object to YAML string.

4. LoadOptions
filename: string (default null)
onWarning: function(YAMLException) (default null)
schema: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
json: boolean (default false)

5. DumpOptions
indent: number (default 2)
noArrayIndent: boolean (default false)
skipInvalid: boolean (default false)
flowLevel: number (default -1)
styles: { tag:string -> style:string }
schema: (default DEFAULT_SCHEMA)
sortKeys: boolean|function (default false)
lineWidth: number (default 80)
noRefs: boolean (default false)
noCompatMode: boolean (default false)
condenseFlow: boolean (default false)
quotingType: '"'|'\'' (default '\'')
forceQuotes: boolean (default false)
replacer: function(key, value)

6. Schema Constants
FAILSAFE_SCHEMA
JSON_SCHEMA
CORE_SCHEMA
DEFAULT_SCHEMA

7. YAML Tag to JS Type Mapping
!!null -> null
!!bool -> boolean
!!int -> number
... etc.

8. Caveats
JS cannot use objects/arrays as map keys; they are stringified.
Implicit block mapping keys with duplicate anchors not supported.


## Supplementary Details
Installation steps for Node.js and CLI. Exact CLI command flags and their effects. All LoadOptions with default values and types. All DumpOptions with types, defaults, and behaviors. Schema constants URLs. Mapping of YAML tags to JS types.

## Reference Details
// Load example
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const doc = yaml.load(fs.readFileSync('example.yml', 'utf8'), {
    filename: 'example.yml',
    onWarning: (w) => console.warn('YAML Warning:', w.message),
    schema: yaml.JSON_SCHEMA,
    json: true
  });
  console.log(doc);
} catch (e) {
  console.error('YAML Load Error:', e.message);
  process.exit(1);
}

// loadAll example
yaml.loadAll(fs.readFileSync('multi.yml', 'utf8'), (doc) => {
  console.log('Doc:', doc);
}, { schema: yaml.DEFAULT_SCHEMA });

// dump example
const obj = { a: 1, b: [true, null], c: { d: 'text' } };
const yamlStr = yaml.dump(obj, {
  indent: 4,
  noArrayIndent: true,
  flowLevel: 2,
  styles: { '!!null': 'canonical' },
  sortKeys: (a, b) => a.localeCompare(b),
  lineWidth: 120,
  condenseFlow: true,
  quotingType: '"',
  forceQuotes: true,
  replacer: (key, value) => (value === null ? '~' : value)
});
console.log(yamlStr);

// Troubleshooting
# Validate YAML file
js-yaml -c example_invalid.yml
# Show full error
js-yaml -t example_invalid.yml
Expect exit code 1 on parse failure, stdout empty, stderr with error details.


## Information Dense Extract
install: npm install js-yaml; global CLI: npm install -g js-yaml. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file. API: load(input:string, opts: {filename?,onWarning?,schema?,json?}): any; loadAll(input:string, iter?:fn, opts?): any[]|void; dump(obj:any, opts:{indent?,noArrayIndent?,skipInvalid?,flowLevel?,styles?,schema?,sortKeys?,lineWidth?,noRefs?,noCompatMode?,condenseFlow?,quotingType?,forceQuotes?,replacer?}): string. Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA. YAML tag mapping: !!null->null, !!bool->boolean, !!int/!!float->number, !!binary->Buffer, !!timestamp->Date, !!omap/!!pairs->Array<[k,v]>, !!set->Object(k:null), !!str->string, !!seq->Array, !!map->Object. Caveats: object/array keys stringified, duplicate anchors unsupported. Troubleshoot: CLI flags -c for compact errors, -t for trace, exit code 1 on failure.

## Sanitised Extract
Table of Contents:
1. Installation
2. CLI Usage
3. API Methods
   3.1 load
   3.2 loadAll
   3.3 dump
4. LoadOptions
5. DumpOptions
6. Schema Constants
7. YAML Tag to JS Type Mapping
8. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
Command syntax: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] <file>
Flags:
  -h, --help
  -v, --version
  -c, --compact
  -t, --trace

3. API Methods
3.1 load(input: string, options?: LoadOptions): any
  Parses single YAML document. Throws YAMLException. No multi-doc support.
3.2 loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void
  Parses multi-document YAML. Invokes iterator per doc if provided; else returns array.
3.3 dump(input: any, options?: DumpOptions): string
  Serializes JS object to YAML string.

4. LoadOptions
filename: string (default null)
onWarning: function(YAMLException) (default null)
schema: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
json: boolean (default false)

5. DumpOptions
indent: number (default 2)
noArrayIndent: boolean (default false)
skipInvalid: boolean (default false)
flowLevel: number (default -1)
styles: { tag:string -> style:string }
schema: (default DEFAULT_SCHEMA)
sortKeys: boolean|function (default false)
lineWidth: number (default 80)
noRefs: boolean (default false)
noCompatMode: boolean (default false)
condenseFlow: boolean (default false)
quotingType: '''|'''' (default '''')
forceQuotes: boolean (default false)
replacer: function(key, value)

6. Schema Constants
FAILSAFE_SCHEMA
JSON_SCHEMA
CORE_SCHEMA
DEFAULT_SCHEMA

7. YAML Tag to JS Type Mapping
!!null -> null
!!bool -> boolean
!!int -> number
... etc.

8. Caveats
JS cannot use objects/arrays as map keys; they are stringified.
Implicit block mapping keys with duplicate anchors not supported.

## Original Source
js-yaml
https://www.npmjs.com/package/js-yaml

## Digest of JSYAML

# JS-YAML Detailed Digest

Date Retrieved: 2023-10-05
Source Entry Index: 8
Data Size: 733356 bytes

## Installation

npm install js-yaml
npm install -g js-yaml  # for CLI executable

## CLI Usage

js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

Flags:
  -h, --help      Show help and exit
  -v, --version   Show version and exit
  -c, --compact   Compact error output
  -t, --trace     Show full stack trace on error

## API Methods

### yaml.load(string, options)
Signature:
  load(input: string, options?: LoadOptions): any

LoadOptions:
  filename?: string (default: null)
  onWarning?: (warning: YAMLException) => void (default: null)
  schema?: Schema (DEFAULT_SCHEMA)
  json?: boolean (default: false)

Schemas:
  FAILSAFE_SCHEMA
  JSON_SCHEMA
  CORE_SCHEMA
  DEFAULT_SCHEMA

Behavior:
  Parses a single YAML document. Returns object|string|number|null|undefined. Throws YAMLException on error.
  Does not support multi-document input.

### yaml.loadAll(string, iterator?, options)
Signature:
  loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void

Behavior:
  Parses multi-document YAML. If iterator provided, invokes for each document; otherwise returns array.

### yaml.dump(object, options)
Signature:
  dump(input: any, options?: DumpOptions): string

DumpOptions:
  indent?: number (default: 2)
  noArrayIndent?: boolean (default: false)
  skipInvalid?: boolean (default: false)
  flowLevel?: number (default: -1)
  styles?: {[tag: string]: string}
  schema?: Schema (DEFAULT_SCHEMA)
  sortKeys?: boolean|((a: string, b: string) => number) (default: false)
  lineWidth?: number (default: 80)
  noRefs?: boolean (default: false)
  noCompatMode?: boolean (default: false)
  condenseFlow?: boolean (default: false)
  quotingType?: '"'|'\'' (default: '\'')
  forceQuotes?: boolean (default: false)
  replacer?: (key: string, value: any) => any

## YAML Type Mapping

Tag       JS Type
!!null    null
!!bool    boolean
!!int     number
!!float   number
!!binary  Buffer
!!timestamp Date
!!omap    [ [key, value], ... ]
!!pairs   [ [key, value], ... ]
!!set     {key: null, ...}
!!str     string
!!seq     any[]
!!map     {[key: string]: any}

## Caveats

• Objects/arrays used as keys are stringified via toString().
• Implicit block mapping keys cannot load duplicate anchor references.

## Enterprise

Commercial support via Tidelift subscription.


## Attribution
- Source: js-yaml
- URL: https://www.npmjs.com/package/js-yaml
- License: BSD-2-Clause
- Crawl Date: 2025-05-10T15:26:57.450Z
- Data Size: 733356 bytes
- Links Found: 2902

## Retrieved
2025-05-10
