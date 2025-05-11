# SWAGGER_UI_INSTALLATION

## Crawl Summary
Installation via npm: swagger-ui, swagger-ui-react, swagger-ui-dist with commands. Import patterns for bundlers and static asset serving with absolutePath. Docker usage: pull image, run with env vars SWAGGER_JSON, SWAGGER_JSON_URL, BASE_URL, PORT, PORT_IPV6, EMBEDDING. unpkg integration: CSS and JS URLs, script initialization. Static hosting: copy /dist, update swagger-initializer.js.

## Normalised Extract
Table of Contents
1. NPM Installation
2. swagger-ui-dist Usage
3. Docker Usage
4. unpkg Integration
5. Static Hosting

1. NPM Installation
Install modules:
npm install swagger-ui swagger-ui-react swagger-ui-dist

Import and initialize:
import SwaggerUI from 'swagger-ui'
// or
const SwaggerUI = require('swagger-ui')
SwaggerUI({ dom_id: '#myDomId', url: <OpenAPI URL>, presets: [], layout: '' })

2. swagger-ui-dist Usage
Retrieve absolute path:
const path = require('swagger-ui-dist').absolutePath()
Server assets:
app.use(express.static(path));
Exports:
SwaggerUIBundle(options), SwaggerUIStandalonePreset
Options: url:string, dom_id:string, presets:Array, layout:string

3. Docker Usage
Commands:
docker pull docker.swagger.io/swaggerapi/swagger-ui
docker run -p hostPort:containerPort
Environment variables:
  SWAGGER_JSON=path
  SWAGGER_JSON_URL=url
  BASE_URL=pathPrefix
  PORT=number (default 8080)
  PORT_IPV6=number (none by default)
  EMBEDDING=true|false (default false)

4. unpkg Integration
CSS URL: https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css
JS URLs: bundle and standalone-preset
Initialization in window.onload:
SwaggerUIBundle({ url, dom_id, presets, layout })

5. Static Hosting
Steps:
Download release, extract /dist
Serve files via any HTTP server
Edit swagger-initializer.js: replace default spec URL with your own

## Supplementary Details
Default module versions align with npm latest release. swagger-ui exports main(options:Object):void where options.dom_id default '#swagger-ui', options.url default 'https://petstore.swagger.io/v2/swagger.json'. swagger-ui-dist.absolutePath():string returns filesystem path. Bundle includes swagger-ui-bundle.js and swagger-ui-standalone-preset.js. Docker image tag corresponds with release; always use latest or specify tag. Base URL env var must start with '/'. Port vars override container HTTP and IPv6 listener. EMBEDDING=true sets X-Frame-Options to allow embedding. unpkg uses dist@5.11.0; adjust version accordingly. swagger-initializer.js default spec path is hardcoded; update variable 'spec' in that file.

## Reference Details
SDK Methods:
functions:
  SwaggerUI(options:Object):{}
    options.dom_id:string required
    options.url:string
    options.presets:Array
    options.layout:string
    returns instance Object with methods init(), render(), destroy()

  require('swagger-ui-dist').absolutePath():string

  require('swagger-ui-dist').SwaggerUIBundle(options:Object):object same as SwaggerUI
  require('swagger-ui-dist').SwaggerUIStandalonePreset:Object

Docker Environment Variables:
  SWAGGER_JSON: path to local swagger.json Default: none
  SWAGGER_JSON_URL: HTTP(s) URL to spec Default: none
  BASE_URL: root URL path Default: '/'
  PORT: HTTP listener port Default: '8080'
  PORT_IPV6: IPv6 listener port Default: none
  EMBEDDING: 'true'|'false' Default: 'false'

Best Practices:
- Use swagger-ui in bundler-based projects to reduce payload.
- Use swagger-ui-dist for static asset serving.
- Pin unpkg versions to avoid breaking changes.
- Configure BASE_URL for reverse proxies and subpath deployments.
- Enable EMBEDDING only if embedding in iframes is required.

Troubleshooting:
Verify asset serving:
  curl -I http://localhost:3000/swagger-ui.css
Expected 'HTTP/1.1 200 OK'
Check Docker logs:
  docker logs <container>

## Information Dense Extract
npm install swagger-ui swagger-ui-react swagger-ui-dist; import SwaggerUI({dom_id, url, presets, layout}); express.static(require('swagger-ui-dist').absolutePath()); exports SwaggerUIBundle, SwaggerUIStandalonePreset; Docker pull/run with -e SWAGGER_JSON, SWAGGER_JSON_URL, BASE_URL, PORT, PORT_IPV6, EMBEDDING; unpkg CSS at /swagger-ui.css and JS at /swagger-ui-bundle.js,/swagger-ui-standalone-preset.js; static host /dist + edit swagger-initializer.js to your spec URL

