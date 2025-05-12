# EJS_TEMPLATING

## Crawl Summary
Installation: npm install ejs. Core API: ejs.render(template:String, data:Object, options:Object, callback?:Function) returns String, options={cache:false,filename,root,delimiter:'%',openDelimiter:'<',closeDelimiter:'>',rmWhitespace:false,context,compileDebug:true}. ejs.renderFile(path:String, data:Object, options:Object, callback:Function). ejs.compile(template:String, options:Object) returns reusable function(data:Object, options?:Object):String. Express: app.set('view engine','ejs'), app.set('views',dir), res.render(name,data). Config options with defaults as above. Caching: options.cache or app.set('view cache',true), clear via ejs.clearCache(). Filters via ejs.filters.myFilter. Includes via <%- include(file,data) %>, paths from root and filename. Debug: compileDebug, client option, inspect fn.toString().

## Normalised Extract
Table of Contents:
1. Installation
2. Render Methods
3. Compilation
4. Express Integration
5. Configuration Options
6. Caching
7. Filters
8. Includes
9. Debugging

1. Installation
   npm install ejs

2. Render Methods
   ejs.render(template:String, data:Object, options:Object, callback?:Function):String|undefined
   - callback invokes (err, str)

   ejs.renderFile(path:String, data:Object, options:Object, callback:Function):void

3. Compilation
   ejs.compile(template:String, options:Object):Function
   - Returns fn(data:Object, options?:Object):String

4. Express Integration
   app.set('view engine','ejs')
   app.set('views','<project_root>/views')
   res.render('templateName', dataObject)

5. Configuration Options
   cache:Boolean = false
   filename:String
   root:String|Array<String>
   delimiter:String = '%'
   openDelimiter:String = '<'
   closeDelimiter:String = '>'
   rmWhitespace:Boolean = false
   context:Object
   compileDebug:Boolean = true

6. Caching
   app.set('view cache',true)
   ejs.clearCache()

7. Filters
   ejs.filters.filterName = function(input){ return modified }
   Usage: <%= value|filterName %>

8. Includes
   <%- include('partial.ejs', data) %>
   Resolution: options.root / dirname(filename)

9. Debugging
   options.compileDebug = true
   ejs.compile(template, {client:true})
   inspect via fn.toString()

## Supplementary Details
Install: npm install ejs@latest (v3.x). Import: const ejs = require('ejs'); or import * as ejs from 'ejs';
Express: ensure app.engine('ejs', ejs.renderFile) if custom. views dir priority: options.root or default 'views'.
Filename option must be absolute path for include and cache key. Include search order: Array of roots in options.root, then dirname(filename).
Use rmWhitespace to collapse whitespace: all safe-to-remove whitespace between tags removed.
Context: options.context binds 'this' inside template functions.
clearCache takes no args and resets ejs cache object.
Client compilation: options.client = true adds function body string as return value, no Node require dependencies.
Strict mode: options.strict = true enforces JavaScript strict mode inside templates.
Local debug var name: options.debugLocalsName = '_locals', default used in generated debug code.


## Reference Details
API ejs.render(template:String, data:Object, options:Object, callback?:Function):String|undefined
  options: {
    cache:Boolean = false,
    filename:String,
    root:String|Array<String>,
    delimiter:String = '%',
    openDelimiter:String = '<',
    closeDelimiter:String = '>',
    rmWhitespace:Boolean = false,
    context:Object,
    compileDebug:Boolean = true,
    client:Boolean = false,
    strict:Boolean = false,
    debugLocalsName:String = 'locals'
  }
  callback signature: (err:Error|null, str:String) => void

API ejs.renderFile(path:String, data:Object, options:Object, callback:Function):void
  path must exist, callback invoked with rendered string or error.

API ejs.compile(template:String, options:Object):Function
  Returns fn(data:Object, options?:Object):String

Express setup:
  app.engine('ejs', ejs.renderFile)
  app.set('view engine', 'ejs')
  app.set('views', [dir1, dir2])

Best Practices:
  - Always set filename when using includes or cache.
  - Precompile templates via ejs.compile to reuse functions in high-load contexts.
  - Use rmWhitespace in HTML-heavy templates to reduce output size.
  - Define filters early: ejs.filters.myFilter = fn

Troubleshooting:
  Command: DEBUG=ejs* node app.js
  Expect logs: [ejs compile debug] templateName compiled in Xms
  To inspect generated function: console.log(ejs.compile(src,{client:true}));
  Common errors: missing filename for includes => Error: Could not find include 'file.ejs'
  Fix: provide absolute filename option or root config.


## Information Dense Extract
ejs.render(template:String,data:Object,options:Object={cache:false,filename,root,delimiter:'%',openDelimiter:'<',closeDelimiter:'>',rmWhitespace:false,context,compileDebug:true,client:false,strict:false,debugLocalsName:'locals'},callback?:(err, str)=>void):String|undefined

ejs.renderFile(path:String,data:Object,options:Object,callback:(err,str)=>void):void

ejs.compile(template:String,options:Object):Function(data:Object,options?:Object)=>String

