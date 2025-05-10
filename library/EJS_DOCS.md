# EJS_DOCS

## Crawl Summary
EJS core API methods ejs.render, ejs.compile, ejs.renderFile with signatures and parameter lists; Options object fields with defaults (delimiter, cache, async, filename, root, rmWhitespace, strict, compileDebug); template tags and include mechanism; caching behavior; async rendering pattern.

## Normalised Extract
Table of Contents:
1. API Methods
2. Template Compilation
3. File Rendering
4. Options
5. Includes
6. Delimiters
7. Caching
8. Async Rendering

1. API Methods
   ejs.render(template: string, data?: object, options?: Options): string
   ejs.compile(template: string, options?: Options): (data?: object) => string
   ejs.renderFile(filename: string, data?: object, options?: Options, callback: (err, str) => void): void

2. Template Compilation
   compile returns JS function; call with data object to get rendered output.

3. File Rendering
   renderFile reads file, compiles with provided options, invokes callback with error or HTML string.

4. Options
   delimiter: '%'
   openDelimiter: '<'
   closeDelimiter: '>'
   async: false
   cache: false
   filename: string (required for cache/includes)
   root: string|array (lookup path)
   views: alias for root
   rmWhitespace: false
   strict: false
   compileDebug: true

5. Includes
   Syntax: <%- include(path, data) %>
   Path resolved against options.root or dirname(filename).
   Child scope inherits parent variables; data parameter overrides.

6. Delimiters
   <% code %>  scriptlet
   <%= escaped %>
   <%- unescaped %>
   <%# comment %>
   <%% literal %>
   options.delimiter can change '%' to custom char

7. Caching
   Set options.cache = true and filename. Uses LRU cache keyed by filename.

8. Async Rendering
   options.async = true enables await in templates.
   compile returns async function: await fn(data).


## Supplementary Details
Options defaults and effects:
- delimiter: '%' (character for tag delimiter; change affects all tag types)
- openDelimiter/closeDelimiter: '<','>' (override tag wrappers)
- async: false (if true, returned render/compile function is async)
- cache: false (if true and filename set, caches compiled functions)
- filename: undefined (string path for file resolution; required for includes and caching)
- root: undefined (string or array; base path(s) for include resolution)
- views: undefined alias for root; array supports multiple directories
- rmWhitespace: false (if true, strips safe whitespace between tags)
- strict: false (if true, uses strict JS mode in template functions)
- compileDebug: true (if false, omits code comments and line numbers)

Implementation steps:
1. Install via npm: npm install ejs
2. Require: const ejs = require('ejs')
3. Call ejs.render or compile/template functions as needed
4. For file templates, set options.filename to use relative includes
5. Enable cache for high-throughput by setting options.cache = true
6. Use async rendering for Promises: set options.async = true
7. Customize delimiters for alternative syntax


## Reference Details
Full API Specifications:

1. ejs.render(template, data, options)
- template:string
- data?:object = {}
- options?:{
    delimiter?:string       default '%'
    openDelimiter?:string   default '<'
    closeDelimiter?:string  default '>'
    async?:boolean          default false
    cache?:boolean          default false
    filename?:string        default undefined
    root?:string|string[]   default undefined
    views?:string|string[]  default undefined
    rmWhitespace?:boolean   default false
    strict?:boolean         default false
    compileDebug?:boolean   default true
  }
- returns string
- throws SyntaxError

Example:
const html = ejs.render('<%= user.name %>', {user:{name:'Alice'}}, {rmWhitespace:true});

2. ejs.compile(template, options)
- template:string
- options?:same as render
- returns function(data?:object):string | Promise<string> if async

Example:
const fn = ejs.compile('Hello <%= name %>', {async:true});
(async()=>{ console.log(await fn({name:'Bob'})) })();

3. ejs.renderFile(filename, data, options, callback)
- filename:string
- data?:object = {}
- options?:same as render
- callback:(err:Error|null, str?:string)=>void
- returns void

Example:
ejs.renderFile('views/index.ejs', {items}, {cache:true}, (err, str)=>{
  if (err) console.error(err);
  else console.log(str);
});

Configuration Patterns:
- Enable global caching: ejs.cache = new LRU({max:500});
- Custom file loader: ejs.fileLoader = (path) => fs.readFileSync(path, 'utf8');

Best Practices:
- Always set options.filename when using includes to get correct path resolution and cache key.
- Disable compileDebug in production: {compileDebug:false} for smaller functions.
- Use rmWhitespace to minimize HTML size when whitespace is non-significant.

Troubleshooting:
- SyntaxError: Unexpected token '%' → Check unmatched tags.
- Include not found: ensure root or filename correct. Run:
  console.log(path.resolve(options.root, 'partial.ejs'))
- Async errors: "await is only valid in async function" → set options.async = true.

Commands:
- Validate template compile: node -e "console.log(require('ejs').compile("<% if(true){ %>OK<% } %>")());"
- Inspect cache size: console.log(require('ejs').cache.keys());


