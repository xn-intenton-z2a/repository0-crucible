# HTTP_SERVER

## Crawl Summary
http.createServer([options], requestListener) returns an HTTP server instance. server.listen supports numeric port, UNIX path, or options object. Default host 127.0.0.1, default socket timeout 120s, maxHeadersCount unlimited. Core events: 'request', 'connection', 'clientError', 'error'. Key config: allowHalfOpen, pauseOnConnect, keepAliveTimeout, headersTimeout. Minimal example provided. Best practices: handle clientError, adjust timeouts. Troubleshooting EADDRINUSE with lsof and kill.

## Normalised Extract
Table of Contents
1. Method Signatures
2. Events
3. Defaults & Config
4. Example
5. Error Handling
6. Troubleshooting

1. Method Signatures
createServer([options], requestListener)
  options.allowHalfOpen:boolean:false
  options.pauseOnConnect:boolean:false
  requestListener(req:IncomingMessage,res:ServerResponse)
  returns http.Server

server.listen(port:number,hostname?:string,backlog?:number,callback?:Function)
  hostname default '127.0.0.1'
  backlog OS default
  returns http.Server

server.close(callback?:Function)

2. Events
'request':req, res
'connection':socket
'clientError':err, socket
'error':err

3. Defaults & Config
host:127.0.0.1
timeout:120000ms
keepAliveTimeout:5000ms
headersTimeout:60000ms
maxHeadersCount:null

4. Example
import {createServer} from 'node:http'
const srv=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('OK')})
srv.listen(3000,'127.0.0.1',()=>console.log('OK'))

5. Error Handling
server.on('clientError',(err,sock)=>sock.end('HTTP/1.1 400 Bad Request\r\n\r\n'))
server.keepAliveTimeout=10000
server.headersTimeout=15000

6. Troubleshooting
EADDRINUSE: lsof -iTCP:port -sTCP:LISTEN; kill -9 pid

## Supplementary Details
Configuration Options:
- allowHalfOpen (boolean): false – if true, socket stays open after response.end
- pauseOnConnect (boolean): false – if true, pauses socket until resumed in requestListener
- timeout (number): 120000 – socket idle timeout in milliseconds
- keepAliveTimeout (number): 5000 – time to keep socket open for additional requests
- headersTimeout (number): 60000 – time to receive complete HTTP headers
- maxHeadersCount (number|null): null – maximum number of headers allowed

Implementation Steps:
1. Import: `import { createServer } from 'node:http'`
2. Instantiate: `const server = createServer(requestListener)`
3. Attach error handlers: `server.on('clientError',...)`
4. Configure timeouts: `server.keepAliveTimeout=...; server.headersTimeout=...`
5. Start: `server.listen(port, host, callback)`
6. On shutdown: `server.close(callback)`

Core Functionality:
- IncomingMessage exposes `method`, `url`, `headers`
- ServerResponse methods: `writeHead(statusCode, headers)`, `write(data)`, `end([data])`


## Reference Details
HTTP.createServer(options?, requestListener)
Parameters:
  options.allowHalfOpen:boolean:false
  options.pauseOnConnect:boolean:false
  requestListener:Function<(req:IncomingMessage,res:ServerResponse)>:
    req.method:string
    req.url:string
    req.headers:IncomingHttpHeaders
    req.setTimeout(msecs:number, callback?:Function)
    res.write(chunk:Buffer|string, encoding?:string):boolean
    res.writeHead(statusCode:number, headers:OutgoingHttpHeaders):void
    res.end([data:Buffer|string], [encoding:string], [callback:Function]):void
Returns: http.Server

Server.listen(port:number, hostname?:string, backlog?:number, callback?:Function):http.Server
Server.listen(path:string, callback?:Function):http.Server
Server.listen(options:{port:number,host?:string,backlog?:number,exclusive?:boolean}, callback?:Function):http.Server

Server.close(callback?:Function):http.Server | undefined

Events:
- 'request'(req:IncomingMessage,res:ServerResponse)
- 'connection'(socket:net.Socket)
- 'clientError'(err:Error,socket:net.Socket)
- 'listening'()
- 'close'()
- 'error'(err:Error)

Full Example with Best Practices:
```js
import { createServer } from 'node:http';

const server = createServer({ allowHalfOpen: false }, (req, res) => {
  // set per-request timeout
  req.setTimeout(20000, () => {
    res.writeHead(408);
    res.end('Request Timeout');
  });

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Allow': 'GET' });
    return res.end('Method Not Allowed');
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.keepAliveTimeout = 10000;
server.headersTimeout = 15000;

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen({ port: 3000, host: '127.0.0.1', backlog: 511 }, () => {
  console.log('Server listening on 127.0.0.1:3000');
});
```

Troubleshooting Procedures:
1. Port in Use:
   - `$ lsof -iTCP:3000 -sTCP:LISTEN`
   - `$ kill -9 <PID>`
