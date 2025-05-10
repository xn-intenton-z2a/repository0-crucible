# DOTENV

## Crawl Summary
npm install dotenv --save; yarn add dotenv; bun add dotenv; place .env in project root; call require('dotenv').config(options) or import 'dotenv/config' early; supports multiline values with literal breaks or \n escapes; comments start at #; use dotenv.parse(src[, {debug}]) to extract key/values; preload via node -r dotenv/config and CLI options dotenv_config_path, dotenv_config_debug; override settings via DOTENV_CONFIG_<OPTION> environment variables; config options: path (string|string[], default './.env'), encoding (string, default 'utf8'), debug (boolean, default false), override (boolean, default false), processEnv (object, default process.env)

## Normalised Extract
Table of Contents:
1 Installation
2 .env File Usage
3 Loading Variables
4 Multiline Values
5 Comments
6 Parsing Engine
7 CLI Preload
8 Configuration Options
9 API Functions
10 CLI Env Variables

1 Installation
run npm install dotenv --save; or yarn add dotenv; or bun add dotenv

2 .env File Usage
Place .env in project root
Define S3_BUCKET="YOURS3BUCKET" SECRET_KEY="YOURSECRETKEY" pairs

3 Loading Variables
As early as possible import using import 'dotenv/config' or call require('dotenv').config()
process.env populated with .env keys

4 Multiline Values
Use literal line breaks inside double quotes (>= v15.0.0) or \n escapes

5 Comments
Lines starting with # or inline after a value
Wrap values containing # in quotes

6 Parsing Engine
Call dotenv.parse(src, { debug? }) where src is Buffer or string
Returns object mapping keys to values

7 CLI Preload
Command: node -r dotenv/config script.js
Pass dotenv_config_path=/custom/path and dotenv_config_debug=true after script name or as env vars

8 Configuration Options
path: string|string[] default '.env'
encoding: string default 'utf8'
debug: boolean default false
override: boolean default false
processEnv: object default process.env

9 API Functions
config(options)
parse(src, options)
populate(target, parsed, options)

10 CLI Env Variables
DOTENV_CONFIG_PATH
DOTENV_CONFIG_ENCODING
DOTENV_CONFIG_DEBUG
DOTENV_CONFIG_OVERRIDE

## Supplementary Details
Configuration defaults: path resolved to process.cwd()/.env; encoding 'utf8'; debug false; override false; processEnv = process.env
Override behavior: without override existing env keys preserved; with override loaded keys replace
Pass array of paths to load multiple files in order
Debug flag prints parsing and population steps to console
processEnv option allows redirecting loaded values into a custom object
Preload CLI usage: node -r dotenv/config app.js dotenv_config_path=/path/to/.env dotenv_config_debug=true
CLI arg precedence: command line dotenv_config_<option> args override DOTENV_CONFIG_<OPTION> env vars
Populate usage: target object receives keys; options.override and options.debug apply
Parse usage: src string or Buffer in KEY=VAL format; options.debug logs malformed lines

## Reference Details
Interface DotenvConfigOptions {
  path?: string | string[] // default path.resolve(process.cwd(), '.env')
  encoding?: string // default 'utf8'
  debug?: boolean // default false
  override?: boolean // default false
  processEnv?: NodeJS.ProcessEnv // default process.env
}

Interface DotenvConfigOutput {
  parsed?: Record<string,string>
  error?: Error
}

function config(options?: DotenvConfigOptions): DotenvConfigOutput

Example:
const result = dotenv.config({ path: ['.env.local', '.env'], encoding: 'latin1', debug: process.env.DEBUG === 'true', override: true, processEnv: customEnv });
if (result.error) throw result.error;
console.log(result.parsed);

Interface DotenvParseOptions {
  debug?: boolean // default false
}

function parse(src: string | Buffer, options?: DotenvParseOptions): Record<string,string>

Example:
const buf = Buffer.from('BASIC=basic');
const parsed = dotenv.parse(buf, { debug: true }); // logs when format incorrect

Interface PopulateOptions {
  override?: boolean // default false
  debug?: boolean // default false
}

function populate<T extends object>(target: T, parsed: Record<string,string>, options?: PopulateOptions): void

Example:
const myEnv = { EXISTING: 'keep' };
dotenv.populate(myEnv, { NEW: 'value' }, { override: false, debug: true });
// myEnv.NEW == 'value'

CLI Preload:
node -r dotenv/config index.js dotenv_config_path=/path/.env dotenv_config_debug=true

