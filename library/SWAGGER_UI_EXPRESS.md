# SWAGGER_UI_EXPRESS

## Crawl Summary
Exposes three middleware functions: serve, serveFiles(document?, options?), setup(document?, options?).  setup options include explorer:boolean(default false), swaggerOptions with validatorUrl|null, url or urls[], customCss|string, customCssUrl|string|string[], customJs|string|string[], customJsStr|string|string[].  Supports loading from local JSON/YAML, remote URL, multiple specs dropdown, inline CSS/JS injection, dynamic per-request docs via req.swaggerDoc, and multiple UI instances.  Requires Node>=0.10.32, Express>=4.  Installation via npm install swagger-ui-express.  Serve static assets before setup handler.  Examples include Express app and Router patterns.

## Normalised Extract
Table of Contents
1 Installation
2 Middleware Functions
3 Setup Options
4 SwaggerOptions
5 Custom CSS Injection
6 Custom JS Injection
7 Loading from URL
8 Loading YAML
9 Dynamic Request Docs
10 Multiple UI Instances
11 Link Endpoint
12 Requirements
13 Testing

1 Installation
  npm install swagger-ui-express

2 Middleware Functions
  Import: const swaggerUi = require('swagger-ui-express')
  Serve static assets: swaggerUi.serve
  Serve files & index: swaggerUi.serveFiles(swaggerDocument?, options?)
  Render UI HTML: swaggerUi.setup(swaggerDocument?, options?)

3 Setup Options
  explorer:boolean (default false)
  customCss:string
  customCssUrl:string|string[]
  customJs:string|string[]
  customJsStr:string|string[]

4 SwaggerOptions
  validatorUrl:string|null
  url:string               // when initial document null
  urls: [{url:string, name:string}]

5 Custom CSS Injection
  customCss applies raw CSS string after base styles
  customCssUrl loads external CSS files

6 Custom JS Injection
  customJs loads external JS files
  customJsStr embeds inline JS strings

7 Loading from URL
  setup(null, { swaggerOptions: { url: 'http://...' } })

8 Loading YAML
  Use yaml.parse on fs.readFileSync
  Pass parsed object to setup

9 Dynamic Request Docs
  In middleware set req.swaggerDoc = modifiedDocument
  Use serveFiles() and setup() with no arguments

10 Multiple UI Instances
  Use serveFiles(doc, opts) then setup(doc)
  Register distinct routes per instance

11 Link Endpoint
  app.get('/path/swagger.json', res.json(document))
  setup(null, { swaggerOptions: { url: '/path/swagger.json' } })

12 Requirements
  Node >=0.10.32
  Express >=4

13 Testing
  npm install phantom
  npm test

## Supplementary Details
Version pinning: swagger UI assets pulled from swagger-ui-dist; lock the version via package-lock.json or yarn.lock to ensure consistent UI across environments.  Implementation steps: 1. npm install swagger-ui-express 2. require module 3. import or parse swagger spec 4. app.use/or router.use static assets via swaggerUi.serve or swaggerUi.serveFiles 5. mount setup handler swaggerUi.setup with spec and options 6. open /api-docs 7. optional: add express middleware before serveFiles to modify req.swaggerDoc 8. for YAML use yaml module 9. for multiple specs use swaggerOptions.urls array 10. for CSS/JS injection use customCss, customCssUrl, customJs, customJsStr.  Example router integration: const router = express.Router(); router.use('/docs', swaggerUi.serve); router.get('/docs', swaggerUi.setup(swaggerSpec, { explorer: true })); app.use(router).

## Reference Details
/* Module Import */
const swaggerUi = require('swagger-ui-express')

/* Middleware Signatures */
serve: (req: Request, res: Response, next: NextFunction) => void
serveFiles: (swaggerDocument?: object, options?: SetupOptions) => (req: Request, res: Response, next: NextFunction) => void
setup: (swaggerDocument?: object, options?: SetupOptions) => (req: Request, res: Response, next: NextFunction) => void

