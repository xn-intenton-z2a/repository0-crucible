# DOTENV

## Crawl Summary
Load .env file into process.env via require('dotenv').config(). Default options: path=path.resolve(cwd,'.env'), encoding='utf8', debug=false, override=false, processEnv=process.env. parse(src: Buffer|string, opt.debug=false) returns key/value object. populate(target, parsed, opt.override=false, opt.debug=false) assigns parsed keys. CLI preload via node -r dotenv/config supports dotenv_config_path and dotenv_config_debug flags or DOTENV_CONFIG_<OPTION> env variables. .env syntax: KEY=VALUE, multiline support via quotes or \n, comments start #. For advanced needs use dotenv-expand for variable expansion and dotenvx for multi-environment, encrypted, sync, and deploy workflows. Troubleshooting: config debug, file path, webpack polyfills.

## Normalised Extract
Table of Contents:
1. Installation
2. Configuration API
3. CLI Preload
4. Parse API
5. Populate API
6. .env File Syntax
7. Troubleshooting

1. Installation
npm install dotenv --save
or yarn add dotenv
or bun add dotenv

2. Configuration API
Function: require('dotenv').config(options)
Options:
  path: string or string[] (default path.resolve(process.cwd(),'.env'))
  encoding: string (default 'utf8')
  debug: boolean (default false)
  override: boolean (default false)
  processEnv: object (default process.env)
Returns: { parsed?: Record<string,string>, error?: Error }

3. CLI Preload
Command: node -r dotenv/config script.js
Flags:
  dotenv_config_path=/custom/path/.env
  dotenv_config_debug=true
Environment Variables:
  DOTENV_CONFIG_<OPTION>=value overrides flags

4. Parse API
Function: dotenv.parse(src, options)
src: string or Buffer containing env data
options:
  debug: boolean (default false)
Returns: Record<string,string>

5. Populate API
Function: dotenv.populate(target, source, options)
target: object to receive variables (e.g., process.env)
source: parsed key/value object
options:
  override: boolean (default false)
  debug: boolean (default false)
Returns: void

6. .env File Syntax
Entries: KEY=VALUE per line
Comments: lines starting with # or inline after values
Quoted values preserve inner whitespace; double quotes expand newlines
Multiline values: use literal line breaks inside quotes or \n escapes
Backtick delimiters supported
Empty values produce empty strings

7. Troubleshooting
If .env is not loaded:
  require('dotenv').config({ debug: true })
If React variables missing, prefix with REACT_APP_
Webpack front-end error crypto|os|path:
  npm install node-polyfill-webpack-plugin
  add NodePolyfillPlugin to webpack.config.js

## Supplementary Details
Default parameter values:
path: path.resolve(process.cwd(), '.env')
encoding: 'utf8'
debug: false (use for verbose parsing/populating logs)
override: false (set true to overwrite existing environment variables)
processEnv: process.env (overwrite target if custom object provided)

Implementation Steps:
1. Place .env in project root or working directory.
2. Install dotenv via npm, yarn, or bun.
3. Early in app entry point call require('dotenv').config(opts) or import 'dotenv/config'.
4. Access variables via process.env.KEY.
5. For advanced parsing use dotenv.parse(), then manually assign via dotenv.populate().
6. Use CLI preload to avoid explicit require in code.

Multi-environment & Encryption (via dotenvx):
• Use dotenvx run --env-file=.env.production -- node index.js
• Use dotenvx set KEY value --encrypt -f .env.production
• Provide DOTENV_PRIVATE_KEY_ENV to CLI for decryption

## Reference Details
### API Specifications

#### config(options?: ConfigOptions) => ConfigOutput
```ts
interface ConfigOptions {
  path?: string | string[];
  encoding?: string;
  debug?: boolean;
  override?: boolean;
  processEnv?: Record<string,string>;
}
interface ConfigOutput {
  parsed?: Record<string,string>;
  error?: Error;
}
```
- Defaults:
  path = path.resolve(process.cwd(), '.env')
  encoding = 'utf8'
  debug = false
  override = false
  processEnv = process.env

##### Example:
```js
const result = require('dotenv').config({
  path: ['/app/.env.local', '/app/.env'],
  encoding: 'latin1',
  debug: process.env.DEBUG === 'true',
  override: true
});
if (result.error) {
  console.error('Failed to load .env:', result.error);
  process.exit(1);
}
console.log('Loaded env:', result.parsed);
```

#### parse(src: string | Buffer, options?: { debug?: boolean }) => Record<string,string>
- Accepts raw env content as string or Buffer
- Returns key/value object
- Options.debug enables parse error logs

##### Example:
```js
const fs = require('fs');
const dotenv = require('dotenv');
const content = fs.readFileSync('.env');
const parsed = dotenv.parse(content, { debug: true });
console.log(parsed);
```

#### populate(target: object, source: Record<string,string>, options?: { override?: boolean; debug?: boolean; }) => void
- Copies source entries into target
- override=true overwrites existing keys
- debug=true logs each assignment

##### Example:
```js
const dotenv = require('dotenv');
const parsed = { API_URL: 'https://api' };
dotenv.populate(process.env, parsed, { override: true, debug: true });
console.log(process.env.API_URL);
```

### CLI Preload Patterns
```bash
# Preload dotenv without code
node -r dotenv/config index.js
# with options
node -r dotenv/config index.js dotenv_config_path=/config/.env dotenv_config_debug=true
# via env vars
DOTENV_CONFIG_PATH=/config/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config index.js
```

### .env File Syntax and Rules
- KEY=VALUE pairs
environment lines trimmed
- Comments start at # outside quotes
- Empty values produce ''
- Quoted values preserve whitespace
double quotes expand newlines
templated lines supported by dotenvx

