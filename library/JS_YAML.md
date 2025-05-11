# JS_YAML

## Crawl Summary
Installation via npm; global CLI supports -h, -v, -c, -t flags; import with require('js-yaml'); three core methods: load(string, options), loadAll(string, iterator, options), dump(object, options) with detailed option defaults; supported schemas (FAILSAFE, JSON, CORE, DEFAULT); dump-specific options including indent, flowLevel, styles, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer; full YAML tag-to-JS type mapping; caveats on object keys and anchor handling.

## Normalised Extract
Table of Contents:
1. Installation
2. CLI Executable and Usage
3. Import Statement
4. API Methods
   4.1 load(string, options)
   4.2 loadAll(string, iterator, options)
   4.3 dump(object, options)
5. Method Options and Defaults
6. Supported Schemas
7. Supported YAML Types
8. Caveats

1. Installation
   npm install js-yaml

2. CLI Executable and Usage
   npm install -g js-yaml
   Usage: js-yaml [-h] [-v] [-c] [-t] file
   Flags:
     -h, --help     Show help
     -v, --version  Show version
     -c, --compact  Compact error output
     -t, --trace    Stack trace on error

3. Import Statement
   const yaml = require('js-yaml');
   const fs   = require('fs');

4. API Methods
  4.1 load(string, options)
    - Returns: Object|string|number|null|undefined
    - Throws: YAMLException
    - Options:
        filename: string|null (default null)
        onWarning: (YAMLException) → void (default null)
        schema: Schema (DEFAULT_SCHEMA)
        json: boolean (default false)
  4.2 loadAll(string, iterator, options)
    - Returns: any[] or applies iterator(doc)
    - Iterator signature: (doc: any) → void
    - Same options as load
  4.3 dump(object, options)
    - Returns: string
    - Options:
        indent: number = 2
        noArrayIndent: boolean = false
        skipInvalid: boolean = false
        flowLevel: number = -1
        styles: Record<string,string> = {}
        schema: Schema = DEFAULT_SCHEMA
        sortKeys: boolean|((a,b)=>number) = false
        lineWidth: number = 80
        noRefs: boolean = false
        noCompatMode: boolean = false
        condenseFlow: boolean = false
        quotingType: ' or " = '\''
        forceQuotes: boolean = false
        replacer: (key,value) => any

5. Method Options and Defaults
   All options have defined defaults. Override per method call.

6. Supported Schemas
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

7. Supported YAML Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp,
   !!omap, !!pairs, !!set, !!str, !!seq, !!map

8. Caveats
   Objects/arrays as keys are stringified. Anchors with duplicate keys throw exceptions.

## Supplementary Details
• Default schemas derive from YAML1.2 spec; JSON_SCHEMA/Core allow JSON notation variations (e.g. Null, NULL, binary integer prefixes).
• Use json:true to override duplicate-key errors by last-value-wins behavior.
• To skip unsupported types on dump (RegExp, Function), set skipInvalid:true.
• For compact YAML output (URL params), set condenseFlow:true and adjust flowLevel to 0.
• To force quoting of every non-key string, set forceQuotes:true and quotingType: '"'.
• Implement custom replacer analogous to JSON.stringify for transforming values.
• onWarning callback prototype: function warningHandler(warning: YAMLException) { /* log or collect warnings */ }
• Error stack trace for CLI: use --trace flag.


## Reference Details
### Method Signatures

```js
// Load single document
yaml.load(input: string, options?: {
  filename?: string|null,
  onWarning?: ((warning: YAMLException) => void)|null,
  schema?: Schema,
  json?: boolean
}): any

// Load multiple documents
yaml.loadAll(input: string, iterator?: (doc: any) => void, options?: {
  filename?: string|null,
  onWarning?: ((warning: YAMLException) => void)|null,
  schema?: Schema,
  json?: boolean
}): any[]

// Dump object to YAML string
yaml.dump(obj: any, options?: {
  indent?: number,
  noArrayIndent?: boolean,
  skipInvalid?: boolean,
  flowLevel?: number,
  styles?: Record<string,string>,
  schema?: Schema,
  sortKeys?: boolean|((a: string,b: string)=>number),
  lineWidth?: number,
  noRefs?: boolean,
  noCompatMode?: boolean,
  condenseFlow?: boolean,
  quotingType?: '"'|'\'',
  forceQuotes?: boolean,
  replacer?: (key: any, value: any) => any
}): string;
```

### Complete Code Examples