/* SetupOptions Interface */
interface SetupOptions {
  explorer?: boolean               // default false
  swaggerOptions?: {
    url?: string                   // load spec from URL
    urls?: { url: string; name: string }[] // multiple specs dropdown
    validatorUrl?: string | null   // default online validator, null disables
    filter?: boolean | string
    docExpansion?: 'none' | 'list' | 'full'
    defaultModelsExpandDepth?: number
    defaultModelExpandDepth?: number
    defaultModelRendering?: 'example' | 'model'
    displayRequestDuration?: boolean
    operationsSorter?: string | ((a,b) => number)
    tagsSorter?: string | ((a,b) => number)
    supportedSubmitMethods?: string[]
    showExtensions?: boolean
    showCommonExtensions?: boolean
  }
  customCss?: string               // raw CSS
  customCssUrl?: string | string[] // external CSS URLs
  customJs?: string | string[]     // external JS URLs
  customJsStr?: string | string[]  // inline JS strings
}

/* Example Code Patterns */
// Basic setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Explorer bar
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

// Custom validator
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerOptions: { validatorUrl: null } }))

// Inline CSS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss: '.topbar { display: none }' }))

// Multiple specs dropdown
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { explorer: true, swaggerOptions: { urls: [{ url:'a.json', name:'A' },{ url:'b.json', name:'B' }] } }))

// YAML load
const YAML = require('yaml')
const fs = require('fs')
const doc = YAML.parse(fs.readFileSync('swagger.yaml','utf8'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc))

// Dynamic host
app.use('/api-docs', (req,_,next) => { req.swaggerDoc = Object.assign({}, swaggerDocument, { host: req.get('host') }); next() }, swaggerUi.serveFiles(), swaggerUi.setup())

// Troubleshooting
// 1. Verify JSON parse errors: console.log(swaggerDocument)
// 2. Check route ordering: static assets before setup
// 3. Curl health check: curl -I http://localhost:3000/api-docs | grep HTTP
// Expected: HTTP/1.1 200 OK

/* Requirements */
// Node v0.10.32+  Express 4+

/* Testing */
// npm install phantom
// npm test


## Information Dense Extract
serve:RequestHandler; serveFiles(doc?:object,opts?:{explorer?:boolean,swaggerOptions?:{url?:string,urls?:{url,name}[],validatorUrl?:string|null},customCss?:string,customCssUrl?:string|string[],customJs?:string|string[],customJsStr?:string|string[]}):RequestHandler; setup(doc?:object,opts?:Same):RequestHandler; usage: npm install swagger-ui-express; import const swaggerUi=require('swagger-ui-express'); app.use('/api-docs',serve,setup(doc,opts)); key opts: explorer:boolean(false), swaggerOptions:{validatorUrl:null, url:string, urls:[{url,name}]}, customCss:string, customCssUrl:string|string[], customJs:string|string[], customJsStr:string|string[]; YAML: use yaml.parse(fs.readFileSync); dynamic: req.swaggerDoc before serveFiles(); multiple: serveFiles(doc1),setup(doc1) on separate routes; link JSON: app.get('/swagger.json',res.json(doc)); setup(null,{swaggerOptions:{url:'/swagger.json'}}); requires Node>=0.10.32, Express>=4; tests: npm install phantom && npm test

## Sanitised Extract
Table of Contents
1 Installation
2 Middleware Functions
3 Setup Options
4 SwaggerOptions
5 Custom CSS Injection
6 Custom JS Injection
7 Loading from URL
8 Loading YAML
9 Dynamic Request Docs
10 Multiple UI Instances
11 Link Endpoint
12 Requirements
13 Testing

1 Installation
  npm install swagger-ui-express

2 Middleware Functions
  Import: const swaggerUi = require('swagger-ui-express')
  Serve static assets: swaggerUi.serve
  Serve files & index: swaggerUi.serveFiles(swaggerDocument?, options?)
  Render UI HTML: swaggerUi.setup(swaggerDocument?, options?)

