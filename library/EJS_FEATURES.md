# EJS_FEATURES

## Crawl Summary
EJS evaluates plain JavaScript in `<% %>`, compiles templates to JS functions via `compile`, caches compiled functions keyed by filename when `cache=true`, and surfaces errors as JS `Error` with filename and line number.

## Normalised Extract
Table of Contents
1. Scriptlet Tags
2. Template Compilation
3. Caching Mechanism
4. Error Handling

1. Scriptlet Tags
Use `<% code %>` to execute JS without output. Use `<%= expr %>` to output HTML-escaped `expr`. Use `<%- expr %>` to output unescaped `expr`.

2. Template Compilation
Call `const fn = ejs.compile(templateString, {cache, filename, delimiter})`. `fn(data)` returns the rendered string.

3. Caching Mechanism
Set `options.cache=true` and provide `options.filename`. Compiled functions are stored in `ejs.cache` under the filename key. Default `cache=false` in development, `true` in production environments when `NODE_ENV=production`.

4. Error Handling
Rendering errors throw `Error` with message format: `<message> at <filename>:<line>:<column>`. Enable `DEBUG=ejs` to output stack traces and caching logs to console.


## Supplementary Details
Configuration Options
- cache: boolean (default false) — enable caching of compiled templates
- filename: string — identifier for caching and includes
- root: string|array — base path(s) for resolving includes
- delimiter: string (default '%') — change scriptlet tag delimiter

Implementation Steps
1. Install: `npm install ejs`
2. Import: `const ejs = require('ejs')`
3. Compile:
   ```js
   const template = '<h1>Hello <%= name %></h1>';
   const fn = ejs.compile(template, {cache: true, filename: 'greeting.ejs'});
   ```
4. Render:
   ```js
   const output = fn({name: 'Alice'});
   ```
5. Use in Express:
   ```js
   app.set('view engine', 'ejs');
   app.get('/', (req, res) => res.render('index', {user: req.user}));
   ```


## Reference Details
API Specifications

1. ejs.render(template: string, data?: object, options?: RenderOptions, callback?: (err: Error, str: string) => void): string|void
   - Returns rendered string when no callback provided.
   - `template`: template string or filename when used with `renderFile`.
   - `data`: object with keys for interpolation.
   - `options`:
     - `cache`: boolean — enable function caching
     - `filename`: string — template identifier
     - `delimiter`: string — scriptlet delimiter
     - `root`: string|array — include search paths
   - `callback`: optional node-style callback

2. ejs.compile(template: string, options?: CompileOptions): (data: object) => string
   - Returns a render function.
   - Options as above.

3. ejs.renderFile(path: string, data?: object, options?: RenderFileOptions, callback: (err: Error, str: string) => void): void
   - Asynchronously reads file at `path`, compiles and renders.
   - `options.cache`: if true, caches compiled function by resolved path.

Best Practices
- Use `ejs.cache=true` in production to minimize compile overhead.
- Always provide `filename` when calling `compile` or `renderFile` for accurate error reporting and caching.
- Sanitize user input manually when using `<%- %>` to avoid XSS.

Troubleshooting
- Error: "Could not find include" — Verify `options.root` and `options.filename` match actual file system paths.
- To debug caching: set `DEBUG=ejs` environment variable and observe `cache miss` and `cache hit` logs.
- Template syntax errors: error stack shows exact line and column in the template file.


## Information Dense Extract
EJS uses `<% %>` tags for JS code, `<%= %>` for escaped output, `<%- %>` for raw output. Compile with `ejs.compile(str, {cache, filename, delimiter, root}) => fn(data)`. Render with `ejs.render(str, data, opts)` or `ejs.renderFile(path, data, opts, cb)`. Enable `cache` plus `filename` to store in `ejs.cache`. Errors throw JS Error with `<filename>:<line>:<col>`. Use `DEBUG=ejs` for detailed logs. Default delimiter '%'.

## Sanitised Extract
Table of Contents
1. Scriptlet Tags
2. Template Compilation
3. Caching Mechanism
4. Error Handling

1. Scriptlet Tags
Use '<% code %>' to execute JS without output. Use '<%= expr %>' to output HTML-escaped 'expr'. Use '<%- expr %>' to output unescaped 'expr'.

2. Template Compilation
Call 'const fn = ejs.compile(templateString, {cache, filename, delimiter})'. 'fn(data)' returns the rendered string.

3. Caching Mechanism
Set 'options.cache=true' and provide 'options.filename'. Compiled functions are stored in 'ejs.cache' under the filename key. Default 'cache=false' in development, 'true' in production environments when 'NODE_ENV=production'.

4. Error Handling
Rendering errors throw 'Error' with message format: '<message> at <filename>:<line>:<column>'. Enable 'DEBUG=ejs' to output stack traces and caching logs to console.

## Original Source
EJS
https://ejs.co/#docs

## Digest of EJS_FEATURES

# EJS BASIC FEATURES

## Use Plain JavaScript
EJS processes templates by evaluating JavaScript inside scriptlet tags. Supported tags:
- `<% code %>`: execute code without output
- `<%= expression %>`: execute and output HTML-escaped result
- `<%- expression %>`: execute and output unescaped result

## Simple Syntax
Embed JavaScript directly in HTML without preprocessing. No custom template language—use standard JS expressions and control flow.

## Speedy Execution
Compiled templates produce JavaScript functions. Default behavior:
- `ejs.compile(templateString, options) -> RenderFunction`
- Options:
  - `cache` (boolean, default false): enable in-memory caching of compiled functions
  - `filename` (string): key for cache, required to use caching and includes

Compiled functions are stored in `ejs.cache` keyed by `filename` when `cache` is true.

## Easy Debugging
All template errors are thrown as standard JavaScript `Error` objects. Error messages include template `filename` and source `line`:
- Example error: `Error: Unexpected token % in "<%= user.name %>" at user.ejs:3:12`
- Use environment variable `DEBUG=ejs` to log stack traces and caching operations.


## Attribution
- Source: EJS
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-10T20:36:46.602Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-10
