# HTTP_SERVER

## Crawl Summary
HTTP module core implementation: createServer signature with explicit http.ServerOptions fields (IncomingMessageConstructor, ServerResponseConstructor, allowHTTP1, maxHeadersCount); Server.listen overloads; IncomingMessage properties/methods; ServerResponse API; Server events list; typical error codes; basic example.

## Normalised Extract
Table of Contents:
1. Module Import
2. Server Creation (createServer)
3. Listening Configuration (listen)
4. Request API (IncomingMessage)
5. Response API (ServerResponse)
6. Server Events
7. Error Handling

1. Module Import
import { createServer } from 'node:http';

2. Server Creation
Signature: createServer([options:ServerOptions],[requestListener]) -> Server
ServerOptions interface:
  IncomingMessageConstructor: constructor for req (default http.IncomingMessage)
  ServerResponseConstructor: constructor for res (default http.ServerResponse)
  allowHTTP1: boolean, default true
  maxHeadersCount: integer, default 2000
  backlog: integer forwarded to listen

3. Listening Configuration
server.listen(port?: number|string, hostname?: string, backlog?: number, callback?: ()=>void)
Defaults: port=0, hostname='::', backlog=undefined

4. Request API
IncomingMessage extends Stream.Readable
Properties:
  method: string, req.method
  url: string, req.url
  headers: object, lowercase header names
  socket: net.Socket
Methods:
  setTimeout(msecs: number, callback?: ()=>void)

5. Response API
ServerResponse extends Stream.Writable
Methods:
  write(chunk: string|Buffer, encoding?: string): boolean
  setHeader(name: string, value: string|string[]): void
  getHeader(name: string): string|string[]|undefined
  removeHeader(name: string): void
  writeHead(statusCode: number, statusMessage?: string, headers?: object): void
  end([data][, encoding][, callback]): void

6. Server Events:
  'request': (req,res)
  'connection': (socket)
  'listening': ()
  'close': ()
  'error': (err)
  'timeout': (socket)

7. Error Handling
Listen for 'error' event:
server.on('error', err => {
  if(err.code==='EADDRINUSE') handlePortInUse();
});

## Supplementary Details
Default ServerOptions:
  allowHTTP1: true (accept both HTTP/1.x)
  maxHeadersCount: 2000 (max number of headers to parse)
Default Timeouts:
  server.timeout: 120000 ms
  server.keepAliveTimeout: 5000 ms
  server.headersTimeout: 60000 ms
Implementation Steps:
1. Import module: import { createServer } from 'node:http'
2. Instantiate server with options and requestListener
3. Configure timeouts via server.setTimeout, server.keepAliveTimeout
4. Call server.listen(port, hostname, backlog, callback)
5. Attach 'error' and 'close' event handlers before listen
6. Inside listener, inspect req.method, req.url, req.headers
7. Use res.setHeader/write/writeHead/end to send response


## Reference Details
API Specifications:

interface ServerOptions {
  IncomingMessageConstructor?: typeof IncomingMessage;
  ServerResponseConstructor?: typeof ServerResponse;
  allowHTTP1?: boolean;
  maxHeadersCount?: number;
  backlog?: number;
}

function createServer(options?: ServerOptions, requestListener?: (req: IncomingMessage, res: ServerResponse) => void): Server;

class Server extends net.Server {
  timeout: number;
  keepAliveTimeout: number;
  headersTimeout: number;
  listen(port?: number|string, hostname?: string, backlog?: number, callback?:()=>void): this;
  setTimeout(msecs: number, callback?: ()=>void): this;
  on(event: 'request', listener: (req: IncomingMessage, res: ServerResponse)=>void): this;
  on(event: 'connection', listener: (socket: net.Socket)=>void): this;
  on(event: 'listening', listener: ()=>void): this;
  on(event: 'close', listener: ()=>void): this;
  on(event: 'error', listener: (err: Error & {code?: string})=>void): this;
  on(event: 'timeout', listener: (socket: net.Socket)=>void): this;
}

class IncomingMessage extends Stream.Readable {
  readonly method?: string;
  readonly url?: string;
  readonly headers: IncomingHttpHeaders;
  readonly socket: net.Socket;
  setTimeout(msecs: number, callback?: ()=>void): this;
}

class ServerResponse extends Stream.Writable {
  write(chunk: string|Buffer, encoding?: string): boolean;
  setHeader(name: string, value: string|string[]): void;
  getHeader(name: string): string|string[]|undefined;
  removeHeader(name: string): void;
  writeHead(statusCode: number, statusMessage?: string, headers?: OutgoingHttpHeaders): void;
  end(data?: string|Buffer, encoding?: string, callback?: ()=>void): void;
}

Example: Graceful Shutdown Pattern
```js
const server = createServer((req,res)=>{/*...*/});
server.listen(8080);

process.on('SIGTERM', ()=>{
  server.close(err=>{
    process.exit(err?1:0);
  });
});
```

Configuration Options Effects:
  maxHeadersCount: limits header parsing to prevent DoS
  headersTimeout: max time to receive headers
  keepAliveTimeout: time to keep idle connection

Best Practices Code:
  - Use HTTPS module for TLS
  - Validate req.url before routing
  - Limit body size via JSON.parse with limit

