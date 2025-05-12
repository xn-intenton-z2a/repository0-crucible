# PATH_MODULE

## Crawl Summary
path.basename(path: string, suffix?: string): string - Returns last segment, ignores trailing separators. Throws TypeError.
path.delimiter: string - Platform delimiter (';' on Windows, ':' on POSIX).
path.dirname(path: string): string - Returns directory part. Throws TypeError.
path.extname(path: string): string - Returns extension with leading '.'. Throws TypeError.
path.format(obj): string - Constructs path from object with dir/base or root/name/ext.
path.matchesGlob(path: string, pattern: string): boolean - Experimental: globs match.
path.isAbsolute(path: string): boolean - Tests absolute path. Throws TypeError.
path.join(...paths: string[]): string - Joins and normalizes. Throws TypeError.
path.normalize(path: string): string - Resolves ., .., duplicates. Throws TypeError.
path.parse(path: string): {root,dir,base,ext,name} - Returns path components. Throws TypeError.
path.relative(from: string, to: string): string - Returns relative path. Throws TypeError.
path.resolve(...paths: string[]): string - Resolves to absolute. Throws TypeError.
path.sep: string - Platform-specific separator.
path.toNamespacedPath(path: string): string - Windows namespace prefix.
path.posix, path.win32: object - Platform-specific API.

## Normalised Extract
Table of Contents
1 Import Syntax
2 Windows vs POSIX Behavior
3 Methods
  3.1 basename
  3.2 delimiter
  3.3 dirname
  3.4 extname
  3.5 format
  3.6 matchesGlob
  3.7 isAbsolute
  3.8 join
  3.9 normalize
  3.10 parse
  3.11 relative
  3.12 resolve
  3.13 sep
  3.14 toNamespacedPath
  3.15 posix and win32

1 Import Syntax
const path = require('node:path');
import path from 'node:path';

2 Windows vs POSIX Behavior
Use path.win32.method for Windows semantics; path.posix.method for POSIX semantics.

3 Methods
3.1 basename
Signature: path.basename(path: string, suffix?: string): string
Behavior: Returns last path component, removes trailing separators, removes optional suffix.
Exceptions: Throws if args not strings.
Example: path.basename('C:\\temp\\file.html', '.html') => 'file'

3.2 delimiter
Type: string
Values: ';' on Windows, ':' on POSIX
Usage: process.env.PATH.split(path.delimiter)

3.3 dirname
Signature: path.dirname(path: string): string
Behavior: Up to last separator. Example: path.dirname('/a/b/c') => '/a/b'

3.4 extname
Signature: path.extname(path: string): string
Behavior: From last '.' in basename. Example: path.extname('foo.bar.js') => '.js'

3.5 format
Signature: path.format({dir?, root?, base?, name?, ext?}): string
Priority: dir+base > root+base > root+name+ext
Example: path.format({root:'/', name:'f', ext:'txt'}) => '/f.txt'

3.6 matchesGlob (Experimental)
Signature: path.matchesGlob(path: string, pattern: string): boolean
Behavior: True if path matches pattern.

3.7 isAbsolute
Signature: path.isAbsolute(path: string): boolean
Behavior: Tests literal absolute path, not safe against traversal.

3.8 join
Signature: path.join(...paths: string[]): string
Behavior: Joins with sep, normalizes, returns '.' if empty.

3.9 normalize
Signature: path.normalize(path: string): string
Behavior: Resolves ., .., multiple separators.

3.10 parse
Signature: path.parse(path: string): {root, dir, base, ext, name}
Behavior: Splits into components.

3.11 relative
Signature: path.relative(from: string, to: string): string
Behavior: Relative path between two locations.

3.12 resolve
Signature: path.resolve(...paths: string[]): string
Behavior: Right-to-left absolute resolution, normalize.

3.13 sep
Type: string
Values: '\\' on Windows, '/' on POSIX

3.14 toNamespacedPath
Signature: path.toNamespacedPath(path: string): string
Behavior: Windows namespace prefix, identity on POSIX.

3.15 posix and win32
Objects exposing POSIX-only or Windows-only implementations of above methods.

## Supplementary Details
OS-Specific Behavior
• Windows per-drive working directory: path.resolve('C:') may differ from path.resolve('C:\\').
• Windows methods accept both '/' and '\\' and output '\\'.

Module Access
• require('node:path') or require('path') for core module.
• require('path/posix') and require('path/win32') for platform-specific only.

Version History Highlights
• basename: throws on non-string since v6.0.0.
• format: dot auto-added to ext since v19.0.0.
• matchesGlob: experimental since v20.17.0.

Integration Steps
1 Install Node.js v14+.
2 Import with import or require.
3 Use path.posix or path.win32 when cross-platform consistency needed.
4 Validate inputs: non-strings throw TypeError.
5 For CLI tools, split PATH env using path.delimiter.

