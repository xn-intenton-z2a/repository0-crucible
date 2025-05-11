# EXPRESS_MIDDLEWARE

## Crawl Summary
express.json: parse JSON bodies; options inflate(Boolean,true), limit(number|string,100kb), reviver(Function,null), strict(Boolean,true), type(Mixed,application/json), verify(Function)
express.raw: parse Buffer bodies; options inflate, limit, type(application/octet-stream), verify
express.text: parse text bodies; options defaultCharset(utf-8), inflate, limit, type(text/plain), verify
express.urlencoded: parse urlencoded; options extended(true), inflate, limit, parameterLimit(1000), type(application/x-www-form-urlencoded), verify
express.Router: create router; options caseSensitive(false), mergeParams(false), strict(false)
express.static: serve files; options dotfiles(undefined), etag(true), extensions(false), fallthrough(true), immutable(false), index(index.html), lastModified(true), maxAge(0), redirect(true), setHeaders(Function)

## Normalised Extract
Table of Contents:
1 express.json
2 express.raw
3 express.text
4 express.urlencoded
5 express.Router
6 express.static

1 express.json
Function signature: express.json(options?) → RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = "100kb"
  reviver: Function = null
  strict: Boolean = true
  type: string|string[]|function = "application/json"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses JSON, populates req.body with object or {} on no body\/no match\/error

2 express.raw
Function signature: express.raw(options?) → RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = "100kb"
  type: string|string[]|function = "application/octet-stream"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into Buffer, populates req.body with Buffer or {}

3 express.text
Function signature: express.text(options?) → RequestHandler
Options:
  defaultCharset: string = "utf-8"
  inflate: Boolean = true
  limit: number|string = "100kb"
  type: string|string[]|function = "text/plain"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into string, populates req.body with string or {}

4 express.urlencoded
Function signature: express.urlencoded(options?) → RequestHandler
Options:
  extended: Boolean = true
  inflate: Boolean = true
  limit: number|string = "100kb"
  parameterLimit: number = 1000
  type: string|string[]|function = "application/x-www-form-urlencoded"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses URL-encoded data into object or {}

5 express.Router
Function signature: express.Router(options?) → Router
Options:
  caseSensitive: Boolean = false
  mergeParams: Boolean = false
  strict: Boolean = false
Behavior: creates modular route handlers

6 express.static
Function signature: express.static(root,options?) → RequestHandler
Options:
  dotfiles: "allow"|"deny"|"ignore"|undefined = undefined
  etag: Boolean = true
  extensions: string[]|false = false
  fallthrough: Boolean = true
  immutable: Boolean = false
  index: string|false = "index.html"
  lastModified: Boolean = true
  maxAge: number|string = 0
  redirect: Boolean = true
  setHeaders: function(res,path,stat) = undefined
Behavior: serves static assets with caching and fallback

## Supplementary Details
Node.js version >= 0.10 required
Installation: npm install express
Import and app creation:
  var express = require('express')
  var app = express()
Mount middleware before routes:
  app.use(express.json({limit:'1mb'}))
  app.use(express.urlencoded({extended:false, parameterLimit:500}))
  app.use(express.text())
  app.use(express.raw({type:'application/custom'}))
Create router and mount:
  var router = express.Router({mergeParams:true, strict:true})
  router.get('/path', handler)
  app.use('/api', router)
Serve static files with custom headers:
  app.use(express.static('public',{maxAge:'1d', immutable:true, setHeaders:function(res,path,stat){res.set('X-Timestamp',Date.now())}}))

