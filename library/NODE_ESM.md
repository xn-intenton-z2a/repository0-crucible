# NODE_ESM

## Crawl Summary
ESM in Node.js supports two module systems. Key technical points include explicit markers (.mjs, package.json "type" field, --input-type flag) to define module type, resolution via URL semantics, and specialized handling of import specifiers (relative, bare, absolute). Detailed algorithms ESM_RESOLVE and ESM_FILE_FORMAT define resolution behavior, including support for JSON, WASM, and dynamic import(). The technical content covers built-in modules and interoperability with CommonJS, with strict rules for file extensions, URL encoding, and package exports/imports resolution.

## Normalised Extract
Table of Contents:
1. Introduction
   - Definition of ECMAScript modules
   - Code example: Exporting and importing functions
2. Enabling
   - Flags and file extensions to enable ES modules and CommonJS
   - Example configuration in package.json and CLI arguments
3. Packages
   - Explanation of bare, relative, and absolute specifiers
   - Package resolution via package.json exports
4. Import Specifiers and Attributes
   - Detailed types: relative, bare, absolute
   - Syntax for import with attributes and required type for JSON
5. Built-in Modules and Dynamic Imports
   - Built-in module usage with default and named exports
   - Dynamic import() and its support in both module systems
6. import.meta and its Properties
   - import.meta.dirname, filename, url, and resolve(specifier) method with version notes and behavior
7. Interoperability with CommonJS
   - Mechanism for wrapping CommonJS modules as ES modules
   - Details on lack of __filename and __dirname, and use of module.createRequire
8. JSON and Wasm Modules
   - Mandatory syntax for JSON import
   - Experimental status and flag requirements for Wasm modules
9. Top-Level Await
   - Allowing await at module top-level with failure behavior
10. Loaders and Customization Hooks
    - Customizing resolution with module hooks
11. Resolution and Loading Algorithm
    - ESM_RESOLVE: Step-by-step algorithm for resolving module specifiers including error conditions
    - ESM_FILE_FORMAT: Determining module format based on file extension and package type
Detailed Details:
- Use .mjs extension or package.json "type": "module" to trigger ESM.
- When resolving, if specifier is URL, use directly; if relative, use parent's URL; if bare, use PACKAGE_RESOLVE.
- JSON modules require with { type: 'json' }.
- import.meta.resolve returns a string URL synchronously and accepts an optional parent URL parameter when experimental flag is set.
- ESM_RESOLVE algorithm checks for valid URL, relative specifiers, bare specifiers; computes format via ESM_FILE_FORMAT which checks extensions (.mjs -> module, .cjs -> commonjs, .json -> json, etc.)
- Error handling includes Invalid Module Specifier, Module Not Found, and Unsupported Directory Import.
- Customization hooks override resolution; ensure synchronous operation to avoid deadlock.


## Supplementary Details
Exact Parameter Values and Configuration Options:
- File Extensions: '.mjs', '.cjs', '.json', '.wasm', '.node'
- package.json "type": Accepts 'module' or 'commonjs'
- CLI Flags: --input-type=module or --input-type=commonjs, --experimental-wasm-modules, --experimental-import-meta-resolve

Detailed Implementation Steps for Resolution:
1. ESM_RESOLVE(specifier, parentURL):
   - If specifier is a valid URL, parse and return.
   - Else if specifier starts with '/', './', or '../', resolve relative to parentURL.
   - Else if specifier starts with '#', use PACKAGE_IMPORTS_RESOLVE.
   - Otherwise, treat as bare specifier and use PACKAGE_RESOLVE.
2. ESM_FILE_FORMAT(url):
   - Check file extension:
     - .mjs returns 'module'
     - .cjs returns 'commonjs'
     - .json returns 'json'
     - .wasm returns 'wasm' (if flag enabled)
     - .node returns 'addon' (if flag enabled)
   - For .js without extension, detect package type via package.json and source analysis
3. PACKAGE_RESOLVE and its subroutines perform file system lookups using parent directory traversal until a package.json is found.
4. Troubleshooting Tips:
   - If module not found, ensure correct file extension and valid package.json exports.
   - For resolution errors (Invalid Module Specifier), verify that specifiers are correctly formatted and percent-encoded where needed.

