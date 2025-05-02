# PATH_MODULE

## Crawl Summary
Platform-sensitive file path utilities. Import via require('node:path') or import. Main functions: basename(path[,suffix])→string; dirname(path)→string; extname(path)→string; format({dir,root,base,name,ext})→string; parse(path)→object; join(...paths)→string; resolve(...paths)→string; normalize(path)→string; isAbsolute(path)→boolean; relative(from,to)→string; matchesGlob(path,pattern)→boolean. Constants: sep, delimiter. Use posix or win32 submodules for consistent cross-platform behavior.

## Normalised Extract
Table of Contents:
1. Module Import
2. Platform Behavior (Windows vs POSIX)
3. Constants: sep, delimiter
4. Core Functions: basename, dirname, extname, parse, format
5. Path Operations: join, resolve, normalize, relative, isAbsolute, matchesGlob
6. Submodules: posix, win32

1. Module Import
  const path = require('node:path');
  import path from 'node:path';

2. Platform Behavior
  Default functions follow host OS path conventions.
  Use path.posix or path.win32 to override.

3. Constants
  path.sep: '\\' on Windows, '/' on POSIX
  path.delimiter: ';' on Windows, ':' on POSIX

4. Core Functions
  basename(path: string, suffix?: string) -> string
    - Removes trailing separators.
    - Strips suffix if provided exactly at end.
    - Throws TypeError if args not strings.

  dirname(path: string) -> string
    - Removes trailing separators.
    - Returns directory portion.
    - Throws TypeError if arg not string.

  extname(path: string) -> string
    - Returns substring from last '.' in basename.
    - Empty string if none or only leading '.'.
    - Throws TypeError if arg not string.

  parse(path: string) -> { root, dir, base, name, ext }
    - Ignores trailing separators.
    - Throws TypeError if arg not string.

  format(obj) -> string
    - Priority: dir+base > root+base > root+name+ext
    - Adds missing '.' on ext if needed.

5. Path Operations
  join(...paths: string[]) -> string
    - Ignores empty segments, normalizes result, returns '.' if empty.
    - Throws TypeError if any non-string.

  resolve(...paths: string[]) -> string
    - Processes segments right-to-left until absolute is found, uses cwd if none.
    - Normalizes result, removes trailing separators except root.
    - Throws TypeError for non-strings.

  normalize(path: string) -> string
    - Resolves '.', '..', duplicates.
    - Preserves trailing separator.
    - Throws TypeError if arg not string.

  relative(from: string, to: string) -> string
    - Returns relative path, '' if same after resolution.
    - Throws TypeError if args not strings.

  isAbsolute(path: string) -> boolean
    - True for recognized absolute literals.
    - Throws TypeError if arg not string.

  matchesGlob(path: string, pattern: string) -> boolean
    - Experimental.
    - Returns true if path matches glob pattern.
    - Throws TypeError if args not strings.

6. Submodules
  path.posix: POSIX-only implementations.
  path.win32: Windows-only implementations.


## Supplementary Details
Import patterns: require('node:path') or import default. For TypeScript, use import * as path from 'path'.

Parameter constraints: all path segments and patterns must be strings. Functions throw TypeError if not.

Configuration options: none. Module behavior determined by host OS or submodule choice.

Implementation steps:
1. Import path module.
2. Select functions based on desired path conventions: default, posix, or win32.
3. Use join/resolve to build normalized absolute paths.
4. Use parse/format for component-level manipulation.
5. Validate absolute paths with isAbsolute before security-sensitive operations.


## Reference Details
# Full API Specifications

path.basename(path: string, suffix?: string): string
Throws: TypeError if path or suffix not string
Examples:
const name = path.basename('/foo/bar/baz.txt'); // 'baz.txt'
const nameNoExt = path.basename('/foo/bar/baz.txt', '.txt'); // 'baz'

path.dirname(path: string): string
Throws: TypeError if path not string
Example:
path.dirname('/foo/bar/baz.txt'); // '/foo/bar'

path.extname(path: string): string
Throws: TypeError if path not string
Examples:
path.extname('index.html'); // '.html'
path.extname('index'); // ''

