# SWAGGER_UI_EXPRESS

## Crawl Summary
Serve Swagger UI in Express via middleware. Use swaggerUi.serve and swaggerUi.setup(document,options). Options: explorer boolean, swaggerOptions object (validatorUrl,null; url,string; urls array of {name,url}). Custom styling: customCss,string; customCssUrl,string|array. Custom scripting: customJs,string|array; customJsUrl,string|array; customJsStr,string|array. Load spec from JSON file, URL, multiple URLs, or YAML. Dynamic host injection: use middleware to set req.swaggerDoc. Multiple instances via serveFiles(document,options). Link to spec via serveFiles(null,options) and setup(null,options). Node and Express requirements. Testing with phantom and npm test.

## Normalised Extract
Table of Contents

1 Installation
2 Express Middleware Setup
3 Options
   3.1 explorer
   3.2 swaggerOptions.validatorUrl
   3.3 swaggerOptions.url
   3.4 swaggerOptions.urls
   3.5 customCss
   3.6 customCssUrl
   3.7 customJs
   3.8 customJsUrl
   3.9 customJsStr
4 Loading Spec
   4.1 from JSON file
   4.2 from URL
   4.3 multiple URLs
   4.4 from YAML
5 Dynamic Document
6 Multiple Instances
7 Linking Spec Endpoint
8 Requirements
9 Testing Procedures

1 Installation
Install via npm:
npm install swagger-ui-express

2 Express Middleware Setup
Require modules:
const swaggerUi = require('swagger-ui-express')
Mount docs:
app.use(path, swaggerUi.serve, swaggerUi.setup(spec,options))
Or split serve and setup with router.get

3 Options
3.1 explorer boolean default false
3.2 swaggerOptions.validatorUrl default "https://validator.swagger.io/"; set null to disable
3.3 swaggerOptions.url string remote spec URL
3.4 swaggerOptions.urls array of {name:string,url:string} to populate dropdown; explorer must be true
3.5 customCss CSS string injected into page style
3.6 customCssUrl string|array public URLs to CSS resources
3.7 customJs string public URL to JS resource
3.8 customJsUrl string|array public URLs to JS resources
3.9 customJsStr string|array inline JS code snippets

4 Loading Spec
4.1 from JSON: require('./swagger.json')
4.2 from URL: setup(null,{swaggerOptions:{url}})
4.3 multiple URLs: setup(null,{explorer:true,swaggerOptions:{urls}})
4.4 from YAML: npm install yaml; read file; YAML.parse; pass document to setup

5 Dynamic Document
Middleware sets req.swaggerDoc then use serveFiles and setup without document args

6 Multiple Instances
Use serveFiles(document,options) before setup(document)

7 Linking Spec Endpoint
Expose GET /api-docs/swagger.json returning JSON; use serveFiles(null,{swaggerOptions:{url}})

8 Requirements
Node>=0.10.32, Express>=4

9 Testing Procedures
Install phantom; run npm test


## Supplementary Details
Express version requirement: 4.x; Node version requirement: >=0.10.32
Lock swagger-ui-dist version via package-lock.json or explicit dependency in package.json:
"swagger-ui-dist": "3.52.5"

Implementation steps:
1. npm install swagger-ui-express swagger-ui-dist
2. require express, swagger-ui-express
3. load swagger JSON or parse YAML
4. configure options object with desired properties
5. mount middleware: app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec,options))
6. verify docs at http://host:port/api-docs

Default options object:
explorer:false
swaggerOptions:{validatorUrl:"https://validator.swagger.io/"}
customCss:undefined
customCssUrl:undefined
customJs:undefined
customJsUrl:undefined
customJsStr:undefined

Common implementation patterns:
- Use express.Router to modularize docs route
- Wrap dynamic host assignment in a middleware before serveFiles
- For multiple specs, use unique paths and independent options


## Reference Details
API Specifications:

swaggerUi.serve: Express middleware function serving static assets. Signature: function(req:Request,res:Response,next:Function):void