```js
const yaml = require('js-yaml');
const fs   = require('fs');

try {
  const content = fs.readFileSync('config.yml', 'utf8');
  const config = yaml.load(content, {
    filename: 'config.yml',
    onWarning: (warn) => console.warn('YAML Warning:', warn.message),
    schema: yaml.JSON_SCHEMA,
    json: true
  });
  console.log('Loaded config:', config);
} catch (e) {
  console.error('Failed to load YAML:', e.stack);
}

const obj = { name: 'test', items: [1,2,3], nested: { a: null } };
const yamlStr = yaml.dump(obj, {
  indent: 4,
  noArrayIndent: true,
  flowLevel: 1,
  styles: { '!!null': 'camelcase' },
  sortKeys: (a,b) => a.localeCompare(b),
  lineWidth: 120,
  noRefs: true,
  condenseFlow: true,
  quotingType: '"',
  forceQuotes: true
});
console.log(yamlStr);
```

### CLI Usage Patterns

- Inspect file with errors compact:
  js-yaml --compact settings.yml
- Full trace:
  js-yaml --trace settings.yml

### Configuration Options Effects

indent:
  Number of spaces per indent level in dump.
noArrayIndent:
  Prevent extra indent on sequence items.
skipInvalid:
  Omit pairs with unsupported types instead of throwing.
flowLevel:
  Threshold nesting level to switch to flow style.
sortKeys:
  Boolean or compare function to order keys in output.
condenseFlow:
  Remove spaces in flow collections for URL-friendly output.
quotingType:
  Define string quote style; affects non-printable fallback.
forceQuotes:
  Quote all strings regardless of content.
replacer:
  Transform values during serialization, signature like JSON.stringify.

### Best Practices

- Use SAFE_SCHEMA for untrusted input: yaml.load(str, { schema: yaml.FAILSAFE_SCHEMA })
- Always wrap load in try/catch and inspect YAMLException.message and marke
- Provide onWarning handler to capture non-fatal issues with custom tags
- For large objects, set noRefs:true to inline repeated structures

### Troubleshooting Procedures

1. Duplicate key error on load:
   - Enable json:true to override duplicates, or remove duplicates in source.
2. Unsupported type on dump:
   - Set skipInvalid:true or extend schema via js-yaml-js-types plugin.
3. Unexpected flow style:
   - Adjust flowLevel or set condenseFlow accordingly.
4. Error messages lacking context:
   - Pass filename option to include path in YAMLException.

### Commands and Expected Outputs

```bash
$ js-yaml config.yml
name: Example
list:
  - a
  - b

$ js-yaml --compact config.yml
YAMLException: duplicated mapping key at line 3, column 5:
    key: value
        ^

$ js-yaml --trace config.yml
YAMLException: duplicated mapping key
    at generateError (...)
    at loadDocuments (...)
    ...stack trace...
```

## Information Dense Extract
install: npm install js-yaml | import: const yaml = require('js-yaml')

load(input: string, {filename?:string|null= null, onWarning?:(YAMLException)=>void, schema?:Schema=DEFAULT_SCHEMA, json?:boolean=false}): any throws YAMLException

loadAll(input: string, iterator?:(any)=>void, opts?): any[]

dump(obj:any, {indent:number=2, noArrayIndent:boolean=false, skipInvalid:boolean=false, flowLevel:number=-1, styles:Record<tag,style>={}, schema:Schema=DEFAULT_SCHEMA, sortKeys:boolean|func=false, lineWidth:number=80, noRefs:boolean=false, noCompatMode:boolean=false, condenseFlow:boolean=false, quotingType:'"'|'\''='\'', forceQuotes:boolean=false, replacer?:(key,value)=>any}): string

schemas: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA

types: !!null,null; !!bool,boolean; !!int,number; !!float,number; !!binary,Buffer; !!timestamp,Date; !!omap,Array<[k,v]>; !!pairs,Array<[k,v]>; !!set,Object; !!str,string; !!seq,Array; !!map,Object

cli: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

best practices: use FAILSAFE_SCHEMA for untrusted; wrap load in try/catch; onWarning handler; skipInvalid for unsupported; flowLevel & condenseFlow for URL

troubleshoot: duplicate keys→json:true; skipInvalid→omit invalid; filename→context in errors; flags --compact/--trace for error verbosity

## Sanitised Extract
Table of Contents:
1. Installation
2. CLI Executable and Usage
3. Import Statement
4. API Methods
   4.1 load(string, options)
   4.2 loadAll(string, iterator, options)
   4.3 dump(object, options)
5. Method Options and Defaults
6. Supported Schemas
7. Supported YAML Types
8. Caveats

1. Installation
   npm install js-yaml

2. CLI Executable and Usage
   npm install -g js-yaml
   Usage: js-yaml [-h] [-v] [-c] [-t] file
   Flags:
     -h, --help     Show help
     -v, --version  Show version
     -c, --compact  Compact error output
     -t, --trace    Stack trace on error