## Reference Details
Function Signatures:
  express.json(options?:{
    inflate?:boolean;
    limit?:number|string;
    reviver?:(key:any,value:any)=>any;
    strict?:boolean;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.raw(options?:{
    inflate?:boolean;
    limit?:number|string;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.text(options?:{
    defaultCharset?:string;
    inflate?:boolean;
    limit?:number|string;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.urlencoded(options?:{
    extended?:boolean;
    inflate?:boolean;
    limit?:number|string;
    parameterLimit?:number;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.Router(options?:{
    caseSensitive?:boolean;
    mergeParams?:boolean;
    strict?:boolean;
  }):Router
  express.static(root:string,options?:{
    dotfiles?:'allow'|'deny'|'ignore';
    etag?:boolean;
    extensions?:string[]|false;
    fallthrough?:boolean;
    immutable?:boolean;
    index?:string|false;
    lastModified?:boolean;
    maxAge?:number|string;
    redirect?:boolean;
    setHeaders?:(res:Response,path:string,stat:fs.Stats)=>void;
  }):RequestHandler

Code Examples:
  var express = require('express')
  var app = express()
  app.use(express.json({limit:'2mb', strict:false}))
  app.use(express.urlencoded({extended:true, parameterLimit:2000}))
  var apiRouter = express.Router({caseSensitive:true})
  apiRouter.post('/item', function(req,res){
    if(typeof req.body.id!=='string') return res.status(400).send('Invalid');
    res.json({created:true, id:req.body.id})
  })
  app.use('/api', apiRouter)
  app.use(express.static('public',{maxAge:'1h', immutable:true}))
  app.listen(3000)

Best Practices:
  Validate req.body properties before use
  Test body type: if(!Buffer.isBuffer(req.body)) throw Error
  Use reverse proxy cache for static assets

Troubleshooting:
  Command: curl -X POST http://localhost:3000/api/item -H "Content-Type: application/json" -d '{"id":"123"}'
  Expected: JSON {"created":true,"id":"123"}
  If req.body is empty: check Content-Type header; verify limit not exceeded
  If parsing error: enable verify option to throw on malformed body:
    app.use(express.json({verify:function(req,res,buf){try{JSON.parse(buf)}catch(e){throw e}}}))

## Information Dense Extract
express.json:inflate:true|limit:100kb|reviver:null|strict:true|type:application/json|verify:fn → RequestHandler; express.raw:inflate:true|limit:100kb|type:application/octet-stream|verify:fn → RequestHandler; express.text:defaultCharset:utf-8|inflate:true|limit:100kb|type:text/plain|verify:fn → RequestHandler; express.urlencoded:extended:true|inflate:true|limit:100kb|parameterLimit:1000|type:application/x-www-form-urlencoded|verify:fn → RequestHandler; express.Router:caseSensitive:false|mergeParams:false|strict:false → Router; express.static:maxAge:0|etag:true|extensions:false|dotfiles:undefined|fallthrough:true|immutable:false|index:index.html|lastModified:true|redirect:true|setHeaders:fn → RequestHandler

## Sanitised Extract
Table of Contents:
1 express.json
2 express.raw
3 express.text
4 express.urlencoded
5 express.Router
6 express.static

1 express.json
Function signature: express.json(options?)  RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = '100kb'
  reviver: Function = null
  strict: Boolean = true
  type: string|string[]|function = 'application/json'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses JSON, populates req.body with object or {} on no body'/no match'/error

2 express.raw
Function signature: express.raw(options?)  RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = '100kb'
  type: string|string[]|function = 'application/octet-stream'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into Buffer, populates req.body with Buffer or {}

3 express.text
Function signature: express.text(options?)  RequestHandler
Options:
  defaultCharset: string = 'utf-8'
  inflate: Boolean = true
  limit: number|string = '100kb'
  type: string|string[]|function = 'text/plain'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into string, populates req.body with string or {}

4 express.urlencoded
Function signature: express.urlencoded(options?)  RequestHandler
Options:
  extended: Boolean = true
  inflate: Boolean = true
  limit: number|string = '100kb'
  parameterLimit: number = 1000
  type: string|string[]|function = 'application/x-www-form-urlencoded'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses URL-encoded data into object or {}

5 express.Router
Function signature: express.Router(options?)  Router
Options:
  caseSensitive: Boolean = false
  mergeParams: Boolean = false
  strict: Boolean = false
Behavior: creates modular route handlers

6 express.static
Function signature: express.static(root,options?)  RequestHandler
Options:
  dotfiles: 'allow'|'deny'|'ignore'|undefined = undefined
  etag: Boolean = true
  extensions: string[]|false = false
  fallthrough: Boolean = true
  immutable: Boolean = false
  index: string|false = 'index.html'
  lastModified: Boolean = true
  maxAge: number|string = 0
  redirect: Boolean = true
  setHeaders: function(res,path,stat) = undefined
Behavior: serves static assets with caching and fallback

## Original Source
Express.js API Reference
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_MIDDLEWARE

# Express.js 4.x API Reference (Built-in Middleware Functions)
Content retrieved: 2024-06-30
Data Size: 26740539 bytes

# express.json([options])
Parses incoming requests with JSON payloads. Based on body-parser.

| Option   | Type                                                  | Default            | Description                                                                                              |
|----------|-------------------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| inflate  | Boolean                                               | true               | Enable handling of gzip/deflate compressed bodies                                                        |
| limit    | number or string                                      | "100kb"           | Max request body size; number in bytes or string parsed by bytes library                                |
| reviver  | function(key, value)                                  | null               | Passed as second argument to JSON.parse                                                                   |
| strict   | Boolean                                               | true               | Accept only arrays and objects; false accepts any JSON.parse input                                        |
| type     | string, string[], or function(req) → boolean          | "application/json"| Media type to parse; passed to type-is or custom function                                                |
| verify   | function(req, res, buf, encoding)                    | undefined          | Called before parsing; throw error to abort parsing                                                       |

# express.raw([options])
Parses all bodies as Buffer. Based on body-parser.

| Option   | Type                                                  | Default                  | Description                                                                                              |
|----------|-------------------------------------------------------|--------------------------|----------------------------------------------------------------------------------------------------------|
| inflate  | Boolean                                               | true                     | Enable handling of gzip/deflate compressed bodies                                                        |
| limit    | number or string                                      | "100kb"                 | Max request body size                                                                                   |
| type     | string, string[], or function(req) → boolean          | "application/octet-stream" | Media type to parse                                                                                      |
| verify   | function(req, res, buf, encoding)                    | undefined                | Called before parsing; throw error to abort parsing                                                       |

# express.text([options])
Parses bodies into string. Based on body-parser.

| Option         | Type                                                | Default      | Description                                                                                              |
|----------------|-----------------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------|
| defaultCharset | string                                              | "utf-8"     | Default charset when not specified in Content-Type                                                       |
| inflate        | Boolean                                             | true         | Enable handling of gzip/deflate compressed bodies                                                        |
| limit          | number or string                                    | "100kb"     | Max request body size                                                                                   |
| type           | string, string[], or function(req) → boolean        | "text/plain"| Media type to parse                                                                                      |
| verify         | function(req, res, buf, encoding)                  | undefined    | Called before parsing; throw error to abort parsing                                                       |

# express.urlencoded([options])
Parses URL-encoded bodies. Based on body-parser.

| Option         | Type                                                | Default            | Description                                                                                              |
|----------------|-----------------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| extended       | Boolean                                             | true               | false uses querystring, true uses qs library                                                              |
| inflate        | Boolean                                             | true               | Enable handling of gzip/deflate compressed bodies                                                        |
| limit          | number or string                                    | "100kb"           | Max request body size                                                                                   |
| parameterLimit | number                                              | 1000               | Max number of URL-encoded parameters                                                                     |
| type           | string, string[], or function(req) → boolean        | "application/x-www-form-urlencoded" | Media type to parse                                                      |
| verify         | function(req, res, buf, encoding)                  | undefined          | Called before parsing; throw error to abort parsing                                                       |

# express.Router([options])
Creates router. Options:

| Option        | Type    | Default | Description                                              |
|---------------|---------|---------|----------------------------------------------------------|
| caseSensitive | Boolean | false   | Enable case sensitivity on route paths                   |
| mergeParams   | Boolean | false   | Preserve parent req.params values                        |
| strict        | Boolean | false   | Enable strict routing: "/foo" != "/foo/"             |

# express.static(root, [options])
Serves static files from root.

| Option      | Type                   | Default       | Description                                                                                     |
|-------------|------------------------|---------------|-------------------------------------------------------------------------------------------------|
| dotfiles    | "allow","deny","ignore" or undefined | undefined     | How to treat files starting with dot                                                           |
| etag        | Boolean                | true          | Enable weak ETag generation                                                                     |
| extensions  | string[] or false      | false         | File extension fallbacks: serve first existing extension                                         |
| fallthrough | Boolean                | true          | if true call next() on client errors; if false invoke next(err)                                  |
| immutable   | Boolean                | false         | Enable immutable Cache-Control directive (
| index       | string or false        | "index.html" | Specify directory index file or disable                                                           |
| lastModified| Boolean                | true          | Set Last-Modified header                                                                        |
| maxAge      | number or string       | 0             | Set Cache-Control max-age in ms or ms format                                                     |
| redirect    | Boolean                | true          | Redirect to trailing slash for directories                                                      |
| setHeaders  | function(res, path, stat) | undefined    | Custom header setter; called synchronously                                                        |

Attribution: source=https://expressjs.com/en/4x/api.html

## Attribution
- Source: Express.js API Reference
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-11T04:57:58.184Z
- Data Size: 26740539 bytes
- Links Found: 21583

## Retrieved
2025-05-11
