# DOTENV_LIBRARY

## Crawl Summary
Installation command; .env file format rules (single/multiline, comments); API method signatures for config, parse, populate, decrypt with all options and defaults; preload via node -r; CLI config var mappings; ES module import; order-of-loading and override semantics.

## Normalised Extract
Table of Contents
1 Installation
2 .env File Syntax
3 API Methods
  3.1 config
  3.2 parse
  3.3 populate
  3.4 decrypt
4 Preload Mode
5 Configuration Variables
6 Examples

1 Installation
  Run: npm install dotenv --save

2 .env File Syntax
  • KEY=VALUE pairs
  • Multiline: wrap value in double quotes and include line breaks
  • Comments: start with #; wrap values containing # in quotes

3 API Methods
  3.1 config(options?: {path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}): {parsed?:object,error?:Error}
    - path: custom .env file or list of files
    - encoding: utf8|latin1|...
    - debug: boolean
    - override: boolean
    - processEnv: target object
    - Returns parsed key or error

  3.2 parse(src:string|Buffer,options?:{debug?:boolean}): object
    - Returns key/value mapping

  3.3 populate(target:object,source:object,options?:{override?:boolean,debug?:boolean}): void

  3.4 decrypt(input:string|Buffer,options?): object

4 Preload Mode
  • CLI: node -r dotenv/config your_script.js

5 Configuration Variables
  • DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_OVERRIDE
  • CLI args precedence > env vars

6 Examples
  • ESM: import 'dotenv/config'
  • Multiple files: path: ['.env.local','.env']
  • Custom target: processEnv=myEnv

## Supplementary Details
Implementation Steps
1 Create a .env in project root
2 Add key=values; use double quotes for special chars or multiline
3 At application entry, call require('dotenv').config(options) or import 'dotenv/config'
4 Inspect result.parsed or catch result.error
5 For Buffer sources, use dotenv.parse(buffer, {debug:true})
6 For populating custom object, use dotenv.populate(customTarget, parsed, {override:true,debug:true})
7 For encrypted files or multi-env, integrate dotenvx per its docs
Exact Defaults
path: process.cwd() + '/.env'
encoding: 'utf8'
debug: false
override: false
processEnv: process.env
Population override: false
decrypt: requires dotenvx

## Reference Details
API Specifications

config(options)
- parameters:
    options.path?: string | string[]      Default: [cwd + '/.env']
    options.encoding?: string             Default: 'utf8'
    options.debug?: boolean               Default: false
    options.override?: boolean            Default: false
    options.processEnv?: Record<string,string> Default: process.env
- returns: { parsed?: Record<string,string>; error?: Error }

parse(src, options)
- parameters:
    src: string | Buffer
    options.debug?: boolean               Default: false
- returns: Record<string,string>

populate(target, source, options)
- parameters:
    target: object
    source: object
    options.override?: boolean            Default: false
    options.debug?: boolean               Default: false
- returns: void

decrypt(input, options)
- parameters: input: string|Buffer, options: {}  // See dotenvx documentation
- returns: Record<string,string>

Full Code Examples

// Basic load
const result = require('dotenv').config({path:['.env.local','.env'],override:true,debug:true});
if (result.error) throw result.error;
console.log(result.parsed);

// Preload mode
// $ node -r dotenv/config -d your_script.js

// Parse example
const buf = Buffer.from('KEY=VALUE');
const parsed = require('dotenv').parse(buf, {debug:true});

// Populate custom
const target = {};
const src = {HELLO:'world'};
require('dotenv').populate(target, src, {override:true,debug:true});

// Webpack polyfill for front-end
require('dotenv').config();
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// webpack.config.js plugin section
// new NodePolyfillPlugin(), new webpack.DefinePlugin({'process.env':{HELLO:JSON.stringify(process.env.HELLO)}})

// React environment: prefix with REACT_APP_

Best Practices
• Keep .env out of source control
• One file per environment: .env, .env.production, etc.
• Use override cautiously

Troubleshooting
$ require('dotenv').config({debug:true}) // to enable diagnostics
React variables not present: prefix with REACT_APP_
Webpack front-end errors: add node-polyfill-webpack-plugin or use dotenv-webpack