swaggerUi.setup(document?:object, options?:{
  explorer?:boolean,
  swaggerOptions?:{
    validatorUrl?:string|null,
    url?:string,
    urls?:Array<{name:string,url:string}>
  },
  customCss?:string,
  customCssUrl?:string|string[],
  customJs?:string|string[],
  customJsUrl?:string|string[],
  customJsStr?:string|string[]
}):Function
Returns middleware that renders Swagger UI HTML.

swaggerUi.serveFiles(document?:object, options?:object):Function
Serves Swagger UI assets bound to document; combine with setup()

Code Example:
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yaml')
const fs = require('fs')
const file = fs.readFileSync('./swagger.yaml','utf8')
const swaggerDocument = YAML.parse(file)
const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      { name: 'API V1', url: '/api/v1/swagger.json' },
      { name: 'API V2', url: '/api/v2/swagger.json' }
    ],
    validatorUrl: null
  },
  customCss: '.swagger-ui .topbar{display:none}',
  customJs: '/assets/custom.js',
  customJsStr: 'console.log("Custom JS loaded")'
}

app.use('/api-docs',
  express.static('public'),
  function(req,res,next){ req.swaggerDoc = swaggerDocument; next() },
  swaggerUi.serveFiles(undefined,options),
  swaggerUi.setup(undefined,options)
)

Configuration Options Table:
option              type               default           effect
explorer            boolean            false             shows dropdown
swaggerOptions.url  string             undefined         loads spec via URL
swaggerOptions.urls Array<{name,url}>  undefined         multiple specs in explorer
swaggerOptions.validatorUrl string|null https://validator.swagger.io/ disables/upgrades request validation
customCss           string             undefined         inline CSS injection
customCssUrl        string|array       undefined         external CSS files
customJs            string|array       undefined         external JS files
customJsUrl         string|array       undefined         external JS files
customJsStr         string|array       undefined         inline JS injection

detailed Troubleshooting:
1. 404 on /api-docs:
   - ensure app.use called before other catch-all routes
   - verify swaggerUi.serve is included
2. Blank page or JS errors:
   - run npm ls swagger-ui-dist to check version
   - clear npm cache and reinstall
3. Validator errors:
   - set validatorUrl:null to disable external validator

Commands:
npm ls swagger-ui-express
npm ls swagger-ui-dist
node -v  # expect >= v0.10.32
npm run test # phantom-based UI tests


## Information Dense Extract
install swagger-ui-express via npm; require express and swagger-ui-express; load swagger spec (JSON or YAML parsed); configure options { explorer:boolean, swaggerOptions:{ validatorUrl:string|null, url:string, urls:[{name,url}] }, customCss:string, customCssUrl:string|array, customJs:string|array, customJsUrl:string|array, customJsStr:string|array }; mount middleware: app.use(path, swaggerUi.serve, swaggerUi.setup(spec,options)); for dynamic docs use middleware to set req.swaggerDoc and serveFiles; multiple instances via serveFiles(document,options); link spec via serveFiles(null,options) and setup(null,options); requirements Node>=0.10.32, Express>=4; troubleshooting: ensure serve and setup order, disable validatorUrl, verify swagger-ui-dist version, run phantom UI tests.

## Sanitised Extract
Table of Contents

1 Installation
2 Express Middleware Setup
3 Options
   3.1 explorer
   3.2 swaggerOptions.validatorUrl
   3.3 swaggerOptions.url
   3.4 swaggerOptions.urls
   3.5 customCss
   3.6 customCssUrl
   3.7 customJs
   3.8 customJsUrl
   3.9 customJsStr
4 Loading Spec
   4.1 from JSON file
   4.2 from URL
   4.3 multiple URLs
   4.4 from YAML
5 Dynamic Document
6 Multiple Instances
7 Linking Spec Endpoint
8 Requirements
9 Testing Procedures

1 Installation
Install via npm:
npm install swagger-ui-express

2 Express Middleware Setup
Require modules:
const swaggerUi = require('swagger-ui-express')
Mount docs:
app.use(path, swaggerUi.serve, swaggerUi.setup(spec,options))
Or split serve and setup with router.get

