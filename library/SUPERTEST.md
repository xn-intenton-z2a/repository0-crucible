# SUPERTEST

## Crawl Summary
Install via npm; require supertest; request(appOrUrl[, {http2:boolean}]) binds to ephemeral port; agent for persistent cookies; chainable HTTP verb methods (.get, .post, etc); chainable config (.set, .auth, .send, .field, .attach); .expect overloads for status, body, headers, custom function; .end(callback) or Promise-based (.then/.catch); supports async/await; examples for Mocha, promises, async/await, multipart uploads; persistent agent cookie flow.

## Normalised Extract
Table of Contents
1 Initialization
2 HTTP Methods
3 Configuration Methods
4 Assertion Methods
5 Finalization Methods
6 HTTP/2 Option
7 Examples
   7.1 Basic Request
   7.2 Mocha Integration
   7.3 Promises
   7.4 Async/Await
   7.5 Multipart Upload
   7.6 Agent Persistence

1 Initialization
request(appOrUrl: Server|Function|string, options?:{http2?:boolean}) => Test
request.agent(appOrUrl, options?) => TestAgent

2 HTTP Methods
.get(path:string)
.post(path:string)
.put(path:string)
.delete(path:string)
.patch(path:string)
.head(path:string)

3 Configuration Methods
.set(field:string, value:string|RegExp)
.auth(username:string, password:string, options?:{type?:string})
.send(body:object|string)
.field(name:string, value:any, options?:{contentType?:string})
.attach(field:string, file:string|Buffer, options?:any)

4 Assertion Methods
.expect(status:number, fn?:(err,res)=>void)
.expect(status:number, body:any, fn?:(err,res)=>void)
.expect(body:string|RegExp|object, fn?:(err,res)=>void)
.expect(field:string, value:string|RegExp, fn?:(err,res)=>void)
.expect(fn:(res)=>void)

5 Finalization Methods
.end(fn:(err,res)=>void)
.then(onFulfilled, onRejected)
.catch(onRejected)

6 HTTP/2 Option
Pass {http2:true} to request or agent to enable HTTP/2

7 Examples
7.1 Basic Request
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(err=>{ if(err) throw err; });

7.2 Mocha Integration
describe('GET /user',()=>{
  it('returns json',done=>{
    request(app)
      .get('/user')
      .set('Accept','application/json')
      .expect(200,done);
  });
});

7.3 Promises
return request(app)
  .get('/users')
  .expect(200)
  .then(res=>{ expect(res.body.email).toEqual('foo@bar.com'); });

7.4 Async/Await
const res = await request(app).get('/users');
expect(res.status).toEqual(200);

7.5 Multipart Upload
request(app)
  .post('/')
  .field('name','avatar')
  .field('meta','{"k":"v"}',{contentType:'application/json'})
  .attach('avatar','path/to/file.jpg');

7.6 Agent Persistence
const agent = request.agent(app);
agent.get('/').expect('set-cookie','cookie=hey; Path=/',done);
agent.get('/return').expect('hey',done);

## Supplementary Details
- Default behavior binds server to ephemeral port if not listening
- HTTP/2 disabled by default; enable via options.http2 = true
- Agent cookies saved in memory; follow set-cookie header from server
- Use .expect(status, body, fn) to assert both status and full response body
- Custom assertions via expect(fn) must throw on failure
- Fail callback must rethrow or call done(err)
- Use return for promise-based tests or await
- Content-type matching via RegExp in .expect('Content-Type', /json/)
- For form uploads use .field and .attach in same chain
- To reuse host across tests reassign request = request('http://host:port')


## Reference Details
// TypeScript Definitions

interface RequestOptions { http2?: boolean; }

