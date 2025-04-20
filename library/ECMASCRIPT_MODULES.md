# ECMASCRIPT_MODULES

## Crawl Summary
The crawled content details the Node.js ECMAScript Modules documentation including enabling ESM via .mjs or package.json, import specifier types (relative, bare, absolute), mandatory file extensions, URL-based resolution rules, support for data: and node: imports, and import attributes (especially for JSON modules). It also covers interoperability with CommonJS, dynamic import() expressions, properties available in import.meta (url, filename, dirname, resolve), and a detailed module resolution algorithm (ESM_RESOLVE, PACKAGE_RESOLVE, ESM_FILE_FORMAT) including error conditions and customization hooks.

## Normalised Extract
Table of Contents:
1. Introduction
2. Enabling ESM
3. Import Specifiers
4. Mandatory File Extensions
5. URL and Data Imports
6. Node: Imports
7. Import Attributes
8. Built-in Modules
9. Dynamic import() Expressions
10. import.meta Properties
11. Interoperability with CommonJS
12. Resolution and Loading Algorithm
13. Customizing ESM Specifier Resolution
14. Version Changes and History

Details:
1. Introduction:
   - Use of `import` and `export` such as:
     ```js
     export function addTwo(num) { return num + 2; }
     ```
2. Enabling ESM:
   - Mark modules with `.mjs` or set package.json "type": "module" or use `--input-type=module`.
3. Import Specifiers:
   - Relative: `./file.js`, Bare: `package` or `package/sub`, Absolute: `file:///path/to/file.js`.
4. Mandatory File Extensions:
   - Always include extensions like `.js`, `.mjs` in imports.
5. URL and Data Imports:
   - Modules resolved as URLs; data: URL example:
     ```js
     import 'data:text/javascript,console.log("hello")';
     ```
6. Node: Imports:
   - Use `node:fs` to import Node built-ins.
7. Import Attributes:
   - Syntax: `import foo from './foo.json' with { type: 'json' }`.
8. Built-in Modules:
   - Expose both named and default exports (CommonJS interop) e.g., `import EventEmitter from 'node:events';`.
9. Dynamic import() Expressions:
   - Asynchronous dynamic loading using `import()` in both ESM and CommonJS contexts.
10. import.meta Properties:
    - Properties include: `import.meta.url`, `import.meta.filename`, `import.meta.dirname`, and `import.meta.resolve(specifier)` (synchronous resolution function).
11. Interoperability with CommonJS:
    - Import CJS modules via default import; use `module.createRequire()` for require() functionality.
12. Resolution and Loading Algorithm:
    - Detailed algorithm determining the module URL and format. Functions include ESM_RESOLVE, PACKAGE_RESOLVE, and ESM_FILE_FORMAT.
13. Customizing ESM Specifier Resolution:
    - Support for custom loaders to override resolution behavior.
14. Version Changes and History:
    - Specific version notes detailing changes from v8.5.0 up to v23.1.0.


## Supplementary Details
Specifications:
- Enabling Options: 
  * `.mjs` extension, package.json "type": "module", `--input-type=module`
  * For CommonJS: `.cjs`, "commonjs" or `--input-type=commonjs`
- Import Attributes: 
  * For JSON imports, use syntax: `import json from './file.json' with { type: 'json' }`.
- import.meta API:
  * `import.meta.url` (string), `import.meta.filename` (string, file protocol only), `import.meta.dirname` (string), `import.meta.resolve(specifier)` returns resolved URL string.
- Resolution Algorithm (ESM_RESOLVE):
  * Accepts a specifier and parentURL. Distinguishes between valid URL, relative, or bare specifiers.
  * Calls PACKAGE_RESOLVE for bare specifiers.
- ESM_FILE_FORMAT:
  * Uses file extension to determine format: `.mjs` for module, `.cjs` for commonjs, `.json` for json, and experimental flags enable `.wasm` and `.node` support.
- Error conditions include Invalid Module Specifier, Package Not Found, and Unsupported Directory Import.
- Custom Loader Hooks: Allow overriding resolution (e.g. commonjs-extension-resolution-loader).


## Reference Details
API Specifications and Code Examples:

1. import.meta.resolve:
   - Signature: `function resolve(specifier: string, parentURL?: string | URL): string`
   - Usage:
     ```js
     const resolved = import.meta.resolve('./dep.js');
     // returns something like: 'file:///app/dep.js'
     ```
   - Throws errors if specifier is invalid or resolution fails.

2. ESM_FILE_FORMAT(url):
   - Pseudocode:
     ```js
     function ESM_FILE_FORMAT(url) {
       if (url.endsWith('.mjs')) return 'module';
       if (url.endsWith('.cjs')) return 'commonjs';
       if (url.endsWith('.json')) return 'json';
       if (experimentalWasm && url.endsWith('.wasm')) return 'wasm';
       // ... detect using package.json type and source analysis
       return 'commonjs';
     }
     ```

3. Module Resolution Algorithm (ESM_RESOLVE):
   - Steps:
     a. If specifier is a valid URL, reserialize it.
     b. Else if specifier starts with '/', './', or '../', resolve relative to parentURL.
     c. Else if specifier starts with '#', use PACKAGE_IMPORTS_RESOLVE.
     d. Else treat as bare specifier and use PACKAGE_RESOLVE.

4. CommonJS Interoperability Example:
   - Dynamic import of a CommonJS module:
     ```js
     import { createRequire } from 'module';
     const require = createRequire(import.meta.url);
     const cjsModule = require('./module.cjs');
     console.log(cjsModule);
     ```