## Information Dense Extract
install: npm install dotenv ; .env syntax: KEY=VALUE, multiline quotes, # comments; API: config({path:string|[],encoding:string,debug:boolean,override:boolean,processEnv:object})→{parsed?,error?}, parse(src, {debug?})→obj, populate(target,source,{override?,debug?}), decrypt via dotenvx; defaults: path='./.env',encoding='utf8',debug=false,override=false,processEnv=process.env; preload: node -r dotenv/config; env vars: DOTENV_CONFIG_PATH,ENCODING,DEBUG,OVERRIDE; examples: path array override, custom processEnv; webpack polyfill plugin; prefix REACT_APP_ for front-end

## Sanitised Extract
Table of Contents
1 Installation
2 .env File Syntax
3 API Methods
  3.1 config
  3.2 parse
  3.3 populate
  3.4 decrypt
4 Preload Mode
5 Configuration Variables
6 Examples

1 Installation
  Run: npm install dotenv --save

2 .env File Syntax
   KEY=VALUE pairs
   Multiline: wrap value in double quotes and include line breaks
   Comments: start with #; wrap values containing # in quotes

3 API Methods
  3.1 config(options?: {path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}): {parsed?:object,error?:Error}
    - path: custom .env file or list of files
    - encoding: utf8|latin1|...
    - debug: boolean
    - override: boolean
    - processEnv: target object
    - Returns parsed key or error

  3.2 parse(src:string|Buffer,options?:{debug?:boolean}): object
    - Returns key/value mapping

  3.3 populate(target:object,source:object,options?:{override?:boolean,debug?:boolean}): void

  3.4 decrypt(input:string|Buffer,options?): object

4 Preload Mode
   CLI: node -r dotenv/config your_script.js

5 Configuration Variables
   DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_OVERRIDE
   CLI args precedence > env vars

6 Examples
   ESM: import 'dotenv/config'
   Multiple files: path: ['.env.local','.env']
   Custom target: processEnv=myEnv

## Original Source
Dotenv Configuration Library
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV_LIBRARY

# Installation

Run the following in your project root to install:

npm install dotenv --save

# .env File Syntax

- Key-value pairs in plain text, one per line:
  S3_BUCKET="YOURS3BUCKET"
  SECRET_KEY="YOURSECRETKEYGOESHERE"
- Multiline values supported (>= v15.0.0):
  PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
  ...
  -----END RSA PRIVATE KEY-----"
- Inline comments after #: SECRET_KEY=VALUE # comment
  Quotes required if value contains #.

# API Reference

## config(options?)
Signature:
```js
config(options?: {
  path?: string | string[]            // Default: process.cwd() + '/.env'
  encoding?: string                  // Default: 'utf8'
  debug?: boolean                    // Default: false
  override?: boolean                 // Default: false
  processEnv?: Record<string,string> // Default: process.env
}): { parsed?: Record<string,string>; error?: Error }
```
Options:
- path: single path or array of paths parsed in order; first wins unless override=true
- encoding: file encoding
- debug: prints parse and load diagnostics to console
- override: replace existing processEnv values
- processEnv: target object for assignment

## parse(input, options?)
Signature:
```js
parse(src: string | Buffer, options?: {
  debug?: boolean // Default: false
}): Record<string,string>
```
Returns an object of KEY→VALUE without assigning to process.env.

## populate(target, source, options?)
Signature:
```js
populate(target: object, source: object, options?: {
  override?: boolean // Default: false
  debug?: boolean    // Default: false
}): void
```
Writes key/value from source into target following override rule.

## decrypt(file, options?)
Signature:
```js
decrypt(input: string | Buffer, options?: {
  // decrypt options for encrypted .env files (requires dotenvx)
}): Record<string,string>
```

# Preload Mode

Preload without code modification:

node -r dotenv/config your_script.js

Supported CLI environment config vars:
- DOTENV_CONFIG_PATH
- DOTENV_CONFIG_ENCODING
- DOTENV_CONFIG_DEBUG
- DOTENV_CONFIG_OVERRIDE
- DOTENV_CONFIG_ENCODING
- DOTENV_CONFIG_PATH

# Examples

ESM:
```js
import 'dotenv/config'
```

Multiple files:
```js
require('dotenv').config({ path: ['.env.local', '.env'], override: true })
```

Custom processEnv target:
```js
const myEnv = {}
require('dotenv').config({ processEnv: myEnv })
```


## Attribution
- Source: Dotenv Configuration Library
- URL: https://github.com/motdotla/dotenv#readme
- License: MIT License
- Crawl Date: 2025-05-06T21:28:08.769Z
- Data Size: 649569 bytes
- Links Found: 5170

## Retrieved
2025-05-06
