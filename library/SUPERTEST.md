# SUPERTEST

## Crawl Summary
request(input, opts?) binds to ephemeral port if not listening. opts.http2 boolean default false. `.agent(input, opts?)` for cookie persistence. Chainable methods: .get(path:string), .post(path:string), .put, .patch, .delete; .set(header:string, value:string); .auth(user:string, pass:string); .send(body:any); .field(name:string, value:any, options?:{contentType:string}); .attach(field:string, filePath:string). Assertions: .expect(status[, fn(err,res)]), .expect(status, body[, fn]), .expect(body[, fn]), .expect(header, value[, fn]), .expect(customFn). Order of .expect calls matters. Finalize with .end(fn(err,res)) or return promise or await. Promises via then(response). Async/Await supported. Use .expect(200, done) to combine status and callback. Custom assertion mutates res before assertions. Multipart support via superagent under the hood. HTTP errors (non-2XX) are passed as err if no status expectation. Compatible with any test framework.

## Normalised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP2 Support
4 HTTP Methods
5 Headers and Authentication
6 Request Body
7 Multipart Uploads
8 Cookie Persistence
9 Expectations and Assertions
10 Promises and Async/Await
11 Error Handling
12 Agent vs. Standalone

1 Installation
  Install as dev dependency: npm install supertest --save-dev

2 Initialization
  request(appOrUrl[, options]) binds to ephemeral port if app not listening
  request.agent(appOrUrl[, options]) reuses cookies across requests
  options.http2 boolean default false

3 HTTP2 Support
  Pass { http2: true } to enable HTTP/2 protocol on request or agent

4 HTTP Methods
  get(path:string): Test
  post(path:string): Test
  put(path:string): Test
  patch(path:string): Test
  delete(path:string): Test

5 Headers and Authentication
  set(header:string, value:string): Test
  auth(username:string, password:string): Test  sends HTTP Basic auth header

6 Request Body
  send(body:any): Test  supports JSON and urlencoded

7 Multipart Uploads
  field(name:string, value:any[, options:{ contentType:string }] ): Test
  attach(field:string, filePath:string): Test

8 Cookie Persistence
  agent = request.agent(appOrUrl)
  agent.get(path).expect('set-cookie', cookieString)
  agent.get(otherPath).expect(cookieValue)

9 Expectations and Assertions
  expect(status[, fn]): Test
  expect(status, body[, fn]): Test
  expect(body[, fn]): Test
  expect(field, value[, fn]): Test
  expect(fn(res)): Test  throw error in fn to fail
  order of expect calls defines execution sequence

10 Promises and Async/Await
  return request(...).get(...).expect(...).then(response => {...})
  const response = await request(...).get(...); expect on response

11 Error Handling
  Without status expect, non-2XX -> err in .end callback
  .end((err, res) => { if (err) return done(err); done(); })
  combine status and callback: .expect(200, done)

12 Agent vs. Standalone
  request() creates new Test each call
  agent() maintains session cookies and can be reused without passing app/url every time

## Supplementary Details
- Ephemeral port binding: request() auto-binds if app not listening
- Default timeout: inherited from superagent (no built-in timeout set)
- Content-Length header auto-calculated from body
- JSON bodies: Content-Type: application/json header set automatically
- URL-encoded: send accepts object sets Content-Type: application/x-www-form-urlencoded
- HTTP2 option enables TLS ALPN protocol negotiation automatically when supported
- Cookie header array accepted: .set('Cookie', ['a=1;b=2'])
- Custom assertion function receives full response object
- Underlying superagent session used for low-level methods: .write(), .pipe()
- Reassign request variable to a base URL: request = request('http://host:port')
- Chaining: each call returns a new Test instance or the same agent


## Reference Details
API Signatures

function request(appOrUrl:string|http.Server|Function, options?:{ http2:boolean }): Test
function request.agent(appOrUrl:string|http.Server|Function, options?:{ http2:boolean }): Agent

interface Test extends SuperAgentRequest {
  get(path:string): Test
  post(path:string): Test
  put(path:string): Test
  patch(path:string): Test
  delete(path:string): Test
  set(field:string, value:string): Test
  auth(username:string, password:string, options?:{ type:'basic'|'auto' }): Test
  send(body:any): Test
  field(name:string, value:string, options?:{ contentType:string }): Test
  attach(field:string, filePath:string): Test
  expect(status:number, fn?: (err:Error, res:Response)=>void): Test
  expect(status:number, body:any, fn?:(err:Error, res:Response)=>void): Test
  expect(body:string|RegExp|object, fn?:(err:Error, res:Response)=>void): Test
  expect(field:string, value:string|RegExp, fn?:(err:Error, res:Response)=>void): Test
  expect(fn:(res:Response)=>void): Test
  end(fn:(err:Error, res:Response)=>void): void
}

Usage Patterns
1 Standalone callback
describe(...)
  request(app).get('/path')
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{ if(err) throw err; })

2 Combined status and callback
request(app).get('/path').expect(200, done)

3 Promises
return request(app).get('/path')
  .expect('Content-Type',/json/)
  .expect(200)
  .then(res=>{ expect(res.body.id).toBe(value); })

4 Async/Await
const res = await request(app).get('/path').set('Accept','application/json')
expect(res.status).toBe(200)

5 Multipart upload
request(app).post('/')
  .field('name','avatar')
  .attach('avatar','test/fixtures/avatar.jpg')
  .expect(200, done)

6 Cookie persistence
const agent = request.agent(app)
agent.get('/').expect('set-cookie','cookie=hey; Path=/', done)
agent.get('/return').expect('hey', done)

Configuration Options
- http2 boolean default false: enable HTTP/2 via superagent
- contentType on field: default multipart/form-data; override with application/json