interface Test extends SuperAgentPromise<any> {
  get(path: string): this;
  post(path: string): this;
  put(path: string): this;
  delete(path: string): this;
  patch(path: string): this;
  head(path: string): this;
  set(field: string, value: string|RegExp): this;
  auth(user: string, pass: string, options?: { type?: string }): this;
  send(body: any): this;
  field(name: string, value: any, options?: { contentType?: string }): this;
  attach(field: string, file: string|Buffer, options?: any): this;
  expect(status: number, fn?: (err: any, res: any) => void): this;
  expect(status: number, body: any, fn?: (err: any, res: any) => void): this;
  expect(body: string|RegExp|object, fn?: (err: any, res: any) => void): this;
  expect(field: string, value: string|RegExp, fn?: (err: any, res: any) => void): this;
  expect(func: (res: any) => void): this;
  end(fn: (err: any, res: any) => void): void;
  then<TResult1 = any, TResult2 = any>(
    onFulfilled?: (value: any) => TResult1|PromiseLike<TResult1>,
    onRejected?: (reason: any) => TResult2|PromiseLike<TResult2>
  ): Promise<TResult1|TResult2>;
  catch(onRejected: (err: any) => void): Promise<any>;
}

declare function request(app: http.Server | Function | string, options?: RequestOptions): Test;
declare function agent(app: http.Server | Function | string, options?: RequestOptions): Test;

// Usage Patterns

1. Ephemeral Server Binding
   request(app)
     .get('/path')
     .end((err,res)=>{ if(err) return done(err); done(); });

2. HTTP/2
   request(app,{http2:true})
     .get('/path')

3. Cookie Persistence
   const agent = request.agent(app);
   agent.get('/login')
        .expect('set-cookie','sid=abc; Path=/; HttpOnly')
        .end(err=>{ if(err) throw err; });
   agent.get('/dashboard')
        .expect(200)
        .end(done);

4. Multipart Upload
   request(app)
     .post('/upload')
     .field('metadata','{"id":123}',{contentType:'application/json'})
     .attach('file','./test/data.bin')
     .expect(201, done);

// Configuration Options
options.http2: boolean ; default=false ; enables HTTP/2 protocol

// Best Practices
- Always assert status code with .expect(status) to catch HTTP errors
- Use custom expect(fn) to normalize dynamic fields
- For promise chains return the Test to Mocha/Jest
- For async tests use await and avoid .end

// Troubleshooting
Command: curl -v http://localhost:PORT/path
Expected: HTTP/1.1 200 OK
If wrong status, verify .expect(status) present
If content mismatch, adjust .expect('Content-Type', /regex/)


## Information Dense Extract
request(appOrUrl[, {http2:boolean}]) => Test; request.agent(...)=> TestAgent; Methods: get,post,put,delete,patch,head(path:string): this; set(field:string, value:string|RegExp); auth(user,pass,{type?}); send(body); field(name,value,{contentType?}); attach(field,file[,opts]); expect(status[,fn]), expect(status,body[,fn]), expect(body[,fn]), expect(field,value[,fn]), expect(fn); end(fn), then(), catch(); HTTP/2 via options.http2=true; Ephemeral port binding if app not listening; Cookie persistence via agent; Custom assertions throw errors; Promise support for chainable tests; Async/await example; Multipart: field+attach; Mocha: return or done; TS definitions included; Options: http2 default false; Best practices: always expect status, normalize fields via expect(fn), return promise, use await; Troubleshooting: curl -v verify codes, adjust expect patterns.

## Sanitised Extract
Table of Contents
1 Initialization
2 HTTP Methods
3 Configuration Methods
4 Assertion Methods
5 Finalization Methods
6 HTTP/2 Option
7 Examples
   7.1 Basic Request
   7.2 Mocha Integration
   7.3 Promises
   7.4 Async/Await
   7.5 Multipart Upload
   7.6 Agent Persistence

1 Initialization
request(appOrUrl: Server|Function|string, options?:{http2?:boolean}) => Test
request.agent(appOrUrl, options?) => TestAgent

2 HTTP Methods
.get(path:string)
.post(path:string)
.put(path:string)
.delete(path:string)
.patch(path:string)
.head(path:string)

3 Configuration Methods
.set(field:string, value:string|RegExp)
.auth(username:string, password:string, options?:{type?:string})
.send(body:object|string)
.field(name:string, value:any, options?:{contentType?:string})
.attach(field:string, file:string|Buffer, options?:any)

