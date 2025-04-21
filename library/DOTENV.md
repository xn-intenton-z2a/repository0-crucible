# DOTENV

## Crawl Summary
Install and use dotenv to load environment variables from a .env file into process.env. The module supports multiline values, inline comments, a robust parsing engine with rules for trimming and preserving quotes, and utility functions to handle variable expansion and command substitution. Preloading via command-line options and environment-based configurations (like encoding, debug mode, override) are supported. Examples cover configuration through multiple files and secure deployments with encryption using dotenvx.

## Normalised Extract
## Table of Contents
1. Installation
2. Usage
3. Multiline Values
4. Comments
5. Parsing Engine
6. Preload & CLI Configuration
7. Variable Expansion & Command Substitution
8. Syncing & Multiple Environments
9. Deploying with Encryption
10. API Functions

---

### 1. Installation
- npm: `npm install dotenv --save`
- yarn: `yarn add dotenv`
- bun: `bun add dotenv`

### 2. Usage
- Create a `.env` file with key-value pairs.
- Import using `require('dotenv').config()` or `import 'dotenv/config'`.

Example:
```javascript
require('dotenv').config();
console.log(process.env);
```

### 3. Multiline Values
- Use literal line breaks or \n characters for multiline values.

Example:
```dotenv
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
```

### 4. Comments
- Comment lines start with `#`.
- Inline comments require the value to be quoted if it contains a `#`.

### 5. Parsing Engine
- Function: `dotenv.parse(input, options?)`
- Accepts String or Buffer. Returns an Object mapping keys to values.

Example:
```javascript
const config = dotenv.parse(Buffer.from('BASIC=basic'));
```

### 6. Preload & CLI Configuration
- Preload with `node -r dotenv/config script.js`.
- Command-line configuration options: `dotenv_config_path`, `dotenv_config_debug`, `DOTENV_CONFIG_ENCODING`, etc.

### 7. Variable Expansion & Command Substitution
- Use `dotenv-expand` to expand variables.
- For command substitution, embed shell commands in the .env file (requires dotenvx).

### 8. Syncing & Multiple Environments
- Manage multiple environment files (e.g. .env.local, .env.production) using the `--env-file` option.

### 9. Deploying with Encryption
- Encrypt .env files with dotenvx:
```bash
dotenvx set HELLO Production --encrypt -f .env.production
```

### 10. API Functions
- **config(options)**: Reads and parses the .env file.
- **parse(src, options)**: Parses given input into key-value mappings.
- **populate(target, source, options)**: Merges parsed values into a target object.
- **decrypt**: For decrypting encrypted .env files (via dotenvx).


## Supplementary Details
### Configuration Options for dotenv.config()
- path (string): Default is `path.resolve(process.cwd(), '.env')`. Use to specify custom file location or an array of paths for multiple files. E.g., `{ path: ['/custom/.env', '.env'] }`.
- encoding (string): Default is `'utf8'`. Specify alternative encoding such as `'latin1'`.
- debug (boolean): Default is `false`. If set to true, enables detailed logging to assist in debugging environment variable loading.
- override (boolean): Default is `false`. When set to true, allows values in .env to overwrite existing keys in process.env.
- processEnv (object): Default is `process.env`. Can specify a custom object to load the variables into.

### Implementation Steps
1. Create your .env file with key-value pairs.
2. Require dotenv at the entry point of your application.
3. Optionally, configure with custom options:
   ```javascript
   require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
   ```
4. Use `dotenv.parse()` for parsing custom strings or Buffers.
5. Utilize `dotenv.populate()` to merge configurations into a custom target object.

### Best Practices
- Do not commit your .env file to version control.
- Use different .env files for different environments (development, production, etc.).
- Preload dotenv using the Node `--require` flag in production deployments.
- For sensitive deployments, consider encrypting .env files using dotenvx, and manage decryption keys separately.

### Troubleshooting
- If environment variables are not loaded, check that the .env file is located in the directory where the Node process is running.
- Enable debug mode by setting `{ debug: true }` in the config options to get detailed error messages.
- For React applications, ensure environment variables are prefixed with `REACT_APP_` or configured via Webpack.
- If bundling errors occur (e.g., missing polyfills), install `node-polyfill-webpack-plugin` and adjust the Webpack configuration accordingly.


## Reference Details
### API Specifications and Code Examples

