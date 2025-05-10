# DOTENV

## Crawl Summary
Installation commands for npm/yarn/bun; .env file format rules including multiline values and comments; Loading variables via require('dotenv').config() or import 'dotenv/config'; API functions: config(options) returning {parsed, error}, parse(source, options) returning object, populate(target, source, options), decrypt(options); Configuration options: path (string|array paths, default .env), encoding (string, default utf8), debug (boolean, default false), override (boolean, default false), processEnv (object, default process.env); Preload via CLI using node -r dotenv/config with dotenv_config_<option> flags or DOTENV_CONFIG_<OPTION> environment variables; Parsing engine rules: skip empty lines, ignore comments, maintain quoted content, expand newlines in double-quoted values; Troubleshooting via debug mode and file path verification.

## Normalised Extract
Table of Contents:
1 Installation
2 .env File Format
3 Loading Environment Variables
4 Multiline Variables
5 Comments
6 Parsing Engine
7 Preload Usage
8 Configuration Options
9 API Functions

1 Installation
   npm install dotenv --save
   yarn add dotenv
   bun add dotenv

2 .env File Format
   - Format: KEY=value
   - String values: unquoted or quoted
   - Empty values: KEY=
   - Preserve inner quotes: JSON={"foo": "bar"}

3 Loading Environment Variables
   require('dotenv').config()
   import 'dotenv/config'
   Variables exposed under process.env

4 Multiline Variables
   Native line breaks supported in double quotes
   Or use \n escapes

5 Comments
   Full-line: # comment
   Inline: KEY=value # comment
   Wrap values in quotes if containing #

6 Parsing Engine
   Function: dotenv.parse(src: Buffer|string, options?: {debug?: boolean}) => Record<string,string>
   Rules: skip blank lines, comment detection, trim unquoted values, expand newlines in double quotes, support backticks

7 Preload Usage
   CLI: node -r dotenv/config your_script.js
   Flags: dotenv_config_path, dotenv_config_encoding, dotenv_config_debug
   Env Vars: DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG

8 Configuration Options
   config(options?: {
     path?: string|string[], // default process.cwd()/.env
     encoding?: string,       // default 'utf8'
     debug?: boolean,         // default false
     override?: boolean,      // default false
     processEnv?: object      // default process.env
   }) => {parsed: Record<string,string>, error?: Error}

9 API Functions
   config(options)
   parse(src, options)
   populate(target: object, source: Record<string,string>, options?: {override?: boolean, debug?: boolean}): void
   decrypt(options): {parsed: Record<string,string>, error?: Error}

## Supplementary Details
CLI Preload Patterns:
- node -r dotenv/config script.js: auto-load .env
- dotenv_config options via dotenv_config_<option>=value flags precedence: CLI flags > ENV vars

Environment Variables for CLI:
- DOTENV_CONFIG_PATH: custom .env path
- DOTENV_CONFIG_ENCODING: latin1, utf8, etc.
- DOTENV_CONFIG_DEBUG: enable parser debug

Parsing Implementation Steps:
1 Read file using fs.readFileSync(path, {encoding})
2 Parse content with dotenv.parse(buffer, {debug})
3 Populate process.env or provided processEnv object
4 Apply override logic: skip existing unless override=true

Encryption and Sync Compatibility:
- Use external dotenvx for encrypted, multi-environment and sync workflows

## Reference Details
Function Signatures:
1 config
   Signature: config(options?: ConfigOptions) => ConfigResult
   Types:
     interface ConfigOptions {
       path?: string|string[]        // default path.resolve(process.cwd(), '.env')
       encoding?: string             // default 'utf8'
       debug?: boolean               // default false
       override?: boolean            // default false
       processEnv?: object           // default process.env
     }
     interface ConfigResult {
       parsed?: Record<string,string>
       error?: Error
     }
   Behavior: Reads file(s) at specified path(s) in order, parses each, merges into processEnv with override rules, returns parsed map or error.

2 parse
   Signature: parse(src: Buffer|string, options?: {debug?: boolean}) => Record<string,string>
   Options:
     debug: boolean // default false
   Returns: key-value map
   Errors: throws on invalid input when debug enabled

3 populate
   Signature: populate(target: object, source: Record<string,string>, options?: {override?: boolean, debug?: boolean}): void
   Options:
     override: boolean // default false
     debug: boolean    // default false
   Behavior: writes each key from source into target; skips existing keys unless override=true; logs if debug=true

4 decrypt
   Signature: decrypt(options: DecryptOptions) => ConfigResult
   Placeholder: part of dotenvx extension; not core to dotenv

Examples:
// Custom path and override
const result = require('dotenv').config({ path: ['.env.local', '.env'], override: true, debug: true })
if (result.error) throw result.error
console.log(result.parsed)

// Using parse
const buf = Buffer.from('A=1\nB=2')
const data = require('dotenv').parse(buf)
console.log(data.A, data.B)

// populate with custom object
const myEnv = {}
require('dotenv').populate(myEnv, data, {override:true})

Configuration Examples:
processEnv override:
const custom = {}
require('dotenv').config({processEnv: custom})

