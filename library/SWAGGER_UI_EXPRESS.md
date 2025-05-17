# SWAGGER_UI_EXPRESS

## Crawl Summary
Install via npm install swagger-ui-express@latest. Exposes swagger-ui-dist assets through Express via two exported handlers: serve (Array<express.Handler>) and serveFiles(swaggerDoc?:object|null,options?:SetupOptions):RequestHandler. Initialization via setup(swaggerDoc:object|null,options?:SetupOptions):RequestHandler. SetupOptions: explorer:boolean (default false); swaggerOptions: { validatorUrl:string|null; url:string; urls:Array<{name:string,url:string}> }; customCss:string; customCssUrl:string|string[]; customJs:string|string[]; customJsStr:string|string[]. Supports loading from URL (setup(null,options)), multiple docs dropdown, YAML parsing via yaml.parse, dynamic req.swaggerDoc injection, multiple UI instances via serveFiles, JSON download link. Requirements Node>=0.10.32, Express>=4. Testing via npm install phantom && npm test.

## Normalised Extract
Table of Contents:
1. Installation & Integration
2. Middleware Functions
3. SetupOptions Configuration
4. Router Integration
5. Remote Swagger Loading
6. YAML Loading
7. Dynamic Document Modification
8. Multiple UI Instances
9. JSON Download Link
10. Requirements & Testing

1. Installation & Integration
   - Run npm install swagger-ui-express@latest
   - Require in code: const swaggerUi = require('swagger-ui-express')
   - Mount middleware: app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

2. Middleware Functions
   - serve: Array<express.Handler> serving static assets from swagger-ui-dist
   - setup(swaggerDoc: object|null, options?: SetupOptions): express.RequestHandler initializes UI
   - serveFiles(swaggerDoc?: object|null, options?: SetupOptions): express.RequestHandler serves files+UI combo

3. SetupOptions Configuration
   - explorer: boolean default false toggles top-left explorer bar
   - swaggerOptions.validatorUrl: string|null default null
   - swaggerOptions.url: string loads spec from URL
   - swaggerOptions.urls: array of { name:string; url:string } for dropdown
   - customCss: string inline CSS overrides default
   - customCssUrl: string or array of strings public CSS URLs
   - customJs: string or array of strings public JS URLs
   - customJsStr: string or array of strings inline JS code

4. Router Integration
   - For Express.Router: router.use('/api-docs', swaggerUi.serve)
   - router.get('/api-docs', swaggerUi.setup(swaggerDocument))

5. Remote Swagger Loading
   - Pass null to setup first parameter
   - Use options.swaggerOptions.url or .urls
   - Enable explorer:true for multi-spec dropdown

6. YAML Loading
   - npm install yaml
   - const file = fs.readFileSync('./swagger.yaml','utf8')
   - const swaggerDocument = YAML.parse(file)
   - app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

7. Dynamic Document Modification
   - Middleware: function(req,res,next){ req.swaggerDoc=modifiedDoc; next() }
   - Followed by swaggerUi.serveFiles() and swaggerUi.setup()

8. Multiple UI Instances
   - Use serveFiles per document: app.use('/api-docs-one', swaggerUi.serveFiles(docOne,opts), swaggerUi.setup(docOne))
   - Repeat for second doc

9. JSON Download Link
   - Define endpoint: app.get('/api-docs/swagger.json',(req,res)=>res.json(swaggerDocument))
   - Serve UI pointing to '/api-docs/swagger.json' via swaggerOptions.url

10. Requirements & Testing
   - Node minimum v0.10.32
   - Express minimum v4
   - For testing: npm install phantom; npm test

## Supplementary Details
Default Values and Implementation Steps:

Default SetupOptions:
  explorer: false
  swaggerOptions: {
    validatorUrl: null,
    url: undefined,
    urls: undefined
  }
  customCss: ''
  customCssUrl: undefined
  customJs: undefined
  customJsStr: undefined

Implementation Steps:
1. Lock swagger-ui-dist version in package.json to ensure consistency across environments.
2. Install dependencies: npm install swagger-ui-express swagger-ui-dist@<version>
3. Require modules: express, swagger-ui-express, fs/yaml if loading YAML.
4. Mount middleware in correct order: static serve before setup or serveFiles.
5. For routers, split serve and setup into .use and .get methods.
6. To load remote specs, pass null to setup and specify options.swaggerOptions.url or urls array.
7. For dynamic modification, insert middleware that assigns req.swaggerDoc before serveFiles and setup.
8. To host multiple specs, use serveFiles for each spec path then setup for each.
9. To provide JSON download, create express GET endpoint for swagger.json and configure swaggerOptions.url to point to it.
10. Run tests: npm install phantom && npm test

## Reference Details
Type Definitions and API Specifications:

export interface SetupOptions {
  explorer?: boolean
  swaggerOptions?: {
    validatorUrl?: string | null
    url?: string
    urls?: Array<{ name: string; url: string }>
  }
  customCss?: string
  customCssUrl?: string | string[]
  customJs?: string | string[]
  customJsStr?: string | string[]
}

export declare const serve: express.Handler[]
export declare function setup(
  swaggerDoc: object | null,
  options?: SetupOptions
): express.RequestHandler
export declare function serveFiles(
  swaggerDoc?: object | null,
  options?: SetupOptions
): express.RequestHandler

Complete Code Examples:

// Basic Setup
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Router Example
const router = require('express').Router()
router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
app.use(router)

// Remote Spec Loading
app.use('/api-docs-remotes', swaggerUi.serve, swaggerUi.setup(null, {
  explorer: true,
  swaggerOptions: {
    urls: [
      { name: 'Spec1', url: 'http://example.com/spec1.json' },
      { name: 'Spec2', url: 'http://example.com/spec2.json' }
    ]
  }
}))

// YAML Spec Loading
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerYamlDoc = YAML.parse(file)
app.use('/api-docs-yaml', swaggerUi.serve, swaggerUi.setup(swaggerYamlDoc))

// Dynamic Doc Middleware
app.use('/api-docs-dynamic', reqHandler, swaggerUi.serveFiles(), swaggerUi.setup())
function reqHandler(req, res, next) {
  req.swaggerDoc = { host: req.get('host'), paths: {} }
  next()
}

// JSON Download Endpoint
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument))
app.use('/api-docs', swaggerUi.serveFiles(null, { swaggerOptions: { url: '/api-docs/swagger.json' } }), swaggerUi.setup(null, { swaggerOptions: { url: '/api-docs/swagger.json' } }))

Concrete Best Practices:
- Pin swagger-ui-dist version in lock file.
- Inject only trusted customCss and customJs.
- Separate serve and setup for router contexts.
- Use serveFiles when hosting multiple UI instances.

Troubleshooting Procedures:
1. UI returns 404 for assets: verify serve middleware mounting and correct static path.
   Command: app._router.stack.forEach(layer => console.log(layer.route || layer.name))
2. Missing swaggerDocument error: ensure req.swaggerDoc assignment before serveFiles or passing document to setup.
3. Validator failures: set swaggerOptions.validatorUrl to null to disable external validation.
4. Broken YAML parse: run node -e "console.log(require('yaml').parse(fs.readFileSync('./swagger.yaml','utf8')))" to validate syntax.
5. JSON endpoint check: curl http://localhost:3000/api-docs/swagger.json | jq .


## Information Dense Extract
Install swagger-ui-express and lock swagger-ui-dist in package.json. In code: const swaggerUi=require('swagger-ui-express'); mount app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument,{ explorer:true, swaggerOptions:{ validatorUrl:null, url:'<url>', urls:[{name:'Spec1',url:'<url1>'}] }, customCss:'.swagger-ui .topbar{display:none}', customCssUrl:['/custom.css'], customJs:['/custom.js'], customJsStr:['console.log("hi")'] })); Function signatures: setup(doc:object|null,opts?:SetupOptions):RequestHandler; serveFiles(doc?:object|null,opts?:SetupOptions):RequestHandler; serve:Array<Handler>. SetupOptions:{ explorer?:boolean; swaggerOptions?:{ validatorUrl?:string|null; url?:string; urls?:{name:string;url:string}[] }; customCss?:string; customCssUrl?:string|string[]; customJs?:string|string[]; customJsStr?:string|string[] }. Load YAML: fs.readFileSync+yaml.parse. Dynamic docs via middleware setting req.swaggerDoc. Multiple UIs via serveFiles per route. JSON download via GET endpoint and swaggerOptions.url. Requirements: Node>=0.10.32, Express>=4. Test: npm install phantom && npm test.

## Sanitised Extract
Table of Contents:
1. Installation & Integration
2. Middleware Functions
3. SetupOptions Configuration
4. Router Integration
5. Remote Swagger Loading
6. YAML Loading
7. Dynamic Document Modification
8. Multiple UI Instances
9. JSON Download Link
10. Requirements & Testing

1. Installation & Integration
   - Run npm install swagger-ui-express@latest
   - Require in code: const swaggerUi = require('swagger-ui-express')
   - Mount middleware: app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

2. Middleware Functions
   - serve: Array<express.Handler> serving static assets from swagger-ui-dist
   - setup(swaggerDoc: object|null, options?: SetupOptions): express.RequestHandler initializes UI
   - serveFiles(swaggerDoc?: object|null, options?: SetupOptions): express.RequestHandler serves files+UI combo

