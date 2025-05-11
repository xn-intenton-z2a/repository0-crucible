# EXPRESS_API

## Crawl Summary
express.json: parses JSON bodies; options inflate:boolean=true, limit:100kb, reviver:null, strict:true, type:application/json, verify:undefined; populates req.body. express.urlencoded: parses URL-encoded; options extended:true, inflate:true, limit:100kb, parameterLimit:1000, type:application/x-www-form-urlencoded, verify:undefined; req.body as object. express.static: serves static files; options dotfiles:undefined, etag:true, extensions:false, fallthrough:true, immutable:false, index:"index.html", lastModified:true, maxAge:0, redirect:true, setHeaders:Function; calls next() on missing. express.Router: create router; options caseSensitive:false, mergeParams:false, strict:false; use router.METHOD and middleware.

## Normalised Extract
Table of Contents

1. JSON Body Parser
2. URL-Encoded Body Parser
3. Static File Server
4. Router Creation

1. JSON Body Parser

Use express.json([options]) to parse application/json requests. Import:
var express = require('express')
var app = express()
app.use(express.json({limit:'100kb', strict:true}))

Options:
inflate       (Boolean) defaults to true; handles compressed bodies
limit         (String|Number) defaults to '100kb'; max request size
reviver       (Function) defaults to null; passed to JSON.parse
strict        (Boolean) defaults to true; only accepts objects and arrays
type          (String|Array|Function) defaults to 'application/json'
verify        (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
On match, sets req.body to parsed object or {}. Throws error on invalid JSON.

2. URL-Encoded Body Parser

Use express.urlencoded([options]) for application/x-www-form-urlencoded. Example:
app.use(express.urlencoded({extended:false, limit:'50kb'}))

Options:
extended        (Boolean) defaults to true; false uses querystring, true uses qs
inflate         (Boolean) defaults to true; handle compressed bodies
limit           (String|Number) defaults to '100kb'; max body size
parameterLimit  (Number) defaults to 1000; max parameters
type            (String|Array|Function) defaults to 'application/x-www-form-urlencoded'
verify          (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
Populates req.body with key-value pairs or arrays.

3. Static File Server

Use express.static(root, [options]) to serve static assets. Example:
app.use(express.static('public', {maxAge:'7d', immutable:true}))

Options:
dotfiles      (String) default undefined; 'allow', 'deny', 'ignore'
etag          (Boolean) default true; sends weak ETags
extensions    (Array|false) default false; fallback extensions
fallthrough   (Boolean) default true; next() on client errors
immutable     (Boolean) default false; Cache-Control immutable directive
index         (String|false) default 'index.html'; directory index file
lastModified  (Boolean) default true; set Last-Modified header
maxAge        (Number|String) default 0; Cache-Control max-age
redirect      (Boolean) default true; redirect to trailing '/'
setHeaders    (Function) default undefined; fn(res,path,stat)

Effect:
Serves files, calls next() if not found. Use reverse proxy for caching.

4. Router Creation

Use express.Router([options]) to create a router. Import:
var router = express.Router({mergeParams:true})
app.use('/items', router)

Options:
caseSensitive  (Boolean) default false; treat '/Foo' vs '/foo'
mergeParams    (Boolean) default false; preserve parent req.params
strict         (Boolean) default false; treat '/foo' vs '/foo/'

Effect:
Create modular route handlers: router.get, router.post, router.use.


## Supplementary Details
Implementation Steps:
1. Install Express: npm install express
2. Require express: const express = require('express')
3. Create app: const app = express()
4. Apply body parsers before routes:
   app.use(express.json({limit:'200kb'}))
   app.use(express.urlencoded({extended:true, parameterLimit:5000}))
5. Serve static files:
   app.use('/static', express.static(path.join(__dirname,'public'), {
     dotfiles:'ignore', etag:false, extensions:['htm','html'], index:false,
     maxAge:86400000, immutable:true,
     setHeaders: function(res, path, stat) { res.set('X-Timestamp', Date.now()) }
   }))
6. Create routers for modularization:
   const router = express.Router({caseSensitive:true, strict:true})
   router.get('/', (req,res)=>{res.send('OK')})
   app.use('/admin', router)

Core Configurations:
Node.js >=0.10 is required.
Order matters: body parsers must precede routes accessing req.body.
Use express.Router for sub-app isolation and parameter merging.


## Reference Details
TypeScript Definitions:
interface JSONOptions {
  inflate?: boolean;
  limit?: number | string;
  reviver?: (this: any, key: string, value: any) => any;
  strict?: boolean;
  type?: string | string[] | ((req: express.Request) => boolean);
  verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
}
interface URLEncodedOptions {
  extended?: boolean;
  inflate?: boolean;
  limit?: number | string;
  parameterLimit?: number;
  type?: string | string[] | ((req: express.Request) => boolean);
  verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
}
interface StaticOptions {
  dotfiles?: 'allow' | 'deny' | 'ignore';
  etag?: boolean;
  extensions?: string[] | false;
  fallthrough?: boolean;
  immutable?: boolean;
  index?: string | false;
  lastModified?: boolean;
  maxAge?: number | string;
  redirect?: boolean;
  setHeaders?: (res: express.Response, path: string, stat: fs.Stats) => void;
}

express.json(options?: JSONOptions): express.RequestHandler
express.urlencoded(options?: URLEncodedOptions): express.RequestHandler
express.static(root: string, options?: StaticOptions): express.RequestHandler
express.Router(options?: {caseSensitive?: boolean; mergeParams?: boolean; strict?: boolean}): express.Router

Usage Examples:
app.use(express.json());
app.post('/data', (req,res) => { res.json(req.body); });

Best Practices:
Validate req.body shape: if (typeof req.body.foo !== 'string') return res.status(400).send('Invalid');
Limit body size to mitigate DoS: express.json({limit:'10kb'}).
Escape HTML in JSON responses: app.set('json escape', true).

Troubleshooting:
Command:
curl -X POST http://localhost:3000/data -H 'Content-Type: application/json' -d @large.json
Expected on limit exceed: HTTP 413 Payload Too Large
Resolution: increase limit setting.

Check static file serving:
curl http://localhost:3000/static/image.png -I
Expected header: Cache-Control: max-age=0
Change maxAge to alter caching.


## Information Dense Extract
express.json([options]) parses JSON: inflate=true, limit=100kb, strict=true, type='application/json', reviver=null, verify undefined; populates req.body or {}. express.urlencoded([opts]) parses URL-encoded: extended=true, inflate=true, limit=100kb, parameterLimit=1000, type='application/x-www-form-urlencoded', verify undefined; req.body key-value pairs. express.static(root, [opts]) serves files: dotfiles undefined, etag=true, extensions false, fallthrough=true, immutable=false, index='index.html', lastModified=true, maxAge=0, redirect=true, setHeaders undefined; next() on miss. express.Router([opts]) creates router: caseSensitive=false, mergeParams=false, strict=false; use router.METHOD and router.use. Ensure Node>=0.10, apply body parsers before routes, validate req.body, set json escape, adjust limits, test with curl.

## Sanitised Extract
Table of Contents

1. JSON Body Parser
2. URL-Encoded Body Parser
3. Static File Server
4. Router Creation

1. JSON Body Parser

Use express.json([options]) to parse application/json requests. Import:
var express = require('express')
var app = express()
app.use(express.json({limit:'100kb', strict:true}))

Options:
inflate       (Boolean) defaults to true; handles compressed bodies
limit         (String|Number) defaults to '100kb'; max request size
reviver       (Function) defaults to null; passed to JSON.parse
strict        (Boolean) defaults to true; only accepts objects and arrays
type          (String|Array|Function) defaults to 'application/json'
verify        (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
On match, sets req.body to parsed object or {}. Throws error on invalid JSON.

2. URL-Encoded Body Parser

Use express.urlencoded([options]) for application/x-www-form-urlencoded. Example:
app.use(express.urlencoded({extended:false, limit:'50kb'}))

Options:
extended        (Boolean) defaults to true; false uses querystring, true uses qs
inflate         (Boolean) defaults to true; handle compressed bodies
limit           (String|Number) defaults to '100kb'; max body size
parameterLimit  (Number) defaults to 1000; max parameters
type            (String|Array|Function) defaults to 'application/x-www-form-urlencoded'
verify          (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
Populates req.body with key-value pairs or arrays.

3. Static File Server

Use express.static(root, [options]) to serve static assets. Example:
app.use(express.static('public', {maxAge:'7d', immutable:true}))

Options:
dotfiles      (String) default undefined; 'allow', 'deny', 'ignore'
etag          (Boolean) default true; sends weak ETags
extensions    (Array|false) default false; fallback extensions
fallthrough   (Boolean) default true; next() on client errors
immutable     (Boolean) default false; Cache-Control immutable directive
index         (String|false) default 'index.html'; directory index file
lastModified  (Boolean) default true; set Last-Modified header
maxAge        (Number|String) default 0; Cache-Control max-age
redirect      (Boolean) default true; redirect to trailing '/'
setHeaders    (Function) default undefined; fn(res,path,stat)

Effect:
Serves files, calls next() if not found. Use reverse proxy for caching.

4. Router Creation

Use express.Router([options]) to create a router. Import:
var router = express.Router({mergeParams:true})
app.use('/items', router)

Options:
caseSensitive  (Boolean) default false; treat '/Foo' vs '/foo'
mergeParams    (Boolean) default false; preserve parent req.params
strict         (Boolean) default false; treat '/foo' vs '/foo/'

Effect:
Create modular route handlers: router.get, router.post, router.use.

## Original Source
Express.js Documentation
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_API

# express.json([options])

This middleware is available in Express v4.16.0 onwards.

Parses incoming requests with JSON payloads. Based on body-parser.

Signature

express.json([options])

Options table

Property      Type      Default           Description
inflate       Boolean   true              enable handling deflated bodies
limit         Mixed     "100kb"          max request body size (bytes or string)
reviver       Function  null              passed to JSON.parse as second arg
strict        Boolean   true              only accept arrays and objects
type          Mixed     "application/json" media type(s) to parse
verify        Function  undefined         verify(req,res,buf,encoding)

Behavior

On match, populates req.body with parsed object or {}. Throws on parse errors. Supports gzip and deflate.

# express.urlencoded([options])

This middleware is available in Express v4.16.0 onwards.

Parses URL-encoded payloads. Based on body-parser.

Signature

express.urlencoded([options])

Options table

Property        Type      Default                Description
extended        Boolean   true                   true: use qs for rich objects; false: querystring
inflate         Boolean   true                   enable handling deflated bodies
limit           Mixed     "100kb"               max request body size
parameterLimit  Number    1000                   max number of parameters
type            Mixed     "application/x-www-form-urlencoded" media type(s) to parse
verify          Function  undefined              verify(req,res,buf,encoding)

Behavior

Populates req.body with an object. Supports gzip and deflate. Extended controls value types.

# express.static(root, [options])

Built-in middleware for serving static files. Based on serve-static.

Signature

express.static(root, [options])

Arguments

root    String  directory to serve
options Object  see table

Options table

Property      Type      Default          Description
dotfiles      String    undefined        allow|deny|ignore handling of dotfiles
etag          Boolean   true             enable weak ETag generation
extensions    Mixed     false            ['ext','...'] file extension fallbacks
fallthrough   Boolean   true             next() on client errors
immutable     Boolean   false            enable Cache-Control immutable
index         Mixed     "index.html"    directory index file or false
type          Mixed     undefined        see dotfiles handling
lastModified  Boolean   true             set Last-Modified header
maxAge        Number    0                Cache-Control max-age in ms
redirect      Boolean   true             add trailing slash redirect
setHeaders    Function  undefined        fn(res,path,stat) to set headers

Behavior

Serves files by combining req.url with root. On missing file calls next().

# express.Router([options])

Creates modular mountable route handlers.

Signature

express.Router([options])

Options table

Property       Type     Default  Availability
caseSensitive  Boolean  false    all versions
mergeParams    Boolean  false    4.5.0+
strict         Boolean  false    all versions

Behavior

Use router.METHOD(...) and router.use(...) to attach middleware or routes.

Retrieved 2024-06-17
Data Size: 18301639 bytes

## Attribution
- Source: Express.js Documentation
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-11T06:58:11.039Z
- Data Size: 18301639 bytes
- Links Found: 17680

## Retrieved
2025-05-11