2. Unhandled Promise Rejection:
   - Add `process.on('unhandledRejection', console.error)`
3. Debugging Connections:
   - `$ node --inspect server.js`
   - Access `chrome://inspect` to view call stacks


## Information Dense Extract
createServer([allowHalfOpen=false,pauseOnConnect=false],reqListener(req:IncomingMessage,res:ServerResponse))→http.Server; server.listen(port,hostname='127.0.0.1',backlog=?,callback)→http.Server; server.close(callback). Defaults: timeout=120000ms, keepAliveTimeout=5000ms, headersTimeout=60000ms, maxHeadersCount=null. Events: 'request', 'connection', 'clientError', 'error', 'listening', 'close'. Best practices: set timeouts via req.setTimeout and server.keepAliveTimeout, handle clientError to send 400, handle unsupported methods with 405, catch server.on('error'). Troubleshoot EADDRINUSE via lsof/kilL, debug via node --inspect.

## Sanitised Extract
Table of Contents
1. Method Signatures
2. Events
3. Defaults & Config
4. Example
5. Error Handling
6. Troubleshooting

1. Method Signatures
createServer([options], requestListener)
  options.allowHalfOpen:boolean:false
  options.pauseOnConnect:boolean:false
  requestListener(req:IncomingMessage,res:ServerResponse)
  returns http.Server

server.listen(port:number,hostname?:string,backlog?:number,callback?:Function)
  hostname default '127.0.0.1'
  backlog OS default
  returns http.Server

server.close(callback?:Function)

2. Events
'request':req, res
'connection':socket
'clientError':err, socket
'error':err

3. Defaults & Config
host:127.0.0.1
timeout:120000ms
keepAliveTimeout:5000ms
headersTimeout:60000ms
maxHeadersCount:null

4. Example
import {createServer} from 'node:http'
const srv=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('OK')})
srv.listen(3000,'127.0.0.1',()=>console.log('OK'))

5. Error Handling
server.on('clientError',(err,sock)=>sock.end('HTTP/1.1 400 Bad Request'r'n'r'n'))
server.keepAliveTimeout=10000
server.headersTimeout=15000

6. Troubleshooting
EADDRINUSE: lsof -iTCP:port -sTCP:LISTEN; kill -9 pid

## Original Source
Node.js Core API & Modules
https://nodejs.org/api/

## Digest of HTTP_SERVER

# HTTP Module

## HTTP.createServer
Signature: `createServer([options], requestListener)`

Parameters:
- `options` <Object> (optional):
  - `allowHalfOpen` <boolean> Default: `false`  – if true, keeps socket open after response end
  - `pauseOnConnect` <boolean> Default: `false` – if true, pauses sockets on connection
- `requestListener` <Function>  – callback `(req: IncomingMessage, res: ServerResponse)`

Returns: `<http.Server>`

## Server.listen
Signature overloads:
1. `server.listen(port[, hostname][, backlog][, callback])`
2. `server.listen(path[, callback])`
3. `server.listen(options[, callback])`

Parameters (port variant):
- `port` <number> – port to bind
- `hostname` <string> Default: `127.0.0.1` – hostname or IP
- `backlog` <number> Default: OS default – maximum queued connections
- `callback` <Function> – invoked once server starts listening

Returns: `<http.Server>`

## Server.close
Signature: `server.close([callback])`

Parameters:
- `callback` <Function> – invoked when all connections closed

## Events
- `'request'`: `(req: IncomingMessage, res: ServerResponse)`
- `'connection'`: `(socket: net.Socket)`
- `'clientError'`: `(err: Error, socket: net.Socket)`
- `'error'`: `(err: Error)`

## Configuration Defaults
- Default host: `127.0.0.1`
- Default port if unspecified: falls back to environment or OS
- `timeout`: `120000` ms on sockets
- `maxHeadersCount`: `null` (no limit)
- `keepAliveTimeout`: `5000` ms

## Minimal Example
```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
```

## Best Practices
- Handle client errors:
```js
server.on('clientError', (err, sock) => {
  sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```
- Set timeouts on slow clients:
```js
server.keepAliveTimeout = 10000;
server.headersTimeout = 15000;
```

## Troubleshooting
- EADDRINUSE: port in use
  - `$ lsof -iTCP:3000 -sTCP:LISTEN`
  - `$ kill -9 <pid>`
- Unhandled exceptions: attach `process.on('uncaughtException')`

---
_Data retrieved from https://nodejs.org/api/ on 2024-06-24, Data Size: 3644215 bytes_

## Attribution
- Source: Node.js Core API & Modules
- URL: https://nodejs.org/api/
- License: Node.js Foundation (MIT-like)
- Crawl Date: 2025-05-07T18:32:06.324Z
- Data Size: 3644215 bytes
- Links Found: 3171

## Retrieved
2025-05-07