3. Import Statement
   const yaml = require('js-yaml');
   const fs   = require('fs');

4. API Methods
  4.1 load(string, options)
    - Returns: Object|string|number|null|undefined
    - Throws: YAMLException
    - Options:
        filename: string|null (default null)
        onWarning: (YAMLException)  void (default null)
        schema: Schema (DEFAULT_SCHEMA)
        json: boolean (default false)
  4.2 loadAll(string, iterator, options)
    - Returns: any[] or applies iterator(doc)
    - Iterator signature: (doc: any)  void
    - Same options as load
  4.3 dump(object, options)
    - Returns: string
    - Options:
        indent: number = 2
        noArrayIndent: boolean = false
        skipInvalid: boolean = false
        flowLevel: number = -1
        styles: Record<string,string> = {}
        schema: Schema = DEFAULT_SCHEMA
        sortKeys: boolean|((a,b)=>number) = false
        lineWidth: number = 80
        noRefs: boolean = false
        noCompatMode: boolean = false
        condenseFlow: boolean = false
        quotingType: ' or ' = ''''
        forceQuotes: boolean = false
        replacer: (key,value) => any

5. Method Options and Defaults
   All options have defined defaults. Override per method call.

6. Supported Schemas
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

7. Supported YAML Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp,
   !!omap, !!pairs, !!set, !!str, !!seq, !!map

8. Caveats
   Objects/arrays as keys are stringified. Anchors with duplicate keys throw exceptions.

## Original Source
Configuration File and Environment Variables Libraries
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# Installation

YAML module for Node.js

    npm install js-yaml

# CLI Executable

Global install for CLI usage:

    npm install -g js-yaml

Usage:

    js-yaml [-h] [-v] [-c] [-t] file

Positional arguments:
  file           File with YAML document(s)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -t, --trace    Show stack trace on error

# Import

    const yaml = require('js-yaml');
    const fs   = require('fs');

# Primary Methods

## load(string[, options])

Parses a single YAML document. Returns plain object, string, number, null, or undefined; throws YAMLException on error.

**Signature:**

    yaml.load(string, options?) → any | throws YAMLException

**Options:**

  • filename (string|null)       Default: null
  • onWarning (function|null)   Default: null
  • schema (Schema)             Default: DEFAULT_SCHEMA
  • json (boolean)              Default: false

**Schemas:**

  • FAILSAFE_SCHEMA
  • JSON_SCHEMA
  • CORE_SCHEMA
  • DEFAULT_SCHEMA

## loadAll(string[, iterator][, options])

Parses multi-document YAML. Returns array of documents or applies iterator to each document.

**Signature:**

    yaml.loadAll(string, iterator?, options?) → any[]

## dump(object[, options])

Serializes object to YAML string. Throws on invalid types unless skipInvalid=true.

**Signature:**

    yaml.dump(object, options?) → string

**Options:**

  • indent (number)             Default: 2
  • noArrayIndent (boolean)     Default: false
  • skipInvalid (boolean)       Default: false
  • flowLevel (number)          Default: -1
  • styles (Object)             Default: {}
  • schema (Schema)             Default: DEFAULT_SCHEMA
  • sortKeys (boolean|function) Default: false
  • lineWidth (number)          Default: 80
  • noRefs (boolean)            Default: false
  • noCompatMode (boolean)      Default: false
  • condenseFlow (boolean)      Default: false
  • quotingType (' or ")       Default: '
  • forceQuotes (boolean)       Default: false
  • replacer (function)         Default: undefined

# Supported Types

| Tag        | JavaScript Type                         |
|------------|-----------------------------------------|
| !!null     | null                                    |
| !!bool     | boolean                                 |
| !!int      | number                                  |
| !!float    | number                                  |
| !!binary   | Buffer                                  |
| !!timestamp| Date                                    |
| !!omap     | Array<[key,value]>                      |
| !!pairs    | Array<[key,value]>                      |
| !!set      | Object with null values                 |
| !!str      | string                                  |
| !!seq      | Array                                   |
| !!map      | Object                                  |

# JavaScript-specific Tags

Use https://github.com/nodeca/js-yaml-js-types for extra types (e.g., RegExp, Function).

# Caveats

• Objects or arrays as keys are stringified via toString().

• Implicit block mapping keys with anchors and aliases may produce duplicate-key exceptions.

# Retrieval Metadata

- Date Retrieved: 2024-06-05
- Data Size: 656477 bytes
- Links Found: 4956

## Attribution
- Source: Configuration File and Environment Variables Libraries
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-11T09:26:48.437Z
- Data Size: 656477 bytes
- Links Found: 4956

## Retrieved
2025-05-11