Troubleshooting:
1 Ensure .env exists at cwd or provided path
2 Enable debug: require('dotenv').config({debug:true}) to view parsing logs
3 For ES modules, use import 'dotenv/config'
4 For client-side builds, use webpack DefinePlugin or dotenv-webpack
5 Missing polyfills: install node-polyfill-webpack-plugin and configure

Debug Output Example:
> malformed line 1 at .env: skipping
> parsed 5 variables

Best Practices:
- Do not commit .env to VCS
- Create separate .env files per environment
- Use override sparingly
- Secure .env with git hooks or CI integration

## Information Dense Extract
dotenv.config(options?:{path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}):{parsed?:Record<string,string>,error?:Error}
dotenv.parse(src:Buffer|string,options?:{debug?:boolean}):Record<string,string>
dotenv.populate(target:object,source:Record<string,string>,options?:{override?:boolean,debug?:boolean}):void
enable preload: node -r dotenv/config script.js
env flags: dotenv_config_path,dotenv_config_encoding,dotenv_config_debug or DOTENV_CONFIG_PATH,ENCODING,DEBUG
.env rules: KEY=value, support quotes, backticks, skip comments(#), expand \n in double quotes, trim unquoted
config lookup: first in process.env unless override=true then last wins
supports multiple paths array order merge
multiline via native breaks or \n escapes

## Sanitised Extract
Table of Contents:
1 Installation
2 .env File Format
3 Loading Environment Variables
4 Multiline Variables
5 Comments
6 Parsing Engine
7 Preload Usage
8 Configuration Options
9 API Functions

1 Installation
   npm install dotenv --save
   yarn add dotenv
   bun add dotenv

2 .env File Format
   - Format: KEY=value
   - String values: unquoted or quoted
   - Empty values: KEY=
   - Preserve inner quotes: JSON={'foo': 'bar'}

3 Loading Environment Variables
   require('dotenv').config()
   import 'dotenv/config'
   Variables exposed under process.env

4 Multiline Variables
   Native line breaks supported in double quotes
   Or use 'n escapes

5 Comments
   Full-line: # comment
   Inline: KEY=value # comment
   Wrap values in quotes if containing #

6 Parsing Engine
   Function: dotenv.parse(src: Buffer|string, options?: {debug?: boolean}) => Record<string,string>
   Rules: skip blank lines, comment detection, trim unquoted values, expand newlines in double quotes, support backticks

7 Preload Usage
   CLI: node -r dotenv/config your_script.js
   Flags: dotenv_config_path, dotenv_config_encoding, dotenv_config_debug
   Env Vars: DOTENV_CONFIG_PATH, DOTENV_CONFIG_ENCODING, DOTENV_CONFIG_DEBUG

8 Configuration Options
   config(options?: {
     path?: string|string[], // default process.cwd()/.env
     encoding?: string,       // default 'utf8'
     debug?: boolean,         // default false
     override?: boolean,      // default false
     processEnv?: object      // default process.env
   }) => {parsed: Record<string,string>, error?: Error}

9 API Functions
   config(options)
   parse(src, options)
   populate(target: object, source: Record<string,string>, options?: {override?: boolean, debug?: boolean}): void
   decrypt(options): {parsed: Record<string,string>, error?: Error}

## Original Source
dotenv Environment Configuration
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Install

npm install dotenv --save

Alternatively:

yarn add dotenv
bun add dotenv

# Usage

1. Create a .env file in your project root:
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEY"

2. Load at application startup:
   require('dotenv').config()
   // or for ES6:
   import 'dotenv/config'

3. Access variables via process.env:
   const bucket = process.env.S3_BUCKET

# Multiline Values

Use native line breaks (>= v15.0.0):
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...line1
...line2
-----END RSA PRIVATE KEY-----"

Or escape newlines:
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nline1\nline2\n-----END RSA PRIVATE KEY-----\n"

# Comments

- Full-line comments start with '#'.
- Inline comments supported after a space: KEY=value # comment
- Wrap values in quotes if they contain '#'.

# Parsing Engine

Import parse:
const dotenv = require('dotenv')
const buf = Buffer.from('KEY=value')
const parsed = dotenv.parse(buf, {debug:true}) // returns {KEY: 'value'}

Options:
- debug (boolean): false by default, logs malformed lines.

# Preload CLI

$ node -r dotenv/config your_script.js

Supported CLI env vars and flags:
- dotenv_config_path: custom .env path
- dotenv_config_encoding: file encoding (default utf8)
- dotenv_config_debug: enable debug
Examples:
$ node -r dotenv/config script.js dotenv_config_path=/custom/.env dotenv_config_debug=true
$ DOTENV_CONFIG_PATH=/custom/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config script.js


## Attribution
- Source: dotenv Environment Configuration
- URL: https://github.com/motdotla/dotenv#readme
- License: License: BSD-2-Clause
- Crawl Date: 2025-05-10T05:33:34.982Z
- Data Size: 638828 bytes
- Links Found: 4987

## Retrieved
2025-05-10