Configuration Effects:
- Enabling flags alter behavior of WASM and addon resolution.
- package.json "exports" field restricts accessible module paths.

Implementation Example for import.meta.resolve:
  const depURL = import.meta.resolve('./dep.js');
  // Expected output: absolute URL string for './dep.js'


## Reference Details
API Specifications and SDK Signatures:

-- import.meta.resolve(specifier: string, parent?: string|URL): string
   Returns an absolute URL by resolving specifier against import.meta.url or provided parent URL.
   Examples:
     const url1 = import.meta.resolve('component-lib/asset.css');
     // returns: file:///app/node_modules/component-lib/asset.css
     const url2 = import.meta.resolve('./dep.js');
     // returns: file:///app/dep.js

-- ESM_RESOLVE(specifier: string, parentURL: string): { format: string, resolved: string }
   Steps:
     1. If specifier is a valid URL, set resolved = URL(specifier).
     2. Else if specifier starts with '/', './', '../', compute URL resolution with parentURL.
     3. Else if specifier starts with '#', call PACKAGE_IMPORTS_RESOLVE.
     4. Else, treat as bare specifier and call PACKAGE_RESOLVE, traversing up directories.
   Errors:
     - Invalid Module Specifier
     - Module Not Found
     - Unsupported Directory Import

-- ESM_FILE_FORMAT(url: string): string
   Returns one of: 'module', 'commonjs', 'json', 'wasm', 'addon'.
   Logic:
     - Ends with '.mjs' -> 'module'
     - Ends with '.cjs' -> 'commonjs'
     - Ends with '.json' -> 'json'
     - For '.js': analyze package.json type and source module syntax

-- PACKAGE_RESOLVE(packageSpecifier: string, parentURL: string): string
   Implements resolution for bare specifiers using:
     - Lookup of node_modules
     - Reading package.json (READ_PACKAGE_JSON)
     - Processing exports field (PACKAGE_EXPORTS_RESOLVE)

Code Example in ESM:
  // addTwo.mjs
  function addTwo(num) {
    return num + 2;
  }
  export { addTwo };

  // app.mjs
  import { addTwo } from './addTwo.mjs';
  console.log(addTwo(4));

Configuration Options:
- --input-type: 'module' or 'commonjs'
- package.json "type": 'module' or 'commonjs'
- Experimental flags: --experimental-wasm-modules, --experimental-import-meta-resolve

Troubleshooting Procedures:
1. For resolution errors, run node with increased verbosity to see resolution paths.
2. Check file extensions and ensure proper URL encoding.
3. For JSON modules, ensure import syntax includes with { type: 'json' }.
4. Use module.createRequire() when needing CommonJS require in ESM.

Best Practices:
- Always specify file extensions in import statements.
- Use import.meta for module-specific details instead of __dirname or __filename.
- Validate package.json exports to avoid module not found errors.
- Use dynamic import() for asynchronous module loading in both ESM and CommonJS.


