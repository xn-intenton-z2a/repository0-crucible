# EXPRESS_MIDDLEWARE

## Crawl Summary
express.json parses JSON bodies into req.body with options inflate,limit,reviver,strict,type,verify; express.urlencoded parses URL-encoded payloads with extended,inflate,limit,parameterLimit,type,verify; express.raw parses Buffer bodies with inflate,limit,type,verify; express.text parses text bodies with defaultCharset,inflate,limit,type,verify; express.static serves files with options dotfiles,etag,extensions,fallthrough,immutable,index,lastModified,maxAge,redirect,setHeaders; express.Router creates route containers with caseSensitive,mergeParams,strict

## Normalised Extract
Table of Contents
1. express.json
2. express.urlencoded
3. express.raw
4. express.text
5. express.static
6. express.Router

1. express.json
Signature: express.json(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
reviver: Function|null
strict: Boolean (true)
type: String|Array|Function ('application/json')
verify: Function|undefined
Behavior: Parses JSON payloads where Content-Type matches type into req.body object, supports gzip/deflate.

2. express.urlencoded
Signature: express.urlencoded(options)
Options:
extended: Boolean (true)
inflate: Boolean (true)
limit: Number|String ('100kb')
parameterLimit: Number (1000)
type: String|Array|Function ('application/x-www-form-urlencoded')
verify: Function|undefined
Behavior: Parses urlencoded payloads into req.body as object or array (qs if extended true).

3. express.raw
Signature: express.raw(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('application/octet-stream')
verify: Function|undefined
Behavior: Parses all bodies into Buffer at req.body.

4. express.text
Signature: express.text(options)
Options:
defaultCharset: String ('utf-8')
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('text/plain')
verify: Function|undefined
Behavior: Parses bodies into string at req.body.

5. express.static
Signature: express.static(root,options)
Options:
dotfiles: 'allow'|'deny'|'ignore'|undefined
etag: Boolean (true)
extensions: Array|false (false)
fallthrough: Boolean (true)
immutable: Boolean (false)
index: String|false ('index.html')
lastModified: Boolean (true)
maxAge: Number|String (0)
redirect: Boolean (true)
setHeaders: Function(res,path,stat)
Behavior: Serves static assets, on miss calls next(), supports caching headers.

6. express.Router
Signature: express.Router(options)
Options:
caseSensitive: Boolean (false)
mergeParams: Boolean (false)
strict: Boolean (false)
Behavior: Returns modular router to mount routes and middleware.

## Supplementary Details
Implementation Steps:
1. Import express:
   var express = require('express')
   var app = express()
2. Add body parsers before routes:
   app.use(express.json({limit:'1mb'}))
   app.use(express.urlencoded({extended:false,parameterLimit:500}))
3. Serve static files with custom headers:
   app.use(express.static('public',{maxAge:'1d',setHeaders:function(res,path,stat){res.set('X-Timestamp',Date.now())}}))
4. Create and mount router:
   var router = express.Router({mergeParams:true,strict:true})
   router.get('/items/:id',handler)
   app.use('/api',router)
5. Start server:
   app.listen(3000)

Validation:
- Always check req.body type before use:
   if(Buffer.isBuffer(req.body)){ /* raw */ }
   else if(typeof req.body === 'string'){ /* text */ }
- Use verify option to reject bad payload:
   express.json({verify:function(req,res,buf){ if(buf.length>1e6) throw new Error('Too large') }})

## Reference Details
express.json(options) -> Middleware
Parameters:
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.reviver: Function|null
- options.strict: Boolean default true
- options.type: String|Array|Function default 'application/json'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.urlencoded(options) -> Middleware
Parameters:
- options.extended: Boolean default true
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.parameterLimit: Number default 1000
- options.type: String|Array|Function default 'application/x-www-form-urlencoded'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.raw(options) -> Middleware
Parameters:
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.type: String|Array|Function default 'application/octet-stream'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.text(options) -> Middleware
Parameters:
- options.defaultCharset: String default 'utf-8'
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.type: String|Array|Function default 'text/plain'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.static(root,options) -> Middleware
Parameters:
- root: String directory path
- options.dotfiles: 'allow'|'deny'|'ignore'|undefined
- options.etag: Boolean default true
- options.extensions: Array|false default false
- options.fallthrough: Boolean default true
- options.immutable: Boolean default false
- options.index: String|false default 'index.html'
- options.lastModified: Boolean default true
- options.maxAge: Number|String default 0
- options.redirect: Boolean default true
- options.setHeaders: Function(res,path,stat)
Returns: Function(req,res,next)

express.Router(options) -> Router
Parameters:
- options.caseSensitive: Boolean default false
- options.mergeParams: Boolean default false
- options.strict: Boolean default false
Returns: Router object with methods .get,.post,.use,.param

Examples:
var express = require('express')
var app = express()
app.use(express.json({limit:'500kb'}))
app.post('/data',function(req,res){res.json(req.body)})
app.use(express.static('public',{immutable:true,maxAge:'7d'}))

Best Practices:
- Place body parsers before routes
- Limit payload size to prevent DOS
- Validate req.body shape explicitly
- Use mergeParams when nesting routers with params
- Set maxAge and immutable for immutable assets

Troubleshooting:
Command: curl -X POST http://localhost:3000/data -H 'Content-Type: application/json' -d '{"a":1}'
Expected: {"a":1}
Error: payload too large -> increase limit or send smaller body
Command: curl http://localhost:3000/missing.png
Expected: 404 from next() or custom handler
Fix: ensure file exists or configure fallthrough=false to get err in next(err)

## Information Dense Extract
json(options:inflate=true,limit='100kb',reviver=null,strict=true,type='application/json',verify) -> middleware parses JSON->req.body; urlencoded(options:extended=true,inflate=true,limit='100kb',parameterLimit=1000,type='application/x-www-form-urlencoded',verify) -> middleware parses URL-encoded->req.body; raw(options:inflate=true,limit='100kb',type='application/octet-stream',verify) -> middleware parses Buffer->req.body; text(options:defaultCharset='utf-8',inflate=true,limit='100kb',type='text/plain',verify) -> middleware parses String->req.body; static(root,options:dotfiles,etag=true,extensions=false,fallthrough=true,immutable=false,index='index.html',lastModified=true,maxAge=0,redirect=true,setHeaders) -> static file server; Router(options:caseSensitive=false,mergeParams=false,strict=false) -> modular router with .get/.post/.use/.param

## Sanitised Extract
Table of Contents
1. express.json
2. express.urlencoded
3. express.raw
4. express.text
5. express.static
6. express.Router

1. express.json
Signature: express.json(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
reviver: Function|null
strict: Boolean (true)
type: String|Array|Function ('application/json')
verify: Function|undefined
Behavior: Parses JSON payloads where Content-Type matches type into req.body object, supports gzip/deflate.

2. express.urlencoded
Signature: express.urlencoded(options)
Options:
extended: Boolean (true)
inflate: Boolean (true)
limit: Number|String ('100kb')
parameterLimit: Number (1000)
type: String|Array|Function ('application/x-www-form-urlencoded')
verify: Function|undefined
Behavior: Parses urlencoded payloads into req.body as object or array (qs if extended true).

3. express.raw
Signature: express.raw(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('application/octet-stream')
verify: Function|undefined
Behavior: Parses all bodies into Buffer at req.body.

4. express.text
Signature: express.text(options)
Options:
defaultCharset: String ('utf-8')
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('text/plain')
verify: Function|undefined
Behavior: Parses bodies into string at req.body.

5. express.static
Signature: express.static(root,options)
Options:
dotfiles: 'allow'|'deny'|'ignore'|undefined
etag: Boolean (true)
extensions: Array|false (false)
fallthrough: Boolean (true)
immutable: Boolean (false)
index: String|false ('index.html')
lastModified: Boolean (true)
maxAge: Number|String (0)
redirect: Boolean (true)
setHeaders: Function(res,path,stat)
Behavior: Serves static assets, on miss calls next(), supports caching headers.

6. express.Router
Signature: express.Router(options)
Options:
caseSensitive: Boolean (false)
mergeParams: Boolean (false)
strict: Boolean (false)
Behavior: Returns modular router to mount routes and middleware.

## Original Source
Express.js API Reference
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_MIDDLEWARE

# Express Middleware Reference (retrieved 2024-06-15)

## express()
Creates an Express application function:

```js
var express = require('express')
var app = express()
```

## express.json([options])
Built-in JSON body parser (v4.16.0+), based on body-parser.

Signature:
```js
express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
})
```
Parses requests where Content-Type matches `type` into `req.body` object. Supports gzip/deflate.

Options:
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- reviver (Function, default null)
- strict (Boolean, default true)
- type (String|Array|Function, default 'application/json')
- verify (Function(req,res,buf,encoding))

## express.urlencoded([options])
Built-in URL-encoded body parser (v4.16.0+), based on body-parser.

Signature:
```js
express.urlencoded({
  extended: true,
  inflate: true,
  limit: '100kb',
  parameterLimit: 1000,
  type: 'application/x-www-form-urlencoded',
  verify: undefined
})
```
Parses URL-encoded payloads into `req.body` (object or array). UTF-8 only.

Options:
- extended (Boolean, default true)
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- parameterLimit (Number, default 1000)
- type (String|Array|Function, default 'application/x-www-form-urlencoded')
- verify (Function)

## express.raw([options])
Built-in raw body parser (v4.17.0+), based on body-parser.

Signature:
```js
express.raw({
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream',
  verify: undefined
})
```
Parses payloads into a Buffer at `req.body`.

Options:
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- type (String|Array|Function, default 'application/octet-stream')
- verify (Function)

## express.text([options])
Built-in text body parser (v4.17.0+), based on body-parser.

Signature:
```js
express.text({
  defaultCharset: 'utf-8',
  inflate: true,
  limit: '100kb',
  type: 'text/plain',
  verify: undefined
})
```
Parses payloads into a string at `req.body`.

Options:
- defaultCharset (String, default 'utf-8')
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- type (String|Array|Function, default 'text/plain')
- verify (Function)

## express.static(root, [options])
Built-in static file server, based on serve-static.

Signature:
```js
express.static(rootDir, {
  dotfiles: undefined,
  etag: true,
  extensions: false,
  fallthrough: true,
  immutable: false,
  index: 'index.html',
  lastModified: true,
  maxAge: 0,
  redirect: true,
  setHeaders: undefined
})
```
Serves files from `rootDir` and calls `next()` on miss. Supports reverse proxy caching.

Options:
- dotfiles: 'allow'|'deny'|'ignore'|undefined
- etag: Boolean (default true)
- extensions: Array|false (default false)
- fallthrough: Boolean (default true)
- immutable: Boolean (default false)
- index: String|false (default 'index.html')
- lastModified: Boolean (default true)
- maxAge: Number|String (default 0)
- redirect: Boolean (default true)
- setHeaders: Function(res,path,stat)

## express.Router([options])
Creates modular route handlers.

Signature:
```js
var router = express.Router({
  caseSensitive: false,
  mergeParams: false,
  strict: false
})
```
Options:
- caseSensitive (Boolean, default false)
- mergeParams (Boolean, default false)
- strict (Boolean, default false)

## Mounting Middleware
```js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public', { maxAge: '1d' }))
app.use('/api', router)
```

## Attribution
- Source: Express.js API Reference
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-11T02:10:27.212Z
- Data Size: 26740539 bytes
- Links Found: 21583

## Retrieved
2025-05-11