5. Troubleshooting Procedure:
   - If a module is not found, check:
     * The specifier format (ensure proper file extension).
     * Use `import.meta.resolve` to debug the resolved URL.
     * Verify package.json exports field when using bare specifiers.
   - For resolution errors, commands such as:
     ```bash
     node --trace-warnings app.mjs
     ```
     can be used to reveal detailed resolution steps.

6. Best Practices:
   - Always specify file extensions in import statements.
   - For JSON modules, always include `with { type: 'json' }`.
   - Use `import.meta.url` to dynamically generate file paths with `new URL('./file', import.meta.url)`.
   - When mixing legacy CommonJS, use `module.createRequire()` to ensure full compatibility.


## Original Source
Node.js ECMAScript Modules
https://nodejs.org/api/esm.html

## Digest of ECMASCRIPT_MODULES

# ECMASCRIPT MODULES

**Retrieved:** 2023-10-06

## Introduction

ECMAScript modules (ESM) are the official JavaScript module format. They are defined using `import` and `export` statements. For example:

```js
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}

export { addTwo };
```

And imported as:

```js
// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // Prints: 6
```

Node.js supports ESM fully and inter-operates with CommonJS modules.

## Enabling ESM

Node.js recognizes ES modules via:

- File extension: `.mjs`
- `package.json` field: `{ "type": "module" }`
- CLI flag: `--input-type=module`

For CommonJS, use `.cjs` or set type to `commonjs`.

## Import Specifiers

Import specifiers come in three forms:

1. **Relative specifiers:** e.g. `./startup.js` or `../config.mjs` (file extension required).
2. **Bare specifiers:** e.g. `some-package` or `some-package/shuffle`; file extension required if no exports field.
3. **Absolute specifiers:** e.g. `file:///opt/nodejs/config.js`.

Resolution of bare specifiers is handled by Node.js module resolution algorithm.

## Mandatory File Extensions

A file extension is mandatory when using `import`. Directory indexes must also be fully specified, e.g., `./startup/index.js`.

## URLs and Data Imports

- **ESM Resolution as URLs:** Modules are cached as URLs with percent-encoding applied. Supported schemes include `file:`, `node:`, and `data:`.
- **data:**
  - Supported MIME types: `text/javascript`, `application/json`, `application/wasm`.
  - Example:
    ```js
    import 'data:text/javascript,console.log("hello!");';
    ```

## Node: Imports

Node.js supports `node:` URLs for built-in modules. Example:

```js
import fs from 'node:fs/promises';
```

## Import Attributes

Import attributes allow additional options with import statements. Only the `type` attribute is supported. Example for JSON:

```js
import fooData from './foo.json' with { type: 'json' };

const { default: barData } = await import('./bar.json', { with: { type: 'json' } });
```

The `type: 'json'` attribute is mandatory for JSON modules.

## Built-in Modules

Built-in modules expose named exports from their public API. They can also expose a default export representing the CommonJS `module.exports`.

Example:

```js
import EventEmitter from 'node:events';
const e = new EventEmitter();
```

Or:

```js
import { readFile } from 'node:fs';
readFile('./foo.txt', (err, source) => {
  if (err) console.error(err);
  else console.log(source);
});
```

## Dynamic import() Expressions

Both ESM and CommonJS support dynamic `import()`. In CommonJS, it loads an ESM module. Example:

```js
(async () => {
  const module = await import('./module.mjs');
  console.log(module);
})();
```

## import.meta Properties

The `import.meta` object contains metadata about the current module:

- **import.meta.url:** Absolute URL of the module.
- **import.meta.filename:** Full resolved file path (file modules only).
- **import.meta.dirname:** Directory name of the current module.
- **import.meta.resolve(specifier):** Resolves a specifier relative to the current module. Signature:

  ```js
  // Synchronous function returning a string URL
  const resolvedUrl = import.meta.resolve(specifier);
  ```

## Interoperability with CommonJS

- **Import Statements:** Can load either ESM or CommonJS modules. For CJS, the `module.exports` is the default export.
- **require():** In ESM, use `module.createRequire()` to load CommonJS modules when needed.
- **No __filename or __dirname:** Use `import.meta.filename` or `import.meta.dirname` instead.

## Resolution and Loading Algorithm

The resolution algorithm (`ESM_RESOLVE`) returns the resolved URL and a suggested module format. Key steps:

- For a valid URL specifier, it parses and re-serializes.
- For relative or absolute specifiers, it resolves based on `parentURL`.
- For bare specifiers, it uses `PACKAGE_RESOLVE()` and looks up in `node_modules` and package.json exports.

The file format is determined using `ESM_FILE_FORMAT(url)`, e.g.:

```plaintext
if (url.endsWith('.mjs')) return "module";
if (url.endsWith('.cjs')) return "commonjs";
if (url.endsWith('.json')) return "json";
```

## Customizing the ESM Specifier Resolution

Module customization hooks allow an ESM specifier resolution override. For example, the CommonJS extension resolution loader provides a custom resolution.

## Version Changes and History

Key version changes include:

- **v23.1.0:** Import attributes are no longer experimental.
- **v22.0.0:** Dropped support for import assertions.
- **v17.1.0:** Added experimental support for import assertions (now replaced).
- **v14.8.0:** Top-level await unflagged.

## Attribution and Data Size

- **Data Size:** 4163715 bytes
- **Links Found:** 3208
- **Source:** Node.js v23.11.0 documentation (ECMAScript Modules)



## Attribution
- Source: Node.js ECMAScript Modules
- URL: https://nodejs.org/api/esm.html
- License: Official Node.js License
- Crawl Date: 2025-04-20T19:46:35.800Z
- Data Size: 4163715 bytes
- Links Found: 3208

## Retrieved
2025-04-20