4 Assertion Methods
.expect(status:number, fn?:(err,res)=>void)
.expect(status:number, body:any, fn?:(err,res)=>void)
.expect(body:string|RegExp|object, fn?:(err,res)=>void)
.expect(field:string, value:string|RegExp, fn?:(err,res)=>void)
.expect(fn:(res)=>void)

5 Finalization Methods
.end(fn:(err,res)=>void)
.then(onFulfilled, onRejected)
.catch(onRejected)

6 HTTP/2 Option
Pass {http2:true} to request or agent to enable HTTP/2

7 Examples
7.1 Basic Request
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(err=>{ if(err) throw err; });

7.2 Mocha Integration
describe('GET /user',()=>{
  it('returns json',done=>{
    request(app)
      .get('/user')
      .set('Accept','application/json')
      .expect(200,done);
  });
});

7.3 Promises
return request(app)
  .get('/users')
  .expect(200)
  .then(res=>{ expect(res.body.email).toEqual('foo@bar.com'); });

7.4 Async/Await
const res = await request(app).get('/users');
expect(res.status).toEqual(200);

7.5 Multipart Upload
request(app)
  .post('/')
  .field('name','avatar')
  .field('meta','{'k':'v'}',{contentType:'application/json'})
  .attach('avatar','path/to/file.jpg');

7.6 Agent Persistence
const agent = request.agent(app);
agent.get('/').expect('set-cookie','cookie=hey; Path=/',done);
agent.get('/return').expect('hey',done);

## Original Source
SuperTest
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Detailed Digest (Retrieved: 2024-06-xx)

## Getting Started

Install: npm install supertest --save-dev
Require: const request = require('supertest');

## Initialization

Signature:

    request(appOrUrl[, options])
        appOrUrl: http.Server | Function | string
        options: { http2?: boolean }
        returns: Test instance bound to ephemeral port if app not listening

    request.agent(appOrUrl[, options])
        returns: TestAgent with cookie persistence

## HTTP Methods

Methods on Test/TestAgent:

    .get(path:string): this
    .post(path:string): this
    .put(path:string): this
    .delete(path:string): this
    .patch(path:string): this
    .head(path:string): this

## Chainable Request Configuration

    .set(field:string, value:string | RegExp): this
    .auth(user:string, pass:string[, options:{type?:string}]): this
    .send(body:object | string): this
    .field(name:string, value:any[, meta:{contentType?:string}]): this
    .attach(field:string, file:string|Buffer[, options:any]): this

## Assertions

Overloads of .expect:

    .expect(status:number[, fn(err,res)]): this
    .expect(status:number, body:any[, fn(err,res)]): this
    .expect(body:string|RegExp|object[, fn(err,res)]): this
    .expect(field:string, value:string|RegExp[, fn(err,res)]): this
    .expect(fn(res)): this  // custom assertion

## Finalization

    .end(fn(err,res)): void  // invoke request
    .then(onFulfilled, onRejected): Promise
    .catch(onRejected): Promise

## HTTP/2 Support

    request(app, { http2: true })
    request.agent(app, { http2: true })

## Examples

### Basic

    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function(err,res){ if(err) throw err; });

### With Mocha and done

    describe('GET /user', function(){
      it('responds json', function(done){
        request(app)
          .get('/user')
          .set('Accept','application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    });

### Promises

    return request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => { expect(response.body.email).toEqual('foo@bar.com'); });

### Async/Await

    const res = await request(app).get('/users').set('Accept','application/json');
    expect(res.headers['Content-Type']).toMatch(/json/);

### Multipart Upload

    request(app)
      .post('/')
      .field('name','my avatar')
      .field('meta','{"a":"v"}',{contentType:'application/json'})
      .attach('avatar','test/fixtures/avatar.jpg');

### Agent Persistence

    const agent = request.agent(app);
    agent.get('/').expect('set-cookie','cookie=hey; Path=/', done);
    agent.get('/return').expect('hey', done);

## API Reference

See ReferenceDetails section for full method signatures, types, configuration options, best practices, and troubleshooting.


## Attribution
- Source: SuperTest
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-05-11T05:33:08.302Z
- Data Size: 594483 bytes
- Links Found: 4770

## Retrieved
2025-05-11