## Information Dense Extract
ejs.render(str,data,opts)->string; opts:{delimiter:'%',openDelimiter:'<',closeDelimiter:'>',async:false,cache:false,filename,root|string[],views alias,rmWhitespace:false,strict:false,compileDebug:true}. ejs.compile(str,opts)->fn(data)->string|Promise. ejs.renderFile(file,data,opts,cb). Includes: <%- include(path,data)%> resolves via opts.root or dirname(opts.filename). Cache enabled if opts.cache&&opts.filename. Async templates require opts.async=true. Custom fileLoader & cache override via ejs.fileLoader & ejs.cache. Best: set filename for includes/cache, compileDebug:false in prod, rmWhitespace:true for minified HTML. Troubleshoot via tag matching, path.resolve for includes, ensure async flag for await usage.

## Sanitised Extract
Table of Contents:
1. API Methods
2. Template Compilation
3. File Rendering
4. Options
5. Includes
6. Delimiters
7. Caching
8. Async Rendering

1. API Methods
   ejs.render(template: string, data?: object, options?: Options): string
   ejs.compile(template: string, options?: Options): (data?: object) => string
   ejs.renderFile(filename: string, data?: object, options?: Options, callback: (err, str) => void): void

2. Template Compilation
   compile returns JS function; call with data object to get rendered output.

3. File Rendering
   renderFile reads file, compiles with provided options, invokes callback with error or HTML string.

4. Options
   delimiter: '%'
   openDelimiter: '<'
   closeDelimiter: '>'
   async: false
   cache: false
   filename: string (required for cache/includes)
   root: string|array (lookup path)
   views: alias for root
   rmWhitespace: false
   strict: false
   compileDebug: true

5. Includes
   Syntax: <%- include(path, data) %>
   Path resolved against options.root or dirname(filename).
   Child scope inherits parent variables; data parameter overrides.

6. Delimiters
   <% code %>  scriptlet
   <%= escaped %>
   <%- unescaped %>
   <%# comment %>
   <%% literal %>
   options.delimiter can change '%' to custom char

7. Caching
   Set options.cache = true and filename. Uses LRU cache keyed by filename.

8. Async Rendering
   options.async = true enables await in templates.
   compile returns async function: await fn(data).

## Original Source
EJS
https://ejs.co/#docs

## Digest of EJS_DOCS

# EJS API Reference (retrieved 2024-06-30)

## 1. ejs.render(template, data, options)

Signature:
```js
ejs.render(template: string, data?: object, options?: Options): string
```
Parameters:
- template: String containing EJS syntax.
- data: Data object to bind to template (default: {}).
- options: Options object (see Options section).
Returns:
- Rendered HTML string.
Throws:
- SyntaxError on template parse failure.

## 2. ejs.compile(template, options)

Signature:
```js
ejs.compile(template: string, options?: Options): (data?: object) => string
```
Parameters:
- template: EJS template string.
- options: Options object.
Returns:
- Reusable render function accepting a data object.

## 3. ejs.renderFile(path, data, options, callback)

Signature:
```js
ejs.renderFile(filename: string, data?: object, options?: Options, callback: (err: Error|null, str?: string) => void): void
```
Parameters:
- filename: Path to .ejs file.
- data: Data object (default: {}).
- options: Options object.
- callback: Function called with (err, renderedString).
Throws:
- Errors via callback.err if file I/O or render fails.

## 4. Options

Fields and Defaults:
- delimiter: '%'
- openDelimiter: '<'
- closeDelimiter: '>'
- async: false
- cache: false
- filename: undefined (required for cache and includes)
- root: undefined or string|array (lookup path for include)
- views: undefined or string|array (deprecation alias for root)
- rmWhitespace: false (strip all safe-to-strip whitespace)
- strict: false (enable strict mode)
- compileDebug: true (includes line numbers in compiled source)

## 5. Caching

- Enable via options.cache = true and provide options.filename.
- Caches compiled functions in internal LRU cache keyed by filename.

## 6. Includes

Syntax:
```ejs
<%- include('path/to/partial', {foo: 'bar'}) %>
```
- Resolves relative to options.root or path.dirname(options.filename).
- Passes given data merged with parent scope.

## 7. Delimiters

- Default tags:
  - Scriptlet: <% code %>
  - Escaped: <%= value %>
  - Unescaped: <%- value %>
  - Comment: <%# comment %>
  - Literal delimiter: <%% renders <% literal %>
- Custom delimiter: set options.delimiter = '?' to use <? ?>

## 8. Async Rendering

- Set options.async = true.
- Use await inside templates and call compiled function as async:
```js
const fn = ejs.compile(str, {async: true});
await fn(data);
```

---

Attribution: Crawled from https://ejs.co/#docs on 2024-06-30, Data Size: 8029 bytes, Links Found: 26

## Attribution
- Source: EJS
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-10T21:58:40.878Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-10
