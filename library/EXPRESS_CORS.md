# EXPRESS_CORS

## Crawl Summary
cors middleware installation via npm install cors; cors(options?) returns Express middleware function(req,res,next); global: app.use(cors()); per-route: app.get(path, cors(options), handler); options object with properties: origin Boolean|String|RegExp|Array|Function default '*'; methods String|Array default 'GET,HEAD,PUT,PATCH,POST,DELETE'; allowedHeaders String|Array default reflect request; exposedHeaders String|Array default none; credentials Boolean default false; maxAge Number default undefined; preflightContinue Boolean default false; optionsSuccessStatus Number default 204; dynamic origin via function(origin,callback); async config via function(req,callback) returning options; pre-flight via app.options; default config shown

## Normalised Extract
Table of Contents
1 Installation
2 Initialization
3 Global Middleware
4 Per-Route Middleware
5 Configuration Options
   5.1 origin
   5.2 methods
   5.3 allowedHeaders
   5.4 exposedHeaders
   5.5 credentials
   5.6 maxAge
   5.7 preflightContinue
   5.8 optionsSuccessStatus
6 Dynamic Origin
7 Async Configuration
8 Pre-Flight Handling

1 Installation
npm install cors

2 Initialization
var express = require('express')
var cors = require('cors')
var app = express()

3 Global Middleware
app.use(cors())

4 Per-Route Middleware
app.get('/products/:id', cors(), handler)

5 Configuration Options
5.1 origin
  Boolean true reflects request origin or false disables; String exact origin; RegExp pattern test; Array of String or RegExp; Function(origin,callback(err,allowedOrigin))
5.2 methods
  Comma-delimited string or Array of methods
5.3 allowedHeaders
  Comma-delimited string or Array; defaults to Access-Control-Request-Headers
5.4 exposedHeaders
  Comma-delimited string or Array; no default
5.5 credentials
  Boolean; if true sets Access-Control-Allow-Credentials
5.6 maxAge
  Integer; sets Access-Control-Max-Age
5.7 preflightContinue
  Boolean; if true passes preflight to next handler
5.8 optionsSuccessStatus
  Integer; status for successful OPTIONS responses

6 Dynamic Origin
origin option can be function(origin,callback) to load allowed origins from database

7 Async Configuration
cors accepts function(req,callback(err,options)) to compute options per request

8 Pre-Flight Handling
app.options('/path', cors()) for specific routes
app.options('*', cors()) globally