Performance Notes
• All methods are synchronous and CPU-bound string operations.
• Avoid heavy use in tight loops; cache results.

## Reference Details
API Specifications

path.basename(path: string, suffix?: string): string
- path: string (throws TypeError if not string)
- suffix: string optional (throws if not string)
Returns: last path segment without trailing separators or optional suffix.

path.delimiter: string
- Value: ';' on Windows, ':' on POSIX

path.dirname(path: string): string
- path: string
Returns: directory portion without trailing separator

path.extname(path: string): string
- path: string
Returns: extension from last '.' or '' if none

path.format(pathObject: { root?: string, dir?: string, base?: string, name?: string, ext?: string }): string
- pathObject.base > name+ext
- pathObject.dir > root
- ext auto-prefixed with '.' if missing

path.matchesGlob(path: string, pattern: string): boolean  // Experimental

path.isAbsolute(path: string): boolean

path.join(...paths: string[]): string

path.normalize(path: string): string

path.parse(path: string): { root: string, dir: string, base: string, ext: string, name: string }

path.relative(from: string, to: string): string

path.resolve(...paths: string[]): string

path.sep: string

path.toNamespacedPath(path: string): string

path.posix: { <all above methods> }
path.win32: { <all above methods> }

Full Code Examples
```js
import { join, resolve, parse, format } from 'node:path';
// join + resolve pattern
const p = resolve(join(__dirname, '../src'), 'index.js');
// parse and reformat
const parts = parse(p);
const newPath = format({ dir: parts.dir, name: parts.name + '.min', ext: parts.ext });
```  

Best Practices
• Use path.posix for URLs, Unix-style paths.
• Use path.win32 for Windows drive-letter paths.
• Validate user input: wrap calls in try/catch to handle TypeError.
• Normalize user-supplied paths before combining to prevent traversal.

Troubleshooting
1 TypeError: Path must be a string. Received XXX
  - Ensure all arguments are strings. Use String(value) if necessary.
2 Unexpected relative path
  - Verify use of resolve vs join; resolve applies cwd.
3 Mixed separators
  - After operations, call path.normalize() to unify separators.
Commands:
> node -e "console.log(require('node:path').delimiter)"
> node -e "console.log(require('node:path').sep)"



## Information Dense Extract
basename(path:string,suffix?:string)=>string throws TypeError; delimiter=>string; dirname(path:string)=>string throws TypeError; extname(path:string)=>string; format({root?,dir?,base?,name?,ext?})=>string; matchesGlob(path:string,pattern:string)=>boolean; isAbsolute(path:string)=>boolean; join(...paths:string[])=>string; normalize(path:string)=>string; parse(path:string)=>{root,dir,base,ext,name}; relative(from:string,to:string)=>string; resolve(...paths:string[])=>string; sep=>string; toNamespacedPath(path:string)=>string; posix,win32 objects with above methods; use path.win32 for Windows paths cross-platform; path.delimiter for PATH splits; ext auto-prefixed; dir>root; base>name/ext; join ignores empty; resolve uses CWD if needed; parse yields five components.

## Sanitised Extract
Table of Contents
1 Import Syntax
2 Windows vs POSIX Behavior
3 Methods
  3.1 basename
  3.2 delimiter
  3.3 dirname
  3.4 extname
  3.5 format
  3.6 matchesGlob
  3.7 isAbsolute
  3.8 join
  3.9 normalize
  3.10 parse
  3.11 relative
  3.12 resolve
  3.13 sep
  3.14 toNamespacedPath
  3.15 posix and win32

1 Import Syntax
const path = require('node:path');
import path from 'node:path';

2 Windows vs POSIX Behavior
Use path.win32.method for Windows semantics; path.posix.method for POSIX semantics.

3 Methods
3.1 basename
Signature: path.basename(path: string, suffix?: string): string
Behavior: Returns last path component, removes trailing separators, removes optional suffix.
Exceptions: Throws if args not strings.
Example: path.basename('C:''temp''file.html', '.html') => 'file'

3.2 delimiter
Type: string
Values: ';' on Windows, ':' on POSIX
Usage: process.env.PATH.split(path.delimiter)

3.3 dirname
Signature: path.dirname(path: string): string
Behavior: Up to last separator. Example: path.dirname('/a/b/c') => '/a/b'

3.4 extname
Signature: path.extname(path: string): string
Behavior: From last '.' in basename. Example: path.extname('foo.bar.js') => '.js'

3.5 format
Signature: path.format({dir?, root?, base?, name?, ext?}): string
Priority: dir+base > root+base > root+name+ext
Example: path.format({root:'/', name:'f', ext:'txt'}) => '/f.txt'