3 Options
3.1 explorer boolean default false
3.2 swaggerOptions.validatorUrl default 'https://validator.swagger.io/'; set null to disable
3.3 swaggerOptions.url string remote spec URL
3.4 swaggerOptions.urls array of {name:string,url:string} to populate dropdown; explorer must be true
3.5 customCss CSS string injected into page style
3.6 customCssUrl string|array public URLs to CSS resources
3.7 customJs string public URL to JS resource
3.8 customJsUrl string|array public URLs to JS resources
3.9 customJsStr string|array inline JS code snippets

4 Loading Spec
4.1 from JSON: require('./swagger.json')
4.2 from URL: setup(null,{swaggerOptions:{url}})
4.3 multiple URLs: setup(null,{explorer:true,swaggerOptions:{urls}})
4.4 from YAML: npm install yaml; read file; YAML.parse; pass document to setup

5 Dynamic Document
Middleware sets req.swaggerDoc then use serveFiles and setup without document args

6 Multiple Instances
Use serveFiles(document,options) before setup(document)

7 Linking Spec Endpoint
Expose GET /api-docs/swagger.json returning JSON; use serveFiles(null,{swaggerOptions:{url}})

8 Requirements
Node>=0.10.32, Express>=4

9 Testing Procedures
Install phantom; run npm test

## Original Source
Swagger UI Express
https://github.com/scottie1984/swagger-ui-express

## Digest of SWAGGER_UI_EXPRESS

# Swagger UI Express Technical Digest

Retrieved: 2024-06-12
Source: https://github.com/scottie1984/swagger-ui-express
Data Size: 539117 bytes

## Usage

Install

npm install swagger-ui-express

Express app setup

const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

Router setup

const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

## Swagger Explorer

Default hidden. Enable:

var options = { explorer: true }
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

## Custom swaggerOptions

var options = {
  swaggerOptions: { validatorUrl: null }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

## Custom CSS

// Inline CSS
var options = { customCss: '.swagger-ui .topbar { display: none }' }

// CSS URL(s)
var options = { customCssUrl: '/custom.css' }
var options = { customCssUrl: [ '/custom.css','https://example.com/other-custom.css' ] }

Mount:
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

## Custom JS

// External JS
var options = { customJs: '/custom.js' }
var options = { customJs: [ '/custom.js','https://example.com/other-custom.js' ] }

// Inline JS
var options = { customJsStr: 'console.log("Hello World")' }
var options = {
  customJsStr: [ 'console.log("Hello World")', 'var x = 1; console.log(x)' ]
}

## Load Swagger from URL

var options = {
  swaggerOptions: { url: 'http://petstore.swagger.io/v2/swagger.json' }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

## Load Multiple Swagger URLs

var options = {
  explorer: true,
  swaggerOptions: {
    urls: [ { url: 'http://petstore.swagger.io/v2/swagger.json', name: 'Spec1' },
            { url: 'http://petstore.swagger.io/v2/swagger.json', name: 'Spec2' } ]
  }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

## Load YAML

npm install yaml
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml','utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

## Dynamic Swagger Document

app.use('/api-docs', function(req,res,next){
  swaggerDocument.host = req.get('host')
  req.swaggerDoc = swaggerDocument
  next()
}, swaggerUi.serveFiles(swaggerDocument,{}), swaggerUi.setup())

## Multiple Instances

app.use('/api-docs-one', swaggerUi.serveFiles(swaggerDocumentOne,{}), swaggerUi.setup(swaggerDocumentOne))
app.use('/api-docs-two', swaggerUi.serveFiles(swaggerDocumentTwo,{}), swaggerUi.setup(swaggerDocumentTwo))
app.use('/api-docs-dynamic', middleware, swaggerUi.serveFiles(), swaggerUi.setup())

## Link to Swagger Document

app.get('/api-docs/swagger.json',(req,res)=>res.json(swaggerDocument))
var options = { swaggerOptions:{ url:'/api-docs/swagger.json' } }
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options))

## Requirements

Node >=0.10.32
Express >=4

## Testing

npm install phantom
npm test

## Attribution
- Source: Swagger UI Express
- URL: https://github.com/scottie1984/swagger-ui-express
- License: MIT License
- Crawl Date: 2025-05-08T15:30:57.288Z
- Data Size: 539117 bytes
- Links Found: 4315

## Retrieved
2025-05-08
