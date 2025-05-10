# JS_YAML

## Crawl Summary
js-yaml v1.2 parser/writer. Install via npm install js-yaml. CLI: js-yaml [options] file. API.load(string, options) returns object|string|number|null throws YAMLException. Options: filename, onWarning, schema (FAILSAFE, JSON, CORE, DEFAULT), json override duplicate key behavior. API.loadAll supports multi-doc and optional iterator. API.dump(object, options) returns YAML string. DumpOptions include indent, noArrayIndent, skipInvalid, flowLevel, styles map, schema, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer. Styles mapping for tags !!null, !!int, !!bool, !!float. Supported tags list. Caveats: JS limitations on keys and implicit mapping.

## Normalised Extract
Table of Contents:
1 Installation
2 CLI Usage
3 API.load
4 API.loadAll
5 API.dump
6 Styles Mapping
7 Supported Types
8 Caveats

1 Installation
   Command: npm install js-yaml
   Global CLI: npm install -g js-yaml

2 CLI Usage
   Usage: js-yaml [ -h | --help ] [ -v | --version ] [ -c | --compact ] [ -t | --trace ] file

3 API.load
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Returns: object|string|number|null|undefined. Throws: YAMLException.
   Default options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false.

4 API.loadAll
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]
   Behavior: Parses multi-document streams. If iterator provided, invoked per document; else returns array.

5 API.dump
   Signature: dump(data: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean|function;
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: string;
     forceQuotes?: boolean;
     replacer?: (key: any, value: any) => any;
   }): string
   Default options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType="'", forceQuotes=false.

6 Styles Mapping
   !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
   !!int: binary(0b1), octal(0o1), decimal(1), hexadecimal(0x1)
   !!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
   !!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

7 Supported Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

8 Caveats
   Objects/arrays as keys are stringified. Implicit block mapping property access unsupported.


## Supplementary Details
Schemas Constants:
- FAILSAFE_SCHEMA: allows only strings, arrays, objects.
- JSON_SCHEMA: JSON-compatible types.
- CORE_SCHEMA: alias of JSON_SCHEMA.
- DEFAULT_SCHEMA: full YAML support.

Error Handling:
- load throws YAMLException on parse errors or multi-document input.
- loadAll throws on invalid streams.

Callback onWarning:
- Receives YAMLException per warning.

Enterprise:
- Tidelift Subscription includes support, maintenance SLA.


## Reference Details
Require and FS import:
const yaml = require('js-yaml');
const fs   = require('fs');

// Load example
try {
  const doc = yaml.load(fs.readFileSync('/path/to/file.yml','utf8'), { filename: 'file.yml', onWarning: warn => console.warn(warn), schema: yaml.JSON_SCHEMA, json: true });
  console.log(doc);
} catch (e) {
  if (e instanceof yaml.YAMLException) console.error('YAML error:', e.message);
  else throw e;
}

// loadAll example
const docs = yaml.loadAll(fs.readFileSync('multi.yml','utf8'), null, { schema: yaml.DEFAULT_SCHEMA });
// or with iterator
yaml.loadAll(data, doc => process(doc));

// dump example
const yamlStr = yaml.dump({ foo: 'bar', arr: [1,2,3] }, { indent:4, skipInvalid:true, sortKeys:true, styles:{ '!!null':'canonical' } });

// CLI troubleshooting
Command: js-yaml invalid.yaml
Expected: YAMLException with line and column. With --compact shows only message; with --trace shows stack.

Best Practices:
- Use DEFAULT_SCHEMA for full features.
- Enable json:true for JSON-parse compatibility when expecting JSON-only input.
- Set noRefs:true to inline all nodes.

Troubleshooting:
- Ensure utf8 encoding. Use fs.readFileSync(path,'utf8').
- Validate schema constant usage: yaml.CORE_SCHEMA, yaml.JSON_SCHEMA.
- Use onWarning callback to capture warnings for deprecated tags.