3.6 matchesGlob (Experimental)
Signature: path.matchesGlob(path: string, pattern: string): boolean
Behavior: True if path matches pattern.

3.7 isAbsolute
Signature: path.isAbsolute(path: string): boolean
Behavior: Tests literal absolute path, not safe against traversal.

3.8 join
Signature: path.join(...paths: string[]): string
Behavior: Joins with sep, normalizes, returns '.' if empty.

3.9 normalize
Signature: path.normalize(path: string): string
Behavior: Resolves ., .., multiple separators.

3.10 parse
Signature: path.parse(path: string): {root, dir, base, ext, name}
Behavior: Splits into components.

3.11 relative
Signature: path.relative(from: string, to: string): string
Behavior: Relative path between two locations.

3.12 resolve
Signature: path.resolve(...paths: string[]): string
Behavior: Right-to-left absolute resolution, normalize.

3.13 sep
Type: string
Values: '''' on Windows, '/' on POSIX

3.14 toNamespacedPath
Signature: path.toNamespacedPath(path: string): string
Behavior: Windows namespace prefix, identity on POSIX.

3.15 posix and win32
Objects exposing POSIX-only or Windows-only implementations of above methods.

## Original Source
Node.js Core & Advanced APIs
https://nodejs.org/api/path.html

## Digest of PATH_MODULE

# Path Module

Stability: 2 - Stable
Source Code: lib/path.js

## Import

const path = require('node:path');
import path from 'node:path';

## Windows vs. POSIX

Use path.win32 for consistent Windows behavior and path.posix for consistent POSIX behavior on any platform.

## Methods

### path.basename(path, [suffix])
Syntax:
```js
path.basename(path: string, suffix?: string): string
```
Parameters:
- path <string>  Path string
- suffix <string> Optional suffix to remove
Returns: <string> Last portion of path. Ignores trailing separators.
Throws: TypeError if path or suffix is not a string.
Example:
```js
path.basename('/foo/bar/baz.txt'); // 'baz.txt'
path.basename('/foo/bar/baz.txt', '.txt'); // 'baz'
```  

### path.delimiter
```js
const delim: string
```
Value: Platform-specific path delimiter (';' on Windows, ':' on POSIX).

### path.dirname(path)
Syntax:
```js
path.dirname(path: string): string
```
Returns: Directory name of path. Ignores trailing separators.
Throws: TypeError if path is not a string.
Example:
```js
path.dirname('/foo/bar/baz'); // '/foo/bar'
```  

### path.extname(path)
Syntax:
```js
path.extname(path: string): string
```
Returns: Extension from last '.' in basename, including '.'. Empty string if none.
Throws: TypeError if path is not a string.
Example:
```js
path.extname('index.html'); // '.html'
```  

### path.format(pathObject)
Syntax:
```js
path.format(pathObject: {root?: string, dir?: string, base?: string, name?: string, ext?: string}): string
```
Returns: Formatted path string.
Priority: dir over root; base over name+ext.
Example:
```js
path.format({ dir: '/home/user', base: 'file.txt' }); // '/home/user/file.txt'
```  

### path.isAbsolute(path)
Syntax:
```js
path.isAbsolute(path: string): boolean
```
Returns: true if path is absolute, false otherwise.
Throws: TypeError if path is not a string.
Example:
```js
path.isAbsolute('/foo'); // true
```  

### path.join(...paths)
Syntax:
```js
path.join(...paths: string[]): string
```
Joins segments, normalizes, ignores empty segments, returns '.' if result is ''.
Throws: TypeError if any segment is not a string.

### path.normalize(path)
Syntax:
```js
path.normalize(path: string): string
```
Normalizes path, resolving '..' and '.', replaces multiple separators.

### path.parse(path)
Syntax:
```js
path.parse(path: string): { root: string, dir: string, base: string, ext: string, name: string }
```
Returns: Object with path elements.

### path.relative(from, to)
Syntax:
```js
path.relative(from: string, to: string): string
```
Returns: Relative path from "from" to "to".

### path.resolve(...paths)
Syntax:
```js
path.resolve(...paths: string[]): string
```
Returns: Absolute normalized path. Processes from right to left.

### path.sep
```js
const sep: string
```
Value: Platform-specific segment separator ('\\' on Windows, '/' on POSIX).

### path.toNamespacedPath(path)
Syntax:
```js
path.toNamespacedPath(path: string): string
```
Windows only: returns namespace-prefixed path.

### path.posix, path.win32
POSIX- and Windows-specific implementations of above methods. Accessible via require('node:path').posix or .win32.

## Attribution
- Source: Node.js Core & Advanced APIs
- URL: https://nodejs.org/api/path.html
- License: Node.js License
- Crawl Date: 2025-05-12T21:26:33.950Z
- Data Size: 3688689 bytes
- Links Found: 3204

## Retrieved
2025-05-12