path.format(obj: { root?: string; dir?: string; base?: string; name?: string; ext?: string }): string
Examples:
path.format({ dir: '/home/user', base: 'file.txt' }); // '/home/user/file.txt'
path.format({ root: '/', name: 'file', ext: 'txt' }); // '/file.txt'

path.parse(path: string): { root: string; dir: string; base: string; name: string; ext: string }
Throws: TypeError if path not string
Example:
path.parse('/home/user/file.txt');
// { root: '/', dir: '/home/user', base: 'file.txt', name: 'file', ext: '.txt' }

path.isAbsolute(path: string): boolean
Throws: TypeError if path not string
path.join(...paths: string[]): string
Throws: TypeError if any not string
path.resolve(...paths: string[]): string
Throws: TypeError if any not string
path.normalize(path: string): string
Throws: TypeError if path not string
path.relative(from: string, to: string): string
Throws: TypeError if args not strings
path.matchesGlob(path: string, pattern: string): boolean  // experimental
Throws: TypeError if args not strings

Constants:
path.sep: '\\' (Windows) or '/' (POSIX)
path.delimiter: ';' (Windows) or ':' (POSIX)

Submodules:
path.posix: same signatures, POSIX separators only
path.win32: same signatures, Windows separators only

# Best Practices
- Always use path.join or path.resolve to combine segments.
- Avoid manual string concatenation with separators.
- Use path.normalize before file-system operations to remove redundancies.
- Validate inputs: ensure typeof path === 'string'.
- For cross-platform consistency, use path.posix or path.win32 explicitly.

# Troubleshooting
## TypeError: Path must be a string. Received [Object]
Cause: non-string argument passed
Solution: cast or validate with `if (typeof p !== 'string') throw new TypeError...`

## Unexpected separators
Issue: mixed '\\' and '/' after join
Solution: apply path.normalize() or use specific submodule (posix/win32).

## Relative path incorrect
Ensure from and to are absolute or supply correct cwd: use path.resolve() before path.relative().

# Troubleshooting Commands
> node -e "console.log(require('node:path').join('foo','bar','..','baz'))"
Outputs: foo/baz
> node -e "console.log(require('node:path').resolve('foo','/bar','baz'))"
Outputs: /bar/baz


## Information Dense Extract
Import: const path = require('node:path'); Functions: basename(path:string,suffix?:string):string; dirname(path:string):string; extname(path:string):string; format({root?,dir?,base?,name?,ext?}):string; parse(path:string):{root,dir,base,name,ext}; join(...paths:string[]):string; resolve(...paths:string[]):string; normalize(path:string):string; relative(from:string,to:string):string; isAbsolute(path:string):boolean; matchesGlob(path:string,pattern:string):boolean; Constants: sep ('/'|\\), delimiter (':'|';'); Submodules: path.posix, path.win32.

## Sanitised Extract
Table of Contents:
1. Module Import
2. Platform Behavior (Windows vs POSIX)
3. Constants: sep, delimiter
4. Core Functions: basename, dirname, extname, parse, format
5. Path Operations: join, resolve, normalize, relative, isAbsolute, matchesGlob
6. Submodules: posix, win32

1. Module Import
  const path = require('node:path');
  import path from 'node:path';

2. Platform Behavior
  Default functions follow host OS path conventions.
  Use path.posix or path.win32 to override.