Best Practices
- Always include .expect(status) to catch non-2XX errors
- Use .expect(status, done) to simplify callbacks
- Chain .expect in definition order to inject custom assertions
- For shared host tests reassign request base URL

Troubleshooting
Command: npm test -- grep "SuperTest"
Expected: no assertion errors; non-2XX without expect shows err in callback
Issue: tests hang -> missing end() or return promise
Solution: add .end(done) or return the request promise

Detailed Steps to Reproduce Cookie Failure
1 Remove .expect('set-cookie',...) from first agent call
2 agent.get('/return').expect('hey', done) returns 400
3 Add missing cookie header in agent or use same agent instance

## Information Dense Extract
request(appOrUrl[, {http2:boolean=false}])→Test; request.agent(...)→Agent; Methods: get(path), post(path), put(path), patch(path), delete(path), set(header,value), auth(user,pass), send(body), field(name,value[,options:{contentType}]), attach(field,filePath), expect(status[,fn]), expect(status,body[,fn]), expect(body[,fn]), expect(header,value[,fn]), expect(fn(res)), end(fn(err,res)); Order of expect defines execution; use .expect(200,done) or .end; supports callbacks, Promises, async/await; HTTP2 via opts.http2; auto-binds ephemeral port; JSON bodies auto content-type; urlencoded via send(object); multipart via field/attach; persistent cookies via agent; reassign baseURL: request='url'; troubleshooting: missing end() or return hangs; always include status expect to catch errors

## Sanitised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP2 Support
4 HTTP Methods
5 Headers and Authentication
6 Request Body
7 Multipart Uploads
8 Cookie Persistence
9 Expectations and Assertions
10 Promises and Async/Await
11 Error Handling
12 Agent vs. Standalone

1 Installation
  Install as dev dependency: npm install supertest --save-dev

2 Initialization
  request(appOrUrl[, options]) binds to ephemeral port if app not listening
  request.agent(appOrUrl[, options]) reuses cookies across requests
  options.http2 boolean default false

3 HTTP2 Support
  Pass { http2: true } to enable HTTP/2 protocol on request or agent

4 HTTP Methods
  get(path:string): Test
  post(path:string): Test
  put(path:string): Test
  patch(path:string): Test
  delete(path:string): Test

5 Headers and Authentication
  set(header:string, value:string): Test
  auth(username:string, password:string): Test  sends HTTP Basic auth header

6 Request Body
  send(body:any): Test  supports JSON and urlencoded

7 Multipart Uploads
  field(name:string, value:any[, options:{ contentType:string }] ): Test
  attach(field:string, filePath:string): Test

8 Cookie Persistence
  agent = request.agent(appOrUrl)
  agent.get(path).expect('set-cookie', cookieString)
  agent.get(otherPath).expect(cookieValue)

9 Expectations and Assertions
  expect(status[, fn]): Test
  expect(status, body[, fn]): Test
  expect(body[, fn]): Test
  expect(field, value[, fn]): Test
  expect(fn(res)): Test  throw error in fn to fail
  order of expect calls defines execution sequence

10 Promises and Async/Await
  return request(...).get(...).expect(...).then(response => {...})
  const response = await request(...).get(...); expect on response

11 Error Handling
  Without status expect, non-2XX -> err in .end callback
  .end((err, res) => { if (err) return done(err); done(); })
  combine status and callback: .expect(200, done)

12 Agent vs. Standalone
  request() creates new Test each call
  agent() maintains session cookies and can be reused without passing app/url every time

## Original Source
Testing Tools: Vitest & SuperTest
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Detailed Digest
Date Retrieved: 2024-06-20
Data Size: 581946 bytes
Links Found: 4709
Error: None

# Installation
```bash
npm install supertest --save-dev
```  

# Basic Usage
```js
const request = require('supertest');
const express = require('express');
const app = express();
app.get('/user', (req, res) => res.status(200).json({ name: 'john' }));
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end((err, res) => { if (err) throw err; });
```  

# HTTP2 Support
Append `{ http2: true }` to `request()` or `request.agent()`:  
```js
request(app, { http2: true }).get('/user')...  
```  

# Test Framework Integration
- Callback style: pass `done` to `.expect()`  
- Promises: return `request(app).get(...).expect(...).then(response => {...})`  
- Async/Await: `const response = await request(app).get(...);`

# Authentication
`.auth(username, password)` sends HTTP basic auth header.  

# Error Handling
- Without `.expect(status)` any non-2XX triggers error in callback.  
- `.end((err, res) => { if (err) return done(err); done(); })`

# Assertions and Order
- `.expect(status[, fn])`  
- `.expect(status, body[, fn])`  
- `.expect(body[, fn])`  
- `.expect(field, value[, fn])`  
- `.expect(fn(res))` (custom assertion)  
- Assertions run sequentially in definition order.

# Multipart and File Uploads
`.field(name, value[, options])` and `.attach(field, path)` for multipart.  

# Agent and Cookie Persistence
```js
const agent = request.agent(app);
agent.get('/').expect('set-cookie','cookie=hey; Path=/', done);
agent.get('/return').expect('hey', done);
```

# API Reference Summary
- `request(appOrUrl[, options])` returns `Test`  
- `request.agent(appOrUrl[, options])` returns `Agent`  
- Methods on `Test`: `.get(path)`, `.post(path)`, `.set(field, value)`, `.send(body)`, `.auth(user, pass)`, `.field()`, `.attach()`, `.expect()`, `.end()`

# License
MIT

## Attribution
- Source: Testing Tools: Vitest & SuperTest
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-05-11T10:33:51.286Z
- Data Size: 581946 bytes
- Links Found: 4709

## Retrieved
2025-05-11