Troubleshooting:
  - EADDRINUSE: run `lsof -i:PORT` then `kill PID`
  - ECONNRESET: handle in 'error' event
  - Debug with `node --inspect server.js`


## Information Dense Extract
http.createServer: (options?:{IncomingMessageConstructor?:Function,ServerResponseConstructor?:Function,allowHTTP1?:boolean,maxHeadersCount?:number,backlog?:number},requestListener?:(req, res)=>void)=>Server
Server.listen(port?:number|string,hostname?:string,backlog?:number,callback?:()=>void)
IncomingMessage: props method,url,headers,socket; method setTimeout(msecs,cb)
ServerResponse: write(chunk,encoding?),setHeader(name,value),getHeader(name),removeHeader(name),writeHead(statusCode,statusMessage?,headers?),end(data?,encoding?,cb?)
Server events: request,connection,listening,close,error,timeout
Default server.timeout=120000,keepAliveTimeout=5000,headersTimeout=60000,maxHeadersCount=2000
Error codes: EADDRINUSE,ECONNRESET
Example: createServer({maxHeadersCount:1000},(req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('Hello');}).listen(3000,'127.0.0.1',()=>console.log)
Graceful shutdown: process.on('SIGTERM',()=>server.close())
Troubleshoot: lsof -i:PORT;kill PID;node --inspect


## Sanitised Extract
Table of Contents:
1. Module Import
2. Server Creation (createServer)
3. Listening Configuration (listen)
4. Request API (IncomingMessage)
5. Response API (ServerResponse)
6. Server Events
7. Error Handling

1. Module Import
import { createServer } from 'node:http';

2. Server Creation
Signature: createServer([options:ServerOptions],[requestListener]) -> Server
ServerOptions interface:
  IncomingMessageConstructor: constructor for req (default http.IncomingMessage)
  ServerResponseConstructor: constructor for res (default http.ServerResponse)
  allowHTTP1: boolean, default true
  maxHeadersCount: integer, default 2000
  backlog: integer forwarded to listen

3. Listening Configuration
server.listen(port?: number|string, hostname?: string, backlog?: number, callback?: ()=>void)
Defaults: port=0, hostname='::', backlog=undefined

4. Request API
IncomingMessage extends Stream.Readable
Properties:
  method: string, req.method
  url: string, req.url
  headers: object, lowercase header names
  socket: net.Socket
Methods:
  setTimeout(msecs: number, callback?: ()=>void)

5. Response API
ServerResponse extends Stream.Writable
Methods:
  write(chunk: string|Buffer, encoding?: string): boolean
  setHeader(name: string, value: string|string[]): void
  getHeader(name: string): string|string[]|undefined
  removeHeader(name: string): void
  writeHead(statusCode: number, statusMessage?: string, headers?: object): void
  end([data][, encoding][, callback]): void

6. Server Events:
  'request': (req,res)
  'connection': (socket)
  'listening': ()
  'close': ()
  'error': (err)
  'timeout': (socket)

7. Error Handling
Listen for 'error' event:
server.on('error', err => {
  if(err.code==='EADDRINUSE') handlePortInUse();
});

## Original Source
Web Platform, Protocol & Date-Time Standards
https://nodejs.org/api/

## Digest of HTTP_SERVER

# HTTP Server

## http.createServer([options][, requestListener])
Signature: `http.createServer([options][, requestListener]) -> http.Server`

Options (http.ServerOptions):
  - IncomingMessageConstructor: Function (default: http.IncomingMessage)
  - ServerResponseConstructor: Function (default: http.ServerResponse)
  - allowHTTP1: boolean (default: true)
  - maxHeadersCount: number (default: 2000)
  - backlog: number (passed to listen())

requestListener: `(req: http.IncomingMessage, res: http.ServerResponse) => void`

## http.Server.listen(port[, hostname][, backlog][, callback])
Signature: `server.listen(port?: number|string, hostname?: string, backlog?: number, callback?: () => void) -> http.Server`

Parameters:
  - port: number|string (default: 0)
  - hostname: string (default: '::')
  - backlog: number (default platform TCP backlog)
  - callback: Function invoked on 'listening'

## http.IncomingMessage
Properties:
  - headers: IncomingHttpHeaders
  - method: string
  - url: string
  - socket: net.Socket
Methods:
  - setTimeout(msecs: number, callback?: () => void): this

## http.ServerResponse
Methods:
  - write(chunk: string|Buffer, encoding?: string): boolean
  - setHeader(name: string, value: string|string[]): void
  - getHeader(name: string): string|string[]|undefined
  - removeHeader(name: string): void
  - writeHead(statusCode: number, statusMessage?: string, headers?: OutgoingHttpHeaders): void
  - end([data][, encoding][, callback]): void

## Server Events
  - request(req, res)
  - connection(socket)
  - close()
  - error(err)
  - listening()
  - timeout(socket)

## Error Codes
  - EADDRINUSE: address in use
  - ECONNRESET: connection reset by peer

## Example Usage
```js
import { createServer } from 'node:http';

const server = createServer({ maxHeadersCount: 1000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server listening on 127.0.0.1:3000');
});
```

## Attribution
- Source: Web Platform, Protocol & Date-Time Standards
- URL: https://nodejs.org/api/
- License: License if known
- Crawl Date: 2025-04-29T16:52:27.298Z
- Data Size: 3484516 bytes
- Links Found: 2328

## Retrieved
2025-04-29