## Sanitised Extract
Table of Contents
1. NPM Installation
2. swagger-ui-dist Usage
3. Docker Usage
4. unpkg Integration
5. Static Hosting

1. NPM Installation
Install modules:
npm install swagger-ui swagger-ui-react swagger-ui-dist

Import and initialize:
import SwaggerUI from 'swagger-ui'
// or
const SwaggerUI = require('swagger-ui')
SwaggerUI({ dom_id: '#myDomId', url: <OpenAPI URL>, presets: [], layout: '' })

2. swagger-ui-dist Usage
Retrieve absolute path:
const path = require('swagger-ui-dist').absolutePath()
Server assets:
app.use(express.static(path));
Exports:
SwaggerUIBundle(options), SwaggerUIStandalonePreset
Options: url:string, dom_id:string, presets:Array, layout:string

3. Docker Usage
Commands:
docker pull docker.swagger.io/swaggerapi/swagger-ui
docker run -p hostPort:containerPort
Environment variables:
  SWAGGER_JSON=path
  SWAGGER_JSON_URL=url
  BASE_URL=pathPrefix
  PORT=number (default 8080)
  PORT_IPV6=number (none by default)
  EMBEDDING=true|false (default false)

4. unpkg Integration
CSS URL: https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css
JS URLs: bundle and standalone-preset
Initialization in window.onload:
SwaggerUIBundle({ url, dom_id, presets, layout })

5. Static Hosting
Steps:
Download release, extract /dist
Serve files via any HTTP server
Edit swagger-initializer.js: replace default spec URL with your own

## Original Source
OpenAPI and Swagger UI
https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/

## Digest of SWAGGER_UI_INSTALLATION

# NPM Installation

Install packages using npm:

```bash
npm install swagger-ui
npm install swagger-ui-react
npm install swagger-ui-dist
```

Import and invoke:

```js
import SwaggerUI from 'swagger-ui'
// or
const SwaggerUI = require('swagger-ui')

SwaggerUI({ dom_id: '#myDomId' })
```

# swagger-ui-dist Usage

Access assets for server-side projects:

```js
const express = require('express')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const app = express()
app.use(express.static(pathToSwaggerUi))
app.listen(3000)
```

Expose bundle API:

```js
const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist')
const ui = SwaggerUIBundle({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  dom_id: '#swagger-ui',
  presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
  layout: 'StandaloneLayout'
})
```

# Docker

Pull image and run:

```bash
docker pull docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:8080 docker.swagger.io/swaggerapi/swagger-ui
```

Run with host swagger.json file:

```bash
docker run -p 80:8080 -e SWAGGER_JSON=/foo/swagger.json -v /bar:/foo docker.swagger.io/swaggerapi/swagger-ui
```

Run with remote URL:

```bash
docker run -p 80:8080 -e SWAGGER_JSON_URL=https://petstore3.swagger.io/api/v3/openapi.json docker.swagger.io/swaggerapi/swagger-ui
```

Customize base URL and ports:

```bash
docker run -p 80:8080 -e BASE_URL=/swagger -e SWAGGER_JSON=/foo/swagger.json -v /bar:/foo docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:80 -e PORT=80 docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:80 -e PORT_IPV6=8080 docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:80 -e EMBEDDING=true docker.swagger.io/swaggerapi/swagger-ui
```

# unpkg Integration

Embed via script tags in HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
<script>
  window.onload = function() {
    window.ui = SwaggerUIBundle({ url: 'https://petstore3.swagger.io/api/v3/openapi.json', dom_id: '#swagger-ui' })
  }
</script>
```

Use standalone preset:

```html
<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js" crossorigin></script>
<script>
  window.ui = SwaggerUIBundle({ presets:[SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset], layout:'StandaloneLayout' })
</script>
```

# Static Hosting

Copy contents of /dist and serve:

1. Download release and extract /dist.
2. Copy files to webroot.
3. Edit swagger-initializer.js to point to your OpenAPI spec URL.


## Attribution
- Source: OpenAPI and Swagger UI
- URL: https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
- License: CC0 1.0 Universal / Apache-2.0
- Crawl Date: 2025-05-11T07:31:12.655Z
- Data Size: 802053 bytes
- Links Found: 7569

## Retrieved
2025-05-11