3. SetupOptions Configuration
   - explorer: boolean default false toggles top-left explorer bar
   - swaggerOptions.validatorUrl: string|null default null
   - swaggerOptions.url: string loads spec from URL
   - swaggerOptions.urls: array of { name:string; url:string } for dropdown
   - customCss: string inline CSS overrides default
   - customCssUrl: string or array of strings public CSS URLs
   - customJs: string or array of strings public JS URLs
   - customJsStr: string or array of strings inline JS code

4. Router Integration
   - For Express.Router: router.use('/api-docs', swaggerUi.serve)
   - router.get('/api-docs', swaggerUi.setup(swaggerDocument))

5. Remote Swagger Loading
   - Pass null to setup first parameter
   - Use options.swaggerOptions.url or .urls
   - Enable explorer:true for multi-spec dropdown

6. YAML Loading
   - npm install yaml
   - const file = fs.readFileSync('./swagger.yaml','utf8')
   - const swaggerDocument = YAML.parse(file)
   - app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

7. Dynamic Document Modification
   - Middleware: function(req,res,next){ req.swaggerDoc=modifiedDoc; next() }
   - Followed by swaggerUi.serveFiles() and swaggerUi.setup()

8. Multiple UI Instances
   - Use serveFiles per document: app.use('/api-docs-one', swaggerUi.serveFiles(docOne,opts), swaggerUi.setup(docOne))
   - Repeat for second doc

9. JSON Download Link
   - Define endpoint: app.get('/api-docs/swagger.json',(req,res)=>res.json(swaggerDocument))
   - Serve UI pointing to '/api-docs/swagger.json' via swaggerOptions.url

10. Requirements & Testing
   - Node minimum v0.10.32
   - Express minimum v4
   - For testing: npm install phantom; npm test

## Original Source
OpenAPI & Interactive Documentation
https://github.com/scottie1984/swagger-ui-express#readme

## Digest of SWAGGER_UI_EXPRESS

# SWAGGER UI EXPRESS
Date Retrieved: 2024-06-17
Data Size: 770429 bytes
Links Found: 5126

# Installation
npm install swagger-ui-express@latest

# Basic Usage
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

# Express Router Usage
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

# Middleware Function Signatures
serve  : Array<express.Handler> (serves swagger-ui-dist assets)
setup  : (swaggerDoc: object|null, options?: SetupOptions) => express.RequestHandler
serveFiles : (swaggerDoc?: object|null, options?: SetupOptions) => express.RequestHandler

# SetupOptions Interface
explorer       : boolean (default false)
swaggerOptions : {
  validatorUrl?: string|null (default null),
  url?: string,
  urls?: Array<{ name: string; url: string }>
}
customCss      : string
default ''
customCssUrl   : string|string[]
customJs       : string|string[]
customJsStr    : string|string[]

# Customizing Explorer
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

# Passing Swagger Client Options
var options = {
  swaggerOptions: {
    validatorUrl: null
  }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

# Custom CSS and CSS URLs
var options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customCssUrl: ['/custom.css', 'https://example.com/other-custom.css']
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

# Custom JS and Inline JS
var options = {
  customJs: ['/custom.js', 'https://example.com/other-custom.js'],
  customJsStr: ['console.log("Hello World")', 'var x = 1; console.log(x)']
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

# Loading Swagger from URL
var options = {
  swaggerOptions: {
    url: 'http://petstore.swagger.io/v2/swagger.json'
  }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

# Multiple Documents Dropdown
var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      { url: 'http://petstore.swagger.io/v2/swagger.json', name: 'Spec1' },
      { url: 'http://petstore.swagger.io/v2/swagger.json', name: 'Spec2' }
    ]
  }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

# Loading YAML
npm install yaml
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

# Dynamic Modification Before Serve
app.use('/api-docs', function(req, res, next) {
  swaggerDocument.host = req.get('host')
  req.swaggerDoc = swaggerDocument
  next()
}, swaggerUi.serveFiles(swaggerDocument, {}), swaggerUi.setup())

# Multiple UI Instances
app.use('/api-docs-one', swaggerUi.serveFiles(docOne, opts), swaggerUi.setup(docOne))
app.use('/api-docs-two', swaggerUi.serveFiles(docTwo, opts), swaggerUi.setup(docTwo))

# JSON Download Link
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument))
app.use('/api-docs', swaggerUi.serveFiles(null, { swaggerOptions: { url: '/api-docs/swagger.json' } }), swaggerUi.setup(null, { swaggerOptions: { url: '/api-docs/swagger.json' } }))

# Requirements
Node >= 0.10.32
Express >= 4

# Testing
npm install phantom
npm test

## Attribution
- Source: OpenAPI & Interactive Documentation
- URL: https://github.com/scottie1984/swagger-ui-express#readme
- License: License: CC0 1.0 Universal / Apache-2.0 / MIT
- Crawl Date: 2025-05-17T12:29:49.413Z
- Data Size: 770429 bytes
- Links Found: 5126

## Retrieved
2025-05-17