#### 1. config(options?: Object): Object
- **Signature:** `config(options?: { path?: string | string[], encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: object, error?: Error }`
- **Parameters:**
  - `path`: Location(s) of the .env file. Default is `path.resolve(process.cwd(), '.env')`.
  - `encoding`: File encoding. Default is `'utf8'`.
  - `debug`: Enables logging for debugging purposes.
  - `override`: If true, existing keys in `process.env` will be overwritten.
  - `processEnv`: The target object to populate. Default is `process.env`.
- **Return:** Object with either a `parsed` key containing the key-value pairs or an `error` key if failed.

**Example:**
```javascript
const dotenv = require('dotenv');
const result = dotenv.config({
  path: '/custom/path/to/.env',
  encoding: 'latin1',
  debug: true,
  override: true,
  processEnv: process.env
});
if (result.error) {
  throw result.error;
}
console.log(result.parsed);
```

#### 2. parse(src: string | Buffer, options?: { debug?: boolean }): object
- **Signature:** `parse(src: string | Buffer, options?: { debug?: boolean }): object`
- **Parameters:**
  - `src`: A string or Buffer containing the environment file content.
  - `options.debug`: If true, logs warnings when lines do not match the pattern `KEY=VAL`.
- **Return:** Object mapping keys to their corresponding values.

**Example:**
```javascript
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const config = dotenv.parse(buf, { debug: true });
console.log(config); // Output: { BASIC: 'basic' }
```

#### 3. populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
- **Signature:** `populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void`
- **Parameters:**
  - `target`: The object to populate (e.g., process.env or custom object).
  - `source`: The parsed environment variables from a .env file.
  - `options.override`: If true, values in target will be overwritten by those in source.
  - `options.debug`: If true, outputs additional debug information.
- **Return:** void

**Example:**
```javascript
const dotenv = require('dotenv');
const parsed = { HELLO: 'world' };
// Populate process.env with parsed values
dotenv.populate(process.env, parsed);
console.log(process.env.HELLO); // 'world'

// Custom target example with override
const target = { HELLO: 'world' };
dotenv.populate(target, { HELLO: 'universe' }, { override: true, debug: true });
console.log(target); // { HELLO: 'universe' }
```

#### 4. decrypt (Referenced via dotenvx)
- **Usage:** The decrypt function is part of the extended functionality provided by dotenvx for handling encrypted .env files. 
- **Example Command:**
```bash
dotenvx set HELLO Production --encrypt -f .env.production
```
- **Execution:**
```bash
DOTENV_PRIVATE_KEY_PRODUCTION="<private key>" dotenvx run -- node index.js
```

### Additional Code Examples and Best Practices
- **Preloading:**
  ```bash
  node -r dotenv/config your_script.js
  ```
- **Webpack Configuration for Polyfills:**
  ```javascript
  const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
  const webpack = require('webpack');
  module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: { filename: 'bundle.js', path: require('path').resolve(__dirname, 'dist') },
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          HELLO: JSON.stringify(process.env.HELLO)
        }
      })
    ]
  };
  ```

### Troubleshooting Commands
- **Debug Mode:**
  ```javascript
  require('dotenv').config({ debug: true });
  ```
- **Verifying Variable Loading:**
  ```javascript
  console.log(process.env);
  ```
- **If using React, ensure variables are prefixed (e.g., REACT_APP_):**
  ```bash
  npm start
  ```

This detailed API and implementation guide provides developers with all the necessary technical information to integrate and troubleshoot dotenv in their projects.

## Original Source
Dotenv Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# Dotenv Documentation

**Retrieved on:** 2023-10-15

## Overview
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. It supports multiple environments, multiline values, inline comments, and variable expansion. It also offers a parsing engine and utility functions such as config, parse, populate, and decrypt.

## Installation

- Using npm:
  ```bash
  npm install dotenv --save
  ```
- Using yarn:
  ```bash
  yarn add dotenv
  ```
- Using bun:
  ```bash
  bun add dotenv
  ```

## Usage

1. Create a `.env` file in the root of your project:
   ```dotenv
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
   ```
2. Configure dotenv as early as possible in your application:
   - CommonJS:
     ```javascript
     require('dotenv').config();
     console.log(process.env);
     ```
   - ES6:
     ```javascript
     import 'dotenv/config';
     ```

Example usage with AWS S3:
```javascript
require('dotenv').config();
// Access the bucket and secret from process.env
s3.getBucketCors({ Bucket: process.env.S3_BUCKET }, function(err, data) {});
```

## Multiline Values

Multiline values (>= v15.0.0) are supported using literal newlines or \n characters:

Using literal newlines:
```dotenv
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END RSA PRIVATE KEY-----"
```

