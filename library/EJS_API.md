# EJS_API

## Crawl Summary
EJS v3.1.9 core API methods: render(template,data,options)→String; renderFile(path,data,options,cb)→void; compile(template,options)→Function. Options: cache(Boolean), filename(String), root(String), views(Array), delimiter(String), async(Boolean), compileDebug(Boolean), rmWhitespace(Boolean), strict(Boolean), context(Object), localsName(String). Template syntax: <% %>,<%= %>,<%- %>,<%# %>,<%% %>. Includes via include(name,data). Async by setting async:true. Caching requires filename. Errors throw JS exceptions with line numbers.

## Normalised Extract
Table of Contents:
1 Installation
2 Core API methods
3 Options
4 Template Syntax
5 Includes
6 Caching
7 Asynchronous support
8 Delimiters

1 Installation
  npm install ejs

2 Core API methods
  render(template:String, data:Object, options?:Object) => String
  renderFile(path:String, data:Object, options:Object, callback:(err:Error, str:String)=>void) => void
  compile(template:String, options?:Object) => Function(data:Object): String

3 Options
  cache: true|false (default false)
  filename: absolute or relative file path (required for include and cache key)
  root: string path for absolute include resolution (default process.cwd())
  views: array of paths to search for includes (default [])
  delimiter: single-character string for tag (default '%')
  async: true|false (default false)
  compileDebug: true|false (default true)
  rmWhitespace: true|false (default false)
  strict: true|false (default false)
  context: object to bind `this` in template (default null)
  localsName: string name for data object in template (default 'locals')

4 Template Syntax
  <% code %> no output
  <%= expression %> HTML-escaped output
  <%- expression %> unescaped output
  <%# comment %> no execution
  <%% literal %> outputs `<%`
  %> ends tag

5 Includes
  Syntax: <%- include(filename:String, data?:Object) %>
  Resolves relative to filename option or root/views paths

6 Caching
  Enable by cache:true
  Requires filename for cache key
  Stores compiled function in internal cache

7 Asynchronous support
  Set async:true in options
  Use await inside <% %> tags
  render and compile return Promise when async:true

8 Delimiters
  Change with delimiter option: options.delimiter = '?' yields <? code ?>


## Supplementary Details
Default options object: {
  cache: false,
  filename: undefined,
  root: process.cwd(),
  views: [],
  delimiter: '%',
  async: false,
  compileDebug: true,
  rmWhitespace: false,
  strict: false,
  context: null,
  localsName: 'locals'
}
Implementation steps:
1 Install ejs via npm
2 Require or import ejs
3 Call render or renderFile with correct options
4 For includes set filename or root/views so include paths resolve
5 Enable cache by passing cache:true and specifying filename
6 For async functions set async:true and use await in templates
7 Handle errors by try/catch around render or error-first callback in renderFile


## Reference Details
API Specifications:

render(template:String, data:Object, options?:Object) => String
  -Throws TypeError if template not string
  -Throws errors from JS evaluation

renderFile(path:String, data:Object, options:Object, callback:(err:Error, str:String)=>void) => void
  -path: file system path to .ejs file
  -data: object passed as locals
  -options: same as render options
  -callback: function(err, result)

compile(template:String, options?:Object) => compiledFunction
  -compiledFunction(data:Object, callback?:Function) => String|Promise

Exact method signatures:

function render(template, data, options) {
  options = options || {};
  const fn = compile(template, options);
  if (options.async) return fn(data);
  return fn(data);
}

function renderFile(path, data, options, callback) {
  if (typeof options === 'function') callback = options, options = {};
  fs.readFile(path, 'utf8', function(err, str){
    if(err) return callback(err);
    try {
      const fn = compile(str, Object.assign({}, options, {filename:path}));
      const result = options.async ? fn(data) : fn(data);
      if (options.async) result.then(res=> callback(null,res),cb=>callback(cb));
      else callback(null, result);
    } catch(e) {
      callback(e);
    }
  });
}

function compile(template, options) {
  const opts = Object.assign({}, defaultOptions, options);
  // tokenizer and parser
  const fn = new Function(opts.localsName, opts.context ? 'with(this){' + compiledSource + '}' : compiledSource);
  return opts.async ? async function(locals){ return fn.call(opts.context, locals) } : function(locals){ return fn.call(opts.context, locals) };
}

Configuration Options:
options.cache (Boolean): toggle caching of compiled templates
options.filename (String): used for include resolution and cache key
options.root (String): base path for includes starting with '/'
options.views (Array<String>): search paths for include files
options.delimiter (String): scriptlet delimiter
options.async (Boolean): enable async/await support
options.compileDebug (Boolean): include debug instrumentation
options.rmWhitespace (Boolean): collapse whitespace
options.strict (Boolean): fail on undefined values
options.context (Object): bind this in templates
options.localsName (String): variable name for locals

Best Practices:
- Always set filename when using includes or cache
- Precompile templates via compile and reuse function
- Enable cache in production
- Use rmWhitespace to reduce output size
- Wrap render calls in try/catch or use callback error handling
- Use async option for Promises and async helpers

Troubleshooting:
Command: console.log(ejs.render('<%= a.b %>', {a:{}}));
Expected: throws TypeError: Cannot read property 'b' of undefined
With strict:true: throws ReferenceError: a is not defined
Command: ejs.renderFile('missing.ejs', {}, {}, cb)
Expected cb called with err.code == 'ENOENT'