3. Constants
  path.sep: '''' on Windows, '/' on POSIX
  path.delimiter: ';' on Windows, ':' on POSIX

4. Core Functions
  basename(path: string, suffix?: string) -> string
    - Removes trailing separators.
    - Strips suffix if provided exactly at end.
    - Throws TypeError if args not strings.

  dirname(path: string) -> string
    - Removes trailing separators.
    - Returns directory portion.
    - Throws TypeError if arg not string.

  extname(path: string) -> string
    - Returns substring from last '.' in basename.
    - Empty string if none or only leading '.'.
    - Throws TypeError if arg not string.

  parse(path: string) -> { root, dir, base, name, ext }
    - Ignores trailing separators.
    - Throws TypeError if arg not string.

  format(obj) -> string
    - Priority: dir+base > root+base > root+name+ext
    - Adds missing '.' on ext if needed.

5. Path Operations
  join(...paths: string[]) -> string
    - Ignores empty segments, normalizes result, returns '.' if empty.
    - Throws TypeError if any non-string.

  resolve(...paths: string[]) -> string
    - Processes segments right-to-left until absolute is found, uses cwd if none.
    - Normalizes result, removes trailing separators except root.
    - Throws TypeError for non-strings.

  normalize(path: string) -> string
    - Resolves '.', '..', duplicates.
    - Preserves trailing separator.
    - Throws TypeError if arg not string.

  relative(from: string, to: string) -> string
    - Returns relative path, '' if same after resolution.
    - Throws TypeError if args not strings.

  isAbsolute(path: string) -> boolean
    - True for recognized absolute literals.
    - Throws TypeError if arg not string.

  matchesGlob(path: string, pattern: string) -> boolean
    - Experimental.
    - Returns true if path matches glob pattern.
    - Throws TypeError if args not strings.

6. Submodules
  path.posix: POSIX-only implementations.
  path.win32: Windows-only implementations.

## Original Source
Node.js Path Module
https://nodejs.org/api/path.html

## Digest of PATH_MODULE

# Path Module
Retrieved: 2024-06-05

Stability: 2 - Stable
Source Code: lib/path.js

## Import
```js
const path = require('node:path');
import path from 'node:path';
```

## Windows vs POSIX
- Default functions follow host OS conventions.
- Use `path.win32` for Windows-style paths on any OS.
- Use `path.posix` for POSIX-style paths on any OS.

## path.basename(path, [suffix])
Signature: path.basename(path: string, suffix?: string) -> string
Throws: TypeError if path or suffix is not a string
Returns last portion of path, ignores trailing separators.

## path.delimiter
Type: string
Value: ';' on Windows, ':' on POSIX

## path.dirname(path)
Signature: path.dirname(path: string) -> string
Throws: TypeError if path is not a string
Returns directory part of path, ignores trailing separators.

## path.extname(path)
Signature: path.extname(path: string) -> string
Throws: TypeError if path is not a string
Returns extension from last '.' to end. Empty string if none.

## path.format(pathObject)
Signature: path.format(obj: {root?: string; dir?: string; base?: string; name?: string; ext?: string}) -> string
Priority: dir+base > root+base > root+name+ext
Dot added if ext missing leading '.'.

## path.matchesGlob(path, pattern)
Signature: path.matchesGlob(path: string, pattern: string) -> boolean
Throws: TypeError if args not strings
Experimental (v20.17.0+).

## path.isAbsolute(path)
Signature: path.isAbsolute(path: string) -> boolean
Throws: TypeError if path not string
Detects absolute paths literal only.

## path.join(...paths)
Signature: path.join(...paths: string[]) -> string
Throws: TypeError if any segment not string
Joins with platform separator, normalizes, returns '.' for empty.

## path.normalize(path)
Signature: path.normalize(path: string) -> string
Throws: TypeError if path not string
Normalizes ., .., and duplicate separators. Preserves trailing separator.

## path.parse(path)
Signature: path.parse(path: string) -> { root: string; dir: string; base: string; ext: string; name: string }
Throws: TypeError if path not string
Breaks into components.

## path.relative(from, to)
Signature: path.relative(from: string, to: string) -> string
Throws: TypeError if args not strings
Returns relative path from `from` to `to`.

## path.resolve(...paths)
Signature: path.resolve(...paths: string[]) -> string
Throws: TypeError if any arg not string
Resolves sequence right-to-left to absolute path.

## path.sep
Type: string
Value: '\\' on Windows, '/' on POSIX

## path.toNamespacedPath(path)
Signature: path.toNamespacedPath(path: string) -> string
Returns Windows namespace path or returns input on POSIX.

## posix and win32 submodules
Access via `path.posix` or `path.win32` for OS-specific implementations.


## Attribution
- Source: Node.js Path Module
- URL: https://nodejs.org/api/path.html
- License: License
- Crawl Date: 2025-05-02T06:50:03.059Z
- Data Size: 3515443 bytes
- Links Found: 2331

## Retrieved
2025-05-02
