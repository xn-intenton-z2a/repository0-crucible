# HTTP_AGENT

## Crawl Summary
Agent manages connection pooling for HTTP clients. Constructor options: keepAlive:boolean(default false), keepAliveMsecs:number(default1000), maxSockets:number(default∞), maxTotalSockets:number(default∞), maxFreeSockets:number(default256), scheduling:'fifo'|'lifo'(default'lifo'), timeout:number(ms). Methods: createConnection(options,callback)->Duplex, keepSocketAlive(socket)->boolean, reuseSocket(socket,request)->void, destroy()->void. Properties: freeSockets, sockets, requests, maxSockets, maxFreeSockets, maxTotalSockets, scheduling.

## Normalised Extract
Table of Contents
1. Constructor Options
2. Connection Methods
3. Socket Lifecycle Methods
4. Pool State Properties

1. Constructor Options
keepAlive:boolean      Keep sockets when idle    Default false
keepAliveMsecs:number  Delay for TCP keep-alive   Default 1000
maxSockets:number      Max concurrent per host    Default Infinity
maxTotalSockets:number Max concurrent total       Default Infinity
maxFreeSockets:number  Max pooled per host        Default 256
scheduling:string      'fifo'|'lifo' scheduling  Default 'lifo'
timeout:number         Socket timeout ms          Default none

2. Connection Methods
createConnection(options:object, callback?:(err,stream)->void):stream.Duplex
  Proxies to net.createConnection

3. Socket Lifecycle Methods
keepSocketAlive(socket:stream.Duplex): boolean
  Enables TCP Keep-Alive and unrefs socket
reuseSocket(socket:stream.Duplex, request:http.ClientRequest): void
  Refs socket before reusing

destroy(): void
  Destroys all managed sockets

4. Pool State Properties
freeSockets: { [name:string]: stream.Duplex[] }
sockets:     { [name:string]: stream.Duplex[] }
requests:    { [name:string]: http.ClientRequest[] }
maxSockets:       number
maxFreeSockets:   number
maxTotalSockets:  number
scheduling:       'fifo'|'lifo'


## Supplementary Details
Connection pooling logic: reuse per host:port:localAddress[:family]. When queue empty and keepAlive true, sockets remain in freeSockets. When pool > maxFreeSockets, extra sockets are closed. Idle sockets unref to prevent event loop retention. KeepAlive option enables HTTP Connection: keep-alive header by default. Use agent.destroy() when agent no longer required to free OS resources. For single-use requests, pass { agent: false } to http.get or http.request to bypass pooling.


## Reference Details
API Signatures:
new Agent(options?:{
  keepAlive?: boolean;
  keepAliveMsecs?: number;
  maxSockets?: number;
  maxTotalSockets?: number;
  maxFreeSockets?: number;
  scheduling?: 'fifo'|'lifo';
  timeout?: number;
}): Agent

agent.createConnection(options: object, callback?: (err: Error, socket: Duplex) => void): Duplex
agent.keepSocketAlive(socket: Duplex): boolean
agent.reuseSocket(socket: Duplex, request: ClientRequest): void
agent.destroy(): void

Code Examples:
// Persistent agent
import { Agent, request } from 'node:http';
const agent = new Agent({ keepAlive: true, keepAliveMsecs: 2000, maxSockets: 10 });
request({ hostname: 'example.com', port: 80, path: '/', agent }, res => { /* consume */ });

// One-off agent
import http from 'node:http';
http.get({ hostname:'localhost', port:80, agent:false }, res => { /* no pooling */ });

Best Practices:
- Always destroy agents with keepAlive when done: agent.destroy()
- Monitor agent.requests[name].length to throttle burst traffic
- Use scheduling 'lifo' on low QPS to avoid stale sockets
- Use scheduling 'fifo' on high QPS to maximize throughput

Troubleshooting:
$ lsof -iTCP -sTCP:ESTABLISHED | grep node
Inspect excessive sockets. If freeSockets growing beyond expected, ensure agent.destroy called.

In case of server-closed idle socket ECONNRESET:
request.on('error', err => {
  if (req.reusedSocket && err.code==='ECONNRESET') retryRequest();
});