## Information Dense Extract
load(string,options={filename:null,onWarning:null,schema:DEFAULT_SCHEMA,json:false}): any throws YAMLException; loadAll(string,iterator?,options): any[]; dump(object,options={indent:2,noArrayIndent:false,skipInvalid:false,flowLevel:-1,styles:{},schema:DEFAULT_SCHEMA,sortKeys:false,lineWidth:80,noRefs:false,noCompatMode:false,condenseFlow:false,quotingType:"'",forceQuotes:false,replacer:null}): string; Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA; Styles for !!null, !!int, !!bool, !!float; Supported types list; CLI js-yaml [-h|-v|-c|-t] file; FS readFileSync(path,'utf8') input; onWarning(YAMLException) callback; json:true overrides duplicate-key error to override; Caveats: objects/arrays as keys stringified; implicit mapping key access unsupported.

## Sanitised Extract
Table of Contents:
1 Installation
2 CLI Usage
3 API.load
4 API.loadAll
5 API.dump
6 Styles Mapping
7 Supported Types
8 Caveats

1 Installation
   Command: npm install js-yaml
   Global CLI: npm install -g js-yaml

2 CLI Usage
   Usage: js-yaml [ -h | --help ] [ -v | --version ] [ -c | --compact ] [ -t | --trace ] file

3 API.load
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Returns: object|string|number|null|undefined. Throws: YAMLException.
   Default options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false.

4 API.loadAll
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]
   Behavior: Parses multi-document streams. If iterator provided, invoked per document; else returns array.

5 API.dump
   Signature: dump(data: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean|function;
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: string;
     forceQuotes?: boolean;
     replacer?: (key: any, value: any) => any;
   }): string
   Default options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType=''', forceQuotes=false.

6 Styles Mapping
   !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty('')
   !!int: binary(0b1), octal(0o1), decimal(1), hexadecimal(0x1)
   !!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
   !!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

7 Supported Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

8 Caveats
   Objects/arrays as keys are stringified. Implicit block mapping property access unsupported.

## Original Source
js-yaml
https://github.com/nodeca/js-yaml

## Digest of JS_YAML

# JS-YAML Technical Digest (retrieved 2024-06-30)

# Installation

- npm install js-yaml
- npm install -g js-yaml  (for CLI executable)

# CLI Usage

Usage: js-yaml [ -h ] [ -v ] [ -c ] [ -t ] file

Options:
- -h, --help     Show help and exit
- -v, --version  Show version and exit
- -c, --compact  Display errors in compact mode
- -t, --trace    Show stack trace on error

# API: load(string, options)

Signature:
load(input: string, options?: LoadOptions): any throws YAMLException

LoadOptions:
- filename?: string (default null)
- onWarning?: (warning: YAMLException) => void
- schema?: Schema (default DEFAULT_SCHEMA)
- json?: boolean (default false)

Schemas:
- FAILSAFE_SCHEMA
- JSON_SCHEMA
- CORE_SCHEMA
- DEFAULT_SCHEMA

# API: loadAll(string, iterator?, options?)

Signature:
loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]

# API: dump(object, options)

Signature:
dump(data: any, options?: DumpOptions): string

DumpOptions:
- indent?: number (default 2)
- noArrayIndent?: boolean (default false)
- skipInvalid?: boolean (default false)
- flowLevel?: number (default -1)
- styles?: Record<string, string>
- schema?: Schema (default DEFAULT_SCHEMA)
- sortKeys?: boolean | ((a: string, b: string) => number) (default false)
- lineWidth?: number (default 80)
- noRefs?: boolean (default false)
- noCompatMode?: boolean (default false)
- condenseFlow?: boolean (default false)
- quotingType?: "'" | '"' (default "'")
- forceQuotes?: boolean (default false)
- replacer?: (key: any, value: any) => any

# Styles Table

Tag     | Style       | Example Output
!!null  | canonical   | ~
!!null  | lowercase   | null
!!int   | binary      | 0b101010
...     | ...         | ...

# Supported YAML Types

!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

# Caveats

- Objects or arrays used as map keys are stringified via toString().
- Implicit block mapping key property access not supported.

# Enterprise Support

- Available via Tidelift Subscription for commercial maintenance.


## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml
- License: MIT License
- Crawl Date: 2025-05-10T23:58:36.322Z
- Data Size: 953543 bytes
- Links Found: 5780

## Retrieved
2025-05-10