Exact commands:
node -e "console.log(require('ejs').render('<%- include(\"tpl.ejs\") %>',{}, {filename:'main.ejs',views:['./views']}));"
Output: contents of views/tpl.ejs


## Information Dense Extract
ejs.render(template:String,data:Object,options?:{cache?:Boolean,filename?:String,root?:String,views?:String[],delimiter?:String,async?:Boolean,compileDebug?:Boolean,rmWhitespace?:Boolean,strict?:Boolean,context?:Object,localsName?:String})=>String|Promise;             ejs.renderFile(path:String,data:Object,options:Object,cb:(Error,String)=>void)=>void;             ejs.compile(template:String,options?:Object)=>(data:Object)=>String|Promise; Options defaults: cache:false,filename:undefined,root:process.cwd(),views:[],delimiter:'%',async:false,compileDebug:true,rmWhitespace:false,strict:false,context:null,localsName:'locals'; Template tags: <% code %>,<%=escape %>,<%-unescaped%>,<%#comment%>,<%%literal%>,%>; Include: <%- include(filename,data) %>, resolves via filename or root/views; Async support: options.async=true + await inside tags; Caching: options.cache=true + filename; Errors: JS exceptions with template line numbers; Delimiters change via options.delimiter; Best practices: precompile, cache in production, set filename for includes, rmWhitespace for lean output; Troubleshooting: catch exceptions, handle ENOENT on missing files.

## Sanitised Extract
Table of Contents:
1 Installation
2 Core API methods
3 Options
4 Template Syntax
5 Includes
6 Caching
7 Asynchronous support
8 Delimiters

1 Installation
  npm install ejs

2 Core API methods
  render(template:String, data:Object, options?:Object) => String
  renderFile(path:String, data:Object, options:Object, callback:(err:Error, str:String)=>void) => void
  compile(template:String, options?:Object) => Function(data:Object): String

3 Options
  cache: true|false (default false)
  filename: absolute or relative file path (required for include and cache key)
  root: string path for absolute include resolution (default process.cwd())
  views: array of paths to search for includes (default [])
  delimiter: single-character string for tag (default '%')
  async: true|false (default false)
  compileDebug: true|false (default true)
  rmWhitespace: true|false (default false)
  strict: true|false (default false)
  context: object to bind 'this' in template (default null)
  localsName: string name for data object in template (default 'locals')

4 Template Syntax
  <% code %> no output
  <%= expression %> HTML-escaped output
  <%- expression %> unescaped output
  <%# comment %> no execution
  <%% literal %> outputs '<%'
  %> ends tag

5 Includes
  Syntax: <%- include(filename:String, data?:Object) %>
  Resolves relative to filename option or root/views paths

6 Caching
  Enable by cache:true
  Requires filename for cache key
  Stores compiled function in internal cache

7 Asynchronous support
  Set async:true in options
  Use await inside <% %> tags
  render and compile return Promise when async:true

8 Delimiters
  Change with delimiter option: options.delimiter = '?' yields <? code ?>

## Original Source
EJS Templating Engine
https://ejs.co/#docs

## Digest of EJS_API

# Installation

```bash
npm install ejs
```

# Usage

```javascript
const ejs = require('ejs');

// Synchronous rendering
ejs.render(templateString, dataObject, optionsObject);

// Asynchronous rendering
await ejs.render(templateString, dataObject, {async: true});

// Compile to function
const fn = ejs.compile(templateString, optionsObject);
fn(dataObject);

// Render from file
ejs.renderFile(filenamePath, dataObject, optionsObject, callback);
```

# Primary API Methods

- **render(template, data, options)** → *String*
- **renderFile(path, data, options, callback)** → *void*
- **compile(template, options)** → *Function*

# Options Object

| Name            | Type      | Default     | Description                                                  |
|-----------------|-----------|-------------|--------------------------------------------------------------|
| cache           | Boolean   | false       | Cache intermediate JS functions                              |
| filename        | String    | undefined   | Used by includes and cache keys                              |
| root            | String    | process.cwd | Base directory for absolute includes                         |
| views           | Array     | []          | Directories to search for includes                           |
| delimiter       | String    | '%'         | Character to open and close scriptlet tags                   |
| async           | Boolean   | false       | Enable top-level async filters and functions                 |
| compileDebug    | Boolean   | true        | Include debug instrumentation in compiled function           |
| rmWhitespace    | Boolean   | false       | Remove all safe-to-remove whitespace                        |
| strict          | Boolean   | false       | Treat undefined values as errors                             |
| context         | Object    | null        | `this` context for compiled functions                       |
| localsName      | String    | 'locals'    | Name of data object in template                              |

# Template Tag Syntax

- `<%`  Scriptlet, no output
- `<%=` HTML-escaped output
- `<%-` Unescaped output
- `<%#` Comment, no execution
- `<%%` Outputs literal `<%`
- `%>`  Close tag

# Includes

```ejs
<%- include('header.ejs', {title: 'Home'}) %>
```

# Caching

- Enabled via `options.cache = true`
- `filename` required for proper cache key generation

# Error Handling

- Runtime errors throw JS exceptions with template line numbers
- Stack traces include compiled function locations

# Asynchronous Support

Set `options.async = true`. Use `<% await userAsyncFunction() %>` inside templates.

# Delimiters

Specify `options.delimiter = '?'` to use `<? ... ?>` tags instead of `<% ... %>`.


## Attribution
- Source: EJS Templating Engine
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-07T09:30:47.542Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-07