## Information Dense Extract
Agent({keepAlive?:boolean=false,keepAliveMsecs?:number=1000,maxSockets?:number=∞,maxTotalSockets?:number=∞,maxFreeSockets?:number=256,scheduling?:'fifo'|'lifo'= 'lifo',timeout?:number}) methods: createConnection(options,callback)->Duplex; keepSocketAlive(socket)->boolean; reuseSocket(socket,req)->void; destroy()->void properties: freeSockets, sockets, requests, maxSockets, maxFreeSockets, maxTotalSockets, scheduling.

## Sanitised Extract
Table of Contents
1. Constructor Options
2. Connection Methods
3. Socket Lifecycle Methods
4. Pool State Properties

1. Constructor Options
keepAlive:boolean      Keep sockets when idle    Default false
keepAliveMsecs:number  Delay for TCP keep-alive   Default 1000
maxSockets:number      Max concurrent per host    Default Infinity
maxTotalSockets:number Max concurrent total       Default Infinity
maxFreeSockets:number  Max pooled per host        Default 256
scheduling:string      'fifo'|'lifo' scheduling  Default 'lifo'
timeout:number         Socket timeout ms          Default none

2. Connection Methods
createConnection(options:object, callback?:(err,stream)->void):stream.Duplex
  Proxies to net.createConnection

3. Socket Lifecycle Methods
keepSocketAlive(socket:stream.Duplex): boolean
  Enables TCP Keep-Alive and unrefs socket
reuseSocket(socket:stream.Duplex, request:http.ClientRequest): void
  Refs socket before reusing

destroy(): void
  Destroys all managed sockets

4. Pool State Properties
freeSockets: { [name:string]: stream.Duplex[] }
sockets:     { [name:string]: stream.Duplex[] }
requests:    { [name:string]: http.ClientRequest[] }
maxSockets:       number
maxFreeSockets:   number
maxTotalSockets:  number
scheduling:       'fifo'|'lifo'

## Original Source
Node.js Core API Reference
https://nodejs.org/api/http.html

## Digest of HTTP_AGENT

# http.Agent

## Stability: 2 - Stable

An Agent manages connection persistence and reuse for HTTP clients.

### new Agent([options])

**Signature**
```js
new Agent(options?: {
  keepAlive?: boolean;
  keepAliveMsecs?: number;
  maxSockets?: number;
  maxTotalSockets?: number;
  maxFreeSockets?: number;
  scheduling?: 'fifo' | 'lifo';
  timeout?: number;
});
```

**Options**
- keepAlive <boolean> : default false
- keepAliveMsecs <number> : default 1000
- maxSockets <number> : default Infinity
- maxTotalSockets <number> : default Infinity
- maxFreeSockets <number> : default 256
- scheduling <string> : 'fifo' | 'lifo'; default 'lifo'
- timeout <number> : socket timeout in milliseconds

### agent.createConnection(options[, callback])

**Signature**
```js
agent.createConnection(options: object, callback?: (err: Error, socket: stream.Duplex) => void): stream.Duplex
```

Produces a <net.Socket> (stream.Duplex). By default proxies to net.createConnection().

### agent.keepSocketAlive(socket)

**Signature**
```js
agent.keepSocketAlive(socket: stream.Duplex): boolean
```
Default behavior:
```js
socket.setKeepAlive(true, this.keepAliveMsecs);
socket.unref();
return true;
```

### agent.reuseSocket(socket, request)

**Signature**
```js
agent.reuseSocket(socket: stream.Duplex, request: http.ClientRequest): void
```
Default behavior: `socket.ref();`

### agent.destroy()

**Signature**
```js
agent.destroy(): void
```
Destroys all sockets currently managed by the agent.

### Properties
- freeSockets: Record<string, stream.Duplex[]>
- sockets: Record<string, stream.Duplex[]>
- requests: Record<string, http.ClientRequest[]>
- maxSockets: number
- maxFreeSockets: number
- maxTotalSockets: number
- scheduling: string


## Attribution
- Source: Node.js Core API Reference
- URL: https://nodejs.org/api/http.html
- License: CC BY-SA 3.0
- Crawl Date: 2025-04-26T15:47:52.093Z
- Data Size: 3539064 bytes
- Links Found: 1285

## Retrieved
2025-04-26