Using \n characters:
```dotenv
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"
```

## Comments

Comments can be added as full lines or inline. Inline comments require values with hash (#) to be wrapped in quotes.

Example:
```dotenv
# This is a full line comment
SECRET_KEY=YOURSECRETKEYGOESHERE # inline comment
SECRET_HASH="something-with-a-#-hash"
```

## Parsing Engine

Use the parse function to convert a string or Buffer into an Object:

```javascript
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const config = dotenv.parse(buf);
console.log(typeof config, config); // Output: object { BASIC: 'basic' }
```

### Parsing Rules:
- Lines in `KEY=VAL` format produce entries.
- Empty lines are ignored.
- Lines starting with `#` are comments.
- Unquoted values are trimmed; quoted values preserve whitespace.
- Supports backticks for values containing both single and double quotes.

## Preload and Command Line Configuration

Preload dotenv using Node's `--require` option:

```bash
node -r dotenv/config your_script.js
```

Configuration options may be passed as command-line parameters:

```bash
node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

Alternatively, use environment variables:

```bash
DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

## Variable Expansion and Command Substitution

- For variable expansion, use "dotenv-expand":
  ```javascript
  const dotenv = require('dotenv');
  const dotenvExpand = require('dotenv-expand');
  const myEnv = dotenv.config();
  dotenvExpand(myEnv);
  ```
- For command substitution, use dotenvx:
  ```dotenv
  DATABASE_URL="postgres://$(whoami)@localhost/my_database"
  ```
  and run with:
  ```bash
dotenvx run --debug -- node index.js
  ```

## Syncing and Multiple Environments

- Use dotenvx to synchronize and encrypt .env files.
- Create multiple files (.env, .env.production, .env.local) and specify with `--env-file`:

Example:
```bash
echo "HELLO=production" > .env.production
node -r dotenv/config index.js
```

Using multiple files:
```bash
dotenvx run --env-file=.env.local --env-file=.env -- node index.js
```

## Deploying with Encryption

Encrypt your .env file using dotenvx:

```bash
dotenvx set HELLO Production --encrypt -f .env.production
```
Then run:
```bash
DOTENV_PRIVATE_KEY_PRODUCTION="<.env.production private key>" dotenvx run -- node index.js
```

## API Documentation

### config(options?: Object): Object

- **Description:** Reads the .env file, parses it, assigns values to process.env, and returns an object.
- **Parameters:**
  - `path` (string): Custom file path. Default: `path.resolve(process.cwd(), '.env')`
  - `encoding` (string): File encoding. Default: `'utf8'`
  - `debug` (boolean): Enables debug logging. Default: `false`
  - `override` (boolean): Whether to override existing values in process.env. Default: `false`
  - `processEnv` (Object): Target object for assignments. Default: `process.env`
- **Example:**
  ```javascript
  const result = require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);
  ```

### parse(src: String | Buffer, options?: Object): Object

- **Description:** Parses a string or Buffer containing environment variables.
- **Options:**
  - `debug` (boolean): Enables debug logging. Default: `false`
- **Example:**
  ```javascript
  const dotenv = require('dotenv');
  const buf = Buffer.from('BASIC=basic');
  const config = dotenv.parse(buf, { debug: true });
  console.log(config); // { BASIC: 'basic' }
  ```

### populate(target: Object, source: Object, options?: Object): void

- **Description:** Populates target object with values from source.
- **Options:**
  - `override` (boolean): Overwrites existing keys in target. Default: `false`
  - `debug` (boolean): Enables logging for debugging.
- **Example:**
  ```javascript
  const dotenv = require('dotenv');
  const parsed = { HELLO: 'world' };
  dotenv.populate(process.env, parsed);
  console.log(process.env.HELLO); // 'world'
  
  // Custom target example:
  const target = { HELLO: 'world' };
  dotenv.populate(target, { HELLO: 'universe' }, { override: true, debug: true });
  console.log(target); // { HELLO: 'universe' }
  ```

### decrypt

- **Note:** The decrypt function is exposed for working with encrypted .env files (typically via dotenvx).

## Attribution

- Data Size: 643453 bytes
- Links Found: 5330
- Source: https://github.com/motdotla/dotenv

---


## Attribution
- Source: Dotenv Documentation
- URL: https://github.com/motdotla/dotenv
- License: Unknown
- Crawl Date: 2025-04-21T05:48:34.690Z
- Data Size: 643453 bytes
- Links Found: 5330

## Retrieved
2025-04-21