### Best Practices
1. Add require('dotenv').config() at top of entry file
2. Use override only when safe to overwrite existing env
3. Validate required vars at startup
4. Do not commit .env to VCS

### Troubleshooting Procedures
1. .env not loaded:
   ```js
   const result = require('dotenv').config({ debug: true });
   if (result.error) console.error(result.error);
   ```
2. React missing vars: prefix REACT_APP_
3. Webpack missing crypto/polyfill:
   ```bash
   npm install node-polyfill-webpack-plugin
   ```
   ```js
   // webpack.config.js
   const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
   module.exports = { plugins: [new NodePolyfillPlugin()] };
   ```
4. Prevent .env commit in Docker builds:
   ```dockerfile
   RUN curl -fsS https://dotenvx.sh/ | sh && dotenvx prebuild
   ```

### Git Hook to Prevent .env Commit
```bash
brew install dotenvx/brew/dotenvx
dotenvx precommit --install
```

## Information Dense Extract
config(options:{path=string|string[]=path.resolve(cwd,'.env'),encoding='utf8',debug=false,override=false,processEnv=process.env})=>{parsed?:Record<string,string>,error?:Error} parse(src:string|Buffer,options:{debug=false})=>Record<string,string> populate(target:object,source:Record<string,string>,options:{override=false,debug=false})=>void CLI preload: node -r dotenv/config [dotenv_config_path=PATH dotenv_config_debug=true] or set DOTENV_CONFIG_<OPTION>=value .env syntax: KEY=VALUE, comments #, multilines via quoted blocks or \n, quoted values preserve whitespace, backticks supported, empty values->''. Best practices: load early, one .env per env, never commit .env. Troubleshoot with config debug, validate path, prefix REACT_APP_, add node-polyfill-webpack-plugin for webpack.

## Sanitised Extract
Table of Contents:
1. Installation
2. Configuration API
3. CLI Preload
4. Parse API
5. Populate API
6. .env File Syntax
7. Troubleshooting

1. Installation
npm install dotenv --save
or yarn add dotenv
or bun add dotenv

2. Configuration API
Function: require('dotenv').config(options)
Options:
  path: string or string[] (default path.resolve(process.cwd(),'.env'))
  encoding: string (default 'utf8')
  debug: boolean (default false)
  override: boolean (default false)
  processEnv: object (default process.env)
Returns: { parsed?: Record<string,string>, error?: Error }

3. CLI Preload
Command: node -r dotenv/config script.js
Flags:
  dotenv_config_path=/custom/path/.env
  dotenv_config_debug=true
Environment Variables:
  DOTENV_CONFIG_<OPTION>=value overrides flags

4. Parse API
Function: dotenv.parse(src, options)
src: string or Buffer containing env data
options:
  debug: boolean (default false)
Returns: Record<string,string>

5. Populate API
Function: dotenv.populate(target, source, options)
target: object to receive variables (e.g., process.env)
source: parsed key/value object
options:
  override: boolean (default false)
  debug: boolean (default false)
Returns: void

6. .env File Syntax
Entries: KEY=VALUE per line
Comments: lines starting with # or inline after values
Quoted values preserve inner whitespace; double quotes expand newlines
Multiline values: use literal line breaks inside quotes or 'n escapes
Backtick delimiters supported
Empty values produce empty strings

7. Troubleshooting
If .env is not loaded:
  require('dotenv').config({ debug: true })
If React variables missing, prefix with REACT_APP_
Webpack front-end error crypto|os|path:
  npm install node-polyfill-webpack-plugin
  add NodePolyfillPlugin to webpack.config.js

## Original Source
dotenv
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Dotenv README Digest
Retrieved: 2024-06-30
Data Size: 643985 bytes
Source: https://github.com/motdotla/dotenv#readme

# Installation

npm install dotenv --save

yarn add dotenv

bun add dotenv

# Basic Usage

1. Create a .env file in your project root:
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
2. In CommonJS:
   require('dotenv').config()
3. In ES Modules:
   import 'dotenv/config'
4. process.env now contains defined variables.

# Multiline Values

Supported >= v15.0.0:

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"

Or escape newlines:

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

# Comments

# Lines starting with # are comments
SECRET_KEY=KEY # inline comment
SECRET_HASH="value-with-#-inside"

# Parsing Engine

const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf)   // returns { BASIC: 'basic' }

# Preload via CLI

$ node -r dotenv/config your_script.js
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/.env dotenv_config_debug=true
$ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config index.js

# API Reference

## config(options?)
Signature: config(options?: { path?: string|string[], encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }) => { parsed?: Record<string,string>, error?: Error }

## parse(src, opt?)
Signature: parse(src: string|Buffer, opt?: { debug?: boolean }) => Record<string,string>

## populate(target, source, opt?)
Signature: populate(target: object, source: Record<string,string>, opt?: { override?: boolean, debug?: boolean }) => void

# Options Defaults

path: path.resolve(process.cwd(), '.env')
encoding: 'utf8'
debug: false
override: false
processEnv: process.env

# Troubleshooting

.env not loading: require('dotenv').config({ debug: true })
Webpack front-end missing polyfills: npm install node-polyfill-webpack-plugin
Add in webpack.config.js:
  new NodePolyfillPlugin(),

# Best Practices

• Load dotenv as early as possible.
• Do not commit .env to version control.
• Use one .env per environment.


## Attribution
- Source: dotenv
- URL: https://github.com/motdotla/dotenv#readme
- License: BSD-2-Clause
- Crawl Date: 2025-05-03T12:58:46.894Z
- Data Size: 643985 bytes
- Links Found: 4989

## Retrieved
2025-05-03