Env var override:
DOTENV_CONFIG_PATH=/path/.env node -r dotenv/config index.js

Troubleshooting:
require('dotenv').config({ debug: true }) to output parsing logs

Webpack fix:
npm install node-polyfill-webpack-plugin
// webpack.config.js
require('dotenv').config()
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
plugins: [ new NodePolyfillPlugin(), new webpack.DefinePlugin({ 'process.env': { KEY: JSON.stringify(process.env.KEY) } }) ]

Best Practices:
Load dotenv before any module that uses process.env
Use import 'dotenv/config' entry for ESM
Manage per-environment .env files (.env.production, .env.local)
Do not commit .env to VCS

## Information Dense Extract
install npm i dotenv; usage require('dotenv').config({ path:string|string[], encoding:utf8, debug:false, override:false, processEnv:process.env }); functions config(options):{parsed?,error?}, parse(src[,{debug?}]):Record<string,string>, populate(target,parsed[,{override?,debug?}]):void; defaults path '.env', encoding 'utf8', debug=false, override=false; CLI preload via node -r dotenv/config script.js with dotenv_config_path, dotenv_config_encoding, dotenv_config_debug, dotenv_config_override or DOTENV_CONFIG_<OPTION>; multiline values supported literal or \n escapes; comments start at #; parse rules skip empty/comments, trim unquoted, maintain quotes; override flag last wins; debug logs operations; errors returned in config output; preload eliminates code require; populate allows custom target; webpack polyfill: node-polyfill-webpack-plugin; best practice load early

## Sanitised Extract
Table of Contents:
1 Installation
2 .env File Usage
3 Loading Variables
4 Multiline Values
5 Comments
6 Parsing Engine
7 CLI Preload
8 Configuration Options
9 API Functions
10 CLI Env Variables

1 Installation
run npm install dotenv --save; or yarn add dotenv; or bun add dotenv

2 .env File Usage
Place .env in project root
Define S3_BUCKET='YOURS3BUCKET' SECRET_KEY='YOURSECRETKEY' pairs

3 Loading Variables
As early as possible import using import 'dotenv/config' or call require('dotenv').config()
process.env populated with .env keys

4 Multiline Values
Use literal line breaks inside double quotes (>= v15.0.0) or 'n escapes

5 Comments
Lines starting with # or inline after a value
Wrap values containing # in quotes

6 Parsing Engine
Call dotenv.parse(src, { debug? }) where src is Buffer or string
Returns object mapping keys to values

7 CLI Preload
Command: node -r dotenv/config script.js
Pass dotenv_config_path=/custom/path and dotenv_config_debug=true after script name or as env vars

8 Configuration Options
path: string|string[] default '.env'
encoding: string default 'utf8'
debug: boolean default false
override: boolean default false
processEnv: object default process.env

9 API Functions
config(options)
parse(src, options)
populate(target, parsed, options)

10 CLI Env Variables
DOTENV_CONFIG_PATH
DOTENV_CONFIG_ENCODING
DOTENV_CONFIG_DEBUG
DOTENV_CONFIG_OVERRIDE

## Original Source
dotenv Environment Configuration
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# DOTENV Reference (Retrieved 2024-06-01)
Data Size: 1496603 bytes
Source: https://github.com/motdotla/dotenv#readme

# config
Signature: function config(options?: {
  path?: string | string[];
  encoding?: string;
  debug?: boolean;
  override?: boolean;
  processEnv?: NodeJS.ProcessEnv;
}): { parsed?: Record<string,string>; error?: Error }
Default options:
  path: path.resolve(process.cwd(), '.env')
  encoding: 'utf8'
  debug: false
  override: false
  processEnv: process.env

# parse
Signature: function parse(src: string | Buffer, options?: { debug?: boolean }): Record<string,string>
Default options:
  debug: false

# populate
Signature: function populate(target: object, parsed: Record<string,string>, options?: { override?: boolean; debug?: boolean }): void
Default options:
  override: false
  debug: false

# decrypt
Signature: function decrypt(data: Buffer | string, key?: string): Record<string,string>



## Attribution
- Source: dotenv Environment Configuration
- URL: https://github.com/motdotla/dotenv#readme
- License: License: BSD-2-Clause
- Crawl Date: 2025-05-10T04:39:16.761Z
- Data Size: 1496603 bytes
- Links Found: 7416

## Retrieved
2025-05-10