3 Setup Options
  explorer:boolean (default false)
  customCss:string
  customCssUrl:string|string[]
  customJs:string|string[]
  customJsStr:string|string[]

4 SwaggerOptions
  validatorUrl:string|null
  url:string               // when initial document null
  urls: [{url:string, name:string}]

5 Custom CSS Injection
  customCss applies raw CSS string after base styles
  customCssUrl loads external CSS files

6 Custom JS Injection
  customJs loads external JS files
  customJsStr embeds inline JS strings

7 Loading from URL
  setup(null, { swaggerOptions: { url: 'http://...' } })

8 Loading YAML
  Use yaml.parse on fs.readFileSync
  Pass parsed object to setup

9 Dynamic Request Docs
  In middleware set req.swaggerDoc = modifiedDocument
  Use serveFiles() and setup() with no arguments

10 Multiple UI Instances
  Use serveFiles(doc, opts) then setup(doc)
  Register distinct routes per instance

11 Link Endpoint
  app.get('/path/swagger.json', res.json(document))
  setup(null, { swaggerOptions: { url: '/path/swagger.json' } })

12 Requirements
  Node >=0.10.32
  Express >=4

13 Testing
  npm install phantom
  npm test

## Original Source
Swagger UI Express Middleware
https://github.com/scottie1984/swagger-ui-express

## Digest of SWAGGER_UI_EXPRESS

# SWAGGER UI EXPRESS

This module adds middleware to Express to serve Swagger UI based on a Swagger JSON/YAML document.

# Usage

```bash
npm install swagger-ui-express
```  
```js
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)
```  
Or with Express Router:
```js
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
```  

Open `http://<host>:<port>/api-docs` to view.

# API Methods

## swaggerUi.serve
Express middleware (Request, Response, Next) serving Swagger UI static assets.

## swaggerUi.serveFiles(document, options)
Signature: `serveFiles(swaggerDocument?: Object, options?: SetupOptions): RequestHandler`  
Serves static assets and index with provided document.

## swaggerUi.setup(document, options)
Signature: `setup(swaggerDocument?: Object, options?: SetupOptions): RequestHandler`  
Renders Swagger UI HTML page bound to `swaggerDocument`.

# Configuration Options

Pass second parameter to `setup()` with the following shape:

```js
const options = {
  explorer: true,                // display search bar
  swaggerOptions: {              // passed directly to Swagger UI
    validatorUrl: null,          // disable online validator
    url: 'http://example.com',   // load from URL if first param null
    urls: [                      // dropdown of multiple specs
      { url: 'http://a.json', name: 'A' },
      { url: 'http://b.json', name: 'B' }
    ]
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customCssUrl: ['/c1.css', 'https://x/c2.css'],
  customJs: ['/c1.js', 'https://x/c2.js'],
  customJsStr: ['console.log("Hello")', 'var x=1']
}
```  

Refer to Swagger UI Configuration for full list.

# Loading YAML

```bash
npm install yaml
```  
```js
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
```

# Dynamic Document

```js
app.use(
  '/api-docs',
  (req, res, next) => {
    req.swaggerDoc = /* modified JSON */
    next()
  },
  swaggerUi.serveFiles(),
  swaggerUi.setup()
)
```

# Multiple Instances

```js
app.use(
  '/docs1',
  swaggerUi.serveFiles(doc1, opts),
  swaggerUi.setup(doc1)
)
app.use(
  '/docs2',
  swaggerUi.serveFiles(doc2, opts),
  swaggerUi.setup(doc2)
)
```

# Link to Swagger JSON

```js
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument))
const options = { swaggerOptions: { url: '/api-docs/swagger.json' } }
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options))
```

# Requirements

Node >= 0.10.32  
Express >= 4

# Testing

```bash
npm install phantom
npm test
```

## Attribution
- Source: Swagger UI Express Middleware
- URL: https://github.com/scottie1984/swagger-ui-express
- License: MIT License
- Crawl Date: 2025-05-11T02:58:12.310Z
- Data Size: 1061638 bytes
- Links Found: 5606

## Retrieved
2025-05-11