Express: app.engine('ejs',ejs.renderFile);app.set('view engine','ejs');app.set('views','<dir>');res.render('tpl',data)

Options.defaults:cache=false,compileDebug=true,delimiter '%',openDelimiter '<',closeDelimiter '>',rmWhitespace=false

Cache.clear:ejs.clearCache()

Filters:ejs.filters.name=fn;Use:<%= val|name %>

Include:<%- include('partial.ejs',data) %>;Paths:options.root[] then dirname(filename)

Debug:options.compileDebug=true;client:true=>function source

Best: set filename, precompile, rmWhitespace for HTML, define filters before compile

Trouble: include path errors fix with filename or root, inspect with DEBUG=ejs*; console.log(fn.toString())

## Sanitised Extract
Table of Contents:
1. Installation
2. Render Methods
3. Compilation
4. Express Integration
5. Configuration Options
6. Caching
7. Filters
8. Includes
9. Debugging

1. Installation
   npm install ejs

2. Render Methods
   ejs.render(template:String, data:Object, options:Object, callback?:Function):String|undefined
   - callback invokes (err, str)

   ejs.renderFile(path:String, data:Object, options:Object, callback:Function):void

3. Compilation
   ejs.compile(template:String, options:Object):Function
   - Returns fn(data:Object, options?:Object):String

4. Express Integration
   app.set('view engine','ejs')
   app.set('views','<project_root>/views')
   res.render('templateName', dataObject)

5. Configuration Options
   cache:Boolean = false
   filename:String
   root:String|Array<String>
   delimiter:String = '%'
   openDelimiter:String = '<'
   closeDelimiter:String = '>'
   rmWhitespace:Boolean = false
   context:Object
   compileDebug:Boolean = true

6. Caching
   app.set('view cache',true)
   ejs.clearCache()

7. Filters
   ejs.filters.filterName = function(input){ return modified }
   Usage: <%= value|filterName %>

8. Includes
   <%- include('partial.ejs', data) %>
   Resolution: options.root / dirname(filename)

9. Debugging
   options.compileDebug = true
   ejs.compile(template, {client:true})
   inspect via fn.toString()

## Original Source
EJS Templating Engine
https://ejs.co/#docs

## Digest of EJS_TEMPLATING

# Installation

Install via npm:
```
npm install ejs
```

# Usage Methods

## ejs.render(template, data, options, callback)
Signature:
```
ejs.render(template:String, data:Object, options:Object, callback?:Function):String|undefined
```
Parameters:
  template      JavaScript string with EJS tags
  data          Object supplying template variables
  options       {
                  cache:Boolean = false,
                  filename:String|undefined,
                  root:String|undefined,
                  delimiter:String = '%',
                  openDelimiter:String = '<',
                  closeDelimiter:String = '>',
                  rmWhitespace:Boolean = false,
                  context:Object|undefined,
                  compileDebug:Boolean = true
                }
  callback      (err:Error|null, str:String) => void
Returns rendered HTML string or invokes callback.

## ejs.renderFile(filename, data, options, callback)
Signature:
```
ejs.renderFile(path:String, data:Object, options:Object, callback:Function):void
```
Parameters:
  path          filesystem path to .ejs template
  data          Object supplying template variables
  options       same as render options, filename option used for caching
  callback      (err:Error|null, str:String) => void

## ejs.compile(template, options)
Signature:
```
ejs.compile(template:String, options:Object):Function
```
Returns reusable function: (data:Object, options?:Object) => String.

# Express Integration

In Express setup:
```js
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// Render in route:
res.render('templateName', { key: value })
```

# Configuration Options

  cache         Boolean = false      // Cache intermediate JS functions
  filename      String               // Required for includes and cache key
  root          String|Array<String> // Base dirs for include
  delimiter     String = '%'         // Tag delimiter
  openDelimiter String = '<'         // Opening marker
  closeDelimiter String = '>'        // Closing marker
  rmWhitespace  Boolean = false      // Remove all safe-to-remove whitespace
  context       Object               // Binding for 'this' in templates
  compileDebug  Boolean = true       // Include debug instrumentation

# Caching

Enable cache via options.cache = true or Express setting:
```js
app.set('view cache', true)
```
Clear cache:
```js
ejs.clearCache():void
```

# Filters

Define custom filters:
```js
ejs.filters.upper = function(str:String):String { return str.toUpperCase() }
```
Use in template:
```
<%= 'text'|upper %>
```

# Includes

Include partials:
```
<%- include('partial.ejs', {foo: 'bar'}) %>
```
Search paths from options.root and dirname(filename).

# Debugging

Enable compile debug for stack traces:
  options.compileDebug = true
Generate client-side function:
```
ejs.compile(template, {client:true}):String
```
View intermediate source:
```js
var fn = ejs.compile(template, {compileDebug:true});
console.log(fn.toString());
```

## Attribution
- Source: EJS Templating Engine
- URL: https://ejs.co/#docs
- License: MIT
- Crawl Date: 2025-05-12T18:29:07.298Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-12
