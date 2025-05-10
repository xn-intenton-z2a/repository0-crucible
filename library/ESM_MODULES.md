# ESM_MODULES

## Crawl Summary
Node.js ESM support: markers (.mjs, package.json type, CLI flag), specifier types (relative URL, bare, absolute file:, data:, node:), import attributes (type:'json'), import.meta properties (url, dirname, filename, resolve), dynamic import() signature, CJS interop patterns, JSON modules default export, top-level await behavior, ESM_RESOLVE algorithm overview with URL parsing, PACKAGE_RESOLVE and format detection.

## Normalised Extract
Table of Contents
1. Enabling ES Modules
2. Import Specifiers
3. Import Attributes
4. import.meta APIs
5. Dynamic import()
6. CommonJS Interoperability
7. JSON Modules
8. Top-Level Await
9. Resolution Algorithm

1. Enabling ES Modules
Markers:
  .mjs extension => ESM
  .cjs extension => CommonJS
  package.json { "type": "module" } or { "type": "commonjs" }
  CLI flag --input-type=module|commonjs

2. Import Specifiers
Relative (./, ../): extension mandatory, resolved via URL.resolve(parentURL, specifier)
Bare (package or path): resolved via node_modules lookup and "exports" field
Absolute (file://): direct URL parse; percent-encode special chars
Data URLs: supported MIME types text/javascript, application/json (with type:'json'), application/wasm
Node built-ins: node:fs, node:events => builtin module namespace

3. Import Attributes
Syntax: import X from 'file' with { type: 'json' }
Only supported attribute: type
Supported values: 'json'

4. import.meta APIs
import.meta.url: string file: URL of module
import.meta.dirname: string path.dirname(import.meta.filename)
import.meta.filename: string realpath(url.fileURLToPath(import.meta.url))
import.meta.resolve(specifier: string) => string absolute URL

5. Dynamic import()
Signature: import(specifier: string, options?: { with?: { type: string } }): Promise<any>
Use from CJS to load ESM

6. CommonJS Interoperability
import cjsDefault from 'mod.cjs' => cjsDefault === module.exports
import { named } from 'mod.cjs' => static analysis of exports
module.createRequire(import.meta.url) => require function

7. JSON Modules
import data from './file.json' with { type: 'json' }
Default-only export
Shared cache with CJS

8. Top-Level Await
Allowed in ESM
Unresolved promis never finish => exit code 13

9. Resolution Algorithm
ESM_RESOLVE(specifier, parentURL):
  if URL specifier => parse+serialize
  elif startsWith ./ ../ / => URL.resolve
  elif startsWith # => PACKAGE_IMPORTS_RESOLVE
  else => PACKAGE_RESOLVE
After resolved file URL:
  validate percent-encodings
  ensure exists and not directory
  realpath + keep query/fragment
  format = ESM_FILE_FORMAT(resolved)
Return { resolved, format }

ESM_FILE_FORMAT(url):
  .mjs => module
  .cjs => commonjs
  .json => json
  .wasm (with flag) => wasm
  .node (with flag) => addon
  .js => use package.json type or syntax detection



## Supplementary Details
Configuration Options:
- package.json "type": "module"|"commonjs" (default: implicit detection)
- CLI flags: --input-type=module|commonjs; --experimental-wasm-modules; --experimental-addon-modules
- File extensions recognized: .mjs, .cjs, .js, .json, .wasm (if enabled), .node (if enabled)

Implementation Steps:
1. Mark modules via extension or package.json or CLI.
2. Use import/export syntax or top-level await.
3. For JSON: add with { type:'json' }.
4. For CJS modules: use import default or createRequire.
5. Resolve specifiers via built-in ESM_RESOLVE algorithm.
6. Use import.meta.* APIs for metadata and resolution.

Best Practice: always specify file extensions in ESM import; use package.json "exports" to lock public API paths.

Troubleshooting:
- Missing extension => ERR_MODULE_NOT_FOUND: Add .js/.mjs
- Invalid package target => ERR_PACKAGE_PATH_NOT_EXPORTED: Update package.json "exports"
- Unable to load data URL => Syntax error: ensure MIME type matches import syntax
- import.meta.resolve deadlock in loader => avoid calling in custom loader


## Reference Details
API: import(specifier: string, options?: { with?: { type: string } }) => Promise<any>
- options.with.type: 'json' required for JSON modules

API: import.meta.url => string
API: import.meta.dirname => string (same as path.dirname(import.meta.filename))
API: import.meta.filename => string (url.fileURLToPath(import.meta.url))
API: import.meta.resolve(specifier: string) => string
Throws: ERR_INVALID_MODULE_SPECIFIER, ERR_MODULE_NOT_FOUND, ERR_INVALID_PACKAGE_TARGET, etc.

CommonJS Interop:
function module.createRequire(fromPath: string) => require function

Examples:
```js
// ESM module (addTwo.mjs)
export function addTwo(n) { return n + 2; }

// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // 6

// JSON import
import cfg from './config.json' with { type: 'json' };

// CJS import
import cjsLib from './lib.cjs';
console.log(cjsLib.default || cjsLib);

// Top-level await
export const val = await fetchData();

// import.meta.resolve
const abs = import.meta.resolve('./mod.js');

// createRequire
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const fs = require('fs');
```

Troubleshooting Commands:
node --input-type=module index.js
node --experimental-wasm-modules app.mjs
Expected: module loads without ERR_MODULE_NOT_FOUND or ERR_REQUIRE_ESM errors.



## Information Dense Extract
Markers: .mjs|.cjs extensions; package.json type; --input-type flag. Specifiers: relative (URL.resolve, ext mandatory), bare (node_modules+exports), absolute (file://). Data: text/javascript, application/json(type:'json'), application/wasm. Node: node:fs, node:module. import attributes: with{type:'json'}. import(): (string, {with?})=>Promise<any>. import.meta: url:string, dirname:string, filename:string, resolve(spec:string)=>string. CJS interop: default=module.exports, named via static analysis; createRequire(import.meta.url). JSON modules: default-only, shared cache. Top-level await allowed; unresolved => exit 13. Resolution: ESM_RESOLVE->URL parse/resolve or PACKAGE_RESOLVE/IMPORTS with exports/imports->validate->realpath->ESM_FILE_FORMAT by ext or package.json type or syntax. ESM_FILE_FORMAT: .mjs,module;.cjs,commonjs;.json,json;.wasm,wasm;.node,addon;.js by package type or syntax detection. Exceptions: ERR_MODULE_NOT_FOUND, ERR_PACKAGE_PATH_NOT_EXPORTED, ERR_INVALID_MODULE_SPECIFIER, ERR_INVALID_PACKAGE_TARGET. Best practice: specify extensions, use exports field, prefer import.meta.resolve over require.resolve replacement. 

## Sanitised Extract
Table of Contents
1. Enabling ES Modules
2. Import Specifiers
3. Import Attributes
4. import.meta APIs
5. Dynamic import()
6. CommonJS Interoperability
7. JSON Modules
8. Top-Level Await
9. Resolution Algorithm

1. Enabling ES Modules
Markers:
  .mjs extension => ESM
  .cjs extension => CommonJS
  package.json { 'type': 'module' } or { 'type': 'commonjs' }
  CLI flag --input-type=module|commonjs

2. Import Specifiers
Relative (./, ../): extension mandatory, resolved via URL.resolve(parentURL, specifier)
Bare (package or path): resolved via node_modules lookup and 'exports' field
Absolute (file://): direct URL parse; percent-encode special chars
Data URLs: supported MIME types text/javascript, application/json (with type:'json'), application/wasm
Node built-ins: node:fs, node:events => builtin module namespace

3. Import Attributes
Syntax: import X from 'file' with { type: 'json' }
Only supported attribute: type
Supported values: 'json'

4. import.meta APIs
import.meta.url: string file: URL of module
import.meta.dirname: string path.dirname(import.meta.filename)
import.meta.filename: string realpath(url.fileURLToPath(import.meta.url))
import.meta.resolve(specifier: string) => string absolute URL

5. Dynamic import()
Signature: import(specifier: string, options?: { with?: { type: string } }): Promise<any>
Use from CJS to load ESM

6. CommonJS Interoperability
import cjsDefault from 'mod.cjs' => cjsDefault === module.exports
import { named } from 'mod.cjs' => static analysis of exports
module.createRequire(import.meta.url) => require function

7. JSON Modules
import data from './file.json' with { type: 'json' }
Default-only export
Shared cache with CJS

8. Top-Level Await
Allowed in ESM
Unresolved promis never finish => exit code 13

9. Resolution Algorithm
ESM_RESOLVE(specifier, parentURL):
  if URL specifier => parse+serialize
  elif startsWith ./ ../ / => URL.resolve
  elif startsWith # => PACKAGE_IMPORTS_RESOLVE
  else => PACKAGE_RESOLVE
After resolved file URL:
  validate percent-encodings
  ensure exists and not directory
  realpath + keep query/fragment
  format = ESM_FILE_FORMAT(resolved)
Return { resolved, format }

ESM_FILE_FORMAT(url):
  .mjs => module
  .cjs => commonjs
  .json => json
  .wasm (with flag) => wasm
  .node (with flag) => addon
  .js => use package.json type or syntax detection

## Original Source
ECMAScript Modules (ESM) in Node.js
https://nodejs.org/api/esm.html

## Digest of ESM_MODULES

# Introduction

ECMAScript modules (ESM) are the official JavaScript module format supported by Node.js v14.0.0 and later. Node.js supports ESM with the following explicit markers:

- File extensions: `.mjs` for ESM, `.cjs` for CommonJS.
- package.json field: `{ "type": "module" }` for ESM, `{ "type": "commonjs" }` for CommonJS.
- CLI flag: `--input-type=module` or `--input-type=commonjs`.

# Enabling ES Modules

Marker           | Syntax
-----------------|--------------------------------------
File extension   | `file.mjs` interpreted as ESM
package.json     | `{ "type": "module" }`
CLI flag         | `node --input-type=module script.js`

If no explicit marker, Node.js inspects source for ESM syntax (import/export/await/import.meta).

# Import Specifiers

Specifier type       | Syntax                           | Resolution
---------------------|----------------------------------|------------------------------------
Relative             | `import x from './path.js'`     | URL resolution relative to importer URL; extension mandatory
Bare                 | `import pkg from 'pkg/name.js'` | Node module resolution algorithm; consult `exports` field
Absolute (file:)     | `import x from 'file:///abs.js'`| URL parsed directly; percent-encoding required
Data URLs            | `import 'data:text/javascript,...'` | Supported for JS, JSON, Wasm
Node built-ins       | `import fs from 'node:fs'`       | `node:` scheme mapped to built-in modules

# Import Attributes

Inline syntax for controlling module parsing:
- `with { type: 'json' }` required for JSON modules.

Example:
```
import cfg from './cfg.json' with { type: 'json' };
const { default: data } = await import('./data.json', { with: { type: 'json' } });
```

# import.meta APIs

API                            | Parameters             | Returns        | Since     
-------------------------------|------------------------|----------------|-----------
import.meta.url                | none                   | string (file: URL)
import.meta.dirname            | none                   | string (directory path)
import.meta.filename           | none                   | string (resolved file path)
import.meta.resolve(specifier) | specifier: string      | string (absolute URL)

- `import.meta.resolve` performs module-relative resolution synchronously.

# Dynamic import()

Expression: `import(specifier: string, options?: { with?: { type: string } }) => Promise<any>`
Loads ESM from ESM or CommonJS context.

# CommonJS Interoperability

- In ESM: `import pkg from 'cjs-module.cjs'` yields `pkg` === `module.exports`.
- Named exports from CJS supported via static analysis; live binding not guaranteed.
- In ESM, to use `require`: `const require = module.createRequire(import.meta.url);
  const lib = require('lib');`

# JSON Modules

- Must use `with { type: 'json' }` syntax.
- Only default export available.
- Cached in both ESM and CJS caches.

# Top-Level Await

- Syntax: `await` allowed at module top-level.
- Unresolved await leads to process exit code 13.

# Resolution Algorithm Overview

Entry: `ESM_RESOLVE(specifier, parentURL) => { url: string, format: 'module'|'commonjs'|'json'|'wasm'|'addon' }

- URL specifiers parsed directly.
- Relative (`./`, `../`, `/`) resolved via URL API.
- Bare specifiers resolved via `PACKAGE_RESOLVE` and `PACKAGE_IMPORTS_RESOLVE`.
- Format determined by extension, package.json `type`, or syntax detection.

For full algorithm see Node.js documentation.

_Retrieved: 2024-06-26_
_Data Size: 3317331 bytes_


## Attribution
- Source: ECMAScript Modules (ESM) in Node.js
- URL: https://nodejs.org/api/esm.html
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T01:23:18.858Z
- Data Size: 3317331 bytes
- Links Found: 557

## Retrieved
2025-05-10