## Supplementary Details
Default configuration object
{
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

Implementation steps
1 Install cors package
2 Require cors in application
3 Use app.use(cors()) before other middlewares
4 For specific routes, call cors(options) inline
5 Configure dynamic origin by supplying origin function
6 Handle preflight using app.options

Key parameter effects
origin true reflects origin header; false disables CORS; String limits to that domain; RegExp matches origins; Array accepts multiple; Function custom logic
optionsSuccessStatus 200 needed for IE11 and SmartTVs


## Reference Details
Function Signature
cors(options?: Object|Function) => function(req: IncomingMessage, res: ServerResponse, next: Function)

Parameters
options.origin Boolean|String|RegExp|Array|Function default '*'
options.methods String|Array default ['GET','HEAD','PUT','PATCH','POST','DELETE']
options.allowedHeaders String|Array default request Access-Control-Request-Headers
options.exposedHeaders String|Array default []
options.credentials Boolean default false
options.maxAge Number default undefined
options.preflightContinue Boolean default false
options.optionsSuccessStatus Number default 204

Usage Examples
// Global
app.use(cors())

// Single route
app.get('/data', cors({ origin: 'http://example.com', optionsSuccessStatus: 200 }), handler)

// Dynamic origin
var corsOptions = { origin: function(origin, callback) { db.getAllowed(function(err,origins){ callback(err, origins) }) }}
app.get('/data', cors(corsOptions), handler)

// Async delegate
function corsDelegate(req, callback) { var allowed = allowlist.includes(req.header('Origin')); callback(null, { origin: allowed }) }
app.get('/data', cors(corsDelegate), handler)

// Preflight
app.options('/data', cors())

Best Practices
Place app.use(cors()) before static, body-parser and routes
Use optionsSuccessStatus 200 for legacy browsers
Limit origins to reduce security risk
Use dynamic origin loading from secure source

Troubleshooting
Issue: Missing CORS header on DELETE requests
Check that app.options('/path', cors()) is registered before app.del

Issue: IE11 preflight returns 204 leading to network error
Set optionsSuccessStatus to 200

Commands
curl -i -X OPTIONS -H 'Origin: http://example.com' http://localhost/data
Expect HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://example.com


## Information Dense Extract
npm install cors; require('cors'); app.use(cors()); app.get(path, cors(options), handler); options: origin[Boolean|String|RegExp|Array|Function]='*', methods[String|Array]='GET,HEAD,PUT,PATCH,POST,DELETE', allowedHeaders[String|Array]=reflect request, exposedHeaders[String|Array]=none, credentials[Boolean]=false, maxAge[Number]=undefined, preflightContinue[Boolean]=false, optionsSuccessStatus[Number]=204; dynamic origin via function(origin,callback); async via function(req,callback); preflight via app.options(path,cors()); signature returns middleware(req,res,next).

## Sanitised Extract
Table of Contents
1 Installation
2 Initialization
3 Global Middleware
4 Per-Route Middleware
5 Configuration Options
   5.1 origin
   5.2 methods
   5.3 allowedHeaders
   5.4 exposedHeaders
   5.5 credentials
   5.6 maxAge
   5.7 preflightContinue
   5.8 optionsSuccessStatus
6 Dynamic Origin
7 Async Configuration
8 Pre-Flight Handling

1 Installation
npm install cors

2 Initialization
var express = require('express')
var cors = require('cors')
var app = express()

3 Global Middleware
app.use(cors())

4 Per-Route Middleware
app.get('/products/:id', cors(), handler)

5 Configuration Options
5.1 origin
  Boolean true reflects request origin or false disables; String exact origin; RegExp pattern test; Array of String or RegExp; Function(origin,callback(err,allowedOrigin))
5.2 methods
  Comma-delimited string or Array of methods
5.3 allowedHeaders
  Comma-delimited string or Array; defaults to Access-Control-Request-Headers
5.4 exposedHeaders
  Comma-delimited string or Array; no default
5.5 credentials
  Boolean; if true sets Access-Control-Allow-Credentials
5.6 maxAge
  Integer; sets Access-Control-Max-Age
5.7 preflightContinue
  Boolean; if true passes preflight to next handler
5.8 optionsSuccessStatus
  Integer; status for successful OPTIONS responses

6 Dynamic Origin
origin option can be function(origin,callback) to load allowed origins from database

7 Async Configuration
cors accepts function(req,callback(err,options)) to compute options per request

8 Pre-Flight Handling
app.options('/path', cors()) for specific routes
app.options('*', cors()) globally

## Original Source
CORS Middleware for Express
https://github.com/expressjs/cors

## Digest of EXPRESS_CORS

# Installation

Install CORS middleware via npm:

```bash
npm install cors
```

# Usage

Require and apply middleware globally:

```javascript
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

Enable CORS on a single route:

```javascript
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})
```

# Configuration Options

All options are properties of an options object passed to cors(options).

- origin  Default '*'  Type: Boolean|String|RegExp|Array|Function
- methods  Default 'GET,HEAD,PUT,PATCH,POST,DELETE'  Type: String|Array
- allowedHeaders  Default reflect request's Access-Control-Request-Headers  Type: String|Array
- exposedHeaders  Default none  Type: String|Array
- credentials  Default false  Type: Boolean
- maxAge  Default undefined  Type: Number
- preflightContinue  Default false  Type: Boolean
- optionsSuccessStatus  Default 204  Type: Number

# Dynamic Origin

Provide origin as a function(origin, callback) to load allowed origins at runtime.

# Async Configuration

Use a delegate function corsOptionsDelegate(req, callback) that returns error and options.

# Pre-Flight Handling

Enable pre-flight for specific routes:

```javascript
app.options('/products/:id', cors())
app.del('/products/:id', cors(), handler)
```

Or enable globally before routes:

```javascript
app.options('*', cors())
```

## Attribution
- Source: CORS Middleware for Express
- URL: https://github.com/expressjs/cors
- License: MIT License
- Crawl Date: 2025-05-11T03:40:35.328Z
- Data Size: 917679 bytes
- Links Found: 5739

## Retrieved
2025-05-11