## Information Dense Extract
ESM support via .mjs/package.json type/module; CLI flag --input-type; specifiers: relative (required extension), bare (node_modules lookup, package.json exports), absolute (file:// URL); import.meta properties: dirname, filename, url, resolve(specifier) returning absolute URL synchronously; ESM_RESOLVE algorithm: valid URL check, relative resolution, PACKAGE_RESOLVE for bare specifiers; ESM_FILE_FORMAT: .mjs->module, .cjs->commonjs, .json->json, .wasm->wasm (if experimental), else detect via package.json; CommonJS interop: default export wrapping module.exports, no __filename/__dirname; JSON modules require with { type: 'json' }; top-level await supported; dynamic import() available; customization hooks for resolution; errors: Invalid Module Specifier, Module Not Found, Unsupported Directory Import; API methods include import.meta.resolve(specifier, parent) and internal ESM_RESOLVE(specifier, parentURL) with detailed error handling and file system traversal.

## Escaped Extract
Table of Contents:
1. Introduction
   - Definition of ECMAScript modules
   - Code example: Exporting and importing functions
2. Enabling
   - Flags and file extensions to enable ES modules and CommonJS
   - Example configuration in package.json and CLI arguments
3. Packages
   - Explanation of bare, relative, and absolute specifiers
   - Package resolution via package.json exports
4. Import Specifiers and Attributes
   - Detailed types: relative, bare, absolute
   - Syntax for import with attributes and required type for JSON
5. Built-in Modules and Dynamic Imports
   - Built-in module usage with default and named exports
   - Dynamic import() and its support in both module systems
6. import.meta and its Properties
   - import.meta.dirname, filename, url, and resolve(specifier) method with version notes and behavior
7. Interoperability with CommonJS
   - Mechanism for wrapping CommonJS modules as ES modules
   - Details on lack of __filename and __dirname, and use of module.createRequire
8. JSON and Wasm Modules
   - Mandatory syntax for JSON import
   - Experimental status and flag requirements for Wasm modules
9. Top-Level Await
   - Allowing await at module top-level with failure behavior
10. Loaders and Customization Hooks
    - Customizing resolution with module hooks
11. Resolution and Loading Algorithm
    - ESM_RESOLVE: Step-by-step algorithm for resolving module specifiers including error conditions
    - ESM_FILE_FORMAT: Determining module format based on file extension and package type
Detailed Details:
- Use .mjs extension or package.json 'type': 'module' to trigger ESM.
- When resolving, if specifier is URL, use directly; if relative, use parent's URL; if bare, use PACKAGE_RESOLVE.
- JSON modules require with { type: 'json' }.
- import.meta.resolve returns a string URL synchronously and accepts an optional parent URL parameter when experimental flag is set.
- ESM_RESOLVE algorithm checks for valid URL, relative specifiers, bare specifiers; computes format via ESM_FILE_FORMAT which checks extensions (.mjs -> module, .cjs -> commonjs, .json -> json, etc.)
- Error handling includes Invalid Module Specifier, Module Not Found, and Unsupported Directory Import.
- Customization hooks override resolution; ensure synchronous operation to avoid deadlock.

## Original Source
Node.js ECMAScript Modules (ESM) Documentation
https://nodejs.org/api/esm.html

## Digest of NODE_ESM

# Introduction

ECMAScript modules (ESM) are the official standard for packaging JavaScript code for reuse. Node.js fully supports ESM as specified, including interoperability with CommonJS. 

# Enabling

To enable an ES module in Node.js, use one of the following:
- File extension .mjs
- package.json field "type": "module"
- --input-type flag set to "module"

For CommonJS, use:
- File extension .cjs
- package.json field "type": "commonjs"
- --input-type flag set to "commonjs"

If no explicit marker is provided, Node.js inspects the source for ES module syntax and selects accordingly.

# Packages

Modules can be structured as packages. Bare specifiers (e.g., "some-package") are resolved using Node.js module resolution. If a package.json has an "exports" field, only the defined paths are accessible.

# Import Specifiers

There are three types of specifiers:
1. Relative specifiers (e.g. './startup.js' or '../config.mjs') which require file extensions.
2. Bare specifiers (e.g. 'some-package' or 'some-package/shuffle') which may or may not require extensions depending on the package's exports configuration.
3. Absolute specifiers (e.g. 'file:///opt/nodejs/config.js').

# Mandatory File Extensions

When using the import keyword, file extensions must be provided, including in directory indexes (e.g. './startup/index.js').

# URLs and URL Schemes

Module resolution transforms specifiers to URLs. Supported schemes include:
- file:
- node:
- data:

For file URLs, special characters (e.g. '#' and '?') must be percent-encoded. The use of url.pathToFileURL is recommended for conversion.

# file: URLs

Modules loaded with file: URLs are sensitive to query strings and fragments, which cause multiple loads if changed. The root can be referenced through '/', '//' or 'file:///' examples.

# data: Imports

Introduced in v12.10.0. Supports:
- text/javascript for ES modules
- application/json for JSON modules (requires with { type: 'json' })
- application/wasm for WebAssembly

Data URLs do not support relative resolution.

# node: Imports

Supported since v14.13.1. Use node: URLs to load Node.js builtin modules (e.g. "node:fs/promises").

# Import Attributes

Inline syntax for passing extra information with module specifiers. Syntax examples include:

  import fooData from './foo.json' with { type: 'json' };

Only the "type" attribute is supported. In JSON modules, the type attribute (value 'json') is mandatory.

# Built-in Modules

Built-in modules (e.g., fs, events, buffer) export named API features. They are accessible via the default export representing module.exports alongside named exports. Example usage:

  import EventEmitter from 'node:events';
  const e = new EventEmitter();

  import fs, { readFileSync } from 'node:fs';

Sync builtin exports can be updated via module.syncBuiltinESMExports().

# import() Expressions

Dynamic import() is supported in both CommonJS and ES modules, allowing asynchronous loading of modules.

# import.meta

A meta property available only in ES modules. Key sub-properties include:
- import.meta.dirname: Directory name of the current module (v21.2.0)
- import.meta.filename: Absolute path with symlinks resolved (v21.2.0)
- import.meta.url: Absolute file URL of the current module
- import.meta.resolve(specifier): Synchronously resolves a module specifier to an absolute URL using Node.js resolution algorithm (v20.6.0)

# Interoperability with CommonJS

ES modules can import CommonJS modules. When imported, the default export represents module.exports and a namespace wrapper may be constructed to expose named exports discovered by static analysis.

Key points:
- No require, exports, or module.exports in ES modules
- __filename and __dirname are unavailable; use import.meta instead
- Addon Loading and require.resolve are not available in ES modules

# JSON Modules

JSON files can be imported using:

  import packageConfig from './package.json' with { type: 'json' };

Only a default export is provided; cache entries are shared with CommonJS.

# Wasm Modules

WebAssembly modules (.wasm) can be imported when the --experimental-wasm-modules flag is enabled. The module exports an instantiation interface.

# Top-level await

Supported since v14.8.0. Allows the use of await at the top-level. Failure to resolve leads to an exit code 13. Example:

  export const five = await Promise.resolve(5);

# Loaders

Loaders allow customization of module loading via hooks. Older documentation refers to custom loader hooks for tasks such as source transformation and format determination.

# Resolution and Loading Algorithm

The algorithm (ESM_RESOLVE) returns a resolved URL and suggested module format based on the specifier type. It works as follows:

1. If the specifier is a valid URL, use it directly.
2. For relative (starts with '/', './', '../') or hash specifiers, resolve against parentURL.
3. For bare specifiers, use PACKAGE_RESOLVE to resolve via node_modules and package.json "exports".

Sub-algorithms include:
- ESM_FILE_FORMAT: Determines module format based on file extension or package type. Returns
  - "module" for '.mjs'
  - "commonjs" for '.cjs'
  - "json" for '.json'
  - "wasm" for '.wasm' if experimental flag enabled
  - "addon" for '.node' if addon modules enabled

- PACKAGE_RESOLVE: Resolves bare specifiers by traversing parent directories, checking package.json and "exports" field.
- PACKAGE_EXPORTS_RESOLVE and PACKAGE_IMPORTS_RESOLVE: Process exports and imports fields in package.json to determine correct file mapping.
- LOOKUP_PACKAGE_SCOPE and READ_PACKAGE_JSON: Helpers to locate package.json and determine package scope.

Errors thrown include:
- Invalid Module Specifier
- Invalid Package Configuration
- Module Not Found
- Unsupported Directory Import

# Customizing ESM Resolution

Module customization hooks allow modification of the default resolution algorithm. Example projects exist to simulate CommonJS resolution behavior in ESM contexts.

Retrieved: 2023-10-05
Attribution: Data Size: 4312169 bytes, 5283 Links Found, No Errors

## Attribution
- Source: Node.js ECMAScript Modules (ESM) Documentation
- URL: https://nodejs.org/api/esm.html
- License: License: MIT
- Crawl Date: 2025-04-22T02:30:18.248Z
- Data Size: 4312169 bytes
- Links Found: 5283

## Retrieved
2025-04-22
